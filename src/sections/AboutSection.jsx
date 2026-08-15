import {
  FiMapPin,
  FiBriefcase,
  FiMail,
  FiArrowUpRight,
  FiCode,
  FiBookOpen,
} from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function AboutSection() {
  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar bg-[var(--color-surface)] text-[var(--color-text)] font-primary">
      <div className="mx-auto w-full max-w-5xl">

        {/* =====================================================
            INTRO
        ====================================================== */}
        <section className="px-5 py-7 sm:px-7 sm:py-9 md:px-10 md:py-11">
          <div className="max-w-3xl">

            <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-medium text-[var(--color-text-tertiary)]">
              <span className="inline-flex items-center gap-1.5">
                <FiBriefcase size={13} />
                Full-Stack Developer
              </span>

              <span className="h-1 w-1 rounded-full bg-[var(--color-text-disabled)]" />

              <span className="inline-flex items-center gap-1.5">
                <FiMapPin size={13} />
                Indore, India
              </span>
            </div>

            <h1
              className="
                text-[clamp(2.25rem,6vw,4rem)]
                leading-[0.98]
                font-heading
                font-semibold
                tracking-[-0.045em]
                text-[var(--color-text)]
              "
            >
              Siddharth
              <span className="text-[var(--color-text-tertiary)]">
                {" "}Nirmale.
              </span>
            </h1>

            <p
              className="
                mt-5
                max-w-2xl
                text-[15px]
                sm:text-[17px]
                leading-relaxed
                tracking-[-0.015em]
                text-[var(--color-text-secondary)]
              "
            >
              I build sleek, intelligent full-stack experiences with
              React, Next.js, Node.js, and AI.
            </p>

            {/* Quick facts */}
            <div className="mt-7 flex flex-wrap gap-2">
              <QuickTag icon={<FiCode size={13} />}>
                React · Next.js · Node
              </QuickTag>

              <QuickTag icon={<FiBookOpen size={13} />}>
                B.Tech · 2024
              </QuickTag>
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTENT
        ====================================================== */}
        <section className="px-5 pb-7 sm:px-7 sm:pb-9 md:px-10">

          <div
            className="
              grid
              grid-cols-1
              gap-8
              border-t
              border-[var(--color-surface-border)]
              pt-7
              md:grid-cols-[0.85fr_1.15fr]
              md:gap-12
            "
          >

            {/* Experience */}
            <Section title="Experience">
              <ExperienceItem
                title="Data Science & Dev Intern"
                company="Personifwy"
                description="Machine learning pipelines, NLP and data analysis."
                year="2024"
              />
            </Section>

            {/* Selected work */}
            <Section title="Selected Work">
              <div className="divide-y divide-[var(--color-surface-border)]">
                <ProjectItem
                  title="Desktop Portfolio"
                  description="Interactive desktop experience"
                  tech="React · Framer Motion"
                  year="2026"
                />

                <ProjectItem
                  title="AI Refund Agent"
                  description="AI-powered customer support agent"
                  tech="Next.js · Groq · Zustand"
                  year="2026"
                />

                <ProjectItem
                  title="Thumbmax"
                  description="AI thumbnail generation platform"
                  tech="Node.js · Gemini · Cloudinary"
                  year="2025"
                />
              </div>
            </Section>
          </div>

          {/* Education / Tech */}
          <div
            className="
              mt-8
              grid
              grid-cols-1
              gap-8
              border-t
              border-[var(--color-surface-border)]
              pt-7
              md:grid-cols-2
              md:gap-12
            "
          >
            <Section title="Education">
              <div>
                <h3 className="text-[14px] font-semibold tracking-[-0.01em]">
                  B.Tech in Electronics & Telecom
                </h3>

                <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
                  MITS Gwalior
                </p>

                <div className="mt-3 flex items-center gap-2 text-[11px] font-medium text-[var(--color-text-tertiary)]">
                  <span>2020—2024</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--color-text-disabled)]" />
                  <span>8.49 CGPA</span>
                </div>
              </div>
            </Section>

            <Section title="Core Tech">
              <p
                className="
                  max-w-md
                  text-[13px]
                  leading-[1.8]
                  text-[var(--color-text-secondary)]
                "
              >
                JavaScript, TypeScript, C++, React.js, Next.js,
                Node.js, Express, MongoDB, Tailwind CSS and
                Framer Motion.
              </p>
            </Section>
          </div>

        </section>

        {/* =====================================================
            FOOTER
        ====================================================== */}
        <footer
          className="
            border-t
            border-[var(--color-surface-border)]
            px-5
            py-4
            sm:px-7
            md:px-10

            flex
            flex-wrap
            items-center
            gap-x-5
            gap-y-3
          "
        >
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
            external
          />
        </footer>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION
============================================================ */

function Section({ title, children }) {
  return (
    <section>
      <h2
        className="
          mb-4
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.12em]
          text-[var(--color-text-tertiary)]
        "
      >
        {title}
      </h2>

      {children}
    </section>
  );
}

/* ============================================================
   QUICK TAG
============================================================ */

function QuickTag({ icon, children }) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5

        rounded-full
        border
        border-[var(--color-surface-border)]

        bg-[var(--color-surface-inactive)]

        px-2.5
        py-1.5

        text-[11px]
        font-medium
        text-[var(--color-text-secondary)]
      "
    >
      <span className="text-[var(--color-text-tertiary)]">
        {icon}
      </span>

      {children}
    </span>
  );
}

/* ============================================================
   EXPERIENCE
============================================================ */

function ExperienceItem({
  title,
  company,
  description,
  year,
}) {
  return (
    <div className="group">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className="
              text-[14px]
              font-semibold
              tracking-[-0.015em]
              text-[var(--color-text)]

              transition-colors
              duration-150

              group-hover:text-[var(--color-accent)]
            "
          >
            {title}
          </h3>

          <p className="mt-1 text-[12px] text-[var(--color-text-tertiary)]">
            {company}
          </p>
        </div>

        <span
          className="
            shrink-0
            pt-0.5
            text-[11px]
            font-medium
            text-[var(--color-text-tertiary)]
          "
        >
          {year}
        </span>
      </div>

      <p
        className="
          mt-3
          max-w-sm
          text-[12px]
          leading-relaxed
          text-[var(--color-text-secondary)]
        "
      >
        {description}
      </p>
    </div>
  );
}

/* ============================================================
   PROJECT
============================================================ */

function ProjectItem({
  title,
  description,
  tech,
  year,
}) {
  return (
    <div
      className="
        group
        flex
        cursor-default
        items-center
        justify-between
        gap-4

        py-3.5

        first:pt-0
        last:pb-0
      "
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3
            className="
              truncate
              text-[13px]
              font-semibold
              tracking-[-0.01em]
              text-[var(--color-text)]

              transition-colors
              duration-150

              group-hover:text-[var(--color-accent)]
            "
          >
            {title}
          </h3>

          <FiArrowUpRight
            size={13}
            className="
              shrink-0
              opacity-0
              -translate-x-1
              text-[var(--color-accent)]

              transition-all
              duration-150

              group-hover:translate-x-0
              group-hover:opacity-100
            "
          />
        </div>

        <p className="mt-1 text-[12px] text-[var(--color-text-tertiary)]">
          {description}
        </p>

        <p className="mt-1 text-[11px] text-[var(--color-text-secondary)]">
          {tech}
        </p>
      </div>

      <span
        className="
          shrink-0
          text-[11px]
          font-medium
          text-[var(--color-text-tertiary)]
        "
      >
        {year}
      </span>
    </div>
  );
}

/* ============================================================
   SOCIAL LINK
============================================================ */

function SocialLink({
  icon,
  label,
  href,
  external,
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group

        inline-flex
        items-center
        gap-1.5

        text-[12px]
        font-medium
        text-[var(--color-text-secondary)]

        transition-colors
        duration-150

        hover:text-[var(--color-text)]
      "
    >
      <span
        className="
          flex
          text-[var(--color-text-tertiary)]

          transition-colors
          duration-150

          group-hover:text-[var(--color-accent)]
        "
      >
        {icon}
      </span>

      <span>{label}</span>

      {external && (
        <FiArrowUpRight
          size={11}
          className="
            text-[var(--color-text-disabled)]
            transition-all
            duration-150

            group-hover:-translate-y-0.5
            group-hover:translate-x-0.5
          "
        />
      )}
    </a>
  );
}
