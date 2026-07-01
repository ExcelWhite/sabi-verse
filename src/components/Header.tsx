"use client";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="accent-line" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-sv-accent/20 border border-sv-accent/30 flex items-center justify-center text-sv-accent font-[family-name:var(--font-space-grotesk)] font-bold text-sm group-hover:bg-sv-accent/30 transition-colors">
              S
            </div>
            <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-sv-text tracking-tight">
              Sabi<span className="text-sv-accent">Verse</span>
            </span>
          </a>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-sv-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-sv-accent animate-pulse" />
            <span>Powered by African data</span>
          </div>
        </div>
      </div>
    </header>
  );
}
