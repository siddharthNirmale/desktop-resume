import { useMemo, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DEFAULT_WAVY_CONFIG } from "../config/wavyConfig";

/**
 * Generates an SVG path string containing multiple parallel sine-like waves
 * constructed with continuous cubic bezier curves.
 */
function generateWavyPaths({
  amplitude,
  wavelength,
  lineSpacing,
  lineCount,
  verticalOffset,
  totalWidth,
}) {
  const cycles = Math.ceil(totalWidth / wavelength) + 2;
  const pathCommands = [];

  for (let i = 0; i < lineCount; i++) {
    const yBase = verticalOffset + i * lineSpacing;
    let d = `M 0 ${yBase}`;

    for (let c = 0; c < cycles; c++) {
      const x0 = c * wavelength;

      // Crest (half-cycle 1)
      const cp1x = x0 + wavelength * 0.18;
      const cp1y = yBase - amplitude;
      const cp2x = x0 + wavelength * 0.32;
      const cp2y = yBase - amplitude;
      const midX = x0 + wavelength * 0.5;
      const midY = yBase;

      // Trough (half-cycle 2)
      const cp3x = x0 + wavelength * 0.68;
      const cp3y = yBase + amplitude;
      const cp4x = x0 + wavelength * 0.82;
      const cp4y = yBase + amplitude;
      const endX = x0 + wavelength * 1.0;
      const endY = yBase;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${midX} ${midY}`;
      d += ` C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${endX} ${endY}`;
    }

    pathCommands.push(d);
  }

  return pathCommands.join(" ");
}

/**
 * WavyBackground Component
 * Renders multiple thin, parallel, flowing wavy lines running across the widget background.
 * Calm, technical, and non-intrusive.
 */
const WavyBackground = memo(function WavyBackground({
  amplitude = DEFAULT_WAVY_CONFIG.amplitude,
  wavelength = DEFAULT_WAVY_CONFIG.wavelength,
  lineSpacing = DEFAULT_WAVY_CONFIG.lineSpacing,
  lineCount = DEFAULT_WAVY_CONFIG.lineCount,
  opacity = DEFAULT_WAVY_CONFIG.opacity,
  strokeWidth = DEFAULT_WAVY_CONFIG.strokeWidth,
  duration = DEFAULT_WAVY_CONFIG.duration,
  direction = DEFAULT_WAVY_CONFIG.direction,
  verticalOffset = DEFAULT_WAVY_CONFIG.verticalOffset,
  className = "",
}) {
  const prefersReducedMotion = useReducedMotion();

  // Width is generously sized to ensure full coverage during horizontal drift
  const totalSvgWidth = Math.max(1200, wavelength * 6);
  const totalSvgHeight = verticalOffset + lineCount * lineSpacing + amplitude * 2 + 30;

  const pathData = useMemo(() => {
    return generateWavyPaths({
      amplitude,
      wavelength,
      lineSpacing,
      lineCount,
      verticalOffset,
      totalWidth: totalSvgWidth,
    });
  }, [amplitude, wavelength, lineSpacing, lineCount, verticalOffset, totalSvgWidth]);

  const shouldAnimate = !prefersReducedMotion && direction !== "none" && duration > 0;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden select-none ${className}`}
    >
      <motion.div
        className="absolute top-0 left-0 h-full flex items-start"
        animate={
          shouldAnimate
            ? {
                x: direction === "left" ? [0, -wavelength] : [-wavelength, 0],
              }
            : undefined
        }
        transition={
          shouldAnimate
            ? {
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration,
                  ease: "linear",
                },
              }
            : undefined
        }
        style={{
          width: totalSvgWidth,
          willChange: shouldAnimate ? "transform" : "auto",
        }}
      >
        <svg
          width={totalSvgWidth}
          height={totalSvgHeight}
          viewBox={`0 0 ${totalSvgWidth} ${totalSvgHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[var(--color-text)] transition-colors duration-200"
          style={{
            opacity,
            shapeRendering: "geometricPrecision",
          }}
        >
          <path
            d={pathData}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </motion.div>
    </div>
  );
});

export default WavyBackground;
