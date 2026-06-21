import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiImage } from 'react-icons/fi';

export default function ProjectsSection() {
  const projects = [
    { 
      id: 1, 
      title: 'Web OS Portfolio', 
      tech: 'REACTJS • NODE.JS • GCP', // Stack integrated from user data
      desc: 'A draggable, modern desktop interface mimicking a native operating system environment.',
      image: '/api/placeholder/400/200',
      github: '#', 
      live: '#' 
    },
    { 
      id: 2, 
      title: 'Dimension Shift', 
      tech: '2D • 3D • VFX', 
      desc: 'A video where a 2D animated character appears on a computer screen and naturally steps out into the real world, transforming into a highly detailed 3D version of itself.',
      image: '/api/placeholder/400/200',
      github: '#', 
      live: '#' 
    },
    { 
      id: 3, 
      title: 'Premium Brand Launch', 
      tech: 'ANIMATION • MOTION', 
      desc: 'A premium product launch animation featuring a central product, suitable for a premium brand campaign.',
      image: '/api/placeholder/400/200',
      github: '#', 
      live: '#' 
    },
    { 
      id: 4, 
      title: 'Arch. Timelapse', 
      tech: 'VIDEO • PRODUCTION', 
      desc: 'Vertical format, high-speed cinematic timelapse of a massive renovation project featuring synchronized construction work.',
      image: '/api/placeholder/400/200',
      github: '#', 
      live: '#' 
    },
  ];

  return (
    <div className="h-full flex flex-col p-6 bg-black font-mono overflow-hidden custom-scrollbar">
      
      {/* Widget Header */}
      <div className="flex justify-between items-end pb-4 mb-6 border-b border-neutral-900 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-[0.2em] text-white">
            SYS<span className="text-[#f02020]">.</span>PRJCT
          </h1>
          <p className="text-[10px] text-neutral-500 tracking-widest uppercase mt-2">
            Deployed Architecture // Active Nodes
          </p>
        </div>
        <div className="text-[#f02020] text-[10px] tracking-widest flex items-center gap-2 uppercase font-bold">
          <span className="w-1.5 h-1.5 bg-[#f02020] rounded-full animate-pulse"></span>
          Online
        </div>
      </div>

      {/* Scrollable Grid Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-4 pr-2">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="flex flex-col bg-[#050505] border border-neutral-900 group relative hover:border-neutral-700 transition-colors rounded-none"
            >
              {/* Telemetry Accent Line */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-neutral-900 group-hover:bg-[#f02020] transition-colors z-10"></div>
              
              {/* Hardware Screen Image Area */}
              <div className="h-48 bg-black border-b border-neutral-900 relative flex items-center justify-center overflow-hidden p-2">
                {/* Crosshairs overlay for a HUD feel */}
                <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-neutral-700"></div>
                <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-neutral-700"></div>
                <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-neutral-700"></div>
                <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-neutral-700"></div>
                
                <FiImage size={24} className="text-neutral-800 z-0" />
                
                {/* 
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500" 
                  /> 
                */}
              </div>

              {/* Content Area */}
              <div className="flex flex-col flex-1 p-5">
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#f02020] text-xs font-bold">❯</span>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                    {project.tech}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-widest uppercase mb-3 line-clamp-1">
                  {project.title}
                </h3>
                
                <p className="text-xs text-neutral-400 font-medium leading-relaxed mb-6 line-clamp-3 flex-1 tracking-wide">
                  {project.desc}
                </p>
                
                {/* Brutalist Action Buttons */}
                <div className="flex items-center gap-3 mt-auto pt-5 border-t border-neutral-900">
                  
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-black border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#f02020] transition-all text-[10px] font-bold uppercase tracking-widest group/btn"
                  >
                    <FiGithub size={14} className="group-hover/btn:text-[#f02020] transition-colors" /> Source
                  </a>
                  
                  <a 
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-white text-black hover:bg-[#f02020] hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest group/btn border border-transparent"
                  >
                    Launch <FiExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                  
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}