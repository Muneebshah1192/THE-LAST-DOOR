// The Last Door V2 - Flashlight, Lighting & Temporary Failure Layer
import React, { useEffect, useState, useRef } from 'react';
import { useSessionStore } from '../store/sessionStore';

interface FlashlightLayerProps {
  reducedMotion: boolean;
}

export const FlashlightLayer: React.FC<FlashlightLayerProps> = ({ reducedMotion }) => {
  const updateFlashlight = useSessionStore((state) => state.updateFlashlight);
  const activeAnomalies = useSessionStore((state) => state.activeAnomalies);
  const flashlightFailure = useSessionStore((state) => state.flashlightFailure);
  const isShadowLagActive = activeAnomalies.includes('shadowLag');

  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [lagPos, setLagPos] = useState({ x: 50, y: 50 });
  const lagRef = useRef({ x: 50, y: 50 });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      const xPct = Math.max(0, Math.min(100, (clientX / window.innerWidth) * 100));
      const yPct = Math.max(0, Math.min(100, (clientY / window.innerHeight) * 100));

      setPos({ x: xPct, y: yPct });
      updateFlashlight(xPct, yPct);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [updateFlashlight]);

  useEffect(() => {
    if (!isShadowLagActive || reducedMotion) return;

    const interval = setInterval(() => {
      lagRef.current.x += (pos.x - lagRef.current.x) * 0.12;
      lagRef.current.y += (pos.y - lagRef.current.y) * 0.12;
      setLagPos({ x: lagRef.current.x, y: lagRef.current.y });
    }, 32);

    return () => clearInterval(interval);
  }, [isShadowLagActive, pos, reducedMotion]);

  // If temporary flashlight failure occurs under peak tension, blackout mask takes over!
  if (flashlightFailure) {
    return (
      <div className="absolute inset-0 pointer-events-none z-25 bg-void/98 transition-opacity duration-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-blood animate-pulse opacity-40" />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Volumetric flashlight mask */}
      <div
        className="w-full h-full"
        style={{
          background: `radial-gradient(
            circle 270px at ${pos.x}% ${pos.y}%, 
            rgba(0, 0, 0, 0) 0%, 
            rgba(5, 5, 5, 0.4) 45%, 
            rgba(5, 5, 5, 0.78) 75%, 
            rgba(5, 5, 5, 0.96) 100%
          )`
        }}
      />

      {/* Primary Light Beam Glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none mix-blend-screen opacity-15"
        style={{
          left: `calc(${pos.x}% - 250px)`,
          top: `calc(${pos.y}% - 250px)`,
          background: 'radial-gradient(circle, rgba(235, 230, 215, 0.65) 0%, rgba(200, 190, 160, 0.15) 50%, transparent 75%)',
          transition: reducedMotion ? 'none' : 'transform 0.05s ease-out'
        }}
      />

      {/* Shadow Lag Anomaly */}
      {isShadowLagActive && !reducedMotion && (
        <div
          className="absolute w-48 h-48 rounded-full pointer-events-none mix-blend-multiply opacity-65"
          style={{
            left: `calc(${lagPos.x}% - 96px)`,
            top: `calc(${lagPos.y}% - 96px)`,
            background: 'radial-gradient(circle, rgba(16, 5, 8, 0.98) 0%, rgba(30, 10, 15, 0.5) 60%, transparent 90%)',
          }}
        />
      )}

      {/* Floating Dust Motes */}
      <div 
        className="absolute w-64 h-64 pointer-events-none opacity-30 animate-dust"
        style={{
          left: `calc(${pos.x}% - 128px)`,
          top: `calc(${pos.y}% - 128px)`,
          backgroundImage: `radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
                            radial-gradient(1.5px 1.5px at 80px 120px, #D8D6D2, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 150px 70px, #ffffff, rgba(0,0,0,0)),
                            radial-gradient(1.5px 1.5px at 210px 180px, #D8D6D2, rgba(0,0,0,0))`
        }}
      />
    </div>
  );
};
