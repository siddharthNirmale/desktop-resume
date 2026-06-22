import { FiUser, FiMapPin, FiGlobe, FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function AboutSection() {
  return (
    <div className="
      h-[450px]
      flex flex-col
      p-6
      bg-[var(--color-surface)]
      text-white
      font-[var(--font-primary)]
      overflow-hidden
    ">

      {/* HEADER */}
      <div className="
        flex justify-between items-end
        pb-4 mb-6
        border-b border-[var(--color-surface-border)]
      ">
        <h1 className="text-2xl font-bold tracking-[0.2em]">
          SYS<span className="text-[var(--color-accent)]">.</span>USER
        </h1>

        <span className="
          text-[10px]
          text-[var(--color-accent)]
          uppercase tracking-[var(--tracking-super-wide)]
          flex items-center gap-2
        ">
          <span className="
            w-1.5 h-1.5
            bg-[var(--color-accent)]
            rounded-full animate-pulse
          " />
          Verified
        </span>
      </div>

      {/* ID CARD */}
      <div className="
        bg-[var(--color-surface-dark)]
        border border-[var(--color-surface-border)]
        p-6 relative mb-6
      ">

        <div className="
          absolute top-0 left-0 w-1 h-full
          bg-[var(--color-accent)]
        " />

        <div className="flex items-center gap-6">

          <div className="
            w-16 h-16
            border border-[var(--color-surface-border)]
            flex items-center justify-center
            bg-[var(--color-surface)]
          ">
            <FiUser size={32} className="text-white/40" />
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest">
              Siddharth Nirmale
            </h2>

            <p className="
              text-[var(--color-accent)]
              text-[10px]
              font-bold uppercase
              tracking-[0.25em]
            ">
              Full-Stack Developer
            </p>
          </div>

        </div>

        <div className="
          mt-6 grid grid-cols-2 gap-2
          text-[10px] uppercase
          text-white/50
        ">
          <div className="flex items-center gap-2">
            <FiMapPin size={12} />
            Indore, India
          </div>

          <div className="flex items-center gap-2">
            <FiGlobe size={12} />
            B.Tech 2024
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="flex-1 mb-6">
        <h3 className="
          text-[10px]
          font-bold
          text-[var(--color-accent)]
          uppercase tracking-widest mb-2
        ">
          Profile.Summary
        </h3>

        <p className="
          text-xs
          text-white/60
          leading-relaxed
        ">
          Full-Stack Developer specializing in MERN stack and cloud infrastructure.
          Passionate about building scalable web solutions and integrating AI-driven features.
          Currently focused on high-performance deployment pipelines and modern web architecture.
        </p>
      </div>

      {/* SOCIALS */}
      <div className="
        pt-4 border-t border-[var(--color-surface-border)]
        flex gap-4
      ">
        <SocialLink
          icon={<FaGithub size={16} />}
          label="GitHub"
          href="https://github.com/siddharthNirmale"
        />

        <SocialLink
          icon={<FaLinkedin size={16} />}
          label="LinkedIn"
          href="https://linkedin.com/in/siddharth-nirmale"
        />

        <SocialLink
          icon={<FiMail size={16} />}
          label="Email"
          href="mailto:siddharth175nirmale1@gmail.com"
        />
      </div>

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
      className="
        flex items-center gap-2
        text-[10px] uppercase
        text-white/50
        hover:text-[var(--color-accent)]
        transition-colors
      "
    >
      {icon}
      {label}
    </a>
  );
}