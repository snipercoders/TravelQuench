// src/pages/api/email/send-confirmation.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { sendConfirmationEmail } from '@/lib/email/templates';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email, firstName, otp } = req.body;

    if (!email || !firstName || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    await sendConfirmationEmail(email, firstName, otp);

    res.status(200).json({
      success: true,
      message: 'Confirmation email sent successfully'
    });
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send confirmation email'
    });
  }
}