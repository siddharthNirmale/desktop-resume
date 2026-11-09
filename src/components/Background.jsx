export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(var(--color-desktop-dot) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
    </div>
  );
}
