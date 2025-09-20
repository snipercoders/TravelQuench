// pages/api/auth/me.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import User from '@/lib/db/models/User';
import { verifyToken } from '@/lib/auth/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Get token from cookie or Authorization header
    const token = req.cookies['auth-token'] || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      // Clear invalid cookie
      res.setHeader('Set-Cookie', 'auth-token=; Max-Age=0; Path=/; HttpOnly; SameSite=strict');
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    // Find user
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      res.setHeader('Set-Cookie', 'auth-token=; Max-Age=0; Path=/; HttpOnly; SameSite=strict');
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        profileImage: user.profileImage,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Auth check error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}