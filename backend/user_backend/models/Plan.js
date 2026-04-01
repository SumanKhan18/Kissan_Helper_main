import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  priceINR: { type: Number, required: true }, // in rupees
  currency: { type: String, default: 'INR' },
  billingCycleDays: { type: Number, default: 30 }, // plan duration
  features: [String],
  active: { type: Boolean, default: true }
});

export default mongoose.model('Plan', planSchema);
