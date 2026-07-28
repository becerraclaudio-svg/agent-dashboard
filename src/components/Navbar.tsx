export function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-black/5 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-[15px] font-semibold tracking-tight text-neutral-900">Agent Activity</span>
        </div>
        <span className="text-[12px] text-neutral-400">Datos de demostración · en vivo</span>
      </div>
    </header>
  );
}
