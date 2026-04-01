import mongoose from 'mongoose';

const BroadcastSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  targetAudience: { type: String, enum: ['all', 'premium','inactive'], default: 'all' },
  priority: { type: String, enum: ['normal', 'high', 'urgent'], default: 'normal' },
  deliveredTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DummyUser' }],
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DummyUser' }],
  intendedRecipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DummyUser' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true } // <-- new field
}, { timestamps: true });


const Broadcast = mongoose.model('Broadcast', BroadcastSchema);
export default Broadcast;
