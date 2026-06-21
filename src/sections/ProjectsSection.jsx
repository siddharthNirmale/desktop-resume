import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiImage } from 'react-icons/fi';

export default function ProjectsSection() {
  const projects = [
    { 
      id: 1, 
      title: 'Distributed Systems', 
      tech: 'RUST • GRPC', 
      desc: 'A high-performance node architecture for distributed computing and real-time processing.',
      image: '/api/placeholder/400/200', 
      github: '#', 
      live: '#' 
    },
    { 
      id: 2, 
      title: 'Web OS Portfolio', 
      tech: 'REACT • TAILWIND', 
      desc: 'A draggable, modern desktop interface mimicking a native operating system environment.',
      image: '/api/placeholder/400/200',
      github: '#', 
      live: '#' 
    },
    { 
      id: 3, 
      title: 'On-Chain Indexer', 
      tech: 'NODE.JS • POSTGRES', 
      desc: 'Real-time blockchain analytics and smart contract monitoring dashboard.',
      image: '/api/placeholder/400/200',
      github: '#', 
      live: '#' 
    },
  ];

  return (
    // Outer container matching the deep black background of the reference image
    <div className="h-full flex flex-col p-4 gap-6 bg-black">
      
      {/* Header section styled like a digital display label */}
      <div className="pb-2">
        <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-[0.3em]">
          Deployed Architecture
        </span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              // Bento-box card style: Dark grey, large radius, no border, flat UI
              className="flex flex-col bg-[#141414] rounded-[32px] p-4 group"
            >
              
              {/* Website Preview Space - Nested rounded container for that hardware screen look */}
              <div className="h-40 bg-[#0a0a0a] rounded-[24px] mb-5 relative flex items-center justify-center overflow-hidden">
                <FiImage size={28} className="text-neutral-700 absolute z-0" />
                
                {/* Drop your actual image here 
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover relative z-10" 
                  /> 
                */}
              </div>

              {/* Content Area */}
              <div className="flex flex-col flex-1 px-2">
                
                {/* Tech Stack - Styled like the digital clocks in the image */}
                <span className="text-[10px] font-mono font-bold text-neutral-500 tracking-widest mb-2">
                  {project.tech}
                </span>

                <h3 className="text-xl font-semibold text-white tracking-tight leading-none mb-3">
                  {project.title}
                </h3>
                
                <p className="text-sm text-neutral-400 font-medium leading-relaxed mb-6 line-clamp-2">
                  {project.desc}
                </p>
                
                {/* Action Buttons - Mimicking the circular/pill widgets from the image */}
                <div className="flex items-center gap-3 mt-auto">
                  
                  {/* GitHub Button - Stark white circle */}
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors"
                  >
                    <FiGithub size={20} strokeWidth={2.5} />
                  </a>
                  
                  {/* Live Link Button - Signature bright red from the design */}
                  <a 
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E51919] text-white hover:bg-red-600 transition-colors ml-auto"
                  >
                    <FiExternalLink size={20} strokeWidth={2.5} />
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