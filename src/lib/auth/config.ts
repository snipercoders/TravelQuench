// src/lib/auth/config.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const JWT_EXPIRES_IN = '2d'; // 2 days

export const generateToken = (payload: any): string => {
  return jwt.sign(
    {
      id: payload._id,
      email: payload.email,
      role: payload.role,
      firstName: payload.firstName,
      lastName: payload.lastName,
    },
    JWT_SECRET,
    { 
      expiresIn: JWT_EXPIRES_IN
    }
  );
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};