// // // src/pages/api/admin/stats.ts


// // ============================================================================
// import type { NextApiResponse } from 'next';
// import connectDB from '@/lib/db/connection';
// import User from '@/lib/db/models/User';
// import Package from '@/lib/db/models/Package';
// import Booking from '@/lib/db/models/Booking'; // Make sure this exists
// import { requireAdmin, AuthenticatedRequest } from '@/lib/auth/middleware';

// export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   return requireAdmin(async (req: AuthenticatedRequest, res: NextApiResponse) => {
//     try {
//       await connectDB();
//       console.log('📊 Fetching admin dashboard stats...');

//       // Get REAL stats from database - no hardcoded values
//       const [
//         totalUsers,
//         totalPackages,
//         activePackages,
//         totalBookings,
//         totalRevenue,
//         pendingBookings,
//         completedBookings,
//         avgRatingResult
//       ] = await Promise.all([
//         User.countDocuments(),
//         Package.countDocuments(),
//         Package.countDocuments({ isActive: true }),
//         Booking.countDocuments(),
//         Booking.aggregate([
//           { $match: { status: { $ne: 'cancelled' } } },
//           { $group: { _id: null, total: { $sum: '$pricing.totalAmount' } } }
//         ]),
//         Booking.countDocuments({ status: 'pending' }),
//         Booking.countDocuments({ status: 'completed' }),
//         Package.aggregate([
//           { $match: { rating: { $exists: true, $gt: 0 } } },
//           { $group: { _id: null, avgRating: { $avg: '$rating' } } }
//         ])
//       ]);

//       const stats = {
//         totalUsers,
//         totalPackages,
//         totalBookings,
//         totalRevenue: totalRevenue[0]?.total || 0,
//         activePackages,
//         pendingBookings,
//         completedBookings,
//         avgRating: avgRatingResult[0]?.avgRating || 0
//       };

//       console.log('✅ Dashboard stats fetched from database:', stats);
//       res.status(200).json({ success: true, data: stats });

//     } catch (error: any) {
//       console.error('❌ Admin stats error:', error);
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     }
//   })(req, res);
// }










// // src/pages/api/admin/stats.ts
// // ============================================================================
// import type { NextApiResponse } from 'next';
// import connectDB from '@/lib/db/connection';
// import User from '@/lib/db/models/User';
// import Package from '@/lib/db/models/Package';
// import Booking from '@/lib/db/models/Booking';
// import { requireAdmin, AuthenticatedRequest } from '@/lib/auth/middleware';

// export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   return requireAdmin(async (req: AuthenticatedRequest, res: NextApiResponse) => {
//     try {
//       await connectDB();
//       console.log('📊 Fetching admin dashboard stats...');

//       // Get REAL stats from database with improved error handling
//       const [
//         totalUsers,
//         totalPackages,
//         activePackages,
//         totalBookings,
//         totalRevenueResult,
//         pendingBookings,
//         completedBookings,
//         avgRatingResult
//       ] = await Promise.all([
//         User.countDocuments().catch(() => 0),
//         Package.countDocuments().catch(() => 0),
//         Package.countDocuments({ isActive: true }).catch(() => 0),
//         Booking.countDocuments().catch(() => 0),
        
//         // Enhanced revenue calculation with multiple fallback paths
//         Booking.aggregate([
//           { 
//             $match: { 
//               status: { $nin: ['cancelled', 'failed'] }, // Exclude cancelled and failed bookings
//               $or: [
//                 { 'pricing.totalAmount': { $exists: true, $gte: 0 } },
//                 { 'amount': { $exists: true, $gte: 0 } },
//                 { 'totalAmount': { $exists: true, $gte: 0 } }
//               ]
//             }
//           },
//           { 
//             $addFields: {
//               // Try multiple field paths for amount
//               calculatedAmount: {
//                 $cond: {
//                   if: { $ifNull: ['$pricing.totalAmount', false] },
//                   then: '$pricing.totalAmount',
//                   else: {
//                     $cond: {
//                       if: { $ifNull: ['$amount', false] },
//                       then: '$amount',
//                       else: { $ifNull: ['$totalAmount', 0] }
//                     }
//                   }
//                 }
//               }
//             }
//           },
//           { 
//             $group: { 
//               _id: null, 
//               total: { $sum: '$calculatedAmount' },
//               count: { $sum: 1 }
//             } 
//           }
//         ]).catch(() => [{ total: 0, count: 0 }]),
        
//         Booking.countDocuments({ status: 'pending' }).catch(() => 0),
//         Booking.countDocuments({ status: 'completed' }).catch(() => 0),
        
//         // Enhanced rating calculation
//         Package.aggregate([
//           { 
//             $match: { 
//               $and: [
//                 { rating: { $exists: true } },
//                 { rating: { $type: 'number' } },
//                 { rating: { $gte: 0 } },
//                 { rating: { $lte: 5 } }
//               ]
//             }
//           },
//           { 
//             $group: { 
//               _id: null, 
//               avgRating: { $avg: '$rating' },
//               count: { $sum: 1 }
//             } 
//           }
//         ]).catch(() => [{ avgRating: 0, count: 0 }])
//       ]);

//       // Process and validate results
//       const revenueData = Array.isArray(totalRevenueResult) && totalRevenueResult.length > 0 
//         ? totalRevenueResult[0] 
//         : { total: 0, count: 0 };

//       const ratingData = Array.isArray(avgRatingResult) && avgRatingResult.length > 0 
//         ? avgRatingResult[0] 
//         : { avgRating: 0, count: 0 };

//       const stats = {
//         totalUsers: Math.max(0, totalUsers || 0),
//         totalPackages: Math.max(0, totalPackages || 0),
//         totalBookings: Math.max(0, totalBookings || 0),
//         totalRevenue: Math.max(0, Math.round((revenueData.total || 0) * 100) / 100), // Round to 2 decimal places
//         activePackages: Math.max(0, activePackages || 0),
//         pendingBookings: Math.max(0, pendingBookings || 0),
//         completedBookings: Math.max(0, completedBookings || 0),
//         avgRating: Math.max(0, Math.round((ratingData.avgRating || 0) * 10) / 10), // Round to 1 decimal place
        
//         // Additional debug info (remove in production)
//         debug: {
//           revenueCount: revenueData.count || 0,
//           ratingCount: ratingData.count || 0,
//           timestamp: new Date().toISOString()
//         }
//       };

//       console.log('✅ Dashboard stats calculated:', {
//         ...stats,
//         debug: undefined // Don't log debug info
//       });
      
//       console.log('🔍 Revenue calculation details:', {
//         totalRevenueBookings: revenueData.count,
//         rawTotal: revenueData.total,
//         finalTotal: stats.totalRevenue
//       });

//       res.status(200).json({ 
//         success: true, 
//         data: stats,
//         timestamp: new Date().toISOString()
//       });

//     } catch (error: any) {
//       console.error('❌ Admin stats error:', error);
      
//       // Return default stats on error instead of failing completely
//       const defaultStats = {
//         totalUsers: 0,
//         totalPackages: 0,
//         totalBookings: 0,
//         totalRevenue: 0,
//         activePackages: 0,
//         pendingBookings: 0,
//         completedBookings: 0,
//         avgRating: 0,
//         error: true,
//         errorMessage: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
//       };

//       res.status(500).json({ 
//         success: false, 
//         message: 'Internal server error',
//         data: defaultStats
//       });
//     }
//   })(req, res);
// }














// src/pages/api/admin/stats.ts
// ============================================================================
import type { NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import User from '@/lib/db/models/User';
import Package from '@/lib/db/models/Package';
import Booking from '@/lib/db/models/Booking';
import { requireAdmin, AuthenticatedRequest } from '@/lib/auth/middleware';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  return requireAdmin(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      await connectDB();
      console.log('📊 Fetching admin dashboard stats...');

      // Get REAL stats from database with improved error handling
      const [
        totalUsers,
        totalPackages,
        activePackages,
        totalBookings,
        totalRevenueResult,
        pendingBookings,
        completedBookings,
        avgRatingResult
      ] = await Promise.all([
        User.countDocuments().catch(() => 0),
        Package.countDocuments().catch(() => 0),
        Package.countDocuments({ isActive: true }).catch(() => 0),
        Booking.countDocuments().catch(() => 0),
        
        // Enhanced revenue calculation - focus on PAID amounts only
        Booking.aggregate([
          { 
            $match: { 
              status: { $nin: ['cancelled', 'failed'] }, // Exclude cancelled and failed bookings
              $or: [
                { 'payment.paidAmount': { $exists: true, $gte: 0 } },
                { 'paidAmount': { $exists: true, $gte: 0 } },
                { 'payment.amount': { $exists: true, $gte: 0 } },
                { 'paymentAmount': { $exists: true, $gte: 0 } },
                { 'amountPaid': { $exists: true, $gte: 0 } }
              ]
            }
          },
          { 
            $addFields: {
              // Try multiple field paths for PAID amount (not package price)
              paidAmount: {
                $cond: {
                  if: { $ifNull: ['$payment.paidAmount', false] },
                  then: '$payment.paidAmount',
                  else: {
                    $cond: {
                      if: { $ifNull: ['$paidAmount', false] },
                      then: '$paidAmount',
                      else: {
                        $cond: {
                          if: { $ifNull: ['$payment.amount', false] },
                          then: '$payment.amount',
                          else: {
                            $cond: {
                              if: { $ifNull: ['$paymentAmount', false] },
                              then: '$paymentAmount',
                              else: { $ifNull: ['$amountPaid', 0] }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          { 
            $group: { 
              _id: null, 
              total: { $sum: '$paidAmount' },
              count: { $sum: 1 }
            } 
          }
        ]).catch(() => [{ total: 0, count: 0 }]),
        
        Booking.countDocuments({ status: 'pending' }).catch(() => 0),
        Booking.countDocuments({ status: 'completed' }).catch(() => 0),
        
        // Enhanced rating calculation
        Package.aggregate([
          { 
            $match: { 
              $and: [
                { rating: { $exists: true } },
                { rating: { $type: 'number' } },
                { rating: { $gte: 0 } },
                { rating: { $lte: 5 } }
              ]
            }
          },
          { 
            $group: { 
              _id: null, 
              avgRating: { $avg: '$rating' },
              count: { $sum: 1 }
            } 
          }
        ]).catch(() => [{ avgRating: 0, count: 0 }])
      ]);

      // Process and validate results
      const revenueData = Array.isArray(totalRevenueResult) && totalRevenueResult.length > 0 
        ? totalRevenueResult[0] 
        : { total: 0, count: 0 };

      const ratingData = Array.isArray(avgRatingResult) && avgRatingResult.length > 0 
        ? avgRatingResult[0] 
        : { avgRating: 0, count: 0 };

      const stats = {
        totalUsers: Math.max(0, totalUsers || 0),
        totalPackages: Math.max(0, totalPackages || 0),
        totalBookings: Math.max(0, totalBookings || 0),
        totalRevenue: Math.max(0, Math.round((revenueData.total || 0) * 100) / 100), // Round to 2 decimal places
        activePackages: Math.max(0, activePackages || 0),
        pendingBookings: Math.max(0, pendingBookings || 0),
        completedBookings: Math.max(0, completedBookings || 0),
        avgRating: Math.max(0, Math.round((ratingData.avgRating || 0) * 10) / 10), // Round to 1 decimal place
        
        // Additional debug info (remove in production)
        debug: {
          revenueCount: revenueData.count || 0,
          ratingCount: ratingData.count || 0,
          timestamp: new Date().toISOString()
        }
      };

      console.log('✅ Dashboard stats calculated:', {
        ...stats,
        debug: undefined // Don't log debug info
      });
      
      console.log('🔍 Revenue calculation details:', {
        totalPaidBookings: revenueData.count,
        rawPaidTotal: revenueData.total,
        finalPaidRevenue: stats.totalRevenue
      });

      res.status(200).json({ 
        success: true, 
        data: stats,
        timestamp: new Date().toISOString()
      });

    } catch (error: any) {
      console.error('❌ Admin stats error:', error);
      
      // Return default stats on error instead of failing completely
      const defaultStats = {
        totalUsers: 0,
        totalPackages: 0,
        totalBookings: 0,
        totalRevenue: 0,
        activePackages: 0,
        pendingBookings: 0,
        completedBookings: 0,
        avgRating: 0,
        error: true,
        errorMessage: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      };

      res.status(500).json({ 
        success: false, 
        message: 'Internal server error',
        data: defaultStats
      });
    }
  })(req, res);
}