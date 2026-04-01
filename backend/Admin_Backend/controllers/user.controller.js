// controllers/user.controller.js
import DummyUser from '../models/dummyUser.model.js';

/**
 * Admin: Get all registered users
 * Only accessible by admins (protect + authorize middleware)
 */
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users with selected fields
    const users = await DummyUser.find({}, 
      'name email phone status location subscription createdAt lastActive'
    ).sort({ createdAt: -1 }); // latest registered first

    res.json({
      success: true,
      totalUsers: users.length,
      users
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Optional: Get only online users
 */
export const getOnlineUsers = async (req, res) => {
  try {
    const users = await DummyUser.find({ status: 'online' }, 
      'name email phone status location subscription createdAt lastActive'
    ).sort({ lastActive: -1 });

    res.json({
      success: true,
      totalOnline: users.length,
      users
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Optional: Get a single user by ID
 */
export const getUserById = async (req, res) => {
  try {
    const user = await DummyUser.findById(req.params.id, 
      'name email phone status location subscription createdAt lastActive'
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Get all offline users
export const getOfflineUsers = async (req, res) => {
  try {
    const users = await DummyUser.find({ status: 'offline' }, 
      'name email phone status location subscription createdAt lastActive'
    ).sort({ lastActive: -1 }); // most recently offline first

    res.json({
      success: true,
      totalOffline: users.length,
      users
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Delete a user by ID (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await DummyUser.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};