import { FiMail, FiPhone, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi';

export default function ContactSection() {
  return (
    <div className="h-[600px] flex flex-col p-6 bg-black font-mono overflow-hidden">
      
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
          <span className="w-1.5 h-1.5 bg-[#f02020] rounded-full animate-pulse"></span>
          Online
        </div>
      </div>
      
      {/* Contact Grid */}
      <div className="flex flex-col gap-4 flex-1">
        <div className="text-[10px] text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
          <span className="text-[#f02020]">❯</span> Available.Nodes
        </div>

        <ContactCard 
          icon={<FiMail size={16} />} 
          label="Email" 
          value="siddharth175nirmale1@gmail.com" 
          href="mailto:siddharth175nirmale1@gmail.com" 
        />
        <ContactCard 
          icon={<FiPhone size={16} />} 
          label="Phone" 
          value="+91-772-382-4225" 
          href="tel:+917723824225" 
        />
        <ContactCard 
          icon={<FiGithub size={16} />} 
          label="GitHub" 
          value="github.com/siddharthNirmale" 
          href="https://github.com/siddharthNirmale" 
        />
        <ContactCard 
          icon={<FiLinkedin size={16} />} 
          label="LinkedIn" 
          value="linkedin.com/in/siddharth-nirmale" 
          href="https://linkedin.com/in/siddharth-nirmale" 
        />
        <ContactCard 
          icon={<FiMapPin size={16} />} 
          label="Location" 
          value="Indore, Madhya Pradesh" 
          href="#" 
        />
      </div>

      {/* Footer Status */}
      <div className="mt-auto pt-6 border-t border-neutral-900 text-[10px] text-neutral-600 uppercase tracking-widest text-center">
        Transmission Encryption: Active // Latency: 0ms
      </div>
    </div>
  );
}

function ContactCard({ icon, label, value, href }) {
  const isLink = href !== "#";
  
  const content = (
    <div className="bg-[#050505] border border-neutral-800 p-4 flex items-center gap-4 group transition-all hover:border-[#f02020]">
      <div className="text-neutral-600 group-hover:text-[#f02020] transition-colors">{icon}</div>
      <div className="flex flex-col">
        <span className="text-[9px] uppercase tracking-widest text-neutral-500">{label}</span>
        <span className="text-sm text-white">{value}</span>
      </div>
    </div>
  );

  return isLink ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
}