import type { ReactNode } from "react";
import { useState } from "react";
import config from "../siteConfig";
import FadeInSection from "./FadeInSection";

export default function About() {
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const trimmedEmail = fromEmail.trim();
    const trimmedMessage = message.trim();

    if (!trimmedEmail || !trimmedMessage) {
      setError("Please fill in email and message.");
      return;
    }

    const subject = name.trim()
      ? `Contact from ${name.trim()}`
      : "Contact from mikkelgulliksen.no";

    const body = [
      name.trim() ? `Name: ${name.trim()}` : null,
      `Email: ${trimmedEmail}`,
      "",
      trimmedMessage,
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${config.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }

  return (
    <section
      id="om"
      className="py-24 md:py-32 px-6 md:px-10 bg-[var(--color-surface-elevated)] border-t border-[var(--color-border)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Two-column: Bio left, Contact right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* ── Left: About / Bio ── */}
          <FadeInSection>
            <div>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-3">
                {config.aboutHeading}
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {config.name}
              </h2>
              <div className="space-y-4">
                {config.aboutText.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-[var(--color-text-secondary)] leading-relaxed text-sm md:text-base"
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

          {/* ── Right: Contact form ── */}
          <FadeInSection delay={200}>
            <div id="contact">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                Get in touch.
              </h3>
              <div className="w-12 h-px bg-[var(--color-text-muted)] mt-4 mb-8" />
              <p className="text-[var(--color-text-secondary)] font-light leading-relaxed mb-8 text-sm">
                Send me a message and I'll get back to you.
              </p>

              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-2">
                    Name (optional)
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-white/30"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-2">
                    Email
                  </label>
                  <input
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    className="w-full rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-white/30"
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-2">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full min-h-32 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-white/30"
                    placeholder="What are you looking to make?"
                    required
                  />
                </div>

                {error && (
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-block text-sm tracking-[0.15em] uppercase text-white border border-[var(--color-border)] px-5 py-2.5 hover:border-white transition-colors duration-300"
                >
                  Send
                </button>

                <p className="text-xs text-[var(--color-text-muted)]">
                  Opens your email app — sends to {config.contact.email}.
                </p>
              </form>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-white hover:border-white/50 transition-all duration-200"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        {children}
      </svg>
    </a>
  );
}
