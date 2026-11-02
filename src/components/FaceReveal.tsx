// The Last Door V2 - Sudden Face Encounter Component
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
    // Play terrifying stinger
    audioDirector.playFaceStinger();

    // Auto-complete after 550ms
    const timer = setTimeout(() => {
      onComplete();
    }, 550);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/95 select-none overflow-hidden">
      {/* Red Blood Aberration Flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.8, 0.4, 0.9, 0] }}
        transition={{ duration: 0.55 }}
        className="absolute inset-0 bg-blood/40 mix-blend-color-dodge pointer-events-none"
      />

      <motion.div
        initial={{ scale: 1.35, opacity: 0 }}
        animate={{ scale: [1.35, 1.05, 1.15], opacity: [0, 1, 0.9, 1] }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative w-full max-w-xl h-full flex items-center justify-center"
      >
        {/* Render Specific Entity Visage */}
        {entityId === 'banshee' && (
          <svg className="w-full h-full max-h-[85vh] drop-shadow-[0_0_50px_#A20D19]" viewBox="0 0 300 400">
            {/* Extremely pale face with dishevelled black hair strands */}
            <path d="M 60 20 Q 30 180 40 380 Q 80 400 90 350 Q 80 200 100 80 Z" fill="#08080a" />
            <path d="M 240 20 Q 270 180 260 380 Q 220 400 210 350 Q 220 200 200 80 Z" fill="#08080a" />
            {/* Pale skin bone head */}
            <ellipse cx="150" cy="180" rx="75" ry="110" fill="#c7c3ba" stroke="#430609" strokeWidth="4" />
            {/* Hollow black eye sockets */}
            <ellipse cx="120" cy="160" rx="18" ry="24" fill="#050505" />
            <ellipse cx="180" cy="160" rx="18" ry="24" fill="#050505" />
            {/* Glowing pinprick eyes */}
            <circle cx="120" cy="160" r="3" fill="#A20D19" />
            <circle cx="180" cy="160" r="3" fill="#A20D19" />
            {/* Unnaturally wide screaming maw */}
            <path d="M 100 230 Q 150 310 200 230 Q 150 250 100 230 Z" fill="#430609" stroke="#760909" strokeWidth="4" />
            {/* Needle teeth */}
            <polygon points="120,234 125,248 130,234" fill="#D8D6D2" />
            <polygon points="145,236 150,252 155,236" fill="#D8D6D2" />
            <polygon points="170,234 175,248 180,234" fill="#D8D6D2" />
          </svg>
        )}

        {entityId === 'hag' && (
          <svg className="w-full h-full max-h-[85vh] drop-shadow-[0_0_50px_#760909]" viewBox="0 0 300 400">
            {/* Withered crone skull */}
            <ellipse cx="150" cy="185" rx="80" ry="105" fill="#a8a398" stroke="#430609" strokeWidth="3" />
            {/* Wrinkle fissures */}
            <path d="M 110 130 Q 150 120 190 130" stroke="#430609" strokeWidth="2.5" fill="none" />
            <path d="M 105 140 Q 150 132 195 140" stroke="#430609" strokeWidth="2" fill="none" />
            {/* Milky dead eyes */}
            <ellipse cx="118" cy="165" rx="15" ry="16" fill="#e6e1d8" stroke="#760909" strokeWidth="2" />
            <ellipse cx="182" cy="165" rx="15" ry="16" fill="#e6e1d8" stroke="#760909" strokeWidth="2" />
            {/* Malicious distorted smile */}
            <path d="M 95 240 Q 150 290 205 240 Q 150 260 95 240 Z" fill="#290507" stroke="#760909" strokeWidth="3" />
          </svg>
        )}

        {entityId === 'she-devil' && (
          <svg className="w-full h-full max-h-[85vh] drop-shadow-[0_0_60px_#A20D19]" viewBox="0 0 300 400">
            {/* Dark humanoid head with subtle horn protrusions */}
            <path d="M 100 110 L 80 50 L 115 90 Z" fill="#240507" />
            <path d="M 200 110 L 220 50 L 185 90 Z" fill="#240507" />
            <ellipse cx="150" cy="190" rx="75" ry="110" fill="#1b1213" stroke="#A20D19" strokeWidth="3" />
            {/* Burning red eyes */}
            <ellipse cx="122" cy="168" rx="16" ry="12" fill="#760909" />
            <ellipse cx="178" cy="168" rx="16" ry="12" fill="#760909" />
            <circle cx="122" cy="168" r="4" fill="#ffffff" />
            <circle cx="178" cy="168" r="4" fill="#ffffff" />
            {/* Subtle smirk */}
            <path d="M 115 240 Q 150 255 185 240" stroke="#A20D19" strokeWidth="4" fill="none" />
          </svg>
        )}

        {/* Fallback entity face (Hollow Woman / Tall One / Visitor) */}
        {entityId !== 'banshee' && entityId !== 'hag' && entityId !== 'she-devil' && (
          <svg className="w-full h-full max-h-[85vh] drop-shadow-[0_0_50px_#430609]" viewBox="0 0 300 400">
            <ellipse cx="150" cy="180" rx="70" ry="115" fill="#c2beb4" stroke="#101010" strokeWidth="4" />
            {/* Deep dark void eyes */}
            <ellipse cx="118" cy="155" rx="16" ry="26" fill="#000000" />
            <ellipse cx="182" cy="155" rx="16" ry="26" fill="#000000" />
            {/* Missing mouth or slight vertical slit */}
            <line x1="150" y1="230" x2="150" y2="265" stroke="#760909" strokeWidth="3" />
          </svg>
        )}
      </motion.div>
    </div>
  );
};
