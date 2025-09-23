// // src/pages/packages/international.tsx

// import React, { useState, useEffect } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';
// import Footer from '@/components/layout/Footer';
// import Layout from '@/components/layout/Layout';
// import BookButton from '@/components/common/BookButton';
// import { 
//   Search, 
//   Filter, 
//   MapPin, 
//   Calendar, 
//   Users, 
//   Star, 
//   IndianRupee,
//   Globe,
//   SlidersHorizontal,
//   Grid3X3,
//   List,
//   Heart,
//   Plane
// } from 'lucide-react';
// import { Button, Card, Badge, Input, Select } from '@/components/ui';
// import { useWishlist } from '@/hooks/useWishlist';
// import { useAuth } from '@/hooks/useAuth';

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
//   thumbnail: string;
//   maxGroupSize?: number;
//   description?: string;
//   isFeatured: boolean;
// }

// const PackageCard = ({ pkg, isListView = false }: { pkg: Package; isListView?: boolean }) => {
//   const { isAuthenticated } = useAuth();
//   const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
//   const [isToggling, setIsToggling] = useState(false);
//   const [showLoginPrompt, setShowLoginPrompt] = useState(false);

//   const isWishlisted = wishlist.some((item) => item.packageId === pkg._id);

//   const handleWishlistToggle = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!isAuthenticated) {
//       setShowLoginPrompt(true);
//       setTimeout(() => setShowLoginPrompt(false), 3000);
//       return;
//     }

//     setIsToggling(true);
//     try {
//       if (isWishlisted) {
//         await removeFromWishlist(pkg._id);
//       } else {
//         await addToWishlist(pkg._id);
//       }
//     } catch (error: any) {
//       console.error('Error toggling wishlist:', error);
//       alert(error.message || 'Failed to update wishlist');
//     } finally {
//       setIsToggling(false);
//     }
//   };

//   return (
//     <Card padding="none" className={`overflow-hidden hover:shadow-lg transition-all duration-300 group relative ${isListView ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}>
//       {showLoginPrompt && (
//         <div className="absolute top-2 left-2 right-2 mx-2 bg-blue-500 text-white text-xs sm:text-sm px-3 py-2 rounded-lg z-20 shadow-lg">
//           Please login to add to wishlist
//         </div>
//       )}
      
//       <div className={`relative ${isListView ? 'w-full sm:w-1/3' : 'w-full'} aspect-[3/2]`}>
//         <Image
//           src={pkg.thumbnail || '/images/placeholder-package.jpg'}
//           alt={pkg.title}
//           fill
//           className="object-cover group-hover:scale-105 transition-transform duration-300"
//         />
//         <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
//          <Badge className="bg-green-700 text-white font-semibold px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm shadow-md">
//   <Globe className="h-3 sm:h-4 w-3 text-green-300 sm:w-4 mr-1 sm:mr-1.5" />
//   International
// </Badge>
//         </div>
//         {pkg.isFeatured && (
//           <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
//             <Badge variant="warning" className="font-semibold px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm shadow-md">
//               Featured
//             </Badge>
//           </div>
//         )}
//         <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 z-10">
//           <button
//             onClick={handleWishlistToggle}
//             disabled={isToggling}
//             className={`rounded-full p-2 sm:p-2.5 transition-all duration-200 shadow-md transform hover:scale-110 ${
//               isWishlisted
//                 ? 'bg-red-500 text-white hover:bg-red-600'
//                 : 'bg-white/30 backdrop-blur-sm text-white hover:bg-white/50'
//             } ${isToggling ? 'opacity-50 cursor-not-allowed animate-pulse' : ''}`}
//             title={isAuthenticated ? (isWishlisted ? 'Remove from wishlist' : 'Add to wishlist') : 'Login to add to wishlist'}
//           >
//             <Heart
//               className={`w-4 sm:w-5 h-4 sm:h-5 transition-all duration-200 ${
//                 isWishlisted ? 'fill-current' : ''
//               } ${isToggling ? 'animate-pulse' : ''}`}
//             />
//           </button>
//         </div>
//       </div>
      
//       <div className={`p-3 sm:p-4 ${isListView ? 'flex-1 flex flex-col justify-between' : ''}`}>
//         <div>
//           <div className="flex items-center justify-between mb-2">
//             <div className="flex items-center text-primary-600 text-xs sm:text-sm">
//               <MapPin className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
//               {pkg.destination}
//             </div>
//             {pkg.rating && (
//               <div className="flex items-center text-yellow-500">
//                 <Star className="w-3 sm:w-4 h-3 sm:h-4 mr-1 fill-current" />
//                 <span className="text-xs sm:text-sm font-medium text-gray-900">{pkg.rating}</span>
//               </div>
//             )}
//           </div>
          
//           <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
//             {pkg.title}
//           </h3>
          
//           {isListView && (
//             <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
//               {pkg.description}
//             </p>
//           )}
          
//           <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
//             <div className="flex items-center">
//               <Calendar className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
//               {pkg.duration} days
//             </div>
//             <div className="flex items-center">
//               <Users className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
//               Max {pkg.maxGroupSize || 10}
//             </div>
//           </div>
//         </div>
        
//         <div>
//           <div className="flex items-center justify-between mb-3 sm:mb-4">
//             <div>
//               <div className="flex items-center">
//                 <IndianRupee className="h-3 sm:h-4 w-3 sm:w-4 text-gray-900" />
//                 <span className="text-base sm:text-xl font-bold text-gray-900">
//                   {pkg.price.toLocaleString()}
//                 </span>
//               </div>
//               {pkg.originalPrice && pkg.originalPrice > pkg.price && (
//                 <div className="flex items-center text-xs sm:text-sm text-gray-500 line-through">
//                   <IndianRupee className="h-2.5 sm:h-3 w-2.5 sm:w-3" />
//                   <span>{pkg.originalPrice.toLocaleString()}</span>
//                 </div>
//               )}
//               <div className="text-xs text-gray-600">per person</div>
//             </div>
//             {pkg.originalPrice && pkg.originalPrice > pkg.price && (
//               <Badge variant="success" size="sm" className="text-xs sm:text-sm">
//                 {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
//               </Badge>
//             )}
//           </div>
          
//           <div className="space-y-2">
//             <Link href={`/packages/${pkg._id}`}>
//               <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
//                 View Details
//               </Button>
//             </Link>
//             <BookButton
//               packageId={pkg._id}
//               packageTitle={pkg.title}
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm"
//               size="sm"
//             >
//               Book Now
//             </BookButton>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// };

// const InternationalPackagesPage: React.FC = () => {
//   const [packages, setPackages] = useState<Package[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     category: 'all',
//     destination: '',
//     minPrice: '',
//     maxPrice: '',
//     sort: 'createdAt'
//   });
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [showFilters, setShowFilters] = useState(false);

//   const categories = ['Adventure', 'Beach', 'Cultural', 'Family', 'Honeymoon', 'Luxury', 'Pilgrimage', 'Wildlife', 'Historical', 'Religious'];

//   useEffect(() => {
//     fetchInternationalPackages();
//   }, [filters]);

//   const fetchInternationalPackages = async () => {
//     setLoading(true);
//     try {
//       const queryParams = new URLSearchParams({
//         type: 'international',
//         limit: '20',
//         ...Object.entries(filters).reduce((acc, [key, value]) => {
//           if (value && value !== 'all') acc[key] = value;
//           return acc;
//         }, {} as Record<string, string>)
//       });

//       const response = await fetch(`/api/packages?${queryParams}`);
      
//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           setPackages(data.packages);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching international packages:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (key: string, value: string) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//   };

//   return (
//     <Layout title="International Travel Packages" description="Explore amazing international destinations">
//       <Head>
//         <title>International Travel Packages - Travel Quench</title>
//         <meta name="description" content="Discover amazing international travel packages to destinations around the world. Book your dream vacation with Travel Quench." />
//       </Head>

//       <div className="bg-gray-50 min-h-screen">
//         <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
//           <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
//             <div className="text-center">
//               <div className="flex justify-center mb-3 sm:mb-4">
//                 <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 sm:p-4">
//                   <Plane className="h-10 sm:h-12 w-10 sm:w-12 text-white" />
//                 </div>
//               </div>
//               <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
//                 International Travel Packages
//               </h1>
//               <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-xl sm:max-w-2xl mx-auto">
//                 Explore the world with our carefully curated international destinations. 
//                 From European adventures to Asian getaways, discover your next journey.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//           <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
//             <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center text-xs sm:text-sm w-full sm:w-auto"
//               >
//                 <SlidersHorizontal className="h-3 sm:h-4 w-3 sm:w-4 mr-2" />
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//               </Button>
//               <div className="flex gap-2">
//                 <Button
//                   variant={viewMode === 'grid' ? 'default' : 'outline'}
//                   onClick={() => setViewMode('grid')}
//                   className="p-2 sm:p-2.5"
//                 >
//                   <Grid3X3 className="h-3 sm:h-4 w-3 sm:w-4" />
//                 </Button>
//                 <Button
//                   variant={viewMode === 'list' ? 'default' : 'outline'}
//                   onClick={() => setViewMode('list')}
//                   className="p-2 sm:p-2.5"
//                 >
//                   <List className="h-3 sm:h-4 w-3 sm:w-4" />
//                 </Button>
//               </div>
//             </div>
//             <div className="w-full sm:w-64">
//               <Input
//                 placeholder="Search international destinations..."
//                 value={filters.destination}
//                 onChange={(e) => handleFilterChange('destination', e.target.value)}
//                 icon={<Search className="h-3 sm:h-4 w-3 sm:w-4 text-gray-400" />}
//                 className="text-xs sm:text-sm"
//               />
//             </div>
//           </div>

//           {showFilters && (
//             <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded-lg shadow-md">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//                 <Select
//                   value={filters.category}
//                   onChange={(value) => handleFilterChange('category', value)}
//                   options={[{ value: 'all', label: 'All Categories' }, ...categories.map(cat => ({ value: cat, label: cat }))]}
//                   placeholder="Select Category"
//                   className="text-xs sm:text-sm"
//                 />
//                 <Input
//                   type="number"
//                   placeholder="Min Price"
//                   value={filters.minPrice}
//                   onChange={(e) => handleFilterChange('minPrice', e.target.value)}
//                   className="text-xs sm:text-sm"
//                 />
//                 <Input
//                   type="number"
//                   placeholder="Max Price"
//                   value={filters.maxPrice}
//                   onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
//                   className="text-xs sm:text-sm"
//                 />
//                 <Select
//                   value={filters.sort}
//                   onChange={(value) => handleFilterChange('sort', value)}
//                   options={[
//                     { value: 'createdAt', label: 'Newest First' },
//                     { value: 'priceAsc', label: 'Price: Low to High' },
//                     { value: 'priceDesc', label: 'Price: High to Low' },
//                     { value: 'rating', label: 'Top Rated' }
//                   ]}
//                   placeholder="Sort By"
//                   className="text-xs sm:text-sm"
//                 />
//               </div>
//             </div>
//           )}

//           {loading ? (
//             <div className="flex items-center justify-center py-8 sm:py-12">
//               <div className="animate-spin rounded-full h-8 sm:h-12 w-8 sm:w-12 border-b-2 border-primary-500"></div>
//               <span className="ml-2 sm:ml-3 text-gray-600 text-sm sm:text-base">Loading international packages...</span>
//             </div>
//           ) : packages.length === 0 ? (
//             <div className="text-center py-8 sm:py-16">
//               <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-12 max-w-md mx-auto">
//                 <Plane className="h-12 sm:h-16 w-12 sm:w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
//                 <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-2">No Packages Found</h3>
//                 <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
//                   Try adjusting your filters or search for different destinations.
//                 </p>
//                 <Button 
//                   onClick={() => setFilters({ category: 'all', destination: '', minPrice: '', maxPrice: '', sort: 'createdAt' })}
//                   className="text-xs sm:text-sm"
//                 >
//                   Clear Filters
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <div className={viewMode === 'grid' 
//               ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
//               : 'space-y-4 sm:space-y-6'
//             }>
//               {packages.map((pkg) => (
//                 <PackageCard key={pkg._id} pkg={pkg} isListView={viewMode === 'list'} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer/>
//     </Layout>
//   );
// };

// export default InternationalPackagesPage;






// import React, { useState, useEffect } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';
// import Footer from '@/components/layout/Footer';
// import Layout from '@/components/layout/Layout';
// import BookButton from '@/components/common/BookButton';
// import {
//   Search,
//   MapPin,
//   Calendar,
//   Users,
//   Star,
//   IndianRupee,
//   Globe,
//   SlidersHorizontal,
//   Grid3X3,
//   List,
//   Heart,
//   Plane
// } from 'lucide-react';
// import { Button, Card, Badge, Input, Select } from '@/components/ui';
// import { useWishlist } from '@/hooks/useWishlist';
// import { useAuth } from '@/hooks/useAuth';

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
//   thumbnail: string;
//   maxGroupSize?: number;
//   description?: string;
//   isFeatured: boolean;
// }

// const PackageCard = ({ pkg, isListView = false }: { pkg: Package; isListView?: boolean }) => {
//   const { isAuthenticated } = useAuth();
//   const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
//   const [isToggling, setIsToggling] = useState(false);
//   const [showLoginPrompt, setShowLoginPrompt] = useState(false);

//   const isWishlisted = wishlist.some((item) => item.packageId === pkg._id);

//   const handleWishlistToggle = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!isAuthenticated) {
//       setShowLoginPrompt(true);
//       setTimeout(() => setShowLoginPrompt(false), 3000);
//       return;
//     }
//     setIsToggling(true);
//     try {
//       if (isWishlisted) {
//         await removeFromWishlist(pkg._id);
//       } else {
//         await addToWishlist(pkg._id);
//       }
//     } catch (error: any) {
//       console.error('Error toggling wishlist:', error);
//       alert(error.message || 'Failed to update wishlist');
//     } finally {
//       setIsToggling(false);
//     }
//   };

//   return (
//     <Card
//       padding="none"
//       className={`overflow-hidden hover:shadow-lg transition-all duration-300 group relative ${isListView ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}
//     >
//       {showLoginPrompt && (
//         <div className="absolute top-2 left-2 right-2 mx-2 bg-blue-500 text-white text-xs sm:text-sm px-3 py-2 rounded-lg z-20 shadow-lg">
//           Please login to add to wishlist
//         </div>
//       )}
//       <div className={`relative ${isListView ? 'w-full sm:w-1/3' : 'w-full'} aspect-[3/2]`}>
//         <Image
//           src={pkg.thumbnail || '/images/placeholder-package.jpg'}
//           alt={pkg.title}
//           fill
//           className="object-cover group-hover:scale-105 transition-transform duration-300"
//         />
//         <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
//           <Badge className="bg-green-700 text-white font-semibold px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm shadow-md">
//             <Globe className="h-3 sm:h-4 w-3 sm:w-4 text-green-300 mr-1 sm:mr-1.5" />
//             International
//           </Badge>
//         </div>
//         {pkg.isFeatured && (
//           <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
//             <Badge variant="warning" className="font-semibold px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm shadow-md">
//               Featured
//             </Badge>
//           </div>
//         )}
//         <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 z-10">
//           <button
//             onClick={handleWishlistToggle}
//             disabled={isToggling}
//             className={`rounded-full p-2 sm:p-2.5 transition-all duration-200 shadow-md transform hover:scale-110 ${
//               isWishlisted
//                 ? 'bg-red-500 text-white hover:bg-red-600'
//                 : 'bg-white/30 backdrop-blur-sm text-white hover:bg-white/50'
//             } ${isToggling ? 'opacity-50 cursor-not-allowed animate-pulse' : ''}`}
//             title={isAuthenticated ? (isWishlisted ? 'Remove from wishlist' : 'Add to wishlist') : 'Login to add to wishlist'}
//           >
//             <Heart
//               className={`w-4 sm:w-5 h-4 sm:h-5 transition-all duration-200 ${
//                 isWishlisted ? 'fill-current' : ''
//               } ${isToggling ? 'animate-pulse' : ''}`}
//             />
//           </button>
//         </div>
//       </div>
//       <div className={`p-3 sm:p-4 ${isListView ? 'flex-1 flex flex-col justify-between' : ''}`}>
//         <div>
//           <div className="flex items-center justify-between mb-2">
//             <div className="flex items-center text-primary-600 text-xs sm:text-sm">
//               <MapPin className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
//               {pkg.destination}
//             </div>
//             {pkg.rating && (
//               <div className="flex items-center text-yellow-500">
//                 <Star className="w-3 sm:w-4 h-3 sm:h-4 mr-1 fill-current" />
//                 <span className="text-xs sm:text-sm font-medium text-gray-900">{pkg.rating}</span>
//               </div>
//             )}
//           </div>
//           <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{pkg.title}</h3>
//           {isListView && (
//             <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{pkg.description}</p>
//           )}
//           <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
//             <div className="flex items-center">
//               <Calendar className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
//               {pkg.duration} days
//             </div>
//             <div className="flex items-center">
//               <Users className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
//               Max {pkg.maxGroupSize || 10}
//             </div>
//           </div>
//         </div>
//         <div>
//           <div className="flex items-center justify-between mb-3 sm:mb-4">
//             <div>
//               <div className="flex items-center">
//                 <IndianRupee className="h-3 sm:h-4 w-3 sm:w-4 text-gray-900" />
//                 <span className="text-base sm:text-xl font-bold text-gray-900">{pkg.price.toLocaleString()}</span>
//               </div>
//               {pkg.originalPrice && pkg.originalPrice > pkg.price && (
//                 <div className="flex items-center text-xs sm:text-sm text-gray-500 line-through">
//                   <IndianRupee className="h-2.5 sm:h-3 w-2.5 sm:w-3" />
//                   <span>{pkg.originalPrice.toLocaleString()}</span>
//                 </div>
//               )}
//               <div className="text-xs text-gray-600">per person</div>
//             </div>
//             {pkg.originalPrice && pkg.originalPrice > pkg.price && (
//               <Badge variant="success" size="sm" className="text-xs sm:text-sm">
//                 {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
//               </Badge>
//             )}
//           </div>
//           <div className="space-y-2">
//             <Link href={`/packages/${pkg._id}`}>
//               <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
//                 View Details
//               </Button>
//             </Link>
//             <BookButton
//               packageId={pkg._id}
//               packageTitle={pkg.title}
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm"
//               size="sm"
//             >
//               Book Now
//             </BookButton>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// };

// const InternationalPackagesPage: React.FC = () => {
//   const [packages, setPackages] = useState<Package[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     category: 'all',
//     destination: '',
//     minPrice: '',
//     maxPrice: '',
//     sort: 'createdAt'
//   });
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [showFilters, setShowFilters] = useState(false);

//   const categories = ['Adventure', 'Beach', 'Cultural', 'Family', 'Honeymoon', 'Luxury', 'Pilgrimage', 'Wildlife', 'Historical', 'Religious'];

//   useEffect(() => {
//     fetchInternationalPackages();
//   }, [filters]);

//   const fetchInternationalPackages = async () => {
//     setLoading(true);
//     try {
//       const queryParams = new URLSearchParams({
//         type: 'international',
//         limit: '20',
//         ...Object.entries(filters).reduce((acc, [key, value]) => {
//           if (value && value !== 'all') acc[key] = value;
//           return acc;
//         }, {} as Record<string, string>)
//       });

//       const response = await fetch(`/api/packages?${queryParams}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch packages');
//       }

//       const data = await response.json();
//       if (data.success) {
//         setPackages(data.packages);
//       } else {
//         throw new Error(data.message || 'Failed to load packages');
//       }
//     } catch (error: any) {
//       console.error('Error fetching international packages:', error);
//       alert('An error occurred while fetching packages. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const faqs = [
//     { q: 'How early should I apply for a visa?', a: 'Apply at least 2-3 months in advance to avoid delays.' },
//     { q: 'Can I use my electronics anywhere in the world?', a: 'Check voltage compatibility; use adapters for different plug types.' },
//     { q: 'Should I exchange currency before I go for my international trip?', a: 'Exchange a small amount beforehand; use ATMs for better rates.' },
//     { q: 'How can I stay safe in unfamiliar surroundings?', a: 'Stay aware, use trusted transport, and share your itinerary.' },
//   ];

//   const handleFilterChange = (key: string, value: string) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   return (
//     <Layout title="International Travel Packages" description="Explore amazing international destinations">
//       <Head>
//         <title>International Travel Packages - Travel Quench</title>
//         <meta
//           name="description"
//           content="Discover amazing international travel packages to destinations around the world. Book your dream vacation with Travel Quench."
//         />
//       </Head>
//       <div className="bg-gray-50 min-h-screen">
//         {/* Hero Section with added margin from top */}
//         <div className="mt-16 sm:mt-20 md:mt-24">
//           <div
//             className="relative bg-cover bg-center bg-no-repeat"
//             style={{
//               backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80')"
//             }}
//           >
//             <div className="absolute inset-0 bg-black/40"></div>
//             <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-center text-white">
//               <div className="flex justify-center mb-4">
//                 <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 sm:p-4">
//                   <Plane className="h-10 sm:h-12 w-10 sm:w-12 text-white" />
//                 </div>
//               </div>
//               <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">International Travel Packages</h1>
//               <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-xl sm:max-w-2xl mx-auto">
//                 Discover your next adventure with our curated international travel packages.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//           <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
//             <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center text-xs sm:text-sm w-full sm:w-auto"
//               >
//                 <SlidersHorizontal className="h-3 sm:h-4 w-3 sm:w-4 mr-2" />
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//               </Button>
//               <div className="flex gap-2">
//                 <Button
//                   variant={viewMode === 'grid' ? 'default' : 'outline'}
//                   onClick={() => setViewMode('grid')}
//                   className="p-2 sm:p-2.5"
//                 >
//                   <Grid3X3 className="h-3 sm:h-4 w-3 sm:w-4" />
//                 </Button>
//                 <Button
//                   variant={viewMode === 'list' ? 'default' : 'outline'}
//                   onClick={() => setViewMode('list')}
//                   className="p-2 sm:p-2.5"
//                 >
//                   <List className="h-3 sm:h-4 w-3 sm:w-4" />
//                 </Button>
//               </div>
//             </div>
//             <div className="w-full sm:w-64">
//               <Input
//                 placeholder="Search international destinations..."
//                 value={filters.destination}
//                 onChange={(e) => handleFilterChange('destination', e.target.value)}
//                 icon={<Search className="h-3 sm:h-4 w-3 sm:w-4 text-gray-400" />}
//                 className="text-xs sm:text-sm"
//               />
//             </div>
//           </div>
//           {showFilters && (
//             <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded-lg shadow-md">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//                 <Select
//                   value={filters.category}
//                   onChange={(value) => handleFilterChange('category', value)}
//                   options={[{ value: 'all', label: 'All Categories' }, ...categories.map((cat) => ({ value: cat, label: cat }))]}
//                   placeholder="Select Category"
//                   className="text-xs sm:text-sm"
//                 />
//                 <Input
//                   type="number"
//                   placeholder="Min Price"
//                   value={filters.minPrice}
//                   onChange={(e) => handleFilterChange('minPrice', e.target.value)}
//                   className="text-xs sm:text-sm"
//                 />
//                 <Input
//                   type="number"
//                   placeholder="Max Price"
//                   value={filters.maxPrice}
//                   onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
//                   className="text-xs sm:text-sm"
//                 />
//                 <Select
//                   value={filters.sort}
//                   onChange={(value) => handleFilterChange('sort', value)}
//                   options={[
//                     { value: 'createdAt', label: 'Newest First' },
//                     { value: 'priceAsc', label: 'Price: Low to High' },
//                     { value: 'priceDesc', label: 'Price: High to Low' },
//                     { value: 'rating', label: 'Top Rated' }
//                   ]}
//                   placeholder="Sort By"
//                   className="text-xs sm:text-sm"
//                 />
//               </div>
//             </div>
//           )}
//           {loading ? (
//             <div className="flex items-center justify-center py-8 sm:py-12">
//               <div className="animate-spin rounded-full h-8 sm:h-12 w-8 sm:w-12 border-b-2 border-primary-500"></div>
//               <span className="ml-2 sm:ml-3 text-gray-600 text-sm sm:text-base">Loading international packages...</span>
//             </div>
//           ) : packages.length === 0 ? (
//             <div className="text-center py-8 sm:py-16">
//               <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-12 max-w-md mx-auto">
//                 <Plane className="h-12 sm:h-16 w-12 sm:w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
//                 <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-2">No Packages Found</h3>
//                 <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
//                   Try adjusting your filters or search for different destinations.
//                 </p>
//                 <Button
//                   onClick={() => setFilters({ category: 'all', destination: '', minPrice: '', maxPrice: '', sort: 'createdAt' })}
//                   className="text-xs sm:text-sm"
//                 >
//                   Clear Filters
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <div
//               className={
//                 viewMode === 'grid'
//                   ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
//                   : 'space-y-4 sm:space-y-6'
//               }
//             >
//               {packages.map((pkg) => (
//                 <PackageCard key={pkg._id} pkg={pkg} isListView={viewMode === 'list'} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* FAQ */}
//       <div className="py-12 bg-white">
//         <div className="max-w-4xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
//             <p className="text-lg text-gray-600">Your right to Know!</p>
//           </div>
//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <details key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
//                 <summary className="font-semibold text-gray-800 cursor-pointer mb-2">{faq.q}</summary>
//                 <p className="text-gray-600">{faq.a}</p>
//               </details>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Travel Guidelines */}
//       <div className="py-12 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">International Trips Travel Guidelines</h2>
//           <div className="space-y-4 text-gray-700">
//             <ol className="list-decimal pl-6 space-y-2">
//               <li>Ensure your passport is valid for at least six months beyond your return date. Keep photocopies.</li>
//               <li>Apply for visas 2-3 months in advance or check visa-on-arrival options.</li>
//               <li>Check required vaccines and carry a first aid kit.</li>
//               <li>Book flights early to avoid price hikes.</li>
//               <li>Verify travel restrictions for your destination.</li>
//               <li>Get comprehensive travel insurance covering medical emergencies and cancellations.</li>
//               <li>Purchase an international SIM or data plan for connectivity.</li>
//               <li>Download offline maps, cab apps, and translation tools.</li>
//               <li>Learn basic local phrases to ease communication.</li>
//               <li>Pack essentials smartly; check weather and local customs.</li>
//               <li>Exchange currency wisely; carry some cash.</li>
//               <li>Save local emergency contacts and share your itinerary with trusted contacts.</li>
//             </ol>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </Layout>
//   );
// };

// export default InternationalPackagesPage;









import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import Layout from '@/components/layout/Layout';
import BookButton from '@/components/common/BookButton';
import {
  
  MapPin,
  Calendar,
  Users,
  Star,
  IndianRupee,
  Globe,
  SlidersHorizontal,
  Grid3X3,
  List,
  Heart,
  Plane
} from 'lucide-react';
import { Button, Card, Badge, Input, Select } from '@/components/ui';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';

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
  thumbnail: string;
  maxGroupSize?: number;
  description?: string;
  isFeatured: boolean;
}

interface ApiError {
  message: string;
}

const PackageCard = ({ pkg, isListView = false }: { pkg: Package; isListView?: boolean }) => {
  const { isAuthenticated } = useAuth();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isToggling, setIsToggling] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const isWishlisted = wishlist.some((item) => item.packageId === pkg._id);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }
    setIsToggling(true);
    try {
      if (isWishlisted) {
        await removeFromWishlist(pkg._id);
      } else {
        await addToWishlist(pkg._id);
      }
    } catch (error: unknown) {
      console.error('Error toggling wishlist:', error);
      const errorMessage = (error as ApiError)?.message || 'Failed to update wishlist';
      alert(errorMessage);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Card
      padding="none"
      className={`overflow-hidden hover:shadow-lg transition-all duration-300 group relative ${isListView ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}
    >
      {showLoginPrompt && (
        <div className="absolute top-2 left-2 right-2 mx-2 bg-blue-500 text-white text-xs sm:text-sm px-3 py-2 rounded-lg z-20 shadow-lg">
          Please login to add to wishlist
        </div>
      )}
      <div className={`relative ${isListView ? 'w-full sm:w-1/3' : 'w-full'} aspect-[3/2]`}>
        <Image
          src={pkg.thumbnail || '/images/placeholder-package.jpg'}
          alt={pkg.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
          <Badge className="bg-green-700 text-white font-semibold px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm shadow-md">
            <Globe className="h-3 sm:h-4 w-3 sm:w-4 text-green-300 mr-1 sm:mr-1.5" />
            International
          </Badge>
        </div>
        {pkg.isFeatured && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
            <Badge variant="warning" className="font-semibold px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm shadow-md">
              Featured
            </Badge>
          </div>
        )}
        <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 z-10">
          <button
            onClick={handleWishlistToggle}
            disabled={isToggling}
            className={`rounded-full p-2 sm:p-2.5 transition-all duration-200 shadow-md transform hover:scale-110 ${
              isWishlisted
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white/30 backdrop-blur-sm text-white hover:bg-white/50'
            } ${isToggling ? 'opacity-50 cursor-not-allowed animate-pulse' : ''}`}
            title={isAuthenticated ? (isWishlisted ? 'Remove from wishlist' : 'Add to wishlist') : 'Login to add to wishlist'}
          >
            <Heart
              className={`w-4 sm:w-5 h-4 sm:h-5 transition-all duration-200 ${
                isWishlisted ? 'fill-current' : ''
              } ${isToggling ? 'animate-pulse' : ''}`}
            />
          </button>
        </div>
      </div>
      <div className={`p-3 sm:p-4 ${isListView ? 'flex-1 flex flex-col justify-between' : ''}`}>
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-primary-600 text-xs sm:text-sm">
              <MapPin className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
              {pkg.destination}
            </div>
            {pkg.rating && (
              <div className="flex items-center text-yellow-500">
                <Star className="w-3 sm:w-4 h-3 sm:h-4 mr-1 fill-current" />
                <span className="text-xs sm:text-sm font-medium text-gray-900">{pkg.rating}</span>
              </div>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{pkg.title}</h3>
          {isListView && (
            <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{pkg.description}</p>
          )}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
            <div className="flex items-center">
              <Calendar className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
              {pkg.duration} days
            </div>
            <div className="flex items-center">
              <Users className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
              Max {pkg.maxGroupSize || 10}
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <div className="flex items-center">
                <IndianRupee className="h-3 sm:h-4 w-3 sm:w-4 text-gray-900" />
                <span className="text-base sm:text-xl font-bold text-gray-900">{pkg.price.toLocaleString()}</span>
              </div>
              {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                <div className="flex items-center text-xs sm:text-sm text-gray-500 line-through">
                  <IndianRupee className="h-2.5 sm:h-3 w-2.5 sm:w-3" />
                  <span>{pkg.originalPrice.toLocaleString()}</span>
                </div>
              )}
              <div className="text-xs text-gray-600">per person</div>
            </div>
            {pkg.originalPrice && pkg.originalPrice > pkg.price && (
              <Badge variant="success" size="sm" className="text-xs sm:text-sm">
                {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>

<div className="space-y-2">
  <Link href={`/packages/${pkg._id}`}>
    <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
      View Details
    </Button>
  </Link>
  <BookButton
    packageId={pkg._id}
    className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm"
    size="sm"
  >
    Book Now
  </BookButton>
</div>


          {/* <div className="space-y-2">
            <Link href={`/packages/${pkg._id}`}>
              <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                View Details
              </Button>
            </Link>
            <BookButton
              packageId={pkg._id}
              packageTitle={pkg.title}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm"
              size="sm"
            >
              Book Now
            </BookButton>
          </div> */}
        </div>
      </div>
    </Card>
  );
};

const InternationalPackagesPage: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    destination: '',
    minPrice: '',
    maxPrice: '',
    sort: 'createdAt'
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Adventure', 'Beach', 'Cultural', 'Family', 'Honeymoon', 'Luxury', 'Pilgrimage', 'Wildlife', 'Historical', 'Religious'];

  const fetchInternationalPackages = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        type: 'international',
        limit: '20',
        ...Object.entries(filters).reduce((acc, [key, value]) => {
          if (value && value !== 'all') acc[key] = value;
          return acc;
        }, {} as Record<string, string>)
      });

      const response = await fetch(`/api/packages?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch packages');
      }

      const data = await response.json();
      if (data.success) {
        setPackages(data.packages);
      } else {
        throw new Error(data.message || 'Failed to load packages');
      }
    } catch (error: unknown) {
      console.error('Error fetching international packages:', error);
      alert('An error occurred while fetching packages. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchInternationalPackages();
  }, [fetchInternationalPackages]);

  const faqs = [
    { q: 'How early should I apply for a visa?', a: 'Apply at least 2-3 months in advance to avoid delays.' },
    { q: 'Can I use my electronics anywhere in the world?', a: 'Check voltage compatibility; use adapters for different plug types.' },
    { q: 'Should I exchange currency before I go for my international trip?', a: 'Exchange a small amount beforehand; use ATMs for better rates.' },
    { q: 'How can I stay safe in unfamiliar surroundings?', a: 'Stay aware, use trusted transport, and share your itinerary.' },
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Layout title="International Travel Packages" description="Explore amazing international destinations">
      <Head>
        <title>International Travel Packages - Travel Quench</title>
        <meta
          name="description"
          content="Discover amazing international travel packages to destinations around the world. Book your dream vacation with Travel Quench."
        />
      </Head>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section with added margin from top */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <div
            className="relative bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80')"
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-center text-white">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 sm:p-4">
                  <Plane className="h-10 sm:h-12 w-10 sm:w-12 text-white" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">International Travel Packages</h1>
              <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-xl sm:max-w-2xl mx-auto">
                Discover your next adventure with our curated international travel packages.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-xs sm:text-sm w-full sm:w-auto"
              >
                <SlidersHorizontal className="h-3 sm:h-4 w-3 sm:w-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
<div className="flex gap-2">
  <Button
    variant={viewMode === 'grid' ? 'primary' : 'outline'}
    onClick={() => setViewMode('grid')}
    className="p-2 sm:p-2.5"
  >
    <Grid3X3 className="h-3 sm:h-4 w-3 sm:w-4" />
  </Button>
  <Button
    variant={viewMode === 'list' ? 'primary' : 'outline'}
    onClick={() => setViewMode('list')}
    className="p-2 sm:p-2.5"
  >
    <List className="h-3 sm:h-4 w-3 sm:w-4" />
  </Button>
</div>

              {/* <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => setViewMode('grid')}
                  className="p-2 sm:p-2.5"
                >
                  <Grid3X3 className="h-3 sm:h-4 w-3 sm:w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  onClick={() => setViewMode('list')}
                  className="p-2 sm:p-2.5"
                >
                  <List className="h-3 sm:h-4 w-3 sm:w-4" />
                </Button>
              </div> */}
            </div>
    
    <div className="w-full sm:w-64">
  <Input
    placeholder="Search international destinations..."
    value={filters.destination}
    onChange={(e) => handleFilterChange('destination', e.target.value)}
    className="text-xs sm:text-sm"
  />
</div>


          </div>
          {showFilters && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded-lg shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                
                <Select
  value={filters.category}
  onChange={(e) => handleFilterChange('category', e.target.value)}
  options={[{ value: 'all', label: 'All Categories' }, ...categories.map((cat) => ({ value: cat, label: cat }))]}
  placeholder="Select Category"
  className="text-xs sm:text-sm"
/>

                <Input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="text-xs sm:text-sm"
                />
                <Input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="text-xs sm:text-sm"
                />
                <Select
  value={filters.category}
  onChange={(e) => handleFilterChange('category', e.target.value)}
  options={[{ value: 'all', label: 'All Categories' }, ...categories.map((cat) => ({ value: cat, label: cat }))]}
  placeholder="Select Category"
  className="text-xs sm:text-sm"
/>
              </div>
            </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center py-8 sm:py-12">
              <div className="animate-spin rounded-full h-8 sm:h-12 w-8 sm:w-12 border-b-2 border-primary-500"></div>
              <span className="ml-2 sm:ml-3 text-gray-600 text-sm sm:text-base">Loading international packages...</span>
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-8 sm:py-16">
              <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-12 max-w-md mx-auto">
                <Plane className="h-12 sm:h-16 w-12 sm:w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-2">No Packages Found</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
                  Try adjusting your filters or search for different destinations.
                </p>
                <Button
                  onClick={() => setFilters({ category: 'all', destination: '', minPrice: '', maxPrice: '', sort: 'createdAt' })}
                  className="text-xs sm:text-sm"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
                  : 'space-y-4 sm:space-y-6'
              }
            >
              {packages.map((pkg) => (
                <PackageCard key={pkg._id} pkg={pkg} isListView={viewMode === 'list'} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FAQ */}
      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Your right to Know!</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                <summary className="font-semibold text-gray-800 cursor-pointer mb-2">{faq.q}</summary>
                <p className="text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Travel Guidelines */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">International Trips Travel Guidelines</h2>
          <div className="space-y-4 text-gray-700">
            <ol className="list-decimal pl-6 space-y-2">
              <li>Ensure your passport is valid for at least six months beyond your return date. Keep photocopies.</li>
              <li>Apply for visas 2-3 months in advance or check visa-on-arrival options.</li>
              <li>Check required vaccines and carry a first aid kit.</li>
              <li>Book flights early to avoid price hikes.</li>
              <li>Verify travel restrictions for your destination.</li>
              <li>Get comprehensive travel insurance covering medical emergencies and cancellations.</li>
              <li>Purchase an international SIM or data plan for connectivity.</li>
              <li>Download offline maps, cab apps, and translation tools.</li>
              <li>Learn basic local phrases to ease communication.</li>
              <li>Pack essentials smartly; check weather and local customs.</li>
              <li>Exchange currency wisely; carry some cash.</li>
              <li>Save local emergency contacts and share your itinerary with trusted contacts.</li>
            </ol>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
};

export default InternationalPackagesPage;









