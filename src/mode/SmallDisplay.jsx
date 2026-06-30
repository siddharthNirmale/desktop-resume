import {
  FiExternalLink,
  FiMail,
  FiPhone,
  FiMapPin,
  FiDownload,
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

const skills = {
  Languages: ["JavaScript", "TypeScript", "Python", "C++", "HTML5"],
  Frontend: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Vite"],
  Backend: ["Node.js", "Express.js"],
  Database: ["MongoDB", "Firebase"],
  "Cloud & Tools": ["Git", "GitHub"],
};

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
    year: "2026",
    stack: ["Node.js", "Express.js", "Gemini API", "Cloudinary"],
    bullets: [
      "Built a scalable AI-powered thumbnail generation platform.",
      "Integrated Gemini API and Cloudinary.",
      "Implemented JWT authentication and API rate limiting.",
      "Deployed production-ready application on Vercel.",
    ],
    link: "thumbmax-psi.vercel.app",
    github: "github.com/siddharthNirmale/Thumbmax", // Add actual github link if available
  },
  {
    title: "Postify",
    year: "2025",
    stack: ["Node.js", "Express.js", "MongoDB"],
    bullets: [
      "Developed a full-stack social media application.",
      "Built REST APIs for authentication, feeds and posts.",
      "Implemented secure CRUD operations.",
      "Used JWT authentication for access control.",
    ],
    link: "github.com/siddharthNirmale/Feed-Pin",
    github: "github.com/siddharthNirmale/Feed-Pin",
  },
  {
    title: "E-Commerce",
    year: "2025",
    stack: ["React.js", "Vite", "JavaScript"],
    bullets: [
      "Built responsive e-commerce user interface.",
      "Implemented filtering and category navigation.",
      "Used React Hooks for state management.",
      "Optimized for cross-device compatibility.",
    ],
    link: "ecommerce-aug.vercel.app",
    github: "github.com/siddharthNirmale", // Replace with actual repo
  },
];

export default function TerminalPortfolio() {
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
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-zinc-800 selection:text-white pb-20">
      <div className="max-w-3xl mx-auto px-6 pt-16 space-y-16">
        
        {/* --- Profile Header --- */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar Placeholder (Optional, remove if you don't want a picture) */}
          <div className="w-24 h-24 shrink-0 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
             <span className="text-4xl">👨‍💻</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
                Siddharth Nirmale <span className="text-lg">🚀</span>
              </h1>
              <div className="flex items-center gap-4 mt-1.5 text-xs text-zinc-500 font-medium">
                <span className="flex items-center gap-1"><FiMapPin size={12} /> Indore, India</span>
                <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                <span>Full Stack Developer</span>
              </div>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
              Yup! I'm a <strong className="text-zinc-200 font-semibold">Full Stack Developer</strong>. 
              I enjoy crafting scalable web applications and solving complex problems. 
              Currently focused on the MERN stack and building responsive, user-centric interfaces. 
              I practically live in the terminal.
            </p>

            {/* Action Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              <ActionButton icon={<FaGithub />} text="GitHub" href="https://github.com/siddharthNirmale" />
              <ActionButton icon={<FaLinkedin />} text="LinkedIn" href="https://linkedin.com/in/siddharth-nirmale" />
              <ActionButton icon={<FiMail />} text="Email Me" href="mailto:siddharth175nirmale1@gmail.com" />
              <ActionButton icon={<FiDownload />} text="Resume" onClick={handleDownload} isButton />
            </div>
          </div>
        </div>

        {/* --- Skills Section --- */}
        <section className="space-y-6">
          <TerminalHeader title="My Skills" />
          <div className="flex flex-wrap gap-2">
            {Object.values(skills).flat().map((skill) => (
              <TechBadge key={skill} label={skill} icon={iconMap[skill]} />
            ))}
          </div>
        </section>

        {/* --- Education / Experience Timeline --- */}
        <section className="space-y-6">
          <TerminalHeader title="Education" />
          <div className="border border-zinc-800/60 rounded-xl p-6 bg-[#09090b]">
            <div className="flex gap-5">
              {/* Timeline graphic */}
              <div className="flex flex-col items-center mt-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                <div className="w-[1px] h-full bg-zinc-800 my-2" />
              </div>
              
              {/* Content */}
              <div className="pb-2 w-full">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                  <h3 className="text-zinc-200 font-medium text-sm">Madhav Institute of Technology & Science (MITS)</h3>
                  <span className="text-[11px] text-zinc-500 font-mono">2020 — 2024</span>
                </div>
                <p className="text-[13px] text-zinc-400">B.Tech Engineering in Electronics & Telecommunication</p>
                <div className="mt-3 inline-flex items-center gap-1.5 border border-zinc-800 bg-zinc-900/50 px-2.5 py-1 rounded text-xs font-medium text-zinc-300">
                  CGPA: 8.49 / 10
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section className="space-y-6">
          <TerminalHeader title="My Projects" />
          <div className="space-y-6">
            {projects.map((project, idx) => (
              <div key={idx} className="border border-zinc-800/60 rounded-xl overflow-hidden bg-[#09090b] transition-colors hover:border-zinc-700">
                {/* Mock Image Area */}
                <div className="h-32 bg-zinc-900/50 border-b border-zinc-800/60 flex items-center justify-center">
                  <span className="font-mono text-xs text-zinc-600 border border-zinc-800 px-3 py-1.5 rounded bg-zinc-950">
                    {project.title.toLowerCase()}_preview.jpg
                  </span>
                </div>
                
                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div>
                      <h3 className="text-zinc-100 font-semibold flex items-center gap-2">
                        {project.title}
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </h3>
                      <p className="text-xs text-zinc-500 mt-1 font-mono">Built in {project.year}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <LinkBadge icon={<FiExternalLink />} text="Live" href={`https://${project.link}`} />
                      <LinkBadge icon={<FaGithub />} text="GitHub" href={`https://${project.github}`} />
                    </div>
                  </div>

                  <ul className="text-[13px] text-zinc-400 space-y-2 list-disc list-inside marker:text-zinc-700">
                    {project.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-zinc-800/60">
                    <p className="text-[11px] text-zinc-500 mb-2 font-medium">Technologies Used:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span key={tech} className="text-[11px] px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-zinc-300">
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

// The decorative bracket header from the image
function TerminalHeader({ title }) {
  return (
    <div className="inline-flex">
      <div className="border border-dashed border-zinc-700/80 rounded-md px-3 py-1.5 bg-zinc-900/20">
        <h2 className="font-mono text-[13px] font-medium tracking-wide text-zinc-300">
          [ {title} ]
        </h2>
      </div>
    </div>
  );
}

// Action buttons (Socials/Resume) under the profile
function ActionButton({ icon, text, href, onClick, isButton }) {
  const baseClasses = "inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 hover:text-white hover:border-zinc-700 transition-all cursor-pointer";
  
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

// Tech stack pills
function TechBadge({ label, icon }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors">
      {icon && <span className="text-zinc-500">{icon}</span>}
      {label}
    </div>
  );
}

// Mini link buttons inside project cards
function LinkBadge({ icon, text, href }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900/50 border border-zinc-800 rounded hover:bg-zinc-800 transition-colors text-[11px] font-medium text-zinc-300"
    >
      {icon} {text}
    </a>
  );
}