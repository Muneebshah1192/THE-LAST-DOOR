// The Last Door V2 - Cinematic Scene Elements & Hostile Environments
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';
import { SceneDef } from '../engine/types';
import { CreatureEncounter } from './CreatureEncounter';
import { GlitchText } from './GlitchText';

interface SceneElementsProps {
  scene: SceneDef;
  onInspectHotspot: (hotspotId: string) => void;
}

export const SceneElements: React.FC<SceneElementsProps> = ({ scene, onInspectHotspot }) => {
  const flashlightPos = useSessionStore((state) => state.flashlightPos);
  const activeAnomalies = useSessionStore((state) => state.activeAnomalies);
  const parlorPhotoFigureCount = useSessionStore((state) => state.parlorPhotoFigureCount);
  const activeCreature = useSessionStore((state) => state.activeCreature);
  const tensionLevel = useSessionStore((state) => state.tensionLevel);
  const revealedHotspots = useSessionStore((state) => state.revealedHotspots);
  const performContextAction = useSessionStore((state) => state.performContextAction);

  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [selectedHotspotForContext, setSelectedHotspotForContext] = useState<string | null>(null);

  // Check if flashlight beam is hovering near a hotspot
  const isHotspotLit = (xPct: number, yPct: number, radiusPct: number) => {
    const dx = flashlightPos.x - xPct;
    const dy = flashlightPos.y - yPct;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < radiusPct + 10;
  };

  // Stalker eye offset for portrait in parlor (Section 7.A)
  const eyeDx = Math.max(-2, Math.min(2, (flashlightPos.x - 48) * 0.1));
  const eyeDy = Math.max(-1.5, Math.min(1.5, (flashlightPos.y - 44) * 0.08));

  const handleHotspotClick = (hotspotId: string, revealsText?: string) => {
    if (revealsText) {
      setActiveMessage(revealsText);
      setTimeout(() => setActiveMessage(null), 3800);
    }
    onInspectHotspot(hotspotId);
  };

  const handleContextListen = (hotspotId: string) => {
    performContextAction('listen', hotspotId);
    setActiveMessage('YOU PRESS YOUR EAR TO THE SURFACE... COMPLETE SILENCE.');
    setTimeout(() => {
      setActiveMessage('...SOMETHING MOVED ON THE OTHER SIDE.');
    }, 1800);
    setTimeout(() => setActiveMessage(null), 4500);
    setSelectedHotspotForContext(null);
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Dynamic In-Scene Creature Encounter */}
      {activeCreature && (
        <CreatureEncounter
          entityId={activeCreature}
          sceneId={scene.id}
          isFlashlightFocused={flashlightPos.x > 35 && flashlightPos.x < 65}
        />
      )}

      {/* 1. SCENE: THE PORCH */}
      {scene.id === 'house-porch' && (
        <div className="absolute inset-0 bg-[#050505] flex items-center justify-center">
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="porchWoodV2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#101010" />
                <stop offset="60%" stopColor="#08080a" />
                <stop offset="100%" stopColor="#030304" />
              </linearGradient>
              <linearGradient id="rainDropV2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(216,214,210,0)" />
                <stop offset="100%" stopColor="rgba(162,13,25,0.2)" />
              </linearGradient>
            </defs>

            {/* Ceiling overhang */}
            <polygon points="0,0 1000,0 900,120 100,120" fill="#08080a" />
            
            {/* Porch floorboards */}
            <polygon points="100,440 900,440 1000,600 0,600" fill="url(#porchWoodV2)" />
            <line x1="250" y1="440" x2="200" y2="600" stroke="#050505" strokeWidth="2.5" />
            <line x1="450" y1="440" x2="430" y2="600" stroke="#050505" strokeWidth="2.5" />
            <line x1="650" y1="440" x2="680" y2="600" stroke="#050505" strokeWidth="2.5" />
            <line x1="850" y1="440" x2="900" y2="600" stroke="#050505" strokeWidth="2.5" />

            {/* Weatherboard Wall */}
            <rect x="100" y="120" width="800" height="320" fill="#0d0e11" />
            <line x1="100" y1="160" x2="900" y2="160" stroke="#07080a" strokeWidth="2" />
            <line x1="100" y1="200" x2="900" y2="200" stroke="#07080a" strokeWidth="2" />
            <line x1="100" y1="240" x2="900" y2="240" stroke="#07080a" strokeWidth="2" />
            <line x1="100" y1="280" x2="900" y2="280" stroke="#07080a" strokeWidth="2" />
            <line x1="100" y1="320" x2="900" y2="320" stroke="#07080a" strokeWidth="2" />
            <line x1="100" y1="360" x2="900" y2="360" stroke="#07080a" strokeWidth="2" />
            <line x1="100" y1="400" x2="900" y2="400" stroke="#07080a" strokeWidth="2" />

            {/* Heavy Front Door Frame */}
            <rect x="440" y="170" width="160" height="270" fill="#040405" stroke="#16181d" strokeWidth="4" />
            
            {/* Front Door: Cracked Open 10cm */}
            <polygon points="445,175 570,185 570,435 445,435" fill="#101216" stroke="#08090b" strokeWidth="2" />
            {/* Pitch black interior gap */}
            <polygon points="570,185 600,185 600,435 570,435" fill="#020203" />
            
            {/* Blood-stained claw scratch on door frame */}
            <path d="M 444 260 Q 436 290 442 320" stroke="#760909" strokeWidth="2" fill="none" opacity="0.8" />
            <path d="M 447 265 Q 440 295 446 325" stroke="#760909" strokeWidth="1.5" fill="none" opacity="0.8" />

            <circle cx="558" cy="315" r="4.5" fill="#594e3c" />

            {/* Rain Streaks */}
            {[...Array(28)].map((_, i) => (
              <line
                key={i}
                x1={(i * 38 + 15) % 1000}
                y1={((i * 32) % 400) + 90}
                x2={((i * 38 + 15) % 1000) - 15}
                y2={((i * 32) % 400) + 160}
                stroke="url(#rainDropV2)"
                strokeWidth="1.6"
              />
            ))}
          </svg>
        </div>
      )}

      {/* 2. SCENE: THE FOYER */}
      {scene.id === 'house-foyer' && (
        <div className="absolute inset-0 bg-[#060608] flex items-center justify-center">
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <polygon points="200,80 800,80 1000,600 0,600" fill="#0e1014" />
            <polygon points="200,80 800,80 750,420 250,420" fill="#08090b" />

            {/* Entrance door: Closed shut */}
            <rect x="440" y="160" width="120" height="260" fill="#050608" stroke="#16181e" strokeWidth="3" />
            <circle cx="542" cy="295" r="3.5" fill="#4d4130" />

            {/* Grandfather Clock at (250, 160) */}
            <g transform="translate(250, 160)">
              <rect x="0" y="0" width="70" height="260" fill="#100d0a" stroke="#241d16" strokeWidth="2" />
              <polygon points="0,0 35,-25 70,0" fill="#17120e" stroke="#241d16" strokeWidth="2" />
              <circle cx="35" cy="45" r="26" fill="#080604" stroke="#4d4032" strokeWidth="2" />
              <circle cx="35" cy="45" r="22" fill="#d2cbbe" opacity="0.8" />
              
              {/* Clock Hands: Stopped at 03:17 */}
              <line x1="35" y1="45" x2="48" y2="45" stroke="#100e0b" strokeWidth="2.5" />
              <line 
                x1="35" 
                y1="45" 
                x2="45" 
                y2="55" 
                stroke="#100e0b" 
                strokeWidth="1.5"
                className={activeAnomalies.includes('clockAnomaly') ? 'transition-transform duration-300 -rotate-15 origin-[35px_45px]' : ''}
              />
              <rect x="15" y="85" width="40" height="150" fill="#050403" stroke="#292119" strokeWidth="1.5" />
              <line x1="35" y1="90" x2="35" y2="180" stroke="#5e4f3c" strokeWidth="2" />
              <circle cx="35" cy="180" r="12" fill="#7a674f" />
            </g>

            {/* Parlor Archway on Right */}
            <path d="M 680,420 L 680,180 Q 750,130 820,180 L 820,420 Z" fill="#030304" stroke="#1a1c22" strokeWidth="3" />
            <path d="M 700,420 L 700,200 Q 750,160 800,200 L 800,420 Z" fill="#060709" opacity="0.9" />
          </svg>
        </div>
      )}

      {/* 3. SCENE: THE PARLOR (With Stalker Mouse Eyes) */}
      {scene.id === 'house-parlor' && (
        <div className="absolute inset-0 bg-[#070605] flex items-center justify-center">
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <rect x="250" y="320" width="500" height="280" fill="#100e0b" stroke="#1f1a15" strokeWidth="4" />
            <rect x="370" y="410" width="260" height="190" fill="#040302" />
            <path d="M 370,410 Q 500,370 630,410 Z" fill="#040302" />
            <rect x="220" y="300" width="560" height="30" fill="#1a1511" stroke="#2e251d" strokeWidth="3" />

            {/* Vintage Photograph Frame on Mantel at (430, 160) */}
            <g transform="translate(430, 160)">
              <rect x="0" y="0" width="140" height="135" fill="#14110e" stroke="#756959" strokeWidth="4" rx="2" />
              <rect x="8" y="8" width="124" height="119" fill="#beb6a5" />

              {/* Figure 1: Man in 1920s suit with STALKER EYES */}
              <rect x="28" y="42" width="24" height="42" fill="#24201a" rx="3" />
              <circle cx="40" cy="32" r="9" fill="#9e9482" />
              {/* Ocular pinpricks tracking cursor */}
              <circle cx={38 + eyeDx} cy={31 + eyeDy} r="1.2" fill="#430609" />
              <circle cx={42 + eyeDx} cy={31 + eyeDy} r="1.2" fill="#430609" />

              {/* Figure 2: Seated Woman with STALKER EYES */}
              <rect x="60" y="48" width="26" height="38" fill="#2d2822" rx="4" />
              <circle cx="73" cy="38" r="8" fill="#a69c8a" />
              <circle cx={71 + eyeDx} cy={37 + eyeDy} r="1.2" fill="#430609" />
              <circle cx={75 + eyeDx} cy={37 + eyeDy} r="1.2" fill="#430609" />

              {/* Figure 3: Child */}
              <rect x="48" y="65" width="18" height="32" fill="#3f372e" rx="2" />
              <circle cx="57" cy="58" r="6.5" fill="#b0a08c" />

              {/* FIGURE 4: MEMORY MECHANIC (On return visit, fourth silhouette looms) */}
              {parlorPhotoFigureCount >= 4 && (
                <g className="transition-opacity duration-1000 opacity-95">
                  <rect x="90" y="24" width="22" height="65" fill="#060505" rx="2" />
                  <circle cx="101" cy="18" r="7" fill="#0d0b0a" />
                  <circle cx={99 + eyeDx} cy={18 + eyeDy} r="1.2" fill="#A20D19" />
                  <circle cx={103 + eyeDx} cy={18 + eyeDy} r="1.2" fill="#A20D19" />
                </g>
              )}
            </g>

            {/* Right Doorway to Corridor Passage */}
            <rect x="790" y="180" width="130" height="340" fill="#050608" stroke="#16181f" strokeWidth="3" />
          </svg>
        </div>
      )}

      {/* 4. SCENE: THE BREATHING CORRIDOR */}
      {scene.id === 'house-hallway' && (
        <div className={`absolute inset-0 bg-[#070505] flex items-center justify-center ${activeAnomalies.includes('wallBreathing') ? 'anomaly-wall-breathing' : ''}`}>
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <polygon points="0,0 1000,0 580,270 420,270" fill="#060505" />
            <polygon points="0,600 1000,600 580,360 420,360" fill="#0c0a09" />
            
            {/* Left Wall with Peeling Wallpaper Texture */}
            <polygon points="0,0 420,270 420,360 0,600" fill="#150d0d" stroke="#241414" strokeWidth="2" />
            <ellipse cx="260" cy="300" rx="90" ry="70" fill="#1f1010" opacity="0.8" />
            <path d="M 200,280 Q 260,250 320,290 Q 250,340 200,280 Z" fill="#100707" opacity="0.65" />

            {/* Dried blood smudge on wallpaper */}
            <path d="M 330 250 Q 340 290 335 320" stroke="#760909" strokeWidth="3" fill="none" opacity="0.75" />

            {/* Right Wall */}
            <polygon points="1000,0 580,270 580,360 1000,600" fill="#100b0b" stroke="#1a1111" strokeWidth="2" />
            <rect x="460" y="275" width="80" height="85" fill="#020202" stroke="#140e0e" strokeWidth="2" />

            {/* ENTITY: THE TALL ONE (Appears in doorway on high tension) */}
            {tensionLevel > 65 && (
              <g className="transition-opacity duration-700 opacity-90">
                <rect x="495" y="280" width="10" height="78" fill="#000000" />
                <ellipse cx="500" cy="281" rx="4" ry="6" fill="#000000" />
              </g>
            )}
          </svg>
        </div>
      )}

      {/* 5. SCENE: THE IMPOSSIBLE ROOM */}
      {scene.id === 'house-impossible-room' && (
        <div className="absolute inset-0 bg-[#030204] flex items-center justify-center">
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <polygon points="80,40 920,80 840,540 160,560" fill="#0a080d" stroke="#1b1423" strokeWidth="4" />
            <polygon points="220,120 780,140 720,460 280,480" fill="#050407" stroke="#120e17" strokeWidth="2" />

            <g transform="translate(500, 290)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="#A20D19"
                fontFamily="Cinzel, serif"
                fontSize="20"
                letterSpacing="0.25em"
                className="drop-shadow-[0_0_12px_#760909]"
              >
                YOU ARE NOT THE FIRST.
              </text>
              <line x1="-170" y1="14" x2="170" y2="14" stroke="#760909" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      )}

      {/* Interactive Hotspot Targets */}
      {scene.hotspots.map((hotspot) => {
        const lit = isHotspotLit(hotspot.xPercent, hotspot.yPercent, hotspot.radiusPercent);
        const explored = revealedHotspots.includes(hotspot.id);
        const isContextOpen = selectedHotspotForContext === hotspot.id;

        return (
          <div
            key={hotspot.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-300"
            style={{
              left: `${hotspot.xPercent}%`,
              top: `${hotspot.yPercent}%`,
            }}
          >
            <div className="relative flex items-center justify-center">
              <button
                onClick={() => setSelectedHotspotForContext(isContextOpen ? null : hotspot.id)}
                className={`group relative flex items-center justify-center p-3.5 rounded-full cursor-pointer transition-all duration-500 ${
                  lit ? 'opacity-100 scale-100' : 'opacity-25 scale-75'
                }`}
                title={hotspot.name}
              >
                <div className="absolute inset-0 rounded-full border border-bone/30 group-hover:border-blood group-hover:scale-125 transition-all duration-300" />
                <div className={`w-3 h-3 rounded-full ${explored ? 'bg-dust/60' : 'bg-bone'} shadow-[0_0_10px_rgba(216,214,210,0.8)]`} />
              </button>

              {/* Contextual Action Flyout Menu (Section 10 & 12) */}
              {(lit || isContextOpen) && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-12 whitespace-nowrap bg-void/95 border border-dust/30 p-1 flex flex-col gap-1 backdrop-blur-md shadow-2xl z-40"
                >
                  <button
                    onClick={() => handleHotspotClick(hotspot.id, hotspot.revealsText)}
                    className="px-3 py-1.5 text-[11px] font-mono tracking-widest uppercase text-bone hover:bg-dust/20 hover:text-white text-left transition-colors cursor-pointer"
                  >
                    {hotspot.actionText}
                  </button>

                  <button
                    onClick={() => handleContextListen(hotspot.id)}
                    className="px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase text-dust hover:bg-blood/20 hover:text-blood-light text-left transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>LISTEN FIRST</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        );
      })}

      {/* Subtitle Toast */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 max-w-lg w-full text-center px-4 z-40 pointer-events-none"
          >
            <div className="bg-void/95 border-t border-b border-blood/40 py-2.5 px-6 backdrop-blur-md shadow-[0_0_20px_rgba(118,9,9,0.3)]">
              <p className="font-mono text-xs md:text-sm tracking-widest text-bone">
                <GlitchText text={activeMessage} corruptChance={0.08} />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
