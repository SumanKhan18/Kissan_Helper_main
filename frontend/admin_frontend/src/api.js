import axios from "axios";

const envUrl = import.meta.env.VITE_API_URL;
const BASE_URL = envUrl || window.__APP_API_URL__ || "http://localhost:5000";

if (!envUrl) {
  // Soft warning to help discover missing configuration without breaking the app
  // eslint-disable-next-line no-console
  console.warn(
    "VITE_API_URL is not defined. Falling back to:", BASE_URL,
    "(set VITE_API_URL in frontend/admin_frontend/.env to silence this)"
  );
}

const attachToken = (config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const API = axios.create({
  baseURL: `${BASE_URL}/api/admin`,
});

API.interceptors.request.use(attachToken);

const RootAPI = axios.create({
  baseURL: BASE_URL,
});

RootAPI.interceptors.request.use(attachToken);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminProfile");
    }
    return Promise.reject(error);
  }
);

RootAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminProfile");
    }
    return Promise.reject(error);
  }
);

export { BASE_URL, RootAPI };
export default API;
