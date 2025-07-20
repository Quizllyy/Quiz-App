import axios from "axios";

const API_BASE_URL = "https://quiz-app-vrxp.onrender.com/api";

// ✅ Signup API Request
export const signup = async (userData) => {
  return await axios.post(`${API_BASE_URL}/auth/signup`, userData);
};

// ✅ Login API Request
export const login = async (userData) => {
  return await axios.post(`${API_BASE_URL}/auth/login`, userData);
};
