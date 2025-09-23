// // src/pages/api/users/wishlist/index.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectDB } from '@/lib/db/connection';
// import { User } from '@/lib/db/models/User';
// import { Package } from '@/lib/db/models/Package'; // Assuming you have a Package model
// import { verifyToken } from '@/lib/auth/config';

// interface AuthenticatedRequest extends NextApiRequest {
//   user?: {
//     id: string;
//     email: string;
//     role: string;
//   };
// }

// // Middleware to verify JWT token
// const authenticateUser = (req: AuthenticatedRequest, res: NextApiResponse, next: () => void) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(' ')[1];

//   console.log('Token received:', !!token);
  
//   if (!token) {
//     console.log('No token provided');
//     return res.status(401).json({ success: false, message: 'Access token required' });
//   }

//   try {
//     const decoded = verifyToken(token);
//     console.log('Token decoded:', decoded ? 'Success' : 'Failed');
    
//     if (!decoded) {
//       console.log('Token verification failed');
//       return res.status(401).json({ success: false, message: 'Invalid or expired token' });
//     }

//     // Debug: Log the entire decoded token
//     console.log('Full decoded token:', JSON.stringify(decoded, null, 2));
    
//     // Try different possible user ID fields that might be in your JWT
//     const userId = decoded.id || decoded.userId || decoded._id || decoded.sub;
    
//     console.log('Decoded user ID:', userId);
//     console.log('Decoded user email:', decoded.email);

//     if (!userId) {
//       console.log('No user ID found in token. Available fields:', Object.keys(decoded));
//       return res.status(401).json({ success: false, message: 'Invalid token structure' });
//     }

//     req.user = {
//       id: userId,
//       email: decoded.email,
//       role: decoded.role
//     };
//     next();
//   } catch (error) {
//     console.error('Token verification error:', error);
//     return res.status(401).json({ success: false, message: 'Invalid or expired token' });
//   }
// };

// // Helper function to run middleware
// const runMiddleware = (req: AuthenticatedRequest, res: NextApiResponse, fn: Function) => {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// };

// export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
//   try {
//     await connectDB();
//     await runMiddleware(req, res, authenticateUser);

//     const { method } = req;
//     const userId = req.user?.id;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: 'User not authenticated' });
//     }

//     switch (method) {
//       case 'GET':
//         return await getWishlist(req, res, userId);
//       case 'POST':
//         return await addToWishlist(req, res, userId);
//       default:
//         res.setHeader('Allow', ['GET', 'POST']);
//         return res.status(405).json({ success: false, message: `Method ${method} not allowed` });
//     }
//   } catch (error) {
//     console.error('Wishlist API error:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// }

// // Get user's wishlist
// async function getWishlist(req: AuthenticatedRequest, res: NextApiResponse, userId: string) {
//   try {
//     console.log('Fetching wishlist for user:', userId);
    
//     // Find user and populate wishlist with package details
//     const user = await User.findById(userId).populate({
//       path: 'wishlist.package',
//       model: 'Package'
//     });

//     if (!user) {
//       console.log('User not found in database:', userId);
//       return res.status(404).json({ 
//         success: false, 
//         message: 'User not found' 
//       });
//     }

//     console.log('User found, wishlist length:', user.wishlist.length);

//     // Filter out items where package is null (deleted packages) and format the data
//     const formattedWishlist = user.wishlist
//       .filter((item: any) => item.package && item.package._id) // Remove items with null packages
//       .map((item: any) => ({
//         id: item._id.toString(),
//         packageId: item.package._id.toString(),
//         userId: userId,
//         addedAt: item.addedAt || item.createdAt || new Date().toISOString(),
//         package: {
//           id: item.package._id.toString(),
//           title: item.package.title,
//           destination: item.package.destination,
//           price: item.package.price,
//           thumbnail: item.package.thumbnail || item.package.image,
//           type: item.package.type,
//           category: item.package.category,
//           duration: item.package.duration
//         }
//       }));

//     console.log('Formatted wishlist items:', formattedWishlist.length);

//     return res.status(200).json({ 
//       success: true, 
//       wishlist: formattedWishlist
//     });
//   } catch (error) {
//     console.error('Get wishlist error:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: 'Failed to fetch wishlist' 
//     });
//   }
// }

// // Add package to wishlist
// async function addToWishlist(req: AuthenticatedRequest, res: NextApiResponse, userId: string) {
//   try {
//     const { packageId } = req.body;

//     if (!packageId) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Package ID is required' 
//       });
//     }

//     // Check if package exists
//     const packageExists = await Package.findById(packageId);
//     if (!packageExists) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Package not found' 
//       });
//     }

//     // Find user
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'User not found' 
//       });
//     }

//     // Check if package is already in wishlist
//     const alreadyInWishlist = user.wishlist.some(
//       (item: any) => item.package.toString() === packageId
//     );

//     if (alreadyInWishlist) {
//       return res.status(409).json({ 
//         success: false, 
//         message: 'Package already in wishlist' 
//       });
//     }

//     // Add to wishlist
//     user.wishlist.push({
//       package: packageId,
//       addedAt: new Date()
//     });

//     await user.save();

//     // Get the newly added item with package details populated
//     const updatedUser = await User.findById(userId).populate({
//       path: 'wishlist.package',
//       model: 'Package'
//     });

//     const newWishlistItem = updatedUser.wishlist[updatedUser.wishlist.length - 1];
    
//     const formattedItem = {
//       id: newWishlistItem._id.toString(),
//       packageId: newWishlistItem.package._id.toString(),
//       userId: userId,
//       addedAt: newWishlistItem.addedAt.toISOString(),
//       package: {
//         id: newWishlistItem.package._id.toString(),
//         title: newWishlistItem.package.title,
//         destination: newWishlistItem.package.destination,
//         price: newWishlistItem.package.price,
//         thumbnail: newWishlistItem.package.thumbnail || newWishlistItem.package.image,
//         type: newWishlistItem.package.type,
//         category: newWishlistItem.package.category,
//         duration: newWishlistItem.package.duration
//       }
//     };

//     return res.status(201).json({ 
//       success: true, 
//       message: 'Package added to wishlist successfully',
//       wishlistItem: formattedItem
//     });
//   } catch (error) {
//     console.error('Add to wishlist error:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: 'Failed to add package to wishlist' 
//     });
//   }
// }









// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectDB } from '@/lib/db/connection';
// import { User } from '@/lib/db/models/User';
// import { Package } from '@/lib/db/models/Package';
// import { verifyToken } from '@/lib/auth/config';

// // Interface for authenticated request
// interface AuthenticatedRequest extends NextApiRequest {
//   user?: {
//     id: string;
//     email: string;
//     role: string;
//   };
// }

// // Interface for wishlist item
// interface WishlistItem {
//   _id: string;
//   package: {
//     _id: string;
//     title: string;
//     destination: string;
//     price: number;
//     thumbnail?: string;
//     image?: string;
//     type: string;
//     category: string;
//     duration: string;
//   };
//   addedAt?: Date;
//   createdAt?: Date;
// }

// // Middleware to verify JWT token
// const authenticateUser = (
//   req: AuthenticatedRequest,
//   res: NextApiResponse,
//   next: () => void
// ) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(' ')[1];

//   console.log('Token received:', !!token);

//   if (!token) {
//     console.log('No token provided');
//     return res.status(401).json({ success: false, message: 'Access token required' });
//   }

//   try {
//     const decoded = verifyToken(token);
//     console.log('Token decoded:', decoded ? 'Success' : 'Failed');

//     if (!decoded) {
//       console.log('Token verification failed');
//       return res.status(401).json({ success: false, message: 'Invalid or expired token' });
//     }

//     // Debug: Log the entire decoded token
//     console.log('Full decoded token:', JSON.stringify(decoded, null, 2));

//     // Try different possible user ID fields that might be in your JWT
//     const userId = decoded.id || decoded.userId || decoded._id || decoded.sub;

//     console.log('Decoded user ID:', userId);
//     console.log('Decoded user email:', decoded.email);

//     if (!userId) {
//       console.log('No user ID found in token. Available fields:', Object.keys(decoded));
//       return res.status(401).json({ success: false, message: 'Invalid token structure' });
//     }

//     req.user = {
//       id: userId,
//       email: decoded.email,
//       role: decoded.role,
//     };
//     next();
//   } catch (error) {
//     console.error('Token verification error:', error);
//     return res.status(401).json({ success: false, message: 'Invalid or expired token' });
//   }
// };

// // Helper function to run middleware
// const runMiddleware = (
//   req: AuthenticatedRequest,
//   res: NextApiResponse,
//   fn: (req: AuthenticatedRequest, res: NextApiResponse, next: (result?: unknown) => void) => void
// ): Promise<unknown> => {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: unknown) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// };

// export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
//   try {
//     await connectDB();
//     await runMiddleware(req, res, authenticateUser);

//     const { method } = req;
//     const userId = req.user?.id;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: 'User not authenticated' });
//     }

//     switch (method) {
//       case 'GET':
//         return await getWishlist(req, res, userId);
//       case 'POST':
//         return await addToWishlist(req, res, userId);
//       default:
//         res.setHeader('Allow', ['GET', 'POST']);
//         return res.status(405).json({ success: false, message: `Method ${method} not allowed` });
//     }
//   } catch (error) {
//     console.error('Wishlist API error:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//     });
//   }
// }

// // Get user's wishlist
// async function getWishlist(req: AuthenticatedRequest, res: NextApiResponse, userId: string) {
//   try {
//     console.log('Fetching wishlist for user:', userId);

//     // Find user and populate wishlist with package details
//     const user = await User.findById(userId).populate({
//       path: 'wishlist.package',
//       model: 'Package',
//     });

//     if (!user) {
//       console.log('User not found in database:', userId);
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     console.log('User found, wishlist length:', user.wishlist.length);

//     // Filter out items where package is null (deleted packages) and format the data
//     const formattedWishlist = user.wishlist
//       .filter((item: WishlistItem) => item.package && item.package._id) // Remove items with null packages
//       .map((item: WishlistItem) => ({
//         id: item._id.toString(),
//         packageId: item.package._id.toString(),
//         userId: userId,
//         addedAt: item.addedAt || item.createdAt || new Date().toISOString(),
//         package: {
//           id: item.package._id.toString(),
//           title: item.package.title,
//           destination: item.package.destination,
//           price: item.package.price,
//           thumbnail: item.package.thumbnail || item.package.image,
//           type: item.package.type,
//           category: item.package.category,
//           duration: item.package.duration,
//         },
//       }));

//     console.log('Formatted wishlist items:', formattedWishlist.length);

//     return res.status(200).json({
//       success: true,
//       wishlist: formattedWishlist,
//     });
//   } catch (error) {
//     console.error('Get wishlist error:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to fetch wishlist',
//     });
//   }
// }

// // Add package to wishlist
// async function addToWishlist(req: AuthenticatedRequest, res: NextApiResponse, userId: string) {
//   try {
//     const { packageId } = req.body;

//     if (!packageId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Package ID is required',
//       });
//     }

//     // Check if package exists
//     const packageExists = await Package.findById(packageId);
//     if (!packageExists) {
//       return res.status(404).json({
//         success: false,
//         message: 'Package not found',
//       });
//     }

//     // Find user
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     // Check if package is already in wishlist
//     const alreadyInWishlist = user.wishlist.some(
//       (item: WishlistItem) => item.package._id.toString() === packageId
//     );

//     if (alreadyInWishlist) {
//       return res.status(409).json({
//         success: false,
//         message: 'Package already in wishlist',
//       });
//     }

//     // Add to wishlist
//     user.wishlist.push({
//       package: packageId,
//       addedAt: new Date(),
//     });

//     await user.save();

//     // Get the newly added item with package details populated
//     const updatedUser = await User.findById(userId).populate({
//       path: 'wishlist.package',
//       model: 'Package',
//     });

//     const newWishlistItem = updatedUser.wishlist[updatedUser.wishlist.length - 1] as WishlistItem;

//     const formattedItem = {
//       id: newWishlistItem._id.toString(),
//       packageId: newWishlistItem.package._id.toString(),
//       userId: userId,
//       addedAt: newWishlistItem.addedAt.toISOString(),
//       package: {
//         id: newWishlistItem.package._id.toString(),
//         title: newWishlistItem.package.title,
//         destination: newWishlistItem.package.destination,
//         price: newWishlistItem.package.price,
//         thumbnail: newWishlistItem.package.thumbnail || newWishlistItem.package.image,
//         type: newWishlistItem.package.type,
//         category: newWishlistItem.package.category,
//         duration: newWishlistItem.package.duration,
//       },
//     };

//     return res.status(201).json({
//       success: true,
//       message: 'Package added to wishlist successfully',
//       wishlistItem: formattedItem,
//     });
//   } catch (error) {
//     console.error('Add to wishlist error:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to add package to wishlist',
//     });
//   }
// }








import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/db/connection';
import { User } from '@/lib/db/models/User';
import { Package } from '@/lib/db/models/Package';
import { verifyToken } from '@/lib/auth/config';

// Interface for authenticated request
interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Extended interface to include all possible JWT user ID fields
interface DecodedToken {
  id?: string;
  userId?: string;
  _id?: string;
  sub?: string; // Standard JWT subject claim
  email: string;
  role: string;
  [key: string]: unknown; // Allow other JWT claims
}

// Interface for wishlist item
interface WishlistItem {
  _id: string;
  package: {
    _id: string;
    title: string;
    destination: string;
    price: number;
    thumbnail?: string;
    image?: string;
    type: string;
    category: string;
    duration: string;
  };
  addedAt?: Date;
  createdAt?: Date;
}

// Middleware to verify JWT token
const authenticateUser = (
  req: AuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Token received:', !!token);

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  try {
    const decoded = verifyToken(token) as DecodedToken;
    console.log('Token decoded:', decoded ? 'Success' : 'Failed');

    if (!decoded) {
      console.log('Token verification failed');
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    // Debug: Log the entire decoded token
    console.log('Full decoded token:', JSON.stringify(decoded, null, 2));

    // Try different possible user ID fields that might be in your JWT
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
      role: decoded.role,
    };
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Helper function to run middleware
const runMiddleware = (
  req: AuthenticatedRequest,
  res: NextApiResponse,
  fn: (req: AuthenticatedRequest, res: NextApiResponse, next: () => void) => void
): Promise<void> => {
  return new Promise((resolve) => {
    fn(req, res, () => {
      resolve();
    });
  });
};

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    await connectDB();
    await runMiddleware(req, res, authenticateUser);

    const { method } = req;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    switch (method) {
      case 'GET':
        return await getWishlist(req, res, userId);
      case 'POST':
        return await addToWishlist(req, res, userId);
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ success: false, message: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Wishlist API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

// Get user's wishlist
async function getWishlist(req: AuthenticatedRequest, res: NextApiResponse, userId: string) {
  try {
    console.log('Fetching wishlist for user:', userId);

    // Find user and populate wishlist with package details
    const user = await User.findById(userId).populate({
      path: 'wishlist.package',
      model: 'Package',
    });

    if (!user) {
      console.log('User not found in database:', userId);
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    console.log('User found, wishlist length:', user.wishlist.length);

    // Filter out items where package is null (deleted packages) and format the data
    const formattedWishlist = user.wishlist
      .filter((item: WishlistItem) => item.package && item.package._id) // Remove items with null packages
      .map((item: WishlistItem) => ({
        id: item._id.toString(),
        packageId: item.package._id.toString(),
        userId: userId,
        addedAt: item.addedAt || item.createdAt || new Date().toISOString(),
        package: {
          id: item.package._id.toString(),
          title: item.package.title,
          destination: item.package.destination,
          price: item.package.price,
          thumbnail: item.package.thumbnail || item.package.image,
          type: item.package.type,
          category: item.package.category,
          duration: item.package.duration,
        },
      }));

    console.log('Formatted wishlist items:', formattedWishlist.length);

    return res.status(200).json({
      success: true,
      wishlist: formattedWishlist,
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch wishlist',
    });
  }
}

// Add package to wishlist
async function addToWishlist(req: AuthenticatedRequest, res: NextApiResponse, userId: string) {
  try {
    const { packageId } = req.body;

    if (!packageId) {
      return res.status(400).json({
        success: false,
        message: 'Package ID is required',
      });
    }

    // Check if package exists
    const packageExists = await Package.findById(packageId);
    if (!packageExists) {
      return res.status(404).json({
        success: false,
        message: 'Package not found',
      });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if package is already in wishlist
    const alreadyInWishlist = user.wishlist.some(
      (item: WishlistItem) => item.package._id.toString() === packageId
    );

    if (alreadyInWishlist) {
      return res.status(409).json({
        success: false,
        message: 'Package already in wishlist',
      });
    }

    // Add to wishlist
    user.wishlist.push({
      package: packageId,
      addedAt: new Date(),
    });

    await user.save();

    // Get the newly added item with package details populated
    const updatedUser = await User.findById(userId).populate({
      path: 'wishlist.package',
      model: 'Package',
    });

    const newWishlistItem = updatedUser.wishlist[updatedUser.wishlist.length - 1] as WishlistItem;

    const formattedItem = {
      id: newWishlistItem._id.toString(),
      packageId: newWishlistItem.package._id.toString(),
      userId: userId,
      addedAt: (newWishlistItem.addedAt || newWishlistItem.createdAt || new Date()).toISOString(),
      package: {
        id: newWishlistItem.package._id.toString(),
        title: newWishlistItem.package.title,
        destination: newWishlistItem.package.destination,
        price: newWishlistItem.package.price,
        thumbnail: newWishlistItem.package.thumbnail || newWishlistItem.package.image,
        type: newWishlistItem.package.type,
        category: newWishlistItem.package.category,
        duration: newWishlistItem.package.duration,
      },
    };

    return res.status(201).json({
      success: true,
      message: 'Package added to wishlist successfully',
      wishlistItem: formattedItem,
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to add package to wishlist',
    });
  }
}