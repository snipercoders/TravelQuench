// // types/index.ts
// export interface User {
//   id: string;
//   firstName: string;
//   lastName: string;
//   name: string; // Combined firstName + lastName
//   email: string;
//   phone: string;
//   role: 'customer' | 'admin';
//   isEmailVerified: boolean;
//   profileImage?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface AuthResponse {
//   success: boolean;
//   message: string;
//   user?: User;
//   token?: string;
// }

// export interface ValidationError {
//   field: string;
//   message: string;
// }

// // Auth types
// export interface LoginCredentials {
//   email: string;
//   password: string;
// }

// export interface SignupData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   password: string;
//   confirmPassword: string;
// }

// export interface ForgotPasswordData {
//   email: string;
// }

// export interface ResetPasswordData {
//   password: string;
//   confirmPassword: string;
// }

// // Package types
// export interface Package {
//   id: string;
//   title: string;
//   description: string;
//   shortDescription: string;
//   type: string;
//   category: string;
//   destination: string;
//   duration: number; // in days
//   price: number;
//   originalPrice?: number;
//   images: string[];
//   thumbnail: string;
//   inclusions: string[];
//   exclusions: string[];
//   itinerary: ItineraryDay[];
//   highlights: string[];
//   bestTime: string;
//   difficulty?: string;
//   maxGroupSize: number;
//   minAge: number;
//   isActive: boolean;
//   isFeatured: boolean;
//   rating: number;
//   totalReviews: number;
//   tags: string[];
//   createdAt: string;
//   updatedAt: string;
// }

// export interface ItineraryDay {
//   day: number;
//   title: string;
//   description: string;
//   activities: string[];
//   meals: string[];
//   accommodation?: string;
// }

// // Booking types
// export interface Booking {
//   id: string;
//   userId: string;
//   packageId: string;
//   package: Package;
//   user: User;
//   travelers: number;
//   startDate: string;
//   endDate: string;
//   totalAmount: number;
//   status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
//   paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
//   specialRequests?: string;
//   contactDetails: {
//     name: string;
//     email: string;
//     phone: string;
//   };
//   travelers: TravelerInfo[];
//   createdAt: string;
//   updatedAt: string;
// }

// export interface TravelerInfo {
//   name: string;
//   age: number;
//   gender: 'male' | 'female' | 'other';
//   idType?: string;
//   idNumber?: string;
// }

// // Contact types
// export interface ContactData {
//   name: string;
//   email: string;
//   phone?: string;
//   subject: string;
//   message: string;
// }

// // API Response types
// export interface ApiResponse<T = any> {
//   success: boolean;
//   message: string;
//   data?: T;
//   errors?: ValidationError[];
// }

// export interface PaginatedResponse<T> extends ApiResponse<T[]> {
//   pagination: {
//     page: number;
//     limit: number;
//     total: number;
//     totalPages: number;
//   };
// }

// // Form props types
// export interface FormFieldProps {
//   label?: string;
//   error?: string;
//   required?: boolean;
//   disabled?: boolean;
//   className?: string;
// }






export interface User {
  id: string;
  firstName: string;
  lastName: string;
  name: string; // Combined firstName + lastName
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  isEmailVerified: boolean;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

// Package types
export interface Package {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  type: string;
  category: string;
  destination: string;
  duration: number; // in days
  price: number;
  originalPrice?: number;
  images: string[];
  thumbnail: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  highlights: string[];
  bestTime: string;
  difficulty?: string;
  maxGroupSize: number;
  minAge: number;
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  totalReviews: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation?: string;
}

// Booking types
export interface Booking {
  id: string;
  userId: string;
  packageId: string;
  package: Package;
  user: User;
  travelers: number;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  specialRequests?: string;
  contactDetails: {
    name: string;
    email: string;
    phone: string;
  };
  travelers: TravelerInfo[];
  createdAt: string;
  updatedAt: string;
}

export interface TravelerInfo {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  idType?: string;
  idNumber?: string;
}

// Contact types
export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: ValidationError[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form props types
export interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}