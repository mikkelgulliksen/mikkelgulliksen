import config from "../siteConfig";
import FadeInSection from "./FadeInSection";

export default function About() {
  return (
    <section id="om" className="py-24 md:py-32 px-6 bg-[var(--color-surface-elevated)]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image / Visual */}
          <FadeInSection>
            <div className="relative">
              {config.profileImageUrl ? (
                <img
                  src={config.profileImageUrl}
                  alt={config.name}
                  className="w-full aspect-[3/4] object-cover rounded-xl"
                />
              ) : (
                <div className="w-full aspect-[3/4] rounded-xl bg-gradient-to-br from-[var(--color-brand-900)]/30 via-[var(--color-surface-card)] to-[var(--color-brand-800)]/20 border border-[var(--color-border)] flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 text-[var(--color-text-muted)] mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Legg til profilbilde i<br />
                      <code className="text-xs bg-[var(--color-surface)] px-2 py-0.5 rounded">siteConfig.ts</code>
                    </p>
                  </div>
                </div>
              )}
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-[var(--color-brand-600)]/20 rounded-xl -z-10" />
            </div>
          </FadeInSection>

          {/* Text */}
          <FadeInSection delay={200}>
            <div>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-brand-400)] mb-3">
                {config.aboutHeading}
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {config.name}
              </h2>
              <div className="space-y-5">
                {config.aboutText.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-[var(--color-text-secondary)] leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Social links */}
              {Object.values(config.socials).some(Boolean) && (
                <div className="flex gap-4 mt-8">
                  {config.socials.instagram && (
                    <SocialLink href={config.socials.instagram} label="Instagram">
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z" />
                    </SocialLink>
                  )}
                  {config.socials.linkedin && (
                    <SocialLink href={config.socials.linkedin} label="LinkedIn">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                    </SocialLink>
                  )}
                  {config.socials.imdb && (
                    <SocialLink href={config.socials.imdb} label="IMDb">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                    </SocialLink>
                  )}
                  {config.socials.vimeo && (
                    <SocialLink href={config.socials.vimeo} label="Vimeo">
                      <path d="M22 7.42c-.09 2.1-1.56 4.97-4.39 8.61C14.7 19.69 12.26 21.5 10.23 21.5c-1.26 0-2.32-1.16-3.18-3.49-.58-2.12-1.16-4.25-1.74-6.37C4.71 9.31 4.07 8.15 3.39 8.15c-.16 0-.71.33-1.66 1l-.99-1.27c1.04-.92 2.07-1.84 3.08-2.75 1.39-1.2 2.43-1.83 3.13-1.89 1.64-.16 2.65.96 3.03 3.37.41 2.6.69 4.21.85 4.84.47 2.14.99 3.21 1.55 3.21.44 0 1.1-.69 1.97-2.08.87-1.39 1.34-2.45 1.4-3.17.12-1.2-.35-1.8-1.41-1.8-.5 0-1.02.12-1.55.34 1.03-3.37 3-5.01 5.92-4.93 2.17.06 3.19 1.47 3.07 4.22Z" />
                    </SocialLink>
                  )}
                </div>
              )}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-brand-400)] hover:border-[var(--color-brand-400)]/50 transition-all duration-200"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        {children}
      </svg>
    </a>
  );
}
