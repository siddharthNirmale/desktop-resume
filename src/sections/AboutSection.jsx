import { FiTerminal } from 'react-icons/fi';
import { SiReact, SiMongodb, SiNodedotjs, SiExpress, SiGooglecloud, SiRender, SiTailwindcss } from 'react-icons/si';

export default function AboutSection() {
  return (
    <div className="flex flex-col h-full p-2 gap-4">
      
      {/* Hardware-Style Profile Header */}
      <div className="flex items-center gap-4 border-b border-neutral-800 pb-4">
        {/* Stark, flat avatar box replacing the old gray inset */}
        <div className="w-14 h-14 bg-[#0F0F0F] border border-neutral-800 rounded-xl flex items-center justify-center text-neutral-500 shadow-inner">
          <FiTerminal size={22} strokeWidth={2} />
        </div>
        
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-medium text-white tracking-tight">
            Siddharth Nirmale
          </h2>
          <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-[0.2em] mt-0.5">
            Full-Stack Developer
          </span>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-5">
        
        {/* Bio Text - Clean, neutral typography */}
        <div className="text-xs text-neutral-400 leading-relaxed font-medium">
          <p className="mb-3">
            I am a developer who loves building highly interactive and scalable web applications. I specialize in the MERN Stack to craft robust backends and dynamic frontends.
          </p>
          <p>
            When I'm not writing code, I'm usually exploring seamless deployment pipelines and setting up infrastructure using Google Cloud Platform and Render to bring projects to life on the web.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div>
          {/* Tracked section header to match the rest of the OS */}
          <h3 className="text-[9px] font-bold text-neutral-600 uppercase tracking-[0.2em] mb-3">
            Core Stack
          </h3>
          
          {/* Tech Badges replacing the bulleted list */}
          <div className="grid grid-cols-2 gap-2">
            <TechBadge icon={SiReact} label="ReactJS" />
            <TechBadge icon={SiNodedotjs} label="Node.js" />
            <TechBadge icon={SiExpress} label="Express" />
            <TechBadge icon={SiMongodb} label="MongoDB" />
            <TechBadge icon={SiTailwindcss} label="Tailwind" />
            <TechBadge icon={SiGooglecloud} label="GCP" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimalist Tech Badge Component
function TechBadge({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2.5 border border-neutral-800 bg-[#0F0F0F] rounded-lg px-3 py-2.5 hover:border-neutral-600 transition-colors group">
      {/* Icon subtly brightens on hover */}
      <Icon className="text-neutral-500 group-hover:text-white transition-colors" size={14} />
      <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest group-hover:text-white transition-colors">
        {label}
      </span>
    </div>
  );
}