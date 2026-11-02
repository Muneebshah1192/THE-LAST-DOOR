// The Last Door V2 - Cinematic Horror VFX Overlay
import React from 'react';
import { useSessionStore } from '../store/sessionStore';

export const VFXOverlay: React.FC = () => {
  const tensionLevel = useSessionStore((state) => state.tensionLevel);
  const reducedMotion = useSessionStore((state) => state.reducedMotion);
  const activeCreature = useSessionStore((state) => state.activeCreature);

  const grainOpacity = reducedMotion ? 0.15 : 0.28 + (tensionLevel / 100) * 0.16;
  const hasSupernaturalPresence = !!activeCreature;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {/* 35mm Film Grain */}
      <div 
        className="film-grain"
        style={{ opacity: grainOpacity }}
      />

      {/* Cinematic Radial Vignette */}
      <div className="cinematic-vignette" />

      {/* Blood Vignette Rim (intensifies on tension or creature encounter) */}
      <div 
        className="cinematic-vignette-blood transition-opacity duration-1000"
        style={{ opacity: hasSupernaturalPresence || tensionLevel > 60 ? 0.75 : 0.25 }}
      />

      {/* Faint Red Occult Chromatic Pulse on Creature Presence */}
      {hasSupernaturalPresence && (
        <div 
          className="absolute inset-0 bg-blood/15 mix-blend-color-dodge transition-opacity duration-500"
        />
      )}

      {/* Shadow Bleed */}
      <div 
        className="absolute inset-0"
        style={{
          boxShadow: `inset 0 0 ${120 + (tensionLevel / 100) * 90}px rgba(5, 5, 5, 0.98)`
        }}
      />
    </div>
  );
};
