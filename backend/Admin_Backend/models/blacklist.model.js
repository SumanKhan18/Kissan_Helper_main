import mongoose from 'mongoose';

const BlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true }, // when token should naturally expire
}, { timestamps: true });

export default mongoose.model('Blacklist', BlacklistSchema);
