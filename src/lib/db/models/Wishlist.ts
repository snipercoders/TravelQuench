// src/lib/db/models/Wishlist.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface WishlistDocument extends Document {
  _id: string;
  userId: string;
  packageId: string;
  addedAt: Date;
}

const wishlistSchema = new Schema<WishlistDocument>({
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
  addedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false
});

// Compound index to prevent duplicate entries
wishlistSchema.index({ userId: 1, packageId: 1 }, { unique: true });

// Populate package details
wishlistSchema.pre(/^find/, function() {
  this.populate({
    path: 'packageId',
    select: 'title type category destinations duration pricing images rating reviewCount'
  });
});

const Wishlist = mongoose.models.Wishlist || mongoose.model<WishlistDocument>('Wishlist', wishlistSchema);

export default Wishlist;