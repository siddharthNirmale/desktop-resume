import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function ClockWidget({ constraintsRef, zIndex, onFocus }) {
  const [mode, setMode] = useState('clock'); // 'clock', 'stopwatch', 'timer'

  // --- CLOCK STATE ---
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- STOPWATCH STATE ---
  const [swRunning, setSwRunning] = useState(false);
  const [swTime, setSwTime] = useState(0); 

  useEffect(() => {
    let interval;
    if (swRunning) {
      interval = setInterval(() => setSwTime((prev) => prev + 10), 10);
    }
    return () => clearInterval(interval);
  }, [swRunning]);

  // --- TIMER STATE ---
  const [tRunning, setTRunning] = useState(false);
  const [tRemaining, setTRemaining] = useState(300); // 5 minutes default
  const [tInitial, setTInitial] = useState(300);

  useEffect(() => {
    let interval;
    if (tRunning) {
      interval = setInterval(() => {
        setTRemaining((prev) => {
          if (prev <= 1) {
            setTRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [tRunning]);

  // Handle both adding and subtracting time safely
  const adjustTimerMinutes = (mins) => {
    const deltaSecs = mins * 60;
    setTRemaining((prev) => {
      // Prevents the timer from dropping below 0
      const newTime = Math.max(0, prev + deltaSecs);
      setTInitial(newTime); 
      return newTime;
    });
  };

  const resetTimer = () => {
    setTRunning(false);
    if (tInitial === 0 || tRemaining === 0) {
      setTRemaining(300);
      setTInitial(300);
    } else {
      setTRemaining(tInitial);
    }
  };

  // Render Helpers
  const renderTabs = () => (
    <div 
      className="flex gap-4 items-center px-1 select-none mb-3"
      onPointerDown={(e) => e.stopPropagation()} 
    >
      {['clock', 'stopwatch', 'timer'].map((tab) => (
        <button
          key={tab}
          onClick={() => setMode(tab)}
          className={`text-[9px] font-bold uppercase tracking-super-wide transition-colors duration-200 cursor-pointer 
            ${mode === tab ? 'text-accent' : 'text-text-tertiary hover:text-text-secondary'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.15}
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none" }}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      className="absolute top-10 right-3 w-[280px] bg-surface-dark border border-surface-border rounded-2xl p-5 cursor-grab flex flex-col shadow-2xl font-primary min-h-[170px]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {renderTabs()}

      <div className="relative w-full flex-1 flex flex-col items-center justify-center p-2">
        <AnimatePresence mode="wait">
          
          {/* ---------------- CLOCK MODE ---------------- */}
          {mode === 'clock' && (
            <motion.div
              key="clock"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col w-full items-center gap-5 pointer-events-none"
            >
              <div className="flex items-start justify-center gap-2 w-full">
                <span className="text-5xl font-light tracking-wide text-text leading-none">
                  {(time.getHours() % 12 || 12).toString().padStart(2, '0')}:
                  {time.getMinutes().toString().padStart(2, '0')}
                </span>
                <div className="flex flex-col items-start gap-1.5 mt-1">
                  <span className="text-micro font-bold text-accent uppercase tracking-super-wide">
                    {time.getHours() >= 12 ? 'PM' : 'AM'}
                  </span>
                  <span className="text-xs font-mono text-text-tertiary w-5 text-left leading-none">
                    {time.getSeconds().toString().padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 w-full">
                <span className="text-xs font-medium text-text-secondary uppercase tracking-wider font-mono">
                  {time.toLocaleDateString([], { weekday: 'short' })}
                </span>
                <div className="w-1 h-1 bg-surface-border rounded-full" />
                <span className="text-xs font-medium text-text-secondary uppercase tracking-wider font-mono">
                  {time.toLocaleDateString([], { month: 'short' })} {time.getDate()}
                </span>
              </div>

              <div className="w-full h-1 bg-surface rounded-full overflow-hidden mt-1">
                <motion.div
                  className="h-full bg-accent"
                  animate={{ width: `${(time.getSeconds() / 60) * 100}%` }}
                  transition={{ ease: "linear", duration: time.getSeconds() === 0 ? 0 : 1 }}
                />
              </div>
            </motion.div>
          )}

          {/* ---------------- STOPWATCH MODE ---------------- */}
          {mode === 'stopwatch' && (
            <motion.div
              key="stopwatch"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col w-full items-center gap-5"
            >
              <div className="flex items-end justify-center gap-1 w-full mt-2">
                <span className="text-5xl font-light tracking-wide text-text leading-none font-mono">
                  {Math.floor(swTime / 60000).toString().padStart(2, '0')}:
                  {Math.floor((swTime % 60000) / 1000).toString().padStart(2, '0')}
                </span>
                <span className="text-lg font-mono text-accent leading-[1.2]">
                  .{Math.floor((swTime % 1000) / 10).toString().padStart(2, '0')}
                </span>
              </div>

              <div 
                className="flex items-center gap-4 mt-2"
                onPointerDown={(e) => e.stopPropagation()} 
              >
                <button
                  onClick={() => setSwRunning(!swRunning)}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-surface border border-surface-border text-text hover:border-accent transition-colors cursor-pointer"
                >
                  {swRunning ? <Pause size={16} className="text-accent" /> : <Play size={16} className="ml-1 text-text-secondary" />}
                </button>
                <button
                  onClick={() => {
                    setSwRunning(false);
                    setSwTime(0);
                  }}
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-transparent border border-surface-border text-text-tertiary hover:text-text hover:bg-surface transition-colors cursor-pointer"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ---------------- TIMER MODE ---------------- */}
          {mode === 'timer' && (
            <motion.div
              key="timer"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col w-full items-center gap-4"
            >
              <div className="flex items-start justify-center gap-2 w-full mt-1">
                <span className="text-5xl font-light tracking-wide text-text leading-none font-mono">
                  {Math.floor(tRemaining / 60).toString().padStart(2, '0')}:
                  {(tRemaining % 60).toString().padStart(2, '0')}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-surface rounded-full overflow-hidden mt-1">
                <motion.div
                  className={`h-full ${tRemaining === 0 ? 'bg-red-500' : 'bg-accent'}`}
                  initial={{ width: '100%' }}
                  animate={{ width: `${tInitial > 0 ? (tRemaining / tInitial) * 100 : 0}%` }}
                  transition={{ ease: "linear", duration: 1 }}
                />
              </div>

              {/* Controls */}
              <div 
                className="flex items-center justify-between w-full mt-2"
                onPointerDown={(e) => e.stopPropagation()} 
              >
                {/* Updated Controls Row */}
                <div className="flex gap-1.5">
                  <button onClick={() => adjustTimerMinutes(-1)} className="text-[10px] font-mono text-text-tertiary bg-surface px-1.5 py-1 rounded hover:text-text border border-surface-border cursor-pointer transition-colors">-1m</button>
                  <button onClick={() => adjustTimerMinutes(1)} className="text-[10px] font-mono text-text-tertiary bg-surface px-1.5 py-1 rounded hover:text-accent border border-surface-border cursor-pointer transition-colors">+1m</button>
                  <button onClick={() => adjustTimerMinutes(5)} className="text-[10px] font-mono text-text-tertiary bg-surface px-1.5 py-1 rounded hover:text-accent border border-surface-border cursor-pointer transition-colors">+5m</button>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetTimer}
                    className="h-7 w-7 flex items-center justify-center rounded-full bg-transparent text-text-tertiary hover:text-text transition-colors cursor-pointer"
                  >
                    <RotateCcw size={12} />
                  </button>
                  <button
                    onClick={() => tRemaining > 0 && setTRunning(!tRunning)}
                    className="h-8 w-8 flex items-center justify-center rounded-full bg-surface border border-surface-border text-text hover:border-accent transition-colors cursor-pointer"
                  >
                    {tRunning ? <Pause size={14} className="text-accent" /> : <Play size={14} className="ml-0.5 text-text-secondary" />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}