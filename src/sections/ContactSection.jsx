import { FiMail, FiPhone, FiMapPin, FiChevronRight } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ContactSection() {
  return (
    <div className="w-full min-h-full bg-[var(--color-surface)] text-[var(--color-text)] flex flex-col font-primary selection:bg-[var(--color-accent)] selection:text-white transition-colors duration-250">

      {/* Sub-Header */}
      <div className="px-8 py-5 border-b border-[var(--color-surface-border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-b from-[var(--color-surface-border)] to-transparent shrink-0 transition-colors duration-250">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[var(--color-text)] transition-colors duration-250">
            Contact Channels
          </h1>
          <p className="text-[12px] text-[var(--color-text-tertiary)] mt-0.5 transition-colors duration-250">
            Direct links to email, phone, and professional profiles.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[12px] text-[var(--color-text-secondary)] font-medium transition-colors duration-250">
          <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full shadow-[0_0_8px_var(--color-accent)] animate-pulse transition-colors duration-250" />
          Active
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-6 max-w-2xl w-full mx-auto">

        {/* Direct Contacts */}
        <div className="space-y-2">
          <h2 className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider px-1 transition-colors duration-250">
            Communications
          </h2>
          <div className="bg-[var(--color-surface-inactive)] rounded-xl border border-[var(--color-surface-border)] overflow-hidden shadow-sm divide-y divide-[var(--color-surface-border)] transition-colors duration-250">
            <ContactCard
              icon={<FiMail size={15} />}
              label="Email"
              value="siddharth175nirmale1@gmail.com"
              href="mailto:siddharth175nirmale1@gmail.com"
            />
            <ContactCard
              icon={<FiPhone size={15} />}
              label="Phone"
              value="+91 77238 24225"
              href="tel:+917723824225"
            />
          </div>
        </div>

        {/* Profiles */}
        <div className="space-y-2">
          <h2 className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider px-1 transition-colors duration-250">
            Networks
          </h2>
          <div className="bg-[var(--color-surface-inactive)] rounded-xl border border-[var(--color-surface-border)] overflow-hidden shadow-sm divide-y divide-[var(--color-surface-border)] transition-colors duration-250">
            <ContactCard
              icon={<FaGithub size={15} />}
              label="GitHub"
              value="github.com/siddharthNirmale"
              href="https://github.com/siddharthNirmale"
            />
            <ContactCard
              icon={<FaLinkedin size={15} />}
              label="LinkedIn"
              value="linkedin.com/in/siddharth-nirmale"
              href="https://linkedin.com/in/siddharth-nirmale"
            />
            <ContactCard
              icon={<FiMapPin size={15} />}
              label="Location"
              value="Indore, Madhya Pradesh, India"
              href="#"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 text-center text-[11px] font-normal text-[var(--color-text-tertiary)] opacity-80 border-t border-[var(--color-surface-border)] bg-[var(--color-surface-inactive)] shrink-0 select-none transition-colors duration-250">
        Secure Handshake Verified
      </div>

    </div>
  );
}

function ContactCard({ icon, label, value, href }) {
  const isLink = href !== "#";

  const content = (
    // Uses surface-border on hover for a subtle native-feeling highlight
    <div className="w-full px-5 py-4 flex items-center justify-between group bg-transparent hover:bg-[var(--color-surface-border)] transition-colors duration-150">
      <div className="flex items-center gap-4 min-w-0">
        <div className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors duration-150 shrink-0">
          {icon}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wide transition-colors duration-150">
            {label}
          </span>
          <span className="text-[14px] font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors duration-150 truncate mt-0.5">
            {value}
          </span>
        </div>
      </div>

      {isLink && (
        <div className="text-[var(--color-text-tertiary)] opacity-50 group-hover:opacity-100 group-hover:text-[var(--color-text-secondary)] group-hover:translate-x-0.5 transform transition-all duration-150 pr-1 shrink-0">
          <FiChevronRight size={16} />
        </div>
      )}
    </div>
  );

  return isLink ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block focus:outline-none">
      {content}
    </a>
  ) : (
    <div className="block">{content}</div>
  );
}
