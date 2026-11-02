// The Last Door - Cinematic Opening Sequence
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionStore } from '../store/sessionStore';

export const OpeningSequence: React.FC = () => {
  const proceed = useSessionStore((state) => state.proceedFromOpening);
  const theHouseRemembers = useSessionStore((state) => state.theHouseRemembers);
  const totalVisits = useSessionStore((state) => state.totalVisits);

  const [step, setStep] = useState<number>(0);
  const [timestamp, setTimestamp] = useState<string>('');

  useEffect(() => {
    // Generate authentic local timestamp
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
    setTimestamp(timeStr);

    const timers: NodeJS.Timeout[] = [];

    // Step 0: Darkness (0 - 1800ms)
    timers.push(setTimeout(() => setStep(1), 1800)); // "ARCHIVE RECOVERED"
    timers.push(setTimeout(() => setStep(2), 3400)); // Timestamp & "LAST KNOWN LOCATION: UNKNOWN"
    timers.push(setTimeout(() => setStep(3), 5200)); // Flicker & "DO YOU WANT TO CONTINUE?"
    timers.push(setTimeout(() => setStep(4), 6800)); // Reveal proceed button

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-void flex flex-col items-center justify-center overflow-hidden z-50">
      {/* Subtle CRT scanline effect */}
      <div className="crt-scanlines opacity-40 pointer-events-none" />
      <div className="film-grain opacity-25 pointer-events-none" />

      {/* Tiny signal dot */}
      {step >= 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.2, 1, 0.4, 0.9], scale: 1 }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-bone mb-8 shadow-[0_0_8px_rgba(212,206,190,0.8)]"
        />
      )}

      {/* Narrative Sequence */}
      <div className="text-center font-mono space-y-4 max-w-md px-6 tracking-widest text-xs md:text-sm">
        <AnimatePresence>
          {step >= 1 && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-dust"
            >
              SIGNAL DETECTED &mdash; ARCHIVE RECOVERED
            </motion.p>
          )}

          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1.0 }}
              className="space-y-1 text-dust/70 text-[11px]"
            >
              <p>RECORDING TIMESTAMP: {timestamp}</p>
              <p className="text-bone/80">LAST KNOWN LOCATION: UNKNOWN</p>
              {theHouseRemembers && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  className="text-crimson font-medium pt-1 tracking-wider"
                >
                  [RE-ENTRY ATTEMPT #{totalVisits + 1} DETECTED]
                </motion.p>
              )}
            </motion.div>
          )}

          {step >= 3 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.9, 0.5, 1] }}
              transition={{ duration: 0.8 }}
              className="text-bone pt-6 text-sm md:text-base tracking-widest uppercase font-cinematic"
            >
              Do you want to continue?
            </motion.p>
          )}

          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="pt-6"
            >
              <button
                onClick={proceed}
                className="btn-cinematic px-8 py-3 text-xs tracking-[0.25em] uppercase hover:tracking-[0.3em] font-mono cursor-pointer"
              >
                PROCEED
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footnote */}
      <div className="absolute bottom-6 text-[10px] text-dust/40 font-mono tracking-widest">
        SYSTEM DESIGNATION: THE LAST DOOR
      </div>
    </div>
  );
};
