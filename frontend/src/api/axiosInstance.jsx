import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Your base URL for the backend
});

// Axios interceptor to add the Authorization header with token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
