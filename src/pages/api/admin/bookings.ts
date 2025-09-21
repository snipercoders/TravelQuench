// src/pages/api/admin/bookings.ts
import type { NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import Booking from '@/lib/db/models/Booking';
import Package from '@/lib/db/models/Package';
import User from '@/lib/db/models/User';
import { requireAdmin, AuthenticatedRequest } from '@/lib/auth/middleware';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  return requireAdmin(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      await connectDB();
      console.log('📋 Fetching admin bookings...');

      const { packageId, status, paymentStatus, dateRange } = req.query;

      // Build query filters
      const query: any = {};
      
      if (packageId) {
        query.packageId = packageId;
      }
      
      if (status && status !== 'all') {
        query.status = status;
      }
      
      if (paymentStatus && paymentStatus !== 'all') {
        query.paymentStatus = paymentStatus;
      }

      // Date filtering
      if (dateRange && dateRange !== 'all') {
        const now = new Date();
        let startDate: Date;
        
        switch (dateRange) {
          case 'today':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
          case 'week':
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case 'month':
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            break;
          default:
            startDate = new Date(0); // Beginning of time
        }
        
        query.createdAt = { $gte: startDate };
      }

      console.log('🔍 Query filters:', query);

      // Fetch bookings with package and user details
      const bookings = await Booking.aggregate([
        { $match: query },
        {
          $lookup: {
            from: 'packages',
            localField: 'packageId',
            foreignField: '_id',
            as: 'package'
          }
        },
        {
          $unwind: {
            path: '$package',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: {
            path: '$user',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $addFields: {
            // Standardize field names for frontend
            id: { $toString: '$_id' },
            customerName: {
              $cond: {
                if: { $ifNull: ['$customerName', false] },
                then: '$customerName',
                else: { 
                  $cond: {
                    if: { $ifNull: ['$user.name', false] },
                    then: '$user.name',
                    else: { 
                      $concat: [
                        { $ifNull: ['$user.firstName', 'Unknown'] }, 
                        ' ', 
                        { $ifNull: ['$user.lastName', 'User'] }
                      ] 
                    }
                  }
                }
              }
            },
            customerEmail: {
              $cond: {
                if: { $ifNull: ['$customerEmail', false] },
                then: '$customerEmail',
                else: { $ifNull: ['$user.email', 'No email'] }
              }
            },
            customerPhone: {
              $cond: {
                if: { $ifNull: ['$customerPhone', false] },
                then: '$customerPhone',
                else: { $ifNull: ['$user.phone', ''] }
              }
            },
            packageTitle: { $ifNull: ['$package.title', 'Package Not Found'] },
            packageDestination: { $ifNull: ['$package.destination', 'Unknown'] },
            packageDuration: { $ifNull: ['$package.duration', 0] },
            travelers: {
              $cond: {
                if: { $ifNull: ['$travelers', false] },
                then: '$travelers',
                else: {
                  $cond: {
                    if: { $ifNull: ['$numberOfTravelers', false] },
                    then: '$numberOfTravelers',
                    else: { $ifNull: ['$guestCount', 1] }
                  }
                }
              }
            },
            totalAmount: {
              $cond: {
                if: { $ifNull: ['$totalAmount', false] },
                then: '$totalAmount',
                else: {
                  $cond: {
                    if: { $ifNull: ['$payment.totalAmount', false] },
                    then: '$payment.totalAmount',
                    else: { $ifNull: ['$amount', 0] }
                  }
                }
              }
            },
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
                        else: { $ifNull: ['$amountPaid', 0] }
                      }
                    }
                  }
                }
              }
            },
            paymentStatus: {
              $cond: {
                if: { $ifNull: ['$paymentStatus', false] },
                then: '$paymentStatus',
                else: {
                  $cond: {
                    if: { $ifNull: ['$payment.status', false] },
                    then: '$payment.status',
                    else: 'pending'
                  }
                }
              }
            }
          }
        },
        {
          $project: {
            id: 1,
            customerName: 1,
            customerEmail: 1,
            customerPhone: 1,
            packageTitle: 1,
            packageDestination: 1,
            packageDuration: 1,
            travelers: 1,
            startDate: 1,
            endDate: 1,
            totalAmount: 1,
            paidAmount: 1,
            status: 1,
            paymentStatus: 1,
            specialRequests: 1,
            createdAt: 1,
            updatedAt: 1
          }
        },
        { $sort: { createdAt: -1 } }
      ]);

      console.log(`✅ Fetched ${bookings.length} bookings`);

      res.status(200).json({
        success: true,
        bookings,
        count: bookings.length,
        timestamp: new Date().toISOString()
      });

    } catch (error: any) {
      console.error('❌ Admin bookings fetch error:', error);
      
      res.status(500).json({
        success: false,
        message: 'Failed to fetch bookings',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
        bookings: []
      });
    }
  })(req, res);
}