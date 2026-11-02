// The Last Door - Universal Horror Media & Animation Component
import React, { useRef, useEffect, useState } from 'react';
import { HorrorAsset } from '../engine/assetRegistry';
import { useSessionStore } from '../store/sessionStore';

interface HorrorMediaProps {
  asset: HorrorAsset;
  className?: string;
  style?: React.CSSProperties;
  opacity?: number;
  onEnded?: () => void;
  onClick?: () => void;
}

export const HorrorMedia: React.FC<HorrorMediaProps> = ({
  asset,
  className = '',
  style = {},
  opacity,
  onEnded,
  onClick
}) => {
  const reducedMotion = useSessionStore((state) => state.reducedMotion);
  const isPaused = useSessionStore((state) => state.isPaused);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadError, setLoadError] = useState(false);

  // Sync video play/pause with application state and reduced motion
  useEffect(() => {
    if (!videoRef.current) return;
    if (reducedMotion || isPaused) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {
        // Autoplay policy or codec error - fallback seamlessly
        setLoadError(true);
      });
    }
  }, [reducedMotion, isPaused]);

  const activeOpacity = opacity !== undefined ? opacity : (asset.defaultOpacity ?? 1.0);
  const blendMode = asset.blendMode || 'normal';

  const combinedStyle: React.CSSProperties = {
    ...style,
    opacity: activeOpacity,
    mixBlendMode: blendMode
  };

  // If video format
  if (asset.type === 'video' && !loadError) {
    return (
      <video
        ref={videoRef}
        autoPlay
        muted
        loop={asset.loop !== false}
        playsInline
        preload="auto"
        onError={() => setLoadError(true)}
        onEnded={onEnded}
        onClick={onClick}
        className={`pointer-events-none select-none object-cover ${className}`}
        style={combinedStyle}
      >
        <source src={asset.path} type={asset.path.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
        {asset.fallbackPath && <source src={asset.fallbackPath} />}
      </video>
    );
  }

  // Fallback if video failed or asset is image/svg/webp/gif
  const sourcePath = (loadError && asset.fallbackPath) ? asset.fallbackPath : asset.path;

  return (
    <img
      src={sourcePath}
      alt={asset.name}
      onError={() => {
        if (!loadError && asset.fallbackPath) {
          setLoadError(true);
        }
      }}
      onClick={onClick}
      className={`pointer-events-none select-none ${className}`}
      style={combinedStyle}
      loading="lazy"
    />
  );
};
