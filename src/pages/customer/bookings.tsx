// // src/pages/customer/bookings.tsx
// import React, { useState, useEffect } from 'react';
// import { useRequireAuth } from '@/hooks/useAuth';
// import Head from 'next/head';
// import Layout from '@/components/layout/Layout';
// import { 
//   Calendar, 
//   MapPin, 
//   Clock, 
//   Users, 
//   IndianRupee, 
//   Download,
//   Eye,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   RefreshCw,
//   Filter,
//   Search
// } from 'lucide-react';
// import Button from '@/components/ui/Button';
// import Card from '@/components/ui/Card';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';

// interface Booking {
//   _id: string;
//   packageId: {
//     _id: string;
//     title: string;
//     destination: string;
//     images: string[];
//     duration: number;
//   };
//   userId: string;
//   bookingDate: string;
//   startDate: string;
//   endDate: string;
//   numberOfTravelers: number;
//   totalAmount: number;
//   paidAmount: number;
//   status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
//   bookingReference: string;
//   specialRequests?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const CustomerBookings: React.FC = () => {
//   const { isLoading, user } = useRequireAuth('/auth/login');
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string>('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     if (user) {
//       fetchBookings();
//     }
//   }, [user]);

//   const fetchBookings = async (isRefresh = false) => {
//     try {
//       if (isRefresh) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }
      
//       setError('');
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch('/api/bookings/user', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           window.location.href = '/auth/login';
//           return;
//         }
//         throw new Error(`Failed to fetch bookings: ${response.status}`);
//       }

//       const data = await response.json();
//       setBookings(data.bookings || []);
//     } catch (error: any) {
//       console.error('Error fetching bookings:', error);
//       setError(error.message || 'Failed to load bookings');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'confirmed':
//         return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'completed':
//         return 'bg-green-100 text-green-800 border-green-200';
//       case 'cancelled':
//         return 'bg-red-100 text-red-800 border-red-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'pending':
//         return <Clock className="w-4 h-4" />;
//       case 'confirmed':
//         return <CheckCircle className="w-4 h-4" />;
//       case 'completed':
//         return <CheckCircle className="w-4 h-4" />;
//       case 'cancelled':
//         return <XCircle className="w-4 h-4" />;
//       default:
//         return <AlertCircle className="w-4 h-4" />;
//     }
//   };

//   const formatCurrency = (amount: number) => {
//     return `₹${amount.toLocaleString('en-IN')}`;
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const filteredBookings = bookings.filter(booking => {
//     const matchesSearch = booking.packageId.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          booking.packageId.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          booking.bookingReference.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
//     return matchesSearch && matchesStatus;
//   });

//   if (isLoading || loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 pt-20">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <LoadingSpinner />
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>My Bookings - Travel Quench</title>
//         <meta name="description" content="View and manage your travel bookings" />
//       </Head>

//       <Layout>
//         <div className="min-h-screen bg-gray-50 pt-20">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             {/* Header */}
//             <div className="mb-8">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
//                   <p className="text-gray-600 mt-2">Track and manage your travel bookings</p>
//                 </div>
//                 <Button
//                   onClick={() => fetchBookings(true)}
//                   disabled={refreshing}
//                   className="flex items-center space-x-2"
//                 >
//                   <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
//                   <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
//                 </Button>
//               </div>
//             </div>

//             {/* Error Display */}
//             {error && (
//               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
//                 <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
//                 <div className="flex-1">
//                   <p className="text-sm text-red-600 font-medium">Error</p>
//                   <p className="text-sm text-red-600">{error}</p>
//                   <button
//                     onClick={() => {
//                       setError('');
//                       fetchBookings();
//                     }}
//                     className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
//                   >
//                     Try Again
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Filters */}
//             <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border">
//               <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//                 {/* Search */}
//                 <div className="flex-1">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                     <input
//                       type="text"
//                       placeholder="Search by package name, destination, or booking reference..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 {/* Status Filter */}
//                 <div className="sm:w-48">
//                   <div className="relative">
//                     <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                     <select
//                       value={statusFilter}
//                       onChange={(e) => setStatusFilter(e.target.value)}
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
//                     >
//                       <option value="all">All Status</option>
//                       <option value="pending">Pending</option>
//                       <option value="confirmed">Confirmed</option>
//                       <option value="completed">Completed</option>
//                       <option value="cancelled">Cancelled</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Bookings List */}
//             {filteredBookings.length === 0 ? (
//               <Card className="text-center py-12">
//                 <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   {bookings.length === 0 ? 'No bookings yet' : 'No bookings match your filters'}
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   {bookings.length === 0 
//                     ? "Start exploring our amazing travel packages to make your first booking!"
//                     : "Try adjusting your search or filter criteria."
//                   }
//                 </p>
//                 {bookings.length === 0 && (
//                   <Button href="/packages/international" className="bg-gradient-to-r from-orange-500 to-red-600">
//                     Browse Packages
//                   </Button>
//                 )}
//               </Card>
//             ) : (
//               <div className="space-y-6">
//                 {filteredBookings.map((booking) => (
//                   <Card key={booking._id} className="overflow-hidden">
//                     <div className="p-6">
//                       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//                         {/* Left Section - Package Info */}
//                         <div className="flex-1 mb-4 lg:mb-0">
//                           <div className="flex items-start space-x-4">
//                             {/* Package Image */}
//                             <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
//                               {booking.packageId.images && booking.packageId.images[0] ? (
//                                 <img
//                                   src={booking.packageId.images[0]}
//                                   alt={booking.packageId.title}
//                                   className="w-full h-full object-cover"
//                                 />
//                               ) : (
//                                 <div className="w-full h-full flex items-center justify-center">
//                                   <MapPin className="w-8 h-8 text-gray-400" />
//                                 </div>
//                               )}
//                             </div>

//                             {/* Package Details */}
//                             <div className="flex-1">
//                               <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                                 {booking.packageId.title}
//                               </h3>
//                               <div className="flex items-center text-gray-600 mb-2">
//                                 <MapPin className="w-4 h-4 mr-1" />
//                                 <span className="text-sm">{booking.packageId.destination}</span>
//                               </div>
//                               <div className="flex items-center space-x-4 text-sm text-gray-600">
//                                 <div className="flex items-center">
//                                   <Calendar className="w-4 h-4 mr-1" />
//                                   <span>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                   <Users className="w-4 h-4 mr-1" />
//                                   <span>{booking.numberOfTravelers} travelers</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                   <Clock className="w-4 h-4 mr-1" />
//                                   <span>{booking.packageId.duration} days</span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Right Section - Status & Actions */}
//                         <div className="lg:text-right space-y-3">
//                           {/* Status Badge */}
//                           <div className="flex lg:justify-end">
//                             <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
//                               {getStatusIcon(booking.status)}
//                               <span className="ml-1 capitalize">{booking.status}</span>
//                             </span>
//                           </div>

//                           {/* Amount */}
//                           <div className="text-right">
//                             <div className="text-lg font-bold text-gray-900">
//                               {formatCurrency(booking.totalAmount)}
//                             </div>
//                             {booking.paidAmount < booking.totalAmount && (
//                               <div className="text-sm text-orange-600">
//                                 Paid: {formatCurrency(booking.paidAmount)}
//                               </div>
//                             )}
//                           </div>

//                           {/* Booking Reference */}
//                           <div className="text-sm text-gray-600">
//                             Ref: {booking.bookingReference}
//                           </div>

//                           {/* Actions */}
//                           <div className="flex space-x-2 lg:justify-end">
//                             <Button
//                               size="sm"
//                               variant="ghost"
//                               className="text-orange-600 hover:text-orange-700"
//                             >
//                               <Eye className="w-4 h-4 mr-1" />
//                               View Details
//                             </Button>
//                             <Button
//                               size="sm"
//                               variant="ghost"
//                               className="text-gray-600 hover:text-gray-700"
//                             >
//                               <Download className="w-4 h-4 mr-1" />
//                               Invoice
//                             </Button>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Special Requests */}
//                       {booking.specialRequests && (
//                         <div className="mt-4 pt-4 border-t border-gray-200">
//                           <p className="text-sm text-gray-600">
//                             <span className="font-medium">Special Requests:</span> {booking.specialRequests}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             )}

//             {/* Stats Summary */}
//             {bookings.length > 0 && (
//               <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <Card className="text-center p-4">
//                   <div className="text-2xl font-bold text-gray-900">
//                     {bookings.length}
//                   </div>
//                   <div className="text-sm text-gray-600">Total Bookings</div>
//                 </Card>
//                 <Card className="text-center p-4">
//                   <div className="text-2xl font-bold text-green-600">
//                     {bookings.filter(b => b.status === 'completed').length}
//                   </div>
//                   <div className="text-sm text-gray-600">Completed</div>
//                 </Card>
//                 <Card className="text-center p-4">
//                   <div className="text-2xl font-bold text-blue-600">
//                     {bookings.filter(b => b.status === 'confirmed').length}
//                   </div>
//                   <div className="text-sm text-gray-600">Confirmed</div>
//                 </Card>
//                 <Card className="text-center p-4">
//                   <div className="text-2xl font-bold text-gray-900">
//                     {formatCurrency(bookings.reduce((sum, b) => sum + b.totalAmount, 0))}
//                   </div>
//                   <div className="text-sm text-gray-600">Total Spent</div>
//                 </Card>
//               </div>
//             )}
//           </div>
//         </div>
//       </Layout>
//     </>
//   );
// };

// export default CustomerBookings;














// import React, { useState, useEffect } from 'react';
// import { useRequireAuth } from '@/hooks/useAuth';
// import Head from 'next/head';
// import Layout from '@/components/layout/Layout';
// import BookingDetailsModal from '@/components/customer/BookingDetailsModal';
// import { downloadInvoicePDF } from '@/utils/invoiceGenerator';
// import { 
//   Calendar, 
//   MapPin, 
//   Clock, 
//   Users, 
//   IndianRupee, 
//   Download,
//   Eye,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   RefreshCw,
//   Filter,
//   Search
// } from 'lucide-react';
// import Button from '@/components/ui/Button';
// import Card from '@/components/ui/Card';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';

// interface Booking {
//   _id: string;
//   packageId: {
//     _id: string;
//     title: string;
//     destination: string;
//     images: string[];
//     duration: number;
//   };
//   userId: string;
//   bookingDate: string;
//   startDate: string;
//   endDate: string;
//   numberOfTravelers: number;
//   totalAmount: number;
//   paidAmount: number;
//   status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
//   bookingReference: string;
//   specialRequests?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const CustomerBookings: React.FC = () => {
//   const { isLoading, user } = useRequireAuth('/auth/login');
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string>('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);

//   useEffect(() => {
//     if (user) {
//       fetchBookings();
//     }
//   }, [user]);

//   const fetchBookings = async (isRefresh = false) => {
//     try {
//       if (isRefresh) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }
      
//       setError('');
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch('/api/bookings/user', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           window.location.href = '/auth/login';
//           return;
//         }
//         throw new Error(`Failed to fetch bookings: ${response.status}`);
//       }

//       const data = await response.json();
//       setBookings(data.bookings || []);
//     } catch (error: any) {
//       console.error('Error fetching bookings:', error);
//       setError(error.message || 'Failed to load bookings');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const handleViewDetails = (booking: Booking) => {
//     setSelectedBooking(booking);
//     setShowDetailsModal(true);
//   };

//   const handleDownloadInvoice = (booking: Booking) => {
//     try {
//       downloadInvoicePDF(booking);
//     } catch (error: any) {
//       console.error('Error downloading invoice:', error);
//       setError('Failed to download invoice');
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'confirmed':
//         return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'completed':
//         return 'bg-green-100 text-green-800 border-green-200';
//       case 'cancelled':
//         return 'bg-red-100 text-red-800 border-red-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'pending':
//         return <Clock className="w-4 h-4" />;
//       case 'confirmed':
//         return <CheckCircle className="w-4 h-4" />;
//       case 'completed':
//         return <CheckCircle className="w-4 h-4" />;
//       case 'cancelled':
//         return <XCircle className="w-4 h-4" />;
//       default:
//         return <AlertCircle className="w-4 h-4" />;
//     }
//   };

//   const formatCurrency = (amount: number) => {
//     return `₹${amount.toLocaleString('en-IN')}`;
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const filteredBookings = bookings.filter(booking => {
//     const matchesSearch = booking.packageId.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          booking.packageId.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          booking.bookingReference.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
//     return matchesSearch && matchesStatus;
//   });

//   if (isLoading || loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 pt-20">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <LoadingSpinner />
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>My Bookings - Travel Quench</title>
//         <meta name="description" content="View and manage your travel bookings" />
//       </Head>

//       <Layout>
//         <div className="min-h-screen bg-gray-50 pt-20">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             {/* Header */}
//             <div className="mb-8">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
//                   <p className="text-gray-600 mt-2">Track and manage your travel bookings</p>
//                 </div>
//                 <Button
//                   onClick={() => fetchBookings(true)}
//                   disabled={refreshing}
//                   className="flex items-center space-x-2"
//                 >
//                   <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
//                   <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
//                 </Button>
//               </div>
//             </div>

//             {/* Error Display */}
//             {error && (
//               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
//                 <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
//                 <div className="flex-1">
//                   <p className="text-sm text-red-600 font-medium">Error</p>
//                   <p className="text-sm text-red-600">{error}</p>
//                   <button
//                     onClick={() => {
//                       setError('');
//                       fetchBookings();
//                     }}
//                     className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
//                   >
//                     Try Again
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Filters */}
//             <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border">
//               <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//                 {/* Search */}
//                 <div className="flex-1">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                     <input
//                       type="text"
//                       placeholder="Search by package name, destination, or booking reference..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 {/* Status Filter */}
//                 <div className="sm:w-48">
//                   <div className="relative">
//                     <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                     <select
//                       value={statusFilter}
//                       onChange={(e) => setStatusFilter(e.target.value)}
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
//                     >
//                       <option value="all">All Status</option>
//                       <option value="pending">Pending</option>
//                       <option value="confirmed">Confirmed</option>
//                       <option value="completed">Completed</option>
//                       <option value="cancelled">Cancelled</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Bookings List */}
//             {filteredBookings.length === 0 ? (
//               <Card className="text-center py-12">
//                 <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   {bookings.length === 0 ? 'No bookings yet' : 'No bookings match your filters'}
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   {bookings.length === 0 
//                     ? "Start exploring our amazing travel packages to make your first booking!"
//                     : "Try adjusting your search or filter criteria."
//                   }
//                 </p>
//                 {bookings.length === 0 && (
//                   <Button href="/packages/international" className="bg-gradient-to-r from-orange-500 to-red-600">
//                     Browse Packages
//                   </Button>
//                 )}
//               </Card>
//             ) : (
//               <div className="space-y-6">
//                 {filteredBookings.map((booking) => (
//                   <Card key={booking._id} className="overflow-hidden">
//                     <div className="p-6">
//                       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//                         {/* Left Section - Package Info */}
//                         <div className="flex-1 mb-4 lg:mb-0">
//                           <div className="flex items-start space-x-4">
//                             {/* Package Image */}
//                             <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
//                               {booking.packageId.images && booking.packageId.images[0] ? (
//                                 <img
//                                   src={booking.packageId.images[0]}
//                                   alt={booking.packageId.title}
//                                   className="w-full h-full object-cover"
//                                 />
//                               ) : (
//                                 <div className="w-full h-full flex items-center justify-center">
//                                   <MapPin className="w-8 h-8 text-gray-400" />
//                                 </div>
//                               )}
//                             </div>

//                             {/* Package Details */}
//                             <div className="flex-1">
//                               <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                                 {booking.packageId.title}
//                               </h3>
//                               <div className="flex items-center text-gray-600 mb-2">
//                                 <MapPin className="w-4 h-4 mr-1" />
//                                 <span className="text-sm">{booking.packageId.destination}</span>
//                               </div>
//                               <div className="flex items-center space-x-4 text-sm text-gray-600">
//                                 <div className="flex items-center">
//                                   <Calendar className="w-4 h-4 mr-1" />
//                                   <span>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                   <Users className="w-4 h-4 mr-1" />
//                                   <span>{booking.numberOfTravelers} travelers</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                   <Clock className="w-4 h-4 mr-1" />
//                                   <span>{booking.packageId.duration} days</span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Right Section - Status & Actions */}
//                         <div className="lg:text-right space-y-3">
//                           {/* Status Badge */}
//                           <div className="flex lg:justify-end">
//                             <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
//                               {getStatusIcon(booking.status)}
//                               <span className="ml-1 capitalize">{booking.status}</span>
//                             </span>
//                           </div>

//                           {/* Amount */}
//                           <div className="text-right">
//                             <div className="text-lg font-bold text-gray-900">
//                               {formatCurrency(booking.totalAmount)}
//                             </div>
//                             {booking.paidAmount < booking.totalAmount && (
//                               <div className="text-sm text-orange-600">
//                                 Paid: {formatCurrency(booking.paidAmount)}
//                               </div>
//                             )}
//                           </div>

//                           {/* Booking Reference */}
//                           <div className="text-sm text-gray-600">
//                             Ref: {booking.bookingReference}
//                           </div>

//                           {/* Actions */}
//                           <div className="flex space-x-2 lg:justify-end">
//                             <Button
//                               size="sm"
//                               variant="ghost"
//                               onClick={() => handleViewDetails(booking)}
//                               className="text-orange-600 hover:text-orange-700"
//                             >
//                               <Eye className="w-4 h-4 mr-1" />
//                               View Details
//                             </Button>
//                             <Button
//                               size="sm"
//                               variant="ghost"
//                               onClick={() => handleDownloadInvoice(booking)}
//                               className="text-gray-600 hover:text-gray-700"
//                             >
//                               <Download className="w-4 h-4 mr-1" />
//                               Invoice
//                             </Button>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Special Requests */}
//                       {booking.specialRequests && (
//                         <div className="mt-4 pt-4 border-t border-gray-200">
//                           <p className="text-sm text-gray-600">
//                             <span className="font-medium">Special Requests:</span> {booking.specialRequests}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             )}

//             {/* Stats Summary */}
//             {bookings.length > 0 && (
//               <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <Card className="text-center p-4">
//                   <div className="text-2xl font-bold text-gray-900">
//                     {bookings.length}
//                   </div>
//                   <div className="text-sm text-gray-600">Total Bookings</div>
//                 </Card>
//                 <Card className="text-center p-4">
//                   <div className="text-2xl font-bold text-green-600">
//                     {bookings.filter(b => b.status === 'completed').length}
//                   </div>
//                   <div className="text-sm text-gray-600">Completed</div>
//                 </Card>
//                 <Card className="text-center p-4">
//                   <div className="text-2xl font-bold text-blue-600">
//                     {bookings.filter(b => b.status === 'confirmed').length}
//                   </div>
//                   <div className="text-sm text-gray-600">Confirmed</div>
//                 </Card>
//                 <Card className="text-center p-4">
//                   <div className="text-2xl font-bold text-gray-900">
//                     {formatCurrency(bookings.reduce((sum, b) => sum + b.totalAmount, 0))}
//                   </div>
//                   <div className="text-sm text-gray-600">Total Spent</div>
//                 </Card>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Booking Details Modal */}
//         {selectedBooking && (
//           <BookingDetailsModal
//             booking={selectedBooking}
//             isOpen={showDetailsModal}
//             onClose={() => {
//               setShowDetailsModal(false);
//               setSelectedBooking(null);
//             }}
//           />
//         )}
//       </Layout>
//     </>
//   );
// };

// export default CustomerBookings;











import React, { useState, useEffect } from 'react';
import { useRequireAuth } from '@/hooks/useAuth';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import BookingDetailsModal from '@/components/customer/BookingDetailsModal';
import { downloadInvoicePDF } from '@/utils/invoiceGenerator';
import { 
  MapPin, 
  Clock, 
  Users, 
  Download,
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Filter,
  Search
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ApiError {
  message: string;
}

interface Booking {
  _id: string;
  packageId: {
    _id: string;
    title: string;
    destination: string;
    images: string[];
    duration: number;
  };
  userId: string;
  bookingDate: string;
  startDate: string;
  endDate: string;
  numberOfTravelers: number;
  totalAmount: number;
  paidAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  bookingReference: string;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

const CustomerBookings: React.FC = () => {
  const { isLoading, user } = useRequireAuth('/auth/login');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      setError('');
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/bookings/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/auth/login';
          return;
        }
        throw new Error(`Failed to fetch bookings: ${response.status}`);
      }

      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error: unknown) {
      console.error('Error fetching bookings:', error);
      const errorMessage = (error as ApiError)?.message || 'Failed to load bookings';
      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleDownloadInvoice = (booking: Booking) => {
    try {
      downloadInvoicePDF(booking);
    } catch (error: unknown) {
      console.error('Error downloading invoice:', error);
      setError('Failed to download invoice');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.packageId.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.packageId.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bookingReference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (isLoading || loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <LoadingSpinner />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>My Bookings - Travel Quench</title>
        <meta name="description" content="View and manage your travel bookings" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
                  <p className="text-gray-600 mt-2">Track and manage your travel bookings</p>
                </div>
                <Button
                  onClick={() => fetchBookings(true)}
                  disabled={refreshing}
                  className="flex items-center space-x-2"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                  <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
                </Button>
              </div>
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
                      fetchBookings();
                    }}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search by package name, destination, or booking reference..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="sm:w-48">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
              <Card className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {bookings.length === 0 ? 'No bookings yet' : 'No bookings match your filters'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {bookings.length === 0 
                    ? "Start exploring our amazing travel packages to make your first booking!"
                    : "Try adjusting your search or filter criteria."
                  }
                </p>
                {bookings.length === 0 && (
                  <Button href="/packages/international" className="bg-gradient-to-r from-orange-500 to-red-600">
                    Browse Packages
                  </Button>
                )}
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredBookings.map((booking) => (
                  <Card key={booking._id} className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        {/* Left Section - Package Info */}
                        <div className="flex-1 mb-4 lg:mb-0">
                          <div className="flex items-start space-x-4">
                            {/* Package Image */}
                            <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                              {booking.packageId.images && booking.packageId.images[0] ? (
                                <Image
                                  src={booking.packageId.images[0]}
                                  alt={booking.packageId.title}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <MapPin className="w-8 h-8 text-gray-400" />
                                </div>
                              )}
                            </div>

                            {/* Package Details */}
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {booking.packageId.title}
                              </h3>
                              <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span className="text-sm">{booking.packageId.destination}</span>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  <span>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</span>
                                </div>
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  <span>{booking.numberOfTravelers} travelers</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  <span>{booking.packageId.duration} days</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Section - Status & Actions */}
                        <div className="lg:text-right space-y-3">
                          {/* Status Badge */}
                          <div className="flex lg:justify-end">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="ml-1 capitalize">{booking.status}</span>
                            </span>
                          </div>

                          {/* Amount */}
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              {formatCurrency(booking.totalAmount)}
                            </div>
                            {booking.paidAmount < booking.totalAmount && (
                              <div className="text-sm text-orange-600">
                                Paid: {formatCurrency(booking.paidAmount)}
                              </div>
                            )}
                          </div>

                          {/* Booking Reference */}
                          <div className="text-sm text-gray-600">
                            Ref: {booking.bookingReference}
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-2 lg:justify-end">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleViewDetails(booking)}
                              className="text-orange-600 hover:text-orange-700"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDownloadInvoice(booking)}
                              className="text-gray-600 hover:text-gray-700"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Invoice
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Special Requests */}
                      {booking.specialRequests && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Special Requests:</span> {booking.specialRequests}
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Stats Summary */}
            {bookings.length > 0 && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="text-center p-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {bookings.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Bookings</div>
                </Card>
                <Card className="text-center p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {bookings.filter(b => b.status === 'completed').length}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </Card>
                <Card className="text-center p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </div>
                  <div className="text-sm text-gray-600">Confirmed</div>
                </Card>
                <Card className="text-center p-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(bookings.reduce((sum, b) => sum + b.totalAmount, 0))}
                  </div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Booking Details Modal */}
        {selectedBooking && (
          <BookingDetailsModal
            booking={selectedBooking}
            isOpen={showDetailsModal}
            onClose={() => {
              setShowDetailsModal(false);
              setSelectedBooking(null);
            }}
          />
        )}
      </Layout>
    </>
  );
};

export default CustomerBookings;