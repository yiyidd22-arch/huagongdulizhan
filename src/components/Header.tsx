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

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const navLinkClass = (active: boolean) => {
    const base = "px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors";
    return `${base} ${
      active ? "bg-white/20 text-white" : "text-white/85 hover:bg-white/10 hover:text-white"
    }`;
  };

  return (
    <header className="relative z-50 bg-transparent">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="flex h-[72px] items-center justify-between gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-[#0c1526]">
              GY
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold leading-tight text-white">
                {t.company.shortName}
              </div>
              <div className="text-xs text-white/65">{t.company.brandTag}</div>
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
            <LanguageSwitcher variant="overlay" />
            <button
              className="rounded-full p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
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
          <nav className="absolute left-0 right-0 top-full mt-2 space-y-0.5 rounded-2xl border border-white/15 bg-black/50 p-3 shadow-xl backdrop-blur-xl lg:hidden">
            {navHrefs.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-4 py-2.5 text-sm font-medium ${
                    active
                      ? "bg-white/20 text-white"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
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
