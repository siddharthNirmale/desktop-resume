import {
  FiExternalLink,
  FiMail,
  FiPhone,
  FiMapPin,
  FiDownload,
} from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GraduationCapIcon as GraduationCap } from "lucide-animated";
import { Code2, Briefcase } from "lucide-react";
import projects from "../data/project";
import skills from "../data/skills";
import resume from "../data/resume";
import iconMap from "../utils/iconMap";

export default function ResumeSection() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resume;
    link.setAttribute("download", "Siddharth_Nirmale_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="
        flex
        min-h-full
        w-full
        flex-col
        bg-[var(--color-surface)]
        text-[var(--color-text)]
        font-primary

        selection:bg-[var(--color-accent)]
        selection:text-white
      "
    >
      {/* =====================================================
          TOP BAR
      ====================================================== */}
      <header
        className="
          sticky
          top-0
          z-30
          shrink-0

          flex
          items-center
          justify-between
          gap-4

          border-b
          border-[var(--color-surface-border)]

          bg-[var(--color-surface)]

          px-5
          py-3.5

          sm:px-7
          md:px-8
        "
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1
              className="
                truncate
                text-[16px]
                font-semibold
                tracking-[-0.02em]
                text-[var(--color-text)]
                sm:text-[17px]
              "
            >
              Siddharth_Resume.pdf
            </h1>

            <span
              className="
                hidden
                rounded-full
                bg-[var(--color-surface-inactive)]
                px-2
                py-0.5
                text-[9px]
                font-medium
                uppercase
                tracking-wide
                text-[var(--color-text-tertiary)]
                sm:inline-flex
              "
            >
              Resume
            </span>
          </div>

          <p
            className="
              mt-0.5
              hidden
              text-[11px]
              text-[var(--color-text-tertiary)]
              sm:block
            "
          >
            Skills, experience, projects & education
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="
            inline-flex
            shrink-0
            items-center
            gap-1.5

            rounded-[8px]

            bg-[var(--color-accent)]
            px-3
            py-2

            text-[11px]
            font-semibold
            text-white

            shadow-sm

            transition-all
            duration-150

            hover:brightness-110
            active:scale-[0.98]
            active:brightness-95

            focus:outline-none
          "
        >
          <FiDownload size={13} />
          <span className="hidden sm:inline">
            Download PDF
          </span>
          <span className="sm:hidden">
            PDF
          </span>
        </button>
      </header>

      {/* =====================================================
          DOCUMENT
      ====================================================== */}
      <main
        className="
          mx-auto
          w-full
          max-w-4xl

          flex-1
          space-y-8

          overflow-y-auto
          custom-scrollbar

          px-5
          py-7

          sm:px-7
          md:px-8
          md:py-9
        "
      >
        {/* ===================================================
            IDENTITY
        ==================================================== */}
        <section
          className="
            border-b
            border-[var(--color-surface-border)]
            pb-7
          "
        >
          <div
            className="
              flex
              flex-col
              gap-6

              md:flex-row
              md:items-end
              md:justify-between
            "
          >
            <div className="min-w-0">
              <p
                className="
                  mb-2
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[var(--color-text-tertiary)]
                "
              >
                Profile
              </p>

              <h2
                className="
                  text-[34px]
                  font-heading
                  font-bold
                  leading-[1]
                  tracking-[-0.045em]
                  text-[var(--color-text)]

                  sm:text-[40px]
                "
              >
                Siddharth Nirmale
              </h2>

              <p
                className="
                  mt-2
                  text-[16px]
                  font-semibold
                  tracking-[-0.015em]
                  text-[var(--color-accent)]

                  sm:text-[17px]
                "
              >
                Full Stack Software Developer
              </p>

              <div
                className="
                  mt-3
                  flex
                  items-center
                  gap-1.5

                  text-[11px]
                  font-medium
                  text-[var(--color-text-tertiary)]
                "
              >
                <FiMapPin size={12} />
                Indore, India
              </div>
            </div>

            {/* Contact */}
            <div
              className="
                grid
                min-w-0
                grid-cols-1
                gap-x-6
                gap-y-2

                text-[11px]
                sm:grid-cols-2
              "
            >
              <Info
                icon={<FiPhone size={12} />}
                text="+91 77238 24225"
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
        </section>

        {/* ===================================================
            KEY METRICS
        ==================================================== */}
        <section
          className="
            grid
            grid-cols-2
            gap-2.5

            sm:grid-cols-4
          "
        >
          <StatCard
            label="CGPA"
            value="8.49"
            emphasis
          />

          <StatCard
            label="Projects"
            value="03"
            emphasis
          />

          <StatCard
            label="Stack"
            value="MERN"
          />

          <StatCard
            label="Focus"
            value="Frontend"
          />
        </section>

        {/* ===================================================
            EDUCATION
        ==================================================== */}
        <section>
          <SectionTitle
            icon={<GraduationCap size={15} />}
            title="Education"
          />

          <Panel>
            <div
              className="
                flex
                flex-col
                gap-3

                sm:flex-row
                sm:items-start
                sm:justify-between
              "
            >
              <div>
                <h4
                  className="
                    text-[16px]
                    font-bold
                    tracking-[-0.02em]
                    text-[var(--color-text)]
                  "
                >
                  Madhav Institute of Technology & Science
                </h4>

                <p
                  className="
                    mt-1
                    text-[13px]
                    font-medium
                    text-[var(--color-text-secondary)]
                  "
                >
                  B.Tech in Electronics & Telecommunication
                </p>

                <p
                  className="
                    mt-2
                    text-[12px]
                    font-semibold
                    text-[var(--color-accent)]
                  "
                >
                  8.49 / 10 CGPA
                </p>
              </div>

              <span
                className="
                  shrink-0
                  text-[11px]
                  font-semibold
                  tabular-nums
                  text-[var(--color-text-tertiary)]
                "
              >
                2020 — 2024
              </span>
            </div>
          </Panel>
        </section>

        {/* ===================================================
            PROJECTS
        ==================================================== */}
        <section>
          <SectionTitle
            icon={<Code2 size={15} />}
            title="Selected Projects"
          />

          <div className="space-y-3">
            {projects.map((project) => (
              <ProjectPanel
                key={project.title}
                project={project}
              />
            ))}
          </div>
        </section>

        {/* ===================================================
            SKILLS
        ==================================================== */}
        <section>
          <SectionTitle
            icon={<Briefcase size={14} />}
            title="Technical Skills"
          />

          <div
            className="
              grid
              grid-cols-1
              gap-5

              rounded-[12px]
              border
              border-[var(--color-surface-border)]
              bg-[var(--color-surface-inactive)]

              p-4

              sm:grid-cols-2
              sm:p-5
            "
          >
            {skills.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="min-w-0"
              >
                <h4
                  className="
                    mb-2.5
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.06em]
                    text-[var(--color-text)]
                  "
                >
                  {skillGroup.category}
                </h4>

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
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({ icon, title }) {
  return (
    <div
      className="
        mb-3
        flex
        items-center
        gap-2

        border-b
        border-[var(--color-surface-border)]

        pb-2
      "
    >
      <span className="text-[var(--color-text-secondary)]">
        {icon}
      </span>

      <h3
        className="
          text-[11px]
          font-bold
          uppercase
          tracking-[0.08em]
          text-[var(--color-text)]
        "
      >
        {title}
      </h3>
    </div>
  );
}

/* =========================================================
   PANEL
========================================================= */

function Panel({ children }) {
  return (
    <div
      className="
        rounded-[12px]

        border
        border-[var(--color-surface-border)]

        bg-[var(--color-surface-inactive)]

        p-4
        sm:p-5

        transition-colors
        duration-150

        hover:border-[var(--color-window-border)]
      "
    >
      {children}
    </div>
  );
}

/* =========================================================
   PROJECT PANEL
========================================================= */

function ProjectPanel({ project }) {
  return (
    <article
      className="
        group

        rounded-[12px]

        border
        border-[var(--color-surface-border)]

        bg-[var(--color-surface-inactive)]

        p-4
        sm:p-5

        transition-colors
        duration-150

        hover:border-[var(--color-window-border)]
      "
    >
      <div
        className="
          flex
          flex-col
          gap-2

          sm:flex-row
          sm:items-start
          sm:justify-between
        "
      >
        <div className="min-w-0">
          <h4
            className="
              text-[16px]
              font-bold
              leading-tight
              tracking-[-0.02em]
              text-[var(--color-text)]
            "
          >
            {project.title}
          </h4>

          <span
            className="
              mt-1.5
              inline-block

              text-[10px]
              font-bold
              uppercase
              tracking-[0.08em]

              text-[var(--color-accent)]
            "
          >
            {project.tech}
          </span>
        </div>

        <span
          className="
            shrink-0
            text-[11px]
            font-semibold
            tabular-nums
            text-[var(--color-text-tertiary)]
          "
        >
          {project.year}
        </span>
      </div>

      <ul
        className="
          mt-3
          space-y-1.5

          pl-4

          text-[12px]
          leading-[1.6]

          text-[var(--color-text-secondary)]

          marker:text-[var(--color-text-tertiary)]
        "
      >
        {project.bullets.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>

      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-4
            inline-flex
            items-center
            gap-1.5

            rounded-[7px]

            border
            border-[var(--color-surface-border)]

            bg-[var(--color-surface)]

            px-2.5
            py-1.5

            text-[10px]
            font-semibold

            text-[var(--color-text-secondary)]

            transition-all
            duration-150

            hover:border-[var(--color-accent)]
            hover:text-[var(--color-accent)]
          "
        >
          <FiExternalLink size={11} />
          View Live Project
        </a>
      )}
    </article>
  );
}

/* =========================================================
   CONTACT INFO
========================================================= */

function Info({ icon, text, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        flex
        min-w-0
        items-center
        gap-2

        text-[var(--color-text-secondary)]

        transition-colors
        duration-150

        hover:text-[var(--color-text)]
      "
    >
      <span
        className="
          shrink-0
          text-[var(--color-text-tertiary)]

          transition-colors
          duration-150

          group-hover:text-[var(--color-accent)]
        "
      >
        {icon}
      </span>

      <span className="truncate font-medium">
        {text}
      </span>
    </a>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  label,
  value,
  emphasis = false,
}) {
  return (
    <div
      className="
        rounded-[10px]

        border
        border-[var(--color-surface-border)]

        bg-[var(--color-surface-inactive)]

        px-3
        py-3.5

        text-center
      "
    >
      <div
        className="
          text-[9px]
          font-bold
          uppercase
          tracking-[0.08em]
          text-[var(--color-text-tertiary)]
        "
      >
        {label}
      </div>

      <div
        className={`
          mt-1

          tracking-[-0.035em]

          ${emphasis
            ? "text-[22px] font-bold"
            : "text-[17px] font-semibold"
          }

          text-[var(--color-text)]
        `}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   TECH BADGE
========================================================= */

function TechBadge({ label, icon }) {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-1.5

        rounded-[6px]

        border
        border-[var(--color-surface-border)]

        bg-[var(--color-surface)]

        px-2
        py-1

        text-[11px]
        font-semibold

        text-[var(--color-text-secondary)]

        transition-colors
        duration-150

        hover:text-[var(--color-text)]
        hover:border-[var(--color-window-border)]
      "
    >
      {icon && (
        <span
          className="
            text-[var(--color-text-tertiary)]
          "
        >
          {icon}
        </span>
      )}

      {label}
    </div>
  );
}
