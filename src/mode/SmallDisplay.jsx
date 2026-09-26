import React, { useState, useEffect, useCallback, memo } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion, AnimatePresence } from "framer-motion";
import { MorphIcon } from "morphicons/react";
import { Sun, Moon } from "lucide";
import {
  FiExternalLink,
  FiMail,
  FiMapPin,
  FiDownload,
  FiClock,
  FiCpu,
  FiArrowUpRight,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Import centralized data & utilities
import projects from "../data/project";
import skills from "../data/skills";
import resume from "../data/resume";
import iconMap from "../utils/iconMap";
import { safeGetItem, safeSetItem } from "../utils/storage";
import { sanitizeUrl } from "../utils/security";

// Robust date filter that correctly handles crossing over into previous years
const filterResponsiveMonths = (contributions, monthsToShow) => {
  if (monthsToShow >= 12) return contributions;

  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - monthsToShow);

  return contributions.filter((activity) => {
    const date = new Date(activity.date);
    return date >= startDate && date <= endDate;
  });
};

// --- Framer Motion Animation Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

// --- Extracted Clock Component ---
const LiveClock = ({ isDark }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`flex items-center gap-1 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
      <FiClock size={12} /> {currentTime || "Loading..."}
    </span>
  );
};

export default function TerminalPortfolio() {
  const [showNotice, setShowNotice] = useState(true);
  const [visibleMonths, setVisibleMonths] = useState(12);

  const [isLight, setIsLight] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = safeGetItem("os-theme");
    if (saved) return saved === "light";
    return document.documentElement.classList.contains("light-theme");
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const activeIsLight =
        document.documentElement.classList.contains("light-theme") ||
        document.body.classList.contains("light-theme");
      setIsLight(activeIsLight);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(() => {
    const nextLight = !isLight;
    document.documentElement.classList.toggle("light-theme", nextLight);
    document.body.classList.toggle("light-theme", nextLight);
    safeSetItem("os-theme", nextLight ? "light" : "dark");
    setIsLight(nextLight);
  }, [isLight]);

  const isDark = !isLight;

  // Responsive Layout Effect for GitHub Calendar (Optimized with debounce)
  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        if (width < 640) {
          setVisibleMonths(4);
        } else if (width < 1024) {
          setVisibleMonths(8);
        } else {
          setVisibleMonths(12);
        }
      }, 150);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleDownload = () => {
    const resumeUrl = resume;
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.setAttribute("download", "Siddharth_Nirmale_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const transformCalendarData = useCallback(
    (data) => filterResponsiveMonths(data, visibleMonths),
    [visibleMonths]
  );

  return (
    <div className="h-screen w-full bg-[var(--color-desktop)] text-[var(--color-text)] font-primary overflow-y-auto custom-scrollbar selection:bg-[var(--color-accent)] selection:text-white transition-colors duration-200">
      {/* Notice bar for smaller display sizes */}
      {showNotice && (
        <aside
          role="status"
          aria-label="Display recommendation notice"
          className="sticky top-0 z-50 w-full bg-[#30D158] text-black px-4 py-2 sm:py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm font-medium border-b border-black/15 rounded-none select-text"
        >
          <p className="flex-1 text-center sm:text-left leading-snug">
            For the best experience, please use a larger display. This site is designed for bigger screens.
          </p>
          <button
            type="button"
            onClick={() => setShowNotice(false)}
            aria-label="Close notification"
            className="p-1 -mr-1 hover:bg-black/10 active:bg-black/20 text-black transition-colors rounded-none cursor-pointer flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <FiX size={16} aria-hidden="true" />
          </button>
        </aside>
      )}

      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-20 space-y-16 sm:space-y-24">
        {/* --- Profile Header --- */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
          <div className="relative mx-auto sm:mx-0">
            <div
              className={`w-28 h-28 shrink-0 rounded-2xl ${isDark ? "bg-[var(--color-surface)] border border-[var(--color-surface-border)]" : "bg-white border border-zinc-200 shadow-xs"} flex items-center justify-center relative transition-colors`}
            >
              <span className="text-5xl">👨‍💻</span>
            </div>

            {/* Interactive Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-150 cursor-pointer hover:scale-105 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${isDark
                  ? "bg-zinc-800 border-[var(--color-desktop)] text-zinc-200 hover:bg-zinc-700"
                  : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100 shadow-xs"
                }`}
            >
              <MorphIcon
                icon={isDark ? Sun : Moon}
                size={13}
                strokeWidth={2}
                spring="snappy"
              />
            </button>
          </div>

          <div className="space-y-4 flex-1 text-center sm:text-left">
            <div>
              <h1 className={`text-3xl font-heading font-bold tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}>
                Siddharth Nirmale
              </h1>
              <p className="text-[14px] text-zinc-500 font-mono mt-0.5">
                @siddharthNirmale
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-[12px] font-medium">
                <span className={`flex items-center gap-1 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                  <FiMapPin size={12} /> Indore, India
                </span>
                <span className="opacity-30">·</span>
                <span className={isDark ? "text-zinc-400" : "text-zinc-600"}>
                  Available for Opportunities
                </span>
                <span className="opacity-30">·</span>
                <LiveClock isDark={isDark} />
              </div>
            </div>

            <p className={`text-[14px] leading-relaxed max-w-2xl ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              Full Stack Developer passionate about building scalable web
              applications and solving real-world problems. I enjoy developing
              modern applications with{" "}
              <strong className={`font-semibold ${isDark ? "text-zinc-200" : "text-zinc-900"}`}>
                React, Next.js, Node.js, Express.js, and MongoDB
              </strong>
              , integrating AI services, and creating responsive user experiences
              with clean, maintainable code.
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
              <ActionButton icon={<FaLinkedin />} text="LinkedIn" href="https://linkedin.com/in/siddharth-nirmale" isDark={isDark} />
              <ActionButton icon={<FaGithub />} text="GitHub" href="https://github.com/siddharthNirmale" isDark={isDark} />
              <ActionButton icon={<FiMail />} text="Email Me" href="mailto:siddharth175nirmale1@gmail.com" isDark={isDark} />
              <ActionButton icon={<FiDownload />} text="Resume" onClick={handleDownload} isButton primary isDark={isDark} />
            </div>
          </div>
        </div>

        {/* --- Animated Skills Section --- */}
        <section className="space-y-5">
          <SectionHeader title="Skills and Tools" isDark={isDark} />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap gap-2.5"
          >
            {skills.map((skillGroup) => (
              <React.Fragment key={skillGroup.category}>
                {skillGroup.items.map((skill) => (
                  <motion.div
                    key={skill}
                    variants={fadeUpVariant}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className={`flex items-center gap-2 text-[13px] font-medium border px-3 py-1.5 rounded-lg transition-all cursor-default ${isDark
                        ? "text-zinc-300 bg-white/[0.03] border-white/5 hover:bg-white/10 hover:border-green-400/20"
                        : "text-zinc-700 bg-white border-zinc-200 hover:bg-zinc-50 hover:border-green-400/30 shadow-sm"
                      }`}
                  >
                    <span className={isDark ? "text-zinc-400" : "text-zinc-500"}>
                      {iconMap[skill] || <FiCpu size={14} />}
                    </span>
                    {skill}
                  </motion.div>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </section>

        {/* --- Education / Work / GitHub Graph Section --- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <SectionHeader title="Experience & Education" isDark={isDark} />
          <div className={`rounded-2xl p-6 sm:p-8 space-y-8 overflow-hidden ${isDark ? "bg-[var(--color-surface)] border border-[var(--color-surface-border)]" : "bg-white border border-zinc-200 shadow-xs"}`}>
            <div className={`relative border-l ml-2.5 space-y-8 ${isDark ? "border-white/10" : "border-zinc-200"}`}>
              <div className="relative pl-8 group">
                <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${isDark ? "bg-zinc-400" : "bg-zinc-600"}`} />
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1">
                  <div>
                    <h3 className={`text-[14px] font-heading font-semibold ${isDark ? "text-zinc-100" : "text-zinc-900"}`}>
                      Data Science & Development Intern
                    </h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5">
                      Personifwy | Remote
                    </p>
                  </div>
                  <span className={`text-[11px] font-mono border rounded px-2 py-0.5 w-fit mt-1 sm:mt-0 ${isDark ? "text-zinc-400 border-white/10 bg-white/5" : "text-zinc-600 border-zinc-200 bg-zinc-100"}`}>
                    Jan 2024 - May 2024
                  </span>
                </div>
              </div>

              <div className="relative pl-8 group">
                <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${isDark ? "bg-zinc-400" : "bg-zinc-600"}`} />
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1">
                  <div>
                    <h3 className={`text-[14px] font-heading font-semibold ${isDark ? "text-zinc-100" : "text-zinc-900"}`}>
                      MITS Gwalior
                    </h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5">
                      B.Tech Electronics & Telecom (CGPA: 8.49)
                    </p>
                  </div>
                  <span className={`text-[11px] font-mono border rounded px-2 py-0.5 w-fit mt-1 sm:mt-0 ${isDark ? "text-zinc-400 border-white/10 bg-white/5" : "text-zinc-600 border-zinc-200 bg-zinc-100"}`}>
                    2020 - 2024
                  </span>
                </div>
              </div>
            </div>

            <div className={`pt-6 border-t overflow-x-auto custom-scrollbar ${isDark ? "border-white/5" : "border-zinc-100"}`}>
              <div className="pb-3 flex flex-col items-center sm:items-start w-full min-w-[300px]">
                <GitHubCalendar
                  username="siddharthNirmale"
                  colorScheme={isDark ? "dark" : "light"}
                  transformData={transformCalendarData}
                  blockSize={9}
                  blockMargin={3}
                  blockRadius={2}
                  fontSize={12}
                  hideTotalCount
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* --- Projects Section --- */}
        <section className="space-y-5">
          <SectionHeader title="Selected Projects" isDark={isDark} />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-5"
          >
            {projects.map((project) => (
              <SmallProjectCard
                key={project.id || project.title}
                project={project}
                isDark={isDark}
              />
            ))}
          </motion.div>
        </section>

        {/* Footer */}
        <section className="pt-4 pb-12">
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 border-t pt-6 ${isDark ? "border-white/10" : "border-zinc-200"}`}>
            <p className="text-[12px] text-zinc-500 font-medium">
              © {new Date().getFullYear()} Siddharth Nirmale
            </p>
            <p className="text-[12px] text-zinc-500 font-mono">
              Desktop Resume OS
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function SectionHeader({ title, isDark }) {
  return (
    <div className="flex items-center gap-4 mb-2">
      <h2 className={`text-[13px] font-heading font-semibold tracking-wider uppercase whitespace-nowrap ${isDark ? "text-white" : "text-zinc-900"}`}>
        {title}
      </h2>
      <div className={`h-[1px] flex-1 ${isDark ? "bg-white/10" : "bg-zinc-200"}`} />
    </div>
  );
}

function ActionButton({ icon, text, href, onClick, isButton, primary, isDark }) {
  const baseClasses =
    "inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-[12px] font-medium rounded-lg transition-all duration-150 cursor-pointer border active:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2";

  const styles = primary
    ? isDark
      ? "bg-white text-black border-transparent hover:bg-zinc-200 shadow-xs active:brightness-95"
      : "bg-zinc-900 text-white border-transparent hover:bg-zinc-800 shadow-xs active:brightness-95"
    : isDark
      ? "bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10 hover:text-white active:bg-white/15"
      : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900 shadow-xs active:bg-zinc-200";

  if (isButton) {
    return (
      <button type="button" onClick={onClick} className={`${baseClasses} ${styles}`}>
        {icon} {text}
      </button>
    );
  }
  return (
    <a
      href={sanitizeUrl(href)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${text} (opens in new tab)`}
      className={`${baseClasses} ${styles}`}
    >
      {icon} {text}
    </a>
  );
}

function LinkBadge({ icon, text, href, isDark }) {
  const safeHref = sanitizeUrl(href);
  return (
    <a
      href={safeHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      aria-label={`${text} (opens in new tab)`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-lg text-[11px] font-medium transition-all duration-150 active:scale-[0.95] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${isDark
          ? "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white active:bg-white/15"
          : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 shadow-xs active:bg-zinc-200"
        }`}
    >
      {icon} {text}
    </a>
  );
}

const SmallProjectCard = memo(function SmallProjectCard({ project, isDark }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      variants={fadeUpVariant}
      className={`group relative flex flex-col rounded-2xl overflow-hidden transition-colors duration-200 ${
        isDark
          ? "bg-[var(--color-surface)] border border-[var(--color-surface-border)]"
          : "bg-white border border-zinc-200 shadow-xs"
      }`}
    >
      {/* THUMBNAIL / VISUAL (CLEAN & MINIMAL INITIAL STATE) */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? `Hide details for ${project.title}` : `Show details for ${project.title}`}
        className="group/image relative block w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] cursor-pointer"
      >
        <div
          className={`relative w-full aspect-[16/9] overflow-hidden shrink-0 ${
            isDark ? "bg-black/40" : "bg-zinc-100"
          }`}
        >
          <img
            src={project.thumbnail || project.image || "/placeholder.jpg"}
            alt={
              project.title
                ? `${project.title} - Full-stack project preview by Siddharth Nirmale`
                : "Portfolio project preview by Siddharth Nirmale"
            }
            width={720}
            height={405}
            loading="lazy"
            decoding="async"
            className="relative w-full h-full object-cover z-10 transition-transform duration-300 ease-out group-hover/image:scale-[1.025]"
          />

          {/* Interactive affordance (Transitions.dev style) */}
          <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-sm text-white text-[11px] font-medium transition-all duration-200 group-hover/image:bg-black/85 group-hover/image:scale-105">
            <span>{isExpanded ? "Close" : "Details"}</span>
            <FiChevronDown
              size={12}
              className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
            />
          </div>
        </div>
      </button>

      {/* FULL PROJECT DETAILS (REVEALED ON INTERACTION) */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.22, delay: 0.06, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.14, ease: "easeOut" },
              },
            }}
            className="overflow-hidden"
          >
            <div className={`p-5 sm:p-6 flex-1 flex flex-col border-t ${isDark ? "border-white/5" : "border-zinc-200"}`}>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className={`text-[16px] font-heading font-semibold tracking-tight flex items-center gap-2 ${isDark ? "text-white" : "text-zinc-900"}`}>
                    {project.title}
                    <FiArrowUpRight className="opacity-60 text-zinc-400" size={16} />
                  </h3>
                  {(project.badge || project.type) && (
                    <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${isDark ? "bg-white/5 text-zinc-300 border-white/10" : "bg-zinc-100 text-zinc-700 border-zinc-200"}`}>
                      {project.badge || project.type}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {project.live && (
                    <LinkBadge icon={<FiExternalLink size={12} />} text="Live" href={project.live} isDark={isDark} />
                  )}
                  {project.github && (
                    <LinkBadge icon={<FaGithub size={12} />} text="Repo" href={project.github} isDark={isDark} />
                  )}
                </div>
              </div>

              <ul className={`text-[13px] leading-relaxed mb-6 flex-1 list-disc pl-4 space-y-1.5 ${isDark ? "text-zinc-400 marker:text-zinc-600" : "text-zinc-600 marker:text-zinc-400"}`}>
                {project.bullets.map((bullet, i) => (
                  <li key={i}>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.split(" • ").map((tech) => (
                    <span
                      key={tech}
                      className={`text-[11px] font-medium px-2 py-0.5 border rounded-md ${isDark
                          ? "bg-white/5 border-white/5 text-zinc-400"
                          : "bg-zinc-100 border-zinc-200 text-zinc-600"
                        }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
