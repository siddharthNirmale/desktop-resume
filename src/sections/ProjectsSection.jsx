import { motion } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiArrowUpRight,
} from "react-icons/fi";
import { useState } from "react";
import projects from "../data/project";

export default function ProjectsSection() {
  if (!projects || projects.length === 0) {
    return (
      <div
        className="
          flex
          h-full
          min-h-full
          items-center
          justify-center
          bg-[var(--color-surface)]
          text-[var(--color-text-tertiary)]
          font-primary
        "
      >
        <p className="text-[13px]">No projects available.</p>
      </div>
    );
  }

  return (
    <div
      className="
        flex
        h-full
        min-h-full
        w-full
        flex-col
        overflow-hidden

        bg-[var(--color-surface)]
        text-[var(--color-text)]

        font-primary

        selection:bg-[var(--color-accent)]
        selection:text-white
      "
    >
      {/* ─────────────────────────────────────────────
          HEADER
      ───────────────────────────────────────────── */}
      <header
        className="
          flex
          shrink-0
          items-center
          justify-between

          border-b
          border-[var(--color-surface-border)]

          px-5
          py-3.5

          sm:px-6
        "
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1
              className="
                text-[15px]
                font-semibold
                tracking-[-0.02em]
                text-[var(--color-text)]
              "
            >
              Projects
            </h1>

            <span
              className="
                rounded-full
                bg-[var(--color-surface-inactive)]
                px-1.5
                py-0.5

                text-[9px]
                font-semibold
                tabular-nums
                text-[var(--color-text-tertiary)]
              "
            >
              {projects.length}
            </span>
          </div>

          <p
            className="
              mt-0.5
              text-[11px]
              text-[var(--color-text-tertiary)]
            "
          >
            Selected work & experiments
          </p>
        </div>
      </header>

      {/* ─────────────────────────────────────────────
          PROJECT GRID
      ───────────────────────────────────────────── */}
      <main
        className="
          min-h-0
          flex-1
          overflow-y-auto
          custom-scrollbar

          px-4
          py-4

          sm:px-5
          sm:py-5

          lg:px-6
          lg:py-6
        "
      >
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-6xl
            grid-cols-1
            gap-3

            md:grid-cols-2
            md:gap-4
          "
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || project.title || index}
              project={project}
              index={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────── */

function ProjectCard({ project, index }) {
  const [imageError, setImageError] = useState(false);

  const imageSrc =
    !imageError && project.image
      ? project.image
      : "/placeholder.jpg";

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: Math.min(index * 0.06, 0.3),
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -2,
      }}
      className="
        group
        relative
        flex
        min-w-0
        flex-col
        overflow-hidden

        rounded-[11px]

        border
        border-[var(--color-surface-border)]

        bg-[var(--color-surface-inactive)]

        transition-[border-color,background-color,box-shadow]
        duration-200

        hover:border-[var(--color-window-border)]
        hover:bg-[var(--color-surface-elevated)]

        hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]
        dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.22)]
      "
    >
      {/* ─────────────────────────────────────────
          IMAGE
      ───────────────────────────────────────── */}
      <div
        className="
          relative
          aspect-[16/8]
          w-full
          overflow-hidden

          bg-[var(--color-surface-dark)]

          border-b
          border-[var(--color-surface-border)]
        "
      >
        <motion.img
          src={imageSrc}
          alt={project.title || "Project preview"}
          onError={() => setImageError(true)}
          loading="lazy"
          whileHover={{
            scale: 1.025,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            h-full
            w-full
            object-cover
          "
        />

        {/* Image overlay action */}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            className="
              absolute
              right-2.5
              top-2.5
              z-10

              flex
              h-7
              w-7
              items-center
              justify-center

              rounded-full

              border
              border-white/15

              bg-black/60

              text-white

              opacity-0
              scale-90

              backdrop-blur-sm

              transition-all
              duration-150

              group-hover:scale-100
              group-hover:opacity-100

              hover:bg-black/80

              focus-visible:scale-100
              focus-visible:opacity-100
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--color-accent)]
            "
          >
            <FiArrowUpRight size={14} />
          </a>
        )}
      </div>

      {/* ─────────────────────────────────────────
          CONTENT
      ───────────────────────────────────────── */}
      <div
        className="
          flex
          flex-1
          flex-col

          px-4
          py-3.5
        "
      >
        {/* Title / metadata */}
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2
                className="
                  truncate

                  text-[14px]
                  font-semibold
                  leading-5
                  tracking-[-0.015em]

                  text-[var(--color-text)]
                "
              >
                {project.title}
              </h2>

              <p
                className="
                  mt-0.5
                  truncate

                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.06em]

                  text-[var(--color-accent)]
                "
              >
                {project.tech || "Project"}
              </p>
            </div>

            <span
              className="
                shrink-0
                pt-0.5

                text-[10px]
                font-medium

                text-[var(--color-text-disabled)]
              "
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Description */}
        {project.bullets?.length > 0 && (
          <div className="mt-3 flex-1">
            <ul className="space-y-1">
              {project.bullets.slice(0, 3).map((point, i) => (
                <li
                  key={i}
                  className="
                    flex
                    items-start
                    gap-2

                    text-[11px]
                    leading-[1.55]

                    text-[var(--color-text-secondary)]
                  "
                >
                  <span
                    className="
                      mt-[6px]
                      h-1
                      w-1
                      shrink-0
                      rounded-full

                      bg-[var(--color-text-disabled)]

                      transition-colors
                      duration-150

                      group-hover:bg-[var(--color-accent)]
                    "
                  />

                  <span className="line-clamp-2">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ─────────────────────────────────────
            ACTIONS
        ───────────────────────────────────── */}
        {(project.github || project.live) && (
          <div
            className="
              mt-3.5
              flex
              items-center
              gap-1.5

              border-t
              border-[var(--color-surface-border)]

              pt-2.5
            "
          >
            {project.github && (
              <ProjectAction
                href={project.github}
                icon={<FiGithub size={13} />}
                label="Code"
              />
            )}

            {project.live && (
              <ProjectAction
                href={project.live}
                icon={<FiExternalLink size={13} />}
                label="Live"
                primary
              />
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   ACTION
───────────────────────────────────────────── */

function ProjectAction({
  href,
  icon,
  label,
  primary = false,
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group/action
        inline-flex
        items-center
        gap-1.5

        rounded-[7px]

        px-2.5
        py-1.5

        text-[11px]
        font-medium

        transition-all
        duration-150

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--color-accent)]

        ${primary
          ? `
              bg-[var(--color-accent)]
              text-white

              hover:brightness-110
              active:brightness-95
            `
          : `
              border
              border-[var(--color-surface-border)]

              bg-[var(--color-surface)]

              text-[var(--color-text-secondary)]

              hover:border-[var(--color-window-border)]
              hover:text-[var(--color-text)]
            `
        }
      `}
    >
      {icon}

      <span>{label}</span>

      <FiArrowUpRight
        size={10}
        className="
          opacity-50
          transition-transform
          duration-150

          group-hover/action:translate-x-0.5
          group-hover/action:-translate-y-0.5
        "
      />
    </a>
  );
}
