// src/pages/Auth.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "react-toastify/dist/ReactToastify.css";
import API from "./api";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // ✅ works in v4+



export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  // Google Login (Backend)
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      // console.log("Google user:", decoded);

      const res = await API.post("/auth/googleLogin", {
        credential: credentialResponse.credential,
      });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        toast.success("Successfully Logged in with Google");
        setTimeout(() => navigate("/home"), 500);
      } else {
        throw new Error("No token received from server");
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message || "Google login failed");
      setError(error.message);
    }
  };

  // Forgot Password (Backend)
  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }

    try {
      await API.post("/auth/forgot-password", { email });
      toast.success("Password reset link sent to your email");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    }
  };

  // Login / Signup form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const res = await API.post("/auth/login", { email, password });
        if (res.data?.token) {
          // console.log(res.data)
          if (rememberMe) {
            localStorage.setItem("token", res.data.token);
          } else {
            sessionStorage.setItem("token", res.data.token);
          }
          toast.success("Login Successful");
        } else {
          throw new Error("No token received from server");
        }
      } else {
        await API.post("/auth/signup", { name, email, password });
        toast.success("Registration Successful! Please login.");
        setIsLogin(true);
        return;
      }

      setTimeout(() => navigate("/home"), 500);
    } catch (error) {
      console.error(error.message);
      setError(error.response?.data?.message || error.message || "Request failed");
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <GoogleOAuthProvider clientId="800584745273-pr6rj39k2sd807pjqpmpaitktmc7l7jg.apps.googleusercontent.com">
      <div className="min-h-screen bg-black flex flex-col md:flex-row items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-6 text-center mt-12">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label className="text-white block mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Your Full Name"
                    className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              <div>
                <label className="text-white block mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter Valid Email Address"
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-white block mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {isLogin && (
                <div className="flex justify-between items-center text-sm text-gray-300">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="form-checkbox text-green-500"
                    />
                    <span>Remember Me</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-green-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {error && <p className="text-red-500 text-center">{error}</p>}
              <button className="w-full bg-green-500 text-black p-3 rounded font-bold hover:bg-green-600 transition-all">
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-gray-400">Or continue with</p>
              <div className="flex justify-center mt-4">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => setError("Google login failed")}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: isLogin ? 100 : -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0"
        >
          <div className="text-center p-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              {isLogin ? "New to Kissan Helper?" : "Already have an account?"}
            </h3>
            <p className="text-gray-400 mb-6">
              {isLogin
                ? "Join our community of farmers and grow together."
                : "Welcome back! Login to continue your journey."}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="border-2 border-green-500 text-green-500 px-6 py-2 rounded-full hover:bg-green-500 hover:text-black transition-all"
            >
              {isLogin ? "Register Now" : "Login"}
            </button>
          </div>
        </motion.div>
      </div>
    </GoogleOAuthProvider>
  );
}
