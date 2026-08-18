# Siddharth Nirmale — Interactive Developer Portfolio

A modern interactive developer portfolio built as a browser-based desktop environment using React, Vite, Tailwind CSS, Framer Motion, GSAP, and Three.js.

## Overview

This project is an interactive developer portfolio and resume website designed as a desktop operating environment.

Instead of presenting a traditional portfolio with static sections, the website transforms the entire portfolio into an interactive workspace where visitors can explore projects, skills, experience, resume, contact information, notes, terminal commands, widgets, and other content through a desktop-style interface.

The project focuses on combining:
- Modern frontend engineering
- Interactive UI design
- Motion design
- Desktop-style interaction patterns
- Responsive web architecture
- Component-driven React development
- Performance-conscious animations
- Accessible information architecture
- Creative portfolio presentation

The goal is simple: **Make a developer portfolio feel like a product rather than a webpage.**

## Live Demo

- **Portfolio:** [https://siddharthn-portfolio.vercel.app/](https://siddharthn-portfolio.vercel.app/)
- **Source Code:** [https://github.com/siddharthNirmale/desktop-resume](https://github.com/siddharthNirmale/desktop-resume)

## Why This Portfolio Is Different

Most developer portfolios follow the same structure:
`Hero` > `About` > `Skills` > `Projects` > `Experience` > `Contact`

This project takes a different approach. The portfolio behaves more like an interactive desktop environment:

```text
Desktop
├── Applications
├── Windows
├── Widgets
├── Dock
├── Command Palette
├── Context Menu
├── Terminal
├── Projects
├── Resume
├── Notes
├── Contact
└── System-style interactions
```

Visitors can interact with the portfolio rather than simply scrolling through it.

## Core Features

### Interactive Desktop Environment
A complete browser-based desktop interface with:
- Window management
- Window focus and z-index handling
- Minimize and close interactions
- Desktop workspace
- Dock navigation
- Top navigation
- Context menu
- Responsive desktop/mobile environments
- Animated application transitions

The interface is managed through reusable React components and custom hooks instead of relying on a traditional page-router architecture.

### Command Palette
A global command interface provides fast navigation and interaction.
- **Shortcut:** `Ctrl + K` or `Cmd + K`

The command palette allows users to quickly discover and launch available portfolio applications and actions. This creates a fast keyboard-first navigation experience for power users.

### Interactive Terminal
The portfolio includes a functional terminal-style interface. Visitors can use commands to explore information such as:
`whoami`, `projects`, `skills`, `clear`

The terminal acts as an alternative navigation layer for users who prefer keyboard-driven interfaces.

### Project Explorer
The Projects application provides an interactive way to browse development work. Features include:
- Project grid and list views
- Technology filtering
- Project previews
- GitHub links
- Live project links
- Animated interactions
- Project metadata
- Responsive layouts

Projects are driven from centralized data rather than being hardcoded directly into the UI.

### Resume Application
A dedicated resume experience allows visitors to explore professional information without leaving the portfolio environment. The project also includes the downloadable resume asset.

### About Section
The About application provides a dedicated space for:
- Developer profile
- Technical background
- Skills
- Experience
- Education
- Personal information
- Developer-focused content

### Contact Hub
The Contact application acts as a centralized communication hub. It supports actions such as:
- Email
- Phone
- GitHub
- LinkedIn
- Location
- Copy-to-clipboard interactions
- Direct communication actions

The interface is designed around quick actions rather than a conventional static contact form.

### Notes Application
The portfolio includes a multi-note workspace. Notes support:
- Multiple notes
- Creating and editing notes
- Searching notes
- Pinning notes
- Deleting notes
- Persistent local storage
- Created/updated timestamps
- Keyboard shortcuts
- Local-first data persistence

Notes are stored locally in the browser, making the feature usable without a backend.

### Dynamic Widgets
The desktop environment contains reusable widgets for contextual information. Current widgets include:
- Clock
- Weather
- GitHub activity
- Skills
- Learning information
- Theme controls
- Other desktop utilities

Widgets are implemented as modular React components so they can be independently developed and extended.

### Responsive Architecture
The application does not simply shrink the desktop UI on smaller screens. Instead, it uses separate rendering environments:

```text
Desktop
└── DesktopDisplay

Mobile / Small Screens
└── SmallDisplay
```

This allows the interface to adapt its interaction model to different screen sizes. The result is a portfolio that works across Desktop, Laptop, Tablet, and Mobile.

### Context Menu
The desktop supports a custom context menu system. Right-click interactions can expose portfolio actions and system-style functionality while preserving the normal browser experience where appropriate.

### Theme System
The interface supports light and dark visual environments with centralized styling and reusable theme-aware components. The goal is to maintain visual consistency across Windows, Widgets, Applications, Navigation, Menus, and Interactive elements.

### Motion and Micro-Interactions
Motion is an important part of the experience rather than decorative animation. The project uses:
- Framer Motion
- Motion
- GSAP
- React Three Fiber
- Three.js
- Lenis

Animations are used for Window transitions, Application opening/closing, Hover states, Navigation, Preloader, Micro-interactions, Desktop interactions, and Visual feedback.

## Technology Stack

### Frontend
| Technology | Purpose |
| :--- | :--- |
| **React 19** | UI architecture |
| **Vite** | Development and production tooling |
| **Tailwind CSS 4** | Styling |
| **JavaScript / JSX** | Application development |

### Animation
| Technology | Purpose |
| :--- | :--- |
| **Framer Motion** | UI transitions and interactions |
| **Motion** | Motion primitives |
| **GSAP** | Advanced animation |
| **Lenis** | Smooth scrolling |
| **React Three Fiber** | 3D rendering |
| **Three.js** | WebGL / 3D graphics |

### UI and Icons
| Technology | Purpose |
| :--- | :--- |
| **Lucide React** | Interface icons |
| **React Icons** | Icon ecosystem |
| **Hugeicons React** | Additional iconography |
| **@liquidglass/react** | Visual UI effects |
| **Tailwind Merge** | Tailwind class composition |
| **clsx** | Conditional classes |

### Data and Utilities
| Library | Purpose |
| :--- | :--- |
| **React GitHub Calendar** | GitHub contribution visualization |
| **React CountUp** | Animated statistics |
| **React Parallax Tilt** | Interactive visual effects |
| **React Tweet** | Embedded social content |

## Architecture

The project follows a modular component-based architecture.

```text
desktop-resume/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Background
│   │   ├── ClockWidget
│   │   ├── CommandPalette
│   │   ├── ContextMenu
│   │   ├── Dock
│   │   ├── GithubWidget
│   │   ├── LearningWidget
│   │   ├── Preloader
│   │   ├── SkillsWidget
│   │   ├── ThemeWidget
│   │   ├── TopBar
│   │   ├── WeatherWidget
│   │   ├── WidgetCover
│   │   └── Window
│   ├── config/
│   │   ├── commandRegistry
│   │   ├── componentRegistry
│   │   └── windowsConfig
│   ├── data/
│   │   ├── project
│   │   ├── resume
│   │   └── skills
│   ├── hooks/
│   │   ├── useCommandSearch
│   │   ├── useContextMenu
│   │   ├── useIsMobile
│   │   └── useWindows
│   ├── lib/
│   │   └── motion
│   ├── mode/
│   │   ├── DesktopDisplay
│   │   └── SmallDisplay
│   ├── sections/
│   │   ├── AboutSection
│   │   ├── ContactSection
│   │   ├── FluidGlassSection
│   │   ├── Notepad
│   │   ├── ProjectsSection
│   │   ├── ResumeSection
│   │   └── Terminal
│   ├── utils/
│   │   ├── iconMap
│   │   └── imageUtils
│   ├── App.jsx
│   ├── App.css
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

### Application Architecture

The application is built around a centralized window-management system.

```text
App
├── useIsMobile
├── useContextMenu
├── useWindows
├── Preloader
├── DesktopDisplay
│   ├── TopBar
│   ├── Desktop
│   │   ├── Widgets
│   │   ├── Dock
│   │   ├── ContextMenu
│   │   └── Windows
└── SmallDisplay
    └── CommandPalette
```

Instead of creating independent pages for every portfolio section, applications are represented as manageable desktop windows. This architecture makes it easier to Open applications dynamically, Track active windows, Manage focus, Control z-index, Add new applications, Reuse window behavior, and Maintain a consistent interaction model.

### State Management
The project uses custom React hooks for application state rather than introducing unnecessary global state management. Important state abstractions include `useWindows`, `useContextMenu`, `useCommandSearch`, and `useIsMobile`. This keeps application behavior separated from presentation while avoiding unnecessary architectural complexity.

### Data-Driven Content
Portfolio information is separated from presentation.
```text
src/data/
├── project.js
├── resume.js
└── skills.js
```
This allows content to be updated without rewriting the UI components. For example, projects can be added or modified through centralized project data rather than duplicating markup throughout the application.

### Performance Considerations
The project is designed around modern frontend performance practices. Key considerations include:
- Vite production bundling
- Component-based rendering
- Centralized configuration
- Responsive rendering modes
- Reusable components
- Local state management
- Lazy interaction patterns
- Controlled animation
- CSS utility classes
- Avoidance of unnecessary routing complexity

Animations are used where they contribute to interaction and visual feedback rather than being added purely for decoration.

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + K` / `Cmd + K` | Open Command Palette |
| `Ctrl + L` | Clear Terminal |
| `Esc` | Close active overlays / menus |
| `Arrow Keys` | Navigate supported interfaces |

Keyboard interactions may vary depending on the active application.

## Getting Started

### Requirements
Before running the project locally, install:
- Node.js 18 or newer
- npm, pnpm, or another compatible package manager
- A modern Chromium, Firefox, or Safari-based browser

### 1. Clone the Repository
```bash
git clone https://github.com/siddharthNirmale/desktop-resume.git
cd desktop-resume
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The development server will start at: `http://localhost:5173`

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

## Production Deployment
The project is a Vite-powered React application and can be deployed to modern static hosting platforms. Recommended deployment options include Vercel, Netlify, Cloudflare Pages, GitHub Pages, or Any static hosting provider supporting Vite builds.

For production deployment, run `npm run build` and deploy the generated `dist` directory.

## SEO
The project is intentionally positioned around several high-value developer portfolio and frontend development search terms.

**Primary Keywords:** React developer portfolio, Interactive developer portfolio, Frontend developer portfolio, React portfolio website, Interactive resume website, Developer resume website, Modern React portfolio, Creative developer portfolio, Desktop portfolio website, Interactive resume, React desktop UI, React desktop portfolio, Frontend portfolio website.

**Technical Keywords:** React 19, Vite, Vite React, Tailwind CSS 4, Framer Motion, GSAP, Three.js, React Three Fiber, Lenis, JavaScript, Frontend development, Responsive React website, Modern frontend architecture, Component based React application.

**Search Intent:** The project is designed to demonstrate practical frontend engineering through an interactive product-like experience rather than a conventional static portfolio. It demonstrates React architecture, Responsive design, UI engineering, Motion design, State management, Component architecture, Interactive web applications, Modern CSS, and Performance-conscious frontend development.

## Design Philosophy

The interface follows a product-oriented design philosophy:
> **Design like an artist. Code like a professional. Think like a product designer. Build like an engineer.**

The design prioritizes Clear visual hierarchy, Intentional whitespace, Responsive composition, Functional interactions, Consistent typography, Purposeful animation, Minimal visual noise, Reusable components, and Maintainable code.

The goal is not to recreate a traditional operating system perfectly. The goal is to use the mental model of a desktop environment to create a memorable developer portfolio.

## What This Project Demonstrates
This portfolio is also a practical demonstration of modern frontend development concepts.
- **React:** Component architecture, Custom hooks, State management, Conditional rendering, Data-driven UI, Responsive rendering.
- **UI Engineering:** Window systems, Context menus, Command palettes, Responsive layouts, Interactive widgets, Keyboard navigation, Application-like interfaces.
- **Motion Design:** Enter/exit animations, Micro-interactions, Transitions, Gesture-based interactions, Advanced animation timelines, 3D experiences.
- **Software Architecture:** Separation of concerns, Centralized configuration, Reusable components, Modular hooks, Data-driven content, Maintainable project structure.

## Customization
You can adapt the project into your own interactive portfolio by modifying the centralized data files:
`src/data/project.js`, `src/data/skills.js`, `src/data/resume.js`

You can also customize the desktop environment through:
`src/config/windowsConfig.js`, `src/config/commandRegistry.js`, `src/config/componentRegistry.js`

This separation makes the project suitable as a starting point for developers who want to build their own interactive portfolio experience.

## Future Improvements
Potential future additions include:
- Progressive Web App support
- Offline-first functionality
- More desktop applications
- Custom wallpaper manager
- Persistent desktop layouts
- Advanced accessibility support
- Improved command system
- More interactive widgets
- Application search
- Drag-and-drop desktop organization
- Customizable desktop preferences
- More WebGL experiences
- Performance profiling and optimization

## Contributing
Contributions, ideas, improvements, and experiments are welcome. If you want to propose a change:
```bash
git fork
git clone
git checkout -b feature/your-feature
```
Make your changes, test the application, and open a pull request. For significant architectural changes, open an issue first so the approach can be discussed.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Author
**Siddharth Nirmale**
Frontend / Full-Stack Developer focused on building interactive, modern, and user-centered web experiences.
- **Portfolio:** [https://siddharthn-portfolio.vercel.app/](https://siddharthn-portfolio.vercel.app/)
- **GitHub:** [https://github.com/siddharthNirmale](https://github.com/siddharthNirmale)

## Final Note
This project started with a simple idea: *What if a developer portfolio behaved like an application instead of a document?*

The result is an interactive desktop environment where the portfolio itself becomes part of the experience. Explore the desktop, open the applications, try the terminal, browse the projects, inspect the resume, and interact with the interface.

**The portfolio is the product.**
