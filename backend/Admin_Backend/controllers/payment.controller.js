import Admin from '../models/admin.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Test-mode registration without actual Razorpay payment
export const registerWithPayment = async (req, res) => {
  try {
    const { name, email, phone, amount, aadhaarNumber, address, password, confirmPassword } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !aadhaarNumber || !address || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Validate phone number format (should be 10 digits)
    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ success: false, message: 'Phone number must be exactly 10 digits' });
    }

    const aadhaarImage = req.files?.aadhaarImage?.[0]?.path;
    const personalImage = req.files?.personalImage?.[0]?.path;

    if (!aadhaarImage || !personalImage) {
      return res.status(400).json({ 
        success: false, 
        message: 'Aadhaar image and personal image are required' 
      });
    }

    // Check if email already exists
    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    // Create admin in MongoDB Atlas
    const newAdmin = await Admin.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      aadhaarNumber: aadhaarNumber.replace(/\s/g, ''),
      address: address.trim(),
      aadhaarImage,
      personalImage,
      password,
      paymentStatus: 'done',
      status: 'pending',
      razorpay_order_id: 'test_order_' + Date.now(),
      razorpay_payment_id: 'test_payment_' + Date.now(),
    });

    console.log('✅ Admin registered successfully in MongoDB:', newAdmin._id);

    // Generate JWT token
    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Return admin data without password
    const adminData = newAdmin.toObject();
    delete adminData.password;

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      admin: adminData,
      token,
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({ 
        success: false, 
        message: 'Email or phone number already registered' 
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors 
      });
    }

    res.status(500).json({ 
      success: false, 
      message: error.message || 'Server error during registration' 
    });
  }
};
