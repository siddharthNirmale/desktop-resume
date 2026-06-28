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
      dragElastic={0.15}
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none" }}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      className="absolute top-10 left-3 w-[280px] bg-surface-dark border border-surface-border rounded-2xl p-4 cursor-grab flex flex-col gap-4 shadow-2xl font-primary"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Clean Header (3-dot menu buttons removed) */}
      <div className="flex justify-between items-center select-none mb-1">
        <span className="text-micro font-medium text-text-secondary uppercase tracking-super-wide">
          WEATHER
        </span>
      </div>

      {loading ? (
        <div className="h-[120px] flex items-center justify-center w-full">
          <Loader2 className="animate-spin text-accent" size={20} />
        </div>
      ) : (
        <>
          {(() => {
            const CurrentIcon = getWeatherDetails(weatherData.current.weather_code).Icon;
            const currentLabel = getWeatherDetails(weatherData.current.weather_code).label;
            const todayHigh = Math.round(weatherData.daily.temperature_2m_max[0]);
            const todayLow = Math.round(weatherData.daily.temperature_2m_min[0]);

            return (
              <div className="flex flex-col gap-5 w-full">
                
                {/* Main Current Weather Section */}
                <div className="flex items-center justify-between">
                  {/* Clean icon configuration (glow-accent removed) */}
                  <CurrentIcon size={42} strokeWidth={1} className="text-accent" />
                  <div className="flex flex-col items-end">
                    <div className="flex items-start gap-2">
                      <span className="text-4xl font-light text-text leading-none">
                        {Math.round(weatherData.current.temperature_2m)}°
                      </span>
                      <span className="text-sm font-medium text-text-secondary mt-1">
                        {currentLabel}
                      </span>
                    </div>
                    <span className="text-xs text-text-tertiary mt-2 font-mono tracking-wide">
                      H: {todayHigh}° L: {todayLow}°
                    </span>
                  </div>
                </div>

                {/* 4-Day Forecast Row */}
                <div className="flex justify-between items-center border-t border-surface-border pt-4 mt-1">
                  {weatherData.daily.time.slice(1, 5).map((dateStr, index) => {
                    const actualIndex = index + 1;
                    const date = new Date(dateStr);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const DayIcon = getWeatherDetails(weatherData.daily.weather_code[actualIndex]).Icon;
                    const high = Math.round(weatherData.daily.temperature_2m_max[actualIndex]);
                    const low = Math.round(weatherData.daily.temperature_2m_min[actualIndex]);

                    return (
                      <div key={dateStr} className="flex flex-col items-center gap-2">
                        <span className="text-micro text-text-secondary uppercase font-medium">
                          {dayName}
                        </span>
                        <DayIcon size={16} strokeWidth={1.5} className="text-text-tertiary" />
                        <span className="text-micro text-text-secondary font-mono">
                          {high}°/{low}°
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