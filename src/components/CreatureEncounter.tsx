// The Last Door V2 - In-Scene Creature Encounter Renderer
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
      animate={{ opacity: isFlashlightFocused ? 0.35 : 0.85 }}
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 pointer-events-none flex items-center justify-center z-25 overflow-hidden"
    >
      {/* 1. THE BANSHEE (Corridor presence) */}
      {entityId === 'banshee' && (
        <div className="absolute right-[22%] top-[30%] w-48 h-80">
          <svg className="w-full h-full opacity-85" viewBox="0 0 100 200">
            {/* Drifting decayed tattered robes */}
            <path d="M 40 40 Q 20 120 15 190 Q 50 195 85 190 Q 80 120 60 40 Z" fill="#08080a" />
            {/* Elongated neck and pale face */}
            <ellipse cx="50" cy="35" rx="12" ry="16" fill="#c9c4b7" />
            {/* Screaming mouth */}
            <ellipse cx="50" cy="42" rx="4" ry="6" fill="#430609" />
            {/* Disheveled hair strands */}
            <path d="M 38 22 Q 25 60 30 110" stroke="#000000" strokeWidth="2.5" fill="none" />
            <path d="M 62 22 Q 75 60 70 110" stroke="#000000" strokeWidth="2.5" fill="none" />
          </svg>
        </div>
      )}

      {/* 2. THE WEEPING BRIDE (Corner presence facing the wall) */}
      {entityId === 'weeping-bride' && (
        <div className="absolute left-[18%] bottom-[12%] w-56 h-88">
          <svg className="w-full h-full opacity-80" viewBox="0 0 120 220">
            {/* Decayed 1920s wedding gown */}
            <path d="M 50 50 Q 20 140 10 210 Q 60 220 110 210 Q 100 140 70 50 Z" fill="#d2cec4" opacity="0.45" stroke="#777777" strokeWidth="1" />
            {/* Veiled head facing the corner */}
            <ellipse cx="60" cy="35" rx="14" ry="18" fill="#aba598" opacity="0.7" />
            {/* Long black hair concealing face */}
            <path d="M 46 22 Q 35 70 42 120" stroke="#101010" strokeWidth="4" fill="none" />
            <path d="M 74 22 Q 85 70 78 120" stroke="#101010" strokeWidth="4" fill="none" />
          </svg>
        </div>
      )}

      {/* 3. THE WIDOW (Tall mourning silhouette) */}
      {entityId === 'widow' && (
        <div className="absolute right-[28%] top-[24%] w-44 h-84">
          <svg className="w-full h-full opacity-90" viewBox="0 0 100 200">
            {/* Black Victorian mourning gown and veil */}
            <path d="M 45 45 L 20 195 L 80 195 L 55 45 Z" fill="#030304" />
            <ellipse cx="50" cy="32" rx="12" ry="16" fill="#08080a" />
            {/* Faint pale hand emerged from black sleeve */}
            <ellipse cx="32" cy="110" rx="3" ry="8" fill="#D8D6D2" opacity="0.6" />
          </svg>
        </div>
      )}

      {/* 4. THE CRONE / HAG (Doorway stalker) */}
      {entityId === 'hag' && (
        <div className="absolute left-[45%] top-[34%] w-40 h-64">
          <svg className="w-full h-full opacity-85" viewBox="0 0 100 150">
            {/* Crooked head peeking around door frame */}
            <ellipse cx="55" cy="50" rx="20" ry="26" fill="#999285" stroke="#430609" strokeWidth="2" />
            <circle cx="50" cy="45" r="4" fill="#ffffff" />
            <circle cx="65" cy="45" r="4" fill="#ffffff" />
            <path d="M 46 62 Q 58 75 70 62" stroke="#760909" strokeWidth="3" fill="none" />
            {/* Long withered fingers gripping the jamb */}
            <line x1="32" y1="40" x2="32" y2="70" stroke="#706a60" strokeWidth="3" />
            <line x1="28" y1="45" x2="28" y2="75" stroke="#706a60" strokeWidth="3" />
          </svg>
        </div>
      )}

      {/* 5. THE SHE-DEVIL (Demonic manifestation in Impossible Room) */}
      {entityId === 'she-devil' && (
        <div className="absolute left-[40%] top-[25%] w-64 h-96">
          <svg className="w-full h-full opacity-90 drop-shadow-[0_0_30px_#760909]" viewBox="0 0 140 240">
            {/* Humanoid female demon silhouette with subtle horns */}
            <path d="M 60 50 Q 70 20 62 10 Q 72 25 70 50" fill="#430609" />
            <path d="M 80 50 Q 70 20 78 10 Q 68 25 70 50" fill="#430609" />
            <ellipse cx="70" cy="55" rx="16" ry="22" fill="#140608" stroke="#A20D19" strokeWidth="2" />
            {/* Glowing red gaze */}
            <circle cx="63" cy="52" r="3" fill="#A20D19" />
            <circle cx="77" cy="52" r="3" fill="#A20D19" />
            {/* Shadow body */}
            <path d="M 55 75 Q 35 150 25 230 Q 70 240 115 230 Q 105 150 85 75 Z" fill="#080203" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};
