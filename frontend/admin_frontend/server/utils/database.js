// Simple file-based database simulation
// In production, replace this with a real database like MongoDB or PostgreSQL

const fs = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DB_DIR, 'users.json');
const REGISTRATIONS_FILE = path.join(DB_DIR, 'registrations.json');
const NOTIFICATIONS_FILE = path.join(DB_DIR, 'notifications.json');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize default data files
const initializeDatabase = () => {
  // Initialize users file with default admin
  if (!fs.existsSync(USERS_FILE)) {
    const defaultUsers = [
      {
        id: '1',
        username: 'admin',
        email: 'admin@kissanhelper.com',
        name: 'Admin User',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2));
  }

  // Initialize registrations file
  if (!fs.existsSync(REGISTRATIONS_FILE)) {
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify([], null, 2));
  }

  // Initialize notifications file
  if (!fs.existsSync(NOTIFICATIONS_FILE)) {
    fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify([], null, 2));
  }
};

// Database operations
const db = {
  // Users operations
  users: {
    getAll: () => {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      return JSON.parse(data);
    },
    
    getById: (id) => {
      const users = db.users.getAll();
      return users.find(user => user.id === id);
    },
    
    getByUsername: (username) => {
      const users = db.users.getAll();
      return users.find(user => user.username === username || user.email === username);
    },
    
    getByEmail: (email) => {
      const users = db.users.getAll();
      return users.find(user => user.email === email);
    },
    
    create: (userData) => {
      const users = db.users.getAll();
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString()
      };
      users.push(newUser);
      fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
      return newUser;
    },
    
    update: (id, updateData) => {
      const users = db.users.getAll();
      const index = users.findIndex(user => user.id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...updateData };
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        return users[index];
      }
      return null;
    }
  },

  // Registration requests operations
  registrations: {
    getAll: () => {
      const data = fs.readFileSync(REGISTRATIONS_FILE, 'utf8');
      return JSON.parse(data);
    },
    
    getById: (id) => {
      const registrations = db.registrations.getAll();
      return registrations.find(reg => reg.id === id);
    },
    
    create: (registrationData) => {
      const registrations = db.registrations.getAll();
      const newRegistration = {
        id: Date.now().toString(),
        ...registrationData,
        status: 'pending',
        submittedAt: new Date().toISOString()
      };
      registrations.push(newRegistration);
      fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(registrations, null, 2));
      return newRegistration;
    },
    
    update: (id, updateData) => {
      const registrations = db.registrations.getAll();
      const index = registrations.findIndex(reg => reg.id === id);
      if (index !== -1) {
        registrations[index] = { ...registrations[index], ...updateData };
        fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(registrations, null, 2));
        return registrations[index];
      }
      return null;
    }
  },

  // Notifications operations
  notifications: {
    getAll: () => {
      const data = fs.readFileSync(NOTIFICATIONS_FILE, 'utf8');
      return JSON.parse(data);
    },
    
    create: (notificationData) => {
      const notifications = db.notifications.getAll();
      const newNotification = {
        id: Date.now().toString(),
        ...notificationData,
        createdAt: new Date().toISOString(),
        read: false
      };
      notifications.unshift(newNotification); // Add to beginning
      fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(notifications, null, 2));
      return newNotification;
    },
    
    update: (id, updateData) => {
      const notifications = db.notifications.getAll();
      const index = notifications.findIndex(notif => notif.id === id);
      if (index !== -1) {
        notifications[index] = { ...notifications[index], ...updateData };
        fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(notifications, null, 2));
        return notifications[index];
      }
      return null;
    },
    
    delete: (id) => {
      const notifications = db.notifications.getAll();
      const index = notifications.findIndex(notif => notif.id === id);
      if (index !== -1) {
        const deleted = notifications.splice(index, 1)[0];
        fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(notifications, null, 2));
        return deleted;
      }
      return null;
    }
  }
};

// Initialize database on startup
initializeDatabase();

module.exports = db;