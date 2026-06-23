import { useState, useEffect, useMemo } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';

export default function GithubWidget({
  constraintsRef,
  zIndex,
  onFocus,
}) {
  const [isReady, setIsReady] = useState(false);
  const [accent, setAccent] = useState('#0A84FF'); // Fallback to your default iOS blue

  useEffect(() => {
    const root = document.documentElement;

    const updateAccent = () => {
      const currentAccent = getComputedStyle(root).getPropertyValue('--color-accent').trim() || '#0A84FF';
      setAccent(currentAccent);
    };

    // Initial check
    updateAccent();

    // Watch for inline style changes on the HTML element (triggered by ThemeWidget)
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
    }, 800);

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
        '#1a1a1a', // Base dark grid color
        `rgba(${r}, ${g}, ${b}, 0.25)`,
        `rgba(${r}, ${g}, ${b}, 0.50)`,
        `rgba(${r}, ${g}, ${b}, 0.75)`,
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
      // Integrated global themes, shadow-2xl, and exact rounded-2xl to match other widgets
      className="absolute bottom-3 left-3 w-fit bg-surface-dark border border-surface-border rounded-2xl p-4 cursor-grab shadow-2xl select-none font-primary"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          {/* Accent dot (removed glow, linked to global CSS variable natively) */}
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          
          {/* Themed typography */}
          <span className="text-micro font-medium uppercase tracking-super-wide text-text-secondary">
            CONTRIBUTIONS
          </span>
        </div>
      </div>

      {/* Calendar */}
      <div
        className={`transition-all duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <GitHubCalendar
          username="siddharthNirmale"
          colorScheme="dark"
          theme={customTheme}
          transformData={filterLastSixMonths}
          blockSize={10}
          blockMargin={4}
          blockRadius={2} // Subtly tightened the block radius to look crisper
          fontSize={10}
          hideColorLegend
          hideTotalCount
          style={{
            color: 'var(--color-text-tertiary)',
            fontFamily: 'var(--font-primary)',
          }}
        />
      </div>
    </motion.div>
  );
}