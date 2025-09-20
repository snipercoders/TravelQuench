export interface Booking {
  _id: string;
  bookingId: string;
  userId: string;
  packageId: string;
  package: TravelPackage;
  user: User;
  bookingDetails: BookingDetails;
  travelers: Traveler[];
  pricing: BookingPricing;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentDetails?: PaymentDetails;
  specialRequests?: string;
  bookingDate: Date;
  travelDates: {
    startDate: Date;
    endDate: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingDetails {
  accommodation: AccommodationType;
  roomPreference: RoomType;
  transportPreference: TransportType;
  mealPlan: MealPlan;
  addOns: AddOn[];
}

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

export interface BookingPricing {
  baseAmount: number;
  taxes: number;
  serviceCharges: number;
  discounts: number;
  addOnsTotal: number;
  totalAmount: number;
  currency: string;
}

export type AccommodationType = 'standard' | 'deluxe' | 'premium' | 'luxury';
export type RoomType = 'single' | 'double' | 'twin' | 'triple' | 'family';
export type TransportType = 'economy' | 'premium' | 'business' | 'first-class';
export type MealPlan = 'none' | 'breakfast' | 'half-board' | 'full-board' | 'all-inclusive';

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'partially-refunded';

export interface PaymentDetails {
  method: 'card' | 'upi' | 'netbanking' | 'wallet';
  transactionId: string;
  gateway: string;
  gatewayTransactionId?: string;
  paidAmount: number;
  paidAt: Date;
  refundAmount?: number;
  refundedAt?: Date;
}

// Booking flow interfaces
export interface BookingFormData {
  packageId: string;
  travelDates: {
    startDate: string;
    endDate: string;
  };
  travelers: Traveler[];
  bookingDetails: BookingDetails;
  specialRequests?: string;
  guestCheckout?: boolean;
  guestDetails?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export interface CustomPackageRequest {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDates: {
    startDate: string;
    endDate: string;
  };
  travelers: number;
  budget: number;
  preferences: string[];
  specialRequests?: string;
  accommodation: AccommodationType;
  transport: TransportType;
  activities: string[];
}