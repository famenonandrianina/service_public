import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-4 border-blue-50 rounded-full border-t-blue-600"
        ></motion.div>
        
        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-4 border-green-50 rounded-full border-t-green-500"
        ></motion.div>

        {/* Logo/Letter */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-blue-900">D</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
