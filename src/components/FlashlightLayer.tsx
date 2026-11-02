// The Last Door - Flashlight & Lighting Layer
import React, { useEffect, useState, useRef } from 'react';
import { useSessionStore } from '../store/sessionStore';

interface FlashlightLayerProps {
  reducedMotion: boolean;
}

export const FlashlightLayer: React.FC<FlashlightLayerProps> = ({ reducedMotion }) => {
  const updateFlashlight = useSessionStore((state) => state.updateFlashlight);
  const activeAnomalies = useSessionStore((state) => state.activeAnomalies);
  const isShadowLagActive = activeAnomalies.includes('shadowLag');

  // Direct flashlight coordinates (percentage 0 to 100)
  const [pos, setPos] = useState({ x: 50, y: 50 });
  
  // Trailing lag coordinates for shadowLag anomaly
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

  // Handle shadow lag trailing effect
  useEffect(() => {
    if (!isShadowLagActive || reducedMotion) return;

    const interval = setInterval(() => {
      // Lerp lag position toward current position with deliberate inertia
      lagRef.current.x += (pos.x - lagRef.current.x) * 0.12;
      lagRef.current.y += (pos.y - lagRef.current.y) * 0.12;
      setLagPos({ x: lagRef.current.x, y: lagRef.current.y });
    }, 32);

    return () => clearInterval(interval);
  }, [isShadowLagActive, pos, reducedMotion]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Volumetric flashlight mask */}
      <div
        className="w-full h-full"
        style={{
          background: `radial-gradient(
            circle 260px at ${pos.x}% ${pos.y}%, 
            rgba(0, 0, 0, 0) 0%, 
            rgba(3, 3, 4, 0.35) 45%, 
            rgba(3, 3, 4, 0.75) 75%, 
            rgba(3, 3, 4, 0.94) 100%
          )`
        }}
      />

      {/* Primary Light Beam Glow */}
      <div
        className="absolute w-[480px] h-[480px] rounded-full pointer-events-none mix-blend-screen opacity-15"
        style={{
          left: `calc(${pos.x}% - 240px)`,
          top: `calc(${pos.y}% - 240px)`,
          background: 'radial-gradient(circle, rgba(230, 225, 205, 0.6) 0%, rgba(200, 190, 160, 0.15) 50%, transparent 75%)',
          transition: reducedMotion ? 'none' : 'transform 0.05s ease-out'
        }}
      />

      {/* Shadow Lag Anomaly Artifact: A trailing occlusion shadow */}
      {isShadowLagActive && !reducedMotion && (
        <div
          className="absolute w-44 h-44 rounded-full pointer-events-none mix-blend-multiply opacity-55"
          style={{
            left: `calc(${lagPos.x}% - 88px)`,
            top: `calc(${lagPos.y}% - 88px)`,
            background: 'radial-gradient(circle, rgba(12, 10, 12, 0.95) 0%, rgba(20, 15, 18, 0.5) 60%, transparent 90%)',
          }}
        />
      )}

      {/* Subtle Dust Motes in Light Beam */}
      <div 
        className="absolute w-64 h-64 pointer-events-none opacity-30 animate-dust"
        style={{
          left: `calc(${pos.x}% - 128px)`,
          top: `calc(${pos.y}% - 128px)`,
          backgroundImage: `radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
                            radial-gradient(1.5px 1.5px at 80px 120px, #e2ded7, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 150px 70px, #ffffff, rgba(0,0,0,0)),
                            radial-gradient(1.5px 1.5px at 210px 180px, #e2ded7, rgba(0,0,0,0))`
        }}
      />
    </div>
  );
};
