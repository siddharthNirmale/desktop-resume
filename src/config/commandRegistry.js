import { 
  FolderDot, 
  TerminalSquare, 
  UserCircle, 
  Mail, 
  FileText, 
  Settings,
  Moon,
  Sun,
  Code
} from "lucide-react";
import { FiGithub } from "react-icons/fi";

import projects from "../data/project";
import skills from "../data/skills";

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
    action: (helpers) => helpers.toggleWindow("projects", "isOpen", true),
  },
  {
    id: "open-about",
    name: "About Me",
    description: "Read about my background and journey",
    category: "Apps",
    keywords: ["about", "profile", "bio", "me"],
    icon: UserCircle,
    action: (helpers) => helpers.toggleWindow("about", "isOpen", true),
  },
  {
    id: "open-terminal",
    name: "Terminal",
    description: "Open the developer terminal",
    category: "Apps",
    keywords: ["terminal", "cmd", "command", "cli", "console"],
    icon: TerminalSquare,
    action: (helpers) => helpers.toggleWindow("terminal", "isOpen", true),
  },
  {
    id: "open-contact",
    name: "Contact Me",
    description: "Get in touch or send an email",
    category: "Apps",
    keywords: ["contact", "email", "message", "hire"],
    icon: Mail,
    action: (helpers) => helpers.toggleWindow("contact", "isOpen", true),
  },
  {
    id: "open-resume",
    name: "Resume",
    description: "View my professional resume",
    category: "Apps",
    keywords: ["resume", "cv", "experience", "education"],
    icon: FileText,
    action: (helpers) => helpers.toggleWindow("resume", "isOpen", true),
  },
  {
    id: "open-notes",
    name: "Notes",
    description: "Open the notepad",
    category: "Apps",
    keywords: ["notes", "notepad", "text", "editor", "new note"],
    icon: FileText,
    action: (helpers) => helpers.toggleWindow("notepad", "isOpen", true),
  },
  {
    id: "open-github",
    name: "GitHub",
    description: "View my GitHub profile",
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
