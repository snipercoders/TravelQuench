// // import React, { useState, useEffect } from 'react';
// // import { useRequireAuth } from '@/hooks/useAuth';
// // import { useRouter } from 'next/router';
// // import Head from 'next/head';
// // import AdminLayout from '@/components/layout/AdminLayout';
// // import {
// //   Settings as SettingsIcon,
// //   Palette,
// //   Globe,
// //   Mail,
// //   Phone,
// //   MapPin,
// //   DollarSign,
// //   Clock,
// //   Shield,
// //   Bell,
// //   FileText,
// //   Camera,
// //   Save,
// //   RefreshCw,
// //   ArrowLeft,
// //   AlertCircle,
// //   CheckCircle,
// //   Eye,
// //   EyeOff,
// //   Upload,
// //   Trash2,
// //   Plus,
// //   X,
// //   Sun,
// //   Moon,
// //   Monitor,
// //   CreditCard,
// //   Plane,
// //   Car,
// //   Home
// // } from 'lucide-react';

// // interface CompanySettings {
// //   name: string;
// //   description: string;
// //   email: string;
// //   phone: string;
// //   whatsappNumber: string;
// //   address: string;
// //   website: string;
// //   logo: string;
// //   favicon: string;
// // }

// // interface ThemeSettings {
// //   mode: 'light' | 'dark' | 'system';
// //   primaryColor: string;
// //   secondaryColor: string;
// //   accentColor: string;
// //   customCSS: string;
// // }

// // interface PaymentSettings {
// //   razorpayKeyId: string;
// //   razorpayKeySecret: string;
// //   stripePublishableKey: string;
// //   stripeSecretKey: string;
// //   paypalClientId: string;
// //   paypalClientSecret: string;
// //   enableRazorpay: boolean;
// //   enableStripe: boolean;
// //   enablePaypal: boolean;
// //   currency: string;
// //   taxRate: number;
// //   processingFee: number;
// // }

// // interface EmailSettings {
// //   smtpHost: string;
// //   smtpPort: number;
// //   smtpUser: string;
// //   smtpPassword: string;
// //   fromEmail: string;
// //   fromName: string;
// //   enableBookingConfirmation: boolean;
// //   enablePaymentNotification: boolean;
// //   enableNewsletters: boolean;
// //   enablePromotions: boolean;
// // }

// // interface NotificationSettings {
// //   enableEmailNotifications: boolean;
// //   enableSMSNotifications: boolean;
// //   enableWhatsAppNotifications: boolean;
// //   enablePushNotifications: boolean;
// //   bookingNotifications: boolean;
// //   paymentNotifications: boolean;
// //   userRegistrationNotifications: boolean;
// //   adminAlerts: boolean;
// // }

// // interface BookingSettings {
// //   bookingPrefix: string;
// //   advancePaymentPercentage: number;
// //   cancellationDeadlineHours: number;
// //   cancellationFeePercentage: number;
// //   autoConfirmBookings: boolean;
// //   maxGroupSize: number;
// //   minBookingAmount: number;
// //   requireApproval: boolean;
// // }

// // interface SocialMediaSettings {
// //   facebookUrl: string;
// //   instagramUrl: string;
// //   twitterUrl: string;
// //   youtubeUrl: string;
// //   linkedinUrl: string;
// //   enableSocialLogin: boolean;
// //   facebookAppId: string;
// //   googleClientId: string;
// // }

// // const AdminSettings: React.FC = () => {
// //   const { user, isLoading } = useRequireAuth('/auth/login');
// //   const router = useRouter();
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);
// //   const [activeTab, setActiveTab] = useState('company');
// //   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
// //   const [error, setError] = useState<string>('');

// //   // Settings state
// //   const [companySettings, setCompanySettings] = useState<CompanySettings>({
// //     name: 'Jai Mata Di Travels',
// //     description: 'Your trusted travel partner for unforgettable journeys across India and around the world.',
// //     email: 'info@jaimataditravels.com',
// //     phone: '+91-7006377796',
// //     whatsappNumber: '7006377796',
// //     address: 'Bengaluru, Karnataka, India',
// //     website: 'https://jaimataditravels.com',
// //     logo: '/images/logo.png',
// //     favicon: '/favicon.ico'
// //   });

// //   const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
// //     mode: 'system',
// //     primaryColor: '#f97316',
// //     secondaryColor: '#1f2937',
// //     accentColor: '#10b981',
// //     customCSS: ''
// //   });

// //   const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
// //     razorpayKeyId: '',
// //     razorpayKeySecret: '',
// //     stripePublishableKey: '',
// //     stripeSecretKey: '',
// //     paypalClientId: '',
// //     paypalClientSecret: '',
// //     enableRazorpay: true,
// //     enableStripe: false,
// //     enablePaypal: false,
// //     currency: 'INR',
// //     taxRate: 18,
// //     processingFee: 2.5
// //   });

// //   const [emailSettings, setEmailSettings] = useState<EmailSettings>({
// //     smtpHost: '',
// //     smtpPort: 587,
// //     smtpUser: '',
// //     smtpPassword: '',
// //     fromEmail: 'noreply@jaimataditravels.com',
// //     fromName: 'Jai Mata Di Travels',
// //     enableBookingConfirmation: true,
// //     enablePaymentNotification: true,
// //     enableNewsletters: true,
// //     enablePromotions: true
// //   });

// //   const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
// //     enableEmailNotifications: true,
// //     enableSMSNotifications: false,
// //     enableWhatsAppNotifications: true,
// //     enablePushNotifications: false,
// //     bookingNotifications: true,
// //     paymentNotifications: true,
// //     userRegistrationNotifications: true,
// //     adminAlerts: true
// //   });

// //   const [bookingSettings, setBookingSettings] = useState<BookingSettings>({
// //     bookingPrefix: 'JMT',
// //     advancePaymentPercentage: 30,
// //     cancellationDeadlineHours: 24,
// //     cancellationFeePercentage: 10,
// //     autoConfirmBookings: false,
// //     maxGroupSize: 15,
// //     minBookingAmount: 1000,
// //     requireApproval: true
// //   });

// //   const [socialMediaSettings, setSocialMediaSettings] = useState<SocialMediaSettings>({
// //     facebookUrl: '',
// //     instagramUrl: '',
// //     twitterUrl: '',
// //     youtubeUrl: '',
// //     linkedinUrl: '',
// //     enableSocialLogin: false,
// //     facebookAppId: '',
// //     googleClientId: ''
// //   });

// //   // Check if current user is admin
// //   const isAdmin = user?.role === 'admin';

// //   useEffect(() => {
// //     if (!isLoading && !isAdmin) {
// //       router.push('/unauthorized');
// //       return;
// //     }
// //     if (isAdmin) {
// //       fetchSettings();
// //     }
// //   }, [isLoading, isAdmin]);

// //   const fetchSettings = async () => {
// //     try {
// //       const response = await fetch('/api/admin/settings', {
// //         headers: {
// //           'Authorization': `Bearer ${localStorage.getItem('token')}`
// //         }
// //       });
// //       if (response.ok) {
// //         const data = await response.json();
// //         if (data.company) setCompanySettings(data.company);
// //         if (data.theme) setThemeSettings(data.theme);
// //         if (data.payment) setPaymentSettings(data.payment);
// //         if (data.email) setEmailSettings(data.email);
// //         if (data.notifications) setNotificationSettings(data.notifications);
// //         if (data.booking) setBookingSettings(data.booking);
// //         if (data.socialMedia) setSocialMediaSettings(data.socialMedia);
// //       }
// //     } catch (error) {
// //       console.error('Failed to fetch settings:', error);
// //       setError('Failed to load settings');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const saveSettings = async () => {
// //     setSaving(true);
// //     setError('');
// //     try {
// //       const response = await fetch('/api/admin/settings', {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${localStorage.getItem('token')}`
// //         },
// //         body: JSON.stringify({
// //           company: companySettings,
// //           theme: themeSettings,
// //           payment: paymentSettings,
// //           email: emailSettings,
// //           notifications: notificationSettings,
// //           booking: bookingSettings,
// //           socialMedia: socialMediaSettings
// //         })
// //       });

// //       if (response.ok) {
// //         setShowSuccessMessage(true);
// //         setTimeout(() => setShowSuccessMessage(false), 3000);
// //       } else {
// //         const errorData = await response.json();
// //         setError(errorData.message || 'Failed to save settings');
// //       }
// //     } catch (error) {
// //       console.error('Failed to save settings:', error);
// //       setError('Failed to save settings');
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const tabs = [
// //     { id: 'company', label: 'Company', icon: Home },
// //     { id: 'theme', label: 'Theme', icon: Palette },
// //     { id: 'payment', label: 'Payment', icon: CreditCard },
// //     { id: 'email', label: 'Email', icon: Mail },
// //     { id: 'notifications', label: 'Notifications', icon: Bell },
// //     { id: 'booking', label: 'Booking', icon: Plane },
// //     { id: 'social', label: 'Social Media', icon: Globe }
// //   ];

// //   if (isLoading || loading) {
// //     return (
// //       <AdminLayout title="Settings">
// //         <div className="flex items-center justify-center h-64">
// //           <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-orange-500"></div>
// //         </div>
// //       </AdminLayout>
// //     );
// //   }

// //   if (!isAdmin) {
// //     return (
// //       <AdminLayout title="Access Denied">
// //         <div className="flex items-center justify-center h-64 px-4">
// //           <div className="text-center">
// //             <AlertCircle className="h-12 w-12 sm:h-16 sm:w-16 text-red-500 mx-auto mb-4" />
// //             <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Access Denied</h2>
// //             <p className="text-gray-400 text-sm sm:text-base">You don't have permission to access this page.</p>
// //           </div>
// //         </div>
// //       </AdminLayout>
// //     );
// //   }

// //   return (
// //     <>
// //       <Head>
// //         <title>Settings - Travel Admin</title>
// //       </Head>
// //       <AdminLayout title="Settings">
// //         <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
// //           <div className="mb-4 sm:mb-6">
// //             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //               <button
// //                 onClick={() => router.back()}
// //                 className="flex items-center px-3 py-2 sm:px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 text-sm sm:text-base"
// //               >
// //                 <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
// //                 Back
// //               </button>
              
// //               <button
// //                 onClick={saveSettings}
// //                 disabled={saving}
// //                 className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
// //               >
// //                 {saving ? (
// //                   <>
// //                     <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
// //                     Saving...
// //                   </>
// //                 ) : (
// //                   <>
// //                     <Save className="h-4 w-4 mr-2" />
// //                     Save Settings
// //                   </>
// //                 )}
// //               </button>
// //             </div>
// //           </div>

// //           {showSuccessMessage && (
// //             <div className="mb-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
// //               <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
// //               <span className="text-green-800 text-sm sm:text-base">Settings saved successfully!</span>
// //             </div>
// //           )}

// //           {error && (
// //             <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
// //               <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
// //               <span className="text-red-800 text-sm sm:text-base">{error}</span>
// //             </div>
// //           )}

// //           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
// //             <div className="lg:col-span-1">
// //               <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
// //                 <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
// //                   <SettingsIcon className="h-5 w-5 mr-2" />
// //                   Settings
// //                 </h3>
                
// //                 <div className="lg:hidden mb-4">
// //                   <select
// //                     value={activeTab}
// //                     onChange={(e) => setActiveTab(e.target.value)}
// //                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
// //                   >
// //                     {tabs.map((tab) => (
// //                       <option key={tab.id} value={tab.id}>
// //                         {tab.label}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 <nav className="hidden lg:block space-y-2">
// //                   {tabs.map((tab) => {
// //                     const Icon = tab.icon;
// //                     return (
// //                       <button
// //                         key={tab.id}
// //                         onClick={() => setActiveTab(tab.id)}
// //                         className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
// //                           activeTab === tab.id
// //                             ? 'bg-orange-500 text-white'
// //                             : 'text-gray-300 hover:bg-white/10 hover:text-white'
// //                         }`}
// //                       >
// //                         <Icon className="h-4 w-4 mr-3" />
// //                         {tab.label}
// //                       </button>
// //                     );
// //                   })}
// //                 </nav>
// //               </div>
// //             </div>

// //             <div className="lg:col-span-3">
// //               <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 sm:p-6">
// //                 {activeTab === 'company' && (
// //                   <div className="space-y-6">
// //                     <h2 className="text-xl font-bold text-white mb-4">Company Information</h2>
                    
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
// //                         <input
// //                           type="text"
// //                           value={companySettings.name}
// //                           onChange={(e) => setCompanySettings({...companySettings, name: e.target.value})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
                      
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
// //                         <input
// //                           type="email"
// //                           value={companySettings.email}
// //                           onChange={(e) => setCompanySettings({...companySettings, email: e.target.value})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
                      
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
// //                         <input
// //                           type="tel"
// //                           value={companySettings.phone}
// //                           onChange={(e) => setCompanySettings({...companySettings, phone: e.target.value})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
                      
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">WhatsApp Number</label>
// //                         <input
// //                           type="tel"
// //                           value={companySettings.whatsappNumber}
// //                           onChange={(e) => setCompanySettings({...companySettings, whatsappNumber: e.target.value})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                     </div>
                    
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
// //                       <textarea
// //                         value={companySettings.description}
// //                         onChange={(e) => setCompanySettings({...companySettings, description: e.target.value})}
// //                         rows={3}
// //                         className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                       />
// //                     </div>
                    
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
// //                       <textarea
// //                         value={companySettings.address}
// //                         onChange={(e) => setCompanySettings({...companySettings, address: e.target.value})}
// //                         rows={2}
// //                         className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                       />
// //                     </div>
                    
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-300 mb-2">Website URL</label>
// //                       <input
// //                         type="url"
// //                         value={companySettings.website}
// //                         onChange={(e) => setCompanySettings({...companySettings, website: e.target.value})}
// //                         className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                       />
// //                     </div>
// //                   </div>
// //                 )}

// //                 {activeTab === 'theme' && (
// //                   <div className="space-y-6">
// //                     <h2 className="text-xl font-bold text-white mb-4">Theme & Appearance</h2>
                    
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-300 mb-2">Theme Mode</label>
// //                       <div className="grid grid-cols-3 gap-3">
// //                         {[
// //                           { value: 'light', icon: Sun, label: 'Light' },
// //                           { value: 'dark', icon: Moon, label: 'Dark' },
// //                           { value: 'system', icon: Monitor, label: 'System' }
// //                         ].map((option) => {
// //                           const Icon = option.icon;
// //                           return (
// //                             <button
// //                               key={option.value}
// //                               onClick={() => setThemeSettings({...themeSettings, mode: option.value as any})}
// //                               className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${
// //                                 themeSettings.mode === option.value
// //                                   ? 'bg-orange-500 border-orange-500 text-white'
// //                                   : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
// //                               }`}
// //                             >
// //                               <Icon className="h-5 w-5 mb-1" />
// //                               <span className="text-sm">{option.label}</span>
// //                             </button>
// //                           );
// //                         })}
// //                       </div>
// //                     </div>
                    
// //                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
// //                         <div className="flex items-center space-x-2">
// //                           <input
// //                             type="color"
// //                             value={themeSettings.primaryColor}
// //                             onChange={(e) => setThemeSettings({...themeSettings, primaryColor: e.target.value})}
// //                             className="w-12 h-10 rounded border border-gray-600"
// //                           />
// //                           <input
// //                             type="text"
// //                             value={themeSettings.primaryColor}
// //                             onChange={(e) => setThemeSettings({...themeSettings, primaryColor: e.target.value})}
// //                             className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                           />
// //                         </div>
// //                       </div>
                      
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Color</label>
// //                         <div className="flex items-center space-x-2">
// //                           <input
// //                             type="color"
// //                             value={themeSettings.secondaryColor}
// //                             onChange={(e) => setThemeSettings({...themeSettings, secondaryColor: e.target.value})}
// //                             className="w-12 h-10 rounded border border-gray-600"
// //                           />
// //                           <input
// //                             type="text"
// //                             value={themeSettings.secondaryColor}
// //                             onChange={(e) => setThemeSettings({...themeSettings, secondaryColor: e.target.value})}
// //                             className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                           />
// //                         </div>
// //                       </div>
                      
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Accent Color</label>
// //                         <div className="flex items-center space-x-2">
// //                           <input
// //                             type="color"
// //                             value={themeSettings.accentColor}
// //                             onChange={(e) => setThemeSettings({...themeSettings, accentColor: e.target.value})}
// //                             className="w-12 h-10 rounded border border-gray-600"
// //                           />
// //                           <input
// //                             type="text"
// //                             value={themeSettings.accentColor}
// //                             onChange={(e) => setThemeSettings({...themeSettings, accentColor: e.target.value})}
// //                             className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                           />
// //                         </div>
// //                       </div>
// //                     </div>
                    
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-300 mb-2">Custom CSS</label>
// //                       <textarea
// //                         value={themeSettings.customCSS}
// //                         onChange={(e) => setThemeSettings({...themeSettings, customCSS: e.target.value})}
// //                         rows={6}
// //                         placeholder="Enter custom CSS rules..."
// //                         className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
// //                       />
// //                     </div>
// //                   </div>
// //                 )}

// //                 {activeTab === 'payment' && (
// //                   <div className="space-y-6">
// //                     <h2 className="text-xl font-bold text-white mb-4">Payment Configuration</h2>
                    
// //                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
// //                         <select
// //                           value={paymentSettings.currency}
// //                           onChange={(e) => setPaymentSettings({...paymentSettings, currency: e.target.value})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         >
// //                           <option value="INR">INR (₹)</option>
// //                           <option value="USD">USD ($)</option>
// //                           <option value="EUR">EUR (€)</option>
// //                           <option value="GBP">GBP (£)</option>
// //                         </select>
// //                       </div>
                      
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Tax Rate (%)</label>
// //                         <input
// //                           type="number"
// //                           value={paymentSettings.taxRate}
// //                           onChange={(e) => setPaymentSettings({...paymentSettings, taxRate: parseFloat(e.target.value)})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
                      
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Processing Fee (%)</label>
// //                         <input
// //                           type="number"
// //                           step="0.1"
// //                           value={paymentSettings.processingFee}
// //                           onChange={(e) => setPaymentSettings({...paymentSettings, processingFee: parseFloat(e.target.value)})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                     </div>

// //                     <div className="border border-gray-600 rounded-lg p-4">
// //                       <div className="flex items-center justify-between mb-4">
// //                         <h3 className="text-lg font-semibold text-white">Razorpay</h3>
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={paymentSettings.enableRazorpay}
// //                             onChange={(e) => setPaymentSettings({...paymentSettings, enableRazorpay: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">Enable</span>
// //                         </label>
// //                       </div>
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-300 mb-2">Key ID</label>
// //                           <input
// //                             type="text"
// //                             value={paymentSettings.razorpayKeyId}
// //                             onChange={(e) => setPaymentSettings({...paymentSettings, razorpayKeyId: e.target.value})}
// //                             className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-300 mb-2">Key Secret</label>
// //                           <input
// //                             type="password"
// //                             value={paymentSettings.razorpayKeySecret}
// //                             onChange={(e) => setPaymentSettings({...paymentSettings, razorpayKeySecret: e.target.value})}
// //                             className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                           />
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div className="border border-gray-600 rounded-lg p-4">
// //                       <div className="flex items-center justify-between mb-4">
// //                         <h3 className="text-lg font-semibold text-white">Stripe</h3>
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={paymentSettings.enableStripe}
// //                             onChange={(e) => setPaymentSettings({...paymentSettings, enableStripe: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">Enable</span>
// //                         </label>
// //                       </div>
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-300 mb-2">Publishable Key</label>
// //                           <input
// //                             type="text"
// //                             value={paymentSettings.stripePublishableKey}
// //                             onChange={(e) => setPaymentSettings({...paymentSettings, stripePublishableKey: e.target.value})}
// //                             className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-300 mb-2">Secret Key</label>
// //                           <input
// //                             type="password"
// //                             value={paymentSettings.stripeSecretKey}
// //                             onChange={(e) => setPaymentSettings({...paymentSettings, stripeSecretKey: e.target.value})}
// //                             className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                           />
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div className="border border-gray-600 rounded-lg p-4">
// //                       <div className="flex items-center justify-between mb-4">
// //                         <h3 className="text-lg font-semibold text-white">PayPal</h3>
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={paymentSettings.enablePaypal}
// //                             onChange={(e) => setPaymentSettings({...paymentSettings, enablePaypal: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">Enable</span>
// //                         </label>
// //                       </div>
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-300 mb-2">Client ID</label>
// //                           <input
// //                             type="text"
// //                             value={paymentSettings.paypalClientId}
// //                             onChange={(e) => setPaymentSettings({...paymentSettings, paypalClientId: e.target.value})}
// //                             className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-300 mb-2">Client Secret</label>
// //                           <input
// //                             type="password"
// //                             value={paymentSettings.paypalClientSecret}
// //                             onChange={(e) => setPaymentSettings({...paymentSettings, paypalClientSecret: e.target.value})}
// //                             className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                           />
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {activeTab === 'email' && (
// //                   <div className="space-y-6">
// //                     <h2 className="text-xl font-bold text-white mb-4">Email Configuration</h2>
                    
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">SMTP Host</label>
// //                         <input
// //                           type="text"
// //                           value={emailSettings.smtpHost}
// //                           onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">SMTP Port</label>
// //                         <input
// //                           type="number"
// //                           value={emailSettings.smtpPort}
// //                           onChange={(e) => setEmailSettings({...emailSettings, smtpPort: parseInt(e.target.value)})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">SMTP User</label>
// //                         <input
// //                           type="text"
// //                           value={emailSettings.smtpUser}
// //                           onChange={(e) => setEmailSettings({...emailSettings, smtpUser: e.target.value})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">SMTP Password</label>
// //                         <input
// //                           type="password"
// //                           value={emailSettings.smtpPassword}
// //                           onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">From Email</label>
// //                         <input
// //                           type="email"
// //                           value={emailSettings.fromEmail}
// //                           onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">From Name</label>
// //                         <input
// //                           type="text"
// //                           value={emailSettings.fromName}
// //                           onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                     </div>

// //                     <div className="border border-gray-600 rounded-lg p-4">
// //                       <h3 className="text-lg font-semibold text-white mb-4">Email Notifications</h3>
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={emailSettings.enableBookingConfirmation}
// //                             onChange={(e) => setEmailSettings({...emailSettings, enableBookingConfirmation: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">Booking Confirmation</span>
// //                         </label>
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={emailSettings.enablePaymentNotification}
// //                             onChange={(e) => setEmailSettings({...emailSettings, enablePaymentNotification: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">Payment Notification</span>
// //                         </label>
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={emailSettings.enableNewsletters}
// //                             onChange={(e) => setEmailSettings({...emailSettings, enableNewsletters: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">Newsletters</span>
// //                         </label>
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={emailSettings.enablePromotions}
// //                             onChange={(e) => setEmailSettings({...emailSettings, enablePromotions: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">Promotional Emails</span>
// //                         </label>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {activeTab === 'notifications' && (
// //                   <div className="space-y-6">
// //                     <h2 className="text-xl font-bold text-white mb-4">Notification Settings</h2>
                    
// //                     <div className="border border-gray-600 rounded-lg p-4">
// //                       <h3 className="text-lg font-semibold text-white mb-4">Notification Channels</h3>
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={notificationSettings.enableEmailNotifications}
// //                             onChange={(e) => setNotificationSettings({...notificationSettings, enableEmailNotifications: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">Email Notifications</span>
// //                         </label>
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={notificationSettings.enableSMSNotifications}
// //                             onChange={(e) => setNotificationSettings({...notificationSettings, enableSMSNotifications: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">SMS Notifications</span>
// //                         </label>
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={notificationSettings.enableWhatsAppNotifications}
// //                             onChange={(e) => setNotificationSettings({...notificationSettings, enableWhatsAppNotifications: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">WhatsApp Notifications</span>
// //                         </label>
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={notificationSettings.enablePushNotifications}
// //                             onChange={(e) => setNotificationSettings({...notificationSettings, enablePushNotifications: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">Push Notifications</span>
// //                         </label>
// //                       </div>
// //                     </div>

// //                     <div className="border border-gray-600 rounded-lg p-4">
// //                       <h3 className="text-lg font-semibold text-white mb-4">Notification Types</h3>
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={notificationSettings.bookingNotifications}
// //                             onChange={(e) => setNotificationSettings({...notificationSettings, bookingNotifications: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">Booking Notifications</span>
// //                         </label>
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={notificationSettings.paymentNotifications}
// //                             onChange={(e) => setNotificationSettings({...notificationSettings, paymentNotifications: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">Payment Notifications</span>
// //                         </label>
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={notificationSettings.userRegistrationNotifications}
// //                             onChange={(e) => setNotificationSettings({...notificationSettings, userRegistrationNotifications: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">User Registration</span>
// //                         </label>
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={notificationSettings.adminAlerts}
// //                             onChange={(e) => setNotificationSettings({...notificationSettings, adminAlerts: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">Admin Alerts</span>
// //                         </label>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {activeTab === 'booking' && (
// //                   <div className="space-y-6">
// //                     <h2 className="text-xl font-bold text-white mb-4">Booking Configuration</h2>
                    
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Booking Prefix</label>
// //                         <input
// //                           type="text"
// //                           value={bookingSettings.bookingPrefix}
// //                           onChange={(e) => setBookingSettings({...bookingSettings, bookingPrefix: e.target.value})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Advance Payment (%)</label>
// //                         <input
// //                           type="number"
// //                           value={bookingSettings.advancePaymentPercentage}
// //                           onChange={(e) => setBookingSettings({...bookingSettings, advancePaymentPercentage: parseFloat(e.target.value)})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Cancellation Deadline (Hours)</label>
// //                         <input
// //                           type="number"
// //                           value={bookingSettings.cancellationDeadlineHours}
// //                           onChange={(e) => setBookingSettings({...bookingSettings, cancellationDeadlineHours: parseInt(e.target.value)})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Cancellation Fee (%)</label>
// //                         <input
// //                           type="number"
// //                           value={bookingSettings.cancellationFeePercentage}
// //                           onChange={(e) => setBookingSettings({...bookingSettings, cancellationFeePercentage: parseFloat(e.target.value)})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Max Group Size</label>
// //                         <input
// //                           type="number"
// //                           value={bookingSettings.maxGroupSize}
// //                           onChange={(e) => setBookingSettings({...bookingSettings, maxGroupSize: parseInt(e.target.value)})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Min Booking Amount</label>
// //                         <input
// //                           type="number"
// //                           value={bookingSettings.minBookingAmount}
// //                           onChange={(e) => setBookingSettings({...bookingSettings, minBookingAmount: parseFloat(e.target.value)})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                     </div>

// //                     <div className="border border-gray-600 rounded-lg p-4">
// //                       <h3 className="text-lg font-semibold text-white mb-4">Booking Options</h3>
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={bookingSettings.autoConfirmBookings}
// //                             onChange={(e) => setBookingSettings({...bookingSettings, autoConfirmBookings: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">Auto-Confirm Bookings</span>
// //                         </label>
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={bookingSettings.requireApproval}
// //                             onChange={(e) => setBookingSettings({...bookingSettings, requireApproval: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">Require Approval</span>
// //                         </label>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {activeTab === 'social' && (
// //                   <div className="space-y-6">
// //                     <h2 className="text-xl font-bold text-white mb-4">Social Media Settings</h2>
                    
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Facebook URL</label>
// //                         <input
// //                           type="url"
// //                           value={socialMediaSettings.facebookUrl}
// //                           onChange={(e) => setSocialMediaSettings({...socialMediaSettings, facebookUrl: e.target.value})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Instagram URL</label>
// //                         <input
// //                           type="url"
// //                           value={socialMediaSettings.instagramUrl}
// //                           onChange={(e) => setSocialMediaSettings({...socialMediaSettings, instagramUrl: e.target.value})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">Twitter URL</label>
// //                         <input
// //                           type="url"
// //                           value={socialMediaSettings.twitterUrl}
// //                           onChange={(e) => setSocialMediaSettings({...socialMediaSettings, twitterUrl: e.target.value})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">YouTube URL</label>
// //                         <input
// //                           type="url"
// //                           value={socialMediaSettings.youtubeUrl}
// //                           onChange={(e) => setSocialMediaSettings({...socialMediaSettings, youtubeUrl: e.target.value})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
// //                         <input
// //                           type="url"
// //                           value={socialMediaSettings.linkedinUrl}
// //                           onChange={(e) => setSocialMediaSettings({...socialMediaSettings, linkedinUrl: e.target.value})}
// //                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                         />
// //                       </div>
// //                     </div>

// //                     <div className="border border-gray-600 rounded-lg p-4">
// //                       <div className="flex items-center justify-between mb-4">
// //                         <h3 className="text-lg font-semibold text-white">Social Login</h3>
// //                         <label className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             checked={socialMediaSettings.enableSocialLogin}
// //                             onChange={(e) => setSocialMediaSettings({...socialMediaSettings, enableSocialLogin: e.target.checked})}
// //                             className="mr-2"
// //                           />
// //                           <span className="text-gray-300">Enable Social Login</span>
// //                         </label>
// //                       </div>
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-300 mb-2">Facebook App ID</label>
// //                           <input
// //                             type="text"
// //                             value={socialMediaSettings.facebookAppId}
// //                             onChange={(e) => setSocialMediaSettings({...socialMediaSettings, facebookAppId: e.target.value})}
// //                             className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-300 mb-2">Google Client ID</label>
// //                           <input
// //                             type="text"
// //                             value={socialMediaSettings.googleClientId}
// //                             onChange={(e) => setSocialMediaSettings({...socialMediaSettings, googleClientId: e.target.value})}
// //                             className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                           />
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </AdminLayout>
// //     </>
// //   );
// // };

// // export default AdminSettings;




// import React, { useState, useEffect } from 'react';
// import { useRequireAuth } from '@/hooks/useAuth';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import AdminLayout from '@/components/layout/AdminLayout';
// import {
//   Settings as SettingsIcon,
//   Home,
//   Palette,
//   CreditCard,
//   Save,
//   ArrowLeft,
//   AlertCircle,
//   CheckCircle
// } from 'lucide-react';

// interface CompanySettings {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   website: string;
// }

// interface ThemeSettings {
//   mode: 'light' | 'dark' | 'system';
//   primaryColor: string;
// }

// interface PaymentSettings {
//   enableRazorpay: boolean;
//   razorpayKeyId: string;
//   razorpayKeySecret: string;
//   currency: string;
// }

// const AdminSettings: React.FC = () => {
//   const { user, isLoading } = useRequireAuth('/auth/login');
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [activeTab, setActiveTab] = useState('company');
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [error, setError] = useState<string>('');

//   const [companySettings, setCompanySettings] = useState<CompanySettings>({
//     name: 'Jai Mata Di Travels',
//     email: 'info@jaimataditravels.com',
//     phone: '+91-7006377796',
//     address: 'Bengaluru, Karnataka, India',
//     website: 'https://jaimataditravels.com'
//   });

//   const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
//     mode: 'system',
//     primaryColor: '#f97316'
//   });

//   const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
//     enableRazorpay: true,
//     razorpayKeyId: '',
//     razorpayKeySecret: '',
//     currency: 'INR'
//   });

//   const isAdmin = user?.role === 'admin';

//   useEffect(() => {
//     if (!isLoading && !isAdmin) {
//       router.push('/unauthorized');
//       return;
//     }
//     if (isAdmin) {
//       fetchSettings();
//     }
//   }, [isLoading, isAdmin]);

//   const fetchSettings = async () => {
//     try {
//       const response = await fetch('/api/admin/settings', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         if (data.company) setCompanySettings(data.company);
//         if (data.theme) setThemeSettings(data.theme);
//         if (data.payment) setPaymentSettings(data.payment);
//       }
//     } catch (error) {
//       console.error('Failed to fetch settings:', error);
//       setError('Failed to load settings');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveSettings = async () => {
//     setSaving(true);
//     setError('');
//     try {
//       const response = await fetch('/api/admin/settings', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({
//           company: companySettings,
//           theme: themeSettings,
//           payment: paymentSettings
//         })
//       });

//       if (response.ok) {
//         setShowSuccessMessage(true);
//         setTimeout(() => setShowSuccessMessage(false), 3000);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || 'Failed to save settings');
//       }
//     } catch (error) {
//       console.error('Failed to save settings:', error);
//       setError('Failed to save settings');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const tabs = [
//     { id: 'company', label: 'Company', icon: Home },
//     { id: 'theme', label: 'Theme', icon: Palette },
//     { id: 'payment', label: 'Payment', icon: CreditCard }
//   ];

//   if (isLoading || loading) {
//     return (
//       <AdminLayout title="Settings">
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
//         </div>
//       </AdminLayout>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <AdminLayout title="Access Denied">
//         <div className="flex items-center justify-center h-64 px-4">
//           <div className="text-center">
//             <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//             <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
//             <p className="text-gray-400 text-sm">You don't have permission to access this page.</p>
//           </div>
//         </div>
//       </AdminLayout>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>Settings - Travel Admin</title>
//       </Head>
//       <AdminLayout title="Settings">
//         <div className="max-w-4xl mx-auto px-4">
//           <div className="mb-6">
//             <div className="flex justify-between items-center gap-4">
//               <button
//                 onClick={() => router.back()}
//                 className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
//               >
//                 <ArrowLeft className="h-5 w-5 mr-2" />
//                 Back
//               </button>
//               <button
//                 onClick={saveSettings}
//                 disabled={saving}
//                 className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
//               >
//                 {saving ? (
//                   <>
//                     <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="h-4 w-4 mr-2" />
//                     Save Settings
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {showSuccessMessage && (
//             <div className="mb-4 p-4 bg-green-100 border border-green-200 rounded-lg flex items-center">
//               <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
//               <span className="text-green-800">Settings saved successfully!</span>
//             </div>
//           )}

//           {error && (
//             <div className="mb-4 p-4 bg-red-100 border border-red-200 rounded-lg flex items-center">
//               <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
//               <span className="text-red-800">{error}</span>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="md:col-span-1">
//               <div className="bg-gray-800 rounded-lg p-4">
//                 <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
//                   <SettingsIcon className="h-5 w-5 mr-2" />
//                   Settings
//                 </h3>
//                 <nav className="space-y-2">
//                   {tabs.map((tab) => {
//                     const Icon = tab.icon;
//                     return (
//                       <button
//                         key={tab.id}
//                         onClick={() => setActiveTab(tab.id)}
//                         className={`w-full flex items-center px-3 py-2 rounded-lg text-left ${
//                           activeTab === tab.id
//                             ? 'bg-orange-500 text-white'
//                             : 'text-gray-300 hover:bg-gray-700'
//                         }`}
//                       >
//                         <Icon className="h-4 w-4 mr-3" />
//                         {tab.label}
//                       </button>
//                     );
//                   })}
//                 </nav>
//               </div>
//             </div>

//             <div className="md:col-span-2">
//               <div className="bg-gray-800 rounded-lg p-6">
//                 {activeTab === 'company' && (
//                   <div className="space-y-4">
//                     <h2 className="text-xl font-bold text-white mb-4">Company Information</h2>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
//                       <input
//                         type="text"
//                         value={companySettings.name}
//                         onChange={(e) => setCompanySettings({ ...companySettings, name: e.target.value })}
//                         className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
//                       <input
//                         type="email"
//                         value={companySettings.email}
//                         onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })}
//                         className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
//                       <input
//                         type="tel"
//                         value={companySettings.phone}
//                         onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
//                         className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
//                       <textarea
//                         value={companySettings.address}
//                         onChange={(e) => setCompanySettings({ ...companySettings, address: e.target.value })}
//                         rows={3}
//                         className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">Website URL</label>
//                       <input
//                         type="url"
//                         value={companySettings.website}
//                         onChange={(e) => setCompanySettings({ ...companySettings, website: e.target.value })}
//                         className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === 'theme' && (
//                   <div className="space-y-4">
//                     <h2 className="text-xl font-bold text-white mb-4">Theme Settings</h2>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">Theme Mode</label>
//                       <select
//                         value={themeSettings.mode}
//                         onChange={(e) => setThemeSettings({ ...themeSettings, mode: e.target.value as 'light' | 'dark' | 'system' })}
//                         className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       >
//                         <option value="light">Light</option>
//                         <option value="dark">Dark</option>
//                         <option value="system">System</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
//                       <div className="flex items-center space-x-2">
//                         <input
//                           type="color"
//                           value={themeSettings.primaryColor}
//                           onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
//                           className="w-12 h-10 rounded border border-gray-600"
//                         />
//                         <input
//                           type="text"
//                           value={themeSettings.primaryColor}
//                           onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
//                           className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === 'payment' && (
//                   <div className="space-y-4">
//                     <h2 className="text-xl font-bold text-white mb-4">Payment Settings</h2>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
//                       <select
//                         value={paymentSettings.currency}
//                         onChange={(e) => setPaymentSettings({ ...paymentSettings, currency: e.target.value })}
//                         className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       >
//                         <option value="INR">INR (₹)</option>
//                         <option value="USD">USD ($)</option>
//                         <option value="EUR">EUR (€)</option>
//                         <option value="GBP">GBP (£)</option>
//                       </select>
//                     </div>
//                     <div className="border border-gray-600 rounded-lg p-4">
//                       <div className="flex items-center justify-between mb-4">
//                         <h3 className="text-lg font-semibold text-white">Razorpay</h3>
//                         <label className="flex items-center">
//                           <input
//                             type="checkbox"
//                             checked={paymentSettings.enableRazorpay}
//                             onChange={(e) => setPaymentSettings({ ...paymentSettings, enableRazorpay: e.target.checked })}
//                             className="mr-2"
//                           />
//                           <span className="text-gray-300">Enable</span>
//                         </label>
//                       </div>
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-300 mb-2">Key ID</label>
//                           <input
//                             type="text"
//                             value={paymentSettings.razorpayKeyId}
//                             onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayKeyId: e.target.value })}
//                             className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-300 mb-2">Key Secret</label>
//                           <input
//                             type="password"
//                             value={paymentSettings.razorpayKeySecret}
//                             onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayKeySecret: e.target.value })}
//                             className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </AdminLayout>
//     </>
//   );
// };

// export default AdminSettings;





