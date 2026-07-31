import { useState, useEffect, useMemo } from 'react';
import * as GitHubCalendarNamespace from 'react-github-calendar';
import { motion } from 'framer-motion';

const GitHubCalendar = GitHubCalendarNamespace.default || GitHubCalendarNamespace.GitHubCalendar;

export default function GithubWidget({
  constraintsRef,
  zIndex,
  onFocus,
}) {
  const [isReady, setIsReady] = useState(false);
  const [accent, setAccent] = useState('#0066ff'); // Defaulting to your electric blue
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    const updateThemeState = () => {
      const currentAccent = getComputedStyle(root).getPropertyValue('--color-accent').trim() || '#0066ff';
      setAccent(currentAccent);
      setIsLightMode(body.classList.contains('light-theme'));
    };

    updateThemeState();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          updateThemeState();
        }
      });
    });

    observer.observe(root, { attributes: true, attributeFilter: ['style'] });
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });

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
      // Dark mode palette (Deep recessed squares)
      dark: [
        '#252830', // Chunkier empty state matching the dark mode bezel
        `rgba(${r}, ${g}, ${b}, 0.35)`,
        `rgba(${r}, ${g}, ${b}, 0.60)`,
        `rgba(${r}, ${g}, ${b}, 0.85)`,
        accent,
      ],
      // Light mode palette (Light recessed squares)
      light: [
        '#d9e2ec', // Chunkier empty state matching the light mode bezel
        `rgba(${r}, ${g}, ${b}, 0.35)`,
        `rgba(${r}, ${g}, ${b}, 0.60)`,
        `rgba(${r}, ${g}, ${b}, 0.85)`,
        accent,
      ]
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
      style={{ zIndex, touchAction: 'none' }}
      whileDrag={{ cursor: 'grabbing', scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.8 }}
      className="custom-widget absolute bottom-5 left-5 w-[310px] p-5 cursor-grab flex flex-col select-none pointer-events-auto
                 bg-[#eef2f5] dark:bg-[#1a1c23]
                 rounded-[28px]
                 border-t-[3px] border-t-white/80 dark:border-t-white/10
                 border-b-[8px] border-b-[#cdd4db] dark:border-b-[#0d0e12]
                 border-x-[4px] border-x-[#e2e8f0] dark:border-x-[#15171d]
                 shadow-[0_25px_50px_rgba(0,10,40,0.25)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.8)]
                 font-primary transition-colors duration-250"
    >
      {/* Decorative Top Pill (Industrial design detail) */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-[#cdd4db] dark:bg-[#0d0e12] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]" />

      {/* Header Section */}
      <div className="flex items-center justify-between mb-3 mt-1 px-1">
        <span className="text-[13px] font-black text-[#0066ff] dark:text-[#6699ff] uppercase tracking-widest drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
          Activity
        </span>
        {isReady && (
          <div className="px-2.5 py-1 bg-[#ff6b1a] rounded-lg shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),_0_2px_4px_rgba(255,107,26,0.3)]">
            <span className="text-[10px] font-black text-white font-mono tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
              @siddharth
            </span>
          </div>
        )}
      </div>

      {/* Recessed Screen Area for Calendar */}
      <div
        className={`flex justify-center p-3.5
                    bg-[#f8fafc] dark:bg-[#111317]
                    rounded-[20px]
                    border-t-[3px] border-t-[#cdd4db] dark:border-t-[#000]
                    border-b-[2px] border-b-white dark:border-b-[#2c3039]
                    border-x-[2px] border-x-[#e2e8f0] dark:border-x-[#15171d]
                    shadow-[inset_0_6px_12px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_8px_16px_rgba(0,0,0,0.6)]
                    transition-all duration-300 ${isReady ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {GitHubCalendar && (
          <div className="drop-shadow-sm">
            <GitHubCalendar
              username="siddharthNirmale"
              colorScheme={isLightMode ? "light" : "dark"}
              theme={customTheme}
              transformData={filterLastFiveMonths}
              blockSize={9}          // Slightly chunkier blocks
              blockMargin={3}        // More space between blocks for that grid look
              blockRadius={3}        // Toy-like rounded pegs
              fontSize={11}
              hideColorLegend
              hideTotalCount
              style={{
                color: isLightMode ? '#64748b' : '#94a3b8',
                fontFamily: 'var(--font-primary)',
                fontWeight: 'bold'
              }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
