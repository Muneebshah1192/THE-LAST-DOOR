// The Last Door V2 - Cinematic Caution & Warning Screen
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
  const volume = useSessionStore((state) => state.volume);
  const setVolume = useSessionStore((state) => state.setVolume);
  const reducedMotion = useSessionStore((state) => state.reducedMotion);
  const setReducedMotion = useSessionStore((state) => state.setReducedMotion);
  const theHouseRemembers = useSessionStore((state) => state.theHouseRemembers);
  const totalVisits = useSessionStore((state) => state.totalVisits);
  const openArchive = useSessionStore((state) => state.openArchive);

  const [intensity, setIntensity] = useState<HorrorIntensity>('standard');
  const [isEntering, setIsEntering] = useState<boolean>(false);

  const handleEnter = () => {
    setIsEntering(true);
    enterExperience(intensity);
  };

  return (
    <div className="relative w-screen h-screen bg-void flex flex-col items-center justify-center p-6 select-none overflow-hidden z-40">
      <div className="cinematic-vignette-blood" />
      <div className="film-grain opacity-35" />

      {/* Main Caution Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        className="relative max-w-xl w-full bg-abyss/90 border border-dust/20 p-8 md:p-12 backdrop-blur-md shadow-2xl z-10"
      >
        {/* Blood-Red Accent Top Edge */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blood-crimson to-transparent" />

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <ShieldAlert className="w-5 h-5 text-blood-crimson" />
          <h1 className="font-cinematic text-lg md:text-xl tracking-[0.3em] uppercase text-bone">
            Cautionary Notice
          </h1>
        </div>

        {/* Warning Prose */}
        <div className="space-y-4 text-xs md:text-sm text-bone/90 leading-relaxed font-sans mb-8">
          <p>
            This experience contains fictional psychological dread, supernatural entities, sudden sensory shifts, 
            darkness, and simulated unsettling phenomena.
          </p>
          <p className="text-dust">
            It does not simulate real-world emergencies or access private hardware. 
            However, if you are sensitive to heightened suspense, you may leave at any time.
          </p>

          {theHouseRemembers && (
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 border-l-2 border-blood bg-blood-dried/30 text-xs font-mono text-bone"
            >
              <span className="text-blood-light font-bold">RE-ENTRY RECOGNIZED:</span> Visit #{totalVisits + 1}. 
              The house has adjusted its interior to reflect your previous choices.
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
                  className={`px-3 py-1.5 uppercase tracking-wider text-[11px] border transition-all cursor-pointer ${
                    intensity === level
                      ? 'border-blood-crimson bg-blood-dried/40 text-bone font-medium shadow-[0_0_10px_rgba(162,13,25,0.4)]'
                      : 'border-dust/25 text-dust/60 hover:border-dust/50'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-dust uppercase tracking-wider">Sound Volume:</span>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={soundEnabled ? volume : 0}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setVolume(val);
                  if (val > 0 && !soundEnabled) setSoundEnabled(true);
                }}
                className="w-24 h-1.5 accent-blood cursor-pointer bg-charcoal"
              />
              <span className="text-[11px] text-bone w-8">{Math.round(volume * 100)}%</span>
            </div>
          </div>

          {/* Sound & Motion Toggles */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center space-x-2 text-dust hover:text-bone transition-colors cursor-pointer"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-bone" />
                  <span>AUDIO: ENABLED</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-blood-light" />
                  <span>AUDIO: MUTED</span>
                </>
              )}
            </button>

            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className="flex items-center space-x-2 text-dust hover:text-bone transition-colors cursor-pointer"
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
            className="btn-blood-enter flex-1 py-4 text-xs md:text-sm tracking-[0.3em] uppercase font-mono font-bold text-center cursor-pointer"
          >
            {isEntering ? 'UNSEALING THRESHOLD...' : 'ENTER'}
          </button>

          <button
            onClick={exitExperience}
            className="px-6 py-4 text-xs tracking-[0.2em] uppercase font-mono text-dust/70 hover:text-blood-light border border-dust/20 hover:border-blood/50 transition-colors cursor-pointer"
          >
            EXIT
          </button>

          <button
            onClick={openArchive}
            className="flex items-center justify-center space-x-2 px-4 py-4 text-xs tracking-wider font-mono text-dust hover:text-bone border border-dust/20 hover:border-dust/40 transition-colors cursor-pointer"
            title="Open Discovered Archive"
          >
            <Archive className="w-4 h-4" />
            <span className="hidden sm:inline">ARCHIVE</span>
          </button>
        </div>
      </motion.div>

      {/* Footer Tagline */}
      <div className="absolute bottom-6 text-center text-[11px] text-dust/40 font-cinematic tracking-[0.25em] uppercase">
        You can leave whenever you want. But something may remember that you were here.
      </div>
    </div>
  );
};
