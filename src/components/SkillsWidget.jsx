import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiGooglecloud, 
  SiTailwindcss, SiGit, SiGooglegemini, SiTypescript, SiPython, SiNextdotjs 
} from 'react-icons/si';
import { FiCpu } from 'react-icons/fi';

const skillSets = [
  { name: 'Core', items: [
    { name: 'React.js', icon: <SiReact /> }, { name: 'Node.js', icon: <SiNodedotjs /> },
    { name: 'Express', icon: <SiExpress /> }, { name: 'MongoDB', icon: <SiMongodb /> }
  ]},
  { name: 'Tools', items: [
    { name: 'GCP', icon: <SiGooglecloud /> }, { name: 'Tailwind', icon: <SiTailwindcss /> },
    { name: 'Git', icon: <SiGit /> }, { name: 'Gemini', icon: <SiGooglegemini /> }
  ]},
  { name: 'Advanced', items: [
    { name: 'TypeScript', icon: <SiTypescript /> }, { name: 'Python', icon: <SiPython /> },
    { name: 'Next.js', icon: <SiNextdotjs /> }, { name: 'REST APIs', icon: <FiCpu /> }
  ]}
];

export default function SkillsWidget({ constraintsRef, zIndex, onFocus }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % skillSets.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none" }}
      whileDrag={{ cursor: "grabbing" }}
      className="absolute bottom-8 right-6 w-[280px] bg-[#1C1C1E]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4.5 cursor-grab flex flex-col gap-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] font-primary select-none pointer-events-auto"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
    >
      {/* Widget Header */}
      <div className="flex justify-between items-center px-0.5 select-none">
        <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider flex items-center gap-1.5">
          <span>Stack</span>
          <span className="text-white/10">/</span>
          <span className="text-accent font-semibold capitalize">{skillSets[index].name}</span>
        </span>
        
        {/* Progress Tracker Dots */}
        <div className="flex items-center gap-1.5">
          {skillSets.map((_, i) => (
            <div 
              key={i} 
              className={`w-[4px] h-[4px] rounded-full transition-all duration-300 ${
                i === index ? 'bg-accent scale-110 shadow-[0_0_4px_var(--color-accent)]' : 'bg-white/10'
              }`} 
            />
          ))}
        </div>
      </div>

      {/* Grid Canvas Frame */}
      <div className="relative h-[84px] w-full mt-0.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-2 gap-2 absolute w-full"
            onPointerDown={(e) => e.stopPropagation()}
          >
            {skillSets[index].items.map((skill) => (
              <div 
                key={skill.name} 
                className="group flex items-center gap-2.5 bg-white/[0.03] border border-white/5 px-3 py-2 rounded-xl text-white/70 hover:bg-white/[0.05] hover:border-white/10 hover:text-white transition-all duration-150 cursor-default"
              >
                <span className="text-[14px] text-white/40 group-hover:text-accent transition-colors duration-150 shrink-0">
                  {skill.icon}
                </span> 
                <span className="text-[12px] font-medium tracking-tight truncate mt-0.5">
                  {skill.name}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}