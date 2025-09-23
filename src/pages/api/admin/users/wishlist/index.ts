// // src/pages/api/user/wishlist/index.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';
// import { connectToDatabase } from '@/lib/db/connection';
// import { Wishlist } from '@/lib/db/models/Wishlist';
// import { Package } from '@/lib/db/models/Package';
// import { User } from '@/lib/db/models/User';

// interface JWTPayload {
//   userId: string;
//   email: string;
//   role: string;
// }

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     await connectToDatabase();

//     // Verify authentication
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({
//         success: false,
//         message: 'Authentication required. Please provide a valid token.'
//       });
//     }

//     const token = authHeader.substring(7);
//     let decoded: JWTPayload;

//     try {
//       decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
//     } catch {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid or expired token. Please login again.'
//       });
//     }

//     const { userId } = decoded;

//     // Verify user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found.'
//       });
//     }

//     if (req.method === 'GET') {
//       // Get user's wishlist
//       try {
//         const wishlistItems = await Wishlist.find({ userId })
//           .populate({
//             path: 'packageId',
//             model: 'Package',
//             select: 'id title destination price thumbnail type category duration originalPrice'
//           })
//           .sort({ createdAt: -1 })
//           .lean();

//         // Filter out items where package doesn't exist (deleted packages)
//         const validWishlistItems = wishlistItems.filter(item => item.packageId);

//         // Format response
//         const formattedWishlist = validWishlistItems.map(item => ({
//           id: item._id,
//           packageId: item.packageId._id,
//           userId: item.userId,
//           addedAt: item.createdAt,
//           package: {
//             id: item.packageId._id,
//             title: item.packageId.title,
//             destination: item.packageId.destination,
//             price: item.packageId.price,
//             originalPrice: item.packageId.originalPrice,
//             thumbnail: item.packageId.thumbnail,
//             type: item.packageId.type,
//             category: item.packageId.category,
//             duration: item.packageId.duration
//           }
//         }));

//         return res.status(200).json({
//           success: true,
//           wishlist: formattedWishlist,
//           count: formattedWishlist.length
//         });
//       } catch (error) {
//         console.error('Error fetching wishlist:', error);
//         return res.status(500).json({
//           success: false,
//           message: 'Failed to fetch wishlist'
//         });
//       }
//     }

//     if (req.method === 'POST') {
//       // Add package to wishlist
//       const { packageId } = req.body;

//       if (!packageId) {
//         return res.status(400).json({
//           success: false,
//           message: 'Package ID is required'
//         });
//       }

//       try {
//         // Check if package exists
//         const packageExists = await Package.findById(packageId);
//         if (!packageExists) {
//           return res.status(404).json({
//             success: false,
//             message: 'Package not found'
//           });
//         }

//         // Check if already in wishlist
//         const existingWishlistItem = await Wishlist.findOne({ userId, packageId });
//         if (existingWishlistItem) {
//           return res.status(400).json({
//             success: false,
//             message: 'Package is already in your wishlist'
//           });
//         }

//         // Create new wishlist item
//         const wishlistItem = new Wishlist({
//           userId,
//           packageId,
//           createdAt: new Date()
//         });

//         await wishlistItem.save();

//         // Populate package details for response
//         const populatedItem = await Wishlist.findById(wishlistItem._id)
//           .populate({
//             path: 'packageId',
//             model: 'Package',
//             select: 'id title destination price thumbnail type category duration originalPrice'
//           })
//           .lean();

//         const formattedWishlistItem = {
//           id: populatedItem._id,
//           packageId: populatedItem.packageId._id,
//           userId: populatedItem.userId,
//           addedAt: populatedItem.createdAt,
//           package: {
//             id: populatedItem.packageId._id,
//             title: populatedItem.packageId.title,
//             destination: populatedItem.packageId.destination,
//             price: populatedItem.packageId.price,
//             originalPrice: populatedItem.packageId.originalPrice,
//             thumbnail: populatedItem.packageId.thumbnail,
//             type: populatedItem.packageId.type,
//             category: populatedItem.packageId.category,
//             duration: populatedItem.packageId.duration
//           }
//         };

//         return res.status(201).json({
//           success: true,
//           message: 'Package added to wishlist successfully',
//           wishlistItem: formattedWishlistItem
//         });
//       } catch (error) {
//         console.error('Error adding to wishlist:', error);
//         return res.status(500).json({
//           success: false,
//           message: 'Failed to add package to wishlist'
//         });
//       }
//     }

//     // Method not allowed
//     return res.status(405).json({
//       success: false,
//       message: `Method ${req.method} not allowed`
//     });

//   } catch (error) {
//     console.error('Wishlist API error:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// }





// src/pages/api/user/wishlist/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db/connection';
import Wishlist from '@/lib/db/models/Wishlist';
import Package from '@/lib/db/models/Package';
import User from '@/lib/db/models/User';

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();

    // Verify authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please provide a valid token.'
      });
    }

    const token = authHeader.substring(7);
    let decoded: JWTPayload;

    try {
      decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please login again.'
      });
    }

    const { userId } = decoded;

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    if (req.method === 'GET') {
      // Get user's wishlist
      try {
        const wishlistItems = await Wishlist.find({ userId })
          .populate({
            path: 'packageId',
            model: 'Package',
            select: 'id title destination price thumbnail type category duration originalPrice'
          })
          .sort({ createdAt: -1 })
          .lean();

        // Filter out items where package doesn't exist (deleted packages)
        const validWishlistItems = wishlistItems.filter(item => item.packageId);

        // Format response
        const formattedWishlist = validWishlistItems.map(item => ({
          id: item._id,
          packageId: item.packageId._id,
          userId: item.userId,
          addedAt: item.createdAt,
          package: {
            id: item.packageId._id,
            title: item.packageId.title,
            destination: item.packageId.destination,
            price: item.packageId.price,
            originalPrice: item.packageId.originalPrice,
            thumbnail: item.packageId.thumbnail,
            type: item.packageId.type,
            category: item.packageId.category,
            duration: item.packageId.duration
          }
        }));

        return res.status(200).json({
          success: true,
          wishlist: formattedWishlist,
          count: formattedWishlist.length
        });
      } catch (error: unknown) {
        console.error('Error fetching wishlist:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to fetch wishlist'
        });
      }
    }

    if (req.method === 'POST') {
      // Add package to wishlist
      const { packageId } = req.body;

      if (!packageId) {
        return res.status(400).json({
          success: false,
          message: 'Package ID is required'
        });
      }

      try {
        // Check if package exists
        const packageExists = await Package.findById(packageId);
        if (!packageExists) {
          return res.status(404).json({
            success: false,
            message: 'Package not found'
          });
        }

        // Check if already in wishlist
        const existingWishlistItem = await Wishlist.findOne({ userId, packageId });
        if (existingWishlistItem) {
          return res.status(400).json({
            success: false,
            message: 'Package is already in your wishlist'
          });
        }

        // Create new wishlist item
        const wishlistItem = new Wishlist({
          userId,
          packageId,
          createdAt: new Date()
        });

        await wishlistItem.save();

        // Create interface for populated wishlist item
        interface PopulatedWishlistItem {
          _id: string;
          userId: string;
          packageId: {
            _id: string;
            title: string;
            destination: string;
            price: number;
            originalPrice?: number;
            thumbnail: string;
            type: string;
            category: string;
            duration: number;
          };
          createdAt: Date;
        }

        // Populate package details for response
        const populatedItem = await Wishlist.findById(wishlistItem._id)
          .populate({
            path: 'packageId',
            model: 'Package',
            select: 'id title destination price thumbnail type category duration originalPrice'
          })
          .lean() as PopulatedWishlistItem | null;

        if (!populatedItem || !populatedItem.packageId) {
          return res.status(500).json({
            success: false,
            message: 'Failed to retrieve wishlist item details'
          });
        }

        const formattedWishlistItem = {
          id: populatedItem._id,
          packageId: populatedItem.packageId._id,
          userId: populatedItem.userId,
          addedAt: populatedItem.createdAt,
          package: {
            id: populatedItem.packageId._id,
            title: populatedItem.packageId.title,
            destination: populatedItem.packageId.destination,
            price: populatedItem.packageId.price,
            originalPrice: populatedItem.packageId.originalPrice,
            thumbnail: populatedItem.packageId.thumbnail,
            type: populatedItem.packageId.type,
            category: populatedItem.packageId.category,
            duration: populatedItem.packageId.duration
          }
        };

        return res.status(201).json({
          success: true,
          message: 'Package added to wishlist successfully',
          wishlistItem: formattedWishlistItem
        });
      } catch (error: unknown) {
        console.error('Error adding to wishlist:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to add package to wishlist'
        });
      }
    }

    // Method not allowed
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`
    });

  } catch (error: unknown) {
    console.error('Wishlist API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}