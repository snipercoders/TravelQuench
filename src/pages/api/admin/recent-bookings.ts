// // // src/pages/api/admin/recent-bookings.ts
// // import type { NextApiRequest, NextApiResponse } from 'next';
// // import connectDB from '@/lib/db/connection';
// // import User from '@/lib/db/models/User';
// // import Booking from '@/lib/db/models/Booking';
// // import Package from '@/lib/db/models/Package';
// // import { verifyToken } from '@/lib/auth/utils';

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   if (req.method !== 'GET') {
// //     return res.status(405).json({ success: false, message: 'Method not allowed' });
// //   }

// //   try {
// //     await connectDB();

// //     // Verify admin access
// //     const token = req.cookies['auth-token'];
// //     if (!token) {
// //       return res.status(401).json({ success: false, message: 'No token provided' });
// //     }

// //     const decoded = verifyToken(token);
// //     if (!decoded) {
// //       return res.status(401).json({ success: false, message: 'Invalid token' });
// //     }

// //     const user = await User.findById(decoded.userId);
// //     if (!user || user.role !== 'admin') {
// //       return res.status(403).json({ success: false, message: 'Admin access required' });
// //     }

// //     // Get recent bookings
// //     const recentBookings = await Booking.find()
// //       .populate('userId', 'name email')
// //       .populate('packageId', 'title destination')
// //       .sort({ createdAt: -1 })
// //       .limit(10)
// //       .lean();

// //     const formattedBookings = recentBookings.map(booking => ({
// //       id: booking._id,
// //       customerName: booking.userId?.name || 'Unknown User',
// //       packageName: booking.packageId?.title || 'Unknown Package',
// //       amount: booking.totalAmount,
// //       status: booking.status,
// //       createdAt: booking.createdAt
// //     }));

// //     res.status(200).json(formattedBookings);

// //   } catch (error) {
// //     console.error('Recent bookings error:', error);
// //     res.status(500).json({ success: false, message: 'Internal server error' });
// //   }
// // }









// // src/pages/api/admin/recent-bookings.ts - FIXED VERSION
// import type { NextApiResponse } from 'next';
// import connectDB from '@/lib/db/connection';
// // import Booking from '@/lib/db/models/Booking'; // Uncomment when you have Booking model
// import { requireAdmin, AuthenticatedRequest } from '@/lib/auth/middleware';

// export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   // Use the same middleware as your packages API
//   return requireAdmin(async (req: AuthenticatedRequest, res: NextApiResponse) => {
//     try {
//       await connectDB();
//       console.log('📋 Fetching recent bookings...');

//       // Mock booking data since you might not have Booking model yet
//       const mockBookings = [
//         {
//           id: '1',
//           customerName: 'John Doe',
//           packageName: 'Kerala Backwaters',
//           amount: 25000,
//           status: 'confirmed',
//           createdAt: new Date().toISOString()
//         },
//         {
//           id: '2',
//           customerName: 'Jane Smith', 
//           packageName: 'Goa Beach Holiday',
//           amount: 18000,
//           status: 'pending',
//           createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
//         }
//       ];

//       // If you have Booking model, replace above with:
//       /*
//       const recentBookings = await Booking.find()
//         .populate('userId', 'name email')
//         .populate('packageId', 'title destination')
//         .sort({ createdAt: -1 })
//         .limit(10)
//         .lean();

//       const formattedBookings = recentBookings.map(booking => ({
//         id: booking._id,
//         customerName: booking.userId?.name || 'Unknown User',
//         packageName: booking.packageId?.title || 'Unknown Package',
//         amount: booking.totalAmount,
//         status: booking.status,
//         createdAt: booking.createdAt
//       }));
//       */

//       console.log('✅ Recent bookings fetched');
//       res.status(200).json({ success: true, bookings: mockBookings });

//     } catch (error: any) {
//       console.error('❌ Recent bookings error:', error);
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     }
//   })(req, res);
// }





// UPDATED: src/pages/api/admin/recent-bookings.ts - Real bookings from database
// ============================================================================
import type { NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import Booking from '@/lib/db/models/Booking';
import { requireAdmin, AuthenticatedRequest } from '@/lib/auth/middleware';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  return requireAdmin(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      await connectDB();
      console.log('📋 Fetching recent bookings from database...');

      // Get REAL bookings from database
      const recentBookings = await Booking.find()
        .populate('userId', 'name email')
        .populate('packageId', 'title destination')
        .sort({ createdAt: -1 })
        .limit(10)
        .lean();

      const formattedBookings = recentBookings.map(booking => ({
        id: booking._id,
        customerName: booking.userId?.name || booking.customerDetails?.name || 'Unknown User',
        packageName: booking.packageId?.title || 'Unknown Package',
        amount: booking.pricing?.totalAmount || 0,
        status: booking.status,
        createdAt: booking.createdAt
      }));

      console.log('✅ Recent bookings fetched from database:', formattedBookings.length, 'bookings');
      res.status(200).json({ success: true, bookings: formattedBookings });

    } catch (error: any) {
      console.error('❌ Recent bookings error:', error);
      
      // If Booking model doesn't exist or no data, return empty array
      if (error.message.includes('Booking') || error.name === 'MissingSchemaError') {
        console.log('ℹ️ Booking model not found or no bookings, returning empty array');
        return res.status(200).json({ success: true, bookings: [] });
      }
      
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  })(req, res);
}



// // ============================================================================
// import type { NextApiResponse } from 'next';
// import connectDB from '@/lib/db/connection';
// import { requireAdmin, AuthenticatedRequest } from '@/lib/auth/middleware';

// export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   return requireAdmin(async (req: AuthenticatedRequest, res: NextApiResponse) => {
//     try {
//       await connectDB();
//       console.log('📋 Fetching recent bookings...');

//       // Mock booking data for now
//       const mockBookings = [
//         {
//           id: '1',
//           customerName: 'John Doe',
//           packageName: 'Kerala Backwaters Adventure',
//           amount: 25000,
//           status: 'confirmed',
//           createdAt: new Date().toISOString()
//         },
//         {
//           id: '2',
//           customerName: 'Jane Smith',
//           packageName: 'Goa Beach Holiday',
//           amount: 18000,
//           status: 'pending',
//           createdAt: new Date(Date.now() - 86400000).toISOString()
//         },
//         {
//           id: '3',
//           customerName: 'Mike Johnson',
//           packageName: 'Rajasthan Cultural Tour',
//           amount: 32000,
//           status: 'completed',
//           createdAt: new Date(Date.now() - 172800000).toISOString()
//         },
//         {
//           id: '4',
//           customerName: 'Sarah Wilson',
//           packageName: 'Himachal Adventure Trek',
//           amount: 22000,
//           status: 'confirmed',
//           createdAt: new Date(Date.now() - 259200000).toISOString()
//         },
//         {
//           id: '5',
//           customerName: 'David Brown',
//           packageName: 'Golden Triangle Tour',
//           amount: 28000,
//           status: 'pending',
//           createdAt: new Date(Date.now() - 345600000).toISOString()
//         }
//       ];

//       console.log('✅ Recent bookings fetched');
//       res.status(200).json({ success: true, bookings: mockBookings });

//     } catch (error: any) {
//       console.error('❌ Recent bookings error:', error);
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     }
//   })(req, res);
// }
