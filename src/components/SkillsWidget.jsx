import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiGooglecloud,
  SiTailwindcss, SiGit, SiGooglegemini, SiTypescript, SiPython, SiNextdotjs
} from 'react-icons/si';
import { FiCpu } from 'react-icons/fi';
import WidgetCover from './WidgetCover';

// Defined outside render cycle to avoid re-allocation on each render
const SKILL_SETS = [
  {
    name: 'Core',
    items: [
      { name: 'React.js', icon: <SiReact /> },
      { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'Express', icon: <SiExpress /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
    ],
  },
  {
    name: 'Tooling',
    items: [
      { name: 'GCP', icon: <SiGooglecloud /> },
      { name: 'Tailwind', icon: <SiTailwindcss /> },
      { name: 'Git', icon: <SiGit /> },
      { name: 'Gemini AI', icon: <SiGooglegemini /> },
    ],
  },
  {
    name: 'Advanced',
    items: [
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Python', icon: <SiPython /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'REST APIs', icon: <FiCpu /> },
    ],
  },
];

export default function SkillsWidget({ constraintsRef, zIndex, onFocus, onClose, positionStyle }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % SKILL_SETS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const current = SKILL_SETS[index];

  return (
    <WidgetCover
      id="skills"
      title={`Stack · ${current.name}`}
      zIndex={zIndex}
      onClose={onClose}
      onFocus={onFocus}
      constraintsRef={constraintsRef}
      positionStyle={positionStyle || { top: "386px", right: "18px" }}
    >
      {/* Pagination Dots */}
      <div className="flex items-center gap-1.5 mb-3.5">
        {SKILL_SETS.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === index
                ? 'w-[14px] h-[4px] bg-[var(--color-accent)]'
                : 'w-[4px] h-[4px] bg-[var(--color-surface-border)]'
            }`}
          />
        ))}
      </div>

      {/* Skill Grid */}
      <div className="relative h-[84px] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.16 }}
            className="grid grid-cols-2 gap-1.5 absolute w-full"
            onPointerDown={(e) => e.stopPropagation()}
          >
            {current.items.map((skill) => (
              <div
                key={skill.name}
                className="
                  group flex items-center gap-2.5 px-3 py-2 rounded-[12px] cursor-default
                  bg-[var(--color-surface-hover)]/30
                  hover:bg-[var(--color-surface-hover)]/70
                  transition-all duration-150
                "
              >
                <span className="text-[13px] text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors duration-150 shrink-0">
                  {skill.icon}
                </span>
                <span className="text-[11px] font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] truncate transition-colors duration-150">
                  {skill.name}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </WidgetCover>
  );
}
