import {
  SunIcon as Sun,
  CloudRainIcon as CloudRain,
  CloudLightningIcon as CloudLightning,
  CloudSnowIcon as CloudSnow,
  LoaderIcon as Loader2,
} from "lucide-animated";
import { Cloud, RotateCcw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import WidgetCover from "./WidgetCover";

// ============================================================
// HELPERS
// ============================================================

const getWeatherDetails = (code) => {
  if (code === 0) return { label: "Clear", Icon: Sun };
  if (code > 0 && code <= 3) return { label: "Cloudy", Icon: Cloud };
  if (code >= 51 && code <= 67) return { label: "Rain", Icon: CloudRain };
  if (code >= 71 && code <= 77) return { label: "Snow", Icon: CloudSnow };
  if (code >= 95) return { label: "Storm", Icon: CloudLightning };

  return { label: "Cloudy", Icon: Cloud };
};

// ============================================================
// WEATHER WIDGET
// ============================================================

export default function WeatherWidget({
  constraintsRef,
  zIndex,
  onFocus,
  onClose,
  positionStyle,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=22.7196&longitude=75.8577&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5",
      { signal: controller.signal }
    )
      .then((r) => {
        if (!r.ok) throw new Error("Weather request failed");
        return r.json();
      })
      .then((d) => {
        setData(d);
        setError(null);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          setError("Weather unavailable");
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [retryCount]);

  const handleRetry = useCallback(() => {
    setLoading(true);
    setError(null);
    setRetryCount((c) => c + 1);
  }, []);

  const current = data?.current;
  const daily = data?.daily;
  const ready = !loading && !error && current && daily;

  const { Icon: CurrentIcon, label } = ready
    ? getWeatherDetails(current.weather_code)
    : {};

  return (
    <WidgetCover
      id="weather"
      title="Weather · Indore"
      zIndex={zIndex}
      onClose={onClose}
      onFocus={onFocus}
      constraintsRef={constraintsRef}
      positionStyle={positionStyle || { top: "16px", left: "18px" }}
    >
      {loading ? (
        /* ====================================================
           LOADING
        ==================================================== */
        <div className="flex h-[118px] items-center justify-center">
          <Loader2
            size={15}
            className="animate-spin text-[var(--color-text-tertiary)]"
          />
        </div>
      ) : error || !ready ? (
        /* ====================================================
           ERROR / RETRY
        ==================================================== */
        <div className="flex h-[118px] flex-col items-center justify-center text-center px-3">
          <p className="text-[11px] text-[var(--color-text-tertiary)] mb-2.5">
            {error || "Weather forecast unavailable"}
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-[7px] bg-[var(--color-surface-hover)] hover:bg-[var(--color-surface-active)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-surface-border)] transition-colors active:scale-[0.96] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]"
            aria-label="Retry loading weather forecast"
          >
            <RotateCcw size={11} aria-hidden="true" />
            <span>Retry</span>
          </button>
        </div>
      ) : (
        <div className="w-full">
          {/* ==================================================
             CURRENT WEATHER
          ================================================== */}

          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div
                className="
                  font-heading
                  text-[46px]
                  font-medium
                  leading-none
                  tracking-[-0.045em]
                  text-[var(--color-text)]
                  tabular-nums
                "
              >
                {Math.round(current.temperature_2m)}°
              </div>

              <div
                className="
                  mt-2
                  text-[12px]
                  font-medium
                  text-[var(--color-text-secondary)]
                "
              >
                {label}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <CurrentIcon
                size={34}
                strokeWidth={1.3}
                className="text-[var(--color-accent)]"
              />

              <span
                className="
                  whitespace-nowrap
                  font-mono
                  text-[10px]
                  font-medium
                  tabular-nums
                  text-[var(--color-text-tertiary)]
                "
              >
                H {Math.round(daily.temperature_2m_max[0])}°
                <span className="mx-1 text-[var(--color-text-disabled)]">
                  /
                </span>
                L {Math.round(daily.temperature_2m_min[0])}°
              </span>
            </div>
          </div>

          {/* ==================================================
             DIVIDER
          ================================================== */}

          <div
            className="
              my-4
              h-px
              w-full
              bg-[var(--color-surface-border)]
            "
          />

          {/* ==================================================
             FORECAST
          ================================================== */}

          <div className="grid grid-cols-4 rounded-[10px] bg-[var(--color-surface-elevated)]/50 border border-[var(--color-surface-border)]/40 p-1.5">
            {daily.time.slice(1, 5).map((dateStr, i) => {
              const idx = i + 1;

              const { Icon: DayIcon } = getWeatherDetails(
                daily.weather_code[idx]
              );

              const high = Math.round(
                daily.temperature_2m_max[idx]
              );

              const low = Math.round(
                daily.temperature_2m_min[idx]
              );

              const day = new Date(dateStr).toLocaleDateString(
                "en-US",
                {
                  weekday: "short",
                }
              );

              return (
                <div
                  key={dateStr}
                  className="
                    flex
                    flex-col
                    items-center
                    gap-1.5
                    py-1
                    px-0.5
                    rounded-[7px]
                    hover:bg-[var(--color-surface-hover)]/50
                    transition-colors
                    duration-150
                    cursor-default
                    group
                  "
                >
                  <span
                    className="
                      text-[9px]
                      font-heading
                      font-semibold
                      uppercase
                      tracking-[0.08em]
                      text-[var(--color-text-tertiary)]
                      group-hover:text-[var(--color-text-secondary)]
                      transition-colors
                      duration-150
                    "
                  >
                    {day}
                  </span>

                  <DayIcon
                    size={14}
                    strokeWidth={1.7}
                    className="text-[var(--color-text-secondary)] group-hover:scale-110 group-hover:text-[var(--color-accent)] transition-all duration-150"
                  />

                  <span
                    className="
                      font-mono
                      text-[10px]
                      font-medium
                      tabular-nums
                      text-[var(--color-text-secondary)]
                    "
                  >
                    {high}°
                    <span className="mx-0.5 text-[var(--color-text-disabled)]">
                      /
                    </span>
                    <span className="text-[var(--color-text-tertiary)]">
                      {low}°
                    </span>
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
