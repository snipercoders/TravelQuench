

// // src/lib/auth/middleware.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';
// import connectDB from '@/lib/db/connection';
// import User from '@/lib/db/models/User';

// export interface AuthenticatedRequest extends NextApiRequest {
//   user?: any;
// }

// interface JWTPayload {
//   userId: string;
//   email: string;
//   role: string;
//   iat: number;
//   exp: number;
// }

// // Extract token from request (Authorization header or cookies)
// const extractToken = (req: NextApiRequest): string | null => {
//   console.log('🔐 Extracting token from request...');
  
//   // First, try Authorization header
//   const authHeader = req.headers.authorization;
//   if (authHeader && authHeader.startsWith('Bearer ')) {
//     const token = authHeader.substring(7);
//     console.log('✅ Token found in Authorization header');
//     return token;
//   }

//   // Then try cookies
//   const cookieToken = req.cookies.token || req.cookies['auth-token'];
//   if (cookieToken) {
//     console.log('✅ Token found in cookies');
//     return cookieToken;
//   }

//   console.log('❌ No token found in Authorization header or cookies');
//   return null;
// };

// // Verify JWT token and get user data
// const verifyToken = async (token: string): Promise<any> => {
//   try {
//     const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
    
//     console.log('🔍 Verifying token...');
//     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    
//     console.log('✅ Token verified, userId:', decoded.userId);

//     // Connect to DB and get user
//     await connectDB();
//     const user = await User.findById(decoded.userId).select('-password');
    
//     if (!user) {
//       console.log('❌ User not found in database');
//       throw new Error('User not found');
//     }

//     if (user.isActive === false) {
//       console.log('❌ User account is deactivated');
//       throw new Error('Account deactivated');
//     }

//     console.log('✅ User found:', user.email, 'Role:', user.role);
//     return user;
//   } catch (error: any) {
//     console.log('❌ Token verification failed:', error.message);
//     throw error;
//   }
// };

// // Authenticate middleware - adds user to request if valid token
// export const authenticate = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) => {
//   return async (req: AuthenticatedRequest, res: NextApiResponse) => {
//     console.log(`🔐 Authenticating ${req.method} ${req.url}`);
    
//     try {
//       const token = extractToken(req);
      
//       if (!token) {
//         console.log('❌ No access token provided');
//         return res.status(401).json({
//           success: false,
//           message: 'Access token required'
//         });
//       }

//       const user = await verifyToken(token);
//       req.user = user;

//       console.log('✅ Authentication successful for user:', user.email);
//       return await handler(req, res);
      
//     } catch (error: any) {
//       console.log('❌ Authentication failed:', error.message);
      
//       if (error.name === 'TokenExpiredError') {
//         return res.status(401).json({
//           success: false,
//           message: 'Token expired. Please login again.'
//         });
//       }
      
//       if (error.name === 'JsonWebTokenError') {
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid token'
//         });
//       }

//       return res.status(401).json({
//         success: false,
//         message: 'Authentication failed'
//       });
//     }
//   };
// };

// // Admin-only middleware - requires admin role
// export const requireAdmin = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) => {
//   return authenticate(async (req: AuthenticatedRequest, res: NextApiResponse) => {
//     console.log('👑 Checking admin privileges...');
    
//     if (!req.user || req.user.role !== 'admin') {
//       console.log('❌ Access denied - not an admin. User role:', req.user?.role || 'none');
//       return res.status(403).json({
//         success: false,
//         message: 'Admin access required'
//       });
//     }

//     console.log('✅ Admin access granted for user:', req.user.email);
//     return await handler(req, res);
//   });
// };

// // Optional authentication - doesn't fail if no token, just adds user if present
// export const optionalAuth = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) => {
//   return async (req: AuthenticatedRequest, res: NextApiResponse) => {
//     console.log(`🔓 Optional auth for ${req.method} ${req.url}`);
    
//     try {
//       const token = extractToken(req);
      
//       if (token) {
//         const user = await verifyToken(token);
//         req.user = user;
//         console.log('✅ Optional auth - user attached:', user.email);
//       } else {
//         console.log('ℹ️ Optional auth - no token, continuing without user');
//       }
//     } catch (error) {
//       console.log('⚠️ Optional auth - token invalid, continuing without user');
//       // Don't fail, just continue without user
//     }

//     return await handler(req, res);
//   };
// };












// src/lib/auth/middleware.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db/connection';
import User from '@/lib/db/models/User';

interface UserDocument {
  _id: string;
  email: string;
  role: string;
  isActive: boolean;
  firstName?: string;
  lastName?: string;
  name?: string;
}

export interface AuthenticatedRequest extends NextApiRequest {
  user?: UserDocument;
}

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// Extract token from request (Authorization header or cookies)
const extractToken = (req: NextApiRequest): string | null => {
  console.log('🔐 Extracting token from request...');
  
  // First, try Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    console.log('✅ Token found in Authorization header');
    return token;
  }

  // Then try cookies
  const cookieToken = req.cookies.token || req.cookies['auth-token'];
  if (cookieToken) {
    console.log('✅ Token found in cookies');
    return cookieToken;
  }

  console.log('❌ No token found in Authorization header or cookies');
  return null;
};

// Verify JWT token and get user data
const verifyToken = async (token: string): Promise<UserDocument> => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
    
    console.log('🔍 Verifying token...');
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    
    console.log('✅ Token verified, userId:', decoded.userId);

    // Connect to DB and get user
    await connectDB();
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      console.log('❌ User not found in database');
      throw new Error('User not found');
    }

    if (user.isActive === false) {
      console.log('❌ User account is deactivated');
      throw new Error('Account deactivated');
    }

    console.log('✅ User found:', user.email, 'Role:', user.role);
    return user;
  } catch (verifyError: unknown) {
    const errorMessage = verifyError instanceof Error ? verifyError.message : 'Token verification failed';
    console.log('❌ Token verification failed:', errorMessage);
    throw verifyError;
  }
};

// Authenticate middleware - adds user to request if valid token
export const authenticate = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    console.log(`🔐 Authenticating ${req.method} ${req.url}`);
    
    try {
      const token = extractToken(req);
      
      if (!token) {
        console.log('❌ No access token provided');
        return res.status(401).json({
          success: false,
          message: 'Access token required'
        });
      }

      const user = await verifyToken(token);
      req.user = user;

      console.log('✅ Authentication successful for user:', user.email);
      return await handler(req, res);
      
    } catch (authError: unknown) {
      const errorMessage = authError instanceof Error ? authError.message : 'Authentication failed';
      console.log('❌ Authentication failed:', errorMessage);
      
      if (authError instanceof Error) {
        if (authError.name === 'TokenExpiredError') {
          return res.status(401).json({
            success: false,
            message: 'Token expired. Please login again.'
          });
        }
        
        if (authError.name === 'JsonWebTokenError') {
          return res.status(401).json({
            success: false,
            message: 'Invalid token'
          });
        }
      }

      return res.status(401).json({
        success: false,
        message: 'Authentication failed'
      });
    }
  };
};

// Admin-only middleware - requires admin role
export const requireAdmin = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) => {
  return authenticate(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    console.log('👑 Checking admin privileges...');
    
    if (!req.user || req.user.role !== 'admin') {
      console.log('❌ Access denied - not an admin. User role:', req.user?.role || 'none');
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    console.log('✅ Admin access granted for user:', req.user.email);
    return await handler(req, res);
  });
};

// Optional authentication - doesn't fail if no token, just adds user if present
export const optionalAuth = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    console.log(`🔓 Optional auth for ${req.method} ${req.url}`);
    
    try {
      const token = extractToken(req);
      
      if (token) {
        const user = await verifyToken(token);
        req.user = user;
        console.log('✅ Optional auth - user attached:', user.email);
      } else {
        console.log('ℹ️ Optional auth - no token, continuing without user');
      }
    } catch {
      console.log('⚠️ Optional auth - token invalid, continuing without user');
      // Don't fail, just continue without user
    }

    return await handler(req, res);
  };
};