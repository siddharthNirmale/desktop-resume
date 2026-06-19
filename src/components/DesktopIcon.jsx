export default function DesktopIcon({ icon, label, onDoubleClick }) {
  return (
    <div 
      onDoubleClick={onDoubleClick}
      className="w-20 flex flex-col items-center cursor-pointer group p-1 border border-transparent hover:bg-white/20 hover:border-white/40 active:bg-blue-800 active:text-white"
    >
      {/* Icon Placeholder - You can swap this for an image or Lucide icon */}
      <div className="w-10 h-10 bg-blue-200 mb-1 flex items-center justify-center text-2xl shadow-sm">
        {icon}
      </div>
      
      {/* Label with classic text shadow for visibility on wallpapers */}
      <span className="text-white text-xs text-center font-retro drop-shadow-md px-1 select-none">
        {label}
      </span>
    </div>
  );
}