// // src/pages/api/auth/profile.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';
// import connectDB from '@/lib/db/connection';
// import User from '@/lib/db/models/User';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     await connectDB();

//     // Get the authorization header
//     const authHeader = req.headers.authorization;
    
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     // Extract the token
//     const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
//     // Verify the token
//     const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
//     let decoded;
    
//     try {
//       decoded = jwt.verify(token, JWT_SECRET) as any;
//     } catch (jwtError) {
//       console.error('JWT verification failed:', jwtError);
//       return res.status(401).json({ message: 'Invalid or expired token' });
//     }

//     // Find the user in database
//     const user = await User.findById(decoded.userId).select('-password');
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Update last login time
//     user.lastLoginAt = new Date();
//     await user.save();

//     // Calculate total bookings and spent (mock data for now)
//     const totalBookings = 0; // TODO: Calculate from bookings collection
//     const totalSpent = 0; // TODO: Calculate from bookings collection

//     // Return user profile data
//     const userProfile = {
//       id: user._id.toString(),
//       name: user.name,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       phone: user.phone,
//       role: user.role,
//       isEmailVerified: user.isEmailVerified,
//       profileImage: user.profileImage,
//       totalBookings,
//       totalSpent,
//       lastLoginAt: user.lastLoginAt.toISOString(),
//       createdAt: user.createdAt.toISOString(),
//       isActive: true, // Add this field based on your User model
//       address: user.address ? {
//         street: user.address.street,
//         city: user.address.city,
//         state: user.address.state,
//         pincode: user.address.pincode,
//         country: user.address.country
//       } : undefined,
//       preferences: user.preferences
//     };
    
//     return res.status(200).json(userProfile);
    
//   } catch (error) {
//     console.error('Profile fetch error:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }








// src/pages/api/auth/profile.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db/connection';
import User from '@/lib/db/models/User';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  [key: string]: unknown;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Get the authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Extract the token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Verify the token
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
    let decoded: JwtPayload;
    
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Find the user in database
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update last login time
    user.lastLoginAt = new Date();
    await user.save();

    // Calculate total bookings and spent (mock data for now)
    const totalBookings = 0; // TODO: Calculate from bookings collection
    const totalSpent = 0; // TODO: Calculate from bookings collection

    // Return user profile data
    const userProfile = {
      id: user._id.toString(),
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      profileImage: user.profileImage,
      totalBookings,
      totalSpent,
      lastLoginAt: user.lastLoginAt.toISOString(),
      createdAt: user.createdAt.toISOString(),
      isActive: true, // Add this field based on your User model
      address: user.address ? {
        street: user.address.street,
        city: user.address.city,
        state: user.address.state,
        pincode: user.address.pincode,
        country: user.address.country
      } : undefined,
      preferences: user.preferences
    };
    
    return res.status(200).json(userProfile);
    
  } catch (error) {
    console.error('Profile fetch error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}