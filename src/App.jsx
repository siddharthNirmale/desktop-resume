import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Home, Code, FileText, Mail, Terminal, Notebook } from "lucide-react";

// Components
import Background from "./components/Background";
import Preloader from "./components/Preloader";
import ContextMenu from "./components/ContextMenu";
import TopBar from "./components/TopBar";
import Window from "./components/Window"; // Your new Window component

// Widgets (Dashboard)
import ClockWidget from "./components/ClockWidget";
import GithubWidget from "./components/GithubWidget";
import LearningWidget from "./components/LearningWidget";
import WeatherWidget from "./components/WeatherWidget";
import ThemeWidget from "./components/ThemeWidget";
import SkillsWidget from "./components/SkillsWidget";

// Sections
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import Notepad from "./sections/Notepad";
import ContactSection from "./sections/ContactSection";
import ResumeSection from "./sections/ResumeSection";
import TerminalSection from "./sections/Terminal";

export default function App() {
  const [wallpaper, setWallpaper] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0 });
  const desktopRef = useRef(null);
  
  // Window System State
  const [windows, setWindows] = useState([]);
  const [highestZ, setHighestZ] = useState(10);

  const openWindow = (id, title, component) => {
    if (!windows.find(w => w.id === id)) {
      setWindows([...windows, { id, title, component, isMinimized: false, zIndex: highestZ + 1 }]);
      setHighestZ(prev => prev + 1);
    } else {
      // If already open, just bring to front
      bringToFront(id);
    }
  };

  const closeWindow = (id) => setWindows(windows.filter(w => w.id !== id));
  
  const minimizeWindow = (id) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const bringToFront = (id) => {
    setHighestZ(prev => prev + 1);
    setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: highestZ + 1 } : w));
  };

  return (
    <div
      ref={desktopRef}
      onContextMenu={(e) => { e.preventDefault(); setMenu({ show: true, x: e.clientX, y: e.clientY }); }}
      onClick={() => setMenu({ show: false, x: 0, y: 0 })}
      className="w-screen h-screen relative overflow-hidden text-text bg-desktop select-none transition-all duration-700 flex flex-col"
      style={{
        backgroundImage: wallpaper ? `url(${wallpaper})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <AnimatePresence>
        {isLoading && <Preloader onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <TopBar />
          {!wallpaper && <Background />}

          {/* DASHBOARD LAYER (Behind windows) */}
          <main className="flex-1 w-full h-full p-6 pb-24 overflow-y-auto custom-scrollbar z-0">
             <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-full pointer-events-none">
              <div className="lg:col-span-3 flex flex-col gap-6 pointer-events-auto">
                <WeatherWidget />
                <ThemeWidget setWallpaper={setWallpaper} />
                <GithubWidget />
              </div>
              <div className="lg:col-span-6" /> {/* Spacer */}
              <div className="lg:col-span-3 flex flex-col gap-6 pointer-events-auto">
                <ClockWidget />
                <LearningWidget progress={30} topic="Frontend" subtopic="Next.js 14" />
                <SkillsWidget />
              </div>
            </div>
          </main>

          {/* WINDOWS LAYER */}
          <AnimatePresence>
            {windows.map((win) => (
              <Window
                key={win.id}
                id={win.id}
                title={win.title}
                isMinimized={win.isMinimized}
                zIndex={win.zIndex}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onFocus={() => bringToFront(win.id)}
                constraintsRef={desktopRef}
              >
                {win.component}
              </Window>
            ))}
          </AnimatePresence>

          {/* DOCK */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div className="px-3 py-3 glass-panel !rounded-3xl flex items-center gap-2 shadow-2xl backdrop-blur-xl">
              <DockItem icon={Home} label="About" onClick={() => openWindow('about', 'About Me', <AboutSection />)} />
              <DockItem icon={Code} label="Projects" onClick={() => openWindow('projects', 'My Projects', <ProjectsSection />)} />
              <DockItem icon={FileText} label="Resume" onClick={() => openWindow('resume', 'Resume', <ResumeSection />)} />
              <DockItem icon={Notebook} label="Notes" onClick={() => openWindow('notepad', 'Notepad', <Notepad />)} />
              <DockItem icon={Mail} label="Contact" onClick={() => openWindow('contact', 'Contact Me', <ContactSection />)} />
              <div className="w-[1px] h-6 bg-surface-border mx-1" />
              <DockItem icon={Terminal} label="Terminal" onClick={() => openWindow('terminal', 'Terminal', <TerminalSection />)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Helper component for cleaner Dock code
function DockItem({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center justify-center w-12 h-12 rounded-2xl border border-transparent hover:bg-surface-elevated text-text-secondary hover:text-text transition-all"
    >
      <Icon size={20} strokeWidth={2} />
      <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-surface border border-surface-border text-text-secondary text-[10px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-lg pointer-events-none shadow-xl">
        {label}
      </span>
    </button>
  );
}