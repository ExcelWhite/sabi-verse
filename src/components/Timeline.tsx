import { Project } from "@/data/projects";

export default function Timeline({ project }: { project: Project }) {
  return (
    <section id="timeline" className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold text-sv-text mb-2">
            Project Timeline
          </h2>
          <p className="text-sv-text-secondary">Key milestones from inception to operations</p>
        </div>

        <div className="relative">
          <div className="absolute left-[15px] sm:left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-sv-accent via-sv-blue to-sv-purple" />

          <div className="space-y-6">
            {project.milestones.map((milestone, i) => (
              <div key={i} className="relative flex items-start gap-5 pl-10">
                <div className="absolute left-0 z-10">
                  <div
                    className={`w-[30px] h-[30px] rounded-full flex items-center justify-center ${
                      milestone.status === "completed"
                        ? "bg-sv-accent/20 border border-sv-accent/40"
                        : milestone.status === "in-progress"
                        ? "bg-sv-amber/20 border border-sv-amber/40"
                        : "bg-sv-surface border border-white/10"
                    }`}
                  >
                    {milestone.status === "completed" ? (
                      <svg className="w-3.5 h-3.5 text-sv-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : milestone.status === "in-progress" ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-sv-amber animate-pulse" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-sv-text-muted" />
                    )}
                  </div>
                </div>

                <div className="glass rounded-xl p-5 flex-1 hover:bg-glass-hover transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-sv-text-muted">{milestone.date}</span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        milestone.status === "completed"
                          ? "bg-sv-accent/10 text-sv-accent"
                          : milestone.status === "in-progress"
                          ? "bg-sv-amber/10 text-sv-amber"
                          : "bg-white/5 text-sv-text-muted"
                      }`}
                    >
                      {milestone.status === "in-progress" ? "In Progress" : milestone.status}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-base font-bold text-sv-text mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-sv-text-secondary leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
