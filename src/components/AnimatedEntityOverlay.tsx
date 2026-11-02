// The Last Door - Animated Entity Encounter Overlay
import React from 'react';
import { motion } from 'framer-motion';
import { getEntityAnimation } from '../engine/assetRegistry';
import { HorrorMedia } from './HorrorMedia';
import { useSessionStore } from '../store/sessionStore';

interface AnimatedEntityOverlayProps {
  entityId: string;
  isFlashlightFocused: boolean;
  className?: string;
}

export const AnimatedEntityOverlay: React.FC<AnimatedEntityOverlayProps> = ({
  entityId,
  isFlashlightFocused,
  className = ''
}) => {
  const reducedMotion = useSessionStore((state) => state.reducedMotion);
  const animationAsset = getEntityAnimation(entityId);

  // If no registered animated asset for this entity, return null so parent SVG fallback renders
  if (!animationAsset) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: isFlashlightFocused ? 0.3 : 0.9,
        scale: isFlashlightFocused ? 0.9 : 1.0,
        filter: isFlashlightFocused ? 'blur(4px)' : 'blur(0px)'
      }}
      transition={{
        duration: reducedMotion ? 0.1 : 0.8,
        ease: 'easeOut'
      }}
      className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none z-20 ${className}`}
    >
      <div className="relative w-[340px] h-[520px] md:w-[480px] md:h-[680px]">
        <HorrorMedia
          asset={animationAsset}
          className="w-full h-full object-contain"
        />
      </div>
    </motion.div>
  );
};
