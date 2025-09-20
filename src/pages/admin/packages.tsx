


// // src/pages/admin/packages.tsx
// import React, { useState, useEffect } from 'react';
// import AdminLayout from '@/components/layout/AdminLayout';
// import { useRequireAdmin } from '@/hooks/useAuth';
// import CreatePackageModal from '@/components/admin/CreatePackageModal';
// import Head from 'next/head';
// import {
//   Plus,
//   Search,
//   Filter,
//   Edit,
//   Trash2,
//   Eye,
//   MapPin,
//   Calendar,
//   Users,
//   IndianRupee,
//   Star,
//   MoreHorizontal,
//   Image as ImageIcon,
//   Globe,
//   Home,
//   Package as PackageIcon,
//   ArrowLeft,
//   AlertCircle
// } from 'lucide-react';
// import { useRouter } from 'next/router';

// interface Package {
//   _id: string;
//   title: string;
//   destination: string;
//   duration: number;
//   price: number;
//   originalPrice?: number;
//   category: string;
//   type: 'domestic' | 'international';
//   rating?: number;
//   totalReviews?: number;
//   isActive: boolean;
//   isFeatured: boolean;
//   thumbnail: string;
//   images?: string[];
//   highlights?: string[];
//   inclusions?: string[];
//   exclusions?: string[];
//   itinerary?: any[];
//   maxGroupSize?: number;
//   minAge?: number;
//   description?: string;
//   createdAt: string;
//   updatedAt: string;
//   createdBy?: string;
//   updatedBy?: string;
// }

// const PackageManagement: React.FC = () => {
//   const { user, isAuthenticated, isLoading, isAdmin, adminChecked } = useRequireAdmin('/unauthorized');
//   const [packages, setPackages] = useState<Package[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string>('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedType, setSelectedType] = useState('all');
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const router = useRouter();

//   const categories = ['Adventure', 'Beach', 'Cultural', 'Family', 'Honeymoon', 'Luxury', 'Pilgrimage', 'Wildlife', 'Historical', 'Religious'];
//   const types = ['domestic', 'international'];

//   // Helper function to get authentication headers
//   const getAuthHeaders = () => {
//     const token = localStorage.getItem('token');
//     return {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     };
//   };

//   useEffect(() => {
//     // Only fetch packages if user is admin and auth check is complete
//     if (adminChecked && isAdmin && isAuthenticated) {
//       fetchPackages();
//     }
//   }, [adminChecked, isAdmin, isAuthenticated]);

//   const fetchPackages = async () => {
//     try {
//       setError('');
//       console.log('🔄 Fetching packages...');
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('No authentication token found. Please log in again.');
//         router.push('/auth/login');
//         return;
//       }

//       const response = await fetch('/api/admin/packages', {
//         method: 'GET',
//         headers: getAuthHeaders()
//       });

//       console.log('📡 Fetch response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         let errorData;
//         try {
//           errorData = JSON.parse(errorText);
//         } catch {
//           errorData = { message: errorText || 'Failed to fetch packages' };
//         }

//         if (response.status === 401) {
//           setError('Authentication failed. Please log in again.');
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           router.push('/auth/login');
//           return;
//         }

//         throw new Error(errorData.message || `HTTP ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('📦 Fetched data:', data);

//       // Handle different response formats
//       if (data.success && data.packages) {
//         setPackages(data.packages);
//         console.log('✅ Successfully loaded', data.packages.length, 'packages');
//       } else if (Array.isArray(data)) {
//         setPackages(data);
//         console.log('✅ Successfully loaded', data.length, 'packages');
//       } else {
//         console.warn('⚠️ Unexpected response format:', data);
//         setPackages([]);
//       }
//     } catch (error: any) {
//       console.error('❌ Failed to fetch packages:', error);
//       setError(error.message || 'Failed to load packages');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusToggle = async (packageId: string, currentStatus: boolean) => {
//     try {
//       console.log(`🔄 Toggling status for package ${packageId}: ${currentStatus} -> ${!currentStatus}`);
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('Authentication required. Please log in again.');
//         router.push('/auth/login');
//         return;
//       }

//       const response = await fetch(`/api/admin/packages/${packageId}`, {
//         method: 'PATCH',
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ isActive: !currentStatus })
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ message: 'Update failed' }));
        
//         if (response.status === 401) {
//           setError('Authentication failed. Please log in again.');
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           router.push('/auth/login');
//           return;
//         }
        
//         throw new Error(errorData.message || `HTTP ${response.status}`);
//       }

//       // Update local state
//       setPackages(packages.map(pkg => 
//         pkg._id === packageId ? { ...pkg, isActive: !currentStatus } : pkg
//       ));
      
//       console.log('✅ Status updated successfully');
//     } catch (error: any) {
//       console.error('❌ Failed to update package status:', error);
//       setError(error.message || 'Failed to update package status');
//     }
//   };

//   const handleFeaturedToggle = async (packageId: string, currentStatus: boolean) => {
//     try {
//       console.log(`🔄 Toggling featured status for package ${packageId}: ${currentStatus} -> ${!currentStatus}`);
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('Authentication required. Please log in again.');
//         router.push('/auth/login');
//         return;
//       }

//       const response = await fetch(`/api/admin/packages/${packageId}`, {
//         method: 'PATCH',
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ isFeatured: !currentStatus })
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ message: 'Update failed' }));
        
//         if (response.status === 401) {
//           setError('Authentication failed. Please log in again.');
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           router.push('/auth/login');
//           return;
//         }
        
//         throw new Error(errorData.message || `HTTP ${response.status}`);
//       }

//       // Update local state
//       setPackages(packages.map(pkg => 
//         pkg._id === packageId ? { ...pkg, isFeatured: !currentStatus } : pkg
//       ));
      
//       console.log('✅ Featured status updated successfully');
//     } catch (error: any) {
//       console.error('❌ Failed to update featured status:', error);
//       setError(error.message || 'Failed to update featured status');
//     }
//   };

//   const handleDeletePackage = async (packageId: string) => {
//     const packageToDelete = packages.find(pkg => pkg._id === packageId);
//     if (!confirm(`Are you sure you want to delete "${packageToDelete?.title}"? This action cannot be undone.`)) {
//       return;
//     }

//     try {
//       console.log(`🗑️ Deleting package ${packageId}...`);
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('Authentication required. Please log in again.');
//         router.push('/auth/login');
//         return;
//       }

//       const response = await fetch(`/api/admin/packages/${packageId}`, {
//         method: 'DELETE',
//         headers: getAuthHeaders()
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ message: 'Delete failed' }));
        
//         if (response.status === 401) {
//           setError('Authentication failed. Please log in again.');
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           router.push('/auth/login');
//           return;
//         }
        
//         throw new Error(errorData.message || `HTTP ${response.status}`);
//       }

//       // Update local state
//       setPackages(packages.filter(pkg => pkg._id !== packageId));
//       console.log('✅ Package deleted successfully');
//     } catch (error: any) {
//       console.error('❌ Failed to delete package:', error);
//       setError(error.message || 'Failed to delete package');
//     }
//   };

//   const handleEditPackage = (packageId: string) => {
//     // Navigate to edit page (you'll need to create this)
//     router.push(`/admin/packages/edit/${packageId}`);
//   };

//   const handleViewPackage = (packageId: string) => {
//     // Navigate to view page or open modal
//     router.push(`/admin/packages/view/${packageId}`);
//   };

//   const handleCreateSuccess = () => {
//     fetchPackages(); // Refresh the packages list
//   };

//   const filteredPackages = packages.filter(pkg => {
//     const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
//     const matchesType = selectedType === 'all' || pkg.type === selectedType;
    
//     return matchesSearch && matchesCategory && matchesType;
//   });

//   // Show loading while auth is being checked
//   if (isLoading || !adminChecked) {
//     return (
//       <AdminLayout title="Package Management">
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//         </div>
//       </AdminLayout>
//     );
//   }

//   // Show access denied if not admin
//   if (!isAdmin || !isAuthenticated) {
//     return (
//       <AdminLayout title="Access Denied">
//         <div className="flex items-center justify-center h-64">
//           <div className="text-center">
//             <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
//             <p className="text-gray-400">You don't have permission to access this page.</p>
//           </div>
//         </div>
//       </AdminLayout>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>Package Management - Travel Quench Admin</title>
//       </Head>

//       <AdminLayout title="Package Management">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Back Button */}
//           <div className="mb-6">
//             <button
//               onClick={() => router.back()}
//               className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md transform hover:scale-105"
//             >
//               <ArrowLeft className="h-5 w-5 mr-2" />
//               Back
//             </button>
//           </div>

//           {/* Error Display */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
//               <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
//               <div className="flex-1">
//                 <p className="text-sm text-red-600 font-medium">Error</p>
//                 <p className="text-sm text-red-600">{error}</p>
//                 <button
//                   onClick={() => {
//                     setError('');
//                     fetchPackages();
//                   }}
//                   className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
//                 >
//                   Retry
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Action Bar */}
//           <div className="mb-8">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//               <div className="flex items-center space-x-4">
//                 {/* Search */}
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                   <input
//                     type="text"
//                     placeholder="Search packages..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Category Filter */}
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 >
//                   <option value="all">All Categories</option>
//                   {categories.map(category => (
//                     <option key={category} value={category} className="bg-gray-800">
//                       {category}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Type Filter */}
//                 <select
//                   value={selectedType}
//                   onChange={(e) => setSelectedType(e.target.value)}
//                   className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 >
//                   <option value="all">All Types</option>
//                   <option value="domestic" className="bg-gray-800">Domestic</option>
//                   <option value="international" className="bg-gray-800">International</option>
//                 </select>
//               </div>

//               <button
//                 onClick={() => setShowCreateModal(true)}
//                 disabled={!isAuthenticated || !isAdmin}
//                 className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Create Package
//               </button>
//             </div>
//           </div>

//           {/* Package Statistics */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//             <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
//               <h3 className="text-2xl font-bold text-white">{packages.length}</h3>
//               <p className="text-gray-300 text-sm">Total Packages</p>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
//               <h3 className="text-2xl font-bold text-green-400">{packages.filter(p => p.isActive).length}</h3>
//               <p className="text-gray-300 text-sm">Active Packages</p>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
//               <h3 className="text-2xl font-bold text-yellow-400">{packages.filter(p => p.isFeatured).length}</h3>
//               <p className="text-gray-300 text-sm">Featured Packages</p>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
//               <h3 className="text-2xl font-bold text-blue-400">{packages.filter(p => p.type === 'international').length}</h3>
//               <p className="text-gray-300 text-sm">International</p>
//             </div>
//           </div>

//           {/* Loading State */}
//           {loading && (
//             <div className="flex items-center justify-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//               <span className="ml-3 text-white">Loading packages...</span>
//             </div>
//           )}

//           {/* Packages Grid */}
//           {!loading && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredPackages.map((pkg) => (
//                 <div key={pkg._id} className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
//                   {/* Package Image */}
//                   <div className="relative h-48 bg-gradient-to-r from-orange-400 to-red-500">
//                     {pkg.thumbnail ? (
//                       <img
//                         src={pkg.thumbnail}
//                         alt={pkg.title}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           // Fallback if image fails to load
//                           const target = e.target as HTMLImageElement;
//                           target.style.display = 'none';
//                           target.nextElementSibling?.classList.remove('hidden');
//                         }}
//                       />
//                     ) : null}
                    
//                     {/* Fallback icon */}
//                     <div className={`flex items-center justify-center h-full ${pkg.thumbnail ? 'hidden' : ''}`}>
//                       <ImageIcon className="h-12 w-12 text-white/50" />
//                     </div>
                    
//                     {/* Status Badges */}
//                     <div className="absolute top-3 left-3 flex space-x-2">
//                       {pkg.isFeatured && (
//                         <span className="bg-yellow-500 text-yellow-900 text-xs font-semibold px-2 py-1 rounded-full">
//                           Featured
//                         </span>
//                       )}
//                       <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
//                         pkg.isActive ? 'bg-green-500 text-green-900' : 'bg-red-500 text-red-900'
//                       }`}>
//                         {pkg.isActive ? 'Active' : 'Inactive'}
//                       </span>
//                     </div>

//                     {/* Type Badge */}
//                     <div className="absolute top-3 right-3">
//                       <span className="flex items-center bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
//                         {pkg.type === 'international' ? <Globe className="h-3 w-3 mr-1" /> : <Home className="h-3 w-3 mr-1" />}
//                         {pkg.type === 'international' ? 'International' : 'Domestic'}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Package Details */}
//                   <div className="p-5">
//                     <div className="flex items-center justify-between mb-2">
//                       <h3 className="text-lg font-semibold text-white truncate" title={pkg.title}>
//                         {pkg.title}
//                       </h3>
//                     </div>

//                     <div className="flex items-center text-gray-300 mb-3">
//                       <MapPin className="h-4 w-4 mr-1" />
//                       <span className="text-sm">{pkg.destination}</span>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                       <div className="flex items-center text-gray-300">
//                         <Calendar className="h-4 w-4 mr-2" />
//                         <span className="text-sm">{pkg.duration} days</span>
//                       </div>
//                       <div className="flex items-center text-gray-300">
//                         <Users className="h-4 w-4 mr-2" />
//                         <span className="text-sm">Max {pkg.maxGroupSize || 10}</span>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between mb-4">
//                       <div>
//                         <div className="flex items-center">
//                           <IndianRupee className="h-4 w-4 text-orange-400" />
//                           <span className="text-lg font-bold text-white">
//                             {pkg.price.toLocaleString()}
//                           </span>
//                         </div>
//                         {pkg.originalPrice && pkg.originalPrice > pkg.price && (
//                           <div className="flex items-center text-sm text-gray-400 line-through">
//                             <IndianRupee className="h-3 w-3" />
//                             <span>{pkg.originalPrice.toLocaleString()}</span>
//                           </div>
//                         )}
//                       </div>
//                       <span className="bg-orange-500/20 text-orange-300 text-xs font-semibold px-2 py-1 rounded">
//                         {pkg.category}
//                       </span>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex space-x-2">
//                       <button 
//                         onClick={() => handleViewPackage(pkg._id)}
//                         className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600/80 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
//                       >
//                         <Eye className="h-4 w-4 mr-1" />
//                         View
//                       </button>
//                       <button 
//                         onClick={() => handleEditPackage(pkg._id)}
//                         className="flex-1 flex items-center justify-center px-3 py-2 bg-green-600/80 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
//                       >
//                         <Edit className="h-4 w-4 mr-1" />
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeletePackage(pkg._id)}
//                         className="flex-1 flex items-center justify-center px-3 py-2 bg-red-600/80 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
//                       >
//                         <Trash2 className="h-4 w-4 mr-1" />
//                         Delete
//                       </button>
//                     </div>

//                     {/* Toggle Buttons */}
//                     <div className="flex space-x-2 mt-3">
//                       <button
//                         onClick={() => handleStatusToggle(pkg._id, pkg.isActive)}
//                         className={`flex-1 px-3 py-1 text-xs font-medium rounded transition-colors ${
//                           pkg.isActive
//                             ? 'bg-red-600/20 text-red-300 hover:bg-red-600/30'
//                             : 'bg-green-600/20 text-green-300 hover:bg-green-600/30'
//                         }`}
//                       >
//                         {pkg.isActive ? 'Deactivate' : 'Activate'}
//                       </button>
//                       <button
//                         onClick={() => handleFeaturedToggle(pkg._id, pkg.isFeatured)}
//                         className={`flex-1 px-3 py-1 text-xs font-medium rounded transition-colors ${
//                           pkg.isFeatured
//                             ? 'bg-yellow-600/20 text-yellow-300 hover:bg-yellow-600/30'
//                             : 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30'
//                         }`}
//                       >
//                         {pkg.isFeatured ? 'Unfeature' : 'Feature'}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {filteredPackages.length === 0 && !error && !loading && (
//             <div className="text-center py-12">
//               <PackageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-white mb-2">No packages found</h3>
//               <p className="text-gray-400 mb-4">
//                 {searchTerm || selectedCategory !== 'all' || selectedType !== 'all'
//                   ? 'Try adjusting your search criteria'
//                   : 'Get started by creating your first package'}
//               </p>
//               <button
//                 onClick={() => setShowCreateModal(true)}
//                 disabled={!isAuthenticated || !isAdmin}
//                 className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Create Package
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Create Package Modal */}
//         <CreatePackageModal
//           isOpen={showCreateModal}
//           onClose={() => setShowCreateModal(false)}
//           onPackageCreated={handleCreateSuccess}
//         />
//       </AdminLayout>
//     </>
//   );
// };

// export default PackageManagement;


















import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { useRequireAdmin } from '@/hooks/useAuth';
import CreatePackageModal from '@/components/admin/CreatePackageModal';
import Head from 'next/head';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  Star,
  MoreHorizontal,
  Image as ImageIcon,
  Globe,
  Home,
  Package as PackageIcon,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/router';

interface Package {
  _id: string;
  title: string;
  destination: string;
  duration: number;
  price: number;
  originalPrice?: number;
  category: string;
  type: 'domestic' | 'international';
  rating?: number;
  totalReviews?: number;
  isActive: boolean;
  isFeatured: boolean;
  thumbnail: string;
  images?: string[];
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: any[];
  maxGroupSize?: number;
  minAge?: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

const PackageManagement: React.FC = () => {
  const { user, isAuthenticated, isLoading, isAdmin, adminChecked } = useRequireAdmin('/unauthorized');
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();

  const categories = ['Adventure', 'Beach', 'Cultural', 'Family', 'Honeymoon', 'Luxury', 'Pilgrimage', 'Wildlife', 'Historical', 'Religious'];
  const types = ['domestic', 'international'];

  // Helper function to get authentication headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  useEffect(() => {
    if (adminChecked && isAdmin && isAuthenticated) {
      fetchPackages();
    }
  }, [adminChecked, isAdmin, isAuthenticated]);

  const fetchPackages = async () => {
    try {
      setError('');
      console.log('🔄 Fetching packages...');
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in again.');
        router.push('/auth/login');
        return;
      }

      const response = await fetch('/api/admin/packages', {
        method: 'GET',
        headers: getAuthHeaders()
      });

      console.log('📡 Fetch response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || 'Failed to fetch packages' };
        }

        if (response.status === 401) {
          setError('Authentication failed. Please log in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/auth/login');
          return;
        }

        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('📦 Fetched data:', data);

      if (data.success && data.packages) {
        setPackages(data.packages);
        console.log('✅ Successfully loaded', data.packages.length, 'packages');
      } else if (Array.isArray(data)) {
        setPackages(data);
        console.log('✅ Successfully loaded', data.length, 'packages');
      } else {
        console.warn('⚠️ Unexpected response format:', data);
        setPackages([]);
      }
    } catch (error: any) {
      console.error('❌ Failed to fetch packages:', error);
      setError(error.message || 'Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (packageId: string, currentStatus: boolean) => {
    try {
      console.log(`🔄 Toggling status for package ${packageId}: ${currentStatus} -> ${!currentStatus}`);
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please log in again.');
        router.push('/auth/login');
        return;
      }

      const response = await fetch(`/api/admin/packages/${packageId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isActive: !currentStatus })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Update failed' }));
        
        if (response.status === 401) {
          setError('Authentication failed. Please log in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/auth/login');
          return;
        }
        
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      setPackages(packages.map(pkg => 
        pkg._id === packageId ? { ...pkg, isActive: !currentStatus } : pkg
      ));
      
      console.log('✅ Status updated successfully');
    } catch (error: any) {
      console.error('❌ Failed to update package status:', error);
      setError(error.message || 'Failed to update package status');
    }
  };

  const handleFeaturedToggle = async (packageId: string, currentStatus: boolean) => {
    try {
      console.log(`🔄 Toggling featured status for package ${packageId}: ${currentStatus} -> ${!currentStatus}`);
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please log in again.');
        router.push('/auth/login');
        return;
      }

      const response = await fetch(`/api/admin/packages/${packageId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isFeatured: !currentStatus })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Update failed' }));
        
        if (response.status === 401) {
          setError('Authentication failed. Please log in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/auth/login');
          return;
        }
        
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      setPackages(packages.map(pkg => 
        pkg._id === packageId ? { ...pkg, isFeatured: !currentStatus } : pkg
      ));
      
      console.log('✅ Featured status updated successfully');
    } catch (error: any) {
      console.error('❌ Failed to update featured status:', error);
      setError(error.message || 'Failed to update featured status');
    }
  };

  const handleDeletePackage = async (packageId: string) => {
    const packageToDelete = packages.find(pkg => pkg._id === packageId);
    if (!confirm(`Are you sure you want to delete "${packageToDelete?.title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      console.log(`🗑️ Deleting package ${packageId}...`);
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please log in again.');
        router.push('/auth/login');
        return;
      }

      const response = await fetch(`/api/admin/packages/${packageId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Delete failed' }));
        
        if (response.status === 401) {
          setError('Authentication failed. Please log in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/auth/login');
          return;
        }
        
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      setPackages(packages.filter(pkg => pkg._id !== packageId));
      console.log('✅ Package deleted successfully');
    } catch (error: any) {
      console.error('❌ Failed to delete package:', error);
      setError(error.message || 'Failed to delete package');
    }
  };

  const handleEditPackage = (packageId: string) => {
    router.push(`/admin/packages/edit/${packageId}`);
  };

  const handleViewPackage = (packageId: string) => {
    router.push(`/admin/packages/view/${packageId}`);
  };

  const handleCreateSuccess = () => {
    fetchPackages();
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    const matchesType = selectedType === 'all' || pkg.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  if (isLoading || !adminChecked) {
    return (
      <AdminLayout title="Package Management">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin || !isAuthenticated) {
    return (
      <AdminLayout title="Access Denied">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-gray-400">You don't have permission to access this page.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Package Management - Travel Quench Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <AdminLayout title="Package Management">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md hover:scale-105 w-full sm:w-auto"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-600 font-medium">Error</p>
                <p className="text-sm text-red-600">{error}</p>
                <button
                  onClick={() => {
                    setError('');
                    fetchPackages();
                  }}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto space-y-3 sm:space-y-0 sm:space-x-4">
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search packages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full sm:w-40 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-800">
                      {category}
                    </option>
                  ))}
                </select>

                {/* Type Filter */}
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full sm:w-40 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="domestic" className="bg-gray-800">Domestic</option>
                  <option value="international" className="bg-gray-800">International</option>
                </select>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                disabled={!isAuthenticated || !isAdmin}
                className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Package
              </button>
            </div>
          </div>

          {/* Package Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold text-white">{packages.length}</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Total Packages</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold text-green-400">{packages.filter(p => p.isActive).length}</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Active Packages</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-400">{packages.filter(p => p.isFeatured).length}</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Featured Packages</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-400">{packages.filter(p => p.type === 'international').length}</h3>
              <p className="text-gray-300 text-xs sm:text-sm">International</p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <span className="ml-3 text-white text-sm sm:text-base">Loading packages...</span>
            </div>
          )}

          {/* Packages Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredPackages.map((pkg) => (
                <div key={pkg._id} className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                  {/* Package Image */}
                  <div className="relative h-40 sm:h-48 bg-gradient-to-r from-orange-400 to-red-500">
                    {pkg.thumbnail ? (
                      <img
                        src={pkg.thumbnail}
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    
                    <div className={`flex items-center justify-center h-full ${pkg.thumbnail ? 'hidden' : ''}`}>
                      <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 text-white/50" />
                    </div>
                    
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-wrap gap-2">
                      {pkg.isFeatured && (
                        <span className="bg-yellow-500 text-yellow-900 text-xs font-semibold px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        pkg.isActive ? 'bg-green-500 text-green-900' : 'bg-red-500 text-red-900'
                      }`}>
                        {pkg.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                      <span className="flex items-center bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {pkg.type === 'international' ? <Globe className="h-3 w-3 mr-1" /> : <Home className="h-3 w-3 mr-1" />}
                        {pkg.type === 'international' ? 'International' : 'Domestic'}
                      </span>
                    </div>
                  </div>

                  {/* Package Details */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base sm:text-lg font-semibold text-white truncate" title={pkg.title}>
                        {pkg.title}
                      </h3>
                    </div>

                    <div className="flex items-center text-gray-300 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-xs sm:text-sm">{pkg.destination}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
                      <div className="flex items-center text-gray-300">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-xs sm:text-sm">{pkg.duration} days</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Users className="h-4 w-4 mr-2" />
                        <span className="text-xs sm:text-sm">Max {pkg.maxGroupSize || 10}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div>
                        <div className="flex items-center">
                          <IndianRupee className="h-4 w-4 text-orange-400" />
                          <span className="text-base sm:text-lg font-bold text-white">
                            {pkg.price.toLocaleString()}
                          </span>
                        </div>
                        {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                          <div className="flex items-center text-xs sm:text-sm text-gray-400 line-through">
                            <IndianRupee className="h-3 w-3" />
                            <span>{pkg.originalPrice.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                      <span className="bg-orange-500/20 text-orange-300 text-xs font-semibold px-2 py-1 rounded">
                        {pkg.category}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <button 
                        onClick={() => handleViewPackage(pkg._id)}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600/80 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                      <button 
                        onClick={() => handleEditPackage(pkg._id)}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-green-600/80 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg._id)}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-red-600/80 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>

                    {/* Toggle Buttons */}
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-3">
                      <button
                        onClick={() => handleStatusToggle(pkg._id, pkg.isActive)}
                        className={`flex-1 px-3 py-1 text-xs sm:text-sm font-medium rounded transition-colors ${
                          pkg.isActive
                            ? 'bg-red-600/20 text-red-300 hover:bg-red-600/30'
                            : 'bg-green-600/20 text-green-300 hover:bg-green-600/30'
                        }`}
                      >
                        {pkg.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleFeaturedToggle(pkg._id, pkg.isFeatured)}
                        className={`flex-1 px-3 py-1 text-xs sm:text-sm font-medium rounded transition-colors ${
                          pkg.isFeatured
                            ? 'bg-yellow-600/20 text-yellow-300 hover:bg-yellow-600/30'
                            : 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30'
                        }`}
                      >
                        {pkg.isFeatured ? 'Unfeature' : 'Feature'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredPackages.length === 0 && !error && !loading && (
            <div className="text-center py-12">
              <PackageIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-white mb-2">No packages found</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-4">
                {searchTerm || selectedCategory !== 'all' || selectedType !== 'all'
                  ? 'Try adjusting your search criteria'
                  : 'Get started by creating your first package'}
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                disabled={!isAuthenticated || !isAdmin}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Package
              </button>
            </div>
          )}
        </div>

        <CreatePackageModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onPackageCreated={handleCreateSuccess}
        />
      </AdminLayout>
    </>
  );
};

export default PackageManagement;