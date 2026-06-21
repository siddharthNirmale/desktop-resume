export default function Background() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          radial-gradient(
            rgba(255,255,255,0.15) 2px,
            transparent 1px
          )
        `,
        backgroundSize: '24px 24px',
      }}
    />
  );
}