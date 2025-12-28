import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (email, password) =>
  api.post("/auth/login", { email, password });

export const verifyToken = () => api.get("/auth/verify");

// Geolocation
export const getCurrentGeo = () => api.get("/geo/current");

export const searchIP = (ip) => api.post("/geo/search", { ip });

export const getHistory = () => api.get("/geo/history");

export const deleteHistory = (id) => api.delete(`/geo/history/${id}`);

export const deleteMultipleHistory = (ids) =>
  api.post("/geo/history/delete-multiple", { ids });

export default api;
