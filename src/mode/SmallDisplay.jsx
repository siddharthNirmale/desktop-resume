export default function SmallDisplay({ windows, toggleWindow, setWallpaper }) {
  return (
    <div className="w-full h-full bg-white text-black flex flex-col items-center justify-center p-6">
      {/* Your mobile sandbox starts right here */}
      <h1 className="text-2xl font-bold tracking-tight mb-2">Mobile Mode Workspace</h1>
      <p className="text-sm text-gray-500 text-center max-w-xs">
        This is a completely clean canvas. No templates, backgrounds, or component dependencies imported.
      </p>
    </div>
  );
}