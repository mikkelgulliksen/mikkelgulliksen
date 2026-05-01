import config from "../siteConfig";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-surface)] px-5 py-8 sm:px-8 md:px-10">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">{config.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {config.title} / Oslo / {year}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {Object.entries(config.socials).map(
            ([key, url]) =>
              url && (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)] transition-colors duration-300 hover:text-white"
                >
                  {key}
                </a>
              )
          )}
          <a
            href={`mailto:${config.contact.email}`}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)] transition-colors duration-300 hover:text-white"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
