import { useState, useEffect, useMemo } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';

// ============================================================
// HELPER FUNCTIONS (Extracted from render cycle)
// ============================================================
const hexToRgb = (hex) => {
  if (!hex || typeof hex !== 'string') return { r: 10, g: 132, b: 255 };
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  if (clean.length !== 6) return { r: 10, g: 132, b: 255 };
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return {
    r: Number.isNaN(r) ? 10 : r,
    g: Number.isNaN(g) ? 132 : g,
    b: Number.isNaN(b) ? 255 : b,
  };
};

const filterLastFiveMonths = (contributions) => {
  const today = new Date();
  const startWindow = new Date();
  startWindow.setDate(today.getDate() - 150);

  return contributions.filter((day) => {
    const date = new Date(day.date);
    return date >= startWindow && date <= today;
  });
};

// ============================================================
// GITHUB WIDGET
// ============================================================
export default function GithubWidget({ constraintsRef, zIndex, onFocus }) {
  const [isReady, setIsReady] = useState(false);
  const [accent, setAccent] = useState('#0A84FF');
  const [isLightMode, setIsLightMode] = useState(false);

  // Sync React state with Vanilla DOM mutations (Theme & Accent)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const body = document.body;

    const updateThemeState = () => {
      const currentAccent = getComputedStyle(root).getPropertyValue('--color-accent').trim() || '#0A84FF';
      setAccent(currentAccent);
      setIsLightMode(body.classList.contains('light-theme'));
    };

    // Initial sync
    updateThemeState();

    // Listen for DOM changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          updateThemeState();
        }
      }
    });

    observer.observe(root, { attributes: true, attributeFilter: ['style'] });
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });

    // Delay showing the widget slightly for smoother entry
    const timer = setTimeout(() => setIsReady(true), 600);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const customTheme = useMemo(() => {
    const { r, g, b } = hexToRgb(accent);

    return {
      dark: [
        'rgba(255, 255, 255, 0.04)',
        `rgba(${r}, ${g}, ${b}, 0.25)`,
        `rgba(${r}, ${g}, ${b}, 0.50)`,
        `rgba(${r}, ${g}, ${b}, 0.75)`,
        accent,
      ],
      light: [
        'rgba(0, 0, 0, 0.04)',
        `rgba(${r}, ${g}, ${b}, 0.35)`,
        `rgba(${r}, ${g}, ${b}, 0.60)`,
        `rgba(${r}, ${g}, ${b}, 0.85)`,
        accent,
      ]
    };
  }, [accent]);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: 'none', willChange: 'transform, opacity' }}
      whileDrag={{ cursor: 'grabbing', scale: 1.015 }}
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="
        custom-widget absolute bottom-5 left-6 w-[280px]
        bg-[var(--color-surface)]/80 backdrop-blur-2xl
        border border-[var(--color-surface-border)] rounded-[var(--radius-window)]
        p-4.5 cursor-grab select-none pointer-events-auto popover-shadow
      "
    >
      <div className="flex items-center justify-between mb-3.5 px-0.5">
        <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-text-tertiary)]">
          Contributions
        </span>
        {isReady && (
          <span className="text-[11px] font-medium font-mono tracking-wide text-[var(--color-text-tertiary)]">
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
              color: 'var(--color-text-tertiary)',
              fontFamily: 'var(--font-primary)',
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
