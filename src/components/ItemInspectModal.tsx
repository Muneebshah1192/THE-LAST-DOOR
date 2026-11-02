// The Last Door V3 - Item 3D-Style Inspection Modal
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCw, Key, FileText, Zap, Compass } from 'lucide-react';
import { InventoryItem } from '../engine/inventoryEngine';
import { audioDirector } from '../engine/audioDirector';

interface ItemInspectModalProps {
  item: InventoryItem;
  onClose: () => void;
}

export const ItemInspectModal: React.FC<ItemInspectModalProps> = ({ item, onClose }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleFlip = () => {
    audioDirector.playFloorCreak(0);
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-md p-6 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="max-w-md w-full bg-abyss border border-dust/25 p-8 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-dust hover:text-bone transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <p className="font-mono text-[10px] text-blood-light uppercase tracking-[0.3em] mb-1">
          EVIDENCE INSPECTION
        </p>
        <h3 className="font-cinematic text-lg tracking-[0.25em] text-bone uppercase mb-6">
          {item.name}
        </h3>

        {/* Tactile Flip Card Container */}
        <div className="relative min-h-[160px] bg-void/80 border border-dust/15 p-6 mb-6 flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              <motion.div
                key="front"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-charcoal/80 border border-dust/20 flex items-center justify-center text-bone">
                  {item.iconSvgType === 'key' && <Key className="w-8 h-8 text-amber-500" />}
                  {item.iconSvgType === 'paper' && <FileText className="w-8 h-8 text-dust" />}
                  {item.iconSvgType === 'fuse' && <Zap className="w-8 h-8 text-yellow-400" />}
                  {item.iconSvgType === 'compass' && <Compass className="w-8 h-8 text-blue-400 animate-spin" />}
                  {item.iconSvgType !== 'key' && item.iconSvgType !== 'paper' && item.iconSvgType !== 'fuse' && item.iconSvgType !== 'compass' && (
                    <Key className="w-8 h-8 text-bone" />
                  )}
                </div>
                <p className="font-sans text-xs text-bone/90 leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="back"
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <span className="font-mono text-[10px] text-blood-light uppercase tracking-widest block">
                  REVERSE SIDE INSCRIPTION
                </span>
                <p className="font-mono text-xs text-blood-distortion leading-relaxed font-bold">
                  {item.backSideText || 'No markings visible.'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleFlip}
            className="flex items-center space-x-2 text-xs font-mono text-dust hover:text-blood-light transition-colors cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{isFlipped ? 'VIEW FRONT' : 'FLIP & EXAMINE REVERSE'}</span>
          </button>

          <button
            onClick={onClose}
            className="btn-cinematic px-5 py-2 text-xs font-mono uppercase tracking-widest cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    </div>
  );
};
