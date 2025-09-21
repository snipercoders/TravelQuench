// // src/lib/auth/config.ts
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
// const JWT_EXPIRES_IN = '2d'; // 2 days

// export const generateToken = (payload: any): string => {
//   return jwt.sign(
//     {
//       id: payload._id,
//       email: payload.email,
//       role: payload.role,
//       firstName: payload.firstName,
//       lastName: payload.lastName,
//     },
//     JWT_SECRET,
//     { 
//       expiresIn: JWT_EXPIRES_IN
//     }
//   );
// };

// export const verifyToken = (token: string): any => {
//   try {
//     return jwt.verify(token, JWT_SECRET);
//   } catch (error) {
//     console.error('Token verification failed:', error);
//     return null;
//   }
// };







// // // src/lib/auth/config.ts - Fixed Version
// // import jwt from 'jsonwebtoken';

// // const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
// // const JWT_EXPIRES_IN = '7d'; // 7 days

// // export const generateToken = (payload: any): string => {
// //   console.log('🔐 Generating token for user:', {
// //     id: payload._id || payload.id,
// //     email: payload.email,
// //     role: payload.role
// //   });

// //   return jwt.sign(
// //     {
// //       userId: payload._id || payload.id, // Ensure we have userId field
// //       id: payload._id || payload.id, // Keep both for compatibility
// //       email: payload.email,
// //       role: payload.role,
// //       firstName: payload.firstName,
// //       lastName: payload.lastName,
// //     },
// //     JWT_SECRET,
// //     { 
// //       expiresIn: JWT_EXPIRES_IN
// //     }
// //   );
// // };

// // export const verifyToken = (token: string): any => {
// //   try {
// //     const decoded = jwt.verify(token, JWT_SECRET) as any;
// //     console.log('✅ Token verified successfully:', {
// //       userId: decoded.userId || decoded.id,
// //       email: decoded.email,
// //       role: decoded.role
// //     });
    
// //     // Ensure userId is properly set
// //     if (!decoded.userId && decoded.id) {
// //       decoded.userId = decoded.id;
// //     }
    
// //     return decoded;
// //   } catch (error) {
// //     console.error('❌ Token verification failed:', error);
// //     return null;
// //   }
// // };

// // // Auth middleware for API routes
// // export const authenticateToken = async (req: any, res: any) => {
// //   console.log('🔐 Authenticating request...');
  
// //   try {
// //     // Extract token from Authorization header or cookies
// //     let token = null;
    
// //     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
// //       token = req.headers.authorization.substring(7);
// //       console.log('✅ Token found in Authorization header');
// //     } else if (req.cookies && req.cookies.token) {
// //       token = req.cookies.token;
// //       console.log('✅ Token found in cookies');
// //     } else {
// //       console.log('❌ No token provided');
// //       return res.status(401).json({ 
// //         success: false, 
// //         message: 'No authentication token provided' 
// //       });
// //     }

// //     // Verify the token
// //     const decoded = verifyToken(token);
// //     if (!decoded) {
// //       console.log('❌ Invalid token');
// //       return res.status(401).json({ 
// //         success: false, 
// //         message: 'Invalid authentication token' 
// //       });
// //     }

// //     // Check if user exists in database (you'll need to import your User model)
// //     // For now, we'll assume the token is valid if it decodes properly
// //     console.log('✅ Authentication successful for user:', decoded.userId || decoded.id);
    
// //     // Attach user info to request
// //     req.user = {
// //       id: decoded.userId || decoded.id,
// //       userId: decoded.userId || decoded.id,
// //       email: decoded.email,
// //       role: decoded.role,
// //       firstName: decoded.firstName,
// //       lastName: decoded.lastName
// //     };

// //     return { success: true, user: req.user };
// //   } catch (error) {
// //     console.error('❌ Authentication error:', error);
// //     return res.status(401).json({ 
// //       success: false, 
// //       message: 'Authentication failed' 
// //     });
// //   }
// // };

// // // Admin role check middleware
// // export const requireAdmin = (req: any, res: any) => {
// //   if (!req.user) {
// //     return res.status(401).json({ 
// //       success: false, 
// //       message: 'Authentication required' 
// //     });
// //   }

// //   if (req.user.role !== 'admin') {
// //     return res.status(403).json({ 
// //       success: false, 
// //       message: 'Admin access required' 
// //     });
// //   }

// //   return { success: true };
// // };

// // // Enhanced auth context
// // export const AUTH_CONFIG = {
// //   JWT_SECRET,
// //   JWT_EXPIRES_IN,
// //   TOKEN_STORAGE_KEY: 'token',
// //   USER_STORAGE_KEY: 'user'
// // };








// src/lib/auth/config.ts - Fixed Version
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const JWT_EXPIRES_IN = '2d'; // 7 days

export const generateToken = (payload: any): string => {
  console.log('🔐 Generating token for user:', {
    id: payload._id || payload.id,
    email: payload.email,
    role: payload.role
  });

  return jwt.sign(
    {
      userId: payload._id || payload.id, // Ensure we have userId field
      id: payload._id || payload.id, // Keep both for compatibility
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
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    console.log('✅ Token verified successfully:', {
      userId: decoded.userId || decoded.id,
      email: decoded.email,
      role: decoded.role
    });
    
    // Ensure userId is properly set for backward compatibility
    if (!decoded.userId && decoded.id) {
      decoded.userId = decoded.id;
    }
    if (!decoded.id && decoded.userId) {
      decoded.id = decoded.userId;
    }
    
    return decoded;
  } catch (error) {
    console.error('❌ Token verification failed:', error);
    return null;
  }
};

// Auth middleware for API routes
export const authenticateToken = async (req: any, res: any) => {
  console.log('🔐 Authenticating request...');
  
  try {
    // Extract token from Authorization header or cookies
    let token = null;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.substring(7);
      console.log('✅ Token found in Authorization header');
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
      console.log('✅ Token found in cookies');
    } else {
      console.log('❌ No token provided');
      return res.status(401).json({ 
        success: false, 
        message: 'No authentication token provided' 
      });
    }

    // Verify the token
    const decoded = verifyToken(token);
    if (!decoded) {
      console.log('❌ Invalid token');
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid authentication token' 
      });
    }

    console.log('✅ Authentication successful for user:', decoded.userId || decoded.id);
    
    // Attach user info to request
    req.user = {
      id: decoded.userId || decoded.id,
      userId: decoded.userId || decoded.id,
      email: decoded.email,
      role: decoded.role,
      firstName: decoded.firstName,
      lastName: decoded.lastName
    };

    return { success: true, user: req.user };
  } catch (error) {
    console.error('❌ Authentication error:', error);
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication failed' 
    });
  }
};

// Admin role check middleware
export const requireAdmin = (req: any, res: any) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Admin access required' 
    });
  }

  return { success: true };
};

// Enhanced auth configuration
export const AUTH_CONFIG = {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  TOKEN_STORAGE_KEY: 'token',
  USER_STORAGE_KEY: 'user'
};