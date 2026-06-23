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
      // Standardized to w-[280px], rounded-2xl, p-5, and shadow-2xl
      className="absolute bottom-5 right-3 w-[280px] bg-surface-dark border border-surface-border rounded-2xl p-5 cursor-grab flex flex-col gap-4 shadow-2xl font-primary"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Clean Header */}
      <div className="flex justify-between items-center px-1 select-none mb-1">
        <span className="text-micro font-medium text-text-secondary uppercase tracking-super-wide flex items-center gap-2">
          <span>STACK</span>
          <span className="text-surface-border">/</span>
          <span className="text-accent">{skillSets[index].name.toUpperCase()}</span>
        </span>
        
        {/* Progress dots indicating the cycling categories */}
        <div className="flex items-center gap-1.5">
          {skillSets.map((_, i) => (
            <div 
              key={i} 
              className={`w-1 h-1 rounded-full transition-colors duration-500 ${
                i === index ? 'bg-accent' : 'bg-surface-border'
              }`} 
            />
          ))}
        </div>
      </div>

      {/* Fixed height container to prevent layout jumping during animations */}
      <div className="relative h-[88px] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 gap-2 absolute w-full"
          >
            {skillSets[index].items.map((skill) => (
              <div 
                key={skill.name} 
                // Nested rounded-xl inside the rounded-2xl container. Tied hover to accent variables.
                className="group flex items-center gap-2.5 bg-surface border border-surface-border px-3 py-2.5 rounded-xl text-text-tertiary hover:border-accent hover:text-text transition-colors duration-300 cursor-default"
              >
                <span className="text-sm text-text-secondary group-hover:text-accent transition-colors duration-300">
                  {skill.icon}
                </span> 
                <span className="text-[10px] font-mono uppercase tracking-wider truncate mt-0.5">
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