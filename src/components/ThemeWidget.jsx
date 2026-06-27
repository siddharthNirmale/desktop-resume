import { useState } from 'react';
import { RefreshCw, Loader2, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const WALLPAPERS = [
  { id: 'default', url: '', name: 'Default Dots' },
  { id: 'wp1', url: 'https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/6a1dcb7740331b7c4d0d6814/1780337617604/WWDC26_Mac.png', name: 'Dark Forest' },
  { id: 'wp2', url: 'https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/6980fa4328829334c89817ff/1770060355992/FGrad_Feb03_Mac.png', name: 'Abstract Blue' },
  { id: 'wp3', url: 'https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/6972579a8695ad2400d2ec01/1769101210900/OrangeTulip_Mac.png', name: 'Neon Glitch' },
];

const ACCENT_COLORS = [
  { id: 'lavender', value: '#9D7BFF', name: 'Lavender' },
  { id: 'ios-blue', value: '#0A84FF', name: 'iOS Blue' },
  { id: 'emerald', value: '#10b981', name: 'Emerald' },
  { id: 'amber', value: '#f59e0b', name: 'Amber' },
  { id: 'crimson', value: '#e11d48', name: 'Crimson' },
];

function WallpaperButton({ wp, setWallpaper }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <button 
      onClick={() => setWallpaper(wp.url)} 
      // Scaled down to h-11 w-11 and rounded-xl for the compact look
      className="group relative h-11 w-11 flex-shrink-0 rounded-xl border border-surface-border overflow-hidden hover:border-accent transition-colors duration-300 bg-surface cursor-pointer"
    >
      {wp.id === 'default' ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-0.5">
          <RefreshCw size={12} className="text-text-tertiary group-hover:text-accent transition-colors duration-300" />
          <span className="text-[8px] font-medium text-text-tertiary group-hover:text-text transition-colors duration-300">
            Clear
          </span>
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-surface">
              <Loader2 size={10} className="animate-spin text-accent" />
            </div>
          )}
          <img 
            src={wp.url} 
            alt={wp.name} 
            className={`w-full h-full object-cover transition-all duration-500 opacity-40 group-hover:opacity-100 group-hover:scale-105 ${isLoading ? 'opacity-0' : ''}`}
            onLoad={() => setIsLoading(false)}
          />
        </>
      )}
    </button>
  );
}

export default function ThemeWidget({ constraintsRef, zIndex, onFocus, setWallpaper }) {
  const [activeAccent, setActiveAccent] = useState('lavender');

  const handleAccentChange = (colorId, colorValue) => {
    setActiveAccent(colorId);
    document.documentElement.style.setProperty('--color-accent', colorValue);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.15}
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none" }}
      whileDrag={{ scale: 1.01, cursor: "grabbing" }}
      // Compact adjustments: w-[240px], p-4, gap-4. Overriding border-radius slightly to fit the smaller size.
      className="absolute top-70 left-3 w-[240px] glass-panel !rounded-3xl p-4 cursor-grab flex flex-col gap-4 font-primary"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* SECTION 1: WALLPAPER BACKGROUNDS */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center select-none">
          {/* Scaled text down to text-xs */}
          <span className="text-xs font-medium text-text-secondary">
            Wallpapers
          </span>
        </div>
        <div className="flex flex-row items-center gap-2.5 overflow-x-auto custom-scrollbar pb-1.5">
          {WALLPAPERS.map((wp) => (
            <WallpaperButton key={wp.id} wp={wp} setWallpaper={setWallpaper} />
          ))}
        </div>
      </div>

      {/* Subtle thin separator line */}
      <div className="h-[1px] w-full bg-surface-border rounded-full" />

      {/* SECTION 2: SYSTEM ACCENT COLOR */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center select-none">
          <span className="text-xs font-medium text-text-secondary">
            System accent
          </span>
        </div>
        
        <div className="flex flex-row items-center gap-3">
          {ACCENT_COLORS.map((color) => {
            const isSelected = activeAccent === color.id;
            return (
              <button
                key={color.id}
                onClick={() => handleAccentChange(color.id, color.value)}
                style={{ backgroundColor: color.value }}
                // Shrunk to h-5 w-5 for the tighter layout
                className={`group relative h-5 w-5 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95
                  ${isSelected ? 'ring-2 ring-offset-1 ring-offset-surface-dark ring-white' : 'opacity-60 hover:opacity-100'}
                `}
                title={color.name}
              >
                {isSelected && (
                  <Check size={10} className="text-black stroke-[3.5]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}