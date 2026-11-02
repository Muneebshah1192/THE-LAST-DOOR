// The Last Door V3 - Cinematic Viewport, Camera Rig & Inventory
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionStore } from '../store/sessionStore';
import { SceneElements } from './SceneElements';
import { FlashlightLayer } from './FlashlightLayer';
import { VFXOverlay } from './VFXOverlay';
import { ChoiceOverlay } from './ChoiceOverlay';
import { AudioHUD } from './AudioHUD';
import { PeripheralAnomaly } from './PeripheralAnomaly';
import { GlitchText } from './GlitchText';
import { InventoryBar } from './InventoryBar';
import { HorrorMedia } from './HorrorMedia';
import { HORROR_ASSETS } from '../engine/assetRegistry';
import { audioDirector } from '../engine/audioDirector';

export const CinematicViewport: React.FC = () => {
  const currentScene = useSessionStore((state) => state.currentScene);
  const inspectHotspot = useSessionStore((state) => state.inspectHotspot);
  const selectChoice = useSessionStore((state) => state.selectChoice);
  const tickSession = useSessionStore((state) => state.tickSession);
  const reducedMotion = useSessionStore((state) => state.reducedMotion);
  const tensionLevel = useSessionStore((state) => state.tensionLevel);
  const isPaused = useSessionStore((state) => state.isPaused);
  const togglePause = useSessionStore((state) => state.togglePause);
  const inventory = useSessionStore((state) => state.inventory);
  const selectedItemId = useSessionStore((state) => state.selectedItemId);
  const setSelectedItemId = useSessionStore((state) => state.setSelectedItemId);
  const retreatScene = useSessionStore((state) => state.retreatScene);
  const sceneHistory = useSessionStore((state) => state.sceneHistory);
  const flashlightPos = useSessionStore((state) => state.flashlightPos);
  const soundEnabled = useSessionStore((state) => state.soundEnabled);

  const canRetreat = sceneHistory.length > 0;
  const [narrativeLine, setNarrativeLine] = useState<string>('');

  // Session Tick loop (~10Hz)
  useEffect(() => {
    const interval = setInterval(() => {
      tickSession(0.1);
    }, 100);

    return () => clearInterval(interval);
  }, [tickSession]);

  // Narrative text sequence timer & horror vocal speech
  useEffect(() => {
    const lines = currentScene.narrativeText;
    if (!lines || lines.length === 0) return;

    let index = 0;
    setNarrativeLine(lines[0]);
    if (soundEnabled && !isPaused) {
      audioDirector.speakHorrorVoice(lines[0], 'whisper');
    }

    const lineInterval = setInterval(() => {
      index = (index + 1) % lines.length;
      setNarrativeLine(lines[index]);
      if (soundEnabled && !isPaused) {
        audioDirector.speakHorrorVoice(lines[index], 'whisper');
      }
    }, 5500);

    return () => clearInterval(lineInterval);
  }, [currentScene, soundEnabled, isPaused]);

  // Keyboard shortcut: ESC to toggle pause, Backspace/B to retreat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        togglePause();
      } else if (e.key === 'Backspace' || e.key.toLowerCase() === 'b') {
        if (canRetreat) {
          retreatScene();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePause, canRetreat, retreatScene]);

  const swayAmount = reducedMotion ? 0 : 0.8 + (tensionLevel / 100) * 1.8;
  const headTiltX = reducedMotion ? 0 : (flashlightPos.y - 50) * 0.08;
  const headTiltY = reducedMotion ? 0 : (flashlightPos.x - 50) * -0.08;

  return (
    <div className="relative w-screen h-screen bg-void overflow-hidden select-none">
      {/* Cinematic Camera Rig Container with 3D Augmented Reality Perspective */}
      <motion.div
        animate={
          reducedMotion
            ? { scale: 1, rotate: 0 }
            : {
                scale: [1, 1.025, 1.015, 1.03, 1],
                rotate: [0, 0.35, -0.25, 0.2, 0],
                x: [0, swayAmount, -swayAmount, swayAmount * 0.5, 0],
                y: [0, -swayAmount * 0.5, swayAmount, -swayAmount, 0],
                rotateX: headTiltX,
                rotateY: headTiltY
              }
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="relative w-full h-full"
        style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
      >
        <SceneElements scene={currentScene} onInspectHotspot={inspectHotspot} />
        <FlashlightLayer reducedMotion={reducedMotion} />
      </motion.div>

      {/* Atmospheric Creeping Looping Fog Video Overlay */}
      <div className="absolute inset-0 pointer-events-none z-15">
        <HorrorMedia
          asset={HORROR_ASSETS['fog_creeping_loop']}
          className="w-full h-full object-cover"
          opacity={0.32}
        />
      </div>

      {/* Atmospheric Suspended Dust Motes Particle Loop */}
      <div className="absolute inset-0 pointer-events-none z-16">
        <HorrorMedia
          asset={HORROR_ASSETS['particles_dust_motes']}
          className="w-full h-full object-cover"
          opacity={0.38}
        />
      </div>

      {/* Peak Tension Blood Drips Overlay (Active during extreme dread >= 75) */}
      {tensionLevel >= 75 && (
        <div className="absolute inset-0 pointer-events-none z-17 transition-opacity duration-1000">
          <HorrorMedia
            asset={HORROR_ASSETS['glitch_blood_drip']}
            className="w-full h-full object-cover"
            opacity={0.5}
          />
        </div>
      )}

      {/* Peripheral Vision Anomalies at Screen Margins */}
      <PeripheralAnomaly />

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

      {/* Immersive Turn Back Door Button */}
      {canRetreat && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={retreatScene}
          className="absolute top-6 right-20 z-40 flex items-center space-x-2 px-3.5 py-1.5 border border-blood/50 bg-abyss/90 text-bone hover:border-blood-light hover:bg-blood/20 text-[11px] font-mono tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(162,13,25,0.4)] cursor-pointer"
        >
          <span className="text-blood-light animate-pulse">🚪 ⬅</span>
          <span>TURN BACK DOOR</span>
        </motion.button>
      )}

      {/* Augmented Reality Tactical Sensor Telemetry Overlay */}
      <div className="absolute bottom-6 right-6 z-40 pointer-events-none font-mono text-[10px] tracking-[0.2em] text-dust/60 space-y-1 text-right hidden sm:block">
        <div className="flex items-center justify-end space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blood animate-ping" />
          <span className="text-blood-light font-bold">AR REALITY SENSOR ACTIVE</span>
        </div>
        <p>AZIMUTH: {Math.round(flashlightPos.x * 3.6)}° | ELEV: {Math.round((50 - flashlightPos.y) * 1.8)}°</p>
        <p>THERMAL FLUX: {(19.2 - (tensionLevel / 100) * 15.5).toFixed(1)}°C</p>
        <p>BIOMETRIC PULSE: {70 + Math.round(tensionLevel * 0.75)} BPM</p>
      </div>

      {/* Narrative Subtitle Bar at Bottom Center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none max-w-xl w-full text-center px-4">
        <AnimatePresence mode="wait">
          {narrativeLine && (
            <motion.p
              key={narrativeLine}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 0.9, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 1.2 }}
              className="font-mono text-xs md:text-sm tracking-[0.25em] text-bone uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
            >
              <GlitchText text={narrativeLine} corruptChance={0.06} />
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Player Inventory Dock (Bottom-Left) */}
      <InventoryBar
        items={inventory}
        selectedItemId={selectedItemId}
        onSelectItem={setSelectedItemId}
      />

      {/* Decision / Choice Overlay */}
      {currentScene.choices && currentScene.choices.length > 0 && (
        <ChoiceOverlay
          choices={currentScene.choices}
          onSelectChoice={selectChoice}
        />
      )}

      {/* Pause Modal Overlay */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-void/90 backdrop-blur-md flex items-center justify-center z-50 p-6 select-none"
          >
            <div className="max-w-sm w-full bg-abyss border border-dust/20 p-8 text-center space-y-6 shadow-2xl">
              <h2 className="font-cinematic text-lg tracking-[0.3em] text-bone uppercase">
                EXPERIENCE PAUSED
              </h2>
              <p className="text-xs font-sans text-dust/70 leading-relaxed">
                The silence is waiting. Press resume whenever you are ready to continue.
              </p>
              <div className="space-y-3">
                <button
                  onClick={togglePause}
                  className="btn-blood-enter w-full py-3 text-xs font-mono uppercase tracking-widest cursor-pointer font-bold"
                >
                  RESUME
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Safety & Audio HUD */}
      <AudioHUD />
    </div>
  );
};
