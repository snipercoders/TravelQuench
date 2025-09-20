// src/pages/api/payments/process.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db/connection';
import Booking from '@/lib/db/models/Booking';
import Package from '@/lib/db/models/Package';
const Razorpay = require('razorpay');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

interface PaymentRequest {
  bookingId: string;
  paymentMethod: 'razorpay';
  amount: number;
  currency: string;
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
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const userId = decoded.userId;

    const { bookingId, amount } = req.body;

    // Validate required fields
    if (!bookingId || !amount) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Find and validate booking
    const booking = await Booking.findById(bookingId).populate('packageId');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Verify booking belongs to user
    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    // Check if booking is already paid
    if (booking.paymentStatus === 'completed') {
      return res.status(400).json({ success: false, message: 'Booking already paid' });
    }

    // Verify amount matches
    if (amount !== booking.totalAmount) {
      return res.status(400).json({ success: false, message: 'Amount mismatch' });
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `booking_${bookingId}`,
      notes: {
        bookingId: bookingId,
        packageTitle: booking.packageDetails?.title || 'Travel Package',
        customerName: booking.customerInfo.name,
        customerEmail: booking.customerInfo.email,
      }
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
      bookingId: bookingId,
      customerInfo: {
        name: booking.customerInfo.name,
        email: booking.customerInfo.email,
        contact: booking.customerInfo.phone
      }
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}

// src/pages/api/payments/verify.ts
export const verifyPayment = async (req: NextApiRequest, res: NextApiResponse) => {
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
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const userId = decoded.userId;

    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      bookingId 
    } = req.body;

    // Verify signature
    const crypto = require('crypto');
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    // Update booking status
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        status: 'confirmed',
        paymentStatus: 'completed',
        paymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        paymentMethod: 'razorpay',
        paidAt: new Date(),
        updatedAt: new Date()
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      booking: updatedBooking
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};