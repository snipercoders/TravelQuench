// // src/pages/api/upload/cloudinary.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import cloudinary from '@/lib/cloudinary/config';

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '10mb',
//     },
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     const { image } = req.body;

//     if (!image) {
//       return res.status(400).json({ error: 'No image data provided' });
//     }

//     // Upload to Cloudinary with optimizations
//     const result = await cloudinary.uploader.upload(image, {
//       folder: 'travel-quench/packages',
//       resource_type: 'auto',
//       transformation: [
//         { quality: 'auto:good' },
//         { fetch_format: 'auto' }
//       ],
//       tags: ['package', 'travel-quench']
//     });

//     res.status(200).json({
//       url: result.secure_url,
//       publicId: result.public_id,
//       width: result.width,
//       height: result.height,
//       format: result.format,
//       bytes: result.bytes
//     });
//   } catch (error: any) {
//     console.error('Cloudinary upload error:', error);
    
//     res.status(500).json({ 
//       error: 'Failed to upload image to cloud storage',
//       details: error?.message || 'Unknown error occurred'
//     });
//   }
// }






// src/pages/api/upload/cloudinary.ts
import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/lib/cloudinary/config';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    // Upload to Cloudinary with optimizations
    const result = await cloudinary.uploader.upload(image, {
      folder: 'travel-quench/packages',
      resource_type: 'auto',
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ],
      tags: ['package', 'travel-quench']
    });

    res.status(200).json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    });
  } catch (error: unknown) {
    console.error('Cloudinary upload error:', error);
    
    res.status(500).json({ 
      error: 'Failed to upload image to cloud storage',
      details: (error as Error)?.message || 'Unknown error occurred'
    });
  }
}