import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import useWindows from './hooks/useWindows';
import Window from './components/Window';
import Dock from './components/Dock';
import ContextMenu from './components/ContextMenu'; // 1. Import it here
// ... (import your sections)
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import Notepad from './sections/Notepad';
import ContactSection from './sections/ContactSection';
import Terminal from './sections/Terminal';

export default function App() {
  const { windows, bringToFront, toggleWindow } = useWindows([
    { id: 'about', title: 'About', isOpen: true, isMinimized: false, zIndex: 2 },
    { id: 'projects', title: 'Projects', isOpen: false, isMinimized: false, zIndex: 1 },
    { id: 'notepad', title: 'Notes', isOpen: false, isMinimized: false, zIndex: 1 },
    { id: 'contact', title: 'Contact', isOpen: false, isMinimized: false, zIndex: 1 },
    { id: 'terminal', title: 'Terminal', isOpen: false, isMinimized: false, zIndex: 1 },
  ]);

  const desktopRef = useRef(null);
  
  // 2. Add state for the context menu
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });

  // 3. The Right-Click Hijacker
  const handleContextMenu = (e) => {
    e.preventDefault(); // Stop the normal browser menu from appearing
    
    // Check if the menu would go off the bottom/right edges of the screen
    // We adjust the position so it always opens inwards
    const x = e.pageX + 224 > window.innerWidth ? window.innerWidth - 224 : e.pageX;
    const y = e.pageY + 150 > window.innerHeight ? window.innerHeight - 150 : e.pageY;
    
    setContextMenu({ show: true, x, y });
  };

  return (
    <div 
      ref={desktopRef} 
      onContextMenu={handleContextMenu} // 4. Attach it to the main wrapper
      className="w-screen h-screen bg-[#050505] relative overflow-hidden flex flex-col font-sans text-gray-200 select-none"
    >
      {/* 5. Drop the Context Menu into the UI */}
      <ContextMenu 
        show={contextMenu.show} 
        x={contextMenu.x} 
        y={contextMenu.y} 
        onClose={() => setContextMenu({ ...contextMenu, show: false })}
        onOpenApp={(id) => toggleWindow(id, 'isOpen', true)}
      />

      <div className="flex-1 relative p-6">
        <AnimatePresence>
          {windows.map(win => 
            win.isOpen && (
            <Window
              key={win.id}
              {...win}
              constraintsRef={desktopRef}
              onClose={() => toggleWindow(win.id, 'isOpen', false)}
              onMinimize={() => toggleWindow(win.id, 'isMinimized', true)}
              onFocus={() => bringToFront(win.id)}
            >
              {/* Keep all your section routing exactly the same here */}
              {win.id === 'about' && ( /* ... */ <div/> )}
              {win.id === 'projects' && <ProjectsSection />}
              {win.id === 'notepad' && <Notepad />}
              {win.id === 'contact' && <ContactSection />}
              {win.id === 'terminal' && <Terminal />}
            </Window>
          ))}
        </AnimatePresence>
      </div>

      <Dock windows={windows} toggleWindow={toggleWindow} />
    </div>
  );
}