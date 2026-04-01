import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';
import Blacklist from '../models/blacklist.model.js';  // keep the name consistent

// Protect middleware: checks JWT and admin status
export const protect = async (req, res, next) => {
  // Skip authentication for OPTIONS requests (CORS preflight)
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Check blacklist
    const blacklisted = await Blacklist.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ message: 'Session expired. Please login again' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find admin in DB
    const admin = await Admin.findById(decoded.id).select('-password'); // exclude password

    if (!admin) {
      return res.status(401).json({ message: 'Account not found' });
    }

    // Only allow access if status is 'success'
    if (admin.status !== 'success') {
      return res.status(403).json({ message: `Your account is ${admin.status}. Contact administrator.` });
    }

    // Update online status and last active on each authenticated request
    // This ensures logged-in admins are always shown as online
    // Use updateOne with { new: true } to ensure the update is applied immediately
    const updateResult = await Admin.updateOne(
      { _id: decoded.id },
      { 
        $set: {
          isOnline: true,
          lastActive: new Date()
        }
      }
    );

    // Verify update was successful
    if (updateResult.modifiedCount === 0 && updateResult.matchedCount > 0) {
      // Update didn't change anything (already set), which is fine
      // But ensure the admin object reflects current state
      admin.isOnline = true;
      admin.lastActive = new Date();
    } else {
      // Update was successful, sync the admin object
      admin.isOnline = true;
      admin.lastActive = new Date();
    }

    req.admin = admin; // attach admin to request
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Authorize middleware: checks role
export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.admin?.role)) {
    return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
  }
  next();
};
