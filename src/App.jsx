import { useRef } from 'react';
import { AnimatePresence } from 'framer-motion'; // Import this!
import useWindows from './hooks/useWindows';
import Window from './components/Window';
import Dock from './components/Dock';
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

  // Create a reference for the desktop boundaries
  const desktopRef = useRef(null);

  return (
    <div 
      ref={desktopRef} // Attach the boundary here
      className="w-screen h-screen bg-[#050505] relative overflow-hidden flex flex-col font-sans text-gray-200 select-none"
    >
      <div className="flex-1 relative p-6">
        
        {/* Wrap the mapper in AnimatePresence */}
        <AnimatePresence>
          {windows.map(win => 
            // Conditionally render the window here, so AnimatePresence catches the unmount
            win.isOpen && (
            <Window
              key={win.id}
              {...win}
              constraintsRef={desktopRef} // Pass the boundary to the Window
              onClose={() => toggleWindow(win.id, 'isOpen', false)}
              onMinimize={() => toggleWindow(win.id, 'isMinimized', true)}
              onFocus={() => bringToFront(win.id)}
            >
              {win.id === 'about' && (
                <div className="p-10 flex flex-col h-full bg-[#0c0c0c]">
                  <h1 className="text-5xl font-bold mb-2 text-white tracking-tight">Siddharth</h1>
                  <h2 className="text-xs tracking-widest text-neutral-500 uppercase font-bold mb-8">Full-Stack Developer</h2>
                  <p className="text-neutral-400 font-light leading-relaxed max-w-md">
                    Building systems at the intersection of modern web technologies and scalable infrastructure. 
                    Passionate about crafting seamless user experiences and robust backend architectures.
                  </p>
                  <div className="mt-auto flex items-center gap-3 pt-6 border-t border-neutral-800/50">
                    <div className="w-8 h-8 rounded bg-neutral-800 flex items-center justify-center text-sm">👨‍💻</div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-neutral-300 tracking-wider">@SIDDHARTH</span>
                      <span className="text-[10px] text-neutral-600">INDORE · 2026</span>
                    </div>
                  </div>
                </div>
              )}
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