// pages/api/auth/logout.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Clear the auth cookie
  res.setHeader('Set-Cookie', 'auth-token=; Max-Age=0; Path=/; HttpOnly; SameSite=strict');
  
  res.status(200).json({ 
    success: true,
    message: 'Logged out successfully'
  });
}