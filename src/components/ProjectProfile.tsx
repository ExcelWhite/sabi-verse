import { Project } from "@/data/projects";

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="glass rounded-xl p-5 hover:bg-glass-hover transition-all group">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-sv-accent/10 border border-sv-accent/20 flex items-center justify-center text-sv-accent flex-shrink-0 group-hover:bg-sv-accent/20 transition-colors">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-sv-text-muted mb-1">
            {label}
          </p>
          <p className="text-sm font-semibold text-sv-text leading-snug">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function ProjectProfile({ project }: { project: Project }) {
  const stats = [
    {
      label: "Capacity",
      value: project.facts.capacity,
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    },
    {
      label: "Investment",
      value: project.facts.investment,
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
      label: "Jobs Created",
      value: project.facts.jobs,
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    },
    {
      label: "Site Area",
      value: project.facts.size,
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
    },
    {
      label: "Power Plant",
      value: project.facts.power,
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    },
    {
      label: "FX Savings",
      value: project.facts.savings,
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    },
  ];

  return (
    <section id="profile" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold text-sv-text mb-2">
            Project Profile
          </h2>
          <p className="text-sv-text-secondary">Key facts and figures</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-sv-text mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-sv-accent rounded-full" />
              Overview
            </h3>
            <p className="text-sv-text-secondary leading-relaxed text-sm">{project.overview}</p>
          </div>

          <div className="glass rounded-2xl p-6 sm:p-8">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-sv-text mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-sv-blue rounded-full" />
              Objectives
            </h3>
            <ul className="space-y-3">
              {project.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-sv-text-secondary text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sv-blue flex-shrink-0" />
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6 sm:p-8">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-sv-text mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-sv-purple rounded-full" />
              Technologies
            </h3>
            <ul className="space-y-3">
              {project.technologies.map((tech, i) => (
                <li key={i} className="flex items-start gap-3 text-sv-text-secondary text-sm">
                  <svg className="w-4 h-4 mt-0.5 text-sv-purple flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="leading-relaxed">{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6 sm:p-8">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-sv-text mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-sv-amber rounded-full" />
              Resources
            </h3>
            <div className="space-y-4">
              {project.resources.map((res, i) => (
                <div key={i} className="border-b border-white/5 last:border-0 pb-3 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-sv-text">{res.name}</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider bg-sv-accent/10 text-sv-accent px-2 py-0.5 rounded-full">
                      {res.type}
                    </span>
                  </div>
                  <p className="text-sm text-sv-text-secondary leading-relaxed">{res.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 glass rounded-2xl p-6 sm:p-8">
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-sv-text mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-sv-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Economic Impact
          </h3>
          <p className="text-sv-text-secondary leading-relaxed">{project.impact}</p>
        </div>
      </div>
    </section>
  );
}
