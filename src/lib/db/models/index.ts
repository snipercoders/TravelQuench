// // src/lib/db/models/index.ts (FIXED)
// export { default as User } from './User';
// export { default as Package } from './Package';
// export { default as Booking } from './Booking';
// export { default as Review } from './Review';
// export { default as Wishlist } from './Wishlist';

// export type { UserDocument } from './User';
// export type { PackageDocument } from './Package';
// export type { BookingDocument } from './Booking';
// export type { ReviewDocument } from './Review';
// export type { WishlistDocument } from './Wishlist';








// src/lib/db/models/index.ts
export { default as User } from './User';
export { default as Package } from './Package';
export { default as Booking } from './Booking';
export { default as Review } from './Review';
// Commented out until Wishlist.ts is created properly
// export { default as Wishlist } from './Wishlist';

// Export types - commenting out problematic ones until we verify the actual export names
// export type { IUser as UserDocument } from './User';
// export type { IPackage as PackageDocument } from './Package';
export type { IBooking as BookingDocument } from './Booking';
// export type { IReview as ReviewDocument } from './Review';
// Commented out until Wishlist.ts is created properly
// export type { IWishlist as WishlistDocument } from './Wishlist';