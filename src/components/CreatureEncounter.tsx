// The Last Door V3 - In-Scene Terrifying Animated Devil & Creature Encounter Renderer
import React from 'react';
import { motion } from 'framer-motion';
import { EntityId } from '../engine/creatureDirector';
import { HorrorMedia } from './HorrorMedia';
import { HORROR_ASSETS } from '../engine/assetRegistry';

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
      animate={{ opacity: isFlashlightFocused ? 0.45 : 0.95 }}
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.7 }}
      className="absolute inset-0 pointer-events-none flex items-center justify-center z-25 overflow-hidden"
    >
      {/* 1. THE BANSHEE (Animated floating loop with photorealistic demonic aura) */}
      {entityId === 'banshee' && (
        <div className="absolute right-[18%] top-[20%] w-72 h-[480px] drop-shadow-[0_0_40px_#A20D19]">
          <HorrorMedia
            asset={HORROR_ASSETS['ghost_banshee_float']}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* 2. THE WEEPING BRIDE (Corner sobbing ghost with animated tears and veil) */}
      {entityId === 'weeping-bride' && (
        <div className="absolute left-[15%] bottom-[10%] w-72 h-[450px] drop-shadow-[0_0_25px_#430609]">
          <HorrorMedia
            asset={HORROR_ASSETS['female_weeping_bride']}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* 3. THE SHE-DEVIL (Demonic horned entity with animated breathing & glowing red gaze) */}
      {entityId === 'she-devil' && (
        <div className="absolute left-[38%] top-[18%] w-80 h-[500px] drop-shadow-[0_0_45px_#A20D19]">
          <HorrorMedia
            asset={HORROR_ASSETS['demon_she_devil']}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* 4. THE TALL ONE (8-foot towering shadow with shifting animated limbs) */}
      {entityId === 'tall-one' && (
        <div className="absolute right-[30%] top-[10%] w-60 h-[600px] drop-shadow-[0_0_35px_#050505]">
          <HorrorMedia
            asset={HORROR_ASSETS['demon_tall_one']}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* 5. THE SHADOW RUNNER / CRAWLING SPIRIT / SHADOW CHILD */}
      {(entityId === 'shadow-child' || entityId === 'crawling-spirit' || entityId === 'corridor-watcher') && (
        <div className="absolute left-[35%] bottom-[18%] w-64 h-72 drop-shadow-[0_0_25px_#A20D19]">
          <HorrorMedia
            asset={HORROR_ASSETS['creature_shadow_runner']}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* 6. THE WALL BREATHER (Pulsing plaster lungs) */}
      {entityId === 'wall-breather' && (
        <div className="absolute left-[20%] top-[25%] w-[400px] h-[400px] drop-shadow-[0_0_30px_#760909]">
          <HorrorMedia
            asset={HORROR_ASSETS['shadow_wall_breather']}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* 7. THE CRONE / HAG */}
      {entityId === 'hag' && (
        <div className="absolute left-[45%] top-[28%] w-56 h-80 drop-shadow-[0_0_30px_#760909]">
          <svg className="w-full h-full opacity-90" viewBox="0 0 100 150">
            <ellipse cx="55" cy="50" rx="22" ry="28" fill="#8f887b" stroke="#430609" strokeWidth="2.5" />
            <circle cx="48" cy="44" r="4.5" fill="#e2ded7" stroke="#760909" strokeWidth="1" />
            <circle cx="66" cy="44" r="4.5" fill="#e2ded7" stroke="#760909" strokeWidth="1" />
            <path d="M 44 64 Q 58 80 72 64" stroke="#760909" strokeWidth="3.5" fill="none" />
            <line x1="42" y1="32" x2="52" y2="34" stroke="#430609" strokeWidth="1.5" />
            <line x1="60" y1="34" x2="70" y2="32" stroke="#430609" strokeWidth="1.5" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};
