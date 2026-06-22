import {
  FiExternalLink,
  FiMail,
  FiPhone,
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
import { GraduationCap, Code2 } from "lucide-react";

const skills = {
  Languages: ["JavaScript", "TypeScript", "Python", "C++", "HTML5", "CSS3"],
  Frontend: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Vite"],
  Backend: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
  Database: ["MongoDB", "Firebase"],
  "Cloud & Tools": ["Git", "GitHub"],
  Concepts: [
    "Data Structures & Algorithms",
    "OOP",
    "API Integration",
    "Responsive Design",
  ],
};

const iconMap = {
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  Python: <SiPython />,
  "C++": <TbBrandCpp />,
  HTML5: <SiHtml5 />,
  CSS3: <SiTailwindcss />,
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
    stack: "Node.js • Express.js • Gemini API • Cloudinary",
    bullets: [
      "Built a scalable AI-powered thumbnail generation platform.",
      "Integrated Gemini API and Cloudinary.",
      "Implemented JWT authentication and API rate limiting.",
      "Deployed production-ready application on Vercel.",
    ],
    link: "thumbmax-psi.vercel.app",
  },
  {
    title: "Postify",
    year: "2025",
    stack: "Node.js • Express.js • MongoDB",
    bullets: [
      "Developed a full-stack social media application.",
      "Built REST APIs for authentication, feeds and posts.",
      "Implemented secure CRUD operations.",
      "Used JWT authentication for access control.",
    ],
    link: "github.com/siddharthNirmale/Feed-Pin",
  },
  {
    title: "E-Commerce",
    year: "2025",
    stack: "React.js • Vite • JavaScript",
    bullets: [
      "Built responsive e-commerce user interface.",
      "Implemented filtering and category navigation.",
      "Used React Hooks for state management.",
      "Optimized for cross-device compatibility.",
    ],
    link: "ecommerce-aug.vercel.app",
  },
];

export default function ResumeSection() {
  return (
    <div className="
      min-h-screen
      bg-[var(--color-desktop)]
      text-white
      p-4 md:p-10
      font-[var(--font-primary)]
      custom-scrollbar
    ">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="
          flex flex-col sm:flex-row justify-between items-start sm:items-end
          border-b border-[var(--color-surface-border)]
          pb-4 mb-6 gap-4
        ">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.2em]">
              SYS<span className="text-[var(--color-accent)]">.</span>RESUME
            </h1>

            <p className="
              text-[10px]
              text-white/40
              uppercase tracking-[var(--tracking-super-wide)]
              mt-2
            ">
              Candidate Record // Access Level: Public
            </p>
          </div>

          <div className="
            flex items-center gap-2
            text-[var(--color-accent)]
            text-[10px]
            uppercase tracking-[var(--tracking-super-wide)]
          ">
            <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full animate-pulse" />
            Active
          </div>
        </div>

        {/* SECTION */}
        <SectionTitle title="Candidate.Record" />

        <Panel>
          <div className="border-l-2 border-[var(--color-accent)] pl-4">
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest">
              Siddharth Nirmale
            </h2>

            <p className="text-[var(--color-accent)] text-[10px] uppercase tracking-[0.25em] mt-2">
              Full Stack Developer
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-[11px] uppercase tracking-widest text-white/50">
              <Info
                icon={<FiPhone size={12} />}
                text="+91-772-382-4225"
                href="tel:+917723824225"
              />
              <Info
                icon={<FiMail size={12} />}
                text="siddharth175nirmale1@gmail.com"
                href="mailto:siddharth175nirmale1@gmail.com"
              />
              <Info
                icon={<FaGithub size={12} />}
                text="github.com/siddharthNirmale"
                href="https://github.com/siddharthNirmale"
              />
              <Info
                icon={<FaLinkedin size={12} />}
                text="linkedin.com/in/siddharth-nirmale"
                href="https://linkedin.com/in/siddharth-nirmale"
              />
            </div>
          </div>
        </Panel>

        <SectionTitle title="Summary.Log" />
        <Panel>
          <p className="text-sm text-white/60 leading-relaxed">
            Full-Stack Developer with experience building scalable web applications.
            Skilled in REST API development, authentication systems, and cloud deployment.
          </p>
        </Panel>

        <SectionTitle title="Telemetry" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard label="CGPA" value="8.49" />
          <StatCard label="PROJECTS" value="03" />
          <StatCard label="EXP" value="04M" />
          <StatCard label="STACK" value="MERN" />
        </div>

        <SectionTitle title="Education.Log" />
        <Panel icon={<GraduationCap size={16} />} title="MITS Gwalior">
          <p className="text-sm text-white/60">
            B.Tech Electronics & Telecommunication Engineering
          </p>
          <p className="text-sm text-white/50 mt-2">
            2020 — 2024 | CGPA: 8.49 / 10
          </p>
        </Panel>

        <SectionTitle title="Projects.Index" />
        <div className="space-y-4 mb-6">
          {projects.map((project) => (
            <Panel
              key={project.title}
              icon={<Code2 size={16} />}
              title={`${project.title} // ${project.year}`}
            >
              <p className="text-[var(--color-accent)] text-xs uppercase tracking-widest mb-4">
                {project.stack}
              </p>

              <ul className="space-y-2 text-sm text-white/60">
                {project.bullets.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>

              <a
                href={`https://${project.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2 mt-4
                  text-[var(--color-accent)]
                  hover:text-white
                  transition-all
                  text-[10px] uppercase tracking-[var(--tracking-super-wide)]
                  border border-[var(--color-accent)]
                  px-3 py-1 w-fit
                "
              >
                <FiExternalLink size={12} />
                Visit Project
              </a>
            </Panel>
          ))}
        </div>

        <SectionTitle title="Skills.Matrix" />

        <div className="space-y-5">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group}>
              <div className="
                text-[10px]
                uppercase tracking-[var(--tracking-super-wide)]
                text-[var(--color-accent)]
                mb-3
              ">
                {group}
              </div>

              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <TechBadge
                    key={skill}
                    label={skill}
                    icon={iconMap[skill]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function SectionTitle({ title }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[var(--color-accent)] font-bold">❯</span>
      <h3 className="text-xs font-bold uppercase tracking-widest">
        {title}
      </h3>
    </div>
  );
}

function Panel({ icon, title, children }) {
  return (
    <div className="
      bg-[var(--color-surface)]
      border border-[var(--color-surface-border)]
      p-5 mb-4
    ">
      {(icon || title) && (
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <span className="text-xs uppercase tracking-widest">
            {title}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

function Info({ icon, text, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex items-center gap-3
        text-white/50 hover:text-white
        transition-colors truncate
      "
    >
      {icon}
      <span className="truncate">{text}</span>
    </a>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="
      bg-[var(--color-surface)]
      border border-[var(--color-surface-border)]
      p-4 text-center
    ">
      <div className="text-[10px] uppercase tracking-widest text-white/40">
        {label}
      </div>
      <div className="mt-2 text-xl sm:text-3xl font-bold">
        {value}
      </div>
    </div>
  );
}

function TechBadge({ label, icon }) {
  return (
    <div className="
      flex items-center gap-2
      border border-[var(--color-surface-border)]
      bg-[var(--color-surface-dark)]
      px-2 sm:px-3 py-2
      text-[9px] sm:text-[10px]
      uppercase tracking-widest
      text-white/50
      hover:border-[var(--color-accent)]
      hover:text-white
      transition-all
    ">
      {icon}
      {label}
    </div>
  );
}