// // src/lib/db/models/User.ts
// import mongoose, { Document, Schema } from 'mongoose';

// export interface IWishlistItem {
//   package: mongoose.Types.ObjectId;
//   addedAt: Date;
// }

// export interface IUser extends Document {
//   _id: mongoose.Types.ObjectId;
//   name: string;
//   email: string;
//   phone?: string;
//   password: string;
//   role: 'customer' | 'admin';
//   isVerified: boolean;
//   avatar?: string;
//   wishlist: IWishlistItem[];
//   resetPasswordToken?: string;
//   resetPasswordExpires?: Date;
//   verificationToken?: string;
//   verificationTokenExpires?: Date;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const WishlistItemSchema = new Schema<IWishlistItem>({
//   package: {
//     type: Schema.Types.ObjectId,
//     ref: 'Package',
//     required: true
//   },
//   addedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const UserSchema = new Schema<IUser>({
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true,
//     maxlength: [50, 'Name cannot exceed 50 characters']
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true,
//     match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
//   },
//   phone: {
//     type: String,
//     match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: [6, 'Password must be at least 6 characters']
//   },
//   role: {
//     type: String,
//     enum: ['customer', 'admin'],
//     default: 'customer'
//   },
//   isVerified: {
//     type: Boolean,
//     default: false
//   },
//   avatar: {
//     type: String
//   },
//   wishlist: [WishlistItemSchema],
//   resetPasswordToken: String,
//   resetPasswordExpires: Date,
//   verificationToken: String,
//   verificationTokenExpires: Date
// }, {
//   timestamps: true
// });

// // Index for faster wishlist queries
// UserSchema.index({ 'wishlist.package': 1 });

// // Pre-save middleware to hash password
// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
  
//   const bcrypt = require('bcryptjs');
//   const salt = await bcrypt.genSalt(12);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Method to compare password
// UserSchema.methods.comparePassword = async function(candidatePassword: string) {
//   const bcrypt = require('bcryptjs');
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// // Method to add package to wishlist
// UserSchema.methods.addToWishlist = function(packageId: string) {
//   const existingItem = this.wishlist.find(
//     (item: IWishlistItem) => item.package.toString() === packageId
//   );
  
//   if (!existingItem) {
//     this.wishlist.push({
//       package: new mongoose.Types.ObjectId(packageId),
//       addedAt: new Date()
//     });
//   }
  
//   return this.save();
// };

// // Method to remove package from wishlist
// UserSchema.methods.removeFromWishlist = function(packageId: string) {
//   this.wishlist = this.wishlist.filter(
//     (item: IWishlistItem) => item.package.toString() !== packageId
//   );
  
//   return this.save();
// };

// // Method to check if package is in wishlist
// UserSchema.methods.isInWishlist = function(packageId: string) {
//   return this.wishlist.some(
//     (item: IWishlistItem) => item.package.toString() === packageId
//   );
// };

// const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

// export { User };













// src/lib/db/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IWishlistItem {
  package: mongoose.Types.ObjectId;
  addedAt: Date;
}

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: 'customer' | 'admin';
  isVerified: boolean;
  avatar?: string;
  wishlist: IWishlistItem[];
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  verificationToken?: string;
  verificationTokenExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const WishlistItemSchema = new Schema<IWishlistItem>({
  package: {
    type: Schema.Types.ObjectId,
    ref: 'Package',
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  // isVerified: {
  //   type: Boolean,
  //   default: false
  // },
  avatar: {
    type: String
  },
  wishlist: [WishlistItemSchema],
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  verificationToken: String,
  verificationTokenExpires: Date
}, {
  timestamps: true
});

// Index for faster wishlist queries
UserSchema.index({ 'wishlist.package': 1 });

// Pre-save middleware to hash password
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword: string) {
  const bcrypt = require('bcryptjs');
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to add package to wishlist
UserSchema.methods.addToWishlist = function(packageId: string) {
  const existingItem = this.wishlist.find(
    (item: IWishlistItem) => item.package.toString() === packageId
  );
  
  if (!existingItem) {
    this.wishlist.push({
      package: new mongoose.Types.ObjectId(packageId),
      addedAt: new Date()
    });
  }
  
  return this.save();
};

// Method to remove package from wishlist
UserSchema.methods.removeFromWishlist = function(packageId: string) {
  this.wishlist = this.wishlist.filter(
    (item: IWishlistItem) => item.package.toString() !== packageId
  );
  
  return this.save();
};

// Method to check if package is in wishlist
UserSchema.methods.isInWishlist = function(packageId: string) {
  return this.wishlist.some(
    (item: IWishlistItem) => item.package.toString() === packageId
  );
};

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

// Export both default and named exports to support different import styles
export default User;
export { User };