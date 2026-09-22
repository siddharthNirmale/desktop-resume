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

  // Cubic bezier height multiplier (4/3) to ensure true crest peak reaches target amplitude
  const bezierAmp = amplitude * (4 / 3);

  for (let i = 0; i < lineCount; i++) {
    const yBase = verticalOffset + i * lineSpacing;
    let d = `M 0 ${yBase}`;

    for (let c = 0; c < cycles; c++) {
      const x0 = c * wavelength;

      // Crest (half-cycle 1)
      const cp1x = x0 + wavelength * 0.18;
      const cp1y = yBase - bezierAmp;
      const cp2x = x0 + wavelength * 0.32;
      const cp2y = yBase - bezierAmp;
      const midX = x0 + wavelength * 0.5;
      const midY = yBase;

      // Trough (half-cycle 2)
      const cp3x = x0 + wavelength * 0.68;
      const cp3y = yBase + bezierAmp;
      const cp4x = x0 + wavelength * 0.82;
      const cp4y = yBase + bezierAmp;
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
 * Renders multiple thin, parallel, flowing wavy lines running diagonally across the widget background.
 * Calm, technical, fine-gauge texture with seamless light and dark mode compatibility.
 */
const WavyBackground = memo(function WavyBackground({
  amplitude = DEFAULT_WAVY_CONFIG.amplitude,
  wavelength = DEFAULT_WAVY_CONFIG.wavelength,
  lineSpacing = DEFAULT_WAVY_CONFIG.lineSpacing,
  lineCount = DEFAULT_WAVY_CONFIG.lineCount,
  opacity,
  strokeWidth = DEFAULT_WAVY_CONFIG.strokeWidth,
  duration = DEFAULT_WAVY_CONFIG.duration,
  direction = DEFAULT_WAVY_CONFIG.direction,
  angle = DEFAULT_WAVY_CONFIG.angle,
  verticalOffset = DEFAULT_WAVY_CONFIG.verticalOffset,
  className = "",
}) {
  const prefersReducedMotion = useReducedMotion();

  // Generously sized to ensure continuous coverage across the rotated 45-degree diagonal
  const totalSvgWidth = Math.max(1200, wavelength * 16);
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
      {/* 45-degree Rotated Diagonal Container */}
      <div
        className="absolute top-1/2 left-1/2 flex items-center justify-center"
        style={{
          width: totalSvgWidth,
          height: totalSvgHeight,
          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
          transformOrigin: "center center",
        }}
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
            className="shrink-0 text-[var(--color-text)] transition-colors duration-200"
            style={{
              opacity: opacity ?? "var(--wavy-line-opacity, 0.08)",
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
    </div>
  );
});

export default WavyBackground;
