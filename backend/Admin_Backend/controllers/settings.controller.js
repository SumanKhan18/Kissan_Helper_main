import Settings from '../models/settings.model.js';

// Get settings
export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    res.json({ success: true, settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update settings (only language, theme, and alert sounds)
export const updateSettings = async (req, res) => {
  try {
    const { language, theme, newUserAlertSound, paymentAlertSound, systemAlertSound } = req.body;
    
    const settings = await Settings.getSettings();
    
    // Only allow updating these fields
    if (language) {
      settings.language = language;
    }
    if (theme) {
      settings.theme = theme;
    }
    if (typeof newUserAlertSound === 'boolean') {
      settings.newUserAlertSound = newUserAlertSound;
    }
    if (typeof paymentAlertSound === 'boolean') {
      settings.paymentAlertSound = paymentAlertSound;
    }
    if (typeof systemAlertSound === 'boolean') {
      settings.systemAlertSound = systemAlertSound;
    }
    
    await settings.save();
    
    res.json({ 
      success: true, 
      message: 'Settings updated successfully', 
      settings 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
