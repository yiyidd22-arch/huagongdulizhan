"use client";

import Link from "next/link";
import { company } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";

const navHrefs = [
  { href: "/", key: "home" as const },
  { href: "/about", key: "about" as const },
  { href: "/products", key: "products" as const },
  { href: "/news", key: "news" as const },
  { href: "/contact", key: "contact" as const },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">{t.company.name}</h3>
            <p className="text-sm leading-relaxed">{t.company.subsidiary}</p>
            <p className="mt-2 text-sm text-secondary font-medium">{t.company.brandProduct}</p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">{t.footer.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              {navHrefs.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {t.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">{t.footer.contact}</h3>
            <ul className="space-y-2 text-sm">
              <li>{t.company.address}</li>
              <li className="pt-2">
                <span className="text-white">{t.footer.international}:</span>{" "}
                {company.phones.international.join(" / ")}
              </li>
              <li>
                <span className="text-white">{t.footer.domestic}:</span>{" "}
                {company.phones.domestic.join(" / ")}
              </li>
              <li>
                {t.footer.fax}: {company.fax}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">{t.company.emailWeb}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-white transition-colors">
                  {company.email}
                </a>
              </li>
              <li>
                <a href={`https://${company.website}`} className="hover:text-white transition-colors">
                  {company.website}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {t.company.name}. {t.common.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
