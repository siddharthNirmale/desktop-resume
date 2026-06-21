import { FiUser, FiMapPin, FiMail, FiGlobe } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function AboutSection() {
  return (
    <div className="h-[450px] flex flex-col p-6 bg-black font-mono overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-end pb-4 border-b border-neutral-900 mb-6">
        <h1 className="text-2xl font-bold tracking-[0.2em] text-white">SYS<span className="text-[#f02020]">.</span>USER</h1>
        <span className="text-[10px] text-[#f02020] uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#f02020] rounded-full animate-pulse" />
          Verified
        </span>
      </div>

      {/* ID Card */}
      <div className="bg-[#050505] border border-neutral-800 p-6 relative mb-6">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#f02020]" />
        
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 border border-neutral-700 flex items-center justify-center bg-black">
            <FiUser size={32} className="text-neutral-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Siddharth Nirmale</h2>
            <p className="text-[#f02020] text-[10px] font-bold uppercase tracking-[0.25em]">Full-Stack Developer</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 text-[10px] uppercase text-neutral-400">
          <div className="flex items-center gap-2"><FiMapPin size={12} /> Indore, India</div>
          <div className="flex items-center gap-2"><FiGlobe size={12} /> B.Tech 2024</div>
        </div>
      </div>

      {/* Compact Description */}
      <div className="flex-1 mb-6">
        <h3 className="text-[10px] font-bold text-[#f02020] uppercase tracking-widest mb-2">Profile.Summary</h3>
        <p className="text-xs text-neutral-400 leading-relaxed">
          Full-Stack Developer specializing in MERN stack and cloud infrastructure. Passionate about building scalable web solutions and integrating AI-driven features. Currently focused on high-performance deployment pipelines and modern web architecture.
        </p>
      </div>

      {/* Socials */}
      <div className="pt-4 border-t border-neutral-900 flex gap-4">
        <SocialLink icon={<FaGithub size={16} />} label="GitHub" href="https://github.com/siddharthNirmale" />
        <SocialLink icon={<FaLinkedin size={16} />} label="LinkedIn" href="https://linkedin.com/in/siddharth-nirmale" />
        <SocialLink icon={<FiMail size={16} />} label="Email" href="mailto:siddharth175nirmale1@gmail.com" />
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
      className="flex items-center gap-2 text-[10px] uppercase text-neutral-500 hover:text-[#f02020] transition-colors"
    >
      {icon} {label}
    </a>
  );
}