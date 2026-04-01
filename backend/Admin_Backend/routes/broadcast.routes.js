import express from 'express';
import { createBroadcast, getBroadcasts, getTotalRecipients ,getRecentBroadcasts , getFailedDeliveries} from '../controllers/broadcast.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';


const router = express.Router();

// Admin sends broadcast
router.post('/', protect, authorize('admin', 'superadmin'), createBroadcast);

// Users fetch broadcasts
router.get('/', protect, getBroadcasts);

router.get('/total-recipients', protect, authorize('admin', 'superadmin'), getTotalRecipients);
router.get('/recent', protect, authorize('admin', 'superadmin'), getRecentBroadcasts);

// Get failed deliveries for a broadcast
router.get('/:id/failed', protect, authorize('admin', 'superadmin'), getFailedDeliveries);


export default router;
