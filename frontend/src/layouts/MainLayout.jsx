import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiInfo, FiSearch, FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: "Accueil", path: "/" },
    { title: "Services", path: "/services" },
    { title: "Actualités", path: "/actualites" },
    { title: "Démarches", path: "/demarches" },
    { title: "À Propos", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/40 backdrop-blur-md border-b border-white/20 py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl">D</div>
          <span className={`font-black text-2xl tracking-tighter uppercase text-slate-900`}>Dembéni</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-bold transition-colors ${
                location.pathname === link.path 
                  ? 'text-emerald-600 border-b-2 border-emerald-600' 
                  : 'text-slate-700 hover:text-emerald-600'
              }`}
            >
              {link.title}
            </Link>
          ))}
          <Link 
            to={user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/login'} 
            className={`px-6 py-2.5 rounded-xl font-black transition-all transform hover:scale-105 active:scale-95 shadow-lg uppercase text-xs tracking-widest bg-emerald-600 text-white hover:bg-emerald-700`}
          >
            {user ? 'Mon Espace' : 'Connexion'}
          </Link>
        </div>

        {/* Mobile button */}
        <button className="md:hidden text-2xl text-slate-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-slate-700 font-medium hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
              <Link to="/login" className="btn-primary text-center" onClick={() => setIsOpen(false)}>Mon Espace</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-teal-950 via-green-950 to-emerald-950 text-slate-300 pt-16 pb-8 border-t border-green-800/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold flex items-center space-x-2">
              <span className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-sm">D</span>
              <span>Mairie de Dembéni</span>
            </h3>
            <p className="text-slate-300/80 text-sm">
              Simplifier les démarches administratives et favoriser le développement local pour tous nos citoyens.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-400 transition-colors text-xl"><FiFacebook /></a>
              <a href="#" className="hover:text-green-300 transition-colors text-xl"><FiTwitter /></a>
              <a href="#" className="hover:text-pink-400 transition-colors text-xl"><FiInstagram /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="hover:text-white transition-colors">Nos Services</Link></li>
              <li><Link to="/actualites" className="hover:text-white transition-colors">Actualités</Link></li>
              <li><Link to="/demarches" className="hover:text-white transition-colors">Démarches</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">La Commune</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Services Publics</h4>
            <ul className="space-y-3">
              <li>Maison France Services</li>
              <li>CADEMA - Déchets</li>
              <li>Épicerie Solidaire</li>
              <li>Aide Sociale</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FiMapPin className="text-green-400" />
                <span>1 Place de la Mairie, 97660 Dembéni</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="text-green-400" />
                <span>02 69 61 11 11</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="text-green-400" />
                <span>Dembénimairie@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-800/30 pt-8 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Mairie de Dembéni. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
