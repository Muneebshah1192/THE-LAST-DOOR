// The Last Door V3 - Sudden Face Reveal Component
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { EntityId } from '../engine/creatureDirector';
import { audioDirector } from '../engine/audioDirector';

interface FaceRevealProps {
  entityId: EntityId;
  onComplete: () => void;
}

export const FaceReveal: React.FC<FaceRevealProps> = ({ entityId, onComplete }) => {
  useEffect(() => {
    audioDirector.playFaceStinger();

    const timer = setTimeout(() => {
      onComplete();
    }, 600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/98 select-none overflow-hidden">
      {/* Blood Flash Aberration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.85, 0.3, 0.95, 0] }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-blood/50 mix-blend-color-dodge pointer-events-none"
      />

      <motion.div
        initial={{ scale: 1.4, opacity: 0 }}
        animate={{ scale: [1.4, 1.05, 1.15], opacity: [0, 1, 0.95, 1] }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-2xl h-full flex items-center justify-center"
      >
        {/* If banshee, render the real generated banshee demon image */}
        {entityId === 'banshee' ? (
          <div className="relative w-full max-w-lg h-[80vh] flex items-center justify-center">
            <img
              src="/assets/horror/creatures/banshee/banshee.jpg"
              alt="Terrifying Banshee Visage"
              className="w-full h-full object-contain mix-blend-screen drop-shadow-[0_0_60px_#A20D19] filter contrast-125 brightness-110"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        ) : entityId === 'hag' ? (
          <svg className="w-full h-full max-h-[85vh] drop-shadow-[0_0_55px_#760909]" viewBox="0 0 300 400">
            <ellipse cx="150" cy="185" rx="80" ry="105" fill="#a8a398" stroke="#430609" strokeWidth="4" />
            <path d="M 110 130 Q 150 120 190 130" stroke="#430609" strokeWidth="3" fill="none" />
            <ellipse cx="118" cy="165" rx="15" ry="16" fill="#e6e1d8" stroke="#760909" strokeWidth="2.5" />
            <ellipse cx="182" cy="165" rx="15" ry="16" fill="#e6e1d8" stroke="#760909" strokeWidth="2.5" />
            <path d="M 95 240 Q 150 290 205 240 Q 150 260 95 240 Z" fill="#290507" stroke="#760909" strokeWidth="4" />
          </svg>
        ) : (
          <svg className="w-full h-full max-h-[85vh] drop-shadow-[0_0_60px_#A20D19]" viewBox="0 0 300 400">
            <path d="M 100 110 L 80 50 L 115 90 Z" fill="#430609" />
            <path d="M 200 110 L 220 50 L 185 90 Z" fill="#430609" />
            <ellipse cx="150" cy="190" rx="75" ry="110" fill="#1b1213" stroke="#A20D19" strokeWidth="3.5" />
            <ellipse cx="122" cy="168" rx="16" ry="12" fill="#760909" />
            <ellipse cx="178" cy="168" rx="16" ry="12" fill="#760909" />
            <circle cx="122" cy="168" r="4.5" fill="#ffffff" />
            <circle cx="178" cy="168" r="4.5" fill="#ffffff" />
            <path d="M 115 240 Q 150 260 185 240" stroke="#A20D19" strokeWidth="4" fill="none" />
          </svg>
        )}
      </motion.div>
    </div>
  );
};
