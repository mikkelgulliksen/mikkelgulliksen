import { useState, useEffect } from "react";
import config from "../siteConfig";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Works", href: "#works" },
    { label: "About", href: "#om" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[var(--color-surface)]/88 shadow-[0_16px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="flex h-20 w-full items-center justify-between px-5 sm:px-8 md:px-10">
        <a href="#" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xs font-bold tracking-[0.14em] text-white backdrop-blur-md transition-colors duration-300 group-hover:border-white/35">
            MG
          </span>
          <span className="text-base font-bold tracking-tight text-white sm:text-lg">
            {config.name}
          </span>
          <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)] lg:inline">
            {config.title}
          </span>
        </a>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/20 p-1 backdrop-blur-md md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)] transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 text-[var(--color-text-secondary)] backdrop-blur-md transition-colors hover:text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-b border-white/10 bg-[var(--color-surface)]/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2 px-5 py-5 sm:px-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-full px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
