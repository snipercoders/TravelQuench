// // src/pages/api/admin/users/index.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import connectDB from '@/lib/db/connection';
// import User from '@/lib/db/models/User';
// import Booking from '@/lib/db/models/Booking';
// import { verifyToken } from '@/lib/auth/utils';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   try {
//     await connectDB();

//     // Verify admin access
//     const token = req.cookies['auth-token'];
//     if (!token) {
//       return res.status(401).json({ success: false, message: 'No token provided' });
//     }

//     const decoded = verifyToken(token);
//     if (!decoded) {
//       return res.status(401).json({ success: false, message: 'Invalid token' });
//     }

//     const user = await User.findById(decoded.userId);
//     if (!user || user.role !== 'admin') {
//       return res.status(403).json({ success: false, message: 'Admin access required' });
//     }

//     // Get all users with their booking statistics
//     const users = await User.find().select('-password').sort({ createdAt: -1 }).lean();

//     // Get booking statistics for each user
//     const usersWithStats = await Promise.all(
//       users.map(async (user) => {
//         const bookingStats = await Booking.aggregate([
//           { $match: { userId: user._id } },
//           {
//             $group: {
//               _id: null,
//               totalBookings: { $sum: 1 },
//               totalSpent: { $sum: '$totalAmount' }
//             }
//           }
//         ]);

//         const stats = bookingStats[0] || { totalBookings: 0, totalSpent: 0 };

//         return {
//           id: user._id,
//           name: user.name,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//           phone: user.phone,
//           role: user.role,
//           isEmailVerified: user.isEmailVerified,
//           profileImage: user.profileImage,
//           totalBookings: stats.totalBookings,
//           totalSpent: stats.totalSpent,
//           lastLoginAt: user.lastLoginAt,
//           createdAt: user.createdAt,
//           isActive: true // You can add this field to User model if needed
//         };
//       })
//     );

//     res.status(200).json(usersWithStats);

//   } catch (error) {
//     console.error('Users API error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// }













// src/pages/api/admin/users/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db/connection';
import User from '@/lib/db/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();

    // Verify admin authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.substring(7);
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
    
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (jwtError) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Check if user is admin
    const adminUser = await User.findById(decoded.userId);
    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    if (req.method === 'GET') {
      // Fetch all users
      const users = await User.find({})
        .select('-password')
        .sort({ createdAt: -1 });

      const usersWithStats = users.map(user => ({
        id: user._id.toString(),
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        profileImage: user.profileImage,
        totalBookings: 0, // TODO: Calculate from bookings collection
        totalSpent: 0, // TODO: Calculate from bookings collection
        lastLoginAt: user.lastLoginAt?.toISOString(),
        createdAt: user.createdAt.toISOString(),
        isActive: true, // You may need to add this field to your User model
        address: user.address,
        preferences: user.preferences
      }));

      return res.status(200).json(usersWithStats);
    }

    return res.status(405).json({ message: 'Method not allowed' });

  } catch (error) {
    console.error('Admin users API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}