// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambia esta URL según el puerto y host de tu backend
});

// Interceptor para agregar el token de autenticación si está disponible
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Ajusta según tu sistema de almacenamiento
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
