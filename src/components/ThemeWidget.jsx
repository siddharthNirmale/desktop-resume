import { useState, useEffect, memo, useCallback } from 'react';
import { RefreshCw, Loader2, Check } from 'lucide-react';
import { motion } from 'framer-motion';

import one from "../assets/images/one.png";
import two from "../assets/images/two.jpg";
import three from "../assets/images/three.jpg";

const WALLPAPERS = [
  { id: 'default', url: '', name: 'Default Canvas' },
  { id: 'wp1', url: one, name: 'Dark Forest' },
  { id: 'wp2', url: two, name: 'Abstract Blue' },
  { id: 'wp3', url: three, name: 'Neon Glitch' },
];

const ACCENT_COLORS = [
  { id: 'crimson', value: '#FF453A', name: 'Crimson' },
  { id: 'ios-blue', value: '#0A84FF', name: 'Graphite Blue' },
  { id: 'emerald', value: '#30D158', name: 'Emerald' },
  { id: 'amber', value: '#FF9F0A', name: 'Amber' },
  { id: 'violet', value: '#BF5AF2', name: 'Violet' },
];

// 🧠 Caches the base64 strings so we don't re-render canvases if the user closes and reopens the widget
const thumbnailCache = {};

const generateThumbnail = (src, size = 64) => {
  if (thumbnailCache[src]) {
    return Promise.resolve(thumbnailCache[src]); // Return instantly if already generated
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = size / Math.max(img.width, img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const base64 = canvas.toDataURL('image/jpeg', 0.6);
      thumbnailCache[src] = base64; // Save to cache!
      resolve(base64);
    };
    img.onerror = () => resolve(src);
  });
};

const WallpaperButton = memo(({ wp, setWallpaper }) => {
  const [thumbUrl, setThumbUrl] = useState(thumbnailCache[wp.url] || null);
  const [isThumbLoading, setIsThumbLoading] = useState(!thumbnailCache[wp.url] && wp.id !== 'default');
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    if (wp.id === 'default' || thumbUrl) return;

    let isMounted = true;
    generateThumbnail(wp.url).then((tinyImage) => {
      if (isMounted) {
        setThumbUrl(tinyImage);
        setIsThumbLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [wp.url, wp.id, thumbUrl]);

  const handleClick = async (e) => {
    if (wp.id !== 'default') {
      setIsApplying(true);

      await new Promise((resolve) => {
        const img = new Image();
        img.src = wp.url;
        img.onload = resolve;
        img.onerror = resolve;
      });

      setIsApplying(false);
    }

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

  // 🛑 DO NOT RENDER anything but a skeleton if the thumbnail is still generating
  if (isThumbLoading) {
    return (
      <div className="group relative h-11 w-11 flex-shrink-0 rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-surface-inactive)] flex items-center justify-center">
        <Loader2 size={11} className="animate-spin text-[var(--color-text-secondary)] opacity-50" />
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isApplying}
      className="group relative h-11 w-11 flex-shrink-0 rounded-xl border border-[var(--color-surface-border)] overflow-hidden hover:border-[var(--color-accent)] transition-colors duration-200 bg-[var(--color-surface-inactive)] cursor-default focus:outline-none disabled:opacity-80"
    >
      {isApplying && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <Loader2 size={14} className="animate-spin text-white" />
        </div>
      )}

      {wp.id === 'default' ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-0.5">
          <RefreshCw size={11} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors duration-150" />
          <span className="text-[9px] font-medium text-[var(--color-text-tertiary)] capitalize tracking-normal group-hover:text-[var(--color-text)] transition-colors duration-150">
            Reset
          </span>
        </div>
      ) : (
        <img
          src={thumbUrl}
          alt={wp.name}
          // 🚀 Because thumbUrl is a pre-calculated Base64 string, this renders instantly. No `onLoad` needed.
          className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
        />
      )}
    </button>
  );
});

const AccentButton = memo(({ color, isSelected, onSelect }) => (
  <button
    onClick={() => onSelect(color.id, color.value)}
    style={{ backgroundColor: color.value }}
    className={`group relative h-[22px] w-[22px] rounded-full flex items-center justify-center transition-all duration-150 cursor-default hover:scale-105 active:scale-95 focus:outline-none
      ${isSelected ? 'ring-2 ring-offset-2 ring-offset-transparent ring-[var(--color-text)]' : 'opacity-80 hover:opacity-100'}
    `}
    title={color.name}
  >
    {/* Removed drop-shadow here to match the flat aesthetic */}
    {isSelected && (
      <Check size={10} className="text-white stroke-[3.5]" />
    )}
  </button>
));
export default function ThemeWidget({ constraintsRef, zIndex, onFocus, setWallpaper }) {
  const [activeAccent, setActiveAccent] = useState(() => {
    const savedAccent = localStorage.getItem('os-accent');
    if (savedAccent) {
      const matched = ACCENT_COLORS.find(c => c.value === savedAccent);
      return matched ? matched.id : 'ios-blue';
    }
    return 'ios-blue';
  });

  const handleAccentChange = useCallback((colorId, colorValue) => {
    setActiveAccent(colorId);
    document.documentElement.style.setProperty('--color-accent', colorValue);
    localStorage.setItem('os-accent', colorValue);
  }, []);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none", willChange: "transform, opacity" }}
      whileDrag={{ cursor: "grabbing" }}
      // Increased blur, removed shadow, and applied rounded-[24px] for the cohesive Apple look
      className="custom-widget absolute top-72 left-6 w-[280px] bg-[#1C1C1E]/50 backdrop-blur-2xl border border-white/5 rounded-[24px] p-4.5 cursor-grab flex flex-col gap-4 font-primary select-none pointer-events-auto transition-colors duration-250"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
    >
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between items-center px-0.5">
          <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
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

      <div className="h-[1px] w-full bg-[var(--color-surface-border)]" />

      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between items-center px-0.5">
          <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
            System Accent
          </span>
        </div>

        <div
          className="flex flex-row items-center gap-3.5 px-0.5"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {ACCENT_COLORS.map((color) => (
            <AccentButton
              key={color.id}
              color={color}
              isSelected={activeAccent === color.id}
              onSelect={handleAccentChange}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
