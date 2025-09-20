// src/lib/db/models/index.ts (FIXED)
export { default as User } from './User';
export { default as Package } from './Package';
export { default as Booking } from './Booking';
export { default as Review } from './Review';
export { default as Wishlist } from './Wishlist';

export type { UserDocument } from './User';
export type { PackageDocument } from './Package';
export type { BookingDocument } from './Booking';
export type { ReviewDocument } from './Review';
export type { WishlistDocument } from './Wishlist';