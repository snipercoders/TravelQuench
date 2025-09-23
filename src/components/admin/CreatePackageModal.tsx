


// // src/components/admin/CreatePackageModal.tsx
// import React, { useState, useRef } from 'react';
// import { 
//   X, 
//   Upload, 
//   MapPin, 
//   Calendar, 
//   Users, 
//   IndianRupee, 
//   Plus, 
//   Trash2,
//   Globe,
//   Home,
//   Star,
//   AlertCircle,
//   Check,
//   Info
// } from 'lucide-react';

// interface CreatePackageModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onPackageCreated: () => void;
// }

// interface PackageData {
//   title: string;
//   destination: string;
//   description: string;
//   duration: number;
//   price: number;
//   originalPrice: number;
//   category: string;
//   type: 'domestic' | 'international';
//   maxGroupSize: number;
//   minAge: number;
//   inclusions: string[];
//   exclusions: string[];
//   itinerary: {
//     day: number;
//     title: string;
//     description: string;
//     meals: string[];
//     accommodation: string;
//   }[];
//   highlights: string[];
//   images: File[];
//   thumbnail: File | null;
//   isActive: boolean;
//   isFeatured: boolean;
// }

// interface DebugInfo {
//   hasAuthToken: boolean;
//   tokenLength: number;
//   allStorageKeys: string[];
//   tokenPreview: string;
//   sessionToken: boolean;
//   foundTokenKey: string;
//   isValidJWT: boolean;
//   tokenExpiry: string;
// }

// const CreatePackageModal: React.FC<CreatePackageModalProps> = ({ 
//   isOpen, 
//   onClose, 
//   onPackageCreated 
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [uploadingImages, setUploadingImages] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [error, setError] = useState<string>('');
//   const [showDebug, setShowDebug] = useState(false);
//   const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const thumbnailInputRef = useRef<HTMLInputElement>(null);

//   const [packageData, setPackageData] = useState<PackageData>({
//     title: '',
//     destination: '',
//     description: '',
//     duration: 1,
//     price: 0,
//     originalPrice: 0,
//     category: '',
//     type: 'domestic',
//     maxGroupSize: 10,
//     minAge: 0,
//     inclusions: [''],
//     exclusions: [''],
//     itinerary: [{
//       day: 1,
//       title: '',
//       description: '',
//       meals: [],
//       accommodation: ''
//     }],
//     highlights: [''],
//     images: [],
//     thumbnail: null,
//     isActive: true,
//     isFeatured: false
//   });

//   const categories = [
//     'Adventure', 'Beach', 'Cultural', 'Family', 'Honeymoon', 
//     'Luxury', 'Pilgrimage', 'Wildlife', 'Historical', 'Religious'
//   ];

//   const mealOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

//   // Enhanced auth token retrieval function - Fixed to handle your specific case
//   const getAuthToken = (): { token: string | null; foundKey: string } => {
//     // Based on your debug info, prioritize the keys that are actually present
//     const possibleKeys = [
//       'token',           // This is the one you have according to debug info
//       'auth-token',      // This is also in your storage
//       'authToken', 
//       'auth_token', 
//       'access_token', 
//       'jwt',
//       'bearerToken',
//       'accessToken',
//       'user_token',
//       'adminToken'
//     ];
    
//     // First check localStorage
//     for (const key of possibleKeys) {
//       const token = localStorage.getItem(key);
//       if (token) {
//         console.log(`✅ Token found in localStorage with key: ${key}`);
//         return { token, foundKey: key };
//       }
//     }
    
//     // Then check sessionStorage
//     for (const key of possibleKeys) {
//       const token = sessionStorage.getItem(key);
//       if (token) {
//         console.log(`✅ Token found in sessionStorage with key: ${key}`);
//         return { token, foundKey: `session:${key}` };
//       }
//     }
    
//     console.log('❌ No token found in any storage with any common key');
//     return { token: null, foundKey: '' };
//   };

//   // Enhanced token validation
//   const validateToken = (token: string): { isValid: boolean; payload: any; expiry: string } => {
//     try {
//       const parts = token.split('.');
//       if (parts.length !== 3) {
//         return { isValid: false, payload: null, expiry: 'Invalid format' };
//       }

//       const payload = JSON.parse(atob(parts[1]));
//       const expiry = payload.exp ? new Date(payload.exp * 1000).toLocaleString() : 'No expiry';
//       const isExpired = payload.exp ? (payload.exp * 1000 < Date.now()) : false;
      
//       return { 
//         isValid: !isExpired, 
//         payload, 
//         expiry: isExpired ? `Expired at ${expiry}` : expiry
//       };
//     } catch (error) {
//       return { isValid: false, payload: null, expiry: 'Cannot decode' };
//     }
//   };

//   // Debug function to gather auth information
//   const gatherDebugInfo = (): DebugInfo => {
//     const { token, foundKey } = getAuthToken();
//     const allLocalKeys = Object.keys(localStorage);
//     const allSessionKeys = Object.keys(sessionStorage);
//     const sessionToken = sessionStorage.getItem('authToken') || sessionStorage.getItem('token');
    
//     let isValidJWT = false;
//     let tokenExpiry = 'No token';
    
//     if (token) {
//       const validation = validateToken(token);
//       isValidJWT = validation.isValid;
//       tokenExpiry = validation.expiry;
//     }
    
//     const info: DebugInfo = {
//       hasAuthToken: !!token,
//       tokenLength: token?.length || 0,
//       allStorageKeys: [...allLocalKeys, ...allSessionKeys.map(k => `session:${k}`)],
//       tokenPreview: token ? `${token.substring(0, 20)}...` : 'No token',
//       sessionToken: !!sessionToken,
//       foundTokenKey: foundKey,
//       isValidJWT,
//       tokenExpiry
//     };
    
//     console.log('🔍 Enhanced Debug Info:', info);
//     return info;
//   };

//   const resetForm = () => {
//     setPackageData({
//       title: '',
//       destination: '',
//       description: '',
//       duration: 1,
//       price: 0,
//       originalPrice: 0,
//       category: '',
//       type: 'domestic',
//       maxGroupSize: 10,
//       minAge: 0,
//       inclusions: [''],
//       exclusions: [''],
//       itinerary: [{
//         day: 1,
//         title: '',
//         description: '',
//         meals: [],
//         accommodation: ''
//       }],
//       highlights: [''],
//       images: [],
//       thumbnail: null,
//       isActive: true,
//       isFeatured: false
//     });
//     setCurrentStep(1);
//     setError('');
//     setShowDebug(false);
//     setDebugInfo(null);
//   };

//   const handleInputChange = (field: string, value: any) => {
//     setPackageData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//     setError('');
//   };

//   const handleArrayChange = (field: string, index: number, value: string) => {
//     setPackageData(prev => ({
//       ...prev,
//       [field]: prev[field].map((item, i) => i === index ? value : item)
//     }));
//   };

//   const addArrayItem = (field: string) => {
//     setPackageData(prev => ({
//       ...prev,
//       [field]: [...prev[field], '']
//     }));
//   };

//   const removeArrayItem = (field: string, index: number) => {
//     if (packageData[field].length > 1) {
//       setPackageData(prev => ({
//         ...prev,
//         [field]: prev[field].filter((_, i) => i !== index)
//       }));
//     }
//   };

//   const handleItineraryChange = (index: number, field: string, value: any) => {
//     setPackageData(prev => ({
//       ...prev,
//       itinerary: prev.itinerary.map((item, i) => 
//         i === index ? { ...item, [field]: value } : item
//       )
//     }));
//   };

//   const addItineraryDay = () => {
//     setPackageData(prev => ({
//       ...prev,
//       itinerary: [...prev.itinerary, {
//         day: prev.itinerary.length + 1,
//         title: '',
//         description: '',
//         meals: [],
//         accommodation: ''
//       }]
//     }));
//   };

//   const removeItineraryDay = (index: number) => {
//     if (packageData.itinerary.length > 1) {
//       setPackageData(prev => ({
//         ...prev,
//         itinerary: prev.itinerary.filter((_, i) => i !== index)
//           .map((item, i) => ({ ...item, day: i + 1 }))
//       }));
//     }
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     setPackageData(prev => ({
//       ...prev,
//       images: [...prev.images, ...files]
//     }));
//   };

//   const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setPackageData(prev => ({
//       ...prev,
//       thumbnail: file
//     }));
//   };

//   const removeImage = (index: number) => {
//     setPackageData(prev => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index)
//     }));
//   };

//   // Helper function to safely get error message
//   const getErrorMessage = (error: any): string => {
//     if (typeof error === 'string') return error;
//     if (error instanceof Error) return error.message;
//     if (error && typeof error === 'object' && error.message) return error.message;
//     return 'An unexpected error occurred';
//   };

//   // Helper function to convert file to base64
//   const fileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const uploadToCloudinary = async (file: File): Promise<string> => {
//     try {
//       // Try FormData method first
//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await fetch('/api/upload/cloudinary', {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
//         throw new Error(errorData.error || `Upload failed with status ${response.status}`);
//       }

//       const data = await response.json();
//       return data.url;
//     } catch (error) {
//       // Try base64 method as fallback
//       try {
//         const base64Image = await fileToBase64(file);
        
//         const response = await fetch('/api/upload/cloudinary', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ image: base64Image })
//         });

//         if (!response.ok) {
//           const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
//           throw new Error(errorData.error || `Upload failed with status ${response.status}`);
//         }

//         const data = await response.json();
//         return data.url;
//       } catch (fallbackError) {
//         throw new Error(getErrorMessage(fallbackError));
//       }
//     }
//   };

//   const validateStep = (step: number): boolean => {
//     switch (step) {
//       case 1:
//         if (!packageData.title.trim()) {
//           setError('Package title is required');
//           return false;
//         }
//         if (!packageData.destination.trim()) {
//           setError('Destination is required');
//           return false;
//         }
//         if (!packageData.category) {
//           setError('Category is required');
//           return false;
//         }
//         if (!packageData.description.trim()) {
//           setError('Description is required');
//           return false;
//         }
//         break;
//       case 2:
//         if (packageData.price <= 0) {
//           setError('Price must be greater than 0');
//           return false;
//         }
//         break;
//       case 4:
//         if (!packageData.thumbnail) {
//           setError('Thumbnail image is required');
//           return false;
//         }
//         break;
//     }
//     return true;
//   };

//   // Enhanced token refresh function
//   const refreshToken = async (): Promise<string | null> => {
//     try {
//       const { token: currentToken } = getAuthToken();
//       if (!currentToken) return null;

//       // Try to refresh the token
//       const response = await fetch('/api/auth/refresh', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${currentToken}`
//         }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.token) {
//           // Store the new token with the same key that was found
//           const { foundKey } = getAuthToken();
//           const storageKey = foundKey.startsWith('session:') 
//             ? foundKey.replace('session:', '') 
//             : foundKey || 'token';
          
//           if (foundKey.startsWith('session:')) {
//             sessionStorage.setItem(storageKey, data.token);
//           } else {
//             localStorage.setItem(storageKey, data.token);
//           }
          
//           console.log('✅ Token refreshed successfully');
//           return data.token;
//         }
//       }
//     } catch (error) {
//       console.error('❌ Token refresh failed:', error);
//     }
//     return null;
//   };


// //
// // In your CreatePackageModal.tsx, update the handleSubmit function:

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setError('');
  
//   if (!validateStep(4)) {
//     return;
//   }

//   setLoading(true);

//   try {
//     // Upload images to Cloudinary first
//     setUploadingImages(true);
//     let thumbnailUrl = '';
//     const imageUrls: string[] = [];

//     console.log('Starting image uploads...');

//     if (packageData.thumbnail) {
//       try {
//         thumbnailUrl = await uploadToCloudinary(packageData.thumbnail);
//         console.log('Thumbnail uploaded successfully');
//       } catch (error) {
//         throw new Error(`Failed to upload thumbnail: ${getErrorMessage(error)}`);
//       }
//     }

//     for (let i = 0; i < packageData.images.length; i++) {
//       try {
//         const url = await uploadToCloudinary(packageData.images[i]);
//         imageUrls.push(url);
//       } catch (error) {
//         console.warn(`Failed to upload gallery image ${i + 1}:`, getErrorMessage(error));
//       }
//     }

//     setUploadingImages(false);
//     console.log('All image uploads completed');

//     // Get token from localStorage (this matches your AuthContext)
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setError('Authentication required. Please log in again.');
//       return;
//     }

//     // Prepare package data for API
//     const packagePayload = {
//       title: packageData.title.trim(),
//       destination: packageData.destination.trim(),
//       description: packageData.description.trim(),
//       duration: packageData.duration,
//       price: packageData.price,
//       originalPrice: packageData.originalPrice || packageData.price,
//       category: packageData.category,
//       type: packageData.type,
//       maxGroupSize: packageData.maxGroupSize,
//       minAge: packageData.minAge,
//       inclusions: packageData.inclusions.filter(item => item.trim() !== ''),
//       exclusions: packageData.exclusions.filter(item => item.trim() !== ''),
//       itinerary: packageData.itinerary.map(day => ({
//         ...day,
//         title: day.title.trim(),
//         description: day.description.trim(),
//         accommodation: day.accommodation?.trim() || ''
//       })),
//       highlights: packageData.highlights.filter(item => item.trim() !== ''),
//       thumbnail: thumbnailUrl,
//       images: imageUrls,
//       isActive: packageData.isActive,
//       isFeatured: packageData.isFeatured
//     };

//     console.log('Making API call to create package...');

//     // Make request WITH proper Authorization header
//     const response = await fetch('/api/admin/packages', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}` // This is what your middleware expects
//       },
//       body: JSON.stringify(packagePayload)
//     });

//     console.log('API Response status:', response.status);

//     if (!response.ok) {
//       const responseText = await response.text();
//       let responseData;
//       try {
//         responseData = JSON.parse(responseText);
//       } catch {
//         responseData = { error: responseText || 'Server error' };
//       }

//       if (response.status === 401) {
//         setError('Authentication failed. Please log in again.');
//         // Clear invalid token
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         return;
//       } else if (response.status === 403) {
//         setError('Access denied. Admin privileges required.');
//         return;
//       }
      
//       throw new Error(responseData.error || responseData.message || `Server error: ${response.status}`);
//     }

//     const responseData = await response.json();
//     console.log('Package created successfully:', responseData);

//     // Success
//     onPackageCreated();
//     onClose();
//     resetForm();
    
//   } catch (error: any) {
//     console.error('Error creating package:', error);
//     setError(getErrorMessage(error));
//     setShowDebug(true);
//     setDebugInfo(gatherDebugInfo());
//   } finally {
//     setLoading(false);
//     setUploadingImages(false);
//   }
// };


//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       if (currentStep < 4) setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) setCurrentStep(currentStep - 1);
//   };

//   // Enhanced debug component
//   const DebugPanel = () => {
//     if (!showDebug || !debugInfo) return null;

//     return (
//       <div className="mx-6 mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//         <div className="flex items-center mb-2">
//           <Info className="h-5 w-5 text-blue-500 mr-2" />
//           <h4 className="text-sm font-medium text-blue-900">Enhanced Authentication Debug Info</h4>
//           <button
//             onClick={() => setShowDebug(false)}
//             className="ml-auto text-blue-400 hover:text-blue-600"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </div>
//         <div className="text-xs space-y-2">
//           <div><strong>Has Auth Token:</strong> {debugInfo.hasAuthToken ? '✅ Yes' : '❌ No'}</div>
//           <div><strong>Token Length:</strong> {debugInfo.tokenLength}</div>
//           <div><strong>Found Token Key:</strong> <code>{debugInfo.foundTokenKey}</code></div>
//           <div><strong>Token Preview:</strong> <code>{debugInfo.tokenPreview}</code></div>
//           <div><strong>Is Valid JWT:</strong> {debugInfo.isValidJWT ? '✅ Valid' : '❌ Invalid/Expired'}</div>
//           <div><strong>Token Expiry:</strong> {debugInfo.tokenExpiry}</div>
//           <div><strong>Session Token:</strong> {debugInfo.sessionToken ? '✅ Yes' : '❌ No'}</div>
//           <div><strong>All Storage Keys:</strong> {debugInfo.allStorageKeys.join(', ') || 'None'}</div>
//         </div>
//         <div className="mt-3 text-xs text-blue-700">
//           <strong>Quick Actions:</strong>
//           <div className="flex gap-2 mt-1">
//             <button
//               onClick={() => {
//                 // Clear all tokens
//                 localStorage.removeItem('token');
//                 localStorage.removeItem('auth-token');
//                 localStorage.removeItem('authToken');
//                 sessionStorage.clear();
//                 setError('All tokens cleared. Please log in again.');
//               }}
//               className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
//             >
//               Clear Tokens
//             </button>
//             <button
//               onClick={() => {
//                 setDebugInfo(gatherDebugInfo());
//               }}
//               className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
//             >
//               Refresh Debug
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (!isOpen) return null;

//   const stepTitles = [
//     'Basic Information',
//     'Pricing & Details', 
//     'Itinerary Planning',
//     'Media & Settings'
//   ];

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
//         {/* Header - Fixed */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Create New Package</h2>
//             <p className="text-gray-600">Step {currentStep} of 4 - {stepTitles[currentStep - 1]}</p>
//           </div>
//           <button
//             onClick={() => {
//               onClose();
//               resetForm();
//             }}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         {/* Progress Bar - Fixed */}
//         <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
//           <div className="flex items-center space-x-2">
//             {[1, 2, 3, 4].map((step) => (
//               <div key={step} className="flex items-center flex-1">
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
//                   step < currentStep 
//                     ? 'bg-green-500 text-white' 
//                     : step === currentStep
//                     ? 'bg-orange-500 text-white'
//                     : 'bg-gray-200 text-gray-600'
//                 }`}>
//                   {step < currentStep ? <Check className="h-4 w-4" /> : step}
//                 </div>
//                 {step < 4 && (
//                   <div className={`flex-1 h-1 mx-2 ${
//                     step < currentStep ? 'bg-green-500' : 'bg-gray-200'
//                   }`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Debug Panel */}
//         <DebugPanel />

//         {/* Error Display - Fixed */}
//         {error && (
//           <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
//             <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
//             <div className="flex-1">
//               <p className="text-sm text-red-600 font-medium">Error</p>
//               <p className="text-sm text-red-600">{error}</p>
//               {!showDebug && (
//                 <button
//                   onClick={() => {
//                     setShowDebug(true);
//                     setDebugInfo(gatherDebugInfo());
//                   }}
//                   className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
//                 >
//                   Show Debug Info
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Form Content - Same as before but consolidated for space */}
//         <div className="flex-1 overflow-y-auto">
//           <form onSubmit={handleSubmit} className="p-6">
//             {/* Step 1: Basic Information + Highlights/Inclusions/Exclusions */}
//             {currentStep === 1 && (
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Package Title *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={packageData.title}
//                       onChange={(e) => handleInputChange('title', e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                       placeholder="Amazing Kerala Backwaters"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Destination *
//                     </label>
//                     <div className="relative">
//                       <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                       <input
//                         type="text"
//                         required
//                         value={packageData.destination}
//                         onChange={(e) => handleInputChange('destination', e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                         placeholder="Kerala, India"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Package Type *
//                     </label>
//                     <div className="flex space-x-4">
//                       <label className="flex items-center cursor-pointer">
//                         <input
//                           type="radio"
//                           value="domestic"
//                           checked={packageData.type === 'domestic'}
//                           onChange={(e) => handleInputChange('type', e.




//                             target.value)}
//                           className="mr-2 text-orange-500 focus:ring-orange-500"
//                         />
//                         <Home className="h-4 w-4 mr-1" />
//                         Domestic
//                       </label>
//                       <label className="flex items-center cursor-pointer">
//                         <input
//                           type="radio"
//                           value="international"
//                           checked={packageData.type === 'international'}
//                           onChange={(e) => handleInputChange('type', e.target.value)}
//                           className="mr-2 text-orange-500 focus:ring-orange-500"
//                         />
//                         <Globe className="h-4 w-4 mr-1" />
//                         International
//                       </label>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Category *
//                     </label>
//                     <select
//                       required
//                       value={packageData.category}
//                       onChange={(e) => handleInputChange('category', e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map(category => (
//                         <option key={category} value={category}>{category}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Duration (Days) *
//                     </label>
//                     <div className="relative">
//                       <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                       <input
//                         type="number"
//                         min="1"
//                         max="365"
//                         required
//                         value={packageData.duration}
//                         onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 1)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Max Group Size *
//                     </label>
//                     <div className="relative">
//                       <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                       <input
//                         type="number"
//                         min="1"
//                         max="50"
//                         required
//                         value={packageData.maxGroupSize}
//                         onChange={(e) => handleInputChange('maxGroupSize', parseInt(e.target.value) || 1)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Package Description *
//                   </label>
//                   <textarea
//                     required
//                     rows={4}
//                     value={packageData.description}
//                     onChange={(e) => handleInputChange('description', e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
//                     placeholder="Describe your package in detail..."
//                   />
//                 </div>

//                 {/* Package Highlights */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Package Highlights
//                   </label>
//                   <div className="space-y-2">
//                     {packageData.highlights.map((highlight, index) => (
//                       <div key={index} className="flex items-center space-x-2">
//                         <Star className="h-4 w-4 text-orange-500 flex-shrink-0" />
//                         <input
//                           type="text"
//                           value={highlight}
//                           onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
//                           className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                           placeholder="Enter highlight..."
//                         />
//                         {packageData.highlights.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeArrayItem('highlights', index)}
//                             className="text-red-500 hover:text-red-700 p-1"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={() => addArrayItem('highlights')}
//                       className="flex items-center text-orange-600 hover:text-orange-700 text-sm font-medium"
//                     >
//                       <Plus className="h-4 w-4 mr-1" />
//                       Add Highlight
//                     </button>
//                   </div>
//                 </div>

//                 {/* Inclusions */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     What's Included
//                   </label>
//                   <div className="space-y-2">
//                     {packageData.inclusions.map((inclusion, index) => (
//                       <div key={index} className="flex items-center space-x-2">
//                         <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
//                         <input
//                           type="text"
//                           value={inclusion}
//                           onChange={(e) => handleArrayChange('inclusions', index, e.target.value)}
//                           className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                           placeholder="What's included..."
//                         />
//                         {packageData.inclusions.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeArrayItem('inclusions', index)}
//                             className="text-red-500 hover:text-red-700 p-1"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={() => addArrayItem('inclusions')}
//                       className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
//                     >
//                       <Plus className="h-4 w-4 mr-1" />
//                       Add Inclusion
//                     </button>
//                   </div>
//                 </div>

//                 {/* Exclusions */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     What's Not Included
//                   </label>
//                   <div className="space-y-2">
//                     {packageData.exclusions.map((exclusion, index) => (
//                       <div key={index} className="flex items-center space-x-2">
//                         <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
//                         <input
//                           type="text"
//                           value={exclusion}
//                           onChange={(e) => handleArrayChange('exclusions', index, e.target.value)}
//                           className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                           placeholder="What's not included..."
//                         />
//                         {packageData.exclusions.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeArrayItem('exclusions', index)}
//                             className="text-red-500 hover:text-red-700 p-1"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={() => addArrayItem('exclusions')}
//                       className="flex items-center text-red-600 hover:text-red-700 text-sm font-medium"
//                     >
//                       <Plus className="h-4 w-4 mr-1" />
//                       Add Exclusion
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 2: Pricing */}
//             {currentStep === 2 && (
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Current Price (₹) *
//                     </label>
//                     <div className="relative">
//                       <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                       <input
//                         type="number"
//                         min="0"
//                         step="100"
//                         required
//                         value={packageData.price || ''}
//                         onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Original Price (₹)
//                     </label>
//                     <div className="relative">
//                       <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                       <input
//                         type="number"
//                         min="0"
//                         step="100"
//                         value={packageData.originalPrice || ''}
//                         onChange={(e) => handleInputChange('originalPrice', parseInt(e.target.value) || 0)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                         placeholder="Leave empty if no discount"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Minimum Age
//                     </label>
//                     <input
//                       type="number"
//                       min="0"
//                       max="100"
//                       value={packageData.minAge || ''}
//                       onChange={(e) => handleInputChange('minAge', parseInt(e.target.value) || 0)}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 3: Itinerary */}
//             {currentStep === 3 && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-lg font-semibold text-gray-900">Daily Itinerary</h3>
//                   <button
//                     type="button"
//                     onClick={addItineraryDay}
//                     className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//                   >
//                     <Plus className="h-4 w-4 mr-2" />
//                     Add Day
//                   </button>
//                 </div>

//                 <div className="space-y-6">
//                   {packageData.itinerary.map((day, index) => (
//                     <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//                       <div className="flex items-center justify-between mb-4">
//                         <h4 className="font-semibold text-gray-900 flex items-center">
//                           <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
//                             {day.day}
//                           </span>
//                           Day {day.day}
//                         </h4>
//                         {packageData.itinerary.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeItineraryDay(index)}
//                             className="text-red-500 hover:text-red-700 p-2"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </button>
//                         )}
//                       </div>

//                       <div className="grid grid-cols-1 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Day Title
//                           </label>
//                           <input
//                             type="text"
//                             value={day.title}
//                             onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                             placeholder="e.g., Arrival in Kerala"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Description
//                           </label>
//                           <textarea
//                             rows={3}
//                             value={day.description}
//                             onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
//                             placeholder="Describe the day's activities..."
//                           />
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Meals Included
//                             </label>
//                             <div className="flex flex-wrap gap-2">
//                               {mealOptions.map(meal => (
//                                 <label key={meal} className="flex items-center cursor-pointer">
//                                   <input
//                                     type="checkbox"
//                                     checked={day.meals.includes(meal)}
//                                     onChange={(e) => {
//                                       const meals = e.target.checked
//                                         ? [...day.meals, meal]
//                                         : day.meals.filter(m => m !== meal);
//                                       handleItineraryChange(index, 'meals', meals);
//                                     }}
//                                     className="mr-1 text-orange-500 focus:ring-orange-500 rounded"
//                                   />
//                                   <span className="text-sm">{meal}</span>
//                                 </label>
//                               ))}
//                             </div>
//                           </div>

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Accommodation
//                             </label>
//                             <input
//                               type="text"
//                               value={day.accommodation}
//                               onChange={(e) => handleItineraryChange(index, 'accommodation', e.target.value)}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                               placeholder="Hotel name or type"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Step 4: Media Upload and Settings */}
//             {currentStep === 4 && (
//               <div className="space-y-6">
//                 {/* Thumbnail Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Package Thumbnail * (Main display image)
//                   </label>
//                   <div
//                     onClick={() => thumbnailInputRef.current?.click()}
//                     className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-orange-500 transition-colors bg-gray-50 hover:bg-orange-50"
//                   >
//                     {packageData.thumbnail ? (
//                       <div className="relative">
//                         <img
//                           src={URL.createObjectURL(packageData.thumbnail)}
//                           alt="Thumbnail preview"
//                           className="max-h-48 mx-auto rounded-lg object-cover"
//                         />
//                         <button
//                           type="button"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleInputChange('thumbnail', null);
//                           }}
//                           className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
//                         >
//                           <X className="h-4 w-4" />
//                         </button>
//                         <p className="text-sm text-gray-600 mt-2">Click to change thumbnail</p>
//                       </div>
//                     ) : (
//                       <div>
//                         <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <p className="text-gray-600 font-medium">Click to upload thumbnail image</p>
//                         <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB (Recommended: 1200x800px)</p>
//                       </div>
//                     )}
//                   </div>
//                   <input
//                     ref={thumbnailInputRef}
//                     type="file"
//                     accept="image/*"
//                     onChange={handleThumbnailUpload}
//                     className="hidden"
//                   />
//                 </div>

//                 {/* Gallery Images */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Package Gallery Images (Optional)
//                   </label>
//                   <div
//                     onClick={() => fileInputRef.current?.click()}
//                     className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-orange-500 transition-colors bg-gray-50 hover:bg-orange-50"
//                   >
//                     <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-600 font-medium">Click to upload gallery images</p>
//                     <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB each, multiple files allowed</p>
//                   </div>
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={handleImageUpload}
//                     className="hidden"
//                   />

//                   {packageData.images.length > 0 && (
//                     <div className="mt-4">
//                       <h4 className="text-sm font-medium text-gray-700 mb-2">
//                         Gallery Images ({packageData.images.length})
//                       </h4>
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         {packageData.images.map((image, index) => (
//                           <div key={index} className="relative group">
//                             <img
//                               src={URL.createObjectURL(image)}
//                               alt={`Gallery ${index + 1}`}
//                               className="w-full h-24 object-cover rounded-lg border border-gray-200"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeImage(index)}
//                               className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
//                             >
//                               <X className="h-3 w-3" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Package Settings */}
//                 <div className="bg-gray-50 rounded-lg p-6">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Settings</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
//                       <div>
//                         <h4 className="font-medium text-gray-900">Package Status</h4>
//                         <p className="text-sm text-gray-600">Make package visible to customers</p>
//                       </div>
//                       <label className="relative inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={packageData.isActive}
//                           onChange={(e) => handleInputChange('isActive', e.target.checked)}
//                           className="sr-only peer"
//                         />
//                         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
//                       </label>
//                     </div>

//                     <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
//                       <div>
//                         <h4 className="font-medium text-gray-900">Featured Package</h4>
//                         <p className="text-sm text-gray-600">Show in featured section on homepage</p>
//                       </div>
//                       <label className="relative inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={packageData.isFeatured}
//                           onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
//                           className="sr-only peer"
//                         />
//                         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </form>
//         </div>

//         {/* Footer - Fixed */}
//         <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
//           <div className="flex space-x-3">
//             {currentStep > 1 && (
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 disabled={loading}
//                 className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Previous
//               </button>
//             )}
//           </div>

//           <div className="flex space-x-3">
//             {currentStep < 4 ? (
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 disabled={loading}
//                 className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={loading || uploadingImages}
//                 className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//               >
//                 {loading ? (
//                   <div className="flex items-center">
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                     {uploadingImages ? 'Uploading Images...' : 'Creating Package...'}
//                   </div>
//                 ) : (
//                   <>
//                     <Check className="h-4 w-4 mr-2" />
//                     Create Package
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePackageModal;
















// src/components/admin/CreatePackageModal.tsx
import React, { useState, useRef } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import {
  X,
  Upload,
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  Plus,
  Trash2,
  Globe,
  Home,
  Star,
  AlertCircle,
  Check,
  Info,
} from 'lucide-react';

interface CreatePackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPackageCreated: () => void;
}

interface PackageData {
  title: string;
  destination: string;
  description: string;
  duration: number;
  price: number;
  originalPrice: number;
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
  images: File[];
  thumbnail: File | null;
  isActive: boolean;
  isFeatured: boolean;
}

interface DebugInfo {
  hasAuthToken: boolean;
  tokenLength: number;
  allStorageKeys: string[];
  tokenPreview: string;
  sessionToken: boolean;
  foundTokenKey: string;
  isValidJWT: boolean;
  tokenExpiry: string;
}

// Define interface for JWT payload
interface JWTPayload {
  id?: string;
  userId?: string;
  _id?: string;
  sub?: string;
  email?: string;
  role?: string;
  exp?: number;
}

const CreatePackageModal: React.FC<CreatePackageModalProps> = ({
  isOpen,
  onClose,
  onPackageCreated,
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string>('');
  const [showDebug, setShowDebug] = useState(false);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [packageData, setPackageData] = useState<PackageData>({
    title: '',
    destination: '',
    description: '',
    duration: 1,
    price: 0,
    originalPrice: 0,
    category: '',
    type: 'domestic',
    maxGroupSize: 10,
    minAge: 0,
    inclusions: [''],
    exclusions: [''],
    itinerary: [
      {
        day: 1,
        title: '',
        description: '',
        meals: [],
        accommodation: '',
      },
    ],
    highlights: [''],
    images: [],
    thumbnail: null,
    isActive: true,
    isFeatured: false,
  });

  const categories = [
    'Adventure',
    'Beach',
    'Cultural',
    'Family',
    'Honeymoon',
    'Luxury',
    'Pilgrimage',
    'Wildlife',
    'Historical',
    'Religious',
  ];

  const mealOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  // Enhanced auth token retrieval function
  const getAuthToken = (): { token: string | null; foundKey: string } => {
    const possibleKeys = [
      'token',
      'auth-token',
      'authToken',
      'auth_token',
      'access_token',
      'jwt',
      'bearerToken',
      'accessToken',
      'user_token',
      'adminToken',
    ];

    for (const key of possibleKeys) {
      const token = localStorage.getItem(key);
      if (token) {
        console.log(`✅ Token found in localStorage with key: ${key}`);
        return { token, foundKey: key };
      }
    }

    for (const key of possibleKeys) {
      const token = sessionStorage.getItem(key);
      if (token) {
        console.log(`✅ Token found in sessionStorage with key: ${key}`);
        return { token, foundKey: `session:${key}` };
      }
    }

    console.log('❌ No token found in any storage with any common key');
    return { token: null, foundKey: '' };
  };

  // Enhanced token validation
  const validateToken = (token: string): { isValid: boolean; payload: JWTPayload | null; expiry: string } => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return { isValid: false, payload: null, expiry: 'Invalid format' };
      }

      const payload = JSON.parse(atob(parts[1])) as JWTPayload;
      const expiry = payload.exp ? new Date(payload.exp * 1000).toLocaleString() : 'No expiry';
      const isExpired = payload.exp ? payload.exp * 1000 < Date.now() : false;

      return {
        isValid: !isExpired,
        payload,
        expiry: isExpired ? `Expired at ${expiry}` : expiry,
      };
    } catch {
      return { isValid: false, payload: null, expiry: 'Cannot decode' };
    }
  };

  // Debug function to gather auth information
  const gatherDebugInfo = (): DebugInfo => {
    const { token, foundKey } = getAuthToken();
    const allLocalKeys = Object.keys(localStorage);
    const allSessionKeys = Object.keys(sessionStorage);
    const sessionToken = sessionStorage.getItem('authToken') || sessionStorage.getItem('token');

    let isValidJWT = false;
    let tokenExpiry = 'No token';

    if (token) {
      const validation = validateToken(token);
      isValidJWT = validation.isValid;
      tokenExpiry = validation.expiry;
    }

    const info: DebugInfo = {
      hasAuthToken: !!token,
      tokenLength: token?.length || 0,
      allStorageKeys: [...allLocalKeys, ...allSessionKeys.map((k) => `session:${k}`)],
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'No token',
      sessionToken: !!sessionToken,
      foundTokenKey: foundKey,
      isValidJWT,
      tokenExpiry,
    };

    console.log('🔍 Enhanced Debug Info:', info);
    return info;
  };

  const resetForm = () => {
    setPackageData({
      title: '',
      destination: '',
      description: '',
      duration: 1,
      price: 0,
      originalPrice: 0,
      category: '',
      type: 'domestic',
      maxGroupSize: 10,
      minAge: 0,
      inclusions: [''],
      exclusions: [''],
      itinerary: [
        {
          day: 1,
          title: '',
          description: '',
          meals: [],
          accommodation: '',
        },
      ],
      highlights: [''],
      images: [],
      thumbnail: null,
      isActive: true,
      isFeatured: false,
    });
    setCurrentStep(1);
    setError('');
    setShowDebug(false);
    setDebugInfo(null);
  };

  const handleInputChange = (field: keyof PackageData, value: PackageData[keyof PackageData]) => {
    setPackageData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError('');
  };

  const handleArrayChange = (field: 'inclusions' | 'exclusions' | 'highlights', index: number, value: string) => {
    setPackageData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field: 'inclusions' | 'exclusions' | 'highlights') => {
    setPackageData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayItem = (field: 'inclusions' | 'exclusions' | 'highlights', index: number) => {
    if (packageData[field].length > 1) {
      setPackageData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  const handleItineraryChange = (index: number, field: keyof PackageData['itinerary'][number], value: string | string[]) => {
    setPackageData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addItineraryDay = () => {
    setPackageData((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          day: prev.itinerary.length + 1,
          title: '',
          description: '',
          meals: [],
          accommodation: '',
        },
      ],
    }));
  };

  const removeItineraryDay = (index: number) => {
    if (packageData.itinerary.length > 1) {
      setPackageData((prev) => ({
        ...prev,
        itinerary: prev.itinerary
          .filter((_, i) => i !== index)
          .map((item, i) => ({ ...item, day: i + 1 })),
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPackageData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPackageData((prev) => ({
      ...prev,
      thumbnail: file,
    }));
  };

  const removeImage = (index: number) => {
    setPackageData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Helper function to safely get error message
  const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'string') return error;
    if (error instanceof Error) return error.message;
    if (error && typeof error === 'object' && 'message' in error) return String(error.message);
    return 'An unexpected error occurred';
  };

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/cloudinary', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
        throw new Error(errorData.error || `Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.url;
    } catch {
      try {
        const base64Image = await fileToBase64(file);

        const response = await fetch('/api/upload/cloudinary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Image }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
          throw new Error(errorData.error || `Upload failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.url;
      } catch (fallbackError) {
        throw new Error(getErrorMessage(fallbackError));
      }
    }
  };

  // Enhanced token refresh function
  const refreshToken = async (): Promise<string | null> => {
    try {
      const { token: currentToken, foundKey } = getAuthToken();
      if (!currentToken) return null;

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          const storageKey = foundKey.startsWith('session:') ? foundKey.replace('session:', '') : foundKey || 'token';
          if (foundKey.startsWith('session:')) {
            sessionStorage.setItem(storageKey, data.token);
          } else {
            localStorage.setItem(storageKey, data.token);
          }
          console.log('✅ Token refreshed successfully');
          return data.token;
        }
      }
    } catch (error) {
      console.error('❌ Token refresh failed:', error);
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateStep(4)) {
      return;
    }

    setLoading(true);

    try {
      setUploadingImages(true);
      let thumbnailUrl = '';
      const imageUrls: string[] = [];

      console.log('Starting image uploads...');

      if (packageData.thumbnail) {
        try {
          thumbnailUrl = await uploadToCloudinary(packageData.thumbnail);
          console.log('Thumbnail uploaded successfully');
        } catch (error) {
          throw new Error(`Failed to upload thumbnail: ${getErrorMessage(error)}`);
        }
      }

      for (let i = 0; i < packageData.images.length; i++) {
        try {
          const url = await uploadToCloudinary(packageData.images[i]);
          imageUrls.push(url);
        } catch (error) {
          console.warn(`Failed to upload gallery image ${i + 1}:`, getErrorMessage(error));
        }
      }

      setUploadingImages(false);
      console.log('All image uploads completed');

      let token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please log in again.');
        return;
      }

      // Check token validity
      const { isValid: isTokenValid, expiry } = validateToken(token);
      if (!isTokenValid) {
        console.log('Token is invalid or expired:', expiry);
        const newToken = await refreshToken();
        if (!newToken) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          return;
        }
        token = newToken;
      }

      const packagePayload = {
        title: packageData.title.trim(),
        destination: packageData.destination.trim(),
        description: packageData.description.trim(),
        duration: packageData.duration,
        price: packageData.price,
        originalPrice: packageData.originalPrice || packageData.price,
        category: packageData.category,
        type: packageData.type,
        maxGroupSize: packageData.maxGroupSize,
        minAge: packageData.minAge,
        inclusions: packageData.inclusions.filter((item) => item.trim() !== ''),
        exclusions: packageData.exclusions.filter((item) => item.trim() !== ''),
        itinerary: packageData.itinerary.map((day) => ({
          ...day,
          title: day.title.trim(),
          description: day.description.trim(),
          accommodation: day.accommodation?.trim() || '',
        })),
        highlights: packageData.highlights.filter((item) => item.trim() !== ''),
        thumbnail: thumbnailUrl,
        images: imageUrls,
        isActive: packageData.isActive,
        isFeatured: packageData.isFeatured,
      };

      console.log('Making API call to create package...');

      const response = await fetch('/api/admin/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(packagePayload),
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const responseText = await response.text();
        let responseData;
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = { error: responseText || 'Server error' };
        }

        if (response.status === 401) {
          const newToken = await refreshToken();
          if (!newToken) {
            setError('Authentication failed. Please log in again.');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return;
          }
          // Retry with new token
          const retryResponse = await fetch('/api/admin/packages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newToken}`,
            },
            body: JSON.stringify(packagePayload),
          });

          if (!retryResponse.ok) {
            const retryData = await retryResponse.json().catch(() => ({ error: 'Server error' }));
            throw new Error(retryData.error || retryData.message || `Server error: ${retryResponse.status}`);
          }

          const retryData = await retryResponse.json();
          console.log('Package created successfully with new token:', retryData);
          onPackageCreated();
          onClose();
          resetForm();
          return;
        } else if (response.status === 403) {
          setError('Access denied. Admin privileges required.');
          return;
        }

        throw new Error(responseData.error || responseData.message || `Server error: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Package created successfully:', responseData);

      onPackageCreated();
      onClose();
      resetForm();
    } catch (error: unknown) {
      console.error('Error creating package:', error);
      setError(getErrorMessage(error));
      setShowDebug(true);
      setDebugInfo(gatherDebugInfo());
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!packageData.title.trim()) {
          setError('Package title is required');
          return false;
        }
        if (!packageData.destination.trim()) {
          setError('Destination is required');
          return false;
        }
        if (!packageData.category) {
          setError('Category is required');
          return false;
        }
        if (!packageData.description.trim()) {
          setError('Description is required');
          return false;
        }
        break;
      case 2:
        if (packageData.price <= 0) {
          setError('Price must be greater than 0');
          return false;
        }
        break;
      case 4:
        if (!packageData.thumbnail) {
          setError('Thumbnail image is required');
          return false;
        }
        break;
    }
    return true;
  };

  const DebugPanel = () => {
    if (!showDebug || !debugInfo) return null;

    return (
      <div className="mx-6 mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center mb-2">
          <Info className="h-5 w-5 text-blue-500 mr-2" />
          <h4 className="text-sm font-medium text-blue-900">Enhanced Authentication Debug Info</h4>
          <button
            onClick={() => setShowDebug(false)}
            className="ml-auto text-blue-400 hover:text-blue-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="text-xs space-y-2">
          <div>
            <strong>Has Auth Token:</strong> {debugInfo.hasAuthToken ? '✅ Yes' : '❌ No'}
          </div>
          <div>
            <strong>Token Length:</strong> {debugInfo.tokenLength}
          </div>
          <div>
            <strong>Found Token Key:</strong> <code>{debugInfo.foundTokenKey}</code>
          </div>
          <div>
            <strong>Token Preview:</strong> <code>{debugInfo.tokenPreview}</code>
          </div>
          <div>
            <strong>Is Valid JWT:</strong> {debugInfo.isValidJWT ? '✅ Valid' : '❌ Invalid/Expired'}
          </div>
          <div>
            <strong>Token Expiry:</strong> {debugInfo.tokenExpiry}
          </div>
          <div>
            <strong>Session Token:</strong> {debugInfo.sessionToken ? '✅ Yes' : '❌ No'}
          </div>
          <div>
            <strong>All Storage Keys:</strong> {debugInfo.allStorageKeys.join(', ') || 'None'}
          </div>
        </div>
        <div className="mt-3 text-xs text-blue-700">
          <strong>Quick Actions:</strong>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('auth-token');
                localStorage.removeItem('authToken');
                sessionStorage.clear();
                setError('All tokens cleared. Please log in again.');
              }}
              className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
            >
              Clear Tokens
            </button>
            <button
              onClick={() => {
                setDebugInfo(gatherDebugInfo());
              }}
              className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
            >
              Refresh Debug
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  const stepTitles = ['Basic Information', 'Pricing & Details', 'Itinerary Planning', 'Media & Settings'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Package</h2>
            <p className="text-gray-600">
              Step {currentStep} of 4 - {stepTitles[currentStep - 1]}
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    step < currentStep
                      ? 'bg-green-500 text-white'
                      : step === currentStep
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step < currentStep ? <Check className="h-4 w-4" /> : step}
                </div>
                {step < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <DebugPanel />

        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-600 font-medium">Error</p>
              <p className="text-sm text-red-600">{error}</p>
              {!showDebug && (
                <button
                  onClick={() => {
                    setShowDebug(true);
                    setDebugInfo(gatherDebugInfo());
                  }}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Show Debug Info
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={packageData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Amazing Kerala Backwaters"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destination *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={packageData.destination}
                        onChange={(e) => handleInputChange('destination', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Kerala, India"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Type *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          value="domestic"
                          checked={packageData.type === 'domestic'}
                          onChange={(e) => handleInputChange('type', e.target.value as 'domestic' | 'international')}
                          className="mr-2 text-orange-500 focus:ring-orange-500"
                        />
                        <Home className="h-4 w-4 mr-1" />
                        Domestic
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          value="international"
                          checked={packageData.type === 'international'}
                          onChange={(e) => handleInputChange('type', e.target.value as 'domestic' | 'international')}
                          className="mr-2 text-orange-500 focus:ring-orange-500"
                        />
                        <Globe className="h-4 w-4 mr-1" />
                        International
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={packageData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (Days) *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        min="1"
                        max="365"
                        required
                        value={packageData.duration}
                        onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 1)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Group Size *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        min="1"
                        max="50"
                        required
                        value={packageData.maxGroupSize}
                        onChange={(e) => handleInputChange('maxGroupSize', parseInt(e.target.value) || 1)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={packageData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    placeholder="Describe your package in detail..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Highlights
                  </label>
                  <div className="space-y-2">
                    {packageData.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-orange-500 flex-shrink-0" />
                        <input
                          type="text"
                          value={highlight}
                          onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Enter highlight..."
                        />
                        {packageData.highlights.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem('highlights', index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('highlights')}
                      className="flex items-center text-orange-600 hover:text-orange-700 text-sm font-medium"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Highlight
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What&apos;s Included
                  </label>
                  <div className="space-y-2">
                    {packageData.inclusions.map((inclusion, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <input
                          type="text"
                          value={inclusion}
                          onChange={(e) => handleArrayChange('inclusions', index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="What&apos;s included..."
                        />
                        {packageData.inclusions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem('inclusions', index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('inclusions')}
                      className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Inclusion
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What&apos;s Not Included
                  </label>
                  <div className="space-y-2">
                    {packageData.exclusions.map((exclusion, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                        <input
                          type="text"
                          value={exclusion}
                          onChange={(e) => handleArrayChange('exclusions', index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="What&apos;s not included..."
                        />
                        {packageData.exclusions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem('exclusions', index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('exclusions')}
                      className="flex items-center text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Exclusion
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Price (₹) *
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        min="0"
                        step="100"
                        required
                        value={packageData.price || ''}
                        onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price (₹)
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        min="0"
                        step="100"
                        value={packageData.originalPrice || ''}
                        onChange={(e) => handleInputChange('originalPrice', parseInt(e.target.value) || 0)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Leave empty if no discount"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Age
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={packageData.minAge || ''}
                      onChange={(e) => handleInputChange('minAge', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Daily Itinerary</h3>
                  <button
                    type="button"
                    onClick={addItineraryDay}
                    className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Day
                  </button>
                </div>

                <div className="space-y-6">
                  {packageData.itinerary.map((day, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 flex items-center">
                          <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                            {day.day}
                          </span>
                          Day {day.day}
                        </h4>
                        {packageData.itinerary.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItineraryDay(index)}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Day Title
                          </label>
                          <input
                            type="text"
                            value={day.title}
                            onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="e.g., Arrival in Kerala"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            rows={3}
                            value={day.description}
                            onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                            placeholder="Describe the day's activities..."
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Meals Included
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {mealOptions.map((meal) => (
                                <label key={meal} className="flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={day.meals.includes(meal)}
                                    onChange={(e) => {
                                      const meals = e.target.checked
                                        ? [...day.meals, meal]
                                        : day.meals.filter((m) => m !== meal);
                                      handleItineraryChange(index, 'meals', meals);
                                    }}
                                    className="mr-1 text-orange-500 focus:ring-orange-500 rounded"
                                  />
                                  <span className="text-sm">{meal}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Accommodation
                            </label>
                            <input
                              type="text"
                              value={day.accommodation}
                              onChange={(e) => handleItineraryChange(index, 'accommodation', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              placeholder="Hotel name or type"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Thumbnail * (Main display image)
                  </label>
                  <div
                    onClick={() => thumbnailInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-orange-500 transition-colors bg-gray-50 hover:bg-orange-50"
                  >
                    {packageData.thumbnail ? (
                      <div className="relative">
                        <Image
                          src={URL.createObjectURL(packageData.thumbnail)}
                          alt="Thumbnail preview"
                          width={300}
                          height={200}
                          className="max-h-48 mx-auto rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInputChange('thumbnail', null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <p className="text-sm text-gray-600 mt-2">Click to change thumbnail</p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">Click to upload thumbnail image</p>
                        <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB (Recommended: 1200x800px)</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Gallery Images (Optional)
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-orange-500 transition-colors bg-gray-50 hover:bg-orange-50"
                  >
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Click to upload gallery images</p>
                    <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB each, multiple files allowed</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {packageData.images.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Gallery Images ({packageData.images.length})
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {packageData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <Image
                              src={URL.createObjectURL(image)}
                              alt={`Gallery ${index + 1}`}
                              width={150}
                              height={100}
                              className="w-full h-24 object-cover rounded-lg border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div>
                        <h4 className="font-medium text-gray-900">Package Status</h4>
                        <p className="text-sm text-gray-600">Make package visible to customers</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={packageData.isActive}
                          onChange={(e) => handleInputChange('isActive', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div>
                        <h4 className="font-medium text-gray-900">Featured Package</h4>
                        <p className="text-sm text-gray-600">Show in featured section on homepage</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={packageData.isFeatured}
                          onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex space-x-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
            )}
          </div>

          <div className="flex space-x-3">
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (validateStep(currentStep)) {
                    setCurrentStep(currentStep + 1);
                  }
                }}
                disabled={loading}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || uploadingImages}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {uploadingImages ? 'Uploading Images...' : 'Creating Package...'}
                  </div>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Create Package
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePackageModal;