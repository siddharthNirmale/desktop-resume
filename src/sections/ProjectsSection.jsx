import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiGrid,
  FiList,
  FiChevronDown,
  FiCheck,
  FiCopy,
} from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import projects from "../data/project";
import { variants } from "../lib/motion";

export default function ProjectsSection() {
  const projectList = Array.isArray(projects) ? projects : [];

  const [activeFilter, setActiveFilter] = useState("All");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showSort, setShowSort] = useState(false);
  const [copied, setCopied] = useState(false);

  /* ─────────────────────────────────────────────
     TECHNOLOGY FILTERS
  ───────────────────────────────────────────── */

  const filters = useMemo(() => {
    const values = new Set();

    projectList.forEach((project) => {
      if (!project.tech) return;

      const tech = Array.isArray(project.tech)
        ? project.tech
        : String(project.tech)
          .split(/[•,|/]/)
          .map((item) => item.trim());

      tech
        .filter(Boolean)
        .forEach((item) => values.add(item));
    });

    return ["All", ...Array.from(values).slice(0, 7)];
  }, [projectList]);

  /* ─────────────────────────────────────────────
     FILTER + SORT
  ───────────────────────────────────────────── */

  const filteredProjects = useMemo(() => {
    const result = projectList.filter((project) => {
      if (activeFilter === "All") return true;

      return String(project.tech || "")
        .toLowerCase()
        .includes(activeFilter.toLowerCase());
    });

    return [...result].sort((a, b) => {
      if (sort === "featured") {
        return (
          Number(Boolean(b.featured)) -
          Number(Boolean(a.featured))
        );
      }

      if (sort === "newest") {
        return Number(b.year || 0) - Number(a.year || 0);
      }

      if (sort === "oldest") {
        return Number(a.year || 9999) - Number(b.year || 9999);
      }

      if (sort === "a-z") {
        return String(a.title || "").localeCompare(
          String(b.title || "")
        );
      }

      return 0;
    });
  }, [projectList, activeFilter, sort]);

  /* ─────────────────────────────────────────────
     SELECTED PROJECT
  ───────────────────────────────────────────── */

  const selectedProject =
    selectedIndex !== null
      ? filteredProjects[selectedIndex]
      : null;

  /* ─────────────────────────────────────────────
     KEYBOARD NAVIGATION
  ───────────────────────────────────────────── */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedIndex === null) {
        if (event.key === "Escape") {
          setShowSort(false);
        }

        return;
      }

      if (event.key === "Escape") {
        closePreview();
      }

      if (
        event.key === "ArrowRight" &&
        selectedIndex < filteredProjects.length - 1
      ) {
        setSelectedIndex((index) => index + 1);
        setCopied(false);
      }

      if (
        event.key === "ArrowLeft" &&
        selectedIndex > 0
      ) {
        setSelectedIndex((index) => index - 1);
        setCopied(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selectedIndex, filteredProjects.length]);

  /* ─────────────────────────────────────────────
     LOCK BODY
  ───────────────────────────────────────────── */

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [selectedIndex]);

  /* ─────────────────────────────────────────────
     PREVIEW ACTIONS
  ───────────────────────────────────────────── */

  const openPreview = (index) => {
    setSelectedIndex(index);
    setCopied(false);
  };

  const closePreview = () => {
    setSelectedIndex(null);
    setCopied(false);
  };

  const nextProject = () => {
    if (
      selectedIndex !== null &&
      selectedIndex < filteredProjects.length - 1
    ) {
      setSelectedIndex((index) => index + 1);
      setCopied(false);
    }
  };

  const previousProject = () => {
    if (
      selectedIndex !== null &&
      selectedIndex > 0
    ) {
      setSelectedIndex((index) => index - 1);
      setCopied(false);
    }
  };

  const copyProjectLink = async () => {
    if (!selectedProject?.live) return;

    try {
      await navigator.clipboard.writeText(
        selectedProject.live
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      setCopied(false);
    }
  };

  if (projectList.length === 0) {
    return (
      <div
        className="
          flex h-full min-h-full
          items-center justify-center
          bg-[var(--color-surface)]
          font-primary
          text-[var(--color-text-tertiary)]
        "
      >
        <p className="text-[13px]">
          No projects available.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        flex h-full min-h-full w-full
        flex-col overflow-hidden
        bg-[var(--color-surface)]
        font-primary
        text-[var(--color-text)]
        selection:bg-[var(--color-accent)]
        selection:text-white
      "
    >
      {/* ═══════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════ */}

      <header
        className="
          shrink-0
          border-b border-[var(--color-surface-border)]
          px-4 py-4
          sm:px-5
          lg:px-6
        "
      >
        <div
          className="
            flex items-center
            justify-between gap-4
          "
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1
                className="
                  text-[15px]
                  font-semibold
                  tracking-[-0.025em]
                  text-[var(--color-text)]
                "
              >
                Projects
              </h1>

              <span
                className="
                  flex h-[18px] min-w-[18px]
                  items-center justify-center
                  rounded-full
                  bg-[var(--color-surface-inactive)]
                  px-1.5
                  text-[9px]
                  font-semibold
                  tabular-nums
                  text-[var(--color-text-tertiary)]
                "
              >
                {projectList.length}
              </span>
            </div>

            <p
              className="
                mt-1
                text-[11px]
                text-[var(--color-text-tertiary)]
              "
            >
              Selected work & experiments
            </p>
          </div>

          <div
            className="
              hidden
              items-center gap-1.5
              text-[10px]
              font-medium
              text-[var(--color-text-disabled)]
              sm:flex
            "
          >
            <span
              className="
                h-1.5 w-1.5
                rounded-full
                bg-[var(--color-accent)]
              "
            />

            <span>
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1
                ? "project"
                : "projects"}
            </span>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            TOOLBAR
        ═══════════════════════════════════════ */}

        <div
          className="
            mt-4
            flex items-center gap-2
          "
        >
          {/* FILTERS */}

          <div
            className="
              custom-scrollbar
              flex min-w-0 flex-1
              items-center gap-1
              overflow-x-auto
              pb-0.5
            "
          >
            {filters.map((filter) => {
              const active =
                activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() =>
                    setActiveFilter(filter)
                  }
                  className={`
                    shrink-0
                    rounded-full
                    px-2.5 py-1.5
                    text-[10px]
                    font-medium
                    transition-all
                    duration-150

                    ${active
                      ? `
                          bg-[var(--color-text)]
                          text-[var(--color-surface)]
                        `
                      : `
                          text-[var(--color-text-secondary)]
                          hover:bg-[var(--color-surface-inactive)]
                          hover:text-[var(--color-text)]
                        `
                    }
                  `}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* SORT */}

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() =>
                setShowSort((value) => !value)
              }
              className="
                flex h-8 items-center gap-1.5
                rounded-[7px]
                border
                border-[var(--color-surface-border)]
                bg-[var(--color-surface-inactive)]
                px-2
                text-[10px]
                font-medium
                text-[var(--color-text-secondary)]
                transition-colors
                hover:border-[var(--color-window-border)]
                hover:text-[var(--color-text)]
              "
            >
              <span className="hidden sm:inline">
                {getSortLabel(sort)}
              </span>

              <FiChevronDown
                size={11}
                className={`
                  transition-transform
                  duration-200
                  ${showSort ? "rotate-180" : ""}
                `}
              />
            </button>

            <AnimatePresence>
              {showSort && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -4,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -4,
                    scale: 0.98,
                  }}
                  className="
                    absolute right-0 top-[calc(100%+6px)]
                    z-50 min-w-[125px]
                    overflow-hidden
                    rounded-[9px]
                    border
                    border-[var(--color-surface-border)]
                    bg-[var(--color-surface-elevated)]
                    p-1
                    shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                    dark:shadow-[0_12px_30px_rgba(0,0,0,0.3)]
                  "
                >
                  {[
                    ["featured", "Featured"],
                    ["newest", "Newest"],
                    ["oldest", "Oldest"],
                    ["a-z", "A–Z"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        setSort(value);
                        setShowSort(false);
                      }}
                      className={`
                        flex w-full
                        rounded-[6px]
                        px-2.5 py-2
                        text-left
                        text-[10px]
                        transition-colors

                        ${sort === value
                          ? `
                              bg-[var(--color-surface-inactive)]
                              font-semibold
                              text-[var(--color-text)]
                            `
                          : `
                              text-[var(--color-text-secondary)]
                              hover:bg-[var(--color-surface-inactive)]
                              hover:text-[var(--color-text)]
                            `
                        }
                      `}
                    >
                      {label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* VIEW */}

          <div
            className="
              hidden
              items-center
              rounded-[7px]
              border
              border-[var(--color-surface-border)]
              bg-[var(--color-surface-inactive)]
              p-0.5
              sm:flex
            "
          >
            <ViewButton
              active={view === "grid"}
              onClick={() => setView("grid")}
              icon={<FiGrid size={11} />}
              label="Grid"
            />

            <ViewButton
              active={view === "list"}
              onClick={() => setView("list")}
              icon={<FiList size={11} />}
              label="List"
            />
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════
          PROJECT GRID
      ═══════════════════════════════════════════ */}

      <main
        className="
          min-h-0 flex-1
          overflow-y-auto
          custom-scrollbar
          px-4 py-4
          sm:px-5 sm:py-5
          lg:px-6 lg:py-6
        "
      >
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className={`
              mx-auto grid w-full max-w-6xl gap-4 lg:gap-5

              ${view === "grid"
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1"
              }
            `}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map(
                (project, index) => (
                  <ProjectCard
                    key={
                      project.id ||
                      project.title ||
                      index
                    }
                    project={project}
                    index={index}
                    view={view}
                    onPreview={() =>
                      openPreview(index)
                    }
                  />
                )
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState
            filter={activeFilter}
            onClear={() =>
              setActiveFilter("All")
            }
          />
        )}
      </main>

      {/* ═══════════════════════════════════════════
          PREVIEW
      ═══════════════════════════════════════════ */}

      <AnimatePresence>
        {selectedProject && (
          <ProjectPreview
            project={selectedProject}
            index={selectedIndex}
            total={filteredProjects.length}
            copied={copied}
            onClose={closePreview}
            onNext={nextProject}
            onPrevious={previousProject}
            onCopy={copyProjectLink}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PROJECT CARD
═══════════════════════════════════════════════ */

function ProjectCard({
  project,
  index,
  view,
  onPreview,
}) {
  const [imageError, setImageError] =
    useState(false);

  const isList = view === "list";

  return (
    <motion.article
      layout
      variants={variants.fadeUp}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        ...variants.fadeUp.visible.transition,
        delay: Math.min(index * 0.04, 0.2),
      }}
      whileHover="hoverSubtle"
      className={`
        group relative min-w-0 overflow-hidden
        rounded-[14px]
        border
        border-[var(--color-surface-border)]
        bg-[var(--color-surface-inactive)]

        transition-[border-color,background-color,box-shadow]
        duration-300

        hover:border-[var(--color-window-border)]
        hover:bg-[var(--color-surface-elevated)]
        hover:shadow-[0_12px_35px_rgba(0,0,0,0.07)]
        dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]

        ${isList ? "md:flex" : "flex flex-col"}
      `}
    >
      {/* IMAGE */}

      <button
        type="button"
        onClick={onPreview}
        className={`
          group/image
          relative
          block
          overflow-hidden
          text-left

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-inset
          focus-visible:ring-[var(--color-accent)]

          ${isList
            ? "w-full shrink-0 md:w-[290px]"
            : "w-full"
          }
        `}
      >
        <div
          className={`
            relative
            overflow-hidden
            bg-[var(--color-surface-dark)]

            ${isList
              ? "aspect-[16/9] md:h-full md:aspect-auto"
              : "aspect-[16/8.5]"
            }
          `}
        >
          {project.image &&
            !imageError ? (
            <motion.img
              src={project.image}
              alt={
                project.title ||
                "Project preview"
              }
              loading="lazy"
              onError={() =>
                setImageError(true)
              }
              whileHover={{ scale: 1.035 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                h-full w-full
                object-cover
                transition-[filter]
                duration-500
                group-hover/image:brightness-[0.96]
              "
            />
          ) : (
            <FallbackImage
              title={project.title}
              tech={project.tech}
            />
          )}

          {/* Bottom fade */}

          <div
            className="
              pointer-events-none
              absolute inset-x-0 bottom-0 z-[2]
              h-20
              bg-gradient-to-t
              from-black/25
              to-transparent
            "
          />

          {/* Number */}

          <div
            className="
              absolute left-3 top-3 z-[3]
              flex h-6 min-w-6
              items-center justify-center
              rounded-full
              border border-white/20
              bg-black/35
              px-1.5
              text-[9px]
              font-semibold
              tabular-nums
              text-white
              backdrop-blur-md
            "
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Featured */}

          {project.featured && (
            <div
              className="
                absolute bottom-3 left-3 z-[3]
                rounded-full
                bg-white/90
                px-2 py-1
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-black
                backdrop-blur-md
              "
            >
              Featured
            </div>
          )}

          {/* Preview */}

          <div
            className="
              absolute right-3 top-3 z-[3]
              flex h-8 w-8
              items-center justify-center
              rounded-full
              border border-white/20
              bg-black/40
              text-white
              opacity-0
              scale-90
              backdrop-blur-md
              transition-all duration-200
              group-hover/image:scale-100
              group-hover/image:opacity-100
            "
          >
            <FiArrowUpRight size={15} />
          </div>
        </div>
      </button>

      {/* CONTENT */}

      <div
        className={`
          flex min-w-0 flex-1
          flex-col
          px-4 py-4
          sm:px-[18px] sm:py-[17px]

          ${isList ? "md:py-5" : ""}
        `}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2
                className="
                  truncate
                  text-[15px]
                  font-semibold
                  leading-5
                  tracking-[-0.025em]
                  text-[var(--color-text)]
                "
              >
                {project.title}
              </h2>

              {project.status && (
                <StatusBadge
                  status={project.status}
                />
              )}
            </div>

            {project.tech && (
              <p
                className="
                  mt-1
                  truncate
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.09em]
                  text-[var(--color-accent)]
                "
              >
                {formatTech(project.tech)}
              </p>
            )}
          </div>

          {project.year && (
            <span
              className="
                shrink-0
                text-[9px]
                font-medium
                tabular-nums
                text-[var(--color-text-disabled)]
              "
            >
              {project.year}
            </span>
          )}
        </div>

        {/* DESCRIPTION */}

        {project.bullets?.length > 0 && (
          <div className="mt-3.5 flex-1">
            <ul className="space-y-1.5">
              {project.bullets
                .slice(0, isList ? 3 : 2)
                .map((point, i) => (
                  <li
                    key={i}
                    className="
                      flex items-start gap-2
                      text-[11px]
                      leading-[1.55]
                      text-[var(--color-text-secondary)]
                    "
                  >
                    <span
                      className="
                        mt-[6px]
                        h-[3px] w-[3px]
                        shrink-0
                        rounded-full
                        bg-[var(--color-text-disabled)]
                        transition-colors
                        duration-200
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

        {/* ACTIONS */}

        <div
          className="
            mt-4
            flex items-center justify-between
            border-t
            border-[var(--color-surface-border)]
            pt-3
          "
        >
          <div className="flex items-center gap-1.5">
            {project.github && (
              <ProjectAction
                href={project.github}
                icon={<FiGithub size={12} />}
                label="Source"
              />
            )}

            {project.live && (
              <ProjectAction
                href={project.live}
                icon={<FiExternalLink size={12} />}
                label="Live"
                primary
              />
            )}
          </div>

          <button
            type="button"
            onClick={onPreview}
            className="
              flex h-7 w-7
              items-center justify-center
              rounded-full
              text-[var(--color-text-disabled)]
              transition-all duration-200
              hover:bg-[var(--color-surface)]
              hover:text-[var(--color-text)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--color-accent)]
            "
            aria-label={`View ${project.title}`}
          >
            <FiArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════
   PREVIEW
═══════════════════════════════════════════════ */

function ProjectPreview({
  project,
  index,
  total,
  copied,
  onClose,
  onNext,
  onPrevious,
  onCopy,
}) {
  const [imageError, setImageError] =
    useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/50
        p-3
        backdrop-blur-md
        sm:p-6
      "
    >
      <motion.div
        variants={variants.fadeUp}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="
          relative
          flex
          max-h-[92vh]
          w-full
          max-w-4xl
          flex-col
          overflow-hidden
          rounded-[16px]
          border
          border-[var(--color-surface-border)]
          bg-[var(--color-surface)]
          shadow-[0_30px_80px_rgba(0,0,0,0.25)]
          dark:shadow-[0_30px_80px_rgba(0,0,0,0.55)]
        "
      >
        {/* TOP CONTROLS */}

        <div
          className="
            absolute
            left-3 top-3 z-20
            flex items-center gap-1.5
          "
        >
          <button
            type="button"
            onClick={onPrevious}
            disabled={index === 0}
            aria-label="Previous project"
            className="
              flex h-8 w-8
              items-center justify-center
              rounded-full
              border border-white/20
              bg-black/45
              text-white
              backdrop-blur-md
              transition-all
              hover:bg-black/65
              disabled:pointer-events-none
              disabled:opacity-30
            "
          >
            <FiChevronLeft size={15} />
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={index === total - 1}
            aria-label="Next project"
            className="
              flex h-8 w-8
              items-center justify-center
              rounded-full
              border border-white/20
              bg-black/45
              text-white
              backdrop-blur-md
              transition-all
              hover:bg-black/65
              disabled:pointer-events-none
              disabled:opacity-30
            "
          >
            <FiChevronRight size={15} />
          </button>
        </div>

        {/* COUNTER */}

        <div
          className="
            absolute
            right-3 top-3 z-20
            rounded-full
            border border-white/20
            bg-black/45
            px-2.5 py-1.5
            text-[9px]
            font-medium
            tabular-nums
            text-white
            backdrop-blur-md
          "
        >
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </div>

        {/* CLOSE */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="
            absolute
            right-3
            top-14
            z-20
            flex h-8 w-8
            items-center justify-center
            rounded-full
            border border-white/20
            bg-black/45
            text-white
            backdrop-blur-md
            transition-colors
            hover:bg-black/65
            sm:top-3
            sm:right-[90px]
          "
        >
          <FiX size={14} />
        </button>

        {/* IMAGE */}

        <div
          className="
            relative
            shrink-0
            overflow-hidden
            bg-[var(--color-surface-dark)]
          "
        >
          <div
            className="
              aspect-[16/9]
              w-full
              sm:aspect-[16/8]
            "
          >
            {project.image && !imageError ? (
              <img
                src={project.image}
                alt={
                  project.title ||
                  "Project preview"
                }
                onError={() =>
                  setImageError(true)
                }
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            ) : (
              <FallbackImage
                title={project.title}
                tech={project.tech}
              />
            )}
          </div>
        </div>

        {/* DETAILS */}

        <div
          className="
            custom-scrollbar
            overflow-y-auto
            px-5 py-5
            sm:px-7 sm:py-6
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-start
              sm:justify-between
            "
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2
                  className="
                    text-[20px]
                    font-semibold
                    tracking-[-0.035em]
                    text-[var(--color-text)]
                  "
                >
                  {project.title}
                </h2>

                {project.featured && (
                  <StatusBadge status="Featured" />
                )}

                {project.status && (
                  <StatusBadge
                    status={project.status}
                  />
                )}
              </div>

              {project.tech && (
                <p
                  className="
                    mt-1.5
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.1em]
                    text-[var(--color-accent)]
                  "
                >
                  {formatTech(project.tech)}
                </p>
              )}
            </div>

            {project.year && (
              <span
                className="
                  shrink-0
                  text-[10px]
                  font-medium
                  tabular-nums
                  text-[var(--color-text-disabled)]
                "
              >
                {project.year}
              </span>
            )}
          </div>

          {/* DESCRIPTION */}

          {project.bullets?.length > 0 && (
            <ul className="mt-5 space-y-2">
              {project.bullets.map(
                (point, index) => (
                  <li
                    key={index}
                    className="
                      flex items-start gap-2.5
                      text-[12px]
                      leading-[1.6]
                      text-[var(--color-text-secondary)]
                    "
                  >
                    <span
                      className="
                        mt-[7px]
                        h-1 w-1
                        shrink-0
                        rounded-full
                        bg-[var(--color-accent)]
                      "
                    />

                    <span>{point}</span>
                  </li>
                )
              )}
            </ul>
          )}

          {/* ACTIONS */}

          <div
            className="
              mt-6
              flex
              flex-wrap
              items-center
              justify-between
              gap-2
              border-t
              border-[var(--color-surface-border)]
              pt-4
            "
          >
            <div className="flex flex-wrap gap-1.5">
              {project.github && (
                <ProjectAction
                  href={project.github}
                  icon={<FiGithub size={13} />}
                  label="View source"
                />
              )}

              {project.live && (
                <ProjectAction
                  href={project.live}
                  icon={<FiExternalLink size={13} />}
                  label="Open live project"
                  primary
                />
              )}

              {project.live && (
                <button
                  type="button"
                  onClick={onCopy}
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-[7px]
                    px-2.5 py-[7px]
                    text-[10px]
                    font-medium
                    text-[var(--color-text-secondary)]
                    transition-all
                    hover:bg-[var(--color-surface-inactive)]
                    hover:text-[var(--color-text)]
                  "
                >
                  {copied ? (
                    <FiCheck size={12} />
                  ) : (
                    <FiCopy size={12} />
                  )}

                  {copied
                    ? "Copied"
                    : "Copy link"}
                </button>
              )}
            </div>

            <div
              className="
                hidden
                items-center gap-1
                text-[9px]
                text-[var(--color-text-disabled)]
                sm:flex
              "
            >
              <span>Use</span>
              <kbd
                className="
                  rounded-[4px]
                  border
                  border-[var(--color-surface-border)]
                  px-1
                  py-0.5
                  font-mono
                "
              >
                ←
              </kbd>
              <kbd
                className="
                  rounded-[4px]
                  border
                  border-[var(--color-surface-border)]
                  px-1
                  py-0.5
                  font-mono
                "
              >
                →
              </kbd>
              <span>to navigate</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   ACTION
═══════════════════════════════════════════════ */

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
        px-2.5 py-[7px]
        text-[10px]
        font-medium
        transition-all
        duration-200

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--color-accent)]

        ${primary
          ? `
              bg-[var(--color-accent)]
              text-white
              hover:brightness-105
              active:scale-[0.97]
            `
          : `
              text-[var(--color-text-secondary)]
              hover:bg-[var(--color-surface-inactive)]
              hover:text-[var(--color-text)]
            `
        }
      `}
    >
      {icon}

      <span>{label}</span>

      <FiArrowUpRight
        size={9}
        className="
          opacity-45
          transition-transform duration-200
          group-hover/action:-translate-y-0.5
          group-hover/action:translate-x-0.5
        "
      />
    </a>
  );
}

/* ═══════════════════════════════════════════════
   VIEW BUTTON
═══════════════════════════════════════════════ */

function ViewButton({
  active,
  onClick,
  icon,
  label,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`
        flex h-7 w-7
        items-center justify-center
        rounded-[5px]
        transition-all duration-150

        ${active
          ? `
              bg-[var(--color-surface)]
              text-[var(--color-text)]
              shadow-sm
            `
          : `
              text-[var(--color-text-disabled)]
              hover:text-[var(--color-text)]
            `
        }
      `}
    >
      {icon}
    </button>
  );
}

/* ═══════════════════════════════════════════════
   STATUS
═══════════════════════════════════════════════ */

function StatusBadge({ status }) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-1
        rounded-full
        bg-[var(--color-surface-inactive)]
        px-1.5 py-0.5
        text-[8px]
        font-semibold
        uppercase
        tracking-[0.06em]
        text-[var(--color-text-tertiary)]
      "
    >
      <span
        className="
          h-1 w-1
          rounded-full
          bg-[var(--color-accent)]
        "
      />

      {status}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   EMPTY STATE
═══════════════════════════════════════════════ */

function EmptyState({
  filter,
  onClear,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 5,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        flex
        min-h-[280px]
        flex-col
        items-center
        justify-center
        text-center
      "
    >
      <div
        className="
          flex h-10 w-10
          items-center justify-center
          rounded-full
          bg-[var(--color-surface-inactive)]
          text-[var(--color-text-disabled)]
        "
      >
        <FiList size={15} />
      </div>

      <h3
        className="
          mt-3
          text-[13px]
          font-semibold
          text-[var(--color-text)]
        "
      >
        No projects found
      </h3>

      <p
        className="
          mt-1
          text-[11px]
          text-[var(--color-text-tertiary)]
        "
      >
        No projects match {filter}.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="
          mt-4
          rounded-[7px]
          bg-[var(--color-text)]
          px-3 py-1.5
          text-[10px]
          font-medium
          text-[var(--color-surface)]
          transition-opacity
          hover:opacity-80
        "
      >
        Show all projects
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   FALLBACK IMAGE
═══════════════════════════════════════════════ */

function FallbackImage({
  title,
  tech,
}) {
  return (
    <div
      className="
        flex h-full w-full
        items-center justify-center
        bg-[var(--color-surface-dark)]
        px-6 text-center
      "
    >
      <div>
        <div
          className="
            mx-auto
            flex h-10 w-10
            items-center justify-center
            rounded-[10px]
            border border-white/10
            bg-white/5
            text-[14px]
            font-semibold
            text-white/80
          "
        >
          {String(title || "P")
            .charAt(0)
            .toUpperCase()}
        </div>

        <p
          className="
            mt-3
            text-[13px]
            font-semibold
            tracking-[-0.02em]
            text-white
          "
        >
          {title || "Project"}
        </p>

        {tech && (
          <p
            className="
              mt-1
              text-[8px]
              uppercase
              tracking-[0.1em]
              text-white/45
            "
          >
            {formatTech(tech)}
          </p>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════ */

function formatTech(tech) {
  if (Array.isArray(tech)) {
    return tech.join(" • ");
  }

  return String(tech || "").replace(
    /[,|/]+/g,
    " • "
  );
}

function getSortLabel(sort) {
  const labels = {
    featured: "Featured",
    newest: "Newest",
    oldest: "Oldest",
    "a-z": "A–Z",
  };

  return labels[sort] || "Sort";
}
