
// src/pages/index.tsx 
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  Home
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

const HomePage: React.FC = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2'
  });
  
  const [featuredPackages, setFeaturedPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured packages from your API
  useEffect(() => {
    fetchFeaturedPackages();
  }, []);

  const fetchFeaturedPackages = async () => {
    try {
      // Fetch packages from your existing API (no auth needed for public view)
      const response = await fetch('/api/packages/featured');
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.packages) {
          setFeaturedPackages(data.packages.slice(0, 4)); // Show only 4 featured packages
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

  // Why choose us features
  const features = [
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Your safety is our priority. All bookings are secure and protected.',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your travel needs.',
    },
    {
      icon: Heart,
      title: 'Personalized Service',
      description: 'Customized travel experiences tailored to your preferences.',
    },
    {
      icon: Award,
      title: 'Best Price Guarantee',
      description: 'We guarantee the best prices for all our travel packages.',
    },
    {
      icon: MapPin,
      title: 'Local Expertise',
      description: 'In-depth local knowledge for authentic travel experiences.',
    },
    {
      icon: Headphones,
      title: 'Expert Guidance',
      description: 'Professional travel consultants to plan your perfect trip.',
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      comment: 'Amazing experience with Travel Quench! The Kerala package was perfectly planned and executed.',
      package: 'Kerala Backwaters',
      image: '/images/testimonial-1.jpg'
    },
    {
      id: 2,
      name: 'Raj Patel',
      location: 'Delhi',
      rating: 5,
      comment: 'Outstanding service and attention to detail. The Rajasthan tour exceeded our expectations!',
      package: 'Royal Rajasthan',
      image: '/images/testimonial-2.jpg'
    },
    {
      id: 3,
      name: 'Anita Gupta',
      location: 'Bangalore',
      rating: 5,
      comment: 'Professional team and excellent coordination. Highly recommend Travel Quench for family trips.',
      package: 'European Grand Tour',
      image: '/images/testimonial-3.jpg'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to packages page with search params
    const searchParams = new URLSearchParams({
      destination: searchData.destination,
      checkin: searchData.checkIn,
      checkout: searchData.checkOut,
      guests: searchData.guests
    }).toString();
    
    window.location.href = `/packages?${searchParams}`;
  };

  return (
    <Layout
      title="Your Ultimate Travel Companion"
      description="Discover amazing travel packages, book flights and hotels, and create unforgettable memories with Travel Quench. Your journey starts here!"
      keywords="travel, vacation, holiday packages, flights, hotels, tours, india, international travel, travel quench"
    >
      {/* Hero Section - Same as before */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight mb-6">
                Discover Your Next{' '}
                <span className="text-primary-300">Adventure</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed">
                Book flights, hotels, and personalized holiday packages in just a few clicks. 
                Travel Quench makes your journey smoother, smarter, and more enjoyable.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link href="/packages">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4">
                    Explore Packages
                  </Button>
                </Link>
                <Link href="/customize">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4"
                  >
                    Customize Trip
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl md:text-3xl font-bold">10,000+</div>
                  <div className="text-primary-200 text-sm">Happy Travelers</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold">50+</div>
                  <div className="text-primary-200 text-sm">Destinations</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold">4.9★</div>
                  <div className="text-primary-200 text-sm">Average Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-travel.jpg"
                  alt="Travel Adventure"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 hover:bg-opacity-30 transition-all duration-300">
                    <PlayCircle className="w-16 h-16 text-white" />
                  </button>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">100% Safe</div>
                    <div className="text-sm text-gray-600">Verified Packages</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Best Deals</div>
                    <div className="text-sm text-gray-600">Guaranteed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl -mt-20 relative z-20">
            <div className="p-6 lg:p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Plan Your Perfect Trip
              </h3>
              
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  label="Destination"
                  placeholder="Where to?"
                  leftIcon={<MapPin />}
                  value={searchData.destination}
                  onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                />
                
                <Input
                  label="Check-in"
                  type="date"
                  leftIcon={<Calendar />}
                  value={searchData.checkIn}
                  onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                />
                
                <Input
                  label="Check-out"
                  type="date"
                  leftIcon={<Calendar />}
                  value={searchData.checkOut}
                  onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                />
                
                <Select
                  label="Guests"
                  value={searchData.guests}
                  onChange={(e) => setSearchData({...searchData, guests: e.target.value})}
                  options={[
                    { value: '1', label: '1 Guest' },
                    { value: '2', label: '2 Guests' },
                    { value: '3', label: '3 Guests' },
                    { value: '4', label: '4 Guests' },
                    { value: '5+', label: '5+ Guests' },
                  ]}
                />
                
                <div className="md:col-span-4 flex justify-center mt-4">
                  <Button type="submit" size="lg" className="px-12 py-4">
                    <Search className="w-5 h-5 mr-2" />
                    Search Packages
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </section>

      {/* Featured Packages Section - REAL DATA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Travel Packages
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked destinations and create memories that last a lifetime
            </p>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              <span className="ml-3 text-gray-600">Loading featured packages...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPackages.map((pkg) => (
                <Card key={pkg._id} padding="none" className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="relative">
                    <Image
                      src={pkg.thumbnail || '/images/placeholder-package.jpg'}
                      alt={pkg.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {pkg.isFeatured && (
                      <Badge className="absolute top-4 left-4 bg-primary-500 text-white">
                        Featured
                      </Badge>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="flex items-center bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {pkg.type === 'international' ? <Globe className="h-3 w-3 mr-1" /> : <Home className="h-3 w-3 mr-1" />}
                        {pkg.type === 'international' ? 'International' : 'Domestic'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-primary-600 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {pkg.destination}
                      </div>
                      {pkg.rating && (
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 mr-1 fill-current" />
                          <span className="text-sm font-medium text-gray-900">
                            {pkg.rating}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {pkg.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {pkg.duration} days
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        Max {pkg.maxGroupSize || 10}
                      </div>
                    </div>
                    
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
                      <WhatsAppButton
                        message={`Hi! I'm interested in the ${pkg.title} package. Can you provide more details and help me customize it?`}
                        className="w-full bg-green-500 hover:bg-green-600 text-white"
                      >
                        Book & Customize
                      </WhatsAppButton>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {!loading && featuredPackages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No featured packages available at the moment.</p>
              <Link href="/packages">
                <Button size="lg">
                  Browse All Packages
                </Button>
              </Link>
            </div>
          )}
          
          {!loading && featuredPackages.length > 0 && (
            <div className="text-center mt-12">
              <Link href="/packages/international">
                <Button size="lg" variant="outline" className="mr-4">
                  View All International
                </Button>
              </Link>
              <Link href="/packages/domestic">
                <Button size="lg" variant="outline">
                  View All Domestic
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section - Same as before */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Travel Quench?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to making your travel dreams come true with exceptional service and unforgettable experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Same as before */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-lg text-gray-600">
              Don't just take our word for it - hear from our happy customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="text-center hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-600">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                  <div className="text-sm text-primary-600 mt-1">{testimonial.package}</div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/testimonials">
              <Button variant="outline" size="lg">
                View All Reviews
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of happy travelers who have experienced the world with Travel Quench
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/packages">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4">
                Browse All Packages
              </Button>
            </Link>
            <WhatsAppButton
              message="Hi! I want to plan a custom trip. Can you help me create the perfect travel experience?"
              className="bg-green-500 hover:bg-green-600 px-8 py-4"
            >
              Plan Custom Trip
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;