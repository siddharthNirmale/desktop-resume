import { useState, useEffect } from 'react';
// Note: Depending on your package version, you might need `import GitHubCalendar from ...` 
// instead of the destructured import. Adjust if your linter yells at you!
import {GitHubCalendar} from 'react-github-calendar';
import { motion } from 'framer-motion';

export default function GithubWidget({ constraintsRef, zIndex, onFocus }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Keeps the 1s delay to let the calendar fetch and render smoothly
    const timer = setTimeout(() => setIsReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Base 'empty' slot is #1a1a1a to match --color-surface
  // The scale ramps up to your --color-accent (#E51919)
  const customTheme = {
    dark: ['#1a1a1a', '#4A0F0F', '#7A1313', '#B31616', '#E51919'],
  };

  const filterLastSixMonths = (contributions) => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setDate(today.getDate() - 180);
    return contributions.filter((day) => {
      const date = new Date(day.date);
      return date >= sixMonthsAgo && date <= today;
    });
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.15}
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none" }}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      // Swapped for global surface variables, added standard shadow, and standardized 3xl rounding
      className="absolute bottom-3 left-3 w-fit bg-surface-dark border border-surface-border rounded-3xl p-4 cursor-grab flex flex-col gap-3 shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Integrated Header - Now perfectly matches the Clock Widget */}
      <div className="flex justify-between items-center px-1 select-none">
        <span className="text-micro font-bold text-neutral-500 uppercase tracking-super-wide font-primary">
          COMMITS
        </span>
      </div>

      <div 
        className={`transition-opacity duration-300 px-1 pb-1 ${isReady ? 'opacity-100' : 'opacity-0'}`}
        onPointerDown={(e) => e.stopPropagation()} // Prevents dragging when clicking calendar tooltips
      >
        <GitHubCalendar 
          username="siddharthNirmale" 
          colorScheme="dark"
          theme={customTheme}
          transformData={filterLastSixMonths}
          blockSize={10}
          blockMargin={4}
          blockRadius={0} // Forces sharp, square pixels for that retro-tech look!
          fontSize={10}
          hideColorLegend={true}
          hideTotalCount={true} 
          // Replaced hardcoded grey and font with your global CSS variables
          style={{ 
            color: 'var(--color-neutral-400)', 
            fontFamily: 'var(--font-primary), monospace', 
            fontWeight: 500 
          }}
        />
      </div>
    </motion.div>
  );
}