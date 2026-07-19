import { FiMapPin, FiBriefcase, FiMail, FiArrowUpRight } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function AboutSection() {
  return (
    // Main Window Body - Adapts to surface background automatically
    <div className="w-full min-h-full bg-[var(--color-surface)] text-[var(--color-text)] font-primary transition-colors duration-250 flex flex-col custom-scrollbar overflow-y-auto">

      {/* Header Section */}
      <div className="p-8 md:p-12 pb-6">
        <div className="flex flex-col gap-6">

          {/* Title & 1-Line Description */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text)]">
              Siddharth Nirmale.
            </h1>
            <p className="text-lg md:text-xl font-medium text-[var(--color-text-secondary)] tracking-tight max-w-2xl">
              I build sleek, intelligent full-stack experiences with React, Next.js, and AI. 🚀
            </p>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap gap-3 text-[13px] font-medium pt-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-surface-inactive)] rounded-full text-[var(--color-text-secondary)] border border-[var(--color-surface-border)] shadow-sm">
              <FiBriefcase className="text-[var(--color-text-tertiary)]" /> Full-Stack Developer
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-surface-inactive)] rounded-full text-[var(--color-text-secondary)] border border-[var(--color-surface-border)] shadow-sm">
              <FiMapPin className="text-[var(--color-text-tertiary)]" /> Indore, India
            </span>
          </div>
        </div>
      </div>

      {/* Minimalist Details Section */}
      <div className="px-8 md:px-12 pb-12 space-y-10 flex-1">

        {/* Experience & Projects (Minimal Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-[var(--color-surface-border)]">

          {/* Experience */}
          <div className="space-y-5">
            <h2 className="text-[11px] font-bold uppercase tracking-super-wide text-[var(--color-text-tertiary)]">
              Experience
            </h2>
            <div className="space-y-4">
              <ListItem
                title="Data Science & Dev Intern"
                subtitle="Personifwy • Machine Learning Pipelines"
                year="2024"
              />
            </div>
          </div>

          {/* Top Projects */}
          <div className="space-y-5">
            <h2 className="text-[11px] font-bold uppercase tracking-super-wide text-[var(--color-text-tertiary)]">
              Selected Work
            </h2>
            <div className="space-y-4">
              <ListItem
                title="AI Refund Agent"
                subtitle="Next.js, Groq AI, Zustand"
                year="2026"
              />
              <ListItem
                title="Desktop Portfolio"
                subtitle="React, Framer Motion, Vite"
                year="2026"
              />
              <ListItem
                title="Thumbmax"
                subtitle="Node.js, Gemini API, Cloudinary"
                year="2025"
              />
            </div>
          </div>

        </div>

        {/* Education & Core Tech */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-[var(--color-surface-border)]">
          <div className="space-y-5">
            <h2 className="text-[11px] font-bold uppercase tracking-super-wide text-[var(--color-text-tertiary)]">
              Education
            </h2>
            <ListItem
              title="B.Tech in Electronics & Telecom"
              subtitle="MITS Gwalior • 8.49 CGPA"
              year="2020—2024"
            />
          </div>

          <div className="space-y-5">
            <h2 className="text-[11px] font-bold uppercase tracking-super-wide text-[var(--color-text-tertiary)]">
              Core Tech
            </h2>
            <p className="text-[14px] text-[var(--color-text-secondary)] font-medium leading-relaxed">
              JavaScript, TypeScript, Python, React.js, Next.js, Node.js, Express, MongoDB, Tailwind CSS, Framer Motion.
            </p>
          </div>
        </div>

      </div>

      {/* Footer Links - Uses Inactive Surface for contrast */}
      <div className="p-5 md:px-12 bg-[var(--color-surface-inactive)] border-t border-[var(--color-surface-border)] flex flex-wrap gap-6 items-center mt-auto">
        <SocialLink icon={<FaGithub size={16} />} label="GitHub" href="https://github.com/siddharthNirmale" />
        <SocialLink icon={<FaLinkedin size={16} />} label="LinkedIn" href="https://linkedin.com/in/siddharth-nirmale" />
        <SocialLink icon={<FiMail size={16} />} label="Email" href="mailto:siddharth175nirmale1@gmail.com" />
        <SocialLink icon={<FiArrowUpRight size={16} />} label="Portfolio" href="https://siddharthn-portfolio.vercel.app" />
      </div>

    </div>
  );
}

/* ---------------- HELPER COMPONENTS ---------------- */

function ListItem({ title, subtitle, year }) {
  return (
    <div className="group flex justify-between items-start gap-4 cursor-default">
      <div>
        {/* Uses the Mojave Blue accent on hover */}
        <h3 className="text-[14px] font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
          {title}
        </h3>
        <p className="text-[13px] text-[var(--color-text-secondary)] mt-0.5 transition-colors duration-200">
          {subtitle}
        </p>
      </div>
      <span className="text-[12px] font-medium text-[var(--color-text-tertiary)] whitespace-nowrap pt-0.5 transition-colors duration-200">
        {year}
      </span>
    </div>
  );
}

function SocialLink({ icon, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-[13px] font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200"
    >
      <span className="opacity-80 transition-colors duration-200">{icon}</span>
      {label}
    </a>
  );
}
