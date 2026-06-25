import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { newsData } from '../data/mockData';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';

const ActualitesPage = () => {
  return (
    <MainLayout>
      <div className="pt-32 pb-20 bg-white min-h-screen">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">Actualités de la Commune</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Retrouvez toutes les dernières informations, annonces et initiatives de Dembéni.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {newsData.map((news, idx) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col md:flex-row gap-6 bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-xl transition-shadow group"
              >
                <div className="md:w-2/5 h-48 md:h-auto rounded-xl overflow-hidden">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="md:w-3/5 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold font-mono">
                      {news.category}
                    </span>
                    <span className="flex items-center gap-2 text-slate-500 text-sm">
                      <FiCalendar /> {news.date}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-green-900 leading-tight">
                    {news.title}
                  </h3>
                  <p className="text-slate-600 line-clamp-3">
                    {news.description}
                  </p>
                  <button className="btn-primary py-2 px-5 text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Lire plus <FiArrowRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ActualitesPage;
