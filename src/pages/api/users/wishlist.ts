// src/pages/api/users/wishlist.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/db/connection';
import { User } from '@/lib/db/models/User';
import { Package } from '@/lib/db/models/Package';
import { verifyToken } from '@/lib/auth/config';

interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Middleware to verify JWT token
const authenticateUser = (req: AuthenticatedRequest, res: NextApiResponse, next: () => void) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Token received:', !!token);
  
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  try {
    const decoded = verifyToken(token);
    console.log('Token decoded:', decoded ? 'Success' : 'Failed');
    
    if (!decoded) {
      console.log('Token verification failed');
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    // Debug: Log the entire decoded token
    console.log('Full decoded token:', JSON.stringify(decoded, null, 2));
    
    // Try different possible user ID fields
    const userId = decoded.id || decoded.userId || decoded._id || decoded.sub;
    
    console.log('Decoded user ID:', userId);
    console.log('Decoded user email:', decoded.email);

    if (!userId) {
      console.log('No user ID found in token. Available fields:', Object.keys(decoded));
      return res.status(401).json({ success: false, message: 'Invalid token structure' });
    }

    req.user = {
      id: userId,
      email: decoded.email,
      role: decoded.role
    };
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Helper function to run middleware
const runMiddleware = (req: AuthenticatedRequest, res: NextApiResponse, fn: Function) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// Get user's wishlist
async function getUserWishlist(req: AuthenticatedRequest, res: NextApiResponse, userId: string) {
  try {
    console.log('Fetching wishlist for user:', userId);
    
    const user = await User.findById(userId).populate({
      path: 'wishlist.package',
      model: 'Package'
    });

    if (!user) {
      console.log('User not found in database:', userId);
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    console.log('User found, wishlist length:', user.wishlist.length);

    const wishlist = user.wishlist.map((item: any) => ({
      id: item._id,
      packageId: item.package._id,
      userId: userId,
      addedAt: item.addedAt,
      package: {
        id: item.package._id,
        title: item.package.title,
        destination: item.package.destination,
        price: item.package.price,
        thumbnail: item.package.thumbnail,
        type: item.package.type,
        category: item.package.category,
        duration: item.package.duration
      }
    }));

    return res.status(200).json({ 
      success: true, 
      wishlist 
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch wishlist' 
    });
  }
}

// Add package to wishlist
async function addPackageToWishlist(req: AuthenticatedRequest, res: NextApiResponse, userId: string) {
  try {
    const { packageId } = req.body;
    console.log('Adding package to wishlist:', packageId, 'for user:', userId);

    if (!packageId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Package ID is required' 
      });
    }

    // Check if package exists
    const packageExists = await Package.findById(packageId);
    if (!packageExists) {
      console.log('Package not found:', packageId);
      return res.status(404).json({ 
        success: false, 
        message: 'Package not found' 
      });
    }

    console.log('Package exists:', packageExists.title);

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found:', userId);
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    console.log('User found:', user.email);

    // Check if package is already in wishlist
    const existingWishlistItem = user.wishlist.find(
      (item: any) => item.package.toString() === packageId
    );

    if (existingWishlistItem) {
      console.log('Package already in wishlist');
      return res.status(409).json({ 
        success: false, 
        message: 'Package already in wishlist' 
      });
    }

    // Add to wishlist
    const wishlistItem = {
      package: packageId,
      addedAt: new Date()
    };

    user.wishlist.push(wishlistItem);
    await user.save();
    console.log('Package added to wishlist successfully');

    // Populate the new item for response
    await user.populate({
      path: 'wishlist.package',
      model: 'Package'
    });

    const newWishlistItem = user.wishlist[user.wishlist.length - 1];
    const responseItem = {
      id: newWishlistItem._id,
      packageId: newWishlistItem.package._id,
      userId: userId,
      addedAt: newWishlistItem.addedAt,
      package: {
        id: newWishlistItem.package._id,
        title: newWishlistItem.package.title,
        destination: newWishlistItem.package.destination,
        price: newWishlistItem.package.price,
        thumbnail: newWishlistItem.package.thumbnail,
        type: newWishlistItem.package.type,
        category: newWishlistItem.package.category,
        duration: newWishlistItem.package.duration
      }
    };

    return res.status(201).json({ 
      success: true, 
      message: 'Package added to wishlist successfully',
      wishlistItem: responseItem
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to add package to wishlist' 
    });
  }
}

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    await connectDB();
    console.log('Database connected');
    
    await runMiddleware(req, res, authenticateUser);
    console.log('Authentication middleware passed');

    const { method } = req;
    const userId = req.user?.id;

    console.log('Method:', method);
    console.log('User ID from token:', userId);

    if (!userId) {
      console.log('No user ID after authentication');
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    switch (method) {
      case 'GET':
        return await getUserWishlist(req, res, userId);
      case 'POST':
        return await addPackageToWishlist(req, res, userId);
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ success: false, message: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Wishlist API error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}