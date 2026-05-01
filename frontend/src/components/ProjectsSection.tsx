import { useState } from "react";
import config, { projectKey } from "../siteConfig";
import type { Project } from "../siteConfig";
import FadeInSection from "./FadeInSection";
import VideoEmbed from "./VideoEmbed";

const ALL = "ALL";
type Filter = typeof ALL | Project["category"];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>(ALL);

  const filteredProjects =
    activeFilter === ALL
      ? config.projects
      : config.projects.filter((p) => p.category === activeFilter);

  // Collect unique categories that exist
  const usedCategories: Filter[] = [
    ALL,
    ...Array.from(new Set(config.projects.map((p) => p.category))),
  ];

  return (
    <section
      id="works"
      className="relative border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-16 sm:px-8 md:px-10 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1680px]">
        <FadeInSection>
          <div className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_360px] md:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                Selected work
              </p>
              <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                Works.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[var(--color-text-secondary)] md:justify-self-end md:text-right">
              Campaigns, music videos, film and live work across domestic and international productions.
            </p>
          </div>
        </FadeInSection>

        {usedCategories.length > 2 && (
          <FadeInSection delay={100}>
            <div className="mb-8 flex flex-wrap gap-2 border-y border-white/10 py-4 md:mb-12">
              {usedCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`min-h-10 rounded-full border px-4 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                    activeFilter === cat
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-white/[0.03] text-[var(--color-text-muted)] hover:border-white/30 hover:text-white"
                  }`}
                >
                  {cat === ALL ? "All" : cat}
                </button>
              ))}
            </div>
          </FadeInSection>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12">
          {filteredProjects.map((project, i) => {
            const isFeatured = activeFilter === ALL && i < 2;

            return (
              <FadeInSection
                key={projectKey(project)}
                className={isFeatured ? "xl:col-span-6" : "xl:col-span-4"}
                delay={Math.min(i * 45, 360)}
              >
                <ProjectCard project={project} featured={isFeatured} />
              </FadeInSection>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-[var(--color-text-muted)] mt-12 text-sm">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  featured,
}: {
  project: Project;
  featured: boolean;
}) {
  return (
    <article className="group h-full">
      <div className="h-full overflow-hidden rounded-[6px] border border-white/10 bg-[var(--color-surface-card)] transition-all duration-500 group-hover:border-white/25 group-hover:bg-[#1b1915]">
        <div className="overflow-hidden bg-black">
          <VideoEmbed
            youtubeId={project.youtubeId}
            vimeoId={project.vimeoId}
            mp4Url={project.mp4Url}
            posterUrl={project.posterUrl}
            title={project.title}
          />
        </div>

        <div className={featured ? "p-5 md:p-6" : "p-4 md:p-5"}>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            <span className="text-[var(--color-accent)]">{project.category}</span>
            <span className="h-px w-5 bg-white/15" />
            <span>{project.year}</span>
          </div>
          <h3
            className={`font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-[var(--color-text-primary)] ${
              featured ? "text-xl md:text-2xl" : "text-base md:text-lg"
            }`}
          >
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {project.role}
          </p>
        </div>
      </div>
    </article>
  );
}
