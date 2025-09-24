


// // src/pages/api/auth/forgot-password.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectDB } from '@/lib/db/connection';
// import { User } from '@/lib/db/models/User';
// import { generateRandomToken } from '@/lib/auth/utils';
// import { validateEmail } from '@/lib/utils/validation';
// import transporter, { emailConfig } from '@/lib/email/config';
// import { emailTemplates } from '@/lib/email/templates';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).json({ 
//       success: false, 
//       message: `Method ${req.method} not allowed` 
//     });
//   }

//   try {
//     await connectDB();

//     const { email } = req.body;

//     if (!email || !validateEmail(email)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Valid email is required'
//       });
//     }

//     // Find user by email
//     const user = await User.findOne({ email: email.toLowerCase() });

//     // Always return success for security (don't reveal if email exists)
//     if (!user) {
//       return res.status(200).json({
//         success: true,
//         message: 'If an account exists with this email, a password reset link has been sent'
//       });
//     }

//     // Generate reset token
//     const resetToken = generateRandomToken();
//     const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

//     // Save reset token to user
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = resetTokenExpiry;
//     await user.save();

//     // Create reset URL
//     const resetUrl = `${emailConfig.websiteUrl}/auth/reset-password?token=${resetToken}`;

//     // Send email
//     try {
//       const emailTemplate = emailTemplates.forgotPassword({
//         name: user.firstName || user.name,
//         resetUrl
//       });

//       await transporter.sendMail({
//         from: emailConfig.from,
//         to: email,
//         subject: emailTemplate.subject,
//         html: emailTemplate.html,
//       });

//       console.log(`Password reset email sent to: ${email}`);
//     } catch (emailError) {
//       console.error('Email sending failed:', emailError);
//       // Don't reveal email sending failure to user for security
//     }

//     return res.status(200).json({
//       success: true,
//       message: 'If an account exists with this email, a password reset link has been sent'
//     });

//   } catch (error) {
//     console.error('Forgot password error:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// }



// src/pages/api/auth/forgot-password.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/db/connection';
import { User } from '@/lib/db/models/User';
import { generateRandomToken } from '@/lib/auth/utils';
import { validateEmail } from '@/lib/utils/validation';
import transporter, { emailConfig } from '@/lib/email/config';
import { emailTemplates } from '@/lib/email/templates';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} not allowed` 
    });
  }

  try {
    await connectDB();

    const { email } = req.body;

    // Validate email
    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email is required'
      });
    }

    // Find user by email (case insensitive)
    const user = await User.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') } 
    });

    // Always return success for security (don't reveal if email exists)
    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent'
      });
    }

    // Generate reset token
    const resetToken = generateRandomToken();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Save reset token to user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // Create reset URL - ensure it uses the correct production domain
    const baseUrl = process.env.NEXTAUTH_URL || 'https://www.travelquench.in';
    const resetUrl = `${baseUrl}/auth/reset-password?token=${resetToken}`;

    // Send email
    try {
      const emailTemplate = emailTemplates.forgotPassword({
        name: user.firstName || user.name || 'User',
        resetUrl
      });

      await transporter.sendMail({
        from: emailConfig.from,
        to: email.toLowerCase(),
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      });

      console.log(`Password reset email sent to: ${email}`);
      console.log(`Reset URL: ${resetUrl}`);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Clear the reset token if email fails
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      
      return res.status(500).json({
        success: false,
        message: 'Failed to send password reset email. Please try again.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again.'
    });
  }
}