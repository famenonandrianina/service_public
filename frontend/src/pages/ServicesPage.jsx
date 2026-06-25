import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { servicesData } from '../data/mockData';
import { FiExternalLink } from 'react-icons/fi';

const ServicesPage = () => {
  return (
    <MainLayout>
      <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">Nos Services Publics</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Des services de proximité pour faciliter votre quotidien et accompagner vos projets.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card-modern group"
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {service.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  {service.objective && (
                    <div className="bg-green-50 p-3 rounded-lg mb-4 border border-green-100">
                      <span className="text-green-800 font-semibold text-xs uppercase block mb-1">Objectif:</span>
                      <p className="text-green-700 text-sm italic">{service.objective}</p>
                    </div>
                  )}
                  <button className="text-green-600 font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
                    En savoir plus <FiExternalLink />
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

export default ServicesPage;
