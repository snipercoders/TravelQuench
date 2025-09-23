
// // ============================================================================
// // 3. CREATE: src/pages/api/packages/[id].ts
// // ============================================================================
// import type { NextApiRequest, NextApiResponse } from 'next';
// import connectDB from '@/lib/db/connection';
// import Package from '@/lib/db/models/Package';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   const { id } = req.query;

//   if (!id || typeof id !== 'string') {
//     return res.status(400).json({ success: false, message: 'Invalid package ID' });
//   }

//   try {
//     await connectDB();
//     console.log(`📦 Fetching package details for ID: ${id}`);

//     const packageData = await Package.findOne({ 
//       _id: id, 
//       isActive: true 
//     });

//     if (!packageData) {
//       return res.status(404).json({ success: false, message: 'Package not found' });
//     }

//     console.log('✅ Package details fetched:', packageData.title);
//     res.status(200).json({ success: true, package: packageData });

//   } catch (error: any) {
//     console.error('❌ Package fetch error:', error);
    
//     if (error.name === 'CastError') {
//       return res.status(400).json({ success: false, message: 'Invalid package ID format' });
//     }
    
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// }





// src/pages/api/packages/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import Package from '@/lib/db/models/Package';

interface MongooseError extends Error {
  name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid package ID' });
  }

  try {
    await connectDB();
    console.log(`📦 Fetching package details for ID: ${id}`);

    const packageData = await Package.findOne({ 
      _id: id, 
      isActive: true 
    });

    if (!packageData) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }

    console.log('✅ Package details fetched:', packageData.title);
    res.status(200).json({ success: true, package: packageData });

  } catch (error: unknown) {
    console.error('❌ Package fetch error:', error);
    
    if ((error as MongooseError).name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid package ID format' });
    }
    
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}