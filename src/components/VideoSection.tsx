import { Project } from "@/data/projects";

export default function VideoSection({ project }: { project: Project }) {
  return (
    <section id="video" className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold text-sv-text mb-2">
            Watch the Explainer
          </h2>
          <p className="text-sv-text-secondary">
            No jargon, no gatekeeping — just clear explanation.
          </p>
        </div>

        <div className="glass rounded-2xl overflow-hidden accent-glow">
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${project.videoId}?rel=0&modestbranding=1`}
              title={project.videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-sv-text">
              {project.videoTitle}
            </h3>
            <p className="text-sv-text-muted text-xs mt-1">SabiVerse explainer series</p>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${project.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sv-accent hover:text-sv-accent-light text-sm font-medium transition-colors"
          >
            Watch on YouTube
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
