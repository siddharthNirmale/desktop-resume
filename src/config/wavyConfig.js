/**
 * Centralized configuration for the subtle parallel wavy-line background.
 * Easily tweakable to adjust wave geometry, density, motion, and contrast.
 */
export const DEFAULT_WAVY_CONFIG = {
  amplitude: 5, // Subtle wave deformation height in px
  wavelength: 220, // Large, smooth wave cycle width in px
  lineSpacing: 18, // Consistent vertical distance between parallel lines
  lineCount: 16, // Number of lines to cleanly span widget height
  opacity: 0.055, // Low visual contrast (whisper-quiet, non-competing)
  strokeWidth: 1, // Hairline technical stroke
  duration: 30, // Extremely slow, tranquil drift cycle in seconds
  direction: "left", // "left" | "right" | "none"
  verticalOffset: -12, // Top margin offset to start lines before the top edge
};
