import React, { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import {
  FiExternalLink,
  FiMail,
  FiMapPin,
  FiDownload,
  FiClock,
  FiCpu,
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

// --- OPTIMIZATION: Extracted Clock Component ---
// This prevents the entire page from re-rendering every second!
const LiveClock = () => {
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
    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="flex items-center gap-1">
      <FiClock size={12} /> {currentTime || "Loading..."}
    </span>
  );
};

export default function TerminalPortfolio() {
  const [visibleMonths, setVisibleMonths] = useState(12);

  // Responsive Layout Effect for GitHub Calendar
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleMonths(4);
      } else if (width < 1024) {
        setVisibleMonths(8);
      } else {
        setVisibleMonths(12);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDownload = () => {
    const resumeUrl = "src/assets/Siddharth_Nirmale.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.setAttribute("download", "Siddharth_Nirmale_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    // Deep black modern background
    <div className="h-screen w-full bg-black text-zinc-400 font-sans overflow-y-auto custom-scrollbar selection:bg-zinc-800 selection:text-white">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
      `}</style>

      <div className="max-w-3xl mx-auto px-6 py-20 space-y-20">
        {/* --- Profile Header --- */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-8 items-start"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="w-24 h-24 shrink-0 rounded-2xl bg-[#09090b] border border-white/10 flex items-center justify-center relative shadow-[0_0_30px_rgba(255,255,255,0.03)] cursor-pointer transition-colors hover:border-white/20"
          >
            <span className="text-4xl">👨‍💻</span>
            <span className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#09090b] rounded-full"></span>
          </motion.div>

          <div className="space-y-4 flex-1">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Siddharth Nirmale
                </h1>
                {/* Upgraded Breathing Status Badge */}
                <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full border border-green-400/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]">
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

              <div className="flex flex-wrap items-center gap-3 mt-4 text-[12px] text-zinc-400 font-medium">
                <span className="flex items-center gap-1.5 border border-white/10 bg-white/5 px-2.5 py-1 rounded-md text-zinc-300">
                  Building Scalable Apps ✦
                </span>
                <span className="flex items-center gap-1">
                  <FiMapPin size={12} /> Indore, India
                </span>
                <LiveClock />
              </div>
            </div>

            <p className="text-[14px] leading-relaxed max-w-2xl text-zinc-400">
              Full Stack Developer passionate about building scalable web
              applications and solving real-world problems. I enjoy developing
              modern applications with{" "}
              <strong className="text-zinc-200 font-semibold">
                React, Next.js, Node.js, Express.js, and MongoDB
              </strong>
              , integrating AI services, and creating responsive user experiences
              with clean, maintainable code.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <ActionButton icon={<FaLinkedin />} text="LinkedIn" href="https://linkedin.com/in/siddharth-nirmale" />
              <ActionButton icon={<FaGithub />} text="GitHub" href="https://github.com/siddharthNirmale" />
              <ActionButton icon={<FiMail />} text="Email Me" href="mailto:siddharth175nirmale1@gmail.com" />
              <ActionButton icon={<FiDownload />} text="Resume" onClick={handleDownload} isButton primary />
            </div>
          </div>
        </motion.div>

        {/* --- Animated Skills Section --- */}
        <section className="space-y-5">
          <SectionHeader title="Arsenal & Tools" />
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
                    className="flex items-center gap-2 text-[13px] font-medium text-zinc-300 bg-white/5 border border-white/5 px-3 py-1.5 rounded-md hover:bg-white/10 hover:border-white/10 transition-colors cursor-default shadow-sm"
                  >
                    <span className="text-zinc-400">
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
          <SectionHeader title="Experience & Education" />
          <div className="border border-white/10 rounded-2xl bg-[#09090b] p-6 space-y-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            {/* Timeline */}
            <div className="relative border-l border-white/10 ml-2.5 space-y-8">
              {/* Experience Entry */}
              <div className="relative pl-7 group">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-[#09090b] group-hover:scale-110 transition-transform" />
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1">
                  <div>
                    <h3 className="text-[14px] font-semibold text-zinc-100">
                      Data Science & Development Intern
                    </h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5">
                      Personifwy | Remote
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 border border-white/10 bg-white/5 rounded px-2 py-1 w-fit">
                    Jan 2024 - May 2024
                  </span>
                </div>
              </div>

              {/* Education Entry */}
              <div className="relative pl-7 group">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-[#09090b] group-hover:scale-110 transition-transform" />
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1">
                  <div>
                    <h3 className="text-[14px] font-semibold text-zinc-100">
                      MITS Gwalior
                    </h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5">
                      B.Tech Electronics & Telecom (CGPA: 8.49)
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 border border-white/10 bg-white/5 rounded px-2 py-1 w-fit">
                    2020 - 2024
                  </span>
                </div>
              </div>
            </div>

            {/* GitHub Contribution Graph */}
            <div className="pt-6 border-t border-white/5 overflow-hidden">
              <div className="pb-3 flex flex-col items-start w-full opacity-90 hover:opacity-100 transition-opacity">
                <GitHubCalendar
                  username="siddharthNirmale"
                  colorScheme="dark"
                  transformData={(data) =>
                    filterResponsiveMonths(data, visibleMonths)
                  }
                  blockSize={9}
                  blockMargin={3}
                  blockRadius={2}
                  fontSize={12}
                  hideTotalCount
                  style={{
                    color: "rgba(255, 255, 255, 0.4)",
                    fontFamily: "inherit",
                  }}
                  
                />
              </div>

              {/* Custom Legend */}
              <div className="flex justify-between items-center mt-2 text-[11px] font-medium text-zinc-500">
                <span>Consistent deployments</span>
                <div className="flex items-center gap-1.5">
                  Less
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-[#18181b]" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-[#27272a]" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-[#52525b]" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-[#ffffff]" />
                  More
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* --- Projects Section --- */}
        <section className="space-y-5">
          <SectionHeader title="Selected Projects" />
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
                className="flex flex-col sm:flex-row border border-white/10 rounded-2xl overflow-hidden bg-[#09090b] hover:border-white/20 transition-all duration-300 group shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              >
                {/* Left Side: Flat clean image area */}
                <div className="w-full sm:w-[260px] h-[180px] sm:h-auto border-b sm:border-b-0 sm:border-r border-white/10 relative overflow-hidden shrink-0 bg-[#050505] p-5 flex items-center justify-center">
                  <div className="w-full h-full relative overflow-hidden rounded-lg border border-white/10 group-hover:border-white/20 transition-colors">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-60 grayscale-[30%] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Flat Badge overlay */}
                  <div className="absolute top-7 left-7 bg-black/80 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] px-2.5 py-1 rounded-sm shadow-xl">
                    {project.year}
                  </div>
                </div>

                {/* Right Side: Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                    <h3 className="text-[16px] font-semibold text-white tracking-tight flex items-center gap-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <LinkBadge icon={<FiExternalLink size={12} />} text="Live" href={project.live} />
                      <LinkBadge icon={<FaGithub size={12} />} text="Repo" href={project.github} />
                    </div>
                  </div>

                  <ul className="text-[13px] text-zinc-400 leading-relaxed mb-6 flex-1 list-none space-y-2">
                    {project.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-zinc-700 mt-1">▹</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.split(" • ").map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-medium px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-zinc-300"
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
          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <p className="text-[12px] text-zinc-500 font-medium">
              © {new Date().getFullYear()} Siddharth Nirmale
            </p>
            <p className="flex items-center gap-2 text-[12px] text-zinc-600 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span> SYSTEM.ONLINE
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-4 mb-2">
      <h2 className="text-[14px] font-semibold tracking-wider uppercase text-white">
        {title}
      </h2>
      <div className="h-[1px] flex-1 bg-white/10"></div>
    </div>
  );
}

function ActionButton({ icon, text, href, onClick, isButton, primary }) {
  const baseClasses =
    "inline-flex items-center gap-2 px-3 py-1.5 text-[12px] font-semibold rounded-md transition-all cursor-pointer border";
  
  const styles = primary
    ? "bg-white text-black border-transparent hover:bg-zinc-200 shadow-sm hover:scale-105 active:scale-95"
    : "bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95";

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

function LinkBadge({ icon, text, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[11px] font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition-all hover:scale-105 active:scale-95"
    >
      {icon} {text}
    </a>
  );
}