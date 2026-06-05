"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { company } from "@/lib/data";
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

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-primary text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm gap-4">
          <span className="hidden sm:inline truncate">{t.company.name}</span>
          <div className="flex items-center gap-4 ml-auto shrink-0">
            <a href={`mailto:${company.email}`} className="hover:underline hidden md:inline">
              {company.email}
            </a>
            <span className="hidden lg:inline">|</span>
            <span className="hidden lg:inline">{company.phones.international[0]}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-bold text-white">
              GY
            </div>
            <div>
              <div className="text-sm font-bold text-primary leading-tight">{t.company.shortName}</div>
              <div className="text-xs text-gray-500">{t.company.brandTag}</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navHrefs.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    active
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                  }`}
                >
                  {t.nav[item.key]}
                </Link>
              );
            })}
          </nav>

          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden border-t py-3 space-y-1">
            {navHrefs.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                {t.nav[item.key]}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
