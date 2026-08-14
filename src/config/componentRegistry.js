import { lazy } from "react";

// ============================================================
// LAZY LOADED WIDGETS
// ============================================================
const ClockWidget = lazy(() => import("../components/ClockWidget"));
const GithubWidget = lazy(() => import("../components/GithubWidget"));
const LearningWidget = lazy(() => import("../components/LearningWidget"));
const WeatherWidget = lazy(() => import("../components/WeatherWidget"));
const ThemeWidget = lazy(() => import("../components/ThemeWidget"));
const SkillsWidget = lazy(() => import("../components/SkillsWidget"));

// ============================================================
// LAZY LOADED APPS
// ============================================================
const AboutSection = lazy(() => import("../sections/AboutSection"));
const ProjectsSection = lazy(() => import("../sections/ProjectsSection"));
const Notepad = lazy(() => import("../sections/Notepad"));
const ContactSection = lazy(() => import("../sections/ContactSection"));
const Terminal = lazy(() => import("../sections/Terminal"));
const ResumeSection = lazy(() => import("../sections/ResumeSection"));

// ============================================================
// COMPONENT MAPS
// ============================================================
export const WIDGET_MAP = {
  clock: ClockWidget,
  github: GithubWidget,
  learning: LearningWidget,
  weather: WeatherWidget,
  theme: ThemeWidget,
  skills: SkillsWidget,
};

export const APP_MAP = {
  about: AboutSection,
  projects: ProjectsSection,
  resume: ResumeSection,
  notepad: Notepad,
  contact: ContactSection,
  terminal: Terminal,
};

// ============================================================
// WIDGET PROPS
// Keeps widget-specific static data and initial layout outside the render logic.
// ============================================================
export const WIDGET_PROPS = {
  weather: {
    positionStyle: { top: "20px", left: "20px" },
  },
  theme: {
    positionStyle: { top: "214px", left: "20px" },
  },
  github: {
    positionStyle: { top: "410px", left: "20px" },
  },
  clock: {
    positionStyle: { top: "20px", right: "20px" },
  },
  learning: {
    positionStyle: { top: "214px", right: "20px" },
    progress: 55,
    topic: "Frontend Optimization",
    subtopic: "Next.js 14",
  },
  skills: {
    positionStyle: { top: "374px", right: "20px" },
  },
};
