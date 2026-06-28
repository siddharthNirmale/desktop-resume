import { useRef, useState } from 'react';
// Import your components (adjust paths based on your file structure)
import FluidGlass from './FluidGlass';
import ClockWidget from './ClockWidget';

export default function GlassDashboard() {
  const containerRef = useRef(null);
  const [widgetZIndex, setWidgetZIndex] = useState(10);

  // Simple handler to raise z-index on focus if you add more widgets later
  const handleWidgetFocus = () => {
    setWidgetZIndex((prev) => prev + 1);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] rounded-3xl overflow-hidden bg-[#0a0a0c] select-none"
    >
      {/* 1. Fluid Glass Background Canvas Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FluidGlass 
          mode="lens"
          lensProps={{
            scale: 0.25,
            ior: 1.15,
            thickness: 5,
            chromaticAberration: 0.1,
            anisotropy: 0.01  
          }}
          transmission={1}
          roughness={0.02} // A tiny hint of roughness handles bright glare beautifully
        />
      </div>

      {/* Optional: Ambient glow colors under the glass to maximize refraction aesthetics */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 2. Interactive UI Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <ClockWidget 
          constraintsRef={containerRef} 
          zIndex={widgetZIndex}
          onFocus={handleWidgetFocus}
        />
      </div>
    </div>
  );
}