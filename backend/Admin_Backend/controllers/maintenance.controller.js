import Maintenance from '../models/maintenance.model.js';

// Get current system status
export const getSystemStatus = async (req, res) => {
  try {
    // First, check and activate any scheduled maintenance that should be active now
    const now = new Date();
    const scheduledMaintenances = await Maintenance.find({ 
      isActive: false, 
      type: 'scheduled',
      startTime: { $lte: now } // Start time has passed
    });
    
    for (const scheduled of scheduledMaintenances) {
      if (scheduled.startTime && scheduled.durationMinutes > 0) {
        const startTime = new Date(scheduled.startTime);
        const endTime = new Date(startTime.getTime() + scheduled.durationMinutes * 60000);
        
        // If we're within the scheduled window, activate it
        if (now >= startTime && now <= endTime) {
          // Deactivate any other active maintenance first
          await Maintenance.updateMany(
            { isActive: true },
            { isActive: false }
          );
          // Activate this scheduled maintenance
          await Maintenance.updateOne(
            { _id: scheduled._id },
            { isActive: true }
          );
        } else if (now > endTime) {
          // Scheduled maintenance has passed, mark it as inactive (already is)
          // This is just for cleanup
        }
      }
    }
    
    // Now get the active maintenance
    const active = await Maintenance.findOne({ isActive: true }).sort({ createdAt: -1 });
    
    // Check if active maintenance has expired based on duration
    if (active && active.durationMinutes > 0 && active.startTime) {
      const startTime = new Date(active.startTime);
      const endTime = new Date(startTime.getTime() + active.durationMinutes * 60000);
      
      // If duration has expired, automatically deactivate
      if (now > endTime) {
        await Maintenance.updateOne(
          { _id: active._id },
          { isActive: false }
        );
        return res.json({ success: true, maintenance: null });
      }
    }
    
    res.json({ success: true, maintenance: active || null });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Enable/disable maintenance manually
export const toggleMaintenance = async (req, res) => {
  try {
    const { isActive, message, type, durationMinutes } = req.body;

    // Always deactivate all existing active maintenance records first
    // This ensures only one active maintenance at a time
    await Maintenance.updateMany(
      { isActive: true },
      { isActive: false }
    );

    // If turning OFF, just return null (we already deactivated everything above)
    if (!isActive) {
      return res.json({ success: true, maintenance: null });
    }

    // Ensure durationMinutes is a number (0 means indefinite)
    const duration = Number(durationMinutes) || 0;

    // If turning ON, create a new active maintenance record
    const maintenance = await Maintenance.create({
      isActive: true,
      message,
      type: type || 'emergency',
      startTime: new Date(),
      durationMinutes: duration
    });

    res.json({ success: true, maintenance });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Schedule future maintenance
export const scheduleMaintenance = async (req, res) => {
  try {
    const { date, time, durationMinutes, message } = req.body;

    // Parse the date and time
    const startTime = new Date(`${date}T${time}:00`);
    const now = new Date();
    
    // Validate that the scheduled time is in the future
    if (startTime <= now) {
      return res.status(400).json({ 
        success: false, 
        message: 'Scheduled maintenance time must be in the future.' 
      });
    }
    
    // Ensure durationMinutes is a number
    const duration = Number(durationMinutes) || 0;
    
    const maintenance = await Maintenance.create({
      isActive: false,
      message,
      startTime,
      durationMinutes: duration,
      type: 'scheduled'
    });

    res.json({ success: true, maintenance });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get maintenance history
export const getMaintenanceHistory = async (req, res) => {
  try {
    const history = await Maintenance.find().sort({ createdAt: -1 });
    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
