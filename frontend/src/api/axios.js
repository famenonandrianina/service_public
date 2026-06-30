import axios from 'axios';

console.log('========================================');
console.log('🔧 INITIALISATION AXIOS');
const baseURL = import.meta.env.VITE_API_URL || (import.meta.env.PROD
  ? 'https://service-pu.onrender.com/api'
  : 'http://localhost:5000/api');
console.log('→ Base URL utilisée:', baseURL);
console.log('→ Mode:', import.meta.env.PROD ? 'PRODUCTION' : 'DEVELOPMENT');
console.log('========================================');

const API = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

// Attach JWT token to every request and log request details
API.interceptors.request.use((config) => {
  console.log('➡️ REQUÊTE API ENVOYÉE:', {
    method: config.method?.toUpperCase(),
    url: config.url,
    baseURL: config.baseURL,
    fullURL: config.baseURL + config.url,
    data: config.data,
    headers: config.headers
  });
  
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('→ Token ajouté à la requête');
  }
  
  return config;
});

// Log responses and handle 401 globally
API.interceptors.response.use(
  (response) => {
    console.log('✅ RÉPONSE API RÉUSSIE:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('❌ RÉPONSE API EN ÉCHEC:', {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      error: error.message
    });

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
