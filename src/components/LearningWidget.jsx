import { FiTarget } from 'react-icons/fi';
import BaseWidget from './BaseWidget';

export default function LearningWidget({ 
  constraintsRef, 
  zIndex, 
  onFocus,
  progress = 50, 
  topic = "Frontend Optimization",
  subtopic = "Next.js 14"
}) {
  
  // Calculate how many segments to light up (out of 5) based on the percentage
  const activeSegments = Math.round((progress / 100) * 5);

  return (
    <BaseWidget
      constraintsRef={constraintsRef}
      zIndex={zIndex}
      onFocus={onFocus}
      className="top-60 right-3 w-56" // Snapped right back to its original spot
      title="Current Focus"
    >
      <div className="flex flex-col gap-4">
        {/* Dynamic Subject Content */}
        <div className="flex items-start gap-3 px-1">
          <div className="mt-1">
             <FiTarget size={16} strokeWidth={2.5} className="text-neutral-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight leading-tight mb-1">
               {topic}
            </h3>
            <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
              {subtopic}
            </span>
          </div>
        </div>

        {/* Dynamic Segmented Progress Bar */}
        <div className="flex flex-col gap-2 px-1 mt-1">
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest">
              Module Progress
            </span>
            <span className="text-[8px] font-bold text-[#E51919] uppercase tracking-widest">
              {progress}%
            </span>
          </div>
          
          {/* LED Segment Array */}
          <div className="flex gap-1.5 h-1.5">
            {[1, 2, 3, 4, 5].map((step) => (
              <div 
                key={step} 
                className={`flex-1 rounded-sm transition-colors duration-500 ${
                  step <= activeSegments 
                    ? 'bg-[#E51919] shadow-[0_0_4px_rgba(229,25,25,0.3)]' 
                    : 'bg-[#0F0F0F] border border-neutral-800' 
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </BaseWidget>
  );
}