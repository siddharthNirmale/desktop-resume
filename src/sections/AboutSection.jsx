import { FiTerminal, FiUser, FiLayers } from 'react-icons/fi';
import { 
  SiReact, 
  SiMongodb, 
  SiNodedotjs, 
  SiExpress, 
  SiGooglecloud, 
  SiRender, 
  SiTailwindcss,
  SiGooglegemini 
} from 'react-icons/si';

export default function AboutSection() {
  return (
    // Main container padding adjusted for the grouped card look
    <div className="flex flex-col h-full p-2 gap-4 text-zinc-300">
      
      {/* 1. Profile Card (macOS Style Grouping) */}
      <div className="flex items-center gap-4 bg-[#0a0a0a] border border-zinc-900 rounded-[1.25rem] p-4 shadow-sm">
        <div className="w-14 h-14 bg-black border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 shadow-inner">
          <FiTerminal size={22} strokeWidth={1.5} />
        </div>
        
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-white tracking-tight">
            Siddharth Nirmale
          </h2>
          <span className="text-[10px] font-['NDot',_monospace] font-bold text-zinc-500 uppercase tracking-[0.15em] mt-0.5">
            Full-Stack Developer
          </span>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4 pb-2">
        
        {/* 2. Bio Card */}
        <div className="bg-[#0a0a0a] border border-zinc-900 rounded-[1.25rem] p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-1">
            <FiUser size={14} className="text-zinc-500" />
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">About Me</h3>
          </div>
          <div className="text-[13px] text-zinc-400 leading-relaxed font-medium">
            <p className="mb-3">
              I am a developer who loves building highly interactive and scalable web applications. I specialize in the MERN Stack to craft robust backends and dynamic frontends.
            </p>
            <p>
              When I'm not writing code, I'm usually exploring seamless deployment pipelines and setting up infrastructure using Google Cloud Platform and Render to bring projects to life on the web.
            </p>
          </div>
        </div>

        {/* 3. Tech Stack Card */}
        <div className="bg-[#0a0a0a] border border-zinc-900 rounded-[1.25rem] p-5">
          <div className="flex items-center gap-2 mb-4">
            <FiLayers size={14} className="text-zinc-500" />
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Core Stack</h3>
          </div>
          
          {/* Grid optimized for readability */}
          <div className="grid grid-cols-2 gap-2.5">
            <TechBadge icon={SiReact} label="ReactJS" />
            <TechBadge icon={SiNodedotjs} label="Node.js" />
            <TechBadge icon={SiExpress} label="Express" />
            <TechBadge icon={SiMongodb} label="MongoDB" />
            <TechBadge icon={SiTailwindcss} label="Tailwind" />
            <TechBadge icon={SiGooglecloud} label="GCP" />
            <TechBadge icon={SiRender} label="Render" />
            <TechBadge icon={SiGooglegemini} label="Gemini API" />
          </div>
        </div>
        
      </div>
    </div>
  );
}

// Updated Tech Badge: softer borders, sleek white highlight on hover instead of red
function TechBadge({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3 bg-black border border-zinc-800 rounded-xl px-3.5 py-3 hover:border-zinc-500 hover:bg-[#111] transition-all duration-300 group cursor-default">
      <Icon className="text-zinc-500 group-hover:text-white transition-colors duration-300" size={16} />
      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-zinc-200 transition-colors duration-300 mt-0.5">
        {label}
      </span>
    </div>
  ); 
}