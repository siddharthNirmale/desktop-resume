import { useEffect, useState } from 'react';
import BaseWidget from './BaseWidget';

export default function ClockWidget({ constraintsRef, zIndex, onFocus }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000); 
    const syncTimer = setTimeout(() => {
      setTime(new Date());
      setInterval(() => setTime(new Date()), 60000);
    }, (60 - new Date().getSeconds()) * 1000);
    return () => { clearInterval(timer); clearTimeout(syncTimer); };
  }, []);

  const hoursStr = time.getHours().toString().padStart(2, '0');
  const minutesStr = time.getMinutes().toString().padStart(2, '0');
  const dayStr = time.toLocaleDateString([], { weekday: 'short' }).toUpperCase();
  const dateStr = time.getDate();

  return (
    <BaseWidget
      constraintsRef={constraintsRef}
      zIndex={zIndex}
      onFocus={onFocus}
      className="top-10 right-3 w-44 h-44" // Passed exact dimensions and placement
      title="Local Time"
    >
      {/* Pushed the date to the bottom using mt-auto so it matches your original justify-between look */}
      <div className="flex flex-col h-full pb-1">
        <div className="flex flex-col leading-[0.85] tracking-tighter">
          <span className="text-[4rem] font-medium text-white">{hoursStr}</span>
          <span className="text-[4rem] font-medium text-neutral-600">{minutesStr}</span>
        </div>
        
        <div className="flex justify-start items-center mt-auto">
          <span className="text-[10px] font-bold tracking-widest text-neutral-400">
            {dayStr} <span className="text-[#E51919]">{dateStr}</span>
          </span>
        </div>
      </div>
    </BaseWidget>
  );
}