// // src/pages/customer/wishlist.tsx - FIXED
// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import Layout from '@/components/layout/Layout';
// import { useRequireAuth } from '@/hooks/useAuth';
// import { useAuth } from '@/hooks/useAuth';
// import { useWishlist } from '@/hooks/useWishlist';
// import {
//   Heart,
//   MapPin,
//   Calendar,
//   Users,
//   IndianRupee,
//   Trash2,
//   Eye,
//   ShoppingCart,
//   ArrowLeft,
//   RefreshCw,
//   Package,
//   Star
// } from 'lucide-react';

// const CustomerWishlist: React.FC = () => {
//   const { isLoading } = useRequireAuth('/auth/login');
//   const { user } = useAuth();
//   const router = useRouter();
//   const { 
//     wishlist, 
//     loading, 
//     error, 
//     removeFromWishlist, 
//     fetchWishlist 
//   } = useWishlist();
  
//   const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());

//   const handleRemoveFromWishlist = async (packageId: string) => {
//     try {
//       setRemovingItems(prev => new Set(prev).add(packageId));
//       await removeFromWishlist(packageId);
//     } catch (error) {
//       console.error('Failed to remove from wishlist:', error);
//     } finally {
//       setRemovingItems(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(packageId);
//         return newSet;
//       });
//     }
//   };

//   const handleViewPackage = (packageId: string) => {
//     router.push(`/packages/${packageId}`);
//   };

//   const handleBookPackage = (packageId: string) => {
//     router.push(`/customer/booking/${packageId}`);
//   };

//   const handleGoBack = () => {
//     router.back();
//   };

//   const handleRefresh = () => {
//     fetchWishlist();
//   };

//   // FIXED: Handle undefined/null values properly
//   const formatCurrency = (amount: number | undefined | null) => {
//     if (typeof amount !== 'number' || isNaN(amount)) {
//       return '₹0';
//     }
//     return `₹${amount.toLocaleString('en-IN', {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2
//     })}`;
//   };

//   // FIXED: Handle undefined values
//   const calculateDiscount = (originalPrice?: number, currentPrice?: number) => {
//     if (!originalPrice || !currentPrice || originalPrice <= currentPrice) return null;
//     return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
//   };

//   if (isLoading || loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//               <span className="ml-3 text-white">Loading your wishlist...</span>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>My Wishlist - Travel Quench</title>
//         <meta name="description" content="Your saved travel packages and dream destinations" />
//       </Head>

//       <Layout>
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             {/* Header */}
//             <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={handleGoBack}
//                   className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md hover:scale-105"
//                 >
//                   <ArrowLeft className="h-5 w-5 mr-2" />
//                   Back
//                 </button>
                
//                 <div>
//                   <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
//                     My Wishlist
//                   </h1>
//                   <p className="text-gray-300 mt-1">Your saved travel packages</p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3">
//                 <button
//                   onClick={handleRefresh}
//                   disabled={loading}
//                   className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 shadow-md disabled:opacity-50"
//                 >
//                   <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
//                   Refresh
//                 </button>
                
//                 <div className="text-sm text-gray-400">
//                   {wishlist.length} {wishlist.length === 1 ? 'package' : 'packages'}
//                 </div>
//               </div>
//             </div>

//             {/* Error Display */}
//             {error && (
//               <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start">
//                 <Heart className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
//                 <div className="flex-1">
//                   <p className="text-sm text-red-400 font-medium">Error</p>
//                   <p className="text-sm text-red-300">{error}</p>
//                   <button
//                     onClick={handleRefresh}
//                     className="mt-2 text-xs text-blue-400 hover:text-blue-300 underline"
//                   >
//                     Retry
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Empty State */}
//             {!loading && wishlist.length === 0 && (
//               <div className="text-center py-16">
//                 <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-12 max-w-md mx-auto">
//                   <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-white mb-2">Your wishlist is empty</h3>
//                   <p className="text-gray-400 mb-6">
//                     Start exploring our amazing travel packages and add your favorites to your wishlist!
//                   </p>
//                   <div className="space-y-3">
//                     <button
//                       onClick={() => router.push('/packages/indian')}
//                       className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 shadow-md hover:scale-105"
//                     >
//                       Explore Indian Packages
//                     </button>
//                     <button
//                       onClick={() => router.push('/packages/international')}
//                       className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:scale-105"
//                     >
//                       Explore International Packages
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Wishlist Items */}
//             {wishlist.length > 0 && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {wishlist.map((item) => {
//                   // FIXED: Access package data properly and handle undefined values
//                   const pkg = item.package;
//                   if (!pkg) return null; // Skip if package data is missing
                  
//                   const discount = calculateDiscount(pkg.originalPrice, pkg.price);
                  
//                   return (
//                     <div
//                       key={item.id}
//                       className="relative bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 group"
//                     >
//                       {/* Package Image */}
//                       <div className="relative h-48 w-full overflow-hidden">
//                         <img
//                           src={pkg.thumbnail || '/images/placeholder.jpg'}
//                           alt={pkg.title || 'Package'}
//                           className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
//                           onError={(e) => {
//                             e.currentTarget.src = '/images/placeholder.jpg';
//                           }}
//                         />
//                         {discount && (
//                           <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
//                             {discount}% OFF
//                           </div>
//                         )}
//                       </div>

//                       {/* Package Details */}
//                       <div className="p-5">
//                         <h3 className="text-lg font-semibold text-white line-clamp-2">
//                           {pkg.title || 'Untitled Package'}
//                         </h3>
//                         <p className="text-sm text-gray-400 mt-1 flex items-center">
//                           <MapPin className="h-4 w-4 mr-1" />
//                           {pkg.destination || 'Destination not specified'}
//                         </p>

//                         <div className="mt-3 space-y-2">
//                           <p className="text-sm text-gray-300 flex items-center">
//                             <Calendar className="h-4 w-4 mr-2" />
//                             {pkg.duration ? `${pkg.duration} days` : 'Duration not specified'}
//                           </p>
//                           <p className="text-sm text-gray-300 flex items-center">
//                             <Users className="h-4 w-4 mr-2" />
//                             {pkg.category || 'Category not specified'}
//                           </p>
//                         </div>

//                         {/* Pricing */}
//                         <div className="mt-4 flex items-center space-x-2">
//                           <p className="text-lg font-bold text-orange-400">
//                             {formatCurrency(pkg.price)}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Actions */}
//                       <div className="p-5 pt-0 flex items-center justify-between border-t border-white/10">
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => handleViewPackage(pkg.id)}
//                             className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
//                           >
//                             <Eye className="h-4 w-4 mr-2" />
//                             View
//                           </button>
//                           <button
//                             onClick={() => handleBookPackage(pkg.id)}
//                             className="flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200"
//                           >
//                             <ShoppingCart className="h-4 w-4 mr-2" />
//                             Book
//                           </button>
//                         </div>
//                         <button
//                           onClick={() => handleRemoveFromWishlist(item.packageId)}
//                           disabled={removingItems.has(item.packageId)}
//                           className="flex items-center px-3 py-2 bg-red-600/50 text-white rounded-lg hover:bg-red-600 transition-all duration-200 disabled:opacity-50"
//                         >
//                           <Trash2 className={`h-4 w-4 ${removingItems.has(item.packageId) ? 'animate-pulse' : ''}`} />
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </Layout>
//     </>
//   );
// };

// export default CustomerWishlist;














import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import { useRequireAuth } from '@/hooks/useAuth';
import { useAuth } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';
import {
  Heart,
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  Trash2,
  Eye,
  ShoppingCart,
  ArrowLeft,
  RefreshCw,
  Package,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui';

const CustomerWishlist: React.FC = () => {
  const { isLoading } = useRequireAuth('/auth/login');
  const { user } = useAuth();
  const router = useRouter();
  const { 
    wishlist, 
    loading, 
    error, 
    removeFromWishlist, 
    fetchWishlist 
  } = useWishlist();
  
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());

  const handleRemoveFromWishlist = async (packageId: string) => {
    try {
      setRemovingItems(prev => new Set(prev).add(packageId));
      await removeFromWishlist(packageId);
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    } finally {
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(packageId);
        return newSet;
      });
    }
  };

  const handleViewPackage = (packageId: string) => {
    router.push(`/packages/${packageId}`);
  };

  const handleBookPackage = (packageId: string) => {
    router.push(`/customer/booking/${packageId}`);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleRefresh = () => {
    fetchWishlist();
  };

  const formatCurrency = (amount: number | undefined | null) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
      return '₹0';
    }
    return `₹${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })}`;
  };

  const calculateDiscount = (originalPrice?: number, currentPrice?: number) => {
    if (!originalPrice || !currentPrice || originalPrice <= currentPrice) return null;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  if (isLoading || loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-6 sm:py-8">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-8 sm:py-12">
              <div className="animate-spin rounded-full h-8 sm:h-12 w-8 sm:w-12 border-b-2 border-orange-500"></div>
              <span className="ml-2 sm:ml-3 text-white text-sm sm:text-base">Loading your wishlist...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>My Wishlist - Travel Quench</title>
        <meta name="description" content="Your saved travel packages and dream destinations" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-6 sm:py-8">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                <Button
                  onClick={handleGoBack}
                  className="flex items-center px-3 sm:px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md hover:scale-105 text-xs sm:text-sm"
                >
                  <ArrowLeft className="h-3 sm:h-5 w-3 sm:w-5 mr-2" />
                  Back
                </Button>
          <div className="mt-20 sm:mt-24">
  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
    My Wishlist
  </h1>
  <p className="text-gray-300 text-xs sm:text-sm mt-1">Your saved travel packages</p>
</div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <Button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="flex items-center px-3 sm:px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 shadow-md disabled:opacity-50 text-xs sm:text-sm"
                >
                  <RefreshCw className={`h-3 sm:h-4 w-3 sm:w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                
                <div className="text-xs sm:text-sm text-gray-400">
                  {wishlist.length} {wishlist.length === 1 ? 'package' : 'packages'}
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start">
                <Heart className="h-4 sm:h-5 w-4 sm:w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-red-400 font-medium">Error</p>
                  <p className="text-xs sm:text-sm text-red-300">{error}</p>
                  <button
                    onClick={handleRefresh}
                    className="mt-2 text-xs text-blue-400 hover:text-blue-300 underline"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && wishlist.length === 0 && (
              <div className="text-center py-8 sm:py-16">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 sm:p-12 max-w-md mx-auto">
                  <Heart className="h-12 sm:h-16 w-12 sm:w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-xl font-semibold text-white mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
                    Start exploring our amazing travel packages and add your favorites to your wishlist!
                  </p>
                  <div className="space-y-2 sm:space-y-3">
                    <Button
                      onClick={() => router.push('/packages/indian')}
                      className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 shadow-md hover:scale-105 text-xs sm:text-sm"
                    >
                      Explore Indian Packages
                    </Button>
                    <Button
                      onClick={() => router.push('/packages/international')}
                      className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:scale-105 text-xs sm:text-sm"
                    >
                      Explore International Packages
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Wishlist Items */}
            {wishlist.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {wishlist.map((item) => {
                  const pkg = item.package;
                  if (!pkg) return null;
                  
                  const discount = calculateDiscount(pkg.originalPrice, pkg.price);
                  
                  return (
                    <div
                      key={item.id}
                      className="relative bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                      {/* Package Image */}
                      <div className="relative w-full aspect-[3/2] overflow-hidden">
                        <img
                          src={pkg.thumbnail || '/images/placeholder.jpg'}
                          alt={pkg.title || 'Package'}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = '/images/placeholder.jpg';
                          }}
                        />
                        {discount && (
                          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-orange-500 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                            {discount}% OFF
                          </div>
                        )}
                      </div>

                      {/* Package Details */}
                      <div className="p-3 sm:p-5">
                        <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-2">
                          {pkg.title || 'Untitled Package'}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2 flex items-center">
                          <MapPin className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                          {pkg.destination || 'Destination not specified'}
                        </p>

                        <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-300 flex items-center">
                            <Calendar className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                            {pkg.duration ? `${pkg.duration} days` : 'Duration not specified'}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-300 flex items-center">
                            <Users className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                            {pkg.category || 'Category not specified'}
                          </p>
                          {pkg.rating && (
                            <p className="text-xs sm:text-sm text-gray-300 flex items-center">
                              <Star className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2 fill-current text-yellow-500" />
                              {pkg.rating}
                            </p>
                          )}
                        </div>

                        {/* Pricing */}
                        <div className="mt-2 sm:mt-4 flex items-center space-x-2">
                          <p className="text-base sm:text-lg font-bold text-orange-400">
                            {formatCurrency(pkg.price)}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="p-3 sm:p-5 pt-0 sm:pt-0 flex items-center justify-between border-t border-white/10">
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleViewPackage(pkg.id)}
                            className="flex items-center px-2 sm:px-3 py-1 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-xs sm:text-sm"
                          >
                            <Eye className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                            View
                          </Button>
                          <Button
                            onClick={() => handleBookPackage(pkg.id)}
                            className="flex items-center px-2 sm:px-3 py-1 sm:py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 text-xs sm:text-sm"
                          >
                            <ShoppingCart className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                            Book
                          </Button>
                        </div>
                        <Button
                          onClick={() => handleRemoveFromWishlist(item.packageId)}
                          disabled={removingItems.has(item.packageId)}
                          className="flex items-center px-2 sm:px-3 py-1 sm:py-2 bg-red-600/50 text-white rounded-lg hover:bg-red-600 transition-all duration-200 disabled:opacity-50 text-xs sm:text-sm"
                        >
                          <Trash2 className={`h-3 sm:h-4 w-3 sm:w-4 ${removingItems.has(item.packageId) ? 'animate-pulse' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};



export default CustomerWishlist;