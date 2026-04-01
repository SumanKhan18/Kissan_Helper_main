import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";
import fs from "fs";
import Note from "../models/Note.js";
import Transaction from "../models/Transaction.js";
import Plan from "../models/Plan.js";
import path from "path";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// =========================
// SIGNUP
// =========================
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// =========================
// LOGIN
// =========================
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {});

    res.json({ message: "Login successful", token });
    // console.log(token);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// =========================
// GOOGLE LOGIN
// =========================
export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body; // Changed from tokenId → credential

    if (!credential) {
      return res.status(400).json({ message: "Google credential is required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, password: "", googleId: sub });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.json({ message: "Google login successful", token });
  } catch (err) {
    console.error("Google Login Error:", err);
    res
      .status(500)
      .json({ message: "Google login failed", error: err.message });
  }
};

// =========================
// GET PROFILE
// =========================
// Example with Express
export const getProfile = async (req, res) => {
  try {
    // req.user is already populated by authMiddleware
    console.log("user is " + req.user);
    res.json(req.user);
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// =========================
// CHANGE PASSWORD
// =========================
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.password) {
      return res
        .status(400)
        .json({ message: "Google login users cannot change password" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to change password", error: err.message });
  }
};

// =========================
// DELETE ACCOUNT
// =========================
export const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete account", error: err.message });
  }
};

// =========================
// UPLOAD PROFILE PHOTO
// =========================
export const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (
      user.profilePhoto &&
      fs.existsSync(path.join("uploads", user.profilePhoto))
    ) {
      fs.unlinkSync(path.join("uploads", user.profilePhoto));
    }

    user.profilePhoto = req.file.filename;
    await user.save();

    res.json({ message: "Profile photo uploaded", file: req.file.filename });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// =========================
// DELETE PROFILE PHOTO
// =========================
export const deleteProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (
      user.profilePhoto &&
      fs.existsSync(path.join("uploads", user.profilePhoto))
    ) {
      fs.unlinkSync(path.join("uploads", user.profilePhoto));
      user.profilePhoto = "";
      await user.save();
    }

    res.json({ message: "Profile photo deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

//update profile
export const updateProfile = async (req, res) => {
  try {
    const { phone, location } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { phone, location },
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// =========================
// DASHBOARD STATS
// =========================
export const getDashboardStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Total Transactions
    const transactions = await Transaction.find({
      user: req.user._id,
      status: "paid",
    });
    const totalTransactions = transactions.length;

    // Monthly Spending
    const now = new Date();
    const last30Days = new Date(now);
    last30Days.setDate(now.getDate() - 30);

    const monthlySpending =
      transactions
        .filter((t) => t.amount && new Date(t.createdAt) >= last30Days)
        .reduce((sum, t) => sum + t.amount, 0) / 100;
    // console.log("Filtered transactions:", user.transactions.filter(t => t.amount && new Date(t.date) >= last30Days && t.status === "success"));

    // Active Notes
    const recentNotes = await Note.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(5);
    // console.log(recentNotes);
    const activeNotes = await Note.countDocuments({ user: user._id });
    // console.log(activeNotes);
    // Recent Activity
    const recentActivity = [...transactions, ...recentNotes]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    const currentPlan = await Plan.findOne({ name: user.currentPlan });
    //  console.log(currentPlan);
    res.json({
      name: user.name,
      totalTransactions,
      monthlySpending,
      activeNotes,
      sharedFiles: 0, // Placeholder if you implement shared files later
      currentPlan: user.currentPlan,
      recentActivity,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};
