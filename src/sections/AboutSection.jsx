import { FiMapPin, FiBriefcase, FiMail, FiArrowUpRight } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function AboutSection() {
  return (
    // Main Window Body - 3D Toy Retro Theme
    <div className="w-full min-h-full bg-[#f8fafc] dark:bg-[#111317] text-[#223344] dark:text-[#f1f5f9] font-primary transition-colors duration-250 flex flex-col custom-scrollbar overflow-y-auto relative">

      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(#0066ff 1px, transparent 1px)', backgroundSize: '16px 16px' }}
      />

      {/* Header Section */}
      <div className="p-8 md:p-12 pb-6 relative z-10">
        <div className="flex flex-col gap-6">

          {/* Title & 1-Line Description */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0066ff] dark:text-[#6699ff] drop-shadow-[0_2px_2px_rgba(0,102,255,0.15)]">
              Siddharth Nirmale.
            </h1>
            <p className="text-base md:text-lg font-bold text-[#64748b] dark:text-[#94a3b8] tracking-tight max-w-2xl leading-relaxed">
              I build sleek, intelligent full-stack experiences with React, Next.js, and AI. 🚀
            </p>
          </div>

          {/* Quick Chunky Badges */}
          <div className="flex flex-wrap gap-3 text-[12px] font-black pt-2">
            <span className="flex items-center gap-2 px-4 py-2 bg-[#eef2f5] dark:bg-[#252830] rounded-[12px] text-[#0066ff] dark:text-[#6699ff] border-t-[2px] border-t-white/80 dark:border-t-white/10 border-b-[4px] border-b-[#cdd4db] dark:border-b-[#0d0e12] shadow-[0_4px_8px_rgba(0,0,0,0.05)]">
              <FiBriefcase size={14} className="text-[#ff6b1a]" /> Full-Stack Developer
            </span>
            <span className="flex items-center gap-2 px-4 py-2 bg-[#eef2f5] dark:bg-[#252830] rounded-[12px] text-[#0066ff] dark:text-[#6699ff] border-t-[2px] border-t-white/80 dark:border-t-white/10 border-b-[4px] border-b-[#cdd4db] dark:border-b-[#0d0e12] shadow-[0_4px_8px_rgba(0,0,0,0.05)]">
              <FiMapPin size={14} className="text-[#ff6b1a]" /> Indore, India
            </span>
          </div>
        </div>
      </div>

      {/* Minimalist Details Section */}
      <div className="px-8 md:px-12 pb-12 space-y-10 flex-1 relative z-10">

        {/* Experience & Projects (Grid Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t-2 border-[#d5dde5] dark:border-[#2c3039]">

          {/* Experience */}
          <div className="space-y-4 p-6 bg-[#eef2f5] dark:bg-[#1a1c23] rounded-[24px] border-t-[3px] border-t-white/80 dark:border-t-white/10 border-b-[6px] border-b-[#cdd4db] dark:border-b-[#0d0e12] shadow-[0_10px_20px_rgba(0,10,30,0.08)]">
            <h2 className="text-[11px] font-black uppercase tracking-widest text-[#ff6b1a]">
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
          <div className="space-y-4 p-6 bg-[#eef2f5] dark:bg-[#1a1c23] rounded-[24px] border-t-[3px] border-t-white/80 dark:border-t-white/10 border-b-[6px] border-b-[#cdd4db] dark:border-b-[#0d0e12] shadow-[0_10px_20px_rgba(0,10,30,0.08)]">
            <h2 className="text-[11px] font-black uppercase tracking-widest text-[#ff6b1a]">
              Selected Work
            </h2>
            <div className="space-y-3">
              <ListItem
                title="Desktop Portfolio"
                subtitle="React, Framer Motion, API"
                year="2026"
              />
              <ListItem
                title="AI Refund Agent"
                subtitle="Next.js, Groq AI, Zustand"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-4 p-6 bg-[#eef2f5] dark:bg-[#1a1c23] rounded-[24px] border-t-[3px] border-t-white/80 dark:border-t-white/10 border-b-[6px] border-b-[#cdd4db] dark:border-b-[#0d0e12] shadow-[0_10px_20px_rgba(0,10,30,0.08)]">
            <h2 className="text-[11px] font-black uppercase tracking-widest text-[#ff6b1a]">
              Education
            </h2>
            <ListItem
              title="B.Tech in Electronics & Telecom"
              subtitle="MITS Gwalior • 8.49 CGPA"
              year="2020—2024"
            />
          </div>

          <div className="space-y-4 p-6 bg-[#eef2f5] dark:bg-[#1a1c23] rounded-[24px] border-t-[3px] border-t-white/80 dark:border-t-white/10 border-b-[6px] border-b-[#cdd4db] dark:border-b-[#0d0e12] shadow-[0_10px_20px_rgba(0,10,30,0.08)]">
            <h2 className="text-[11px] font-black uppercase tracking-widest text-[#ff6b1a]">
              Core Tech
            </h2>
            <p className="text-[13px] text-[#64748b] dark:text-[#94a3b8] font-bold leading-relaxed">
              JavaScript, TypeScript, C++, React.js, Next.js, Node.js, Express, MongoDB, Tailwind CSS, Framer Motion.
            </p>
          </div>
        </div>

      </div>

      {/* Footer Links - Chunky Dock Bar Style */}
      <div className="p-6 md:px-12 bg-[#d5dde5] dark:bg-[#111317] border-t-2 border-[#cdd4db] dark:border-[#2c3039] flex flex-wrap gap-6 items-center justify-between mt-auto relative z-10 shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)]">
        <div className="flex flex-wrap gap-4 items-center">
          <SocialLink icon={<FaGithub size={16} />} label="GitHub" href="https://github.com/siddharthNirmale" />
          <SocialLink icon={<FaLinkedin size={16} />} label="LinkedIn" href="https://linkedin.com/in/siddharth-nirmale" />
          <SocialLink icon={<FiMail size={16} />} label="Email" href="mailto:siddharth175nirmale1@gmail.com" />
        </div>
        <SocialLink icon={<FiArrowUpRight size={16} />} label="Portfolio" href="https://siddharthn-portfolio.vercel.app" isAccent />
      </div>

    </div>
  );
}

/* ---------------- HELPER COMPONENTS ---------------- */

function ListItem({ title, subtitle, year }) {
  return (
    <div className="group flex justify-between items-start gap-4 cursor-default p-2.5 rounded-[14px] hover:bg-white dark:hover:bg-[#252830] transition-colors duration-150 border border-transparent hover:border-[#cdd4db] dark:hover:border-[#2c3039]">
      <div>
        <h3 className="text-[13px] font-black text-[#223344] dark:text-white group-hover:text-[#0066ff] dark:group-hover:text-[#6699ff] transition-colors duration-150">
          {title}
        </h3>
        <p className="text-[12px] font-bold text-[#8899aa] dark:text-[#64748b] mt-0.5">
          {subtitle}
        </p>
      </div>
      <span className="px-2 py-1 bg-[#d5dde5] dark:bg-[#2c3039] rounded-[8px] text-[10px] font-black text-[#0066ff] dark:text-[#6699ff] whitespace-nowrap shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
        {year}
      </span>
    </div>
  );
}

function SocialLink({ icon, label, href, isAccent = false }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 px-3.5 py-2 rounded-[12px] text-[12px] font-black transition-all duration-200 cursor-pointer
        ${isAccent
          ? 'bg-[#ff6b1a] text-white border-b-[3px] border-[#b34000] shadow-[0_4px_8px_rgba(255,107,26,0.3)] hover:bg-[#ff8533]'
          : 'bg-[#eef2f5] dark:bg-[#252830] text-[#0066ff] dark:text-[#6699ff] border-t-[2px] border-t-white/80 dark:border-t-white/10 border-b-[4px] border-b-[#cdd4db] dark:border-b-[#0d0e12] hover:brightness-110'}`}
    >
      <span className="drop-shadow-sm">{icon}</span>
      {label}
    </a>
  );
}
