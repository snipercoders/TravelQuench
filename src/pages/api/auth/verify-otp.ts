// src/pages/api/auth/verify-otp.ts


import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import { User } from '@/lib/db/models';
import { otpSchema } from '@/lib/utils/validation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Validate request body
    const validatedData = await otpSchema.validate(req.body);
    const { email, otp } = req.body;

    await connectDB();

    const user = await User.findOne({ 
      email,
      emailVerificationToken: otp,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error: any) {
    console.error('OTP verification error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}