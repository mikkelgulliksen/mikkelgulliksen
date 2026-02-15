import config from "../siteConfig";
import FadeInSection from "./FadeInSection";
import YouTubeEmbed from "./YouTubeEmbed";

export default function ReelSection() {
  // Use either the dedicated showreel, or the first project video
  const reelId = config.showreelYoutubeId || config.projects[0]?.youtubeId;

  if (!reelId) return null;

  return (
    <section id="reel" className="py-24 md:py-32 px-6 bg-[var(--color-surface-elevated)]">
      <div className="max-w-5xl mx-auto">
        <FadeInSection>
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-brand-400)] mb-3">
              Showreel
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Mitt arbeid
            </h2>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="rounded-xl overflow-hidden border border-[var(--color-border)] shadow-2xl shadow-black/30">
            <YouTubeEmbed youtubeId={reelId} title="Showreel" />
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
