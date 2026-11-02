// The Last Door - Cinematic Transition Screen
import React from 'react';
import { motion } from 'framer-motion';

export const TransitionScreen: React.FC = () => {
  return (
    <div className="relative w-screen h-screen bg-void flex items-center justify-center overflow-hidden z-50 select-none">
      <div className="cinematic-vignette" />
      <div className="film-grain opacity-30" />
      <div className="crt-scanlines opacity-40" />

      {/* Cinematic Flashlight Sweep or Darkness Pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0] }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
        className="w-2.5 h-2.5 rounded-full bg-bone/80 shadow-[0_0_16px_rgba(212,206,190,0.8)]"
      />

      <div className="absolute bottom-10 font-mono text-[10px] tracking-[0.3em] text-dust/40 uppercase">
        CROSSING THRESHOLD...
      </div>
    </div>
  );
};
