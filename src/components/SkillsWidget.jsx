import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiGooglecloud,
  SiTailwindcss, SiGit, SiGooglegemini, SiTypescript, SiPython, SiNextdotjs
} from 'react-icons/si';
import { FiCpu } from 'react-icons/fi';

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
      style={{ zIndex, touchAction: "none" }}
      whileDrag={{ cursor: "grabbing", scale: 1.02 }}
      className="custom-widget absolute bottom-8 right-6 w-[310px] p-5 cursor-grab flex flex-col select-none pointer-events-auto
                 bg-[#eef2f5] dark:bg-[#1a1c23]
                 rounded-[28px]
                 border-t-[3px] border-t-white/80 dark:border-t-white/10
                 border-b-[8px] border-b-[#cdd4db] dark:border-b-[#0d0e12]
                 border-x-[4px] border-x-[#e2e8f0] dark:border-x-[#15171d]
                 shadow-[0_25px_50px_rgba(0,10,40,0.25)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.8)]
                 font-primary transition-colors duration-250 min-h-[190px]"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
    >
      {/* Decorative Top Pill (Industrial design detail) */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-[#cdd4db] dark:bg-[#0d0e12] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]" />

      {/* Widget Header */}
      <div className="flex justify-between items-center px-1 mt-1 mb-3">
        <span className="text-[13px] font-black uppercase tracking-widest drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none flex items-center gap-2">
          <span className="text-[#0066ff] dark:text-[#6699ff]">Stack</span>
          <span className="text-[#aeb6c1] dark:text-[#424859]">/</span>
          <span className="text-[#ff6b1a]">{skillSets[index].name}</span>
        </span>

        {/* Recessed LED Progress Tracker */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#d5dde5] dark:bg-[#111317] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)]">
          {skillSets.map((_, i) => (
            <div
              key={i}
              className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${i === index
                  ? 'bg-[#00e5ff] shadow-[0_0_6px_#00e5ff] scale-125'
                  : 'bg-[#aeb6c1] dark:bg-[#2c3039]'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Recessed Digital Screen Area */}
      <div className="relative flex-1 p-3.5 mt-1
                      bg-[#f8fafc] dark:bg-[#111317]
                      rounded-[20px]
                      border-t-[3px] border-t-[#cdd4db] dark:border-t-[#000]
                      border-b-[2px] border-b-white dark:border-b-[#2c3039]
                      border-x-[2px] border-x-[#e2e8f0] dark:border-x-[#15171d]
                      shadow-[inset_0_6px_12px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_8px_16px_rgba(0,0,0,0.6)]">

        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.1] dark:opacity-[0.05] rounded-[20px]"
          style={{ backgroundImage: 'radial-gradient(#0066ff 1px, transparent 1px)', backgroundSize: '10px 10px' }}
        />

        {/* Grid Canvas Frame */}
        <div className="relative h-[104px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 gap-2.5 absolute w-full z-10"
              onPointerDown={(e) => e.stopPropagation()}
            >
              {skillSets[index].items.map((skill) => (
                <div
                  key={skill.name}
                  className="group flex items-center gap-2.5 px-3 py-2.5
                             bg-[#eef2f5] dark:bg-[#252830]
                             rounded-[14px]
                             border-b-[4px] border-[#cdd4db] dark:border-[#0d0e12]
                             hover:translate-y-[-2px] hover:border-b-[6px]
                             active:translate-y-[2px] active:border-b-[2px]
                             shadow-[0_4px_6px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_6px_rgba(0,0,0,0.4)]
                             transition-all duration-150 cursor-default"
                >
                  <span className="text-[16px] text-[#0066ff] dark:text-[#6699ff] group-hover:text-[#ff6b1a] group-hover:scale-110 transition-all duration-200 shrink-0 drop-shadow-sm">
                    {skill.icon}
                  </span>
                  <span className="text-[12px] font-bold tracking-wide text-[#8899aa] dark:text-[#8b9bb4] group-hover:text-[#0066ff] dark:group-hover:text-white truncate mt-0.5 transition-colors duration-200">
                    {skill.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
