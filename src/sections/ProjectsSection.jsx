import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: "Thumbmax",
      tech: "Node.js • Gemini API",
      desc: "AI-powered thumbnail generation platform featuring automated image processing and JWT authentication.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&h=300&fit=crop",
      github: "#",
      live: "https://thumbmax-psi.vercel.app/",
    },
    {
      id: 2,
      title: "Postify",
      tech: "React • Node.js • MongoDB",
      desc: "Full-stack social media platform with secure REST APIs and efficient CRUD operations.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&h=300&fit=crop",
      github: "https://github.com/siddharthNirmale/Feed-Pin",
      live: "#",
    },
    {
      id: 3,
      title: "E-commerce UI",
      tech: "React • Vite • Tailwind",
      desc: "Responsive e-commerce interface featuring advanced product filtering and optimized state management.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600&h=300&fit=crop",
      github: "https://github.com/siddharthNirmale/Ecommerce-Aug",
      live: "https://ecommerce-aug.vercel.app/",
    },
  ];

  return (
    <div className="w-full min-h-full bg-surface text-white flex flex-col font-primary selection:bg-accent/30 selection:text-white">
      
      {/* Finder-style View Header Sub-Bar */}
      <div className="px-8 py-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-b from-white/[0.02] to-transparent shrink-0">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white/95">
            Production Repositories
          </h1>
          <p className="text-[12px] text-white/40 mt-0.5">
            Displaying active projects and live cloud deployments.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[12px] text-white/50 font-medium">
          <span className="w-2 h-2 bg-[#27C93F] rounded-full shadow-[0_0_8px_#27C93F]" />
          Synchronized
        </div>
      </div>

      {/* Projects Display Canvas */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3, ease: "easeOut" }}
              className="flex flex-col bg-[#202022]/60 rounded-xl border border-white/5 overflow-hidden shadow-lg group hover:bg-[#242426]/80 hover:border-white/10 transition-all duration-200"
            >
              {/* Product Card Image Banner */}
              <div className="h-44 md:h-48 overflow-hidden bg-black/40 relative border-b border-black/20">
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/40 to-transparent z-10 opacity-60 group-hover:opacity-20 transition-opacity duration-300" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform scale-[1.02] group-hover:scale-100 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Document Meta Content */}
              <div className="flex flex-col flex-1 p-5 md:p-6 space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-accent tracking-wider uppercase">
                    {project.tech}
                  </span>
                  <h3 className="text-lg font-semibold text-white/95 tracking-tight line-clamp-1">
                    {project.title}
                  </h3>
                </div>

                <p className="text-[13px] text-white/60 leading-relaxed font-normal line-clamp-3 flex-1">
                  {project.desc}
                </p>

                {/* Micro Button Tray Actions */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-white/5 border border-white/5 text-[12px] font-medium text-white/70 hover:bg-white/10 hover:text-white hover:border-white/10 transition-all duration-150"
                  >
                    <FiGithub size={13} />
                    Repository
                  </a>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-accent text-white text-[12px] font-medium hover:bg-accent-hover transition-all duration-150 shadow-sm"
                  >
                    Open Live
                    <FiExternalLink size={13} />
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