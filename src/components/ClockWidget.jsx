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

  const adjustTimerMinutes = (mins) => {
    const deltaSecs = mins * 60;
    setTRemaining((prev) => {
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

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none" }}
      whileDrag={{ cursor: "grabbing" }}
      className="absolute top-14 right-6 w-[280px] bg-[#1C1C1E]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4.5 cursor-grab flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.5)] font-primary min-h-[175px] select-none pointer-events-auto"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
    >
      {/* Tab Select Toolbar Bar */}
      <div 
        className="flex gap-4 items-center px-1 mb-4"
        onPointerDown={(e) => e.stopPropagation()} 
      >
        {['clock', 'stopwatch', 'timer'].map((tab) => (
          <button
            key={tab}
            onClick={() => setMode(tab)}
            className={`text-[11px] font-medium capitalize transition-colors duration-150 cursor-default focus:outline-none ${
              mode === tab ? 'text-accent font-semibold' : 'text-white/40 hover:text-white/70'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Mode Screen Container */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          
          {/* ---------------- CLOCK MODE ---------------- */}
          {mode === 'clock' && (
            <motion.div
              key="clock"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col w-full items-center gap-4 pointer-events-none"
            >
              <div className="flex items-start justify-center gap-1.5 w-full">
                <span className="text-[44px] font-light tracking-tight text-white/95 leading-none tabular-nums font-primary">
                  {(time.getHours() % 12 || 12).toString().padStart(2, '0')}:
                  {time.getMinutes().toString().padStart(2, '0')}
                </span>
                
                <div className="flex flex-col items-start gap-1 mt-0.5">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wide leading-none">
                    {time.getHours() >= 12 ? 'PM' : 'AM'}
                  </span>
                  <span className="text-[11px] font-mono font-medium text-white/30 w-5 text-left leading-none tabular-nums">
                    {time.getSeconds().toString().padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2.5 w-full text-[12px] text-white/50 font-medium">
                <span>{time.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                <div className="w-[3px] h-[3px] bg-white/10 rounded-full" />
                <span>{time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>

              {/* Progress Slider Track bar */}
              <div className="w-full h-[3px] bg-white/[0.04] rounded-full overflow-hidden mt-1.5">
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
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col w-full items-center gap-4"
            >
              <div className="flex items-end justify-center w-full mt-1">
                <span className="text-[44px] font-light tracking-tight text-white/95 leading-none tabular-nums font-primary">
                  {Math.floor(swTime / 60000).toString().padStart(2, '0')}:
                  {Math.floor((swTime % 60000) / 1000).toString().padStart(2, '0')}
                </span>
                <span className="text-[15px] font-medium text-accent leading-none ml-1 mb-1 tabular-nums">
                  .{Math.floor((swTime % 1000) / 10).toString().padStart(2, '0')}
                </span>
              </div>

              {/* Controls Cluster Overlay */}
              <div 
                className="flex items-center gap-3.5 mt-1"
                onPointerDown={(e) => e.stopPropagation()} 
              >
                <button
                  onClick={() => setSwRunning(!swRunning)}
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-white/[0.05] border border-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-150 focus:outline-none cursor-default"
                >
                  {swRunning ? <Pause size={14} className="text-accent" /> : <Play size={14} className="ml-0.5 text-white/60" />}
                </button>
                
                <button
                  onClick={() => {
                    setSwRunning(false);
                    setSwTime(0);
                  }}
                  className="h-7 w-7 flex items-center justify-center rounded-full bg-transparent border border-white/5 text-white/30 hover:text-white/60 hover:bg-white/[0.03] transition-all duration-150 focus:outline-none cursor-default"
                >
                  <RotateCcw size={12} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ---------------- TIMER MODE ---------------- */}
          {mode === 'timer' && (
            <motion.div
              key="timer"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col w-full items-center gap-4"
            >
              <div className="flex items-start justify-center w-full mt-1">
                <span className="text-[44px] font-light tracking-tight text-white/95 leading-none tabular-nums font-primary">
                  {Math.floor(tRemaining / 60).toString().padStart(2, '0')}:
                  {(tRemaining % 60).toString().padStart(2, '0')}
                </span>
              </div>

              {/* Progress Slider Track bar */}
              <div className="w-full h-[3px] bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${tRemaining === 0 ? 'bg-[#FF3B30]' : 'bg-accent'}`}
                  initial={{ width: '100%' }}
                  animate={{ width: `${tInitial > 0 ? (tRemaining / tInitial) * 100 : 0}%` }}
                  transition={{ ease: "linear", duration: 1 }}
                />
              </div>

              {/* Controls Cluster Overlay */}
              <div 
                className="flex items-center justify-between w-full mt-1"
                onPointerDown={(e) => e.stopPropagation()} 
              >
                <div className="flex gap-1">
                  <button onClick={() => adjustTimerMinutes(-1)} className="text-[11px] font-medium text-white/40 bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded hover:bg-white/5 hover:text-white transition-all duration-150 focus:outline-none cursor-default">-1m</button>
                  <button onClick={() => adjustTimerMinutes(1)} className="text-[11px] font-medium text-white/40 bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded hover:bg-white/5 hover:text-accent transition-all duration-150 focus:outline-none cursor-default">+1m</button>
                  <button onClick={() => adjustTimerMinutes(5)} className="text-[11px] font-medium text-white/40 bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded hover:bg-white/5 hover:text-accent transition-all duration-150 focus:outline-none cursor-default">+5m</button>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetTimer}
                    className="h-7 w-7 flex items-center justify-center rounded-full bg-transparent text-white/30 hover:text-white/60 transition-colors duration-150 focus:outline-none cursor-default"
                  >
                    <RotateCcw size={12} />
                  </button>
                  
                  <button
                    onClick={() => tRemaining > 0 && setTRunning(!tRunning)}
                    className="h-8 w-8 flex items-center justify-center rounded-full bg-white/[0.05] border border-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-150 focus:outline-none cursor-default"
                  >
                    {tRunning ? <Pause size={13} className="text-accent" /> : <Play size={13} className="ml-0.5 text-white/60" />}
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