import Admin from '../models/admin.model.js';
import generateToken from '../utils/generateToken.js';
import Blacklist from '../models/blacklist.model.js';
import jwt from 'jsonwebtoken';

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!req.files || !req.files.aadhaarImage || !req.files.personalImage) {
      return res.status(400).json({ message: 'Aadhaar image and personal image are required' });
    }

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const aadhaarImagePath = req.files.aadhaarImage[0].path;
    const personalImagePath = req.files.personalImage[0].path;

    const admin = await Admin.create({
    name,
    email,
    phone,
    role,
    password,
    aadhaarNumber,         // ✅ new field
    address,               // ✅ new field
    aadhaarImage: aadhaarImagePath,
    personalImage: personalImagePath,
    status: 'pending',      // default pending
    paymentStatus: 'done'   // if payment completed
    });


    const token = generateToken(admin._id);
    // console.log(token); // debug
    res.status(201).json({
    message: 'Admin registered successfully',
    token,
    admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        aadhaarNumber: admin.aadhaarNumber,    // ✅ new field
        address: admin.address,                // ✅ new field
        aadhaarImage: admin.aadhaarImage,
        personalImage: admin.personalImage
    }
    });

  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Only allow login if status is success
    if (admin.status !== 'success') {
      return res.status(403).json({ message: `Your account is ${admin.status}. Contact administrator.` });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(admin._id);

    // Update online status and last active
    admin.isOnline = true;
    admin.lastActive = new Date();
    await admin.save();

    res.json({
    success: true,
    message: 'Login successful',
    token,
    admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        status: admin.status,
        aadhaarNumber: admin.aadhaarNumber,  // ✅ new field
        address: admin.address               // ✅ new field
    }
    });

  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};


export const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');


    if (!admin) {
      return res.status(404).json({ message: 'Account not found' });
    }

    if (admin.status !== 'success') {
      return res.status(403).json({ message: `Your account is ${admin.status}. Contact administrator.` });
    }

    res.json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

export const updateAdminStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, password } = req.body;

    if (!['pending', 'success', 'deny'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const admin = await Admin.findById(id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    admin.status = status;

    // If a password is provided (typically at approval time), set it now.
    if (password && status === 'success') {
      admin.password = password; // will hash in pre-save
    }

    await admin.save();
    const safeAdmin = admin.toObject();
    delete safeAdmin.password;

    res.json({ message: `Status updated to ${status}`, admin: safeAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    if (admin.status !== 'success') {
      return res.status(403).json({ 
        success: false, 
        message: `Your account is ${admin.status}. Contact administrator.` 
      });
    }

    const { name, email, phone, address, currentPassword, newPassword } = req.body;

    // Update basic fields
    if (name) admin.name = name;
    if (phone) admin.phone = phone;
    if (address) admin.address = address;

    // Handle email change (check for duplicates)
    if (email && email !== admin.email) {
      const emailExists = await Admin.findOne({ email });
      if (emailExists) {
        return res.status(409).json({ 
          success: false, 
          message: 'Email already in use' 
        });
      }
      admin.email = email;
    }

    // Handle password change
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ 
          success: false, 
          message: 'Current password is required to change password' 
        });
      }
      
      const isMatch = await admin.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ 
          success: false, 
          message: 'Current password is incorrect' 
        });
      }
      
      admin.password = newPassword; // Will be hashed by pre-save hook
    }

    // Handle image uploads if provided
    if (req.files) {
      if (req.files.personalImage) {
        admin.personalImage = req.files.personalImage[0].path;
      }
      if (req.files.aadhaarImage) {
        admin.aadhaarImage = req.files.aadhaarImage[0].path;
      }
    }

    await admin.save();

    // Return updated admin without password
    const updatedAdmin = admin.toObject();
    delete updatedAdmin.password;

    res.json({ 
      success: true, 
      message: 'Profile updated successfully', 
      admin: updatedAdmin 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message || 'Server error' 
    });
  }
};

// Get current admin with online status
export const getCurrentAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id || req.admin._id).select('-password');
    
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    // Current admin is always online since they're making this request
    // The protect middleware already set isOnline = true and updated lastActive

    res.json({
      success: true,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        status: admin.status,
        aadhaarNumber: admin.aadhaarNumber, // Include for current admin only
        address: admin.address,
        personalImage: admin.personalImage,
        isOnline: true, // Current admin making request is always online
        lastActive: admin.lastActive,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
};

// Get all admins with online status
export const getAllAdmins = async (req, res) => {
  try {
    // Query fresh data from database (no caching)
    const admins = await Admin.find({ status: 'success' })
      .select('-password -aadhaarNumber') // Exclude password and aadhaarNumber for privacy
      .lean() // Use lean() for better performance and to get fresh data
      .sort({ createdAt: -1 });

    const adminsList = admins.map(admin => {
      // Admin is online if isOnline flag is explicitly true
      // The protect middleware sets isOnline = true on each authenticated request
      // When admin logs out, isOnline is set to false
      // Explicitly convert to boolean to ensure consistent type
      const isActuallyOnline = admin.isOnline === true || admin.isOnline === 'true';
      
      return {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        status: admin.status,
        // Do not include aadhaarNumber for other admins (privacy)
        address: admin.address,
        personalImage: admin.personalImage,
        isOnline: Boolean(isActuallyOnline), // Explicitly convert to boolean
        lastActive: admin.lastActive,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt
      };
    });

    res.json({
      success: true,
      admins: adminsList
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
};

// controllers/auth.controller.js
export const adminLogout  = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(400).json({ message: 'No token provided' });

    const decoded = jwt.decode(token);
    if (!decoded) return res.status(400).json({ message: 'Invalid token' });

    // Update admin online status to false
    if (decoded.id) {
      await Admin.findByIdAndUpdate(decoded.id, { 
        isOnline: false,
        lastActive: new Date()
      });
    }

    await Blacklist.create({
      token,
      expiresAt: new Date(decoded.exp * 1000) // match token expiry
    });

    res.json({ success: true, message: 'Admin logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};