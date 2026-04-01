import mongoose from 'mongoose';

const MaintenanceSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: false },
  message: { type: String, default: 'System under maintenance. Please try later.' },
  startTime: { type: Date, default: null },
  durationMinutes: { type: Number, default: 0 }, // 0 = indefinite until manually off
  type: { type: String, enum: ['scheduled', 'emergency'], default: 'emergency' }
}, { timestamps: true });

const Maintenance = mongoose.model('Maintenance', MaintenanceSchema);
export default Maintenance;
