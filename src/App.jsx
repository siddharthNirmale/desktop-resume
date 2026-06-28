import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Code, FileText, Mail, Terminal, Notebook } from "lucide-react";

// System Components
import Background from "./components/Background";
import Preloader from "./components/Preloader";
import ContextMenu from "./components/ContextMenu";
import TopBar from "./components/TopBar";

// Desktop Widgets
import ClockWidget from "./components/ClockWidget";
import GithubWidget from "./components/GithubWidget";
import LearningWidget from "./components/LearningWidget";
import WeatherWidget from "./components/WeatherWidget";
import ThemeWidget from "./components/ThemeWidget";
import SkillsWidget from "./components/SkillsWidget";

// App Sections
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import Notepad from "./sections/Notepad";
import ContactSection from "./sections/ContactSection";
import ResumeSection from "./sections/ResumeSection";
// Renamed the import to TerminalSection to avoid conflicting with the Lucide 'Terminal' icon
import TerminalSection from "./sections/Terminal"; 


/* =========================================================================
   DOCK COMPONENT
   (Moved into this file to keep everything centralized and avoid passing
   complex window states between files)
========================================================================= */
function Dock({ activeTab, setActiveTab }) {
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0, id: null });
  const dockRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dockRef.current && !dockRef.current.contains(e.target)) setMenu(prev => ({ ...prev, show: false }));
    };
    if (menu.show) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menu.show]);

  const DockIcon = ({ id, icon: Icon, label, badge }) => {
    const isActive = activeTab === id;

    return (
      <div className="relative group flex flex-col items-center justify-center">
        {/* Tooltip */}
        <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-surface border border-surface-border text-text-secondary text-micro font-medium uppercase tracking-super-wide px-3 py-1.5 rounded-lg pointer-events-none z-50 shadow-xl">
          {label}
        </span>

        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab(id)}
          onContextMenu={(e) => { e.preventDefault(); setMenu({ show: true, x: e.clientX, y: e.clientY - 150, id }); }}
          className={`relative flex items-center justify-center w-[46px] h-[46px] rounded-xl border transition-all duration-300 ${
            isActive 
              ? 'bg-[rgba(10,132,255,0.15)] text-[#0A84FF] border-[rgba(10,132,255,0.2)]'
              : 'bg-transparent text-text-secondary border-transparent hover:bg-surface-elevated hover:text-text'
          }`}
        >
          <Icon size={20} strokeWidth={2.5} className="transition-colors duration-300" />
          
          {badge > 0 && (
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#0A84FF] text-[#0B0E14] text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-surface-dark"> 
              {badge} 
            </div>
          )}
        </motion.button>
        
        {/* Active System Dot */}
        {isActive && (
          <div className="absolute -bottom-2 flex justify-center">
            <div className="rounded-full transition-all w-1.5 h-1.5 bg-[#0A84FF] shadow-[0_0_8px_#0A84FF]" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={dockRef} className="pb-2">
      <div className="px-3 py-2.5 bg-surface-dark border border-surface-border rounded-2xl flex items-center gap-2 shadow-2xl font-primary backdrop-blur-md">
        <DockIcon id="about" icon={Home} label="Home" />
        <DockIcon id="projects" icon={Code} label="Projects"  />
        <DockIcon id="resume" icon={FileText} label="Resume" />
        <DockIcon id="notepad" icon={Notebook} label="Notes" />
        <DockIcon id="contact" icon={Mail} label="Contact"  />
        
        <div className="w-[1px] h-6 bg-surface-border rounded-full mx-1" />
        
        <DockIcon id="terminal" icon={Terminal} label="Terminal" />
      </div>
    </div>
  );
}


/* =========================================================================
   MAIN APP COMPONENT
========================================================================= */
export default function App() {
  const [wallpaper, setWallpaper] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0 });
  
  // This replaces the complex `useWindows` logic! 
  // We simply track which tab is currently active.
  const [activeTab, setActiveTab] = useState("about");

  const desktopRef = useRef(null);

  const { windows, bringToFront, toggleWindow } = useWindows([
    { id: "about", title: "About", isOpen: true, type: "window", defaultWidth: 550, defaultHeight: 450 },
    { id: "projects", title: "Projects", isOpen: false, type: "window", defaultWidth: 800, defaultHeight: 600 },
    { id: "notepad", title: "Notes", isOpen: false, type: "window", defaultWidth: 500, defaultHeight: 600 },
    { id: "contact", title: "Contact", isOpen: false, type: "window", defaultWidth: 450, defaultHeight: 600 },
    { id: "terminal", title: "Terminal", isOpen: false, type: "window", defaultWidth: 650, defaultHeight: 600 },
    { id: "resume", title: "Resume", isOpen: false, type: "window", defaultWidth: 700, defaultHeight: 600 },

    { id: "clock", title: "Local Time", isOpen: true, type: "widget" },
    { id: "github", title: "Contributions", isOpen: true, type: "widget" },
    { id: "learning", title: "Learning", isOpen: true, type: "widget" },
    { id: "weather", title: "Weather", isOpen: true, type: "widget" },
    { id: "theme", title: "Appearance", isOpen: true, type: "widget" },
    { id: "skills", title: "Skills", isOpen: true, type: "widget" },
  ]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenu({ show: true, x: e.clientX, y: e.clientY });
  };

  const closeMenu = () => {
    if (menu.show) setMenu({ show: false, x: 0, y: 0 });
  };

  return (
    <div
      ref={desktopRef}
      onContextMenu={handleContextMenu}
      onClick={closeMenu}
      className="w-screen h-screen relative overflow-hidden font-primary text-text bg-desktop select-none transition-all duration-700 flex flex-col"
      style={{
        backgroundImage: wallpaper ? `url(${wallpaper})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <AnimatePresence>
        {isLoading && (
          <Preloader onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <TopBar />

          {!wallpaper && <Background />}

          <AnimatePresence>
            {menu.show && (
              <ContextMenu
                x={menu.x}
                y={menu.y}
                onClose={closeMenu}
                // Redirect context menu commands to our new tab system
                toggleWindow={(id) => setActiveTab(id)} 
                bringToFront={() => {}} 
              />
            )}
          </AnimatePresence>

          {/* Main Bento Box Dashboard Layout */}
          <main className="flex-1 w-full h-full p-6 pb-24 overflow-y-auto custom-scrollbar z-0">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
              
              {/* Left Column */}
              <div className="lg:col-span-3 flex flex-col gap-6">
                <WeatherWidget />
                <ThemeWidget setWallpaper={setWallpaper} />
                <GithubWidget />
              </div>

              {/* Center Column (DYNAMIC VIEWPORT) */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="glass-panel w-full h-full p-6 relative overflow-hidden flex flex-col">
                  {/* Framer motion handles smooth cross-fading when you switch tabs */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full overflow-y-auto custom-scrollbar pr-2"
                    >
                      {activeTab === "about" && <AboutSection />}
                      {activeTab === "projects" && <ProjectsSection />}
                      {activeTab === "resume" && <ResumeSection />}
                      {activeTab === "notepad" && <Notepad />}
                      {activeTab === "contact" && <ContactSection />}
                      {activeTab === "terminal" && <TerminalSection />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-3 flex flex-col gap-6">
                <ClockWidget />
                <LearningWidget
                  progress={30}
                  topic="Frontend Development"
                  subtopic="Next.js 14"
                />
                <SkillsWidget />
              </div>

            </div>
          </main>

          {/* Fixed Bottom Dock */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50">
             <Dock activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </>
      )}
    </div>
  );
}
