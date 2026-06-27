import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Code, FileText, Mail, Terminal, Notebook } from "lucide-react";

// Components
import Background from "./components/Background";
import Preloader from "./components/Preloader";
import ContextMenu from "./components/ContextMenu";
import TopBar from "./components/TopBar";

// Widgets
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

function Dock({ activeTab, setActiveTab }) {
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0, id: null });
  const dockRef = useRef(null);

  const DockIcon = ({ id, icon: Icon, label, badge }) => {
    const isActive = activeTab === id;

    return (
      <div className="relative group flex flex-col items-center justify-center">
        {/* Tooltip */}
        <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-surface border border-surface-border text-text-secondary text-[10px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-lg pointer-events-none z-50 shadow-xl">
          {label}
        </span>

        <motion.button
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab(id)}
          className={`relative flex items-center justify-center w-12 h-12 rounded-2xl border transition-all duration-300 ${
            isActive 
              ? 'bg-accent/15 text-accent border-accent/20'
              : 'bg-transparent text-text-secondary border-transparent hover:bg-surface-elevated hover:text-text'
          }`}
        >
          <Icon size={20} strokeWidth={2} />
          
          {badge > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-desktop text-[10px] font-bold rounded-full flex items-center justify-center"> 
              {badge} 
            </div>
          )}
        </motion.button>
        
        {/* Active System Dot */}
        {isActive && (
          <div className="absolute -bottom-1 flex justify-center">
            <div className="rounded-full w-1 h-1 bg-accent shadow-[0_0_8px_var(--color-accent)]" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={dockRef} className="pb-4">
      {/* Dock Container using glass-panel */}
      <div className="px-3 py-3 glass-panel !rounded-3xl flex items-center gap-2 shadow-2xl backdrop-blur-xl">
        <DockIcon id="about" icon={Home} label="Home" />
        <DockIcon id="projects" icon={Code} label="Projects" />
        <DockIcon id="resume" icon={FileText} label="Resume" />
        <DockIcon id="notepad" icon={Notebook} label="Notes" />
        <DockIcon id="contact" icon={Mail} label="Contact" />
        <div className="w-[1px] h-6 bg-surface-border mx-1" />
        <DockIcon id="terminal" icon={Terminal} label="Terminal" />
      </div>
    </div>
  );
}

export default function App() {
  const [wallpaper, setWallpaper] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const desktopRef = useRef(null);

  return (
    <div
      ref={desktopRef}
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

          <main className="flex-1 w-full h-full p-6 pb-24 overflow-y-auto custom-scrollbar z-0">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
              
              {/* Left Column */}
              <div className="lg:col-span-3 flex flex-col gap-6">
                <WeatherWidget />
                <ThemeWidget setWallpaper={setWallpaper} />
                <GithubWidget />
              </div>

              {/* Center Column */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="glass-panel w-full h-full p-6 relative overflow-hidden flex flex-col">
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
                <LearningWidget progress={30} topic="Frontend" subtopic="Next.js 14" />
                <SkillsWidget />
              </div>
            </div>
          </main>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
             <Dock activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </>
      )}
    </div>
  );
}