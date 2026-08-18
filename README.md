# Siddharth Nirmale — Interactive Desktop Portfolio

<div align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-purple?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-black?style=for-the-badge&logo=framer" alt="Framer Motion" />
</div>

<br />

A highly interactive, OS-styled personal portfolio and resume built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. It provides a unique desktop-like experience complete with draggable windows, a command palette, context menus, and a fully functional terminal.

## ✨ Features

- **🖥️ OS-Inspired Interface:** Advanced window management system with minimize, close, and z-index ordering.
- **⚡ Command Palette:** Quick navigation and executing actions via a global search interface (triggered via `Cmd+K` / `Ctrl+K`).
- **👨‍💻 Interactive Terminal:** A fully functional shell to explore the portfolio (`whoami`, `projects`, `skills`, `clear`).
- **📱 Responsive Modes:** Dedicated rendering architectures for Desktop (`DesktopDisplay`) and Mobile (`SmallDisplay`) environments.
- **🖱️ Custom Context Menu:** Custom right-click behavior for system-level actions and quick links.
- **🧩 Dynamic Widgets:** Home screen widgets including Clock, GitHub Activity, Skills, Weather, and Theme toggles.
- **💼 Projects App:** Explore work through advanced Grid/List views, technology filtering, and animated previews.
- **🌊 Fluid Animations:** Immersive micro-interactions and transitions powered by Framer Motion, GSAP, and React Three Fiber.

## 🛠️ Technology Stack

**Core**
- [React](https://react.dev/) (v19)
- [Vite](https://vitejs.dev/)

**Styling & UI**
- [Tailwind CSS](https://tailwindcss.com/) (v4)
- `clsx` & `tailwind-merge`

**Animation & 3D**
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://gsap.com/)
- [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) & Three.js
- [Lenis](https://lenis.studiofreight.com/) (Smooth Scrolling)

**Icons & Utilities**
- Lucide React, Hugeicons React, React Icons
- React GitHub Calendar
- React CountUp

## 🏗️ Architecture & Project Structure

The project avoids React Router, instead managing "Apps" as stateful windows within a desktop environment context (`useWindows` hook).

```text
desktop-resume/
├── src/
│   ├── components/      # Global UI components (Dock, Window, Widgets, CommandPalette)
│   ├── data/            # Static portfolio content (projects.js, skills.js, resume.js)
│   ├── hooks/           # Custom React hooks (useWindows, useCommandSearch, useContextMenu)
│   ├── mode/            # Responsive environments (DesktopDisplay, SmallDisplay)
│   ├── sections/        # App window contents (About, Terminal, Projects, Contact)
│   ├── utils/           # Helper functions and utilities
│   ├── App.jsx          # Main application entry point & state provider
│   └── index.css        # Global styles and Tailwind configuration
├── public/              # Static assets and icons
├── vite.config.js       # Vite build configuration
└── package.json         # Dependencies and project metadata
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `pnpm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/siddharthNirmale/desktop-resume.git
   cd desktop-resume
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

### Build for Production

To create an optimized production build:
```bash
npm run build
```
You can preview the built files locally with:
```bash
npm run preview
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Cmd/Ctrl + K` | Open Command Palette |
| `Cmd/Ctrl + L` | Clear Terminal (when focused) |
| `Esc` | Close Command Palette / Deselect items |
| `Arrow Keys` | Navigate Command Palette / Terminal History / Projects |

## 🚀 SEO & Discoverability

This project serves as a showcase for modern frontend development techniques, specifically targeting:
`React Developer Portfolio`, `Interactive Resume`, `Desktop UI Web App`, `Framer Motion Portfolio`, `Tailwind CSS`, `Frontend Developer Portfolio`.

## 📄 License

This project is open-sourced under the MIT License.
