// src/pages/api/auth/verify.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '@/lib/auth/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    // Token is valid
    res.status(200).json({
      success: true,
      message: 'Token is valid',
      user: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        firstName: decoded.firstName,
        lastName: decoded.lastName
      }
    });

  } catch (error: any) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

// src/pages/api/auth/refresh.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { refreshToken } from '@/lib/auth/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is required'
      });
    }

    const newToken = refreshToken(token);

    if (!newToken) {
      return res.status(401).json({
        success: false,
        message: 'Unable to refresh token'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      token: newToken
    });

  } catch (error: any) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}