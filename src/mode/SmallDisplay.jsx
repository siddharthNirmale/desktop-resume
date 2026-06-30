import React from "react";
import { FiMail, FiMapPin, FiClock, FiExternalLink } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
} from "react-icons/si";

export default function PortfolioClone() {
  return (
    /* Outermost container: Fixed height + overflow-auto makes it scrollable anywhere */
    <div className="h-screen w-full bg-[#0a0a0a] text-zinc-400 font-sans overflow-y-auto custom-scrollbar selection:bg-zinc-800">
      
      {/* Centered inner wrapper acting like a mobile/tablet view */ }
      <div className="max-w-2xl mx-auto px-5 py-12 space-y-12">
        
        {/* --- 1. PROFILE HEADER --- */}
        <section className="flex flex-col gap-6">
          <div className="flex gap-4 items-start">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0 flex items-center justify-center">
              <span className="text-3xl">👨‍💻</span>
            </div>
            
            {/* Name & Status */}
            <div className="space-y-2 pt-1">
              <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                Manish Kumar <span className="text-red-500 text-lg">🚀</span>
              </h1>
              <div className="text-xs text-zinc-500">@manixh92</div>
              
              <div className="flex items-center gap-3 text-[11px]">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Building ossium.live <FiExternalLink size={10} />
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-zinc-500 font-medium">
                <span className="flex items-center gap-1"><FiMapPin size={10} /> India</span>
                <span className="flex items-center gap-1"><FiClock size={10} /> 11:30:16 PM</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-[13px] leading-relaxed text-zinc-400">
            Yup! I'm a <span className="text-zinc-200 font-semibold">Full Stack Developer</span>. Big deal, right? But wait... there's more! I'm not just any developer, I love building solutions and solving problems. I enjoy crafting websites with <SiReact className="inline text-[#61DAFB] mb-0.5" /> <span className="text-zinc-300">React</span>, <SiTypescript className="inline text-[#3178C6] mb-0.5" /> <span className="text-zinc-300">TypeScript</span>, <SiExpress className="inline text-zinc-300 mb-0.5" /> <span className="text-zinc-300">Express</span> using <SiMongodb className="inline text-[#47A248] mb-0.5" /> <span className="text-zinc-300">MongoDB</span>, databases and I live on the <span className="bg-zinc-800 px-1 rounded text-zinc-200 font-mono text-xs py-0.5">$_ terminal</span> mostly.
          </p>

          {/* Action Links */}
          <div className="flex gap-2">
            <ActionBtn icon={<FaTwitter />} text="Twitter DM" />
            <ActionBtn icon={<FiMail />} text="Email Me" />
            <ActionBtn icon={<FaGithub />} />
            <ActionBtn icon={<FaLinkedin />} />
          </div>
        </section>

        {/* --- 2. SKILLS --- */}
        <section className="space-y-5">
          <SectionHeader title="My Skills" />
          <div className="flex flex-wrap gap-2 text-[12px]">
            <SkillBadge icon={<SiTailwindcss className="text-[#38B2AC]" />} name="CSS" />
            <SkillBadge icon={<SiJavascript className="text-[#F7DF1E]" />} name="JavaScript" />
            <SkillBadge icon={<SiTypescript className="text-[#3178C6]" />} name="TypeScript" />
            <SkillBadge icon={<SiReact className="text-[#61DAFB]" />} name="React" />
            <SkillBadge icon={<SiNodedotjs className="text-[#339933]" />} name="NodeJS" />
            <SkillBadge icon={<SiExpress className="text-white" />} name="Express" />
            <SkillBadge name="Render" />
            <SkillBadge name="Notion" />
            <SkillBadge icon={<FaGithub className="text-white" />} name="GitHub" />
            <SkillBadge name="Postman" />
            <SkillBadge name="Swagger" />
          </div>
        </section>

        {/* --- 3. WORK EXPERIENCE --- */}
        <section className="space-y-5">
          <SectionHeader title="Work Experience" />
          <div className="border border-zinc-800/80 rounded-xl p-4 bg-[#0a0a0a]">
            {/* Timeline Items */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:w-[1px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:bg-zinc-800">
              
              <div className="relative flex items-center justify-between z-10 pl-8">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500 ml-[7px] ring-4 ring-[#0a0a0a]" />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-white text-xs">M</div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                      mx corp. <span className="text-[9px] text-emerald-500 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded">● ACTIVE</span>
                    </h4>
                    <p className="text-[11px] text-zinc-500">Developer</p>
                  </div>
                </div>
                <div className="text-[10px] text-zinc-500 font-mono">Dec 2023 - Now</div>
              </div>

              <div className="relative flex items-center justify-between z-10 pl-8">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-500 ml-[7px] ring-4 ring-[#0a0a0a]" />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-white text-xs">J</div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                      JokerGaming <span className="text-[9px] text-red-500 font-mono bg-red-500/10 px-1.5 py-0.5 rounded">● DONE</span>
                    </h4>
                    <p className="text-[11px] text-zinc-500">Full Stack Dev Intern</p>
                  </div>
                </div>
                <div className="text-[10px] text-zinc-500 font-mono">May 2023 - Sep 2023</div>
              </div>
            </div>

            {/* Mock GitHub Graph */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80">
              <div className="flex justify-between text-[10px] text-zinc-500 mb-2">
                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(8px,1fr))] gap-1 h-20 overflow-hidden opacity-80">
                {/* Generating random blocks to mimic the commit graph */}
                {Array.from({ length: 180 }).map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-[1px] ${Math.random() > 0.7 ? 'bg-zinc-300' : Math.random() > 0.4 ? 'bg-zinc-700' : 'bg-zinc-900'}`}></div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-3 text-[10px] text-zinc-500">
                <span>This year, I achieved 2295 contributions</span>
                <div className="flex items-center gap-1">
                  <span>Less</span>
                  <div className="flex gap-0.5">
                    <span className="w-2 h-2 rounded-[1px] bg-zinc-900"></span>
                    <span className="w-2 h-2 rounded-[1px] bg-zinc-700"></span>
                    <span className="w-2 h-2 rounded-[1px] bg-zinc-500"></span>
                    <span className="w-2 h-2 rounded-[1px] bg-zinc-300"></span>
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. PROJECTS --- */}
        <section className="space-y-5">
          <SectionHeader title="My Projects" />
          <div className="space-y-6">
            
            {/* Project Card 1 */}
            <ProjectCard 
              title="Ossium"
              isLive={true}
              description="Search for OSS projects with unmatched speed and precision. Eliminate noise to find the best open-source solutions. Manage your PRs/issues in one place."
              tech={["TypeScript", "Nextjs", "PostgreSQL", "Drizzle", "Tailwind", "GitHub APIs"]}
              imagePlaceholder="Find Top Open-Source projects in minutes"
            />

            {/* Project Card 2 */}
            <ProjectCard 
              title="Mx Icons"
              isLive={true}
              downloads="1.2k+ downloads"
              description="Open source | Beautiful Icons For React project. A modern, lightweight React icon library with beautiful SVG icons. Built with React - Optimized for Production."
              tech={["JavaScript", "React", "Svg", "Rollup.js", "Vite", "NPM"]}
              imagePlaceholder="Mx Icons"
            />

            {/* Project Card 3 */}
            <ProjectCard 
              title="Securv2FA"
              isLive={false}
              description="A robust two-factor authentication system implementing Time-based One-Time Password (TOTP) for enhanced application security."
              tech={["JavaScript", "React", "Nodejs", "MongoDB", "Java", "SpringBoot", "Spring Security"]}
              imagePlaceholder="2FA Authenticator to SECURE your account!"
            />
            
            <div className="flex justify-end">
              <button className="text-[12px] text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                More Projects →
              </button>
            </div>
          </div>
        </section>

        {/* --- 5. THOUGHTS / BLOGS --- */}
        <section className="space-y-5">
          <SectionHeader title="Thoughts in words" />
          <div className="border border-zinc-800/80 rounded-xl p-5 bg-[#0a0a0a] text-sm text-zinc-400">
            You really wanna read my blogs? Head over to <a href="#" className="text-zinc-300 underline decoration-zinc-600 underline-offset-2">My Blogs</a> page.
          </div>
        </section>

        {/* --- 6. FOOTER --- */}
        <section className="pt-8 pb-12 border-t border-zinc-800/50">
          <div className="border border-zinc-800/80 rounded-xl p-8 bg-[#0a0a0a] flex flex-col items-center justify-center text-center space-y-4">
            <h3 className="text-lg font-bold text-zinc-200">Let's Connect</h3>
            <p className="text-[12px] text-zinc-500">Feel free to reach out through any of these platforms!</p>
            <div className="flex gap-2 flex-wrap justify-center pt-2">
              <ActionBtn icon={<FaTwitter />} text="Twitter" />
              <ActionBtn icon={<FaGithub />} text="GitHub" />
              <ActionBtn icon={<FiMail />} text="Resume" />
              <ActionBtn icon={<FaLinkedin />} text="LinkedIn" />
            </div>
          </div>
          
          <div className="mt-12 text-center space-y-2">
            <p className="text-[11px] text-zinc-500 italic">"Nothing is Perfect — But You Can Make it Better."</p>
            <p className="text-[11px] text-zinc-400 font-semibold">Designed & Made with ❤️</p>
            <div className="flex justify-between items-center text-[10px] text-zinc-600 pt-8">
              <span>2024. All rights reserved</span>
              <span className="font-mono">Views: #13792</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

/* ---------------- MICRO-COMPONENTS ---------------- */

// The exact dashed border title style from the screenshot
function SectionHeader({ title }) {
  return (
    <div className="inline-block border border-dashed border-zinc-700 px-3 py-1.5 rounded bg-zinc-900/30">
      <h2 className="font-mono text-[12px] text-zinc-400 tracking-wide">
        [ {title} ]
      </h2>
    </div>
  );
}

// Top profile buttons
function ActionBtn({ icon, text }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded text-[11px] font-medium transition-colors">
      {icon} {text && <span>{text}</span>}
    </button>
  );
}

// Skills pills
function SkillBadge({ icon, name }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 bg-[#0a0a0a] border border-zinc-800 rounded-md text-zinc-300 font-medium hover:bg-zinc-900 transition-colors cursor-default">
      {icon && <span className="text-sm">{icon}</span>}
      {name}
    </div>
  );
}

// Project Card Template
function ProjectCard({ title, isLive, downloads, description, tech, imagePlaceholder }) {
  return (
    <div className="border border-zinc-800/80 rounded-xl overflow-hidden bg-[#0a0a0a] flex flex-col md:flex-row">
      {/* Fake Image Container */}
      <div className="md:w-[40%] bg-zinc-900/50 p-4 border-b md:border-b-0 md:border-r border-zinc-800/80 flex items-center justify-center relative overflow-hidden min-h-[160px]">
        {downloads && (
           <div className="absolute top-2 left-2 bg-zinc-800 text-zinc-300 text-[9px] px-2 py-1 rounded font-mono z-10 border border-zinc-700">
             {downloads}
           </div>
        )}
        <div className="text-center">
          <p className="text-sm font-bold text-white/80 w-3/4 mx-auto">{imagePlaceholder}</p>
          <div className="w-16 h-1 bg-emerald-500/50 mx-auto mt-4 rounded-full blur-sm"></div>
        </div>
        {/* Subtle gradient overlay to mimic the image lighting */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-5 md:w-[60%] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-zinc-100 font-bold flex items-center gap-2">
              {title} {isLive && <span className="text-emerald-500 text-sm">△</span>}
              {!isLive && <span className="text-amber-500 text-sm">🛡️</span>}
            </h3>
            <div className="flex gap-2">
              {isLive && (
                <button className="flex items-center gap-1 text-[10px] px-2 py-1 border border-zinc-800 bg-zinc-900 rounded text-zinc-300 hover:text-white transition-colors">
                  <FiExternalLink /> Live
                </button>
              )}
              <button className="flex items-center gap-1 text-[10px] px-2 py-1 border border-zinc-800 bg-zinc-900 rounded text-zinc-300 hover:text-white transition-colors">
                <FaGithub /> GitHub
              </button>
            </div>
          </div>
          <p className="text-[12px] text-zinc-400 leading-relaxed mb-4">
            {description}
          </p>
        </div>
        
        <div>
          <p className="text-[10px] font-semibold text-zinc-300 mb-2">Technologies Used:</p>
          <div className="flex flex-wrap gap-1.5">
            {tech.map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-400">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}