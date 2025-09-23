// // src/pages/api/test-email.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import EmailService from '@/lib/email/emailService';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     const { email, firstName } = req.body;

//     if (!email || !firstName) {
//       return res.status(400).json({
//         error: 'Email and firstName are required',
//         hint: 'Send POST request with { email: "test@example.com", firstName: "Test" }'
//       });
//     }

//     console.log('🧪 Testing email functionality...');
//     console.log('Environment check:');
//     console.log('SMTP_USER:', process.env.SMTP_USER ? '✅ Set' : '❌ Not set');
//     console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? '✅ Set' : '❌ Not set');
//     console.log('SMTP_HOST:', process.env.SMTP_HOST || 'smtp.gmail.com (default)');

//     // Test SMTP connection first
//     console.log('🔍 Testing SMTP connection...');
//     const connectionTest = await EmailService.testConnection();
    
//     if (!connectionTest) {
//       return res.status(500).json({
//         success: false,
//         error: 'SMTP connection failed',
//         debug: {
//           smtpUser: !!process.env.SMTP_USER,
//           smtpPassword: !!process.env.SMTP_PASSWORD,
//           smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com'
//         }
//       });
//     }

//     // Send test welcome email
//     console.log('📧 Sending test welcome email...');
//     const emailSent = await EmailService.sendWelcomeEmail(email, firstName);

//     if (emailSent) {
//       return res.status(200).json({
//         success: true,
//         message: 'Test email sent successfully!',
//         details: {
//           to: email,
//           firstName: firstName,
//           smtpConnectionOk: true
//         }
//       });
//     } else {
//       return res.status(500).json({
//         success: false,
//         error: 'Failed to send test email',
//         smtpConnectionOk: true
//       });
//     }

//   } catch (error: any) {
//     console.error('❌ Test email error:', error);
//     return res.status(500).json({
//       success: false,
//       error: 'Test email failed',
//       details: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// }









// src/pages/api/test-email.ts
import { NextApiRequest, NextApiResponse } from 'next';
import EmailService from '@/lib/email/emailService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstName } = req.body;

    if (!email || !firstName) {
      return res.status(400).json({
        error: 'Email and firstName are required',
        hint: 'Send POST request with { email: "test@example.com", firstName: "Test" }'
      });
    }

    console.log('🧪 Testing email functionality...');
    console.log('Environment check:');
    console.log('SMTP_USER:', process.env.SMTP_USER ? '✅ Set' : '❌ Not set');
    console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? '✅ Set' : '❌ Not set');
    console.log('SMTP_HOST:', process.env.SMTP_HOST || 'smtp.gmail.com (default)');

    // Test SMTP connection first
    console.log('🔍 Testing SMTP connection...');
    const connectionTest = await EmailService.testConnection();
    
    if (!connectionTest) {
      return res.status(500).json({
        success: false,
        error: 'SMTP connection failed',
        debug: {
          smtpUser: !!process.env.SMTP_USER,
          smtpPassword: !!process.env.SMTP_PASSWORD,
          smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com'
        }
      });
    }

    // Send test welcome email
    console.log('📧 Sending test welcome email...');
    const emailSent = await EmailService.sendWelcomeEmail(email, firstName);

    if (emailSent) {
      return res.status(200).json({
        success: true,
        message: 'Test email sent successfully!',
        details: {
          to: email,
          firstName: firstName,
          smtpConnectionOk: true
        }
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Failed to send test email',
        smtpConnectionOk: true
      });
    }

  } catch (error: unknown) {
    console.error('❌ Test email error:', error);
    return res.status(500).json({
      success: false,
      error: 'Test email failed',
      details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    });
  }
}