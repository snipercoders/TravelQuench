
// // src/pages/api/auth/signup.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import connectDB from '@/lib/db/connection';
// import User from '@/lib/db/models/User';
// import { hashPassword, generateRandomToken } from '@/lib/auth/utils';
// import transporter from '@/lib/email/config';
// import { emailTemplates } from '@/lib/email/templates';

// // Server-side validation function
// const validateSignupServer = (data: any) => {
//   const errors: string[] = [];

//   // Name validation
//   if (!data.name || !data.name.trim()) {
//     errors.push('Name is required');
//   } else if (data.name.trim().length < 2) {
//     errors.push('Name must be at least 2 characters long');
//   } else if (data.name.trim().length > 100) {
//     errors.push('Name cannot exceed 100 characters');
//   } else if (!/^[a-zA-Z\s'-]+$/.test(data.name.trim())) {
//     errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
//   }

//   // Email validation
//   if (!data.email || !data.email.trim()) {
//     errors.push('Email is required');
//   } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
//     errors.push('Please enter a valid email address');
//   }

//   // Phone validation (optional)
//   if (data.phone && data.phone.trim()) {
//     const cleanPhone = data.phone.replace(/\D/g, ''); // Remove non-digits
//     if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
//       errors.push('Please enter a valid 10-digit phone number starting with 6-9');
//     }
//   }

//   // Password validation
//   if (!data.password) {
//     errors.push('Password is required');
//   } else if (data.password.length < 6) {
//     errors.push('Password must be at least 6 characters long');
//   } else if (data.password.length > 128) {
//     errors.push('Password must be less than 128 characters');
//   } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(data.password)) {
//     errors.push('Password must contain at least one letter and one number');
//   }

//   // Confirm password validation
//   if (!data.confirmPassword) {
//     errors.push('Please confirm your password');
//   } else if (data.password !== data.confirmPassword) {
//     errors.push('Passwords do not match');
//   }

//   return errors;
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   try {
//     await connectDB();

//     const { name, email, phone, password, confirmPassword } = req.body;

//     // Server-side validation
//     const validationErrors = validateSignupServer({ 
//       name, 
//       email, 
//       phone, 
//       password, 
//       confirmPassword 
//     });
    
//     if (validationErrors.length > 0) {
//       return res.status(400).json({ 
//         success: false,
//         message: validationErrors[0], // Return first error as main message
//         errors: validationErrors 
//       });
//     }

//     // Clean and prepare data
//     const cleanName = name.trim();
//     const cleanEmail = email.toLowerCase().trim();
//     const cleanPhone = phone ? phone.replace(/\D/g, '') : null; // Keep only digits

//     // Check if user already exists
//     const existingUser = await User.findOne({ email: cleanEmail });
//     if (existingUser) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'An account with this email address already exists' 
//       });
//     }

//     // Check if phone is already in use (if provided)
//     if (cleanPhone) {
//       const existingPhoneUser = await User.findOne({ phone: cleanPhone });
//       if (existingPhoneUser) {
//         return res.status(400).json({ 
//           success: false,
//           message: 'An account with this phone number already exists' 
//         });
//       }
//     }

//     // Hash password
//     const hashedPassword = await hashPassword(password);

//     // Generate email verification token
//     const emailVerificationToken = generateRandomToken();
//     const emailVerificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

//     // Create user with clean data
//     const userData = {
//       name: cleanName,
//       email: cleanEmail,
//       phone: cleanPhone,
//       password: hashedPassword,
//       emailVerificationToken,
//       emailVerificationExpiry,
//       isEmailVerified: false,
//       role: 'customer'
//     };

//     const user = new User(userData);
//     const savedUser = await user.save();

//     // Send welcome email (don't fail signup if email fails)
//     try {
//       const welcomeTemplate = emailTemplates.welcomeEmail(cleanName);
      
//       await transporter.sendMail({
//         from: `"Travel Quench" <${process.env.SMTP_USER}>`,
//         to: cleanEmail,
//         subject: welcomeTemplate.subject,
//         html: welcomeTemplate.html,
//       });

//       console.log('Welcome email sent successfully to:', cleanEmail);
//     } catch (emailError) {
//       console.error('Error sending welcome email:', emailError);
//       // Continue with successful signup even if email fails
//     }

//     // Return success response
//     res.status(201).json({
//       success: true,
//       message: 'Account created successfully! Welcome to Travel Quench.',
//       user: {
//         id: savedUser._id.toString(),
//         name: savedUser.name,
//         email: savedUser.email,
//         phone: savedUser.phone,
//         role: savedUser.role,
//         isEmailVerified: savedUser.isEmailVerified,
//         createdAt: savedUser.createdAt.toISOString()
//       }
//     });

//   } catch (error) {
//     console.error('Signup error:', error);
    
//     // Handle specific MongoDB errors
//     if (error.code === 11000) {
//       // Duplicate key error
//       const field = Object.keys(error.keyPattern || {})[0];
//       const message = field === 'email' 
//         ? 'An account with this email address already exists'
//         : field === 'phone'
//         ? 'An account with this phone number already exists'
//         : 'Account already exists';
      
//       return res.status(400).json({ 
//         success: false,
//         message 
//       });
//     }
    
//     // Handle Mongoose validation errors
//     if (error.name === 'ValidationError') {
//       const messages = Object.values(error.errors).map((err: any) => err.message);
//       return res.status(400).json({ 
//         success: false,
//         message: messages[0] || 'Validation failed',
//         errors: messages
//       });
//     }
    
//     // Generic server error
//     res.status(500).json({ 
//       success: false,
//       message: 'Unable to create account. Please try again.' 
//     });
//   }
// }





// src/pages/api/auth/signup.ts - FIXED
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import User from '@/lib/db/models/User';
import { generateRandomToken } from '@/lib/auth/utils'; // Remove hashPassword import
import transporter from '@/lib/email/config';
import { emailTemplates } from '@/lib/email/templates';

// Server-side validation function
const validateSignupServer = (data: any) => {
  const errors: string[] = [];

  // Name validation
  if (!data.name || !data.name.trim()) {
    errors.push('Name is required');
  } else if (data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (data.name.trim().length > 100) {
    errors.push('Name cannot exceed 100 characters');
  } else if (!/^[a-zA-Z\s'-]+$/.test(data.name.trim())) {
    errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
  }

  // Email validation
  if (!data.email || !data.email.trim()) {
    errors.push('Email is required');
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
    errors.push('Please enter a valid email address');
  }

  // Phone validation (optional)
  if (data.phone && data.phone.trim()) {
    const cleanPhone = data.phone.replace(/\D/g, ''); // Remove non-digits
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errors.push('Please enter a valid 10-digit phone number starting with 6-9');
    }
  }

  // Password validation
  if (!data.password) {
    errors.push('Password is required');
  } else if (data.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  } else if (data.password.length > 128) {
    errors.push('Password must be less than 128 characters');
  } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(data.password)) {
    errors.push('Password must contain at least one letter and one number');
  }

  // Confirm password validation
  if (!data.confirmPassword) {
    errors.push('Please confirm your password');
  } else if (data.password !== data.confirmPassword) {
    errors.push('Passwords do not match');
  }

  return errors;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { name, email, phone, password, confirmPassword } = req.body;

    // Server-side validation
    const validationErrors = validateSignupServer({ 
      name, 
      email, 
      phone, 
      password, 
      confirmPassword 
    });
    
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: validationErrors[0], // Return first error as main message
        errors: validationErrors 
      });
    }

    // Clean and prepare data
    const cleanName = name.trim();
    const cleanEmail = email.toLowerCase().trim();
    const cleanPhone = phone ? phone.replace(/\D/g, '') : null; // Keep only digits

    // Check if user already exists
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'An account with this email address already exists' 
      });
    }

    // Check if phone is already in use (if provided)
    if (cleanPhone) {
      const existingPhoneUser = await User.findOne({ phone: cleanPhone });
      if (existingPhoneUser) {
        return res.status(400).json({ 
          success: false,
          message: 'An account with this phone number already exists' 
        });
      }
    }

    // FIXED: Don't hash password manually - let User model handle it
    // const hashedPassword = await hashPassword(password); // REMOVE THIS LINE

    // Generate email verification token
    const emailVerificationToken = generateRandomToken();
    const emailVerificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user with clean data - Use plain password, let User model hash it
    const userData = {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      password: password, // FIXED: Use plain password, not hashed
      verificationToken: emailVerificationToken, // FIXED: Use correct field name
      verificationTokenExpires: emailVerificationExpiry, // FIXED: Use correct field name
      isVerified: false, // FIXED: Use correct field name
      role: 'customer'
    };

    console.log('Creating user with plain password length:', password.length);

    const user = new User(userData);
    const savedUser = await user.save();

    console.log('User saved with hashed password length:', savedUser.password.length);

    // Send welcome email (don't fail signup if email fails)
    try {
      const welcomeTemplate = emailTemplates.welcomeEmail(cleanName);
      
      await transporter.sendMail({
        from: `"Travel Quench" <${process.env.SMTP_USER}>`,
        to: cleanEmail,
        subject: welcomeTemplate.subject,
        html: welcomeTemplate.html,
      });

      console.log('Welcome email sent successfully to:', cleanEmail);
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      // Continue with successful signup even if email fails
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to Travel Quench.',
      user: {
        id: savedUser._id.toString(),
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone,
        role: savedUser.role,
        isEmailVerified: savedUser.isVerified, // FIXED: Use correct field name
        createdAt: savedUser.createdAt.toISOString()
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyPattern || {})[0];
      const message = field === 'email' 
        ? 'An account with this email address already exists'
        : field === 'phone'
        ? 'An account with this phone number already exists'
        : 'Account already exists';
      
      return res.status(400).json({ 
        success: false,
        message 
      });
    }
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ 
        success: false,
        message: messages[0] || 'Validation failed',
        errors: messages
      });
    }
    
    // Generic server error
    res.status(500).json({ 
      success: false,
      message: 'Unable to create account. Please try again.' 
    });
  }
}