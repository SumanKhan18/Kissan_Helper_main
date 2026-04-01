import Maintenance from '../models/maintenance.model.js';

export const checkMaintenance = async (req, res, next) => {
  const now = new Date();
  
  // First, check and activate any scheduled maintenance that should be active now
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
      }
    }
  }
  
  // Now check for active maintenance
  const maintenance = await Maintenance.findOne({ isActive: true });
  
  if (maintenance) {
    // Check if maintenance has expired based on duration
    // If durationMinutes is 0, it means indefinite (no auto-off)
    if (maintenance.durationMinutes > 0 && maintenance.startTime) {
      const startTime = new Date(maintenance.startTime);
      const endTime = new Date(startTime.getTime() + Number(maintenance.durationMinutes) * 60000);
      
      // If duration has expired, automatically deactivate
      if (now > endTime) {
        await Maintenance.updateOne(
          { _id: maintenance._id },
          { isActive: false }
        );
        // Allow request to proceed since maintenance is now off
        return next();
      }
    }
    
    return res.status(503).json({ success: false, message: maintenance.message });
  }

  // Check for any scheduled maintenance that might be active (fallback check)
  const scheduled = await Maintenance.find({ isActive: false, type: 'scheduled' });
  for (const m of scheduled) {
    if (m.startTime && m.durationMinutes > 0) {
      const start = new Date(m.startTime);
      const end = new Date(start.getTime() + Number(m.durationMinutes) * 60000);
      if (now >= start && now <= end) {
        return res.status(503).json({ success: false, message: m.message });
      }
    }
  }

  next();
};
