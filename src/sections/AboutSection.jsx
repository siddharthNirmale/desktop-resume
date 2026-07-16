import { FiUser, FiMapPin, FiBriefcase, FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function AboutSection() {
  return (
    <div className="w-full min-h-full bg-[var(--color-surface)] text-[var(--color-text)] flex flex-col font-primary selection:bg-[var(--color-accent)] selection:text-white transition-colors duration-250">
      {/* Article / Identity Panel Block */}
      <div className="p-8 border-b border-[var(--color-surface-border)] flex flex-col md:flex-row gap-8 items-start bg-gradient-to-b from-[var(--color-surface-border)] to-transparent transition-colors duration-250">

        {/* Native Style Profile Avatar Frame */}
        <div className="w-20 h-20 rounded-[14px] border border-[var(--color-surface-border)] flex items-center justify-center bg-[var(--color-surface-inactive)] shadow-inner shrink-0 group relative overflow-hidden transition-colors duration-250">
          <div className="absolute inset-0 bg-[var(--color-accent)] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <FiUser size={36} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors duration-300" />
        </div>

        {/* Core Profile Title Data */}
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-text)] transition-colors duration-250">
              Siddharth Nirmale
            </h1>
            <span className="text-[11px] font-medium text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded-full ring-1 ring-[var(--color-accent)]/30 transition-colors duration-250">
              Available for Hire
            </span>
          </div>

          <p className="text-[14px] font-medium text-[var(--color-text-secondary)] flex items-center gap-2 transition-colors duration-250">
            <FiBriefcase size={14} className="text-[var(--color-text-tertiary)]" />
            Full-Stack Software Developer
          </p>

          {/* Quick Context Tags */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 text-[12px] text-[var(--color-text-tertiary)] font-normal transition-colors duration-250">
            <div className="flex items-center gap-1.5">
              <FiMapPin size={13} className="text-[var(--color-text-tertiary)] opacity-70" />
              Indore, India
            </div>
            <div className="text-[var(--color-surface-border)]">•</div>
            <div>MITS Gwalior (B.Tech)</div>
          </div>
        </div>
      </div>

      {/* Main Profile Editorial Space */}
      <div className="flex-1 p-8 space-y-6">
        <div className="space-y-3">
          <h2 className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider transition-colors duration-250">
            Overview
          </h2>
          <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed max-w-2xl font-normal transition-colors duration-250">
            I build responsive web applications utilizing the MERN stack (MongoDB, Express, React, Node.js) paired with modern utility systems like Tailwind CSS. I prioritize writing scalable, performant client-side structures, maintaining optimized code logic, and creating seamless digital user experiences.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider transition-colors duration-250">
            Current Focus
          </h2>
          <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed max-w-2xl font-normal transition-colors duration-250">
            Developing responsive system frameworks and refining code patterns through daily technical problem-solving. Beyond traditional web development, I am actively engaged in creating and refining digital video animations, focusing on cinematic techniques such as drone-perspective tracking, timelapses, and product reveal sequences.
          </p>
        </div>
      </div>

      {/* Footer Utility Link Tray */}
      <div className="p-5 px-8 border-t border-[var(--color-surface-border)] bg-[var(--color-surface-inactive)] flex flex-wrap gap-6 items-center justify-start transition-colors duration-250">
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
      </div>
    </div>
  );
}

/* ---------------- SOCIAL LINK BUTTON ---------------- */

function SocialLink({ icon, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex items-center gap-2
        text-[12px] font-medium
        text-[var(--color-text-secondary)]
        hover:text-[var(--color-accent)]
        transition-colors duration-150
        group
      "
    >
      <span className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors duration-150">
        {icon}
      </span>
      {label}
    </a>
  );
}
