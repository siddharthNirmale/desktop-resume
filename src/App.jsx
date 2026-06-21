import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import useWindows from './hooks/useWindows';
import Background from './components/Background';

// System Components
import Window from './components/Window';
import Dock from './components/Dock';
import Preloader from './components/Preloader';
import ContextMenu from './components/ContextMenu';
import TopBar from './components/TopBar';

// Desktop Widgets
import ClockWidget from './components/ClockWidget';
import GithubWidget from './components/GithubWidget';
import LearningWidget from './components/LearningWidget';
import WeatherWidget from './components/WeatherWidget';
import ThemeWidget from './components/ThemeWidget';

// App Sections
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import Notepad from './sections/Notepad';
import ContactSection from './sections/ContactSection';
import Terminal from './sections/Terminal';
import ResumeSection from './sections/ResumeSection';

export default function App() {
  const [wallpaper, setWallpaper] = useState(''); // Default: empty (uses Background component)
  const [isLoading, setIsLoading] = useState(true);
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0 });
  const desktopRef = useRef(null);

  const { windows, bringToFront, toggleWindow } = useWindows([
    { id: 'about', title: 'About', isOpen: false, type: 'window', defaultWidth: 550, defaultHeight: 450 },
    { id: 'projects', title: 'Projects', isOpen: false, type: 'window', defaultWidth: 800, defaultHeight: 600 },
    { id: 'notepad', title: 'Notes', isOpen: false, type: 'window', defaultWidth: 500, defaultHeight: 600 },
    { id: 'contact', title: 'Contact', isOpen: false, type: 'window', defaultWidth: 450, defaultHeight: 600 },
    { id: 'terminal', title: 'Terminal', isOpen: false, type: 'window', defaultWidth: 650, defaultHeight: 600 },
    { id: 'clock', title: 'Local Time', isOpen: true, type: 'widget' },
    { id: 'github', title: 'Contributions', isOpen: true, type: 'widget' },
    { id: 'learning', title: 'Learning', isOpen: true, type: 'widget' },
    { id: 'weather', title: 'Weather', isOpen: true, type: 'widget' },
    { id: 'theme', title: 'Appearance', isOpen: true, type: 'widget' },
    { id: 'resume', title: 'Resume', isOpen: true, type: 'window', defaultWidth: 700, defaultHeight: 600 }
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
      className="w-screen h-screen bg-[#050505] transition-all duration-700 relative overflow-hidden font-sans text-gray-200 select-none"
      style={{ 
        backgroundImage: wallpaper ? `url(${wallpaper})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <AnimatePresence>
        {isLoading && <Preloader onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <TopBar />
          
          {/* Only render Background dots if no custom wallpaper is set */}
          {!wallpaper && <Background />}

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

          {/* Widgets Layer */}
          {windows.filter(w => w.type === 'widget' && w.isOpen).map(widget => (
            <div key={widget.id}>
              {widget.id === 'clock' && <ClockWidget constraintsRef={desktopRef} zIndex={widget.zIndex || 1} onFocus={() => bringToFront(widget.id)} />}
              {widget.id === 'github' && <GithubWidget constraintsRef={desktopRef} zIndex={widget.zIndex || 1} onFocus={() => bringToFront(widget.id)} />}
              {widget.id === 'learning' && <LearningWidget constraintsRef={desktopRef} zIndex={widget.zIndex || 1} onFocus={() => bringToFront(widget.id)} progress={55} topic="Frontend Optimization" subtopic="Next.js 14" />}
              {widget.id === 'weather' && <WeatherWidget constraintsRef={desktopRef} zIndex={widget.zIndex || 1} onFocus={() => bringToFront(widget.id)} />}
              
              {widget.id === 'theme' && (
                <ThemeWidget 
                  constraintsRef={desktopRef} 
                  zIndex={widget.zIndex || 1} 
                  onFocus={() => bringToFront(widget.id)} 
                  setWallpaper={setWallpaper}
                />
              )}
            </div>
          ))}

          {/* Windows Layer */}
          <AnimatePresence>
            {windows.filter(w => w.type === 'window' && w.isOpen).map(win => (
              <Window
                key={win.id}
                {...win}
                constraintsRef={desktopRef}
                onClose={() => toggleWindow(win.id, 'isOpen', false)}
                onMinimize={() => toggleWindow(win.id, 'isMinimized', true)}
                onFocus={() => bringToFront(win.id)}
              >
                <div className="w-full h-full min-h-0 bg-[#1a1a1a]">
                  {win.id === 'about' && <AboutSection />}
                  {win.id === 'projects' && <ProjectsSection />}
                  {win.id === 'resume' && <ResumeSection />}
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