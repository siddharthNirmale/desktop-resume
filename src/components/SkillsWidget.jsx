import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiGooglecloud,
  SiTailwindcss, SiGit, SiGooglegemini, SiTypescript, SiPython, SiNextdotjs
} from 'react-icons/si';
import { FiCpu } from 'react-icons/fi';

// Defined outside render cycle to preserve memory
const skillSets = [
  {
    name: 'Core', items: [
      { name: 'React.js', icon: <SiReact /> }, { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'Express', icon: <SiExpress /> }, { name: 'MongoDB', icon: <SiMongodb /> }
    ]
  },
  {
    name: 'Tools', items: [
      { name: 'GCP', icon: <SiGooglecloud /> }, { name: 'Tailwind', icon: <SiTailwindcss /> },
      { name: 'Git', icon: <SiGit /> }, { name: 'Gemini', icon: <SiGooglegemini /> }
    ]
  },
  {
    name: 'Advanced', items: [
      { name: 'TypeScript', icon: <SiTypescript /> }, { name: 'Python', icon: <SiPython /> },
      { name: 'Next.js', icon: <SiNextdotjs /> }, { name: 'REST APIs', icon: <FiCpu /> }
    ]
  }
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
      style={{ zIndex, touchAction: "none", willChange: "transform, opacity" }}
      whileDrag={{ cursor: "grabbing", scale: 1.015 }}
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 8 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      className="
        custom-widget absolute bottom-8 right-6 w-[280px]
        bg-[var(--color-surface)]/80 backdrop-blur-2xl
        border border-[var(--color-surface-border)] rounded-[var(--radius-window)]
        p-4.5 cursor-grab flex flex-col gap-3.5 font-primary
        select-none pointer-events-auto popover-shadow
      "
    >
      {/* Widget Header */}
      <div className="flex justify-between items-center px-0.5 select-none">
        <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider flex items-center gap-1.5">
          <span>Stack</span>
          <span className="text-[var(--color-surface-border)]">/</span>
          <span className="text-[var(--color-accent)] font-semibold capitalize">{skillSets[index].name}</span>
        </span>

        {/* Progress Tracker Dots */}
        <div className="flex items-center gap-1.5">
          {skillSets.map((_, i) => (
            <div
              key={i}
              className={`w-[4px] h-[4px] rounded-full transition-all duration-300 ${i === index ? 'bg-[var(--color-accent)] scale-110' : 'bg-[var(--color-surface-border)]'
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
                className="
                  group flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-default
                  bg-[var(--color-surface-inactive)] border border-transparent
                  text-[var(--color-text-secondary)] transition-all duration-150
                  hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]
                "
              >
                <span className="text-[14px] text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors duration-150 shrink-0">
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
