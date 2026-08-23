import { useEffect, useState } from "react";
import { MorphIcon } from "morphicons/react";
import { Check, Copy } from "lucide";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUpRight,
  FiDownload,
  FiExternalLink,
  FiMessageCircle,
} from "react-icons/fi";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const CONTACT = {
  name: "Siddharth Nirmale",
  role: "Frontend / Full-stack Developer",
  email: "siddharth175nirmale1@gmail.com",
  phone: "+91 77238 24225",
  phoneRaw: "+917723824225",

  github: "https://github.com/siddharthNirmale",
  githubLabel: "github.com/siddharthNirmale",

  linkedin: "https://linkedin.com/in/siddharth-nirmale",
  linkedinLabel: "linkedin.com/in/siddharth-nirmale",

  location: "Indore, Madhya Pradesh, India",

  maps:
    "https://www.google.com/maps/search/?api=1&query=Indore%2C%20Madhya%20Pradesh%2C%20India",
};

const WHATSAPP_MESSAGE =
  "Hi Siddharth, I found your portfolio and wanted to connect.";

const CONTACT_ITEMS = [
  {
    id: "email",
    label: "Email",
    value: CONTACT.email,
    icon: FiMail,
    href: `mailto:${CONTACT.email}`,
    copyable: CONTACT.email,
    action: "Email",
  },
  {
    id: "phone",
    label: "Phone",
    value: CONTACT.phone,
    icon: FiPhone,
    href: `tel:${CONTACT.phoneRaw}`,
    copyable: CONTACT.phoneRaw,
    action: "Call",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "Message me on WhatsApp",
    icon: FaWhatsapp,
    href: `https://wa.me/${CONTACT.phoneRaw.replace(
      "+",
      ""
    )}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    external: true,
    action: "Message",
  },
  {
    id: "github",
    label: "GitHub",
    value: CONTACT.githubLabel,
    icon: FaGithub,
    href: CONTACT.github,
    external: true,
    action: "Open",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: CONTACT.linkedinLabel,
    icon: FaLinkedin,
    href: CONTACT.linkedin,
    external: true,
    action: "Open",
  },
  {
    id: "location",
    label: "Location",
    value: CONTACT.location,
    icon: FiMapPin,
    href: CONTACT.maps,
    external: true,
    action: "Map",
  },
];

export default function ContactSection() {
  const [copiedId, setCopiedId] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast("");
    }, 1800);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleCopy = async (text, id, label) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedId(id);
      setToast(`${label} copied`);

      setTimeout(() => {
        setCopiedId(null);
      }, 1600);
    } catch (error) {
      console.error("Copy failed:", error);
      setToast("Copy failed");
    }
  };

  const downloadVCard = () => {
    const vCard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${CONTACT.name}`,
      "Nirmale;Siddharth;;;",
      `TITLE:${CONTACT.role}`,
      `EMAIL:${CONTACT.email}`,
      `TEL:${CONTACT.phoneRaw}`,
      `URL:${CONTACT.github}`,
      `URL:${CONTACT.linkedin}`,
      "ADR:;;Indore;Madhya Pradesh;;India",
      "END:VCARD",
    ].join("\r\n");

    const blob = new Blob([vCard], {
      type: "text/vcard;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "Siddharth-Nirmale.vcf";

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);

    setToast("Contact saved");
  };

  return (
    <section className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-7">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text)] sm:text-3xl">
              Get in touch
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-[var(--color-text-tertiary)]">
              Open to frontend, full-stack, freelance, and interesting
              collaborations.
            </p>
          </div>

          <button
            type="button"
            onClick={downloadVCard}
            title="Save contact"
            aria-label="Save contact"
            className="group hidden shrink-0 items-center gap-2 text-xs font-medium text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text)] sm:flex"
          >
            <FiDownload
              size={14}
              className="transition-transform group-hover:-translate-y-0.5"
            />

            <span>Save contact</span>
          </button>
        </div>
      </header>

      {/* Contact actions */}
      <div className="space-y-1">
        {CONTACT_ITEMS.map((item) => {
          const Icon = item.icon;
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className="group flex items-center gap-3 py-3 transition-all duration-200"
            >
              {/* Icon */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[var(--color-text-tertiary)] transition-all duration-200 group-hover:scale-105 group-hover:text-[var(--color-accent)]">
                <Icon size={17} />
              </div>

              {/* Main link */}
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={
                  item.external
                    ? "noopener noreferrer"
                    : undefined
                }
                className="min-w-0 flex-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-disabled)] transition-colors group-hover:text-[var(--color-text-tertiary)]">
                    {item.label}
                  </span>

                  {item.external && (
                    <FiExternalLink
                      size={10}
                      className="text-[var(--color-text-disabled)] opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  )}
                </div>

                <p className="mt-0.5 truncate text-sm font-medium text-[var(--color-text-secondary)] transition-colors group-hover:text-[var(--color-text)]">
                  {item.value}
                </p>
              </a>

              {/* Copy */}
              {item.copyable && (
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      item.copyable,
                      item.id,
                      item.label
                    )
                  }
                  title={`Copy ${item.label}`}
                  aria-label={`Copy ${item.label}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[var(--color-text-disabled)] opacity-0 transition-all duration-200 hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] group-hover:opacity-100 focus:opacity-100 active:scale-90"
                >
                  <MorphIcon
                    icon={isCopied ? Check : Copy}
                    size={14}
                    strokeWidth={2}
                    spring="snappy"
                    className={isCopied ? "text-emerald-500" : ""}
                  />
                </button>
              )}

              {/* Open */}
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={
                  item.external
                    ? "noopener noreferrer"
                    : undefined
                }
                title={item.action}
                aria-label={`${item.action} ${item.label}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center text-[var(--color-text-disabled)] opacity-0 transition-all duration-200 hover:text-[var(--color-text)] group-hover:translate-x-0.5 group-hover:opacity-100 focus:opacity-100"
              >
                <FiArrowUpRight size={15} />
              </a>
            </div>
          );
        })}
      </div>

      {/* Primary actions */}
      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
        <a
          href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(
            "Hello Siddharth"
          )}`}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
        >
          <FiMessageCircle size={15} />

          <span>Start a conversation</span>

          <FiArrowUpRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>

        <a
          href={`https://wa.me/${CONTACT.phoneRaw.replace(
            "+",
            ""
          )}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text)]"
        >
          <FaWhatsapp size={15} />

          <span>WhatsApp</span>

          <FiArrowUpRight
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>

        <button
          type="button"
          onClick={downloadVCard}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text)] sm:hidden"
        >
          <FiDownload size={14} />
          Save contact
        </button>
      </div>

      {/* Minimal footer */}
      <div className="mt-10 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-disabled)]">
          Indore · India
        </span>

        <span className="text-[10px] text-[var(--color-text-disabled)]">
          Usually replies within 24h
        </span>
      </div>

      {/* Toast */}
      <div
        className={`pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${toast
            ? "translate-y-0 opacity-100"
            : "translate-y-2 opacity-0"
          }`}
        aria-live="polite"
      >
        <div className="flex items-center gap-2 bg-[var(--color-text)] px-3 py-2 text-xs font-medium text-[var(--color-surface)] shadow-lg">
          <MorphIcon icon={Check} size={13} strokeWidth={2.5} />
          {toast}
        </div>
      </div>
    </section>
  );
}
