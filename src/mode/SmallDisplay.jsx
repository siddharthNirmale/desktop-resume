import React, { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
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

export default function TerminalPortfolio() {
  const [currentTime, setCurrentTime] = useState("");
  const [visibleMonths, setVisibleMonths] = useState(12);

  // Clock Effect
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
    const resumeUrl = "/Siddharth_Nirmale_Resume.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.setAttribute("download", "Siddharth_Nirmale_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0b] text-zinc-400 font-sans overflow-y-auto custom-scrollbar selection:bg-zinc-800 selection:text-zinc-100 pb-12">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
      `}</style>

      <div className="max-w-[800px] mx-auto px-6 py-16 space-y-12">
        {/* --- Profile Header --- */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-24 h-24 shrink-0 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center relative shadow-sm">
            <span className="text-4xl">👨‍💻</span>
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-zinc-400 border-[3px] border-[#0a0a0b] rounded-full"></span>
          </div>

          <div className="space-y-4 flex-1 pt-1">
            <div>
              <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
                Siddharth Nirmale <span className="text-xl">🚀</span>
              </h1>
              <p className="text-[13px] text-zinc-500 mt-0.5 font-medium">
                @siddharthNirmale
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-[12px] text-zinc-400">
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md hover:text-zinc-300 transition-colors cursor-default border-b border-zinc-800">
                  Building Scalable Apps ✦
                </span>
                <span className="flex items-center gap-1">
                  <FiMapPin size={11} /> Indore, India
                </span>
                <span className="flex items-center gap-1">
                  <FiClock size={11} /> {currentTime}
                </span>
              </div>
            </div>

            <p className="text-[14px] leading-relaxed max-w-2xl text-zinc-400">
              Yup! I'm a <strong className="text-zinc-200 font-semibold">Full Stack Developer</strong>. Big deal, right? But wait... there's more! I'm not just any developer, I love building scalable solutions and solving real-world problems. I enjoy crafting modern web applications with{" "}
              <strong className="text-zinc-200 font-semibold">
                React, Next.js, Node.js, Express.js,
              </strong>{" "}
              and <strong className="text-zinc-200 font-semibold">MongoDB</strong> mostly.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <ActionButton
                icon={<FaLinkedin />}
                text="LinkedIn Dm"
                href="https://linkedin.com/in/siddharth-nirmale"
              />
              <span className="text-[10px] text-zinc-600 font-bold italic font-serif">
                OR
              </span>
              <ActionButton
                icon={<FiMail />}
                text="Email Me"
                href="mailto:siddharth175nirmale1@gmail.com"
              />
              <span className="text-zinc-700">|</span>
              <IconButton icon={<FaGithub />} href="https://github.com/siddharthNirmale" />
              <IconButton icon={<FiDownload />} onClick={handleDownload} isButton />
            </div>
          </div>
        </div>

        {/* --- Skills Section --- */}
        <section className="space-y-6">
          <TerminalHeader title="My Skills" />
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {skills.map((skillGroup) => (
              <React.Fragment key={skillGroup.category}>
                {skillGroup.items.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 text-[13px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors cursor-default"
                  >
                    <span className="text-zinc-500">
                      {iconMap[skill] || <FiCpu size={14} />}
                    </span>
                    {skill}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* --- Experience Section --- */}
        <section className="space-y-6">
          <TerminalHeader title="Work Experience" />
          <div className="border border-zinc-800/80 rounded-xl bg-[#0c0c0e] p-6 space-y-8">
            {/* Timeline */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
              
              {/* Experience Entry */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-zinc-800 bg-[#0c0c0e] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] flex justify-between items-start border border-zinc-800/60 bg-zinc-900/20 rounded-lg p-3">
                  <div>
                    <h3 className="text-[14px] font-semibold text-zinc-200 flex items-center gap-2">
                      Personifwy <FiExternalLink size={12} className="text-zinc-500" />
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">Active</span>
                    </h3>
                    <p className="text-[12px] text-zinc-500 mt-1">Data Science & Dev Intern</p>
                  </div>
                  <span className="text-[11px] text-zinc-500">Jan 2024 - May 2024</span>
                </div>
              </div>

              {/* Education Entry */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-zinc-800 bg-[#0c0c0e] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] flex justify-between items-start border border-zinc-800/60 bg-zinc-900/20 rounded-lg p-3">
                  <div>
                    <h3 className="text-[14px] font-semibold text-zinc-200 flex items-center gap-2">
                      MITS Gwalior <FiExternalLink size={12} className="text-zinc-500" />
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20">Done</span>
                    </h3>
                    <p className="text-[12px] text-zinc-500 mt-1">B.Tech Electronics & Telecom</p>
                  </div>
                  <span className="text-[11px] text-zinc-500">2020 - 2024</span>
                </div>
              </div>
            </div>

            {/* GitHub Contribution Graph */}
            <div className="pt-6 border-t border-zinc-800/60 overflow-hidden">
              <div className="pb-2 flex flex-col items-center w-full">
                <GitHubCalendar
                  username="siddharthNirmale"
                  colorScheme="dark"
                  transformData={(data) =>
                    filterResponsiveMonths(data, visibleMonths)
                  }
                  blockSize={11}
                  blockMargin={4}
                  blockRadius={2}
                  fontSize={12}
                  hideTotalCount
                  style={{
                    color: "rgba(255, 255, 255, 0.4)",
                    fontFamily: "var(--font-primary)",
                  }}
                  theme={{
                    light: ['#27272a', '#52525b', '#71717a', '#a1a1aa', '#f4f4f5'],
                    dark: ['#18181b', '#27272a', '#3f3f46', '#71717a', '#a1a1aa']
                  }}
                />
              </div>
              <div className="flex justify-between items-center mt-3 text-[11px] text-zinc-500 px-2">
                <span>This year, I achieved solid contributions</span>
                <div className="flex items-center gap-1.5">
                  Less
                  <div className="w-3 h-3 rounded-[2px] bg-[#18181b] border border-zinc-800/50" />
                  <div className="w-3 h-3 rounded-[2px] bg-[#27272a]" />
                  <div className="w-3 h-3 rounded-[2px] bg-[#3f3f46]" />
                  <div className="w-3 h-3 rounded-[2px] bg-[#71717a]" />
                  <div className="w-3 h-3 rounded-[2px] bg-[#a1a1aa]" />
                  More
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section className="space-y-6">
          <TerminalHeader title="My Projects" />
          <div className="space-y-5">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row border border-zinc-800/80 rounded-xl overflow-hidden bg-[#0c0c0e] hover:border-zinc-700 transition-all duration-300 group"
              >
                {/* Left Side: Clean Image Area */}
                <div className="w-full sm:w-[320px] h-[200px] shrink-0 relative bg-zinc-900 border-b sm:border-b-0 sm:border-r border-zinc-800/60 p-4 flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover rounded shadow-lg border border-zinc-800/50"
                  />
                  {/* Overlay Badges */}
                  <div className="absolute top-6 left-6 bg-zinc-900/90 backdrop-blur text-zinc-200 text-[10px] font-semibold px-2.5 py-1 rounded shadow-sm border border-zinc-700/50">
                    {project.year || "Recent"}
                  </div>
                  <div className="absolute top-6 right-6 flex items-center gap-1 bg-zinc-900/90 backdrop-blur text-zinc-400 text-[9px] font-semibold px-2 py-1 rounded uppercase tracking-wide border border-zinc-700/50">
                    <FiCpu size={10} /> FEATURED
                  </div>
                </div>

                {/* Right Side: Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-[18px] font-bold text-zinc-100 flex items-center gap-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <LinkBadge
                          icon={<FiExternalLink size={12} />}
                          text="Live"
                          href={project.live}
                        />
                        <LinkBadge
                          icon={<FaGithub size={12} />}
                          text="GitHub"
                          href={project.github}
                        />
                      </div>
                    </div>

                    <ul className="text-[13px] text-zinc-400 leading-relaxed mb-6 list-none space-y-2">
                      {project.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-600 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[12px] text-zinc-200 font-semibold mb-3">
                      Technologies Used:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.split(" • ").map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] px-2.5 py-1 bg-zinc-800/80 border border-zinc-700/50 rounded-md text-zinc-300 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end pt-2">
            <button className="text-[13px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5 transition-colors border-b border-transparent hover:border-zinc-200 pb-0.5">
              More Projects <span>→</span>
            </button>
          </div>
        </section>

        {/* --- Thoughts Section --- */}
        <section className="space-y-6">
          <TerminalHeader title="Thoughts in words." />
          <div className="border border-zinc-800/80 border-dashed rounded-xl p-6 bg-zinc-900/10">
            <p className="text-[13px] text-zinc-400">
              You really wanna read my blogs? Head over to <a href="#" className="text-zinc-200 border-b border-zinc-500 hover:border-zinc-200 transition-colors">My Blogs</a> page.
            </p>
          </div>
        </section>

        {/* --- Footer / Let's Connect --- */}
        <section className="pt-8 pb-4">
          <div className="border border-zinc-800/80 rounded-xl bg-[#0c0c0e] p-8 flex flex-col items-center text-center space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-zinc-100 mb-2">Let's Connect</h2>
              <p className="text-[13px] text-zinc-400">
                Feel free to reach out through any of these platforms
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <ActionButton icon={<FaLinkedin />} text="LinkedIn" href="https://linkedin.com/in/siddharth-nirmale" isDark />
              <ActionButton icon={<FaGithub />} text="GitHub" href="https://github.com/siddharthNirmale" isDark />
              <ActionButton icon={<FiDownload />} text="Resume" onClick={handleDownload} isButton isDark />
            </div>

            <div className="pt-6 border-t border-zinc-800/50 w-full mt-2">
              <p className="text-[12px] italic text-zinc-500 font-serif">
                "Nothing Is Perfect - But You Can Make It Better."
              </p>
              <p className="text-[12px] font-semibold text-zinc-200 mt-4">
                Designed & Made with ❤️
              </p>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-[11px] text-zinc-600 mt-6 px-2">
            <span>2026. All rights reserved</span>
            <span>Views #0001</span>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

// Recreates the targeting bracket corners from the inspiration [ Title ]
function TerminalHeader({ title }) {
  return (
    <div className="relative inline-flex items-center justify-center">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-500" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-500" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-500" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-500" />
      <h2 className="font-sans text-[13px] font-semibold tracking-wide text-zinc-300 px-4 py-1.5">
        {title}
      </h2>
    </div>
  );
}

function ActionButton({ icon, text, href, onClick, isButton, isDark }) {
  const baseClasses = `inline-flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium transition-all rounded-md border ${
    isDark 
      ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80' 
      : 'bg-zinc-200 border-zinc-200 text-zinc-900 hover:bg-white'
  } cursor-pointer`;

  if (isButton) {
    return (
      <button onClick={onClick} className={baseClasses}>
        {icon} {text}
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
      {icon} {text}
    </a>
  );
}

function IconButton({ icon, href, onClick, isButton }) {
  const baseClasses = "flex items-center justify-center w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer";
  
  if (isButton) {
    return (
      <button onClick={onClick} className={baseClasses}>
        {icon}
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
      {icon}
    </a>
  );
}

function LinkBadge({ icon, text, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-transparent border border-zinc-700 hover:border-zinc-500 rounded text-[11px] font-semibold text-zinc-300 transition-colors"
    >
      {icon} {text}
    </a>
  );
}