// The Last Door V3 - Player Inventory Bar
import React, { useState } from 'react';
import { Key, FileText, Zap, Compass, Briefcase } from 'lucide-react';
import { InventoryItem } from '../engine/inventoryEngine';
import { ItemInspectModal } from './ItemInspectModal';

interface InventoryBarProps {
  items: InventoryItem[];
  selectedItemId: string | null;
  onSelectItem: (itemId: string | null) => void;
}

export const InventoryBar: React.FC<InventoryBarProps> = ({
  items,
  selectedItemId,
  onSelectItem,
}) => {
  const [inspectingItem, setInspectingItem] = useState<InventoryItem | null>(null);

  if (items.length === 0) return null;

  return (
    <>
      <div className="fixed bottom-4 left-4 z-40 flex items-center space-x-2 bg-void/85 border border-dust/20 p-1.5 backdrop-blur-md shadow-2xl select-none">
        <div className="flex items-center space-x-1.5 px-2 text-dust/60 border-r border-dust/15 font-mono text-[10px] uppercase tracking-widest">
          <Briefcase className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">EVIDENCE ({items.length})</span>
        </div>

        <div className="flex items-center space-x-1.5">
          {items.map((item) => {
            const isSelected = selectedItemId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectItem(isSelected ? null : item.id)}
                onDoubleClick={() => setInspectingItem(item)}
                className={`relative p-2 rounded transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blood/40 border border-blood-crimson shadow-[0_0_12px_rgba(162,13,25,0.7)] text-white scale-105'
                    : 'bg-charcoal/60 border border-dust/15 hover:border-dust/40 text-dust hover:text-bone'
                }`}
                title={`${item.name} (Double-click to inspect)`}
              >
                {item.iconSvgType === 'key' && <Key className="w-4 h-4 text-amber-500" />}
                {item.iconSvgType === 'paper' && <FileText className="w-4 h-4 text-dust" />}
                {item.iconSvgType === 'fuse' && <Zap className="w-4 h-4 text-yellow-400" />}
                {item.iconSvgType === 'compass' && <Compass className="w-4 h-4 text-blue-400" />}
                {item.iconSvgType !== 'key' && item.iconSvgType !== 'paper' && item.iconSvgType !== 'fuse' && item.iconSvgType !== 'compass' && (
                  <Key className="w-4 h-4 text-bone" />
                )}

                {/* Inspect shortcut pill */}
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectingItem(item);
                  }}
                  className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-void border border-dust/40 text-[8px] font-mono flex items-center justify-center text-dust/80 hover:text-white"
                  title="Inspect Item"
                >
                  ?
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {inspectingItem && (
        <ItemInspectModal
          item={inspectingItem}
          onClose={() => setInspectingItem(null)}
        />
      )}
    </>
  );
};
