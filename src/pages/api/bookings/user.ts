// src/pages/api/bookings/user.ts
import type { NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import Booking from '@/lib/db/models/Booking';
import { authenticate, AuthenticatedRequest } from '@/lib/auth/middleware';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  return authenticate(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      await connectDB();
      console.log('📋 Fetching user bookings for user:', req.user.id);

      // Get query parameters for filtering and pagination
      const { page = 1, limit = 20, status, search } = req.query;
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      // Build query
      const query: any = { userId: req.user.id };

      // Add status filter if provided
      if (status && status !== 'all') {
        query.status = status;
      }

      // Add search filter if provided
      if (search) {
        query.$or = [
          { bookingReference: { $regex: search, $options: 'i' } },
          { 'packageId.title': { $regex: search, $options: 'i' } },
          { 'packageId.destination': { $regex: search, $options: 'i' } }
        ];
      }

      // Fetch bookings with populated package data
      const bookings = await Booking.find(query)
        .populate({
          path: 'packageId',
          select: 'title destination images duration pricing isActive'
        })
        .sort({ createdAt: -1 }) // Most recent first
        .skip(skip)
        .limit(limitNum)
        .lean();

      // Get total count for pagination
      const totalBookings = await Booking.countDocuments(query);

      // Filter out bookings with deleted packages
      const validBookings = bookings.filter(booking => booking.packageId && booking.packageId.isActive !== false);

      // Calculate pagination info
      const totalPages = Math.ceil(totalBookings / limitNum);
      const hasNextPage = pageNum < totalPages;
      const hasPrevPage = pageNum > 1;

      console.log(`✅ Found ${validBookings.length} bookings for user`);

      res.status(200).json({
        success: true,
        bookings: validBookings,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalBookings,
          hasNextPage,
          hasPrevPage,
          limit: limitNum
        }
      });

    } catch (error: any) {
      console.error('❌ Error fetching user bookings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch bookings',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  })(req, res);
}