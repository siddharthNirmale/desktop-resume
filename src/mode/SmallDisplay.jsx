import React, { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import {
  FiExternalLink,
  FiMail,
  FiMapPin,
  FiDownload,
  FiClock,
  FiCpu,
  FiLock,
  FiTwitter
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

// Import centralized data (Assumes these exist in your project)
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

// Robust date filter
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
    const resumeUrl = "src\\assets\\Siddharth_Nirmale.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.setAttribute("download", "Siddharth_Nirmale_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-screen w-full bg-[#111111] text-[#a1a1aa] font-sans overflow-y-auto custom-scrollbar selection:bg-zinc-800 selection:text-zinc-100">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
      `}</style>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-14">
        
        {/* --- Profile Header --- */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-24 h-24 shrink-0 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden">
             {/* Replace with an actual <img /> if you have a profile picture */}
            <span className="text-4xl">👨‍💻</span>
            <div className="absolute top-1 right-1 bg-zinc-800 text-[8px] px-1 rounded-sm border border-zinc-700 text-zinc-300">DEV</div>
          </div>

          <div className="space-y-4 flex-1">
            <div>
              <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
                Siddharth Nirmale <span className="text-xl">🚀</span>
              </h1>
              <p className="text-[13px] text-zinc-500 mt-0.5">@siddharthNirmale</p>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-[12px] text-zinc-400">
                <a href="#" className="flex items-center gap-1.5 border-b border-zinc-600 hover:text-zinc-200 transition-colors pb-0.5">
                  Building scalable apps ✧
                </a>
                <span className="flex items-center gap-1"><FiMapPin size={12} /> Indore, India</span>
                <span className="flex items-center gap-1"><FiClock size={12} /> {currentTime}</span>
              </div>
            </div>

            <p className="text-[14px] leading-relaxed max-w-2xl text-zinc-400">
              Yup! I'm a <strong className="text-zinc-200 font-semibold">Full Stack Developer</strong>. Big deal, right? But wait... there's more! I'm not just any developer, I love building solutions and solving real-world problems. I enjoy crafting web applications with <strong className="text-zinc-200 font-semibold">React, Node.js, Express, and MongoDB</strong> and I live in the terminal mostly.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <ActionButton icon={<FiTwitter />} text="Twitter Dm" href="#" />
              <span className="text-xs font-serif italic text-zinc-600">OR</span>
              <ActionButton icon={<FiMail />} text="Email Me" href="mailto:siddharth175nirmale1@gmail.com" />
              <div className="w-px h-4 bg-zinc-800 mx-1"></div>
              <ActionButton icon={<FaGithub />} href="https://github.com/siddharthNirmale" iconOnly />
              <ActionButton icon={<FiDownload />} onClick={handleDownload} isButton iconOnly />
            </div>
          </div>
        </div>

        {/* --- Skills Section --- */}
        <section className="space-y-5">
          <TerminalHeader title="My Skills" />
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {skills.map((skillGroup) => (
              <React.Fragment key={skillGroup.category}>
                {skillGroup.items.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-[13px] font-medium text-zinc-300 hover:text-white transition-colors cursor-default">
                    <span className="text-zinc-500">{iconMap[skill] || <FiCpu size={14} />}</span>
                    {skill}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* --- Work Experience & GitHub Section --- */}
        <section className="space-y-5">
          <TerminalHeader title="Work Experience" />
          <div className="border border-zinc-800/60 rounded-xl bg-[#151515] p-6 space-y-8">
            
            {/* Timeline */}
            <div className="relative border-l border-zinc-800/80 ml-2 space-y-8">
              
              {/* Experience 1 (Active) */}
              <div className="relative pl-6">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-[#151515]" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center border border-zinc-700">
                      <FiCpu size={14} className="text-zinc-400" />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-medium text-zinc-200 flex items-center gap-2">
                        Personifwy <a href="#" className="text-zinc-500 hover:text-zinc-300"><FiExternalLink size={12}/></a>
                        <span className="text-[10px] text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-full border border-green-500/20">● Active</span>
                      </h3>
                      <p className="text-[13px] text-zinc-500 mt-0.5">Data Science & Dev Intern</p>
                    </div>
                  </div>
                  <span className="text-[12px] text-zinc-500">Jan 2024 - May 2024</span>
                </div>
              </div>

              {/* Experience 2 (Done) */}
              <div className="relative pl-6">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-4 ring-[#151515]" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center border border-zinc-700">
                      <span className="text-[14px]">🎓</span>
                    </div>
                    <div>
                      <h3 className="text-[14px] font-medium text-zinc-200 flex items-center gap-2">
                        MITS Gwalior <a href="#" className="text-zinc-500 hover:text-zinc-300"><FiExternalLink size={12}/></a>
                        <span className="text-[10px] text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded-full border border-red-500/20">● Done</span>
                      </h3>
                      <p className="text-[13px] text-zinc-500 mt-0.5">B.Tech Electronics & Telecom</p>
                    </div>
                  </div>
                  <span className="text-[12px] text-zinc-500">2020 - 2024</span>
                </div>
              </div>
            </div>

            {/* GitHub Contributions */}
            <div className="pt-6 border-t border-zinc-800/60 overflow-hidden">
              <div className="pb-2 w-full flex justify-center sm:justify-start">
                <GitHubCalendar
                  username="siddharthNirmale"
                  colorScheme="dark"
                  transformData={(data) => filterResponsiveMonths(data, visibleMonths)}
                  blockSize={10}
                  blockMargin={4}
                  blockRadius={2}
                  fontSize={12}
                  hideTotalCount
                  style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center mt-3 text-[12px] text-zinc-500">
                <span>This year, I achieved <strong className="text-zinc-300 font-medium">954 contributions</strong></span>
                <div className="flex items-center gap-1.5 mt-2 sm:mt-0">
                  Less
                  <div className="w-3 h-3 rounded-[2px] bg-[#18181b]" />
                  <div className="w-3 h-3 rounded-[2px] bg-[#3f3f46]" />
                  <div className="w-3 h-3 rounded-[2px] bg-[#71717a]" />
                  <div className="w-3 h-3 rounded-[2px] bg-[#e4e4e7]" />
                  More
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section className="space-y-5">
          <TerminalHeader title="My Projects" />
          <div className="space-y-6">
            {projects.map((project, idx) => (
              <div key={idx} className="flex flex-col border border-zinc-800/60 rounded-xl overflow-hidden bg-[#151515] hover:border-zinc-700 transition-colors">
                
                {/* Image Area with Mock Badges */}
                <div className="w-full h-[220px] border-b border-zinc-800/60 relative group bg-zinc-900 p-6 flex items-center justify-center overflow-hidden">
                  {/* Badges mimicking the inspiration */}
                  <div className="absolute top-4 left-4 z-10 bg-zinc-950/80 text-zinc-300 text-[11px] px-2.5 py-1 rounded border border-zinc-800 font-medium">
                    1.2k+ views
                  </div>
                  <div className="absolute top-4 right-4 z-10 bg-zinc-950/80 text-zinc-400 text-[9px] uppercase tracking-wider px-2 py-1 rounded border border-zinc-800 flex items-center gap-1">
                    Sponsored By <FiCpu size={10} />
                  </div>
                  
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-top rounded-lg opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-[1.02] shadow-2xl"
                  />
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
                      {project.title} <FiLock className="text-green-500" size={14} />
                    </h3>
                    <div className="flex items-center gap-2">
                      <LinkBadge icon={<FiExternalLink size={12} />} text="Live" href={project.live} />
                      <LinkBadge icon={<FaGithub size={12} />} text="GitHub" href={project.github} />
                    </div>
                  </div>

                  {/* Assuming project.bullets is an array. We join it to form a solid description paragraph like image.png */}
                  <p className="text-[13px] text-zinc-400 leading-relaxed mb-6">
                    {Array.isArray(project.bullets) ? project.bullets.join(' ') : project.bullets || "A modern web application built for scale and performance, designed with clean UI principles and robust backend architecture."}
                  </p>

                  <div className="mt-auto">
                    <p className="text-[11px] text-zinc-200 font-semibold mb-2">Technologies Used:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.split(' • ').map((tech) => (
                        <span key={tech} className="text-[11px] px-2.5 py-1 bg-[#1a1a1a] border border-zinc-800 rounded text-zinc-300 hover:bg-zinc-800 transition-colors cursor-default">
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
            <a href="#" className="text-[13px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors">
              More Projects <span>→</span>
            </a>
          </div>
        </section>

        {/* --- Thoughts in Words --- */}
        <section className="space-y-5">
          <TerminalHeader title="Thoughts in words." />
          <div className="border border-zinc-800/60 border-dashed rounded-xl p-6 flex items-center">
            <p className="text-[14px] text-zinc-500">
              You really wanna read my blogs? Head over to <a href="#" className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:decoration-zinc-400 transition-colors">My Blogs</a> page.
            </p>
          </div>
        </section>

        {/* --- Footer / Connect --- */}
        <section className="pt-8 pb-12">
          <div className="border border-zinc-800/60 rounded-xl bg-[#151515] p-10 flex flex-col items-center text-center space-y-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-2">Let's Connect</h2>
              <p className="text-[14px] text-zinc-500">Feel free to reach out through any of these platforms</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <ActionButton icon={<FiTwitter />} text="Twitter" href="#" />
              <ActionButton icon={<FaGithub />} text="GitHub" href="https://github.com/siddharthNirmale" />
              <ActionButton icon={<FiDownload />} text="Resume" onClick={handleDownload} isButton />
              <ActionButton icon={<FaLinkedin />} text="LinkedIn" href="https://linkedin.com/in/siddharth-nirmale" />
            </div>
          </div>

          <div className="mt-12 text-center space-y-6">
            <p className="text-[13px] text-zinc-500 italic font-serif">
              "Nothing Is Perfect — But You Can Make It Better."
            </p>
            <p className="text-[14px] font-semibold text-zinc-300">
              Designed & Made with ❤️
            </p>
            
            <div className="flex justify-between items-center text-[11px] text-zinc-600 uppercase tracking-widest pt-8 border-t border-zinc-900">
              <span>2026. All rights reserved</span>
              <span>Views #13792</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function TerminalHeader({ title }) {
  return (
    <div className="inline-flex relative">
      <div className="absolute -top-[10px] -left-1 w-3 h-3 border-t border-l border-zinc-700"></div>
      <div className="absolute -bottom-[10px] -right-1 w-3 h-3 border-b border-r border-zinc-700"></div>
      <h2 className="font-mono text-[13px] font-medium tracking-wide text-zinc-400 px-2">
        [ {title} ]
      </h2>
    </div>
  );
}

function ActionButton({ icon, text, href, onClick, isButton, iconOnly }) {
  const baseClasses = "inline-flex items-center justify-center gap-2 px-3 py-1.5 text-[12px] font-medium text-zinc-300 bg-[#1a1a1a] border border-zinc-800 rounded-md hover:bg-zinc-800 hover:text-white transition-all cursor-pointer shadow-sm";

  if (isButton) {
    return (
      <button onClick={onClick} className={baseClasses}>
        {icon} {!iconOnly && text}
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
      {icon} {!iconOnly && text}
    </a>
  );
}

function LinkBadge({ icon, text, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-transparent border border-zinc-700 rounded hover:bg-zinc-800 transition-colors text-[11px] font-medium text-zinc-300"
    >
      {icon} {text}
    </a>
  );
}