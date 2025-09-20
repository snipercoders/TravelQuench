// src/pages/api/admin/users/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db/connection';
import User from '@/lib/db/models/User';
import { validateUserUpdateData } from '@/lib/utils/validation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (req.method === 'GET') {
      // Get user by ID
      const user = await User.findById(id).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userData = {
        id: user._id.toString(),
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        profileImage: user.profileImage,
        totalBookings: 0,
        totalSpent: 0,
        lastLoginAt: user.lastLoginAt?.toISOString(),
        createdAt: user.createdAt.toISOString(),
        isActive: true,
        address: user.address,
        preferences: user.preferences
      };

      return res.status(200).json(userData);
    }

    if (req.method === 'PATCH') {
      // Update user
      const { name, firstName, lastName, email, phone, role } = req.body;

      // Handle name processing
      let finalName, finalFirstName, finalLastName;
      if (name) {
        const nameParts = name.trim().split(' ');
        finalFirstName = firstName || nameParts[0];
        finalLastName = lastName || nameParts.slice(1).join(' ') || '';
        finalName = name.trim();
      } else if (firstName || lastName) {
        finalFirstName = firstName || '';
        finalLastName = lastName || '';
        finalName = `${finalFirstName} ${finalLastName}`.trim();
      }

      // Validate update data
      const validationErrors = validateUserUpdateData({ 
        name: finalName,
        firstName: finalFirstName,
        lastName: finalLastName, 
        email, 
        phone 
      });
      
      if (validationErrors.length > 0) {
        return res.status(400).json({ 
          message: 'Validation failed', 
          errors: validationErrors 
        });
      }

      // Check if email is already taken by another user
      if (email) {
        const existingUser = await User.findOne({ 
          email: email.toLowerCase(), 
          _id: { $ne: id } 
        });
        if (existingUser) {
          return res.status(400).json({ 
            message: 'Email already exists for another user' 
          });
        }
      }

      // Update user data
      const updateData: any = {};
      if (finalName) updateData.name = finalName;
      if (finalFirstName !== undefined) updateData.firstName = finalFirstName;
      if (finalLastName !== undefined) updateData.lastName = finalLastName;
      if (email) updateData.email = email.toLowerCase();
      if (phone !== undefined) updateData.phone = phone?.trim() || null;
      if (role && ['customer', 'admin'].includes(role)) updateData.role = role;

      const updatedUser = await User.findByIdAndUpdate(
        id,
        updateData,
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

      return res.status(200).json(userData);
    }

    if (req.method === 'DELETE') {
      // Delete user
      const deletedUser = await User.findByIdAndDelete(id);
      
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'User deleted successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });

  } catch (error) {
    console.error('Admin user API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}