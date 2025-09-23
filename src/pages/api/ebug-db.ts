// // src/pages/api/debug-db.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import connectDB from '@/lib/db/connection';


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     console.log('🔍 Debugging MongoDB connection...');
    
//     // Check environment variables
//     const mongoUri = process.env.MONGODB_URI;
//     console.log('MONGODB_URI exists:', !!mongoUri);
//     console.log('MONGODB_URI length:', mongoUri?.length || 0);
//     console.log('MONGODB_URI preview:', mongoUri?.substring(0, 50) + '...');
    
//     // Check for common issues in URI
//     if (!mongoUri) {
//       return res.status(500).json({
//         success: false,
//         error: 'MONGODB_URI not found',
//         debug: {
//           envVarsFound: Object.keys(process.env).filter(k => k.includes('MONGO')),
//           allEnvKeys: Object.keys(process.env).length
//         }
//       });
//     }

//     // Check URI format
//     const uriIssues = [];
//     if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
//       uriIssues.push('URI should start with mongodb:// or mongodb+srv://');
//     }
//     if (mongoUri.includes('*')) {
//       uriIssues.push('URI contains invalid character: *');
//     }
//     if (mongoUri.includes('<') || mongoUri.includes('>')) {
//       uriIssues.push('URI contains placeholder characters (< >)');
//     }

//     if (uriIssues.length > 0) {
//       return res.status(400).json({
//         success: false,
//         error: 'Invalid MongoDB URI format',
//         issues: uriIssues,
//         hint: 'Check your MongoDB Atlas connection string'
//       });
//     }

//     // Test the connection
//     console.log('🔌 Attempting MongoDB connection...');
//     const db = await connectDB();
    
//     // Get connection info
//     const connectionInfo = {
//       database: db.connection.db?.databaseName,
//       host: db.connection.host,
//       port: db.connection.port,
//       readyState: db.connection.readyState,
//       readyStateLabel: ['disconnected', 'connected', 'connecting', 'disconnecting'][db.connection.readyState] || 'unknown'
//     };

//     console.log('✅ MongoDB connection successful:', connectionInfo);

//     // Test a simple query
//     try {
//       await db.connection.db?.admin().ping();
//       console.log('✅ Database ping successful');
//     } catch (pingError) {
//       console.warn('⚠️ Database ping failed:', pingError);
//     }

//     return res.status(200).json({
//       success: true,
//       message: 'MongoDB connection successful',
//       connection: connectionInfo,
//       timestamp: new Date().toISOString()
//     });

//   } catch (error: any) {
//     console.error('❌ MongoDB connection failed:', error);
    
//     // Analyze the error
//     let errorType = 'unknown';
//     let suggestion = 'Check your MongoDB configuration';
    
//     if (error.message.includes('ENOTFOUND')) {
//       errorType = 'dns_lookup_failed';
//       suggestion = 'Check your cluster URL in MongoDB Atlas. Make sure the cluster is running.';
//     } else if (error.message.includes('authentication failed')) {
//       errorType = 'authentication_failed';
//       suggestion = 'Check your username and password in the connection string.';
//     } else if (error.message.includes('timeout')) {
//       errorType = 'connection_timeout';
//       suggestion = 'Check your IP whitelist in MongoDB Atlas Network Access.';
//     } else if (error.message.includes('querySrv')) {
//       errorType = 'srv_lookup_failed';
//       suggestion = 'DNS SRV lookup failed. Check your connection string format.';
//     }

//     return res.status(500).json({
//       success: false,
//       error: error.message,
//       errorType,
//       suggestion,
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
//       timestamp: new Date().toISOString()
//     });
//   }
// }






// src/pages/api/debug-db.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔍 Debugging MongoDB connection...');
    
    // Check environment variables
    const mongoUri = process.env.MONGODB_URI;
    console.log('MONGODB_URI exists:', !!mongoUri);
    console.log('MONGODB_URI length:', mongoUri?.length || 0);
    console.log('MONGODB_URI preview:', mongoUri?.substring(0, 50) + '...');
    
    // Check for common issues in URI
    if (!mongoUri) {
      return res.status(500).json({
        success: false,
        error: 'MONGODB_URI not found',
        debug: {
          envVarsFound: Object.keys(process.env).filter(k => k.includes('MONGO')),
          allEnvKeys: Object.keys(process.env).length
        }
      });
    }

    // Check URI format
    const uriIssues = [];
    if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
      uriIssues.push('URI should start with mongodb:// or mongodb+srv://');
    }
    if (mongoUri.includes('*')) {
      uriIssues.push('URI contains invalid character: *');
    }
    if (mongoUri.includes('<') || mongoUri.includes('>')) {
      uriIssues.push('URI contains placeholder characters (< >)');
    }

    if (uriIssues.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid MongoDB URI format',
        issues: uriIssues,
        hint: 'Check your MongoDB Atlas connection string'
      });
    }

    // Test the connection
    console.log('🔌 Attempting MongoDB connection...');
    const db = await connectDB();
    
    // Get connection info
    const connectionInfo = {
      database: db.connection.db?.databaseName,
      host: db.connection.host,
      port: db.connection.port,
      readyState: db.connection.readyState,
      readyStateLabel: ['disconnected', 'connected', 'connecting', 'disconnecting'][db.connection.readyState] || 'unknown'
    };

    console.log('✅ MongoDB connection successful:', connectionInfo);

    // Test a simple query
    try {
      await db.connection.db?.admin().ping();
      console.log('✅ Database ping successful');
    } catch (pingError) {
      console.warn('⚠️ Database ping failed:', pingError);
    }

    return res.status(200).json({
      success: true,
      message: 'MongoDB connection successful',
      connection: connectionInfo,
      timestamp: new Date().toISOString()
    });

  } catch (error: unknown) {
    console.error('❌ MongoDB connection failed:', error);
    
    // Analyze the error
    let errorType = 'unknown';
    let suggestion = 'Check your MongoDB configuration';
    
    const errorMessage = (error as Error).message || '';
    
    if (errorMessage.includes('ENOTFOUND')) {
      errorType = 'dns_lookup_failed';
      suggestion = 'Check your cluster URL in MongoDB Atlas. Make sure the cluster is running.';
    } else if (errorMessage.includes('authentication failed')) {
      errorType = 'authentication_failed';
      suggestion = 'Check your username and password in the connection string.';
    } else if (errorMessage.includes('timeout')) {
      errorType = 'connection_timeout';
      suggestion = 'Check your IP whitelist in MongoDB Atlas Network Access.';
    } else if (errorMessage.includes('querySrv')) {
      errorType = 'srv_lookup_failed';
      suggestion = 'DNS SRV lookup failed. Check your connection string format.';
    }

    return res.status(500).json({
      success: false,
      error: errorMessage,
      errorType,
      suggestion,
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
      timestamp: new Date().toISOString()
    });
  }
}