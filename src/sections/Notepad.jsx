import { useEffect, useMemo, useState } from "react";
import { FiFileText, FiMenu, FiPlus, FiSearch, FiTrash2, FiX } from "react-icons/fi";

const STORAGE_KEY = "web-os-notes-lite";

const makeId = () => crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const createNote = (title = "", content = "") => ({
  id: makeId(),
  title,
  content,
  updatedAt: Date.now(),
});

const formatDate = (timestamp) =>
  new Date(timestamp).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function Notepad() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch { }

    return [
      createNote(
        "Welcome to Notes",
        "A much simpler, cleaner note-taking experience.\n\nEverything saves automatically to your device."
      )
    ];
  });

  const [activeId, setActiveId] = useState(notes[0]?.id || null);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [noteToDelete, setNoteToDelete] = useState(null); // Custom modal state

  const activeNote = notes.find((n) => n.id === activeId) || notes[0];

  // Auto-save to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  // Keep active note in sync if deleted
  useEffect(() => {
    if (!activeId && notes.length > 0) setActiveId(notes[0].id);
  }, [activeId, notes]);

  const createNewNote = () => {
    const note = createNote();
    setNotes((current) => [note, ...current]);
    setActiveId(note.id);
    setSearch("");
  };

  const updateActiveNote = (updates) => {
    if (!activeNote) return;
    setNotes((current) =>
      current.map((note) =>
        note.id === activeNote.id ? { ...note, ...updates, updatedAt: Date.now() } : note
      )
    );
  };

  const executeDelete = () => {
    setNotes((current) => current.filter((note) => note.id !== noteToDelete));
    if (activeId === noteToDelete) setActiveId(null);
    setNoteToDelete(null);
  };

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return notes.sort((a, b) => b.updatedAt - a.updatedAt);

    return notes
      .filter(n => n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query))
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes, search]);

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[var(--color-surface)] font-primary text-[var(--color-text)]">

      {/* SIDEBAR */}
      <aside
        className={`absolute inset-y-0 left-0 z-30 flex w-[270px] flex-col border-r border-[var(--color-surface-border)] bg-[var(--color-surface)] transition-transform duration-200 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--color-surface-border)] p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[var(--color-surface-inactive)]">
              <FiFileText size={14} />
            </div>
            <div>
              <div className="text-[12px] font-semibold">Notes</div>
              <div className="text-[9px] text-[var(--color-text-tertiary)]">{notes.length} notes</div>
            </div>
          </div>
          <button
            onClick={createNewNote}
            className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[var(--color-accent)] text-white transition hover:scale-105 active:scale-95"
          >
            <FiPlus size={15} />
          </button>
        </div>

        <div className="p-3">
          <div className="flex items-center gap-2 rounded-[8px] bg-[var(--color-surface-inactive)] px-2.5 py-2">
            <FiSearch size={12} className="text-[var(--color-text-tertiary)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="min-w-0 flex-1 bg-transparent text-[11px] outline-none placeholder:text-[var(--color-text-tertiary)]"
            />
            {search && (
              <button onClick={() => setSearch("")}><FiX size={12} /></button>
            )}
          </div>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto px-2 pb-2">
          {filteredNotes.length === 0 ? (
            <div className="mt-10 text-center text-[11px] text-[var(--color-text-tertiary)]">
              No notes found
            </div>
          ) : (
            filteredNotes.map((note) => (
              <button
                key={note.id}
                onClick={() => {
                  setActiveId(note.id);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                className={`mb-1 flex w-full flex-col gap-1 rounded-[9px] p-2.5 text-left transition ${note.id === activeId ? "bg-[var(--color-surface-inactive)]" : "hover:bg-[var(--color-surface-inactive)]"
                  }`}
              >
                <span className="truncate text-[11px] font-medium">
                  {note.title || "Untitled Note"}
                </span>
                <span className="line-clamp-2 text-[9px] leading-[1.5] text-[var(--color-text-tertiary)]">
                  {note.content || "Empty note"}
                </span>
                <span className="text-[8px] text-[var(--color-text-disabled)]">
                  {formatDate(note.updatedAt)}
                </span>
              </button>
            ))
          )}
        </div>
      </aside>

      {/* MOBILE BACKDROP */}
      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black/10 md:hidden"
        />
      )}

      {/* EDITOR */}
      <main className="flex min-w-0 flex-1 flex-col">
        {activeNote ? (
          <>
            <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--color-surface-border)] px-3 py-2.5 sm:px-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="flex h-7 w-7 items-center justify-center rounded-[7px] text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-inactive)]"
                >
                  <FiMenu size={14} />
                </button>
                <input
                  value={activeNote.title}
                  onChange={(e) => updateActiveNote({ title: e.target.value })}
                  placeholder="Note Title"
                  className="max-w-[240px] bg-transparent text-[12px] font-semibold outline-none"
                />
              </div>
              <button
                onClick={() => setNoteToDelete(activeNote.id)}
                className="flex h-7 w-7 items-center justify-center rounded-[7px] text-[var(--color-text-tertiary)] transition hover:bg-red-500/10 hover:text-red-500"
              >
                <FiTrash2 size={13} />
              </button>
            </header>

            <textarea
              value={activeNote.content}
              onChange={(e) => updateActiveNote({ content: e.target.value })}
              placeholder="Start writing..."
              className="custom-scrollbar h-full w-full resize-none border-none bg-transparent px-5 py-6 text-[14px] leading-[1.8] outline-none placeholder:text-[var(--color-text-tertiary)] sm:px-9 sm:py-7"
            />
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <FiFileText size={25} className="mb-3 text-[var(--color-text-tertiary)]" />
            <div className="text-[13px] font-medium">No note selected</div>
            <button
              onClick={createNewNote}
              className="mt-4 rounded-[7px] bg-[var(--color-accent)] px-3 py-2 text-[10px] text-white"
            >
              Create note
            </button>
          </div>
        )}
      </main>

      {/* CUSTOM DELETE MODAL */}
      {noteToDelete && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm transition-all">
          <div className="w-full max-w-[280px] rounded-[12px] border border-[var(--color-surface-border)] bg-[var(--color-surface)] p-5 text-center shadow-xl">
            <h3 className="mb-2 text-[14px] font-semibold text-[var(--color-text)]">
              Delete Note
            </h3>
            <p className="mb-6 text-[11px] text-[var(--color-text-tertiary)]">
              Are you sure you want to delete this note? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setNoteToDelete(null)}
                className="flex-1 rounded-[8px] bg-[var(--color-surface-inactive)] py-2 text-[11px] font-medium text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-border)] hover:text-[var(--color-text)]"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 rounded-[8px] bg-red-500 py-2 text-[11px] font-medium text-white transition hover:bg-red-600 active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
