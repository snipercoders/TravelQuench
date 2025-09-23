// // src/pages/api/bookings/[id].ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';
// import connectDB from '@/lib/db/connection';
// import Booking from '@/lib/db/models/Booking';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;

//   try {
//     await connectDB();

//     // Verify authentication
//     const token = req.headers.authorization?.replace('Bearer ', '');
//     if (!token) {
//       return res.status(401).json({ success: false, message: 'Authentication required' });
//     }

//     const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
//     const decoded = jwt.verify(token, JWT_SECRET) as any;

//     if (req.method === 'GET') {
//       const booking = await Booking.findById(id);
      
//       if (!booking) {
//         return res.status(404).json({ success: false, message: 'Booking not found' });
//       }

//       // Users can only view their own bookings (unless admin)
//       if (booking.userId.toString() !== decoded.userId && decoded.role !== 'admin') {
//         return res.status(403).json({ success: false, message: 'Access denied' });
//       }

//       return res.status(200).json({
//         success: true,
//         booking
//       });
//     }

//     if (req.method === 'PATCH') {
//       const booking = await Booking.findById(id);
      
//       if (!booking) {
//         return res.status(404).json({ success: false, message: 'Booking not found' });
//       }

//       // Users can only update their own bookings (unless admin)
//       if (booking.userId.toString() !== decoded.userId && decoded.role !== 'admin') {
//         return res.status(403).json({ success: false, message: 'Access denied' });
//       }

//       const allowedUpdates = ['paymentStatus', 'status', 'specialRequests'];
//       const updates = {};
      
//       Object.keys(req.body).forEach(key => {
//         if (allowedUpdates.includes(key) || decoded.role === 'admin') {
//           updates[key] = req.body[key];
//         }
//       });

//       const updatedBooking = await Booking.findByIdAndUpdate(
//         id,
//         { ...updates, updatedAt: new Date() },
//         { new: true }
//       );

//       return res.status(200).json({
//         success: true,
//         message: 'Booking updated successfully',
//         booking: updatedBooking
//       });
//     }

//     return res.status(405).json({ success: false, message: 'Method not allowed' });

//   } catch (error) {
//     console.error('Booking operation error:', error);
    
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ success: false, message: 'Invalid token' });
//     }
    
//     return res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// }








// src/pages/api/bookings/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db/connection';
import Booking from '@/lib/db/models/Booking';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  [key: string]: unknown;
}

interface UpdateData {
  [key: string]: unknown;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    await connectDB();

    // Verify authentication
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (req.method === 'GET') {
      const booking = await Booking.findById(id);
      
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      // Users can only view their own bookings (unless admin)
      if (booking.userId.toString() !== decoded.userId && decoded.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }

      return res.status(200).json({
        success: true,
        booking
      });
    }

    if (req.method === 'PATCH') {
      const booking = await Booking.findById(id);
      
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      // Users can only update their own bookings (unless admin)
      if (booking.userId.toString() !== decoded.userId && decoded.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }

      const allowedUpdates = ['paymentStatus', 'status', 'specialRequests'];
      const updates: UpdateData = {};
      
      Object.keys(req.body).forEach(key => {
        if (allowedUpdates.includes(key) || decoded.role === 'admin') {
          updates[key] = req.body[key];
        }
      });

      const updatedBooking = await Booking.findByIdAndUpdate(
        id,
        { ...updates, updatedAt: new Date() },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: 'Booking updated successfully',
        booking: updatedBooking
      });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });

  } catch (error: unknown) {
    console.error('Booking operation error:', error);
    
    if ((error as Error).name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}