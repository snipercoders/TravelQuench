
// // src/pages/api/auth/login.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import connectDB from '@/lib/db/connection';
// import User from '@/lib/db/models/User';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   try {
//     await connectDB();

//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Email and password are required' 
//       });
//     }

//     // Find user by email
//     const user = await User.findOne({ email: email.toLowerCase() });
    
//     if (!user) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Invalid email or password' 
//       });
//     }

//     // Check if user is active (you may need to add this field to your User model)
//     // For now, we'll assume all users are active
//     const isActive = true; // user.isActive !== false;

//     if (!isActive) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Account is deactivated. Please contact support.' 
//       });
//     }

//     // Verify password
//     const passwordValid = await bcrypt.compare(password, user.password);

//     if (!passwordValid) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Invalid email or password' 
//       });
//     }

//     // Generate JWT token
//     const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
//     const token = jwt.sign(
//       { 
//         userId: user._id.toString(), 
//         email: user.email, 
//         role: user.role 
//       },
//       JWT_SECRET,
//       { expiresIn: '7d' } // Token expires in 7 days
//     );

//     // Update last login time
//     user.lastLoginAt = new Date();
//     await user.save();

//     // Prepare user data to return (excluding password)
//     const userData = {
//       id: user._id.toString(),
//       name: user.name,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       phone: user.phone,
//       role: user.role,
//       isEmailVerified: user.isEmailVerified,
//       profileImage: user.profileImage,
//       totalBookings: 0, // TODO: Calculate from bookings
//       totalSpent: 0, // TODO: Calculate from bookings
//       lastLoginAt: user.lastLoginAt.toISOString(),
//       createdAt: user.createdAt.toISOString(),
//       isActive: true,
//       address: user.address,
//       preferences: user.preferences
//     };

//     return res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       token,
//       user: userData
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error. Please try again.' 
//     });
//   }
// }











// // // src/pages/api/auth/login.ts - Debug Version
// // import { NextApiRequest, NextApiResponse } from 'next';
// // import jwt from 'jsonwebtoken';
// // import bcrypt from 'bcryptjs';
// // import connectDB from '@/lib/db/connection';
// // import User from '@/lib/db/models/User';

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   if (req.method !== 'POST') {
// //     return res.status(405).json({ success: false, message: 'Method not allowed' });
// //   }

// //   try {
// //     await connectDB();

// //     const { email, password } = req.body;

// //     // Validate input
// //     if (!email || !password) {
// //       return res.status(400).json({ 
// //         success: false, 
// //         message: 'Email and password are required' 
// //       });
// //     }

// //     console.log('🔍 Login attempt for email:', email);
// //     console.log('🔍 Password length:', password.length);

// //     // Find user by email
// //     const user = await User.findOne({ email: email.toLowerCase() });
    
// //     if (!user) {
// //       console.log('❌ User not found:', email);
// //       return res.status(401).json({ 
// //         success: false, 
// //         message: 'Invalid email or password' 
// //       });
// //     }

// //     console.log('✅ User found:', user.email);
// //     console.log('🔍 User password hash exists:', !!user.password);
// //     console.log('🔍 Password hash preview:', user.password ? user.password.substring(0, 20) + '...' : 'No password');
// //     console.log('🔍 Password hash length:', user.password ? user.password.length : 0);

// //     // Debug: Check if password starts with bcrypt hash format
// //     const isBcryptHash = user.password && (user.password.startsWith('$2a$') || user.password.startsWith('$2b$'));
// //     console.log('🔍 Is valid bcrypt hash format:', isBcryptHash);

// //     if (!isBcryptHash) {
// //       console.log('❌ Password is not properly hashed in database');
// //       return res.status(500).json({ 
// //         success: false, 
// //         message: 'Account setup incomplete. Please contact support.' 
// //       });
// //     }

// //     // Try multiple password comparison methods
// //     console.log('🔍 Attempting password verification...');
    
// //     try {
// //       // Method 1: Using User model method
// //       const passwordValid1 = await user.comparePassword(password);
// //       console.log('🔍 User.comparePassword result:', passwordValid1);

// //       // Method 2: Direct bcrypt comparison
// //       const passwordValid2 = await bcrypt.compare(password, user.password);
// //       console.log('🔍 Direct bcrypt.compare result:', passwordValid2);

// //       // Method 3: Manual verification to debug
// //       const saltRounds = user.password.substring(0, 7); // Extract salt info
// //       console.log('🔍 Salt rounds from hash:', saltRounds);

// //       if (!passwordValid1 && !passwordValid2) {
// //         console.log('❌ All password verification methods failed');
        
// //         // Additional debugging: Try to hash the provided password and compare
// //         try {
// //           const testHash = await bcrypt.hash(password, 12);
// //           console.log('🔍 Test hash of provided password:', testHash.substring(0, 20) + '...');
          
// //           // Compare the new hash with stored hash to see if they use same algorithm
// //           const hashComparison = await bcrypt.compare(password, testHash);
// //           console.log('🔍 Test hash comparison (should be true):', hashComparison);
// //         } catch (hashError) {
// //           console.log('❌ Error creating test hash:', hashError);
// //         }

// //         return res.status(401).json({ 
// //           success: false, 
// //           message: 'Invalid email or password' 
// //         });
// //       }

// //       console.log('✅ Password verification successful');

// //     } catch (bcryptError) {
// //       console.log('❌ Error during password comparison:', bcryptError);
// //       return res.status(500).json({ 
// //         success: false, 
// //         message: 'Authentication error. Please try again.' 
// //       });
// //     }

// //     // Generate JWT token with correct structure
// //     const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
// //     const tokenPayload = {
// //       id: user._id.toString(),
// //       email: user.email,
// //       role: user.role,
// //       firstName: user.firstName || user.name.split(' ')[0],
// //       lastName: user.lastName || user.name.split(' ').slice(1).join(' ')
// //     };

// //     console.log('🔍 Creating token with payload:', tokenPayload);

// //     const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' });

// //     // Prepare user data to return
// //     const userData = {
// //       id: user._id.toString(),
// //       name: user.name,
// //       firstName: user.firstName || user.name.split(' ')[0],
// //       lastName: user.lastName || user.name.split(' ').slice(1).join(' '),
// //       email: user.email,
// //       phone: user.phone,
// //       role: user.role,
// //       isEmailVerified: user.isVerified,
// //       profileImage: user.avatar,
// //       totalBookings: 0,
// //       totalSpent: 0,
// //       createdAt: user.createdAt.toISOString(),
// //       isActive: true
// //     };

// //     console.log('✅ Login successful for user:', email);

// //     return res.status(200).json({
// //       success: true,
// //       message: 'Login successful',
// //       token,
// //       user: userData
// //     });

// //   } catch (error) {
// //     console.error('❌ Login error:', error);
// //     return res.status(500).json({ 
// //       success: false, 
// //       message: 'Internal server error. Please try again.' 
// //     });
// //   }
// // }

















// src/pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db/connection';
import User from '@/lib/db/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Check if user is active (you may need to add this field to your User model)
    // For now, we'll assume all users are active
    const isActive = true; // user.isActive !== false;

    if (!isActive) {
      return res.status(401).json({ 
        success: false, 
        message: 'Account is deactivated. Please contact support.' 
      });
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Generate JWT token
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
    const token = jwt.sign(
      { 
        userId: user._id.toString(), 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '7d' } // Token expires in 7 days
    );

    // Update last login time
    user.lastLoginAt = new Date();
    await user.save();

    // Prepare user data to return (excluding password)
    const userData = {
      id: user._id.toString(),
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      profileImage: user.profileImage,
      totalBookings: 0, // TODO: Calculate from bookings
      totalSpent: 0, // TODO: Calculate from bookings
      lastLoginAt: user.lastLoginAt.toISOString(),
      createdAt: user.createdAt.toISOString(),
      isActive: true,
      address: user.address,
      preferences: user.preferences
    };

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error. Please try again.' 
    });
  }
}