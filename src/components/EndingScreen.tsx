// The Last Door V3 - Ending Screen with Next Story Progression
import React from 'react';
import { motion } from 'framer-motion';
import { Archive, RefreshCcw, ArrowRight, Grid } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';
import { ENDINGS, STORIES } from '../engine/storyData';

interface EndingScreenProps {
  onOpenStoryHub: () => void;
  onNextStory: (nextStoryId: string) => void;
}

export const EndingScreen: React.FC<EndingScreenProps> = ({
  onOpenStoryHub,
  onNextStory,
}) => {
  const currentEndingKey = useSessionStore((state) => state.currentEndingKey);
  const currentStoryId = useSessionStore((state) => state.currentStoryId);
  const restartExperience = useSessionStore((state) => state.restartExperience);
  const openArchive = useSessionStore((state) => state.openArchive);
  const totalVisits = useSessionStore((state) => state.totalVisits);

  const ending = currentEndingKey && ENDINGS[currentEndingKey]
    ? ENDINGS[currentEndingKey]
    : ENDINGS['ending_impossible_room'];

  // Determine next story in sequence
  const currentIdx = STORIES.findIndex((s) => s.id === currentStoryId);
  const nextStory = currentIdx !== -1 && currentIdx < STORIES.length - 1
    ? STORIES[currentIdx + 1]
    : null;

  return (
    <div className="relative w-screen h-screen bg-void flex flex-col items-center justify-center p-6 select-none overflow-hidden z-50">
      <div className="cinematic-vignette-blood" />
      <div className="film-grain opacity-35" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="max-w-lg w-full text-center space-y-6 z-10 p-8 border border-blood/40 bg-abyss/90 backdrop-blur-md shadow-[0_0_35px_rgba(162,13,25,0.45)]"
      >
        {/* Status */}
        <p className="font-mono text-[11px] tracking-[0.35em] text-blood-light uppercase font-bold">
          CHAPTER COMPLETED &mdash; THRESHOLD ESCAPED
        </p>

        {/* Ending Title */}
        <div className="space-y-1">
          <h1 className="font-cinematic text-lg md:text-2xl tracking-[0.25em] text-bone uppercase">
            {ending.title}
          </h1>
        </div>

        {/* Ending Tagline */}
        <div className="border-t border-b border-blood/30 py-4">
          <p className="font-cinematic text-sm md:text-base tracking-[0.2em] text-blood-distortion italic">
            "{ending.tagline}"
          </p>
        </div>

        {/* Narrative Summary */}
        <p className="font-sans text-xs md:text-sm text-bone/85 leading-relaxed font-light">
          {ending.summary}
        </p>

        {/* Memory Imprint Note */}
        <div className="bg-void/70 border-l-2 border-blood p-3 text-left">
          <p className="font-mono text-[11px] text-bone">
            RECORD: Session #{totalVisits} archived.
          </p>
          <p className="font-mono text-[10px] text-dust/70 pt-0.5">
            The house and its entities retain your memory imprint.
          </p>
        </div>

        {/* Actions Grid */}
        <div className="space-y-3 pt-2">
          {nextStory && (
            <button
              onClick={() => onNextStory(nextStory.id)}
              className="btn-blood-enter w-full py-4 text-xs font-mono uppercase tracking-[0.25em] flex items-center justify-center space-x-2 font-bold cursor-pointer"
            >
              <span>ADVANCE TO STORY 0{nextStory.number}: {nextStory.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <div className="flex gap-2">
            <button
              onClick={onOpenStoryHub}
              className="btn-cinematic flex-1 py-3 text-xs font-mono uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>CHAPTERS</span>
            </button>

            <button
              onClick={restartExperience}
              className="btn-cinematic flex-1 py-3 text-xs font-mono uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>REPLAY</span>
            </button>

            <button
              onClick={openArchive}
              className="px-4 py-3 border border-dust/20 hover:border-dust text-xs font-mono uppercase tracking-widest text-dust hover:text-bone transition-colors flex items-center justify-center space-x-1 cursor-pointer"
              title="Open Discovered Archive"
            >
              <Archive className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ARCHIVE</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Footer Return Message */}
      <div className="absolute bottom-6 font-cinematic text-[11px] text-dust/40 tracking-[0.3em] uppercase">
        THE DOOR IS CLOSED. BUT SOMETHING STILL WATCHES.
      </div>
    </div>
  );
};
