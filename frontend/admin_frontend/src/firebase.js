// // firebase.js
// import { initializeApp } from 'firebase/app';
// import {
//   getAuth,
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   sendPasswordResetEmail,
//   sendEmailVerification,
//   setPersistence,
//   browserLocalPersistence,
//   browserSessionPersistence
// } from 'firebase/auth';

// import {
//   getFirestore,
//   collection,
//   addDoc,
//   updateDoc,
//   doc,
//   getDoc,
//   setDoc,
//   arrayUnion
// } from 'firebase/firestore';

// import {
//   getStorage,
//   ref,
//   uploadBytes,
//   getDownloadURL
// } from 'firebase/storage';

// // 🔐 Firebase Config
// const firebaseConfig = {
//   apiKey: 'AIzaSyC63gQ0iP2KQ8asQ3RJKTNMn7UMPQZtUFY',
//   authDomain: 'kissan-helper.firebaseapp.com',
//   projectId: 'kissan-helper',
//   storageBucket: 'kissan-helper.appspot.com',
//   messagingSenderId: '99150082854',
//   appId: '1:99150082854:web:a11ee307b429d3b6e887e7',
//   measurementId: 'G-S92CZ2S2XC'
// };

// // ✅ Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);
// const googleProvider = new GoogleAuthProvider();


// // 📤 Upload file to Firebase Storage
// export const uploadFile = async (file, path) => {
//   try {
//     const timestamp = Date.now();
//     const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
//     const fullPath = `${path}/${fileName}`;
//     const storageRef = ref(storage, fullPath);

//     await uploadBytes(storageRef, file);
//     const downloadURL = await getDownloadURL(storageRef);

//     return downloadURL;
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     throw new Error(`Failed to upload file: ${error.message}`);
//   }
// };


// // ✅ Register Admin (Create user + Send Email Verification)
// export const registerAdminWithEmail = async (email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // 📧 Send verification email
//     await sendEmailVerification(user);

//     return user.uid;
//   } catch (error) {
//     console.error('Firebase Auth Registration Error:', error);
//     throw new Error(error.message);
//   }
// };


// // ✅ Save Admin registration data to Firestore
// export const saveAdminRegistration = async (data) => {
//   try {
//     const specificDocId = 'rl4aWxDuIdpq6tcLhFgZ'; // Change if using dynamic ID
//     const docRef = doc(db, 'Admin', specificDocId);

//     const registrationData = {
//       id: Date.now().toString(),
//       fullName: data.fullName,
//       phoneNumber: data.phoneNumber,
//       email: data.email,
//       aadhaarNumber: data.aadhaarNumber,
//       aadhaarImageUrl: data.aadhaarImageUrl,
//       adminId: data.adminId,
//       adminPassword: data.adminPassword,
//       adminPhotoUrl: data.adminPhotoUrl,
//       paymentId: data.paymentId,
//       paymentStatus: data.paymentStatus,
//       registrationDate: new Date().toISOString(),
//       approvalStatus: 'pending',
//       firebaseUID: data.firebaseUID || null // if you want to link to Firebase Auth
//       emailVerified: false,           // ✅ New
//       otp: data.otp || null           // ✅ New
//     };

//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       await updateDoc(docRef, {
//         registrations: arrayUnion(registrationData)
//       });
//     } else {
//       await setDoc(docRef, {
//         registrations: [registrationData]
//       });
//     }

//     return registrationData.id;
//   } catch (error) {
//     console.error('Error saving admin registration:', error);
//     throw new Error(`Failed to save registration: ${error.message}`);
//   }
// };


// // 🔁 Export services and helpers
// export {
//   auth,
//   db,
//   storage,
//   googleProvider,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   sendPasswordResetEmail,
//   sendEmailVerification,
//   setPersistence,
//   browserLocalPersistence,
//   browserSessionPersistence
// };

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';

import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  arrayUnion
} from 'firebase/firestore';

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';

// 🔐 Firebase Config
const firebaseConfig = {
  apiKey: 'AIzaSyC63gQ0iP2KQ8asQ3RJKTNMn7UMPQZtUFY',
  authDomain: 'kissan-helper.firebaseapp.com',
  projectId: 'kissan-helper',
  storageBucket: 'kissan-helper.appspot.com',
  messagingSenderId: '99150082854',
  appId: '1:99150082854:web:a11ee307b429d3b6e887e7',
  measurementId: 'G-S92CZ2S2XC'
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();


// 📤 Upload file to Firebase Storage
export const uploadFile = async (file, path) => {
  try {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const fullPath = `${path}/${fileName}`;
    const storageRef = ref(storage, fullPath);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};


// ✅ Register Admin with Firebase Auth + Send Verification Email
export const registerAdminWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 📧 Send verification email
    await sendEmailVerification(user);
    return user.uid;
  } catch (error) {
    console.error('Firebase Auth Registration Error:', error);
    throw new Error(error.message);
  }
};


// ✅ Save Admin registration data to Firestore
export const saveAdminRegistration = async (data) => {
  try {
    const specificDocId = 'rl4aWxDuIdpq6tcLhFgZ'; // Change if using dynamic admin ID
    const docRef = doc(db, 'Admin', specificDocId);

    const registrationData = {
      id: Date.now().toString(),
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      aadhaarNumber: data.aadhaarNumber,
      aadhaarImageUrl: data.aadhaarImageUrl,
      adminId: data.adminId,
      adminPassword: data.adminPassword,
      adminPhotoUrl: data.adminPhotoUrl,
      paymentId: data.paymentId,
      paymentStatus: data.paymentStatus,
      registrationDate: new Date().toISOString(),
      approvalStatus: 'pending',
      firebaseUID: data.firebaseUID || null,
      emailVerified: false,                    // ✅ Email verification flag
      otp: data.otp || null,                   // ✅ OTP for verification
      otpCreatedAt: new Date().toISOString()   // ✅ OTP timestamp for expiry check
    };

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        registrations: arrayUnion(registrationData)
      });
    } else {
      await setDoc(docRef, {
        registrations: [registrationData]
      });
    }

    return registrationData.id;
  } catch (error) {
    console.error('Error saving admin registration:', error);
    throw new Error(`Failed to save registration: ${error.message}`);
  }
};


// 🔁 Export Firebase modules & helpers
export {
  auth,
  db,
  storage,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
};
