// // lib/email/templates.ts
// export const emailTemplates = {
//   welcomeEmail: (name: string) => ({
//     subject: '🎉 Welcome to Travel Quench - Your Adventure Awaits!',
//     html: `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <meta charset="utf-8">
//           <style>
//             body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//             .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//             .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
//             .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
//             .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
//             .feature { margin: 20px 0; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
//             .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>🌟 Welcome to Travel Quench!</h1>
//               <p>Your journey to incredible destinations starts here</p>
//             </div>
//             <div class="content">
//               <h2>Hello ${name}! 👋</h2>
//               <p>Thank you for joining Travel Quench! We're thrilled to have you as part of our travel community.</p>
              
//               <div class="feature">
//                 <h3>🌍 What's waiting for you:</h3>
//                 <ul>
//                   <li><strong>Exclusive Travel Packages:</strong> Handcrafted experiences to amazing destinations</li>
//                   <li><strong>Personalized Recommendations:</strong> Tailored suggestions based on your preferences</li>
//                   <li><strong>24/7 Support:</strong> We're here to help make your travel dreams come true</li>
//                   <li><strong>Best Price Guarantee:</strong> Amazing experiences at unbeatable prices</li>
//                 </ul>
//               </div>

//               <div class="feature">
//                 <h3>🚀 Ready to start exploring?</h3>
//                 <p>Browse our curated collection of travel packages and find your next adventure!</p>
//                 <a href="${process.env.NEXTAUTH_URL}/packages/international" class="button">
//                   Explore International Packages
//                 </a>
//                 <a href="${process.env.NEXTAUTH_URL}/packages/indian" class="button">
//                   Discover Indian Destinations
//                 </a>
//               </div>

//               <div class="feature">
//                 <h3>💬 Need Help?</h3>
//                 <p>Our travel experts are just a message away!</p>
//                 <p>📞 WhatsApp: +91 ${process.env.WHATSAPP_PHONE_NUMBER}</p>
//                 <p>📧 Email: ${process.env.SMTP_USER}</p>
//               </div>

//               <p>We can't wait to be part of your travel story. Start exploring and let the adventures begin!</p>
              
//               <p>Happy travels,<br>
//               <strong>The Travel Quench Team</strong> ✈️</p>
//             </div>
//             <div class="footer">
//               <p>Travel Quench - Making Travel Dreams Come True</p>
//               <p>© 2025 Travel Quench. All rights reserved.</p>
//             </div>
//           </div>
//         </body>
//       </html>
//     `
//   }),

//   emailVerification: (name: string, verificationUrl: string) => ({
//     subject: '✅ Verify Your Email - Travel Quench',
//     html: `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <meta charset="utf-8">
//           <style>
//             body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//             .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//             .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
//             .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
//             .button { display: inline-block; background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
//             .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>📧 Email Verification</h1>
//             </div>
//             <div class="content">
//               <h2>Hi ${name}!</h2>
//               <p>Welcome to Travel Quench! Please verify your email address to complete your registration.</p>
              
//               <div style="text-align: center; margin: 30px 0;">
//                 <a href="${verificationUrl}" class="button">Verify Email Address</a>
//               </div>
              
//               <p><strong>Note:</strong> This verification link will expire in 24 hours for security reasons.</p>
              
//               <p>If you didn't create an account with Travel Quench, please ignore this email.</p>
              
//               <p>Thanks,<br>
//               <strong>Travel Quench Team</strong></p>
//             </div>
//             <div class="footer">
//               <p>Travel Quench - Your Adventure Awaits</p>
//             </div>
//           </div>
//         </body>
//       </html>
//     `
//   }),

//   resetPassword: (name: string, resetUrl: string) => ({
//     subject: '🔒 Reset Your Password - Travel Quench',
//     html: `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <meta charset="utf-8">
//           <style>
//             body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//             .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//             .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
//             .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
//             .button { display: inline-block; background: #dc3545; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
//             .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>🔐 Password Reset</h1>
//             </div>
//             <div class="content">
//               <h2>Hi ${name}!</h2>
//               <p>We received a request to reset your password for your Travel Quench account.</p>
              
//               <div style="text-align: center; margin: 30px 0;">
//                 <a href="${resetUrl}" class="button">Reset Password</a>
//               </div>
              
//               <p><strong>Important:</strong> This reset link will expire in 1 hour for security reasons.</p>
              
//               <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
              
//               <p>Best regards,<br>
//               <strong>Travel Quench Team</strong></p>
//             </div>
//             <div class="footer">
//               <p>Travel Quench - Your Adventure Awaits</p>
//             </div>
//           </div>
//         </body>
//       </html>
//     `
//   })
// };











// src/lib/email/templates.ts
interface EmailTemplateProps {
  name?: string;
  email?: string;
  resetUrl?: string;
  verificationUrl?: string;
  otp?: string;
  bookingDetails?: any;
}

const baseStyles = `
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
`;

const buttonStyles = `
  background-color: #2563eb;
  color: white;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 6px;
  display: inline-block;
  font-weight: 600;
  text-align: center;
`;

export const emailTemplates = {
  forgotPassword: ({ name, resetUrl }: EmailTemplateProps) => ({
    subject: 'Reset Your Password - Travel Quench',
    html: `
      <div style="${baseStyles}">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">Travel Quench</h1>
        </div>
        
        <h2 style="color: #1f2937; margin-bottom: 20px;">Reset Your Password</h2>
        
        ${name ? `<p>Hi ${name},</p>` : '<p>Hello,</p>'}
        
        <p>You requested a password reset for your Travel Quench account. Click the button below to reset your password:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="${buttonStyles}">
            Reset Password
          </a>
        </div>
        
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all; background-color: #f3f4f6; padding: 10px; border-radius: 4px;">
          <a href="${resetUrl}">${resetUrl}</a>
        </p>
        
        <p><strong>This link will expire in 1 hour for security reasons.</strong></p>
        
        <p>If you didn't request this password reset, please ignore this email and your password will remain unchanged.</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        
        <div style="color: #6b7280; font-size: 14px; text-align: center;">
          <p>Best regards,<br>Travel Quench Team</p>
          <p>If you have any questions, contact us at support@travelquench.com</p>
        </div>
      </div>
    `
  }),

  emailVerification: ({ name, verificationUrl }: EmailTemplateProps) => ({
    subject: 'Verify Your Email - Travel Quench',
    html: `
      <div style="${baseStyles}">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">Travel Quench</h1>
        </div>
        
        <h2 style="color: #1f2937; margin-bottom: 20px;">Verify Your Email Address</h2>
        
        ${name ? `<p>Hi ${name},</p>` : '<p>Hello,</p>'}
        
        <p>Thank you for signing up with Travel Quench! Please verify your email address by clicking the button below:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="${buttonStyles}">
            Verify Email Address
          </a>
        </div>
        
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all; background-color: #f3f4f6; padding: 10px; border-radius: 4px;">
          <a href="${verificationUrl}">${verificationUrl}</a>
        </p>
        
        <p>If you didn't create an account with Travel Quench, please ignore this email.</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        
        <div style="color: #6b7280; font-size: 14px; text-align: center;">
          <p>Best regards,<br>Travel Quench Team</p>
        </div>
      </div>
    `
  }),

  otpVerification: ({ name, otp }: EmailTemplateProps) => ({
    subject: 'Your Verification Code - Travel Quench',
    html: `
      <div style="${baseStyles}">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">Travel Quench</h1>
        </div>
        
        <h2 style="color: #1f2937; margin-bottom: 20px;">Your Verification Code</h2>
        
        ${name ? `<p>Hi ${name},</p>` : '<p>Hello,</p>'}
        
        <p>Your verification code is:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <div style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 8px; background-color: #eff6ff; padding: 20px; border-radius: 8px; border: 2px solid #bfdbfe;">
            ${otp}
          </div>
        </div>
        
        <p>This code will expire in 10 minutes for security reasons.</p>
        
        <p>If you didn't request this code, please ignore this email.</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        
        <div style="color: #6b7280; font-size: 14px; text-align: center;">
          <p>Best regards,<br>Travel Quench Team</p>
        </div>
      </div>
    `
  }),

  bookingConfirmation: ({ name, bookingDetails }: EmailTemplateProps) => ({
    subject: `Booking Confirmation - ${bookingDetails?.packageTitle} - Travel Quench`,
    html: `
      <div style="${baseStyles}">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">Travel Quench</h1>
        </div>
        
        <h2 style="color: #1f2937; margin-bottom: 20px;">Booking Confirmation</h2>
        
        <p>Hi ${name || 'Valued Customer'},</p>
        
        <p>Thank you for booking with Travel Quench! Your booking has been confirmed.</p>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2563eb; margin-top: 0;">Booking Details</h3>
          <p><strong>Booking ID:</strong> ${bookingDetails?.bookingId}</p>
          <p><strong>Package:</strong> ${bookingDetails?.packageTitle}</p>
          <p><strong>Destination:</strong> ${bookingDetails?.destination}</p>
          <p><strong>Travel Date:</strong> ${bookingDetails?.startDate}</p>
          <p><strong>Travelers:</strong> ${bookingDetails?.travelers}</p>
          <p><strong>Total Amount:</strong> ₹${bookingDetails?.totalAmount}</p>
        </div>
        
        <p>We'll send you more details about your trip soon. If you have any questions, please don't hesitate to contact us.</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        
        <div style="color: #6b7280; font-size: 14px; text-align: center;">
          <p>Best regards,<br>Travel Quench Team</p>
          <p>Contact: support@travelquench.com | +91-XXXXXXXXXX</p>
        </div>
      </div>
    `
  }),

  welcome: ({ name }: EmailTemplateProps) => ({
    subject: 'Welcome to Travel Quench!',
    html: `
      <div style="${baseStyles}">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">Travel Quench</h1>
        </div>
        
        <h2 style="color: #1f2937; margin-bottom: 20px;">Welcome to Travel Quench!</h2>
        
        <p>Hi ${name},</p>
        
        <p>Welcome to Travel Quench! We're excited to have you join our community of travel enthusiasts.</p>
        
        <p>Here's what you can do with your new account:</p>
        <ul style="padding-left: 20px;">
          <li>Browse and book amazing travel packages</li>
          <li>Save packages to your wishlist</li>
          <li>Track your booking history</li>
          <li>Get personalized travel recommendations</li>
          <li>Customize packages to your preferences</li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/packages" style="${buttonStyles}">
            Explore Packages
          </a>
        </div>
        
        <p>If you have any questions, our support team is always ready to help!</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        
        <div style="color: #6b7280; font-size: 14px; text-align: center;">
          <p>Happy travels,<br>Travel Quench Team</p>
          <p>Contact: support@travelquench.com</p>
        </div>
      </div>
    `
  })
};