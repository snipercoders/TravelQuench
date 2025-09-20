// pages/api/auth/forgot-password.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import User from '@/lib/db/models/User';
import { generateRandomToken } from '@/lib/auth/utils';
import { validateEmail } from '@/lib/utils/validation';
import transporter from '@/lib/email/config';
import { emailTemplates } from '@/lib/email/templates';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { email } = req.body;

    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      return res.status(400).json({ success: false, message: emailError.message });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Don't reveal if user exists or not
      return res.status(200).json({ 
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link.' 
      });
    }

    // Generate reset token
    const resetToken = generateRandomToken();
    const resetExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save reset token
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetExpiry;
    await user.save();

    // Send reset email
    try {
      const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;
      const resetTemplate = emailTemplates.resetPassword(user.name, resetUrl);

      await transporter.sendMail({
        from: `"Travel Quench" <${process.env.SMTP_USER}>`,
        to: email,
        subject: resetTemplate.subject,
        html: resetTemplate.html,
      });

      console.log('Password reset email sent to:', email);
    } catch (emailError) {
      console.error('Error sending reset email:', emailError);
      return res.status(500).json({ success: false, message: 'Failed to send reset email. Please try again.' });
    }

    res.status(200).json({ 
      success: true,
      message: 'If an account exists with this email, you will receive a password reset link.'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ success: false, message: 'Internal server error. Please try again.' });
  }
}