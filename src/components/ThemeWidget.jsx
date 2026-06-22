import { useState } from 'react';
import { RefreshCw, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const WALLPAPERS = [
  { id: 'default', url: '', name: 'Default Dots' },
  { id: 'wp1', url: 'https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/6a1dcb7740331b7c4d0d6814/1780337617604/WWDC26_Mac.png', name: 'Dark Forest' },
  { id: 'wp2', url: 'https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/6980fa4328829334c89817ff/1770060355992/FGrad_Feb03_Mac.png', name: 'Abstract Blue' },
  { id: 'wp3', url: 'https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/6972579a8695ad2400d2ec01/1769101210900/OrangeTulip_Mac.png', name: 'Neon Glitch' },
];

function WallpaperButton({ wp, setWallpaper }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <button 
      onClick={() => setWallpaper(wp.url)} 
      // Swapped to bg-surface, border-surface-border, hover:border-accent
      className="group relative w-full h-20 rounded-2xl border border-surface-border overflow-hidden hover:border-accent transition-colors duration-300 bg-surface"
    >
      {wp.id === 'default' ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          {/* Swapped text colors to standard neutral-500 and accent */}
          <RefreshCw size={16} className="text-neutral-500 group-hover:text-accent transition-colors" />
          <span className="text-micro font-mono text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors">
            Default
          </span>
        </div>
      ) : (
        <>
          {isLoading && (
            // Spinner container matches button background
            <div className="absolute inset-0 flex items-center justify-center bg-surface">
              <Loader2 size={16} className="animate-spin text-accent" />
            </div>
          )}
          <img 
            src={wp.url} 
            alt={wp.name} 
            className={`w-full h-full object-cover transition-opacity duration-500 opacity-60 group-hover:opacity-100 ${isLoading ? 'opacity-0' : ''}`}
            onLoad={() => setIsLoading(false)}
          />
        </>
      )}
    </button>
  );
}

export default function ThemeWidget({ constraintsRef, zIndex, onFocus, setWallpaper }) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.15}
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none" }}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      // Standardized sizing and global theme colors
      className="absolute top-60 left-3 w-64 bg-surface-dark border border-surface-border rounded-3xl p-4 cursor-grab flex flex-col gap-3 shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Integrated Header - Matches all other widgets */}
      <div className="flex justify-between items-center px-1 select-none">
        <span className="text-micro font-bold text-neutral-500 uppercase tracking-super-wide font-primary">
          THEME
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-1">
        {WALLPAPERS.map((wp) => (
          <WallpaperButton key={wp.id} wp={wp} setWallpaper={setWallpaper} />
        ))}
      </div>
    </motion.div>
  );
}