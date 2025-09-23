// // src/lib/email/emailService.ts - CORRECTED VERSION
// import nodemailer from 'nodemailer';

// interface EmailOptions {
//   to: string;
//   subject: string;
//   html: string;
//   text?: string;
// }

// class EmailService {
//   private transporter: nodemailer.Transporter;

//   constructor() {
//     // Debug: Log environment variables (without exposing password)
//     console.log('📧 Email Service Configuration:');
//     console.log('SMTP_HOST:', process.env.SMTP_HOST || 'smtp.gmail.com (default)');
//     console.log('SMTP_PORT:', process.env.SMTP_PORT || '587 (default)');
//     console.log('SMTP_USER:', process.env.SMTP_USER ? 'Set ✅' : 'Missing ❌');
//     console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? 'Set ✅' : 'Missing ❌');

//     this.transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST || 'smtp.gmail.com',
//       port: Number(process.env.SMTP_PORT) || 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: process.env.SMTP_USER, // Your Gmail address
//         pass: process.env.SMTP_PASSWORD, // Your Gmail App Password
//       },
//       // Add these additional options for Gmail
//       tls: {
//         rejectUnauthorized: false
//       }
//     });
//   }

//   async sendEmail({ to, subject, html, text }: EmailOptions): Promise<boolean> {
//     try {
//       // Verify SMTP configuration before sending
//       if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
//         console.error('❌ SMTP credentials missing in environment variables');
//         console.error('Required: SMTP_USER and SMTP_PASSWORD');
//         return false;
//       }

//       console.log(`📤 Attempting to send email to: ${to}`);
//       console.log(`📤 From: ${process.env.SMTP_USER}`);

//       const mailOptions = {
//         from: {
//           name: 'Travel Quench',
//           address: process.env.SMTP_USER
//         },
//         to: to,
//         subject: subject,
//         html: html,
//         text: text || undefined,
//       };

//       console.log('📧 Mail options configured, sending...');
//       const info = await this.transporter.sendMail(mailOptions);

//       console.log('✅ Email sent successfully!');
//       console.log('Message ID:', info.messageId);
//       console.log('Response:', info.response);
//       return true;

//     } catch (error: any) {
//       console.error('❌ Failed to send email:', error);
//       console.error('Error code:', error.code);
//       console.error('Error message:', error.message);
      
//       // Provide specific error guidance
//       if (error.code === 'EDNS' || error.code === 'EBADNAME') {
//         console.error('🔍 DNS/Hostname error detected. This usually means:');
//         console.error('1. SMTP_HOST is incorrectly set');
//         console.error('2. Network connectivity issues');
//         console.error('3. Gmail SMTP server is blocked');
//       } else if (error.code === 'EAUTH') {
//         console.error('🔍 Authentication error. Check:');
//         console.error('1. SMTP_USER is correct Gmail address');
//         console.error('2. SMTP_PASSWORD is a Gmail App Password (not regular password)');
//         console.error('3. 2-Factor Authentication is enabled on Gmail');
//       }
      
//       return false;
//     }
//   }

//   async sendWelcomeEmail(email: string, firstName: string): Promise<boolean> {
//     const subject = 'Welcome to Travel Quench - Your Adventure Begins Now!';
    
//     const html = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Welcome to Travel Quench</title>
//           <style>
//               body {
//                   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//                   line-height: 1.6;
//                   color: #333;
//                   max-width: 600px;
//                   margin: 0 auto;
//                   padding: 20px;
//                   background-color: #f8f9fa;
//               }
//               .container {
//                   background: white;
//                   padding: 40px;
//                   border-radius: 10px;
//                   box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//               }
//               .header {
//                   text-align: center;
//                   margin-bottom: 30px;
//               }
//               .logo {
//                   font-size: 28px;
//                   font-weight: bold;
//                   color: #2563eb;
//                   margin-bottom: 10px;
//               }
//               .welcome-title {
//                   color: #1f2937;
//                   font-size: 24px;
//                   margin-bottom: 20px;
//               }
//               .content {
//                   margin-bottom: 30px;
//               }
//               .highlight {
//                   background-color: #eff6ff;
//                   padding: 20px;
//                   border-radius: 8px;
//                   border-left: 4px solid #2563eb;
//                   margin: 20px 0;
//               }
//               .features {
//                   list-style: none;
//                   padding: 0;
//               }
//               .features li {
//                   padding: 8px 0;
//                   padding-left: 25px;
//                   position: relative;
//               }
//               .features li::before {
//                   content: "✈️";
//                   position: absolute;
//                   left: 0;
//               }
//               .cta-button {
//                   display: inline-block;
//                   background-color: #2563eb;
//                   color: white;
//                   padding: 12px 25px;
//                   text-decoration: none;
//                   border-radius: 5px;
//                   font-weight: bold;
//                   margin: 20px 0;
//               }
//               .footer {
//                   text-align: center;
//                   margin-top: 40px;
//                   padding-top: 20px;
//                   border-top: 1px solid #e5e7eb;
//                   color: #6b7280;
//                   font-size: 14px;
//               }
//           </style>
//       </head>
//       <body>
//           <div class="container">
//               <div class="header">
//                   <div class="logo">Travel Quench</div>
//                   <h1 class="welcome-title">Welcome aboard, ${firstName}!</h1>
//               </div>
              
//               <div class="content">
//                   <p>Thank you for joining Travel Quench, your ultimate travel companion for discovering amazing destinations around the world!</p>
                  
//                   <div class="highlight">
//                       <strong>Your journey with us starts now!</strong><br>
//                       Get ready to explore breathtaking destinations, create unforgettable memories, and experience the world like never before.
//                   </div>
                  
//                   <p>As a valued member of our travel community, you now have access to:</p>
                  
//                   <ul class="features">
//                       <li>Curated travel packages to stunning destinations</li>
//                       <li>Expert travel guides and local insights</li>
//                       <li>Personalized recommendations based on your preferences</li>
//                       <li>Exclusive deals and early-bird offers</li>
//                       <li>24/7 customer support for all your travel needs</li>
//                   </ul>
                  
//                   <p>Whether you're dreaming of the serene backwaters of Kerala, the majestic palaces of Rajasthan, the snow-capped mountains of Himachal Pradesh, or exotic international destinations, we're here to make your travel dreams come true.</p>
                  
//                   <div style="text-align: center;">
//                       <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}" class="cta-button">Start Exploring Destinations</a>
//                   </div>
//               </div>
              
//               <div class="footer">
//                   <p><strong>Travel Quench Team</strong></p>
//                   <p>Making your travel dreams a reality, one destination at a time.</p>
//                   <p>Need help? Contact us at support@travelquench.com</p>
//                   <p style="font-size: 12px; margin-top: 20px;">
//                       This email was sent to ${email}. You received this because you signed up for Travel Quench.
//                   </p>
//               </div>
//           </div>
//       </body>
//       </html>
//     `;

//     const text = `
// Welcome to Travel Quench, ${firstName}!

// Thank you for joining our travel community. Your adventure begins now!

// As a member, you have access to:
// - Curated travel packages
// - Expert travel guides
// - Personalized recommendations
// - Exclusive deals
// - 24/7 customer support

// Start exploring: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}

// Happy travels!
// Travel Quench Team
//     `;

//     console.log(`📧 Preparing welcome email for ${firstName} at ${email}`);
//     return this.sendEmail({
//       to: email,
//       subject,
//       html,
//       text
//     });
//   }

//   // Test SMTP connection
//   async testConnection(): Promise<boolean> {
//     try {
//       console.log('🔍 Testing SMTP connection...');
//       await this.transporter.verify();
//       console.log('✅ SMTP connection verified successfully');
//       return true;
//     } catch (error: any) {
//       console.error('❌ SMTP connection test failed:', error);
//       console.error('Error details:', {
//         code: error.code,
//         message: error.message,
//         command: error.command
//       });
//       return false;
//     }
//   }
// }

// export default new EmailService();











// // src/lib/email/emailService.ts
// import nodemailer from 'nodemailer';

// // Define a type for nodemailer errors
// // interface NodemailerError extends Error {
// //   code?: string;
// //   message: string;
// //   command?: string;
// // }

// interface EmailOptions {
//   to: string;
//   subject: string;
//   html: string;
//   text?: string;
// }

// class EmailService {
//   private transporter: nodemailer.Transporter;

//   constructor() {
//     // Debug: Log environment variables (without exposing password)
//     console.log('📧 Email Service Configuration:');
//     console.log('SMTP_HOST:', process.env.SMTP_HOST || 'smtp.gmail.com (default)');
//     console.log('SMTP_PORT:', process.env.SMTP_PORT || '587 (default)');
//     console.log('SMTP_USER:', process.env.SMTP_USER ? 'Set ✅' : 'Missing ❌');
//     console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? 'Set ✅' : 'Missing ❌');

//     this.transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST || 'smtp.gmail.com',
//       port: Number(process.env.SMTP_PORT) || 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: process.env.SMTP_USER, // Your Gmail address
//         pass: process.env.SMTP_PASSWORD, // Your Gmail App Password
//       },
//       // Add these additional options for Gmail
//       tls: {
//         rejectUnauthorized: false,
//       },
//     });
//   }

//   async sendEmail({ to, subject, html, text }: EmailOptions): Promise<boolean> {
//     try {
//       // Verify SMTP configuration before sending
//       if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
//         console.error('❌ SMTP credentials missing in environment variables');
//         console.error('Required: SMTP_USER and SMTP_PASSWORD');
//         return false;
//       }

//       console.log(`📤 Attempting to send email to: ${to}`);
//       console.log(`📤 From: ${process.env.SMTP_USER}`);

//       const mailOptions = {
//         from: {
//           name: 'Travel Quench',
//           address: process.env.SMTP_USER,
//         },
//         to: to,
//         subject: subject,
//         html: html,
//         text: text || undefined,
//       };

//       console.log('📧 Mail options configured, sending...');
//       const info = await this.transporter.sendMail(mailOptions);

//       console.log('✅ Email sent successfully!');
//       console.log('Message ID:', info.messageId);
//       console.log('Response:', info.response);
//       return true;
//     } catch (error: NodemailerError) {
//       console.error('❌ Failed to send email:', error);
//       console.error('Error code:', error.code);
//       console.error('Error message:', error.message);

//       // Provide specific error guidance
//       if (error.code === 'EDNS' || error.code === 'EBADNAME') {
//         console.error('🔍 DNS/Hostname error detected. This usually means:');
//         console.error('1. SMTP_HOST is incorrectly set');
//         console.error('2. Network connectivity issues');
//         console.error('3. Gmail SMTP server is blocked');
//       } else if (error.code === 'EAUTH') {
//         console.error('🔍 Authentication error. Check:');
//         console.error('1. SMTP_USER is correct Gmail address');
//         console.error('2. SMTP_PASSWORD is a Gmail App Password (not regular password)');
//         console.error('3. 2-Factor Authentication is enabled on Gmail');
//       }

//       return false;
//     }
//   }

//   async sendWelcomeEmail(email: string, firstName: string): Promise<boolean> {
//     const subject = 'Welcome to Travel Quench - Your Adventure Begins Now!';

//     const html = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Welcome to Travel Quench</title>
//           <style>
//               body {
//                   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//                   line-height: 1.6;
//                   color: #333;
//                   max-width: 600px;
//                   margin: 0 auto;
//                   padding: 20px;
//                   background-color: #f8f9fa;
//               }
//               .container {
//                   background: white;
//                   padding: 40px;
//                   border-radius: 10px;
//                   box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//               }
//               .header {
//                   text-align: center;
//                   margin-bottom: 30px;
//               }
//               .logo {
//                   font-size: 28px;
//                   font-weight: bold;
//                   color: #2563eb;
//                   margin-bottom: 10px;
//               }
//               .welcome-title {
//                   color: #1f2937;
//                   font-size: 24px;
//                   margin-bottom: 20px;
//               }
//               .content {
//                   margin-bottom: 30px;
//               }
//               .highlight {
//                   background-color: #eff6ff;
//                   padding: 20px;
//                   border-radius: 8px;
//                   border-left: 4px solid #2563eb;
//                   margin: 20px 0;
//               }
//               .features {
//                   list-style: none;
//                   padding: 0;
//               }
//               .features li {
//                   padding: 8px 0;
//                   padding-left: 25px;
//                   position: relative;
//               }
//               .features li::before {
//                   content: "✈️";
//                   position: absolute;
//                   left: 0;
//               }
//               .cta-button {
//                   display: inline-block;
//                   background-color: #2563eb;
//                   color: white;
//                   padding: 12px 25px;
//                   text-decoration: none;
//                   border-radius: 5px;
//                   font-weight: bold;
//                   margin: 20px 0;
//               }
//               .footer {
//                   text-align: center;
//                   margin-top: 40px;
//                   padding-top: 20px;
//                   border-top: 1px solid #e5e7eb;
//                   color: #6b7280;
//                   font-size: 14px;
//               }
//           </style>
//       </head>
//       <body>
//           <div class="container">
//               <div class="header">
//                   <div class="logo">Travel Quench</div>
//                   <h1 class="welcome-title">Welcome aboard, ${firstName}!</h1>
//               </div>
              
//               <div class="content">
//                   <p>Thank you for joining Travel Quench, your ultimate travel companion for discovering amazing destinations around the world!</p>
                  
//                   <div class="highlight">
//                       <strong>Your journey with us starts now!</strong><br>
//                       Get ready to explore breathtaking destinations, create unforgettable memories, and experience the world like never before.
//                   </div>
                  
//                   <p>As a valued member of our travel community, you now have access to:</p>
                  
//                   <ul class="features">
//                       <li>Curated travel packages to stunning destinations</li>
//                       <li>Expert travel guides and local insights</li>
//                       <li>Personalized recommendations based on your preferences</li>
//                       <li>Exclusive deals and early-bird offers</li>
//                       <li>24/7 customer support for all your travel needs</li>
//                   </ul>
                  
//                   <p>Whether you're dreaming of the serene backwaters of Kerala, the majestic palaces of Rajasthan, the snow-capped mountains of Himachal Pradesh, or exotic international destinations, we're here to make your travel dreams come true.</p>
                  
//                   <div style="text-align: center;">
//                       <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}" class="cta-button">Start Exploring Destinations</a>
//                   </div>
//               </div>
              
//               <div class="footer">
//                   <p><strong>Travel Quench Team</strong></p>
//                   <p>Making your travel dreams a reality, one destination at a time.</p>
//                   <p>Need help? Contact us at support@travelquench.com</p>
//                   <p style="font-size: 12px; margin-top: 20px;">
//                       This email was sent to ${email}. You received this because you signed up for Travel Quench.
//                   </p>
//               </div>
//           </div>
//       </body>
//       </html>
//     `;

//     const text = `
// Welcome to Travel Quench, ${firstName}!

// Thank you for joining our travel community. Your adventure begins now!

// As a member, you have access to:
// - Curated travel packages
// - Expert travel guides
// - Personalized recommendations
// - Exclusive deals
// - 24/7 customer support

// Start exploring: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}

// Happy travels!
// Travel Quench Team
//     `;

//     console.log(`📧 Preparing welcome email for ${firstName} at ${email}`);
//     return this.sendEmail({
//       to: email,
//       subject,
//       html,
//       text,
//     });
//   }

//   // Test SMTP connection
//   async testConnection(): Promise<boolean> {
//     try {
//       console.log('🔍 Testing SMTP connection...');
//       await this.transporter.verify();
//       console.log('✅ SMTP connection verified successfully');
//       return true;
//     } catch (error: NodemailerError) {
//       console.error('❌ SMTP connection test failed:', error);
//       console.error('Error details:', {
//         code: error.code,
//         message: error.message,
//         command: error.command,
//       });
//       return false;
//     }
//   }
// }

// const emailService = new EmailService();
// export default emailService;












// src/lib/email/emailService.ts
import nodemailer from 'nodemailer';

// Define a type for nodemailer errors
interface NodemailerError extends Error {
  code?: string;
  message: string;
  command?: string;
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Debug: Log environment variables (without exposing password)
    console.log('📧 Email Service Configuration:');
    console.log('SMTP_HOST:', process.env.SMTP_HOST || 'smtp.gmail.com (default)');
    console.log('SMTP_PORT:', process.env.SMTP_PORT || '587 (default)');
    console.log('SMTP_USER:', process.env.SMTP_USER ? 'Set ✅' : 'Missing ❌');
    console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? 'Set ✅' : 'Missing ❌');

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // Your Gmail address
        pass: process.env.SMTP_PASSWORD, // Your Gmail App Password
      },
      // Add these additional options for Gmail
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendEmail({ to, subject, html, text }: EmailOptions): Promise<boolean> {
    try {
      // Verify SMTP configuration before sending
      if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
        console.error('❌ SMTP credentials missing in environment variables');
        console.error('Required: SMTP_USER and SMTP_PASSWORD');
        return false;
      }

      console.log(`📤 Attempting to send email to: ${to}`);
      console.log(`📤 From: ${process.env.SMTP_USER}`);

      const mailOptions = {
        from: {
          name: 'Travel Quench',
          address: process.env.SMTP_USER,
        },
        to: to,
        subject: subject,
        html: html,
        text: text || undefined,
      };

      console.log('📧 Mail options configured, sending...');
      const info = await this.transporter.sendMail(mailOptions);

      console.log('✅ Email sent successfully!');
      console.log('Message ID:', info.messageId);
      console.log('Response:', info.response);
      return true;
    } catch (error: unknown) {
      const nodeMailerError = error as NodemailerError;
      console.error('❌ Failed to send email:', nodeMailerError);
      console.error('Error code:', nodeMailerError.code);
      console.error('Error message:', nodeMailerError.message);

      // Provide specific error guidance
      if (nodeMailerError.code === 'EDNS' || nodeMailerError.code === 'EBADNAME') {
        console.error('🔍 DNS/Hostname error detected. This usually means:');
        console.error('1. SMTP_HOST is incorrectly set');
        console.error('2. Network connectivity issues');
        console.error('3. Gmail SMTP server is blocked');
      } else if (nodeMailerError.code === 'EAUTH') {
        console.error('🔍 Authentication error. Check:');
        console.error('1. SMTP_USER is correct Gmail address');
        console.error('2. SMTP_PASSWORD is a Gmail App Password (not regular password)');
        console.error('3. 2-Factor Authentication is enabled on Gmail');
      }

      return false;
    }
  }

  async sendWelcomeEmail(email: string, firstName: string): Promise<boolean> {
    const subject = 'Welcome to Travel Quench - Your Adventure Begins Now!';

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Travel Quench</title>
          <style>
              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #f8f9fa;
              }
              .container {
                  background: white;
                  padding: 40px;
                  border-radius: 10px;
                  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              .header {
                  text-align: center;
                  margin-bottom: 30px;
              }
              .logo {
                  font-size: 28px;
                  font-weight: bold;
                  color: #2563eb;
                  margin-bottom: 10px;
              }
              .welcome-title {
                  color: #1f2937;
                  font-size: 24px;
                  margin-bottom: 20px;
              }
              .content {
                  margin-bottom: 30px;
              }
              .highlight {
                  background-color: #eff6ff;
                  padding: 20px;
                  border-radius: 8px;
                  border-left: 4px solid #2563eb;
                  margin: 20px 0;
              }
              .features {
                  list-style: none;
                  padding: 0;
              }
              .features li {
                  padding: 8px 0;
                  padding-left: 25px;
                  position: relative;
              }
              .features li::before {
                  content: "✈️";
                  position: absolute;
                  left: 0;
              }
              .cta-button {
                  display: inline-block;
                  background-color: #2563eb;
                  color: white;
                  padding: 12px 25px;
                  text-decoration: none;
                  border-radius: 5px;
                  font-weight: bold;
                  margin: 20px 0;
              }
              .footer {
                  text-align: center;
                  margin-top: 40px;
                  padding-top: 20px;
                  border-top: 1px solid #e5e7eb;
                  color: #6b7280;
                  font-size: 14px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <div class="logo">Travel Quench</div>
                  <h1 class="welcome-title">Welcome aboard, ${firstName}!</h1>
              </div>
              
              <div class="content">
                  <p>Thank you for joining Travel Quench, your ultimate travel companion for discovering amazing destinations around the world!</p>
                  
                  <div class="highlight">
                      <strong>Your journey with us starts now!</strong><br>
                      Get ready to explore breathtaking destinations, create unforgettable memories, and experience the world like never before.
                  </div>
                  
                  <p>As a valued member of our travel community, you now have access to:</p>
                  
                  <ul class="features">
                      <li>Curated travel packages to stunning destinations</li>
                      <li>Expert travel guides and local insights</li>
                      <li>Personalized recommendations based on your preferences</li>
                      <li>Exclusive deals and early-bird offers</li>
                      <li>24/7 customer support for all your travel needs</li>
                  </ul>
                  
                  <p>Whether you&apos;re dreaming of the serene backwaters of Kerala, the majestic palaces of Rajasthan, the snow-capped mountains of Himachal Pradesh, or exotic international destinations, we&apos;re here to make your travel dreams come true.</p>
                  
                  <div style="text-align: center;">
                      <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}" class="cta-button">Start Exploring Destinations</a>
                  </div>
              </div>
              
              <div class="footer">
                  <p><strong>Travel Quench Team</strong></p>
                  <p>Making your travel dreams a reality, one destination at a time.</p>
                  <p>Need help? Contact us at support@travelquench.com</p>
                  <p style="font-size: 12px; margin-top: 20px;">
                      This email was sent to ${email}. You received this because you signed up for Travel Quench.
                  </p>
              </div>
          </div>
      </body>
      </html>
    `;

    const text = `
Welcome to Travel Quench, ${firstName}!

Thank you for joining our travel community. Your adventure begins now!

As a member, you have access to:
- Curated travel packages
- Expert travel guides
- Personalized recommendations
- Exclusive deals
- 24/7 customer support

Start exploring: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}

Happy travels!
Travel Quench Team
    `;

    console.log(`📧 Preparing welcome email for ${firstName} at ${email}`);
    return this.sendEmail({
      to: email,
      subject,
      html,
      text,
    });
  }

  // Test SMTP connection
  async testConnection(): Promise<boolean> {
    try {
      console.log('🔍 Testing SMTP connection...');
      await this.transporter.verify();
      console.log('✅ SMTP connection verified successfully');
      return true;
    } catch (error: unknown) {
      const nodeMailerError = error as NodemailerError;
      console.error('❌ SMTP connection test failed:', nodeMailerError);
      console.error('Error details:', {
        code: nodeMailerError.code,
        message: nodeMailerError.message,
        command: nodeMailerError.command,
      });
      return false;
    }
  }
}

const emailService = new EmailService();
export default emailService;