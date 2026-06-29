// URL de base de l'API backend
export const API_BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '')
  || (import.meta.env.PROD
    ? 'https://service-pu.onrender.com'
    : 'http://localhost:5000');

// URL pour les fichiers uploadés (images, avatars, etc.)
export const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL
  || (import.meta.env.PROD
    ? 'https://service-pu.onrender.com'
    : 'http://localhost:5000');
