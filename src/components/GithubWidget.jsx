import { useState, useEffect, useMemo } from 'react';
import * as GitHubCalendarNamespace from 'react-github-calendar'; // Star import to completely bypass Vite default-export mismatch
import { motion } from 'framer-motion';

// Pull the underlying component out of the star namespace wrapper safely
const GitHubCalendar = GitHubCalendarNamespace.default || GitHubCalendarNamespace.GitHubCalendar;

export default function GithubWidget({
  constraintsRef,
  zIndex,
  onFocus,
}) {
  const [isReady, setIsReady] = useState(false);
  const [accent, setAccent] = useState('#0A84FF');

  useEffect(() => {
    const root = document.documentElement;

    const updateAccent = () => {
      const currentAccent = getComputedStyle(root).getPropertyValue('--color-accent').trim() || '#0A84FF';
      setAccent(currentAccent);
    };

    updateAccent();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          updateAccent();
        }
      });
    });

    observer.observe(root, { attributes: true, attributeFilter: ['style'] });

    const timer = setTimeout(() => {
      setIsReady(true);
    }, 600);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const customTheme = useMemo(() => {
    const hexToRgb = (hex) => {
      const clean = hex.replace('#', '');
      return {
        r: parseInt(clean.substring(0, 2), 16),
        g: parseInt(clean.substring(2, 4), 16),
        b: parseInt(clean.substring(4, 6), 16),
      };
    };

    const { r, g, b } = hexToRgb(accent);

    return {
      dark: [
        'rgba(255, 255, 255, 0.04)', 
        `rgba(${r}, ${g}, ${b}, 0.25)`,
        `rgba(${r}, ${g}, ${b}, 0.50)`,
        `rgba(${r}, ${g}, ${b}, 0.75)`,
        accent,
      ],
    };
  }, [accent]);

  const filterLastFiveMonths = (contributions) => {
    const today = new Date();
    const startWindow = new Date();
    startWindow.setDate(today.getDate() - 150);

    return contributions.filter((day) => {
      const date = new Date(day.date);
      return date >= startWindow && date <= today;
    });
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      onPointerDown={onFocus}
      style={{
        zIndex,
        touchAction: 'none',
      }}
      whileDrag={{
        cursor: 'grabbing',
      }}
      initial={{
        opacity: 0,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 360,
        damping: 28,
      }}
      // Locked to exactly w-[280px] and p-5 to match the Theme, Weather, and Clock widgets
      className="absolute bottom-3 left-3 w-[280px] bg-surface-dark border border-surface-border rounded-2xl p-5 cursor-grab shadow-2xl select-none font-primary"
    >
      <div className="flex items-center justify-between mb-3.5 px-0.5">
        <span className="text-[11px] font-medium uppercase tracking-wider text-white/40">
          Contributions
        </span>
        {isReady && (
          <span className="text-[11px] font-medium text-white/30 font-mono tracking-wide">
            siddharthNirmale
          </span>
        )}
      </div>

      <div
        className={`flex justify-center transition-all duration-300 ${isReady ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {GitHubCalendar && (
          <GitHubCalendar
            username="siddharthNirmale"
            colorScheme="dark"
            theme={customTheme}
            transformData={filterLastFiveMonths}
            blockSize={7.5} 
            blockMargin={2}
            blockRadius={1.5}
            fontSize={11}
            hideColorLegend
            hideTotalCount
            style={{
              color: 'rgba(255, 255, 255, 0.3)',
              fontFamily: 'var(--font-primary)',
            }}
          />
        )}
      </div>
    </motion.div>
  );
}