import { User, FolderCode, FileText, Mail, Terminal } from 'lucide-react';

export default function Dock({ windows, toggleWindow }) {
  // Helper to find if a window is open so we can highlight the icon
  const isOpen = (id) => windows.find(w => w.id === id)?.isOpen;

  // Reusable icon component for the dock
  const DockIcon = ({ id, icon: Icon, label }) => (
    <div className="relative group flex flex-col items-center">
      <button 
        onClick={() => toggleWindow(id, 'isOpen', true)}
        className={`p-3 rounded-xl transition-all duration-200 ${
          isOpen(id) 
            ? 'bg-neutral-800 text-white' 
            : 'text-neutral-500 hover:text-white hover:bg-neutral-800/50'
        }`}
      >
        <Icon size={20} strokeWidth={1.5} />
      </button>
      
      {/* Tooltip on hover */}
      <span className="absolute -top-10 bg-neutral-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-neutral-700 tracking-wider">
        {label}
      </span>
      
      {/* Active dot indicator */}
      {isOpen(id) && (
        <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full" />
      )}
    </div>
  );

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-2 bg-[#121212]/80 backdrop-blur-xl border border-neutral-800 rounded-2xl flex items-center gap-2 shadow-2xl z-[9999]">
      <DockIcon id="about" icon={User} label="About" />
      <DockIcon id="projects" icon={FolderCode} label="Projects" />
      <DockIcon id="notepad" icon={FileText} label="Notes" />
      <DockIcon id="contact" icon={Mail} label="Contact" />
      
      <div className="w-[1px] h-8 bg-neutral-800 mx-2" /> {/* Divider */}
      
      <DockIcon id="terminal" icon={Terminal} label="Terminal" />
    </div>
  );
}