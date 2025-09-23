// // src/pages/api/bookings/create.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';
// import connectDB from '@/lib/db/connection';
// import Booking from '@/lib/db/models/Booking';
// import Package from '@/lib/db/models/Package';
// import User from '@/lib/db/models/User';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   try {
//     await connectDB();

//     // Verify authentication
//     const token = req.headers.authorization?.replace('Bearer ', '');
//     if (!token) {
//       return res.status(401).json({ success: false, message: 'Authentication required' });
//     }

//     const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
//     const decoded = jwt.verify(token, JWT_SECRET) as any;
    
//     const {
//       packageId,
//       travelDate,
//       adults,
//       children,
//       totalAmount,
//       specialRequests,
//       customerInfo,
//       packageDetails
//     } = req.body;

//     console.log('Received booking data:', req.body); // Debug log

//     // Validate required fields
//     if (!packageId || !travelDate || !adults || !totalAmount || !customerInfo) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required booking information' 
//       });
//     }

//     // Verify package exists
//     const package_ = await Package.findById(packageId);
//     if (!package_) {
//       return res.status(404).json({ success: false, message: 'Package not found' });
//     }

//     // Verify user exists
//     const user = await User.findById(decoded.userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     // Check if travel date is in the future
//     const travelDateTime = new Date(travelDate);
//     if (travelDateTime <= new Date()) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Travel date must be in the future' 
//       });
//     }

//     // Calculate end date
//     const endDateTime = new Date(travelDateTime);
//     endDateTime.setDate(endDateTime.getDate() + (packageDetails?.duration || package_.duration || 1));

//     // Generate booking reference manually
//     const bookingReference = 'TQ' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase();
    
//     // Create booking with both old and new schema compatibility
//     const bookingData = {
//       userId: decoded.userId,
//       packageId,
      
//       // Legacy fields (required by original schema)
//       travelers: parseInt(adults) + parseInt(children || 0),
//       startDate: travelDateTime,
//       endDate: endDateTime,
//       bookingReference: bookingReference, // Explicitly set this
      
//       // New fields for payment integration
//       travelDate: travelDateTime,
//       travelersCount: {
//         adults: parseInt(adults),
//         children: parseInt(children) || 0
//       },
//       packageDetails: packageDetails || {
//         title: package_.title,
//         destination: package_.destination,
//         duration: package_.duration,
//         type: package_.type
//       },
      
//       // Common fields
//       totalAmount: parseFloat(totalAmount),
//       paidAmount: 0,
//       status: 'pending',
//       paymentStatus: 'pending',
//       specialRequests: specialRequests || '',
      
//       // Contact details (both formats for compatibility)
//       contactDetails: customerInfo,
//       customerInfo: customerInfo,
      
//       // Empty travelers info for now (can be filled later)
//       travelersInfo: []
//     };

//     console.log('Creating booking with data:', bookingData); // Debug log

//     const booking = new Booking(bookingData);
//     await booking.save();

//     console.log('Booking created successfully:', booking._id); // Debug log

//     return res.status(201).json({
//       success: true,
//       message: 'Booking created successfully',
//       booking: {
//         _id: booking._id,
//         bookingId: booking.bookingId || booking.bookingReference,
//         status: booking.status,
//         totalAmount: booking.totalAmount
//       }
//     });

//   } catch (error) {
//     console.error('Booking creation error:', error);
    
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ success: false, message: 'Invalid token' });
//     }
    
//     if (error.name === 'ValidationError') {
//       const validationErrors = Object.values(error.errors).map((err: any) => err.message);
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Validation failed: ' + validationErrors.join(', ') 
//       });
//     }
    
//     return res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// }











// src/pages/api/bookings/create.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db/connection';
import Booking from '@/lib/db/models/Booking';
import Package from '@/lib/db/models/Package';
import User from '@/lib/db/models/User';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  [key: string]: unknown;
}

interface ValidationError extends Error {
  name: string;
  errors: Record<string, { message: string }>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Verify authentication
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    const {
      packageId,
      travelDate,
      adults,
      children,
      totalAmount,
      specialRequests,
      customerInfo,
      packageDetails
    } = req.body;

    console.log('Received booking data:', req.body); // Debug log

    // Validate required fields
    if (!packageId || !travelDate || !adults || !totalAmount || !customerInfo) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required booking information' 
      });
    }

    // Verify package exists
    const package_ = await Package.findById(packageId);
    if (!package_) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }

    // Verify user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if travel date is in the future
    const travelDateTime = new Date(travelDate);
    if (travelDateTime <= new Date()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Travel date must be in the future' 
      });
    }

    // Calculate end date
    const endDateTime = new Date(travelDateTime);
    endDateTime.setDate(endDateTime.getDate() + (packageDetails?.duration || package_.duration || 1));

    // Generate booking reference manually
    const bookingReference = 'TQ' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase();
    
    // Create booking with both old and new schema compatibility
    const bookingData = {
      userId: decoded.userId,
      packageId,
      
      // Legacy fields (required by original schema)
      travelers: parseInt(adults) + parseInt(children || 0),
      startDate: travelDateTime,
      endDate: endDateTime,
      bookingReference: bookingReference,
      
      // Set bookingId to bookingReference for consistency
      bookingId: bookingReference,
      
      // New fields for payment integration
      travelDate: travelDateTime,
      travelersCount: {
        adults: parseInt(adults),
        children: parseInt(children) || 0
      },
      packageDetails: packageDetails || {
        title: package_.title,
        destination: package_.destination,
        duration: package_.duration,
        type: package_.type
      },
      
      // Common fields
      totalAmount: parseFloat(totalAmount),
      paidAmount: 0,
      status: 'pending',
      paymentStatus: 'pending',
      specialRequests: specialRequests || '',
      
      // Contact details (both formats for compatibility)
      contactDetails: customerInfo,
      customerInfo: customerInfo,
      
      // Empty travelers info for now (can be filled later)
      travelersInfo: []
    };

    console.log('Creating booking with data:', bookingData); // Debug log

    const booking = new Booking(bookingData);
    await booking.save();

    console.log('Booking created successfully:', booking._id); // Debug log

    return res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: {
        _id: booking._id,
        bookingId: booking.bookingId || booking.bookingReference,
        status: booking.status,
        totalAmount: booking.totalAmount
      }
    });

  } catch (error: unknown) {
    console.error('Booking creation error:', error);
    
    if ((error as Error).name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    
    if ((error as ValidationError).name === 'ValidationError') {
      const validationErrors = Object.values((error as ValidationError).errors).map((err) => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed: ' + validationErrors.join(', ') 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}