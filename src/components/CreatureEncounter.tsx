// The Last Door V3 - In-Scene Terrifying Devil & Creature Encounter Renderer
import React from 'react';
import { motion } from 'framer-motion';
import { EntityId } from '../engine/creatureDirector';

interface CreatureEncounterProps {
  entityId: EntityId;
  sceneId: string;
  isFlashlightFocused: boolean;
}

export const CreatureEncounter: React.FC<CreatureEncounterProps> = ({
  entityId,
  isFlashlightFocused,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isFlashlightFocused ? 0.4 : 0.9 }}
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.7 }}
      className="absolute inset-0 pointer-events-none flex items-center justify-center z-25 overflow-hidden"
    >
      {/* 1. THE BANSHEE (Photorealistic high-horror image with blood red aura) */}
      {entityId === 'banshee' && (
        <div className="absolute right-[20%] top-[25%] w-64 h-96 drop-shadow-[0_0_35px_#A20D19]">
          <img
            src="/assets/horror/creatures/banshee/banshee.jpg"
            alt="The Banshee"
            className="w-full h-full object-contain mix-blend-screen opacity-90 filter contrast-125 brightness-95"
            onError={(e) => {
              // Fallback SVG if image not found
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      )}

      {/* 2. THE WEEPING BRIDE (Corner sobbing ghost) */}
      {entityId === 'weeping-bride' && (
        <div className="absolute left-[16%] bottom-[12%] w-60 h-96">
          <svg className="w-full h-full opacity-85 drop-shadow-[0_0_20px_#430609]" viewBox="0 0 120 220">
            <path d="M 50 50 Q 20 140 10 210 Q 60 220 110 210 Q 100 140 70 50 Z" fill="#d2cec4" opacity="0.45" stroke="#777777" strokeWidth="1" />
            <ellipse cx="60" cy="35" rx="14" ry="18" fill="#aba598" opacity="0.75" />
            <path d="M 46 22 Q 35 70 42 120" stroke="#050505" strokeWidth="4" fill="none" />
            <path d="M 74 22 Q 85 70 78 120" stroke="#050505" strokeWidth="4" fill="none" />
            {/* Dark tears running down veil */}
            <line x1="56" y1="36" x2="54" y2="60" stroke="#430609" strokeWidth="1.5" />
            <line x1="64" y1="36" x2="66" y2="60" stroke="#430609" strokeWidth="1.5" />
          </svg>
        </div>
      )}

      {/* 3. THE SHE-DEVIL (Demonic horned entity with burning red gaze) */}
      {entityId === 'she-devil' && (
        <div className="absolute left-[40%] top-[22%] w-72 h-[420px] drop-shadow-[0_0_40px_#A20D19]">
          <svg className="w-full h-full opacity-95" viewBox="0 0 140 240">
            <path d="M 58 45 Q 70 12 60 2 Q 72 20 70 48" fill="#760909" />
            <path d="M 82 45 Q 70 12 80 2 Q 68 20 70 48" fill="#760909" />
            <ellipse cx="70" cy="55" rx="18" ry="24" fill="#140608" stroke="#A20D19" strokeWidth="2.5" />
            <circle cx="62" cy="52" r="3.5" fill="#A20D19" />
            <circle cx="78" cy="52" r="3.5" fill="#A20D19" />
            <circle cx="62" cy="52" r="1.5" fill="#ffffff" />
            <circle cx="78" cy="52" r="1.5" fill="#ffffff" />
            <path d="M 54 75 Q 35 150 20 235 Q 70 245 120 235 Q 105 150 86 75 Z" fill="#080203" />
            {/* Claws */}
            <path d="M 22 140 L 10 170" stroke="#A20D19" strokeWidth="2" />
            <path d="M 118 140 L 130 170" stroke="#A20D19" strokeWidth="2" />
          </svg>
        </div>
      )}

      {/* 4. THE CRONE / HAG (Malicious doorway stalker) */}
      {entityId === 'hag' && (
        <div className="absolute left-[46%] top-[30%] w-48 h-72 drop-shadow-[0_0_25px_#760909]">
          <svg className="w-full h-full opacity-90" viewBox="0 0 100 150">
            <ellipse cx="55" cy="50" rx="22" ry="28" fill="#8f887b" stroke="#430609" strokeWidth="2.5" />
            <circle cx="48" cy="44" r="4.5" fill="#e2ded7" stroke="#760909" strokeWidth="1" />
            <circle cx="66" cy="44" r="4.5" fill="#e2ded7" stroke="#760909" strokeWidth="1" />
            <path d="M 44 64 Q 58 80 72 64" stroke="#760909" strokeWidth="3.5" fill="none" />
            {/* Wrinkle fissures */}
            <line x1="42" y1="32" x2="52" y2="34" stroke="#430609" strokeWidth="1.5" />
            <line x1="60" y1="34" x2="70" y2="32" stroke="#430609" strokeWidth="1.5" />
          </svg>
        </div>
      )}

      {/* 5. THE TALL ONE (8-foot towering shadow) */}
      {entityId === 'tall-one' && (
        <div className="absolute right-[32%] top-[15%] w-36 h-[500px] drop-shadow-[0_0_30px_#050505]">
          <svg className="w-full h-full opacity-95" viewBox="0 0 80 260">
            <ellipse cx="40" cy="22" rx="10" ry="16" fill="#000000" />
            <rect x="34" y="38" width="12" height="150" fill="#000000" />
            <line x1="40" y1="45" x2="15" y2="160" stroke="#050505" strokeWidth="4" />
            <line x1="40" y1="45" x2="65" y2="160" stroke="#050505" strokeWidth="4" />
            <line x1="37" y1="188" x2="25" y2="255" stroke="#000000" strokeWidth="5" />
            <line x1="43" y1="188" x2="55" y2="255" stroke="#000000" strokeWidth="5" />
          </svg>
        </div>
      )}

      {/* 6. THE SHADOW CHILD (Floor 13 glowing eyes) */}
      {entityId === 'shadow-child' && (
        <div className="absolute left-[38%] bottom-[20%] w-36 h-60 drop-shadow-[0_0_20px_#A20D19]">
          <svg className="w-full h-full opacity-90" viewBox="0 0 80 140">
            <ellipse cx="40" cy="26" rx="12" ry="16" fill="#000000" />
            <path d="M 28 42 Q 18 80 15 130 Q 40 135 65 130 Q 62 80 52 42 Z" fill="#030304" />
            <circle cx="36" cy="24" r="2.5" fill="#A20D19" />
            <circle cx="44" cy="24" r="2.5" fill="#A20D19" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};
