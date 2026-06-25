import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, ChevronDown, LayoutDashboard, Settings, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const leftLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Démarches', path: '/demarches' },
    { name: 'Projet', path: '#' },
    { name: 'Services', path: '/services' },
  ];

  const rightLinks = [
    { name: 'Actualités', path: '/actualites' },
    { name: 'Culture', path: '#' },
    { name: 'Santé', path: '#' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-[#052e16] border-b border-white/10 shadow-2xl h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between font-['Poppins']">
        
        {/* LINKS LEFT */}
        <nav className="hidden lg:flex items-center gap-8">
          {leftLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-white/80 hover:text-white text-[11px] font-black uppercase tracking-widest transition-all"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CENTER LOGO */}
        <Link to="/" className="flex items-center gap-3 group absolute left-1/2 -translate-x-1/2">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 shadow-lg">
            <img src="/images/logo_dembeni.png" alt="Logo" className="w-full h-full object-contain bg-white p-1" />
          </div>
          <span className="text-white text-xl font-black tracking-tighter uppercase italic">DEMBENI</span>
        </Link>

        {/* LINKS RIGHT + ACTIONS */}
        <div className="flex items-center gap-12">
          <nav className="hidden lg:flex items-center gap-8">
            {rightLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white/80 hover:text-white text-[11px] font-black uppercase tracking-widest transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center border-l border-white/10 pl-12 h-6">
            <button 
              onClick={handleLogout}
              className="text-white/80 hover:text-white text-[11px] font-black uppercase tracking-widest transition-all"
            >
              Quitter
            </button>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#052e16] border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl animate-fade-in lg:hidden">
            {[...leftLinks, ...rightLinks].map((link) => (
              <Link key={link.name} to={link.path} className="text-white font-bold text-xs uppercase tracking-widest ml-4">
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 flex items-center justify-center">
              <button onClick={handleLogout} className="text-red-400 font-black text-xs uppercase">Quitter</button>
            </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
