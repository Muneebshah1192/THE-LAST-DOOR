// The Last Door - Cinematic Viewport & Camera Rig
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionStore } from '../store/sessionStore';
import { SceneElements } from './SceneElements';
import { FlashlightLayer } from './FlashlightLayer';
import { VFXOverlay } from './VFXOverlay';
import { ChoiceOverlay } from './ChoiceOverlay';
import { AudioHUD } from './AudioHUD';

export const CinematicViewport: React.FC = () => {
  const currentScene = useSessionStore((state) => state.currentScene);
  const inspectHotspot = useSessionStore((state) => state.inspectHotspot);
  const selectChoice = useSessionStore((state) => state.selectChoice);
  const tickSession = useSessionStore((state) => state.tickSession);
  const reducedMotion = useSessionStore((state) => state.reducedMotion);
  const tensionLevel = useSessionStore((state) => state.tensionLevel);

  const [narrativeLine, setNarrativeLine] = useState<string>('');

  // Session Tick loop (runs at ~10Hz to evaluate tension, anomalies, and encounters)
  useEffect(() => {
    const interval = setInterval(() => {
      tickSession(0.1);
    }, 100);

    return () => clearInterval(interval);
  }, [tickSession]);

  // Narrative text sequence timer for current scene
  useEffect(() => {
    const lines = currentScene.narrativeText;
    if (!lines || lines.length === 0) return;

    let index = 0;
    setNarrativeLine(lines[0]);

    const lineInterval = setInterval(() => {
      index = (index + 1) % lines.length;
      setNarrativeLine(lines[index]);
    }, 5500);

    return () => clearInterval(lineInterval);
  }, [currentScene]);

  // Slow camera sway calculations
  const swayAmount = reducedMotion ? 0 : 0.8 + (tensionLevel / 100) * 1.5;

  return (
    <div className="relative w-screen h-screen bg-void overflow-hidden select-none">
      {/* Cinematic Camera Rig Container */}
      <motion.div
        animate={
          reducedMotion
            ? { scale: 1, rotate: 0 }
            : {
                scale: [1, 1.02, 1.01, 1.025, 1],
                rotate: [0, 0.3, -0.2, 0.15, 0],
                x: [0, swayAmount, -swayAmount, swayAmount * 0.5, 0],
                y: [0, -swayAmount * 0.5, swayAmount, -swayAmount, 0]
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="relative w-full h-full"
      >
        {/* Core Scene Elements & Hotspots */}
        <SceneElements scene={currentScene} onInspectHotspot={inspectHotspot} />

        {/* Flashlight & Light Mask */}
        <FlashlightLayer reducedMotion={reducedMotion} />
      </motion.div>

      {/* Cinematic Film Visual Effects Overlay */}
      <VFXOverlay />

      {/* Top Scene Location Badge */}
      <div className="absolute top-6 left-6 z-40 pointer-events-none">
        <p className="font-mono text-[10px] text-dust/60 tracking-[0.3em] uppercase">
          LOCATION
        </p>
        <p className="font-cinematic text-xs md:text-sm tracking-[0.25em] text-bone uppercase pt-0.5">
          {currentScene.locationName}
        </p>
      </div>

      {/* Narrative Subtitle Bar at Bottom Center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none max-w-xl w-full text-center px-4">
        <AnimatePresence mode="wait">
          {narrativeLine && (
            <motion.p
              key={narrativeLine}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 0.85, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 1.2 }}
              className="font-mono text-xs md:text-sm tracking-[0.25em] text-bone uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
            >
              {narrativeLine}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Decision / Choice Overlay if scene has choices and player hasn't picked */}
      {currentScene.choices && currentScene.choices.length > 0 && (
        <ChoiceOverlay
          choices={currentScene.choices}
          onSelectChoice={selectChoice}
        />
      )}

      {/* Subtle Safety & Audio HUD */}
      <AudioHUD />
    </div>
  );
};
