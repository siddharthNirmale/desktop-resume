import { FiTerminal, FiUser, FiMapPin, FiBook, FiLayers } from 'react-icons/fi';
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
    <div className="h-full flex flex-col p-6 bg-black font-mono overflow-auto custom-scrollbar">
      
      {/* Widget Header */}
      <div className="flex justify-between items-end pb-4 mb-6 border-b border-neutral-900">
        <div>
          <h1 className="text-3xl font-bold tracking-[0.2em] text-white">
            SYS<span className="text-[#f02020]">.</span>USER
          </h1>
          <p className="text-[10px] text-neutral-500 tracking-widest uppercase mt-2">
            Identity Record // Auth: Verified
          </p>
        </div>
        <div className="text-[#f02020] text-[10px] tracking-widest flex items-center gap-2 uppercase">
          <span className="w-1.5 h-1.5 bg-[#f02020] rounded-full animate-pulse"></span>
          Active
        </div>
      </div>

      <div className="flex flex-col gap-6 pb-4">
        
        {/* 1. System ID Badge */}
        <div className="bg-[#050505] border border-neutral-800 flex flex-col md:flex-row relative group">
          {/* Accent Line */}
          <div className="absolute top-0 left-0 w-full md:w-1 h-1 md:h-full bg-[#f02020] opacity-80"></div>
          
          <div className="p-6 md:pr-10 border-b md:border-b-0 md:border-r border-neutral-900 flex items-center justify-center bg-black">
            <div className="w-16 h-16 bg-[#111] border border-neutral-800 flex items-center justify-center text-white relative">
               {/* Corner markers for that HUD feel */}
               <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#f02020]"></div>
               <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#f02020]"></div>
               <FiTerminal size={24} strokeWidth={1.5} />
            </div>
          </div>
          
          <div className="p-6 flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-white tracking-widest uppercase mb-1">
              Siddharth Nirmale
            </h2>
            <div className="text-[#f02020] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              Full-Stack Developer
            </div>
            
            <div className="flex flex-col gap-2 mt-auto">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-neutral-400">
                <FiMapPin className="text-neutral-600" size={12} />
                <span>Indore, Madhya Pradesh</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-neutral-400">
                <FiBook className="text-neutral-600" size={12} />
                <span>MITS Gwalior</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Bio Telemetry */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[#f02020] font-bold">❯</span>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Initialization.Log</h3>
          </div>
          <div className="bg-[#050505] border border-neutral-900 p-5 text-sm text-neutral-400 leading-relaxed tracking-wide">
            <p className="mb-4">
              <span className="text-neutral-600 mr-2">[01]</span>
              I am a developer who loves building highly interactive and scalable web applications. I specialize in the MERN Stack to craft robust backends and dynamic frontends.
            </p>
            <p>
              <span className="text-neutral-600 mr-2">[02]</span>
              When I'm not writing code, I'm usually exploring seamless deployment pipelines and setting up infrastructure using Google Cloud Platform and Render to bring projects to life on the web.
            </p>
          </div>
        </div>

        {/* 3. Tech Stack Matrix */}
        <div className="mt-2">
          <div className="flex items-center gap-3 mb-4">
             <span className="text-[#f02020] font-bold">❯</span>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Core.Dependencies</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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

// Upgraded brutalist Tech Badge
function TechBadge({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3 bg-black border border-neutral-800 p-3 hover:border-[#f02020] hover:bg-[#050505] transition-all duration-200 group cursor-default">
      <Icon className="text-neutral-600 group-hover:text-[#f02020] transition-colors duration-200" size={16} />
      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors duration-200">
        {label}
      </span>
    </div>
  ); 
}