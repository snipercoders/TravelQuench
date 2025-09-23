// // // src/pages/admin/bookings.tsx

// import React, { useState, useEffect } from 'react';
// import AdminLayout from '@/components/layout/AdminLayout';
// import { useRequireAuth } from '@/hooks/useAuth';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import {
//   ArrowLeft,
//   Search,
//   Filter,
//   Calendar,
//   Users,
//   IndianRupee,
//   MapPin,
//   CheckCircle,
//   Clock,
//   AlertCircle,
//   XCircle,
//   Eye,
//   Edit,
//   Download,
//   Phone,
//   Mail,
//   CreditCard
// } from 'lucide-react';

// interface Booking {
//   id: string;
//   customerName: string;
//   customerEmail: string;
//   customerPhone: string;
//   packageTitle: string;
//   packageDestination: string;
//   packageDuration: number;
//   travelers: number;
//   startDate: string;
//   endDate: string;
//   totalAmount: number;
//   paidAmount: number;
//   status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
//   paymentStatus: 'pending' | 'paid' | 'partial' | 'refunded';
//   specialRequests?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const BookingManagement: React.FC = () => {
//   const { isLoading } = useRequireAuth('/auth/login');
//   const router = useRouter();
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all');
//   const [dateRange, setDateRange] = useState('all');

//   // Handle back navigation
//   const handleGoBack = () => {
//     // Check if there's a previous page in browser history
//     if (window.history.length > 1) {
//       router.back();
//     } else {
//       // Fallback to admin dashboard
//       router.push('/admin/dashboard');
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const response = await fetch('/api/admin/bookings');
//       if (response.ok) {
//         const data = await response.json();
//         setBookings(data);
//       }
//     } catch (error) {
//       console.error('Failed to fetch bookings:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (bookingId: string, newStatus: string) => {
//     try {
//       const response = await fetch(`/api/admin/bookings/${bookingId}/status`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: newStatus })
//       });

//       if (response.ok) {
//         setBookings(bookings.map(booking => 
//           booking.id === bookingId ? { ...booking, status: newStatus as any } : booking
//         ));
//       }
//     } catch (error) {
//       console.error('Failed to update booking status:', error);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'completed': return 'bg-green-100 text-green-800 border-green-200';
//       case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getPaymentStatusColor = (status: string) => {
//     switch (status) {
//       case 'pending': return 'text-yellow-400';
//       case 'paid': return 'text-green-400';
//       case 'partial': return 'text-orange-400';
//       case 'refunded': return 'text-red-400';
//       default: return 'text-gray-400';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'pending': return <Clock className="h-4 w-4" />;
//       case 'confirmed': return <CheckCircle className="h-4 w-4" />;
//       case 'completed': return <CheckCircle className="h-4 w-4" />;
//       case 'cancelled': return <XCircle className="h-4 w-4" />;
//       default: return <Clock className="h-4 w-4" />;
//     }
//   };

//   const filteredBookings = bookings.filter(booking => {
//     const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          booking.packageTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
//     const matchesPaymentStatus = selectedPaymentStatus === 'all' || booking.paymentStatus === selectedPaymentStatus;
    
//     let matchesDate = true;
//     if (dateRange !== 'all') {
//       const now = new Date();
//       const bookingDate = new Date(booking.createdAt);
      
//       switch (dateRange) {
//         case 'today':
//           matchesDate = bookingDate.toDateString() === now.toDateString();
//           break;
//         case 'week':
//           const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
//           matchesDate = bookingDate >= weekAgo;
//           break;
//         case 'month':
//           const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
//           matchesDate = bookingDate >= monthAgo;
//           break;
//       }
//     }
    
//     return matchesSearch && matchesStatus && matchesPaymentStatus && matchesDate;
//   });

//   if (isLoading || loading) {
//     return (
//       <AdminLayout title="Booking Management">
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//         </div>
//       </AdminLayout>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>Booking Management - Travel Quench Admin</title>
//       </Head>

//       <AdminLayout title="Booking Management">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Back Navigation */}
//           <div className="mb-6">
//             <button
//               onClick={handleGoBack}
//               className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md transform hover:scale-105"
//             >
//               <ArrowLeft className="h-5 w-5 mr-2" />
//               Back
//             </button>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//             <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-blue-100 text-sm font-medium">Total Bookings</p>
//                   <p className="text-3xl font-bold">{bookings.length}</p>
//                 </div>
//                 <Calendar className="h-12 w-12 text-blue-200" />
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-yellow-100 text-sm font-medium">Pending</p>
//                   <p className="text-3xl font-bold">{bookings.filter(b => b.status === 'pending').length}</p>
//                 </div>
//                 <Clock className="h-12 w-12 text-yellow-200" />
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-green-100 text-sm font-medium">Confirmed</p>
//                   <p className="text-3xl font-bold">{bookings.filter(b => b.status === 'confirmed').length}</p>
//                 </div>
//                 <CheckCircle className="h-12 w-12 text-green-200" />
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-purple-100 text-sm font-medium">Total Revenue</p>
//                   <p className="text-3xl font-bold">₹{bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}</p>
//                 </div>
//                 <IndianRupee className="h-12 w-12 text-purple-200" />
//               </div>
//             </div>
//           </div>

//           {/* Filters */}
//           <div className="mb-8">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <input
//                   type="text"
//                   placeholder="Search bookings..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 w-full bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <select
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//                 className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//               >
//                 <option value="all">All Status</option>
//                 <option value="pending" className="bg-gray-800">Pending</option>
//                 <option value="confirmed" className="bg-gray-800">Confirmed</option>
//                 <option value="completed" className="bg-gray-800">Completed</option>
//                 <option value="cancelled" className="bg-gray-800">Cancelled</option>
//               </select>

//               <select
//                 value={selectedPaymentStatus}
//                 onChange={(e) => setSelectedPaymentStatus(e.target.value)}
//                 className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//               >
//                 <option value="all">Payment Status</option>
//                 <option value="pending" className="bg-gray-800">Pending</option>
//                 <option value="paid" className="bg-gray-800">Paid</option>
//                 <option value="partial" className="bg-gray-800">Partial</option>
//                 <option value="refunded" className="bg-gray-800">Refunded</option>
//               </select>

//               <select
//                 value={dateRange}
//                 onChange={(e) => setDateRange(e.target.value)}
//                 className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//               >
//                 <option value="all">All Time</option>
//                 <option value="today" className="bg-gray-800">Today</option>
//                 <option value="week" className="bg-gray-800">This Week</option>
//                 <option value="month" className="bg-gray-800">This Month</option>
//               </select>

//               <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200">
//                 <Download className="h-4 w-4" />
//               </button>
//             </div>
//           </div>

//           {/* Bookings Table */}
//           <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-white/20">
//                 <thead className="bg-white/5">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Booking Details
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Customer
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Package
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Travel Details
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Payment
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white/5 divide-y divide-white/10">
//                   {filteredBookings.map((booking) => (
//                     <tr key={booking.id} className="hover:bg-white/10 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm">
//                           <div className="text-white font-medium">#{booking.id.slice(0, 8)}</div>
//                           <div className="text-gray-400">{new Date(booking.createdAt).toLocaleDateString()}</div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm">
//                           <div className="text-white font-medium">{booking.customerName}</div>
//                           <div className="text-gray-300 flex items-center mt-1">
//                             <Mail className="h-3 w-3 mr-1" />
//                             {booking.customerEmail}
//                           </div>
//                           {booking.customerPhone && (
//                             <div className="text-gray-300 flex items-center mt-1">
//                               <Phone className="h-3 w-3 mr-1" />
//                               {booking.customerPhone}
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm">
//                           <div className="text-white font-medium">{booking.packageTitle}</div>
//                           <div className="text-gray-300 flex items-center mt-1">
//                             <MapPin className="h-3 w-3 mr-1" />
//                             {booking.packageDestination}
//                           </div>
//                           <div className="text-gray-300 flex items-center mt-1">
//                             <Calendar className="h-3 w-3 mr-1" />
//                             {booking.packageDuration} days
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm">
//                           <div className="text-white flex items-center">
//                             <Users className="h-3 w-3 mr-1" />
//                             {booking.travelers} travelers
//                           </div>
//                           <div className="text-gray-300 mt-1">
//                             {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm">
//                           <div className="text-white font-medium flex items-center">
//                             <IndianRupee className="h-3 w-3 mr-1" />
//                             {booking.totalAmount.toLocaleString()}
//                           </div>
//                           <div className={`flex items-center mt-1 ${getPaymentStatusColor(booking.paymentStatus)}`}>
//                             <CreditCard className="h-3 w-3 mr-1" />
//                             {booking.paymentStatus}
//                           </div>
//                           {booking.paidAmount > 0 && (
//                             <div className="text-xs text-gray-400">
//                               Paid: ₹{booking.paidAmount.toLocaleString()}
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <select
//                           value={booking.status}
//                           onChange={(e) => handleStatusChange(booking.id, e.target.value)}
//                           className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(booking.status)} bg-opacity-20`}
//                         >
//                           <option value="pending">Pending</option>
//                           <option value="confirmed">Confirmed</option>
//                           <option value="completed">Completed</option>
//                           <option value="cancelled">Cancelled</option>
//                         </select>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex items-center space-x-2">
//                           <button className="text-blue-400 hover:text-blue-300">
//                             <Eye className="h-4 w-4" />
//                           </button>
//                           <button className="text-green-400 hover:text-green-300">
//                             <Edit className="h-4 w-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {filteredBookings.length === 0 && (
//             <div className="text-center py-12">
//               <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-white mb-2">No bookings found</h3>
//               <p className="text-gray-400">
//                 {searchTerm || selectedStatus !== 'all' || selectedPaymentStatus !== 'all' || dateRange !== 'all'
//                   ? 'Try adjusting your search criteria'
//                   : 'No bookings have been made yet'}
//               </p>
//             </div>
//           )}
//         </div>
//       </AdminLayout>
//     </>
//   );
// };

// export default BookingManagement;








// src/pages/admin/bookings.tsx
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { useRequireAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  ArrowLeft,
  Search,
  Calendar,
  Users,
  IndianRupee,
  MapPin,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Download,
  Phone,
  Mail,
  CreditCard
} from 'lucide-react';

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  packageTitle: string;
  packageDestination: string;
  packageDuration: number;
  travelers: number;
  startDate: string;
  endDate: string;
  totalAmount: number;
  paidAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'partial' | 'refunded';
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

const BookingManagement: React.FC = () => {
  const { isLoading } = useRequireAuth('/auth/login');
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  // Handle back navigation
  const handleGoBack = () => {
    // Check if there's a previous page in browser history
    if (window.history.length > 1) {
      router.back();
    } else {
      // Fallback to admin dashboard
      router.push('/admin/dashboard');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setBookings(bookings.map(booking => 
          booking.id === bookingId ? { ...booking, status: newStatus as Booking['status'] } : booking
        ));
      }
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400';
      case 'paid': return 'text-green-400';
      case 'partial': return 'text-orange-400';
      case 'refunded': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.packageTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    const matchesPaymentStatus = selectedPaymentStatus === 'all' || booking.paymentStatus === selectedPaymentStatus;
    
    let matchesDate = true;
    if (dateRange !== 'all') {
      const now = new Date();
      const bookingDate = new Date(booking.createdAt);
      
      switch (dateRange) {
        case 'today':
          matchesDate = bookingDate.toDateString() === now.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = bookingDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          matchesDate = bookingDate >= monthAgo;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesPaymentStatus && matchesDate;
  });

  if (isLoading || loading) {
    return (
      <AdminLayout title="Booking Management">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Booking Management - Travel Quench Admin</title>
      </Head>

      <AdminLayout title="Booking Management">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <button
              onClick={handleGoBack}
              className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md transform hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Bookings</p>
                  <p className="text-3xl font-bold">{bookings.length}</p>
                </div>
                <Calendar className="h-12 w-12 text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">Pending</p>
                  <p className="text-3xl font-bold">{bookings.filter(b => b.status === 'pending').length}</p>
                </div>
                <Clock className="h-12 w-12 text-yellow-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Confirmed</p>
                  <p className="text-3xl font-bold">{bookings.filter(b => b.status === 'confirmed').length}</p>
                </div>
                <CheckCircle className="h-12 w-12 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold">₹{bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}</p>
                </div>
                <IndianRupee className="h-12 w-12 text-purple-200" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Status</option>
                <option value="pending" className="bg-gray-800">Pending</option>
                <option value="confirmed" className="bg-gray-800">Confirmed</option>
                <option value="completed" className="bg-gray-800">Completed</option>
                <option value="cancelled" className="bg-gray-800">Cancelled</option>
              </select>

              <select
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">Payment Status</option>
                <option value="pending" className="bg-gray-800">Pending</option>
                <option value="paid" className="bg-gray-800">Paid</option>
                <option value="partial" className="bg-gray-800">Partial</option>
                <option value="refunded" className="bg-gray-800">Refunded</option>
              </select>

              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Time</option>
                <option value="today" className="bg-gray-800">Today</option>
                <option value="week" className="bg-gray-800">This Week</option>
                <option value="month" className="bg-gray-800">This Month</option>
              </select>

              <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/20">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Booking Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Travel Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/5 divide-y divide-white/10">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-white/10 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="text-white font-medium">#{booking.id.slice(0, 8)}</div>
                          <div className="text-gray-400">{new Date(booking.createdAt).toLocaleDateString()}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="text-white font-medium">{booking.customerName}</div>
                          <div className="text-gray-300 flex items-center mt-1">
                            <Mail className="h-3 w-3 mr-1" />
                            {booking.customerEmail}
                          </div>
                          {booking.customerPhone && (
                            <div className="text-gray-300 flex items-center mt-1">
                              <Phone className="h-3 w-3 mr-1" />
                              {booking.customerPhone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="text-white font-medium">{booking.packageTitle}</div>
                          <div className="text-gray-300 flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {booking.packageDestination}
                          </div>
                          <div className="text-gray-300 flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {booking.packageDuration} days
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="text-white flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {booking.travelers} travelers
                          </div>
                          <div className="text-gray-300 mt-1">
                            {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="text-white font-medium flex items-center">
                            <IndianRupee className="h-3 w-3 mr-1" />
                            {booking.totalAmount.toLocaleString()}
                          </div>
                          <div className={`flex items-center mt-1 ${getPaymentStatusColor(booking.paymentStatus)}`}>
                            <CreditCard className="h-3 w-3 mr-1" />
                            {booking.paymentStatus}
                          </div>
                          {booking.paidAmount > 0 && (
                            <div className="text-xs text-gray-400">
                              Paid: ₹{booking.paidAmount.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(booking.status)} bg-opacity-20`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-400 hover:text-blue-300">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-400 hover:text-green-300">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No bookings found</h3>
              <p className="text-gray-400">
                {searchTerm || selectedStatus !== 'all' || selectedPaymentStatus !== 'all' || dateRange !== 'all'
                  ? 'Try adjusting your search criteria'
                  : 'No bookings have been made yet'}
              </p>
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default BookingManagement;




