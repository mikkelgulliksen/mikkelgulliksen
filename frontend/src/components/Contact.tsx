import config from "../siteConfig";
import FadeInSection from "./FadeInSection";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-10 border-t border-[var(--color-border)]">
      <div className="w-full">
        <div className="max-w-xl">
          <FadeInSection>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
              Contact.
            </h2>
            <div className="w-12 h-px bg-[var(--color-text-muted)] mt-4 mb-10" />
          </FadeInSection>

          <FadeInSection delay={150}>
            <p className="text-[var(--color-text-secondary)] font-light leading-relaxed mb-10">
              Interested in working together? I'm always open to new projects and collaborations.
            </p>
          </FadeInSection>

          <FadeInSection delay={250}>
            <a
              href={`mailto:${config.contact.email}`}
              className="inline-block text-lg md:text-xl font-light text-white hover:text-[var(--color-text-secondary)] transition-colors duration-300 border-b border-[var(--color-border)] hover:border-white pb-1"
            >
              {config.contact.email}
            </a>
          </FadeInSection>

          {config.contact.phone && (
            <FadeInSection delay={350}>
              <p className="text-[var(--color-text-secondary)] font-light mt-4">
                {config.contact.phone}
              </p>
            </FadeInSection>
          )}

          {/* Social links */}
          {Object.values(config.socials).some(Boolean) && (
            <FadeInSection delay={400}>
              <div className="flex gap-6 mt-10">
                {Object.entries(config.socials).map(
                  ([key, url]) =>
                    url && (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] hover:text-white transition-colors duration-300"
                      >
                        {key}
                      </a>
                    )
                )}
              </div>
            </FadeInSection>
          )}
        </div>
      </div>
    </section>
  );
}
