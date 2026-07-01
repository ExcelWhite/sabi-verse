export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sv-accent/20 border border-sv-accent/30 flex items-center justify-center text-sv-accent font-[family-name:var(--font-space-grotesk)] font-bold text-xs">
              S
            </div>
            <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-sv-text tracking-tight">
              Sabi<span className="text-sv-accent">Verse</span>
            </span>
          </div>

          <p className="text-xs text-sv-text-muted text-center sm:text-right">
            Built by Africans, for Africans. Phase 1 &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
