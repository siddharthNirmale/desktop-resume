import {
  FiTerminal,
  FiExternalLink,
  FiMail,
  FiPhone,
  FiMapPin,
  FiAward,
  FiBook,
} from 'react-icons/fi';

import { FaCss3 } from "react-icons/fa";

import {
  FaGithub,
  FaLinkedin,
  FaCode
} from 'react-icons/fa';

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
  SiGit 
} from 'react-icons/si';

import { TbBrandCpp } from 'react-icons/tb';

import {
  GraduationCap,
  Briefcase,
  Code2,
  Award
} from 'lucide-react';

const skills = {
  Languages: ['JavaScript', 'TypeScript', 'Python', 'C++', 'HTML5', 'CSS3'],
  Frontend: ['React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Vite'],
  Backend: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication'],
  Database: ['MongoDB', 'Firebase'],
  'Cloud & Tools': ['Git', 'GitHub'],
  Concepts: ['Data Structures & Algorithms', 'OOP', 'API Integration', 'Responsive Design'],
};

const iconMap = {
  'JavaScript': <SiJavascript />,
  'TypeScript': <SiTypescript />,
  'Python': <SiPython />,
  'C++': <TbBrandCpp />,
  'HTML5': <SiHtml5 />,
  'CSS3': <FaCss3 />,
  'React.js': <SiReact />,
  'Next.js': <SiNextdotjs />,
  'Tailwind CSS': <SiTailwindcss />,
  'Bootstrap': <SiBootstrap />,
  'Vite': <SiVite />,
  'Node.js': <SiNodedotjs />,
  'Express.js': <SiExpress />,
  'MongoDB': <SiMongodb />,
  'Firebase': <SiFirebase />,
  'Git': <SiGit />,
  'GitHub': <FaGithub />
};

const projects = [
  {
    title: 'Thumbmax',
    year: '2026',
    stack: 'Node.js • Express.js • Gemini API • Cloudinary',
    bullets: [
      'Built a scalable AI-powered thumbnail generation platform.',
      'Integrated Gemini API and Cloudinary.',
      'Implemented JWT authentication and API rate limiting.',
      'Deployed production-ready application on Vercel.',
    ],
    link: 'thumbmax-psi.vercel.app',
  },
  {
    title: 'Postify',
    year: '2025',
    stack: 'Node.js • Express.js • MongoDB',
    bullets: [
      'Developed a full-stack social media application.',
      'Built REST APIs for authentication, feeds and posts.',
      'Implemented secure CRUD operations.',
      'Used JWT authentication for access control.',
    ],
    link: 'github.com/siddharthNirmale/Feed-Pin',
  },
  {
    title: 'E-Commerce',
    year: '2025',
    stack: 'React.js • Vite • JavaScript',
    bullets: [
      'Built responsive e-commerce user interface.',
      'Implemented filtering and category navigation.',
      'Used React Hooks for state management.',
      'Optimized for cross-device compatibility.',
    ],
    link: 'ecommerce-aug.vercel.app',
  },
];

export default function ResumeSection() {
  return (
    <div className="h-full overflow-y-auto bg-black p-6 font-mono custom-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-neutral-900 pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-[0.2em] text-white">
            SYS<span className="text-[#f02020]">.</span>RESUME
          </h1>
          <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-2">
            Candidate Record // Access Level: Public
          </p>
        </div>
        <div className="flex items-center gap-2 text-[#f02020] text-[10px] uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-[#f02020] rounded-full animate-pulse" />
          Active
        </div>
      </div>

      <SectionTitle title="Candidate.Record" />
      <div className="bg-[#050505] border border-neutral-800 relative mb-6">
        <div className="absolute left-0 top-0 h-full w-1 bg-[#f02020]" />
        <div className="p-6 pl-8">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-white">Siddharth Nirmale</h2>
          <p className="text-[#f02020] text-[10px] uppercase tracking-[0.25em] mt-2">Full Stack Developer</p>
          <div className="grid md:grid-cols-2 gap-4 mt-6 text-[11px] uppercase tracking-widest text-neutral-400">
            <Info icon={<FiPhone size={12} />} text="+91-772-382-4225" href="tel:+917723824225" />
            <Info icon={<FiMail size={12} />} text="siddharth175nirmale1@gmail.com" href="mailto:siddharth175nirmale1@gmail.com" />
            <Info icon={<FaGithub size={12} />} text="github.com/siddharthNirmale" href="https://github.com/siddharthNirmale" />
            <Info icon={<FaLinkedin size={12} />} text="linkedin.com/in/siddharth-nirmale" href="https://linkedin.com/in/siddharth-nirmale" />
          </div>
        </div>
      </div>

      <SectionTitle title="Summary.Log" />
      <Panel>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Full-Stack Developer with experience building scalable web applications. Skilled in REST API development, authentication systems, and cloud deployment.
        </p>
      </Panel>

      <SectionTitle title="Telemetry" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="CGPA" value="8.49" />
        <StatCard label="PROJECTS" value="03" />
        <StatCard label="EXP" value="04M" />
        <StatCard label="STACK" value="MERN" />
      </div>

      <SectionTitle title="Education.Log" />
      <Panel icon={<GraduationCap size={16} />} title="MITS Gwalior">
        <div className="space-y-2 text-sm text-neutral-400">
          <p>B.Tech Electronics & Telecommunication Engineering</p>
          <p>2020 — 2024 | CGPA : 8.49 / 10</p>
        </div>
      </Panel>

      <SectionTitle title="Projects.Index" />
      <div className="space-y-4 mb-6">
        {projects.map(project => (
          <Panel key={project.title} icon={<Code2 size={16} />} title={`${project.title} // ${project.year}`}>
            <p className="text-[#f02020] text-xs uppercase tracking-widest mb-4">{project.stack}</p>
            <ul className="space-y-2 text-sm text-neutral-400">
              {project.bullets.map(item => <li key={item}>• {item}</li>)}
            </ul>
            <a href={`https://${project.link}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-[#f02020] hover:text-white transition-all text-[10px] uppercase tracking-widest border border-[#f02020] px-3 py-1 w-fit">
              <FiExternalLink size={12} /> Visit Project
            </a>
          </Panel>
        ))}
      </div>

      <SectionTitle title="Skills.Matrix" />
      <div className="space-y-5 mb-6">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group}>
            <div className="text-[10px] uppercase tracking-widest text-[#f02020] mb-3">{group}</div>
            <div className="flex flex-wrap gap-2">
              {items.map(skill => <TechBadge key={skill} label={skill} icon={iconMap[skill]} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ title }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[#f02020] font-bold">❯</span>
      <h3 className="text-xs font-bold text-white uppercase tracking-widest">{title}</h3>
    </div>
  );
}

function Panel({ icon, title, children }) {
  return (
    <div className="bg-[#050505] border border-neutral-900 p-5 mb-4">
      {(icon || title) && (
        <div className="flex items-center gap-3 mb-4 text-white">
          {icon}
          <span className="text-xs uppercase tracking-widest">{title}</span>
        </div>
      )}
      {children}
    </div>
  );
}

function Info({ icon, text, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
      {icon}
      <span>{text}</span>
    </a>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-[#050505] border border-neutral-800 p-4">
      <div className="text-[10px] uppercase tracking-widest text-neutral-500">{label}</div>
      <div className="mt-2 text-3xl font-bold text-white">{value}</div>
    </div>
  );
}

function TechBadge({ label, icon }) {
  return (
    <div className="flex items-center gap-2 border border-neutral-800 bg-black px-3 py-2 text-[10px] uppercase tracking-widest text-neutral-400 hover:border-[#f02020] hover:text-white transition-all">
      {icon}
      {label}
    </div>
  );
}