import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  // General Settings (fixed values)
  siteName: { 
    type: String, 
    default: 'Kissan Helper Admin',
    immutable: true 
  },
  contactEmail: { 
    type: String, 
    default: 'sumankhan2909@gmail.com',
    immutable: true 
  },
  phoneNumber: { 
    type: String, 
    default: '+91 8942938405',
    immutable: true 
  },
  language: { 
    type: String, 
    enum: ['en', 'bn', 'hi', 'ta', 'te', 'mr', 'gu', 'kn', 'or', 'pa'],
    default: 'en' 
  },
  timezone: { 
    type: String, 
    default: 'Asia/Kolkata',
    immutable: true 
  },
  
  // Notification Settings
  emailNotifications: { 
    type: Boolean, 
    default: true,
    immutable: true 
  },
  smsNotifications: { 
    type: Boolean, 
    default: true,
    immutable: true 
  },
  newUserAlertSound: { 
    type: Boolean, 
    default: true 
  },
  paymentAlertSound: { 
    type: Boolean, 
    default: true 
  },
  systemAlertSound: { 
    type: Boolean, 
    default: true 
  },
  
  // Appearance Settings
  theme: { 
    type: String, 
    enum: ['light', 'dark', 'system'],
    default: 'dark' 
  }
}, { 
  timestamps: true,
  // Ensure only one settings document exists
  collection: 'settings'
});

// Ensure only one settings document
SettingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const Settings = mongoose.model('Settings', SettingsSchema);
export default Settings;
