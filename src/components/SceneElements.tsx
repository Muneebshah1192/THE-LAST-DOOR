// The Last Door - Cinematic Scene Elements & Visual Environments
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionStore } from '../store/sessionStore';
import { SceneDef } from '../engine/types';

interface SceneElementsProps {
  scene: SceneDef;
  onInspectHotspot: (hotspotId: string) => void;
}

export const SceneElements: React.FC<SceneElementsProps> = ({ scene, onInspectHotspot }) => {
  const flashlightPos = useSessionStore((state) => state.flashlightPos);
  const activeAnomalies = useSessionStore((state) => state.activeAnomalies);
  const parlorPhotoFigureCount = useSessionStore((state) => state.parlorPhotoFigureCount);
  const activeEncounter = useSessionStore((state) => state.activeEncounter);
  const tensionLevel = useSessionStore((state) => state.tensionLevel);
  const revealedHotspots = useSessionStore((state) => state.revealedHotspots);

  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  // Check if flashlight beam is hovering near a hotspot
  const isHotspotLit = (xPct: number, yPct: number, radiusPct: number) => {
    const dx = flashlightPos.x - xPct;
    const dy = flashlightPos.y - yPct;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < radiusPct + 10;
  };

  const handleHotspotClick = (hotspotId: string, revealsText?: string) => {
    if (revealsText) {
      setActiveMessage(revealsText);
      setTimeout(() => setActiveMessage(null), 3800);
    }
    onInspectHotspot(hotspotId);
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* 1. SCENE: THE PORCH */}
      {scene.id === 'house-porch' && (
        <div className="absolute inset-0 bg-[#060709] flex items-center justify-center">
          {/* Weathered Porch Background SVG */}
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="porchWood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#121316" />
                <stop offset="50%" stopColor="#0d0e11" />
                <stop offset="100%" stopColor="#07080a" />
              </linearGradient>
              <linearGradient id="rainDrop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(212,206,190,0)" />
                <stop offset="100%" stopColor="rgba(212,206,190,0.25)" />
              </linearGradient>
            </defs>

            {/* Ceiling overhang */}
            <polygon points="0,0 1000,0 900,120 100,120" fill="#090a0d" />
            
            {/* Porch floorboards */}
            <polygon points="100,440 900,440 1000,600 0,600" fill="url(#porchWood)" />
            <line x1="250" y1="440" x2="200" y2="600" stroke="#040506" strokeWidth="2" />
            <line x1="450" y1="440" x2="430" y2="600" stroke="#040506" strokeWidth="2" />
            <line x1="650" y1="440" x2="680" y2="600" stroke="#040506" strokeWidth="2" />
            <line x1="850" y1="440" x2="900" y2="600" stroke="#040506" strokeWidth="2" />

            {/* Weatherboard Wall */}
            <rect x="100" y="120" width="800" height="320" fill="#0f1114" />
            <line x1="100" y1="160" x2="900" y2="160" stroke="#090a0c" strokeWidth="2" />
            <line x1="100" y1="200" x2="900" y2="200" stroke="#090a0c" strokeWidth="2" />
            <line x1="100" y1="240" x2="900" y2="240" stroke="#090a0c" strokeWidth="2" />
            <line x1="100" y1="280" x2="900" y2="280" stroke="#090a0c" strokeWidth="2" />
            <line x1="100" y1="320" x2="900" y2="320" stroke="#090a0c" strokeWidth="2" />
            <line x1="100" y1="360" x2="900" y2="360" stroke="#090a0c" strokeWidth="2" />
            <line x1="100" y1="400" x2="900" y2="400" stroke="#090a0c" strokeWidth="2" />

            {/* Heavy Front Door Frame */}
            <rect x="440" y="170" width="160" height="270" fill="#050608" stroke="#1c1e24" strokeWidth="4" />
            
            {/* Front Door: Cracked Open 10cm revealing pitch black interior */}
            <polygon points="445,175 570,185 570,435 445,435" fill="#14161a" stroke="#0a0b0d" strokeWidth="2" />
            {/* Pure black interior gap */}
            <polygon points="570,185 600,185 600,435 570,435" fill="#010102" />
            {/* Antique brass doorknob */}
            <circle cx="558" cy="315" r="4" fill="#695c47" />

            {/* Procedural Rain Streaks */}
            {[...Array(24)].map((_, i) => (
              <line
                key={i}
                x1={(i * 42 + 20) % 1000}
                y1={((i * 35) % 400) + 100}
                x2={((i * 42 + 20) % 1000) - 15}
                y2={((i * 35) % 400) + 160}
                stroke="url(#rainDrop)"
                strokeWidth="1.5"
              />
            ))}
          </svg>
        </div>
      )}

      {/* 2. SCENE: THE FOYER */}
      {scene.id === 'house-foyer' && (
        <div className="absolute inset-0 bg-[#07080a] flex items-center justify-center">
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="foyerFloor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#15171a" />
                <stop offset="100%" stopColor="#08090b" />
              </linearGradient>
            </defs>

            {/* Vanishing corridor hallway background */}
            <polygon points="200,80 800,80 1000,600 0,600" fill="url(#foyerFloor)" />
            <polygon points="200,80 800,80 750,420 250,420" fill="#0d0e11" />

            {/* Back entrance door: Closed shut */}
            <rect x="440" y="160" width="120" height="260" fill="#07080a" stroke="#1a1c22" strokeWidth="3" />
            <circle cx="542" cy="295" r="3.5" fill="#544837" />

            {/* Grandfather Clock at (300, 300) */}
            <g transform="translate(250, 160)">
              {/* Clock Body */}
              <rect x="0" y="0" width="70" height="260" fill="#13100d" stroke="#2b231b" strokeWidth="2" />
              <polygon points="0,0 35,-25 70,0" fill="#1c1713" stroke="#2b231b" strokeWidth="2" />
              {/* Clock Face Window */}
              <circle cx="35" cy="45" r="26" fill="#0a0806" stroke="#544738" strokeWidth="2" />
              <circle cx="35" cy="45" r="22" fill="#d9d2c5" opacity="0.8" />
              {/* Clock Hands: Stopped at exactly 03:17 */}
              <line x1="35" y1="45" x2="48" y2="45" stroke="#1a1815" strokeWidth="2.5" /> {/* Hour Hand towards 3 */}
              <line 
                x1="35" 
                y1="45" 
                x2="45" 
                y2="55" 
                stroke="#1a1815" 
                strokeWidth="1.5"
                className={activeAnomalies.includes('clockAnomaly') ? 'transition-transform duration-300 -rotate-12 origin-[35px_45px]' : ''}
              /> {/* Minute Hand towards 17 min */}
              {/* Pendulum Case */}
              <rect x="15" y="85" width="40" height="150" fill="#080605" stroke="#332a21" strokeWidth="1.5" />
              <line x1="35" y1="90" x2="35" y2="180" stroke="#6b5b47" strokeWidth="2" />
              <circle cx="35" cy="180" r="12" fill="#8c775d" />
            </g>

            {/* Parlor Archway on Right (720, 310) */}
            <path d="M 680,420 L 680,180 Q 750,130 820,180 L 820,420 Z" fill="#040405" stroke="#1f2229" strokeWidth="3" />
            <path d="M 700,420 L 700,200 Q 750,160 800,200 L 800,420 Z" fill="#07090b" opacity="0.9" />
          </svg>
        </div>
      )}

      {/* 3. SCENE: THE PARLOR */}
      {scene.id === 'house-parlor' && (
        <div className="absolute inset-0 bg-[#080706] flex items-center justify-center">
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            {/* Fireplace Hearth and Mantelpiece */}
            <rect x="250" y="320" width="500" height="280" fill="#14110e" stroke="#26201b" strokeWidth="4" />
            {/* Fireplace opening */}
            <rect x="370" y="410" width="260" height="190" fill="#050403" />
            <path d="M 370,410 Q 500,370 630,410 Z" fill="#050403" />

            {/* Heavy Mantelpiece Shelf */}
            <rect x="220" y="300" width="560" height="30" fill="#211b16" stroke="#382e25" strokeWidth="3" />

            {/* Vintage Photograph Frame on Mantel at (480, 240) */}
            <g transform="translate(430, 160)">
              {/* Ornate Frame */}
              <rect x="0" y="0" width="140" height="135" fill="#1b1814" stroke="#8a7c6a" strokeWidth="4" rx="2" />
              {/* Photo Canvas */}
              <rect x="8" y="8" width="124" height="119" fill="#c4bcab" />

              {/* Figure 1: Man in 1920s suit */}
              <rect x="28" y="42" width="24" height="42" fill="#2c2721" rx="3" />
              <circle cx="40" cy="32" r="9" fill="#a89e8c" />

              {/* Figure 2: Seated Woman */}
              <rect x="60" y="48" width="26" height="38" fill="#38322b" rx="4" />
              <circle cx="73" cy="38" r="8" fill="#b0a694" />

              {/* Figure 3: Child standing in front */}
              <rect x="48" y="65" width="18" height="32" fill="#4d443a" rx="2" />
              <circle cx="57" cy="58" r="6.5" fill="#baa995" />

              {/* FIGURE 4: THE MEMORY MECHANIC ANOMALY! */}
              {/* Rendered only if parlorPhotoFigureCount is 4 (Visit 2+ or high tension) */}
              {parlorPhotoFigureCount >= 4 && (
                <g className="transition-opacity duration-1000 opacity-90">
                  {/* Uncanny tall silhouette looming behind the family in the frame */}
                  <rect x="90" y="24" width="22" height="65" fill="#0a0908" rx="2" />
                  <circle cx="101" cy="18" r="7" fill="#141210" />
                  {/* Subtle red glint in eye region */}
                  <circle cx="99" cy="18" r="0.8" fill="#7a1b1b" />
                </g>
              )}
            </g>

            {/* Right Doorway to Corridor Passage */}
            <rect x="790" y="180" width="130" height="340" fill="#060709" stroke="#1d2027" strokeWidth="3" />
          </svg>
        </div>
      )}

      {/* 4. SCENE: THE BREATHING CORRIDOR */}
      {scene.id === 'house-hallway' && (
        <div className={`absolute inset-0 bg-[#090606] flex items-center justify-center ${activeAnomalies.includes('wallBreathing') ? 'anomaly-wall-breathing' : ''}`}>
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            {/* Extreme corridor perspective */}
            <polygon points="0,0 1000,0 580,270 420,270" fill="#080707" />
            <polygon points="0,600 1000,600 580,360 420,360" fill="#0f0c0b" />
            
            {/* Left Wall with Peeling Wallpaper Texture */}
            <polygon points="0,0 420,270 420,360 0,600" fill="#1a1111" stroke="#2b1a1a" strokeWidth="2" />
            {/* Bulging Plaster Anomaly Area (Center Left) */}
            <ellipse cx="260" cy="300" rx="90" ry="70" fill="#241515" opacity="0.75" />
            <path d="M 200,280 Q 260,250 320,290 Q 250,340 200,280 Z" fill="#150a0a" opacity="0.6" />

            {/* Right Wall */}
            <polygon points="1000,0 580,270 580,360 1000,600" fill="#140f0f" stroke="#211717" strokeWidth="2" />

            {/* Vanishing End Doorway */}
            <rect x="460" y="275" width="80" height="85" fill="#030202" stroke="#1a1414" strokeWidth="2" />

            {/* ENTITY: THE TALL ONE (Appears in doorway on high tension or encounter) */}
            {(tensionLevel > 65 || activeEncounter?.type === 'silhouette_distant') && (
              <g className="transition-opacity duration-700 opacity-90">
                {/* Thin, elongated silhouette */}
                <rect x="495" y="280" width="10" height="78" fill="#000000" />
                <ellipse cx="500" cy="281" rx="4" ry="6" fill="#000000" />
              </g>
            )}
          </svg>
        </div>
      )}

      {/* 5. SCENE: THE IMPOSSIBLE ROOM (Ending Scene) */}
      {scene.id === 'house-impossible-room' && (
        <div className="absolute inset-0 bg-[#040305] flex items-center justify-center">
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            {/* Non-Euclidean Room Angles */}
            <polygon points="80,40 920,80 840,540 160,560" fill="#0d0a11" stroke="#241c2e" strokeWidth="4" />
            <polygon points="220,120 780,140 720,460 280,480" fill="#070509" stroke="#18131e" strokeWidth="2" />

            {/* Inscription carved into dry mortar at (500, 300) */}
            <g transform="translate(500, 290)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="#8f8796"
                fontFamily="Cinzel, serif"
                fontSize="18"
                letterSpacing="0.25em"
                opacity="0.85"
              >
                YOU ARE NOT THE FIRST.
              </text>
              <line x1="-160" y1="12" x2="160" y2="12" stroke="#43394d" strokeWidth="1" />
            </g>
          </svg>
        </div>
      )}

      {/* Interactive Hotspot Targets */}
      {scene.hotspots.map((hotspot) => {
        const lit = isHotspotLit(hotspot.xPercent, hotspot.yPercent, hotspot.radiusPercent);
        const explored = revealedHotspots.includes(hotspot.id);

        return (
          <div
            key={hotspot.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-300"
            style={{
              left: `${hotspot.xPercent}%`,
              top: `${hotspot.yPercent}%`,
            }}
          >
            {/* Subtle beacon dot visible when flashlight hovers nearby */}
            <button
              onClick={() => handleHotspotClick(hotspot.id, hotspot.revealsText)}
              className={`group relative flex items-center justify-center p-3 rounded-full cursor-pointer transition-all duration-500 ${
                lit ? 'opacity-100 scale-100' : 'opacity-25 scale-75'
              }`}
              title={hotspot.name}
            >
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-bone/30 group-hover:border-bone/80 group-hover:scale-125 transition-all duration-300" />
              
              {/* Center tactical point */}
              <div className={`w-2.5 h-2.5 rounded-full ${explored ? 'bg-dust/60' : 'bg-bone'} shadow-[0_0_8px_rgba(212,206,190,0.6)]`} />

              {/* Action Button Label (Revealed on flashlight proximity) */}
              {lit && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-10 whitespace-nowrap bg-void/90 border border-dust/30 px-3 py-1.5 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-bone backdrop-blur-md shadow-xl"
                >
                  {hotspot.actionText}
                </motion.div>
              )}
            </button>
          </div>
        );
      })}

      {/* Narrative Subtitle Toast Message */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 max-w-lg w-full text-center px-4 z-40 pointer-events-none"
          >
            <div className="bg-void/90 border-t border-b border-dust/20 py-2.5 px-6 backdrop-blur-md">
              <p className="font-mono text-xs md:text-sm tracking-widest text-bone">
                {activeMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
