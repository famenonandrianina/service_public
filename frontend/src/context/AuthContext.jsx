import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Error parsing user from localStorage', e);
      localStorage.removeItem('user');
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authAPI.getMe()
        .then(res => setUser(res.data.user))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, motDePasse) => {
    const res = await authAPI.login({ email, motDePasse });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    toast.success(`Bienvenue, ${user.nom} !`);
    return user;
  };

  const register = async (data) => {
  console.log('========================================');
  console.log('🔐 TENTATIVE D\'INSCRIPTION');
  console.log('📤 Données envoyées:', data);
  console.log('🔗 API URL utilisée:', import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://service-pu.onrender.com/api' : 'http://localhost:5000/api'));
  
  try {
    const res = await authAPI.register(data);
    console.log('✅ RÉPONSE API RÉUSSIE:', res);
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    toast.success('Compte créé avec succès !');
    console.log('========================================');
    return user;
  } catch (err) {
    console.error('❌❌❌ ERREUR INSCRIPTION ❌❌❌');
    console.error('Erreur complète:', err);
    console.error('→ Nom de l\'erreur:', err.name);
    console.error('→ Message:', err.message);
    console.error('→ Response:', err.response);
    console.error('→ Response data:', err.response?.data);
    console.error('→ Response status:', err.response?.status);
    console.error('→ IsAxiosError:', err.isAxiosError);
    console.error('→ Request config:', err.config);
    console.error('========================================');
    
    throw err;
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Déconnexion réussie');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
