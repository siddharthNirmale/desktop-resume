import { useState, useEffect } from "react";
import { FiTrash2, FiCheck, FiEdit3 } from "react-icons/fi";

export default function Notepad() {
  const [text, setText] = useState(() => {
    return localStorage.getItem("web-os-notepad") || "";
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    localStorage.setItem("web-os-notepad", text);

    const timeout = setTimeout(() => {
      setIsSaving(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [text]);

  const handleChange = (e) => {
    setIsSaving(true);
    setText(e.target.value);
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to discard all text?")) {
      setIsSaving(true);
      setText("");
    }
  };

  const wordCount = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  return (
    <div
      className="
        flex
        h-full
        w-full
        flex-col

        bg-[var(--color-surface)]
        text-[var(--color-text)]
        font-primary

        selection:bg-[var(--color-accent)]
        selection:text-white
      "
    >
      {/* =====================================================
          DOCUMENT HEADER
      ====================================================== */}
      <header
        className="
          flex
          shrink-0
          items-center
          justify-between
          gap-4

          border-b
          border-[var(--color-surface-border)]

          px-4
          py-2.5

          sm:px-5
        "
      >
        {/* Document */}
        <div className="flex min-w-0 items-center gap-2.5">
          <div
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center

              rounded-[7px]

              bg-[var(--color-surface-inactive)]
              text-[var(--color-text-secondary)]
            "
          >
            <FiEdit3 size={13} />
          </div>

          <div className="min-w-0">
            <div
              className="
                truncate
                text-[12px]
                font-semibold
                tracking-[-0.01em]
                text-[var(--color-text)]
              "
            >
              untitled.txt
            </div>

            <div
              className="
                text-[10px]
                text-[var(--color-text-tertiary)]
              "
            >
              Local document
            </div>
          </div>
        </div>

        {/* Save Status */}
        <div
          className="
            flex
            shrink-0
            items-center
            gap-1.5

            text-[10px]
            font-medium
          "
        >
          {isSaving ? (
            <>
              <span
                className="
                  h-1.5
                  w-1.5
                  animate-pulse
                  rounded-full
                  bg-[var(--color-accent)]
                "
              />

              <span className="text-[var(--color-accent)]">
                Saving
              </span>
            </>
          ) : (
            <>
              <FiCheck
                size={11}
                className="text-[var(--color-text-tertiary)]"
              />

              <span className="text-[var(--color-text-tertiary)]">
                Saved
              </span>
            </>
          )}
        </div>
      </header>

      {/* =====================================================
          EDITOR
      ====================================================== */}
      <div className="relative flex-1 overflow-hidden">
        {/* Subtle writing guide */}
        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            bottom-0
            w-px

            bg-[var(--color-surface-border)]

            opacity-40

            sm:left-8
          "
        />

        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Start writing..."
          spellCheck="false"
          aria-label="Notepad editor"
          className="
            custom-scrollbar

            h-full
            w-full
            resize-none
            border-none
            outline-none

            bg-transparent

            px-5
            py-6

            text-[14px]
            font-primary
            leading-[1.8]

            text-[var(--color-text)]

            placeholder:text-[var(--color-text-tertiary)]
            placeholder:opacity-60

            focus:ring-0

            sm:px-9
            sm:py-7
          "
        />

        {/* Empty State */}
        {!text && (
          <div
            className="
              pointer-events-none
              absolute
              left-0
              right-0
              top-1/2
              -translate-y-1/2

              flex
              flex-col
              items-center
              justify-center

              px-6

              text-center
            "
          >
            <div
              className="
                mb-3
                flex
                h-9
                w-9
                items-center
                justify-center

                rounded-[10px]

                bg-[var(--color-surface-inactive)]

                text-[var(--color-text-tertiary)]
              "
            >
              <FiEdit3 size={15} />
            </div>

            <p
              className="
                text-[13px]
                font-medium
                text-[var(--color-text-secondary)]
              "
            >
              Start writing
            </p>

            <p
              className="
                mt-1
                text-[11px]
                text-[var(--color-text-tertiary)]
              "
            >
              Your notes are saved automatically.
            </p>
          </div>
        )}
      </div>

      {/* =====================================================
          STATUS BAR
      ====================================================== */}
      <footer
        className="
          flex
          shrink-0
          items-center
          justify-between
          gap-4

          border-t
          border-[var(--color-surface-border)]

          bg-[var(--color-surface-inactive)]

          px-4
          py-2

          text-[10px]
          font-medium

          sm:px-5
        "
      >
        {/* Stats */}
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <span className="text-[var(--color-text-tertiary)]">
            <strong
              className="
                font-semibold
                text-[var(--color-text-secondary)]
              "
            >
              {wordCount}
            </strong>{" "}
            {wordCount === 1 ? "word" : "words"}
          </span>

          <span
            className="
              h-1
              w-1
              rounded-full
              bg-[var(--color-text-disabled)]
            "
          />

          <span className="text-[var(--color-text-tertiary)]">
            <strong
              className="
                font-semibold
                text-[var(--color-text-secondary)]
              "
            >
              {text.length}
            </strong>{" "}
            chars
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <span
            className="
              hidden
              text-[10px]
              tracking-wide
              text-[var(--color-text-disabled)]
              sm:inline
            "
          >
            UTF-8
          </span>

          <button
            onClick={handleClear}
            disabled={!text}
            title="Clear document"
            className="
              group

              inline-flex
              items-center
              gap-1.5

              rounded-[6px]

              px-1.5
              py-1

              text-[10px]
              font-medium

              text-[var(--color-text-tertiary)]

              transition-all
              duration-150

              hover:bg-[var(--color-surface)]
              hover:text-[var(--color-accent)]

              disabled:pointer-events-none
              disabled:opacity-30

              focus:outline-none
            "
          >
            <FiTrash2
              size={11}
              className="
                transition-transform
                duration-150

                group-hover:scale-105
              "
            />

            <span className="hidden sm:inline">
              Clear
            </span>
          </button>
        </div>
      </footer>
    </div>
  );
}
