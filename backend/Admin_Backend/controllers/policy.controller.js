import Policy from '../models/policy.model.js';

// Add new policy
export const addPolicy = async (req, res) => {
  try {
    const policy = await Policy.create(req.body);
    res.status(201).json({ success: true, message: 'Policy added', policy });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all policies
export const getPolicies = async (req, res) => {
  try {
    const { category, status, search } = req.query;
    const query = {};

    if (category && category !== 'all') query.category = category.toLowerCase();
    if (status && status !== 'all') query.status = status.toLowerCase();
    if (search) query.title = { $regex: search, $options: 'i' };

    const policies = await Policy.find(query).sort({ deadline: 1 });
    res.json({ success: true, policies });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single policy
export const getPolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) return res.status(404).json({ success: false, message: 'Policy not found' });
    res.json({ success: true, policy });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Edit policy
export const updatePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!policy) return res.status(404).json({ success: false, message: 'Policy not found' });
    res.json({ success: true, message: 'Policy updated', policy });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete policy
export const deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndDelete(req.params.id);
    if (!policy) return res.status(404).json({ success: false, message: 'Policy not found' });
    res.json({ success: true, message: 'Policy deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
