import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BaseWidget from './BaseWidget';
import { FiCpu } from 'react-icons/fi';
import { 
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiGooglecloud, 
  SiTailwindcss, SiGit, SiGooglegemini, SiTypescript, SiPython, SiNextdotjs 
} from 'react-icons/si';

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
    <BaseWidget
      constraintsRef={constraintsRef}
      zIndex={zIndex}
      onFocus={onFocus}
      title={`Stack // ${skillSets[index].name}`}
      icon={FiCpu}
      className="w-56  absolute right-3 bottom-5"
    >
      <div className="relative h-[85px] mt-2 ">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 gap-2 absolute w-full"
          >
            {skillSets[index].items.map((skill) => (
              <div 
                key={skill.name} 
                className="flex items-center  gap-2 bg-black/40 border border-neutral-800 p-2 rounded-xl text-[9px] text-neutral-400 uppercase tracking-widest hover:border-[#E51919] hover:text-white transition-colors duration-300"
              >
                {skill.icon} {skill.name}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </BaseWidget>
  );
}