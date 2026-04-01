import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token && token !== "undefined") {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API; // ✅ This matches your Login.jsx import
