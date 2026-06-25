import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { FiTarget, FiEye, FiHeart, FiGlobe } from 'react-icons/fi';

const AboutPage = () => {
  const missions = [
    {
      title: "Rapprocher l'administration des citoyens",
      description: "Réduire les distances physiques et numériques pour que chaque habitant de Dembéni puisse accéder à ses droits sans difficulté.",
      icon: <FiGlobe className="text-green-600" />
    },
    {
      title: "Simplifier les démarches",
      description: "Optimiser les processus administratifs pour les rendre plus lisibles, plus rapides et plus accessibles à tous les publics.",
      icon: <FiTarget className="text-green-600" />
    },
    {
      title: "Améliorer les conditions de vie",
      description: "Œuvrer quotidiennement pour un cadre de vie sain, sécurisé et dynamique à travers des services de qualité.",
      icon: <FiEye className="text-purple-600" />
    },
    {
      title: "Favoriser l'inclusion sociale",
      description: "Accompagner les plus fragiles et garantir que personne n'est laissé pour compte dans le développement de notre commune.",
      icon: <FiHeart className="text-red-600" />
    }
  ];

  return (
    <MainLayout>
      <div className="pt-32 pb-20 min-h-screen">
        {/* Header Section */}
        <section className="bg-white mb-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-green-600 font-bold tracking-widest uppercase text-sm block mb-4"
                >
                  À Propos de Dembéni
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-900 leading-tight mb-8"
                >
                  Bâtir ensemble la commune de <span className="text-green-600">demain</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-slate-600 leading-relaxed"
                >
                  Située entre terre et mer, Dembéni est une commune mahoraise en pleine mutation. Notre ambition est de concilier tradition et modernité pour offrir un service public d'excellence.
                </motion.p>
              </div>
              <div className="lg:w-1/2 relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img src="https://images.unsplash.com/photo-1540331547168-8b63109225b7?q=80&w=1000&auto=format&fit=crop" alt="Dembéni Panorama" className="w-full h-[500px] object-cover" />
                </motion.div>
                <div className="absolute -bottom-10 -left-10 bg-green-900 p-8 rounded-2xl text-white shadow-xl hidden md:block">
                  <div className="text-4xl font-bold mb-1">100%</div>
                  <div className="text-green-200">Engagés pour vous</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Missions Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Notre Mission & Nos Objectifs</h2>
              <div className="w-24 h-1.5 bg-green-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {missions.map((mission, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex gap-6"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                    {mission.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{mission.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{mission.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Development Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-blue-900 mb-6">Développer la commune durablement</h2>
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                  Au-delà de l'administratif, la Mairie de Dembéni investit dans le futur : infrastructures scolaires, aménagement du territoire, soutien à l'agriculture locale et protection de l'environnement.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-100 bg-white shadow-sm transition-all">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span className="font-semibold text-slate-700">12 Projets publics en cours de réalisation</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-green-100 bg-white shadow-sm transition-all">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span className="font-semibold text-slate-700">Soutien massif à l'agriculture locale (EP FAM)</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=600&auto=format&fit=crop" className="rounded-2xl h-48 w-full object-cover" alt="Agriculture" />
                <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop" className="rounded-2xl h-48 w-full object-cover mt-8" alt="Urbanism" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
