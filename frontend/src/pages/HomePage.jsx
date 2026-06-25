import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiUsers, FiSettings, FiActivity } from 'react-icons/fi';
import MainLayout from '../layouts/MainLayout';
import { statsData } from '../data/mockData';
import { galleryAPI } from '../api';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#166534] via-[#15803d] to-[#14532d]">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08756ebafe1?q=80&w=1600&auto=format&fit=crop" 
          alt="Dembéni" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight font-['Poppins'] tracking-tighter"
        >
          Services Publics de <span className="text-green-300">Dembéni</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto font-medium"
        >
          Simplifier les démarches administratives et rapprocher l'administration des citoyens.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-center gap-6"
        >
          <Link to="/services" className="bg-green-600 hover:bg-green-700 text-white text-lg px-10 py-5 rounded-2xl font-black shadow-2xl shadow-green-950/20 transition-all flex items-center justify-center gap-3 group">
            Découvrir nos services <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
          <Link to="/about" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-10 py-5 rounded-2xl font-black transition-all border border-white/30 uppercase text-sm tracking-widest">
            En savoir plus
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-20">
          <div className="md:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1000&auto=format&fit=crop" 
                alt="Commune de Dembéni" 
                className="rounded-[4rem] shadow-2xl z-10 relative border-8 border-white"
              />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-green-50 rounded-[4rem] -z-10"></div>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 space-y-10">
            <h2 className="text-5xl font-black text-green-950 leading-tight tracking-tighter font-['Poppins']">
              Une Commune au service de <span className="text-red-600 underline decoration-red-100 italic">ses citoyens</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              La mairie de Dembéni s'engage dans une démarche de modernisation radicale. Notre mission est de garantir l'accès aux droits pour tous, en utilisant le numérique comme un outil de proximité.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Proximité locale",
                "Simplification numérique",
                "Inclusion sociale",
                "Développement rural"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <FiCheckCircle className="text-green-500 text-xl" />
                  <span className="font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-teal-900 to-emerald-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          {statsData.slice(0, 3).map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="text-6xl font-black text-green-300 tracking-tighter">{stat.value}</div>
              <div className="text-xs font-black text-green-100 uppercase tracking-[0.3em]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const [photos, setPhotos] = React.useState([]);

  React.useEffect(() => {
    galleryAPI.getAll()
      .then(res => setPhotos(res.data.photos))
      .catch(err => console.error(err));
  }, []);

  if (photos.length === 0) return null;

  return (
    <section className="py-32 container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-5xl font-black text-green-950 mb-4 font-['Poppins'] tracking-tighter">Vivre à Dembéni</h2>
          <p className="text-slate-500 font-medium text-lg">Découvrez la vie communale à travers l'objectif de nos citoyens.</p>
        </div>
        <div className="h-px flex-grow bg-slate-100 hidden md:block mx-12 mb-6"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {photos.slice(0, 8).map((photo, idx) => (
          <motion.div 
            key={photo._id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -12 }}
            className="group h-[400px] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 transition-all relative"
          >
            <img 
              src={photo.imageUrl?.startsWith('http') ? photo.imageUrl : `http://localhost:5000${photo.imageUrl}`} 
              alt={photo.titre} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <p className="text-white font-black text-lg uppercase tracking-tight leading-tight mb-2">{photo.titre}</p>
              <div className="flex items-center gap-2">
                 <span className="px-3 py-1 bg-green-700 text-white text-[10px] font-black uppercase tracking-widest rounded-full">{photo.categorie}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <MainLayout>
      <Hero />
      <AboutSection />
      <StatsSection />
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center mb-20 relative z-10">
          <span className="text-[10px] font-black text-green-700 uppercase tracking-[0.4em] block mb-4">Notre Engagement</span>
          <h2 className="text-5xl font-black text-green-950 mb-6 font-['Poppins'] tracking-tighter">Nos Objectifs Majeurs</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">
            Nous travaillons chaque jour pour améliorer la qualité de vie à Dembéni à travers des initiatives concrètes et digitales.
          </p>
        </div>
        
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
          {[
            { icon: <FiUsers />, label: "Rapprocher l'administration", desc: "Offrir des points de contact au cœur de chaque quartier.", color: "bg-green-100 text-green-600" },
            { icon: <FiSettings />, label: "Simplifier les démarches", desc: "Digitaliser et optimiser les processus administratifs complexes.", color: "bg-blue-100 text-blue-600" },
            { icon: <FiActivity />, label: "Améliorer les conditions", desc: "Garantir un accès équitable aux services essentiels pour tous.", color: "bg-red-100 text-red-600" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-12 rounded-[4rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl transition-all duration-500 group flex flex-col items-center text-center">
              <div className={`w-20 h-20 ${item.color} rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner`}>
                <span className="text-4xl">{item.icon}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter font-['Poppins']">{item.label}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <GallerySection />
    </MainLayout>
  );
};

export default HomePage;
