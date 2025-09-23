

// // src/components/admin/PackageForm.tsx - Updated with Wishlist functionality
// import React, { useState } from 'react';
// import {
//   Save,
//   Plus,
//   Trash2,
//   Upload,
//   MapPin,
//   Calendar,
//   Users,
//   IndianRupee,
//   Star,
//   Tag,
//   Image as ImageIcon,
//   Heart,
//   HeartOff
// } from 'lucide-react';
// import { useAuth } from '@/hooks/useAuth';
// import { useWishlist } from '@/hooks/useWishlist';

// interface PackageFormData {
//   id?: string; // Add ID for existing packages
//   title: string;
//   description: string;
//   shortDescription: string;
//   type: 'domestic' | 'international';
//   category: string;
//   destination: string;
//   duration: number;
//   price: number;
//   originalPrice?: number;
//   images: string[];
//   thumbnail: string;
//   inclusions: string[];
//   exclusions: string[];
//   highlights: string[];
//   bestTime: string;
//   difficulty?: string;
//   maxGroupSize: number;
//   minAge: number;
//   tags: string[];
// }

// interface PackageFormProps {
//   initialData?: Partial<PackageFormData>;
//   onSubmit: (data: PackageFormData) => Promise<void>;
//   onCancel: () => void;
//   isEditing?: boolean;
//   showWishlistButton?: boolean; // New prop to control wishlist button visibility
// }

// const PackageForm: React.FC<PackageFormProps> = ({
//   initialData,
//   onSubmit,
//   onCancel,
//   isEditing = false,
//   showWishlistButton = true
// }) => {
//   const { user } = useAuth();
//   const { 
//     wishlist, 
//     addToWishlist, 
//     removeFromWishlist, 
//     isInWishlist, 
//     loading: wishlistLoading 
//   } = useWishlist();

//   const [formData, setFormData] = useState<PackageFormData>({
//     title: '',
//     description: '',
//     shortDescription: '',
//     type: 'domestic',
//     category: 'Adventure',
//     destination: '',
//     duration: 1,
//     price: 0,
//     originalPrice: 0,
//     images: [],
//     thumbnail: '',
//     inclusions: [''],
//     exclusions: [''],
//     highlights: [''],
//     bestTime: '',
//     difficulty: '',
//     maxGroupSize: 10,
//     minAge: 0,
//     tags: [''],
//     ...initialData
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [wishlistMessage, setWishlistMessage] = useState('');

//   const categories = ['Adventure', 'Beach', 'Cultural', 'Family', 'Honeymoon', 'Luxury', 'Pilgrimage', 'Wildlife'];
//   const difficulties = ['Easy', 'Moderate', 'Challenging', 'Extreme'];

//   // Check if current package is in wishlist
//   const isPackageInWishlist = formData.id ? isInWishlist(formData.id) : false;

//   const handleChange = (field: keyof PackageFormData, value: any) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleArrayChange = (field: keyof PackageFormData, index: number, value: string) => {
//     const array = formData[field] as string[];
//     const newArray = [...array];
//     newArray[index] = value;
//     handleChange(field, newArray);
//   };

//   const addArrayItem = (field: keyof PackageFormData) => {
//     const array = formData[field] as string[];
//     handleChange(field, [...array, '']);
//   };

//   const removeArrayItem = (field: keyof PackageFormData, index: number) => {
//     const array = formData[field] as string[];
//     if (array.length > 1) {
//       handleChange(field, array.filter((_, i) => i !== index));
//     }
//   };

//   const handleWishlistToggle = async () => {
//     if (!user) {
//       setWishlistMessage('Please login to add packages to your wishlist');
//       setTimeout(() => setWishlistMessage(''), 3000);
//       return;
//     }

//     if (!formData.id) {
//       setWishlistMessage('Package must be saved before adding to wishlist');
//       setTimeout(() => setWishlistMessage(''), 3000);
//       return;
//     }

//     try {
//       if (isPackageInWishlist) {
//         await removeFromWishlist(formData.id);
//         setWishlistMessage('Removed from wishlist');
//       } else {
//         await addToWishlist(formData.id);
//         setWishlistMessage('Added to wishlist');
//       }
//       setTimeout(() => setWishlistMessage(''), 3000);
//     } catch (error) {
//       console.error('Wishlist operation failed:', error);
//       setWishlistMessage('Failed to update wishlist');
//       setTimeout(() => setWishlistMessage(''), 3000);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       // Filter out empty strings from arrays
//       const cleanedData = {
//         ...formData,
//         inclusions: formData.inclusions.filter(item => item.trim()),
//         exclusions: formData.exclusions.filter(item => item.trim()),
//         highlights: formData.highlights.filter(item => item.trim()),
//         tags: formData.tags.filter(item => item.trim())
//       };
      
//       await onSubmit(cleanedData);
//     } catch (error) {
//       console.error('Form submission error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const renderStepIndicator = () => (
//     <div className="flex items-center space-x-4 mb-8">
//       {[1, 2, 3].map((step) => (
//         <div
//           key={step}
//           className={`flex items-center ${step < 3 ? 'flex-1' : ''}`}
//         >
//           <div
//             className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//               currentStep >= step
//                 ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
//                 : 'bg-white/20 text-gray-400'
//             }`}
//           >
//             {step}
//           </div>
//           <span className={`ml-2 text-sm ${
//             currentStep >= step ? 'text-white' : 'text-gray-400'
//           }`}>
//             {step === 1 ? 'Basic Info' : step === 2 ? 'Details' : 'Media & Features'}
//           </span>
//           {step < 3 && (
//             <div className={`flex-1 h-px mx-4 ${
//               currentStep > step ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-white/20'
//             }`} />
//           )}
//         </div>
//       ))}
//     </div>
//   );

//   const renderWishlistButton = () => {
//     if (!showWishlistButton || (!isEditing && !formData.id)) return null;

//     return (
//       <div className="flex items-center space-x-4">
//         <button
//           type="button"
//           onClick={handleWishlistToggle}
//           disabled={wishlistLoading || !user}
//           className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
//             isPackageInWishlist
//               ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
//               : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20'
//           } disabled:opacity-50 disabled:cursor-not-allowed`}
//           title={isPackageInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
//         >
//           {wishlistLoading ? (
//             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
//           ) : isPackageInWishlist ? (
//             <Heart className="h-4 w-4 mr-2 fill-current" />
//           ) : (
//             <HeartOff className="h-4 w-4 mr-2" />
//           )}
//           {isPackageInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
//         </button>
        
//         {wishlistMessage && (
//           <div className={`px-3 py-1 rounded-lg text-sm ${
//             wishlistMessage.includes('Failed') 
//               ? 'bg-red-500/20 text-red-400 border border-red-500/30'
//               : 'bg-green-500/20 text-green-400 border border-green-500/30'
//           }`}>
//             {wishlistMessage}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderStep1 = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Package Title *
//           </label>
//           <input
//             type="text"
//             value={formData.title}
//             onChange={(e) => handleChange('title', e.target.value)}
//             className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//             placeholder="Amazing Kashmir Valley Tour"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Destination *
//           </label>
//           <div className="relative">
//             <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <input
//               type="text"
//               value={formData.destination}
//               onChange={(e) => handleChange('destination', e.target.value)}
//               className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="Kashmir, India"
//               required
//             />
//           </div>
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-2">
//           Short Description *
//         </label>
//         <textarea
//           value={formData.shortDescription}
//           onChange={(e) => handleChange('shortDescription', e.target.value)}
//           rows={3}
//           className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
//           placeholder="Experience the breathtaking beauty of Kashmir..."
//           required
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Type *
//           </label>
//           <select
//             value={formData.type}
//             onChange={(e) => handleChange('type', e.target.value as 'domestic' | 'international')}
//             className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//             required
//           >
//             <option value="domestic" className="bg-gray-800">Domestic</option>
//             <option value="international" className="bg-gray-800">International</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Category *
//           </label>
//           <select
//             value={formData.category}
//             onChange={(e) => handleChange('category', e.target.value)}
//             className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//             required
//           >
//             {categories.map(cat => (
//               <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Duration (Days) *
//           </label>
//           <div className="relative">
//             <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <input
//               type="number"
//               value={formData.duration}
//               onChange={(e) => handleChange('duration', parseInt(e.target.value))}
//               className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               min="1"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Max Group Size *
//           </label>
//           <div className="relative">
//             <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <input
//               type="number"
//               value={formData.maxGroupSize}
//               onChange={(e) => handleChange('maxGroupSize', parseInt(e.target.value))}
//               className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               min="1"
//               required
//             />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Price (₹) *
//           </label>
//           <div className="relative">
//             <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <input
//               type="number"
//               value={formData.price}
//               onChange={(e) => handleChange('price', parseFloat(e.target.value))}
//               className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               min="0"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Original Price (₹)
//           </label>
//           <div className="relative">
//             <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <input
//               type="number"
//               value={formData.originalPrice || ''}
//               onChange={(e) => handleChange('originalPrice', parseFloat(e.target.value) || undefined)}
//               className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               min="0"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Minimum Age
//           </label>
//           <input
//             type="number"
//             value={formData.minAge}
//             onChange={(e) => handleChange('minAge', parseInt(e.target.value))}
//             className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//             min="0"
//           />
//         </div>
//       </div>
//     </div>
//   );

//   const renderStep2 = () => (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-2">
//           Detailed Description *
//         </label>
//         <textarea
//           value={formData.description}
//           onChange={(e) => handleChange('description', e.target.value)}
//           rows={6}
//           className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
//           placeholder="Provide detailed information about the package..."
//           required
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Best Time to Visit *
//           </label>
//           <input
//             type="text"
//             value={formData.bestTime}
//             onChange={(e) => handleChange('bestTime', e.target.value)}
//             className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//             placeholder="October to March"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Difficulty Level
//           </label>
//           <select
//             value={formData.difficulty || ''}
//             onChange={(e) => handleChange('difficulty', e.target.value || undefined)}
//             className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//           >
//             <option value="" className="bg-gray-800">Select difficulty</option>
//             {difficulties.map(diff => (
//               <option key={diff} value={diff} className="bg-gray-800">{diff}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Inclusions */}
//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-2">
//           Inclusions *
//         </label>
//         {formData.inclusions.map((inclusion, index) => (
//           <div key={index} className="flex items-center space-x-2 mb-2">
//             <input
//               type="text"
//               value={inclusion}
//               onChange={(e) => handleArrayChange('inclusions', index, e.target.value)}
//               className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="What's included in the package?"
//             />
//             <button
//               type="button"
//               onClick={() => removeArrayItem('inclusions', index)}
//               className="text-red-400 hover:text-red-300"
//               disabled={formData.inclusions.length === 1}
//             >
//               <Trash2 className="h-4 w-4" />
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => addArrayItem('inclusions')}
//           className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
//         >
//           <Plus className="h-4 w-4 mr-1" />
//           Add Inclusion
//         </button>
//       </div>

//       {/* Exclusions */}
//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-2">
//           Exclusions *
//         </label>
//         {formData.exclusions.map((exclusion, index) => (
//           <div key={index} className="flex items-center space-x-2 mb-2">
//             <input
//               type="text"
//               value={exclusion}
//               onChange={(e) => handleArrayChange('exclusions', index, e.target.value)}
//               className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="What's not included?"
//             />
//             <button
//               type="button"
//               onClick={() => removeArrayItem('exclusions', index)}
//               className="text-red-400 hover:text-red-300"
//               disabled={formData.exclusions.length === 1}
//             >
//               <Trash2 className="h-4 w-4" />
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => addArrayItem('exclusions')}
//           className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
//         >
//           <Plus className="h-4 w-4 mr-1" />
//           Add Exclusion
//         </button>
//       </div>

//       {/* Highlights */}
//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-2">
//           Package Highlights *
//         </label>
//         {formData.highlights.map((highlight, index) => (
//           <div key={index} className="flex items-center space-x-2 mb-2">
//             <input
//               type="text"
//               value={highlight}
//               onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
//               className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="Key attraction or activity"
//             />
//             <button
//               type="button"
//               onClick={() => removeArrayItem('highlights', index)}
//               className="text-red-400 hover:text-red-300"
//               disabled={formData.highlights.length === 1}
//             >
//               <Trash2 className="h-4 w-4" />
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => addArrayItem('highlights')}
//           className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
//         >
//           <Plus className="h-4 w-4 mr-1" />
//           Add Highlight
//         </button>
//       </div>
//     </div>
//   );

//   const renderStep3 = () => (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-2">
//           Thumbnail Image URL *
//         </label>
//         <div className="flex space-x-4">
//           <div className="flex-1">
//             <input
//               type="url"
//               value={formData.thumbnail}
//               onChange={(e) => handleChange('thumbnail', e.target.value)}
//               className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="https://example.com/image.jpg"
//               required
//             />
//           </div>
//           <button
//             type="button"
//             className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-colors"
//           >
//             <Upload className="h-4 w-4" />
//           </button>
//         </div>
//         {formData.thumbnail && (
//           <div className="mt-2">
//             <img
//               src={formData.thumbnail}
//               alt="Thumbnail preview"
//               className="w-full h-48 object-cover rounded-lg"
//               onError={(e) => {
//                 e.currentTarget.style.display = 'none';
//               }}
//             />
//           </div>
//         )}
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-2">
//           Additional Images
//         </label>
//         {formData.images.map((image, index) => (
//           <div key={index} className="flex items-center space-x-2 mb-2">
//             <input
//               type="url"
//               value={image}
//               onChange={(e) => handleArrayChange('images', index, e.target.value)}
//               className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="https://example.com/image.jpg"
//             />
//             <button
//               type="button"
//               onClick={() => removeArrayItem('images', index)}
//               className="text-red-400 hover:text-red-300"
//             >
//               <Trash2 className="h-4 w-4" />
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => addArrayItem('images')}
//           className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
//         >
//           <Plus className="h-4 w-4 mr-1" />
//           Add Image
//         </button>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-2">
//           Tags
//         </label>
//         {formData.tags.map((tag, index) => (
//           <div key={index} className="flex items-center space-x-2 mb-2">
//             <div className="relative flex-1">
//               <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <input
//                 type="text"
//                 value={tag}
//                 onChange={(e) => handleArrayChange('tags', index, e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 placeholder="adventure, mountains, trekking"
//               />
//             </div>
//             <button
//               type="button"
//               onClick={() => removeArrayItem('tags', index)}
//               className="text-red-400 hover:text-red-300"
//             >
//               <Trash2 className="h-4 w-4" />
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => addArrayItem('tags')}
//           className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
//         >
//           <Plus className="h-4 w-4 mr-1" />
//           Add Tag
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8">
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-bold text-white mb-2">
//                 {isEditing ? 'Edit Package' : 'Create New Package'}
//               </h2>
//               <p className="text-gray-300">
//                 {isEditing ? 'Update your package details' : 'Add a new travel package to your collection'}
//               </p>
//             </div>
//             {renderWishlistButton()}
//           </div>
//         </div>

//         {renderStepIndicator()}

//         <form onSubmit={handleSubmit}>
//           {currentStep === 1 && renderStep1()}
//           {currentStep === 2 && renderStep2()}
//           {currentStep === 3 && renderStep3()}

//           <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
//             <div className="flex space-x-3">
//               {currentStep > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => setCurrentStep(currentStep - 1)}
//                   className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
//                 >
//                   Previous
//                 </button>
//               )}
//               <button
//                 type="button"
//                 onClick={onCancel}
//                 className="px-6 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-600 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>

//             <div className="flex space-x-3">
//               {currentStep < 3 ? (
//                 <button
//                   type="button"
//                   onClick={() => setCurrentStep(currentStep + 1)}
//                   className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-colors"
//                 >
//                   Next
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="flex items-center px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       {isEditing ? 'Updating...' : 'Creating...'}
//                     </>
//                   ) : (
//                     <>
//                       <Save className="h-4 w-4 mr-2" />
//                       {isEditing ? 'Update Package' : 'Create Package'}
//                     </>
//                   )}
//                 </button>
//               )}
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PackageForm;













import React, { useState } from 'react';
import {
  Save,
  Plus,
  Trash2,
  Upload,
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  Tag,
  Heart,
  HeartOff
} from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';

interface PackageFormData {
  id?: string;
  title: string;
  description: string;
  shortDescription: string;
  type: 'domestic' | 'international';
  category: string;
  destination: string;
  duration: number;
  price: number;
  originalPrice?: number;
  images: string[];
  thumbnail: string;
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  bestTime: string;
  difficulty?: string;
  maxGroupSize: number;
  minAge: number;
  tags: string[];
}

interface PackageFormProps {
  initialData?: Partial<PackageFormData>;
  onSubmit: (data: PackageFormData) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
  showWishlistButton?: boolean;
}

const PackageForm: React.FC<PackageFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
  showWishlistButton = true
}) => {
  const { user } = useAuth();
  const { 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist, 
    loading: wishlistLoading 
  } = useWishlist();

  const [formData, setFormData] = useState<PackageFormData>({
    title: '',
    description: '',
    shortDescription: '',
    type: 'domestic',
    category: 'Adventure',
    destination: '',
    duration: 1,
    price: 0,
    originalPrice: 0,
    images: [],
    thumbnail: '',
    inclusions: [''],
    exclusions: [''],
    highlights: [''],
    bestTime: '',
    difficulty: '',
    maxGroupSize: 10,
    minAge: 0,
    tags: [''],
    ...initialData
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [wishlistMessage, setWishlistMessage] = useState('');

  const categories = ['Adventure', 'Beach', 'Cultural', 'Family', 'Honeymoon', 'Luxury', 'Pilgrimage', 'Wildlife'];
  const difficulties = ['Easy', 'Moderate', 'Challenging', 'Extreme'];

  // Check if current package is in wishlist
  const isPackageInWishlist = formData.id ? isInWishlist(formData.id) : false;

  const handleChange = (field: keyof PackageFormData, value: string | number | string[] | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: keyof PackageFormData, index: number, value: string) => {
    const array = formData[field] as string[];
    const newArray = [...array];
    newArray[index] = value;
    handleChange(field, newArray);
  };

  const addArrayItem = (field: keyof PackageFormData) => {
    const array = formData[field] as string[];
    handleChange(field, [...array, '']);
  };

  const removeArrayItem = (field: keyof PackageFormData, index: number) => {
    const array = formData[field] as string[];
    if (array.length > 1) {
      handleChange(field, array.filter((_, i) => i !== index));
    }
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      setWishlistMessage('Please login to add packages to your wishlist');
      setTimeout(() => setWishlistMessage(''), 3000);
      return;
    }

    if (!formData.id) {
      setWishlistMessage('Package must be saved before adding to wishlist');
      setTimeout(() => setWishlistMessage(''), 3000);
      return;
    }

    try {
      if (isPackageInWishlist) {
        await removeFromWishlist(formData.id);
        setWishlistMessage('Removed from wishlist');
      } else {
        await addToWishlist(formData.id);
        setWishlistMessage('Added to wishlist');
      }
      setTimeout(() => setWishlistMessage(''), 3000);
    } catch (error) {
      console.error('Wishlist operation failed:', error);
      setWishlistMessage('Failed to update wishlist');
      setTimeout(() => setWishlistMessage(''), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Filter out empty strings from arrays
      const cleanedData = {
        ...formData,
        inclusions: formData.inclusions.filter(item => item.trim()),
        exclusions: formData.exclusions.filter(item => item.trim()),
        highlights: formData.highlights.filter(item => item.trim()),
        tags: formData.tags.filter(item => item.trim())
      };
      
      await onSubmit(cleanedData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center space-x-4 mb-8">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`flex items-center ${step < 3 ? 'flex-1' : ''}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= step
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                : 'bg-white/20 text-gray-400'
            }`}
          >
            {step}
          </div>
          <span className={`ml-2 text-sm ${
            currentStep >= step ? 'text-white' : 'text-gray-400'
          }`}>
            {step === 1 ? 'Basic Info' : step === 2 ? 'Details' : 'Media & Features'}
          </span>
          {step < 3 && (
            <div className={`flex-1 h-px mx-4 ${
              currentStep > step ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-white/20'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderWishlistButton = () => {
    if (!showWishlistButton || (!isEditing && !formData.id)) return null;

    return (
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={handleWishlistToggle}
          disabled={wishlistLoading || !user}
          className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
            isPackageInWishlist
              ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
              : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          title={isPackageInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wishlistLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          ) : isPackageInWishlist ? (
            <Heart className="h-4 w-4 mr-2 fill-current" />
          ) : (
            <HeartOff className="h-4 w-4 mr-2" />
          )}
          {isPackageInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
        </button>
        
        {wishlistMessage && (
          <div className={`px-3 py-1 rounded-lg text-sm ${
            wishlistMessage.includes('Failed') 
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'bg-green-500/20 text-green-400 border border-green-500/30'
          }`}>
            {wishlistMessage}
          </div>
        )}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Package Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Amazing Kashmir Valley Tour"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Destination *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => handleChange('destination', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Kashmir, India"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Short Description *
        </label>
        <textarea
          value={formData.shortDescription}
          onChange={(e) => handleChange('shortDescription', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          placeholder="Experience the breathtaking beauty of Kashmir..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Type *
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value as 'domestic' | 'international')}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="domestic" className="bg-gray-800">Domestic</option>
            <option value="international" className="bg-gray-800">International</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Duration (Days) *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => handleChange('duration', parseInt(e.target.value))}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              min="1"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Max Group Size *
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="number"
              value={formData.maxGroupSize}
              onChange={(e) => handleChange('maxGroupSize', parseInt(e.target.value))}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              min="1"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Price (₹) *
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleChange('price', parseFloat(e.target.value))}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              min="0"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Original Price (₹)
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="number"
              value={formData.originalPrice || ''}
              onChange={(e) => handleChange('originalPrice', parseFloat(e.target.value) || undefined)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Minimum Age
          </label>
          <input
            type="number"
            value={formData.minAge}
            onChange={(e) => handleChange('minAge', parseInt(e.target.value))}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            min="0"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Detailed Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={6}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          placeholder="Provide detailed information about the package..."
          required
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Best Time to Visit *
          </label>
          <input
            type="text"
            value={formData.bestTime}
            onChange={(e) => handleChange('bestTime', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="October to March"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Difficulty Level
          </label>
          <select
            value={formData.difficulty || ''}
            onChange={(e) => handleChange('difficulty', e.target.value || undefined)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="" className="bg-gray-800">Select difficulty</option>
            {difficulties.map(diff => (
              <option key={diff} value={diff} className="bg-gray-800">{diff}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Inclusions */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Inclusions *
        </label>
        {formData.inclusions.map((inclusion, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={inclusion}
              onChange={(e) => handleArrayChange('inclusions', index, e.target.value)}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="What's included in the package?"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('inclusions', index)}
              className="text-red-400 hover:text-red-300"
              disabled={formData.inclusions.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('inclusions')}
          className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Inclusion
        </button>
      </div>

      {/* Exclusions */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Exclusions *
        </label>
        {formData.exclusions.map((exclusion, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={exclusion}
              onChange={(e) => handleArrayChange('exclusions', index, e.target.value)}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="What's not included?"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('exclusions', index)}
              className="text-red-400 hover:text-red-300"
              disabled={formData.exclusions.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('exclusions')}
          className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Exclusion
        </button>
      </div>

      {/* Highlights */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Package Highlights *
        </label>
        {formData.highlights.map((highlight, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={highlight}
              onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Key attraction or activity"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('highlights', index)}
              className="text-red-400 hover:text-red-300"
              disabled={formData.highlights.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('highlights')}
          className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Highlight
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Thumbnail Image URL *
        </label>
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) => handleChange('thumbnail', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
          <button
            type="button"
            className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-colors"
          >
            <Upload className="h-4 w-4" />
          </button>
        </div>
        {formData.thumbnail && (
          <div className="mt-2">
            <Image
              src={formData.thumbnail}
              alt="Thumbnail preview"
              width={768}
              height={192}
              className="w-full h-48 object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Additional Images
        </label>
        {formData.images.map((image, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="url"
              value={image}
              onChange={(e) => handleArrayChange('images', index, e.target.value)}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="https://example.com/image.jpg"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('images', index)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('images')}
          className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Image
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Tags
        </label>
        {formData.tags.map((tag, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={tag}
                onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="adventure, mountains, trekking"
              />
            </div>
            <button
              type="button"
              onClick={() => removeArrayItem('tags', index)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('tags')}
          className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Tag
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isEditing ? 'Edit Package' : 'Create New Package'}
              </h2>
              <p className="text-gray-300">
                {isEditing ? 'Update your package details' : 'Add a new travel package to your collection'}
              </p>
            </div>
            {renderWishlistButton()}
          </div>
        </div>

        {renderStepIndicator()}

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
            <div className="flex space-x-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Previous
                </button>
              )}
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Cancel
              </button>
            </div>

            <div className="flex space-x-3">
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {isEditing ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {isEditing ? 'Update Package' : 'Create Package'}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageForm;
