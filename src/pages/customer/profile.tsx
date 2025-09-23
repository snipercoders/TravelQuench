// // src/pages/customer/profile.tsx
// import React, { useState, useEffect } from 'react';
// import { useRequireAuth } from '@/hooks/useAuth';
// import Head from 'next/head';
// import Layout from '@/components/layout/Layout';
// import { 
//   User, 
//   Mail, 
//   Phone, 
//   Calendar, 
//   MapPin, 
//   Edit3, 
//   Save, 
//   X, 
//   Camera,
//   Shield,
//   AlertCircle,
//   CheckCircle,
//   RefreshCw,
//   Key,
//   Eye,
//   EyeOff
// } from 'lucide-react';
// import Button from '@/components/ui/Button';
// import Card from '@/components/ui/Card';
// import Input from '@/components/ui/Input';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';

// interface UserProfile {
//   _id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   isEmailVerified: boolean;
//   emailVerificationToken?: string;
//   emailVerificationExpiry?: Date;
//   role: string;
//   profileImage?: string;
//   address?: {
//     street?: string;
//     city?: string;
//     state?: string;
//     country?: string;
//     pincode?: string;
//   };
//   preferences?: {
//     currency?: string;
//     language?: string;
//     notifications?: {
//       email?: boolean;
//       sms?: boolean;
//       whatsapp?: boolean;
//     };
//   };
//   lastLoginAt?: Date;
//   createdAt: string;
//   updatedAt: string;
// }

// const CustomerProfile: React.FC = () => {
//   const { isLoading, user } = useRequireAuth('/auth/login');
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string>('');
//   const [success, setSuccess] = useState<string>('');
//   const [showPasswordChange, setShowPasswordChange] = useState(false);

//   // Form states
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     address: {
//       street: '',
//       city: '',
//       state: '',
//       country: 'India',
//       pincode: ''
//     },
//     preferences: {
//       currency: 'INR',
//       language: 'en',
//       notifications: {
//         email: true,
//         sms: false,
//         whatsapp: false
//       }
//     }
//   });

//   // Password change states
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [showPasswords, setShowPasswords] = useState({
//     current: false,
//     new: false,
//     confirm: false
//   });

//   useEffect(() => {
//     if (user) {
//       fetchProfile();
//     }
//   }, [user]);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       setError('');
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch('/api/users/profile', {
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
//         throw new Error(`Failed to fetch profile: ${response.status}`);
//       }

//       const data = await response.json();
//       const profileData = data.user || data;
      
//       setProfile(profileData);
//       setFormData({
//         name: profileData.name || '',
//         phone: profileData.phone || '',
//         address: {
//           street: profileData.address?.street || '',
//           city: profileData.address?.city || '',
//           state: profileData.address?.state || '',
//           country: profileData.address?.country || 'India',
//           pincode: profileData.address?.pincode || ''
//         },
//         preferences: {
//           currency: profileData.preferences?.currency || 'INR',
//           language: profileData.preferences?.language || 'en',
//           notifications: {
//             email: profileData.preferences?.notifications?.email !== false,
//             sms: profileData.preferences?.notifications?.sms || false,
//             whatsapp: profileData.preferences?.notifications?.whatsapp || false
//           }
//         }
//       });
//     } catch (error: any) {
//       console.error('Error fetching profile:', error);
//       setError(error.message || 'Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveProfile = async () => {
//     try {
//       setSaving(true);
//       setError('');
//       setSuccess('');
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch('/api/users/profile', {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) {
//         let errorMessage = 'Failed to update profile';
//         try {
//           const errorData = await response.json();
//           errorMessage = errorData.message || errorMessage;
//         } catch (parseError) {
//           console.error('Error parsing response:', parseError);
//         }
//         throw new Error(errorMessage);
//       }

//       const data = await response.json();

//       setProfile(data.user);
//       setIsEditing(false);
//       setSuccess('Profile updated successfully');
      
//       // Auto-hide success message after 3 seconds
//       setTimeout(() => setSuccess(''), 3000);

//     } catch (error: any) {
//       console.error('Error updating profile:', error);
//       setError(error.message || 'Failed to update profile');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handlePasswordChange = async () => {
//     try {
//       if (passwordData.newPassword !== passwordData.confirmPassword) {
//         setError('New passwords do not match');
//         return;
//       }

//       if (passwordData.newPassword.length < 8) {
//         setError('New password must be at least 8 characters long');
//         return;
//       }

//       setSaving(true);
//       setError('');
//       setSuccess('');
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch('/api/users/change-password', {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           currentPassword: passwordData.currentPassword,
//           newPassword: passwordData.newPassword
//         })
//       });

//       if (!response.ok) {
//         let errorMessage = 'Failed to change password';
//         try {
//           const errorData = await response.json();
//           errorMessage = errorData.message || errorMessage;
//         } catch (parseError) {
//           console.error('Error parsing response:', parseError);
//         }
//         throw new Error(errorMessage);
//       }

//       const data = await response.json();

//       setPasswordData({
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//       });
//       setShowPasswordChange(false);
//       setSuccess('Password changed successfully');
      
//       // Auto-hide success message after 3 seconds
//       setTimeout(() => setSuccess(''), 3000);

//     } catch (error: any) {
//       console.error('Error changing password:', error);
//       setError(error.message || 'Failed to change password');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleInputChange = (field: string, value: any) => {
//     if (field.includes('.')) {
//       const [parent, child] = field.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent as keyof typeof prev],
//           [child]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [field]: value
//       }));
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   if (isLoading || loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 pt-20">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <LoadingSpinner />
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   if (!profile) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 pt-20">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <Card className="text-center py-12">
//               <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Not Found</h3>
//               <p className="text-gray-600 mb-6">Unable to load your profile information.</p>
//               <Button onClick={fetchProfile}>Try Again</Button>
//             </Card>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>My Profile - Travel Quench</title>
//         <meta name="description" content="Manage your Travel Quench profile" />
//       </Head>

//       <Layout>
//         <div className="min-h-screen bg-gray-50 pt-20">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             {/* Header */}
//             <div className="mb-8">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
//                   <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
//                 </div>
//                 <div className="flex space-x-3">
//                   <Button
//                     onClick={fetchProfile}
//                     variant="ghost"
//                     size="sm"
//                     className="flex items-center space-x-2"
//                   >
//                     <RefreshCw className="w-4 h-4" />
//                     <span>Refresh</span>
//                   </Button>
//                   {!isEditing && (
//                     <Button
//                       onClick={() => setIsEditing(true)}
//                       className="flex items-center space-x-2"
//                     >
//                       <Edit3 className="w-4 h-4" />
//                       <span>Edit Profile</span>
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Status Messages */}
//             {error && (
//               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
//                 <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
//                 <div className="flex-1">
//                   <p className="text-sm text-red-600">{error}</p>
//                   <button
//                     onClick={() => setError('')}
//                     className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
//                   >
//                     Dismiss
//                   </button>
//                 </div>
//               </div>
//             )}

//             {success && (
//               <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
//                 <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
//                 <div className="flex-1">
//                   <p className="text-sm text-green-600">{success}</p>
//                 </div>
//               </div>
//             )}

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Profile Summary Card */}
//               <div className="lg:col-span-1">
//                 <Card className="text-center p-6">
//                   <div className="relative inline-block mb-4">
//                     <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto">
//                       {profile.profileImage ? (
//                         <img
//                           src={profile.profileImage}
//                           alt="Profile"
//                           className="w-full h-full rounded-full object-cover"
//                         />
//                       ) : (
//                         <span className="text-white text-2xl font-bold">
//                           {profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
//                         </span>
//                       )}
//                     </div>
//                     <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50">
//                       <Camera className="w-4 h-4 text-gray-600" />
//                     </button>
//                   </div>
                  
//                   <h3 className="text-xl font-semibold text-gray-900 mb-1">
//                     {profile.name}
//                   </h3>
//                   <p className="text-gray-600 mb-2">{profile.email}</p>
                  
//                   <div className="flex items-center justify-center space-x-2 mb-4">
//                     {profile.role === 'admin' && (
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                         <Shield className="w-3 h-3 mr-1" />
//                         Admin
//                       </span>
//                     )}
//                     <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                       profile.isEmailVerified 
//                         ? 'bg-green-100 text-green-800' 
//                         : 'bg-yellow-100 text-yellow-800'
//                     }`}>
//                       {profile.isEmailVerified ? 'Verified' : 'Unverified'}
//                     </span>
//                   </div>

//                   <p className="text-sm text-gray-500">
//                     Member since {formatDate(profile.createdAt)}
//                   </p>

//                   <div className="mt-6 pt-6 border-t border-gray-200">
//                     <Button
//                       onClick={() => setShowPasswordChange(!showPasswordChange)}
//                       variant="ghost"
//                       size="sm"
//                       className="w-full flex items-center justify-center space-x-2"
//                     >
//                       <Key className="w-4 h-4" />
//                       <span>Change Password</span>
//                     </Button>
//                   </div>
//                 </Card>
//               </div>

//               {/* Profile Details Card */}
//               <div className="lg:col-span-2">
//                 <Card className="p-6">
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
//                     {isEditing && (
//                       <div className="flex space-x-2">
//                         <Button
//                           onClick={() => {
//                             setIsEditing(false);
//                             setError('');
//                             fetchProfile(); // Reset form data
//                           }}
//                           variant="ghost"
//                           size="sm"
//                           className="flex items-center space-x-1"
//                         >
//                           <X className="w-4 h-4" />
//                           <span>Cancel</span>
//                         </Button>
//                         <Button
//                           onClick={handleSaveProfile}
//                           disabled={saving}
//                           size="sm"
//                           className="flex items-center space-x-1"
//                         >
//                           <Save className="w-4 h-4" />
//                           <span>{saving ? 'Saving...' : 'Save'}</span>
//                         </Button>
//                       </div>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Basic Information */}
//                     <div className="md:col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Full Name
//                       </label>
//                       {isEditing ? (
//                         <Input
//                           value={formData.name}
//                           onChange={(e) => handleInputChange('name', e.target.value)}
//                           placeholder="Enter full name"
//                         />
//                       ) : (
//                         <p className="text-gray-900">{profile.name || 'Not provided'}</p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email Address
//                       </label>
//                       <div className="flex items-center space-x-2">
//                         <Mail className="w-4 h-4 text-gray-400" />
//                         <p className="text-gray-900">{profile.email}</p>
//                       </div>
//                       <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Phone Number
//                       </label>
//                       {isEditing ? (
//                         <Input
//                           value={formData.phone}
//                           onChange={(e) => handleInputChange('phone', e.target.value)}
//                           placeholder="Enter 10-digit phone number"
//                           type="tel"
//                         />
//                       ) : (
//                         <div className="flex items-center space-x-2">
//                           <Phone className="w-4 h-4 text-gray-400" />
//                           <p className="text-gray-900">{profile.phone || 'Not provided'}</p>
//                         </div>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Account Status
//                       </label>
//                       <div className="flex items-center space-x-4">
//                         <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                           profile.isEmailVerified 
//                             ? 'bg-green-100 text-green-800' 
//                             : 'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {profile.isEmailVerified ? 'Email Verified' : 'Email Not Verified'}
//                         </span>
//                         {profile.lastLoginAt && (
//                           <span className="text-sm text-gray-500">
//                             Last login: {formatDate(profile.lastLoginAt.toString())}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Address Information */}
//                   <div className="mt-8 pt-8 border-t border-gray-200">
//                     <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
//                       <MapPin className="w-4 h-4 mr-2" />
//                       Address Information
//                     </h4>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Street Address
//                         </label>
//                         {isEditing ? (
//                           <Input
//                             value={formData.address.street}
//                             onChange={(e) => handleInputChange('address.street', e.target.value)}
//                             placeholder="Enter street address"
//                           />
//                         ) : (
//                           <p className="text-gray-900">{profile.address?.street || 'Not provided'}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           City
//                         </label>
//                         {isEditing ? (
//                           <Input
//                             value={formData.address.city}
//                             onChange={(e) => handleInputChange('address.city', e.target.value)}
//                             placeholder="Enter city"
//                           />
//                         ) : (
//                           <p className="text-gray-900">{profile.address?.city || 'Not provided'}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           State
//                         </label>
//                         {isEditing ? (
//                           <Input
//                             value={formData.address.state}
//                             onChange={(e) => handleInputChange('address.state', e.target.value)}
//                             placeholder="Enter state"
//                           />
//                         ) : (
//                           <p className="text-gray-900">{profile.address?.state || 'Not provided'}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Country
//                         </label>
//                         {isEditing ? (
//                           <Input
//                             value={formData.address.country}
//                             onChange={(e) => handleInputChange('address.country', e.target.value)}
//                             placeholder="Enter country"
//                           />
//                         ) : (
//                           <p className="text-gray-900">{profile.address?.country || 'Not provided'}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Pincode
//                         </label>
//                         {isEditing ? (
//                           <Input
//                             value={formData.address.pincode}
//                             onChange={(e) => handleInputChange('address.pincode', e.target.value)}
//                             placeholder="Enter pincode"
//                           />
//                         ) : (
//                           <p className="text-gray-900">{profile.address?.pincode || 'Not provided'}</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Preferences */}
//                   <div className="mt-8 pt-8 border-t border-gray-200">
//                     <h4 className="text-md font-semibold text-gray-900 mb-4">
//                       Preferences & Settings
//                     </h4>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Currency
//                         </label>
//                         {isEditing ? (
//                           <select
//                             value={formData.preferences.currency}
//                             onChange={(e) => handleInputChange('preferences.currency', e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                           >
//                             <option value="INR">INR - Indian Rupee</option>
//                             <option value="USD">USD - US Dollar</option>
//                             <option value="EUR">EUR - Euro</option>
//                             <option value="GBP">GBP - British Pound</option>
//                           </select>
//                         ) : (
//                           <p className="text-gray-900">{profile.preferences?.currency || 'INR'}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Language
//                         </label>
//                         {isEditing ? (
//                           <select
//                             value={formData.preferences.language}
//                             onChange={(e) => handleInputChange('preferences.language', e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                           >
//                             <option value="en">English</option>
//                             <option value="hi">Hindi</option>
//                             <option value="bn">Bengali</option>
//                             <option value="te">Telugu</option>
//                             <option value="ta">Tamil</option>
//                           </select>
//                         ) : (
//                           <p className="text-gray-900 capitalize">{profile.preferences?.language || 'English'}</p>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div className="space-y-4">
//                       <h5 className="text-sm font-medium text-gray-700">Notification Preferences</h5>
                      
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <label className="text-sm font-medium text-gray-700">Email Notifications</label>
//                           <p className="text-xs text-gray-500">Receive booking updates and offers via email</p>
//                         </div>
//                         <input
//                           type="checkbox"
//                           checked={isEditing ? formData.preferences.notifications.email : profile.preferences?.notifications?.email}
//                           onChange={(e) => isEditing && handleInputChange('preferences.notifications.email', e.target.checked)}
//                           disabled={!isEditing}
//                           className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                         />
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <label className="text-sm font-medium text-gray-700">SMS Notifications</label>
//                           <p className="text-xs text-gray-500">Receive important updates via SMS</p>
//                         </div>
//                         <input
//                           type="checkbox"
//                           checked={isEditing ? formData.preferences.notifications.sms : profile.preferences?.notifications?.sms}
//                           onChange={(e) => isEditing && handleInputChange('preferences.notifications.sms', e.target.checked)}
//                           disabled={!isEditing}
//                           className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                         />
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <label className="text-sm font-medium text-gray-700">WhatsApp Notifications</label>
//                           <p className="text-xs text-gray-500">Receive updates via WhatsApp</p>
//                         </div>
//                         <input
//                           type="checkbox"
//                           checked={isEditing ? formData.preferences.notifications.whatsapp : profile.preferences?.notifications?.whatsapp}
//                           onChange={(e) => isEditing && handleInputChange('preferences.notifications.whatsapp', e.target.checked)}
//                           disabled={!isEditing}
//                           className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               </div>
//             </div>

//             {/* Password Change Modal */}
//             {showPasswordChange && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                 <Card className="w-full max-w-md p-6">
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
//                     <button
//                       onClick={() => {
//                         setShowPasswordChange(false);
//                         setPasswordData({
//                           currentPassword: '',
//                           newPassword: '',
//                           confirmPassword: ''
//                         });
//                         setError('');
//                       }}
//                       className="text-gray-400 hover:text-gray-600"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Current Password
//                       </label>
//                       <div className="relative">
//                         <Input
//                           type={showPasswords.current ? 'text' : 'password'}
//                           value={passwordData.currentPassword}
//                           onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
//                           placeholder="Enter current password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                           {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         New Password
//                       </label>
//                       <div className="relative">
//                         <Input
//                           type={showPasswords.new ? 'text' : 'password'}
//                           value={passwordData.newPassword}
//                           onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
//                           placeholder="Enter new password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                           {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Confirm New Password
//                       </label>
//                       <div className="relative">
//                         <Input
//                           type={showPasswords.confirm ? 'text' : 'password'}
//                           value={passwordData.confirmPassword}
//                           onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
//                           placeholder="Confirm new password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                           {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-6 flex space-x-3">
//                     <Button
//                       onClick={() => {
//                         setShowPasswordChange(false);
//                         setPasswordData({
//                           currentPassword: '',
//                           newPassword: '',
//                           confirmPassword: ''
//                         });
//                         setError('');
//                       }}
//                       variant="ghost"
//                       className="flex-1"
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       onClick={handlePasswordChange}
//                       disabled={saving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
//                       className="flex-1"
//                     >
//                       {saving ? 'Changing...' : 'Change Password'}
//                     </Button>
//                   </div>
//                 </Card>
//               </div>
//             )}
//           </div>
//         </div>
//       </Layout>
//     </>
//   );
// };

// export default CustomerProfile;










// import React, { useState, useEffect } from 'react';
// import { useRequireAuth } from '@/hooks/useAuth';
// import Head from 'next/head';
// import Layout from '@/components/layout/Layout';
// import { 
//   User, 
//   Mail, 
//   Phone, 
//   Calendar, 
//   MapPin, 
//   Edit3, 
//   Save, 
//   X,
//   Shield,
//   AlertCircle,
//   CheckCircle,
//   RefreshCw,
//   Key,
//   Eye,
//   EyeOff
// } from 'lucide-react';
// import Button from '@/components/ui/Button';
// import Card from '@/components/ui/Card';
// import Input from '@/components/ui/Input';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';

// interface UserProfile {
//   _id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   isEmailVerified: boolean;
//   emailVerificationToken?: string;
//   emailVerificationExpiry?: Date;
//   role: string;
//   profileImage?: string;
//   address?: {
//     street?: string;
//     city?: string;
//     state?: string;
//     country?: string;
//     pincode?: string;
//   };
//   preferences?: {
//     currency?: string;
//     language?: string;
//     notifications?: {
//       email?: boolean;
//       sms?: boolean;
//       whatsapp?: boolean;
//     };
//   };
//   lastLoginAt?: Date;
//   createdAt: string;
//   updatedAt: string;
// }

// const CustomerProfile: React.FC = () => {
//   const { isLoading, user } = useRequireAuth('/auth/login');
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string>('');
//   const [success, setSuccess] = useState<string>('');
//   const [showPasswordChange, setShowPasswordChange] = useState(false);

//   // Form states
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     address: {
//       street: '',
//       city: '',
//       state: '',
//       country: 'India',
//       pincode: ''
//     },
//     preferences: {
//       currency: 'INR',
//       language: 'en',
//       notifications: {
//         email: true,
//         sms: false,
//         whatsapp: false
//       }
//     }
//   });

//   // Password change states
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [showPasswords, setShowPasswords] = useState({
//     current: false,
//     new: false,
//     confirm: false
//   });

//   useEffect(() => {
//     if (user) {
//       fetchProfile();
//     }
//   }, [user]);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       setError('');
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch('/api/users/profile', {
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
//         throw new Error(`Failed to fetch profile: ${response.status}`);
//       }

//       const data = await response.json();
//       const profileData = data.user || data;
      
//       setProfile(profileData);
//       setFormData({
//         name: profileData.name || '',
//         phone: profileData.phone || '',
//         address: {
//           street: profileData.address?.street || '',
//           city: profileData.address?.city || '',
//           state: profileData.address?.state || '',
//           country: profileData.address?.country || 'India',
//           pincode: profileData.address?.pincode || ''
//         },
//         preferences: {
//           currency: profileData.preferences?.currency || 'INR',
//           language: profileData.preferences?.language || 'en',
//           notifications: {
//             email: profileData.preferences?.notifications?.email !== false,
//             sms: profileData.preferences?.notifications?.sms || false,
//             whatsapp: profileData.preferences?.notifications?.whatsapp || false
//           }
//         }
//       });
//     } catch (error: any) {
//       console.error('Error fetching profile:', error);
//       setError(error.message || 'Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveProfile = async () => {
//     try {
//       setSaving(true);
//       setError('');
//       setSuccess('');
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch('/api/users/profile', {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) {
//         let errorMessage = 'Failed to update profile';
//         try {
//           const errorData = await response.json();
//           errorMessage = errorData.message || errorMessage;
//         } catch (parseError) {
//           console.error('Error parsing response:', parseError);
//         }
//         throw new Error(errorMessage);
//       }

//       const data = await response.json();

//       setProfile(data.user);
//       setIsEditing(false);
//       setSuccess('Profile updated successfully');
      
//       // Auto-hide success message after 3 seconds
//       setTimeout(() => setSuccess(''), 3000);

//     } catch (error: any) {
//       console.error('Error updating profile:', error);
//       setError(error.message || 'Failed to update profile');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handlePasswordChange = async () => {
//     try {
//       if (passwordData.newPassword !== passwordData.confirmPassword) {
//         setError('New passwords do not match');
//         return;
//       }

//       if (passwordData.newPassword.length < 8) {
//         setError('New password must be at least 8 characters long');
//         return;
//       }

//       setSaving(true);
//       setError('');
//       setSuccess('');
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch('/api/users/change-password', {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           currentPassword: passwordData.currentPassword,
//           newPassword: passwordData.newPassword
//         })
//       });

//       if (!response.ok) {
//         let errorMessage = 'Failed to change password';
//         try {
//           const errorData = await response.json();
//           errorMessage = errorData.message || errorMessage;
//         } catch (parseError) {
//           console.error('Error parsing response:', parseError);
//         }
//         throw new Error(errorMessage);
//       }

//       const data = await response.json();

//       setPasswordData({
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//       });
//       setShowPasswordChange(false);
//       setSuccess('Password changed successfully');
      
//       // Auto-hide success message after 3 seconds
//       setTimeout(() => setSuccess(''), 3000);

//     } catch (error: any) {
//       console.error('Error changing password:', error);
//       setError(error.message || 'Failed to change password');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleInputChange = (field: string, value: any) => {
//     if (field.includes('.')) {
//       const [parent, child] = field.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent as keyof typeof prev],
//           [child]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [field]: value
//       }));
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   if (isLoading || loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 pt-20">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <LoadingSpinner />
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   if (!profile) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 pt-20">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <Card className="text-center py-12">
//               <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Not Found</h3>
//               <p className="text-gray-600 mb-6">Unable to load your profile information.</p>
//               <Button onClick={fetchProfile}>Try Again</Button>
//             </Card>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>My Profile - Travel Quench</title>
//         <meta name="description" content="Manage your Travel Quench profile" />
//       </Head>

//       <Layout>
//         <div className="min-h-screen bg-gray-50 pt-20">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             {/* Header */}
//             <div className="mb-8">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
//                   <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
//                 </div>
//                 <div className="flex space-x-3">
//                   <Button
//                     onClick={fetchProfile}
//                     variant="ghost"
//                     size="sm"
//                     className="flex items-center space-x-2"
//                   >
//                     <RefreshCw className="w-4 h-4" />
//                     <span>Refresh</span>
//                   </Button>
//                   {!isEditing && (
//                     <Button
//                       onClick={() => setIsEditing(true)}
//                       className="flex items-center space-x-2"
//                     >
//                       <Edit3 className="w-4 h-4" />
//                       <span>Edit Profile</span>
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Status Messages */}
//             {error && (
//               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
//                 <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
//                 <div className="flex-1">
//                   <p className="text-sm text-red-600">{error}</p>
//                   <button
//                     onClick={() => setError('')}
//                     className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
//                   >
//                     Dismiss
//                   </button>
//                 </div>
//               </div>
//             )}

//             {success && (
//               <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
//                 <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
//                 <div className="flex-1">
//                   <p className="text-sm text-green-600">{success}</p>
//                 </div>
//               </div>
//             )}

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Profile Summary Card */}
//               <div className="lg:col-span-1">
//                 <Card className="text-center p-6">
//                   <div className="relative inline-block mb-4">
//                     <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto">
//                       {profile.profileImage ? (
//                         <img
//                           src={profile.profileImage}
//                           alt="Profile"
//                           className="w-full h-full rounded-full object-cover"
//                         />
//                       ) : (
//                         <span className="text-white text-2xl font-bold">
//                           {profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
//                         </span>
//                       )}
//                     </div>
//                   </div>
                  
//                   <h3 className="text-xl font-semibold text-gray-900 mb-1">
//                     {profile.name}
//                   </h3>
//                   <p className="text-gray-600 mb-2">{profile.email}</p>
                  
//                   <div className="flex items-center justify-center space-x-2 mb-4">
//                     {profile.role === 'admin' && (
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                         <Shield className="w-3 h-3 mr-1" />
//                         Admin
//                       </span>
//                     )}
//                     {profile.isEmailVerified && (
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                         Verified
//                       </span>
//                     )}
//                   </div>

//                   <p className="text-sm text-gray-500">
//                     Member since {formatDate(profile.createdAt)}
//                   </p>

//                   <div className="mt-6 pt-6 border-t border-gray-200">
//                     <Button
//                       onClick={() => setShowPasswordChange(!showPasswordChange)}
//                       variant="ghost"
//                       size="sm"
//                       className="w-full flex items-center justify-center space-x-2"
//                     >
//                       <Key className="w-4 h-4" />
//                       <span>Change Password</span>
//                     </Button>
//                   </div>
//                 </Card>
//               </div>

//               {/* Profile Details Card */}
//               <div className="lg:col-span-2">
//                 <Card className="p-6">
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
//                     {isEditing && (
//                       <div className="flex space-x-2">
//                         <Button
//                           onClick={() => {
//                             setIsEditing(false);
//                             setError('');
//                             fetchProfile(); // Reset form data
//                           }}
//                           variant="ghost"
//                           size="sm"
//                           className="flex items-center space-x-1"
//                         >
//                           <X className="w-4 h-4" />
//                           <span>Cancel</span>
//                         </Button>
//                         <Button
//                           onClick={handleSaveProfile}
//                           disabled={saving}
//                           size="sm"
//                           className="flex items-center space-x-1"
//                         >
//                           <Save className="w-4 h-4" />
//                           <span>{saving ? 'Saving...' : 'Save'}</span>
//                         </Button>
//                       </div>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Basic Information */}
//                     <div className="md:col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Full Name
//                       </label>
//                       {isEditing ? (
//                         <Input
//                           value={formData.name}
//                           onChange={(e) => handleInputChange('name', e.target.value)}
//                           placeholder="Enter full name"
//                         />
//                       ) : (
//                         <p className="text-gray-900">{profile.name || 'Not provided'}</p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email Address
//                       </label>
//                       <div className="flex items-center space-x-2">
//                         <Mail className="w-4 h-4 text-gray-400" />
//                         <p className="text-gray-900">{profile.email}</p>
//                       </div>
//                       <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Phone Number
//                       </label>
//                       {isEditing ? (
//                         <Input
//                           value={formData.phone}
//                           onChange={(e) => handleInputChange('phone', e.target.value)}
//                           placeholder="Enter 10-digit phone number"
//                           type="tel"
//                         />
//                       ) : (
//                         <div className="flex items-center space-x-2">
//                           <Phone className="w-4 h-4 text-gray-400" />
//                           <p className="text-gray-900">{profile.phone || 'Not provided'}</p>
//                         </div>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Account Status
//                       </label>
//                       <div className="flex items-center space-x-4">
//                         <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                           profile.isEmailVerified 
//                             ? 'bg-green-100 text-green-800' 
//                             : 'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {profile.isEmailVerified ? 'Email Verified' : 'Email Not Verified'}
//                         </span>
//                         {profile.lastLoginAt && (
//                           <span className="text-sm text-gray-500">
//                             Last login: {formatDate(profile.lastLoginAt.toString())}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Address Information */}
//                   <div className="mt-8 pt-8 border-t border-gray-200">
//                     <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
//                       <MapPin className="w-4 h-4 mr-2" />
//                       Address Information
//                     </h4>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Street Address
//                         </label>
//                         {isEditing ? (
//                           <Input
//                             value={formData.address.street}
//                             onChange={(e) => handleInputChange('address.street', e.target.value)}
//                             placeholder="Enter street address"
//                           />
//                         ) : (
//                           <p className="text-gray-900">{profile.address?.street || 'Not provided'}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           City
//                         </label>
//                         {isEditing ? (
//                           <Input
//                             value={formData.address.city}
//                             onChange={(e) => handleInputChange('address.city', e.target.value)}
//                             placeholder="Enter city"
//                           />
//                         ) : (
//                           <p className="text-gray-900">{profile.address?.city || 'Not provided'}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           State
//                         </label>
//                         {isEditing ? (
//                           <Input
//                             value={formData.address.state}
//                             onChange={(e) => handleInputChange('address.state', e.target.value)}
//                             placeholder="Enter state"
//                           />
//                         ) : (
//                           <p className="text-gray-900">{profile.address?.state || 'Not provided'}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Country
//                         </label>
//                         {isEditing ? (
//                           <Input
//                             value={formData.address.country}
//                             onChange={(e) => handleInputChange('address.country', e.target.value)}
//                             placeholder="Enter country"
//                           />
//                         ) : (
//                           <p className="text-gray-900">{profile.address?.country || 'Not provided'}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Pincode
//                         </label>
//                         {isEditing ? (
//                           <Input
//                             value={formData.address.pincode}
//                             onChange={(e) => handleInputChange('address.pincode', e.target.value)}
//                             placeholder="Enter pincode"
//                           />
//                         ) : (
//                           <p className="text-gray-900">{profile.address?.pincode || 'Not provided'}</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Preferences */}
//                   <div className="mt-8 pt-8 border-t border-gray-200">
//                     <h4 className="text-md font-semibold text-gray-900 mb-4">
//                       Preferences & Settings
//                     </h4>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Currency
//                         </label>
//                         {isEditing ? (
//                           <select
//                             value={formData.preferences.currency}
//                             onChange={(e) => handleInputChange('preferences.currency', e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                           >
//                             <option value="INR">INR - Indian Rupee</option>
//                             <option value="USD">USD - US Dollar</option>
//                             <option value="EUR">EUR - Euro</option>
//                             <option value="GBP">GBP - British Pound</option>
//                           </select>
//                         ) : (
//                           <p className="text-gray-900">{profile.preferences?.currency || 'INR'}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Language
//                         </label>
//                         {isEditing ? (
//                           <select
//                             value={formData.preferences.language}
//                             onChange={(e) => handleInputChange('preferences.language', e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                           >
//                             <option value="en">English</option>
//                             <option value="hi">Hindi</option>
//                             <option value="bn">Bengali</option>
//                             <option value="te">Telugu</option>
//                             <option value="ta">Tamil</option>
//                           </select>
//                         ) : (
//                           <p className="text-gray-900 capitalize">{profile.preferences?.language || 'English'}</p>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div className="space-y-4">
//                       <h5 className="text-sm font-medium text-gray-700">Notification Preferences</h5>
                      
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <label className="text-sm font-medium text-gray-700">Email Notifications</label>
//                           <p className="text-xs text-gray-500">Receive booking updates and offers via email</p>
//                         </div>
//                         <input
//                           type="checkbox"
//                           checked={isEditing ? formData.preferences.notifications.email : profile.preferences?.notifications?.email}
//                           onChange={(e) => isEditing && handleInputChange('preferences.notifications.email', e.target.checked)}
//                           disabled={!isEditing}
//                           className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                         />
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <label className="text-sm font-medium text-gray-700">SMS Notifications</label>
//                           <p className="text-xs text-gray-500">Receive important updates via SMS</p>
//                         </div>
//                         <input
//                           type="checkbox"
//                           checked={isEditing ? formData.preferences.notifications.sms : profile.preferences?.notifications?.sms}
//                           onChange={(e) => isEditing && handleInputChange('preferences.notifications.sms', e.target.checked)}
//                           disabled={!isEditing}
//                           className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                         />
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <label className="text-sm font-medium text-gray-700">WhatsApp Notifications</label>
//                           <p className="text-xs text-gray-500">Receive updates via WhatsApp</p>
//                         </div>
//                         <input
//                           type="checkbox"
//                           checked={isEditing ? formData.preferences.notifications.whatsapp : profile.preferences?.notifications?.whatsapp}
//                           onChange={(e) => isEditing && handleInputChange('preferences.notifications.whatsapp', e.target.checked)}
//                           disabled={!isEditing}
//                           className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               </div>
//             </div>

//             {/* Password Change Modal */}
//             {showPasswordChange && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                 <Card className="w-full max-w-md p-6">
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
//                     <button
//                       onClick={() => {
//                         setShowPasswordChange(false);
//                         setPasswordData({
//                           currentPassword: '',
//                           newPassword: '',
//                           confirmPassword: ''
//                         });
//                         setError('');
//                       }}
//                       className="text-gray-400 hover:text-gray-600"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Current Password
//                       </label>
//                       <div className="relative">
//                         <Input
//                           type={showPasswords.current ? 'text' : 'password'}
//                           value={passwordData.currentPassword}
//                           onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
//                           placeholder="Enter current password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                           {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         New Password
//                       </label>
//                       <div className="relative">
//                         <Input
//                           type={showPasswords.new ? 'text' : 'password'}
//                           value={passwordData.newPassword}
//                           onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
//                           placeholder="Enter new password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                           {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Confirm New Password
//                       </label>
//                       <div className="relative">
//                         <Input
//                           type={showPasswords.confirm ? 'text' : 'password'}
//                           value={passwordData.confirmPassword}
//                           onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
//                           placeholder="Confirm new password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                           {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-6 flex space-x-3">
//                     <Button
//                       onClick={() => {
//                         setShowPasswordChange(false);
//                         setPasswordData({
//                           currentPassword: '',
//                           newPassword: '',
//                           confirmPassword: ''
//                         });
//                         setError('');
//                       }}
//                       variant="ghost"
//                       className="flex-1"
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       onClick={handlePasswordChange}
//                       disabled={saving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
//                       className="flex-1"
//                     >
//                       {saving ? 'Changing...' : 'Change Password'}
//                     </Button>
//                   </div>
//                 </Card>
//               </div>
//             )}
//           </div>
//         </div>
//       </Layout>
//     </>
//   );
// };

// export default CustomerProfile;












// import React, { useState, useEffect } from 'react';
// import { useRequireAuth } from '@/hooks/useAuth';
// import Head from 'next/head';
// import Image from 'next/image';
// import Layout from '@/components/layout/Layout';
// import { 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Edit3, 
//   Save, 
//   X,
//   Shield,
//   AlertCircle,
//   CheckCircle,
//   RefreshCw,
//   Key,
//   Eye,
//   EyeOff
// } from 'lucide-react';
// import Button from '@/components/ui/Button';
// import Card from '@/components/ui/Card';
// import Input from '@/components/ui/Input';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';

// interface ApiError {
//   message: string;
// }

// interface UserProfile {
//   _id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   isEmailVerified: boolean;
//   emailVerificationToken?: string;
//   emailVerificationExpiry?: Date;
//   role: string;
//   profileImage?: string;
//   address?: {
//     street?: string;
//     city?: string;
//     state?: string;
//     country?: string;
//     pincode?: string;
//   };
//   preferences?: {
//     currency?: string;
//     language?: string;
//     notifications?: {
//       email?: boolean;
//       sms?: boolean;
//       whatsapp?: boolean;
//     };
//   };
//   lastLoginAt?: Date;
//   createdAt: string;
//   updatedAt: string;
// }

// const CustomerProfile: React.FC = () => {
//   const { isLoading, user } = useRequireAuth('/auth/login');
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string>('');
//   const [success, setSuccess] = useState<string>('');
//   const [showPasswordChange, setShowPasswordChange] = useState(false);

//   // Form states
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     address: {
//       street: '',
//       city: '',
//       state: '',
//       country: 'India',
//       pincode: ''
//     },
//     preferences: {
//       currency: 'INR',
//       language: 'en',
//       notifications: {
//         email: true,
//         sms: false,
//         whatsapp: false
//       }
//     }
//   });

//   // Password change states
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [showPasswords, setShowPasswords] = useState({
//     current: false,
//     new: false,
//     confirm: false
//   });

//   useEffect(() => {
//     if (user) {
//       fetchProfile();
//     }
//   }, [user]);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       setError('');
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch('/api/users/profile', {
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
//         throw new Error(`Failed to fetch profile: ${response.status}`);
//       }

//       const data = await response.json();
//       const profileData = data.user || data;
      
//       setProfile(profileData);
//       setFormData({
//         name: profileData.name || '',
//         phone: profileData.phone || '',
//         address: {
//           street: profileData.address?.street || '',
//           city: profileData.address?.city || '',
//           state: profileData.address?.state || '',
//           country: profileData.address?.country || 'India',
//           pincode: profileData.address?.pincode || ''
//         },
//         preferences: {
//           currency: profileData.preferences?.currency || 'INR',
//           language: profileData.preferences?.language || 'en',
//           notifications: {
//             email: profileData.preferences?.notifications?.email !== false,
//             sms: profileData.preferences?.notifications?.sms || false,
//             whatsapp: profileData.preferences?.notifications?.whatsapp || false
//           }
//         }
//       });
//     } catch (error: unknown) {
//       console.error('Error fetching profile:', error);
//       const errorMessage = (error as ApiError)?.message || 'Failed to load profile';
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveProfile = async () => {
//     try {
//       setSaving(true);
//       setError('');
//       setSuccess('');
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch('/api/users/profile', {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) {
//         let errorMessage = 'Failed to update profile';
//         try {
//           const errorData = await response.json();
//           errorMessage = errorData.message || errorMessage;
//         } catch (parseError) {
//           console.error('Error parsing response:', parseError);
//         }
//         throw new Error(errorMessage);
//       }

//       const responseData = await response.json();
//       setProfile(responseData.user);
//       setIsEditing(false);
//       setSuccess('Profile updated successfully');
      
//       // Auto-hide success message after 3 seconds
//       setTimeout(() => setSuccess(''), 3000);

//     } catch (error: unknown) {
//       console.error('Error updating profile:', error);
//       const errorMessage = (error as ApiError)?.message || 'Failed to update profile';
//       setError(errorMessage);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handlePasswordChange = async () => {
//     try {
//       if (passwordData.newPassword !== passwordData.confirmPassword) {
//         setError('New passwords do not match');
//         return;
//       }

//       if (passwordData.newPassword.length < 8) {
//         setError('New password must be at least 8 characters long');
//         return;
//       }

//       setSaving(true);
//       setError('');
//       setSuccess('');
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch('/api/users/change-password', {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           currentPassword: passwordData.currentPassword,
//           newPassword: passwordData.newPassword
//         })
//       });

//       if (!response.ok) {
//         let errorMessage = 'Failed to change password';
//         try {
//           const errorData = await response.json();
//           errorMessage = errorData.message || errorMessage;
//         } catch (parseError) {
//           console.error('Error parsing response:', parseError);
//         }
//         throw new Error(errorMessage);
//       }

//       setPasswordData({
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//       });
//       setShowPasswordChange(false);
//       setSuccess('Password changed successfully');
      
//       // Auto-hide success message after 3 seconds
//       setTimeout(() => setSuccess(''), 3000);

//     } catch (error: unknown) {
//       console.error('Error changing password:', error);
//       const errorMessage = (error as ApiError)?.message || 'Failed to change password';
//       setError(errorMessage);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleInputChange = (field: string, value: unknown) => {
//     if (field.includes('.')) {
//       const [parent, child] = field.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent as keyof typeof prev],
//           [child]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [field]: value
//       }));
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   if (isLoading || loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 pt-20">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <LoadingSpinner />
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   if (!profile) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 pt-20">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <Card className="text-center py-12">
//               <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Not Found</h3>
//               <p className="text-gray-600 mb-6">Unable to load your profile information.</p>
//               <Button onClick={fetchProfile}>Try Again</Button>
//             </Card>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>My Profile - Travel Quench</title>
//         <meta name="description" content="Manage your Travel Quench profile" />
//       </Head>

//       <Layout>
//         <div className="min-h-screen bg-gray-50 pt-20">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             {/* Header */}
//             <div className="mb-8">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
//                   <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
//                 </div>
//                 <div className="flex space-x-3">
//                   <Button
//                     onClick={fetchProfile}
//                     variant="ghost"
//                     size="sm"
//                     className="flex items-center space-x-2"
//                   >
//                     <RefreshCw className="w-4 h-4" />
//                     <span>Refresh</span>
//                   </Button>
//                   {!isEditing && (
//                     <Button
//                       onClick={() => setIsEditing(true)}
//                       className="flex items-center space-x-2"
//                     >
//                       <Edit3 className="w-4 h-4" />
//                       <span>Edit Profile</span>
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Status Messages */}
//             {error && (
//               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
//                 <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
//                 <div className="flex-1">
//                   <p className="text-sm text-red-600">{error}</p>
//                   <button
//                     onClick={() => setError('')}
//                     className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
//                   >
//                     Dismiss
//                   </button>
//                 </div>
//               </div>
//             )}

//             {success && (
//               <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
//                 <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
//                 <div className="flex-1">
//                   <p className="text-sm text-green-600">{success}</p>
//                 </div>
//               </div>
//             )}

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Profile Summary Card */}
//               <div className="lg:col-span-1">
//                 <Card className="text-center p-6">
//                   <div className="relative inline-block mb-4">
//                     <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto relative overflow-hidden">
//                       {profile.profileImage ? (
//                         <Image
//                           src={profile.profileImage}
//                           alt="Profile"
//                           fill
//                           className="object-cover"
//                         />
//                       ) : (
//                         <span className="text-white text-2xl font-bold">
//                           {profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
//                         </span>
//                       )}
//                     </div>
//                   </div>
                  
//                   <h3 className="text-xl font-semibold text-gray-900 mb-1">
//                     {profile.name}
//                   </h3>
//                   <p className="text-gray-600 mb-2">{profile.email}</p>
                  
//                   <div className="flex items-center justify-center space-x-2 mb-4">
//                     {profile.role === 'admin' && (
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                         <Shield className="w-3 h-3 mr-1" />
//                         Admin
//                       </span>
//                     )}
//                     {profile.isEmailVerified && (
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                         Verified
//                       </span>
//                     )}
//                   </div>

//                   <p className="text-sm text-gray-500">
//                     Member since {formatDate(profile.createdAt)}
//                   </p>

//                   <div className="mt-6 pt-6 border-t border-gray-200">
//                     <Button
//                       onClick={() => setShowPasswordChange(!showPasswordChange)}
//                       variant="ghost"
//                       size="sm"
//                       className="w-full flex items-center justify-center space-x-2"
//                     >
//                       <Key className="w-4 h-4" />
//                       <span>Change Password</span>
//                     </Button>
//                   </div>
//                 </Card>
//               </div>

//               {/* Profile Details Card */}
//               <div className="lg:col-span-2">
//                 <Card className="p-6">
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
//                     {isEditing && (
//                       <div className="flex space-x-2">
//                         <Button
//                           onClick={() => {
//                             setIsEditing(false);
//                             setError('');
//                             fetchProfile(); // Reset form data
//                           }}
//                           variant="ghost"
//                           size="sm"
//                           className="flex items-center space-x-1"
//                         >
//                           <X className="w-4 h-4" />
//                           <span>Cancel</span>
//                         </Button>
//                         <Button
//                           onClick={handleSaveProfile}
//                           disabled={saving}
//                           size="sm"
//                           className="flex items-center space-x-1"
//                         >
//                           <Save className="w-4 h-4" />
//                           <span>{saving ? 'Saving...' : 'Save'}</span>
//                         </Button>
//                       </div>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Basic Information */}
//                     <div className="md:col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Full Name
//                       </label>
//                       {isEditing ? (
//                         <Input
//                           value={formData.name}
//                           onChange={(e) => handleInputChange('name', e.target.value)}
//                           placeholder="Enter full name"
//                         />
//                       ) : (
//                         <p className="text-gray-900">{profile.name || 'Not provided'}</p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email Address
//                       </label>
//                       <div className="flex items-center space-x-2">
//                         <Mail className="w-4 h-4 text-gray-400" />
//                         <p className="text-gray-900">{profile.email}</p>
//                       </div>
//                       <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Phone Number
//                       </label>
//                       {isEditing ? (
//                         <Input
//                           value={formData.phone}
//                           onChange={(e) => handleInputChange('phone', e.target.value)}
//                           placeholder="Enter 10-digit phone number"
//                           type="tel"
//                         />
//                       ) : (
//                         <div className="flex items-center space-x-2">
//                           <Phone className="w-4 h-4 text-gray-400" />
//                           <p className="text-gray-900">{profile.phone || 'Not provided'}</p>
//                         </div>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Account Status
//                       </label>
//                       <div className="flex items-center space-x-4">
//                         <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                           profile.isEmailVerified 
//                             ? 'bg-green-100 text-green-800' 
//                             : 'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {profile.isEmailVerified ? 'Email Verified' : 'Email Not Verified'}
//                         </span>
//                         {profile.lastLoginAt && (
//                           <span className="text-sm text-gray-500">
//                             Last login: {formatDate(profile.lastLoginAt.toString())}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Address Information */}
//                   <div className="mt-8 pt-8 border-t border-gray-200">
//                     <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
//                       <MapPin className="w-4 h-4 mr-2" />
//                       Address Information
//                     </h4>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Street Address
//                         </label>
//                         {isEditing ? (
//                           <Input
//                             value={formData.address.street}
//                             onChange={(e) => handleInputChange('address.street', e.target.value)}
//                             placeholder="Enter street address"
//                           />
//                         ) : (
//                           <p className="text-gray-900">{profile.address?.street || 'Not provided'}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           City
//                         </label>
//                         {isEditing ? (
//                           <Input
//                             value={formData.address.city}
//                             onChange={(e) => handleInputChange('address.city', e.target.value)}
//                             placeholder="Enter city"
//                           />
//                         ) : (
//                           <p className="text-gray-900">{profile.address?.city || 'Not provided'}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           State
//                         </label>
//                         {isEditing ? (
//                           <Input
//                             value={formData.address.state}
//                             onChange={(e) => handleInputChange('address.state', e.target.value)}
//                             placeholder="Enter state"
//                           />
//                         ) : (
//                           <p className="text-gray-900">{profile.address?.state || 'Not provided'}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Country
//                         </label>
//                         {isEditing ? (
//                           <Input
//                             value={formData.address.country}
//                             onChange={(e) => handleInputChange('address.country', e.target.value)}
//                             placeholder="Enter country"
//                           />
//                         ) : (
//                           <p className="text-gray-900">{profile.address?.country || 'Not provided'}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Pincode
//                         </label>
//                         {isEditing ? (
//                           <Input
//                             value={formData.address.pincode}
//                             onChange={(e) => handleInputChange('address.pincode', e.target.value)}
//                             placeholder="Enter pincode"
//                           />
//                         ) : (
//                           <p className="text-gray-900">{profile.address?.pincode || 'Not provided'}</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Preferences */}
//                   <div className="mt-8 pt-8 border-t border-gray-200">
//                     <h4 className="text-md font-semibold text-gray-900 mb-4">
//                       Preferences & Settings
//                     </h4>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Currency
//                         </label>
//                         {isEditing ? (
//                           <select
//                             value={formData.preferences.currency}
//                             onChange={(e) => handleInputChange('preferences.currency', e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                           >
//                             <option value="INR">INR - Indian Rupee</option>
//                             <option value="USD">USD - US Dollar</option>
//                             <option value="EUR">EUR - Euro</option>
//                             <option value="GBP">GBP - British Pound</option>
//                           </select>
//                         ) : (
//                           <p className="text-gray-900">{profile.preferences?.currency || 'INR'}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Language
//                         </label>
//                         {isEditing ? (
//                           <select
//                             value={formData.preferences.language}
//                             onChange={(e) => handleInputChange('preferences.language', e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                           >
//                             <option value="en">English</option>
//                             <option value="hi">Hindi</option>
//                             <option value="bn">Bengali</option>
//                             <option value="te">Telugu</option>
//                             <option value="ta">Tamil</option>
//                           </select>
//                         ) : (
//                           <p className="text-gray-900 capitalize">{profile.preferences?.language || 'English'}</p>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div className="space-y-4">
//                       <h5 className="text-sm font-medium text-gray-700">Notification Preferences</h5>
                      
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <label className="text-sm font-medium text-gray-700">Email Notifications</label>
//                           <p className="text-xs text-gray-500">Receive booking updates and offers via email</p>
//                         </div>
//                         <input
//                           type="checkbox"
//                           checked={isEditing ? formData.preferences.notifications.email : profile.preferences?.notifications?.email}
//                           onChange={(e) => isEditing && handleInputChange('preferences.notifications.email', e.target.checked)}
//                           disabled={!isEditing}
//                           className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                         />
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <label className="text-sm font-medium text-gray-700">SMS Notifications</label>
//                           <p className="text-xs text-gray-500">Receive important updates via SMS</p>
//                         </div>
//                         <input
//                           type="checkbox"
//                           checked={isEditing ? formData.preferences.notifications.sms : profile.preferences?.notifications?.sms}
//                           onChange={(e) => isEditing && handleInputChange('preferences.notifications.sms', e.target.checked)}
//                           disabled={!isEditing}
//                           className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                         />
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <label className="text-sm font-medium text-gray-700">WhatsApp Notifications</label>
//                           <p className="text-xs text-gray-500">Receive updates via WhatsApp</p>
//                         </div>
//                         <input
//                           type="checkbox"
//                           checked={isEditing ? formData.preferences.notifications.whatsapp : profile.preferences?.notifications?.whatsapp}
//                           onChange={(e) => isEditing && handleInputChange('preferences.notifications.whatsapp', e.target.checked)}
//                           disabled={!isEditing}
//                           className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               </div>
//             </div>

//             {/* Password Change Modal */}
//             {showPasswordChange && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                 <Card className="w-full max-w-md p-6">
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
//                     <button
//                       onClick={() => {
//                         setShowPasswordChange(false);
//                         setPasswordData({
//                           currentPassword: '',
//                           newPassword: '',
//                           confirmPassword: ''
//                         });
//                         setError('');
//                       }}
//                       className="text-gray-400 hover:text-gray-600"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Current Password
//                       </label>
//                       <div className="relative">
//                         <Input
//                           type={showPasswords.current ? 'text' : 'password'}
//                           value={passwordData.currentPassword}
//                           onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
//                           placeholder="Enter current password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                           {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         New Password
//                       </label>
//                       <div className="relative">
//                         <Input
//                           type={showPasswords.new ? 'text' : 'password'}
//                           value={passwordData.newPassword}
//                           onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
//                           placeholder="Enter new password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                           {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Confirm New Password
//                       </label>
//                       <div className="relative">
//                         <Input
//                           type={showPasswords.confirm ? 'text' : 'password'}
//                           value={passwordData.confirmPassword}
//                           onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
//                           placeholder="Confirm new password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                           {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-6 flex space-x-3">
//                     <Button
//                       onClick={() => {
//                         setShowPasswordChange(false);
//                         setPasswordData({
//                           currentPassword: '',
//                           newPassword: '',
//                           confirmPassword: ''
//                         });
//                         setError('');
//                       }}
//                       variant="ghost"
//                       className="flex-1"
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       onClick={handlePasswordChange}
//                       disabled={saving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
//                       className="flex-1"
//                     >
//                       {saving ? 'Changing...' : 'Change Password'}
//                     </Button>
//                   </div>
//                 </Card>
//               </div>
//             )}
//           </div>
//         </div>
//       </Layout>
//     </>
//   );
// };

// export default CustomerProfile;







import React, { useState, useEffect } from 'react';
import { useRequireAuth } from '@/hooks/useAuth';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X,
  Shield,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Key,
  Eye,
  EyeOff
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ApiError {
  message: string;
}

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date;
  role: string;
  profileImage?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
  };
  preferences?: {
    currency?: string;
    language?: string;
    notifications?: {
      email?: boolean;
      sms?: boolean;
      whatsapp?: boolean;
    };
  };
  lastLoginAt?: Date;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  name: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  preferences: {
    currency: string;
    language: string;
    notifications: {
      email: boolean;
      sms: boolean;
      whatsapp: boolean;
    };
  };
}

const CustomerProfile: React.FC = () => {
  const { isLoading, user } = useRequireAuth('/auth/login');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  // Form states
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: 'India',
      pincode: ''
    },
    preferences: {
      currency: 'INR',
      language: 'en',
      notifications: {
        email: true,
        sms: false,
        whatsapp: false
      }
    }
  });

  // Password change states
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/users/profile', {
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
        throw new Error(`Failed to fetch profile: ${response.status}`);
      }

      const data = await response.json();
      const profileData = data.user || data;
      
      setProfile(profileData);
      setFormData({
        name: profileData.name || '',
        phone: profileData.phone || '',
        address: {
          street: profileData.address?.street || '',
          city: profileData.address?.city || '',
          state: profileData.address?.state || '',
          country: profileData.address?.country || 'India',
          pincode: profileData.address?.pincode || ''
        },
        preferences: {
          currency: profileData.preferences?.currency || 'INR',
          language: profileData.preferences?.language || 'en',
          notifications: {
            email: profileData.preferences?.notifications?.email !== false,
            sms: profileData.preferences?.notifications?.sms || false,
            whatsapp: profileData.preferences?.notifications?.whatsapp || false
          }
        }
      });
    } catch (error: unknown) {
      console.error('Error fetching profile:', error);
      const errorMessage = (error as ApiError)?.message || 'Failed to load profile';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        let errorMessage = 'Failed to update profile';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
        }
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      setProfile(responseData.user);
      setIsEditing(false);
      setSuccess('Profile updated successfully');
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);

    } catch (error: unknown) {
      console.error('Error updating profile:', error);
      const errorMessage = (error as ApiError)?.message || 'Failed to update profile';
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError('New passwords do not match');
        return;
      }

      if (passwordData.newPassword.length < 8) {
        setError('New password must be at least 8 characters long');
        return;
      }

      setSaving(true);
      setError('');
      setSuccess('');
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/users/change-password', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (!response.ok) {
        let errorMessage = 'Failed to change password';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
        }
        throw new Error(errorMessage);
      }

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordChange(false);
      setSuccess('Password changed successfully');
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);

    } catch (error: unknown) {
      console.error('Error changing password:', error);
      const errorMessage = (error as ApiError)?.message || 'Failed to change password';
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: unknown) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => {
        const parentKey = parent as keyof FormData;
        // const currentParent = prev[parentKey];
        
        // Type-safe handling for nested objects
        if (parentKey === 'address') {
          return {
            ...prev,
            address: {
              ...prev.address,
              [child]: value as string
            }
          };
        } else if (parentKey === 'preferences') {
          if (child === 'notifications') {
            return {
              ...prev,
              preferences: {
                ...prev.preferences,
                notifications: value as FormData['preferences']['notifications']
              }
            };
          } else {
            return {
              ...prev,
              preferences: {
                ...prev.preferences,
                [child]: value as string
              }
            };
          }
        }
        
        return prev;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Helper function for nested notification changes
  const handleNotificationChange = (notificationType: keyof FormData['preferences']['notifications'], value: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: {
          ...prev.preferences.notifications,
          [notificationType]: value
        }
      }
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading || loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <LoadingSpinner />
          </div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Not Found</h3>
              <p className="text-gray-600 mb-6">Unable to load your profile information.</p>
              <Button onClick={fetchProfile}>Try Again</Button>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>My Profile - Travel Quench</title>
        <meta name="description" content="Manage your Travel Quench profile" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                  <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
                </div>
                <div className="flex space-x-3">
                  <Button
                    onClick={fetchProfile}
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh</span>
                  </Button>
                  {!isEditing && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-600">{error}</p>
                  <button
                    onClick={() => setError('')}
                    className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-green-600">{success}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Summary Card */}
              <div className="lg:col-span-1">
                <Card className="text-center p-6">
                  <div className="relative inline-block mb-4">
                    <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto relative overflow-hidden">
                      {profile.profileImage ? (
                        <Image
                          src={profile.profileImage}
                          alt="Profile"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-white text-2xl font-bold">
                          {profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {profile.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{profile.email}</p>
                  
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    {profile.role === 'admin' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Admin
                      </span>
                    )}
                    {profile.isEmailVerified && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-500">
                    Member since {formatDate(profile.createdAt)}
                  </p>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Button
                      onClick={() => setShowPasswordChange(!showPasswordChange)}
                      variant="ghost"
                      size="sm"
                      className="w-full flex items-center justify-center space-x-2"
                    >
                      <Key className="w-4 h-4" />
                      <span>Change Password</span>
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Profile Details Card */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                    {isEditing && (
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => {
                            setIsEditing(false);
                            setError('');
                            fetchProfile(); // Reset form data
                          }}
                          variant="ghost"
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </Button>
                        <Button
                          onClick={handleSaveProfile}
                          disabled={saving}
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <Save className="w-4 h-4" />
                          <span>{saving ? 'Saving...' : 'Save'}</span>
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter full name"
                        />
                      ) : (
                        <p className="text-gray-900">{profile.name || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <p className="text-gray-900">{profile.email}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <Input
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter 10-digit phone number"
                          type="tel"
                        />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <p className="text-gray-900">{profile.phone || 'Not provided'}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Status
                      </label>
                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          profile.isEmailVerified 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {profile.isEmailVerified ? 'Email Verified' : 'Email Not Verified'}
                        </span>
                        {profile.lastLoginAt && (
                          <span className="text-sm text-gray-500">
                            Last login: {formatDate(profile.lastLoginAt.toString())}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Address Information
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address
                        </label>
                        {isEditing ? (
                          <Input
                            value={formData.address.street}
                            onChange={(e) => handleInputChange('address.street', e.target.value)}
                            placeholder="Enter street address"
                          />
                        ) : (
                          <p className="text-gray-900">{profile.address?.street || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        {isEditing ? (
                          <Input
                            value={formData.address.city}
                            onChange={(e) => handleInputChange('address.city', e.target.value)}
                            placeholder="Enter city"
                          />
                        ) : (
                          <p className="text-gray-900">{profile.address?.city || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        {isEditing ? (
                          <Input
                            value={formData.address.state}
                            onChange={(e) => handleInputChange('address.state', e.target.value)}
                            placeholder="Enter state"
                          />
                        ) : (
                          <p className="text-gray-900">{profile.address?.state || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        {isEditing ? (
                          <Input
                            value={formData.address.country}
                            onChange={(e) => handleInputChange('address.country', e.target.value)}
                            placeholder="Enter country"
                          />
                        ) : (
                          <p className="text-gray-900">{profile.address?.country || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pincode
                        </label>
                        {isEditing ? (
                          <Input
                            value={formData.address.pincode}
                            onChange={(e) => handleInputChange('address.pincode', e.target.value)}
                            placeholder="Enter pincode"
                          />
                        ) : (
                          <p className="text-gray-900">{profile.address?.pincode || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="text-md font-semibold text-gray-900 mb-4">
                      Preferences & Settings
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Currency
                        </label>
                        {isEditing ? (
                          <select
                            value={formData.preferences.currency}
                            onChange={(e) => handleInputChange('preferences.currency', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="INR">INR - Indian Rupee</option>
                            <option value="USD">USD - US Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - British Pound</option>
                          </select>
                        ) : (
                          <p className="text-gray-900">{profile.preferences?.currency || 'INR'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        {isEditing ? (
                          <select
                            value={formData.preferences.language}
                            onChange={(e) => handleInputChange('preferences.language', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="en">English</option>
                            <option value="hi">Hindi</option>
                            <option value="bn">Bengali</option>
                            <option value="te">Telugu</option>
                            <option value="ta">Tamil</option>
                          </select>
                        ) : (
                          <p className="text-gray-900 capitalize">{profile.preferences?.language || 'English'}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h5 className="text-sm font-medium text-gray-700">Notification Preferences</h5>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                          <p className="text-xs text-gray-500">Receive booking updates and offers via email</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={isEditing ? formData.preferences.notifications.email : profile.preferences?.notifications?.email}
                          onChange={(e) => isEditing && handleNotificationChange('email', e.target.checked)}
                          disabled={!isEditing}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">SMS Notifications</label>
                          <p className="text-xs text-gray-500">Receive important updates via SMS</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={isEditing ? formData.preferences.notifications.sms : profile.preferences?.notifications?.sms}
                          onChange={(e) => isEditing && handleNotificationChange('sms', e.target.checked)}
                          disabled={!isEditing}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">WhatsApp Notifications</label>
                          <p className="text-xs text-gray-500">Receive updates via WhatsApp</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={isEditing ? formData.preferences.notifications.whatsapp : profile.preferences?.notifications?.whatsapp}
                          onChange={(e) => isEditing && handleNotificationChange('whatsapp', e.target.checked)}
                          disabled={!isEditing}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Password Change Modal */}
            {showPasswordChange && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <Card className="w-full max-w-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                    <button
                      onClick={() => {
                        setShowPasswordChange(false);
                        setPasswordData({
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: ''
                        });
                        setError('');
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showPasswords.current ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showPasswords.new ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showPasswords.confirm ? 'text' : 'password'}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <Button
                      onClick={() => {
                        setShowPasswordChange(false);
                        setPasswordData({
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: ''
                        });
                        setError('');
                      }}
                      variant="ghost"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handlePasswordChange}
                      disabled={saving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                      className="flex-1"
                    >
                      {saving ? 'Changing...' : 'Change Password'}
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CustomerProfile;










