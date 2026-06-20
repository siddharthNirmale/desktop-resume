import { motion } from 'framer-motion';
import { ImageIcon, RefreshCw } from 'lucide-react';

const WALLPAPERS = [
  { id: 'default', url: '', name: 'Default Dots' },
  { id: 'wp1', url: 'https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/6a1dcb7740331b7c4d0d6814/1780337617604/WWDC26_Mac.png', name: 'Dark Forest' },
  { id: 'wp2', url: 'https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/6980fa4328829334c89817ff/1770060355992/FGrad_Feb03_Mac.png', name: 'Abstract Blue' },
  { id: 'wp3', url: 'https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/6972579a8695ad2400d2ec01/1769101210900/OrangeTulip_Mac.png', name: 'Neon Glitch' },
];

export default function ThemeWidget({ constraintsRef, zIndex, onFocus, setWallpaper }) {
  return (
    <motion.div
      drag dragMomentum={false} dragConstraints={constraintsRef} onPointerDown={onFocus}
      style={{ zIndex }}
      // Updated to p-4
      className="absolute top-55 left-3 w-64 bg-[#1a1a1a] border border-neutral-800 rounded-3xl p-4 cursor-move"
      
    >
      {/* Header with red dot */}
      <div className="flex justify-between items-center mb-4 px-1">
        <div className="flex items-center gap-2">
          <ImageIcon size={14} className="text-neutral-500" />
          <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Wallpaper</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-accent " />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {WALLPAPERS.map((wp) => (
          <button 
            key={wp.id} 
            onClick={() => setWallpaper(wp.url)} 
            className="group relative w-full h-16 rounded-xl border border-neutral-700 overflow-hidden hover:border-accent transition-all"
          >
            {wp.id === 'default' ? (
              <div className="w-full h-full bg-[#050505] flex items-center justify-center">
                <RefreshCw size={16} className="text-neutral-600 group-hover:text-white" />
              </div>
            ) : (
              <img src={wp.url} alt="Wallpaper" className="w-full h-full object-cover" />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}