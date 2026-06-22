export default function Background({ dotSize = 1.5, spacing = 24 }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none -z-10"
      style={{
        backgroundImage: `
          radial-gradient(
            circle, 
            var(--color-surface-dot) ${dotSize}px, 
            transparent ${dotSize}px
          )
        `,
        backgroundSize: `${spacing}px ${spacing}px`,
      }}
    />
  );
}