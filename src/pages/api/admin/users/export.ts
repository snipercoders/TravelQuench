// // src/pages/api/admin/users/export.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';
// import connectDB from '@/lib/db/connection';
// import User from '@/lib/db/models/User';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     await connectDB();

//     // Verify admin authentication
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     const token = authHeader.substring(7);
//     const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
    
//     let decoded;
//     try {
//       decoded = jwt.verify(token, JWT_SECRET) as any;
//     } catch (jwtError) {
//       return res.status(401).json({ message: 'Invalid or expired token' });
//     }

//     // Check if user is admin
//     const adminUser = await User.findById(decoded.userId);
//     if (!adminUser || adminUser.role !== 'admin') {
//       return res.status(403).json({ message: 'Admin access required' });
//     }

//     // Fetch all users
//     const users = await User.find({})
//       .select('-password')
//       .sort({ createdAt: -1 });

//     // Generate CSV content
//     const csvHeaders = [
//       'ID',
//       'Name',
//       'First Name',
//       'Last Name',
//       'Email',
//       'Phone',
//       'Role',
//       'Email Verified',
//       'Created At',
//       'Last Login',
//       'Status'
//     ].join(',');

//     const csvRows = users.map(user => [
//       user._id.toString(),
//       `"${user.name || ''}"`,
//       `"${user.firstName || ''}"`,
//       `"${user.lastName || ''}"`,
//       user.email,
//       user.phone || '',
//       user.role,
//       user.isEmailVerified ? 'Yes' : 'No',
//       user.createdAt.toISOString().split('T')[0],
//       user.lastLoginAt ? user.lastLoginAt.toISOString().split('T')[0] : '',
//       'Active' // Assuming all users are active since there's no isActive field in your model
//     ].join(','));

//     const csvContent = [csvHeaders, ...csvRows].join('\n');

//     // Set response headers for file download
//     res.setHeader('Content-Type', 'text/csv');
//     res.setHeader('Content-Disposition', `attachment; filename=users-export-${new Date().toISOString().split('T')[0]}.csv`);
    
//     return res.status(200).send(csvContent);

//   } catch (error) {
//     console.error('Admin export users error:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }







// src/pages/api/admin/users/export.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db/connection';
import User from '@/lib/db/models/User';

// Define interface for JWT payload
interface JWTPayload {
  userId: string;
  role?: string;
  [key: string]: unknown; // Allow additional properties
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Verify admin authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.substring(7);
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

    let decoded: JWTPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch  {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Check if user is admin
    const adminUser = await User.findById(decoded.userId);
    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    // Fetch all users
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });

    // Generate CSV content
    const csvHeaders = [
      'ID',
      'Name',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Role',
      'Email Verified',
      'Created At',
      'Last Login',
      'Status',
    ].join(',');

    const csvRows = users.map((user) =>
      [
        user._id.toString(),
        `"${user.name || ''}"`,
        `"${user.firstName || ''}"`,
        `"${user.lastName || ''}"`,
        user.email,
        user.phone || '',
        user.role,
        user.isEmailVerified ? 'Yes' : 'No',
        user.createdAt.toISOString().split('T')[0],
        user.lastLoginAt ? user.lastLoginAt.toISOString().split('T')[0] : '',
        'Active', // Assuming all users are active since there's no isActive field in your model
      ].join(',')
    );

    const csvContent = [csvHeaders, ...csvRows].join('\n');

    // Set response headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=users-export-${new Date().toISOString().split('T')[0]}.csv`
    );

    return res.status(200).send(csvContent);
  } catch (error) {
    console.error('Admin export users error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}