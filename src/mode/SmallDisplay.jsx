import React, { useState, useEffect, useCallback } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
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
} from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Import centralized data & utilities
import projects from "../data/project";
import skills from "../data/skills";
import resume from "../data/resume";
import iconMap from "../utils/iconMap";

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
  const [visibleMonths, setVisibleMonths] = useState(12);
  const [isDark, setIsDark] = useState(true);

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
    <div className={`h-screen w-full transition-colors duration-300 ${isDark ? "bg-[#0c0c10] text-zinc-400 selection:bg-zinc-800 selection:text-white" : "bg-zinc-50 text-zinc-600 selection:bg-zinc-200 selection:text-black"} font-primary overflow-y-auto custom-scrollbar`}>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${isDark ? "#27272a" : "#d4d4d8"}; border-radius: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: ${isDark ? "#3f3f46" : "#a1a1aa"}; }
      `}</style>

      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-20 space-y-16 sm:space-y-24">
        {/* --- Profile Header --- */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
          <div className="relative mx-auto sm:mx-0">
            <div
              className={`w-28 h-28 shrink-0 rounded-2xl ${isDark ? "bg-[#131318] border-white/10" : "bg-white border-zinc-200"} border flex items-center justify-center relative transition-colors`}
            >
              <span className="text-5xl">👨‍💻</span>
            </div>

            {/* Interactive Theme Toggle Button */}
            <button
              onClick={() => setIsDark(!isDark)}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors cursor-pointer ${isDark
                  ? "bg-zinc-800 border-[#0c0c10] text-zinc-200 hover:bg-zinc-700"
                  : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100 shadow-sm"
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
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-1">
                <h1 className={`text-3xl font-heading font-bold tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}>
                  Siddharth Nirmale
                </h1>
                <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${isDark ? "text-zinc-300 bg-white/5 border-white/10" : "text-zinc-700 bg-zinc-100 border-zinc-200"}`}>
                  Available for Opportunities
                </span>
              </div>
              <p className="text-[14px] text-zinc-500 font-mono">
                @siddharthNirmale
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4 text-[12px] font-medium">
                <span className={`border px-2.5 py-1 rounded-md ${isDark ? "border-white/10 bg-white/5 text-zinc-300" : "border-zinc-200 bg-zinc-100 text-zinc-700"}`}>
                  Building Scalable Web Apps
                </span>
                <span className={`flex items-center gap-1 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                  <FiMapPin size={12} /> Indore, India
                </span>
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
          <div className={`border rounded-2xl p-6 sm:p-8 space-y-8 overflow-hidden ${isDark ? "border-white/10 bg-[#121217]" : "border-zinc-200 bg-white shadow-sm"}`}>
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
              <motion.div
                key={project.id || project.title}
                variants={fadeUpVariant}
                className={`group relative flex flex-col sm:flex-row border rounded-2xl overflow-hidden transition-colors duration-200 ${isDark
                    ? "border-white/10 bg-[#121217] hover:border-white/20"
                    : "border-zinc-200 bg-white hover:border-zinc-300 shadow-sm"
                  }`}
              >
                <div className={`relative w-full sm:w-2/5 md:w-1/3 h-48 sm:h-auto overflow-hidden shrink-0 border-b sm:border-b-0 ${isDark ? "bg-black/40 border-white/5 sm:border-r" : "bg-zinc-100 border-zinc-200 sm:border-r"}`}>
                  <img
                    src={project.image || "/placeholder.jpg"}
                    alt={project.title}
                    loading="lazy"
                    className="relative w-full h-full object-cover z-10"
                  />
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col">
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
      <h2 className={`text-[14px] font-heading font-semibold tracking-wider uppercase whitespace-nowrap ${isDark ? "text-white" : "text-zinc-900"}`}>
        {title}
      </h2>
      <div className={`h-[1px] flex-1 ${isDark ? "bg-gradient-to-r from-white/10 to-transparent" : "bg-gradient-to-r from-zinc-200 to-transparent"}`} />
    </div>
  );
}

function ActionButton({ icon, text, href, onClick, isButton, primary, isDark }) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-3.5 py-1.5 text-[12px] font-semibold rounded-lg transition-all cursor-pointer border";

  const styles = primary
    ? isDark
      ? "bg-white text-black border-transparent hover:bg-zinc-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
      : "bg-zinc-900 text-white border-transparent hover:bg-zinc-800 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
    : isDark
      ? "bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95"
      : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900 hover:scale-105 active:scale-95 shadow-sm";

  if (isButton) {
    return (
      <button onClick={onClick} className={`${baseClasses} ${styles}`}>
        {icon} {text}
      </button>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${styles}`}
    >
      {icon} {text}
    </a>
  );
}

function LinkBadge({ icon, text, href, isDark }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-lg text-[11px] font-medium transition-all hover:scale-105 active:scale-95 ${isDark
          ? "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white hover:border-green-400/20"
          : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 hover:border-green-400/30 shadow-sm"
        }`}
    >
      {icon} {text}
    </a>
  );
}
