import { Types, Document } from 'mongoose';



export interface IUser extends Document {
  _id?: Types.ObjectId;
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  phone?: string;
  type?: 'HOUSE_HOLD' | 'BUSINESS_OWNER';
  customerPaystackId?: string;
  isVerified?: boolean;
  emailVerifiedAt?: number;
  photo?: string;
  address?: string;
  lga?: string;
  country?: string;
  state?: string;
  pushToken?: string;
  verificationToken?: string;
  tokenExpires?: Date;
  idToken?: string;
  accessToken?: string;
  refreshToken?: string;
  social?:{}
  settings?:{}
  currentPassword?: string;
  admin:boolean;
  subscription_id?: string;
  code?: string;
  paymentMethodId?: string;
  inventory:{};

}
