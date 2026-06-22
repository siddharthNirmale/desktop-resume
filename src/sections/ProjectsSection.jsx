import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: "Thumbmax",
      tech: "NODE.JS • GEMINI API",
      desc: "AI-powered thumbnail generation platform featuring automated image processing and JWT authentication.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&h=300&fit=crop",
      github: "#",
      live: "https://thumbmax-psi.vercel.app/",
    },
    {
      id: 2,
      title: "Postify",
      tech: "REACT • NODE.JS • MONGODB",
      desc: "Full-stack social media platform with secure REST APIs and efficient CRUD operations.",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&h=300&fit=crop",
      github: "https://github.com/siddharthNirmale/Feed-Pin",
      live: "#",
    },
    {
      id: 3,
      title: "E-commerce UI",
      tech: "REACT • VITE • TAILWIND",
      desc: "Responsive e-commerce interface featuring advanced product filtering and optimized state management.",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600&h=300&fit=crop",
      github: "https://github.com/siddharthNirmale/Ecommerce-Aug",
      live: "https://ecommerce-aug.vercel.app/",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col p-4 md:p-8 bg-[var(--color-desktop)] text-white overflow-hidden font-[var(--font-primary)]">

      {/* HEADER */}
      <div className="
        flex flex-col sm:flex-row sm:justify-between sm:items-end
        pb-5 mb-6 border-b border-[var(--color-surface-border)]
        shrink-0 gap-4
      ">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-[0.2em]">
            SYS<span className="text-[var(--color-accent)]">.</span>PRJCT
          </h1>

          <p className="
            text-[9px] md:text-[10px]
            text-white/40
            tracking-[var(--tracking-super-wide)]
            uppercase mt-2
          ">
            Deployed Architecture // Active Nodes
          </p>
        </div>

        <div className="
          text-[var(--color-accent)]
          text-[10px]
          tracking-[var(--tracking-super-wide)]
          flex items-center gap-2 uppercase font-bold
        ">
          <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full animate-pulse" />
          Online
        </div>
      </div>

      {/* GRID */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-0 md:pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.25 }}
              className="
                relative flex flex-col
                bg-[var(--color-surface)]
                border border-[var(--color-surface-border)]
                group overflow-hidden
                hover:border-[var(--color-accent)]
                transition-all
              "
            >

              {/* TOP ACCENT */}
              <div className="
                absolute top-0 left-0 w-full h-[2px]
                bg-[var(--color-surface-dark)]
                group-hover:bg-[var(--color-accent)]
                transition-colors
              " />

              {/* IMAGE */}
              <div className="
                h-40 md:h-48
                overflow-hidden
                border-b border-[var(--color-surface-border)]
                bg-[var(--color-surface-dark)]
              ">
                <img
                  src={project.image}
                  alt={project.title}
                  className="
                    w-full h-full object-cover
                    grayscale group-hover:grayscale-0
                    transition-all duration-500
                    scale-105 group-hover:scale-100
                  "
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-col flex-1 p-4 md:p-5">

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[var(--color-accent)] text-xs font-bold">
                    ❯
                  </span>

                  <span className="
                    text-[9px] md:text-[10px]
                    text-white/40
                    uppercase tracking-[var(--tracking-super-wide)]
                    font-bold
                  ">
                    {project.tech}
                  </span>
                </div>

                <h3 className="
                  text-lg md:text-xl font-bold
                  tracking-[0.2em] uppercase
                  mb-3 line-clamp-1
                ">
                  {project.title}
                </h3>

                <p className="
                  text-xs md:text-sm text-white/60
                  leading-relaxed mb-6
                  line-clamp-3 flex-1
                ">
                  {project.desc}
                </p>

                {/* ACTIONS */}
                <div className="
                  flex items-center gap-3 mt-auto pt-4
                  border-t border-[var(--color-surface-border)]
                ">

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex-1 flex items-center justify-center gap-2
                      p-2.5 md:p-3
                      bg-[var(--color-surface-dark)]
                      border border-[var(--color-surface-border)]
                      text-white/60
                      hover:text-white hover:border-[var(--color-accent)]
                      transition-all
                      text-[9px] md:text-[10px]
                      font-bold uppercase
                      tracking-[var(--tracking-super-wide)]
                    "
                  >
                    <FiGithub size={14} />
                    Source
                  </a>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex-1 flex items-center justify-center gap-2
                      p-2.5 md:p-3
                      bg-[var(--color-accent)]
                      text-black
                      hover:bg-white
                      transition-all
                      text-[9px] md:text-[10px]
                      font-bold uppercase
                      tracking-[var(--tracking-super-wide)]
                    "
                  >
                    Launch
                    <FiExternalLink size={14} />
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