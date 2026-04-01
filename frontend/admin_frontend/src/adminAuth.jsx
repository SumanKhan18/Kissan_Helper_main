// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import {
//   auth,
//   googleProvider,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   sendPasswordResetEmail,
//   setPersistence,
//   browserLocalPersistence,
//   browserSessionPersistence
// } from './firebase';

// export default function adminAuth() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);

//   const navigate = useNavigate();

//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       toast.success("Successfully Logged in");
//       setTimeout(() => navigate('/home'), 500);
//     } catch (error) {
//       console.error(error.message);
//       toast.error(error.message);
//       setError(error.message);
//     }
//   };

//   const handleForgotPassword = async () => {
//     if (!email) {
//       toast.error("Please enter your email first");
//       return;
//     }
//     try {
//       await sendPasswordResetEmail(auth, email);
//       toast.success("Password reset link sent to your email");
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const persistence = rememberMe
//         ? browserLocalPersistence
//         : browserSessionPersistence;
//       await setPersistence(auth, persistence);

//       if (isLogin) {
//         await signInWithEmailAndPassword(auth, email, password);
//         toast.success("Login Successful");
//       } else {
//         await createUserWithEmailAndPassword(auth, email, password);
//         toast.success("Registration Successful");
//       }

//       setTimeout(() => navigate('/home'), 500);
//     } catch (error) {
//       console.error(error.message);
//       setError(error.message);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black flex flex-col md:flex-row items-center justify-center p-6">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="w-full md:w-1/2 flex justify-center"
//       >
//         <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg">
//           <h2 className="text-3xl font-bold text-white mb-6 text-center mt-12">
//             {isLogin ? "Welcome Back" : "Create Account"}
//           </h2>
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             {!isLogin && (
//               <div>
//                 <label className="text-white block mb-1">Name</label>
//                 <input
//                   type="text"
//                   placeholder="Enter Your Full Name"
//                   className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//             )}
//             <div>
//               <label className="text-white block mb-1">Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter Valid Email Address"
//                 className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="text-white block mb-1">Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter Password"
//                 className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             {isLogin && (
//               <div className="flex justify-between items-center text-sm text-gray-300">
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={() => setRememberMe(!rememberMe)}
//                     className="form-checkbox text-green-500"
//                   />
//                   <span>Remember Me</span>
//                 </label>
//                 <button
//                   type="button"
//                   onClick={handleForgotPassword}
//                   className="text-green-400 hover:underline"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>
//             )}
//             {error && <p className="text-red-500 text-center">{error}</p>}
//             <button className="w-full bg-green-500 text-black p-3 rounded font-bold hover:bg-green-600 transition-all">
//               {isLogin ? "Login" : "Register"}
//             </button>
//           </form>

//           <div className="mt-4 text-center">
//             <p className="text-gray-400">Or continue with</p>
//             <button
//               className="w-full mt-4 bg-white hover:bg-gray-100 text-black p-3 rounded font-bold flex items-center justify-center"
//               onClick={handleGoogleLogin}
//             >
//               <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
//                 <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
//               </svg>
//               Continue with Google
//             </button>
//           </div>
//         </div>
//       </motion.div>

//       <motion.div
//         initial={{ x: isLogin ? 100 : -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0"
//       >
//         <div className="text-center p-6">
//           <h3 className="text-2xl font-bold text-white mb-4">
//             {isLogin ? "New to Kissan Helper?" : "Already have an account?"}
//           </h3>
//           <p className="text-gray-400 mb-6">
//             {isLogin
//               ? "Join our community of farmers and grow together."
//               : "Welcome back! Login to continue your journey."}
//           </p>
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="border-2 border-green-500 text-green-500 px-6 py-2 rounded-full hover:bg-green-500 hover:text-black transition-all"
//           >
//             {isLogin ? "Register Now" : "Login"}
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
