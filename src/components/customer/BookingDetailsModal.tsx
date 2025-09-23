// src/components/customer/BookingDetailsModal.tsx


// import React from 'react';
// import { 
//   X, 
//   Calendar, 
//   MapPin, 
//   Users, 
//   Clock, 
//   IndianRupee, 
//   Phone, 
//   Mail, 
//   FileText,
//   CheckCircle,
//   AlertCircle,
//   XCircle
// } from 'lucide-react';
// import Button from '@/components/ui/Button';
// import Card from '@/components/ui/Card';

// interface BookingDetailsModalProps {
//   booking: {
//     _id: string;
//     packageId: {
//       _id: string;
//       title: string;
//       destination: string;
//       images: string[];
//       duration: number;
//       description?: string;
//     };
//     userId: string;
//     bookingDate: string;
//     startDate: string;
//     endDate: string;
//     numberOfTravelers: number;
//     totalAmount: number;
//     paidAmount: number;
//     status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
//     bookingReference: string;
//     specialRequests?: string;
//     contactDetails?: {
//       primaryContact: {
//         name: string;
//         phone: string;
//         email: string;
//         relation: string;
//       };
//       emergencyContact?: {
//         name: string;
//         phone: string;
//         relation: string;
//       };
//     };
//     travelerDetails?: Array<{
//       name: string;
//       age: number;
//       gender: string;
//     }>;
//     createdAt: string;
//     updatedAt: string;
//   };
//   isOpen: boolean;
//   onClose: () => void;
// }

// const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ booking, isOpen, onClose }) => {
//   if (!isOpen) return null;

//   const formatCurrency = (amount: number) => {
//     return `₹${amount.toLocaleString('en-IN')}`;
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatDateTime = (dateString: string) => {
//     return new Date(dateString).toLocaleString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'pending': return 'text-yellow-800 bg-yellow-100';
//       case 'confirmed': return 'text-blue-800 bg-blue-100';
//       case 'completed': return 'text-green-800 bg-green-100';
//       case 'cancelled': return 'text-red-800 bg-red-100';
//       default: return 'text-gray-800 bg-gray-100';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'pending': return <Clock className="w-4 h-4" />;
//       case 'confirmed': return <CheckCircle className="w-4 h-4" />;
//       case 'completed': return <CheckCircle className="w-4 h-4" />;
//       case 'cancelled': return <XCircle className="w-4 h-4" />;
//       default: return <AlertCircle className="w-4 h-4" />;
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
//             <p className="text-sm text-gray-600">Reference: {booking.bookingReference}</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Package Information */}
//           <Card className="p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Information</h3>
//             <div className="flex items-start space-x-4">
//               {booking.packageId.images && booking.packageId.images[0] && (
//                 <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
//                   <img
//                     src={booking.packageId.images[0]}
//                     alt={booking.packageId.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}
//               <div className="flex-1">
//                 <h4 className="text-xl font-semibold text-gray-900 mb-2">
//                   {booking.packageId.title}
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex items-center text-gray-600">
//                     <MapPin className="w-4 h-4 mr-2" />
//                     <span>Destination: {booking.packageId.destination}</span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <Clock className="w-4 h-4 mr-2" />
//                     <span>Duration: {booking.packageId.duration} days</span>
//                   </div>
//                 </div>
//                 {booking.packageId.description && (
//                   <p className="text-gray-600 mt-3 text-sm">{booking.packageId.description}</p>
//                 )}
//               </div>
//             </div>
//           </Card>

//           {/* Booking Status & Dates */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Status</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Status:</span>
//                   <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
//                     {getStatusIcon(booking.status)}
//                     <span className="ml-1 capitalize">{booking.status}</span>
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Booked on:</span>
//                   <span className="font-medium">{formatDate(booking.bookingDate)}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Last updated:</span>
//                   <span className="font-medium">{formatDateTime(booking.updatedAt)}</span>
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Dates</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Start Date:</span>
//                   <span className="font-medium">{formatDate(booking.startDate)}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">End Date:</span>
//                   <span className="font-medium">{formatDate(booking.endDate)}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Travelers:</span>
//                   <span className="font-medium">{booking.numberOfTravelers} persons</span>
//                 </div>
//               </div>
//             </Card>
//           </div>

//           {/* Payment Information */}
//           <Card className="p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//               <IndianRupee className="w-5 h-5 mr-2" />
//               Payment Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="text-center p-4 bg-gray-50 rounded-lg">
//                 <div className="text-2xl font-bold text-gray-900">
//                   {formatCurrency(booking.totalAmount)}
//                 </div>
//                 <div className="text-sm text-gray-600">Total Amount</div>
//               </div>
//               <div className="text-center p-4 bg-green-50 rounded-lg">
//                 <div className="text-2xl font-bold text-green-600">
//                   {formatCurrency(booking.paidAmount)}
//                 </div>
//                 <div className="text-sm text-gray-600">Paid Amount</div>
//               </div>
//               <div className="text-center p-4 bg-orange-50 rounded-lg">
//                 <div className="text-2xl font-bold text-orange-600">
//                   {formatCurrency(booking.totalAmount - booking.paidAmount)}
//                 </div>
//                 <div className="text-sm text-gray-600">Pending Amount</div>
//               </div>
//             </div>
//           </Card>

//           {/* Contact Details */}
//           {booking.contactDetails && booking.contactDetails.primaryContact && (
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-3">Primary Contact</h4>
//                   <div className="space-y-2">
//                     <div className="flex items-center text-gray-600">
//                       <span className="font-medium w-20">Name:</span>
//                       <span>{booking.contactDetails.primaryContact.name || 'Not provided'}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <Phone className="w-4 h-4 mr-2" />
//                       <span>{booking.contactDetails.primaryContact.phone || 'Not provided'}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <Mail className="w-4 h-4 mr-2" />
//                       <span>{booking.contactDetails.primaryContact.email || 'Not provided'}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <span className="font-medium w-20">Relation:</span>
//                       <span className="capitalize">{booking.contactDetails.primaryContact.relation || 'Not provided'}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {booking.contactDetails.emergencyContact && (
//                   <div>
//                     <h4 className="font-medium text-gray-900 mb-3">Emergency Contact</h4>
//                     <div className="space-y-2">
//                       <div className="flex items-center text-gray-600">
//                         <span className="font-medium w-20">Name:</span>
//                         <span>{booking.contactDetails.emergencyContact.name || 'Not provided'}</span>
//                       </div>
//                       <div className="flex items-center text-gray-600">
//                         <Phone className="w-4 h-4 mr-2" />
//                         <span>{booking.contactDetails.emergencyContact.phone || 'Not provided'}</span>
//                       </div>
//                       <div className="flex items-center text-gray-600">
//                         <span className="font-medium w-20">Relation:</span>
//                         <span className="capitalize">{booking.contactDetails.emergencyContact.relation || 'Not provided'}</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </Card>
//           )}

//           {/* Traveler Details */}
//           {booking.travelerDetails && booking.travelerDetails.length > 0 && (
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                 <Users className="w-5 h-5 mr-2" />
//                 Traveler Details
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Name
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Age
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Gender
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {booking.travelerDetails.map((traveler, index) => (
//                       <tr key={index}>
//                         <td className="px-4 py-3 text-sm font-medium text-gray-900">
//                           {traveler.name || 'Not provided'}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-600">
//                           {traveler.age ? `${traveler.age} years` : 'Not provided'}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-600 capitalize">
//                           {traveler.gender || 'Not provided'}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </Card>
//           )}

//           {/* Special Requests */}
//           {booking.specialRequests && (
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                 <FileText className="w-5 h-5 mr-2" />
//                 Special Requests
//               </h3>
//               <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
//                 {booking.specialRequests}
//               </p>
//             </Card>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
//           <Button variant="ghost" onClick={onClose}>
//             Close
//           </Button>
//           <Button 
//             onClick={() => {
//               // Trigger invoice download
//               const event = new CustomEvent('downloadInvoice', { detail: booking });
//               window.dispatchEvent(event);
//             }}
//             className="bg-orange-600 hover:bg-orange-700"
//           >
//             Download Invoice
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingDetailsModal;




















// // src/components/customer/BookingDetailsModal.tsx

// import React, { useState } from 'react';
// import { 
//   X, 
//   Calendar, 
//   MapPin, 
//   Users, 
//   Clock, 
//   IndianRupee, 
//   Phone, 
//   Mail, 
//   FileText,
//   CheckCircle,
//   AlertCircle,
//   XCircle
// } from 'lucide-react';
// import { downloadInvoicePDF } from '@/utils/invoiceGenerator';
// import Button from '@/components/ui/Button';
// import Card from '@/components/ui/Card';

// interface BookingDetailsModalProps {
//   booking: {
//     _id: string;
//     packageId: {
//       _id: string;
//       title: string;
//       destination: string;
//       images: string[];
//       duration: number;
//       description?: string;
//     };
//     userId: string;
//     bookingDate: string;
//     startDate: string;
//     endDate: string;
//     numberOfTravelers: number;
//     totalAmount: number;
//     paidAmount: number;
//     status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
//     bookingReference: string;
//     specialRequests?: string;
//     contactDetails?: {
//       primaryContact: {
//         name: string;
//         phone: string;
//         email: string;
//         relation: string;
//       };
//       emergencyContact?: {
//         name: string;
//         phone: string;
//         relation: string;
//       };
//     };
//     travelerDetails?: Array<{
//       name: string;
//       age: number;
//       gender: string;
//     }>;
//     createdAt: string;
//     updatedAt: string;
//   };
//   isOpen: boolean;
//   onClose: () => void;
// }

// const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ booking, isOpen, onClose }) => {
//   const [error, setError] = useState<string>('');

//   if (!isOpen) return null;

//   const formatCurrency = (amount: number) => {
//     return `₹${amount.toLocaleString('en-IN')}`;
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatDateTime = (dateString: string) => {
//     return new Date(dateString).toLocaleString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'pending': return 'text-yellow-800 bg-yellow-100';
//       case 'confirmed': return 'text-blue-800 bg-blue-100';
//       case 'completed': return 'text-green-800 bg-green-100';
//       case 'cancelled': return 'text-red-800 bg-red-100';
//       default: return 'text-gray-800 bg-gray-100';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'pending': return <Clock className="w-4 h-4" />;
//       case 'confirmed': return <CheckCircle className="w-4 h-4" />;
//       case 'completed': return <CheckCircle className="w-4 h-4" />;
//       case 'cancelled': return <XCircle className="w-4 h-4" />;
//       default: return <AlertCircle className="w-4 h-4" />;
//     }
//   };

//   const handleDownloadInvoice = () => {
//     try {
//       setError('');
//       downloadInvoicePDF(booking);
//     } catch (error: any) {
//       console.error('Error downloading invoice:', error);
//       setError(error.message || 'Failed to download invoice');
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
//             <p className="text-sm text-gray-600">Reference: {booking.bookingReference}</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Error Display */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
//               <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
//               <div className="flex-1">
//                 <p className="text-sm text-red-600 font-medium">Error</p>
//                 <p className="text-sm text-red-600">{error}</p>
//                 <button
//                   onClick={() => setError('')}
//                   className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
//                 >
//                   Dismiss
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Package Information */}
//           <Card className="p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Information</h3>
//             <div className="flex items-start space-x-4">
//               {booking.packageId.images && booking.packageId.images[0] && (
//                 <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
//                   <img
//                     src={booking.packageId.images[0]}
//                     alt={booking.packageId.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}
//               <div className="flex-1">
//                 <h4 className="text-xl font-semibold text-gray-900 mb-2">
//                   {booking.packageId.title}
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex items-center text-gray-600">
//                     <MapPin className="w-4 h-4 mr-2" />
//                     <span>Destination: {booking.packageId.destination}</span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <Clock className="w-4 h-4 mr-2" />
//                     <span>Duration: {booking.packageId.duration} days</span>
//                   </div>
//                 </div>
//                 {booking.packageId.description && (
//                   <p className="text-gray-600 mt-3 text-sm">{booking.packageId.description}</p>
//                 )}
//               </div>
//             </div>
//           </Card>

//           {/* Booking Status & Dates */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Status</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Status:</span>
//                   <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
//                     {getStatusIcon(booking.status)}
//                     <span className="ml-1 capitalize">{booking.status}</span>
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Booked on:</span>
//                   <span className="font-medium">{formatDate(booking.bookingDate)}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Last updated:</span>
//                   <span className="font-medium">{formatDateTime(booking.updatedAt)}</span>
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Dates</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Start Date:</span>
//                   <span className="font-medium">{formatDate(booking.startDate)}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">End Date:</span>
//                   <span className="font-medium">{formatDate(booking.endDate)}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Travelers:</span>
//                   <span className="font-medium">{booking.numberOfTravelers} persons</span>
//                 </div>
//               </div>
//             </Card>
//           </div>

//           {/* Payment Information */}
//           <Card className="p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//               <IndianRupee className="w-5 h-5 mr-2" />
//               Payment Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="text-center p-4 bg-gray-50 rounded-lg">
//                 <div className="text-2xl font-bold text-gray-900">
//                   {formatCurrency(booking.totalAmount)}
//                 </div>
//                 <div className="text-sm text-gray-600">Total Amount</div>
//               </div>
//               <div className="text-center p-4 bg-green-50 rounded-lg">
//                 <div className="text-2xl font-bold text-green-600">
//                   {formatCurrency(booking.paidAmount)}
//                 </div>
//                 <div className="text-sm text-gray-600">Paid Amount</div>
//               </div>
//               <div className="text-center p-4 bg-orange-50 rounded-lg">
//                 <div className="text-2xl font-bold text-orange-600">
//                   {formatCurrency(booking.totalAmount - booking.paidAmount)}
//                 </div>
//                 <div className="text-sm text-gray-600">Pending Amount</div>
//               </div>
//             </div>
//           </Card>

//           {/* Contact Details */}
//           {booking.contactDetails && booking.contactDetails.primaryContact && (
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-3">Primary Contact</h4>
//                   <div className="space-y-2">
//                     <div className="flex items-center text-gray-600">
//                       <span className="font-medium w-20">Name:</span>
//                       <span>{booking.contactDetails.primaryContact.name || 'Not provided'}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <Phone className="w-4 h-4 mr-2" />
//                       <span>{booking.contactDetails.primaryContact.phone || 'Not provided'}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <Mail className="w-4 h-4 mr-2" />
//                       <span>{booking.contactDetails.primaryContact.email || 'Not provided'}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <span className="font-medium w-20">Relation:</span>
//                       <span className="capitalize">{booking.contactDetails.primaryContact.relation || 'Not provided'}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {booking.contactDetails.emergencyContact && (
//                   <div>
//                     <h4 className="font-medium text-gray-900 mb-3">Emergency Contact</h4>
//                     <div className="space-y-2">
//                       <div className="flex items-center text-gray-600">
//                         <span className="font-medium w-20">Name:</span>
//                         <span>{booking.contactDetails.emergencyContact.name || 'Not provided'}</span>
//                       </div>
//                       <div className="flex items-center text-gray-600">
//                         <Phone className="w-4 h-4 mr-2" />
//                         <span>{booking.contactDetails.emergencyContact.phone || 'Not provided'}</span>
//                       </div>
//                       <div className="flex items-center text-gray-600">
//                         <span className="font-medium w-20">Relation:</span>
//                         <span className="capitalize">{booking.contactDetails.emergencyContact.relation || 'Not provided'}</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </Card>
//           )}

//           {/* Traveler Details */}
//           {booking.travelerDetails && booking.travelerDetails.length > 0 && (
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                 <Users className="w-5 h-5 mr-2" />
//                 Traveler Details
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Name
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Age
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Gender
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {booking.travelerDetails.map((traveler, index) => (
//                       <tr key={index}>
//                         <td className="px-4 py-3 text-sm font-medium text-gray-900">
//                           {traveler.name || 'Not provided'}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-600">
//                           {traveler.age ? `${traveler.age} years` : 'Not provided'}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-600 capitalize">
//                           {traveler.gender || 'Not provided'}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </Card>
//           )}

//           {/* Special Requests */}
//           {booking.specialRequests && (
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                 <FileText className="w-5 h-5 mr-2" />
//                 Special Requests
//               </h3>
//               <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
//                 {booking.specialRequests}
//               </p>
//             </Card>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
//           <Button variant="ghost" onClick={onClose}>
//             Close
//           </Button>
//           <Button 
//             onClick={handleDownloadInvoice}
//             className="bg-orange-600 hover:bg-orange-700"
//           >
//             Download Invoice
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingDetailsModal;










// import React, { useState } from 'react';
// import { 
//   X, 
//   MapPin, 
//   Users, 
//   Clock, 
//   IndianRupee, 
//   Phone, 
//   Mail, 
//   FileText,
//   CheckCircle,
//   AlertCircle,
//   XCircle
// } from 'lucide-react';
// import Image from 'next/image';
// import { downloadInvoicePDF } from '@/utils/invoiceGenerator';
// import Button from '@/components/ui/Button';
// import Card from '@/components/ui/Card';

// interface BookingDetailsModalProps {
//   booking: {
//     _id: string;
//     packageId: {
//       _id: string;
//       title: string;
//       destination: string;
//       images: string[];
//       duration: number;
//       description?: string;
//     };
//     userId: string;
//     bookingDate: string;
//     startDate: string;
//     endDate: string;
//     numberOfTravelers: number;
//     totalAmount: number;
//     paidAmount: number;
//     status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
//     bookingReference: string;
//     specialRequests?: string;
//     contactDetails?: {
//       primaryContact: {
//         name: string;
//         phone: string;
//         email: string;
//         relation: string;
//       };
//       emergencyContact?: {
//         name: string;
//         phone: string;
//         relation: string;
//       };
//     };
//     travelerDetails?: Array<{
//       name: string;
//       age: number;
//       gender: string;
//     }>;
//     createdAt: string;
//     updatedAt: string;
//   };
//   isOpen: boolean;
//   onClose: () => void;
// }

// const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ booking, isOpen, onClose }) => {
//   const [error, setError] = useState<string>('');

//   if (!isOpen) return null;

//   const formatCurrency = (amount: number) => {
//     return `₹${amount.toLocaleString('en-IN')}`;
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatDateTime = (dateString: string) => {
//     return new Date(dateString).toLocaleString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'pending': return 'text-yellow-800 bg-yellow-100';
//       case 'confirmed': return 'text-blue-800 bg-blue-100';
//       case 'completed': return 'text-green-800 bg-green-100';
//       case 'cancelled': return 'text-red-800 bg-red-100';
//       default: return 'text-gray-800 bg-gray-100';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'pending': return <Clock className="w-4 h-4" />;
//       case 'confirmed': return <CheckCircle className="w-4 h-4" />;
//       case 'completed': return <CheckCircle className="w-4 h-4" />;
//       case 'cancelled': return <XCircle className="w-4 h-4" />;
//       default: return <AlertCircle className="w-4 h-4" />;
//     }
//   };

//   const handleDownloadInvoice = () => {
//     try {
//       setError('');
//       downloadInvoicePDF(booking);
//     } catch (error: unknown) {
//       console.error('Error downloading invoice:', error);
//       setError(error instanceof Error ? error.message : 'Failed to download invoice');
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
//             <p className="text-sm text-gray-600">Reference: {booking.bookingReference}</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Error Display */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
//               <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
//               <div className="flex-1">
//                 <p className="text-sm text-red-600 font-medium">Error</p>
//                 <p className="text-sm text-red-600">{error}</p>
//                 <button
//                   onClick={() => setError('')}
//                   className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
//                 >
//                   Dismiss
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Package Information */}
//           <Card className="p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Information</h3>
//             <div className="flex items-start space-x-4">
//               {booking.packageId.images && booking.packageId.images[0] && (
//                 <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
//                   <Image
//                     src={booking.packageId.images[0]}
//                     alt={booking.packageId.title}
//                     width={128}
//                     height={128}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}
//               <div className="flex-1">
//                 <h4 className="text-xl font-semibold text-gray-900 mb-2">
//                   {booking.packageId.title}
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex items-center text-gray-600">
//                     <MapPin className="w-4 h-4 mr-2" />
//                     <span>Destination: {booking.packageId.destination}</span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <Clock className="w-4 h-4 mr-2" />
//                     <span>Duration: {booking.packageId.duration} days</span>
//                   </div>
//                 </div>
//                 {booking.packageId.description && (
//                   <p className="text-gray-600 mt-3 text-sm">{booking.packageId.description}</p>
//                 )}
//               </div>
//             </div>
//           </Card>

//           {/* Booking Status & Dates */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Status</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Status:</span>
//                   <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
//                     {getStatusIcon(booking.status)}
//                     <span className="ml-1 capitalize">{booking.status}</span>
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Booked on:</span>
//                   <span className="font-medium">{formatDate(booking.bookingDate)}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Last updated:</span>
//                   <span className="font-medium">{formatDateTime(booking.updatedAt)}</span>
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Dates</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Start Date:</span>
//                   <span className="font-medium">{formatDate(booking.startDate)}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">End Date:</span>
//                   <span className="font-medium">{formatDate(booking.endDate)}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Travelers:</span>
//                   <span className="font-medium">{booking.numberOfTravelers} persons</span>
//                 </div>
//               </div>
//             </Card>
//           </div>

//           {/* Payment Information */}
//           <Card className="p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//               <IndianRupee className="w-5 h-5 mr-2" />
//               Payment Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="text-center p-4 bg-gray-50 rounded-lg">
//                 <div className="text-2xl font-bold text-gray-900">
//                   {formatCurrency(booking.totalAmount)}
//                 </div>
//                 <div className="text-sm text-gray-600">Total Amount</div>
//               </div>
//               <div className="text-center p-4 bg-green-50 rounded-lg">
//                 <div className="text-2xl font-bold text-green-600">
//                   {formatCurrency(booking.paidAmount)}
//                 </div>
//                 <div className="text-sm text-gray-600">Paid Amount</div>
//               </div>
//               <div className="text-center p-4 bg-orange-50 rounded-lg">
//                 <div className="text-2xl font-bold text-orange-600">
//                   {formatCurrency(booking.totalAmount - booking.paidAmount)}
//                 </div>
//                 <div className="text-sm text-gray-600">Pending Amount</div>
//               </div>
//             </div>
//           </Card>

//           {/* Contact Details */}
//           {booking.contactDetails && booking.contactDetails.primaryContact && (
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-3">Primary Contact</h4>
//                   <div className="space-y-2">
//                     <div className="flex items-center text-gray-600">
//                       <span className="font-medium w-20">Name:</span>
//                       <span>{booking.contactDetails.primaryContact.name || 'Not provided'}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <Phone className="w-4 h-4 mr-2" />
//                       <span>{booking.contactDetails.primaryContact.phone || 'Not provided'}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <Mail className="w-4 h-4 mr-2" />
//                       <span>{booking.contactDetails.primaryContact.email || 'Not provided'}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <span className="font-medium w-20">Relation:</span>
//                       <span className="capitalize">{booking.contactDetails.primaryContact.relation || 'Not provided'}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {booking.contactDetails.emergencyContact && (
//                   <div>
//                     <h4 className="font-medium text-gray-900 mb-3">Emergency Contact</h4>
//                     <div className="space-y-2">
//                       <div className="flex items-center text-gray-600">
//                         <span className="font-medium w-20">Name:</span>
//                         <span>{booking.contactDetails.emergencyContact.name || 'Not provided'}</span>
//                       </div>
//                       <div className="flex items-center text-gray-600">
//                         <Phone className="w-4 h-4 mr-2" />
//                         <span>{booking.contactDetails.emergencyContact.phone || 'Not provided'}</span>
//                       </div>
//                       <div className="flex items-center text-gray-600">
//                         <span className="font-medium w-20">Relation:</span>
//                         <span className="capitalize">{booking.contactDetails.emergencyContact.relation || 'Not provided'}</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </Card>
//           )}

//           {/* Traveler Details */}
//           {booking.travelerDetails && booking.travelerDetails.length > 0 && (
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                 <Users className="w-5 h-5 mr-2" />
//                 Traveler Details
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Name
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Age
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Gender
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {booking.travelerDetails.map((traveler, index) => (
//                       <tr key={index}>
//                         <td className="px-4 py-3 text-sm font-medium text-gray-900">
//                           {traveler.name || 'Not provided'}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-600">
//                           {traveler.age ? `${traveler.age} years` : 'Not provided'}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-600 capitalize">
//                           {traveler.gender || 'Not provided'}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </Card>
//           )}

//           {/* Special Requests */}
//           {booking.specialRequests && (
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                 <FileText className="w-5 h-5 mr-2" />
//                 Special Requests
//               </h3>
//               <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
//                 {booking.specialRequests}
//               </p>
//             </Card>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
//           <Button variant="ghost" onClick={onClose}>
//             Close
//           </Button>
//           <Button 
//             onClick={handleDownloadInvoice}
//             className="bg-orange-600 hover:bg-orange-700"
//           >
//             Download Invoice
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingDetailsModal;















import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Users, 
  Clock, 
  IndianRupee, 
  Phone, 
  Mail, 
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import Image from 'next/image';
import { downloadInvoicePDF } from '@/utils/invoiceGenerator';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface BookingDetailsModalProps {
  booking: {
    _id: string;
    packageId: {
      _id: string;
      title: string;
      destination: string;
      images: string[];
      duration: number;
      description?: string;
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
    contactDetails?: {
      primaryContact: {
        name: string;
        phone: string;
        email: string;
        relation: string;
      };
      emergencyContact?: {
        name: string;
        phone: string;
        relation: string;
      };
    };
    travelerDetails?: Array<{
      name: string;
      age: number;
      gender: string;
    }>;
    createdAt: string;
    updatedAt: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ booking, isOpen, onClose }) => {
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-800 bg-yellow-100';
      case 'confirmed': return 'text-blue-800 bg-blue-100';
      case 'completed': return 'text-green-800 bg-green-100';
      case 'cancelled': return 'text-red-800 bg-red-100';
      default: return 'text-gray-800 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleDownloadInvoice = () => {
    try {
      setError('');
      downloadInvoicePDF(booking);
    } catch (error: unknown) {
      console.error('Error downloading invoice:', error);
      setError(error instanceof Error ? error.message : 'Failed to download invoice');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
            <p className="text-sm text-gray-600">Reference: {booking.bookingReference}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-600 font-medium">Error</p>
                <p className="text-sm text-red-600">{error}</p>
                <button
                  onClick={() => setError('')}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Package Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Information</h3>
            <div className="flex items-start space-x-4">
              {booking.packageId.images && booking.packageId.images[0] && (
                <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={booking.packageId.images[0]}
                    alt={booking.packageId.title}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {booking.packageId.title}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Destination: {booking.packageId.destination}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Duration: {booking.packageId.duration} days</span>
                  </div>
                </div>
                {booking.packageId.description && (
                  <p className="text-gray-600 mt-3 text-sm">{booking.packageId.description}</p>
                )}
              </div>
            </div>
          </Card>

          {/* Booking Status & Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="ml-1 capitalize">{booking.status}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Booked on:</span>
                  <span className="font-medium">{formatDate(booking.bookingDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last updated:</span>
                  <span className="font-medium">{formatDateTime(booking.updatedAt)}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Dates</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-medium">{formatDate(booking.startDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">End Date:</span>
                  <span className="font-medium">{formatDate(booking.endDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Travelers:</span>
                  <span className="font-medium">{booking.numberOfTravelers} persons</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Payment Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <IndianRupee className="w-5 h-5 mr-2" />
              Payment Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(booking.totalAmount)}
                </div>
                <div className="text-sm text-gray-600">Total Amount</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(booking.paidAmount)}
                </div>
                <div className="text-sm text-gray-600">Paid Amount</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {formatCurrency(booking.totalAmount - booking.paidAmount)}
                </div>
                <div className="text-sm text-gray-600">Pending Amount</div>
              </div>
            </div>
          </Card>

          {/* Contact Details */}
          {booking.contactDetails && booking.contactDetails.primaryContact && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Primary Contact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium w-20">Name:</span>
                      <span>{booking.contactDetails.primaryContact.name || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{booking.contactDetails.primaryContact.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{booking.contactDetails.primaryContact.email || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium w-20">Relation:</span>
                      <span className="capitalize">{booking.contactDetails.primaryContact.relation || 'Not provided'}</span>
                    </div>
                  </div>
                </div>

                {booking.contactDetails.emergencyContact && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Emergency Contact</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <span className="font-medium w-20">Name:</span>
                        <span>{booking.contactDetails.emergencyContact.name || 'Not provided'}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{booking.contactDetails.emergencyContact.phone || 'Not provided'}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="font-medium w-20">Relation:</span>
                        <span className="capitalize">{booking.contactDetails.emergencyContact.relation || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Traveler Details */}
          {booking.travelerDetails && booking.travelerDetails.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Traveler Details
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {booking.travelerDetails.map((traveler, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {traveler.name || 'Not provided'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {traveler.age ? `${traveler.age} years` : 'Not provided'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                          {traveler.gender || 'Not provided'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Special Requests */}
          {booking.specialRequests && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Special Requests
              </h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                {booking.specialRequests}
              </p>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button 
            onClick={handleDownloadInvoice}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Download Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;