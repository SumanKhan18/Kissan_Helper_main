import Broadcast from '../models/broadcast.model.js';
import DummyUser from '../models/dummyUser.model.js';

// Admin creates broadcast
export const createBroadcast = async (req, res) => {
  try {
    const { title, content, targetAudience, priority } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title and content are required' 
      });
    }

    const broadcast = await Broadcast.create({
      title: title.trim(),
      content: content.trim(),
      targetAudience: targetAudience || 'all',
      priority: priority || 'normal',
      createdBy: req.admin._id
    });

    // Get users based on target audience
    let users = [];
    if (targetAudience === 'all') {
      users = await DummyUser.find({}, '_id name email'); // all users
    } else if (targetAudience === 'premium') {
      // Filter premium users (you may need to adjust this based on your user model)
      users = await DummyUser.find({}, '_id name email'); // Placeholder - adjust based on your model
    } else if (targetAudience === 'inactive') {
      // Filter inactive users (you may need to adjust this based on your user model)
      users = await DummyUser.find({}, '_id name email'); // Placeholder - adjust based on your model
    }

    broadcast.intendedRecipients = users.map(u => u._id);
    broadcast.deliveredTo = users.map(u => u._id); // assume delivered for now
    await broadcast.save();

    // Populate the broadcast with creator info
    await broadcast.populate('createdBy', 'name email');

    res.status(201).json({ 
      success: true, 
      message: 'Broadcast sent successfully', 
      broadcast: {
        ...broadcast.toObject(),
        deliveredCount: broadcast.deliveredTo.length,
        readCount: broadcast.readBy?.length || 0
      }
    });
  } catch (err) {
    console.error('Create broadcast error:', err);
    res.status(500).json({ 
      success: false, 
      message: err.message || 'Failed to create broadcast' 
    });
  }
};


export const getFailedDeliveries = async (req, res) => {
  try {
    const broadcastId = req.params.id;

    const broadcast = await Broadcast.findById(broadcastId).populate('intendedRecipients', 'name email');
    if (!broadcast) {
      return res.status(404).json({ success: false, message: 'Broadcast not found' });
    }

    // Users who were intended recipients but did not receive
    const failedRecipients = broadcast.intendedRecipients.filter(
      user => !broadcast.deliveredTo.includes(user._id)
    );

    res.json({
      success: true,
      totalFailed: failedRecipients.length,
      failedUsers: failedRecipients
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Fetch broadcasts for users
export const getBroadcasts = async (req, res) => {
  try {
    const broadcasts = await Broadcast.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email')
      .lean();

    const broadcastsWithCounts = broadcasts.map(b => ({
      ...b,
      deliveredCount: b.deliveredTo?.length || 0,
      readCount: b.readBy?.length || 0,
      intendedCount: b.intendedRecipients?.length || 0
    }));

    res.json({ success: true, broadcasts: broadcastsWithCounts });
  } catch (err) {
    console.error('Get broadcasts error:', err);
    res.status(500).json({ 
      success: false, 
      message: err.message || 'Failed to fetch broadcasts' 
    });
  }
};

// Get stats + recent broadcasts
// GET /api/broadcasts/total-recipients
export const getTotalRecipients = async (req, res) => {
  try {
    const totalRecipientsAgg = await Broadcast.aggregate([
      { $match: { createdBy: req.admin._id } },           // only broadcasts by this admin
      { $project: { count: { $size: { $ifNull: ["$deliveredTo", []] } } } },
      { $group: { _id: null, total: { $sum: "$count" } } }
    ]);

    const totalRecipients = totalRecipientsAgg[0]?.total || 0;

    res.json({ success: true, totalRecipients });
  } catch (err) {
    console.error('Get total recipients error:', err);
    res.status(500).json({ 
      success: false, 
      error: err.message || 'Failed to fetch total recipients' 
    });
  }
};


// GET /api/broadcasts/recent
export const getRecentBroadcasts = async (req, res) => {
  try {
    const recent = await Broadcast.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('createdBy', 'name email')
      .lean();

    const recentBroadcasts = recent.map(b => ({
      ...b,
      deliveredCount: b.deliveredTo?.length || 0,
      readCount: b.readBy?.length || 0,
      intendedCount: b.intendedRecipients?.length || 0
    }));

    res.json({ success: true, recentBroadcasts });
  } catch (err) {
    console.error('Get recent broadcasts error:', err);
    res.status(500).json({ 
      success: false, 
      error: err.message || 'Failed to fetch recent broadcasts' 
    });
  }
};
