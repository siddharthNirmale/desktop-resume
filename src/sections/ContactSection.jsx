import { FiMail, FiPhone, FiMapPin, FiChevronRight } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ContactSection() {
  return (
    <div className="w-full min-h-full bg-[var(--color-surface)] text-[var(--color-text)] flex flex-col font-primary selection:bg-[var(--color-accent)] selection:text-white">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="shrink-0 border-b border-[var(--color-surface-border)] px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[17px] sm:text-[18px] font-semibold tracking-[-0.025em] text-[var(--color-text)]">
              Contact
            </h1>

            <p className="mt-0.5 text-[12px] leading-relaxed text-[var(--color-text-tertiary)]">
              Let's build something together.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-surface-border)] bg-[var(--color-surface-inactive)] px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_7px_var(--color-accent)]" />
            <span className="text-[10px] font-medium text-[var(--color-text-secondary)]">
              Available
            </span>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col overflow-y-auto custom-scrollbar px-5 py-5 sm:px-6 sm:py-6">

        {/* Intro */}
        <section className="mb-6">
          <p className="max-w-lg text-[14px] sm:text-[15px] leading-[1.65] text-[var(--color-text-secondary)]">
            The quickest way to reach me is through{" "}
            <strong className="font-semibold text-[var(--color-text)]">
              email
            </strong>
            . You can also find me on GitHub and LinkedIn.
          </p>
        </section>

        {/* =================================================
            COMMUNICATIONS
        ================================================== */}
        <section className="mb-6">
          <SectionLabel>Direct contact</SectionLabel>

          <div className="overflow-hidden rounded-[14px] border border-[var(--color-surface-border)] bg-[var(--color-surface-inactive)]">

            <ContactCard
              icon={<FiMail size={17} strokeWidth={1.8} />}
              label="Email"
              value="siddharth175nirmale1@gmail.com"
              href="mailto:siddharth175nirmale1@gmail.com"
            />

            <Divider />

            <ContactCard
              icon={<FiPhone size={17} strokeWidth={1.8} />}
              label="Phone"
              value="+91 77238 24225"
              href="tel:+917723824225"
            />

          </div>
        </section>

        {/* =================================================
            NETWORKS
        ================================================== */}
        <section>
          <SectionLabel>Online</SectionLabel>

          <div className="overflow-hidden rounded-[14px] border border-[var(--color-surface-border)] bg-[var(--color-surface-inactive)]">

            <ContactCard
              icon={<FaGithub size={17} />}
              label="GitHub"
              value="github.com/siddharthNirmale"
              href="https://github.com/siddharthNirmale"
            />

            <Divider />

            <ContactCard
              icon={<FaLinkedin size={17} />}
              label="LinkedIn"
              value="linkedin.com/in/siddharth-nirmale"
              href="https://linkedin.com/in/siddharth-nirmale"
            />

            <Divider />

            <ContactCard
              icon={<FiMapPin size={17} strokeWidth={1.8} />}
              label="Location"
              value="Indore, Madhya Pradesh, India"
              href="#"
            />

          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="shrink-0 border-t border-[var(--color-surface-border)] px-5 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] font-medium text-[var(--color-text-tertiary)]">
            Usually responds quickly
          </span>

          <span className="text-[10px] font-medium tracking-wide text-[var(--color-text-disabled)]">
            INDIA · IST
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================
   SECTION LABEL
============================================================ */

function SectionLabel({ children }) {
  return (
    <h2 className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
      {children}
    </h2>
  );
}

/* ============================================================
   DIVIDER
============================================================ */

function Divider() {
  return (
    <div className="ml-[58px] border-t border-[var(--color-surface-border)]" />
  );
}

/* ============================================================
   CONTACT CARD
============================================================ */

function ContactCard({ icon, label, value, href }) {
  const isLink = href !== "#";

  const content = (
    <div
      className="
        group flex min-h-[66px] w-full items-center
        px-4 py-3
        transition-colors duration-150
        hover:bg-[var(--color-surface)]
      "
    >
      {/* Icon */}
      <div
        className="
          mr-3.5 flex h-9 w-9 shrink-0 items-center justify-center
          rounded-[10px]
          border border-[var(--color-surface-border)]
          bg-[var(--color-surface)]
          text-[var(--color-text-secondary)]
          transition-all duration-150
          group-hover:border-[var(--color-accent)]
          group-hover:text-[var(--color-accent)]
        "
      >
        {icon}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <span
          className="
            block
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.08em]
            text-[var(--color-text-tertiary)]
          "
        >
          {label}
        </span>

        <span
          className="
            mt-0.5
            block
            truncate
            text-[13px]
            sm:text-[14px]
            font-medium
            tracking-[-0.01em]
            text-[var(--color-text)]
            transition-colors duration-150
            group-hover:text-[var(--color-accent)]
          "
        >
          {value}
        </span>
      </div>

      {/* Arrow */}
      {isLink && (
        <div
          className="
            ml-3 flex h-7 w-7 shrink-0 items-center justify-center
            rounded-full
            text-[var(--color-text-disabled)]
            transition-all duration-150
            group-hover:bg-[var(--color-surface-border)]
            group-hover:text-[var(--color-text)]
            group-hover:translate-x-0.5
          "
        >
          <FiChevronRight size={15} strokeWidth={1.8} />
        </div>
      )}
    </div>
  );

  return isLink ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-accent)]"
    >
      {content}
    </a>
  ) : (
    <div className="block cursor-default">
      {content}
    </div>
  );
}
