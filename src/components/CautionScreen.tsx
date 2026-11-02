// The Last Door - Cinematic Caution & Warning Screen
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Eye, ShieldAlert, Archive } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';
import { HorrorIntensity } from '../engine/types';

export const CautionScreen: React.FC = () => {
  const enterExperience = useSessionStore((state) => state.enterExperience);
  const exitExperience = useSessionStore((state) => state.exitExperience);
  const soundEnabled = useSessionStore((state) => state.soundEnabled);
  const setSoundEnabled = useSessionStore((state) => state.setSoundEnabled);
  const reducedMotion = useSessionStore((state) => state.reducedMotion);
  const setReducedMotion = useSessionStore((state) => state.setReducedMotion);
  const theHouseRemembers = useSessionStore((state) => state.theHouseRemembers);
  const totalVisits = useSessionStore((state) => state.totalVisits);
  const openArchive = useSessionStore((state) => state.openArchive);
  const discoveredRelics = useSessionStore((state) => state.discoveredRelics);

  const [intensity, setIntensity] = useState<HorrorIntensity>('standard');
  const [isEntering, setIsEntering] = useState<boolean>(false);

  const handleEnter = () => {
    setIsEntering(true);
    enterExperience(intensity);
  };

  return (
    <div className="relative w-screen h-screen bg-abyss flex flex-col items-center justify-center p-6 select-none overflow-hidden z-40">
      {/* Background Ambience */}
      <div className="cinematic-vignette" />
      <div className="film-grain opacity-25" />

      {/* Main Caution Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        className="relative max-w-xl w-full bg-void/80 border border-dust/20 p-8 md:p-12 backdrop-blur-md shadow-2xl z-10"
      >
        {/* Subtle Crimson Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent" />

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <ShieldAlert className="w-5 h-5 text-crimson" />
          <h1 className="font-cinematic text-lg md:text-xl tracking-[0.3em] uppercase text-bone">
            Caution
          </h1>
        </div>

        {/* Narrative / Warning Prose */}
        <div className="space-y-4 text-xs md:text-sm text-bone/85 leading-relaxed font-sans mb-8">
          <p>
            This experience contains fictional psychological horror, atmospheric dread, darkness, 
            sudden auditory shifts, and simulated unsettling phenomena.
          </p>
          <p className="text-dust">
            It does not simulate real-world emergencies, access your hardware, or utilize manipulative trickery. 
            However, if you are sensitive to heightened tension or sensory darkness, you may leave at any time.
          </p>

          {theHouseRemembers && (
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 border-l-2 border-crimson bg-crimson-deep/20 text-xs font-mono text-bone/90"
            >
              <span className="text-crimson font-semibold">NOTE:</span> You have entered this threshold before (Visit #{totalVisits}). 
              The environment may reflect your past presence.
            </motion.div>
          )}
        </div>

        {/* Configuration Controls */}
        <div className="border-t border-dust/15 pt-6 space-y-5 mb-8 text-xs font-mono">
          {/* Intensity Selection */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-dust uppercase tracking-wider">Horror Intensity:</span>
            <div className="flex space-x-2">
              {(['mild', 'standard', 'intense'] as HorrorIntensity[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setIntensity(level)}
                  className={`px-3 py-1.5 uppercase tracking-wider text-[11px] border transition-all ${
                    intensity === level
                      ? 'border-bone bg-dust/20 text-bone font-medium'
                      : 'border-dust/25 text-dust/60 hover:border-dust/50'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Sound & Motion Toggles */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center space-x-2 text-dust hover:text-bone transition-colors"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-bone" />
                  <span>AUDIO: ENABLED</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-crimson" />
                  <span>AUDIO: MUTED</span>
                </>
              )}
            </button>

            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className="flex items-center space-x-2 text-dust hover:text-bone transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>MOTION: {reducedMotion ? 'REDUCED' : 'NATURAL'}</span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            onClick={handleEnter}
            disabled={isEntering}
            className="btn-cinematic flex-1 py-4 text-xs md:text-sm tracking-[0.3em] uppercase font-mono font-medium text-center border-bone/30 hover:border-bone cursor-pointer"
          >
            {isEntering ? 'ESTABLISHING THRESHOLD...' : 'ENTER'}
          </button>

          <button
            onClick={exitExperience}
            className="px-6 py-4 text-xs tracking-[0.2em] uppercase font-mono text-dust/70 hover:text-crimson border border-dust/20 hover:border-crimson/50 transition-colors cursor-pointer"
          >
            EXIT
          </button>

          {discoveredRelics.length > 0 && (
            <button
              onClick={openArchive}
              className="flex items-center justify-center space-x-2 px-4 py-4 text-xs tracking-wider font-mono text-dust hover:text-bone border border-dust/20 hover:border-dust/40 transition-colors cursor-pointer"
              title="Open Discovered Archive"
            >
              <Archive className="w-4 h-4" />
              <span className="hidden sm:inline">ARCHIVE</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Subtle Tagline Footer */}
      <div className="absolute bottom-6 text-center text-[11px] text-dust/40 font-cinematic tracking-[0.25em] uppercase">
        You can leave whenever you want. But something may remember that you were here.
      </div>
    </div>
  );
};
