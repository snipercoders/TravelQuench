// src/pages/api/users/profile.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import { User } from '@/lib/db/models';
import { verifyToken } from '@/lib/auth/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    await connectDB();

    // Get user profile
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Return user profile (password already excluded by toJSON transform)
    res.status(200).json({
      success: true,
      user: user.toObject()
    });

  } catch (error: any) {
    console.error('Profile API error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
