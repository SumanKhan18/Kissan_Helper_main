import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import adminAuthRoutes from './routes/adminAuth.routes.js';
import adminUserRoutes from './routes/user.routes.js'; // the user routes
import paymentRoutes from './routes/payment.routes.js';
import broadcastRoutes from './routes/broadcast.routes.js';
import planRoutes from './routes/plan.routes.js';
import policyRoutes from './routes/policy.routes.js';
import maintenanceRoutes from './routes/maintenance.routes.js';
import { checkMaintenance } from './middleware/maintenanceCheck.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import otpRoutes from './routes/otp.routes.js';
import settingsRoutes from './routes/settings.routes.js';


import './seed/seedDummyUsers.js'; // runs automatically but won't exit server


dotenv.config();
const app = express();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DB
await connectDB();

// CORS Configuration - MUST be before routes
// Simplified CORS for development - allow all localhost origins
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Always set CORS headers for localhost origins
  if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
    
    // Handle preflight OPTIONS requests
    if (req.method === 'OPTIONS') {
      console.log('✅ CORS preflight request handled for:', origin);
      return res.status(204).end();
    }
  }
  
  next();
});

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Logging middleware
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// Routes
app.get('/', (_req, res) => res.json({ status: 'OK', service: 'Admin Auth API' }));

// Admin routes
app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin/otp', otpRoutes); // OTP routes
app.use('/api/admin/broadcasts', broadcastRoutes); // Broadcast routes
app.use('/api/admin', planRoutes); // Plan routes
app.use('/api/admin', adminUserRoutes); // User routes
app.use('/api/admin/dashboard', dashboardRoutes); // Dashboard routes
app.use('/api/admin/maintenance', maintenanceRoutes); // Maintenance routes
app.use('/api/admin/settings', settingsRoutes); // Add settings routes

// Payment routes
app.use('/api/payment', paymentRoutes);

// Policy routes
app.use('/api/policies', policyRoutes);

// Apply middleware globally to block users during maintenance
app.use('/api/user', checkMaintenance); // Only user routes blocked


// 404
app.use((req, res) => res.status(404).json({ message: `Route ${req.originalUrl} not found` }));

// Global error handler (basic)
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Add CORS headers to error responses
  const origin = req.headers.origin;
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  
  const status = err.status || 500;
  res.status(status).json({ 
    success: false,
    message: err.message || 'Server error' 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
