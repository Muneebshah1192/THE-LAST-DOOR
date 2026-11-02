// The Last Door V2 - Peripheral Vision Anomalies
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionStore } from '../store/sessionStore';
import { audioDirector } from '../engine/audioDirector';

export const PeripheralAnomaly: React.FC = () => {
  const tensionLevel = useSessionStore((state) => state.tensionLevel);
  const flashlightPos = useSessionStore((state) => state.flashlightPos);

  const [activeCorner, setActiveCorner] = useState<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | null>(null);

  useEffect(() => {
    // Only triggers above mild tension
    if (tensionLevel < 35) return;

    const interval = setInterval(() => {
      // 25% chance every 14 seconds to trigger a peripheral phantom
      if (!activeCorner && Math.random() < 0.3) {
        const corners: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[] = [
          'top-left', 'top-right', 'bottom-left', 'bottom-right'
        ];
        const picked = corners[Math.floor(Math.random() * corners.length)];
        setActiveCorner(picked);
        audioDirector.playGhostWhisper(picked.includes('left') ? -0.7 : 0.7);

        // Auto-vanish after 4 seconds
        setTimeout(() => {
          setActiveCorner(null);
        }, 3800);
      }
    }, 14000);

    return () => clearInterval(interval);
  }, [tensionLevel, activeCorner]);

  // If user shines flashlight directly into that corner, anomaly immediately flees!
  useEffect(() => {
    if (!activeCorner) return;

    const isShiningOnCorner = 
      (activeCorner === 'top-left' && flashlightPos.x < 30 && flashlightPos.y < 30) ||
      (activeCorner === 'top-right' && flashlightPos.x > 70 && flashlightPos.y < 30) ||
      (activeCorner === 'bottom-left' && flashlightPos.x < 30 && flashlightPos.y > 70) ||
      (activeCorner === 'bottom-right' && flashlightPos.x > 70 && flashlightPos.y > 70);

    if (isShiningOnCorner) {
      // Vanish instantly!
      audioDirector.playFloorCreak(flashlightPos.x < 50 ? -0.5 : 0.5);
      setActiveCorner(null);
    }
  }, [flashlightPos, activeCorner]);

  if (!activeCorner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        exit={{ opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 0.6 }}
        className={`absolute z-35 pointer-events-none ${
          activeCorner === 'top-left' ? 'top-4 left-4' :
          activeCorner === 'top-right' ? 'top-4 right-4' :
          activeCorner === 'bottom-left' ? 'bottom-8 left-4' :
          'bottom-8 right-4'
        }`}
      >
        <svg className="w-24 h-36 opacity-75 drop-shadow-[0_0_15px_#760909]" viewBox="0 0 100 150">
          {/* Distorted shadow silhouette peeking into viewport */}
          <ellipse cx="50" cy="40" rx="16" ry="22" fill="#030304" />
          <path d="M 35 60 Q 50 55 65 60 L 80 145 L 20 145 Z" fill="#08080a" />
          {/* Faint red ocular glint */}
          <circle cx="46" cy="38" r="1.5" fill="#A20D19" />
          <circle cx="54" cy="38" r="1.5" fill="#A20D19" />
        </svg>
      </motion.div>
    </AnimatePresence>
  );
};
