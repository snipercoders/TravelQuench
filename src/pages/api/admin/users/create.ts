// src/pages/api/admin/users/create.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db/connection';
import User from '@/lib/db/models/User';
import { validateSignupData } from '@/lib/utils/validation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Verify admin authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.substring(7);
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
    
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (jwtError) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    // Check if user is admin
    const adminUser = await User.findById(decoded.userId);
    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const { name, email, phone, password, role } = req.body;

    // Handle name processing
    let finalName, finalFirstName, finalLastName;
    if (name) {
      const nameParts = name.trim().split(' ');
      finalFirstName = nameParts[0];
      finalLastName = nameParts.slice(1).join(' ') || '';
      finalName = name.trim();
    } else {
      return res.status(400).json({ 
        success: false,
        message: 'Name is required' 
      });
    }

    // Basic validation
    const validationErrors = validateSignupData({ 
      firstName: finalFirstName,
      lastName: finalLastName, 
      name: finalName,
      email, 
      phone, 
      password, 
      confirmPassword: password // For admin creation, we don't need confirmation
    });
    
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email address' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = new User({
      name: finalName,
      firstName: finalFirstName,
      lastName: finalLastName,
      email: email.toLowerCase(),
      phone: phone?.trim() || null,
      password: hashedPassword,
      isEmailVerified: true, // Admin created users are auto-verified
      role: role || 'customer'
    });

    const savedUser = await user.save();

    // Return success response with user data
    const userData = {
      id: savedUser._id.toString(),
      name: savedUser.name,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      phone: savedUser.phone,
      role: savedUser.role,
      isEmailVerified: savedUser.isEmailVerified,
      profileImage: savedUser.profileImage,
      totalBookings: 0,
      totalSpent: 0,
      lastLoginAt: null,
      createdAt: savedUser.createdAt.toISOString(),
      isActive: true,
      address: savedUser.address,
      preferences: savedUser.preferences
    };

    res.status(201).json(userData);

  } catch (error) {
    console.error('Admin create user error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email address' 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Internal server error. Please try again.' 
    });
  }
}