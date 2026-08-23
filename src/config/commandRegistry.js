import { 
  FolderDot, 
  TerminalSquare, 
  UserCircle, 
  Mail, 
  FileText, 
  Sliders,
  Moon,
  Sun,
  Code,
  CloudSun,
  Clock,
  Cpu,
  Target,
  Download,
  RotateCcw,
  Eye,
  GitBranch
} from "lucide-react";
import { FiGithub } from "react-icons/fi";

import projects from "../data/project";
import skills from "../data/skills";
import resume from "../data/resume";

/**
 * Registry for static system commands.
 */
export const staticCommands = [
  {
    id: "open-projects",
    name: "Projects",
    description: "Browse my selected projects",
    category: "Apps",
    keywords: ["projects", "work", "portfolio", "showcase"],
    icon: FolderDot,
    action: (helpers) => {
      helpers.toggleWindow("projects", "isOpen", true);
      helpers.bringToFront?.("projects");
    },
  },
  {
    id: "open-about",
    name: "About Me",
    description: "Read about my background and journey",
    category: "Apps",
    keywords: ["about", "profile", "bio", "me"],
    icon: UserCircle,
    action: (helpers) => {
      helpers.toggleWindow("about", "isOpen", true);
      helpers.bringToFront?.("about");
    },
  },
  {
    id: "open-terminal",
    name: "Terminal",
    description: "Open the developer terminal",
    category: "Apps",
    keywords: ["terminal", "cmd", "command", "cli", "console"],
    icon: TerminalSquare,
    action: (helpers) => {
      helpers.toggleWindow("terminal", "isOpen", true);
      helpers.bringToFront?.("terminal");
    },
  },
  {
    id: "open-contact",
    name: "Contact Me",
    description: "Get in touch or send an email",
    category: "Apps",
    keywords: ["contact", "email", "message", "hire"],
    icon: Mail,
    action: (helpers) => {
      helpers.toggleWindow("contact", "isOpen", true);
      helpers.bringToFront?.("contact");
    },
  },
  {
    id: "open-resume",
    name: "Resume",
    description: "View my professional resume",
    category: "Apps",
    keywords: ["resume", "cv", "experience", "education"],
    icon: FileText,
    action: (helpers) => {
      helpers.toggleWindow("resume", "isOpen", true);
      helpers.bringToFront?.("resume");
    },
  },
  {
    id: "open-notes",
    name: "Notes",
    description: "Open the notepad",
    category: "Apps",
    keywords: ["notes", "notepad", "text", "editor", "new note"],
    icon: FileText,
    action: (helpers) => {
      helpers.toggleWindow("notepad", "isOpen", true);
      helpers.bringToFront?.("notepad");
    },
  },
  {
    id: "download-resume",
    name: "Download Resume PDF",
    description: "Save a local PDF copy of my resume",
    category: "Actions",
    keywords: ["download", "pdf", "resume", "cv", "export"],
    icon: Download,
    action: () => {
      const link = document.createElement("a");
      link.href = resume;
      link.setAttribute("download", "Siddharth_Nirmale_Resume.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
  {
    id: "toggle-weather-widget",
    name: "Toggle Weather Widget",
    description: "Show or hide Indore live weather widget",
    category: "Widgets",
    keywords: ["weather", "temperature", "forecast", "indore", "widget"],
    icon: CloudSun,
    action: (helpers) => helpers.toggleWidget?.("weather"),
  },
  {
    id: "toggle-clock-widget",
    name: "Toggle Clock & Timer Widget",
    description: "Show or hide clock, stopwatch and timer",
    category: "Widgets",
    keywords: ["clock", "time", "stopwatch", "timer", "widget"],
    icon: Clock,
    action: (helpers) => helpers.toggleWidget?.("clock"),
  },
  {
    id: "toggle-theme-widget",
    name: "Toggle Appearance Widget",
    description: "Show or hide wallpapers and accent customization",
    category: "Widgets",
    keywords: ["appearance", "theme", "wallpaper", "accent", "widget"],
    icon: Sliders,
    action: (helpers) => helpers.toggleWidget?.("theme"),
  },
  {
    id: "toggle-skills-widget",
    name: "Toggle Skills Widget",
    description: "Show or hide rotating tech stack widget",
    category: "Widgets",
    keywords: ["skills", "stack", "tech", "react", "node", "widget"],
    icon: Cpu,
    action: (helpers) => helpers.toggleWidget?.("skills"),
  },
  {
    id: "toggle-learning-widget",
    name: "Toggle Focus Tracker Widget",
    description: "Show or hide current learning focus goal",
    category: "Widgets",
    keywords: ["learning", "focus", "goal", "nextjs", "widget"],
    icon: Target,
    action: (helpers) => helpers.toggleWidget?.("learning"),
  },
  {
    id: "toggle-github-widget",
    name: "Toggle GitHub Contributions Widget",
    description: "Show or hide GitHub contribution graph",
    category: "Widgets",
    keywords: ["github", "contributions", "graph", "activity", "widget"],
    icon: GitBranch,
    action: (helpers) => helpers.toggleWidget?.("github"),
  },
  {
    id: "toggle-dark-mode",
    name: "Toggle Dark / Light Theme",
    description: "Switch between dark and light appearance modes",
    category: "System",
    keywords: ["theme", "dark", "light", "mode", "switch"],
    icon: Sun,
    action: () => {
      const isLight = document.documentElement.classList.contains("light-theme");
      const nextLight = !isLight;
      document.documentElement.classList.toggle("light-theme", nextLight);
      document.body.classList.toggle("light-theme", nextLight);
      localStorage.setItem("os-theme", nextLight ? "light" : "dark");
    },
  },
  {
    id: "show-desktop",
    name: "Show Desktop / Minimize Windows",
    description: "Minimize all windows to see desktop wallpaper",
    category: "System",
    keywords: ["desktop", "minimize", "hide", "wallpaper"],
    icon: Eye,
    action: (helpers) => helpers.minimizeAll?.(),
  },
  {
    id: "reset-layout",
    name: "Reset Workspace Layout",
    description: "Restore all windows & widgets to default layout",
    category: "System",
    keywords: ["reset", "layout", "restore", "clean", "workspace"],
    icon: RotateCcw,
    action: (helpers) => helpers.resetLayout?.(),
  },
  {
    id: "open-github",
    name: "GitHub Profile",
    description: "Open github.com/siddharthNirmale in new tab",
    category: "External",
    keywords: ["github", "code", "repository", "open source"],
    icon: FiGithub,
    action: () => window.open("https://github.com/siddharthNirmale", "_blank"),
  },
];


/**
 * Generate dynamic commands from portfolio data
 */
export const generateDynamicCommands = () => {
  const projectCommands = projects.map((p) => ({
    id: `project-${p.id}`,
    name: p.title,
    description: `Project: ${p.tech}`,
    category: "Projects",
    keywords: [p.title.toLowerCase(), ...p.tech.split("•").map(t => t.trim().toLowerCase())],
    icon: FolderDot,
    action: (helpers) => {
      helpers.toggleWindow("projects", "isOpen", true);
      helpers.bringToFront("projects");
    },
  }));

  const skillCommands = skills.flatMap((category) => 
    category.items.map((skill) => ({
      id: `skill-${skill.toLowerCase().replace(/\s+/g, '-')}`,
      name: skill,
      description: `Skill: ${category.category}`,
      category: "Skills",
      keywords: [skill.toLowerCase(), category.category.toLowerCase()],
      icon: Code,
      action: (helpers) => {
        helpers.toggleWindow("about", "isOpen", true);
        helpers.bringToFront("about");
      },
    }))
  );

  return [...projectCommands, ...skillCommands];
};

/**
 * Get all available commands.
 */
export const getAllCommands = () => {
  return [...staticCommands, ...generateDynamicCommands()];
};
