/**
 * Centralized configuration for the subtle parallel wavy-line background.
 * Easily tweakable to adjust wave geometry, density, motion, and contrast.
 */
export const DEFAULT_WAVY_CONFIG = {
  amplitude: 1.5, // Subtle micro-wave deformation in px
  wavelength: 56, // Compact wave frequency in px
  lineSpacing: 7, // Small gap between parallel lines in px
  lineCount: 110, // Generous line count to span rotated 45-degree diagonal space (~800px)
  opacity: 0.08, // More subtle, slightly visible contrast
  strokeWidth: 0.7, // Ultra-fine hairline technical stroke
  duration: 24, // Tranquil, smooth drift cycle in seconds
  direction: "left", // "left" | "right" | "none"
  angle: -45, // 45-degree diagonal angle
  verticalOffset: 2, // Starts cleanly inside positive viewport
};
