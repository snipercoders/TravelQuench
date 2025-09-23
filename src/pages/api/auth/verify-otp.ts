// // src/pages/api/auth/verify-otp.ts


// import { NextApiRequest, NextApiResponse } from 'next';
// import connectDB from '@/lib/db/connection';
// import { User } from '@/lib/db/models';
// import { otpSchema } from '@/lib/utils/validation';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   try {
//     // Validate request body
//     const validatedData = await otpSchema.validate(req.body);
//     const { email, otp } = req.body;

//     await connectDB();

//     const user = await User.findOne({ 
//       email,
//       emailVerificationToken: otp,
//       emailVerificationExpires: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid or expired OTP'
//       });
//     }

//     // Mark email as verified
//     user.isEmailVerified = true;
//     user.emailVerificationToken = undefined;
//     user.emailVerificationExpires = undefined;
    
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: 'Email verified successfully'
//     });
//   } catch (error: any) {
//     console.error('OTP verification error:', error);
    
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({
//         success: false,
//         message: error.message
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// }








// // src/pages/api/auth/verify-otp.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import connectDB from '@/lib/db/connection';
// import { User } from '@/lib/db/models';
// import { otpSchema } from '@/lib/utils/validation';

// interface ValidationError extends Error {
//   name: string;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   try {
//     // Validate request body
//     await otpSchema.validate(req.body);
//     const { email, otp } = req.body;

//     await connectDB();

//     const user = await User.findOne({ 
//       email,
//       emailVerificationToken: otp,
//       emailVerificationExpires: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid or expired OTP'
//       });
//     }

//     // Mark email as verified
//     user.isEmailVerified = true;
//     user.emailVerificationToken = undefined;
//     user.emailVerificationExpires = undefined;
    
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: 'Email verified successfully'
//     });
//   } catch (error: unknown) {
//     console.error('OTP verification error:', error);
    
//     if ((error as ValidationError).name === 'ValidationError') {
//       return res.status(400).json({
//         success: false,
//         message: (error as ValidationError).message
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// }






// src/pages/api/auth/verify-otp.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import User from '@/lib/db/models/User';

interface ValidationError extends Error {
  name: string;
}

// Simple OTP validation function
function validateOtpData(data: { email?: string; otp?: string }): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.email) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }
  
  if (!data.otp) {
    errors.push('OTP is required');
  } else if (!/^\d{6}$/.test(data.otp)) {
    errors.push('OTP must be a 6-digit number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email, otp } = req.body;

    // Validate request body
    const validation = validateOtpData({ email, otp });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.errors[0],
        errors: validation.errors
      });
    }

    await connectDB();

    const user = await User.findOne({ 
      email: email.toLowerCase().trim(),
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
  } catch (error: unknown) {
    console.error('OTP verification error:', error);
    
    if ((error as ValidationError).name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: (error as ValidationError).message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}