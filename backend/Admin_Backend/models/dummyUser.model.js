import mongoose from 'mongoose';

const DummyUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, enum: ['online', 'offline'], default: 'offline' },
  location: { type: String },
  subscription: { type: String, enum: ['Free', 'Premium'], default: 'Free' },
  lastActive: { type: Date, default: null } // to track last activity
}, { timestamps: true });

const DummyUser = mongoose.model('DummyUser', DummyUserSchema);
export default DummyUser;
