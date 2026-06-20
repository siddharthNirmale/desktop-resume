import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import useWindows from './hooks/useWindows';
import Background from './components/Background';

// System Components
import Window from './components/Window';
import Dock from './components/Dock';
import Preloader from './components/Preloader'; // 🚀 New Preloader
import ContextMenu from './components/ContextMenu';

// Desktop Widgets
import ClockWidget from './components/ClockWidget';
import GithubWidget from './components/GithubWidget';

// App Sections
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import Notepad from './sections/Notepad';
import ContactSection from './sections/ContactSection';
import Terminal from './sections/Terminal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { windows, bringToFront, toggleWindow } = useWindows([
    { id: 'about', title: 'About', isOpen: true },
    { id: 'projects', title: 'Projects', isOpen: false },
    { id: 'notepad', title: 'Notes', isOpen: false },
    { id: 'contact', title: 'Contact', isOpen: false },
    { id: 'terminal', title: 'Terminal', isOpen: false },
  ]);

  const desktopRef = useRef(null);

  return (
    <div 
      ref={desktopRef} 
      className="w-screen h-screen bg-[#050505] relative overflow-hidden font-sans text-gray-200 select-none"
    >
      {/* 🚀 Preloader Entry */}
      <AnimatePresence>
        {isLoading && <Preloader onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Desktop Interface - Only renders after preloader finishes */}
      {!isLoading && (
        <>
          <Background />
          <ClockWidget  />
          <GithubWidget />

          <AnimatePresence>
            {windows.map(win => win.isOpen && (
              <Window
                key={win.id}
                {...win}
                constraintsRef={desktopRef}
                onClose={() => toggleWindow(win.id, 'isOpen', false)}
                onMinimize={() => toggleWindow(win.id, 'isMinimized', true)}
                onFocus={() => bringToFront(win.id)}
              >
                {/* Content Container with standard padding */}
                <div className="p-6 h-full min-h-0">
                  {win.id === 'about' && <AboutSection />}
                  {win.id === 'projects' && <ProjectsSection />}
                  {win.id === 'notepad' && <Notepad />}
                  {win.id === 'contact' && <ContactSection />}
                  {win.id === 'terminal' && <Terminal />}
                </div>
              </Window>
            ))}
          </AnimatePresence>

          <Dock 
            windows={windows} 
            toggleWindow={toggleWindow} 
            bringToFront={bringToFront} 
          />
        </>
      )}
    </div>
  );
}