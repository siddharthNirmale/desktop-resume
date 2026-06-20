import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { useState, useEffect } from 'react';

export default function GithubWidget() {
  const [isReady, setIsReady] = useState(false);

  // Force-show the widget after 1 second to ensure it doesn't stay invisible
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const customTheme = {
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isReady ? 1 : 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute bottom-28 right-8 w-fit p-5 bg-[#0a0a0a]/90 backdrop-blur-xl border border-neutral-800/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-move z-[9998] text-gray-200"
    >
      <div className="on-pan-stop" onPointerDown={(e) => e.stopPropagation()}>
        <GitHubCalendar 
          username="siddharthNirmale" 
          colorScheme="dark"
          theme={customTheme}
          transformData={filterLastSixMonths}
          blockSize={12}
          blockMargin={4}
          fontSize={12}
        />
      </div>
    </motion.div>
  );
}