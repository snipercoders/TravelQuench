// // 2. CREATE: src/pages/api/packages/index.ts
// // ============================================================================
// import type { NextApiRequest, NextApiResponse } from 'next';
// import connectDB from '@/lib/db/connection';
// import Package from '@/lib/db/models/Package';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   try {
//     await connectDB();
//     console.log('📦 Fetching all packages...');

//     const { 
//       type, 
//       category, 
//       destination, 
//       minPrice, 
//       maxPrice, 
//       duration,
//       page = 1, 
//       limit = 12,
//       sort = 'createdAt'
//     } = req.query;

//     // Build filter query
//     const filter: any = { isActive: true };

//     if (type && type !== 'all') {
//       filter.type = type;
//     }

//     if (category && category !== 'all') {
//       filter.category = category;
//     }

//     if (destination) {
//       filter.$or = [
//         { destination: { $regex: destination, $options: 'i' } },
//         { title: { $regex: destination, $options: 'i' } }
//       ];
//     }

//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = parseInt(minPrice as string);
//       if (maxPrice) filter.price.$lte = parseInt(maxPrice as string);
//     }

//     if (duration) {
//       filter.duration = parseInt(duration as string);
//     }

//     // Build sort query
//     let sortQuery: any = {};
//     switch (sort) {
//       case 'price_low':
//         sortQuery = { price: 1 };
//         break;
//       case 'price_high':
//         sortQuery = { price: -1 };
//         break;
//       case 'duration':
//         sortQuery = { duration: 1 };
//         break;
//       case 'rating':
//         sortQuery = { rating: -1 };
//         break;
//       default:
//         sortQuery = { createdAt: -1 };
//     }

//     const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

//     const [packages, total] = await Promise.all([
//       Package.find(filter)
//         .select('title destination duration price originalPrice category type rating totalReviews thumbnail images highlights maxGroupSize description')
//         .sort(sortQuery)
//         .skip(skip)
//         .limit(parseInt(limit as string)),
//       Package.countDocuments(filter)
//     ]);

//     const totalPages = Math.ceil(total / parseInt(limit as string));

//     console.log(`✅ Packages fetched: ${packages.length} of ${total} total`);
    
//     res.status(200).json({ 
//       success: true, 
//       packages,
//       pagination: {
//         current: parseInt(page as string),
//         total: totalPages,
//         count: packages.length,
//         totalCount: total
//       }
//     });

//   } catch (error: any) {
//     console.error('❌ Packages fetch error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// }







// // src/pages/api/packages/index.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import connectDB from '@/lib/db/connection';
// import Package from '@/lib/db/models/Package';

// interface PackageFilter {
//   isActive: boolean;
//   type?: string;
//   category?: string;
//   $or?: Array<{
//     destination?: { $regex: string; $options: string };
//     title?: { $regex: string; $options: string };
//   }>;
//   price?: {
//     $gte?: number;
//     $lte?: number;
//   };
//   duration?: number;
// }

// interface SortQuery {
//   price?: 1 | -1;
//   duration?: 1;
//   rating?: -1;
//   createdAt?: -1;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   try {
//     await connectDB();
//     console.log('📦 Fetching all packages...');

//     const { 
//       type, 
//       category, 
//       destination, 
//       minPrice, 
//       maxPrice, 
//       duration,
//       page = 1, 
//       limit = 12,
//       sort = 'createdAt'
//     } = req.query;

//     // Build filter query
//     const filter: PackageFilter = { isActive: true };

//     if (type && type !== 'all') {
//       filter.type = type as string;
//     }

//     if (category && category !== 'all') {
//       filter.category = category as string;
//     }

//     if (destination) {
//       filter.$or = [
//         { destination: { $regex: destination as string, $options: 'i' } },
//         { title: { $regex: destination as string, $options: 'i' } }
//       ];
//     }

//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = parseInt(minPrice as string);
//       if (maxPrice) filter.price.$lte = parseInt(maxPrice as string);
//     }

//     if (duration) {
//       filter.duration = parseInt(duration as string);
//     }

//     // Build sort query
//     let sortQuery: SortQuery = {};
//     switch (sort) {
//       case 'price_low':
//         sortQuery = { price: 1 };
//         break;
//       case 'price_high':
//         sortQuery = { price: -1 };
//         break;
//       case 'duration':
//         sortQuery = { duration: 1 };
//         break;
//       case 'rating':
//         sortQuery = { rating: -1 };
//         break;
//       default:
//         sortQuery = { createdAt: -1 };
//     }

//     const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

//     const [packages, total] = await Promise.all([
//       Package.find(filter)
//         .select('title destination duration price originalPrice category type rating totalReviews thumbnail images highlights maxGroupSize description')
//         .sort(sortQuery)
//         .skip(skip)
//         .limit(parseInt(limit as string)),
//       Package.countDocuments(filter)
//     ]);

//     const totalPages = Math.ceil(total / parseInt(limit as string));

//     console.log(`✅ Packages fetched: ${packages.length} of ${total} total`);
    
//     res.status(200).json({ 
//       success: true, 
//       packages,
//       pagination: {
//         current: parseInt(page as string),
//         total: totalPages,
//         count: packages.length,
//         totalCount: total
//       }
//     });

//   } catch (error: unknown) {
//     console.error('❌ Packages fetch error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// }










// src/pages/api/packages/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import Package from '@/lib/db/models/Package';
import type { SortOrder } from 'mongoose'; // Import Mongoose's SortOrder type

interface PackageFilter {
  isActive: boolean;
  type?: string;
  category?: string;
  $or?: Array<{
    destination?: { $regex: string; $options: string };
    title?: { $regex: string; $options: string };
  }>;
  price?: {
    $gte?: number;
    $lte?: number;
  };
  duration?: number;
}

// Use an index signature to make SortQuery compatible with Mongoose's sort
interface SortQuery {
  [key: string]: SortOrder; // SortOrder is 1, -1, 'asc', or 'desc'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();
    console.log('📦 Fetching all packages...');

    const { 
      type, 
      category, 
      destination, 
      minPrice, 
      maxPrice, 
      duration,
      page = 1, 
      limit = 12,
      sort = 'createdAt'
    } = req.query;

    // Build filter query
    const filter: PackageFilter = { isActive: true };

    if (type && type !== 'all') {
      filter.type = type as string;
    }

    if (category && category !== 'all') {
      filter.category = category as string;
    }

    if (destination) {
      filter.$or = [
        { destination: { $regex: destination as string, $options: 'i' } },
        { title: { $regex: destination as string, $options: 'i' } }
      ];
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice as string);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice as string);
    }

    if (duration) {
      filter.duration = parseInt(duration as string);
    }

    // Build sort query
    let sortQuery: SortQuery = {};
    switch (sort) {
      case 'price_low':
        sortQuery = { price: 1 };
        break;
      case 'price_high':
        sortQuery = { price: -1 };
        break;
      case 'duration':
        sortQuery = { duration: 1 };
        break;
      case 'rating':
        sortQuery = { rating: -1 };
        break;
      default:
        sortQuery = { createdAt: -1 };
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [packages, total] = await Promise.all([
      Package.find(filter)
        .select('title destination duration price originalPrice category type rating totalReviews thumbnail images highlights maxGroupSize description')
        .sort(sortQuery)
        .skip(skip)
        .limit(parseInt(limit as string)),
      Package.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / parseInt(limit as string));

    console.log(`✅ Packages fetched: ${packages.length} of ${total} total`);
    
    res.status(200).json({ 
      success: true, 
      packages,
      pagination: {
        current: parseInt(page as string),
        total: totalPages,
        count: packages.length,
        totalCount: total
      }
    });

  } catch (error: unknown) {
    console.error('❌ Packages fetch error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}