
// // // // src/lib/db/models/Booking.ts



// // import mongoose, { Document, Schema } from 'mongoose';

// // export interface ITravelerInfo {
// //   name: string;
// //   age: number;
// //   gender: 'male' | 'female' | 'other';
// //   idType?: string;
// //   idNumber?: string;
// // }

// // export interface IContactDetails {
// //   name: string;
// //   email: string;
// //   phone: string;
// //   address?: string;
// //   emergencyContact?: string;
// // }

// // export interface IPackageDetails {
// //   title: string;
// //   destination: string;
// //   duration: number;
// //   type: 'domestic' | 'international';
// // }

// // export interface ITravelersCount {
// //   adults: number;
// //   children: number;
// // }

// // export interface IBooking extends Document {
// //   _id: string;
// //   userId: string;
// //   packageId: string;
// //   travelers: number;
// //   startDate: Date;
// //   endDate: Date;
// //   totalAmount: number;
// //   paidAmount: number;
// //   status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
// //   paymentStatus: 'pending' | 'paid' | 'partial' | 'refunded' | 'completed' | 'failed';
// //   specialRequests?: string;
// //   contactDetails: IContactDetails;
// //   travelersInfo: ITravelerInfo[];
// //   bookingReference: string;
// //   bookingId?: string;
// //   travelDate?: Date;
// //   packageDetails?: IPackageDetails;
// //   travelersCount?: ITravelersCount;
// //   customerInfo?: IContactDetails;
// //   paymentId?: string;
// //   razorpayOrderId?: string;
// //   paymentMethod?: string;
// //   paidAt?: Date;
// //   notes?: string;
// //   createdAt: Date;
// //   updatedAt: Date;
// // }

// // const travelerInfoSchema = new Schema<ITravelerInfo>({
// //   name: {
// //     type: String,
// //     required: [true, 'Traveler name is required'],
// //     trim: true,
// //   },
// //   age: {
// //     type: Number,
// //     required: [true, 'Traveler age is required'],
// //     min: [0, 'Age cannot be negative'],
// //     max: [120, 'Age cannot exceed 120'],
// //   },
// //   gender: {
// //     type: String,
// //     enum: ['male', 'female', 'other'],
// //     required: [true, 'Gender is required'],
// //   },
// //   idType: String,
// //   idNumber: String,
// // });

// // const contactDetailsSchema = new Schema<IContactDetails>({
// //   name: {
// //     type: String,
// //     required: [true, 'Contact name is required'],
// //     trim: true,
// //   },
// //   email: {
// //     type: String,
// //     required: [true, 'Contact email is required'],
// //     lowercase: true,
// //     trim: true,
// //   },
// //   phone: {
// //     type: String,
// //     required: [true, 'Contact phone is required'],
// //     trim: true,
// //   },
// //   address: String,
// //   emergencyContact: String,
// // });

// // const packageDetailsSchema = new Schema<IPackageDetails>({
// //   title: {
// //     type: String,
// //     required: true,
// //   },
// //   destination: {
// //     type: String,
// //     required: true,
// //   },
// //   duration: {
// //     type: Number,
// //     required: true,
// //   },
// //   type: {
// //     type: String,
// //     enum: ['domestic', 'international'],
// //     required: true,
// //   },
// // });

// // const travelersCountSchema = new Schema<ITravelersCount>({
// //   adults: {
// //     type: Number,
// //     required: true,
// //     min: 1,
// //   },
// //   children: {
// //     type: Number,
// //     default: 0,
// //     min: 0,
// //   },
// // });

// // const bookingSchema = new Schema<IBooking>(
// //   {
// //     userId: {
// //       type: Schema.Types.ObjectId,
// //       ref: 'User',
// //       required: [true, 'User ID is required'],
// //     },
// //     packageId: {
// //       type: Schema.Types.ObjectId,
// //       ref: 'Package',
// //       required: [true, 'Package ID is required'],
// //     },
// //     travelers: {
// //       type: Number,
// //       required: [true, 'Number of travelers is required'],
// //       min: [1, 'At least 1 traveler is required'],
// //       max: [20, 'Cannot exceed 20 travelers per booking'],
// //     },
// //     startDate: {
// //       type: Date,
// //       required: [true, 'Start date is required'],
// //     },
// //     endDate: {
// //       type: Date,
// //       required: [true, 'End date is required'],
// //     },
// //     totalAmount: {
// //       type: Number,
// //       required: [true, 'Total amount is required'],
// //       min: [0, 'Total amount cannot be negative'],
// //     },
// //     paidAmount: {
// //       type: Number,
// //       default: 0,
// //       min: [0, 'Paid amount cannot be negative'],
// //     },
// //     status: {
// //       type: String,
// //       enum: ['pending', 'confirmed', 'completed', 'cancelled'],
// //       default: 'pending',
// //     },
// //     paymentStatus: {
// //       type: String,
// //       enum: ['pending', 'paid', 'partial', 'refunded', 'completed', 'failed'],
// //       default: 'pending',
// //     },
// //     specialRequests: String,
// //     contactDetails: contactDetailsSchema,
// //     travelersInfo: [travelerInfoSchema],
// //     bookingReference: {
// //       type: String,
// //       required: [true, 'Booking reference is required'],
// //       unique: true,
// //     },
// //     bookingId: {
// //       type: String,
// //       sparse: true, // Allows multiple null values but ensures uniqueness when value exists
// //     },
// //     travelDate: Date,
// //     packageDetails: packageDetailsSchema,
// //     travelersCount: travelersCountSchema,
// //     customerInfo: contactDetailsSchema,
// //     paymentId: String,
// //     razorpayOrderId: String,
// //     paymentMethod: String,
// //     paidAt: Date,
// //     notes: String,
// //   },
// //   {
// //     timestamps: true,
// //   }
// // );

// // // Indexes
// // bookingSchema.index({ userId: 1, createdAt: -1 });
// // bookingSchema.index({ packageId: 1 });
// // bookingSchema.index({ status: 1 });
// // bookingSchema.index({ paymentStatus: 1 });
// // bookingSchema.index({ bookingReference: 1 });
// // bookingSchema.index({ bookingId: 1 }, { sparse: true });
// // bookingSchema.index({ paymentId: 1 });
// // bookingSchema.index({ razorpayOrderId: 1 });
// // bookingSchema.index({ startDate: 1 });
// // bookingSchema.index({ travelDate: 1 });
// // bookingSchema.index({ createdAt: -1 });

// // // Pre-save middleware to generate booking reference and bookingId
// // bookingSchema.pre('save', function (next) {
// //   if (!this.bookingReference) {
// //     this.bookingReference = 'TQ' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase();
// //   }

// //   // Set bookingId to bookingReference if not set
// //   if (!this.bookingId && this.bookingReference) {
// //     this.bookingId = this.bookingReference;
// //   }

// //   // Sync customerInfo with contactDetails
// //   if (this.contactDetails && !this.customerInfo) {
// //     this.customerInfo = this.contactDetails;
// //   }

// //   // Sync travelDate with startDate
// //   if (this.startDate && !this.travelDate) {
// //     this.travelDate = this.startDate;
// //   }

// //   // Calculate total travelers from travelersCount
// //   if (this.travelersCount && !this.travelers) {
// //     this.travelers = (this.travelersCount.adults || 0) + (this.travelersCount.children || 0);
// //   }

// //   // Update paidAmount when payment is completed
// //   if (this.paymentStatus === 'completed' || this.paymentStatus === 'paid') {
// //     this.paidAmount = this.totalAmount;
// //   }

// //   next();
// // });

// // // Virtual for remaining amount
// // bookingSchema.virtual('remainingAmount').get(function () {
// //   return Math.max(0, this.totalAmount - this.paidAmount);
// // });

// // // Virtual for payment percentage
// // bookingSchema.virtual('paymentPercentage').get(function () {
// //   if (this.totalAmount === 0) return 0;
// //   return Math.round((this.paidAmount / this.totalAmount) * 100);
// // });

// // // Virtual for travelers object (for payment integration compatibility)
// // bookingSchema.virtual('travelers_obj').get(function () {
// //   if (this.travelersCount) {
// //     return this.travelersCount;
// //   }
// //   // Try to reconstruct from legacy data
// //   return {
// //     adults: this.travelers || 1,
// //     children: 0,
// //   };
// // });

// // // Method to convert to payment integration format
// // bookingSchema.methods.toPaymentFormat = function () {
// //   return {
// //     _id: this._id,
// //     bookingId: this.bookingId || this.bookingReference,
// //     packageId: this.packageId,
// //     userId: this.userId,
// //     packageDetails: this.packageDetails,
// //     travelDate: this.travelDate || this.startDate,
// //     travelers: this.travelersCount || {
// //       adults: this.travelers || 1,
// //       children: 0,
// //     },
// //     totalAmount: this.totalAmount,
// //     specialRequests: this.specialRequests,
// //     customerInfo: this.customerInfo || this.contactDetails,
// //     status: this.status,
// //     paymentStatus: this.paymentStatus === 'paid' ? 'completed' : this.paymentStatus,
// //     paymentId: this.paymentId,
// //     razorpayOrderId: this.razorpayOrderId,
// //     paymentMethod: this.paymentMethod,
// //     paidAt: this.paidAt,
// //   };
// // };

// // // Method to update from booking form data
// // bookingSchema.methods.updateFromBookingForm = function (data: any) {
// //   // Update basic fields
// //   this.travelDate = data.travelDate;
// //   this.totalAmount = data.totalAmount;
// //   this.specialRequests = data.specialRequests;

// //   // Update travelers count
// //   this.travelersCount = {
// //     adults: data.adults,
// //     children: data.children,
// //   };
// //   this.travelers = data.adults + data.children;

// //   // Update customer info
// //   this.customerInfo = data.customerInfo;
// //   this.contactDetails = data.customerInfo;

// //   // Set dates
// //   this.startDate = new Date(data.travelDate);
// //   if (this.packageDetails && this.packageDetails.duration) {
// //     this.endDate = new Date(this.startDate.getTime() + this.packageDetails.duration * 24 * 60 * 60 * 1000);
// //   }
// // };

// // export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);











// // src/lib/db/models/Booking.ts
// import mongoose, { Document, Schema } from 'mongoose';

// export interface ITravelerInfo {
//   name: string;
//   age: number;
//   gender: 'male' | 'female' | 'other';
//   idType?: string;
//   idNumber?: string;
// }

// export interface IContactDetails {
//   name: string;
//   email: string;
//   phone: string;
//   address?: string;
//   emergencyContact?: string;
// }

// export interface IPackageDetails {
//   title: string;
//   destination: string;
//   duration: number;
//   type: 'domestic' | 'international';
// }

// export interface ITravelersCount {
//   adults: number;
//   children: number;
// }

// export interface IBooking extends Document {
//   _id: string;
//   userId: string;
//   packageId: string;
//   travelers: number;
//   startDate: Date;
//   endDate: Date;
//   totalAmount: number;
//   paidAmount: number;
//   status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
//   paymentStatus: 'pending' | 'paid' | 'partial' | 'refunded' | 'completed' | 'failed';
//   specialRequests?: string;
//   contactDetails: IContactDetails;
//   travelersInfo: ITravelerInfo[];
//   bookingReference: string;
//   bookingId?: string;
//   travelDate?: Date;
//   packageDetails?: IPackageDetails;
//   travelersCount?: ITravelersCount;
//   customerInfo?: IContactDetails;
//   paymentId?: string;
//   razorpayOrderId?: string;
//   paymentMethod?: string;
//   paidAt?: Date;
//   notes?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const travelerInfoSchema = new Schema<ITravelerInfo>({
//   name: {
//     type: String,
//     required: [true, 'Traveler name is required'],
//     trim: true,
//   },
//   age: {
//     type: Number,
//     required: [true, 'Traveler age is required'],
//     min: [0, 'Age cannot be negative'],
//     max: [120, 'Age cannot exceed 120'],
//   },
//   gender: {
//     type: String,
//     enum: ['male', 'female', 'other'],
//     required: [true, 'Gender is required'],
//   },
//   idType: String,
//   idNumber: String,
// });

// const contactDetailsSchema = new Schema<IContactDetails>({
//   name: {
//     type: String,
//     required: [true, 'Contact name is required'],
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: [true, 'Contact email is required'],
//     lowercase: true,
//     trim: true,
//   },
//   phone: {
//     type: String,
//     required: [true, 'Contact phone is required'],
//     trim: true,
//   },
//   address: String,
//   emergencyContact: String,
// });

// const packageDetailsSchema = new Schema<IPackageDetails>({
//   title: {
//     type: String,
//     required: true,
//   },
//   destination: {
//     type: String,
//     required: true,
//   },
//   duration: {
//     type: Number,
//     required: true,
//   },
//   type: {
//     type: String,
//     enum: ['domestic', 'international'],
//     required: true,
//   },
// });

// const travelersCountSchema = new Schema<ITravelersCount>({
//   adults: {
//     type: Number,
//     required: true,
//     min: 1,
//   },
//   children: {
//     type: Number,
//     default: 0,
//     min: 0,
//   },
// });

// const bookingSchema = new Schema<IBooking>(
//   {
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: [true, 'User ID is required'],
//     },
//     packageId: {
//       type: Schema.Types.ObjectId,
//       ref: 'Package',
//       required: [true, 'Package ID is required'],
//     },
//     travelers: {
//       type: Number,
//       required: [true, 'Number of travelers is required'],
//       min: [1, 'At least 1 traveler is required'],
//       max: [20, 'Cannot exceed 20 travelers per booking'],
//     },
//     startDate: {
//       type: Date,
//       required: [true, 'Start date is required'],
//     },
//     endDate: {
//       type: Date,
//       required: [true, 'End date is required'],
//     },
//     totalAmount: {
//       type: Number,
//       required: [true, 'Total amount is required'],
//       min: [0, 'Total amount cannot be negative'],
//     },
//     paidAmount: {
//       type: Number,
//       default: 0,
//       min: [0, 'Paid amount cannot be negative'],
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'confirmed', 'completed', 'cancelled'],
//       default: 'pending',
//     },
//     paymentStatus: {
//       type: String,
//       enum: ['pending', 'paid', 'partial', 'refunded', 'completed', 'failed'],
//       default: 'pending',
//     },
//     specialRequests: String,
//     contactDetails: contactDetailsSchema,
//     travelersInfo: [travelerInfoSchema],
//     bookingReference: {
//       type: String,
//       required: [true, 'Booking reference is required'],
//       unique: true,
//     },
//     bookingId: {
//       type: String,
//       sparse: true, // Allows multiple null values but ensures uniqueness when value exists
//     },
//     travelDate: Date,
//     packageDetails: packageDetailsSchema,
//     travelersCount: travelersCountSchema,
//     customerInfo: contactDetailsSchema,
//     paymentId: String,
//     razorpayOrderId: String,
//     paymentMethod: String,
//     paidAt: Date,
//     notes: String,
//   },
//   {
//     timestamps: true,
//   }
// );

// // Indexes
// bookingSchema.index({ userId: 1, createdAt: -1 });
// bookingSchema.index({ packageId: 1 });
// bookingSchema.index({ status: 1 });
// bookingSchema.index({ paymentStatus: 1 });
// bookingSchema.index({ bookingReference: 1 });
// bookingSchema.index({ bookingId: 1 }, { sparse: true });
// bookingSchema.index({ paymentId: 1 });
// bookingSchema.index({ razorpayOrderId: 1 });
// bookingSchema.index({ startDate: 1 });
// bookingSchema.index({ travelDate: 1 });
// bookingSchema.index({ createdAt: -1 });

// // Pre-save middleware to generate booking reference and handle paid amount
// bookingSchema.pre('save', function (next) {
//   if (!this.bookingReference) {
//     this.bookingReference = 'TQ' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase();
//   }

//   // Set bookingId to bookingReference if not set
//   if (!this.bookingId && this.bookingReference) {
//     this.bookingId = this.bookingReference;
//   }

//   // Sync customerInfo with contactDetails
//   if (this.contactDetails && !this.customerInfo) {
//     this.customerInfo = this.contactDetails;
//   }

//   // Sync travelDate with startDate
//   if (this.startDate && !this.travelDate) {
//     this.travelDate = this.startDate;
//   }

//   // Calculate total travelers from travelersCount
//   if (this.travelersCount && !this.travelers) {
//     this.travelers = (this.travelersCount.adults || 0) + (this.travelersCount.children || 0);
//   }

//   // FIXED: Update paidAmount when payment is completed
//   if ((this.paymentStatus === 'completed' || this.paymentStatus === 'paid') && this.paidAmount < this.totalAmount) {
//     this.paidAmount = this.totalAmount;
//   }

//   next();
// });

// // Pre-update middleware to handle paid amount on findByIdAndUpdate
// bookingSchema.pre(['updateOne', 'findOneAndUpdate'], async function(next) {
//   const update = this.getUpdate() as any;
  
//   // If paymentStatus is being set to completed/paid, also update paidAmount
//   if (update && (update.paymentStatus === 'completed' || update.paymentStatus === 'paid')) {
//     try {
//       const doc = await this.model.findOne(this.getQuery());
//       if (doc && !update.paidAmount) {
//         update.paidAmount = doc.totalAmount;
//         console.log(`Auto-setting paidAmount to ${doc.totalAmount} for booking ${doc._id}`);
//       }
//     } catch (error) {
//       console.error('Error in pre-update middleware:', error);
//     }
//   }
//   next();
// });

// // Virtual for remaining amount
// bookingSchema.virtual('remainingAmount').get(function () {
//   return Math.max(0, this.totalAmount - this.paidAmount);
// });

// // Virtual for payment percentage
// bookingSchema.virtual('paymentPercentage').get(function () {
//   if (this.totalAmount === 0) return 0;
//   return Math.round((this.paidAmount / this.totalAmount) * 100);
// });

// // Virtual for travelers object (for payment integration compatibility)
// bookingSchema.virtual('travelers_obj').get(function () {
//   if (this.travelersCount) {
//     return this.travelersCount;
//   }
//   // Try to reconstruct from legacy data
//   return {
//     adults: this.travelers || 1,
//     children: 0,
//   };
// });

// // Method to convert to payment integration format
// bookingSchema.methods.toPaymentFormat = function () {
//   return {
//     _id: this._id,
//     bookingId: this.bookingId || this.bookingReference,
//     packageId: this.packageId,
//     userId: this.userId,
//     packageDetails: this.packageDetails,
//     travelDate: this.travelDate || this.startDate,
//     travelers: this.travelersCount || {
//       adults: this.travelers || 1,
//       children: 0,
//     },
//     totalAmount: this.totalAmount,
//     specialRequests: this.specialRequests,
//     customerInfo: this.customerInfo || this.contactDetails,
//     status: this.status,
//     paymentStatus: this.paymentStatus === 'paid' ? 'completed' : this.paymentStatus,
//     paymentId: this.paymentId,
//     razorpayOrderId: this.razorpayOrderId,
//     paymentMethod: this.paymentMethod,
//     paidAt: this.paidAt,
//   };
// };

// // Method to update from booking form data
// bookingSchema.methods.updateFromBookingForm = function (data: any) {
//   // Update basic fields
//   this.travelDate = data.travelDate;
//   this.totalAmount = data.totalAmount;
//   this.specialRequests = data.specialRequests;

//   // Update travelers count
//   this.travelersCount = {
//     adults: data.adults,
//     children: data.children,
//   };
//   this.travelers = data.adults + data.children;

//   // Update customer info
//   this.customerInfo = data.customerInfo;
//   this.contactDetails = data.customerInfo;

//   // Set dates
//   this.startDate = new Date(data.travelDate);
//   if (this.packageDetails && this.packageDetails.duration) {
//     this.endDate = new Date(this.startDate.getTime() + this.packageDetails.duration * 24 * 60 * 60 * 1000);
//   }
// };

// // Method to mark payment as completed (use this in payment verification)
// bookingSchema.methods.markPaymentCompleted = function (paymentDetails: any) {
//   this.status = 'confirmed';
//   this.paymentStatus = 'completed';
//   this.paymentId = paymentDetails.paymentId;
//   this.razorpayOrderId = paymentDetails.razorpayOrderId;
//   this.paymentMethod = paymentDetails.paymentMethod || 'razorpay';
//   this.paidAt = new Date();
//   this.paidAmount = this.totalAmount; // Explicitly set paid amount
//   return this.save();
// };

// export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);











// src/lib/db/models/Booking.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITravelerInfo {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  idType?: string;
  idNumber?: string;
}

export interface IContactDetails {
  name: string;
  email: string;
  phone: string;
  address?: string;
  emergencyContact?: string;
}

export interface IPackageDetails {
  title: string;
  destination: string;
  duration: number;
  type: 'domestic' | 'international';
}

export interface ITravelersCount {
  adults: number;
  children: number;
}

export interface IBooking extends Document {
  _id: string;
  userId: Types.ObjectId; // Changed from string to Types.ObjectId
  packageId: Types.ObjectId; // Changed from string to Types.ObjectId
  travelers: number;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  paidAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'partial' | 'refunded' | 'completed' | 'failed';
  specialRequests?: string;
  contactDetails: IContactDetails;
  travelersInfo: ITravelerInfo[];
  bookingReference: string;
  bookingId?: string;
  travelDate?: Date;
  packageDetails?: IPackageDetails;
  travelersCount?: ITravelersCount;
  customerInfo?: IContactDetails;
  paymentId?: string;
  razorpayOrderId?: string;
  paymentMethod?: string;
  paidAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define type for booking form data
interface BookingFormData {
  travelDate: string | Date;
  totalAmount: number;
  specialRequests?: string;
  adults: number;
  children: number;
  customerInfo: IContactDetails;
}

// Define type for payment details
interface PaymentDetails {
  paymentId: string;
  razorpayOrderId: string;
  paymentMethod?: string;
}

const travelerInfoSchema = new Schema<ITravelerInfo>({
  name: {
    type: String,
    required: [true, 'Traveler name is required'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Traveler age is required'],
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age cannot exceed 120'],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Gender is required'],
  },
  idType: String,
  idNumber: String,
});

const contactDetailsSchema = new Schema<IContactDetails>({
  name: {
    type: String,
    required: [true, 'Contact name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Contact email is required'],
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Contact phone is required'],
    trim: true,
  },
  address: String,
  emergencyContact: String,
});

const packageDetailsSchema = new Schema<IPackageDetails>({
  title: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['domestic', 'international'],
    required: true,
  },
});

const travelersCountSchema = new Schema<ITravelersCount>({
  adults: {
    type: Number,
    required: true,
    min: 1,
  },
  children: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const bookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    packageId: {
      type: Schema.Types.ObjectId,
      ref: 'Package',
      required: [true, 'Package ID is required'],
    },
    travelers: {
      type: Number,
      required: [true, 'Number of travelers is required'],
      min: [1, 'At least 1 traveler is required'],
      max: [20, 'Cannot exceed 20 travelers per booking'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount cannot be negative'],
    },
    paidAmount: {
      type: Number,
      default: 0,
      min: [0, 'Paid amount cannot be negative'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'partial', 'refunded', 'completed', 'failed'],
      default: 'pending',
    },
    specialRequests: String,
    contactDetails: contactDetailsSchema,
    travelersInfo: [travelerInfoSchema],
    bookingReference: {
      type: String,
      required: [true, 'Booking reference is required'],
      unique: true,
    },
    bookingId: {
      type: String,
      sparse: true, // Allows multiple null values but ensures uniqueness when value exists
    },
    travelDate: Date,
    packageDetails: packageDetailsSchema,
    travelersCount: travelersCountSchema,
    customerInfo: contactDetailsSchema,
    paymentId: String,
    razorpayOrderId: String,
    paymentMethod: String,
    paidAt: Date,
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Indexes
bookingSchema.index({ userId: 1, createdAt: -1 });
bookingSchema.index({ packageId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ bookingReference: 1 });
bookingSchema.index({ bookingId: 1 }, { sparse: true });
bookingSchema.index({ paymentId: 1 });
bookingSchema.index({ razorpayOrderId: 1 });
bookingSchema.index({ startDate: 1 });
bookingSchema.index({ travelDate: 1 });
bookingSchema.index({ createdAt: -1 });

// Pre-save middleware to generate booking reference and handle paid amount
bookingSchema.pre('save', function (next) {
  if (!this.bookingReference) {
    this.bookingReference = 'TQ' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase();
  }

  // Set bookingId to bookingReference if not set
  if (!this.bookingId && this.bookingReference) {
    this.bookingId = this.bookingReference;
  }

  // Sync customerInfo with contactDetails
  if (this.contactDetails && !this.customerInfo) {
    this.customerInfo = this.contactDetails;
  }

  // Sync travelDate with startDate
  if (this.startDate && !this.travelDate) {
    this.travelDate = this.startDate;
  }

  // Calculate total travelers from travelersCount
  if (this.travelersCount && !this.travelers) {
    this.travelers = (this.travelersCount.adults || 0) + (this.travelersCount.children || 0);
  }

  // Update paidAmount when payment is completed
  if ((this.paymentStatus === 'completed' || this.paymentStatus === 'paid') && this.paidAmount < this.totalAmount) {
    this.paidAmount = this.totalAmount;
  }

  next();
});

// Pre-update middleware to handle paid amount on findByIdAndUpdate
bookingSchema.pre(['updateOne', 'findOneAndUpdate'], async function (next) {
  const update = this.getUpdate() as Partial<IBooking>;

  // If paymentStatus is being set to completed/paid, also update paidAmount
  if (update && (update.paymentStatus === 'completed' || update.paymentStatus === 'paid')) {
    try {
      const doc = await this.model.findOne(this.getQuery());
      if (doc && !update.paidAmount) {
        update.paidAmount = doc.totalAmount;
        console.log(`Auto-setting paidAmount to ${doc.totalAmount} for booking ${doc._id}`);
      }
    } catch (error) {
      console.error('Error in pre-update middleware:', error);
    }
  }
  next();
});

// Virtual for remaining amount
bookingSchema.virtual('remainingAmount').get(function () {
  return Math.max(0, this.totalAmount - this.paidAmount);
});

// Virtual for payment percentage
bookingSchema.virtual('paymentPercentage').get(function () {
  if (this.totalAmount === 0) return 0;
  return Math.round((this.paidAmount / this.totalAmount) * 100);
});

// Virtual for travelers object (for payment integration compatibility)
bookingSchema.virtual('travelers_obj').get(function () {
  if (this.travelersCount) {
    return this.travelersCount;
  }
  // Try to reconstruct from legacy data
  return {
    adults: this.travelers || 1,
    children: 0,
  };
});

// Method to convert to payment integration format
bookingSchema.methods.toPaymentFormat = function () {
  return {
    _id: this._id,
    bookingId: this.bookingId || this.bookingReference,
    packageId: this.packageId,
    userId: this.userId,
    packageDetails: this.packageDetails,
    travelDate: this.travelDate || this.startDate,
    travelers: this.travelersCount || {
      adults: this.travelers || 1,
      children: 0,
    },
    totalAmount: this.totalAmount,
    specialRequests: this.specialRequests,
    customerInfo: this.customerInfo || this.contactDetails,
    status: this.status,
    paymentStatus: this.paymentStatus === 'paid' ? 'completed' : this.paymentStatus,
    paymentId: this.paymentId,
    razorpayOrderId: this.razorpayOrderId,
    paymentMethod: this.paymentMethod,
    paidAt: this.paidAt,
  };
};

// Method to update from booking form data
bookingSchema.methods.updateFromBookingForm = function (data: BookingFormData) {
  // Update basic fields
  this.travelDate = data.travelDate;
  this.totalAmount = data.totalAmount;
  this.specialRequests = data.specialRequests;

  // Update travelers count
  this.travelersCount = {
    adults: data.adults,
    children: data.children,
  };
  this.travelers = data.adults + data.children;

  // Update customer info
  this.customerInfo = data.customerInfo;
  this.contactDetails = data.customerInfo;

  // Set dates
  this.startDate = new Date(data.travelDate);
  if (this.packageDetails && this.packageDetails.duration) {
    this.endDate = new Date(this.startDate.getTime() + this.packageDetails.duration * 24 * 60 * 60 * 1000);
  }
};

// Method to mark payment as completed (use this in payment verification)
bookingSchema.methods.markPaymentCompleted = function (paymentDetails: PaymentDetails) {
  this.status = 'confirmed';
  this.paymentStatus = 'completed';
  this.paymentId = paymentDetails.paymentId;
  this.razorpayOrderId = paymentDetails.razorpayOrderId;
  this.paymentMethod = paymentDetails.paymentMethod || 'razorpay';
  this.paidAt = new Date();
  this.paidAmount = this.totalAmount; // Explicitly set paid amount
  return this.save();
};

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);