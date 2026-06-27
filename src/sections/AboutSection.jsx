import { FiUser, FiMapPin, FiGlobe, FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function AboutSection() {
  return (
    <div className="flex flex-col gap-6 p-2 h-full">

      {/* HEADER */}
      <div className="flex justify-between items-center px-2">
        <h1 className="text-xl font-bold tracking-widest text-text">
          SYS<span className="text-accent">.</span>USER
        </h1>

        <div className="flex items-center gap-2 px-3 py-1 bg-surface-elevated rounded-full border border-surface-border">
          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          <span className="text-[9px] font-bold text-accent uppercase tracking-widest">
            Verified
          </span>
        </div>
      </div>

      {/* ID CARD */}
      <div className="glass-panel !rounded-3xl p-6 relative flex items-center gap-6 border-surface-border">
        <div className="absolute top-0 left-0 w-1 h-full bg-accent rounded-l-3xl" />

        <div className="w-16 h-16 rounded-2xl border border-surface-border flex items-center justify-center bg-surface-elevated">
          <FiUser size={32} className="text-text-tertiary" />
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold uppercase tracking-wider text-text">
            Siddharth Nirmale
          </h2>
          <p className="text-accent text-[10px] font-bold uppercase tracking-[0.2em]">
            Full-Stack Developer
          </p>
          
          <div className="flex items-center gap-4 mt-2 text-[10px] text-text-secondary uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <FiMapPin size={12} className="text-accent" />
              Indore, India
            </div>
            <div className="flex items-center gap-1.5">
              <FiGlobe size={12} className="text-accent" />
              B.Tech 2024
            </div>
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="flex flex-col gap-3 px-2">
        <h3 className="text-[10px] font-bold text-accent uppercase tracking-widest">
          Profile.Summary
        </h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          Full-Stack Developer specializing in MERN stack and cloud infrastructure. 
          Passionate about building scalable web solutions and integrating AI-driven features. 
          Currently focused on high-performance deployment pipelines and modern web architecture.
        </p>
      </div>

      {/* SOCIALS */}
      <div className="mt-auto px-2 pt-4 border-t border-surface-border flex gap-6">
        <SocialLink
          icon={<FaGithub size={14} />}
          label="GitHub"
          href="https://github.com/siddharthNirmale"
        />
        <SocialLink
          icon={<FaLinkedin size={14} />}
          label="LinkedIn"
          href="https://linkedin.com/in/siddharth-nirmale"
        />
        <SocialLink
          icon={<FiMail size={14} />}
          label="Email"
          href="mailto:siddharth175nirmale1@gmail.com"
        />
      </div>
    </div>
  );
}

function SocialLink({ icon, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-[10px] uppercase font-medium text-text-secondary hover:text-accent transition-colors"
    >
      {icon}
      {label}
    </a>
  );
}