// // src/pages/api/payments/verify.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';
// import connectDB from '@/lib/db/connection';
// import Booking from '@/lib/db/models/Booking';
// import crypto from 'crypto';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   try {
//     await connectDB();

//     const token = req.headers.authorization?.replace('Bearer ', '');
//     if (!token) {
//       return res.status(401).json({ success: false, message: 'Authentication required' });
//     }

//     const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
//     const decoded = jwt.verify(token, JWT_SECRET) as any;
//     const userId = decoded.userId;

//     const { 
//       razorpay_order_id, 
//       razorpay_payment_id, 
//       razorpay_signature,
//       bookingId 
//     } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
//       return res.status(400).json({ success: false, message: 'Missing required fields' });
//     }

//     // Verify signature
//     const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!);
//     shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//     const digest = shasum.digest('hex');

//     if (digest !== razorpay_signature) {
//       return res.status(400).json({ success: false, message: 'Invalid payment signature' });
//     }

//     // Find and update booking
//     const booking = await Booking.findById(bookingId);
    
//     if (!booking) {
//       return res.status(404).json({ success: false, message: 'Booking not found' });
//     }

//     if (booking.userId.toString() !== userId) {
//       return res.status(403).json({ success: false, message: 'Access denied' });
//     }

//     // Update booking with payment details
//     const updatedBooking = await Booking.findByIdAndUpdate(
//       bookingId,
//       {
//         status: 'confirmed',
//         paymentStatus: 'completed',
//         paymentId: razorpay_payment_id,
//         razorpayOrderId: razorpay_order_id,
//         paymentMethod: 'razorpay',
//         paidAt: new Date(),
//         updatedAt: new Date()
//       },
//       { new: true }
//     );

//     // Send confirmation email/SMS (implement as needed)
//     try {
//       await sendConfirmationNotifications(updatedBooking);
//     } catch (notificationError) {
//       console.error('Failed to send notifications:', notificationError);
//       // Don't fail the payment if notifications fail
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Payment verified and booking confirmed',
//       booking: {
//         _id: updatedBooking._id,
//         bookingId: updatedBooking.bookingId,
//         status: updatedBooking.status,
//         paymentStatus: updatedBooking.paymentStatus,
//         paymentId: updatedBooking.paymentId
//       }
//     });

//   } catch (error) {
//     console.error('Payment verification error:', error);
    
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ success: false, message: 'Invalid token' });
//     }
    
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// }

// // Helper function to send confirmation notifications
// const sendConfirmationNotifications = async (booking: any) => {
//   try {
//     // Email confirmation
//     console.log(`Sending confirmation email for booking ${booking.bookingId || booking.bookingReference}`);
    
//     // SMS/WhatsApp notification
//     console.log(`Sending WhatsApp notification for booking ${booking.bookingId || booking.bookingReference}`);
    
   
    
//   } catch (error) {
//     console.error('Notification sending error:', error);
//     throw error;
//   }
// };

// // Email template generator
// const generateEmailTemplate = (booking: any) => {
//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Booking Confirmation</title>
//       <style>
//         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//         .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//         .header { background: #3B82F6; color: white; padding: 20px; text-align: center; }
//         .content { padding: 20px; background: #f9f9f9; }
//         .booking-details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
//         .footer { text-align: center; padding: 20px; color: #666; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">
//           <h1>Booking Confirmed!</h1>
//           <p>Travel Quench</p>
//         </div>
//         <div class="content">
//           <h2>Hello ${booking.customerInfo?.name || booking.contactDetails?.name},</h2>
//           <p>Your booking has been confirmed successfully!</p>
          
//           <div class="booking-details">
//             <h3>Booking Details</h3>
//             <p><strong>Booking ID:</strong> ${booking.bookingId || booking.bookingReference}</p>
//             <p><strong>Package:</strong> ${booking.packageDetails?.title || 'Travel Package'}</p>
//             <p><strong>Destination:</strong> ${booking.packageDetails?.destination || 'N/A'}</p>
//             <p><strong>Travel Date:</strong> ${booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'N/A'}</p>
//             <p><strong>Travelers:</strong> ${booking.travelersCount?.adults || booking.travelers || 1} Adults${booking.travelersCount?.children ? `, ${booking.travelersCount.children} Children` : ''}</p>
//             <p><strong>Total Amount:</strong> ₹${booking.totalAmount?.toLocaleString()}</p>
//             <p><strong>Payment ID:</strong> ${booking.paymentId}</p>
//           </div>
          
//           <p>We'll contact you 48 hours before your travel date with final details.</p>
          
//           <p>For any queries, contact us at:</p>
//           <ul>
//             <li>Phone: +91 12345 67890</li>
//             <li>Email: support@travelquench.com</li>
//           </ul>
//         </div>
//         <div class="footer">
//           <p>Thank you for choosing Travel Quench!</p>
//           <p>Visit us at www.travelquench.com</p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;
// };







// // src/pages/api/payments/verify.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import connectDB from '@/lib/db/connection';
// import Booking from '@/lib/db/models/Booking';
// import crypto from 'crypto';

// interface DecodedToken extends JwtPayload {
//   userId: string;
// }

// interface BookingData {
//   _id: string;
//   bookingId?: string;
//   bookingReference?: string;
//   status: string;
//   paymentStatus: string;
//   paymentId: string;
//   userId: string;
//   totalAmount?: number;
//   customerInfo?: {
//     name: string;
//     email?: string;
//     phone?: string;
//   };
//   contactDetails?: {
//     name: string;
//     email?: string;
//     phone?: string;
//   };
//   packageDetails?: {
//     title: string;
//     destination?: string;
//   };
//   travelDate?: Date;
//   travelersCount?: {
//     adults: number;
//     children?: number;
//   };
//   travelers?: number;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   try {
//     await connectDB();

//     const token = req.headers.authorization?.replace('Bearer ', '');
//     if (!token) {
//       return res.status(401).json({ success: false, message: 'Authentication required' });
//     }

//     const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
//     const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
//     const userId = decoded.userId;

//     const { 
//       razorpay_order_id, 
//       razorpay_payment_id, 
//       razorpay_signature,
//       bookingId 
//     } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
//       return res.status(400).json({ success: false, message: 'Missing required fields' });
//     }

//     // Verify signature
//     const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!);
//     shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//     const digest = shasum.digest('hex');

//     if (digest !== razorpay_signature) {
//       return res.status(400).json({ success: false, message: 'Invalid payment signature' });
//     }

//     // Find and update booking
//     const booking = await Booking.findById(bookingId);
    
//     if (!booking) {
//       return res.status(404).json({ success: false, message: 'Booking not found' });
//     }

//     if (booking.userId.toString() !== userId) {
//       return res.status(403).json({ success: false, message: 'Access denied' });
//     }

//     // Update booking with payment details
//     const updatedBooking = await Booking.findByIdAndUpdate(
//       bookingId,
//       {
//         status: 'confirmed',
//         paymentStatus: 'completed',
//         paymentId: razorpay_payment_id,
//         razorpayOrderId: razorpay_order_id,
//         paymentMethod: 'razorpay',
//         paidAt: new Date(),
//         updatedAt: new Date()
//       },
//       { new: true }
//     );

//     // Send confirmation email/SMS (implement as needed)
//     try {
//       await sendConfirmationNotifications(updatedBooking as BookingData);
//     } catch (notificationError) {
//       console.error('Failed to send notifications:', notificationError);
//       // Don't fail the payment if notifications fail
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Payment verified and booking confirmed',
//       booking: {
//         _id: updatedBooking._id,
//         bookingId: updatedBooking.bookingId,
//         status: updatedBooking.status,
//         paymentStatus: updatedBooking.paymentStatus,
//         paymentId: updatedBooking.paymentId
//       }
//     });

//   } catch (error) {
//     console.error('Payment verification error:', error);
    
//     if (error instanceof Error && error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ success: false, message: 'Invalid token' });
//     }
    
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// }

// // Helper function to send confirmation notifications
// const sendConfirmationNotifications = async (booking: BookingData) => {
//   try {
//     // Email confirmation
//     console.log(`Sending confirmation email for booking ${booking.bookingId || booking.bookingReference}`);
    
//     // SMS/WhatsApp notification
//     console.log(`Sending WhatsApp notification for booking ${booking.bookingId || booking.bookingReference}`);
    
//     // Generate email template for future use
//     // const emailTemplate = generateEmailTemplate(booking);
//     console.log('Email template generated for booking confirmation');
    
//   } catch (error) {
//     console.error('Notification sending error:', error);
//     throw error;
//   }
// };

// // Email template generator
// const generateEmailTemplate = (booking: BookingData) => {
//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Booking Confirmation</title>
//       <style>
//         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//         .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//         .header { background: #3B82F6; color: white; padding: 20px; text-align: center; }
//         .content { padding: 20px; background: #f9f9f9; }
//         .booking-details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
//         .footer { text-align: center; padding: 20px; color: #666; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">
//           <h1>Booking Confirmed!</h1>
//           <p>Travel Quench</p>
//         </div>
//         <div class="content">
//           <h2>Hello ${booking.customerInfo?.name || booking.contactDetails?.name || 'Traveler'},</h2>
//           <p>Your booking has been confirmed successfully!</p>
          
//           <div class="booking-details">
//             <h3>Booking Details</h3>
//             <p><strong>Booking ID:</strong> ${booking.bookingId || booking.bookingReference}</p>
//             <p><strong>Package:</strong> ${booking.packageDetails?.title || 'Travel Package'}</p>
//             <p><strong>Destination:</strong> ${booking.packageDetails?.destination || 'N/A'}</p>
//             <p><strong>Travel Date:</strong> ${booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'N/A'}</p>
//             <p><strong>Travelers:</strong> ${booking.travelersCount?.adults || booking.travelers || 1} Adults${booking.travelersCount?.children ? `, ${booking.travelersCount.children} Children` : ''}</p>
//             <p><strong>Total Amount:</strong> ₹${booking.totalAmount?.toLocaleString() || 'N/A'}</p>
//             <p><strong>Payment ID:</strong> ${booking.paymentId}</p>
//           </div>
          
//           <p>We'll contact you 48 hours before your travel date with final details.</p>
          
//           <p>For any queries, contact us at:</p>
//           <ul>
//             <li>Phone: +91 12345 67890</li>
//             <li>Email: support@travelquench.com</li>
//           </ul>
//         </div>
//         <div class="footer">
//           <p>Thank you for choosing Travel Quench!</p>
//           <p>Visit us at www.travelquench.com</p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;
// };






// import { NextApiRequest, NextApiResponse } from 'next';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import connectDB from '@/lib/db/connection';
// import Booking from '@/lib/db/models/Booking';
// import crypto from 'crypto';

// interface DecodedToken extends JwtPayload {
//   userId: string;
// }

// interface BookingData {
//   _id: string;
//   bookingId?: string;
//   bookingReference?: string;
//   status: string;
//   paymentStatus: string;
//   paymentId: string;
//   userId: string;
//   totalAmount?: number;
//   customerInfo?: {
//     name: string;
//     email?: string;
//     phone?: string;
//   };
//   contactDetails?: {
//     name: string;
//     email?: string;
//     phone?: string;
//   };
//   packageDetails?: {
//     title: string;
//     destination?: string;
//   };
//   travelDate?: Date;
//   travelersCount?: {
//     adults: number;
//     children?: number;
//   };
//   travelers?: number;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   try {
//     await connectDB();

//     const token = req.headers.authorization?.replace('Bearer ', '');
//     if (!token) {
//       return res.status(401).json({ success: false, message: 'Authentication required' });
//     }

//     const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
//     const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
//     const userId = decoded.userId;

//     const { 
//       razorpay_order_id, 
//       razorpay_payment_id, 
//       razorpay_signature,
//       bookingId 
//     } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
//       return res.status(400).json({ success: false, message: 'Missing required fields' });
//     }

//     // Verify signature
//     const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!);
//     shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//     const digest = shasum.digest('hex');

//     if (digest !== razorpay_signature) {
//       return res.status(400).json({ success: false, message: 'Invalid payment signature' });
//     }

//     // Find and update booking
//     const booking = await Booking.findById(bookingId);
    
//     if (!booking) {
//       return res.status(404).json({ success: false, message: 'Booking not found' });
//     }

//     if (booking.userId.toString() !== userId) {
//       return res.status(403).json({ success: false, message: 'Access denied' });
//     }

//     // Update booking with payment details
//     const updatedBooking = await Booking.findByIdAndUpdate(
//       bookingId,
//       {
//         status: 'confirmed',
//         paymentStatus: 'completed',
//         paymentId: razorpay_payment_id,
//         razorpayOrderId: razorpay_order_id,
//         paymentMethod: 'razorpay',
//         paidAt: new Date(),
//         updatedAt: new Date()
//       },
//       { new: true }
//     );

//     // Send confirmation email/SMS
//     try {
//       await sendConfirmationNotifications(updatedBooking as BookingData);
//     } catch (notificationError) {
//       console.error('Failed to send notifications:', notificationError);
//       // Don't fail the payment if notifications fail
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Payment verified and booking confirmed',
//       booking: {
//         _id: updatedBooking._id,
//         bookingId: updatedBooking.bookingId,
//         status: updatedBooking.status,
//         paymentStatus: updatedBooking.paymentStatus,
//         paymentId: updatedBooking.paymentId
//       }
//     });

//   } catch (error) {
//     console.error('Payment verification error:', error);
    
//     if (error instanceof Error && error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ success: false, message: 'Invalid token' });
//     }
    
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// }

// // Helper function to send confirmation notifications
// const sendConfirmationNotifications = async (booking: BookingData) => {
//   try {
//     // Email confirmation
//     console.log(`Sending confirmation email for booking ${booking.bookingId || booking.bookingReference}`);
    
//     // Generate email template
//     const emailTemplate = generateEmailTemplate(booking);
//     // Send email using email service (replace with your actual email service)
//     await emailService.send({
//       html: emailTemplate,
//       to: booking.customerInfo?.email || booking.contactDetails?.email || '',
//       subject: 'Booking Confirmation - Travel Quench'
//     });
//     console.log('Email sent successfully for booking confirmation');
    
//     // SMS/WhatsApp notification
//     console.log(`Sending WhatsApp notification for booking ${booking.bookingId || booking.bookingReference}`);
    
//   } catch (error) {
//     console.error('Notification sending error:', error);
//     throw error;
//   }
// };

// // Email template generator
// const generateEmailTemplate = (booking: BookingData) => {
//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Booking Confirmation</title>
//       <style>
//         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//         .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//         .header { background: #3B82F6; color: white; padding: 20px; text-align: center; }
//         .content { padding: 20px; background: #f9f9f9; }
//         .booking-details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
//         .footer { text-align: center; padding: 20px; color: #666; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">
//           <h1>Booking Confirmed!</h1>
//           <p>Travel Quench</p>
//         </div>
//         <div class="content">
//           <h2>Hello ${booking.customerInfo?.name || booking.contactDetails?.name || 'Traveler'},</h2>
//           <p>Your booking has been confirmed successfully!</p>
          
//           <div class="booking-details">
//             <h3>Booking Details</h3>
//             <p><strong>Booking ID:</strong> ${booking.bookingId || booking.bookingReference}</p>
//             <p><strong>Package:</strong> ${booking.packageDetails?.title || 'Travel Package'}</p>
//             <p><strong>Destination:</strong> ${booking.packageDetails?.destination || 'N/A'}</p>
//             <p><strong>Travel Date:</strong> ${booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'N/A'}</p>
//             <p><strong>Travelers:</strong> ${booking.travelersCount?.adults || booking.travelers || 1} Adults${booking.travelersCount?.children ? `, ${booking.travelersCount.children} Children` : ''}</p>
//             <p><strong>Total Amount:</strong> ₹${booking.totalAmount?.toLocaleString() || 'N/A'}</p>
//             <p><strong>Payment ID:</strong> ${booking.paymentId}</p>
//           </div>
          
//           <p>We'll contact you 48 hours before your travel date with final details.</p>
          
//           <p>For any queries, contact us at:</p>
//           <ul>
//             <li>Phone: +91 12345 67890</li>
//             <li>Email: support@travelquench.com</li>
//           </ul>
//         </div>
//         <div class="footer">
//           <p>Thank you for choosing Travel Quench!</p>
//           <p>Visit us at www.travelquench.com</p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;
// };








// // src/pages/api/payments/verify.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import connectDB from '@/lib/db/connection';
// import Booking from '@/lib/db/models/Booking';
// import crypto from 'crypto';
// import { sendConfirmationEmail } from '@/lib/email/templates'; // Import sendConfirmationEmail

// interface DecodedToken extends JwtPayload {
//   userId: string;
// }

// interface BookingData {
//   _id: string;
//   bookingId?: string;
//   bookingReference?: string;
//   status: string;
//   paymentStatus: string;
//   paymentId: string;
//   userId: string;
//   totalAmount?: number;
//   customerInfo?: {
//     name: string;
//     email?: string;
//     phone?: string;
//   };
//   contactDetails?: {
//     name: string;
//     email?: string;
//     phone?: string;
//   };
//   packageDetails?: {
//     title: string;
//     destination?: string;
//   };
//   travelDate?: Date;
//   travelersCount?: {
//     adults: number;
//     children?: number;
//   };
//   travelers?: number;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   try {
//     await connectDB();

//     const token = req.headers.authorization?.replace('Bearer ', '');
//     if (!token) {
//       return res.status(401).json({ success: false, message: 'Authentication required' });
//     }

//     const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
//     const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
//     const userId = decoded.userId;

//     const { 
//       razorpay_order_id, 
//       razorpay_payment_id, 
//       razorpay_signature,
//       bookingId 
//     } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
//       return res.status(400).json({ success: false, message: 'Missing required fields' });
//     }

//     // Verify signature
//     const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!);
//     shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//     const digest = shasum.digest('hex');

//     if (digest !== razorpay_signature) {
//       return res.status(400).json({ success: false, message: 'Invalid payment signature' });
//     }

//     // Find and update booking
//     const booking = await Booking.findById(bookingId);
    
//     if (!booking) {
//       return res.status(404).json({ success: false, message: 'Booking not found' });
//     }

//     if (booking.userId.toString() !== userId) {
//       return res.status(403).json({ success: false, message: 'Access denied' });
//     }

//     // Update booking with payment details
//     const updatedBooking = await Booking.findByIdAndUpdate(
//       bookingId,
//       {
//         status: 'confirmed',
//         paymentStatus: 'completed',
//         paymentId: razorpay_payment_id,
//         razorpayOrderId: razorpay_order_id,
//         paymentMethod: 'razorpay',
//         paidAt: new Date(),
//         updatedAt: new Date()
//       },
//       { new: true }
//     );

//     // Send confirmation email/SMS
//     try {
//       await sendConfirmationNotifications(updatedBooking as BookingData);
//     } catch (notificationError) {
//       console.error('Failed to send notifications:', notificationError);
//       // Don't fail the payment if notifications fail
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Payment verified and booking confirmed',
//       booking: {
//         _id: updatedBooking._id,
//         bookingId: updatedBooking.bookingId,
//         status: updatedBooking.status,
//         paymentStatus: updatedBooking.paymentStatus,
//         paymentId: updatedBooking.paymentId
//       }
//     });

//   } catch (error) {
//     console.error('Payment verification error:', error);
    
//     if (error instanceof Error && error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ success: false, message: 'Invalid token' });
//     }
    
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// }

// // Helper function to send confirmation notifications
// const sendConfirmationNotifications = async (booking: BookingData) => {
//   try {
//     // Email confirmation
//     console.log(`Sending confirmation email for booking ${booking.bookingId || booking.bookingReference}`);
    
//     // Generate email template
//     // const emailTemplate = generateEmailTemplate(booking);
//     // Send email using sendConfirmationEmail
//     const recipientEmail = booking.customerInfo?.email || booking.contactDetails?.email || '';
//     const recipientName = booking.customerInfo?.name || booking.contactDetails?.name || 'Traveler';
//     if (recipientEmail) {
//       await sendConfirmationEmail(recipientEmail, recipientName, booking.bookingId || booking.bookingReference || '');
//     } else {
//       console.warn('No valid email address found for booking confirmation');
//     }
//     console.log('Email sent successfully for booking confirmation');
    
//     // SMS/WhatsApp notification
//     console.log(`Sending WhatsApp notification for booking ${booking.bookingId || booking.bookingReference}`);
//     // Add SMS/WhatsApp logic here if needed
    
//   } catch (error) {
//     console.error('Notification sending error:', error);
//     throw error;
//   }
// };

// // Email template generator
// const generateEmailTemplate = (booking: BookingData) => {
//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Booking Confirmation</title>
//       <style>
//         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//         .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//         .header { background: #3B82F6; color: white; padding: 20px; text-align: center; }
//         .content { padding: 20px; background: #f9f9f9; }
//         .booking-details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
//         .footer { text-align: center; padding: 20px; color: #666; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">
//           <h1>Booking Confirmed!</h1>
//           <p>Travel Quench</p>
//         </div>
//         <div class="content">
//           <h2>Hello ${booking.customerInfo?.name || booking.contactDetails?.name || 'Traveler'},</h2>
//           <p>Your booking has been confirmed successfully!</p>
          
//           <div class="booking-details">
//             <h3>Booking Details</h3>
//             <p><strong>Booking ID:</strong> ${booking.bookingId || booking.bookingReference}</p>
//             <p><strong>Package:</strong> ${booking.packageDetails?.title || 'Travel Package'}</p>
//             <p><strong>Destination:</strong> ${booking.packageDetails?.destination || 'N/A'}</p>
//             <p><strong>Travel Date:</strong> ${booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'N/A'}</p>
//             <p><strong>Travelers:</strong> ${booking.travelersCount?.adults || booking.travelers || 1} Adults${booking.travelersCount?.children ? `, ${booking.travelersCount.children} Children` : ''}</p>
//             <p><strong>Total Amount:</strong> ₹${booking.totalAmount?.toLocaleString() || 'N/A'}</p>
//             <p><strong>Payment ID:</strong> ${booking.paymentId}</p>
//           </div>
          
//           <p>We'll contact you 48 hours before your travel date with final details.</p>
          
//           <p>For any queries, contact us at:</p>
//           <ul>
//             <li>Phone: +91 12345 67890</li>
//             <li>Email: support@travelquench.com</li>
//           </ul>
//         </div>
//         <div class="footer">
//           <p>Thank you for choosing Travel Quench!</p>
//           <p>Visit us at www.travelquench.com</p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;
// };









// src/pages/api/payments/verify.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';
import connectDB from '@/lib/db/connection';
import Booking from '@/lib/db/models/Booking';
import crypto from 'crypto';
import { sendConfirmationEmail } from '@/lib/email/templates'; // Import sendConfirmationEmail

interface DecodedToken extends JwtPayload {
  userId: string;
}

interface BookingData {
  _id: string;
  bookingId?: string;
  bookingReference?: string;
  status: string;
  paymentStatus: string;
  paymentId: string;
  userId: string;
  totalAmount?: number;
  customerInfo?: {
    name: string;
    email?: string;
    phone?: string;
  };
  contactDetails?: {
    name: string;
    email?: string;
    phone?: string;
  };
  packageDetails?: {
    title: string;
    destination?: string;
  };
  travelDate?: Date;
  travelersCount?: {
    adults: number;
    children?: number;
  };
  travelers?: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    const userId = decoded.userId;

    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      bookingId 
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Verify signature
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // Find and update booking
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    // Update booking with payment details
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        status: 'confirmed',
        paymentStatus: 'completed',
        paymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        paymentMethod: 'razorpay',
        paidAt: new Date(),
        updatedAt: new Date(),
      },
      { new: true }
    );

    // Send confirmation email/SMS
    try {
      await sendConfirmationNotifications(updatedBooking as BookingData);
    } catch (notificationError) {
      console.error('Failed to send notifications:', notificationError);
      // Don't fail the payment if notifications fail
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified and booking confirmed',
      booking: {
        _id: updatedBooking._id,
        bookingId: updatedBooking.bookingId,
        status: updatedBooking.status,
        paymentStatus: updatedBooking.paymentStatus,
        paymentId: updatedBooking.paymentId,
      },
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    
    if (error instanceof Error && error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}

// Helper function to send confirmation notifications
const sendConfirmationNotifications = async (booking: BookingData) => {
  try {
    // Email confirmation
    console.log(`Sending confirmation email for booking ${booking.bookingId || booking.bookingReference}`);
    
    // Generate email template
    const emailTemplate = generateEmailTemplate(booking);
    // Send email using sendConfirmationEmail
    const recipientEmail = booking.customerInfo?.email || booking.contactDetails?.email || '';
    const recipientName = booking.customerInfo?.name || booking.contactDetails?.name || 'Traveler';
    if (recipientEmail) {
      // Assuming sendConfirmationEmail can accept an HTML template or adjust as needed
      await sendConfirmationEmail(recipientEmail, recipientName, emailTemplate);
    } else {
      console.warn('No valid email address found for booking confirmation');
    }
    console.log('Email sent successfully for booking confirmation');
    
    // SMS/WhatsApp notification
    console.log(`Sending WhatsApp notification for booking ${booking.bookingId || booking.bookingReference}`);
    // Add SMS/WhatsApp logic here if needed
    
  } catch (error) {
    console.error('Notification sending error:', error);
    throw error;
  }
};

// Email template generator
const generateEmailTemplate = (booking: BookingData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Booking Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #3B82F6; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .booking-details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmed!</h1>
          <p>Travel Quench</p>
        </div>
        <div class="content">
          <h2>Hello ${booking.customerInfo?.name || booking.contactDetails?.name || 'Traveler'},</h2>
          <p>Your booking has been confirmed successfully!</p>
          
          <div class="booking-details">
            <h3>Booking Details</h3>
            <p><strong>Booking ID:</strong> ${booking.bookingId || booking.bookingReference}</p>
            <p><strong>Package:</strong> ${booking.packageDetails?.title || 'Travel Package'}</p>
            <p><strong>Destination:</strong> ${booking.packageDetails?.destination || 'N/A'}</p>
            <p><strong>Travel Date:</strong> ${booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Travelers:</strong> ${booking.travelersCount?.adults || booking.travelers || 1} Adults${booking.travelersCount?.children ? `, ${booking.travelersCount.children} Children` : ''}</p>
            <p><strong>Total Amount:</strong> ₹${booking.totalAmount?.toLocaleString() || 'N/A'}</p>
            <p><strong>Payment ID:</strong> ${booking.paymentId}</p>
          </div>
          
          <p>We'll contact you 48 hours before your travel date with final details.</p>
          
          <p>For any queries, contact us at:</p>
          <ul>
            <li>Phone: +91 12345 67890</li>
            <li>Email: support@travelquench.com</li>
          </ul>
        </div>
        <div class="footer">
          <p>Thank you for choosing Travel Quench!</p>
          <p>Visit us at www.travelquench.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
};