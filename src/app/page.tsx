"use client";

import { useState, lazy, Suspense } from "react";
import { Project } from "@/data/projects";
import { searchProjects, SearchResult } from "@/lib/query";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectProfile from "@/components/ProjectProfile";
import Timeline from "@/components/Timeline";
import VideoSection from "@/components/VideoSection";
import Footer from "@/components/Footer";

const MapView = lazy(() => import("@/components/MapView"));

export default function Home() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showMap, setShowMap] = useState(false);

  function handleSearch(q: string) {
    setQuery(q);
    setIsSearching(true);
    setSelectedProject(null);
    setSelectedAnswer(null);

    setTimeout(() => {
      const found = searchProjects(q);
      setResults(found);
      setIsSearching(false);

      if (found.length === 1) {
        setSelectedProject(found[0].project);
        setSelectedAnswer(found[0]);
      }

      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 500);
  }

  function selectProject(result: SearchResult) {
    setSelectedProject(result.project);
    setSelectedAnswer(result);
    setTimeout(() => {
      document.getElementById("project-detail")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function handleMapSelectProject(project: Project) {
    setShowMap(false);
    const found = searchProjects(project.name);
    setResults(found);
    setQuery(project.name);
    const match = found.find((r) => r.project.id === project.id);
    if (match) {
      setSelectedProject(match.project);
      setSelectedAnswer(match);
    } else {
      setSelectedProject(project);
      setSelectedAnswer(found[0] || null);
    }
    setTimeout(() => {
      const el = document.getElementById("project-detail") || document.getElementById("results");
      el?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero onSearch={handleSearch} />

        {isSearching && (
          <div id="results" className="pt-16 pb-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="flex items-center justify-center gap-3 text-sv-text-secondary">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sv-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-sv-blue animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-sv-purple animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-sm">Searching project database...</span>
              </div>
            </div>
          </div>
        )}

        {!isSearching && results.length > 0 && (
          <div id="results" className="pt-12 pb-4">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-xs text-sv-text-muted mb-6">
                {results.length} project{results.length > 1 ? "s" : ""} found for &ldquo;{query}&rdquo;
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {results.map((result) => (
                  <button
                    key={result.project.id}
                    onClick={() => selectProject(result)}
                    className={`glass rounded-2xl p-5 text-left transition-all cursor-pointer group ${
                      selectedProject?.id === result.project.id
                        ? "border-sv-accent/50 accent-glow"
                        : "hover:bg-glass-hover"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        selectedProject?.id === result.project.id
                          ? "bg-sv-accent/20 border border-sv-accent/40"
                          : "bg-glass-bg border border-glass-border group-hover:border-sv-accent/30"
                      }`}>
                        <span className="text-sv-accent font-[family-name:var(--font-space-grotesk)] font-bold text-sm">
                          {result.project.name[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-sv-text text-sm mb-1 truncate">
                          {result.project.name}
                        </h3>
                        <p className="text-xs text-sv-text-muted mb-2">
                          {result.project.region}, {result.project.country}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                            result.project.sector.includes("Energy")
                              ? "bg-sv-amber/10 text-sv-amber"
                              : "bg-sv-purple/10 text-sv-purple"
                          }`}>
                            {result.project.sector}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-sv-text-muted">
                            <span className="w-1.5 h-1.5 rounded-full bg-sv-accent" />
                            {result.project.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {selectedAnswer && selectedProject && (
                <div className="glass rounded-2xl p-6 sm:p-8 mb-8 animate-[slideUp_0.4s_ease-out_forwards]">
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        selectedAnswer.confidence === "high"
                          ? "bg-sv-accent"
                          : selectedAnswer.confidence === "medium"
                          ? "bg-sv-blue"
                          : "bg-sv-text-muted"
                      }`}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-sv-text-muted">
                      {selectedAnswer.confidence === "high"
                        ? "Direct Match"
                        : selectedAnswer.confidence === "medium"
                        ? "Relevant Answer"
                        : "General Info"}
                    </span>
                    <span className="text-[10px] text-sv-text-muted">
                      — from {selectedProject.name}
                    </span>
                  </div>

                  <div className="border-l-2 border-sv-accent/30 pl-4">
                    {selectedAnswer.answer.split("\n\n").map((para, i) => {
                      const boldMatch = para.match(/^\*\*(.+?):\*\*\s*(.+)$/);
                      if (boldMatch) {
                        return (
                          <div key={i} className={i > 0 ? "mt-3" : ""}>
                            <span className="font-semibold text-sv-accent">
                              {boldMatch[1]}:
                            </span>{" "}
                            <span className="text-sv-text">{boldMatch[2]}</span>
                          </div>
                        );
                      }
                      return (
                        <p key={i} className={`text-sv-text-secondary leading-relaxed ${i > 0 ? "mt-3" : ""}`}>
                          {para}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {selectedProject && (
              <div id="project-detail">
                <div className="accent-line" />
                <ProjectProfile project={selectedProject} />
                {selectedProject.videoId && selectedProject.videoId !== "dQw4w9WgXcQ" && (
                  <>
                    <div className="accent-line" />
                    <VideoSection project={selectedProject} />
                  </>
                )}
                <div className="accent-line" />
                <Timeline project={selectedProject} />
              </div>
            )}
          </div>
        )}

        {!isSearching && query && results.length === 0 && (
          <div id="results" className="pt-16 pb-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="glass rounded-2xl p-8">
                <p className="text-sv-text-secondary mb-2">
                  No projects found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-sv-text-muted">
                  Try searching for &ldquo;Dangote Refinery&rdquo; or &ldquo;Tulu Kapi Gold&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />

      {/* Floating Map Button */}
      <button
        onClick={() => setShowMap(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 group"
        style={{
          background: "linear-gradient(135deg, #00d4aa, #4d7cff)",
          boxShadow: "0 4px 20px rgba(0, 212, 170, 0.4), 0 0 40px rgba(0, 212, 170, 0.15)",
        }}
        title="View Project Map"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg text-xs font-medium text-sv-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ background: "rgba(10,10,18,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          Project Map
        </span>
      </button>

      {/* Map Modal */}
      {showMap && (
        <Suspense fallback={
          <div className="fixed inset-0 z-[60] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.6)" }}>
            <div className="flex items-center gap-3 text-sv-text-secondary">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sv-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-sv-blue animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-sv-purple animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-sm">Loading map...</span>
            </div>
          </div>
        }>
          <MapView
            onSelectProject={handleMapSelectProject}
            onClose={() => setShowMap(false)}
          />
        </Suspense>
      )}
    </>
  );
}
