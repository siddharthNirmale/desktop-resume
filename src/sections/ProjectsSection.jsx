import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiImage } from 'react-icons/fi';

export default function ProjectsSection() {
  // Added placeholder image strings and link properties
  const projects = [
    { 
      id: 1, 
      title: 'Distributed Systems', 
      tech: 'Rust • gRPC', 
      desc: 'A high-performance node architecture for distributed computing and real-time processing.',
      image: '/api/placeholder/400/200', // Replace with your actual image path
      github: '#', 
      live: '#' 
    },
    { 
      id: 2, 
      title: 'Web OS Portfolio', 
      tech: 'React • Tailwind', 
      desc: 'A draggable, modern desktop interface mimicking a native operating system environment.',
      image: '/api/placeholder/400/200',
      github: '#', 
      live: '#' 
    },
    { 
      id: 3, 
      title: 'On-Chain Indexer', 
      tech: 'Node.js • Postgres', 
      desc: 'Real-time blockchain analytics and smart contract monitoring dashboard.',
      image: '/api/placeholder/400/200',
      github: '#', 
      live: '#' 
    },
  ];

  return (
    <div className="h-full flex flex-col p-2 gap-4 bg-[#1a1a1a]">
      
      {/* Flat, Tracked Header to match the OS style */}
      <div className="border-b border-neutral-800 pb-3 mt-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-[0.2em] px-1">
          Deployed Architecture
        </span>
      </div>

      {/* Grid Layout for Cards */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {projects.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              // Card Wrapper: Stark borders, dark background
              className="flex flex-col bg-[#0F0F0F] border border-neutral-800 rounded-2xl overflow-hidden group hover:border-neutral-600 transition-colors"
            >
              
              {/* Project Image Area */}
              <div className="h-28 bg-[#141414] border-b border-neutral-800 relative flex items-center justify-center overflow-hidden">
                {/* Fallback Icon if no image is present */}
                <FiImage size={24} className="text-neutral-800 absolute z-0" strokeWidth={1.5} />
                
                {/* Actual Image (Uncomment and use your real image paths) */}
                {/* <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity relative z-10 grayscale group-hover:grayscale-0" 
                /> */}
              </div>

              {/* Card Content Area */}
              <div className="p-4 flex flex-col flex-1">
                
                {/* Title & Tech Stack */}
                <div className="mb-2">
                  <h3 className="text-sm font-bold text-white tracking-tight leading-none mb-1.5">
                    {project.title}
                  </h3>
                  <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
                    {project.tech}
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-xs text-neutral-400 font-medium leading-relaxed mb-4 line-clamp-2 flex-1">
                  {project.desc}
                </p>
                
                {/* Hardware-style Link Buttons */}
                <div className="flex items-center gap-2 mt-auto">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-8 h-8 rounded-lg border border-neutral-800 bg-[#1a1a1a] text-neutral-500 hover:text-white hover:border-neutral-500 transition-all"
                  >
                    <FiGithub size={14} strokeWidth={2.5} />
                  </a>
                  
                  <a 
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    // Uses the signature red hover to tie it into the OS theme
                    className="flex items-center justify-center w-8 h-8 rounded-lg border border-neutral-800 bg-[#1a1a1a] text-neutral-500 hover:text-[#E51919] hover:border-[#E51919] transition-all ml-auto"
                  >
                    <FiExternalLink size={14} strokeWidth={2.5} />
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