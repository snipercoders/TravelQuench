// src/pages/customer/booking/[packageId].tsx
// Debug version with console logs and simplified button handling

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { useRequireAuth } from '@/hooks/useAuth';
import { Button, Card, Input, Select } from '@/components/ui';
import {
  MapPin,
  Calendar,
  Users,
  Clock,
  IndianRupee,
  Star,
  Shield,
  CheckCircle,
  User,
  Phone,
  Mail,
  CreditCard,
  ArrowLeft,
  AlertCircle,
  Globe,
  Home
} from 'lucide-react';

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
  images?: string[];
  maxGroupSize?: number;
  description?: string;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: any[];
  isFeatured: boolean;
}

interface BookingFormData {
  travelDate: string;
  adults: number;
  children: number;
  specialRequests: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    emergencyContact: string;
  };
}

const BookingPage: React.FC = () => {
  const { user, isLoading } = useRequireAuth();
  const router = useRouter();
  const { packageId } = router.query;
  
  const [package_, setPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<BookingFormData>({
    travelDate: '',
    adults: 2,
    children: 0,
    specialRequests: '',
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      emergencyContact: ''
    }
  });

  useEffect(() => {
    if (packageId && typeof packageId === 'string') {
      fetchPackage(packageId);
    }
  }, [packageId]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        customerInfo: {
          ...prev.customerInfo,
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || ''
        }
      }));
    }
  }, [user]);

  const fetchPackage = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/packages/${id}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPackage(data.package);
        } else {
          setError('Package not found');
        }
      } else {
        setError('Failed to load package details');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!package_) return 0;
    const adultPrice = package_.price * formData.adults;
    const childPrice = package_.price * 0.7 * formData.children;
    return adultPrice + childPrice;
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('customerInfo.')) {
      const infoField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        customerInfo: {
          ...prev.customerInfo,
          [infoField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  // Simplified button click handler with debugging
  const handleButtonClick = async () => {
    console.log('Button clicked!'); // Debug log
    
    if (!package_ || !user) {
      console.log('Missing package or user:', { package_: !!package_, user: !!user });
      return;
    }

    // Basic validation
    if (!formData.travelDate) {
      setError('Please select a travel date');
      return;
    }
    
    if (!formData.customerInfo.name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!formData.customerInfo.email.trim()) {
      setError('Please enter your email');
      return;
    }
    
    if (!formData.customerInfo.phone.trim()) {
      setError('Please enter your phone number');
      return;
    }

    console.log('Starting booking submission...'); // Debug log
    setSubmitting(true);
    setError('');

    try {
      const bookingData = {
        packageId: package_._id,
        travelDate: formData.travelDate,
        adults: formData.adults,
        children: formData.children,
        totalAmount: calculateTotal(),
        specialRequests: formData.specialRequests,
        customerInfo: formData.customerInfo,
        packageDetails: {
          title: package_.title,
          destination: package_.destination,
          duration: package_.duration,
          type: package_.type
        }
      };

      console.log('Booking data:', bookingData); // Debug log

      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(bookingData)
      });

      console.log('Response status:', response.status); // Debug log

      const data = await response.json();
      console.log('Response data:', data); // Debug log

      if (response.ok && data.success) {
        console.log('Booking successful, redirecting...'); // Debug log
        router.push(`/customer/booking/checkout?bookingId=${data.booking._id}`);
      } else {
        setError(data.message || 'Failed to create booking');
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError('Network error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading || loading) {
    return (
      <Layout title="Loading...">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </Layout>
    );
  }

  if (error && !package_) {
    return (
      <Layout title="Error">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Package Not Found</h2>
            <p className="text-gray-600 mb-4">{error || 'The package you\'re looking for doesn\'t exist.'}</p>
            <Button onClick={() => router.push('/packages/international')}>
              Browse Packages
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const totalPrice = calculateTotal();
  const savings = package_?.originalPrice ? (package_.originalPrice - package_.price) * formData.adults : 0;

  return (
    <Layout title={`Book ${package_?.title}`}>
      <Head>
        <title>Book {package_?.title} - Travel Quench</title>
        <meta name="description" content={`Book your ${package_?.title} package with Travel Quench`} />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Package
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Package Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Package Header */}
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={package_?.thumbnail || '/images/placeholder-package.jpg'}
                      alt={package_?.title || 'Package'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {package_?.type === 'international' ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Globe className="w-3 h-3 mr-1" />
                          International
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Home className="w-3 h-3 mr-1" />
                          Domestic
                        </span>
                      )}
                      <span className="text-sm text-gray-600">{package_?.category}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{package_?.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {package_?.destination}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {package_?.duration} days
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        Max {package_?.maxGroupSize || 10}
                      </div>
                      {package_?.rating && (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                          {package_.rating}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Booking Form */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Details</h2>
                
                <div className="space-y-6">
                  {/* Travel Date & Travelers */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Travel Date
                      </label>
                      <Input
                        type="date"
                        value={formData.travelDate}
                        onChange={(e) => handleInputChange('travelDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adults
                      </label>
                      <Select
                        value={formData.adults.toString()}
                        onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
                        options={Array.from({ length: 10 }, (_, i) => ({
                          value: (i + 1).toString(),
                          label: `${i + 1} Adult${i === 0 ? '' : 's'}`
                        }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Children
                      </label>
                      <Select
                        value={formData.children.toString()}
                        onChange={(e) => handleInputChange('children', parseInt(e.target.value))}
                        options={Array.from({ length: 6 }, (_, i) => ({
                          value: i.toString(),
                          label: i === 0 ? 'No Children' : `${i} Child${i === 1 ? '' : 'ren'}`
                        }))}
                      />
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        value={formData.customerInfo.name}
                        onChange={(e) => handleInputChange('customerInfo.name', e.target.value)}
                        required
                        leftIcon={<User />}
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={formData.customerInfo.email}
                        onChange={(e) => handleInputChange('customerInfo.email', e.target.value)}
                        required
                        leftIcon={<Mail />}
                      />
                      <Input
                        label="Phone Number"
                        type="tel"
                        value={formData.customerInfo.phone}
                        onChange={(e) => handleInputChange('customerInfo.phone', e.target.value)}
                        required
                        leftIcon={<Phone />}
                      />
                      <Input
                        label="Emergency Contact"
                        value={formData.customerInfo.emergencyContact}
                        onChange={(e) => handleInputChange('customerInfo.emergencyContact', e.target.value)}
                        placeholder="+91 9876543210"
                        leftIcon={<Phone />}
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <textarea
                        value={formData.customerInfo.address}
                        onChange={(e) => handleInputChange('customerInfo.address', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Complete address for communication"
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
                    />
                  </div>
                </div>
              </Card>

              {/* Package Highlights */}
              {package_?.highlights && package_.highlights.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Highlights</h3>
                  <ul className="space-y-2">
                    {package_.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Travel Date:</span>
                      <span className="font-medium">
                        {formData.travelDate ? new Date(formData.travelDate).toLocaleDateString() : 'Not selected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Travelers:</span>
                      <span className="font-medium">
                        {formData.adults} Adult{formData.adults !== 1 ? 's' : ''}
                        {formData.children > 0 && `, ${formData.children} Child${formData.children !== 1 ? 'ren' : ''}`}
                      </span>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Adults ({formData.adults} × ₹{package_?.price.toLocaleString()})</span>
                      <span className="font-medium">₹{((package_?.price || 0) * formData.adults).toLocaleString()}</span>
                    </div>
                    {formData.children > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Children ({formData.children} × ₹{Math.round((package_?.price || 0) * 0.7).toLocaleString()})</span>
                        <span className="font-medium">₹{Math.round((package_?.price || 0) * 0.7 * formData.children).toLocaleString()}</span>
                      </div>
                    )}
                    {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Savings:</span>
                        <span className="font-medium">-₹{savings.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <hr className="my-4" />

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-primary-600">₹{totalPrice.toLocaleString()}</span>
                  </div>

                  {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-red-700 text-sm">{error}</span>
                    </div>
                  )}

                  {/* Simple button with onClick - no form complications */}
                  <button
                    onClick={handleButtonClick}
                    disabled={submitting}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Proceed to Payment
                      </>
                    )}
                  </button>

                  <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 mr-1" />
                    Secure booking process
                  </div>
                </Card>

                {/* Trust Badges */}
                <Card className="p-4">
                  <div className="text-center">
                    <h4 className="font-medium text-gray-900 mb-2">Why Book With Us?</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Best Price Guarantee
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        24/7 Customer Support
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Instant Confirmation
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Secure Payment
                      </li>
                    </ul>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;