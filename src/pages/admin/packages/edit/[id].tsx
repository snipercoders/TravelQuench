// // src/pages/admin/packages/edit/[id].tsx
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import AdminLayout from '@/components/layout/AdminLayout';
// import { useRequireAuth } from '@/hooks/useAuth';
// import { ArrowLeft, Save, AlertCircle } from 'lucide-react';


// interface Package {
//   _id: string;
//   title: string;
//   destination: string;
//   description: string;
//   duration: number;
//   price: number;
//   originalPrice?: number;
//   category: string;
//   type: 'domestic' | 'international';
//   maxGroupSize: number;
//   minAge: number;
//   inclusions: string[];
//   exclusions: string[];
//   itinerary: {
//     day: number;
//     title: string;
//     description: string;
//     meals: string[];
//     accommodation: string;
//   }[];
//   highlights: string[];
//   thumbnail: string;
//   images: string[];
//   isActive: boolean;
//   isFeatured: boolean;
// }

// const PackageEditPage: React.FC = () => {
//   const { isLoading } = useRequireAuth('/auth/login');
//   const router = useRouter();
//   const { id } = router.query;
//   const [packageData, setPackageData] = useState<Package | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string>('');

//   const categories = [
//     'Adventure', 'Beach', 'Cultural', 'Family', 'Honeymoon', 
//     'Luxury', 'Pilgrimage', 'Wildlife', 'Historical', 'Religious'
//   ];

//   useEffect(() => {
//     if (id && typeof id === 'string') {
//       fetchPackage(id);
//     }
//   }, [id]);


 
//  const fetchPackage = async (packageId: string) => {
//   try {
//     setError('');
    
//     // Get token from localStorage (same as your other components)
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setError('Authentication required. Please log in again.');
//       router.push('/auth/login');
//       return;
//     }

//     const response = await fetch(`/api/admin/packages/${packageId}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`,  // Use Authorization header
//         'Content-Type': 'application/json'
//       }
//       // Remove credentials: 'include'
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({ message: 'Failed to fetch package' }));
      
//       if (response.status === 401) {
//         setError('Authentication failed. Please log in again.');
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         router.push('/auth/login');
//         return;
//       }
      
//       throw new Error(errorData.message || `HTTP ${response.status}`);
//     }

//     const data = await response.json();
//     if (data.success && data.package) {
//       setPackageData(data.package);
//     } else {
//       throw new Error('Invalid response format');
//     }
//   } catch (error: any) {
//     console.error('Failed to fetch package:', error);
//     setError(error.message || 'Failed to load package');
//   } finally {
//     setLoading(false);
//   }
// };







 
//   const handleInputChange = (field: string, value: any) => {
//     if (!packageData) return;
    
//     setPackageData(prev => ({
//       ...prev!,
//       [field]: value
//     }));
//     setError('');
//   };

//   const handleArrayChange = (field: string, index: number, value: string) => {
//     if (!packageData) return;
    
//     setPackageData(prev => ({
//       ...prev!,
//       [field]: prev![field].map((item, i) => i === index ? value : item)
//     }));
//   };

//   const addArrayItem = (field: string) => {
//     if (!packageData) return;
    
//     setPackageData(prev => ({
//       ...prev!,
//       [field]: [...prev![field], '']
//     }));
//   };

//   const removeArrayItem = (field: string, index: number) => {
//     if (!packageData || packageData[field].length <= 1) return;
    
//     setPackageData(prev => ({
//       ...prev!,
//       [field]: prev![field].filter((_, i) => i !== index)
//     }));
//   };

//   const handleItineraryChange = (index: number, field: string, value: any) => {
//     if (!packageData) return;
    
//     setPackageData(prev => ({
//       ...prev!,
//       itinerary: prev!.itinerary.map((item, i) => 
//         i === index ? { ...item, [field]: value } : item
//       )
//     }));
//   };



//   const handleSave = async () => {
//   if (!packageData) return;

//   setSaving(true);
//   setError('');

//   try {
//     // Get token from localStorage
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setError('Authentication required. Please log in again.');
//       router.push('/auth/login');
//       return;
//     }

//     const response = await fetch(`/api/admin/packages/${id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`  // Add Authorization header
//       },
//       // Remove credentials: 'include'
//       body: JSON.stringify({
//         title: packageData.title.trim(),
//         destination: packageData.destination.trim(),
//         description: packageData.description.trim(),
//         duration: packageData.duration,
//         price: packageData.price,
//         originalPrice: packageData.originalPrice,
//         category: packageData.category,
//         type: packageData.type,
//         maxGroupSize: packageData.maxGroupSize,
//         minAge: packageData.minAge,
//         inclusions: packageData.inclusions.filter(item => item.trim() !== ''),
//         exclusions: packageData.exclusions.filter(item => item.trim() !== ''),
//         itinerary: packageData.itinerary,
//         highlights: packageData.highlights.filter(item => item.trim() !== ''),
//         isActive: packageData.isActive,
//         isFeatured: packageData.isFeatured
//       })
//     });

//     if (response.ok) {
//       router.push(`/admin/packages/view/${id}`);
//     } else {
//       const errorData = await response.json().catch(() => ({ message: 'Update failed' }));
      
//       if (response.status === 401) {
//         setError('Authentication failed. Please log in again.');
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         router.push('/auth/login');
//         return;
//       }
      
//       throw new Error(errorData.message || 'Failed to update package');
//     }
//   } catch (error: any) {
//     setError(error.message || 'Failed to save changes');
//   } finally {
//     setSaving(false);
//   }
// };






//   if (isLoading || loading) {
//     return (
//       <AdminLayout title="Loading Package...">
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//         </div>
//       </AdminLayout>
//     );
//   }

//   if (error || !packageData) {
//     return (
//       <AdminLayout title="Package Not Found">
//         <div className="max-w-4xl mx-auto px-4">
//           <div className="text-center py-12">
//             <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-white mb-2">
//               {error || 'Package not found'}
//             </h3>
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={() => router.back()}
//                 className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//               >
//                 Go Back
//               </button>
//               <button
//                 onClick={() => router.push('/admin/packages')}
//                 className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//               >
//                 All Packages
//               </button>
//             </div>
//           </div>
//         </div>
//       </AdminLayout>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>Edit {packageData.title} | Travel Quench Admin</title>
//       </Head>

//       <AdminLayout title="Edit Package">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => router.back()}
//                 className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
//               >
//                 <ArrowLeft className="h-5 w-5 mr-2" />
//                 Back
//               </button>
//               <div>
//                 <h1 className="text-2xl font-bold text-white">Edit Package</h1>
//                 <p className="text-gray-300">{packageData.title}</p>
//               </div>
//             </div>

//             <button
//               onClick={handleSave}
//               disabled={saving}
//               className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {saving ? (
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//               ) : (
//                 <Save className="h-4 w-4 mr-2" />
//               )}
//               {saving ? 'Saving...' : 'Save Changes'}
//             </button>
//           </div>

//           {/* Error Display */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
//               <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
//               <div className="flex-1">
//                 <p className="text-sm text-red-600 font-medium">Error</p>
//                 <p className="text-sm text-red-600">{error}</p>
//               </div>
//             </div>
//           )}

//           {/* Form */}
//           <div className="space-y-8">
//             {/* Basic Information */}
//             <div className="bg-white/10 rounded-xl p-6">
//               <h2 className="text-xl font-semibold text-white mb-6">Basic Information</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Package Title *
//                   </label>
//                   <input
//                     type="text"
//                     value={packageData.title}
//                     onChange={(e) => handleInputChange('title', e.target.value)}
//                     className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Destination *
//                   </label>
//                   <input
//                     type="text"
//                     value={packageData.destination}
//                     onChange={(e) => handleInputChange('destination', e.target.value)}
//                     className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Category *
//                   </label>
//                   <select
//                     value={packageData.category}
//                     onChange={(e) => handleInputChange('category', e.target.value)}
//                     className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map(category => (
//                       <option key={category} value={category}>{category}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Package Type *
//                   </label>
//                   <select
//                     value={packageData.type}
//                     onChange={(e) => handleInputChange('type', e.target.value)}
//                     className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   >
//                     <option value="domestic">Domestic</option>
//                     <option value="international">International</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Duration (Days) *
//                   </label>
//                   <input
//                     type="number"
//                     min="1"
//                     value={packageData.duration}
//                     onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 1)}
//                     className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Max Group Size *
//                   </label>
//                   <input
//                     type="number"
//                     min="1"
//                     value={packageData.maxGroupSize}
//                     onChange={(e) => handleInputChange('maxGroupSize', parseInt(e.target.value) || 1)}
//                     className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Package Description *
//                 </label>
//                 <textarea
//                   rows={4}
//                   value={packageData.description}
//                   onChange={(e) => handleInputChange('description', e.target.value)}
//                   className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
//                 />
//               </div>
//             </div>

//             {/* Pricing */}
//             <div className="bg-white/10 rounded-xl p-6">
//               <h2 className="text-xl font-semibold text-white mb-6">Pricing</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Current Price (₹) *
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     value={packageData.price}
//                     onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
//                     className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Original Price (₹)
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     value={packageData.originalPrice || ''}
//                     onChange={(e) => handleInputChange('originalPrice', parseInt(e.target.value) || 0)}
//                     className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Minimum Age
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     value={packageData.minAge}
//                     onChange={(e) => handleInputChange('minAge', parseInt(e.target.value) || 0)}
//                     className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Package Settings */}
//             <div className="bg-white/10 rounded-xl p-6">
//               <h2 className="text-xl font-semibold text-white mb-6">Package Settings</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-600">
//                   <div>
//                     <h4 className="font-medium text-white">Package Status</h4>
//                     <p className="text-sm text-gray-400">Make package visible to customers</p>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={packageData.isActive}
//                       onChange={(e) => handleInputChange('isActive', e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
//                   </label>
//                 </div>

//                 <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-600">
//                   <div>
//                     <h4 className="font-medium text-white">Featured Package</h4>
//                     <p className="text-sm text-gray-400">Show in featured section</p>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={packageData.isFeatured}
//                       onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* Save Button - Bottom */}
//             <div className="flex justify-end">
//               <button
//                 onClick={handleSave}
//                 disabled={saving}
//                 className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
//               >
//                 {saving ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                     Saving Changes...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="h-5 w-5 mr-2" />
//                     Save Changes
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </AdminLayout>
//     </>
//   );
// };

// export default PackageEditPage;













// src/pages/admin/packages/edit/[id].tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import { useRequireAuth } from '@/hooks/useAuth';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

interface Package {
  _id: string;
  title: string;
  destination: string;
  description: string;
  duration: number;
  price: number;
  originalPrice?: number;
  category: string;
  type: 'domestic' | 'international';
  maxGroupSize: number;
  minAge: number;
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    meals: string[];
    accommodation: string;
  }[];
  highlights: string[];
  thumbnail: string;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
}

const PackageEditPage: React.FC = () => {
  const { isLoading } = useRequireAuth('/auth/login');
  const router = useRouter();
  const { id } = router.query;
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>('');

  const categories = [
    'Adventure', 'Beach', 'Cultural', 'Family', 'Honeymoon', 
    'Luxury', 'Pilgrimage', 'Wildlife', 'Historical', 'Religious'
  ];

  const fetchPackage = useCallback(async (packageId: string) => {
    try {
      setError('');
      
      // Get token from localStorage (same as your other components)
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please log in again.');
        router.push('/auth/login');
        return;
      }

      const response = await fetch(`/api/admin/packages/${packageId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Use Authorization header
          'Content-Type': 'application/json'
        }
        // Remove credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch package' }));
        
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
      if (data.success && data.package) {
        setPackageData(data.package);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (fetchError: unknown) {
      console.error('Failed to fetch package:', fetchError);
      const errorMessage = fetchError instanceof Error ? fetchError.message : 'Failed to load package';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchPackage(id);
    }
  }, [id, fetchPackage]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    if (!packageData) return;
    
    setPackageData(prev => ({
      ...prev!,
      [field]: value
    }));
    setError('');
  };

  const handleSave = async () => {
    if (!packageData) return;

    setSaving(true);
    setError('');

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please log in again.');
        router.push('/auth/login');
        return;
      }

      const response = await fetch(`/api/admin/packages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Add Authorization header
        },
        // Remove credentials: 'include'
        body: JSON.stringify({
          title: packageData.title.trim(),
          destination: packageData.destination.trim(),
          description: packageData.description.trim(),
          duration: packageData.duration,
          price: packageData.price,
          originalPrice: packageData.originalPrice,
          category: packageData.category,
          type: packageData.type,
          maxGroupSize: packageData.maxGroupSize,
          minAge: packageData.minAge,
          inclusions: packageData.inclusions.filter(item => item.trim() !== ''),
          exclusions: packageData.exclusions.filter(item => item.trim() !== ''),
          itinerary: packageData.itinerary,
          highlights: packageData.highlights.filter(item => item.trim() !== ''),
          isActive: packageData.isActive,
          isFeatured: packageData.isFeatured
        })
      });

      if (response.ok) {
        router.push(`/admin/packages/view/${id}`);
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Update failed' }));
        
        if (response.status === 401) {
          setError('Authentication failed. Please log in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/auth/login');
          return;
        }
        
        throw new Error(errorData.message || 'Failed to update package');
      }
    } catch (saveError: unknown) {
      const errorMessage = saveError instanceof Error ? saveError.message : 'Failed to save changes';
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || loading) {
    return (
      <AdminLayout title="Loading Package...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !packageData) {
    return (
      <AdminLayout title="Package Not Found">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              {error || 'Package not found'}
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => router.back()}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Go Back
              </button>
              <button
                onClick={() => router.push('/admin/packages')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                All Packages
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Edit {packageData.title} | Travel Quench Admin</title>
      </Head>

      <AdminLayout title="Edit Package">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Edit Package</h1>
                <p className="text-gray-300">{packageData.title}</p>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-600 font-medium">Error</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Package Title *
                  </label>
                  <input
                    type="text"
                    value={packageData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Destination *
                  </label>
                  <input
                    type="text"
                    value={packageData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={packageData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Package Type *
                  </label>
                  <select
                    value={packageData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="domestic">Domestic</option>
                    <option value="international">International</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duration (Days) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={packageData.duration}
                    onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Max Group Size *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={packageData.maxGroupSize}
                    onChange={(e) => handleInputChange('maxGroupSize', parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Package Description *
                </label>
                <textarea
                  rows={4}
                  value={packageData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Price (₹) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={packageData.price}
                    onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={packageData.originalPrice || ''}
                    onChange={(e) => handleInputChange('originalPrice', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Minimum Age
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={packageData.minAge}
                    onChange={(e) => handleInputChange('minAge', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Package Settings */}
            <div className="bg-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Package Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-600">
                  <div>
                    <h4 className="font-medium text-white">Package Status</h4>
                    <p className="text-sm text-gray-400">Make package visible to customers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={packageData.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-600">
                  <div>
                    <h4 className="font-medium text-white">Featured Package</h4>
                    <p className="text-sm text-gray-400">Show in featured section</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={packageData.isFeatured}
                      onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Save Button - Bottom */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default PackageEditPage;


