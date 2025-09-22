
// src/pages/index.tsx



import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Footer from '@/components/layout/Footer';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Clock, 
  Shield, 
  Award, 
  Heart,
  Headphones,
  ArrowRight,
  PlayCircle,
  IndianRupee,
  Globe,
  Home,
  Phone,
  Mail,
  CheckCircle,
  Filter,
  Eye,
  Compass,
  Camera,
  Mountain,
  Plane,
  TrendingUp,
  ThumbsUp,
  Zap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button, Card, Badge, Input, Select } from '@/components/ui';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import { ROUTES } from '@/lib/utils/constants';
import { formatCurrency } from '@/lib/utils/helpers';

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
  maxGroupSize?: number;
  description?: string;
}

interface DestinationCard {
  id: string;
  name: string;
  image: string;
  startingPrice: number;
  type: 'international' | 'domestic';
  description: string;
}

interface InternationalTrip {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface DomesticTrip {
  id: string;
  name: string;
  image: string;
  description: string;
}

const HomePage: React.FC = () => {
  const router = useRouter();
  
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2'
  });
  
  const [featuredPackages, setFeaturedPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'international' | 'domestic'>('international');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDestination, setPreferredDestination] = useState('');
  const [tripMessage, setTripMessage] = useState('');

  const featuredRef = useRef<HTMLDivElement>(null);
  const internationalRef = useRef<HTMLDivElement>(null);
  const domesticRef = useRef<HTMLDivElement>(null);

  // Mobile detection and responsive handling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch featured packages from your API
  useEffect(() => {
    fetchFeaturedPackages();
  }, []);

  const fetchFeaturedPackages = async () => {
    try {
      console.log('📦 Fetching featured packages...');
      const response = await fetch('/api/packages/featured');
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.packages) {
          setFeaturedPackages(data.packages.slice(0, 6));
          console.log('✅ Featured packages fetched:', data.packages.length);
        }
      } else {
        console.error('Failed to fetch featured packages');
      }
    } catch (error) {
      console.error('Error fetching featured packages:', error);
    } finally {
      setLoading(false);
    }
  };

  // Hero slides data with redirect URLs
  const heroSlides = [
    {
      title: "Your Ultimate Travel Companion",
      subtitle: "Discover extraordinary destinations with curated experiences",
      description: "From breathtaking mountains to pristine beaches, create memories that last a lifetime",
      cta: "Start Your Journey",
      background: "from-blue-600 via-purple-600 to-indigo-700",
      stats: { trips: "10,000+", destinations: "150+", rating: "4.9" },
      redirectUrl: "/packages/international"
    },
    {
      title: "Handcrafted Adventures",
      subtitle: "Every journey tells a unique story",
      description: "Expert-curated trips designed for authentic experiences and unforgettable moments",
      cta: "Explore Packages",
      background: "from-emerald-600 via-teal-600 to-cyan-700",
      stats: { travelers: "25,000+", countries: "45+", satisfaction: "99%" },
      redirectUrl: "/packages/indian"
    },
    {
      title: "Travel Without Limits",
      subtitle: "Where wanderlust meets wonder",
      description: "Professional planning, 24/7 support, and seamless experiences for the modern explorer",
      cta: "Plan My Trip",
      background: "from-orange-600 via-red-600 to-pink-700",
      stats: { experiences: "500+", years: "8+", experts: "50+" },
      redirectUrl: "/packages/international"
    }
  ];

  // CTA Button Click Handler
  const handleCTAClick = (redirectUrl: string) => {
    router.push(redirectUrl);
  };

  // International Trips Data
  const internationalTrips: InternationalTrip[] = [
    {
      id: '1',
      name: 'Europe',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop',
      description: 'City of lights and romance'
    },
    {
      id: '2',
      name: 'Bali',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop',
      description: 'Tropical paradise awaits'
    },
    {
      id: '3',
      name: 'Thailand',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      description: 'Land of smiles and beaches'
    },
    {
      id: '4',
      name: 'Spain',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d27d3d?w=400&h=300&fit=crop',
      description: 'Vibrant culture and architecture'
    },
    {
      id: '5',
      name: 'Singapore',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop',
      description: 'Modern city-state marvel'
    },
    {
      id: '6',
      name: 'Japan',
      image: 'https://images.unsplash.com/photo-1490761668535-35497054764d?w=400&h=300&fit=crop',
      description: 'Ancient meets modern'
    }
  ];

  // Domestic Trips Data
  const domesticTrips: DomesticTrip[] = [
    {
      id: '1',
      name: 'Kerala',
      image: 'https://images.unsplash.com/photo-1587588354456-a1dd0f4e8a94?w=400&h=300&fit=crop',
      description: 'Backwaters and serene beauty'
    },
    {
      id: '2',
      name: 'Goa',
      image: 'https://images.unsplash.com/photo-1519046906114-53103b34b206?w=400&h=300&fit=crop',
      description: 'Beaches and party vibes'
    },
    {
      id: '3',
      name: 'Rajasthan',
      image: 'https://images.unsplash.com/photo-1562757550-1b1f1a5f1d1f?w=400&h=300&fit=crop',
      description: 'Royal heritage and forts'
    },
    {
      id: '4',
      name: 'Kashmir',
      image: 'https://images.unsplash.com/photo-1571068315587-5a1f3a09ab0b?w=400&h=300&fit=crop',
      description: 'Paradise on earth'
    },
    {
      id: '5',
      name: 'Himachal',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop',
      description: 'Mountain retreats and adventure'
    },
    {
      id: '6',
      name: 'Andaman',
      image: 'https://images.unsplash.com/photo-1545565341-7f0594e4d2b0e?w=400&h=300&fit=crop',
      description: 'Crystal clear waters and islands'
    }
  ];

  // Mobile-optimized scroll functions
  const getScrollAmount = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return 300;
    const containerWidth = ref.current.offsetWidth;
    return isMobile ? containerWidth * 0.85 : containerWidth * 0.5;
  };

  const scrollContainer = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (!ref.current) return;
    const scrollAmount = getScrollAmount(ref);
    const scrollDistance = direction === 'left' ? -scrollAmount : scrollAmount;
    ref.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
  };

  // Travel categories
  const travelCategories = [
    {
      icon: Mountain,
      title: 'Adventure',
      description: 'Thrilling expeditions',
      color: 'from-green-500 to-emerald-600',
      count: '50+ trips'
    },
    {
      icon: Heart,
      title: 'Honeymoon',
      description: 'Romantic getaways',
      color: 'from-pink-500 to-rose-600',
      count: '30+ packages'
    },
    {
      icon: Users,
      title: 'Group Tours',
      description: 'Community adventures',
      color: 'from-blue-500 to-indigo-600',
      count: '100+ groups'
    },
    {
      icon: Camera,
      title: 'Photography',
      description: 'Capture moments',
      color: 'from-purple-500 to-violet-600',
      count: '25+ tours'
    }
  ];

  // Testimonials with enhanced data
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      comment: 'TravelQuench made our Kerala trip absolutely magical! Every detail was perfectly planned.',
      package: 'Kerala Backwaters',
      image: '/images/testimonial-1.jpg',
      verified: true
    },
    {
      id: 2,
      name: 'Raj Patel',
      location: 'Delhi',
      rating: 5,
      comment: 'Outstanding service! The Rajasthan tour was beyond our expectations. Highly recommended!',
      package: 'Royal Rajasthan',
      image: '/images/testimonial-2.jpg',
      verified: true
    },
    {
      id: 3,
      name: 'Anita Gupta',
      location: 'Bangalore',
      rating: 5,
      comment: 'Professional team, excellent coordination. Perfect for family trips with kids!',
      package: 'Swiss Alps Adventure',
      image: '/images/testimonial-3.jpg',
      verified: true
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      destination: searchData.destination,
      checkin: searchData.checkIn,
      checkout: searchData.checkOut,
      guests: searchData.guests
    }).toString();
    
    window.location.href = `/packages?${searchParams}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${firstName} ${lastName}`.trim();
    const destinationText = preferredDestination === 'domestic' ? 'Domestic (India)' :
                           preferredDestination === 'international' ? 'International' :
                           preferredDestination === 'both' ? 'Both Domestic & International' : 'Not specified';
    const message = `Name: ${fullName}\nPhone: ${phone}\nEmail: ${email}\nPreferred Destination: ${destinationText}\nMessage: ${tripMessage}`;
    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/917006377796?text=${encodedMessage}`;
  };

  return (
    <Layout
      title="TravelQuench - Your Ultimate Travel Companion"
      description="Discover amazing travel packages, book flights and hotels, and create unforgettable memories with TravelQuench. Expert-curated trips for the modern explorer."
      keywords="travel, vacation, holiday packages, flights, hotels, tours, india, international travel, travel quench"
    >
      {/* Enhanced Hero Section - Mobile Optimized */}
      <section className="relative min-h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/dzoxwk1jc/video/upload/v1758395896/main_nysgrf.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-12 sm:py-20">
            <div className="text-center">
              <div className="inline-flex items-center px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Trusted by 25,000+ Happy Travelers
              </div>
              
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6 px-2">
                {heroSlides[currentSlide].title}
              </h1>
              
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-blue-100 font-medium mb-3 sm:mb-4 px-2">
                {heroSlides[currentSlide].subtitle}
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto px-4">
                {heroSlides[currentSlide].description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
                <Button 
                  size={isMobile ? "default" : "lg"}
                  onClick={() => handleCTAClick(heroSlides[currentSlide].redirectUrl)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-yellow-400/25 transform hover:scale-105 transition-all duration-300"
                >
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center px-4">
                {Object.entries(heroSlides[currentSlide].stats).map(([key, value], index) => (
                  <div key={key} className="transform hover:scale-105 transition-transform duration-300">
                    <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">{value}</div>
                    <div className="text-blue-200 text-xs sm:text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-yellow-400 w-4 sm:w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Packages Section - Mobile Optimized */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Featured Travel Packages
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Discover our handpicked destinations and create memories that last a lifetime
            </p>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary-500"></div>
              <span className="ml-3 text-gray-600 text-sm sm:text-base">Loading featured packages...</span>
            </div>
          ) : (
            <div className="relative">
              {/* Navigation Buttons - Mobile Optimized */}
              <button
                onClick={() => scrollContainer(featuredRef, 'left')}
                className="absolute left-1 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-900 transition-all duration-300 shadow-lg backdrop-blur-sm"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </button>
              <button
                onClick={() => scrollContainer(featuredRef, 'right')}
                className="absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-900 transition-all duration-300 shadow-lg backdrop-blur-sm"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </button>

              {/* Package Cards Container - Mobile Optimized */}
              <div 
                ref={featuredRef}
                className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-2 sm:px-4 lg:px-8 pb-4"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {featuredPackages.map((pkg) => (
                  <Card 
                    key={pkg._id} 
                    padding="none" 
                    className="flex-shrink-0 w-72 sm:w-80 lg:w-96 overflow-hidden hover:shadow-lg transition-all duration-300 group snap-start"
                  >
                    <div className="relative">
                      <Image
                        src={pkg.thumbnail || '/images/placeholder-package.jpg'}
                        alt={pkg.title}
                        width={400}
                        height={240}
                        className="w-full h-36 sm:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {pkg.isFeatured && (
                        <Badge className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-primary-500 text-white text-xs">
                          Featured
                        </Badge>
                      )}
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                        <Badge className="bg-green-700 text-white font-semibold px-2 py-1 text-xs shadow-md">
                          {pkg.type === 'international' ? (
                            <>
                              <Globe className="h-3 w-3 mr-1 text-green-300" />
                              International
                            </>
                          ) : (
                            <>
                              <Home className="h-3 w-3 mr-1" />
                              Domestic
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-primary-600 text-xs sm:text-sm">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          <span className="truncate">{pkg.destination}</span>
                        </div>
                        {pkg.rating && (
                          <div className="flex items-center text-yellow-500">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 fill-current" />
                            <span className="text-xs sm:text-sm font-medium text-gray-900">
                              {pkg.rating}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                        {pkg.title}
                      </h3>
                      
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {pkg.duration} days
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Max {pkg.maxGroupSize || 10}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center">
                            <IndianRupee className="h-3 w-3 sm:h-4 sm:w-4 text-gray-900" />
                            <span className="text-lg sm:text-xl font-bold text-gray-900">
                              {pkg.price.toLocaleString()}
                            </span>
                          </div>
                          {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                            <div className="flex items-center text-xs sm:text-sm text-gray-500 line-through">
                              <IndianRupee className="h-2 w-2 sm:h-3 sm:w-3" />
                              <span>{pkg.originalPrice.toLocaleString()}</span>
                            </div>
                          )}
                          <div className="text-xs text-gray-600">per person</div>
                        </div>
                        {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                          <Badge variant="success" size="sm" className="text-xs">
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
                        <WhatsAppButton
                          message={`Hi! I'm interested in the ${pkg.title} package. Can you provide more details and help me customize it?`}
                          className="w-full bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm"
                        >
                          Book & Customize
                        </WhatsAppButton>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {!loading && featuredPackages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4 text-sm sm:text-base">No featured packages available at the moment.</p>
              <Link href="/packages">
                <Button size={isMobile ? "default" : "lg"}>
                  Browse All Packages
                </Button>
              </Link>
            </div>
          )}
          
          {!loading && featuredPackages.length > 0 && (
            <div className="text-center mt-8 sm:mt-12 space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/packages/international">
                <Button size={isMobile ? "default" : "lg"} variant="outline" className="w-full sm:w-auto">
                  View All International
                </Button>
              </Link>
              <Link href="/packages/indian">
                <Button size={isMobile ? "default" : "lg"} variant="outline" className="w-full sm:w-auto">
                  View All Domestic
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* International Trips Section - Mobile Optimized */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop')`
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              International Trips
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8">
              Discover the world, one destination at a time
            </p>
            <Button 
              onClick={() => handleCTAClick('/packages/international')}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-xl shadow-lg"
            >
              Explore
            </Button>
          </div>

          <div className="relative">
            <button
              onClick={() => scrollContainer(internationalRef, 'left')}
              className="absolute left-1 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </button>
            
            <button
              onClick={() => scrollContainer(internationalRef, 'right')}
              className="absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </button>

            <div 
              ref={internationalRef}
              className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-2 sm:px-4 lg:px-8 pb-4"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {internationalTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="flex-shrink-0 relative h-64 sm:h-72 lg:h-80 xl:h-96 w-56 sm:w-64 lg:w-72 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group cursor-pointer snap-start"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${trip.image}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6">
                    <div className="transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                        {trip.name}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm mb-3 sm:mb-4">
                        {trip.description}
                      </p>
                      <div className="flex items-center justify-end">
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Travel Categories Section - Mobile Optimized */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Explore by Category
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Discover trips tailored to your travel style
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {travelCategories.map((category, index) => (
              <Card key={index} padding="none" className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-0 rounded-xl sm:rounded-2xl">
                <div className={`h-24 sm:h-28 lg:h-32 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <category.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-bold text-sm sm:text-base lg:text-lg">{category.title}</h3>
                    <p className="text-xs opacity-90 hidden sm:block">{category.description}</p>
                  </div>
                  <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2">
                    <Badge className="bg-white/20 text-white text-xs">
                      {category.count}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Domestic Trips Section - Mobile Optimized */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dzoxwk1jc/image/upload/v1749745130/dal1_nvzyiq.jpg')`
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Domestic Trips
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8">
              Explore the beauty of India, one destination at a time
            </p>
            <Button 
              onClick={() => handleCTAClick('/packages/indian')}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-xl shadow-lg"
            >
              Explore
            </Button>
          </div>

          <div className="relative">
            <button
              onClick={() => scrollContainer(domesticRef, 'left')}
              className="absolute left-1 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </button>
            
            <button
              onClick={() => scrollContainer(domesticRef, 'right')}
              className="absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </button>

            <div 
              ref={domesticRef}
              className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-2 sm:px-4 lg:px-8 pb-4"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {domesticTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="flex-shrink-0 relative h-64 sm:h-72 lg:h-80 xl:h-96 w-56 sm:w-64 lg:w-72 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group cursor-pointer snap-start"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${trip.image}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6">
                    <div className="transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                        {trip.name}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm mb-3 sm:mb-4">
                        {trip.description}
                      </p>
                      <div className="flex items-center justify-end">
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Mobile Optimized */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why TravelQuench?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our comprehensive travel solutions and personalized service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-center">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 bg-white">
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-lg sm:text-xl font-bold text-white">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    {testimonial.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-center mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-4 sm:mb-6 italic text-sm sm:text-base lg:text-lg leading-relaxed">
                  "{testimonial.comment}"
                </p>
                
                <div className="text-center">
                  <div className="font-bold text-gray-900 text-base sm:text-lg">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 mb-2">{testimonial.location}</div>
                  <Badge className="bg-blue-100 text-blue-600 text-xs">
                    {testimonial.package}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Link href="/testimonials">
              <Button variant="outline" size={isMobile ? "default" : "lg"} className="rounded-xl sm:rounded-2xl px-6 sm:px-8 py-3 sm:py-4">
                View All Reviews
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats & Achievements Section - Mobile Optimized */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Our Journey in Numbers
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100">
              Building trust through excellence and dedication
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-white/30">
                <TrendingUp className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">25,000+</div>
              <div className="text-blue-100 text-sm sm:text-base">Happy Travelers</div>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-white/30">
                <Globe className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">150+</div>
              <div className="text-blue-100 text-sm sm:text-base">Destinations</div>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-white/30">
                <Star className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">4.9</div>
              <div className="text-blue-100 text-sm sm:text-base">Average Rating</div>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-white/30">
                <Award className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">8+</div>
              <div className="text-blue-100 text-sm sm:text-base">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="text-white order-2 lg:order-1">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-yellow-400/20 backdrop-blur-sm rounded-full text-yellow-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Get Instant Response
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                Wanderlust Calling?
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Let's Plan Together!
                </span>
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed">
                Our travel experts are ready to craft your perfect journey. Get personalized recommendations and exclusive deals.
              </p>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4 group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/25">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-base sm:text-lg">24/7 Expert Support</div>
                    <div className="text-blue-100 text-sm sm:text-base lg:text-lg">+91 9090403075</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4 group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-base sm:text-lg">Email Us</div>
                    <div className="text-blue-100 text-sm sm:text-base lg:text-lg">info@travelquench.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4 group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-base sm:text-lg">Quick Response</div>
                    <div className="text-blue-100 text-sm sm:text-base lg:text-lg">Within 30 minutes</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 xl:p-10 border-0 order-1 lg:order-2">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Get Your Custom Quote</h3>
                <p className="text-gray-600 text-sm sm:text-base">Fill out the form and we'll get back to you instantly</p>
              </div>
              
              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <Input
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="rounded-lg sm:rounded-xl border-gray-200 h-10 sm:h-12 bg-gray-50 focus:bg-white transition-colors text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <Input
                      placeholder="Smith"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="rounded-lg sm:rounded-xl border-gray-200 h-10 sm:h-12 bg-gray-50 focus:bg-white transition-colors text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-lg sm:rounded-xl border-gray-200 h-10 sm:h-12 bg-gray-50 focus:bg-white transition-colors text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    placeholder="john@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-lg sm:rounded-xl border-gray-200 h-10 sm:h-12 bg-gray-50 focus:bg-white transition-colors text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Destination
                  </label>
                  <Select
                    value={preferredDestination}
                    onChange={(value) => setPreferredDestination(value)}
                    options={[
                      { value: '', label: 'Select destination' },
                      { value: 'domestic', label: 'Domestic (India)' },
                      { value: 'international', label: 'International' },
                      { value: 'both', label: 'Both Domestic & International' }
                    ]}
                    className="rounded-lg sm:rounded-xl border-gray-200 bg-gray-50 focus:bg-white text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tell us about your dream trip
                  </label>
                  <textarea
                    placeholder="I'm planning a trip for 4 people to Europe for 10 days in March..."
                    rows={4}
                    value={tripMessage}
                    onChange={(e) => setTripMessage(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors resize-none text-sm sm:text-base"
                  />
                </div>
                
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Get My Custom Quote
                </Button>
                
                <p className="text-center text-xs sm:text-sm text-gray-500">
                  🔒 Your information is secure and will not be shared with third parties
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer/>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Mobile specific optimizations */
        @media (max-width: 640px) {
          .hero-title {
            font-size: 1.875rem;
            line-height: 1.2;
          }
          
          /* Touch friendly scroll areas */
          .touch-scroll {
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
          }
          
          /* Improved button spacing for touch */
          .mobile-button-spacing {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.5rem;
          }
          
          /* Extra small screens */
          .xs-text {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default HomePage;
