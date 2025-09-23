// src/pages/api/admin/bookings/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import User from '@/lib/db/models/User';
import Booking from '@/lib/db/models/Booking';
// import Package from '@/lib/db/models/Package';
import { verifyToken } from '@/lib/auth/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Verify admin access
    const token = req.cookies['auth-token'];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    // Get all bookings with populated user and package data
    const bookings = await Booking.find()
      .populate('userId', 'name email phone')
      .populate('packageId', 'title destination duration')
      .sort({ createdAt: -1 })
      .lean();

    const formattedBookings = bookings.map(booking => ({
      id: booking._id,
      customerName: booking.userId?.name || booking.contactDetails?.name || 'Unknown',
      customerEmail: booking.userId?.email || booking.contactDetails?.email || '',
      customerPhone: booking.userId?.phone || booking.contactDetails?.phone || '',
      packageTitle: booking.packageId?.title || 'Package Deleted',
      packageDestination: booking.packageId?.destination || '',
      packageDuration: booking.packageId?.duration || 0,
      travelers: booking.travelers,
      startDate: booking.startDate,
      endDate: booking.endDate,
      totalAmount: booking.totalAmount,
      paidAmount: booking.paidAmount,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      specialRequests: booking.specialRequests,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt
    }));

    res.status(200).json(formattedBookings);

  } catch (error) {
    console.error('Bookings API error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}