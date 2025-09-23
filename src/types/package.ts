// export interface TravelPackage {
// _id: string;
//   title: string;
//   description: string;
//   shortDescription: string;
//   type: 'international' | 'domestic';
//   category: 'adventure' | 'luxury' | 'cultural' | 'spiritual' | 'beach' | 'mountain' | 'city';
//   destinations: Destination[];
//   duration: number; // in days
//   groupSize: {
//     min: number;
//     max: number;
//   };
//   pricing: PackagePricing;
//   itinerary: ItineraryDay[];
//   inclusions: string[];
//   exclusions: string[];
//   images: CloudinaryImage[];
//   videos?: CloudinaryVideo[];
//   availability: PackageAvailability[];
//   features: string[];
//   difficulty?: 'easy' | 'moderate' | 'challenging' | 'extreme';
//   bestTimeToVisit: string[];
//   languages: string[];
//   isActive: boolean;
//   isFeatured: boolean;
//   rating: number;
//   reviewCount: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface Destination {
//   name: string;
//   country: string;
//   city: string;
//   coordinates?: {
//     lat: number;
//     lng: number;
//   };
// }

// export interface PackagePricing {
//   basePrice: number;
//   currency: 'INR' | 'USD' | 'EUR';
//   pricePerPerson: boolean;
//   discountedPrice?: number;
//   seasonalPricing?: SeasonalPricing[];
//   groupDiscounts?: GroupDiscount[];
// }

// export interface SeasonalPricing {
//   season: string;
//   startDate: Date;
//   endDate: Date;
//   multiplier: number; // 1.2 for 20% increase, 0.8 for 20% discount
// }

// export interface GroupDiscount {
//   minSize: number;
//   maxSize: number;
//   discountPercent: number;
// }

// export interface ItineraryDay {
//   day: number;
//   title: string;
//   description: string;
//   activities: Activity[];
//   meals: ('breakfast' | 'lunch' | 'dinner')[];
//   accommodation?: {
//     name: string;
//     type: string;
//     rating?: number;
//   };
//   transport?: {
//     mode: string;
//     details: string;
//   };
// }

// export interface Activity {
//   name: string;
//   description: string;
//   duration: string;
//   location: string;
//   isOptional: boolean;
//   additionalCost?: number;
// }

// export interface PackageAvailability {
//   startDate: Date;
//   endDate: Date;
//   maxBookings: number;
//   currentBookings: number;
//   status: 'available' | 'limited' | 'sold-out';
// }

// export interface CloudinaryImage {
//   publicId: string;
//   url: string;
//   secureUrl: string;
//   width: number;
//   height: number;
//   alt?: string;
// }

// export interface CloudinaryVideo {
//   publicId: string;
//   url: string;
//   secureUrl: string;
//   duration: number;
//   width: number;
//   height: number;
// }











// src/types/index.ts

// User interface
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role?: string;
  avatar?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Package type for simple references
export interface Package {
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
  maxGroupSize?: number;
  description?: string;
  isFeatured: boolean;
}

// Your existing TravelPackage interface
export interface TravelPackage {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  type: 'international' | 'domestic';
  category: 'adventure' | 'luxury' | 'cultural' | 'spiritual' | 'beach' | 'mountain' | 'city';
  destinations: Destination[];
  duration: number; // in days
  groupSize: {
    min: number;
    max: number;
  };
  pricing: PackagePricing;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  images: CloudinaryImage[];
  videos?: CloudinaryVideo[];
  availability: PackageAvailability[];
  features: string[];
  difficulty?: 'easy' | 'moderate' | 'challenging' | 'extreme';
  bestTimeToVisit: string[];
  languages: string[];
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Destination {
  name: string;
  country: string;
  city: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface PackagePricing {
  basePrice: number;
  currency: 'INR' | 'USD' | 'EUR';
  pricePerPerson: boolean;
  discountedPrice?: number;
  seasonalPricing?: SeasonalPricing[];
  groupDiscounts?: GroupDiscount[];
}

export interface SeasonalPricing {
  season: string;
  startDate: Date;
  endDate: Date;
  multiplier: number; // 1.2 for 20% increase, 0.8 for 20% discount
}

export interface GroupDiscount {
  minSize: number;
  maxSize: number;
  discountPercent: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: Activity[];
  meals: ('breakfast' | 'lunch' | 'dinner')[];
  accommodation?: {
    name: string;
    type: string;
    rating?: number;
  };
  transport?: {
    mode: string;
    details: string;
  };
}

export interface Activity {
  name: string;
  description: string;
  duration: string;
  location: string;
  isOptional: boolean;
  additionalCost?: number;
}

export interface PackageAvailability {
  startDate: Date;
  endDate: Date;
  maxBookings: number;
  currentBookings: number;
  status: 'available' | 'limited' | 'sold-out';
}

export interface CloudinaryImage {
  publicId: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
  alt?: string;
}

export interface CloudinaryVideo {
  publicId: string;
  url: string;
  secureUrl: string;
  duration: number;
  width: number;
  height: number;
}

// Traveler interface
export interface Traveler {
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  passportNumber?: string;
  passportExpiry?: Date;
  nationality: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  specialRequirements?: string;
}

// FIXED: Booking interface with no duplicate travelers
export interface Booking {
  _id: string;
  bookingId: string;
  userId: string;
  packageId: string;
  package: Package;
  user: User;
  travelers: Traveler[];  // Array of traveler details
  travelerCount: number;  // Number of travelers (renamed from duplicate 'travelers')
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  bookingDetails?: {
    accommodation?: string;
    transportation?: string;
    specialRequests?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Export all types
export * from './auth';
export * from './booking';