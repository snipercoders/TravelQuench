
// // src/lib/db/models/Review.ts
// import mongoose, { Document, Schema } from 'mongoose';

// export interface ReviewDocument extends Document {
//   _id: string;
//   userId: string;
//   packageId: string;
//   bookingId: string;
//   rating: number;
//   title: string;
//   comment: string;
//   images?: string[];
//   isVerified: boolean;
//   isVisible: boolean;
//   helpful: number;
//   reported: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const reviewSchema = new Schema<ReviewDocument>({
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     index: true
//   },
//   packageId: {
//     type: Schema.Types.ObjectId,
//     ref: 'Package',
//     required: true,
//     index: true
//   },
//   bookingId: {
//     type: Schema.Types.ObjectId,
//     ref: 'Booking',
//     required: true,
//     unique: true
//   },
//   rating: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 5
//   },
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//     maxLength: [100, 'Review title cannot exceed 100 characters']
//   },
//   comment: {
//     type: String,
//     required: true,
//     trim: true,
//     maxLength: [1000, 'Review comment cannot exceed 1000 characters']
//   },
//   images: [String],
//   isVerified: {
//     type: Boolean,
//     default: false
//   },
//   isVisible: {
//     type: Boolean,
//     default: true
//   },
//   helpful: {
//     type: Number,
//     default: 0,
//     min: 0
//   },
//   reported: {
//     type: Number,
//     default: 0,
//     min: 0
//   }
// }, {
//   timestamps: true
// });

// // Indexes
// reviewSchema.index({ packageId: 1, rating: -1 });
// reviewSchema.index({ userId: 1 });
// reviewSchema.index({ isVisible: 1, isVerified: 1 });
// reviewSchema.index({ createdAt: -1 });

// // Only one review per booking
// reviewSchema.index({ bookingId: 1 }, { unique: true });

// const Review = mongoose.models.Review || mongoose.model<ReviewDocument>('Review', reviewSchema);

// export default Review;










// src/lib/db/models/Review.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ReviewDocument extends Document {
  _id: string;
  userId: Types.ObjectId; // Changed from string to Types.ObjectId
  packageId: Types.ObjectId; // Changed from string to Types.ObjectId
  bookingId: Types.ObjectId; // Changed from string to Types.ObjectId
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  isVerified: boolean;
  isVisible: boolean;
  helpful: number;
  reported: number;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<ReviewDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  packageId: {
    type: Schema.Types.ObjectId,
    ref: 'Package',
    required: true,
    index: true
  },
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
    unique: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: [100, 'Review title cannot exceed 100 characters']
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxLength: [1000, 'Review comment cannot exceed 1000 characters']
  },
  images: [String],
  isVerified: {
    type: Boolean,
    default: false
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  helpful: {
    type: Number,
    default: 0,
    min: 0
  },
  reported: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Indexes
reviewSchema.index({ packageId: 1, rating: -1 });
reviewSchema.index({ userId: 1 });
reviewSchema.index({ isVisible: 1, isVerified: 1 });
reviewSchema.index({ createdAt: -1 });

// Only one review per booking
reviewSchema.index({ bookingId: 1 }, { unique: true });

const Review = mongoose.models.Review || mongoose.model<ReviewDocument>('Review', reviewSchema);

export default Review;