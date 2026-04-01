// routes/authRoutes.js
import express from "express";
import {
  signup,
  login,
  deleteAccount,
  uploadProfilePhoto,
  deleteProfilePhoto,
  googleLogin,
  getProfile,
  updateProfile,
  getDashboardStats
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { changePassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/googleLogin", googleLogin);
router.post("/login", login);

router.get("/getProfile", authMiddleware, getProfile);

router.put("/change-password", authMiddleware, changePassword);
router.delete("/delete-account", authMiddleware, deleteAccount);

router.post(
  "/upload-photo",
  authMiddleware,
  upload.single("photo"),
  uploadProfilePhoto
);
router.delete("/delete-photo", authMiddleware, deleteProfilePhoto);
router.put("/update-profile", authMiddleware, updateProfile);
router.get("/dashboard", authMiddleware, getDashboardStats);

export default router;
