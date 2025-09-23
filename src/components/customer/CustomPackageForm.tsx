










// import React, { useState, useEffect } from 'react';
// import { 
//   MapPin, 
//   Calendar, 
//   Users, 
//   Plane, 
//   Hotel,
//   Star,
//   Plus,
//   Minus,
//   Phone,
//   Mail,
//   User,
//   Globe,
//   Home,
//   Car,
//   Camera,
//   Utensils,
//   MapIcon,
//   Clock,
//   Heart,
//   Shield,
//   CreditCard,
//   Compass,
//   Mountain,
//   Waves,
//   TreePine,
//   Building,
//   Coffee,
//   ShoppingBag,
//   Music,
//   Gamepad2,
//   Baby,
//   Wheelchair,
//   Wifi,
//   AirVent,
//   Bath,
//   Tv,
//   ParkingCircle
// } from 'lucide-react';
// import { Button, Input, Card } from '@/components/ui';
// import WhatsAppButton from '@/components/common/WhatsAppButton';

// interface CustomPackageData {
//   tripType: 'domestic' | 'international';
//   destinations: { city: string; days: number; budget: string }[];
//   startDate: string;
//   endDate: string;
//   duration: number;
//   flexibility: string;
//   adults: number;
//   children: number;
//   infants: number;
//   totalTravelers: number;
//   specialNeeds: string[];
//   totalBudget: string;
//   budgetBreakdown: {
//     accommodation: string;
//     transport: string;
//     food: string;
//     activities: string;
//     shopping: string;
//     miscellaneous: string;
//   };
//   budgetFlexibility: string;
//   transportMode: string[];
//   flightClass: string;
//   localTransport: string[];
//   selfDrive: boolean;
//   accommodationType: string[];
//   roomType: string;
//   amenities: string[];
//   locationPreference: string;
//   interests: string[];
//   activityLevel: string;
//   mustDoActivities: string;
//   avoidActivities: string;
//   mealPreferences: string[];
//   dietaryRestrictions: string[];
//   diningStyle: string[];
//   localCuisine: boolean;
//   travelStyle: string;
//   pacePreference: string;
//   groupDynamic: string;
//   itineraryStyle: string;
//   freeTimeRatio: string;
//   culturalImmersion: string;
//   photographyFocus: boolean;
//   bookingPreference: string;
//   guidePreference: string;
//   languageSupport: string[];
//   travelInsurance: boolean;
//   visaSupport: boolean;
//   occasion: string;
//   specialRequests: string;
//   name: string;
//   email: string;
//   phone: string;
//   preferredContact: string;
//   additionalNotes: string;
// }

// interface CustomPackageFormProps {
//   className?: string;
// }

// const CustomPackageForm: React.FC<CustomPackageFormProps> = ({ className = '' }) => {
//   const [formData, setFormData] = useState<CustomPackageData>({
//     tripType: 'domestic',
//     destinations: [{ city: '', days: 1, budget: '' }],
//     startDate: '',
//     endDate: '',
//     duration: 0,
//     flexibility: '',
//     adults: 2,
//     children: 0,
//     infants: 0,
//     totalTravelers: 2,
//     specialNeeds: [],
//     totalBudget: '',
//     budgetBreakdown: {
//       accommodation: '',
//       transport: '',
//       food: '',
//       activities: '',
//       shopping: '',
//       miscellaneous: ''
//     },
//     budgetFlexibility: '',
//     transportMode: [],
//     flightClass: '',
//     localTransport: [],
//     selfDrive: false,
//     accommodationType: [],
//     roomType: '',
//     amenities: [],
//     locationPreference: '',
//     interests: [],
//     activityLevel: '',
//     mustDoActivities: '',
//     avoidActivities: '',
//     mealPreferences: [],
//     dietaryRestrictions: [],
//     diningStyle: [],
//     localCuisine: true,
//     travelStyle: '',
//     pacePreference: '',
//     groupDynamic: '',
//     itineraryStyle: '',
//     freeTimeRatio: '',
//     culturalImmersion: '',
//     photographyFocus: false,
//     bookingPreference: '',
//     guidePreference: '',
//     languageSupport: [],
//     travelInsurance: false,
//     visaSupport: false,
//     occasion: '',
//     specialRequests: '',
//     name: '',
//     email: '',
//     phone: '',
//     preferredContact: '',
//     additionalNotes: ''
//   });

//   const [currentStep, setCurrentStep] = useState(1);
//   const [errorMessage, setErrorMessage] = useState('');
//   const totalSteps = 8;

//   const budgetRanges = [
//     { value: 'budget', label: 'Budget Friendly', range: '₹15,000 - ₹30,000 per person' },
//     { value: 'mid-range', label: 'Comfort Travel', range: '₹30,000 - ₹60,000 per person' },
//     { value: 'premium', label: 'Premium Experience', range: '₹60,000 - ₹1,20,000 per person' },
//     { value: 'luxury', label: 'Luxury Travel', range: '₹1,20,000+ per person' },
//     { value: 'custom', label: 'Custom Budget', range: 'Let me specify' }
//   ];

//   const transportModes = [
//     { value: 'flight', label: 'Flight', icon: Plane },
//     { value: 'train', label: 'Train', icon: Car },
//     { value: 'bus', label: 'Bus/Coach', icon: Car },
//     { value: 'car', label: 'Private Car', icon: Car },
//     { value: 'cruise', label: 'Cruise', icon: Waves }
//   ];

//   const accommodationTypes = [
//     { value: 'hotel', label: 'Hotels', icon: '🏨' },
//     { value: 'resort', label: 'Resorts', icon: '🏖️' },
//     { value: 'villa', label: 'Villas', icon: '🏡' },
//     { value: 'apartment', label: 'Apartments', icon: '🏢' },
//     { value: 'homestay', label: 'Homestays', icon: '🏠' },
//     { value: 'hostel', label: 'Hostels', icon: '🏨' },
//     { value: 'boutique', label: 'Boutique Hotels', icon: '✨' },
//     { value: 'eco', label: 'Eco-lodges', icon: '🌿' }
//   ];

//   const interestOptions = [
//     { value: 'adventure', label: 'Adventure Sports', icon: Mountain },
//     { value: 'culture', label: 'Culture & Heritage', icon: Building },
//     { value: 'nature', label: 'Nature & Wildlife', icon: TreePine },
//     { value: 'beaches', label: 'Beaches & Water', icon: Waves },
//     { value: 'mountains', label: 'Mountains & Hills', icon: Mountain },
//     { value: 'food', label: 'Food & Cuisine', icon: Utensils },
//     { value: 'spiritual', label: 'Spiritual Sites', icon: Heart },
//     { value: 'shopping', label: 'Shopping', icon: ShoppingBag },
//     { value: 'nightlife', label: 'Nightlife', icon: Music },
//     { value: 'photography', label: 'Photography', icon: Camera },
//     { value: 'wellness', label: 'Wellness & Spa', icon: Heart },
//     { value: 'festivals', label: 'Festivals & Events', icon: Music }
//   ];

//   const amenities = [
//     { value: 'wifi', label: 'Free WiFi', icon: Wifi },
//     { value: 'pool', label: 'Swimming Pool', icon: Waves },
//     { value: 'spa', label: 'Spa & Wellness', icon: Heart },
//     { value: 'gym', label: 'Fitness Center', icon: User },
//     { value: 'restaurant', label: 'Restaurant', icon: Utensils },
//     { value: 'bar', label: 'Bar/Lounge', icon: Coffee },
//     { value: 'parking', label: 'Parking', icon: ParkingCircle },
//     { value: 'ac', label: 'Air Conditioning', icon: AirVent },
//     { value: 'balcony', label: 'Balcony/Terrace', icon: Home },
//     { value: 'room_service', label: 'Room Service', icon: Hotel }
//   ];

//   const specialNeeds = [
//     { value: 'wheelchair', label: 'Wheelchair Access' },
//     { value: 'elderly', label: 'Elderly Friendly' },
//     { value: 'baby', label: 'Baby/Toddler Facilities' },
//     { value: 'medical', label: 'Medical Support' },
//     { value: 'dietary', label: 'Special Dietary Needs' }
//   ];

//   useEffect(() => {
//     if (formData.startDate && formData.endDate) {
//       const start = new Date(formData.startDate);
//       const end = new Date(formData.endDate);
//       const diffTime = Math.abs(end.getTime() - start.getTime());
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//       setFormData(prev => ({ ...prev, duration: diffDays }));
//     }
//   }, [formData.startDate, formData.endDate]);

//   useEffect(() => {
//     const total = formData.adults + formData.children + formData.infants;
//     setFormData(prev => ({ ...prev, totalTravelers: total }));
//   }, [formData.adults, formData.children, formData.infants]);

//   const handleInputChange = (field: keyof CustomPackageData, value: any) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleArrayChange = (field: string, value: string, checked?: boolean) => {
//     if (typeof checked === 'boolean') {
//       setFormData(prev => ({
//         ...prev,
//         [field]: checked 
//           ? [...(prev[field as keyof CustomPackageData] as string[]), value]
//           : (prev[field as keyof CustomPackageData] as string[]).filter(item => item !== value)
//       }));
//     }
//   };

//   const addDestination = () => {
//     setFormData(prev => ({
//       ...prev,
//       destinations: [...prev.destinations, { city: '', days: 1, budget: '' }]
//     }));
//   };

//   const removeDestination = (index: number) => {
//     if (formData.destinations.length > 1) {
//       setFormData(prev => ({
//         ...prev,
//         destinations: prev.destinations.filter((_, i) => i !== index)
//       }));
//     }
//   };

//   const updateDestination = (index: number, field: string, value: string | number) => {
//     setFormData(prev => ({
//       ...prev,
//       destinations: prev.destinations.map((dest, i) => 
//         i === index ? { ...dest, [field]: value } : dest
//       )
//     }));
//   };

//   const generateWhatsAppMessage = () => {
//     const destinations = formData.destinations
//       .filter(d => d.city.trim())
//       .map(d => `${d.city} (${d.days} days${d.budget ? `, Budget: ${d.budget}` : ''})`)
//       .join(', ') || 'Not specified';
    
//     const interests = formData.interests.length > 0 ? formData.interests.join(', ') : 'Open to suggestions';
//     const transportMethods = formData.transportMode.length > 0 ? formData.transportMode.join(', ') : 'To be discussed';
//     const accommodationPrefs = formData.accommodationType.length > 0 ? formData.accommodationType.join(', ') : 'To be discussed';
    
//     // Optimized message to reduce length
//     return `🌟 *Travel Package Request* 🌟

// Hi Travel Quench Team! Here's my trip plan:

// ✈️ *Trip Overview*
// 📍 Destinations: ${destinations}
// 🏠 Type: ${formData.tripType.charAt(0).toUpperCase() + formData.tripType.slice(1)}
// 📅 Dates: ${formData.startDate || 'TBD'} to ${formData.endDate || 'TBD'} (${formData.duration} days)
// 🔄 Flexibility: ${formData.flexibility || 'TBD'}

// 👥 *Travelers*
// Adults: ${formData.adults}, Children: ${formData.children}, Infants: ${formData.infants}
// ${formData.specialNeeds.length > 0 ? `🔶 Needs: ${formData.specialNeeds.join(', ')}` : ''}

// 💰 *Budget*
// Total: ${formData.totalBudget || 'TBD'}
// Flexibility: ${formData.budgetFlexibility || 'Standard'}

// 🚗 *Transport*
// Mode: ${transportMethods}
// ${formData.flightClass ? `Flight: ${formData.flightClass}` : ''}
// ${formData.localTransport.length > 0 ? `Local: ${formData.localTransport.join(', ')}` : ''}

// 🏨 *Accommodation*
// Type: ${accommodationPrefs}
// ${formData.roomType ? `Room: ${formData.roomType}` : ''}
// ${formData.amenities.length > 0 ? `Amenities: ${formData.amenities.join(', ')}` : ''}

// 🎯 *Interests*
// ${interests}
// ${formData.activityLevel ? `Activity: ${formData.activityLevel}` : ''}
// ${formData.mustDoActivities ? `Must-Do: ${formData.mustDoActivities}` : ''}

// 🍽️ *Food*
// ${formData.mealPreferences.length > 0 ? `Meals: ${formData.mealPreferences.join(', ')}` : ''}
// ${formData.dietaryRestrictions.length > 0 ? `Restrictions: ${formData.dietaryRestrictions.join(', ')}` : ''}
// Local Cuisine: ${formData.localCuisine ? 'Yes' : 'No'}

// 🎨 *Style*
// ${formData.travelStyle ? `Style: ${formData.travelStyle}` : ''}
// ${formData.pacePreference ? `Pace: ${formData.pacePreference}` : ''}

// 🎪 *Extras*
// ${formData.occasion ? `Occasion: ${formData.occasion}` : ''}
// ${formData.guidePreference ? `Guide: ${formData.guidePreference}` : ''}
// ${formData.travelInsurance ? '✅ Insurance' : ''}
// ${formData.visaSupport ? '✅ Visa Support' : ''}

// 📞 *Contact*
// Name: ${formData.name || 'Not provided'}
// Email: ${formData.email || 'Not provided'}
// Phone: ${formData.phone || 'Not provided'}
// ${formData.preferredContact ? `Contact: ${formData.preferredContact}` : ''}

// ${formData.specialRequests ? `🌟 *Requests*\n${formData.specialRequests}\n` : ''}
// ${formData.additionalNotes ? `📝 *Notes*\n${formData.additionalNotes}\n` : ''}

// Please create my dream trip! 🌴✨`;
//   };

//   const handleWhatsAppRedirect = () => {
//     try {
//       const whatsappMessage = generateWhatsAppMessage();
//       const encodedMessage = encodeURIComponent(whatsappMessage);
//       const maxUrlLength = 2000; // WhatsApp URL length limit
//       if (encodedMessage.length > maxUrlLength - 100) {
//         setErrorMessage('Your request is too long for WhatsApp. Please shorten your inputs or contact us directly.');
//         return;
//       }
//       const whatsappURL = `https://wa.me/917006377796?text=${encodedMessage}`;
//       window.open(whatsappURL, '_blank');
//     } catch (error) {
//       setErrorMessage('Failed to generate WhatsApp message. Please try again or contact us directly at +917006377796.');
//     }
//   };

//   const renderStep = () => {
//     switch(currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6 animate-fade-in">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Trip Basics</h3>
            
//             <div className="relative group">
//               <label className="block text-sm font-medium text-gray-700 mb-3">Trip Type</label>
//               <div className="grid grid-cols-2 gap-3 sm:gap-4">
//                 {[
//                   { value: 'domestic', label: 'Domestic', icon: Home, desc: 'Within India' },
//                   { value: 'international', label: 'International', icon: Globe, desc: 'Outside India' }
//                 ].map((option) => (
//                   <button
//                     key={option.value}
//                     type="button"
//                     onClick={() => handleInputChange('tripType', option.value)}
//                     className={`p-4 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
//                       formData.tripType === option.value
//                         ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
//                         : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <option.icon className="w-6 h-6 mx-auto mb-2 text-orange-500" />
//                     <div className="font-semibold">{option.label}</div>
//                     <div className="text-xs text-gray-500">{option.desc}</div>
//                   </button>
//                 ))}
//               </div>
//               <span className="absolute -top-2 right-0 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
//                 Choose your adventure!
//               </span>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Destinations & Duration</label>
//               <div className="space-y-3">
//                 {formData.destinations.map((destination, index) => (
//                   <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-4 border rounded-lg bg-gray-50 shadow-sm">
//                     <Input
//                       placeholder={`Destination ${index + 1}`}
//                       value={destination.city}
//                       onChange={(e) => updateDestination(index, 'city', e.target.value)}
//                       className="sm:col-span-2 transition-all duration-200 focus:ring-2 focus:ring-orange-500"
//                     />
//                     <Input
//                       type="number"
//                       placeholder="Days"
//                       value={destination.days}
//                       onChange={(e) => updateDestination(index, 'days', parseInt(e.target.value) || 1)}
//                       min="1"
//                       className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
//                     />
//                     <div className="flex items-center gap-2">
//                       <Input
//                         placeholder="Budget"
//                         value={destination.budget}
//                         onChange={(e) => updateDestination(index, 'budget', e.target.value)}
//                         className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-orange-500"
//                       />
//                       {formData.destinations.length > 1 && (
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="sm"
//                           onClick={() => removeDestination(index)}
//                           className="p-2 hover:bg-red-50"
//                         >
//                           <Minus className="w-4 h-4 text-red-500" />
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   onClick={addDestination}
//                   className="w-full sm:w-auto hover:bg-orange-50 transition-all duration-200"
//                 >
//                   <Plus className="w-4 h-4 mr-2" />
//                   Add Another Destination
//                 </Button>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <Input
//                 label="Start Date"
//                 type="date"
//                 value={formData.startDate}
//                 onChange={(e) => handleInputChange('startDate', e.target.value)}
//                 min={new Date().toISOString().split('T')[0]}
//                 leftIcon={<Calendar className="w-4 h-4 text-orange-500" />}
//                 className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
//               />
//               <Input
//                 label="End Date"
//                 type="date"
//                 value={formData.endDate}
//                 onChange={(e) => handleInputChange('endDate', e.target.value)}
//                 min={formData.startDate || new Date().toISOString().split('T')[0]}
//                 leftIcon={<Calendar className="w-4 h-4 text-orange-500" />}
//                 className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Date Flexibility</label>
//               <select
//                 value={formData.flexibility}
//                 onChange={(e) => handleInputChange('flexibility', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
//               >
//                 <option value="">Select flexibility</option>
//                 <option value="exact">Exact dates only</option>
//                 <option value="1-2-days">±1-2 days flexible</option>
//                 <option value="1-week">±1 week flexible</option>
//                 <option value="very-flexible">Very flexible</option>
//               </select>
//             </div>

//             {formData.duration > 0 && (
//               <div className="text-center">
//                 <span className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold text-base">
//                   {formData.duration} Days Adventure
//                 </span>
//               </div>
//             )}
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-6 animate-fade-in">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Travelers Information</h3>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Number of Travelers</label>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 {[
//                   { key: 'adults', label: 'Adults (18+)', min: 1 },
//                   { key: 'children', label: 'Children (2-17)', min: 0 },
//                   { key: 'infants', label: 'Infants (0-2)', min: 0 }
//                 ].map((travelerType) => (
//                   <div key={travelerType.key} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 shadow-sm">
//                     <span className="font-medium text-sm">{travelerType.label}</span>
//                     <div className="flex items-center space-x-2">
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => {
//                           const currentValue = formData[travelerType.key as keyof CustomPackageData] as number;
//                           if (currentValue > travelerType.min) {
//                             handleInputChange(travelerType.key as keyof CustomPackageData, currentValue - 1);
//                           }
//                         }}
//                         className="w-8 h-8 p-0 hover:bg-red-50"
//                       >
//                         <Minus className="w-3 h-3 text-red-500" />
//                       </Button>
//                       <span className="w-6 text-center font-semibold">
//                         {formData[travelerType.key as keyof CustomPackageData] as number}
//                       </span>
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => {
//                           const currentValue = formData[travelerType.key as keyof CustomPackageData] as number;
//                           handleInputChange(travelerType.key as keyof CustomPackageData, currentValue + 1);
//                         }}
//                         className="w-8 h-8 p-0 hover:bg-green-50"
//                       >
//                         <Plus className="w-3 h-3 text-green-500" />
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-3 text-center">
//                 <span className="text-base font-semibold text-orange-600">
//                   Total: {formData.totalTravelers} Travelers
//                 </span>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Special Needs or Accessibility</label>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {specialNeeds.map((need) => (
//                   <button
//                     key={need.value}
//                     type="button"
//                     onClick={() => {
//                       const isSelected = formData.specialNeeds.includes(need.value);
//                       handleArrayChange('specialNeeds', need.value, !isSelected);
//                     }}
//                     className={`p-3 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
//                       formData.specialNeeds.includes(need.value)
//                         ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
//                         : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <div className="text-sm font-medium">{need.label}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Special Occasion</label>
//               <select
//                 value={formData.occasion}
//                 onChange={(e) => handleInputChange('occasion', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
//               >
//                 <option value="">Select if applicable</option>
//                 <option value="honeymoon">Honeymoon</option>
//                 <option value="anniversary">Anniversary</option>
//                 <option value="birthday">Birthday Celebration</option>
//                 <option value="family-reunion">Family Reunion</option>
//                 <option value="graduation">Graduation Trip</option>
//                 <option value="retirement">Retirement Celebration</option>
//                 <option value="babymoon">Babymoon</option>
//                 <option value="solo-adventure">Solo Adventure</option>
//                 <option value="friends-trip">Friends Trip</option>
//                 <option value="business-leisure">Business + Leisure</option>
//               </select>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-6 animate-fade-in">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Budget & Pricing</h3>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Total Budget Range</label>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {budgetRanges.map((budget) => (
//                   <button
//                     key={budget.value}
//                     type="button"
//                     onClick={() => handleInputChange('totalBudget', budget.value)}
//                     className={`p-4 border rounded-lg text-left transition-all duration-300 transform hover:scale-105 ${
//                       formData.totalBudget === budget.value
//                         ? 'border-orange-500 bg-orange-50 shadow-md'
//                         : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <div className="font-semibold text-gray-900">{budget.label}</div>
//                     <div className="text-xs text-gray-600">{budget.range}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {formData.totalBudget === 'custom' && (
//               <Input
//                 label="Custom Budget Amount"
//                 placeholder="e.g., ₹85,000 per person"
//                 value={formData.budgetBreakdown.accommodation}
//                 onChange={(e) => handleInputChange('totalBudget', e.target.value)}
//                 className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
//               />
//             )}

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Budget Breakdown (Optional)</label>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {Object.entries(formData.budgetBreakdown).map(([key, value]) => (
//                   <Input
//                     key={key}
//                     label={key.charAt(0).toUpperCase() + key.slice(1)}
//                     placeholder={`e.g., ₹15,000`}
//                     value={value}
//                     onChange={(e) => 
//                       setFormData(prev => ({
//                         ...prev,
//                         budgetBreakdown: { ...prev.budgetBreakdown, [key]: e.target.value }
//                       }))
//                     }
//                     className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
//                   />
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Budget Flexibility</label>
//               <select
//                 value={formData.budgetFlexibility}
//                 onChange={(e) => handleInputChange('budgetFlexibility', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
//               >
//                 <option value="">Select flexibility</option>
//                 <option value="strict">Strict budget - cannot exceed</option>
//                 <option value="slight">Can exceed by 10-15%</option>
//                 <option value="moderate">Can exceed by 20-30%</option>
//                 <option value="flexible">Very flexible with budget</option>
//               </select>
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="space-y-6 animate-fade-in">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Transportation & Travel</h3>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Transportation Methods</label>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {transportModes.map((transport) => (
//                   <button
//                     key={transport.value}
//                     type="button"
//                     onClick={() => {
//                       const isSelected = formData.transportMode.includes(transport.value);
//                       handleArrayChange('transportMode', transport.value, !isSelected);
//                     }}
//                     className={`p-4 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
//                       formData.transportMode.includes(transport.value)
//                         ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
//                         : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <transport.icon className="w-6 h-6 mx-auto mb-2 text-orange-500" />
//                     <div className="text-sm font-medium">{transport.label}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {formData.transportMode.includes('flight') && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">Flight Class Preference</label>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                   {[
//                     { value: 'economy', label: 'Economy Class' },
//                     { value: 'business', label: 'Business Class' },
//                     { value: 'first', label: 'First Class' }
//                   ].map((flightClass) => (
//                     <button
//                       key={flightClass.value}
//                       type="button"
//                       onClick={() => handleInputChange('flightClass', flightClass.value)}
//                       className={`p-4 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
//                         formData.flightClass === flightClass.value
//                           ? 'border-orange-500 bg-orange-50 shadow-md'
//                           : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
//                       }`}
//                     >
//                       <div className="font-medium">{flightClass.label}</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Local Transportation Preferences</label>
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                 {[
//                   'Private car with driver',
//                   'Self-drive rental',
//                   'Public transport',
//                   'Taxi/Uber',
//                   'Bicycle/Scooter',
//                   'Walking tours',
//                   'Local buses',
//                   'Metro/Subway'
//                 ].map((transport) => (
//                   <button
//                     key={transport}
//                     type="button"
//                     onClick={() => {
//                       const isSelected = formData.localTransport.includes(transport);
//                       handleArrayChange('localTransport', transport, !isSelected);
//                     }}
//                     className={`p-3 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
//                       formData.localTransport.includes(transport)
//                         ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
//                         : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <div className="text-xs font-medium">{transport}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="selfDrive"
//                 checked={formData.selfDrive}
//                 onChange={(e) => handleInputChange('selfDrive', e.target.checked)}
//                 className="mr-2 focus:ring-orange-500"
//               />
//               <label htmlFor="selfDrive" className="text-sm font-medium text-gray-700">
//                 I'm interested in self-drive options
//               </label>
//             </div>
//           </div>
//         );

//       case 5:
//         return (
//           <div className="space-y-6 animate-fade-in">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Accommodation Preferences</h3>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Accommodation Types</label>
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                 {accommodationTypes.map((accommodation) => (
//                   <button
//                     key={accommodation.value}
//                     type="button"
//                     onClick={() => {
//                       const isSelected = formData.accommodationType.includes(accommodation.value);
//                       handleArrayChange('accommodationType', accommodation.value, !isSelected);
//                     }}
//                     className={`p-4 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
//                       formData.accommodationType.includes(accommodation.value)
//                         ? 'border-orange-500 bg-orange-50 shadow-md'
//                         : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <div className="text-2xl mb-2">{accommodation.icon}</div>
//                     <div className="text-sm font-medium">{accommodation.label}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Room Type</label>
//               <select
//                 value={formData.roomType}
//                 onChange={(e) => handleInputChange('roomType', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
//               >
//                 <option value="">Select room type</option>
//                 <option value="single">Single Room</option>
//                 <option value="double">Double/Twin Room</option>
//                 <option value="triple">Triple Room</option>
//                 <option value="family">Family Room</option>
//                 <option value="suite">Suite</option>
//                 <option value="villa">Private Villa</option>
//                 <option value="apartment">Apartment</option>
//                 <option value="dormitory">Shared Dormitory</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Required Amenities</label>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {amenities.map((amenity) => (
//                   <button
//                     key={amenity.value}
//                     type="button"
//                     onClick={() => {
//                       const isSelected = formData.amenities.includes(amenity.value);
//                       handleArrayChange('amenities', amenity.value, !isSelected);
//                     }}
//                     className={`p-3 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
//                       formData.amenities.includes(amenity.value)
//                         ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
//                         : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <amenity.icon className="w-5 h-5 mx-auto mb-1 text-orange-500" />
//                     <div className="text-sm font-medium">{amenity.label}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Location Preference</label>
//               <select
//                 value={formData.locationPreference}
//                 onChange={(e) => handleInputChange('locationPreference', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
//               >
//                 <option value="">Select preference</option>
//                 <option value="city-center">City Center</option>
//                 <option value="near-attractions">Near Main Attractions</option>
//                 <option value="beach-front">Beach Front</option>
//                 <option value="mountain-view">Mountain View</option>
//                 <option value="quiet-area">Quiet/Peaceful Area</option>
//                 <option value="shopping-district">Shopping District</option>
//                 <option value="business-district">Business District</option>
//                 <option value="airport-nearby">Near Airport</option>
//                 <option value="transport-hub">Near Transport Hub</option>
//               </select>
//             </div>
//           </div>
//         );

//       case 6:
//         return (
//           <div className="space-y-6 animate-fade-in">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Activities & Experiences</h3>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">What interests you most?</label>
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
//                 {interestOptions.map((interest) => (
//                   <button
//                     key={interest.value}
//                     type="button"
//                     onClick={() => {
//                       const isSelected = formData.interests.includes(interest.value);
//                       handleArrayChange('interests', interest.value, !isSelected);
//                     }}
//                     className={`p-4 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
//                       formData.interests.includes(interest.value)
//                         ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
//                         : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <interest.icon className="w-6 h-6 mx-auto mb-2 text-orange-500" />
//                     <div className="text-sm font-medium">{interest.label}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Activity Level</label>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                 {[
//                   { value: 'low', label: 'Relaxed & Easy', desc: 'Minimal walking, comfortable pace' },
//                   { value: 'moderate', label: 'Moderate Activity', desc: 'Some walking, balanced itinerary' },
//                   { value: 'high', label: 'Active & Adventurous', desc: 'Lots of activities, fast pace' }
//                 ].map((level) => (
//                   <button
//                     key={level.value}
//                     type="button"
//                     onClick={() => handleInputChange('activityLevel', level.value)}
//                     className={`p-4 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
//                       formData.activityLevel === level.value
//                         ? 'border-orange-500 bg-orange-50 shadow-md'
//                         : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <div className="font-medium">{level.label}</div>
//                     <div className="text-xs text-gray-600">{level.desc}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Must-Do Activities or Experiences</label>
//               <textarea
//                 placeholder="List specific activities, attractions, or experiences you definitely want to include..."
//                 value={formData.mustDoActivities}
//                 onChange={(e) => handleInputChange('mustDoActivities', e.target.value)}
//                 rows={3}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Activities to Avoid</label>
//               <textarea
//                 placeholder="List any activities, places, or experiences you want to avoid..."
//                 value={formData.avoidActivities}
//                 onChange={(e) => handleInputChange('avoidActivities', e.target.value)}
//                 rows={2}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200"
//               />
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="photographyFocus"
//                 checked={formData.photographyFocus}
//                 onChange={(e) => handleInputChange('photographyFocus', e.target.checked)}
//                 className="mr-2 focus:ring-orange-500"
//               />
//               <label htmlFor="photographyFocus" className="text-sm font-medium text-gray-700">
//                 Photography is a major focus of this trip
//               </label>
//             </div>
//           </div>
//         );

//       case 7:
//         return (
//           <div className="space-y-6 animate-fade-in">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Food, Style & Travel Preferences</h3>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Meal Preferences</label>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {[
//                   'Vegetarian', 'Vegan', 'Non-vegetarian', 'Jain food',
//                   'Halal', 'Kosher', 'Gluten-free', 'No preference'
//                 ].map((meal) => (
//                   <button
//                     key={meal}
//                     type="button"
//                     onClick={() => {
//                       const isSelected = formData.mealPreferences.includes(meal);
//                       handleArrayChange('mealPreferences', meal, !isSelected);
//                     }}
//                     className={`p-3 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
//                       formData.mealPreferences.includes(meal)
//                         ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
//                         : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <div className="text-sm font-medium">{meal}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Dietary Restrictions/Allergies</label>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {[
//                   'Nuts allergy', 'Dairy allergy', 'Shellfish allergy',
//                   'Gluten intolerance', 'Diabetes friendly', 'Low sodium',
//                   'No spicy food', 'No alcohol'
//                 ].map((restriction) => (
//                   <button
//                     key={restriction}
//                     type="button"
//                     onClick={() => {
//                       const isSelected = formData.dietaryRestrictions.includes(restriction);
//                       handleArrayChange('dietaryRestrictions', restriction, !isSelected);
//                     }}
//                     className={`p-3 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
//                       formData.dietaryRestrictions.includes(restriction)
//                         ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
//                         : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <div className="text-sm font-medium">{restriction}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Travel Style</label>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {[
//                   { value: 'luxury', label: 'Luxury Travel', desc: 'Premium experiences & services' },
//                   { value: 'comfort', label: 'Comfort Travel', desc: 'Good balance of comfort & value' },
//                   { value: 'budget', label: 'Budget Travel', desc: 'Cost-effective options' },
//                   { value: 'backpacking', label: 'Backpacking', desc: 'Independent, flexible travel' },
//                   { value: 'eco', label: 'Eco-Tourism', desc: 'Sustainable & responsible travel' },
//                   { value: 'cultural', label: 'Cultural Immersion', desc: 'Deep local experiences' }
//                 ].map((style) => (
//                   <button
//                     key={style.value}
//                     type="button"
//                     onClick={() => handleInputChange('travelStyle', style.value)}
//                     className={`p-4 border rounded-lg text-left transition-all duration-300 transform hover:scale-105 ${
//                       formData.travelStyle === style.value
//                         ? 'border-orange-500 bg-orange-50 shadow-md'
//                         : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <div className="font-semibold">{style.label}</div>
//                     <div className="text-xs text-gray-600">{style.desc}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Travel Pace</label>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                 {[
//                   { value: 'slow', label: 'Slow & Relaxed', desc: 'Plenty of time at each place' },
//                   { value: 'moderate', label: 'Balanced Pace', desc: 'Mix of activities & rest' },
//                   { value: 'fast', label: 'Fast & Packed', desc: 'See as much as possible' }
//                 ].map((pace) => (
//                   <button
//                     key={pace.value}
//                     type="button"
//                     onClick={() => handleInputChange('pacePreference', pace.value)}
//                     className={`p-4 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
//                       formData.pacePreference === pace.value
//                         ? 'border-orange-500 bg-orange-50 shadow-md'
//                         : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <div className="font-semibold">{pace.label}</div>
//                     <div className="text-xs text-gray-600">{pace.desc}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="localCuisine"
//                 checked={formData.localCuisine}
//                 onChange={(e) => handleInputChange('localCuisine', e.target.checked)}
//                 className="mr-2 focus:ring-orange-500"
//               />
//               <label htmlFor="localCuisine" className="text-sm font-medium text-gray-700">
//                 I'm interested in trying local cuisine and food experiences
//               </label>
//             </div>
//           </div>
//         );

//       case 8:
//         return (
//           <div className="space-y-6 animate-fade-in">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Services & Contact Information</h3>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Guide Preference</label>
//               <select
//                 value={formData.guidePreference}
//                 onChange={(e) => handleInputChange('guidePreference', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
//               >
//                 <option value="">Select preference</option>
//                 <option value="local-guide">Local guide at each destination</option>
//                 <option value="tour-guide">Professional tour guide for entire trip</option>
//                 <option value="self-guided">Self-guided with recommendations</option>
//                 <option value="group-tour">Join group tours</option>
//                 <option value="private-tour">Private tours only</option>
//                 <option value="no-guide">No guide services needed</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Language Support Needed</label>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {[
//                   'English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 
//                   'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'
//                 ].map((language) => (
//                   <button
//                     key={language}
//                     type="button"
//                     onClick={() => {
//                       const isSelected = formData.languageSupport.includes(language);
//                       handleArrayChange('languageSupport', language, !isSelected);
//                     }}
//                     className={`p-3 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
//                       formData.languageSupport.includes(language)
//                         ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
//                         : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <div className="text-sm font-medium">{language}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-3">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="travelInsurance"
//                   checked={formData.travelInsurance}
//                   onChange={(e) => handleInputChange('travelInsurance', e.target.checked)}
//                   className="mr-2 focus:ring-orange-500"
//                 />
//                 <label htmlFor="travelInsurance" className="text-sm font-medium text-gray-700">
//                   I need travel insurance assistance
//                 </label>
//               </div>
              
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="visaSupport"
//                   checked={formData.visaSupport}
//                   onChange={(e) => handleInputChange('visaSupport', e.target.checked)}
//                   className="mr-2 focus:ring-orange-500"
//                 />
//                 <label htmlFor="visaSupport" className="text-sm font-medium text-gray-700">
//                   I need visa support and documentation help
//                 </label>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests or Requirements</label>
//               <textarea
//                 placeholder="Any special arrangements, surprises, accessibility needs, or other specific requests..."
//                 value={formData.specialRequests}
//                 onChange={(e) => handleInputChange('specialRequests', e.target.value)}
//                 rows={3}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200"
//               />
//             </div>

//             <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//               <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
//               <div className="grid grid-cols-1 gap-4">
//                 <Input
//                   label="Your Name"
//                   placeholder="Full name"
//                   value={formData.name}
//                   onChange={(e) => handleInputChange('name', e.target.value)}
//                   leftIcon={<User className="w-4 h-4 text-orange-500" />}
//                   required
//                   className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
//                 />
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <Input
//                     label="Email"
//                     type="email"
//                     placeholder="your.email@example.com"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange('email', e.target.value)}
//                     leftIcon={<Mail className="w-4 h-4 text-orange-500" />}
//                     required
//                     className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
//                   />
//                   <Input
//                     label="Phone Number"
//                     type="tel"
//                     placeholder="+91 98765 43210"
//                     value={formData.phone}
//                     onChange={(e) => handleInputChange('phone', e.target.value)}
//                     leftIcon={<Phone className="w-4 h-4 text-orange-500" />}
//                     required
//                     className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Contact Method</label>
//                   <select
//                     value={formData.preferredContact}
//                     onChange={(e) => handleInputChange('preferredContact', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
//                   >
//                     <option value="">Select preference</option>
//                     <option value="whatsapp">WhatsApp</option>
//                     <option value="phone">Phone Call</option>
//                     <option value="email">Email</option>
//                     <option value="video-call">Video Call</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div className="mt-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
//                 <textarea
//                   placeholder="Any other information or questions you'd like to share..."
//                   value={formData.additionalNotes}
//                   onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200"
//                 />
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={`w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-gray-50 to-white ${className}`}>
//       <Card className="p-6 lg:p-8 shadow-lg rounded-xl">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
//             Craft Your Dream Adventure
//           </h2>
//           <p className="text-base text-gray-600 px-4">
//             Share your vision, and we'll design a personalized travel experience just for you!
//           </p>
//         </div>

//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-3">
//             <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
//             <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-3">
//             <div 
//               className="bg-orange-500 h-3 rounded-full transition-all duration-500"
//               style={{ width: `${(currentStep / totalSteps) * 100}%` }}
//             ></div>
//           </div>
//         </div>

//         {errorMessage && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
//             {errorMessage}
//           </div>
//         )}

//         <form className="space-y-8">
//           {renderStep()}

//           <div className="flex flex-col sm:flex-row gap-4 justify-between">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
//               disabled={currentStep === 1}
//               className="order-2 sm:order-1 border-gray-300 hover:bg-gray-100 transition-all duration-200"
//             >
//               Previous Step
//             </Button>

//             <div className="flex flex-col sm:flex-row gap-4 order-1 sm:order-2">
//               {currentStep < totalSteps ? (
//                 <Button
//                   type="button"
//                   onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
//                   className="bg-orange-600 hover:bg-orange-700 text-white transition-all duration-200"
//                 >
//                   Next Step
//                 </Button>
//               ) : (
//                 <Button
//                   type="button"
//                   onClick={handleWhatsAppRedirect}
//                   className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center px-6 py-3 font-semibold transition-all duration-200"
//                 >
//                   <Phone className="w-5 h-5 mr-2" />
//                   Send Request via WhatsApp
//                 </Button>
//               )}
//             </div>
//           </div>

//           <div className="text-center text-sm text-gray-500 px-4">
//             <p>
//               By sending your request, you agree to our Terms of Service. Our travel experts will reach out within 24 hours with a tailored itinerary and pricing.
//             </p>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default CustomPackageForm;








import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Plane, 
  Hotel,
  Plus,
  Minus,
  Phone,
  Mail,
  User,
  Globe,
  Home,
  Car,
  Camera,
  Utensils,
  Heart,
  Coffee,
  ShoppingBag,
  Music,
  Wifi,
  AirVent,
  ParkingCircle,
  Mountain,
  Waves,
  TreePine,
  Building
} from 'lucide-react';
import { Button, Input, Card } from '@/components/ui';

interface CustomPackageData {
  tripType: 'domestic' | 'international';
  destinations: { city: string; days: number; budget: string }[];
  startDate: string;
  endDate: string;
  duration: number;
  flexibility: string;
  adults: number;
  children: number;
  infants: number;
  totalTravelers: number;
  specialNeeds: string[];
  totalBudget: string;
  budgetBreakdown: {
    accommodation: string;
    transport: string;
    food: string;
    activities: string;
    shopping: string;
    miscellaneous: string;
  };
  budgetFlexibility: string;
  transportMode: string[];
  flightClass: string;
  localTransport: string[];
  selfDrive: boolean;
  accommodationType: string[];
  roomType: string;
  amenities: string[];
  locationPreference: string;
  interests: string[];
  activityLevel: string;
  mustDoActivities: string;
  avoidActivities: string;
  mealPreferences: string[];
  dietaryRestrictions: string[];
  diningStyle: string[];
  localCuisine: boolean;
  travelStyle: string;
  pacePreference: string;
  groupDynamic: string;
  itineraryStyle: string;
  freeTimeRatio: string;
  culturalImmersion: string;
  photographyFocus: boolean;
  bookingPreference: string;
  guidePreference: string;
  languageSupport: string[];
  travelInsurance: boolean;
  visaSupport: boolean;
  occasion: string;
  specialRequests: string;
  name: string;
  email: string;
  phone: string;
  preferredContact: string;
  additionalNotes: string;
}

interface CustomPackageFormProps {
  className?: string;
  onSubmit: (data: CustomPackageData) => void;
}

const CustomPackageForm: React.FC<CustomPackageFormProps> = ({ className = '', onSubmit }) => {
  const [formData, setFormData] = useState<CustomPackageData>({
    tripType: 'domestic',
    destinations: [{ city: '', days: 1, budget: '' }],
    startDate: '',
    endDate: '',
    duration: 0,
    flexibility: '',
    adults: 2,
    children: 0,
    infants: 0,
    totalTravelers: 2,
    specialNeeds: [],
    totalBudget: '',
    budgetBreakdown: {
      accommodation: '',
      transport: '',
      food: '',
      activities: '',
      shopping: '',
      miscellaneous: ''
    },
    budgetFlexibility: '',
    transportMode: [],
    flightClass: '',
    localTransport: [],
    selfDrive: false,
    accommodationType: [],
    roomType: '',
    amenities: [],
    locationPreference: '',
    interests: [],
    activityLevel: '',
    mustDoActivities: '',
    avoidActivities: '',
    mealPreferences: [],
    dietaryRestrictions: [],
    diningStyle: [],
    localCuisine: true,
    travelStyle: '',
    pacePreference: '',
    groupDynamic: '',
    itineraryStyle: '',
    freeTimeRatio: '',
    culturalImmersion: '',
    photographyFocus: false,
    bookingPreference: '',
    guidePreference: '',
    languageSupport: [],
    travelInsurance: false,
    visaSupport: false,
    occasion: '',
    specialRequests: '',
    name: '',
    email: '',
    phone: '',
    preferredContact: '',
    additionalNotes: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const totalSteps = 8;

  const budgetRanges = [
    { value: 'budget', label: 'Budget Friendly', range: '₹15,000 - ₹30,000 per person' },
    { value: 'mid-range', label: 'Comfort Travel', range: '₹30,000 - ₹60,000 per person' },
    { value: 'premium', label: 'Premium Experience', range: '₹60,000 - ₹1,20,000 per person' },
    { value: 'luxury', label: 'Luxury Travel', range: '₹1,20,000+ per person' },
    { value: 'custom', label: 'Custom Budget', range: 'Let me specify' }
  ];

  const transportModes = [
    { value: 'flight', label: 'Flight', icon: Plane },
    { value: 'train', label: 'Train', icon: Car },
    { value: 'bus', label: 'Bus/Coach', icon: Car },
    { value: 'car', label: 'Private Car', icon: Car },
    { value: 'cruise', label: 'Cruise', icon: Waves }
  ];

  const accommodationTypes = [
    { value: 'hotel', label: 'Hotels', icon: '🏨' },
    { value: 'resort', label: 'Resorts', icon: '🏖️' },
    { value: 'villa', label: 'Villas', icon: '🏡' },
    { value: 'apartment', label: 'Apartments', icon: '🏢' },
    { value: 'homestay', label: 'Homestays', icon: '🏠' },
    { value: 'hostel', label: 'Hostels', icon: '🏨' },
    { value: 'boutique', label: 'Boutique Hotels', icon: '✨' },
    { value: 'eco', label: 'Eco-lodges', icon: '🌿' }
  ];

  const interestOptions = [
    { value: 'adventure', label: 'Adventure Sports', icon: Mountain },
    { value: 'culture', label: 'Culture & Heritage', icon: Building },
    { value: 'nature', label: 'Nature & Wildlife', icon: TreePine },
    { value: 'beaches', label: 'Beaches & Water', icon: Waves },
    { value: 'mountains', label: 'Mountains & Hills', icon: Mountain },
    { value: 'food', label: 'Food & Cuisine', icon: Utensils },
    { value: 'spiritual', label: 'Spiritual Sites', icon: Heart },
    { value: 'shopping', label: 'Shopping', icon: ShoppingBag },
    { value: 'nightlife', label: 'Nightlife', icon: Music },
    { value: 'photography', label: 'Photography', icon: Camera },
    { value: 'wellness', label: 'Wellness & Spa', icon: Heart },
    { value: 'festivals', label: 'Festivals & Events', icon: Music }
  ];

  const amenities = [
    { value: 'wifi', label: 'Free WiFi', icon: Wifi },
    { value: 'pool', label: 'Swimming Pool', icon: Waves },
    { value: 'spa', label: 'Spa & Wellness', icon: Heart },
    { value: 'gym', label: 'Fitness Center', icon: User },
    { value: 'restaurant', label: 'Restaurant', icon: Utensils },
    { value: 'bar', label: 'Bar/Lounge', icon: Coffee },
    { value: 'parking', label: 'Parking', icon: ParkingCircle },
    { value: 'ac', label: 'Air Conditioning', icon: AirVent },
    { value: 'balcony', label: 'Balcony/Terrace', icon: Home },
    { value: 'room_service', label: 'Room Service', icon: Hotel }
  ];

  const specialNeeds = [
    { value: 'wheelchair', label: 'Wheelchair Access' },
    { value: 'elderly', label: 'Elderly Friendly' },
    { value: 'baby', label: 'Baby/Toddler Facilities' },
    { value: 'medical', label: 'Medical Support' },
    { value: 'dietary', label: 'Special Dietary Needs' }
  ];

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setFormData(prev => ({ ...prev, duration: diffDays }));
    }
  }, [formData.startDate, formData.endDate]);

  useEffect(() => {
    const total = formData.adults + formData.children + formData.infants;
    setFormData(prev => ({ ...prev, totalTravelers: total }));
  }, [formData.adults, formData.children, formData.infants]);

  const handleInputChange = (field: keyof CustomPackageData, value: string | number | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, value: string, checked?: boolean) => {
    if (typeof checked === 'boolean') {
      setFormData(prev => ({
        ...prev,
        [field]: checked 
          ? [...(prev[field as keyof CustomPackageData] as string[]), value]
          : (prev[field as keyof CustomPackageData] as string[]).filter(item => item !== value)
      }));
    }
  };

  const addDestination = () => {
    setFormData(prev => ({
      ...prev,
      destinations: [...prev.destinations, { city: '', days: 1, budget: '' }]
    }));
  };

  const removeDestination = (index: number) => {
    if (formData.destinations.length > 1) {
      setFormData(prev => ({
        ...prev,
        destinations: prev.destinations.filter((_, i) => i !== index)
      }));
    }
  };

  const updateDestination = (index: number, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      destinations: prev.destinations.map((dest, i) => 
        i === index ? { ...dest, [field]: value } : dest
      )
    }));
  };

  const generateWhatsAppMessage = () => {
    const destinations = formData.destinations
      .filter(d => d.city.trim())
      .map(d => `${d.city} (${d.days} days${d.budget ? `, Budget: ${d.budget}` : ''})`)
      .join(', ') || 'Not specified';
    
    const interests = formData.interests.length > 0 ? formData.interests.join(', ') : 'Open to suggestions';
    const transportMethods = formData.transportMode.length > 0 ? formData.transportMode.join(', ') : 'To be discussed';
    const accommodationPrefs = formData.accommodationType.length > 0 ? formData.accommodationType.join(', ') : 'To be discussed';
    
    // Optimized message to reduce length
    return `🌟 *Travel Package Request* 🌟

Hi Travel Quench Team! Here&apos;s my trip plan:

✈️ *Trip Overview*
📍 Destinations: ${destinations}
🏠 Type: ${formData.tripType.charAt(0).toUpperCase() + formData.tripType.slice(1)}
📅 Dates: ${formData.startDate || 'TBD'} to ${formData.endDate || 'TBD'} (${formData.duration} days)
🔄 Flexibility: ${formData.flexibility || 'TBD'}

👥 *Travelers*
Adults: ${formData.adults}, Children: ${formData.children}, Infants: ${formData.infants}
${formData.specialNeeds.length > 0 ? `🔶 Needs: ${formData.specialNeeds.join(', ')}` : ''}

💰 *Budget*
Total: ${formData.totalBudget || 'TBD'}
Flexibility: ${formData.budgetFlexibility || 'Standard'}

🚗 *Transport*
Mode: ${transportMethods}
${formData.flightClass ? `Flight: ${formData.flightClass}` : ''}
${formData.localTransport.length > 0 ? `Local: ${formData.localTransport.join(', ')}` : ''}

🏨 *Accommodation*
Type: ${accommodationPrefs}
${formData.roomType ? `Room: ${formData.roomType}` : ''}
${formData.amenities.length > 0 ? `Amenities: ${formData.amenities.join(', ')}` : ''}

🎯 *Interests*
${interests}
${formData.activityLevel ? `Activity: ${formData.activityLevel}` : ''}
${formData.mustDoActivities ? `Must-Do: ${formData.mustDoActivities}` : ''}

🍽️ *Food*
${formData.mealPreferences.length > 0 ? `Meals: ${formData.mealPreferences.join(', ')}` : ''}
${formData.dietaryRestrictions.length > 0 ? `Restrictions: ${formData.dietaryRestrictions.join(', ')}` : ''}
Local Cuisine: ${formData.localCuisine ? 'Yes' : 'No'}

🎨 *Style*
${formData.travelStyle ? `Style: ${formData.travelStyle}` : ''}
${formData.pacePreference ? `Pace: ${formData.pacePreference}` : ''}

🎪 *Extras*
${formData.occasion ? `Occasion: ${formData.occasion}` : ''}
${formData.guidePreference ? `Guide: ${formData.guidePreference}` : ''}
${formData.travelInsurance ? '✅ Insurance' : ''}
${formData.visaSupport ? '✅ Visa Support' : ''}

📞 *Contact*
Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
${formData.preferredContact ? `Contact: ${formData.preferredContact}` : ''}

${formData.specialRequests ? `🌟 *Requests*\n${formData.specialRequests}\n` : ''}
${formData.additionalNotes ? `📝 *Notes*\n${formData.additionalNotes}\n` : ''}

Please create my dream trip! 🌴✨`;
  };

  const handleWhatsAppRedirect = () => {
    try {
      const whatsappMessage = generateWhatsAppMessage();
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const maxUrlLength = 2000; // WhatsApp URL length limit
      if (encodedMessage.length > maxUrlLength - 100) {
        setErrorMessage('Your request is too long for WhatsApp. Please shorten your inputs or contact us directly.');
        return;
      }
      const whatsappURL = `https://wa.me/917006377796?text=${encodedMessage}`;
      window.open(whatsappURL, '_blank');
      
      // Call the onSubmit callback
      onSubmit(formData);
    } catch {
      setErrorMessage('Failed to generate WhatsApp message. Please try again or contact us directly at +917006377796.');
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Trip Basics</h3>
            
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-3">Trip Type</label>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { value: 'domestic', label: 'Domestic', icon: Home, desc: 'Within India' },
                  { value: 'international', label: 'International', icon: Globe, desc: 'Outside India' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleInputChange('tripType', option.value)}
                    className={`p-4 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                      formData.tripType === option.value
                        ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                    }`}
                  >
                    <option.icon className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.desc}</div>
                  </button>
                ))}
              </div>
              <span className="absolute -top-2 right-0 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Choose your adventure!
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Destinations & Duration</label>
              <div className="space-y-3">
                {formData.destinations.map((destination, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-4 border rounded-lg bg-gray-50 shadow-sm">
                    <Input
                      placeholder={`Destination ${index + 1}`}
                      value={destination.city}
                      onChange={(e) => updateDestination(index, 'city', e.target.value)}
                      className="sm:col-span-2 transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                    />
                    <Input
                      type="number"
                      placeholder="Days"
                      value={destination.days}
                      onChange={(e) => updateDestination(index, 'days', parseInt(e.target.value) || 1)}
                      min="1"
                      className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                    />
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Budget"
                        value={destination.budget}
                        onChange={(e) => updateDestination(index, 'budget', e.target.value)}
                        className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                      />
                      {formData.destinations.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeDestination(index)}
                          className="p-2 hover:bg-red-50"
                        >
                          <Minus className="w-4 h-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addDestination}
                  className="w-full sm:w-auto hover:bg-orange-50 transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Destination
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                leftIcon={<Calendar className="w-4 h-4 text-orange-500" />}
                className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
              />
              <Input
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                min={formData.startDate || new Date().toISOString().split('T')[0]}
                leftIcon={<Calendar className="w-4 h-4 text-orange-500" />}
                className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Date Flexibility</label>
              <select
                value={formData.flexibility}
                onChange={(e) => handleInputChange('flexibility', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select flexibility</option>
                <option value="exact">Exact dates only</option>
                <option value="1-2-days">±1-2 days flexible</option>
                <option value="1-week">±1 week flexible</option>
                <option value="very-flexible">Very flexible</option>
              </select>
            </div>

            {formData.duration > 0 && (
              <div className="text-center">
                <span className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold text-base">
                  {formData.duration} Days Adventure
                </span>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Travelers Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Number of Travelers</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { key: 'adults', label: 'Adults (18+)', min: 1 },
                  { key: 'children', label: 'Children (2-17)', min: 0 },
                  { key: 'infants', label: 'Infants (0-2)', min: 0 }
                ].map((travelerType) => (
                  <div key={travelerType.key} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 shadow-sm">
                    <span className="font-medium text-sm">{travelerType.label}</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const currentValue = formData[travelerType.key as keyof CustomPackageData] as number;
                          if (currentValue > travelerType.min) {
                            handleInputChange(travelerType.key as keyof CustomPackageData, currentValue - 1);
                          }
                        }}
                        className="w-8 h-8 p-0 hover:bg-red-50"
                      >
                        <Minus className="w-3 h-3 text-red-500" />
                      </Button>
                      <span className="w-6 text-center font-semibold">
                        {formData[travelerType.key as keyof CustomPackageData] as number}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const currentValue = formData[travelerType.key as keyof CustomPackageData] as number;
                          handleInputChange(travelerType.key as keyof CustomPackageData, currentValue + 1);
                        }}
                        className="w-8 h-8 p-0 hover:bg-green-50"
                      >
                        <Plus className="w-3 h-3 text-green-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-center">
                <span className="text-base font-semibold text-orange-600">
                  Total: {formData.totalTravelers} Travelers
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Special Needs or Accessibility</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specialNeeds.map((need) => (
                  <button
                    key={need.value}
                    type="button"
                    onClick={() => {
                      const isSelected = formData.specialNeeds.includes(need.value);
                      handleArrayChange('specialNeeds', need.value, !isSelected);
                    }}
                    className={`p-3 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                      formData.specialNeeds.includes(need.value)
                        ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-sm font-medium">{need.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Special Occasion</label>
              <select
                value={formData.occasion}
                onChange={(e) => handleInputChange('occasion', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select if applicable</option>
                <option value="honeymoon">Honeymoon</option>
                <option value="anniversary">Anniversary</option>
                <option value="birthday">Birthday Celebration</option>
                <option value="family-reunion">Family Reunion</option>
                <option value="graduation">Graduation Trip</option>
                <option value="retirement">Retirement Celebration</option>
                <option value="babymoon">Babymoon</option>
                <option value="solo-adventure">Solo Adventure</option>
                <option value="friends-trip">Friends Trip</option>
                <option value="business-leisure">Business + Leisure</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Budget & Pricing</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Total Budget Range</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {budgetRanges.map((budget) => (
                  <button
                    key={budget.value}
                    type="button"
                    onClick={() => handleInputChange('totalBudget', budget.value)}
                    className={`p-4 border rounded-lg text-left transition-all duration-300 transform hover:scale-105 ${
                      formData.totalBudget === budget.value
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{budget.label}</div>
                    <div className="text-xs text-gray-600">{budget.range}</div>
                  </button>
                ))}
              </div>
            </div>

            {formData.totalBudget === 'custom' && (
              <Input
                label="Custom Budget Amount"
                placeholder="e.g., ₹85,000 per person"
                value={formData.budgetBreakdown.accommodation}
                onChange={(e) => handleInputChange('totalBudget', e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
              />
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Budget Breakdown (Optional)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(formData.budgetBreakdown).map(([key, value]) => (
                  <Input
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    placeholder="e.g., ₹15,000"
                    value={value}
                    onChange={(e) => 
                      setFormData(prev => ({
                        ...prev,
                        budgetBreakdown: { ...prev.budgetBreakdown, [key]: e.target.value }
                      }))
                    }
                    className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Budget Flexibility</label>
              <select
                value={formData.budgetFlexibility}
                onChange={(e) => handleInputChange('budgetFlexibility', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select flexibility</option>
                <option value="strict">Strict budget - cannot exceed</option>
                <option value="slight">Can exceed by 10-15%</option>
                <option value="moderate">Can exceed by 20-30%</option>
                <option value="flexible">Very flexible with budget</option>
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Transportation & Travel</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Transportation Methods</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {transportModes.map((transport) => (
                  <button
                    key={transport.value}
                    type="button"
                    onClick={() => {
                      const isSelected = formData.transportMode.includes(transport.value);
                      handleArrayChange('transportMode', transport.value, !isSelected);
                    }}
                    className={`p-4 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                      formData.transportMode.includes(transport.value)
                        ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                    }`}
                  >
                    <transport.icon className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                    <div className="text-sm font-medium">{transport.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {formData.transportMode.includes('flight') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Flight Class Preference</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: 'economy', label: 'Economy Class' },
                    { value: 'business', label: 'Business Class' },
                    { value: 'first', label: 'First Class' }
                  ].map((flightClass) => (
                    <button
                      key={flightClass.value}
                      type="button"
                      onClick={() => handleInputChange('flightClass', flightClass.value)}
                      className={`p-4 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                        formData.flightClass === flightClass.value
                          ? 'border-orange-500 bg-orange-50 shadow-md'
                          : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="font-medium">{flightClass.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Local Transportation Preferences</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  'Private car with driver',
                  'Self-drive rental',
                  'Public transport',
                  'Taxi/Uber',
                  'Bicycle/Scooter',
                  'Walking tours',
                  'Local buses',
                  'Metro/Subway'
                ].map((transport) => (
                  <button
                    key={transport}
                    type="button"
                    onClick={() => {
                      const isSelected = formData.localTransport.includes(transport);
                      handleArrayChange('localTransport', transport, !isSelected);
                    }}
                    className={`p-3 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                      formData.localTransport.includes(transport)
                        ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-xs font-medium">{transport}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="selfDrive"
                checked={formData.selfDrive}
                onChange={(e) => handleInputChange('selfDrive', e.target.checked)}
                className="mr-2 focus:ring-orange-500"
              />
              <label htmlFor="selfDrive" className="text-sm font-medium text-gray-700">
                I&apos;m interested in self-drive options
              </label>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Accommodation Preferences</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Accommodation Types</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {accommodationTypes.map((accommodation) => (
                  <button
                    key={accommodation.value}
                    type="button"
                    onClick={() => {
                      const isSelected = formData.accommodationType.includes(accommodation.value);
                      handleArrayChange('accommodationType', accommodation.value, !isSelected);
                    }}
                    className={`p-4 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                      formData.accommodationType.includes(accommodation.value)
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-2xl mb-2">{accommodation.icon}</div>
                    <div className="text-sm font-medium">{accommodation.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Room Type</label>
              <select
                value={formData.roomType}
                onChange={(e) => handleInputChange('roomType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select room type</option>
                <option value="single">Single Room</option>
                <option value="double">Double/Twin Room</option>
                <option value="triple">Triple Room</option>
                <option value="family">Family Room</option>
                <option value="suite">Suite</option>
                <option value="villa">Private Villa</option>
                <option value="apartment">Apartment</option>
                <option value="dormitory">Shared Dormitory</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Required Amenities</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {amenities.map((amenity) => (
                  <button
                    key={amenity.value}
                    type="button"
                    onClick={() => {
                      const isSelected = formData.amenities.includes(amenity.value);
                      handleArrayChange('amenities', amenity.value, !isSelected);
                    }}
                    className={`p-3 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                      formData.amenities.includes(amenity.value)
                        ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                    }`}
                  >
                    <amenity.icon className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                    <div className="text-sm font-medium">{amenity.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Location Preference</label>
              <select
                value={formData.locationPreference}
                onChange={(e) => handleInputChange('locationPreference', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select preference</option>
                <option value="city-center">City Center</option>
                <option value="near-attractions">Near Main Attractions</option>
                <option value="beach-front">Beach Front</option>
                <option value="mountain-view">Mountain View</option>
                <option value="quiet-area">Quiet/Peaceful Area</option>
                <option value="shopping-district">Shopping District</option>
                <option value="business-district">Business District</option>
                <option value="airport-nearby">Near Airport</option>
                <option value="transport-hub">Near Transport Hub</option>
              </select>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Activities & Experiences</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">What interests you most?</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {interestOptions.map((interest) => (
                  <button
                    key={interest.value}
                    type="button"
                    onClick={() => {
                      const isSelected = formData.interests.includes(interest.value);
                      handleArrayChange('interests', interest.value, !isSelected);
                    }}
                    className={`p-4 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                      formData.interests.includes(interest.value)
                        ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                    }`}
                  >
                    <interest.icon className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                    <div className="text-sm font-medium">{interest.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Activity Level</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: 'low', label: 'Relaxed & Easy', desc: 'Minimal walking, comfortable pace' },
                  { value: 'moderate', label: 'Moderate Activity', desc: 'Some walking, balanced itinerary' },
                  { value: 'high', label: 'Active & Adventurous', desc: 'Lots of activities, fast pace' }
                ].map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => handleInputChange('activityLevel', level.value)}
                    className={`p-4 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                      formData.activityLevel === level.value
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="font-medium">{level.label}</div>
                    <div className="text-xs text-gray-600">{level.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Must-Do Activities or Experiences</label>
              <textarea
                placeholder="List specific activities, attractions, or experiences you definitely want to include..."
                value={formData.mustDoActivities}
                onChange={(e) => handleInputChange('mustDoActivities', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activities to Avoid</label>
              <textarea
                placeholder="List any activities, places, or experiences you want to avoid..."
                value={formData.avoidActivities}
                onChange={(e) => handleInputChange('avoidActivities', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="photographyFocus"
                checked={formData.photographyFocus}
                onChange={(e) => handleInputChange('photographyFocus', e.target.checked)}
                className="mr-2 focus:ring-orange-500"
              />
              <label htmlFor="photographyFocus" className="text-sm font-medium text-gray-700">
                Photography is a major focus of this trip
              </label>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Food, Style & Travel Preferences</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Meal Preferences</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'Vegetarian', 'Vegan', 'Non-vegetarian', 'Jain food',
                  'Halal', 'Kosher', 'Gluten-free', 'No preference'
                ].map((meal) => (
                  <button
                    key={meal}
                    type="button"
                    onClick={() => {
                      const isSelected = formData.mealPreferences.includes(meal);
                      handleArrayChange('mealPreferences', meal, !isSelected);
                    }}
                    className={`p-3 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                      formData.mealPreferences.includes(meal)
                        ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-sm font-medium">{meal}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Dietary Restrictions/Allergies</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'Nuts allergy', 'Dairy allergy', 'Shellfish allergy',
                  'Gluten intolerance', 'Diabetes friendly', 'Low sodium',
                  'No spicy food', 'No alcohol'
                ].map((restriction) => (
                  <button
                    key={restriction}
                    type="button"
                    onClick={() => {
                      const isSelected = formData.dietaryRestrictions.includes(restriction);
                      handleArrayChange('dietaryRestrictions', restriction, !isSelected);
                    }}
                    className={`p-3 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                      formData.dietaryRestrictions.includes(restriction)
                        ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-sm font-medium">{restriction}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Travel Style</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { value: 'luxury', label: 'Luxury Travel', desc: 'Premium experiences & services' },
                  { value: 'comfort', label: 'Comfort Travel', desc: 'Good balance of comfort & value' },
                  { value: 'budget', label: 'Budget Travel', desc: 'Cost-effective options' },
                  { value: 'backpacking', label: 'Backpacking', desc: 'Independent, flexible travel' },
                  { value: 'eco', label: 'Eco-Tourism', desc: 'Sustainable & responsible travel' },
                  { value: 'cultural', label: 'Cultural Immersion', desc: 'Deep local experiences' }
                ].map((style) => (
                  <button
                    key={style.value}
                    type="button"
                    onClick={() => handleInputChange('travelStyle', style.value)}
                    className={`p-4 border rounded-lg text-left transition-all duration-300 transform hover:scale-105 ${
                      formData.travelStyle === style.value
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="font-semibold">{style.label}</div>
                    <div className="text-xs text-gray-600">{style.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Travel Pace</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: 'slow', label: 'Slow & Relaxed', desc: 'Plenty of time at each place' },
                  { value: 'moderate', label: 'Balanced Pace', desc: 'Mix of activities & rest' },
                  { value: 'fast', label: 'Fast & Packed', desc: 'See as much as possible' }
                ].map((pace) => (
                  <button
                    key={pace.value}
                    type="button"
                    onClick={() => handleInputChange('pacePreference', pace.value)}
                    className={`p-4 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                      formData.pacePreference === pace.value
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="font-semibold">{pace.label}</div>
                    <div className="text-xs text-gray-600">{pace.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="localCuisine"
                checked={formData.localCuisine}
                onChange={(e) => handleInputChange('localCuisine', e.target.checked)}
                className="mr-2 focus:ring-orange-500"
              />
              <label htmlFor="localCuisine" className="text-sm font-medium text-gray-700">
                I&apos;m interested in trying local cuisine and food experiences
              </label>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Services & Contact Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Guide Preference</label>
              <select
                value={formData.guidePreference}
                onChange={(e) => handleInputChange('guidePreference', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select preference</option>
                <option value="local-guide">Local guide at each destination</option>
                <option value="tour-guide">Professional tour guide for entire trip</option>
                <option value="self-guided">Self-guided with recommendations</option>
                <option value="group-tour">Join group tours</option>
                <option value="private-tour">Private tours only</option>
                <option value="no-guide">No guide services needed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Language Support Needed</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 
                  'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'
                ].map((language) => (
                  <button
                    key={language}
                    type="button"
                    onClick={() => {
                      const isSelected = formData.languageSupport.includes(language);
                      handleArrayChange('languageSupport', language, !isSelected);
                    }}
                    className={`p-3 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                      formData.languageSupport.includes(language)
                        ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-sm font-medium">{language}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="travelInsurance"
                  checked={formData.travelInsurance}
                  onChange={(e) => handleInputChange('travelInsurance', e.target.checked)}
                  className="mr-2 focus:ring-orange-500"
                />
                <label htmlFor="travelInsurance" className="text-sm font-medium text-gray-700">
                  I need travel insurance assistance
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="visaSupport"
                  checked={formData.visaSupport}
                  onChange={(e) => handleInputChange('visaSupport', e.target.checked)}
                  className="mr-2 focus:ring-orange-500"
                />
                <label htmlFor="visaSupport" className="text-sm font-medium text-gray-700">
                  I need visa support and documentation help
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests or Requirements</label>
              <textarea
                placeholder="Any special arrangements, surprises, accessibility needs, or other specific requests..."
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200"
              />
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Your Name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  leftIcon={<User className="w-4 h-4 text-orange-500" />}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    leftIcon={<Mail className="w-4 h-4 text-orange-500" />}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    leftIcon={<Phone className="w-4 h-4 text-orange-500" />}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Contact Method</label>
                  <select
                    value={formData.preferredContact}
                    onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select preference</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="phone">Phone Call</option>
                    <option value="email">Email</option>
                    <option value="video-call">Video Call</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  placeholder="Any other information or questions you&apos;d like to share..."
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-gray-50 to-white ${className}`}>
      <Card className="p-6 lg:p-8 shadow-lg rounded-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Craft Your Dream Adventure
          </h2>
          <p className="text-base text-gray-600 px-4">
            Share your vision, and we&apos;ll design a personalized travel experience just for you!
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}

        <form className="space-y-8">
          {renderStep()}

          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="order-2 sm:order-1 border-gray-300 hover:bg-gray-100 transition-all duration-200"
            >
              Previous Step
            </Button>

            <div className="flex flex-col sm:flex-row gap-4 order-1 sm:order-2">
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                  className="bg-orange-600 hover:bg-orange-700 text-white transition-all duration-200"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleWhatsAppRedirect}
                  className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center px-6 py-3 font-semibold transition-all duration-200"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Send Request via WhatsApp
                </Button>
              )}
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 px-4">
            <p>
              By sending your request, you agree to our Terms of Service. Our travel experts will reach out within 24 hours with a tailored itinerary and pricing.
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CustomPackageForm;
