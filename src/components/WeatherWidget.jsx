import { Cloud, Sun, CloudRain, CloudLightning, CloudSnow, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import WidgetCover from './WidgetCover';

// ============================================================
// HELPERS
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
export default function WeatherWidget({ constraintsRef, zIndex, onFocus, onClose, positionStyle }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=22.7196&longitude=75.8577&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5',
      { signal: controller.signal }
    )
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch((e) => { if (e.name !== 'AbortError') console.error('Weather fetch failed', e); });
    return () => controller.abort();
  }, []);

  const current = data?.current;
  const daily = data?.daily;
  const ready = !loading && current && daily;
  const { Icon: CurrentIcon, label } = ready ? getWeatherDetails(current.weather_code) : {};

  return (
    <WidgetCover
      id="weather"
      title="Weather · Indore"
      zIndex={zIndex}
      onClose={onClose}
      onFocus={onFocus}
      constraintsRef={constraintsRef}
      positionStyle={positionStyle || { top: "20px", left: "20px" }}
    >
      {!ready ? (
        <div className="h-[130px] flex items-center justify-center">
          <Loader2 className="animate-spin text-[var(--color-text-disabled)]" size={16} />
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {/* Current Weather */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[48px] font-light leading-none tracking-[-0.03em] text-[var(--color-text)] tabular-nums font-heading">
                {Math.round(current.temperature_2m)}°
              </span>
              <span className="text-[12px] font-medium text-[var(--color-text-secondary)]">
                {label}
              </span>
            </div>

            <div className="flex flex-col items-end gap-2">
              <CurrentIcon size={36} strokeWidth={1.25} className="text-[var(--color-accent)]" />
              <span className="text-[11px] font-mono text-[var(--color-text-tertiary)] tabular-nums">
                H:{Math.round(daily.temperature_2m_max[0])}° · L:{Math.round(daily.temperature_2m_min[0])}°
              </span>
            </div>
          </div>

          {/* Hairline Divider */}
          <div className="h-px w-full bg-[var(--color-surface-border)] opacity-60" />

          {/* 4-Day Forecast */}
          <div className="flex justify-between items-center">
            {daily.time.slice(1, 5).map((dateStr, i) => {
              const idx = i + 1;
              const { Icon: DayIcon } = getWeatherDetails(daily.weather_code[idx]);
              const high = Math.round(daily.temperature_2m_max[idx]);
              const low = Math.round(daily.temperature_2m_min[idx]);
              const day = new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });

              return (
                <div key={dateStr} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-[var(--color-text-disabled)]">
                    {day}
                  </span>
                  <DayIcon size={13} strokeWidth={1.75} className="text-[var(--color-text-tertiary)]" />
                  <span className="text-[10px] font-mono text-[var(--color-text-secondary)] tabular-nums">
                    {high}°<span className="text-[var(--color-text-disabled)]">/</span>{low}°
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </WidgetCover>
  );
}
