import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiHome, FiFileText, FiUser, FiBell, FiSettings, 
  FiLogOut, FiMessageSquare, FiPlusCircle, FiLayout, FiGrid,
  FiUsers, FiPieChart, FiInfo, FiImage
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { demandeAPI } from '../api';

const DashboardSidebar = ({ role = 'user' }) => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (role === 'admin') {
      demandeAPI.getStats()
        .then(res => setPendingCount(res.data.stats?.en_attente || 0))
        .catch(err => console.error(err));
    }
  }, [role]);

  const userLinks = [
    { title: 'Tableau de bord', path: '/dashboard', icon: <FiLayout /> },
    { title: 'Mes demandes', path: '/mes-demandes', icon: <FiFileText /> },
    { title: 'Nouvelle demande', path: '/nouvelle-demande', icon: <FiPlusCircle /> },
    { title: 'Réclamations', path: '/reclamations', icon: <FiMessageSquare /> },
    { title: 'Mon Profil', path: '/profile', icon: <FiUser /> },
  ];

  const adminLinks = [
    { title: 'Statistiques', path: '/admin', icon: <FiPieChart /> },
    { 
      title: 'Dossiers citoyens', 
      path: '/admin/demandes', 
      icon: <FiFileText />, 
      badge: pendingCount > 0 ? pendingCount : null 
    },
    { title: 'Services publics', path: '/admin/services', icon: <FiGrid /> },
    { title: 'Actualités', path: '/admin/annonces', icon: <FiInfo /> },
    { title: 'Utilisateurs', path: '/admin/users', icon: <FiUsers /> },
    { title: 'Médiathèque', path: '/admin/gallery', icon: <FiImage /> },
    { title: 'Paramètres', path: '/admin/settings', icon: <FiSettings /> },
  ];

  const links = role === 'admin' ? adminLinks : userLinks;

  return (
    <div className="w-72 bg-slate-50 h-screen fixed left-0 top-0 border-r border-slate-200 flex flex-col z-50 shadow-xl">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200">
          <FiLayout className="text-xl" />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-green-950 tracking-tighter text-lg leading-none">DEMBÉNI</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Espace {role === 'admin' ? 'Administration' : 'Citoyen'}</span>
        </div>
      </div>

      <div className="flex-grow px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-100 scale-[1.02]' 
                  : 'text-gray-500 hover:bg-green-50 hover:text-green-700'
              }`}
            >
              <span className={`text-xl transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {link.icon}
              </span>
              <span className="font-bold text-sm tracking-tight">{link.title}</span>
              {link.badge && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-red-200 animate-pulse">
                  {link.badge}
                </span>
              )}
              {isActive && !link.badge && (
                <motion.div 
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-1.5 bg-white rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-6 mt-auto">
        <div className="bg-slate-50 p-4 rounded-3xl mb-4 border border-slate-100">
           <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-[12px] bg-white flex items-center justify-center text-green-600 font-bold border border-slate-100 shadow-sm overflow-hidden">
                {user?.avatar ? (
                  <img src={`http://localhost:5000${user.avatar}`} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  user?.nom?.charAt(0)?.toUpperCase() || 'U'
                )}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-black text-gray-900 truncate">{user?.nom}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase truncate tracking-wider">{user?.role}</p>
              </div>
           </div>
        </div>

        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 group shadow-sm shadow-red-100"
        >
          <FiLogOut className="text-xl group-hover:rotate-180 transition-transform duration-500" />
          <span className="font-black text-sm tracking-tight uppercase">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
