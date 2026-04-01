import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['user_registered', 'login'], required: true },
  meta: { type: Object, default: {} },
}, { timestamps: true });

export default mongoose.model('Activity', ActivitySchema);
