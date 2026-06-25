import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicePublicAPI, annonceAPI } from '../api';
import { 
  FiFileText, FiUser, FiHome, FiHeart, FiUsers, FiInfo,
  FiChevronRight, FiCheckCircle, FiGlobe, FiClock, FiShield,
  FiHelpCircle, FiArrowRight, FiExternalLink, FiSearch
} from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../styles/servicepublic.css';

const ServicesPublics = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [services, setServices] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [servicesRes, newsRes] = await Promise.all([
          servicePublicAPI.getAll(),
          annonceAPI.getAll({ limit: 2 })
        ]);
        setServices(servicesRes.data.data || []);
        setNews(newsRes.data.data || []);
      } catch (err) {
        console.error('Erreur chargement:', err);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  // On garde aussi les catégories demandées par l'utilisateur comme base de navigation
  const adminServices = [
    { title: "Acte de naissance", icon: <FiFileText />, desc: "Demande de copie intégrale ou d'extrait d'acte de naissance pour vos démarches officielles.", path: "/demande/acte-civil", tag: "État Civil" },
    { title: "Carte d’identité", icon: <FiUser />, desc: "Informations et pré-demande pour le renouvellement ou la création de votre CNI.", path: "/demande/identite", tag: "Identité" },
    { title: "Certificat de résidence", icon: <FiHome />, desc: "Attestation officielle justifiant de votre domicile sur la commune de Dembéni.", path: "/demande/residence", tag: "Urbanisme" },
    { title: "Acte de mariage", icon: <FiHeart />, desc: "Obtention de copies d'actes de mariage célébrés dans la commune.", path: "/demande/mariage", tag: "État Civil" },
    { title: "Service social", icon: <FiUsers />, desc: "Accompagnement par le CCAS pour les aides sociales et le soutien aux familles.", path: "/demande/social", tag: "Social" },
    { title: "Infos Administratives", icon: <FiInfo />, desc: "Guide complet sur vos droits, les horaires de la mairie et les permanences.", path: "/contact", tag: "Aide" },
  ];

  const filteredServices = adminServices.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const steps = [
    { number: "01", title: "Sélection", desc: "Choisissez le service dont vous avez besoin parmi notre catalogue." },
    { number: "02", title: "Formulaire", desc: "Remplissez les informations requises et joignez vos justificatifs." },
    { number: "03", title: "Suivi", desc: "Suivez l'avancement de votre dossier en temps réel depuis votre espace." },
  ];

  const advantages = [
    { icon: <FiGlobe />, title: "Disponibilité 24/7", desc: "Effectuez vos démarches à tout moment, sans contrainte d'horaire." },
    { icon: <FiClock />, title: "Gain de temps", desc: "Évitez les files d'attente physiques grâce au dépôt numérique." },
    { icon: <FiShield />, title: "Sécurisé", desc: "Vos données personnelles sont protégées et transmises en toute sécurité." },
  ];

  const faqs = [
    { q: "Quels sont les délais de traitement ?", a: "Le délai moyen est de 48h à 72h selon la complexité de la demande." },
    { q: "Quels documents dois-je fournir ?", a: "Chaque service précise la liste des pièces (CNI, justificatif de domicile, etc.) lors de la saisie." },
    { q: "Puis-je suivre l'état de ma demande ?", a: "Oui, connectez-vous à votre tableau de bord pour voir l'évolution de votre dossier." },
  ];

  return (
    <div className="min-h-screen bg-green-50 font-['Poppins'] selection:bg-green-600 selection:text-white">
      <Navbar />

      {/* 1. Hero Section - The Theme */}
      <section className="sp-hero relative pt-40 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-green-50 rounded-bl-[200px] -z-10 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-green-600 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              Mission Territoriale
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tighter"
            >
              Le rôle des services publics locaux dans la facilitation de l’accès aux droits <span className="text-green-300 underline decoration-white/30 italic">des citoyens</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90 font-medium leading-relaxed mb-10"
            >
              Au cœur de la commune de Dembéni, nos services publics locaux agissent comme un pont essentiel entre l'administration et les administrés. Nous nous engageons à simplifier chaque étape de votre vie quotidienne en rendant les services plus proches, plus rapides et plus humains.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Search Bar Real */}
      <section className="bg-white py-10 border-b border-slate-50 sticky top-20 z-30 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative max-w-2xl mx-auto group">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors text-xl" />
            <input 
              type="text" 
              placeholder="Rechercher une démarche (ex: naissance, identité...)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-5 bg-slate-50 rounded-[2rem] border-none focus:ring-4 focus:ring-green-500/10 text-slate-800 font-bold shadow-inner"
            />
          </div>
        </div>
      </section>

      {/* Services Grid Section - BACKGROUND VERT POMME LIGHT */}
      <section className="py-24 bg-green-50/80 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 text-center md:text-left">
            <div>
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Nos Services Administratifs</h2>
              <p className="text-slate-600 font-black uppercase tracking-widest text-xs">Catalogue officiel des démarches disponibles</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group bg-white p-10 rounded-[3rem] border border-green-200 shadow-xl hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-6 right-8 text-[11px] font-black text-green-800 uppercase tracking-widest bg-green-100 px-3 py-1 rounded-full">{service.tag}</div>
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl text-green-700 group-hover:bg-green-600 group-hover:text-white transition-all duration-500 mb-8 border border-green-100">
                  {service.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-green-600 transition-colors uppercase tracking-tight">{service.title}</h3>
                <p className="text-slate-800 text-sm leading-relaxed mb-8 font-bold opacity-80">
                  {service.desc}
                </p>
                <Link 
                  to={service.path} 
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-green-700 group-hover:text-green-900 border-b-2 border-green-200 group-hover:border-green-600 pb-2 transition-all"
                >
                  Voir plus <FiChevronRight />
                </Link>
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section - BG VERT POMME */}
      <section className="py-24 bg-green-100/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Comment ça marche ?</h2>
             <p className="text-slate-800 font-bold">Accédez à vos droits en trois étapes simples et rapides.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <div key={i} className="relative group text-center md:text-left">
                <span className="text-8xl font-black text-green-200 absolute -top-10 -left-6 z-0 group-hover:text-green-300 transition-colors">{step.number}</span>
                <div className="relative z-10">
                   <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{step.title}</h3>
                   <p className="text-slate-800 font-bold leading-relaxed">{step.desc}</p>
                </div>
                {i < 2 && <div className="hidden lg:block absolute top-10 -right-4 w-12 h-px bg-green-200"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Advantages - Gradient Vert/Rouge */}
      <section className="py-24 bg-green-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-[4rem] p-12 md:p-20 text-white flex flex-col lg:flex-row items-center gap-16 shadow-2xl shadow-green-900/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="lg:w-1/2 relative z-10 text-center lg:text-left">
                <h2 className="text-4xl font-black mb-6 tracking-tighter uppercase">L'avantage du Numérique</h2>
                <p className="text-green-50 mb-10 text-lg font-black italic">
                  La dématérialisation des services publics locaux permet une plus grande équité et une rapidité de traitement sans précédent pour tous les habitants.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Link to="/register" className="bg-white text-green-800 px-8 py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-green-50 transition-all shadow-xl">
                    Créer mon compte
                  </Link>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - BG VERT POMME LIGHT */}
      <section className="py-24 bg-green-50/30 border-t border-green-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4 flex items-center justify-center gap-4">
              <FiHelpCircle className="text-green-700" /> FAQ
            </h2>
            <p className="text-slate-900 font-black italic">Réponses aux questions les plus fréquentes.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-green-100 last:border-0 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full py-6 flex items-center justify-between group text-left transition-all"
                >
                  <span className={`text-lg font-black transition-all ${activeFaq === i ? 'text-green-700' : 'text-slate-900 group-hover:text-green-600'}`}>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 group-hover:bg-green-600 group-hover:text-white transition-all transform ${activeFaq === i ? 'rotate-180 bg-green-600 text-white' : ''}`}>
                    <FiChevronRight />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-slate-800 font-bold leading-relaxed">{faq.a}</p>
                    </motion.div>
                   )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPublics;
