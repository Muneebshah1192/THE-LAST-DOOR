// The Last Door V3 - Story Selection Universe Hub
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Play, ArrowLeft, Skull } from 'lucide-react';
import { STORIES, StoryOverview } from '../engine/storyData';
import { useSessionStore } from '../store/sessionStore';

interface StorySelectHubProps {
  onSelectStory: (storyId: string) => void;
  onBackToCaution: () => void;
}

export const StorySelectHub: React.FC<StorySelectHubProps> = ({
  onSelectStory,
  onBackToCaution,
}) => {
  const completedStories = useSessionStore((state) => state.discoveredRelics); // or completed stories from memory
  const totalVisits = useSessionStore((state) => state.totalVisits);

  // Logic: Story 1 is always unlocked. Story N is unlocked if Story N-1 was completed or totalVisits > 0
  const isStoryUnlocked = (story: StoryOverview, index: number): boolean => {
    if (index === 0) return true;
    if (totalVisits >= index) return true;
    // Check if this or previous story completed
    const prevStoryId = STORIES[index - 1].id;
    return completedStories.some((r) => r.includes(prevStoryId) || r.includes(story.id)) || totalVisits >= 1;
  };

  return (
    <div className="fixed inset-0 bg-void z-50 flex flex-col items-center justify-center p-6 select-none overflow-y-auto">
      <div className="cinematic-vignette-blood" />
      <div className="film-grain opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full z-10 space-y-6 my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blood/30 pb-4">
          <div>
            <p className="font-mono text-[10px] text-blood-light uppercase tracking-[0.3em]">
              THE LAST DOOR &mdash; UNIVERSE DOSSIER
            </p>
            <h1 className="font-cinematic text-xl md:text-2xl text-bone tracking-[0.25em] uppercase pt-1">
              Select A Chapter
            </h1>
          </div>
          <button
            onClick={onBackToCaution}
            className="flex items-center space-x-1.5 text-xs font-mono text-dust hover:text-bone border border-dust/20 px-3 py-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK</span>
          </button>
        </div>

        {/* 5 Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STORIES.map((story, idx) => {
            const unlocked = isStoryUnlocked(story, idx);

            return (
              <div
                key={story.id}
                className={`p-5 border flex flex-col justify-between transition-all ${
                  unlocked
                    ? 'border-blood/40 bg-abyss/85 hover:border-blood-crimson hover:shadow-[0_0_20px_rgba(162,13,25,0.4)]'
                    : 'border-dust/10 bg-void/50 opacity-50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-blood-light font-bold">CHAPTER 0{story.number}</span>
                    <span className="flex items-center space-x-1 text-dust">
                      {unlocked ? (
                        <>
                          <Unlock className="w-3 h-3 text-bone" />
                          <span className="text-bone">AVAILABLE</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3 h-3" />
                          <span>LOCKED</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="font-cinematic text-base text-bone tracking-widest uppercase">
                    {story.title}
                  </h3>

                  <p className="font-cinematic text-xs text-blood-distortion italic line-clamp-2">
                    "{story.tagline}"
                  </p>

                  <div className="text-[11px] font-mono text-dust/80 space-y-1 pt-2 border-t border-dust/10">
                    <p><span className="text-dust/50">LOCATION:</span> {story.location}</p>
                    <p className="flex items-center space-x-1">
                      <Skull className="w-3 h-3 text-blood-crimson" />
                      <span className="text-bone/90">{story.primaryDevil}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-5">
                  {unlocked ? (
                    <button
                      onClick={() => onSelectStory(story.id)}
                      className="btn-blood-enter w-full py-2.5 text-xs font-mono uppercase tracking-[0.2em] flex items-center justify-center space-x-2 font-bold cursor-pointer"
                    >
                      <Play className="w-3 h-3" />
                      <span>ENTER CHAPTER</span>
                    </button>
                  ) : (
                    <div className="w-full py-2.5 text-center text-[10px] font-mono uppercase tracking-widest text-dust/40 border border-dust/10">
                      ESCAPE PREVIOUS CHAPTER TO UNLOCK
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
