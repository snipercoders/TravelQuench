// // lib/email/config.ts
// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT || '587'),
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

// export default transporter;






// src/lib/email/config.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD, // Use SMTP_PASSWORD to match your .env
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to take our messages');
  }
});

export default transporter;

export const emailConfig = {
  from: process.env.SMTP_USER || 'anshjamwal10102003@gmail.com',
  replyTo: process.env.SMTP_USER || 'anshjamwal10102003@gmail.com',
  companyName: 'Travel Quench',
  websiteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
};