import { ImageIcon, RefreshCw } from 'lucide-react';
import BaseWidget from './BaseWidget';

const WALLPAPERS = [
  { id: 'default', url: '', name: 'Default Dots' },
  { id: 'wp1', url: 'https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/6a1dcb7740331b7c4d0d6814/1780337617604/WWDC26_Mac.png', name: 'Dark Forest' },
  { id: 'wp2', url: 'https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/6980fa4328829334c89817ff/1770060355992/FGrad_Feb03_Mac.png', name: 'Abstract Blue' },
  { id: 'wp3', url: 'https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/6972579a8695ad2400d2ec01/1769101210900/OrangeTulip_Mac.png', name: 'Neon Glitch' },
];

export default function ThemeWidget({ constraintsRef, zIndex, onFocus, setWallpaper }) {
  return (
    <BaseWidget
      constraintsRef={constraintsRef}
      zIndex={zIndex}
      onFocus={onFocus}
      className="top-55 left-3 w-64" // Just pass the positioning and width!
      title="Wallpaper"
      icon={ImageIcon}
    >
      <div className="grid grid-cols-2 gap-2">
        {WALLPAPERS.map((wp) => (
          <button 
            key={wp.id} 
            onClick={() => setWallpaper(wp.url)} 
            className="group relative w-full h-16 rounded-xl border border-neutral-700 overflow-hidden hover:border-white transition-all"
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
    </BaseWidget>
  );
}