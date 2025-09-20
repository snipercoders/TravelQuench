// src/pages/api/admin/packages/index.ts
import type { NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import Package from '@/lib/db/models/Package';
import { authenticate, requireAdmin, AuthenticatedRequest } from '@/lib/auth/middleware';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  console.log(`🔥 ${req.method} /api/admin/packages - Starting request`);

  if (req.method === 'GET') {
    // GET packages - no auth required for now, but you can add authenticate() wrapper if needed
    try {
      await connectDB();
      const packages = await Package.find({}).sort({ createdAt: -1 });
      
      console.log('✅ GET /api/admin/packages - Success, returning', packages.length, 'packages');
      return res.status(200).json({ success: true, packages });
    } catch (error) {
      console.error('❌ GET /api/admin/packages - Error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    // POST - Create package (requires admin auth)
    return requireAdmin(async (req: AuthenticatedRequest, res: NextApiResponse) => {
      try {
        await connectDB();

        const {
          title,
          destination,
          description,
          duration,
          price,
          originalPrice,
          category,
          type,
          maxGroupSize,
          minAge,
          inclusions,
          exclusions,
          itinerary,
          highlights,
          thumbnail,
          images,
          isActive,
          isFeatured
        } = req.body;

        console.log('📦 Creating package with data:', {
          title,
          destination,
          category,
          type,
          price,
          userId: req.user?._id
        });

        // Validate required fields
        if (!title || !destination || !description || !duration || !price || !category || !thumbnail) {
          console.log('❌ Validation failed - missing required fields');
          return res.status(400).json({
            success: false,
            message: 'Missing required fields',
            required: ['title', 'destination', 'description', 'duration', 'price', 'category', 'thumbnail']
          });
        }

        // Create the package
        const packageData = new Package({
          title: title.trim(),
          destination: destination.trim(),
          description: description.trim(),
          duration: parseInt(duration),
          price: parseInt(price),
          originalPrice: originalPrice ? parseInt(originalPrice) : parseInt(price),
          category,
          type: type || 'domestic',
          maxGroupSize: maxGroupSize || 10,
          minAge: minAge || 0,
          inclusions: inclusions || [],
          exclusions: exclusions || [],
          itinerary: itinerary || [],
          highlights: highlights || [],
          thumbnail,
          images: images || [],
          isActive: isActive !== false,
          isFeatured: isFeatured === true,
          createdBy: req.user._id,
          updatedBy: req.user._id
        });

        const savedPackage = await packageData.save();
        console.log('✅ Package created successfully:', savedPackage._id);

        res.status(201).json({
          success: true,
          message: 'Package created successfully',
          package: savedPackage
        });

      } catch (error: any) {
        console.error('❌ POST /api/admin/packages - Error:', error);
        
        if (error.name === 'ValidationError') {
          return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: Object.values(error.errors).map((err: any) => err.message)
          });
        }

        res.status(500).json({
          success: false,
          message: 'Failed to create package',
          error: error.message
        });
      }
    })(req, res);
  }

  // Method not allowed
  console.log('❌ Method not allowed:', req.method);
  res.status(405).json({ success: false, message: 'Method not allowed' });
}