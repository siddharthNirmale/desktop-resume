import { FiUser, FiMapPin, FiBriefcase, FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function AboutSection() {
  return (
    <div className="w-full min-h-full bg-surface text-white flex flex-col font-primary selection:bg-accent/30 selection:text-white">
      {/* Article / Identity Panel Block */}
      <div className="p-8 border-b border-white/5 flex flex-col md:flex-row gap-8 items-start bg-gradient-to-b from-white/[0.02] to-transparent">
        
        {/* Native Style Profile Avatar Frame */}
        <div className="w-20 h-20 rounded-[14px] border border-white/10 flex items-center justify-center bg-white/5 shadow-inner shrink-0 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <FiUser size={36} className="text-white/60 group-hover:text-white transition-colors duration-300" />
        </div>

        {/* Core Profile Title Data */}
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-white/95">
              Siddharth Nirmale
            </h1>
            <span className="text-[11px] font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full ring-1 ring-accent/20">
              Available for Hire
            </span>
          </div>
          
          <p className="text-[14px] font-medium text-white/60 flex items-center gap-2">
            <FiBriefcase size={14} className="text-white/40" />
            Full-Stack Software Developer
          </p>

          {/* Quick Context Tags */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 text-[12px] text-white/40 font-normal">
            <div className="flex items-center gap-1.5">
              <FiMapPin size={13} className="text-white/30" />
              Indore, India
            </div>
            <div className="text-white/20">•</div>
            <div>MITS Gwalior (B.Tech)</div>
          </div>
        </div>
      </div>

      {/* Main Profile Editorial Space */}
      <div className="flex-1 p-8 space-y-6">
        <div className="space-y-3">
          <h2 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
            Overview
          </h2>
          <p className="text-[14px] text-white/60 leading-relaxed max-w-2xl font-normal">
            I build responsive web applications utilizing the MERN stack (MongoDB, Express, React, Node.js) paired with modern utility systems like Tailwind CSS. I prioritize writing scalable, performant client-side structures, maintaining optimized code logic, and creating seamless digital user experiences.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
            Current Focus
          </h2>
          <p className="text-[14px] text-white/60 leading-relaxed max-w-2xl font-normal">
            Developing responsive system frameworks, refining code patterns through daily technical problem solving, and building custom web animations.
          </p>
        </div>
      </div>

      {/* Footer Utility Link Tray */}
      <div className="p-5 px-8 border-t border-white/5 bg-[#202020]/40 flex flex-wrap gap-6 items-center justify-start">
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
        text-white/50
        hover:text-accent
        transition-all duration-150
        group
      "
    >
      <span className="text-white/40 group-hover:text-accent transition-colors duration-150">
        {icon}
      </span>
      {label}
    </a>
  );
}