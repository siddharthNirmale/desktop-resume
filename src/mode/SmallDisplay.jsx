import React, { useState, useEffect, useCallback } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import {
  FiExternalLink,
  FiMail,
  FiMapPin,
  FiDownload,
  FiClock,
  FiCpu,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiHtml5,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiGit,
} from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";

// Import centralized data
import projects from "../data/project";
import skills from "../data/skills";
import resume from "../data/resume";

const iconMap = {
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  Python: <SiPython />,
  "C++": <TbBrandCpp />,
  HTML5: <SiHtml5 />,
  "React.js": <SiReact />,
  "Next.js": <SiNextdotjs />,
  "Tailwind CSS": <SiTailwindcss />,
  Bootstrap: <SiBootstrap />,
  Vite: <SiVite />,
  "Node.js": <SiNodedotjs />,
  "Express.js": <SiExpress />,
  MongoDB: <SiMongodb />,
  Firebase: <SiFirebase />,
  Git: <SiGit />,
  GitHub: <FaGithub />,
};

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
    <div className={`h-screen w-full transition-colors duration-300 ${isDark ? "bg-black text-zinc-400 selection:bg-zinc-800 selection:text-white" : "bg-zinc-50 text-zinc-600 selection:bg-zinc-200 selection:text-black"} font-primary overflow-y-auto custom-scrollbar`}>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${isDark ? "#27272a" : "#d4d4d8"}; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: ${isDark ? "#3f3f46" : "#a1a1aa"}; }
      `}</style>

      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-20 space-y-16 sm:space-y-20">
        {/* --- Profile Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start"
        >
          <div className="relative mx-auto sm:mx-0">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              className={`w-24 h-24 shrink-0 rounded-2xl ${isDark ? "bg-[#09090b] border-white/10 hover:border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.03)]" : "bg-white border-zinc-200 hover:border-zinc-300 shadow-xl"} border flex items-center justify-center relative cursor-pointer transition-colors`}
            >
              <span className="text-4xl">👨‍💻</span>
            </motion.div>

            {/* Interactive Theme Toggle Button integrated right at the avatar corner */}
            <motion.button
              onClick={() => setIsDark(!isDark)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full flex items-center justify-center border-2 shadow-md transition-colors cursor-pointer ${isDark
                  ? "bg-green-500 border-[#09090b] text-black hover:bg-green-400"
                  : "bg-green-600 border-white text-white hover:bg-green-500"
                }`}
            >
              {isDark ? <FiSun size={12} strokeWidth={2.5} /> : <FiMoon size={12} strokeWidth={2.5} />}
            </motion.button>
          </div>

          <div className="space-y-4 flex-1 text-center sm:text-left">
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-1">
                <h1 className={`text-2xl font-heading font-bold tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}>
                  Siddharth Nirmale
                </h1>
                <span className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${isDark ? "text-green-400 bg-green-400/10 border-green-400/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]" : "text-green-700 bg-green-100 border-green-300"}`}>
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                  </span>
                  Available for Opportunities
                </span>
              </div>
              <p className="text-[14px] text-zinc-500 font-mono">
                @siddharthNirmale
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4 text-[12px] font-medium">
                <span className={`flex items-center gap-1.5 border px-2.5 py-1 rounded-md ${isDark ? "border-white/10 bg-white/5 text-zinc-300" : "border-zinc-200 bg-zinc-100 text-zinc-700"}`}>
                  Building Scalable Apps ✦
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
        </motion.div>

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
                    whileHover={{ y: -2, scale: 1.02 }}
                    className={`flex items-center gap-2 text-[13px] font-medium border px-3 py-1.5 rounded-md transition-colors cursor-default shadow-sm ${isDark
                        ? "text-zinc-300 bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                        : "text-zinc-700 bg-white border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 shadow-sm"
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
          <div className={`border rounded-2xl p-6 space-y-8 overflow-hidden shadow-xl ${isDark ? "border-white/10 bg-[#09090b] shadow-[0_0_20px_rgba(0,0,0,0.5)]" : "border-zinc-200 bg-white shadow-sm"}`}>
            <div className={`relative border-l ml-2.5 space-y-8 ${isDark ? "border-white/10" : "border-zinc-200"}`}>
              <div className="relative pl-7 group">
                <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 group-hover:scale-110 transition-transform ${isDark ? "ring-[#09090b]" : "ring-white"}`} />
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1">
                  <div>
                    <h3 className={`text-[14px] font-heading font-semibold ${isDark ? "text-zinc-100" : "text-zinc-900"}`}>
                      Data Science & Development Intern
                    </h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5">
                      Personifwy | Remote
                    </p>
                  </div>
                  <span className={`text-[11px] font-mono border rounded px-2 py-1 w-fit mt-1 sm:mt-0 ${isDark ? "text-zinc-400 border-white/10 bg-white/5" : "text-zinc-600 border-zinc-200 bg-zinc-100"}`}>
                    Jan 2024 - May 2024
                  </span>
                </div>
              </div>

              <div className="relative pl-7 group">
                <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 group-hover:scale-110 transition-transform ${isDark ? "ring-[#09090b]" : "ring-white"}`} />
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1">
                  <div>
                    <h3 className={`text-[14px] font-heading font-semibold ${isDark ? "text-zinc-100" : "text-zinc-900"}`}>
                      MITS Gwalior
                    </h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5">
                      B.Tech Electronics & Telecom (CGPA: 8.49)
                    </p>
                  </div>
                  <span className={`text-[11px] font-mono border rounded px-2 py-1 w-fit mt-1 sm:mt-0 ${isDark ? "text-zinc-400 border-white/10 bg-white/5" : "text-zinc-600 border-zinc-200 bg-zinc-100"}`}>
                    2020 - 2024
                  </span>
                </div>
              </div>
            </div>

            <div className={`pt-6 border-t overflow-x-auto custom-scrollbar ${isDark ? "border-white/5" : "border-zinc-100"}`}>
              <div className="pb-3 flex flex-col items-center sm:items-start w-full min-w-[300px] opacity-90 hover:opacity-100 transition-opacity">
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
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpVariant}
                className={`flex flex-col sm:flex-row border rounded-2xl overflow-hidden transition-all duration-300 group shadow-xl ${isDark
                    ? "border-white/10 bg-[#09090b] hover:border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                    : "border-zinc-200 bg-white hover:border-zinc-300 shadow-sm"
                  }`}
              >
                <div className={`relative w-full sm:w-2/5 md:w-1/3 h-48 sm:h-auto overflow-hidden shrink-0 flex items-center justify-center p-4 border-b sm:border-b-0 ${isDark ? "bg-black/40 border-black/20 sm:border-r" : "bg-zinc-100 border-zinc-200 sm:border-r"}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 blur-md opacity-20 group-hover:opacity-80 group-hover:blur-xl group-hover:scale-110 transition-all duration-500 z-0" />
                  <div className={`absolute inset-0 bg-gradient-to-t z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-300 ${isDark ? "from-[#161616]/80 to-transparent" : "from-zinc-200/80 to-transparent"}`} />
                  <img
                    src={project.image || "/placeholder.jpg"}
                    alt={project.title}
                    loading="lazy"
                    className="relative w-full h-full object-cover rounded-lg shadow-2xl shadow-black/60 z-25 transform scale-100 group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                  />
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                    <h3 className={`text-[16px] font-heading font-semibold tracking-tight flex items-center gap-2 ${isDark ? "text-white" : "text-zinc-900"}`}>
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <LinkBadge icon={<FiExternalLink size={12} />} text="Live" href={project.live} isDark={isDark} />
                      <LinkBadge icon={<FaGithub size={12} />} text="Repo" href={project.github} isDark={isDark} />
                    </div>
                  </div>

                  <ul className={`text-[13px] leading-relaxed mb-6 flex-1 list-none space-y-2 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                    {project.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2">
                        <span className={isDark ? "text-zinc-700 mt-1" : "text-zinc-400 mt-1"}>▹</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.split(" • ").map((tech) => (
                        <span
                          key={tech}
                          className={`text-[11px] font-medium px-2.5 py-1 border rounded-md ${isDark
                              ? "bg-white/5 border-white/5 text-zinc-300"
                              : "bg-zinc-100 border-zinc-200 text-zinc-700"
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
          <div className={`flex items-center justify-between border-t pt-6 ${isDark ? "border-white/10" : "border-zinc-200"}`}>
            <p className="text-[12px] text-zinc-500 font-medium">
              © {new Date().getFullYear()} Siddharth Nirmale
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
      <div className={`h-[1px] flex-1 ${isDark ? "bg-white/10" : "bg-zinc-200"}`}></div>
    </div>
  );
}

function ActionButton({ icon, text, href, onClick, isButton, primary, isDark }) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-3 py-1.5 text-[12px] font-semibold rounded-md transition-all cursor-pointer border";

  let styles = "";
  if (primary) {
    styles = isDark
      ? "bg-white text-black border-transparent hover:bg-zinc-200 shadow-sm hover:scale-105 active:scale-95"
      : "bg-zinc-900 text-white border-transparent hover:bg-zinc-800 shadow-sm hover:scale-105 active:scale-95";
  } else {
    styles = isDark
      ? "bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95"
      : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900 hover:scale-105 active:scale-95 shadow-sm";
  }

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
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 border rounded text-[11px] font-medium transition-all hover:scale-105 active:scale-95 ${isDark
          ? "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white"
          : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 shadow-sm"
        }`}
    >
      {icon} {text}
    </a>
  );
}
