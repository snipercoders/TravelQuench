
// ============================================================================
// 1. CREATE: src/pages/api/packages/featured.ts
// ============================================================================
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import Package from '@/lib/db/models/Package';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();
    console.log('📦 Fetching featured packages...');

    // Get featured packages that are active
    const packages = await Package.find({
      isActive: true,
      isFeatured: true
    })
    .select('title destination duration price originalPrice category type rating totalReviews thumbnail images highlights maxGroupSize description')
    .sort({ createdAt: -1 })
    .limit(8);

    console.log('✅ Featured packages fetched:', packages.length);
    res.status(200).json({ success: true, packages });

  } catch (error: any) {
    console.error('❌ Featured packages error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
