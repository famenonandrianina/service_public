import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CursorTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0) 70%)',
        mixBlendMode: 'screen',
      }}
      animate={{
        x: mousePosition.x - 64,
        y: mousePosition.y - 64,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.8 }}
    />
  );
};

export default CursorTrail;
