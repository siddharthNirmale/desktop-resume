import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import useWindows from './hooks/useWindows';
import Background from './components/Background';

// System Components
import Window from './components/Window';
import Dock from './components/Dock';
import Preloader from './components/Preloader';
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
  
  // Desktop Right-Click Menu State
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0 });

  const { windows, bringToFront, toggleWindow } = useWindows([
    { id: 'about', title: 'About', isOpen: true },
    { id: 'projects', title: 'Projects', isOpen: false },
    { id: 'notepad', title: 'Notes', isOpen: false },
    { id: 'contact', title: 'Contact', isOpen: false },
    { id: 'terminal', title: 'Terminal', isOpen: false },
  ]);

  const desktopRef = useRef(null);

  // Handle Right Click on the Desktop
  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevents the default browser menu
    setMenu({ show: true, x: e.clientX, y: e.clientY });
  };

  // Close menu when clicking anywhere else
  const closeMenu = () => {
    if (menu.show) setMenu({ show: false, x: 0, y: 0 });
  };

  return (
    <div 
      ref={desktopRef} 
      onContextMenu={handleContextMenu}
      onClick={closeMenu}
      className="w-screen h-screen bg-[#050505] relative overflow-hidden font-sans text-gray-200 select-none"
    >
      <AnimatePresence>
        {isLoading && <Preloader onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Background />
          <ClockWidget />
          <GithubWidget />

          {/* 🚀 Global Context Menu Layer */}
          <AnimatePresence>
            {menu.show && (
              <ContextMenu 
                x={menu.x} 
                y={menu.y} 
                onClose={closeMenu}
                toggleWindow={toggleWindow}
                bringToFront={bringToFront}
              />
            )}
          </AnimatePresence>

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
                <div className="p-1 h-full min-h-0 bg-[#1a1a1a]">
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