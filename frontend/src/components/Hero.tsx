import { useState } from "react";
import config from "../siteConfig";

export default function Hero() {
  const [isReelOpen, setIsReelOpen] = useState(false);
  const featuredYoutubeId = config.featuredYoutubeId || config.projects[0]?.youtubeId;
  const heroPoster = config.featuredPosterUrl;
  const heroMp4 = config.featuredMp4Url;

  return (
    <section className="relative min-h-[86svh] overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-surface)] pt-20">
      <div className="absolute inset-0">
        {heroMp4 ? (
          <video
            className="h-full w-full object-cover opacity-80"
            src={heroMp4}
            poster={heroPoster}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : heroPoster ? (
          <img className="h-full w-full object-cover opacity-80" src={heroPoster} alt="" />
        ) : null}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/70 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(86svh-5rem)] w-full max-w-[1680px] flex-col justify-end px-5 pb-10 pt-24 sm:px-8 md:px-10 md:pb-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div className="max-w-5xl">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.32em] text-[var(--color-accent)]">
              {config.title} / Line Producer
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-[0.92] tracking-tight text-[var(--color-text-primary)] min-[420px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              {config.name}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)] md:text-xl md:leading-8">
              TVC, music videos, campaigns and content from Oslo for international artists and brands.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsReelOpen(true)}
                className="group inline-flex h-12 items-center gap-3 rounded-full border border-white/25 bg-white px-5 text-sm font-semibold uppercase tracking-[0.14em] text-black transition-all duration-300 hover:bg-[var(--color-accent)]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:scale-105">
                  <svg className="ml-0.5 h-3 w-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Play reel
              </button>
              <a
                href="#works"
                className="inline-flex h-12 items-center rounded-full border border-white/20 bg-black/25 px-5 text-sm font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all duration-300 hover:border-white/55 hover:bg-white/10"
              >
                Works
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center rounded-full border border-transparent px-5 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-text-secondary)] transition-all duration-300 hover:text-white"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 min-[520px]:grid-cols-2 lg:grid-cols-1">
            <HeroFact label="Base" value="Oslo" />
            <HeroFact label="Work" value="TVC / MVs / Content" />
          </div>
        </div>

        <a
          href="#works"
          className="mt-10 flex w-full items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--color-text-muted)] transition-colors duration-300 hover:text-white md:mt-14"
        >
          <span>Selected work</span>
          <span className="h-px flex-1 bg-white/15" />
          <svg className="h-4 w-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </a>
      </div>

      {isReelOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl md:p-8">
          <button
            type="button"
            onClick={() => setIsReelOpen(false)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors duration-300 hover:bg-white/20"
            aria-label="Close reel"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-full max-w-6xl overflow-hidden border border-white/15 bg-black shadow-2xl">
            {heroMp4 ? (
              <video
                className="aspect-video w-full bg-black object-contain"
                src={heroMp4}
                poster={heroPoster}
                controls
                autoPlay
                playsInline
              />
            ) : featuredYoutubeId ? (
              <iframe
                className="aspect-video w-full"
                src={`https://www.youtube.com/embed/${featuredYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
                title="Featured reel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}

function HeroFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-black/32 px-4 py-4 backdrop-blur-md sm:px-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-white sm:text-base">{value}</p>
    </div>
  );
}
