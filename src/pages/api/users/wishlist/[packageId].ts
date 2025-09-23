// // src/pages/api/users/wishlist/[packageId].ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectDB } from '@/lib/db/connection';
// import { User } from '@/lib/db/models/User';
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

//   if (!token) {
//     return res.status(401).json({ success: false, message: 'Access token required' });
//   }

//   try {
//     const decoded = verifyToken(token);
    
//     if (!decoded) {
//       return res.status(401).json({ success: false, message: 'Invalid or expired token' });
//     }

//     req.user = {
//       id: decoded.id,
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

//     const { method, query } = req;
//     const userId = req.user?.id;
//     const packageId = query.packageId as string;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: 'User not authenticated' });
//     }

//     if (!packageId) {
//       return res.status(400).json({ success: false, message: 'Package ID is required' });
//     }

//     switch (method) {
//       case 'DELETE':
//         return await removeFromWishlist(req, res, userId, packageId);
//       default:
//         res.setHeader('Allow', ['DELETE']);
//         return res.status(405).json({ success: false, message: `Method ${method} not allowed` });
//     }
//   } catch (error) {
//     console.error('Wishlist delete API error:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// }

// // Remove package from wishlist
// async function removeFromWishlist(
//   req: AuthenticatedRequest, 
//   res: NextApiResponse, 
//   userId: string, 
//   packageId: string
// ) {
//   try {
//     // Find user
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'User not found' 
//       });
//     }

//     // Find the wishlist item to remove
//     const wishlistItemIndex = user.wishlist.findIndex(
//       (item: any) => item.package.toString() === packageId
//     );

//     if (wishlistItemIndex === -1) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Package not found in wishlist' 
//       });
//     }

//     // Remove from wishlist
//     user.wishlist.splice(wishlistItemIndex, 1);
//     await user.save();

//     return res.status(200).json({ 
//       success: true, 
//       message: 'Package removed from wishlist successfully'
//     });
//   } catch (error) {
//     console.error('Remove from wishlist error:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: 'Failed to remove package from wishlist' 
//     });
//   }
// }








// // src/pages/api/users/wishlist/[packageId].ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectDB } from '@/lib/db/connection';
// import { User } from '@/lib/db/models/User';
// import { verifyToken } from '@/lib/auth/config';

// interface AuthenticatedRequest extends NextApiRequest {
//   user?: {
//     id: string;
//     email: string;
//     role: string;
//   };
// }

// interface WishlistItem {
//   package: string;
//   addedAt?: Date;
//   [key: string]: unknown;
// }

// // Type for middleware function
// type MiddlewareFunction = (
//   req: AuthenticatedRequest, 
//   res: NextApiResponse, 
//   next: () => void
// ) => void;

// // Middleware to verify JWT token
// const authenticateUser: MiddlewareFunction = (req: AuthenticatedRequest, res: NextApiResponse, next: () => void) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ success: false, message: 'Access token required' });
//   }

//   try {
//     const decoded = verifyToken(token);
    
//     if (!decoded) {
//       return res.status(401).json({ success: false, message: 'Invalid or expired token' });
//     }

//     req.user = {
//       id: decoded.id,
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
// const runMiddleware = (req: AuthenticatedRequest, res: NextApiResponse, fn: MiddlewareFunction): Promise<unknown> => {
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

//     const { method, query } = req;
//     const userId = req.user?.id;
//     const packageId = query.packageId as string;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: 'User not authenticated' });
//     }

//     if (!packageId) {
//       return res.status(400).json({ success: false, message: 'Package ID is required' });
//     }

//     switch (method) {
//       case 'DELETE':
//         return await removeFromWishlist(req, res, userId, packageId);
//       default:
//         res.setHeader('Allow', ['DELETE']);
//         return res.status(405).json({ success: false, message: `Method ${method} not allowed` });
//     }
//   } catch (error) {
//     console.error('Wishlist delete API error:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// }

// // Remove package from wishlist
// async function removeFromWishlist(
//   req: AuthenticatedRequest, 
//   res: NextApiResponse, 
//   userId: string, 
//   packageId: string
// ) {
//   try {
//     // Find user
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'User not found' 
//       });
//     }

//     // Find the wishlist item to remove
//     const wishlistItemIndex = user.wishlist.findIndex(
//       (item: WishlistItem) => item.package.toString() === packageId
//     );

//     if (wishlistItemIndex === -1) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Package not found in wishlist' 
//       });
//     }

//     // Remove from wishlist
//     user.wishlist.splice(wishlistItemIndex, 1);
//     await user.save();

//     return res.status(200).json({ 
//       success: true, 
//       message: 'Package removed from wishlist successfully'
//     });
//   } catch (error) {
//     console.error('Remove from wishlist error:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: 'Failed to remove package from wishlist' 
//     });
//   }
// }





// src/pages/api/users/wishlist/[packageId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/db/connection';
import { User } from '@/lib/db/models/User';
import { verifyToken } from '@/lib/auth/config';

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

interface WishlistItem {
  package: string;
  addedAt?: Date;
  [key: string]: unknown;
}

// Type for middleware function
type MiddlewareFunction = (
  req: AuthenticatedRequest, 
  res: NextApiResponse, 
  next: () => void
) => void;

// Middleware to verify JWT token
const authenticateUser: MiddlewareFunction = (req: AuthenticatedRequest, res: NextApiResponse, next: () => void) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  try {
    const decoded = verifyToken(token) as DecodedToken;
    
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    // Try different possible user ID fields
    const userId = decoded.id || decoded.userId || decoded._id || decoded.sub;

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
const runMiddleware = (req: AuthenticatedRequest, res: NextApiResponse, fn: MiddlewareFunction): Promise<void> => {
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

    const { method, query } = req;
    const userId = req.user?.id;
    const packageId = query.packageId as string;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    if (!packageId) {
      return res.status(400).json({ success: false, message: 'Package ID is required' });
    }

    switch (method) {
      case 'DELETE':
        return await removeFromWishlist(req, res, userId, packageId);
      default:
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).json({ success: false, message: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Wishlist delete API error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}

// Remove package from wishlist
async function removeFromWishlist(
  req: AuthenticatedRequest, 
  res: NextApiResponse, 
  userId: string, 
  packageId: string
) {
  try {
    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Find the wishlist item to remove
    const wishlistItemIndex = user.wishlist.findIndex(
      (item: WishlistItem) => item.package.toString() === packageId
    );

    if (wishlistItemIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Package not found in wishlist' 
      });
    }

    // Remove from wishlist
    user.wishlist.splice(wishlistItemIndex, 1);
    await user.save();

    return res.status(200).json({ 
      success: true, 
      message: 'Package removed from wishlist successfully'
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to remove package from wishlist' 
    });
  }
}