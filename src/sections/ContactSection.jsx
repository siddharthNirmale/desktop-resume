export default function ContactSection() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message queued for delivery!');
  };

  return (
    <div className="h-full flex flex-col p-8 bg-[#0c0c0c] text-gray-300">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white tracking-tight mb-1">Get in touch</h2>
        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Let's build something.</p>
      </div>
      
      <form className="flex flex-col gap-4 flex-1" onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Your email address" 
          className="bg-[#111111] border border-neutral-800 rounded-lg p-3.5 text-sm outline-none focus:border-neutral-500 transition-colors placeholder-neutral-600" 
          required 
        />
        <textarea 
          className="bg-[#111111] border border-neutral-800 rounded-lg p-3.5 text-sm flex-1 resize-none outline-none focus:border-neutral-500 transition-colors custom-scrollbar placeholder-neutral-600" 
          placeholder="What's on your mind?" 
          required
        ></textarea>
        
        <button type="submit" className="mt-2 py-3.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-neutral-200 transition-colors">
          Send Message
        </button>
      </form>
    </div>
  );
}