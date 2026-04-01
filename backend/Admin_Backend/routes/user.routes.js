import express from 'express';
import { getAllUsers, getOnlineUsers, getUserById , getOfflineUsers, deleteUser} from '../controllers/user.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Only admin can access these routes
router.get('/users', protect, authorize('admin'), getAllUsers);
router.get('/users/online', protect, authorize('admin'), getOnlineUsers);
router.get('/users/offline', protect, authorize('admin'), getOfflineUsers);
router.delete('/users/:id', protect, authorize('admin'), deleteUser);
router.get('/users/:id', protect, authorize('admin'), getUserById);


export default router;
