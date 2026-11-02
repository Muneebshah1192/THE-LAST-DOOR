// The Last Door - Cinematic Ending Screen
import React from 'react';
import { motion } from 'framer-motion';
import { Archive, RefreshCcw } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';
import { ENDINGS, STORY_TITLE } from '../engine/storyData';

export const EndingScreen: React.FC = () => {
  const currentEndingKey = useSessionStore((state) => state.currentEndingKey);
  const restartExperience = useSessionStore((state) => state.restartExperience);
  const openArchive = useSessionStore((state) => state.openArchive);
  const totalVisits = useSessionStore((state) => state.totalVisits);

  const ending = currentEndingKey ? ENDINGS[currentEndingKey] : ENDINGS['ending_impossible_room'];

  return (
    <div className="relative w-screen h-screen bg-void flex flex-col items-center justify-center p-6 select-none overflow-hidden z-50">
      <div className="cinematic-vignette" />
      <div className="film-grain opacity-30" />
      <div className="crt-scanlines opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="max-w-lg w-full text-center space-y-6 z-10 p-8 border border-dust/15 bg-abyss/80 backdrop-blur-md"
      >
        {/* Session Status */}
        <p className="font-mono text-[11px] tracking-[0.35em] text-dust uppercase">
          SESSION COMPLETE &mdash; ARCHIVE SEALED
        </p>

        {/* Story Title */}
        <div className="space-y-1">
          <p className="font-sans text-[11px] text-dust/60 uppercase tracking-widest">
            YOU EXPERIENCED:
          </p>
          <h1 className="font-cinematic text-lg md:text-2xl tracking-[0.25em] text-bone uppercase">
            {STORY_TITLE}
          </h1>
        </div>

        {/* Ending Tagline */}
        <div className="border-t border-b border-dust/15 py-4">
          <p className="font-cinematic text-sm md:text-base tracking-[0.2em] text-bone/90 italic">
            "{ending.tagline}"
          </p>
        </div>

        {/* Narrative Summary */}
        <p className="font-sans text-xs md:text-sm text-dust/80 leading-relaxed font-light">
          {ending.summary}
        </p>

        {/* Memory Imprint Note */}
        <div className="bg-void/60 border-l-2 border-crimson p-3 text-left">
          <p className="font-mono text-[11px] text-bone/80">
            RECORD: Visit #{totalVisits} archived.
          </p>
          <p className="font-mono text-[10px] text-dust/60 pt-0.5">
            Your footprints remain embedded in the floorboards.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={restartExperience}
            className="btn-cinematic flex-1 py-3.5 text-xs font-mono uppercase tracking-[0.25em] flex items-center justify-center space-x-2 cursor-pointer"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>RETURN</span>
          </button>

          <button
            onClick={openArchive}
            className="px-5 py-3.5 border border-dust/25 hover:border-dust text-xs font-mono uppercase tracking-widest text-dust hover:text-bone transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Archive className="w-3.5 h-3.5" />
            <span>MY ARCHIVE</span>
          </button>
        </div>
      </motion.div>

      {/* Footer Return Message */}
      <div className="absolute bottom-6 font-cinematic text-[11px] text-dust/40 tracking-[0.3em] uppercase">
        RETURN TOMORROW. SOMETHING MAY BE WAITING.
      </div>
    </div>
  );
};
