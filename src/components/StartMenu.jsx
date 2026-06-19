export default function StartMenu({ toggleWindow, closeMenu }) {
  // Helper to open the app and close the menu at the same time
  const handleLaunch = (id) => {
    toggleWindow(id, 'isOpen', true);
    closeMenu();
  };

  return (
    <div className="absolute bottom-10 left-0 w-64 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] flex shadow-lg font-retro z-[999999] text-black">
      
      {/* The Iconic Side Banner */}
      <div className="w-10 bg-gradient-to-b from-[#000080] to-[#1084d0] flex items-end justify-center py-2">
        <span className="text-white transform -rotate-90 font-bold text-xl tracking-widest whitespace-nowrap mb-12 select-none">
          Web OS 95
        </span>
      </div>

      {/* Menu Options */}
      <div className="flex-1 py-1">
        
        <button 
          onClick={() => handleLaunch('about')} 
          className="w-full text-left px-4 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-3"
        >
          <span className="text-2xl drop-shadow-sm">👨‍💻</span> 
          <span className="font-bold">About Me</span>
        </button>

        <button 
          onClick={() => handleLaunch('projects')} 
          className="w-full text-left px-4 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-3"
        >
          <span className="text-2xl drop-shadow-sm">📂</span> 
          <span className="font-bold">Projects Viewer</span>
        </button>

        {/* Divider Line */}
        <div className="border-t border-[#808080] border-b border-white my-1 mx-1"></div>

        {/* Just for fun - a shutdown button */}
        <button 
          onClick={() => alert("It's now safe to turn off your computer.")} 
          className="w-full text-left px-4 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-3"
        >
          <span className="text-2xl drop-shadow-sm">🛑</span> 
          <span>Shut Down...</span>
        </button>

      </div>
    </div>
  );
}