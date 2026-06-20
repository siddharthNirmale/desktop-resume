import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { useState, useEffect } from 'react';

export default function GithubWidget({ constraintsRef, zIndex, onFocus }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

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
      onPointerDown={onFocus}
      style={{ zIndex }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isReady ? 1 : 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-3 left-3 w-fit p-4 bg-[#1a1a1a] border border-neutral-800 rounded-3xl cursor-move"
    >
      <div className="mb-4 flex justify-between items-center px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Contributions</span>
        <div className="w-2 h-2 rounded-full bg-[#E51919]" /> 
      </div>
      <div className="on-pan-stop" onPointerDown={(e) => e.stopPropagation()}>
        <GitHubCalendar 
          username="siddharthNirmale" 
          colorScheme="dark"
          theme={customTheme}
          transformData={filterLastSixMonths}
          blockSize={10}
          blockMargin={4}
          fontSize={10}
          hideColorLegend={true}
          hideTotalCount={true} 
          style={{ color: '#737373' }}
        />
      </div>
    </motion.div>
  );
}