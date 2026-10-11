import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("cravix-token");

    console.log("========== API REQUEST ==========");
    console.log("URL:", config.url);
    console.log("Token:", token);
    console.log("=================================");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle API responses
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API ERROR:",
      error.response?.status,
      error.response?.data
    );

    // IMPORTANT:
    // Do NOT delete the token automatically here.
    // We need to see the real authentication error first.

    return Promise.reject(error);
  }
);

export default API;