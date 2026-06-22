import { Wind, Droplets, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function WeatherWidget({ constraintsRef, zIndex, onFocus }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Open-Meteo API for Indore (latitude: 22.7196, longitude: 75.8577)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=22.7196&longitude=75.8577&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto')
      .then(res => res.json())
      .then(data => {
        setWeather(data.current);
        setLoading(false);
      })
      .catch(err => console.error("Weather fetch failed", err));
  }, []);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.15}
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none" }}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      // Standardized to surface-dark, surface-border, rounded-3xl, and shadow-xl
      className="absolute top-10 left-3 w-64 bg-surface-dark border border-surface-border rounded-3xl p-4 cursor-grab flex flex-col gap-3 shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Integrated Header - Matches all other widgets */}
      <div className="flex justify-between items-center px-1 select-none">
        <span className="text-micro font-bold text-neutral-500 uppercase tracking-super-wide font-primary">
          INDORE, IN
        </span>
      </div>

      {loading ? (
        <div className="h-[96px] flex items-center justify-center w-full">
          {/* Swapped to global text-accent */}
          <Loader2 className="animate-spin text-accent" size={20} />
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full p-1">
          {/* Temperature and Status */}
          <div className="flex items-start gap-3 mt-1">
            <span className="text-5xl font-mono tracking-wider text-white leading-none">
              {Math.round(weather.temperature_2m)}°
            </span>
            <div className="flex flex-col gap-1.5 mt-1">
              {/* Swapped to text-accent and micro-typography */}
              <span className="text-micro font-bold text-accent uppercase tracking-super-wide font-mono leading-none">
                LIVE
              </span>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider leading-none">
                NOW
              </span>
            </div>
          </div>

          {/* Secondary Stats (Humidity & Wind) */}
          {/* Mapped border to surface-border */}
          <div className="flex justify-between items-center border-t border-surface-border pt-3 mt-1">
            <div className="flex items-center gap-2">
              <Droplets size={14} className="text-neutral-500" />
              {/* Standardized typography */}
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider font-mono">
                {weather.relative_humidity_2m}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Wind size={14} className="text-neutral-500" />
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider font-mono">
                {Math.round(weather.wind_speed_10m)} KM/H
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}