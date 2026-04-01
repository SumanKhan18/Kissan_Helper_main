import mongoose from 'mongoose';

const PolicySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['subsidy','loan','insurance','support'], required: true },
  status: { type: String, enum: ['active','inactive'], default: 'active' },
  eligibility: { type: String },
  benefits: { type: String },
  deadline: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model('Policy', PolicySchema);
