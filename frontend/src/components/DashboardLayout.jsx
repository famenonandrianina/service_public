import React, { useState, useEffect } from 'react';
import DashboardSidebar from './DashboardSidebar';
import { FiBell, FiSearch, FiHelpCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { demandeAPI } from '../api';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = ({ children, role = 'user' }) => {
  const [pendingCount, setPendingCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'admin') {
      demandeAPI.getStats()
        .then(res => setPendingCount(res.data.stats?.en_attente || 0))
        .catch(err => console.error(err));
    }
  }, [role]);

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      <DashboardSidebar role={role} />
      
      <div className="pl-72 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-8 flex-1">
            <div className="relative w-full max-w-md group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Rechercher un dossier, un service..." 
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-green-500/20 text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => role === 'admin' && navigate('/admin/demandes')}
              className="p-2.5 text-gray-500 hover:bg-slate-50 rounded-xl transition-all relative group"
            >
              <FiBell className={`text-xl ${pendingCount > 0 ? 'text-red-600 animate-bounce' : ''}`} />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-600 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-lg shadow-red-200">
                  {pendingCount}
                </span>
              )}
            </button>
            <button className="p-2.5 text-gray-500 hover:bg-slate-50 rounded-xl transition-all">
              <FiHelpCircle className="text-xl" />
            </button>
            <div className="h-8 w-px bg-slate-100 mx-2"></div>
            <div className="flex items-center gap-3">
               <div className="text-right hidden sm:block">
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Mairie de Dembéni</p>
                 <p className="text-[10px] font-bold text-green-600 uppercase tracking-[0.2em]">{role === 'admin' ? 'Plateforme Admin' : 'Portail Citoyen'}</p>
               </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-grow p-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
        
        {/* Minimal Footer */}
        <footer className="px-10 py-6 text-center text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] border-t border-slate-50">
          © 2026 Ville de Dembéni • Système de Gestion des Services Publics
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
