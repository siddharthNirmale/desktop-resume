import { useState } from 'react';

export default function ContactSection() {
  const [status, setStatus] = useState('Listening');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Transmitting...');
    
    // Simulate network delay for the aesthetic
    setTimeout(() => {
      alert('[SYS.COMM] Message successfully queued for delivery.');
      setStatus('Listening');
      e.target.reset();
    }, 800);
  };

  return (
    <div className="h-full flex flex-col p-6 bg-black font-mono overflow-auto custom-scrollbar">
      
      {/* Widget Header */}
      <div className="flex justify-between items-end pb-4 mb-6 border-b border-neutral-900">
        <div>
          <h1 className="text-3xl font-bold tracking-[0.2em] text-white">
            SYS<span className="text-[#f02020]">.</span>COMM
          </h1>
          <p className="text-[10px] text-neutral-500 tracking-widest uppercase mt-2">
            Secure Channel // Port: 443
          </p>
        </div>
        <div className="text-[#f02020] text-[10px] tracking-widest flex items-center gap-2 uppercase font-bold">
          {status === 'Listening' ? (
            <span className="w-1.5 h-1.5 bg-[#f02020] rounded-full animate-pulse"></span>
          ) : (
            <span className="text-white animate-bounce">↓</span>
          )}
          {status}
        </div>
      </div>
      
      <form className="flex flex-col gap-5 flex-1" onSubmit={handleSubmit}>
        
        {/* Origin Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] text-neutral-500 uppercase tracking-widest flex items-center">
            <span className="text-[#f02020] mr-2">❯</span>Origin.Address
          </label>
          <input 
            type="email" 
            placeholder="USER@DOMAIN.COM" 
            className="bg-[#050505] border border-neutral-800 p-4 text-sm text-white outline-none focus:border-[#f02020] transition-colors placeholder-neutral-800 rounded-none w-full" 
            required 
          />
        </div>

        {/* Payload Input */}
        <div className="flex flex-col gap-2 flex-1 mb-2">
          <label className="text-[10px] text-neutral-500 uppercase tracking-widest flex items-center">
            <span className="text-[#f02020] mr-2">❯</span>Payload.Data
          </label>
          <textarea 
            className="bg-[#050505] border border-neutral-800 p-4 text-sm text-white flex-1 resize-none outline-none focus:border-[#f02020] transition-colors custom-scrollbar placeholder-neutral-800 rounded-none w-full leading-relaxed" 
            placeholder="TRANSMIT YOUR MESSAGE..." 
            required
          ></textarea>
        </div>
        
        {/* Action Button */}
        <button 
          type="submit" 
          disabled={status !== 'Listening'}
          className="mt-auto p-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#f02020] hover:text-white transition-all duration-300 flex justify-between items-center group rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{status === 'Listening' ? 'Initialize Transfer' : 'Sending...'}</span>
          <span className="group-hover:translate-x-1 transition-transform text-[#f02020] group-hover:text-white">
            ↗
          </span>
        </button>

      </form>
    </div>
  );
}