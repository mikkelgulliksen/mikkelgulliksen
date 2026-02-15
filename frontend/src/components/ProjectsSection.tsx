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
    <section id="works" className="pt-4 pb-24 md:pb-32 px-6 md:px-10">
      <div className="w-full">
        {/* Section header */}
        <FadeInSection>
          <div className="mb-14">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Works.
            </h2>
            <div className="w-12 h-px bg-[var(--color-text-muted)] mt-4" />
          </div>
        </FadeInSection>

        {/* Filter row */}
        {usedCategories.length > 2 && (
          <FadeInSection delay={100}>
            <div className="flex flex-wrap gap-6 mt-6 mb-14">
              {usedCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`text-xs tracking-[0.15em] uppercase transition-all duration-300 pb-1 border-b ${
                    activeFilter === cat
                      ? "text-white border-white"
                      : "text-[var(--color-text-muted)] border-transparent hover:text-[var(--color-text-secondary)]"
                  }`}
                >
                  {cat === ALL ? "All" : cat}
                </button>
              ))}
            </div>
          </FadeInSection>
        )}

        {/* Project grid — 3 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-5 gap-y-12">
          {filteredProjects.map((project, i) => (
            <FadeInSection key={projectKey(project)} delay={i * 60}>
              <div className="group">
                {/* Thumbnail / Video */}
                <div className="overflow-hidden rounded-sm mb-4">
                  <VideoEmbed
                    youtubeId={project.youtubeId}
                    vimeoId={project.vimeoId}
                    mp4Url={project.mp4Url}
                    posterUrl={project.posterUrl}
                    title={project.title}
                  />
                </div>

                {/* Info — clean white text */}
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-1.5">
                    {project.category}
                  </p>
                  <h3 className="text-sm font-semibold text-white leading-snug mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-light text-[var(--color-text-muted)]">
                    {project.role} · {project.year}
                  </p>
                </div>
              </div>
            </FadeInSection>
          ))}
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
