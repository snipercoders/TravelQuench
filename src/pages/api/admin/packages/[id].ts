// pages/api/admin/packages/[id].ts
import type { NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';
import Package from '@/lib/db/models/Package';
import { authenticate, requireAdmin, AuthenticatedRequest } from '@/lib/auth/middleware';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid package ID' });
  }

  console.log(`🔥 ${req.method} /api/admin/packages/${id} - Starting request`);

  if (req.method === 'GET') {
    // Get single package - might require auth depending on your needs
    return authenticate(async (req: AuthenticatedRequest, res: NextApiResponse) => {
      try {
        await connectDB();
        console.log(`📦 Fetching package with ID: ${id}`);
        
        const packageData = await Package.findById(id);
        
        if (!packageData) {
          console.log(`❌ Package not found: ${id}`);
          return res.status(404).json({ success: false, message: 'Package not found' });
        }

        console.log(`✅ Package found: ${packageData.title}`);
        res.status(200).json({ success: true, package: packageData });
      } catch (error: any) {
        console.error('❌ GET package error:', error);
        
        if (error.name === 'CastError') {
          return res.status(400).json({ success: false, message: 'Invalid package ID format' });
        }
        
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    })(req, res);
  } 
  
  else if (req.method === 'PATCH') {
    // Update package (needs admin auth)
    return requireAdmin(async (req: AuthenticatedRequest, res: NextApiResponse) => {
      try {
        await connectDB();

        console.log(`📝 Updating package ${id} with:`, req.body);

        const updateData = {
          ...req.body,
          updatedBy: req.user?._id,
          updatedAt: new Date()
        };

        const updatedPackage = await Package.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );

        if (!updatedPackage) {
          console.log(`❌ Package not found for update: ${id}`);
          return res.status(404).json({ success: false, message: 'Package not found' });
        }

        console.log(`✅ Package updated successfully: ${updatedPackage.title}`);
        res.status(200).json({ success: true, package: updatedPackage });

      } catch (error: any) {
        console.error('❌ PATCH package error:', error);
        
        if (error.name === 'ValidationError') {
          return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: Object.values(error.errors).map((err: any) => err.message)
          });
        }

        if (error.name === 'CastError') {
          return res.status(400).json({ success: false, message: 'Invalid package ID format' });
        }

        res.status(500).json({ success: false, message: 'Failed to update package' });
      }
    })(req, res);
  } 
  
  else if (req.method === 'DELETE') {
    // Delete package (needs admin auth)
    return requireAdmin(async (req: AuthenticatedRequest, res: NextApiResponse) => {
      try {
        await connectDB();

        console.log(`🗑️ Deleting package: ${id}`);

        const deletedPackage = await Package.findByIdAndDelete(id);

        if (!deletedPackage) {
          console.log(`❌ Package not found for deletion: ${id}`);
          return res.status(404).json({ success: false, message: 'Package not found' });
        }

        console.log(`✅ Package deleted successfully: ${deletedPackage.title}`);
        res.status(200).json({ 
          success: true, 
          message: 'Package deleted successfully',
          deletedPackage: {
            id: deletedPackage._id,
            title: deletedPackage.title
          }
        });

      } catch (error: any) {
        console.error('❌ DELETE package error:', error);
        
        if (error.name === 'CastError') {
          return res.status(400).json({ success: false, message: 'Invalid package ID format' });
        }
        
        res.status(500).json({ success: false, message: 'Failed to delete package' });
      }
    })(req, res);
  } 
  
  else {
    console.log(`❌ Method not allowed: ${req.method}`);
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}