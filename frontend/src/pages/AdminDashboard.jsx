import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiArrowUpRight, FiSearch } from 'react-icons/fi';
import { statsData } from '../data/mockData';
import DashboardLayout from '../components/DashboardLayout';

// Import sub-components
import AdminAnnonces from './admin/AdminAnnonces';
import AdminDemandes from './admin/AdminDemandes';
import AdminServices from './admin/AdminServices';
import AdminUsers from './admin/AdminUsers';
import AdminStats from './admin/AdminStats';
import AdminGallery from './admin/AdminGallery';
import AdminSettings from './admin/AdminSettings';

import { useState, useEffect } from 'react';
import { demandeAPI } from '../api';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const AdminOverview = () => {
  const [recentDemandes, setRecentDemandes] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    en_attente: 0,
    terminee: 0,
    users: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [demandesRes, statsRes] = await Promise.all([
          demandeAPI.getAll({ limit: 5 }),
          demandeAPI.getStats()
        ]);
        setRecentDemandes(demandesRes.data.demandes || []);
        setStats(statsRes.data.stats || { total: 0, en_attente: 0, terminee: 0, users: 0 });
      } catch (err) {
        console.error('Erreur dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const displayStats = [
    { label: 'Total Demandes', value: stats.total, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'En Attente', value: stats.en_attente, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Traitées', value: stats.terminee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Citoyens', value: stats.users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {displayStats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-green-600 transition-colors">{stat.label}</p>
            <div className="flex items-end justify-between">
               <h3 className={`text-4xl font-black ${stat.color} tracking-tight`}>{stat.value}</h3>
               <div className="text-green-500 font-bold text-xs flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                  <FiArrowUpRight /> Actif
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Flux d'activité</h3>
            <Link to="/admin/demandes" className="text-xs font-bold text-green-600 hover:underline">Tout voir</Link>
          </div>
          <div className="space-y-6">
            {recentDemandes.length === 0 ? (
              <p className="text-slate-400 italic text-center py-10">Aucune activité récente</p>
            ) : (
              recentDemandes.slice(0, 4).map((d, i) => (
                <div key={i} className="flex items-center gap-6 pb-6 border-b border-slate-50 last:border-0 last:pb-0 group">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-green-600 group-hover:text-white transition-all text-xl">
                    <FiPlus />
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm">Nouvelle demande : <span className="text-green-600">{d.service?.nom}</span></p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                      Par {d.utilisateur?.nom} • {formatDistanceToNow(new Date(d.createdAt), { addSuffix: true, locale: fr })}
                    </p>
                  </div>
                  <div className={`ml-auto w-2 h-2 rounded-full ${d.statut === 'en_attente' ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Dossiers à Valider</h3>
            <span className="bg-red-100 text-red-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              {stats.en_attente} en attente
            </span>
          </div>
          <div className="space-y-4">
            {recentDemandes.filter(d => d.statut === 'en_attente').length === 0 ? (
              <p className="text-slate-400 italic text-center py-10">Tous les dossiers sont à jour !</p>
            ) : (
              recentDemandes.filter(d => d.statut === 'en_attente').slice(0, 3).map((req, i) => (
                <Link key={i} to="/admin/demandes" className="flex items-center justify-between p-6 rounded-[1.5rem] bg-slate-50 border border-slate-100 hover:border-green-300 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-10 bg-amber-200 rounded-full group-hover:bg-amber-500 transition-colors"></div>
                     <div>
                        <p className="font-black text-slate-900">{req.utilisateur?.nom}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{req.service?.nom}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dossier {req.numero?.substring(0, 8)}</p>
                     <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500 text-white shadow-lg shadow-amber-200">
                        À TRAITER
                     </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ tab = 'overview' }) => {
  return (
    <DashboardLayout role="admin">
      <motion.div
        key={tab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-8">
           <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.4em] block mb-2">Administration Centrale</span>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
              {tab === 'overview' ? 'Vue d\'ensemble' : 
               tab === 'demandes' ? 'Gestion des Dossiers' :
               tab === 'services' ? 'Catalogue S.P' :
               tab === 'news' ? 'Actualités & Annonces' :
               tab === 'users' ? 'Utilisateurs' :
               tab === 'gallery' ? 'Médiathèque' :
               tab === 'stats' ? 'Rapports & Stats' :
               tab === 'settings' ? 'Paramètres' : 'Admin Dashboard'}
           </h1>
        </div>

        {tab === 'overview' && <AdminOverview />}
        {tab === 'services' && <AdminServices />}
        {tab === 'news' && <AdminAnnonces />}
        {tab === 'demandes' && <AdminDemandes />}
        {tab === 'users' && <AdminUsers />}
        {tab === 'gallery' && <AdminGallery />}
        {tab === 'stats' && <AdminStats />}
        {tab === 'settings' && <AdminSettings />}
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
