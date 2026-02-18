import { useState } from "react";
import config from "../siteConfig";
import FadeInSection from "./FadeInSection";

export default function Contact() {
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
              Send me a message and I’ll get back to you.
            </p>
          </FadeInSection>

          <FadeInSection delay={200}>
            <form onSubmit={onSubmit} className="space-y-4 mb-10">
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-2">
                  Name (optional)
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-sm border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-white/30"
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
                  className="w-full rounded-sm border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-white/30"
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
                  className="w-full min-h-32 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-white/30"
                  placeholder="What are you looking to make?"
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-[var(--color-text-secondary)]">{error}</p>
              )}

              <button
                type="submit"
                className="inline-block text-sm tracking-[0.15em] uppercase text-white border border-[var(--color-border)] px-4 py-2 hover:border-white transition-colors duration-300"
              >
                Send
              </button>

              <p className="text-xs text-[var(--color-text-muted)]">
                This opens your email app and sends to {config.contact.email}.
              </p>
            </form>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
