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
    { name: 'Next.js', icon: <SiNextdotjs /> }, { name: 'REST', icon: <FiCpu /> }
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
      dragElastic={0.15}
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none" }}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      // Standardized to surface-dark, surface-border, rounded-3xl, and shadow-xl
      className="absolute bottom-5 right-3 w-64 bg-surface-dark border border-surface-border rounded-3xl p-4 cursor-grab flex flex-col gap-3 shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Integrated Header - Matches all other widgets */}
      <div className="flex justify-between items-center px-1 select-none">
        <span className="text-micro font-bold text-neutral-500 uppercase tracking-super-wide font-primary">
          STACK // {skillSets[index].name.toUpperCase()}
        </span>
      </div>

      {/* Fixed height container to prevent layout jumping during animations */}
      <div className="relative h-[84px] w-full mt-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-2 absolute w-full"
          >
            {skillSets[index].items.map((skill) => (
              <div 
                key={skill.name} 
                // Badges now use bg-surface, text-micro, text-neutral-400, and border-accent for hover
                className="flex items-center gap-2.5 bg-surface border border-surface-border px-3 py-2.5 rounded-2xl text-micro text-neutral-400 font-mono uppercase tracking-widest hover:border-accent hover:text-white transition-colors duration-300"
              >
                <span className="text-sm">{skill.icon}</span> 
                <span className="truncate mt-0.5">{skill.name}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}