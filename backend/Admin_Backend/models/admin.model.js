import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    aadhaarNumber: { type: String, required: true },  // ✅ new field
    address: { type: String, required: true },        // ✅ new field
    aadhaarImage: { type: String },
    role : {type: String, enum: ['admin', 'superadmin'], default: 'admin'}, // role of the admin
    personalImage: { type: String },
    status: { type: String, enum: ['pending', 'success', 'deny'], default: 'pending' }, // approval status
    paymentStatus: { type: String, enum: ['pending', 'done'], default: 'done' }, // payment status
    razorpay_order_id: { type: String }, // optional: store order_id for reference
    razorpay_payment_id: { type: String }, // optional: store payment_id
    isOnline: { type: Boolean, default: false }, // online status
    lastActive: { type: Date } // last active timestamp
  },
  { timestamps: true }
);


// Hash password before save if modified
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare password
AdminSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
