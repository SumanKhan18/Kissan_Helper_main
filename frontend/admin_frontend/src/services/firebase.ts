// import { collection, addDoc, updateDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
// import { setDoc, arrayUnion } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { db, storage } from '../firebase';
// import { AdminRegistration } from '../types/admin';

// export const uploadFile = async (file: File, path: string): Promise<string> => {
//   try {
//     // Create a unique filename with timestamp
//     const timestamp = Date.now();
//     const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
//     const fullPath = `${path}/${fileName}`;
    
//     const storageRef = ref(storage, fullPath);
    
//     console.log('Uploading file to:', fullPath);
//     const snapshot = await uploadBytes(storageRef, file);
//     console.log('File uploaded successfully:', snapshot);
    
//     const downloadURL = await getDownloadURL(storageRef);
//     console.log('Download URL obtained:', downloadURL);
    
//     return downloadURL;
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     throw new Error(`Failed to upload file: ${error.message}`);
//   }
// };

// export const saveAdminRegistration = async (data: AdminRegistration): Promise<string> => {
//   try {
//     // Use the specific document ID as requested
//     const specificDocId = 'rl4aWxDuIdpq6tcLhFgZ';
//     const docRef = doc(db, 'Admin', specificDocId);
    
//     // Create the registration data object with unique ID
//     const registrationData = {
//       id: Date.now().toString(), // Generate unique ID for this registration
//       fullName: data.fullName,
//       phoneNumber: data.phoneNumber,
//       email: data.email,
//       aadhaarNumber: data.aadhaarNumber,
//       aadhaarImageUrl: data.aadhaarImageUrl,
//       adminPhotoUrl: data.adminPhotoUrl,
//       paymentId: data.paymentId,
//       paymentStatus: data.paymentStatus,
//       registrationDate: new Date().toISOString(),
//       approvalStatus: 'pending',
//       adminId: null,
//       adminPassword: null
//     };

//     // Check if document exists and add to registrations array
//     const docSnap = await getDoc(docRef);
    
//     if (docSnap.exists()) {
//       // Document exists, add new registration to the array
//       await updateDoc(docRef, {
//         registrations: arrayUnion(registrationData)
//       });
//       console.log('Registration added to existing Admin document:', specificDocId);
//     } else {
//       // Document doesn't exist, create it with the first registration
//       await setDoc(docRef, {
//         registrations: [registrationData]
//       });
//       console.log('New Admin document created with registration:', specificDocId);
//     }
    
//     console.log('Registration data saved successfully:', registrationData);
//     return registrationData.id;
//   } catch (error) {
//     console.error('Error saving admin registration:', error);
//     throw new Error(`Failed to save registration: ${error.message}`);
//   }
// };

// export const updateAdminRegistration = async (id: string, data: Partial<AdminRegistration>): Promise<void> => {
//   const docRef = doc(db, 'admins', id);
//   await updateDoc(docRef, data);
// };

// export const getAdminByCredentials = async (adminId: string, password: string): Promise<AdminRegistration | null> => {
//   try {
//     const specificDocId = 'rl4aWxDuIdpq6tcLhFgZ';
//     const docRef = doc(db, 'Admin', specificDocId);
//     const docSnap = await getDoc(docRef);
    
//     if (docSnap.exists()) {
//       const data = docSnap.data();
//       const registrations = data.registrations || [];
      
//       // Find admin with matching credentials and approved status
//       const admin = registrations.find((reg: any) => 
//         reg.adminId === adminId && 
//         reg.adminPassword === password && 
//         reg.approvalStatus === 'approved'
//       );
      
//       return admin || null;
//     }
    
//     return null;
//   } catch (error) {
//     console.error('Error getting admin by credentials:', error);
//     throw new Error(`Failed to get admin: ${error.message}`);
//   }
// };