import config from "../siteConfig";
import FadeInSection from "./FadeInSection";
import VideoEmbed from "./VideoEmbed";

export default function Hero() {
  const featuredId = config.featuredYoutubeId || config.projects[0]?.youtubeId;

  return (
    <section className="relative pt-20 pb-0">
      {/* Featured reel — edge-to-edge cinematic strip */}
      {featuredId && (
        <FadeInSection>
          <div className="w-full px-0">
            <div className="overflow-hidden max-h-[55vh]">
              <VideoEmbed youtubeId={featuredId} title="Featured Reel" />
            </div>
          </div>
        </FadeInSection>
      )}

      {/* Scroll indicator */}
      <div className="flex justify-center py-10">
        <a href="#works" className="group flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] group-hover:text-white transition-colors">
            Works
          </span>
          <svg className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-white transition-colors animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
