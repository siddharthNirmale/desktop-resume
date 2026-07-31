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

// Helper to map Open-Meteo WMO codes to Lucide icons
const getWeatherDetails = (code) => {
  if (code === 0) return { label: 'Clear', Icon: Sun };
  if (code > 0 && code <= 3) return { label: 'Cloudy', Icon: Cloud };
  if (code >= 51 && code <= 67) return { label: 'Rain', Icon: CloudRain };
  if (code >= 71 && code <= 77) return { label: 'Snow', Icon: CloudSnow };
  if (code >= 95) return { label: 'Storm', Icon: CloudLightning };
  return { label: 'Cloudy', Icon: Cloud };
};

export default function WeatherWidget({ constraintsRef, zIndex, onFocus }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Open-Meteo API for Indore (latitude: 22.7196, longitude: 75.8577)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=22.7196&longitude=75.8577&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5')
      .then(res => res.json())
      .then(data => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch(err => console.error("Weather fetch failed", err));
  }, []);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none" }}
      whileDrag={{ cursor: "grabbing" }}
      // Added custom-widget and transition-colors
      className="custom-widget absolute top-14 left-6 w-[280px] bg-[#1C1C1E]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4.5 cursor-grab flex flex-col gap-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] font-primary select-none pointer-events-auto transition-colors duration-250"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
    >
      {/* Widget Sub-Header */}
      <div className="flex justify-between items-center px-0.5">
        <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider transition-colors duration-250">
          Weather
        </span>
        {!loading && (
          <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] transition-colors duration-250">
            Indore
          </span>
        )}
      </div>

      {loading ? (
        <div className="h-[120px] flex items-center justify-center w-full">
          <Loader2 className="animate-spin text-[var(--color-accent)]" size={18} />
        </div>
      ) : (
        <>
          {(() => {
            const CurrentIcon = getWeatherDetails(weatherData.current.weather_code).Icon;
            const currentLabel = getWeatherDetails(weatherData.current.weather_code).label;
            const todayHigh = Math.round(weatherData.daily.temperature_2m_max[0]);
            const todayLow = Math.round(weatherData.daily.temperature_2m_min[0]);

            return (
              <div className="flex flex-col gap-4 w-full">

                {/* Main Current Weather Display */}
                <div className="flex items-center justify-between px-0.5">
                  <CurrentIcon size={40} strokeWidth={1.25} className="text-[var(--color-accent)] drop-shadow-md transition-colors duration-250" />
                  <div className="flex flex-col items-end">
                    <div className="flex items-start gap-1.5">
                      <span className="text-[38px] font-light text-[var(--color-text)] leading-none tracking-tight font-primary tabular-nums transition-colors duration-250">
                        {Math.round(weatherData.current.temperature_2m)}°
                      </span>
                      <span className="text-[12px] font-medium text-[var(--color-text-secondary)] mt-0.5 transition-colors duration-250">
                        {currentLabel}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] mt-1.5 tracking-normal tabular-nums transition-colors duration-250">
                      High: {todayHigh}° &nbsp;Low: {todayLow}°
                    </span>
                  </div>
                </div>

                {/* 4-Day Extended Forecast Row */}
                <div className="flex justify-between items-center border-t border-[var(--color-surface-border)] pt-3.5 mt-0.5 transition-colors duration-250">
                  {weatherData.daily.time.slice(1, 5).map((dateStr, index) => {
                    const actualIndex = index + 1;
                    const date = new Date(dateStr);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const DayIcon = getWeatherDetails(weatherData.daily.weather_code[actualIndex]).Icon;
                    const high = Math.round(weatherData.daily.temperature_2m_max[actualIndex]);
                    const low = Math.round(weatherData.daily.temperature_2m_min[actualIndex]);

                    return (
                      <div key={dateStr} className="flex flex-col items-center gap-1.5">
                        <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase font-medium tracking-wider transition-colors duration-250">
                          {dayName}
                        </span>
                        <DayIcon size={15} strokeWidth={1.5} className="text-[var(--color-text-tertiary)] transition-colors duration-250" />
                        <span className="text-[11px] text-[var(--color-text-secondary)] font-medium tabular-nums transition-colors duration-250">
                          {high}°<span className="text-[var(--color-text-tertiary)]">/</span>{low}°
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })()}
        </>
      )}
    </motion.div>
  );
}
