// The Last Door - Cinematic VFX Overlay
import React from 'react';
import { useSessionStore } from '../store/sessionStore';

export const VFXOverlay: React.FC = () => {
  const tensionLevel = useSessionStore((state) => state.tensionLevel);
  const reducedMotion = useSessionStore((state) => state.reducedMotion);
  const activeEncounter = useSessionStore((state) => state.activeEncounter);

  // Dynamic values based on tension
  const grainOpacity = reducedMotion ? 0.15 : 0.25 + (tensionLevel / 100) * 0.15;
  const scanlineOpacity = 0.3 + (tensionLevel / 100) * 0.35;
  const isEncounterActive = !!activeEncounter;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {/* 35mm Film Grain */}
      <div 
        className="film-grain"
        style={{ opacity: grainOpacity }}
      />

      {/* Cinematic Radial Vignette */}
      <div className="cinematic-vignette" />

      {/* CRT Scanline Overlay */}
      <div 
        className={`crt-scanlines ${tensionLevel > 70 ? 'animate-flicker' : ''}`}
        style={{ opacity: scanlineOpacity }}
      />

      {/* Sudden Brief Chromatic Distortion during Encounter */}
      {isEncounterActive && (
        <div 
          className="absolute inset-0 bg-crimson-faint mix-blend-color-burn opacity-40 transition-opacity duration-300"
        />
      )}

      {/* Cold Peripheral Shadow Bleed */}
      <div 
        className="absolute inset-0"
        style={{
          boxShadow: `inset 0 0 ${120 + (tensionLevel / 100) * 80}px rgba(3, 3, 4, 0.95)`
        }}
      />
    </div>
  );
};
