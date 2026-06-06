"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const navHrefs = [
  { href: "/", key: "home" as const },
  { href: "/about", key: "about" as const },
  { href: "/products", key: "products" as const },
  { href: "/news", key: "news" as const },
  { href: "/contact", key: "contact" as const },
];

const SCROLL_THRESHOLD = 48;

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  const overlay = !scrolled;

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const navLinkClass = (active: boolean) => {
    const base = "px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors";
    if (overlay) {
      return `${base} ${active ? "bg-white/20 text-white" : "text-white/85 hover:bg-white/10 hover:text-white"}`;
    }
    return `${base} ${
      active
        ? "bg-cyan-500/15 text-cyan-300"
        : "text-slate-400 hover:bg-white/5 hover:text-cyan-300"
    }`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled ? "px-3 pt-3 md:px-6 md:pt-4" : ""
      }`}
    >
      <div
        className={`relative mx-auto transition-all duration-500 ease-out ${
          scrolled
            ? "max-w-2xl lg:max-w-3xl rounded-full border border-cyan-500/15 bg-[#0c1526]/90 px-4 shadow-[0_4px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl md:px-5"
            : "max-w-7xl px-4"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-3 transition-all duration-500 ${
            scrolled ? "h-12 py-1" : "h-[72px]"
          }`}
        >
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors duration-500 ${
                overlay
                  ? "bg-white text-[#0c1526]"
                  : "border border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
              }`}
            >
              GY
            </div>
            <div className="hidden sm:block">
              <div
                className={`text-sm font-bold leading-tight transition-colors duration-500 ${
                  overlay ? "text-white" : "text-slate-200"
                }`}
              >
                {t.company.shortName}
              </div>
              {!scrolled && (
                <div
                  className={`text-xs transition-colors duration-500 ${
                    overlay ? "text-white/65" : "text-slate-500"
                  }`}
                >
                  {t.company.brandTag}
                </div>
              )}
            </div>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {navHrefs.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass(isActive(item.href))}>
                {t.nav[item.key]}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitcher variant={overlay ? "overlay" : "dark"} />
            <button
              className={`rounded-full p-2 transition-colors lg:hidden ${
                overlay ? "text-white hover:bg-white/10" : "text-slate-400 hover:bg-white/5 hover:text-cyan-300"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="absolute left-0 right-0 top-full mt-2 space-y-0.5 rounded-2xl border border-cyan-500/15 bg-[#0c1526]/95 p-3 shadow-xl backdrop-blur-xl lg:hidden">
            {navHrefs.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-4 py-2.5 text-sm font-medium ${
                    active
                      ? "bg-cyan-500/15 text-cyan-300"
                      : "text-slate-400 hover:bg-white/5 hover:text-cyan-300"
                  }`}
                >
                  {t.nav[item.key]}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
