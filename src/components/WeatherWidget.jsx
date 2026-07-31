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
      whileDrag={{ cursor: "grabbing", scale: 1.02 }}
      className="custom-widget absolute top-14 left-6 w-[310px] p-5 cursor-grab flex flex-col select-none pointer-events-auto
                 bg-[#eef2f5] dark:bg-[#1a1c23]
                 rounded-[28px]
                 border-t-[3px] border-t-white/80 dark:border-t-white/10
                 border-b-[8px] border-b-[#cdd4db] dark:border-b-[#0d0e12]
                 border-x-[4px] border-x-[#e2e8f0] dark:border-x-[#15171d]
                 shadow-[0_25px_50px_rgba(0,10,40,0.25)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.8)]
                 font-primary transition-colors duration-250 min-h-[220px]"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
    >
      {/* Decorative Top Pill (Industrial design detail) */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-[#cdd4db] dark:bg-[#0d0e12] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]" />

      {/* Widget Sub-Header */}
      <div className="flex justify-between items-center px-1 mb-3 mt-1">
        <span className="text-[13px] font-black text-[#0066ff] dark:text-[#6699ff] uppercase tracking-widest drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
          Weather
        </span>
        {!loading && (
          <div className="px-2.5 py-1 bg-[#ff6b1a] rounded-lg shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),_0_2px_4px_rgba(255,107,26,0.3)]">
            <span className="text-[10px] font-black text-white uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
              Indore
            </span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center w-full min-h-[140px] bg-[#f8fafc] dark:bg-[#111317] rounded-[20px] border-t-[3px] border-[#cdd4db] dark:border-[#000] border-b-[2px] border-white dark:border-[#2c3039] border-x-[2px] border-[#e2e8f0] dark:border-[#15171d] shadow-[inset_0_6px_12px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_8px_16px_rgba(0,0,0,0.6)]">
          <Loader2 className="animate-spin text-[#0066ff] dark:text-[#6699ff]" size={24} strokeWidth={3} />
        </div>
      ) : (
        <>
          {(() => {
            const CurrentIcon = getWeatherDetails(weatherData.current.weather_code).Icon;
            const currentLabel = getWeatherDetails(weatherData.current.weather_code).label;
            const todayHigh = Math.round(weatherData.daily.temperature_2m_max[0]);
            const todayLow = Math.round(weatherData.daily.temperature_2m_min[0]);

            return (
              <div className="flex flex-col gap-3.5 w-full">

                {/* Main Recessed Digital Screen */}
                <div className="relative w-full flex items-center justify-between p-4 overflow-hidden
                                bg-[#f8fafc] dark:bg-[#111317]
                                rounded-[20px]
                                border-t-[3px] border-t-[#cdd4db] dark:border-t-[#000]
                                border-b-[2px] border-b-white dark:border-b-[#2c3039]
                                border-x-[2px] border-x-[#e2e8f0] dark:border-x-[#15171d]
                                shadow-[inset_0_6px_12px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_8px_16px_rgba(0,0,0,0.6)]">

                  {/* Grid Background */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.1] dark:opacity-[0.05]"
                    style={{ backgroundImage: 'radial-gradient(#0066ff 1px, transparent 1px)', backgroundSize: '10px 10px' }}
                  />

                  <div className="relative z-10 flex items-center justify-between w-full">

                    {/* Big Plastic Toy Icon Block */}
                    <div className="w-[60px] h-[60px] bg-[#ff6b1a] rounded-[16px] flex items-center justify-center
                                    border-b-[4px] border-[#cc5500] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),_0_4px_8px_rgba(255,107,26,0.3)]">
                      <CurrentIcon size={32} strokeWidth={2.5} className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]" />
                    </div>

                    {/* Temp Details */}
                    <div className="flex flex-col items-end">
                      <span className="text-[54px] font-black tracking-tighter text-[#0066ff] dark:text-[#6699ff] leading-[0.9] tabular-nums drop-shadow-[0_2px_2px_rgba(0,102,255,0.2)]">
                        {Math.round(weatherData.current.temperature_2m)}°
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[12px] font-bold text-[#8899aa] dark:text-[#64748b] uppercase tracking-wider">
                          {currentLabel}
                        </span>
                        <div className="px-1.5 py-0.5 bg-[#d5dde5] dark:bg-[#2c3039] rounded-[6px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
                          <span className="text-[10px] font-bold text-[#0066ff] dark:text-[#6699ff] tabular-nums">
                            H:{todayHigh}° L:{todayLow}°
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4-Day Extended Forecast - Physical Keys */}
                <div className="flex justify-between items-center gap-2 mt-1">
                  {weatherData.daily.time.slice(1, 5).map((dateStr, index) => {
                    const actualIndex = index + 1;
                    const date = new Date(dateStr);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const DayIcon = getWeatherDetails(weatherData.daily.weather_code[actualIndex]).Icon;
                    const high = Math.round(weatherData.daily.temperature_2m_max[actualIndex]);
                    const low = Math.round(weatherData.daily.temperature_2m_min[actualIndex]);

                    return (
                      <div key={dateStr}
                        className="flex-1 flex flex-col items-center gap-1.5 py-2.5
                                      bg-[#d5dde5] dark:bg-[#2c3039]
                                      rounded-[14px]
                                      border-b-[4px] border-[#b0b8c4] dark:border-[#111317]
                                      shadow-[0_4px_6px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_6px_rgba(0,0,0,0.4)]
                                      hover:translate-y-[-2px] transition-transform duration-200 cursor-default">
                        <span className="text-[10px] font-black text-[#0066ff] dark:text-[#6699ff] uppercase tracking-wider">
                          {dayName}
                        </span>

                        <div className="text-[#ff6b1a] drop-shadow-[0_1px_1px_rgba(255,107,26,0.3)]">
                          <DayIcon size={18} strokeWidth={2.5} />
                        </div>

                        <span className="text-[11px] font-bold text-[#8899aa] dark:text-[#64748b] tabular-nums">
                          {high}°<span className="opacity-50">/</span>{low}°
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
