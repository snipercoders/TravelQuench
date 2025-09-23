// // pages/api/auth/reset-password.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import connectDB from '@/lib/db/connection';
// import User from '@/lib/db/models/User';
// import { hashPassword } from '@/lib/auth/utils';
// import { validatePassword } from '@/lib/utils/validation';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     await connectDB();

//     const { token, password, confirmPassword } = req.body;

//     if (!token) {
//       return res.status(400).json({ message: 'Reset token is required' });
//     }

//     // Validate password
//     const passwordError = validatePassword(password);
//     if (passwordError) {
//       return res.status(400).json({ message: passwordError.message });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     // Find user with valid reset token
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpiry: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired reset token' });
//     }

//     // Hash new password
//     const hashedPassword = await hashPassword(password);

//     // Update user
//     user.password = hashedPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpiry = undefined;
//     await user.save();

//     res.status(200).json({ 
//       message: 'Password reset successfully. You can now login with your new password.',
//       success: true 
//     });

//   } catch (error) {
//     console.error('Reset password error:', error);
//     res.status(500).json({ message: 'Internal server error. Please try again.' });
//   }
// }











// pages/api/auth/reset-password.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import User from '@/lib/db/models/User';
import { hashPassword } from '@/lib/auth/utils';

// Simple password validation function
function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('Password is required');
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { token, password, confirmPassword } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Reset token is required' });
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({ 
        message: 'Password validation failed', 
        errors: passwordValidation.errors 
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Hash new password
    const hashedPassword = await hashPassword(password);

    // Update user
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    res.status(200).json({ 
      message: 'Password reset successfully. You can now login with your new password.',
      success: true 
    });

  } catch (error: unknown) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Internal server error. Please try again.' });
  }
}
