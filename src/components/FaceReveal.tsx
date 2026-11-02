// The Last Door V3 - Sudden Face Reveal Component with Animated Visuals
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EntityId } from '../engine/creatureDirector';
import { audioDirector } from '../engine/audioDirector';
import { getRandomFaceEncounter, HorrorAsset } from '../engine/assetRegistry';
import { HorrorMedia } from './HorrorMedia';

interface FaceRevealProps {
  entityId: EntityId;
  onComplete: () => void;
}

export const FaceReveal: React.FC<FaceRevealProps> = ({ entityId, onComplete }) => {
  const [activeAsset, setActiveAsset] = useState<HorrorAsset | null>(null);

  useEffect(() => {
    audioDirector.playFaceStinger();
    audioDirector.playBloodcurdlingScream();
    audioDirector.playPiercingShriek();
    const asset = getRandomFaceEncounter();
    setActiveAsset(asset);

    const timer = setTimeout(() => {
      onComplete();
    }, 650);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/98 select-none overflow-hidden">
      {/* Blood Flash Aberration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.85, 0.3, 0.95, 0] }}
        transition={{ duration: 0.65 }}
        className="absolute inset-0 bg-blood/50 mix-blend-color-dodge pointer-events-none"
      />

      <motion.div
        initial={{ scale: 1.4, opacity: 0 }}
        animate={{ scale: [1.4, 1.05, 1.2], opacity: [0, 1, 0.95, 1] }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="relative w-full max-w-2xl h-full flex items-center justify-center"
      >
        {/* If banshee, render the real generated banshee demon asset */}
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
        ) : activeAsset ? (
          <div className="relative w-full max-w-lg h-[80vh] flex items-center justify-center drop-shadow-[0_0_70px_#A20D19]">
            <HorrorMedia
              asset={activeAsset}
              className="w-full h-full object-contain filter contrast-125"
            />
          </div>
        ) : (
          <svg className="w-full h-full max-h-[85vh] drop-shadow-[0_0_60px_#A20D19]" viewBox="0 0 300 400">
            <ellipse cx="150" cy="180" rx="85" ry="115" fill="#050505" stroke="#A20D19" strokeWidth="4" />
            <circle cx="120" cy="160" r="14" fill="#a20d19" />
            <circle cx="180" cy="160" r="14" fill="#a20d19" />
            <ellipse cx="150" cy="245" rx="28" ry="42" fill="#000000" stroke="#760909" strokeWidth="3" />
          </svg>
        )}
      </motion.div>
    </div>
  );
};
