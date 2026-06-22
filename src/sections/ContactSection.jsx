import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ContactSection() {
  return (
    <div className="
      h-[600px]
      flex flex-col
      p-6
      bg-[var(--color-surface)]
      text-white
      font-[var(--font-primary)]
      overflow-hidden
    ">

      {/* HEADER */}
      <div className="
        flex justify-between items-end
        pb-4 mb-6
        border-b border-[var(--color-surface-border)]
      ">
        <div>
          <h1 className="text-3xl font-bold tracking-[0.2em]">
            SYS<span className="text-[var(--color-accent)]">.</span>COMM
          </h1>

          <p className="
            text-[10px]
            text-white/40
            tracking-[var(--tracking-super-wide)]
            uppercase mt-2
          ">
            Secure Channel // Port: 443
          </p>
        </div>

        <div className="
          text-[var(--color-accent)]
          text-[10px]
          tracking-[var(--tracking-super-wide)]
          flex items-center gap-2 uppercase 
        ">
          <span className="
            w-1.5 h-1.5
            bg-[var(--color-accent)]
            rounded-full animate-pulse
          " />
          Online
        </div>
      </div>

      {/* CONTACT GRID */}
      <div className="flex flex-col gap-4 flex-1">

        <div className="
          text-[10px]
          text-white/40
          uppercase tracking-[var(--tracking-super-wide)]
          mb-2 flex items-center gap-2
        ">
          <span className="text-[var(--color-accent)]">❯</span>
          Available.Nodes
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
          icon={<FaGithub size={16} />}
          label="GitHub"
          value="github.com/siddharthNirmale"
          href="https://github.com/siddharthNirmale"
        />

        <ContactCard
          icon={<FaLinkedin size={16} />}
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

      {/* FOOTER */}
      <div className="
        mt-auto pt-6
        border-t border-[var(--color-surface-border)]
        text-[10px]
        text-white/30
        uppercase tracking-[var(--tracking-super-wide)]
        text-center
      ">
        Transmission Encryption: Active // Latency: 0ms
      </div>
    </div>
  );
}

/* ---------------- CONTACT CARD ---------------- */

function ContactCard({ icon, label, value, href }) {
  const isLink = href !== "#";

  const content = (
    <div className="
      bg-[var(--color-surface-dark)]
      border border-[var(--color-surface-border)]
      p-4 flex items-center gap-4
      group transition-all
      hover:border-[var(--color-accent)]
    ">
      <div className="
        text-white/40
        group-hover:text-[var(--color-accent)]
        transition-colors
      ">
        {icon}
      </div>

      <div className="flex flex-col">
        <span className="
          text-[9px]
          uppercase tracking-[var(--tracking-super-wide)]
          text-white/40
        ">
          {label}
        </span>

        <span className="text-sm text-white">
          {value}
        </span>
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