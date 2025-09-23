

// // src/pages/admin/dashboard.tsx - Fully Responsive Fixed Version
// import React, { useState, useEffect } from 'react';
// import { useRequireAuth } from '@/hooks/useAuth';
// import { useAuth } from '@/hooks/useAuth';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import AdminLayout from '@/components/layout/AdminLayout';
 
// import { 
//   Users, 
//   Package, 
//   Calendar, 
//   IndianRupee, 
//   TrendingUp, 
//   MapPin,
//   Star,
//   AlertCircle,
//   CheckCircle,
//   Clock,
//   BarChart3,
//   ArrowLeft,
//   RefreshCw
// } from 'lucide-react';

// interface DashboardStats {
//   totalUsers: number;
//   totalPackages: number;
//   totalBookings: number;
//   totalRevenue: number;
//   totalRevenueBookings: number;
//   activePackages: number;
//   pendingBookings: number;
//   completedBookings: number;
//   avgRating: number;
//   error?: boolean;
//   errorMessage?: string;
//   debug?: {
//     revenueCount: number;
//     ratingCount: number;
//     timestamp: string;
//   };
// }

// interface RecentBooking {
//   id: string;
//   customerName: string;
//   packageName: string;
//   amount: number;
//   status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
//   createdAt: string;
// }

// const AdminDashboard: React.FC = () => {
//   const { isLoading } = useRequireAuth('/auth/login');
//   const { user } = useAuth();
//   const router = useRouter();
//   const [error, setError] = useState<string>('');
//   const [isMobile, setIsMobile] = useState(false);
//   const [stats, setStats] = useState<DashboardStats>({
//     totalUsers: 0,
//     totalPackages: 0,
//     totalBookings: 0,
//     totalRevenue: 0,
//     totalRevenueBookings: 0,
//     activePackages: 0,
//     pendingBookings: 0,
//     completedBookings: 0,
//     avgRating: 0
//   });
//   const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   // Mobile detection
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     if (user && user.role === 'admin') {
//       fetchDashboardData();
//     }
//   }, [user]);

//   const fetchDashboardData = async (isRefresh = false) => {
//     try {
//       if (isRefresh) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }
      
//       setError('');
//       console.log('🔄 Fetching dashboard data...');
      
//       // Get token from localStorage
//       const token = localStorage.getItem('token');
//       if (!token) {
//         console.error('No authentication token found');
//         router.push('/auth/login');
//         return;
//       }

//       // Add proper authentication headers
//       const headers = {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       };

//       console.log('📡 Making API calls with auth headers...');

//       const [statsRes, bookingsRes] = await Promise.all([
//         fetch('/api/admin/stats', { headers }),
//         fetch('/api/admin/recent-bookings', { headers })
//       ]);

//       console.log('📊 Stats response:', statsRes.status);
//       console.log('📋 Bookings response:', bookingsRes.status);

//       // Handle authentication errors
//       if (statsRes.status === 401 || bookingsRes.status === 401) {
//         console.error('Authentication failed');
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         router.push('/auth/login');
//         return;
//       }

//       if (statsRes.ok) {
//         const statsData = await statsRes.json();
//         console.log('📊 Stats data received:', statsData);
        
//         // Handle response format with better error handling
//         if (statsData.success && statsData.data) {
//           setStats({
//             ...statsData.data,
//             totalRevenue: Math.max(0, Number(statsData.data.totalRevenue) || 0),
//             totalRevenueBookings: Math.max(0, Number(statsData.data.totalRevenueBookings) || 0)
//           });
          
//           // Log revenue calculation details for debugging
//           if (statsData.data.debug) {
//             console.log('💰 Revenue details:', {
//               totalRevenue: statsData.data.totalRevenue,
//               revenueCount: statsData.data.debug.revenueCount
//             });
//           }
//         } else {
//           // Fallback to direct data or show error
//           if (statsData.data) {
//             setStats({
//               ...statsData.data,
//               totalRevenue: Math.max(0, Number(statsData.data.totalRevenue) || 0),
//               totalRevenueBookings: Math.max(0, Number(statsData.data.totalRevenueBookings) || 0)
//             });
//           } else {
//             throw new Error(statsData.message || 'Failed to load stats');
//           }
//         }
//       } else {
//         const errorData = await statsRes.json().catch(() => ({}));
//         throw new Error(errorData.message || `Stats API failed with status ${statsRes.status}`);
//       }

//       if (bookingsRes.ok) {
//         const bookingsData = await bookingsRes.json();
//         console.log('📋 Bookings data received:', bookingsData);
        
//         if (bookingsData.success) {
//           setRecentBookings(bookingsData.bookings || []);
//         } else if (Array.isArray(bookingsData)) {
//           setRecentBookings(bookingsData);
//         } else {
//           setRecentBookings([]);
//         }
//       } else {
//         console.warn('Bookings API failed, continuing without recent bookings');
//         setRecentBookings([]);
//       }

//       console.log('✅ Dashboard data loaded successfully');
      
//     } catch (error: any) {
//       console.error('❌ Failed to fetch dashboard data:', error);
//       setError(error.message || 'Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const handleGoBack = () => {
//     router.back();
//   };

//   const handleRefresh = () => {
//     fetchDashboardData(true);
//   };

//   // Format currency with proper handling
//   const formatCurrency = (amount: number) => {
//     const numAmount = Number(amount) || 0;
//     return `₹${numAmount.toLocaleString('en-IN', {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2
//     })}`;
//   };

//   if (isLoading || loading) {
//     return (
//       <AdminLayout title="Admin Dashboard">
//         <div className="flex items-center justify-center h-64">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-orange-500 mx-auto"></div>
//             <span className="mt-3 text-gray-300 text-sm sm:text-base">Loading dashboard...</span>
//           </div>
//         </div>
//       </AdminLayout>
//     );
//   }

//   if (user?.role !== 'admin') {
//     return (
//       <AdminLayout title="Access Denied">
//         <div className="flex items-center justify-center h-64 px-4">
//           <div className="text-center">
//             <AlertCircle className="h-12 w-12 sm:h-16 sm:w-16 text-red-500 mx-auto mb-4" />
//             <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Access Denied</h1>
//             <p className="text-gray-300 text-sm sm:text-base">You don't have permission to access this page.</p>
//           </div>
//         </div>
//       </AdminLayout>
//     );
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'confirmed': return 'bg-blue-100 text-blue-800';
//       case 'completed': return 'bg-green-100 text-green-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'pending': return <Clock className="h-3 w-3 sm:h-4 sm:w-4" />;
//       case 'confirmed': return <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />;
//       case 'completed': return <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />;
//       case 'cancelled': return <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />;
//       default: return <Clock className="h-3 w-3 sm:h-4 sm:w-4" />;
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Admin Dashboard - Travel Quench</title>
//         <meta name="description" content="Travel Quench Admin Dashboard" />
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
//       </Head>

//       <AdminLayout title="Admin Dashboard">
//         <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
//           {/* Mobile-Optimized Header */}
//           <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
//             <button
//               onClick={handleGoBack}
//               className="flex items-center px-3 sm:px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md transform hover:scale-105 text-sm sm:text-base"
//             >
//               <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
//               Back
//             </button>

//             <button
//               onClick={handleRefresh}
//               disabled={refreshing}
//               className="flex items-center px-3 sm:px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 shadow-md transform hover:scale-105 disabled:opacity-50 text-sm sm:text-base"
//             >
//               <RefreshCw className={`h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 ${refreshing ? 'animate-spin' : ''}`} />
//               {refreshing ? 'Refreshing...' : 'Refresh'}
//             </button>
//           </div>

//           {/* Error Display - Mobile Optimized */}
//           {error && (
//             <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
//               <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
//               <div className="flex-1">
//                 <p className="text-xs sm:text-sm text-red-600 font-medium">Error</p>
//                 <p className="text-xs sm:text-sm text-red-600">{error}</p>
//                 <button
//                   onClick={() => {
//                     setError('');
//                     fetchDashboardData();
//                   }}
//                   className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
//                 >
//                   Retry
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Data Error Warning */}
//           {stats.error && (
//             <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
//               <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
//               <div className="flex-1">
//                 <p className="text-xs sm:text-sm text-yellow-600 font-medium">Data Warning</p>
//                 <p className="text-xs sm:text-sm text-yellow-600">Some data may be incomplete. Showing available information.</p>
//               </div>
//             </div>
//           )}

//           {/* Welcome Header - Mobile Optimized */}
//           <div className="mb-6 sm:mb-8">
//             <div className="flex items-center space-x-3 sm:space-x-4">
//               <div className="bg-gradient-to-r from-orange-500 to-red-600 p-2 sm:p-3 rounded-full">
//                 <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
//                   Admin Dashboard
//                 </h1>
//                 <p className="text-gray-300 mt-1 text-sm sm:text-base">Welcome back, {user?.name}</p>
//               </div>
//             </div>
//           </div>

//           {/* Stats Grid - Mobile Optimized */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
//             <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 sm:p-6 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-blue-100 text-xs sm:text-sm font-medium">Total Users</p>
//                   <p className="text-2xl sm:text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
//                 </div>
//                 <Users className="h-8 w-8 sm:h-12 sm:w-12 text-blue-200" />
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 sm:p-6 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-green-100 text-xs sm:text-sm font-medium">Total Packages</p>
//                   <p className="text-2xl sm:text-3xl font-bold">{stats.totalPackages}</p>
//                 </div>
//                 <Package className="h-8 w-8 sm:h-12 sm:w-12 text-green-200" />
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-4 sm:p-6 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-orange-100 text-xs sm:text-sm font-medium">Total Bookings</p>
//                   <p className="text-2xl sm:text-3xl font-bold">{stats.totalBookings.toLocaleString()}</p>
//                 </div>
//                 <Calendar className="h-8 w-8 sm:h-12 sm:w-12 text-orange-200" />
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-4 sm:p-6 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-purple-100 text-xs sm:text-sm font-medium">Total Revenue</p>
//                   <p className="text-xl sm:text-2xl lg:text-3xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
//                   <p className="text-xs text-purple-200 mt-1">
//                     From {stats.totalRevenueBookings} bookings
//                   </p>
//                 </div>
//                 <IndianRupee className="h-8 w-8 sm:h-12 sm:w-12 text-purple-200" />
//               </div>
//             </div>
//           </div>

//           {/* Secondary Stats - Mobile Optimized */}
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
//             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-6 border border-white/20">
//               <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
//                 <div className="mb-2 sm:mb-0">
//                   <p className="text-gray-300 text-xs sm:text-sm font-medium">Active Packages</p>
//                   <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stats.activePackages}</p>
//                 </div>
//                 <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
//               </div>
//             </div>

//             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-6 border border-white/20">
//               <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
//                 <div className="mb-2 sm:mb-0">
//                   <p className="text-gray-300 text-xs sm:text-sm font-medium">Pending Bookings</p>
//                   <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stats.pendingBookings}</p>
//                 </div>
//                 <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
//               </div>
//             </div>

        
           
//           </div>

//           {/* Recent Bookings - Mobile Optimized */}
//           <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
//             <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/20">
//               <h2 className="text-lg sm:text-xl font-bold text-white flex items-center">
//                 <Calendar className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-orange-400" />
//                 Recent Bookings
//               </h2>
//             </div>
            
//             {/* Mobile Card View */}
//             {isMobile ? (
//               <div className="p-4">
//                 {recentBookings.length > 0 ? (
//                   <div className="space-y-3">
//                     {recentBookings.map((booking) => (
//                       <div key={booking.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
//                         <div className="flex items-start justify-between mb-2">
//                           <div>
//                             <div className="text-sm font-medium text-white">{booking.customerName}</div>
//                             <div className="text-xs text-gray-300">{booking.packageName}</div>
//                           </div>
//                           <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
//                             {getStatusIcon(booking.status)}
//                             <span className="ml-1 capitalize">{booking.status}</span>
//                           </span>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <div className="text-sm font-medium text-white">{formatCurrency(booking.amount)}</div>
//                           <div className="text-xs text-gray-300">
//                             {new Date(booking.createdAt).toLocaleDateString()}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8 text-gray-400">
//                     <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
//                     <p>No recent bookings found</p>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               /* Desktop Table View - Customer | Package | Amount | Status | Date */
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-white/20">
//                   <thead className="bg-white/5">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                         Customer
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                         Package
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                         Amount
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                         Date
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white/5 divide-y divide-white/10">
//                     {recentBookings.length > 0 ? (
//                       recentBookings.map((booking) => (
//                         <tr key={booking.id} className="hover:bg-white/10 transition-colors">
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-white">{booking.customerName}</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-300">{booking.packageName}</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-white">{formatCurrency(booking.amount)}</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
//                               {getStatusIcon(booking.status)}
//                               <span className="ml-1 capitalize">{booking.status}</span>
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                             {new Date(booking.createdAt).toLocaleDateString()}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
//                           <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
//                           <p>No recent bookings found</p>
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>

//         <style jsx>{`
//           /* Mobile optimizations */
//           @media (max-width: 640px) {
//             .mobile-grid {
//               grid-template-columns: 1fr;
//               gap: 0.75rem;
//             }
            
//             .mobile-padding {
//               padding: 0.75rem;
//             }
            
//             .mobile-text {
//               font-size: 0.875rem;
//               line-height: 1.25rem;
//             }
//           }
          
//           /* Touch targets for mobile */
//           .touch-target {
//             min-height: 44px;
//             min-width: 44px;
//           }
          
//           /* Smooth scrolling */
//           .overflow-x-auto {
//             -webkit-overflow-scrolling: touch;
//             scroll-behavior: smooth;
//           }
//         `}</style>
//       </AdminLayout>
//     </>
//   );
// };

// export default AdminDashboard;









// src/pages/admin/dashboard.tsx - Fully Responsive Fixed Version
import React, { useState, useEffect, useCallback } from 'react';
import { useRequireAuth } from '@/hooks/useAuth';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
 
import { 
  Users, 
  Package, 
  Calendar, 
  IndianRupee, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalPackages: number;
  totalBookings: number;
  totalRevenue: number;
  totalRevenueBookings: number;
  activePackages: number;
  pendingBookings: number;
  completedBookings: number;
  avgRating: number;
  error?: boolean;
  errorMessage?: string;
  debug?: {
    revenueCount: number;
    ratingCount: number;
    timestamp: string;
  };
}

interface RecentBooking {
  id: string;
  customerName: string;
  packageName: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const { isLoading } = useRequireAuth('/auth/login');
  const { user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPackages: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalRevenueBookings: 0,
    activePackages: 0,
    pendingBookings: 0,
    completedBookings: 0,
    avgRating: 0
  });
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchDashboardData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      setError('');
      console.log('🔄 Fetching dashboard data...');
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found');
        router.push('/auth/login');
        return;
      }

      // Add proper authentication headers
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      console.log('📡 Making API calls with auth headers...');

      const [statsRes, bookingsRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/admin/recent-bookings', { headers })
      ]);

      console.log('📊 Stats response:', statsRes.status);
      console.log('📋 Bookings response:', bookingsRes.status);

      // Handle authentication errors
      if (statsRes.status === 401 || bookingsRes.status === 401) {
        console.error('Authentication failed');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth/login');
        return;
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        console.log('📊 Stats data received:', statsData);
        
        // Handle response format with better error handling
        if (statsData.success && statsData.data) {
          setStats({
            ...statsData.data,
            totalRevenue: Math.max(0, Number(statsData.data.totalRevenue) || 0),
            totalRevenueBookings: Math.max(0, Number(statsData.data.totalRevenueBookings) || 0)
          });
          
          // Log revenue calculation details for debugging
          if (statsData.data.debug) {
            console.log('💰 Revenue details:', {
              totalRevenue: statsData.data.totalRevenue,
              revenueCount: statsData.data.debug.revenueCount
            });
          }
        } else {
          // Fallback to direct data or show error
          if (statsData.data) {
            setStats({
              ...statsData.data,
              totalRevenue: Math.max(0, Number(statsData.data.totalRevenue) || 0),
              totalRevenueBookings: Math.max(0, Number(statsData.data.totalRevenueBookings) || 0)
            });
          } else {
            throw new Error(statsData.message || 'Failed to load stats');
          }
        }
      } else {
        const errorData = await statsRes.json().catch(() => ({}));
        throw new Error(errorData.message || `Stats API failed with status ${statsRes.status}`);
      }

      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        console.log('📋 Bookings data received:', bookingsData);
        
        if (bookingsData.success) {
          setRecentBookings(bookingsData.bookings || []);
        } else if (Array.isArray(bookingsData)) {
          setRecentBookings(bookingsData);
        } else {
          setRecentBookings([]);
        }
      } else {
        console.warn('Bookings API failed, continuing without recent bookings');
        setRecentBookings([]);
      }

      console.log('✅ Dashboard data loaded successfully');
      
    } catch (fetchError: unknown) {
      console.error('❌ Failed to fetch dashboard data:', fetchError);
      const errorMessage = fetchError instanceof Error ? fetchError.message : 'Failed to load dashboard data';
      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchDashboardData();
    }
  }, [user, fetchDashboardData]);

  const handleGoBack = () => {
    router.back();
  };

  const handleRefresh = () => {
    fetchDashboardData(true);
  };

  // Format currency with proper handling
  const formatCurrency = (amount: number) => {
    const numAmount = Number(amount) || 0;
    return `₹${numAmount.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })}`;
  };

  if (isLoading || loading) {
    return (
      <AdminLayout title="Admin Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-orange-500 mx-auto"></div>
            <span className="mt-3 text-gray-300 text-sm sm:text-base">Loading dashboard...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <AdminLayout title="Access Denied">
        <div className="flex items-center justify-center h-64 px-4">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 sm:h-16 sm:w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Access Denied</h1>
            <p className="text-gray-300 text-sm sm:text-base">You don&apos;t have permission to access this page.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-3 w-3 sm:h-4 sm:w-4" />;
      case 'confirmed': return <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />;
      case 'completed': return <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />;
      case 'cancelled': return <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />;
      default: return <Clock className="h-3 w-3 sm:h-4 sm:w-4" />;
    }
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - Travel Quench</title>
        <meta name="description" content="Travel Quench Admin Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <AdminLayout title="Admin Dashboard">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          {/* Mobile-Optimized Header */}
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <button
              onClick={handleGoBack}
              className="flex items-center px-3 sm:px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md transform hover:scale-105 text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              Back
            </button>

            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center px-3 sm:px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 shadow-md transform hover:scale-105 disabled:opacity-50 text-sm sm:text-base"
            >
              <RefreshCw className={`h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {/* Error Display - Mobile Optimized */}
          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-red-600 font-medium">Error</p>
                <p className="text-xs sm:text-sm text-red-600">{error}</p>
                <button
                  onClick={() => {
                    setError('');
                    fetchDashboardData();
                  }}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Data Error Warning */}
          {stats.error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-yellow-600 font-medium">Data Warning</p>
                <p className="text-xs sm:text-sm text-yellow-600">Some data may be incomplete. Showing available information.</p>
              </div>
            </div>
          )}

          {/* Welcome Header - Mobile Optimized */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-2 sm:p-3 rounded-full">
                <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-300 mt-1 text-sm sm:text-base">Welcome back, {user?.name}</p>
              </div>
            </div>
          </div>

          {/* Stats Grid - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 sm:p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-xs sm:text-sm font-medium">Total Users</p>
                  <p className="text-2xl sm:text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 sm:h-12 sm:w-12 text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 sm:p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-xs sm:text-sm font-medium">Total Packages</p>
                  <p className="text-2xl sm:text-3xl font-bold">{stats.totalPackages}</p>
                </div>
                <Package className="h-8 w-8 sm:h-12 sm:w-12 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-4 sm:p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-xs sm:text-sm font-medium">Total Bookings</p>
                  <p className="text-2xl sm:text-3xl font-bold">{stats.totalBookings.toLocaleString()}</p>
                </div>
                <Calendar className="h-8 w-8 sm:h-12 sm:w-12 text-orange-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-4 sm:p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-xs sm:text-sm font-medium">Total Revenue</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
                  <p className="text-xs text-purple-200 mt-1">
                    From {stats.totalRevenueBookings} bookings
                  </p>
                </div>
                <IndianRupee className="h-8 w-8 sm:h-12 sm:w-12 text-purple-200" />
              </div>
            </div>
          </div>

          {/* Secondary Stats - Mobile Optimized */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-6 border border-white/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-gray-300 text-xs sm:text-sm font-medium">Active Packages</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stats.activePackages}</p>
                </div>
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-6 border border-white/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-gray-300 text-xs sm:text-sm font-medium">Pending Bookings</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stats.pendingBookings}</p>
                </div>
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-6 border border-white/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-gray-300 text-xs sm:text-sm font-medium">Completed Bookings</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stats.completedBookings}</p>
                </div>
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-6 border border-white/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-gray-300 text-xs sm:text-sm font-medium">Average Rating</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stats.avgRating.toFixed(1)}</p>
                </div>
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Recent Bookings - Mobile Optimized */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/20">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-orange-400" />
                Recent Bookings
              </h2>
            </div>
            
            {/* Mobile Card View */}
            {isMobile ? (
              <div className="p-4">
                {recentBookings.length > 0 ? (
                  <div className="space-y-3">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="text-sm font-medium text-white">{booking.customerName}</div>
                            <div className="text-xs text-gray-300">{booking.packageName}</div>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1 capitalize">{booking.status}</span>
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-white">{formatCurrency(booking.amount)}</div>
                          <div className="text-xs text-gray-300">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No recent bookings found</p>
                  </div>
                )}
              </div>
            ) : (
              /* Desktop Table View - Customer | Package | Amount | Status | Date */
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/20">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Package
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/5 divide-y divide-white/10">
                    {recentBookings.length > 0 ? (
                      recentBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-white/10 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{booking.customerName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{booking.packageName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{formatCurrency(booking.amount)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="ml-1 capitalize">{booking.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                          <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>No recent bookings found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
          /* Mobile optimizations */
          @media (max-width: 640px) {
            .mobile-grid {
              grid-template-columns: 1fr;
              gap: 0.75rem;
            }
            
            .mobile-padding {
              padding: 0.75rem;
            }
            
            .mobile-text {
              font-size: 0.875rem;
              line-height: 1.25rem;
            }
          }
          
          /* Touch targets for mobile */
          .touch-target {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Smooth scrolling */
          .overflow-x-auto {
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
          }
        `}</style>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;