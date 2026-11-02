// The Last Door V2 - Cinematic Ending Screen
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
      <div className="cinematic-vignette-blood" />
      <div className="film-grain opacity-35" />
      <div className="crt-scanlines opacity-55" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="max-w-lg w-full text-center space-y-6 z-10 p-8 border border-blood/30 bg-abyss/85 backdrop-blur-md shadow-[0_0_30px_rgba(118,9,9,0.35)]"
      >
        {/* Session Status */}
        <p className="font-mono text-[11px] tracking-[0.35em] text-blood-light uppercase">
          SESSION COMPLETE &mdash; ARCHIVE SEALED
        </p>

        {/* Story Title */}
        <div className="space-y-1">
          <p className="font-sans text-[11px] text-dust/60 uppercase tracking-widest">
            YOU SURVIVED:
          </p>
          <h1 className="font-cinematic text-lg md:text-2xl tracking-[0.25em] text-bone uppercase">
            {STORY_TITLE}
          </h1>
        </div>

        {/* Ending Tagline */}
        <div className="border-t border-b border-blood/30 py-4">
          <p className="font-cinematic text-sm md:text-base tracking-[0.2em] text-blood-distortion italic">
            "{ending.tagline}"
          </p>
        </div>

        {/* Narrative Summary */}
        <p className="font-sans text-xs md:text-sm text-bone/80 leading-relaxed font-light">
          {ending.summary}
        </p>

        {/* Memory Imprint Note */}
        <div className="bg-void/70 border-l-2 border-blood p-3 text-left">
          <p className="font-mono text-[11px] text-bone">
            RECORD: Visit #{totalVisits} archived.
          </p>
          <p className="font-mono text-[10px] text-dust/70 pt-0.5">
            The house has permanently recorded your presence.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={restartExperience}
            className="btn-blood-enter flex-1 py-3.5 text-xs font-mono uppercase tracking-[0.25em] flex items-center justify-center space-x-2 cursor-pointer font-bold"
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
