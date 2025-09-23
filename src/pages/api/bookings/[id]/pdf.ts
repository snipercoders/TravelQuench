// // src/pages/api/bookings/[id]/pdf.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';
// import connectDB from '@/lib/db/connection';
// import Booking from '@/lib/db/models/Booking';

// // Note: For actual implementation, you would use a PDF generation library like:
// // - puppeteer (for HTML to PDF)
// // - jsPDF (client-side PDF generation)
// // - PDFKit (server-side PDF creation)
// // - react-pdf (React-based PDF generation)

// const generateBookingPDF = async (booking: any): Promise<Buffer> => {
//   // Mock PDF generation - replace with actual PDF library
//   const pdfContent = `
//     TRAVEL QUENCH - BOOKING CONFIRMATION
//     ===================================
    
//     Booking ID: ${booking.bookingId || booking.bookingReference}
    
//     PACKAGE DETAILS
//     ---------------
//     Package: ${booking.packageDetails?.title || 'Travel Package'}
//     Destination: ${booking.packageDetails?.destination || 'Unknown'}
//     Duration: ${booking.packageDetails?.duration || 1} days
//     Type: ${booking.packageDetails?.type || 'domestic'}
    
//     TRAVEL DETAILS
//     --------------
//     Travel Date: ${booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'Not set'}
//     Adults: ${booking.travelersCount?.adults || booking.travelers || 1}
//     Children: ${booking.travelersCount?.children || 0}
    
//     CUSTOMER INFORMATION
//     -------------------
//     Name: ${booking.customerInfo?.name || booking.contactDetails?.name || 'Not provided'}
//     Email: ${booking.customerInfo?.email || booking.contactDetails?.email || 'Not provided'}
//     Phone: ${booking.customerInfo?.phone || booking.contactDetails?.phone || 'Not provided'}
//     Address: ${booking.customerInfo?.address || booking.contactDetails?.address || 'Not provided'}
//     Emergency Contact: ${booking.customerInfo?.emergencyContact || 'Not provided'}
    
//     PAYMENT DETAILS
//     ---------------
//     Total Amount: ₹${booking.totalAmount?.toLocaleString() || '0'}
//     Payment ID: ${booking.paymentId || 'Pending'}
//     Payment Method: ${booking.paymentMethod || 'Not selected'}
//     Payment Status: ${booking.paymentStatus || 'pending'}
//     ${booking.paidAt ? `Payment Date: ${new Date(booking.paidAt).toLocaleDateString()}` : ''}
//     Status: ${booking.status || 'pending'}
    
//     SPECIAL REQUESTS
//     ----------------
//     ${booking.specialRequests || 'None'}
    
//     TERMS & CONDITIONS
//     ------------------
//     1. This booking is confirmed and non-refundable after 48 hours.
//     2. Please carry valid identification documents for travel.
//     3. Contact our support team for any queries: +91 12345 67890
//     4. Check-in 2 hours before departure for domestic trips.
//     5. Check-in 3 hours before departure for international trips.
    
//     Thank you for choosing Travel Quench!
//     Visit us at: www.travelquench.com
//     Support: support@travelquench.com
    
//     Generated on: ${new Date().toLocaleString()}
//   `;
  
//   // Convert text to buffer (mock implementation)
//   return Buffer.from(pdfContent, 'utf-8');
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
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
//     const userId = decoded.userId;
//     const { id: bookingId } = req.query;

//     if (!bookingId || typeof bookingId !== 'string') {
//       return res.status(400).json({ success: false, message: 'Invalid booking ID' });
//     }

//     // Find booking
//     const booking = await Booking.findById(bookingId);

//     if (!booking) {
//       return res.status(404).json({ success: false, message: 'Booking not found' });
//     }

//     // Verify booking belongs to user
//     if (booking.userId.toString() !== userId) {
//       return res.status(403).json({ success: false, message: 'Access denied' });
//     }

//     // Generate PDF
//     const pdfBuffer = await generateBookingPDF(booking);

//     // Set headers for PDF download
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename="booking-${booking.bookingId || booking.bookingReference || 'unknown'}.pdf"`);
//     res.setHeader('Content-Length', pdfBuffer.length);

//     // Send PDF
//     res.status(200).send(pdfBuffer);

//   } catch (error) {
//     console.error('PDF generation error:', error);
    
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ success: false, message: 'Invalid token' });
//     }
    
//     res.status(500).json({ 
//       success: false, 
//       message: 'Failed to generate PDF' 
//     });
//   }
// }

// // For actual PDF generation, you might use something like this with puppeteer:
// /*
// import puppeteer from 'puppeteer';

// const generateBookingPDFWithPuppeteer = async (booking: any): Promise<Buffer> => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
  
//   const html = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <title>Booking Confirmation</title>
//       <style>
//         body { font-family: Arial, sans-serif; margin: 40px; }
//         .header { text-align: center; margin-bottom: 30px; }
//         .section { margin-bottom: 20px; }
//         .section h3 { border-bottom: 2px solid #333; padding-bottom: 5px; }
//         .details { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
//         .detail-item { margin-bottom: 8px; }
//         .label { font-weight: bold; }
//       </style>
//     </head>
//     <body>
//       <div class="header">
//         <h1>TRAVEL QUENCH</h1>
//         <h2>Booking Confirmation</h2>
//         <p>Booking ID: ${booking.bookingId || booking.bookingReference}</p>
//       </div>
      
//       <div class="section">
//         <h3>Package Details</h3>
//         <div class="details">
//           <div class="detail-item"><span class="label">Package:</span> ${booking.packageDetails?.title}</div>
//           <div class="detail-item"><span class="label">Destination:</span> ${booking.packageDetails?.destination}</div>
//           <div class="detail-item"><span class="label">Duration:</span> ${booking.packageDetails?.duration} days</div>
//           <div class="detail-item"><span class="label">Type:</span> ${booking.packageDetails?.type}</div>
//         </div>
//       </div>
      
//       <!-- Add more sections as needed -->
      
//     </body>
//     </html>
//   `;
  
//   await page.setContent(html);
//   const pdf = await page.pdf({ 
//     format: 'A4',
//     printBackground: true,
//     margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
//   });
  
//   await browser.close();
//   return pdf;
// };
// */













// // src/pages/api/bookings/[id]/pdf.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';
// import connectDB from '@/lib/db/connection';
// import Booking from '@/lib/db/models/Booking';
// import PDFDocument from 'pdfkit';

// const generateBookingPDF = async (booking: any): Promise<Buffer> => {
//   return new Promise((resolve, reject) => {
//     try {
//       // Create a new PDF document
//       const doc = new PDFDocument({ margin: 50 });
//       const chunks: Buffer[] = [];

//       // Collect the PDF data
//       doc.on('data', (chunk) => chunks.push(chunk));
//       doc.on('end', () => resolve(Buffer.concat(chunks)));
//       doc.on('error', reject);

//       // Header
//       doc.fontSize(20).text('TRAVEL QUENCH', { align: 'center' });
//       doc.fontSize(16).text('BOOKING CONFIRMATION', { align: 'center' });
//       doc.moveDown();

//       // Booking ID
//       doc.fontSize(12).text(`Booking ID: ${booking.bookingId || booking.bookingReference}`, { align: 'center' });
//       doc.moveDown(2);

//       // Package Details Section
//       doc.fontSize(14).text('PACKAGE DETAILS', { underline: true });
//       doc.moveDown(0.5);
//       doc.fontSize(10);
//       doc.text(`Package: ${booking.packageDetails?.title || 'Travel Package'}`);
//       doc.text(`Destination: ${booking.packageDetails?.destination || 'Unknown'}`);
//       doc.text(`Duration: ${booking.packageDetails?.duration || 1} days`);
//       doc.text(`Type: ${booking.packageDetails?.type || 'domestic'}`);
//       doc.moveDown();

//       // Travel Details Section
//       doc.fontSize(14).text('TRAVEL DETAILS', { underline: true });
//       doc.moveDown(0.5);
//       doc.fontSize(10);
//       doc.text(`Travel Date: ${booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'Not set'}`);
//       doc.text(`Adults: ${booking.travelersCount?.adults || booking.travelers || 1}`);
//       doc.text(`Children: ${booking.travelersCount?.children || 0}`);
//       doc.moveDown();

//       // Customer Information Section
//       doc.fontSize(14).text('CUSTOMER INFORMATION', { underline: true });
//       doc.moveDown(0.5);
//       doc.fontSize(10);
//       doc.text(`Name: ${booking.customerInfo?.name || booking.contactDetails?.name || 'Not provided'}`);
//       doc.text(`Email: ${booking.customerInfo?.email || booking.contactDetails?.email || 'Not provided'}`);
//       doc.text(`Phone: ${booking.customerInfo?.phone || booking.contactDetails?.phone || 'Not provided'}`);
//       doc.text(`Address: ${booking.customerInfo?.address || booking.contactDetails?.address || 'Not provided'}`);
//       doc.text(`Emergency Contact: ${booking.customerInfo?.emergencyContact || 'Not provided'}`);
//       doc.moveDown();

//       // Payment Details Section
//       doc.fontSize(14).text('PAYMENT DETAILS', { underline: true });
//       doc.moveDown(0.5);
//       doc.fontSize(10);
//       doc.text(`Total Amount: ₹${booking.totalAmount?.toLocaleString() || '0'}`);
//       doc.text(`Payment ID: ${booking.paymentId || 'Pending'}`);
//       doc.text(`Payment Method: ${booking.paymentMethod || 'Not selected'}`);
//       doc.text(`Payment Status: ${booking.paymentStatus || 'pending'}`);
//       if (booking.paidAt) {
//         doc.text(`Payment Date: ${new Date(booking.paidAt).toLocaleDateString()}`);
//       }
//       doc.text(`Status: ${booking.status || 'pending'}`);
//       doc.moveDown();

//       // Special Requests Section
//       if (booking.specialRequests) {
//         doc.fontSize(14).text('SPECIAL REQUESTS', { underline: true });
//         doc.moveDown(0.5);
//         doc.fontSize(10);
//         doc.text(booking.specialRequests);
//         doc.moveDown();
//       }

//       // Terms & Conditions Section
//       doc.fontSize(14).text('TERMS & CONDITIONS', { underline: true });
//       doc.moveDown(0.5);
//       doc.fontSize(9);
//       doc.text('1. This booking is confirmed and non-refundable after 48 hours.');
//       doc.text('2. Please carry valid identification documents for travel.');
//       doc.text('3. Contact our support team for any queries: +91 12345 67890');
//       doc.text('4. Check-in 2 hours before departure for domestic trips.');
//       doc.text('5. Check-in 3 hours before departure for international trips.');
//       doc.moveDown();

//       // Footer
//       doc.fontSize(10);
//       doc.text('Thank you for choosing Travel Quench!', { align: 'center' });
//       doc.text('Visit us at: www.travelquench.com', { align: 'center' });
//       doc.text('Support: support@travelquench.com', { align: 'center' });
//       doc.moveDown();
//       doc.fontSize(8);
//       doc.text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });

//       // Finalize the PDF
//       doc.end();
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
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
//     const userId = decoded.userId;
//     const { id: bookingId } = req.query;

//     if (!bookingId || typeof bookingId !== 'string') {
//       return res.status(400).json({ success: false, message: 'Invalid booking ID' });
//     }

//     // Find booking
//     const booking = await Booking.findById(bookingId);

//     if (!booking) {
//       return res.status(404).json({ success: false, message: 'Booking not found' });
//     }

//     // Verify booking belongs to user
//     if (booking.userId.toString() !== userId) {
//       return res.status(403).json({ success: false, message: 'Access denied' });
//     }

//     // Generate PDF
//     const pdfBuffer = await generateBookingPDF(booking);

//     // Set headers for PDF download
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename="booking-${booking.bookingId || booking.bookingReference || 'unknown'}.pdf"`);
//     res.setHeader('Content-Length', pdfBuffer.length);

//     // Send PDF
//     res.status(200).send(pdfBuffer);

//   } catch (error) {
//     console.error('PDF generation error:', error);
    
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ success: false, message: 'Invalid token' });
//     }
    
//     res.status(500).json({ 
//       success: false, 
//       message: 'Failed to generate PDF' 
//     });
//   }
// }












// src/pages/api/bookings/[id]/pdf.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db/connection';
import Booking from '@/lib/db/models/Booking';
import PDFDocument from 'pdfkit';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  [key: string]: unknown;
}

interface BookingData {
  bookingId?: string;
  bookingReference?: string;
  packageDetails?: {
    title?: string;
    destination?: string;
    duration?: number;
    type?: string;
  };
  travelDate?: Date;
  travelersCount?: {
    adults?: number;
    children?: number;
  };
  travelers?: number;
  customerInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    emergencyContact?: string;
  };
  contactDetails?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  totalAmount?: number;
  paymentId?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  paidAt?: Date;
  status?: string;
  specialRequests?: string;
  userId: string;
}

const generateBookingPDF = async (booking: BookingData): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      // Create a new PDF document
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];

      // Collect the PDF data
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Header
      doc.fontSize(20).text('TRAVEL QUENCH', { align: 'center' });
      doc.fontSize(16).text('BOOKING CONFIRMATION', { align: 'center' });
      doc.moveDown();

      // Booking ID
      doc.fontSize(12).text(`Booking ID: ${booking.bookingId || booking.bookingReference}`, { align: 'center' });
      doc.moveDown(2);

      // Package Details Section
      doc.fontSize(14).text('PACKAGE DETAILS', { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(10);
      doc.text(`Package: ${booking.packageDetails?.title || 'Travel Package'}`);
      doc.text(`Destination: ${booking.packageDetails?.destination || 'Unknown'}`);
      doc.text(`Duration: ${booking.packageDetails?.duration || 1} days`);
      doc.text(`Type: ${booking.packageDetails?.type || 'domestic'}`);
      doc.moveDown();

      // Travel Details Section
      doc.fontSize(14).text('TRAVEL DETAILS', { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(10);
      doc.text(`Travel Date: ${booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'Not set'}`);
      doc.text(`Adults: ${booking.travelersCount?.adults || booking.travelers || 1}`);
      doc.text(`Children: ${booking.travelersCount?.children || 0}`);
      doc.moveDown();

      // Customer Information Section
      doc.fontSize(14).text('CUSTOMER INFORMATION', { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(10);
      doc.text(`Name: ${booking.customerInfo?.name || booking.contactDetails?.name || 'Not provided'}`);
      doc.text(`Email: ${booking.customerInfo?.email || booking.contactDetails?.email || 'Not provided'}`);
      doc.text(`Phone: ${booking.customerInfo?.phone || booking.contactDetails?.phone || 'Not provided'}`);
      doc.text(`Address: ${booking.customerInfo?.address || booking.contactDetails?.address || 'Not provided'}`);
      doc.text(`Emergency Contact: ${booking.customerInfo?.emergencyContact || 'Not provided'}`);
      doc.moveDown();

      // Payment Details Section
      doc.fontSize(14).text('PAYMENT DETAILS', { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(10);
      doc.text(`Total Amount: ₹${booking.totalAmount?.toLocaleString() || '0'}`);
      doc.text(`Payment ID: ${booking.paymentId || 'Pending'}`);
      doc.text(`Payment Method: ${booking.paymentMethod || 'Not selected'}`);
      doc.text(`Payment Status: ${booking.paymentStatus || 'pending'}`);
      if (booking.paidAt) {
        doc.text(`Payment Date: ${new Date(booking.paidAt).toLocaleDateString()}`);
      }
      doc.text(`Status: ${booking.status || 'pending'}`);
      doc.moveDown();

      // Special Requests Section
      if (booking.specialRequests) {
        doc.fontSize(14).text('SPECIAL REQUESTS', { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(10);
        doc.text(booking.specialRequests);
        doc.moveDown();
      }

      // Terms & Conditions Section
      doc.fontSize(14).text('TERMS & CONDITIONS', { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(9);
      doc.text('1. This booking is confirmed and non-refundable after 48 hours.');
      doc.text('2. Please carry valid identification documents for travel.');
      doc.text('3. Contact our support team for any queries: +91 12345 67890');
      doc.text('4. Check-in 2 hours before departure for domestic trips.');
      doc.text('5. Check-in 3 hours before departure for international trips.');
      doc.moveDown();

      // Footer
      doc.fontSize(10);
      doc.text('Thank you for choosing Travel Quench!', { align: 'center' });
      doc.text('Visit us at: www.travelquench.com', { align: 'center' });
      doc.text('Support: support@travelquench.com', { align: 'center' });
      doc.moveDown();
      doc.fontSize(8);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });

      // Finalize the PDF
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
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
    const userId = decoded.userId;
    const { id: bookingId } = req.query;

    if (!bookingId || typeof bookingId !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid booking ID' });
    }

    // Find booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Verify booking belongs to user
    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    // Generate PDF
    const pdfBuffer = await generateBookingPDF(booking);

    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="booking-${booking.bookingId || booking.bookingReference || 'unknown'}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    // Send PDF
    res.status(200).send(pdfBuffer);

  } catch (error: unknown) {
    console.error('PDF generation error:', error);
    
    if ((error as Error).name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to generate PDF' 
    });
  }
}