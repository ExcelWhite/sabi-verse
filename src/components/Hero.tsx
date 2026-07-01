"use client";

import Image from "next/image";

export default function Hero({ onSearch }: { onSearch: (q: string) => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/hero-img.avif"
        alt="African engineering landscape"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-sv-dark/70 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-sv-dark/40 via-transparent to-sv-dark" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-sv-accent animate-pulse" />
          <span className="text-sv-accent text-xs font-medium tracking-wider uppercase">
            Africa&apos;s Project Intelligence
          </span>
        </div>

        <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
          Know What&apos;s Being{" "}
          <span className="gradient-text">Built</span>
        </h1>

        <p className="text-lg sm:text-xl text-sv-text-secondary leading-relaxed mb-10 max-w-xl mx-auto">
          Search Africa&apos;s engineering and resource projects.
          Get facts, watch explainers, understand what matters.
        </p>

        <div className="relative max-w-2xl mx-auto">
          <div className="glass-strong rounded-2xl p-1.5 accent-glow">
            <div className="relative flex items-center">
              <svg className="absolute left-4 w-5 h-5 text-sv-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search projects, resources, or ask a question..."
                className="w-full bg-transparent text-sv-text placeholder:text-sv-text-muted pl-12 pr-24 py-4 text-base focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value.trim()) {
                    onSearch(e.currentTarget.value.trim());
                  }
                }}
              />
              <button
                onClick={(e) => {
                  const input = (e.currentTarget.parentElement?.querySelector("input") as HTMLInputElement);
                  if (input?.value.trim()) onSearch(input.value.trim());
                }}
                className="absolute right-2 bg-sv-accent hover:bg-sv-accent-light text-sv-dark font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {["Dangote Refinery", "Tulu Kapi Gold", "Gold mining in Ethiopia"].map((q) => (
            <button
              key={q}
              onClick={() => onSearch(q)}
              className="text-xs px-3.5 py-1.5 rounded-full glass text-sv-text-secondary hover:text-sv-accent hover:border-sv-accent/30 transition-all cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sv-dark to-transparent" />
    </section>
  );
}
