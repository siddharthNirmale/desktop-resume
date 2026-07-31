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
  const [accent, setAccent] = useState('#0A84FF');
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    const updateThemeState = () => {
      // 1. Get the current accent color
      const currentAccent = getComputedStyle(root).getPropertyValue('--color-accent').trim() || '#0A84FF';
      setAccent(currentAccent);

      // 2. Check if body has the light theme class active
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

    // Observe root for style changes (accent) and body for class changes (light/dark toggle)
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
      // Standard dark mode palette (white empty squares)
      dark: [
        'rgba(255, 255, 255, 0.04)',
        `rgba(${r}, ${g}, ${b}, 0.25)`,
        `rgba(${r}, ${g}, ${b}, 0.50)`,
        `rgba(${r}, ${g}, ${b}, 0.75)`,
        accent,
      ],
      // Light mode palette (dark empty squares for contrast)
      light: [
        'rgba(0, 0, 0, 0.04)',
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
      // Added custom-widget and transition-colors
      className="custom-widget absolute bottom-5 left-5 w-[280px] bg-[#1C1C1E]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4.5 cursor-grab shadow-[0_20px_40px_rgba(0,0,0,0.5)] select-none font-primary pointer-events-auto transition-colors duration-250"
    >
      <div className="flex items-center justify-between mb-3.5 px-0.5">
        <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-text-tertiary)] transition-colors duration-250">
          Contributions
        </span>
        {isReady && (
          <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] font-mono tracking-wide transition-colors duration-250">
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
            // Dynamically flip the package's internal color scheme
            colorScheme={isLightMode ? "light" : "dark"}
            theme={customTheme}
            transformData={filterLastFiveMonths}
            blockSize={7.5}
            blockMargin={2}
            blockRadius={1.5}
            fontSize={11}
            hideColorLegend
            hideTotalCount
            style={{
              // Passed our CSS variable directly to the inline style for text!
              color: 'var(--color-text-tertiary)',
              fontFamily: 'var(--font-primary)',
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
