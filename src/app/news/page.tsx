"use client";

import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NewsPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageBanner title={t.nav.news} subtitle={t.news.subtitle} />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="space-y-6">
            {t.news.items.map((item) => (
              <article
                key={item.date + item.title}
                className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <time className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                  {item.date}
                </time>
                <h2 className="mt-3 text-xl font-bold text-gray-900">{item.title}</h2>
                <p className="mt-4 text-gray-600 leading-relaxed">{item.excerpt}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              {t.news.footer}{" "}
              <Link href="/contact" className="text-primary font-semibold hover:underline">
                {t.news.contactLink}
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
