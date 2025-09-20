// lib/email/templates.ts
export const emailTemplates = {
  welcomeEmail: (name: string) => ({
    subject: '🎉 Welcome to Travel Quench - Your Adventure Awaits!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .feature { margin: 20px 0; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌟 Welcome to Travel Quench!</h1>
              <p>Your journey to incredible destinations starts here</p>
            </div>
            <div class="content">
              <h2>Hello ${name}! 👋</h2>
              <p>Thank you for joining Travel Quench! We're thrilled to have you as part of our travel community.</p>
              
              <div class="feature">
                <h3>🌍 What's waiting for you:</h3>
                <ul>
                  <li><strong>Exclusive Travel Packages:</strong> Handcrafted experiences to amazing destinations</li>
                  <li><strong>Personalized Recommendations:</strong> Tailored suggestions based on your preferences</li>
                  <li><strong>24/7 Support:</strong> We're here to help make your travel dreams come true</li>
                  <li><strong>Best Price Guarantee:</strong> Amazing experiences at unbeatable prices</li>
                </ul>
              </div>

              <div class="feature">
                <h3>🚀 Ready to start exploring?</h3>
                <p>Browse our curated collection of travel packages and find your next adventure!</p>
                <a href="${process.env.NEXTAUTH_URL}/packages/international" class="button">
                  Explore International Packages
                </a>
                <a href="${process.env.NEXTAUTH_URL}/packages/indian" class="button">
                  Discover Indian Destinations
                </a>
              </div>

              <div class="feature">
                <h3>💬 Need Help?</h3>
                <p>Our travel experts are just a message away!</p>
                <p>📞 WhatsApp: +91 ${process.env.WHATSAPP_PHONE_NUMBER}</p>
                <p>📧 Email: ${process.env.SMTP_USER}</p>
              </div>

              <p>We can't wait to be part of your travel story. Start exploring and let the adventures begin!</p>
              
              <p>Happy travels,<br>
              <strong>The Travel Quench Team</strong> ✈️</p>
            </div>
            <div class="footer">
              <p>Travel Quench - Making Travel Dreams Come True</p>
              <p>© 2025 Travel Quench. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  emailVerification: (name: string, verificationUrl: string) => ({
    subject: '✅ Verify Your Email - Travel Quench',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 Email Verification</h1>
            </div>
            <div class="content">
              <h2>Hi ${name}!</h2>
              <p>Welcome to Travel Quench! Please verify your email address to complete your registration.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </div>
              
              <p><strong>Note:</strong> This verification link will expire in 24 hours for security reasons.</p>
              
              <p>If you didn't create an account with Travel Quench, please ignore this email.</p>
              
              <p>Thanks,<br>
              <strong>Travel Quench Team</strong></p>
            </div>
            <div class="footer">
              <p>Travel Quench - Your Adventure Awaits</p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  resetPassword: (name: string, resetUrl: string) => ({
    subject: '🔒 Reset Your Password - Travel Quench',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #dc3545; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset</h1>
            </div>
            <div class="content">
              <h2>Hi ${name}!</h2>
              <p>We received a request to reset your password for your Travel Quench account.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </div>
              
              <p><strong>Important:</strong> This reset link will expire in 1 hour for security reasons.</p>
              
              <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
              
              <p>Best regards,<br>
              <strong>Travel Quench Team</strong></p>
            </div>
            <div class="footer">
              <p>Travel Quench - Your Adventure Awaits</p>
            </div>
          </div>
        </body>
      </html>
    `
  })
};