// src/pages/api/users/change-password.ts
import type { NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db/connection';
import User from '@/lib/db/models/User';
import { authenticate, AuthenticatedRequest } from '@/lib/auth/middleware';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  return authenticate(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      await connectDB();
      console.log('🔐 Changing password for user:', req.user._id);

      const { currentPassword, newPassword } = req.body;

      // Validate input
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Current password and new password are required'
        });
      }

      // Validate new password strength
      if (newPassword.length < 8) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 8 characters long'
        });
      }

      // Check if new password has at least one letter and one number
      const hasLetter = /[a-zA-Z]/.test(newPassword);
      const hasNumber = /\d/.test(newPassword);
      
      if (!hasLetter || !hasNumber) {
        return res.status(400).json({
          success: false,
          message: 'New password must contain at least one letter and one number'
        });
      }

      // Get user with password to verify current password
      const user = await User.findById(req.user._id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      
      if (!isCurrentPasswordValid) {
        console.log('❌ Invalid current password for user:', user.email);
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }

      // Check if new password is different from current password
      const isSamePassword = await bcrypt.compare(newPassword, user.password);
      
      if (isSamePassword) {
        return res.status(400).json({
          success: false,
          message: 'New password must be different from current password'
        });
      }

      // Hash new password
      const saltRounds = 12;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      await User.findByIdAndUpdate(
        req.user._id,
        { 
          password: hashedNewPassword,
          updatedAt: new Date()
        }
      );

      console.log('✅ Password changed successfully for user:', user.email);

      res.status(200).json({
        success: true,
        message: 'Password changed successfully'
      });

    } catch (error: any) {
      console.error('❌ Change password error:', error);
      
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  })(req, res);
}