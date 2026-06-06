"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PageBanner from "@/components/PageBanner";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  fetchPublishedNews,
  getNewsImageUrl,
  type NewsArticle,
} from "@/lib/news-api";

export default function NewsPage() {
  const { t, locale } = useLanguage();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublishedNews()
      .then(setArticles)
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (article: NewsArticle) => {
    const dateStr = article.publishedAt || article.createdAt;
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString(
      locale === "zh" ? "zh-CN" : "en-US",
      { year: "numeric", month: "2-digit", day: "2-digit" }
    );
  };

  return (
    <>
      <PageBanner title={t.nav.news} subtitle={t.news.subtitle} />

      <section className="page-section py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          {loading ? (
            <div className="py-12 text-center text-slate-500">{t.news.loading}</div>
          ) : articles.length === 0 ? (
            <div className="py-12 text-center text-slate-500">{t.news.empty}</div>
          ) : (
            <div className="space-y-5">
              {articles.map((item) => {
                const title = locale === "zh" ? item.titleCn : item.title;
                const excerpt = locale === "zh" ? item.excerptCn : item.excerpt;
                return (
                  <article
                    key={item.id}
                    className="glass-panel rounded-xl p-6 transition-all hover:border-cyan-400/25"
                  >
                    <div className="flex flex-col gap-6 md:flex-row">
                      {item.coverImage && (
                        <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl border border-cyan-500/10 md:w-48">
                          <img
                            src={getNewsImageUrl(item.coverImage)}
                            alt={title}
                            className="h-full w-full object-cover opacity-[0.82]"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070d18]/70 via-transparent to-[#070d18]/20" />
                        </div>
                      )}
                      <div className="flex-1">
                        <time className="rounded-full bg-cyan-500/10 px-4 py-1 text-sm font-medium text-cyan-400">
                          {formatDate(item)}
                        </time>
                        <h2 className="mt-3 text-xl font-bold text-white">{title}</h2>
                        <p className="mt-4 leading-relaxed text-slate-400">{excerpt}</p>
                        <Link
                          href={`/news/detail?id=${item.id}`}
                          className="mt-4 inline-block font-semibold text-cyan-400 hover:text-cyan-300"
                        >
                          {t.common.learnMore}
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500">
              {t.news.footer}{" "}
              <Link href="/contact" className="font-semibold text-cyan-400 hover:text-cyan-300">
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
