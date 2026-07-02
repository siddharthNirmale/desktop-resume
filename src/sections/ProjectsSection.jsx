import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import projects from "../data/project";

export default function ProjectsSection() {
  // Guard clause if data is empty or undefined
  if (!projects || projects.length === 0) return null;

  return (
    <div className="w-full min-h-full bg-surface text-white flex flex-col font-primary selection:bg-accent/30 selection:text-white">
      
      {/* Finder-style View Header */}
      <div className="px-8 py-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-b from-white/[0.02] to-transparent shrink-0">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white/95">
            Projects
          </h1>
          <p className="text-[12px] text-white/40 mt-0.5">
            Displaying active projects and live cloud deployments.
          </p>
        </div>
      </div>

      {/* Projects Display Canvas */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.id || i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3, ease: "easeOut" }}
              className="flex flex-col bg-[#202022]/60 rounded-xl border border-white/5 overflow-hidden shadow-lg group hover:bg-[#242426]/80 hover:border-white/10 transition-all duration-300"
            >
              {/* Product Card Image */}
              <div className="h-44 md:h-48 relative p-3 md:p-4 overflow-hidden bg-black/40 border-b border-black/20 flex items-center justify-center">
                
                {/* 🌟 THE FUN GLOW EFFECT 🌟 */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 blur-md opacity-20 group-hover:opacity-80 group-hover:blur-xl group-hover:scale-110 transition-all duration-500 z-0" />
                
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/80 to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
                
                {/* Actual Image */}
                <img
                  src={project.image || "/placeholder.jpg"}
                  alt={project.title}
                  className="relative w-full h-full object-cover rounded-lg shadow-2xl shadow-black/60 z-20 transform scale-100 group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                />
              </div>

              {/* Meta Content */}
              <div className="flex flex-col flex-1 p-5 md:p-6 space-y-4 relative z-20">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-accent tracking-wider uppercase">
                    {project.tech || "Project"}
                  </span>
                  <h3 className="text-lg font-semibold text-white/95 tracking-tight line-clamp-1">
                    {project.title}
                  </h3>
                </div>

                <ul className="text-[13px] text-white/60 leading-relaxed font-normal list-disc pl-4 space-y-1 flex-1">
                  {project.bullets?.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-white/5 border border-white/5 text-[12px] font-medium text-white/70 hover:bg-white/10 hover:text-white hover:border-white/10 transition-all duration-150"
                    >
                      <FiGithub size={13} />
                      Repository
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-accent text-white text-[12px] font-medium hover:bg-accent-hover transition-all duration-150 shadow-sm"
                    >
                      Open Live
                      <FiExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}