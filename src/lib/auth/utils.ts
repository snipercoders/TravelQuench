
// ============================================================================
// File 1: src/lib/auth/utils.ts - COMPLETE UPDATED FILE
// ============================================================================
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

// Interface for complete JWT payload
interface CompleteJWTPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp?: number;
}

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Compare password
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT token with complete user data (NEW VERSION)
export const generateCompleteToken = (userId: string, email: string, role: string = 'customer'): string => {
  const payload = {
    userId,
    email,
    role,
    iat: Math.floor(Date.now() / 1000),
  };

  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: '2d',
    issuer: 'travel-quench',
    audience: 'travel-quench-users'
  });
};

// OLD VERSION - keeping for backward compatibility
export const generateToken = (userId: string): string => {
  const payload = {
    userId,
    iat: Math.floor(Date.now() / 1000),
  };

  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: '2d',
    issuer: 'travel-quench',
    audience: 'travel-quench-users'
  });
};

// Verify JWT token with complete data (UPDATED VERSION)
export const verifyToken = (token: string): CompleteJWTPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'travel-quench',
      audience: 'travel-quench-users'
    }) as any;
    
    // Check if token is still within validity period
    const tokenAge = Date.now() / 1000 - decoded.iat;
    const twoDaysInSeconds = 2 * 24 * 60 * 60;
    
    if (tokenAge > twoDaysInSeconds) {
      return null;
    }
    
    return {
      userId: decoded.userId,
      email: decoded.email || '',
      role: decoded.role || 'customer',
      iat: decoded.iat,
      exp: decoded.exp || 0
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

// Generate random token for email verification and password reset
export const generateRandomToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Generate OTP (6 digits)
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate secure random string
export const generateSecureToken = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

// Check if token is expired
export const isTokenExpired = (expiryDate: Date): boolean => {
  return new Date() > expiryDate;
};

// Generate password reset token with expiry
export const generatePasswordResetToken = (): { token: string; expiry: Date } => {
  const token = generateRandomToken();
  const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
  
  return { token, expiry };
};

// Generate email verification token with expiry
export const generateEmailVerificationToken = (): { token: string; expiry: Date } => {
  const token = generateRandomToken();
  const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
  
  return { token, expiry };
};

// Validate JWT token format
export const isValidTokenFormat = (token: string): boolean => {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  // JWT tokens have 3 parts separated by dots
  const parts = token.split('.');
  return parts.length === 3;
};

// Extract user ID from token without verification (use carefully)
export const extractUserIdFromToken = (token: string): string | null => {
  try {
    if (!isValidTokenFormat(token)) {
      return null;
    }
    
    const payload = jwt.decode(token) as any;
    return payload?.userId || null;
  } catch (error) {
    return null;
  }
};

// Generate session data
export const generateSessionData = (userId: string, email: string, role: string, rememberMe: boolean = false) => {
  const token = generateCompleteToken(userId, email, role);
  const maxAge = rememberMe ? 2 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  
  return {
    token,
    maxAge,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge,
      path: '/'
    }
  };
};

// Validate password strength
export const getPasswordStrength = (password: string): {
  score: number;
  feedback: string[];
  isValid: boolean;
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('At least 8 characters long');
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Contains lowercase letters');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Contains uppercase letters');
  }

  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('Contains numbers');
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Contains special characters');
  }

  return {
    score,
    feedback,
    isValid: score >= 3 && password.length >= 6
  };
};
