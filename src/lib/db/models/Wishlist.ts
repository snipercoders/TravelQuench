// src/lib/db/models/Wishlist.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IWishlist extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  packageId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const WishlistSchema = new Schema<IWishlist>({
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
  }
}, {
  timestamps: true,
  collection: 'wishlists'
});

// Create compound index to prevent duplicate entries
WishlistSchema.index({ userId: 1, packageId: 1 }, { unique: true });

// Create the model
const Wishlist = mongoose.models.Wishlist || mongoose.model<IWishlist>('Wishlist', WishlistSchema);

export default Wishlist;