// The Last Door V2 - Cinematic Transition Screen with Sudden Face Encounter
import React from 'react';
import { motion } from 'framer-motion';
import { useSessionStore } from '../store/sessionStore';
import { FaceReveal } from './FaceReveal';

export const TransitionScreen: React.FC = () => {
  const transitionFaceEncounter = useSessionStore((state) => state.transitionFaceEncounter);
  const clearTransitionEncounter = useSessionStore((state) => state.clearTransitionEncounter);

  return (
    <div className="relative w-screen h-screen bg-void flex items-center justify-center overflow-hidden z-50 select-none">
      <div className="cinematic-vignette-blood" />
      <div className="film-grain opacity-40" />

      {/* SUDDEN FACE ENCOUNTER (If triggered during door approach!) */}
      {transitionFaceEncounter ? (
        <FaceReveal
          entityId={transitionFaceEncounter}
          onComplete={clearTransitionEncounter}
        />
      ) : (
        <>
          {/* Cinematic Threshold Light Sweep */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.95, 0], scale: [0.5, 1.8, 0] }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="w-3 h-3 rounded-full bg-bone shadow-[0_0_25px_#A20D19]"
          />

          <div className="absolute bottom-10 font-mono text-[10px] tracking-[0.3em] text-dust/60 uppercase">
            APPROACHING THRESHOLD...
          </div>
        </>
      )}
    </div>
  );
};
