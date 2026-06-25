import API from './axios';

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
  updateAvatar: (formData) => API.put('/auth/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  changePassword: (data) => API.put('/auth/change-password', data),
};

export const serviceAPI = {
  getAll: (params) => API.get('/services', { params }),
  getOne: (id) => API.get(`/services/${id}`),
  create: (data) => API.post('/services', data),
  update: (id, data) => API.put(`/services/${id}`, data),
  delete: (id) => API.delete(`/services/${id}`),
};

export const servicePublicAPI = {
  getAll: (params) => API.get('/services-publics', { params }),
  create: (data) => API.post('/services-publics', data),
  update: (id, data) => API.put(`/services-publics/${id}`, data),
  delete: (id) => API.delete(`/services-publics/${id}`),
};

export const actualiteAPI = {
  getAll: (params) => API.get('/actualites', { params }),
  create: (data) => API.post('/actualites', data),
  update: (id, data) => API.put(`/actualites/${id}`, data),
  delete: (id) => API.delete(`/actualites/${id}`),
};

export const demandeAPI = {
  create: (data) => API.post('/demandes', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getMes: (params) => API.get('/demandes/mes-demandes', { params }),
  getAll: (params) => API.get('/demandes', { params }),
  getOne: (id) => API.get(`/demandes/${id}`),
  updateStatut: (id, data) => API.put(`/demandes/${id}/statut`, data),
  getStats: () => API.get('/demandes/stats'),
};

export const reclamationAPI = {
  create: (data) => API.post('/reclamations', data),
  getMes: () => API.get('/reclamations/mes-reclamations'),
  getAll: (params) => API.get('/reclamations', { params }),
  repondre: (id, data) => API.put(`/reclamations/${id}/repondre`, data),
};

export const annonceAPI = {
  getAll: (params) => API.get('/annonces', { params }),
  create: (data) => API.post('/annonces', data),
  update: (id, data) => API.put(`/annonces/${id}`, data),
  delete: (id) => API.delete(`/annonces/${id}`),
};

export const userAPI = {
  getAll: (params) => API.get('/users', { params }),
  getStats: () => API.get('/users/stats'),
  toggle: (id) => API.put(`/users/${id}/toggle`),
  changeRole: (id, role) => API.put(`/users/${id}/role`, { role }),
  delete: (id) => API.delete(`/users/${id}`),
};

export const galleryAPI = {
  getAll: () => API.get('/gallery'),
  create: (data) => API.post('/gallery', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => API.delete(`/gallery/${id}`),
};
