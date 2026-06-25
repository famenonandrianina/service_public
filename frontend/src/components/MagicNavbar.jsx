import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiGrid, FiBell, FiUser, FiInfo } from 'react-icons/fi';

const MagicNavbar = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  const menus = [
    { title: "Accueil", icon: <FiHome />, path: "/", x: "0" },
    { title: "Services", icon: <FiGrid />, path: "/services", x: "1" },
    { title: "Actualités", icon: <FiBell />, path: "/actualites", x: "2" },
    { title: "À Propos", icon: <FiInfo />, path: "/about", x: "3" },
    { title: "Moi", icon: <FiUser />, path: "/dashboard", x: "4" },
  ];

  useEffect(() => {
    const currentIndex = menus.findIndex(m => m.path === location.pathname);
    if (currentIndex !== -1) setActiveIndex(currentIndex);
  }, [location.pathname]);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] hidden md:block">
      <div className="relative flex bg-white/80 backdrop-blur-md h-[4rem] w-[45rem] px-8 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.1)] items-center border border-white/50">
        
        {/* The Magic Indicator Circle ( Now at the bottom ) */}
        <motion.span 
          className="absolute h-14 w-14 bg-emerald-600 rounded-full bottom-[-30%] border-4 border-white flex items-center justify-center text-white text-xl shadow-lg"
          animate={{ x: (activeIndex * 85) + 32 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="text-white">
            {menus[activeIndex].icon}
          </div>
        </motion.span>

        {/* Menu Items */}
        <ul className="flex w-full justify-between items-center px-4">
          <li className="mr-8 flex items-center gap-2">
             <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">D</div>
             <span className="font-black text-emerald-900 tracking-tighter uppercase text-sm">Dembéni</span>
          </li>
          {menus.map((menu, i) => (
            <li key={i} className="w-20">
              <Link 
                to={menu.path}
                className="flex flex-col items-center justify-center w-full h-full"
                onClick={() => setActiveIndex(i)}
              >
                <span className={`text-lg transition-all duration-500 ${i === activeIndex ? 'translate-y-[-100%] opacity-0' : 'text-slate-400 hover:text-emerald-500'}`}>
                  {menu.icon}
                </span>
                <span className={`text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${i === activeIndex ? 'translate-y-[2px] opacity-100 text-emerald-600' : 'opacity-0'}`}>
                  {menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* SVG for the curve effect ( notch ) */}
      <style jsx>{`
        .indicator-curve {
          position: absolute;
          width: 70px;
          height: 70px;
          background: transparent;
          top: -50%;
          border-radius: 50%;
          box-shadow: 0 10px 0 0 #fff;
        }
      `}</style>
    </div>
  );
};

export default MagicNavbar;
