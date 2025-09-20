// src/pages/api/admin/packages/[id]/status.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import Package from '@/lib/db/models/Package';
import { verifyToken } from '@/lib/auth/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await connectDB();

  try {
    const { id } = req.query;
    const { isActive } = req.body;

    // Verify admin authentication
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { isActive, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error('Update package status error:', error);
    res.status(500).json({ error: 'Failed to update package status' });
  }
}