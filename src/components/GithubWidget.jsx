import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';

export default function GithubWidget() {
  const customTheme = {
    light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  // Intercept the GitHub API data and filter for only the last 3 months (90 days)
  const filterLastThreeMonths = (contributions) => {
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
      initial={{ opacity: 0, scale: 0.9, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      // Added w-fit so the dark background shrinks to exactly fit the 3-month graph
      className="absolute bottom-28 right-8 w-fit p-5 bg-[#0a0a0a]/90 backdrop-blur-xl border border-neutral-800/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-move z-[9998] text-gray-200"
    >
      <div 
        className="on-pan-stop" 
        onPointerDown={(e) => e.stopPropagation()} 
      >
        <GitHubCalendar 
          username="siddharthNirmale" 
          colorScheme="dark"
          theme={customTheme}
          transformData={filterLastThreeMonths} // Pass the filter function here
          blockSize={12}
          blockMargin={4}
          fontSize={12}
        />
      </div>
    </motion.div>
  );
}