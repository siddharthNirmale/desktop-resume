// Viewport-percentage calculation helpers for safe initialization
const vw = (pct) => (typeof window !== "undefined" ? Math.round(window.innerWidth * pct) : 800);
const vh = (pct) => (typeof window !== "undefined" ? Math.round(window.innerHeight * pct) : 600);

export const initialWindowsConfig = [
  { id: "about", title: "About", isOpen: true, type: "window", defaultWidth: vw(0.7), defaultHeight: vh(0.75) },
  { id: "projects", title: "Projects", isOpen: false, type: "window", defaultWidth: vw(0.7), defaultHeight: vh(0.75) },
  { id: "notepad", title: "Notes", isOpen: false, type: "window", defaultWidth: vw(0.6), defaultHeight: vh(0.65) },
  { id: "contact", title: "Contact", isOpen: false, type: "window", defaultWidth: vw(0.6), defaultHeight: vh(0.55) },
  { id: "terminal", title: "Terminal", isOpen: false, type: "window", defaultWidth: vw(0.6), defaultHeight: vh(0.55) },
  { id: "resume", title: "Resume", isOpen: false, type: "window", defaultWidth: vw(0.7), defaultHeight: vh(0.8) },

  { id: "clock", title: "Local Time", isOpen: true, type: "widget" },
  { id: "github", title: "Contributions", isOpen: true, type: "widget" },
  { id: "learning", title: "Learning", isOpen: true, type: "widget" },
  { id: "weather", title: "Weather", isOpen: true, type: "widget" },
  { id: "theme", title: "Appearance", isOpen: true, type: "widget" },
  { id: "skills", title: "Skills", isOpen: true, type: "widget" },
];
