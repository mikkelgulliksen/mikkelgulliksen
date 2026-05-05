import { type FormEvent, type ReactNode, useState } from "react";
import config from "../siteConfig";
import FadeInSection from "./FadeInSection";

const highlights = [
  "15 years in production",
  "TVC, music videos, stills and content",
  "International service productions and VFX-heavy work",
];

export default function About() {
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
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
      className="border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-5 py-16 sm:px-8 md:px-10 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,440px)] lg:gap-16">
          <FadeInSection>
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                {config.aboutHeading}
              </p>
              <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
                Production experience for ambitious moving images.
              </h2>

              <div className="mt-8 grid gap-px overflow-hidden rounded-[6px] border border-white/10 bg-white/10 sm:grid-cols-3">
                {highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="bg-[var(--color-surface-elevated)] px-4 py-4 text-sm font-semibold leading-5 text-[var(--color-text-primary)]"
                  >
                    {highlight}
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-6 text-sm leading-7 text-[var(--color-text-secondary)] md:grid-cols-2 md:text-base md:leading-8">
                {config.aboutText.slice(2, 5).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
                <span className="font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  Base
                </span>
                <span>Oslo, Norway</span>
                {Object.values(config.socials).some(Boolean) && (
                  <div className="flex gap-3">
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
            </div>
          </FadeInSection>

          <FadeInSection delay={160} className="lg:sticky lg:top-28 lg:self-start">
            <div
              id="contact"
              className="rounded-[6px] border border-white/10 bg-[var(--color-surface-card)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-6 md:p-7"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                Contact
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                Get in touch.
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
                Send a note about the production, timing, location and what needs to happen next.
              </p>

              <form onSubmit={onSubmit} className="mt-7 space-y-4">
                <FieldLabel label="Name" optional />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-[4px] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-[var(--color-text-muted)] focus:border-white/40 focus:outline-none focus:ring-0"
                  placeholder="Your name"
                  autoComplete="name"
                />

                <FieldLabel label="Email" />
                <input
                  value={fromEmail}
                  onChange={(e) => setFromEmail(e.target.value)}
                  className="w-full rounded-[4px] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-[var(--color-text-muted)] focus:border-white/40 focus:outline-none focus:ring-0"
                  placeholder="you@example.com"
                  autoComplete="email"
                  inputMode="email"
                  required
                />

                <FieldLabel label="Message" />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-36 w-full resize-y rounded-[4px] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-[var(--color-text-muted)] focus:border-white/40 focus:outline-none focus:ring-0"
                  placeholder="What are you looking to make?"
                  required
                />

                {error && <p className="text-sm text-[var(--color-accent)]">{error}</p>}

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white bg-white px-5 text-sm font-semibold uppercase tracking-[0.14em] text-black transition-colors duration-300 hover:bg-[var(--color-accent)]"
                >
                  Send
                </button>

                <p className="text-xs leading-5 text-[var(--color-text-muted)]">
                  Opens your email app and sends to {config.contact.email}.
                </p>
              </form>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

function FieldLabel({ label, optional = false }: { label: string; optional?: boolean }) {
  return (
    <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
      {label}
      {optional && <span className="ml-2 font-normal tracking-[0.1em]">Optional</span>}
    </label>
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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[var(--color-text-muted)] transition-all duration-300 hover:border-white/40 hover:text-white"
    >
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
