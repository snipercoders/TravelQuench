export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  profileImage?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  preferences?: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  preferredDestinations: string[];
  budgetRange: {
    min: number;
    max: number;
  };
  travelStyle: 'luxury' | 'mid-range' | 'budget' | 'backpacking';
  interests: string[];
  dietary?: 'vegetarian' | 'vegan' | 'halal' | 'kosher' | 'none';
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  profileImage?: string;
  preferences?: UserPreferences;
}