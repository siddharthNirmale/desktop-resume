import {
  Cloud,
  Sun,
  CloudRain,
  CloudLightning,
  CloudSnow,
  Loader2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================================
// HELPER FUNCTIONS
// ============================================================
const getWeatherDetails = (code) => {
  if (code === 0) return { label: 'Clear', Icon: Sun };
  if (code > 0 && code <= 3) return { label: 'Cloudy', Icon: Cloud };
  if (code >= 51 && code <= 67) return { label: 'Rain', Icon: CloudRain };
  if (code >= 71 && code <= 77) return { label: 'Snow', Icon: CloudSnow };
  if (code >= 95) return { label: 'Storm', Icon: CloudLightning };
  return { label: 'Cloudy', Icon: Cloud };
};

// ============================================================
// WEATHER WIDGET
// ============================================================
export default function WeatherWidget({ constraintsRef, zIndex, onFocus }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Create an AbortController to prevent memory leaks if unmounted during fetch
    const controller = new AbortController();

    // Open-Meteo API for Indore (latitude: 22.7196, longitude: 75.8577)
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=22.7196&longitude=75.8577&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5',
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error("Weather fetch failed", err);
        }
      });

    // Cleanup function
    return () => controller.abort();
  }, []);

  // 2. Compute variables here instead of using an inline function in the JSX
  const current = weatherData?.current;
  const daily = weatherData?.daily;
  const isReady = !loading && current && daily;

  // Safely extract weather details only if data is ready
  const { Icon: CurrentIcon, label: currentLabel } = isReady
    ? getWeatherDetails(current.weather_code)
    : {};

  const todayHigh = isReady ? Math.round(daily.temperature_2m_max[0]) : null;
  const todayLow = isReady ? Math.round(daily.temperature_2m_min[0]) : null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none", willChange: "transform, opacity" }}
      whileDrag={{ cursor: "grabbing", scale: 1.015 }}
      initial={{ opacity: 0, scale: 0.96, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -8 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      className="
        custom-widget absolute top-12 left-6 w-[280px]
        bg-[var(--color-surface)]/80 backdrop-blur-2xl
        border border-[var(--color-surface-border)] rounded-[var(--radius-window)]
        p-4.5 flex flex-col gap-3.5 cursor-grab select-none pointer-events-auto
        popover-shadow transition-colors duration-250
      "
    >
      {/* Widget Sub-Header */}
      <div className="flex justify-between items-center px-0.5">
        <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
          Weather
        </span>
        {isReady && (
          <span className="text-[11px] font-medium text-[var(--color-text-tertiary)]">
            Indore
          </span>
        )}
      </div>

      {!isReady ? (
        <div className="h-[120px] flex items-center justify-center w-full">
          <Loader2 className="animate-spin text-[var(--color-accent)] opacity-60" size={18} />
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {/* Main Current Weather Display */}
          <div className="flex items-center justify-between px-0.5">
            <CurrentIcon size={40} strokeWidth={1.25} className="text-[var(--color-accent)]" />
            <div className="flex flex-col items-end">
              <div className="flex items-start gap-1.5">
                <span className="text-[38px] font-light text-[var(--color-text)] leading-none tracking-tight tabular-nums">
                  {Math.round(current.temperature_2m)}°
                </span>
                <span className="text-[12px] font-medium text-[var(--color-text-secondary)] mt-0.5">
                  {currentLabel}
                </span>
              </div>
              <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] mt-1.5 tabular-nums">
                High: {todayHigh}° &nbsp;Low: {todayLow}°
              </span>
            </div>
          </div>

          {/* 4-Day Extended Forecast Row */}
          <div className="surface-divider h-[1px] w-full my-0.5 opacity-50" />

          <div className="flex justify-between items-center pt-1 px-1">
            {daily.time.slice(1, 5).map((dateStr, index) => {
              const actualIndex = index + 1;
              const date = new Date(dateStr);
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              const DayIcon = getWeatherDetails(daily.weather_code[actualIndex]).Icon;
              const high = Math.round(daily.temperature_2m_max[actualIndex]);
              const low = Math.round(daily.temperature_2m_min[actualIndex]);

              return (
                <div key={dateStr} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase font-medium tracking-wider">
                    {dayName}
                  </span>
                  <DayIcon size={15} strokeWidth={1.5} className="text-[var(--color-text-tertiary)]" />
                  <span className="text-[11px] text-[var(--color-text-secondary)] font-medium tabular-nums">
                    {high}°<span className="text-[var(--color-text-tertiary)]">/</span>{low}°
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
