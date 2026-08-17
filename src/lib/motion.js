/**
 * Advanced Motion System Architecture
 * 
 * Provides centralized animation constants for the entire application,
 * ensuring an Apple-inspired, cohesive, and performant user experience.
 */

export const EASING = {
  // Smooth deceleration mimicking native OS interfaces
  apple: [0.22, 1, 0.36, 1],
  // Snappy but smooth easing for micro-interactions
  micro: "easeOut",
  // Spring physics, used sparingly
  spring: { type: "spring", stiffness: 400, damping: 25 },
};

export const DURATION = {
  micro: 0.15, // 150ms: Buttons, icons, toggles
  ui: 0.25,    // 250ms: Cards, Menus, Dialogs, Tabs
  layout: 0.4, // 400ms: Page transitions, large layout changes
};

/**
 * Reusable Transition Presets
 */
export const transitions = {
  micro: { duration: DURATION.micro, ease: EASING.micro },
  standard: { duration: DURATION.ui, ease: EASING.apple },
  layout: { duration: DURATION.layout, ease: EASING.apple },
  spring: EASING.spring,
};

/**
 * Common Animation Variants
 */
export const variants = {
  // Level 1: Micro-interactions (Buttons, Links)
  tap: { scale: 0.97, transition: transitions.micro },
  hoverSubtle: { scale: 1.02, transition: transitions.micro },
  
  // Level 2: Component Mounting (Dialogs, Cards, Menus)
  fadeUp: {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: transitions.standard },
    exit: { opacity: 0, y: 4, scale: 0.98, transition: { duration: 0.2, ease: "easeIn" } },
  },
  
  // Level 3: Layout / Section Entrance
  sectionReveal: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: transitions.layout },
  },
};
