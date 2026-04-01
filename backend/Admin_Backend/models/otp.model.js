import mongoose from 'mongoose';

const OTPSchema = new mongoose.Schema(
  {
    email: { type: String, required: false, index: true },
    phone: { type: String, required: false, index: true },
    otp: { type: String, required: true },
    type: { type: String, enum: ['email', 'sms'], required: true },
    verified: { type: Boolean, default: false },
    expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } }
  },
  { timestamps: true }
);

// Compound index for faster lookups
OTPSchema.index({ email: 1, type: 1, verified: 1 });
OTPSchema.index({ phone: 1, type: 1, verified: 1 });

const OTP = mongoose.model('OTP', OTPSchema);
export default OTP;

