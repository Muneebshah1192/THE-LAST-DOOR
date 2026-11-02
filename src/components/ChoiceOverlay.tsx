// The Last Door - Choice Overlay
import React from 'react';
import { motion } from 'framer-motion';
import { ChoiceOption } from '../engine/types';

interface ChoiceOverlayProps {
  choices: ChoiceOption[];
  onSelectChoice: (choiceId: string, leadsToSceneId: string, tensionImpact: number) => void;
}

export const ChoiceOverlay: React.FC<ChoiceOverlayProps> = ({ choices, onSelectChoice }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0 bg-void/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-40 select-none"
    >
      <div className="max-w-md w-full space-y-6 text-center">
        {/* Subtle Section Header */}
        <p className="font-mono text-[11px] text-dust uppercase tracking-[0.3em]">
          CHOOSE YOUR THRESHOLD
        </p>

        {/* Choice Buttons */}
        <div className="space-y-4">
          {choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => onSelectChoice(choice.id, choice.leadsToSceneId, choice.tensionImpact)}
              className="btn-cinematic w-full p-5 text-left border border-dust/20 hover:border-bone transition-all group cursor-pointer block"
            >
              <div className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-bone group-hover:text-white transition-colors">
                {choice.text}
              </div>
              {choice.subtext && (
                <div className="font-sans text-[11px] text-dust/70 pt-1 group-hover:text-dust transition-colors">
                  {choice.subtext}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Ambient warning */}
        <p className="font-cinematic text-[10px] text-dust/40 tracking-[0.2em] uppercase">
          Some doors are better left unopened.
        </p>
      </div>
    </motion.div>
  );
};
