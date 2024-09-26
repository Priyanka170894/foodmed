// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, unique: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    resetPasswordToken: {type:String},
    resetPasswordExpire: {type : Date},
    addresses: [
      {
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
      },
   
    ],
    
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;


