import config from "../siteConfig";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] py-8 px-6 md:px-10">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs font-light text-[var(--color-text-muted)] tracking-wide">
          &copy; {year} {config.name}
        </p>
        <div className="flex gap-6">
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
      </div>
    </footer>
  );
}
