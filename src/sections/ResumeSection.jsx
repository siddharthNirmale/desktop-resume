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
import { GraduationCap, Code2, Briefcase } from "lucide-react";
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

export default function ResumeSection() {
  const handleDownload = () => {
    const resumeUrl = resume;
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.setAttribute("download", "Siddharth_Nirmale_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-full bg-[var(--color-surface)] text-[var(--color-text)] flex flex-col font-primary selection:bg-[var(--color-accent)] selection:text-white transition-colors duration-250">
      {/* Editorial Sub-Header Area */}
      <div className="px-8 py-5 border-b border-[var(--color-surface-border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-b from-[var(--color-surface-border)] to-transparent shrink-0 transition-colors duration-250">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[var(--color-text)] transition-colors duration-250">
            Siddharth_Resume.pdf
          </h1>
          <p className="text-[12px] text-[var(--color-text-tertiary)] mt-0.5 transition-colors duration-250">
            Here is my professional resume, showcasing my skills, projects, and academic achievements. You can download the PDF version for your reference.
          </p>
        </div>

        {/* Right Side Actions Panel */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleDownload}
            // Button keeps explicit white text so it always contrasts against dynamic accent colors
            className="flex items-center gap-2 py-1.5 px-3 rounded-md bg-[var(--color-accent)] text-white text-[12px] font-medium hover:brightness-110 active:brightness-90 transition-all duration-150 shadow-sm focus:outline-none"
          >
            <FiDownload size={13} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Main Document Workspace Scroll Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 max-w-4xl w-full mx-auto space-y-8">

        {/* Personal Header Identity Grid */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 pb-6 border-b border-[var(--color-surface-border)] transition-colors duration-250">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)] transition-colors duration-250">
              Siddharth Nirmale
            </h2>
            <p className="text-[14px] font-medium text-[var(--color-accent)] transition-colors duration-250">
              Full Stack Software Developer
            </p>
            <p className="text-[12px] text-[var(--color-text-tertiary)] flex items-center gap-1.5 pt-1 transition-colors duration-250">
              <FiMapPin size={12} /> Indore, India
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[13px] text-[var(--color-text-secondary)] font-normal transition-colors duration-250">
            <Info icon={<FiPhone size={13} />} text="+91 77238 24225" href="tel:+917723824225" />
            <Info icon={<FiMail size={13} />} text="siddharth175nirmale1@gmail.com" href="mailto:siddharth175nirmale1@gmail.com" />
            <Info icon={<FaGithub size={13} />} text="github.com/siddharthNirmale" href="https://github.com/siddharthNirmale" />
            <Info icon={<FaLinkedin size={13} />} text="linkedin.com/in/siddharth-nirmale" href="https://linkedin.com/in/siddharth-nirmale" />
          </div>
        </div>

        {/* Telemetry Highlight Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Academics (CGPA)" value="8.49" />
          <StatCard label="Core Projects" value="03" />
          <StatCard label="Active Engine" value="MERN" />
          <StatCard label="Dev Focus" value="Frontend" />
        </div>

        {/* Core Sections Grid */}
        <div className="grid grid-cols-1 gap-8">

          {/* Education Track Section */}
          <div className="space-y-4">
            <SectionTitle icon={<GraduationCap size={15} />} title="Education" />
            <Panel title="Madhav Institute of Technology & Science (MITS)">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <p className="text-[14px] text-[var(--color-text-secondary)] transition-colors duration-250">
                  B.Tech Engineering in Electronics & Telecommunication
                </p>
                <span className="text-[12px] text-[var(--color-text-tertiary)] font-medium transition-colors duration-250">
                  2020 — 2024
                </span>
              </div>
              <p className="text-[12px] text-[var(--color-accent)] font-medium mt-1 transition-colors duration-250">
                Graduated with Honors Summary | Cumulative Grade: 8.49 / 10
              </p>
            </Panel>
          </div>

          {/* Project Log Track Section */}
          <div className="space-y-4">
            <SectionTitle icon={<Code2 size={15} />} title="Project Deployment Records" />
            <div className="space-y-4">
              {projects.map((project) => (
                <Panel key={project.title} title={project.title}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-semibold text-[var(--color-accent)] uppercase tracking-wider transition-colors duration-250">
                      {project.tech}
                    </span>
                    <span className="text-[12px] text-[var(--color-text-tertiary)] font-medium transition-colors duration-250">
                      {project.year}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-[13px] text-[var(--color-text-secondary)] pl-4 list-disc marker:text-[var(--color-text-tertiary)] transition-colors duration-250">
                    {project.bullets.map((item, index) => (
                      <li key={index} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>

                  <a
                    href={`${project.live}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-[12px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors border border-[var(--color-surface-border)] rounded-md px-2.5 py-1 bg-[var(--color-surface-border)] hover:bg-[var(--color-surface-inactive)]"
                  >
                    <FiExternalLink size={12} />
                    Production Build
                  </a>
                </Panel>
              ))}
            </div>
          </div>

          {/* Skills Core Grid System */}
          <div className="space-y-4">
            <SectionTitle icon={<Briefcase size={14} />} title="Technical Core Competencies" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[var(--color-surface-inactive)] rounded-xl p-5 border border-[var(--color-surface-border)] transition-colors duration-250">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category} className="space-y-2">
                  <div className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider transition-colors duration-250">
                    {skillGroup.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.items.map((skill) => (
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
      </div>
    </div>
  );
}

/* ---------------- INTERIOR STRUCTURAL MODULES ---------------- */

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-2 pb-1.5 border-b border-[var(--color-surface-border)] transition-colors duration-250">
      <span className="text-[var(--color-text-tertiary)]">{icon}</span>
      <h3 className="text-[12px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
        {title}
      </h3>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="bg-[var(--color-surface-inactive)] border border-[var(--color-surface-border)] rounded-xl p-5 space-y-3 shadow-sm hover:border-[var(--color-window-border)] transition-colors duration-250">
      {title && (
        <h4 className="text-[15px] font-semibold text-[var(--color-text)] tracking-tight">
          {title}
        </h4>
      )}
      <div className="text-[13px] font-normal">{children}</div>
    </div>
  );
}

function Info({ icon, text, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2.5 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-150 truncate group"
    >
      <span className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors">{icon}</span>
      <span className="truncate font-medium">{text}</span>
    </a>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-[var(--color-surface-inactive)] border border-[var(--color-surface-border)] rounded-xl p-4 text-center shadow-sm transition-colors duration-250">
      <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-text-tertiary)] transition-colors duration-250">
        {label}
      </div>
      <div className="mt-1 text-xl sm:text-2xl font-semibold text-[var(--color-text)] tracking-tight transition-colors duration-250">
        {value}
      </div>
    </div>
  );
}

function TechBadge({ label, icon }) {
  return (
    <div className="flex items-center gap-1.5 border border-transparent bg-[var(--color-surface-border)] px-2.5 py-1 rounded-md text-[12px] font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-inactive)] hover:border-[var(--color-surface-border)] hover:text-[var(--color-text)] transition-all duration-150">
      {icon && <span className="text-[var(--color-text-tertiary)] text-[11px] transition-colors">{icon}</span>}
      {label}
    </div>
  );
}
