// // src/pages/packages/[id].tsx - Fixed Version
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';
// import Layout from '@/components/layout/Layout';
// import {
//   ArrowLeft,
//   MapPin,
//   Calendar,
//   Users,
//   Star,
//   IndianRupee,
//   Globe,
//   Home,
//   Heart,
//   Share2,
//   Check,
//   X,
//   Phone,
//   Mail,
//   MessageCircle,
// } from 'lucide-react';
// import { Button, Card, Badge } from '@/components/ui';
// import WhatsAppButton from '@/components/common/WhatsAppButton';

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
//   rating?: number;
//   totalReviews?: number;
//   thumbnail: string;
//   images: string[];
//   highlights: string[];
//   inclusions: string[];
//   exclusions: string[];
//   itinerary: {
//     day: number;
//     title: string;
//     description: string;
//     meals: string[];
//     accommodation: string;
//   }[];
//   maxGroupSize: number;
//   minAge: number;
//   isActive: boolean;
//   isFeatured: boolean;
//   createdAt: string;
// }

// const PackageDetailPage: React.FC = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [packageData, setPackageData] = useState<Package | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string>('');
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [showAllInclusions, setShowAllInclusions] = useState(false);
//   const [showAllExclusions, setShowAllExclusions] = useState(false);

//   useEffect(() => {
//     if (id && typeof id === 'string') {
//       fetchPackage(id);
//     }
//   }, [id]);

//   const fetchPackage = async (packageId: string) => {
//     try {
//       setError('');
//       setLoading(true);
//       console.log('Fetching package:', packageId);

//       const response = await fetch(`/api/packages/${packageId}`);

//       if (!response.ok) {
//         if (response.status === 404) {
//           setError('Package not found');
//           return;
//         }
//         throw new Error(`Failed to fetch package: ${response.status}`);
//       }

//       const data = await response.json();
//       if (data.success && data.package) {
//         setPackageData(data.package);
//       } else {
//         setError('Package not found');
//       }
//     } catch (error) {
//       console.error('Failed to fetch package:', error);
//       setError(error instanceof Error ? error.message : 'Failed to load package');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Layout title="Loading Package...">
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
//           <span className="ml-3 text-gray-600">Loading package details...</span>
//         </div>
//       </Layout>
//     );
//   }

//   if (error || !packageData) {
//     return (
//       <Layout title="Package Not Found">
//         <div className="max-w-4xl mx-auto px-4 py-12">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
//             <p className="text-gray-600 mb-8">{error || 'The package you are looking for does not exist.'}</p>
//             <div className="flex justify-center space-x-4">
//               <Button onClick={() => router.back()} variant="outline">
//                 Go Back
//               </Button>
//               <Link href="/packages">
//                 <Button>Browse All Packages</Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   const allImages = [packageData.thumbnail, ...packageData.images].filter(Boolean);
//   const savings = packageData.originalPrice ? packageData.originalPrice - packageData.price : 0;
//   const savingsPercent = packageData.originalPrice ? Math.round((savings / packageData.originalPrice) * 100) : 0;

//   return (
//     <Layout title={packageData.title} description={packageData.description}>
//       <Head>
//         <title>{packageData.title} - Travel Quench</title>
//         <meta name="description" content={packageData.description} />
//       </Head>

//       <div className="bg-gray-50 min-h-screen">
//         {/* Header */}
//         <div className="bg-white shadow-sm">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//             <div className="flex items-center justify-between">
//               <button
//                 onClick={() => router.back()}
//                 className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 <ArrowLeft className="h-5 w-5 mr-2" />
//                 Back to Packages
//               </button>

//               <div className="flex items-center space-x-2">
//                 <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
//                   <Heart className="h-5 w-5" />
//                 </button>
//                 <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
//                   <Share2 className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Left Column - Main Content */}
//             <div className="lg:col-span-2">
//               {/* Image Gallery */}
//               <Card padding="none" className="overflow-hidden mb-8">
//                 <div className="relative h-96">
//                   {allImages.length > 0 ? (
//                     <Image
//                       src={allImages[activeImageIndex]}
//                       alt={packageData.title}
//                       fill
//                       className="object-cover"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center h-full bg-gray-200">
//                       <span className="text-gray-400">No image available</span>
//                     </div>
//                   )}

//                   {/* Type Badge */}
//                   <div className="absolute top-4 left-4">
//                     <Badge className="bg-black/50 text-white">
//                       {packageData.type === 'international' ? (
//                         <>
//                           <Globe className="h-3 w-3 text-green-200 mr-1" />
//                           International
//                         </>
//                       ) : (
//                         <>
//                           <Home className="h-3  test-green-300 w-3 mr-1" />
//                           Domestic
//                         </>
//                       )}
//                     </Badge>
//                   </div>

//                   {/* Featured Badge */}
//                   {packageData.isFeatured && (
//                     <div className="absolute top-4 right-4">
//                       <Badge variant="warning">Featured</Badge>
//                     </div>
//                   )}
//                 </div>

//                 {/* Image Thumbnails */}
//                 {allImages.length > 1 && (
//                   <div className="p-4 bg-gray-50">
//                     <div className="flex space-x-2 overflow-x-auto">
//                       {allImages.map((image, index) => (
//                         <button
//                           key={index}
//                           onClick={() => setActiveImageIndex(index)}
//                           className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
//                             index === activeImageIndex ? 'border-primary-500' : 'border-transparent'
//                           }`}
//                         >
//                           <Image
//                             src={image}
//                             alt={`${packageData.title} ${index + 1}`}
//                             width={80}
//                             height={64}
//                             className="w-full h-full object-cover"
//                           />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </Card>

//               {/* Package Details */}
//               <Card className="mb-8">
//                 <div className="mb-6">
//                   <div className="flex items-center text-primary-600 text-sm mb-2">
//                     <MapPin className="w-4 h-4 mr-1" />
//                     {packageData.destination}
//                   </div>

//                   <h1 className="text-3xl font-bold text-gray-900 mb-4">{packageData.title}</h1>

//                   <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       {packageData.duration} days
//                     </div>
//                     <div className="flex items-center">
//                       <Users className="w-4 h-4 mr-1" />
//                       Max {packageData.maxGroupSize} people
//                     </div>
//                     {packageData.rating && (
//                       <div className="flex items-center">
//                         <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
//                         {packageData.rating.toFixed(1)} ({packageData.totalReviews || 0} reviews)
//                       </div>
//                     )}
//                   </div>

//                   <Badge variant="secondary">{packageData.category}</Badge>
//                 </div>

//                 <div className="prose max-w-none">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Package</h3>
//                   <p className="text-gray-600 leading-relaxed">{packageData.description}</p>
//                 </div>
//               </Card>

//               {/* Highlights */}
//               {packageData.highlights && packageData.highlights.length > 0 && (
//                 <Card className="mb-8">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <Star className="h-5 w-5 mr-2 text-yellow-500" />
//                     Package Highlights
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {packageData.highlights.map((highlight, index) => (
//                       <div key={index} className="flex items-start">
//                         <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
//                         <span className="text-gray-700">{highlight}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </Card>
//               )}

//               {/* Inclusions & Exclusions */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                 {/* Inclusions */}
//                 {packageData.inclusions && packageData.inclusions.length > 0 && (
//                   <Card>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                       <Check className="h-5 w-5 mr-2 text-green-500" />
//                       What&apos;s Included
//                     </h3>
//                     <div className="space-y-2">
//                       {packageData.inclusions
//                         .slice(0, showAllInclusions ? undefined : 5)
//                         .map((inclusion, index) => (
//                           <div key={index} className="flex items-start">
//                             <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
//                             <span className="text-gray-700 text-sm">{inclusion}</span>
//                           </div>
//                         ))}
//                     </div>
//                     {packageData.inclusions.length > 5 && (
//                       <button
//                         onClick={() => setShowAllInclusions(!showAllInclusions)}
//                         className="mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium"
//                       >
//                         {showAllInclusions ? 'Show Less' : `Show All (${packageData.inclusions.length})`}
//                       </button>
//                     )}
//                   </Card>
//                 )}

//                 {/* Exclusions */}
//                 {packageData.exclusions && packageData.exclusions.length > 0 && (
//                   <Card>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                       <X className="h-5 w-5 mr-2 text-red-500" />
//                       What&apos;s Not Included
//                     </h3>
//                     <div className="space-y-2">
//                       {packageData.exclusions
//                         .slice(0, showAllExclusions ? undefined : 5)
//                         .map((exclusion, index) => (
//                           <div key={index} className="flex items-start">
//                             <X className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
//                             <span className="text-gray-700 text-sm">{exclusion}</span>
//                           </div>
//                         ))}
//                     </div>
//                     {packageData.exclusions.length > 5 && (
//                       <button
//                         onClick={() => setShowAllExclusions(!showAllExclusions)}
//                         className="mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium"
//                       >
//                         {showAllExclusions ? 'Show Less' : `Show All (${packageData.exclusions.length})`}
//                       </button>
//                     )}
//                   </Card>
//                 )}
//               </div>

//               {/* Itinerary */}
//               {packageData.itinerary && packageData.itinerary.length > 0 && (
//                 <Card>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-6">Day-wise Itinerary</h3>
//                   <div className="space-y-6">
//                     {packageData.itinerary.map((day, index) => (
//                       <div key={index} className="border-l-2 border-primary-200 pl-6 relative">
//                         <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-500 rounded-full"></div>
//                         <div className="bg-gray-50 rounded-lg p-4">
//                           <div className="flex items-center mb-2">
//                             <Badge variant="default" className="mr-3">
//                               Day {day.day}
//                             </Badge>
//                             <h4 className="font-semibold text-gray-900">{day.title}</h4>
//                           </div>

//                           {day.description && <p className="text-gray-600 mb-3">{day.description}</p>}

//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             {day.meals && day.meals.length > 0 && (
//                               <div>
//                                 <span className="text-sm font-medium text-gray-700">Meals:</span>
//                                 <div className="flex flex-wrap gap-1 mt-1">
//                                   {day.meals.map((meal, mealIndex) => (
//                                     <Badge key={mealIndex} variant="secondary" size="sm">
//                                       {meal}
//                                     </Badge>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}

//                             {day.accommodation && (
//                               <div>
//                                 <span className="text-sm font-medium text-gray-700">Stay:</span>
//                                 <p className="text-gray-600 text-sm mt-1">{day.accommodation}</p>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </Card>
//               )}
//             </div>

//             {/* Right Column - Booking Card */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-8">
//                 <Card>
//                   {/* Pricing */}
//                   <div className="text-center mb-6">
//                     <div className="flex items-center justify-center">
//                       <IndianRupee className="h-6 w-6 text-gray-900" />
//                       <span className="text-3xl font-bold text-gray-900">
//                         {packageData.price.toLocaleString('en-IN')}
//                       </span>
//                     </div>
//                     {packageData.originalPrice && packageData.originalPrice > packageData.price && (
//                       <>
//                         <div className="flex items-center justify-center text-gray-500 line-through mt-1">
//                           <IndianRupee className="h-4 w-4" />
//                           <span className="text-lg">{packageData.originalPrice.toLocaleString('en-IN')}</span>
//                         </div>
//                         <Badge variant="success" className="mt-2">
//                           Save ₹{savings.toLocaleString('en-IN')} ({savingsPercent}% OFF)
//                         </Badge>
//                       </>
//                     )}
//                     <p className="text-sm text-gray-600 mt-2">Per person (all inclusive)</p>
//                   </div>

//                   {/* Package Info */}
//                   <div className="space-y-3 mb-6">
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="text-gray-600">Duration:</span>
//                       <span className="font-medium">{packageData.duration} days</span>
//                     </div>
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="text-gray-600">Group Size:</span>
//                       <span className="font-medium">Max {packageData.maxGroupSize}</span>
//                     </div>
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="text-gray-600">Min Age:</span>
//                       <span className="font-medium">{packageData.minAge || 0} years</span>
//                     </div>
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="text-gray-600">Category:</span>
//                       <Badge variant="secondary" size="sm">
//                         {packageData.category}
//                       </Badge>
//                     </div>
//                   </div>

//                   {/* Booking Actions */}
//                   <div className="space-y-3">
//                     <WhatsAppButton
//                       message={`Hi! I'm interested in booking the ${packageData.title} package for ${packageData.duration} days. Can you help me with the booking process and provide more details?`}
//                       className="w-full bg-green-500 hover:bg-green-600 text-white"
//                     >
//                       <MessageCircle className="w-4 h-4 mr-2" />
//                       Book via WhatsApp
//                     </WhatsAppButton>

//                     <Button variant="outline" className="w-full">
//                       <Phone className="w-4 h-4 mr-2" />
//                       Call to Book
//                     </Button>

//                     <Button variant="outline" className="w-full">
//                       <Mail className="w-4 h-4 mr-2" />
//                       Email Inquiry
//                     </Button>
//                   </div>

//                   {/* Contact Info */}
//                   <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
//                     <p>Need help? Call us at</p>
//                     <p className="font-medium text-gray-900">+91 70063 77796</p>
//                   </div>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default PackageDetailPage;














// src/pages/packages/[id].tsx - Fully Responsive Version
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Star,
  IndianRupee,
  Globe,
  Home,
  Heart,
  Share2,
  Check,
  X,
  Phone,
  Mail,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
  Wifi,
  Car,
  Coffee,
  Camera,
} from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';
import WhatsAppButton from '@/components/common/WhatsAppButton';

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
  rating?: number;
  totalReviews?: number;
  thumbnail: string;
  images: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    meals: string[];
    accommodation: string;
  }[];
  maxGroupSize: number;
  minAge: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

const PackageDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllInclusions, setShowAllInclusions] = useState(false);
  const [showAllExclusions, setShowAllExclusions] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobile, setIsMobile] = useState(false);
  const [showBookingCard, setShowBookingCard] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchPackage(id);
    }
  }, [id]);

  const fetchPackage = async (packageId: string) => {
    try {
      setError('');
      setLoading(true);
      console.log('Fetching package:', packageId);

      const response = await fetch(`/api/packages/${packageId}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError('Package not found');
          return;
        }
        throw new Error(`Failed to fetch package: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.package) {
        setPackageData(data.package);
      } else {
        setError('Package not found');
      }
    } catch (error) {
      console.error('Failed to fetch package:', error);
      setError(error instanceof Error ? error.message : 'Failed to load package');
    } finally {
      setLoading(false);
    }
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!packageData) return;
    const allImages = [packageData.thumbnail, ...packageData.images].filter(Boolean);
    
    if (direction === 'prev') {
      setActiveImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1);
    } else {
      setActiveImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'inclusions', label: 'Inclusions' },
    { id: 'details', label: 'Details' }
  ];

  if (loading) {
    return (
      <Layout title="Loading Package...">
        <div className="flex items-center justify-center h-64 px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary-500 mx-auto"></div>
            <span className="mt-3 text-gray-600 text-sm sm:text-base">Loading package details...</span>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !packageData) {
    return (
      <Layout title="Package Not Found">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">{error || 'The package you are looking for does not exist.'}</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button onClick={() => router.back()} variant="outline" className="w-full sm:w-auto">
                Go Back
              </Button>
              <Link href="/packages">
                <Button className="w-full sm:w-auto">Browse All Packages</Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const allImages = [packageData.thumbnail, ...packageData.images].filter(Boolean);
  const savings = packageData.originalPrice ? packageData.originalPrice - packageData.price : 0;
  const savingsPercent = packageData.originalPrice ? Math.round((savings / packageData.originalPrice) * 100) : 0;

  return (
    <Layout title={packageData.title} description={packageData.description}>
      <Head>
        <title>{packageData.title} - Travel Quench</title>
        <meta name="description" content={packageData.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Mobile Header */}
        <div className="bg-white shadow-sm sticky top-0 z-50">
          <div className="px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors touch-target"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                <span className="text-sm sm:text-base">Back</span>
              </button>

              <div className="flex items-center space-x-1 sm:space-x-2">
                <button className="p-2 text-gray-600 hover:text-red-500 transition-colors touch-target">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors touch-target">
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                {isMobile && (
                  <button
                    onClick={() => setShowBookingCard(true)}
                    className="ml-2 px-3 py-1.5 bg-primary-600 text-white text-sm rounded-lg font-medium"
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery - Mobile Optimized */}
              <Card padding="none" className="overflow-hidden mb-4 sm:mb-6 lg:mb-8">
                <div className="relative h-48 sm:h-64 lg:h-96">
                  {allImages.length > 0 ? (
                    <>
                      <Image
                        src={allImages[activeImageIndex]}
                        alt={packageData.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 67vw, 50vw"
                        priority
                      />
                      
                      {/* Image Navigation - Mobile Optimized */}
                      {allImages.length > 1 && (
                        <>
                          <button
                            onClick={() => navigateImage('prev')}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all touch-target"
                          >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={() => navigateImage('next')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all touch-target"
                          >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          
                          {/* Image Counter */}
                          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded-lg">
                            {activeImageIndex + 1} / {allImages.length}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200">
                      <span className="text-gray-400 text-sm">No image available</span>
                    </div>
                  )}

                  {/* Type Badge - Green Color */}
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                    <Badge className="bg-green-600 text-white text-xs sm:text-sm">
                      {packageData.type === 'international' ? (
                        <>
                          <Globe className="h-3 w-3 text-green-200 mr-1" />
                          International
                        </>
                      ) : (
                        <>
                          <Home className="h-3 w-3 text-green-200 mr-1" />
                          Domestic
                        </>
                      )}
                    </Badge>
                  </div>

                  {/* Featured Badge */}
                  {packageData.isFeatured && (
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                      <Badge variant="warning" className="text-xs sm:text-sm">Featured</Badge>
                    </div>
                  )}
                </div>

                {/* Image Thumbnails - Hidden on small mobile */}
                {allImages.length > 1 && !isMobile && (
                  <div className="p-3 sm:p-4 bg-gray-50">
                    <div className="flex space-x-2 overflow-x-auto">
                      {allImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                            index === activeImageIndex ? 'border-primary-500' : 'border-transparent'
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${packageData.title} ${index + 1}`}
                            width={80}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </Card>

              {/* Package Header - Mobile Optimized */}
              <Card className="mb-4 sm:mb-6 lg:mb-8">
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center text-primary-600 text-xs sm:text-sm mb-2">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {packageData.destination}
                  </div>

                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                    {packageData.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {packageData.duration} days
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Max {packageData.maxGroupSize}
                    </div>
                    {packageData.rating && (
                      <div className="flex items-center">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-yellow-500 fill-current" />
                        {packageData.rating.toFixed(1)} ({packageData.totalReviews || 0})
                      </div>
                    )}
                  </div>

                  <Badge variant="secondary" className="text-xs sm:text-sm">{packageData.category}</Badge>
                </div>

                {/* Mobile Price Display */}
                {isMobile && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
                    <div>
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 text-gray-900" />
                        <span className="text-lg font-bold text-gray-900">
                          {packageData.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">Per person</p>
                    </div>
                    {packageData.originalPrice && packageData.originalPrice > packageData.price && (
                      <Badge variant="success" className="text-xs">
                        {savingsPercent}% OFF
                      </Badge>
                    )}
                  </div>
                )}

                <div className="prose max-w-none">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">About This Package</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{packageData.description}</p>
                </div>
              </Card>

              {/* Mobile Tabs */}
              <div className="mb-4 sm:mb-6">
                <div className="flex overflow-x-auto space-x-1 bg-gray-100 p-1 rounded-lg">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                        activeTab === tab.id
                          ? 'bg-white text-primary-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <>
                  {/* Highlights */}
                  {packageData.highlights && packageData.highlights.length > 0 && (
                    <Card className="mb-4 sm:mb-6 lg:mb-8">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                        <Star className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-500" />
                        Package Highlights
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {packageData.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-start">
                            <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-xs sm:text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </>
              )}

              {activeTab === 'inclusions' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6 lg:mb-8">
                  {/* Inclusions */}
                  {packageData.inclusions && packageData.inclusions.length > 0 && (
                    <Card>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-500" />
                        What's Included
                      </h3>
                      <div className="space-y-2">
                        {packageData.inclusions
                          .slice(0, showAllInclusions ? undefined : 5)
                          .map((inclusion, index) => (
                            <div key={index} className="flex items-start">
                              <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-xs sm:text-sm">{inclusion}</span>
                            </div>
                          ))}
                      </div>
                      {packageData.inclusions.length > 5 && (
                        <button
                          onClick={() => setShowAllInclusions(!showAllInclusions)}
                          className="mt-3 text-primary-600 hover:text-primary-700 text-xs sm:text-sm font-medium"
                        >
                          {showAllInclusions ? 'Show Less' : `Show All (${packageData.inclusions.length})`}
                        </button>
                      )}
                    </Card>
                  )}

                  {/* Exclusions */}
                  {packageData.exclusions && packageData.exclusions.length > 0 && (
                    <Card>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                        <X className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-red-500" />
                        What's Not Included
                      </h3>
                      <div className="space-y-2">
                        {packageData.exclusions
                          .slice(0, showAllExclusions ? undefined : 5)
                          .map((exclusion, index) => (
                            <div key={index} className="flex items-start">
                              <X className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-xs sm:text-sm">{exclusion}</span>
                            </div>
                          ))}
                      </div>
                      {packageData.exclusions.length > 5 && (
                        <button
                          onClick={() => setShowAllExclusions(!showAllExclusions)}
                          className="mt-3 text-primary-600 hover:text-primary-700 text-xs sm:text-sm font-medium"
                        >
                          {showAllExclusions ? 'Show Less' : `Show All (${packageData.exclusions.length})`}
                        </button>
                      )}
                    </Card>
                  )}
                </div>
              )}

              {activeTab === 'itinerary' && (
                <>
                  {/* Itinerary */}
                  {packageData.itinerary && packageData.itinerary.length > 0 && (
                    <Card>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Day-wise Itinerary</h3>
                      <div className="space-y-4 sm:space-y-6">
                        {packageData.itinerary.map((day, index) => (
                          <div key={index} className="border-l-2 border-primary-200 pl-4 sm:pl-6 relative">
                            <div className="absolute -left-2 top-0 w-3 h-3 sm:w-4 sm:h-4 bg-primary-500 rounded-full"></div>
                            <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                              <div className="flex flex-col sm:flex-row sm:items-center mb-2 sm:mb-3">
                                <Badge variant="default" className="mr-0 sm:mr-3 mb-2 sm:mb-0 text-xs w-fit">
                                  Day {day.day}
                                </Badge>
                                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{day.title}</h4>
                              </div>

                              {day.description && (
                                <p className="text-gray-600 mb-3 text-xs sm:text-sm leading-relaxed">{day.description}</p>
                              )}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {day.meals && day.meals.length > 0 && (
                                  <div>
                                    <span className="text-xs sm:text-sm font-medium text-gray-700">Meals:</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {day.meals.map((meal, mealIndex) => (
                                        <Badge key={mealIndex} variant="secondary" size="sm" className="text-xs">
                                          {meal}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {day.accommodation && (
                                  <div>
                                    <span className="text-xs sm:text-sm font-medium text-gray-700">Stay:</span>
                                    <p className="text-gray-600 text-xs sm:text-sm mt-1">{day.accommodation}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </>
              )}

              {activeTab === 'details' && (
                <Card>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Package Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{packageData.duration} days</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Group Size:</span>
                        <span className="font-medium">Max {packageData.maxGroupSize}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Min Age:</span>
                        <span className="font-medium">{packageData.minAge || 0} years</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Category:</span>
                        <Badge variant="secondary" size="sm" className="text-xs">
                          {packageData.category}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Type:</span>
                        <Badge className="bg-green-600 text-white text-xs">
                          {packageData.type === 'international' ? 'International' : 'Domestic'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column - Booking Card (Desktop) */}
            {!isMobile && (
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <BookingCard 
                    packageData={packageData} 
                    savings={savings} 
                    savingsPercent={savingsPercent} 
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Booking Bottom Sheet */}
        {isMobile && (
          <>
            {/* Fixed Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <IndianRupee className="h-4 w-4 text-gray-900" />
                    <span className="text-lg font-bold text-gray-900">
                      {packageData.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">Per person</p>
                </div>
                <Button 
                  onClick={() => setShowBookingCard(true)}
                  className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700"
                >
                  Book Now
                </Button>
              </div>
            </div>

            {/* Mobile Booking Modal */}
            {showBookingCard && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
                <div className="bg-white w-full rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Book This Package</h3>
                    <button 
                      onClick={() => setShowBookingCard(false)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <BookingCard 
                    packageData={packageData} 
                    savings={savings} 
                    savingsPercent={savingsPercent}
                    isMobile={true}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        .touch-target {
          min-height: 44px;
          min-width: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        @media (max-width: 640px) {
          .prose {
            font-size: 0.875rem;
            line-height: 1.5;
          }
        }
        
        /* Hide scrollbar for image thumbnails */
        .overflow-x-auto::-webkit-scrollbar {
          height: 4px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        
        /* Smooth scrolling */
        .overflow-x-auto {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        
        /* Enhanced mobile touch */
        @media (max-width: 768px) {
          .mobile-optimized {
            padding-bottom: 80px; /* Space for fixed bottom bar */
          }
        }
      `}</style>
    </Layout>
  );
};

// Booking Card Component
interface BookingCardProps {
  packageData: Package;
  savings: number;
  savingsPercent: number;
  isMobile?: boolean;
}

const BookingCard: React.FC<BookingCardProps> = ({ 
  packageData, 
  savings, 
  savingsPercent, 
  isMobile = false 
}) => {
  return (
    <Card className={isMobile ? 'shadow-none border-0' : ''}>
      {/* Pricing */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="flex items-center justify-center">
          <IndianRupee className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900" />
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">
            {packageData.price.toLocaleString('en-IN')}
          </span>
        </div>
        {packageData.originalPrice && packageData.originalPrice > packageData.price && (
          <>
            <div className="flex items-center justify-center text-gray-500 line-through mt-1">
              <IndianRupee className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-base sm:text-lg">{packageData.originalPrice.toLocaleString('en-IN')}</span>
            </div>
            <Badge variant="success" className="mt-2 text-xs sm:text-sm">
              Save ₹{savings.toLocaleString('en-IN')} ({savingsPercent}% OFF)
            </Badge>
          </>
        )}
        <p className="text-xs sm:text-sm text-gray-600 mt-2">Per person (all inclusive)</p>
      </div>

      {/* Package Info */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        <div className="flex justify-between items-center text-xs sm:text-sm">
          <span className="text-gray-600">Duration:</span>
          <span className="font-medium">{packageData.duration} days</span>
        </div>
        <div className="flex justify-between items-center text-xs sm:text-sm">
          <span className="text-gray-600">Group Size:</span>
          <span className="font-medium">Max {packageData.maxGroupSize}</span>
        </div>
        <div className="flex justify-between items-center text-xs sm:text-sm">
          <span className="text-gray-600">Min Age:</span>
          <span className="font-medium">{packageData.minAge || 0} years</span>
        </div>
        <div className="flex justify-between items-center text-xs sm:text-sm">
          <span className="text-gray-600">Category:</span>
          <Badge variant="secondary" size="sm" className="text-xs">
            {packageData.category}
          </Badge>
        </div>
      </div>

      {/* Booking Actions */}
      <div className="space-y-2 sm:space-y-3">
        <WhatsAppButton
          message={`Hi! I'm interested in booking the ${packageData.title} package for ${packageData.duration} days. Can you help me with the booking process and provide more details?`}
          className="w-full bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base py-2.5 sm:py-3"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Book via WhatsApp
        </WhatsAppButton>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          <Button variant="outline" className="w-full text-xs sm:text-sm py-2 sm:py-2.5">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Call to Book
          </Button>

          <Button variant="outline" className="w-full text-xs sm:text-sm py-2 sm:py-2.5">
            <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Email Inquiry
          </Button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 text-center text-xs sm:text-sm text-gray-600">
        <p>Need help? Call us at</p>
        <a 
          href="tel:+917006377796" 
          className="font-medium text-gray-900 hover:text-primary-600 transition-colors"
        >
          +91 70063 77796
        </a>
      </div>
    </Card>
  );
};

export default PackageDetailPage;