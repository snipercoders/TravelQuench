// // src/pages/unauthorized.tsx
// import React from 'react';
// import Link from 'next/link';
// import Head from 'next/head';
// import { Shield, Home, ArrowLeft, AlertTriangle } from 'lucide-react';
// import { useAuth } from '@/hooks/useAuth';
// import { ROUTES } from '@/lib/utils/constants';

// const UnauthorizedPage: React.FC = () => {
//   const { user } = useAuth();

//   return (
//     <>
//       <Head>
//         <title>Access Denied - Travel Quench</title>
//         <meta name="description" content="You don't have permission to access this page" />
//         <meta name="robots" content="noindex, nofollow" />
//       </Head>

//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center px-4">
//         <div className="max-w-md w-full">
//           <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 text-center">
//             {/* Icon */}
//             <div className="flex justify-center mb-6">
//               <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
//                 <Shield className="h-10 w-10 text-red-400" />
//               </div>
//             </div>

//             {/* Content */}
//             <h1 className="text-3xl font-bold text-white mb-4">
//               Access Denied
//             </h1>

//             <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
//               <div className="flex items-center justify-center mb-2">
//                 <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
//                 <span className="text-red-300 font-medium">Administrator Access Required</span>
//               </div>
//               <p className="text-red-200 text-sm">
//                 You don't have the necessary permissions to access this page. Admin privileges are required.
//               </p>
//             </div>

//             {user ? (
//               <div className="bg-white/5 rounded-lg p-4 mb-6">
//                 <p className="text-gray-300 text-sm mb-2">Current User:</p>
//                 <div className="flex items-center justify-center space-x-2">
//                   <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
//                     <span className="text-white text-sm font-medium">
//                       {user.name?.charAt(0)?.toUpperCase() || 'U'}
//                     </span>
//                   </div>
//                   <div className="text-left">
//                     <div className="text-white font-medium text-sm">{user.name}</div>
//                     <div className="text-gray-400 text-xs">Role: {user.role || 'Customer'}</div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-white/5 rounded-lg p-4 mb-6">
//                 <p className="text-gray-300 text-sm">
//                   Please log in with an administrator account to access this area.
//                 </p>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="space-y-3">
//               <Link 
//                 href={ROUTES.HOME}
//                 className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
//               >
//                 <Home className="h-4 w-4 mr-2" />
//                 Go to Homepage
//               </Link>

//               <button
//                 onClick={() => window.history.back()}
//                 className="w-full inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
//               >
//                 <ArrowLeft className="h-4 w-4 mr-2" />
//                 Go Back
//               </button>

//               {!user && (
//                 <Link 
//                   href={ROUTES.LOGIN}
//                   className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <Shield className="h-4 w-4 mr-2" />
//                   Login as Admin
//                 </Link>
//               )}
//             </div>

//             {/* Help Text */}
//             <div className="mt-8 pt-6 border-t border-white/20">
//               <p className="text-gray-400 text-xs">
//                 If you believe this is a mistake or need admin access, please contact the system administrator.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UnauthorizedPage;











import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Shield, Home, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/utils/constants';

const UnauthorizedPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Access Denied - Travel Quench</title>
        <meta name="description" content="You don&apos;t have permission to access this page" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                <Shield className="h-10 w-10 text-red-400" />
              </div>
            </div>

            {/* Content */}
            <h1 className="text-3xl font-bold text-white mb-4">
              Access Denied
            </h1>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
                <span className="text-red-300 font-medium">Administrator Access Required</span>
              </div>
              <p className="text-red-200 text-sm">
                You don&apos;t have the necessary permissions to access this page. Admin privileges are required.
              </p>
            </div>

            {user ? (
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <p className="text-gray-300 text-sm mb-2">Current User:</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium text-sm">{user.name}</div>
                    <div className="text-gray-400 text-xs">Role: {user.role || 'Customer'}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <p className="text-gray-300 text-sm">
                  Please log in with an administrator account to access this area.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href={ROUTES.HOME}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
              >
                <Home className="h-4 w-4 mr-2" />
                Go to Homepage
              </Link>

              <button
                onClick={() => window.history.back()}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </button>

              {!user && (
                <Link
                  href={ROUTES.LOGIN}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Login as Admin
                </Link>
              )}
            </div>

            {/* Help Text */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-gray-400 text-xs">
                If you believe this is a mistake or need admin access, please contact the system administrator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnauthorizedPage;