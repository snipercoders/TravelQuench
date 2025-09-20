// src/pages/admin/packages/view/[id].tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import { useRequireAuth } from '@/hooks/useAuth';
import {
  ArrowLeft,
  Edit,
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  Star,
  Globe,
  Home,
  Clock,
  User,
  Check,
  X,
  Image as ImageIcon,
  AlertCircle,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

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
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

const PackageViewPage: React.FC = () => {
  const { isLoading } = useRequireAuth('/auth/login');
  const router = useRouter();
  const { id } = router.query;
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllInclusions, setShowAllInclusions] = useState(false);
  const [showAllExclusions, setShowAllExclusions] = useState(false);
  const [showAllHighlights, setShowAllHighlights] = useState(false);

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchPackage(id);
    }
  }, [id]);

  // const fetchPackage = async (packageId: string) => {
  //   try {
  //     setError('');
  //     console.log('Fetching package:', packageId);

  //     const response = await fetch(`/api/admin/packages/${packageId}`, {
  //       credentials: 'include'
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json().catch(() => ({ message: 'Failed to fetch package' }));
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


  // Update the fetchPackage function in your view/[id].tsx file:

const fetchPackage = async (packageId: string) => {
  try {
    setError('');
    console.log('Fetching package:', packageId);

    // Get token from localStorage (same as your other components)
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please log in again.');
      router.push('/auth/login');
      return;
    }

    const response = await fetch(`/api/admin/packages/${packageId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,  // Use Authorization header like your other components
        'Content-Type': 'application/json'
      }
      // Remove credentials: 'include' - that's for cookies
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
  } catch (error: any) {
    console.error('Failed to fetch package:', error);
    setError(error.message || 'Failed to load package');
  } finally {
    setLoading(false);
  }
};





  const handleEdit = () => {
    router.push(`/admin/packages/edit/${id}`);
  };

 


  
// Also update the handleDelete function:
const handleDelete = async () => {
  if (!packageData || !confirm(`Are you sure you want to delete "${packageData.title}"?`)) {
    return;
  }

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please log in again.');
      router.push('/auth/login');
      return;
    }

    const response = await fetch(`/api/admin/packages/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      router.push('/admin/packages');
    } else {
      const errorData = await response.json().catch(() => ({ message: 'Delete failed' }));
      setError(errorData.message || 'Failed to delete package');
    }
  } catch (error: any) {
    setError(error.message || 'Failed to delete package');
  }
};




  // const toggleStatus = async () => {
  
  //   if (!packageData) return;

  //   try {
  //     const response = await fetch(`/api/admin/packages/${id}`, {
  //       method: 'PATCH',
  //       headers: { 'Content-Type': 'application/json' },
  //       credentials: 'include',
  //       body: JSON.stringify({ isActive: !packageData.isActive })
  //     });

  //     if (response.ok) {
  //       setPackageData({ ...packageData, isActive: !packageData.isActive });
  //     }
  //   } catch (error: any) {
  //     setError('Failed to update package status');
  //   }
  // };



// Update the toggleStatus function:
const toggleStatus = async () => {
  if (!packageData) return;

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please log in again.');
      return;
    }

    const response = await fetch(`/api/admin/packages/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ isActive: !packageData.isActive })
    });

    if (response.ok) {
      setPackageData({ ...packageData, isActive: !packageData.isActive });
    } else {
      if (response.status === 401) {
        setError('Authentication failed. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth/login');
      }
    }
  } catch (error: any) {
    setError('Failed to update package status');
  }
};





// Update the toggleFeatured function:
const toggleFeatured = async () => {
  if (!packageData) return;

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please log in again.');
      return;
    }

    const response = await fetch(`/api/admin/packages/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ isFeatured: !packageData.isFeatured })
    });

    if (response.ok) {
      setPackageData({ ...packageData, isFeatured: !packageData.isFeatured });
    } else {
      if (response.status === 401) {
        setError('Authentication failed. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth/login');
      }
    }
  } catch (error: any) {
    setError('Failed to update featured status');
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

  const allImages = [packageData.thumbnail, ...(packageData.images || [])].filter(Boolean);

  return (
    <>
      <Head>
        <title>{packageData.title} - Package Details | Travel Quench Admin</title>
      </Head>

      <AdminLayout title="Package Details">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <h1 className="text-2xl font-bold text-white">{packageData.title}</h1>
                <p className="text-gray-300 flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {packageData.destination}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Status Badges */}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                packageData.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {packageData.isActive ? 'Active' : 'Inactive'}
              </span>
              
              {packageData.isFeatured && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}

              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                {packageData.type === 'international' ? <Globe className="h-3 w-3 mr-1" /> : <Home className="h-3 w-3 mr-1" />}
                {packageData.type === 'international' ? 'International' : 'Domestic'}
              </span>

              {/* Action Buttons */}
              <button
                onClick={handleEdit}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Gallery */}
            <div className="lg:col-span-2">
              {/* Main Image */}
              <div className="bg-white/10 rounded-xl overflow-hidden mb-6">
                <div className="relative h-96">
                  {allImages.length > 0 ? (
                    <img
                      src={allImages[activeImageIndex]}
                      alt={packageData.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200">
                      <ImageIcon className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Image Gallery */}
                {allImages.length > 1 && (
                  <div className="p-4 bg-gray-800/50">
                    <div className="flex space-x-2 overflow-x-auto">
                      {allImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                            index === activeImageIndex 
                              ? 'border-orange-500' 
                              : 'border-transparent'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${packageData.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-white/10 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">About This Package</h2>
                <p className="text-gray-300 leading-relaxed">{packageData.description}</p>
              </div>

              {/* Highlights */}
              {packageData.highlights && packageData.highlights.length > 0 && (
                <div className="bg-white/10 rounded-xl p-6 mb-6">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-orange-400" />
                    Package Highlights
                  </h2>
                  <div className="space-y-2">
                    {packageData.highlights
                      .slice(0, showAllHighlights ? undefined : 5)
                      .map((highlight, index) => (
                        <div key={index} className="flex items-start">
                          <Star className="h-4 w-4 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{highlight}</span>
                        </div>
                      ))}
                  </div>
                  {packageData.highlights.length > 5 && (
                    <button
                      onClick={() => setShowAllHighlights(!showAllHighlights)}
                      className="mt-3 text-orange-400 hover:text-orange-300 text-sm font-medium"
                    >
                      {showAllHighlights ? 'Show Less' : `Show All (${packageData.highlights.length})`}
                    </button>
                  )}
                </div>
              )}

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Inclusions */}
                {packageData.inclusions && packageData.inclusions.length > 0 && (
                  <div className="bg-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-400" />
                      What's Included
                    </h3>
                    <div className="space-y-2">
                      {packageData.inclusions
                        .slice(0, showAllInclusions ? undefined : 5)
                        .map((inclusion, index) => (
                          <div key={index} className="flex items-start">
                            <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{inclusion}</span>
                          </div>
                        ))}
                    </div>
                    {packageData.inclusions.length > 5 && (
                      <button
                        onClick={() => setShowAllInclusions(!showAllInclusions)}
                        className="mt-3 text-green-400 hover:text-green-300 text-sm font-medium"
                      >
                        {showAllInclusions ? 'Show Less' : `Show All (${packageData.inclusions.length})`}
                      </button>
                    )}
                  </div>
                )}

                {/* Exclusions */}
                {packageData.exclusions && packageData.exclusions.length > 0 && (
                  <div className="bg-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <X className="h-5 w-5 mr-2 text-red-400" />
                      What's Not Included
                    </h3>
                    <div className="space-y-2">
                      {packageData.exclusions
                        .slice(0, showAllExclusions ? undefined : 5)
                        .map((exclusion, index) => (
                          <div key={index} className="flex items-start">
                            <X className="h-4 w-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{exclusion}</span>
                          </div>
                        ))}
                    </div>
                    {packageData.exclusions.length > 5 && (
                      <button
                        onClick={() => setShowAllExclusions(!showAllExclusions)}
                        className="mt-3 text-red-400 hover:text-red-300 text-sm font-medium"
                      >
                        {showAllExclusions ? 'Show Less' : `Show All (${packageData.exclusions.length})`}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Itinerary */}
              {packageData.itinerary && packageData.itinerary.length > 0 && (
                <div className="bg-white/10 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Day-wise Itinerary</h2>
                  <div className="space-y-6">
                    {packageData.itinerary.map((day, index) => (
                      <div key={index} className="border-l-2 border-orange-400 pl-6 relative">
                        <div className="absolute -left-2 top-0 w-4 h-4 bg-orange-400 rounded-full"></div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-medium mr-3">
                              Day {day.day}
                            </span>
                            <h4 className="text-white font-semibold">{day.title}</h4>
                          </div>
                          
                          {day.description && (
                            <p className="text-gray-300 mb-3">{day.description}</p>
                          )}
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {day.meals && day.meals.length > 0 && (
                              <div>
                                <span className="text-sm font-medium text-gray-400">Meals:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {day.meals.map((meal, mealIndex) => (
                                    <span 
                                      key={mealIndex}
                                      className="bg-green-600/20 text-green-300 px-2 py-1 rounded text-xs"
                                    >
                                      {meal}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {day.accommodation && (
                              <div>
                                <span className="text-sm font-medium text-gray-400">Stay:</span>
                                <p className="text-gray-300 text-sm mt-1">{day.accommodation}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Package Details */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Package Pricing</h3>
                <div className="mb-4">
                  <div className="flex items-center">
                    <IndianRupee className="h-6 w-6 text-orange-400" />
                    <span className="text-3xl font-bold text-white">
                      {packageData.price.toLocaleString()}
                    </span>
                  </div>
                  {packageData.originalPrice && packageData.originalPrice > packageData.price && (
                    <div className="flex items-center text-gray-400 line-through mt-1">
                      <IndianRupee className="h-4 w-4" />
                      <span className="text-lg">{packageData.originalPrice.toLocaleString()}</span>
                      <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                        Save ₹{(packageData.originalPrice - packageData.price).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-400">Per person (inclusive of all taxes)</p>
              </div>

              {/* Quick Details */}
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Duration</span>
                    </div>
                    <span className="text-white font-medium">{packageData.duration} days</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-300">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Group Size</span>
                    </div>
                    <span className="text-white font-medium">Max {packageData.maxGroupSize}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-300">
                      <User className="h-4 w-4 mr-2" />
                      <span>Min Age</span>
                    </div>
                    <span className="text-white font-medium">{packageData.minAge || 0} years</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Category</span>
                    <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-sm font-medium">
                      {packageData.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Admin Actions */}
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Admin Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={toggleStatus}
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                      packageData.isActive
                        ? 'bg-red-600/20 text-red-300 hover:bg-red-600/30'
                        : 'bg-green-600/20 text-green-300 hover:bg-green-600/30'
                    }`}
                  >
                    {packageData.isActive ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                    {packageData.isActive ? 'Deactivate Package' : 'Activate Package'}
                  </button>

                  <button
                    onClick={toggleFeatured}
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                      packageData.isFeatured
                        ? 'bg-yellow-600/20 text-yellow-300 hover:bg-yellow-600/30'
                        : 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30'
                    }`}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    {packageData.isFeatured ? 'Remove from Featured' : 'Mark as Featured'}
                  </button>
                </div>
              </div>

              {/* Meta Information */}
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Package Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created:</span>
                    <span className="text-gray-300">
                      {new Date(packageData.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Updated:</span>
                    <span className="text-gray-300">
                      {new Date(packageData.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Package ID:</span>
                    <span className="text-gray-300 text-xs font-mono">{packageData._id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default PackageViewPage;








