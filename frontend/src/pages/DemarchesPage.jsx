import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { demarchesData } from '../data/mockData';
import { FiSearch, FiFilter, FiFileText, FiHeart, FiUsers, FiDollarSign, FiMail, FiSun, FiTrash2, FiChevronRight } from 'react-icons/fi';

const iconMap = {
  FiFileText: FiFileText,
  FiHeart: FiHeart,
  FiUsers: FiUsers,
  FiDollarSign: FiDollarSign,
  FiMail: FiMail,
  FiSun: FiSun,
  FiTrash2: FiTrash2,
};

const DemarchesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');

  const categories = ['Tous', ...new Set(demarchesData.map(item => item.category))];

  const filteredData = demarchesData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'Tous' || item.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <MainLayout>
      <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">Démarches Administratives</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Réalisez vos démarches en ligne simplement et rapidement.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="bg-white p-20 rounded-[3rem] border border-slate-100 shadow-sm text-center">
            <FiFileText className="mx-auto text-6xl text-slate-200 mb-6" />
            <h2 className="text-2xl font-black text-slate-400 uppercase tracking-tighter mb-4">Section en cours de transfert</h2>
            <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium">
              Veuillez consulter la page <Link to="/services" className="text-green-600 underline">Service Public</Link> pour accéder à vos formulaires et démarches.
            </p>
          </div>

          <div className="mt-20 bg-green-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">Besoin d'un accompagnement personnalisé ?</h2>
              <p className="text-green-100 mb-10 max-w-2xl mx-auto">
                Nos conseillers vous accueillent à la Maison France Services de Tsararano pour vous aider dans vos démarches administratives complexes.
              </p>
              <button className="bg-white text-green-900 font-bold px-10 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-xl">
                Prendre rendez-vous
              </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-800 -mr-32 -mt-32 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-800 -ml-32 -mb-32 rounded-full opacity-50 blur-3xl"></div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DemarchesPage;
