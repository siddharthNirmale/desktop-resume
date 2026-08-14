import { useState, useEffect, useMemo } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import WidgetCover from './WidgetCover';

// ============================================================
// HELPERS
// ============================================================
const hexToRgb = (hex) => {
  if (!hex || typeof hex !== 'string') return { r: 10, g: 132, b: 255 };
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) clean = clean.split('').map((c) => c + c).join('');
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
  const start = new Date();
  start.setDate(today.getDate() - 150);
  return contributions.filter((day) => {
    const d = new Date(day.date);
    return d >= start && d <= today;
  });
};

// ============================================================
// GITHUB WIDGET
// ============================================================
export default function GithubWidget({ constraintsRef, zIndex, onFocus, onClose, positionStyle }) {
  const [isReady, setIsReady] = useState(false);
  const [accent, setAccent] = useState('#0A84FF');
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const body = document.body;

    const sync = () => {
      const acc = getComputedStyle(root).getPropertyValue('--color-accent').trim() || '#0A84FF';
      setAccent(acc);
      setIsLight(body.classList.contains('light-theme'));
    };

    sync();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes') sync();
      }
    });

    observer.observe(root, { attributes: true, attributeFilter: ['style'] });
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });

    const t = setTimeout(() => setIsReady(true), 600);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, []);

  const theme = useMemo(() => {
    const { r, g, b } = hexToRgb(accent);
    return {
      dark: [
        'rgba(255, 255, 255, 0.04)',
        `rgba(${r}, ${g}, ${b}, 0.22)`,
        `rgba(${r}, ${g}, ${b}, 0.48)`,
        `rgba(${r}, ${g}, ${b}, 0.74)`,
        accent,
      ],
      light: [
        'rgba(0, 0, 0, 0.05)',
        `rgba(${r}, ${g}, ${b}, 0.30)`,
        `rgba(${r}, ${g}, ${b}, 0.58)`,
        `rgba(${r}, ${g}, ${b}, 0.82)`,
        accent,
      ],
    };
  }, [accent]);

  return (
    <WidgetCover
      id="github"
      title="Contributions"
      zIndex={zIndex}
      onClose={onClose}
      onFocus={onFocus}
      constraintsRef={constraintsRef}
      positionStyle={positionStyle || { top: "410px", left: "20px" }}
    >
      <div
        className={`flex justify-center transition-all duration-400 ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {GitHubCalendar && (
          <GitHubCalendar
            username="siddharthNirmale"
            colorScheme={isLight ? 'light' : 'dark'}
            theme={theme}
            transformData={filterLastFiveMonths}
            blockSize={7}
            blockMargin={2.5}
            blockRadius={2}
            fontSize={10}
            hideColorLegend
            hideTotalCount
            style={{
              color: 'var(--color-text-disabled)',
              fontFamily: 'var(--font-primary)',
            }}
          />
        )}
      </div>
    </WidgetCover>
  );
}
