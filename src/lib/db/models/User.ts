// // lib/db/models/User.ts
// import mongoose, { Document, Schema } from 'mongoose';

// export interface IUser extends Document {
//   _id: string;
//   name: string;
//   firstName?: string;
//   lastName?: string;
//   email: string;
//   phone?: string;
//   password: string;
//   isEmailVerified: boolean;
//   emailVerificationToken?: string;
//   emailVerificationExpiry?: Date;
//   resetPasswordToken?: string;
//   resetPasswordExpiry?: Date;
//   role: 'customer' | 'admin';
//   profileImage?: string;
//   address?: {
//     street?: string;
//     city?: string;
//     state?: string;
//     pincode?: string;
//     country?: string;
//   };
//   preferences?: {
//     currency?: string;
//     language?: string;
//     notifications?: {
//       email?: boolean;
//       sms?: boolean;
//       whatsapp?: boolean;
//     };
//   };
//   socialProfiles?: {
//     google?: string;
//     facebook?: string;
//   };
//   lastLoginAt?: Date;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const userSchema = new Schema<IUser>({
//  name: {
//   type: String,
//   required: [true, 'Name is required'],
//   trim: true,
//   minLength: [2, 'Name must be at least 2 characters'],
//   maxLength: [100, 'Name cannot exceed 100 characters']
// },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true,
//     trim: true,
//     match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
//   },
//   phone: {
//     type: String,
//     trim: true,
//     match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number']
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minLength: [6, 'Password must be at least 6 characters']
//   },
//   isEmailVerified: {
//     type: Boolean,
//     default: false
//   },
//   emailVerificationToken: String,
//   emailVerificationExpiry: Date,
//   resetPasswordToken: String,
//   resetPasswordExpiry: Date,
//   role: {
//     type: String,
//     enum: ['customer', 'admin'],
//     default: 'customer',
//   },
//   profileImage: {
//     type: String,
//     default: null
//   },
//   address: {
//     street: String,
//     city: String,
//     state: String,
//     pincode: {
//       type: String,
//       match: [/^\d{6}$/, 'Please enter a valid 6-digit pincode']
//     },
//     country: {
//       type: String,
//       default: 'India'
//     }
//   },
//   preferences: {
//     currency: {
//       type: String,
//       default: 'INR'
//     },
//     language: {
//       type: String,
//       default: 'en'
//     },
//     notifications: {
//       email: {
//         type: Boolean,
//         default: true
//       },
//       sms: {
//         type: Boolean,
//         default: false
//       },
//       whatsapp: {
//         type: Boolean,
//         default: false
//       }
//     }
//   },
//   socialProfiles: {
//     google: String,
//     facebook: String
//   },
//   lastLoginAt: Date
// }, {
//   timestamps: true
// });

// // Indexes for better query performance
// userSchema.index({ phone: 1 });
// userSchema.index({ role: 1 });
// userSchema.index({ createdAt: -1 });

// // Virtual for full name if firstName and lastName exist
// userSchema.virtual('fullName').get(function() {
//   if (this.firstName && this.lastName) {
//     return `${this.firstName} ${this.lastName}`;
//   }
//   return this.name;
// });

// // Pre-save middleware to ensure name consistency
// userSchema.pre('save', function(next) {
//   // If firstName and lastName are provided but name is not, create name
//   if (this.firstName && this.lastName && !this.name) {
//     this.name = `${this.firstName} ${this.lastName}`;
//   }
  
//   // If name is provided but firstName/lastName are not, try to split
//   if (this.name && !this.firstName && !this.lastName) {
//     const nameParts = this.name.split(' ');
//     if (nameParts.length >= 2) {
//       this.firstName = nameParts[0];
//       this.lastName = nameParts.slice(1).join(' ');
//     } else {
//       this.firstName = nameParts[0];
//     }
//   }
  
//   next();
// });

// // Method to get user's display name
// userSchema.methods.getDisplayName = function() {
//   return this.name || this.fullName || this.email;
// };

// // Method to check if user has complete profile
// userSchema.methods.isProfileComplete = function() {
//   return !!(
//     this.name && 
//     this.email && 
//     this.phone && 
//     this.isEmailVerified
//   );
// };

// // Method to get user's initials
// userSchema.methods.getInitials = function() {
//   const name = this.name || this.email;
//   return name
//     .split(' ')
//     .map((word: string) => word.charAt(0))
//     .join('')
//     .toUpperCase()
//     .slice(0, 2);
// };

// // Static method to find user by email or phone
// userSchema.statics.findByEmailOrPhone = function(identifier: string) {
//   const isEmail = identifier.includes('@');
//   const query = isEmail ? { email: identifier.toLowerCase() } : { phone: identifier };
//   return this.findOne(query);
// };

// // Prevent re-compilation error
// export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);












// lib/db/models/User.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date;
  resetPasswordToken?: string;
  resetPasswordExpiry?: Date;
  role: 'customer' | 'admin';
  profileImage?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
  };
  preferences?: {
    currency?: string;
    language?: string;
    notifications?: {
      email?: boolean;
      sms?: boolean;
      whatsapp?: boolean;
    };
  };
  socialProfiles?: {
    google?: string;
    facebook?: string;
  };
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minLength: [2, 'Name must be at least 2 characters'],
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [6, 'Password must be at least 6 characters']
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpiry: Date,
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
  profileImage: {
    type: String,
    default: null
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: {
      type: String,
      match: [/^\d{6}$/, 'Please enter a valid 6-digit pincode']
    },
    country: {
      type: String,
      default: 'India'
    }
  },
  preferences: {
    currency: {
      type: String,
      default: 'INR'
    },
    language: {
      type: String,
      default: 'en'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: false
      },
      whatsapp: {
        type: Boolean,
        default: false
      }
    }
  },
  socialProfiles: {
    google: String,
    facebook: String
  },
  lastLoginAt: Date
}, {
  timestamps: true
});

// Indexes for better query performance
userSchema.index({ phone: 1 });
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

// Method to get user's display name
userSchema.methods.getDisplayName = function() {
  return this.name || this.email;
};

// Method to check if user has complete profile
userSchema.methods.isProfileComplete = function() {
  return !!(
    this.name && 
    this.email && 
    this.phone && 
    this.isEmailVerified
  );
};

// Method to get user's initials
userSchema.methods.getInitials = function() {
  const name = this.name || this.email;
  return name
    .split(' ')
    .map((word: string) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Static method to find user by email or phone
userSchema.statics.findByEmailOrPhone = function(identifier: string) {
  const isEmail = identifier.includes('@');
  const query = isEmail ? { email: identifier.toLowerCase() } : { phone: identifier };
  return this.findOne(query);
};

// Prevent re-compilation error
export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);