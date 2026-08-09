import {
  FiMapPin,
  FiBriefcase,
  FiMail,
  FiArrowUpRight,
} from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function AboutSection() {
  return (
    <div className="flex min-h-full flex-col bg-[var(--color-surface)] text-[var(--color-text)]">
      {/* Hero */}
      <section className="px-8 py-10 md:px-12 md:py-14">
        <div className="max-w-3xl">
          <p className="mb-4 text-[13px] font-medium tracking-wide text-[var(--color-text-tertiary)]">
            ABOUT
          </p>

          <h1 className="text-4xl font-semibold tracking-[-0.035em] md:text-6xl">
            Siddharth Nirmale.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed tracking-[-0.01em] text-[var(--color-text-secondary)] md:text-xl">
            I build sleek, intelligent full-stack experiences with React,
            Next.js, and AI.
          </p>

          {/* Context */}
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[13px] font-medium text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-2">
              <FiBriefcase className="text-[var(--color-text-tertiary)]" />
              Full-Stack Developer
            </span>

            <span className="flex items-center gap-2">
              <FiMapPin className="text-[var(--color-text-tertiary)]" />
              Indore, India
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 px-8 pb-10 md:px-12">
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 border-t border-[var(--color-surface-border)] pt-8 md:grid-cols-2">
          {/* Experience */}
          <ContentGroup title="Experience">
            <ListItem
              title="Data Science & Dev Intern"
              subtitle="Personifwy · Machine Learning Pipelines"
              year="2024"
            />
          </ContentGroup>

          {/* Selected Work */}
          <ContentGroup title="Selected Work">
            <ListItem
              title="Desktop Portfolio"
              subtitle="React · Framer Motion · APIs"
              year="2026"
            />

            <ListItem
              title="AI Refund Agent"
              subtitle="Next.js · Groq AI · Zustand"
              year="2026"
            />

            <ListItem
              title="Thumbmax"
              subtitle="Node.js · Gemini API · Cloudinary"
              year="2025"
            />
          </ContentGroup>

          {/* Education */}
          <ContentGroup title="Education">
            <ListItem
              title="B.Tech in Electronics & Telecom"
              subtitle="MITS Gwalior · 8.49 CGPA"
              year="2020—2024"
            />
          </ContentGroup>

          {/* Core Tech */}
          <ContentGroup title="Core Tech">
            <p className="max-w-xl text-[14px] leading-7 text-[var(--color-text-secondary)]">
              JavaScript, TypeScript, C++, React.js, Next.js, Node.js,
              Express, MongoDB, Tailwind CSS, Framer Motion.
            </p>
          </ContentGroup>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-surface-border)] px-8 py-5 md:px-12">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <SocialLink
            icon={<FaGithub size={15} />}
            label="GitHub"
            href="https://github.com/siddharthNirmale"
          />

          <SocialLink
            icon={<FaLinkedin size={15} />}
            label="LinkedIn"
            href="https://linkedin.com/in/siddharth-nirmale"
          />

          <SocialLink
            icon={<FiMail size={15} />}
            label="Email"
            href="mailto:siddharth175nirmale1@gmail.com"
          />

          <SocialLink
            icon={<FiArrowUpRight size={15} />}
            label="Portfolio"
            href="https://siddharthn-portfolio.vercel.app"
          />
        </div>
      </footer>
    </div>
  );
}

/* ---------------- CONTENT GROUP ---------------- */

function ContentGroup({ title, children }) {
  return (
    <section className="space-y-5">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-tertiary)]">
        {title}
      </h2>

      <div className="space-y-1">{children}</div>
    </section>
  );
}

/* ---------------- LIST ITEM ---------------- */

function ListItem({ title, subtitle, year }) {
  return (
    <div className="group flex items-start justify-between gap-6 rounded-xl py-3 transition-colors duration-200 hover:bg-[var(--color-surface-inactive)]">
      <div className="min-w-0">
        <h3 className="text-[14px] font-medium tracking-[-0.01em] text-[var(--color-text)]">
          {title}
        </h3>

        <p className="mt-1 text-[13px] leading-5 text-[var(--color-text-secondary)]">
          {subtitle}
        </p>
      </div>

      <span className="shrink-0 pt-0.5 text-[12px] font-medium tabular-nums text-[var(--color-text-tertiary)]">
        {year}
      </span>
    </div>
  );
}

/* ---------------- SOCIAL LINK ---------------- */

function SocialLink({ icon, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 text-[13px] font-medium text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text)]"
    >
      <span className="text-[var(--color-text-tertiary)] transition-colors duration-200 group-hover:text-[var(--color-text)]">
        {icon}
      </span>

      <span>{label}</span>
    </a>
  );
}
