// // src/pages/api/admin/bookings/[id]/status.ts
// import type { NextApiResponse } from 'next';
// import connectDB from '@/lib/db/connection';
// import Booking from '@/lib/db/models/Booking';
// import { requireAdmin, AuthenticatedRequest } from '@/lib/auth/middleware';

// export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
//   if (req.method !== 'PATCH') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   return requireAdmin(async (req: AuthenticatedRequest, res: NextApiResponse) => {
//     try {
//       await connectDB();
      
//       const { id } = req.query;
//       const { status } = req.body;

//       if (!id || !status) {
//         return res.status(400).json({
//           success: false,
//           message: 'Booking ID and status are required'
//         });
//       }

//       const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
//       if (!validStatuses.includes(status)) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
//         });
//       }

//       const booking = await Booking.findByIdAndUpdate(
//         id,
//         { 
//           status,
//           updatedAt: new Date(),
//           updatedBy: req.user?.id
//         },
//         { new: true }
//       );

//       if (!booking) {
//         return res.status(404).json({
//           success: false,
//           message: 'Booking not found'
//         });
//       }

//       console.log(`✅ Updated booking ${id} status to ${status}`);

//       res.status(200).json({
//         success: true,
//         booking,
//         message: 'Booking status updated successfully'
//       });

//     } catch (error: any) {
//       console.error('❌ Booking status update error:', error);
      
//       res.status(500).json({
//         success: false,
//         message: 'Failed to update booking status',
//         error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
//       });
//     }
//   })(req, res);
// }





// src/pages/api/admin/bookings/[id]/status.ts
import type { NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import Booking from '@/lib/db/models/Booking';
import { requireAdmin, AuthenticatedRequest } from '@/lib/auth/middleware';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  return requireAdmin(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      await connectDB();
      
      const { id } = req.query;
      const { status } = req.body;

      if (!id || !status) {
        return res.status(400).json({
          success: false,
          message: 'Booking ID and status are required'
        });
      }

      const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
        });
      }

      const booking = await Booking.findByIdAndUpdate(
        id,
        { 
          status,
          updatedAt: new Date(),
          updatedBy: req.user?._id
        },
        { new: true }
      );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      console.log(`✅ Updated booking ${id} status to ${status}`);

      res.status(200).json({
        success: true,
        booking,
        message: 'Booking status updated successfully'
      });

    } catch (error) {
      console.error('❌ Booking status update error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Internal server error';
      
      res.status(500).json({
        success: false,
        message: 'Failed to update booking status',
        error: process.env.NODE_ENV === 'development' ? errorMessage : 'Internal server error'
      });
    }
  })(req, res);
}