import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import projects from "../data/project";

export default function ProjectsSection() {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="w-full min-h-full bg-[var(--color-surface)] text-[var(--color-text)] flex flex-col font-primary selection:bg-[var(--color-accent)] selection:text-white">

      {/* Finder-style View Header */}
      <header className="px-8 py-5 border-b border-[var(--color-surface-border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-b from-[var(--color-surface-border)] to-transparent shrink-0">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[var(--color-text)]">
            Projects
          </h1>
          <p className="text-[12px] text-[var(--color-text-tertiary)] mt-0.5">
            Displaying active projects and live cloud deployments.
          </p>
        </div>
      </header>

      {/* Projects Display Canvas */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <ProjectCard key={project.id || i} project={project} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
}

/* ---------------- HELPER COMPONENTS ---------------- */

function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3, ease: "easeOut" }}
      className="
        flex flex-col bg-[var(--color-surface-inactive)] rounded-xl
        border border-[var(--color-surface-border)] overflow-hidden
        shadow-lg group hover:bg-[var(--color-surface-elevated)]
        hover:border-[var(--color-window-border)] transition-all duration-300
      "
    >
      {/* Product Card Image Wrapper */}
      <div className="h-44 md:h-48 relative p-3 md:p-4 overflow-hidden bg-[var(--color-surface-dark)] border-b border-[var(--color-surface-border)] flex items-center justify-center">

        {/* 🌟 GLOW EFFECT 🌟 */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 blur-md opacity-20 group-hover:opacity-80 group-hover:blur-xl group-hover:scale-110 transition-all duration-500 z-0" />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-inactive)] to-transparent z-10 opacity-80 group-hover:opacity-30 transition-opacity duration-300" />

        {/* Image */}
        <img
          src={project.image || "/placeholder.jpg"}
          alt={project.title}
          className="relative w-full h-full object-cover rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-20 transform scale-100 group-hover:scale-[1.04] transition-transform duration-500 ease-out"
        />
      </div>

      {/* Meta Content */}
      <div className="flex flex-col flex-1 p-5 md:p-6 space-y-4 relative z-20">
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-[var(--color-accent)] tracking-wider uppercase">
            {project.tech || "Project"}
          </span>
          <h3 className="text-lg font-semibold text-[var(--color-text)] tracking-tight line-clamp-1">
            {project.title}
          </h3>
        </div>

        <ul className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed font-normal list-disc pl-4 space-y-1 flex-1">
          {project.bullets?.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>

        {/* Actions Container */}
        <div className="flex items-center gap-3 pt-3 border-t border-[var(--color-surface-border)]">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="
                flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md
                bg-[var(--color-surface-border)] border border-transparent
                text-[12px] font-medium text-[var(--color-text-secondary)]
                hover:bg-[var(--color-surface-inactive)] hover:text-[var(--color-text)]
                hover:border-[var(--color-surface-border)] transition-all duration-150
              "
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
              className="
                flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md
                bg-[var(--color-accent)] border border-transparent text-white
                text-[12px] font-medium shadow-sm
                hover:brightness-110 active:brightness-90 transition-all duration-150
              "
            >
              Open Live
              <FiExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
