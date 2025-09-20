
// ============================================================================
// 2. UPDATE: src/pages/packages/indian.tsx (rename to domestic.tsx)
// ============================================================================
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import BookButton from '@/components/common/BookButton';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  IndianRupee,
  Home,
  SlidersHorizontal,
  Grid3X3,
  List,
  Heart,
  Mountain,
  Globe
} from 'lucide-react';
import { Button, Card, Badge, Input, Select } from '@/components/ui';
import WhatsAppButton from '@/components/common/WhatsAppButton';

// Same Package interface as above...
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

const DomesticPackagesPage: React.FC = () => {
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

  useEffect(() => {
    fetchDomesticPackages();
  }, [filters]);

  const fetchDomesticPackages = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        type: 'domestic',
        limit: '20',
        ...Object.entries(filters).reduce((acc, [key, value]) => {
          if (value && value !== 'all') acc[key] = value;
          return acc;
        }, {} as Record<string, string>)
      });

      const response = await fetch(`/api/packages?${queryParams}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPackages(data.packages);
        }
      }
    } catch (error) {
      console.error('Error fetching domestic packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Same PackageCard component but with "Domestic" badge...
  // const PackageCard = ({ pkg, isListView = false }: { pkg: Package; isListView?: boolean }) => (
  //   <Card padding="none" className={`overflow-hidden hover:shadow-lg transition-all duration-300 group ${isListView ? 'flex' : ''}`}>
  //     <div className={`relative ${isListView ? 'w-1/3' : 'w-full'}`}>
  //       <Image
  //         src={pkg.thumbnail || '/images/placeholder-package.jpg'}
  //         alt={pkg.title}
  //         width={isListView ? 200 : 300}
  //         height={200}
  //         className={`${isListView ? 'h-full' : 'h-48'} w-full object-cover group-hover:scale-105 transition-transform duration-300`}
  //       />
  //       <div className="absolute top-4 left-4">
  //         <Badge className="bg-green-600 text-white">
  //           <Home className="h-3 w-3 mr-1" />
  //           Domestic
  //         </Badge>
  //       </div>
  //       {pkg.isFeatured && (
  //         <div className="absolute top-4 right-4">
  //           <Badge variant="warning">Featured</Badge>
  //         </div>
  //       )}
  //       <div className="absolute bottom-4 right-4">
  //         <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:text-red-500 transition-colors">
  //           <Heart className="w-4 h-4" />
  //         </button>
  //       </div>
  //     </div>
      
  //     <div className={`p-4 ${isListView ? 'flex-1 flex flex-col justify-between' : ''}`}>
  //       <div>
  //         <div className="flex items-center justify-between mb-2">
  //           <div className="flex items-center text-primary-600 text-sm">
  //             <MapPin className="w-4 h-4 mr-1" />
  //             {pkg.destination}
  //           </div>
  //           {pkg.rating && (
  //             <div className="flex items-center text-yellow-500">
  //               <Star className="w-4 h-4 mr-1 fill-current" />
  //               <span className="text-sm font-medium text-gray-900">{pkg.rating}</span>
  //             </div>
  //           )}
  //         </div>
          
  //         <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
  //           {pkg.title}
  //         </h3>
          
  //         {isListView && (
  //           <p className="text-gray-600 text-sm mb-3 line-clamp-2">
  //             {pkg.description}
  //           </p>
  //         )}
          
  //         <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
  //           <div className="flex items-center">
  //             <Calendar className="w-4 h-4 mr-1" />
  //             {pkg.duration} days
  //           </div>
  //           <div className="flex items-center">
  //             <Users className="w-4 h-4 mr-1" />
  //             Max {pkg.maxGroupSize || 10}
  //           </div>
  //         </div>
  //       </div>
        
  //       <div>
  //         <div className="flex items-center justify-between mb-4">
  //           <div>
  //             <div className="flex items-center">
  //               <IndianRupee className="h-4 w-4 text-gray-900" />
  //               <span className="text-xl font-bold text-gray-900">
  //                 {pkg.price.toLocaleString()}
  //               </span>
  //             </div>
  //             {pkg.originalPrice && pkg.originalPrice > pkg.price && (
  //               <div className="flex items-center text-sm text-gray-500 line-through">
  //                 <IndianRupee className="h-3 w-3" />
  //                 <span>{pkg.originalPrice.toLocaleString()}</span>
  //               </div>
  //             )}
  //             <div className="text-xs text-gray-600">per person</div>
  //           </div>
  //           {pkg.originalPrice && pkg.originalPrice > pkg.price && (
  //             <Badge variant="success" size="sm">
  //               {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
  //             </Badge>
  //           )}
  //         </div>
          
  //         <div className="space-y-2">
  //           <Link href={`/packages/${pkg._id}`}>
  //             <Button variant="outline" size="sm" className="w-full">
  //               View Details
  //             </Button>
  //           </Link>
  //           <WhatsAppButton
  //             message={`Hi! I'm interested in the ${pkg.title} domestic package. Can you provide more details?`}
  //             className="w-full bg-green-500 hover:bg-green-600 text-white"
  //           >
  //             Book Now
  //           </WhatsAppButton>
  //         </div>
  //       </div>
  //     </div>
  //   </Card>
  // );


// Updated PackageCard for src/pages/packages/international.tsx
const PackageCard = ({ pkg, isListView = false }: { pkg: Package; isListView?: boolean }) => (
  <Card padding="none" className={`overflow-hidden hover:shadow-lg transition-all duration-300 group ${isListView ? 'flex' : ''}`}>
    <div className={`relative ${isListView ? 'w-1/3' : 'w-full'}`}>
      <Image
        src={pkg.thumbnail || '/images/placeholder-package.jpg'}
        alt={pkg.title}
        width={isListView ? 200 : 300}
        height={200}
        className={`${isListView ? 'h-full' : 'h-48'} w-full object-cover group-hover:scale-105 transition-transform duration-300`}
      />
      <div className="absolute top-4 left-4">
        <Badge className="bg-blue-600 text-white">
          <Globe className="h-3 w-3 mr-1" />
          International
        </Badge>
      </div>
      {pkg.isFeatured && (
        <div className="absolute top-4 right-4">
          <Badge variant="warning">Featured</Badge>
        </div>
      )}
      <div className="absolute bottom-4 right-4">
        <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:text-red-500 transition-colors">
          <Heart className="w-4 h-4" />
        </button>
      </div>
    </div>
    
    <div className={`p-4 ${isListView ? 'flex-1 flex flex-col justify-between' : ''}`}>
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-primary-600 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {pkg.destination}
          </div>
          {pkg.rating && (
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 mr-1 fill-current" />
              <span className="text-sm font-medium text-gray-900">{pkg.rating}</span>
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {pkg.title}
        </h3>
        
        {isListView && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {pkg.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {pkg.duration} days
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            Max {pkg.maxGroupSize || 10}
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center">
              <IndianRupee className="h-4 w-4 text-gray-900" />
              <span className="text-xl font-bold text-gray-900">
                {pkg.price.toLocaleString()}
              </span>
            </div>
            {pkg.originalPrice && pkg.originalPrice > pkg.price && (
              <div className="flex items-center text-sm text-gray-500 line-through">
                <IndianRupee className="h-3 w-3" />
                <span>{pkg.originalPrice.toLocaleString()}</span>
              </div>
            )}
            <div className="text-xs text-gray-600">per person</div>
          </div>
          {pkg.originalPrice && pkg.originalPrice > pkg.price && (
            <Badge variant="success" size="sm">
              {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
            </Badge>
          )}
        </div>
        
        <div className="space-y-2">
          <Link href={`/packages/${pkg._id}`}>
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          <BookButton
            packageId={pkg._id}
            packageTitle={pkg.title}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            size="sm"
          >
            Book Now
          </BookButton>
        </div>
      </div>
    </div>
  </Card>
);



  return (
    <Layout title="Domestic Travel Packages" description="Explore incredible destinations within India">
      <Head>
        <title>Domestic Travel Packages - Travel Quench</title>
        <meta name="description" content="Discover amazing domestic travel packages across India. From Kashmir to Kerala, explore incredible destinations within India." />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <Mountain className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Domestic Travel Packages
              </h1>
              <p className="text-xl text-green-100 max-w-2xl mx-auto">
                Discover the incredible diversity of India. From majestic Himalayas to serene backwaters,
                explore the beauty of your homeland with our domestic packages.
              </p>
            </div>
          </div>
        </div>

        {/* Rest of the component follows same structure as International page */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Same filters and content structure as international page... */}
          {/* Package Grid/List */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              <span className="ml-3 text-gray-600">Loading domestic packages...</span>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-6'
            }>
              {packages.map((pkg) => (
                <PackageCard key={pkg._id} pkg={pkg} isListView={viewMode === 'list'} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DomesticPackagesPage;
