
// src/lib/db/models/Package.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IPackage extends Document {
  title: string;
  destination: string;
  description: string;
  duration: number;
  price: number;
  originalPrice?: number;
  category: string;
  type: 'domestic' | 'international';
  maxGroupSize: number;
  minAge?: number;
  difficulty?: string;
  rating: number;
  totalReviews: number;
  bookingCount: number;
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    meals: string[];
    accommodation?: string;
  }[];
  highlights: string[];
  thumbnail: string;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const packageSchema = new Schema<IPackage>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Adventure', 'Beach', 'Cultural', 'Family', 'Honeymoon', 'Luxury', 'Pilgrimage', 'Wildlife', 'Historical', 'Religious']
  },
  type: {
    type: String,
    required: true,
    enum: ['domestic', 'international']
  },
  maxGroupSize: {
    type: Number,
    required: true,
    min: 1
  },
  minAge: {
    type: Number,
    default: 0,
    min: 0
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Moderate', 'Challenging'],
    default: 'Easy'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0,
    min: 0
  },
  bookingCount: {
    type: Number,
    default: 0,
    min: 0
  },
  inclusions: [{
    type: String,
    trim: true
  }],
  exclusions: [{
    type: String,
    trim: true
  }],
  itinerary: [{
    day: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    meals: [{
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks']
    }],
    accommodation: {
      type: String,
      trim: true
    }
  }],
  highlights: [{
    type: String,
    trim: true
  }],
  thumbnail: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for better performance
packageSchema.index({ type: 1, category: 1 });
packageSchema.index({ isActive: 1, isFeatured: 1 });
packageSchema.index({ price: 1 });
packageSchema.index({ rating: -1 });
packageSchema.index({ createdAt: -1 });

// Pre-save middleware to update timestamps
packageSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Package || mongoose.model<IPackage>('Package', packageSchema);
