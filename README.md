# Kissan Helper - Smart Farming Application

Kissan Helper is a comprehensive digital platform designed to assist Indian farmers with various aspects of agriculture, from soil analysis to government policy information.

## Features

- NPK Analysis: Analyze soil nutrient content and get recommendations
- Soil & Seed Selection: Get personalized recommendations for soil management and seed choice
- Seasonal Medicines: Access information about seasonal plant protection measures
- Government Policies: Stay updated with the latest agricultural policies and schemes
- Premium Subscription: Access advanced features with different subscription plans

## Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Lucide React for icons
- Razorpay for payment processing
- Firebase for authentication and database

### Backend
- Node.js with Express
- Firebase Firestore for database
- Firebase Authentication
- JWT for authentication
- Bcrypt for password hashing
- Razorpay API integration

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Firebase account and project

### Installation

1. Clone the repository

[https://github.com/aridutta2004/KissanHelper]
cd kissan-helper


2. Install dependencies

npm install


3. Create a .env file in the root directory with the following variables:

PORT=5000
JWT_SECRET=your_jwt_secret_key_here
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Firebase Admin Configuration
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=your-client-cert-url


4. Create a .env.local file in the root directory with the following variables:

VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id


5. Seed the database with initial data

node backend/utils/seedData.js


6. Start the development server

npm run dev:all


## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### NPK Analysis
- POST /api/npk/analyze - Analyze NPK values
- GET /api/npk/history - Get user's NPK analysis history
- GET /api/npk/:id - Get specific NPK analysis

### Soil & Seed
- POST /api/soil-seed/soil/analyze - Analyze soil
- POST /api/soil-seed/seed/recommend - Get seed recommendations
- GET /api/soil-seed/soil/history - Get user's soil analysis history
- GET /api/soil-seed/seed/history - Get user's seed recommendation history

### Medicines
- GET /api/medicines/seasonal - Get seasonal medicines

### Policies
- GET /api/policies - Get all policies
- GET /api/policies/search - Search policies

### Payments
- POST /api/payments/create-order - Create payment order
- POST /api/payments/verify - Verify payment
- GET /api/payments/history - Get payment history

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password
3. Create a Firestore database
4. Generate a service account key for admin SDK
5. Add the Firebase configuration to your environment variables

## Video

Our Project Process -
https://youtu.be/jgmv_rJe-og


## License

This project is licensed under the MIT License.
