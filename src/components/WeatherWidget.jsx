import { motion } from 'framer-motion';
import { Wind, Droplets, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function WeatherWidget({ constraintsRef, zIndex, onFocus }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Open-Meteo API for Indore (latitude: 22.7196, longitude: 75.8577)
    // No API key needed!
    fetch('https://api.open-meteo.com/v1/forecast?latitude=22.7196&longitude=75.8577&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto')
      .then(res => res.json())
      .then(data => {
        setWeather(data.current);
        setLoading(false);
      })
      .catch(err => console.error("Weather fetch failed", err));
  }, []);

  if (loading) return (
    <motion.div style={{ zIndex }} className="absolute top-8 left-8 w-56 h-48 bg-[#1a1a1a] border border-neutral-800 rounded-3xl p-4 flex items-center justify-center">
      <Loader2 className="animate-spin text-[#E51919]" size={24} />
    </motion.div>
  );

  return (
    <motion.div
      drag dragMomentum={false} dragConstraints={constraintsRef} onPointerDown={onFocus}
      style={{ zIndex }}
      className="absolute top-8 left-8 w-56 bg-[#1a1a1a] border border-neutral-800 rounded-3xl p-4 cursor-move flex flex-col gap-4"
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex justify-between items-center px-1">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-[0.2em]">INDORE, IN</span>
        <div className="w-2 h-2 rounded-full bg-[#E51919]" />
      </div>

      <div className="flex items-end gap-3 px-1">
        <span className="text-5xl font-medium text-white">{Math.round(weather.temperature_2m)}°</span>
        <div className="flex flex-col mb-1.5">
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">LIVE</span>
          <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-[0.2em]">CURRENT</span>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-neutral-800 pt-3 px-1">
        <div className="flex items-center gap-2">
          <Droplets size={14} className="text-neutral-500" />
          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{weather.relative_humidity_2m}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind size={14} className="text-neutral-500" />
          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{Math.round(weather.wind_speed_10m)} km/h</span>
        </div>
      </div>
    </motion.div>
  );
}