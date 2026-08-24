/**
 * Advanced Motion System Architecture
 * 
 * Centralized, Apple-inspired motion constants ensuring smooth,
 * tactile, and restrained micro-interactions without exaggerated bounce or overshoot.
 */

export const EASING = {
  // Apple native deceleration curve for natural UI flow
  apple: [0.22, 1, 0.36, 1],
  // Snappy, subtle ease-out for immediate feedback
  micro: [0.16, 1, 0.3, 1],
  // Tightly controlled spring physics with zero overshoot
  spring: { type: "spring", stiffness: 440, damping: 30, mass: 0.5 },
  // Soft spring for layout morphing
  layoutSpring: { type: "spring", stiffness: 380, damping: 32, mass: 0.55 },
};

export const DURATION = {
  micro: 0.14, // 140ms: Buttons, icons, checkmarks, toggles
  ui: 0.22,    // 220ms: Cards, Menus, Dialogs, Tabs
  layout: 0.32, // 320ms: Window resizing, section transitions
};

/**
 * Reusable Transition Presets
 */
export const transitions = {
  micro: { duration: DURATION.micro, ease: EASING.micro },
  standard: { duration: DURATION.ui, ease: EASING.apple },
  layout: { duration: DURATION.layout, ease: EASING.apple },
  spring: EASING.spring,
  layoutSpring: EASING.layoutSpring,
};

/**
 * Common Animation Variants
 */
export const variants = {
  // Level 1: Tactile Micro-interactions (Buttons, Links)
  tap: { scale: 0.96, transition: transitions.micro },
  hoverSubtle: { scale: 1.015, transition: transitions.micro },
  
  // Level 2: Component Mounting (Dialogs, Cards, Menus)
  fadeUp: {
    hidden: { opacity: 0, y: 6, scale: 0.99 },
    visible: { opacity: 1, y: 0, scale: 1, transition: transitions.standard },
    exit: { opacity: 0, y: 4, scale: 0.99, transition: { duration: 0.15, ease: EASING.apple } },
  },
  
  // Level 3: Layout / Section Entrance
  sectionReveal: {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: transitions.layout },
  },
};
