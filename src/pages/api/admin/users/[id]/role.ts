// src/pages/api/admin/users/[id]/role.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db/connection';
import User from '@/lib/db/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Verify admin authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.substring(7);
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
    
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (jwtError) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Check if user is admin
    const adminUser = await User.findById(decoded.userId);
    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { id } = req.query;
    const { role } = req.body;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (!role || !['customer', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Role must be either "customer" or "admin"' });
    }

    // Prevent admin from changing their own role
    if (id === decoded.userId) {
      return res.status(400).json({ message: 'Cannot change your own role' });
    }

    // Update user role
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = {
      id: updatedUser._id.toString(),
      name: updatedUser.name,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      isEmailVerified: updatedUser.isEmailVerified,
      profileImage: updatedUser.profileImage,
      totalBookings: 0,
      totalSpent: 0,
      lastLoginAt: updatedUser.lastLoginAt?.toISOString(),
      createdAt: updatedUser.createdAt.toISOString(),
      isActive: true,
      address: updatedUser.address,
      preferences: updatedUser.preferences
    };

    return res.status(200).json({
      message: `User role updated to ${role} successfully`,
      user: userData
    });

  } catch (error) {
    console.error('Admin user role API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}