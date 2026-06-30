import React, { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import {
  FiExternalLink,
  FiMail,
  FiMapPin,
  FiDownload,
  FiClock,
} from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
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

const skills = [
  "JavaScript", "TypeScript", "Python", "C++", "HTML5",
  "React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Vite",
  "Node.js", "Express.js", "MongoDB", "Firebase", "Git", "GitHub"
];

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

const projects = [
  {
    title: "Thumbmax",
    badge: "AI Powered",
    desc: "Built a scalable AI-powered thumbnail generation platform using Node.js and Express.js. Integrated Gemini API and Cloudinary, implemented JWT authentication, API rate limiting, and deployed on Vercel.",
    stack: ["Node.js", "Express.js", "Gemini API", "Cloudinary"],
    link: "thumbmax-psi.vercel.app",
    github: "siddharthNirmale/Thumbmax",
  },
  {
    title: "Postify",
    badge: "Full Stack",
    desc: "Developed a full-stack social media platform with authentication, posts, feeds, and user management. Built secure REST APIs using Express.js and MongoDB with JWT authentication.",
    stack: ["Node.js", "Express.js", "MongoDB"],
    link: "github.com/siddharthNirmale/Feed-Pin",
    github: "siddharthNirmale/Feed-Pin",
  },
  {
    title: "E-Commerce",
    badge: "Live Project",
    desc: "Built a responsive e-commerce frontend with product filtering, search, category navigation, and React Hooks for efficient state management across devices.",
    stack: ["React.js", "Vite", "JavaScript"],
    link: "ecommerce-aug.vercel.app",
    github: "siddharthNirmale/Ecommerce-Aug",
  },
];

// --- Helper configurations for the GitHub Calendar ---
const customTheme = {
  light: ['#27272a', '#52525b', '#71717a', '#a1a1aa', '#f4f4f5'],
  dark: ['#18181b', '#3f3f46', '#71717a', '#a1a1aa', '#f4f4f5'], // Matches the dark zinc aesthetic
};

const filterLastSixMonths = (contributions) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const shownMonths = 6;

  return contributions.filter((activity) => {
    const date = new Date(activity.date);
    const monthOfDay = date.getMonth();
    return (
      date.getFullYear() === currentYear &&
      monthOfDay > currentMonth - shownMonths &&
      monthOfDay <= currentMonth
    );
  });
};

export default function TerminalPortfolio() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
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
    <div className="h-screen w-full bg-[#0a0a0a] text-zinc-400 font-sans overflow-y-auto custom-scrollbar selection:bg-zinc-800 selection:text-zinc-100">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
      `}</style>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-12">

        {/* --- Profile Header --- */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-20 h-20 shrink-0 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center relative">
            <span className="text-3xl">👨‍💻</span>
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-[#0a0a0a] rounded-full"></span>
          </div>

          <div className="space-y-3 flex-1">
            <div>
              <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                Siddharth Nirmale <span className="text-lg">🚀</span>
              </h1>
              <p className="text-[13px] text-zinc-500 mt-0.5">@siddharthNirmale</p>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-[12px] text-zinc-400">
                <span className="flex items-center gap-1.5 border border-zinc-800 bg-zinc-900/50 px-2 py-0.5 rounded-md">
                  Building Scalable Apps ✦
                </span>
                <span className="flex items-center gap-1"><FiMapPin size={11} /> Indore, India</span>
                <span className="flex items-center gap-1"><FiClock size={11} /> {currentTime}</span>
              </div>
            </div>

            <p className="text-[13px] leading-relaxed max-w-2xl text-zinc-400">
              Full Stack Developer passionate about building scalable web applications and solving real-world problems. I enjoy developing modern applications with <strong className="text-zinc-200 font-semibold">React, Next.js, Node.js, Express.js, and MongoDB</strong>, integrating AI services, and creating responsive user experiences with clean, maintainable code.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <ActionButton
                icon={<FaLinkedin />}
                text="LinkedIn"
                href="https://linkedin.com/in/siddharth-nirmale"
              />
              <ActionButton icon={<FaGithub />} text="GitHub" href="https://github.com/siddharthNirmale" />
              <ActionButton icon={<FiMail />} text="Email Me" href="mailto:siddharth175nirmale1@gmail.com" />
              <ActionButton icon={<FiDownload />} text="Resume" onClick={handleDownload} isButton />
            </div>
          </div>
        </div>

        {/* --- Skills Section --- */}
        <section className="space-y-4">
          <TerminalHeader title="My Skills" />
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div key={skill} className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-300 hover:text-white transition-colors cursor-default">
                <span className="text-zinc-500">{iconMap[skill]}</span>
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* --- Education / Work / GitHub Graph Section --- */}
        <section className="space-y-4">
          <TerminalHeader title="Education & Activity" />
          <div className="border border-zinc-800 rounded-xl bg-[#0c0c0e] p-5 space-y-6">

            {/* Timeline */}
            <div className="relative border-l border-zinc-800 ml-2 space-y-6">
              <div className="relative pl-6">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-green-500 ring-4 ring-[#0c0c0e]" />
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[13px] font-medium text-zinc-200">MITS Gwalior <a href="#" className="text-zinc-500 hover:text-zinc-300">↗</a></h3>
                    <p className="text-[12px] text-zinc-500">B.Tech Electronics & Telecom (CGPA: 8.49)</p>
                  </div>
                  <span className="text-[11px] text-zinc-500 border border-zinc-800 rounded px-2 py-0.5">2020 - 2024</span>
                </div>
              </div>
            </div>

            {/* Actual GitHub Contribution Graph */}
            <div className="pt-4 border-t border-zinc-800/60 overflow-hidden">
              <div className="overflow-x-auto pb-2 scrollbar-hide flex flex-col items-start w-full">
                <GitHubCalendar
                  username="siddharthNirmale"
                  colorScheme="dark"


                  blockSize={8.5}
                  blockMargin={3}
                  blockRadius={2}
                  fontSize={11}

                  hideTotalCount
                  style={{
                    color: 'rgba(255, 255, 255, 0.3)',
                    fontFamily: 'var(--font-primary)',
                  }}
                />
              </div>

              {/* Custom Legend underneath to match the widget since you set hideColorLegend */}
              <div className="flex justify-between items-center mt-2 text-[11px] text-zinc-500">
                <span>This year, I achieved consistent deployments</span>
                <div className="flex items-center gap-1">
                  Less
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-[#18181b]" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-[#3f3f46]" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-[#71717a]" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-[#f4f4f5]" />
                  More
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- Projects Section --- */}
        <section className="space-y-4">
          <TerminalHeader title="My Projects" />
          <div className="space-y-4">
            {projects.map((project, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row border border-zinc-800 rounded-xl overflow-hidden bg-[#0c0c0e] hover:border-zinc-700 transition-colors">

                {/* Left Side: Image/Preview area */}
                <div className="w-full sm:w-[240px] h-[160px] bg-gradient-to-br from-zinc-900 to-black border-b sm:border-b-0 sm:border-r border-zinc-800 flex flex-col items-center justify-center p-4 relative">
                  <div className="absolute top-3 left-3 bg-zinc-800 text-zinc-300 text-[10px] px-2 py-0.5 rounded-sm">
                    {project.badge}
                  </div>
                  <h4 className="text-zinc-200 font-semibold text-center">{project.title}</h4>
                  <p className="text-[10px] text-green-400 mt-1 uppercase tracking-widest">Active.</p>
                </div>

                {/* Right Side: Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-[15px] font-semibold text-zinc-100 flex items-center gap-2">
                      {project.title} <span className="w-2 h-2 rounded-full bg-green-500" />
                    </h3>
                    <div className="flex items-center gap-2">
                      <LinkBadge icon={<FiExternalLink size={12} />} text="Live" href={`https://${project.link}`} />
                      <LinkBadge icon={<FaGithub size={12} />} text="GitHub" href={`https://github.com/${project.github}`} />
                    </div>
                  </div>

                  <p className="text-[12px] text-zinc-400 leading-relaxed mb-4 flex-1">
                    {project.desc}
                  </p>

                  <div>
                    <p className="text-[10px] text-zinc-500 mb-1.5 font-medium">Technologies Used:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span key={tech} className="text-[10px] px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function TerminalHeader({ title }) {
  return (
    <div className="inline-flex">
      <div className="border border-dashed border-zinc-700 rounded-md px-3 py-1">
        <h2 className="font-mono text-[12px] font-medium tracking-wide text-zinc-300">
          [ {title} ]
        </h2>
      </div>
    </div>
  );
}

function ActionButton({ icon, text, href, onClick, isButton }) {
  const baseClasses = "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800 hover:text-white transition-all cursor-pointer";

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

function LinkBadge({ icon, text, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800 transition-colors text-[11px] font-medium text-zinc-300"
    >
      {icon} {text}
    </a>
  );
}