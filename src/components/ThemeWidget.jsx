import { useState, useEffect } from 'react';
import { RefreshCw, Loader2, Check } from 'lucide-react';
import { motion } from 'framer-motion';

import one from "../assets/images/one.jpg"
import two from "../assets/images/two.jpg"
import three from "../assets/images/three.jpg"

const WALLPAPERS = [
  { id: 'default', url: '', name: 'Default Canvas' },
  { id: 'wp1', url: one, name: 'Dark Forest' },
  { id: 'wp2', url: two, name: 'Abstract Blue' },
  { id: 'wp3', url: three, name: 'Neon Glitch' },
];

const ACCENT_COLORS = [
  { id: 'crimson', value: '#FF453A', name: 'Crimson' },
  { id: 'ios-blue', value: '#0066ff', name: 'Electric Blue' }, // Updated to match your vivid blue
  { id: 'emerald', value: '#30D158', name: 'Emerald' },
  { id: 'amber', value: '#ff6b1a', name: 'Bright Orange' }, // Updated to match your orange
  { id: 'violet', value: '#BF5AF2', name: 'Violet' },
];

function WallpaperButton({ wp, setWallpaper }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (e) => {
    const updateWallpaper = () => setWallpaper(wp.url);

    if (!document.startViewTransition) {
      updateWallpaper();
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(updateWallpaper);
    transition.ready.then(() => {
      document.documentElement.animate({
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
      }, { duration: 600, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" });
    });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95, y: 2 }}
      onClick={handleClick}
      className="group relative h-16 w-16 flex-shrink-0 rounded-[14px] overflow-hidden
                 bg-[#f8fafc] dark:bg-[#111317]
                 border-t-[2px] border-t-[#cdd4db] dark:border-t-[#2c3039]
                 border-b-[5px] border-b-[#aeb6c1] dark:border-b-[#000]
                 border-x-[2px] border-x-[#cdd4db] dark:border-x-[#1a1c23]
                 shadow-[0_8px_16px_rgba(0,10,30,0.15)] dark:shadow-[0_8px_16px_rgba(0,0,0,0.6)]
                 transition-colors duration-200 cursor-pointer focus:outline-none"
    >
      {wp.id === 'default' ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-[#eef2f5] dark:bg-[#252830]">
          <div className="p-1.5 rounded-full bg-[#ff6b1a] text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] group-hover:bg-[#ff8533] transition-colors">
            <RefreshCw size={14} strokeWidth={3} />
          </div>
          <span className="text-[9px] font-black text-[#aeb6c1] dark:text-[#424859] uppercase tracking-wider group-hover:text-[#ff6b1a] transition-colors duration-150">
            Reset
          </span>
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#eef2f5] dark:bg-[#252830]">
              <Loader2 size={16} className="animate-spin text-[#0066ff]" strokeWidth={3} />
            </div>
          )}
          <img
            src={wp.url}
            alt={wp.name}
            className={`w-full h-full object-cover transition-all duration-300 opacity-60 group-hover:opacity-100 group-hover:scale-110 ${isLoading ? 'opacity-0' : ''}`}
            onLoad={() => setIsLoading(false)}
          />
          {/* Recessed Screen Overlay Highlight */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_3px_6px_rgba(0,0,0,0.3)] rounded-[12px]" />
        </>
      )}
    </motion.button>
  );
}

export default function ThemeWidget({ constraintsRef, zIndex, onFocus, setWallpaper }) {
  const [activeAccent, setActiveAccent] = useState(() => {
    const savedAccent = localStorage.getItem('os-accent');
    if (savedAccent) {
      const matched = ACCENT_COLORS.find(c => c.value === savedAccent);
      return matched ? matched.id : 'ios-blue';
    }
    return 'ios-blue';
  });

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
      className="custom-widget absolute top-72 left-6 w-[290px] p-5 cursor-grab flex flex-col gap-5 select-none pointer-events-auto
                 bg-[#eef2f5] dark:bg-[#1a1c23]
                 rounded-[28px]
                 border-t-[3px] border-t-white/80 dark:border-t-white/10
                 border-b-[8px] border-b-[#cdd4db] dark:border-b-[#0d0e12]
                 border-x-[4px] border-x-[#e2e8f0] dark:border-x-[#15171d]
                 shadow-[0_25px_50px_rgba(0,10,40,0.25)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.8)]
                 font-primary transition-colors duration-250"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
    >
      {/* Decorative Top Pill (Industrial design detail) */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-[#cdd4db] dark:bg-[#0d0e12] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]" />

      {/* SECTION 1: WALLPAPER BACKGROUNDS */}
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex justify-between items-center px-1">
          <span className="text-[12px] font-black text-[#0066ff] dark:text-[#6699ff] uppercase tracking-widest drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
            Wallpapers
          </span>
        </div>

        <div
          className="flex flex-row items-center gap-3.5 overflow-x-auto custom-scrollbar pb-2 px-1"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {WALLPAPERS.map((wp) => (
            <WallpaperButton key={wp.id} wp={wp} setWallpaper={setWallpaper} />
          ))}
        </div>
      </div>

      {/* Chunky Recessed Divider */}
      <div className="w-full h-[4px] rounded-full bg-[#cdd4db] dark:bg-[#0d0e12] shadow-[1px_1px_0_white] dark:shadow-[1px_1px_0_#2c3039]" />

      {/* SECTION 2: SYSTEM ACCENT COLOR */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-1">
          <span className="text-[12px] font-black text-[#ff6b1a] uppercase tracking-widest drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
            Accent Color
          </span>
        </div>

        <div
          className="flex flex-row items-center justify-between gap-2 px-1 pb-1"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {ACCENT_COLORS.map((color) => {
            const isSelected = activeAccent === color.id;
            return (
              <button
                key={color.id}
                onClick={() => handleAccentChange(color.id, color.value)}
                style={{ backgroundColor: color.value }}
                className={`group relative h-[36px] w-[36px] rounded-full flex items-center justify-center
                            transition-all duration-150 cursor-pointer focus:outline-none
                            shadow-[inset_0_4px_6px_rgba(255,255,255,0.4),_0_6px_10px_rgba(0,0,0,0.2)]
                            ${isSelected
                    ? 'translate-y-[4px] border-b-[1px] border-black/20 ring-4 ring-offset-2 ring-offset-[#eef2f5] dark:ring-offset-[#1a1c23] ring-[#0066ff]'
                    : 'hover:-translate-y-1 border-b-[5px] border-black/30'
                  }`}
                title={color.name}
              >
                {isSelected && (
                  <Check size={16} className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)] stroke-[4]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
