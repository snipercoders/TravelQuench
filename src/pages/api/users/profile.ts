// src/pages/api/users/profile.ts
import type { NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import User from '@/lib/db/models/User';
import { authenticate, AuthenticatedRequest } from '@/lib/auth/middleware';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  return authenticate(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      await connectDB();
      
      if (req.method === 'GET') {
        console.log('📋 Fetching user profile for user:', req.user._id);

        // Get user profile with all details except password
        const user = await User.findById(req.user._id).select('-password').lean();
        
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User not found'
          });
        }

        console.log('✅ Profile fetched successfully for user:', user.email);
        
        res.status(200).json({
          success: true,
          user
        });

      } else if (req.method === 'PUT') {
        console.log('✏️ Updating user profile for user:', req.user._id);

        const {
          name,
          phone,
          dateOfBirth,
          gender,
          address,
          preferences
        } = req.body;

        // Validate required fields
        if (!name || name.trim().length < 2) {
          return res.status(400).json({
            success: false,
            message: 'Name is required and must be at least 2 characters'
          });
        }

        // Validate phone number format if provided (Indian format)
        if (phone && !/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) {
          return res.status(400).json({
            success: false,
            message: 'Invalid phone number format. Please enter a valid 10-digit Indian mobile number'
          });
        }

        // Validate date of birth if provided
        if (dateOfBirth) {
          const birthDate = new Date(dateOfBirth);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          
          if (age < 5 || age > 120) {
            return res.status(400).json({
              success: false,
              message: 'Invalid date of birth'
            });
          }
        }

        // Prepare update data
        const updateData: any = {
          name: name.trim(),
          updatedAt: new Date()
        };

        // Add optional fields if provided
        if (phone !== undefined) updateData.phone = phone.replace(/\s/g, ''); // Remove spaces
        if (dateOfBirth) updateData.dateOfBirth = new Date(dateOfBirth);
        if (gender) updateData.gender = gender;
        if (address) updateData.address = address;
        if (preferences) updateData.preferences = preferences;

        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
          req.user._id,
          updateData,
          { 
            new: true, 
            runValidators: true 
          }
        ).select('-password');

        if (!updatedUser) {
          return res.status(404).json({
            success: false,
            message: 'User not found'
          });
        }

        console.log('✅ Profile updated successfully for user:', updatedUser.email);

        res.status(200).json({
          success: true,
          message: 'Profile updated successfully',
          user: updatedUser
        });

      } else {
        res.status(405).json({
          success: false,
          message: 'Method not allowed'
        });
      }

    } catch (error: any) {
      console.error('❌ Profile API error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: Object.values(error.errors).map((e: any) => e.message)
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  })(req, res);
}