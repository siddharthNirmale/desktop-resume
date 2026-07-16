import { useState, useEffect } from 'react';
import { RefreshCw, Loader2, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const WALLPAPERS = [
  { id: 'default', url: '', name: 'Default Canvas' },
  { id: 'wp1', url: 'https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/6a1dcb7740331b7c4d0d6814/1780337617604/WWDC26_Mac.png', name: 'Dark Forest' },
  { id: 'wp2', url: 'https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/6980fa4328829334c89817ff/1770060355992/FGrad_Feb03_Mac.png', name: 'Abstract Blue' },
  { id: 'wp3', url: 'https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/6972579a8695ad2400d2ec01/1769101210900/OrangeTulip_Mac.png', name: 'Neon Glitch' },
];

const ACCENT_COLORS = [
  { id: 'crimson', value: '#FF453A', name: 'Crimson' },
  { id: 'ios-blue', value: '#0A84FF', name: 'Graphite Blue' },
  { id: 'emerald', value: '#30D158', name: 'Emerald' },
  { id: 'amber', value: '#FF9F0A', name: 'Amber' },
  { id: 'violet', value: '#BF5AF2', name: 'Violet' },
];

function WallpaperButton({ wp, setWallpaper }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <button
      onClick={() => setWallpaper(wp.url)}
      className="group relative h-11 w-11 flex-shrink-0 rounded-xl border border-[var(--color-surface-border)] overflow-hidden hover:border-[var(--color-accent)] transition-colors duration-200 bg-[var(--color-surface-inactive)] cursor-default focus:outline-none"
    >
      {wp.id === 'default' ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-0.5">
          <RefreshCw size={11} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors duration-150" />
          <span className="text-[9px] font-medium text-[var(--color-text-tertiary)] capitalize tracking-normal group-hover:text-[var(--color-text)] transition-colors duration-150">
            Reset
          </span>
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface)] transition-colors duration-250">
              <Loader2 size={11} className="animate-spin text-[var(--color-accent)]" />
            </div>
          )}
          <img
            src={wp.url}
            alt={wp.name}
            className={`w-full h-full object-cover transition-all duration-300 opacity-50 group-hover:opacity-100 group-hover:scale-105 ${isLoading ? 'opacity-0' : ''}`}
            onLoad={() => setIsLoading(false)}
          />
        </>
      )}
    </button>
  );
}

export default function ThemeWidget({ constraintsRef, zIndex, onFocus, setWallpaper }) {
  // 1. Initialize state by checking storage first!
  const [activeAccent, setActiveAccent] = useState(() => {
    const savedAccent = localStorage.getItem('os-accent');
    if (savedAccent) {
      const matched = ACCENT_COLORS.find(c => c.value === savedAccent);
      return matched ? matched.id : 'ios-blue';
    }
    return 'ios-blue'; // Default fallback
  });

  // 2. Save choice to storage on click
  const handleAccentChange = (colorId, colorValue) => {
    setActiveAccent(colorId);
    document.documentElement.style.setProperty('--color-accent', colorValue);
    localStorage.setItem('os-accent', colorValue);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none" }}
      whileDrag={{ cursor: "grabbing" }}
      className="custom-widget absolute top-72 left-6 w-[280px] bg-[#1C1C1E]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4.5 cursor-grab flex flex-col gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] font-primary select-none pointer-events-auto transition-colors duration-250"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
    >
      {/* SECTION 1: WALLPAPER BACKGROUNDS */}
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between items-center px-0.5">
          <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider transition-colors duration-250">
            Desktop Wallpaper
          </span>
        </div>

        <div
          className="flex flex-row items-center gap-3 overflow-x-auto custom-scrollbar pb-1"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {WALLPAPERS.map((wp) => (
            <WallpaperButton key={wp.id} wp={wp} setWallpaper={setWallpaper} />
          ))}
        </div>
      </div>

      <div className="h-[1px] w-full bg-[var(--color-surface-border)] transition-colors duration-250" />

      {/* SECTION 2: SYSTEM ACCENT COLOR */}
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between items-center px-0.5">
          <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider transition-colors duration-250">
            System Accent
          </span>
        </div>

        <div
          className="flex flex-row items-center gap-3.5 px-0.5"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {ACCENT_COLORS.map((color) => {
            const isSelected = activeAccent === color.id;
            return (
              <button
                key={color.id}
                onClick={() => handleAccentChange(color.id, color.value)}
                style={{ backgroundColor: color.value }}
                className={`group relative h-[22px] w-[22px] rounded-full flex items-center justify-center transition-all duration-150 cursor-default hover:scale-105 active:scale-95 focus:outline-none
                  ${isSelected ? 'ring-2 ring-offset-2 ring-offset-transparent ring-[var(--color-text)]' : 'opacity-80 hover:opacity-100'}
                `}
                title={color.name}
              >
                {isSelected && (
                  <Check size={10} className="text-white drop-shadow-md stroke-[3.5]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
