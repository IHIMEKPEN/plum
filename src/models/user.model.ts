import { model, Schema } from 'mongoose';
import validator from 'validator';
import { IUser } from '../interfaces';
import { hashData } from '../utils';


const schema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'email field is required'],
    validate: [validator.isEmail, 'please provide a valid email address'],
    // unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    // required: [true, 'password field is required'],
    minLength: [4, 'password field should be at least 4 characters'],
    maxLength: [255, 'password field should be at most 255 characters'],
    select: false,
  },
 
  firstname: {
    type: String,
    // required: [true, 'firstname field is required'],
    minlength: [2, 'firstname field should be at least 2 characters'],
    maxlength: [255, 'firstname field should be at most 255 characters'],
    trim: true,
    lowercase: true,
  },
  lastname: {
    type: String,
    // required: [true, 'lastname field is required'],
    minlength: [2, 'lastname field should be at least 2 characters'],
    maxlength: [255, 'lastname field should be at most 255 characters'],
    trim: true,
    lowercase: true,
  },
  phone: String,
  photo: String,
  
  emailVerifiedAt: Date,
  isVerified: {
    type: Boolean,
    default: false,
  },
  pushToken: String,
  verificationToken: {
    type: String,
    select: false,
  },
  tokenExpires: {
    type: Date,
    select: false,
  },
  address: String,
  country: String,
  state: String,
  
  social: {
    googleProvider: {
      id: String,
      accessToken: String,
      refreshToken: String,
    },
    appleProvider: {
      id: String,
      accessToken: String,
      refreshToken: String,
    },
  },
  settings: {
    pushNotification: { type: Boolean, default: true },
    emailNotification: { type: Boolean, default: true },
    phoneNotification: { type: Boolean, default: true },
  },
  // billings: {
  //   banks: [BankSchema],
  //   cards:[CardSchema]
  // },
  admin:{
    type:Boolean,
    default:false
  },
  

});



/** Query Middlewares */
schema.pre('save', async function (next) {
  if (!this.isNew || !this.isModified('password')) return next();
  this.password = await hashData(this.password);

  next();
});



/** Added properties */

schema.set('toJSON', { virtuals: true });
schema.set('toObject', { virtuals: true });
schema.set('timestamps', { createdAt: true, updatedAt: true });
schema.set('id', false);

export const UserModel = model<IUser>('User', schema);
