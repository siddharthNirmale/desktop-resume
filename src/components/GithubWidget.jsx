import { useState, useEffect, useMemo } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';

export default function GithubWidget({
  constraintsRef,
  zIndex,
  onFocus,
}) {
  const [isReady, setIsReady] = useState(false);
  const [accent, setAccent] = useState('#5E5CE6');

  useEffect(() => {
    const updateAccent = () => {
      const root = getComputedStyle(document.documentElement);

      const currentAccent =
        root.getPropertyValue('--color-accent').trim() ||
        '#2dcf18';

      setAccent(currentAccent);
    };

    updateAccent();

    const timer = setTimeout(() => {
      setIsReady(true);
    }, 800);

    window.addEventListener('accent-change', updateAccent);

    return () => {
      clearTimeout(timer);
      window.removeEventListener(
        'accent-change',
        updateAccent
      );
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
        '#1a1a1a',
        `rgba(${r}, ${g}, ${b}, 0.15)`,
        `rgba(${r}, ${g}, ${b}, 0.35)`,
        `rgba(${r}, ${g}, ${b}, 0.65)`,
        accent,
      ],
    };
  }, [accent]);

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
      style={{
        zIndex,
        touchAction: 'none',
      }}
      whileDrag={{
        scale: 1.02,
        cursor: 'grabbing',
      }}
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      className="
        absolute
        bottom-3
        left-3
        w-fit
        bg-[var(--color-surface-dark)]
        border
        border-[var(--color-surface-border)]
        rounded-3xl
        p-4
        cursor-grab
        shadow-xl
        select-none
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: accent,
              boxShadow: `0 0 10px ${accent}`,
            }}
          />
          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.2em]
              font-semibold
              text-white/60
            "
          >
            Contributions
          </span>
        </div>
      </div>

      {/* Calendar */}
      <div
        className={`
          transition-all
          duration-500
          ${isReady ? 'opacity-100' : 'opacity-0'}
        `}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <GitHubCalendar
          username="siddharthNirmale"
          colorScheme="dark"
          theme={customTheme}
          transformData={filterLastSixMonths}
          blockSize={10}
          blockMargin={4}
          blockRadius={3}
          fontSize={10}
          hideColorLegend
          hideTotalCount
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontFamily: 'var(--font-primary)',
          }}
        />
      </div>
    </motion.div>
  );
}