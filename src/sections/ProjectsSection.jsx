import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
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
import { EASING } from "../lib/motion";

/* ─────────────────────────────────────────────────────────────
   MOTION TOKENS
   ───────────────────────────────────────────────────────────── */
const springPreset = {
  type: "spring",
  stiffness: 420,
  damping: 32,
  mass: 0.5,
};

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springPreset,
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.12, ease: EASING.apple },
  },
};

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

      tech.filter(Boolean).forEach((item) => values.add(item));
    });

    return ["All", ...Array.from(values).slice(0, 6)];
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
        return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      }
      if (sort === "newest") {
        return Number(b.year || 0) - Number(a.year || 0);
      }
      if (sort === "oldest") {
        return Number(a.year || 9999) - Number(b.year || 9999);
      }
      if (sort === "a-z") {
        return String(a.title || "").localeCompare(String(b.title || ""));
      }
      return 0;
    });
  }, [projectList, activeFilter, sort]);

  const selectedProject =
    selectedIndex !== null ? filteredProjects[selectedIndex] : null;

  /* ─────────────────────────────────────────────
     KEYBOARD NAVIGATION
  ───────────────────────────────────────────── */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedIndex === null) {
        if (event.key === "Escape") setShowSort(false);
        return;
      }

      if (event.key === "Escape") closePreview();
      if (event.key === "ArrowRight" && selectedIndex < filteredProjects.length - 1) {
        setSelectedIndex((index) => index + 1);
        setCopied(false);
      }
      if (event.key === "ArrowLeft" && selectedIndex > 0) {
        setSelectedIndex((index) => index - 1);
        setCopied(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredProjects.length]);

  const openPreview = (index) => {
    setSelectedIndex(index);
    setCopied(false);
  };

  const closePreview = () => {
    setSelectedIndex(null);
    setCopied(false);
  };

  const nextProject = () => {
    if (selectedIndex !== null && selectedIndex < filteredProjects.length - 1) {
      setSelectedIndex((index) => index + 1);
      setCopied(false);
    }
  };

  const previousProject = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex((index) => index - 1);
      setCopied(false);
    }
  };

  const copyProjectLink = async () => {
    if (!selectedProject?.live) return;
    try {
      await navigator.clipboard.writeText(selectedProject.live);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  if (projectList.length === 0) {
    return (
      <div className="flex h-full min-h-full items-center justify-center bg-[var(--color-surface)] font-primary text-[var(--color-text-tertiary)]">
        <p className="text-[13px]">No projects available.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-full w-full flex-col overflow-hidden bg-[var(--color-surface)] font-primary text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-white">
      {/* ═══════════════════════════════════════════
          HEADER & TOOLBAR
      ═══════════════════════════════════════════ */}
      <header className="shrink-0 border-b border-[var(--color-surface-border)] px-4 py-3.5 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <h1 className="text-[14px] font-semibold tracking-[-0.02em] text-[var(--color-text)] font-heading">
              Projects
            </h1>

            <span className="text-[10px] font-mono font-medium text-[var(--color-text-tertiary)]">
              ({filteredProjects.length})
            </span>
          </div>

          {/* View toggle & Sort */}
          <div className="flex items-center gap-2">
            {/* SORT DROPDOWN */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSort((value) => !value)}
                className="flex h-7 items-center gap-1.5 rounded-[6px] bg-[var(--color-surface-hover)]/40 hover:bg-[var(--color-surface-hover)] px-2 text-[10px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors active:scale-[0.97]"
              >
                <span>{getSortLabel(sort)}</span>
                <FiChevronDown
                  size={10}
                  className={`transition-transform duration-150 ${showSort ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {showSort && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    transition={{ duration: 0.12, ease: EASING.apple }}
                    className="absolute right-0 top-[calc(100%+4px)] z-50 min-w-[110px] overflow-hidden rounded-[8px] bg-[var(--color-surface-elevated)] p-1 shadow-[var(--shadow-popover)] border border-[var(--color-surface-border)]"
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
                        className={`flex w-full rounded-[5px] px-2 py-1.5 text-left text-[10px] transition-colors ${
                          sort === value
                            ? "bg-[var(--color-surface-hover)] font-semibold text-[var(--color-text)]"
                            : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* VIEW SWITCHER WITH MORPHING PILL */}
            <div className="hidden sm:flex items-center rounded-[6px] bg-[var(--color-surface-hover)]/30 p-0.5 relative">
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-label="Grid view"
                className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-[5px] transition-colors duration-150 active:scale-[0.94] ${
                  view === "grid"
                    ? "text-[var(--color-text)] font-medium"
                    : "text-[var(--color-text-disabled)] hover:text-[var(--color-text)]"
                }`}
              >
                {view === "grid" && (
                  <motion.div
                    layoutId="project-active-view-pill"
                    transition={springPreset}
                    className="absolute inset-0 rounded-[5px] bg-[var(--color-surface)] shadow-xs -z-10"
                  />
                )}
                <FiGrid size={11} />
              </button>

              <button
                type="button"
                onClick={() => setView("list")}
                aria-label="List view"
                className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-[5px] transition-colors duration-150 active:scale-[0.94] ${
                  view === "list"
                    ? "text-[var(--color-text)] font-medium"
                    : "text-[var(--color-text-disabled)] hover:text-[var(--color-text)]"
                }`}
              >
                {view === "list" && (
                  <motion.div
                    layoutId="project-active-view-pill"
                    transition={springPreset}
                    className="absolute inset-0 rounded-[5px] bg-[var(--color-surface)] shadow-xs -z-10"
                  />
                )}
                <FiList size={11} />
              </button>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER PILLS WITH MORPHING PILL */}
        <div className="mt-3 flex items-center gap-1 overflow-x-auto custom-scrollbar pb-0.5 relative">
          {filters.map((filter) => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`relative z-10 shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors duration-150 active:scale-[0.96] cursor-pointer ${
                  active
                    ? "text-[var(--color-surface)] font-semibold"
                    : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]/50"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="project-active-filter-pill"
                    transition={springPreset}
                    className="absolute inset-0 rounded-full bg-[var(--color-text)] -z-10"
                  />
                )}
                <span>{filter}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* ═══════════════════════════════════════════
          PROJECT GRID / LIST
      ═══════════════════════════════════════════ */}
      <main className="min-h-0 flex-1 overflow-y-auto custom-scrollbar px-4 py-5 sm:px-6">
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            transition={springPreset}
            className={`mx-auto grid w-full max-w-5xl gap-4 sm:gap-5 ${
              view === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
            }`}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id || project.title || index}
                  project={project}
                  index={index}
                  view={view}
                  onPreview={() => openPreview(index)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState filter={activeFilter} onClear={() => setActiveFilter("All")} />
        )}
      </main>

      {/* ═══════════════════════════════════════════
          PREVIEW MODAL
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
   PROJECT CARD (CLEAN & BORDERLESS)
═══════════════════════════════════════════════ */
function ProjectCard({ project, index, view, onPreview }) {
  const [imageError, setImageError] = useState(false);
  const isList = view === "list";

  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={springPreset}
      className={`group relative overflow-hidden rounded-[12px] bg-[var(--color-surface-hover)]/25 hover:bg-[var(--color-surface-hover)]/45 transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 ${
        isList ? "sm:flex" : "flex flex-col"
      }`}
    >
      {/* IMAGE / THUMBNAIL */}
      <button
        type="button"
        onClick={onPreview}
        className={`group/image relative block overflow-hidden text-left focus-visible:outline-none ${
          isList ? "w-full sm:w-[260px] shrink-0" : "w-full"
        }`}
      >
        <div
          className={`relative overflow-hidden bg-[var(--color-surface-dark)] ${
            isList ? "aspect-[16/9] sm:h-full sm:aspect-auto" : "aspect-[16/9]"
          }`}
        >
          {project.image && !imageError ? (
            <img
              src={project.image}
              alt={project.title || "Project preview"}
              loading="lazy"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover/image:scale-[1.025]"
            />
          ) : (
            <FallbackImage title={project.title} tech={project.tech} />
          )}

          {/* Type / Badge (Understated) */}
          {(project.badge || project.type) && (
            <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[9px] font-medium">
              {project.badge || project.type}
            </div>
          )}

          {/* Quick Preview trigger overlay */}
          <div className="absolute top-2.5 right-2.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover/image:opacity-100 transition-opacity duration-150 backdrop-blur-sm">
            <FiArrowUpRight size={12} />
          </div>
        </div>
      </button>

      {/* CARD CONTENT */}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-4.5 justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="truncate text-[14px] font-heading font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
              {project.title}
            </h2>
            {project.year && (
              <span className="shrink-0 text-[10px] font-mono text-[var(--color-text-tertiary)]">
                {project.year}
              </span>
            )}
          </div>

          {project.tech && (
            <p className="mt-1 truncate text-[11px] text-[var(--color-text-tertiary)]">
              {formatTech(project.tech)}
            </p>
          )}

          {/* Bullets / Summary */}
          {project.bullets?.length > 0 && (
            <ul className="mt-2.5 space-y-1">
              {project.bullets.slice(0, isList ? 2 : 1).map((point, i) => (
                <li
                  key={i}
                  className="line-clamp-2 text-[12px] leading-relaxed text-[var(--color-text-secondary)]"
                >
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-[var(--color-surface-border)]">
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="group/act inline-flex items-center gap-1 text-[11px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
              >
                <FiGithub size={12} />
                <span>Code</span>
              </a>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="group/act inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-accent)] hover:underline transition-colors"
              >
                <span>Live</span>
                <FiArrowUpRight
                  size={11}
                  className="transition-transform group-hover/act:translate-x-0.5 group-hover/act:-translate-y-0.5"
                />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onPreview}
            className="text-[11px] font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════
   PREVIEW MODAL (REFINED MORPH & TRANSITIONS)
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
  const [imageError, setImageError] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const images = useMemo(() => {
    if (Array.isArray(project.images) && project.images.length > 0) {
      return project.images;
    }
    if (project.image) {
      return [project.image];
    }
    return [];
  }, [project]);

  useEffect(() => {
    setActiveImgIndex(0);
    setImageError(false);
  }, [project]);

  const currentImage = images[activeImgIndex] || project.image;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16, ease: EASING.apple }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 sm:p-6 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 6 }}
        transition={springPreset}
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[14px] bg-[var(--color-surface)] shadow-2xl border border-[var(--color-surface-border)]"
      >
        {/* MODAL CONTROLS */}
        <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5">
          <button
            type="button"
            onClick={onPrevious}
            disabled={index === 0}
            aria-label="Previous"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 disabled:opacity-30 transition-all active:scale-[0.94]"
          >
            <FiChevronLeft size={13} />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={index === total - 1}
            aria-label="Next"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 disabled:opacity-30 transition-all active:scale-[0.94]"
          >
            <FiChevronRight size={13} />
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-all active:scale-[0.94]"
        >
          <FiX size={13} />
        </button>

        {/* IMAGE PREVIEW WITH SMOOTH MORPH */}
        <div className="relative shrink-0 overflow-hidden bg-[var(--color-surface-dark)] aspect-[16/9]">
          <AnimatePresence mode="wait">
            {currentImage && !imageError ? (
              <motion.img
                key={currentImage}
                src={currentImage}
                alt={project.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: EASING.apple }}
                onError={() => setImageError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <FallbackImage key="fallback" title={project.title} tech={project.tech} />
            )}
          </AnimatePresence>

          {/* Screenshot dots with morphing pill */}
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-1 backdrop-blur-md">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImgIndex(i)}
                  className="relative flex items-center justify-center p-0.5 cursor-pointer"
                  aria-label={`Screenshot ${i + 1}`}
                >
                  {activeImgIndex === i ? (
                    <motion.div
                      layoutId="preview-active-dot"
                      transition={springPreset}
                      className="h-1.5 w-4 rounded-full bg-[var(--color-accent)]"
                    />
                  ) : (
                    <div className="h-1.5 w-1.5 rounded-full bg-white/50 hover:bg-white/80 transition-colors" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DETAILS WITH SEAMLESS CONTENT MORPH */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id || project.title}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14, ease: EASING.apple }}
            className="custom-scrollbar overflow-y-auto p-5 sm:p-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] font-heading font-semibold text-[var(--color-text)]">
                  {project.title}
                </h2>
                {(project.badge || project.type) && (
                  <span className="px-2 py-0.5 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] text-[9px] font-semibold">
                    {project.badge || project.type}
                  </span>
                )}
              </div>
              {project.year && (
                <span className="text-[11px] font-mono text-[var(--color-text-tertiary)]">
                  {project.year}
                </span>
              )}
            </div>

            {project.tech && (
              <p className="text-[11px] font-medium text-[var(--color-accent)]">
                {formatTech(project.tech)}
              </p>
            )}

            {project.description && (
              <p className="text-[12.5px] leading-relaxed text-[var(--color-text-secondary)]">
                {project.description}
              </p>
            )}

            {project.bullets?.length > 0 && (
              <ul className="space-y-1.5 pt-1">
                {project.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[12px] leading-relaxed text-[var(--color-text-secondary)]"
                  >
                    <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* ACTIONS */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--color-surface-border)]">
              <div className="flex items-center gap-2">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] bg-[var(--color-accent)] text-white text-[11px] font-semibold transition-all hover:brightness-110 active:scale-[0.97]"
                  >
                    <span>Open Live Project</span>
                    <FiArrowUpRight size={12} />
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] bg-[var(--color-surface-hover)] hover:bg-[var(--color-surface-active)] text-[11px] font-medium text-[var(--color-text)] transition-colors active:scale-[0.97]"
                  >
                    <FiGithub size={12} />
                    <span>GitHub</span>
                  </a>
                )}

                {project.live && (
                  <button
                    type="button"
                    onClick={onCopy}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[7px] text-[11px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] transition-colors"
                  >
                    {copied ? <FiCheck size={12} className="text-emerald-400" /> : <FiCopy size={12} />}
                    <span>{copied ? "Copied" : "Copy link"}</span>
                  </button>
                )}
              </div>

              <div className="text-[10px] font-mono text-[var(--color-text-disabled)]">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   EMPTY STATE & HELPERS
═══════════════════════════════════════════════ */
function EmptyState({ filter, onClear }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
      <p className="text-[13px] text-[var(--color-text-tertiary)]">
        No projects match &ldquo;{filter}&rdquo;
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-3 rounded-[6px] bg-[var(--color-text)] px-3 py-1.5 text-[11px] font-medium text-[var(--color-surface)] transition-opacity hover:opacity-90 active:scale-[0.97]"
      >
        Show all
      </button>
    </div>
  );
}

function FallbackImage({ title, tech }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[var(--color-surface-dark)] p-4 text-center">
      <div>
        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-[8px] bg-[var(--color-surface-hover)] text-[13px] font-bold text-[var(--color-text)]">
          {String(title || "P").charAt(0)}
        </div>
        <p className="mt-2 text-[12px] font-semibold text-[var(--color-text)]">{title}</p>
        {tech && <p className="mt-0.5 text-[10px] text-[var(--color-text-tertiary)]">{formatTech(tech)}</p>}
      </div>
    </div>
  );
}

function formatTech(tech) {
  if (Array.isArray(tech)) return tech.join(" · ");
  return String(tech || "").replace(/[,|/•]+/g, " · ");
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
