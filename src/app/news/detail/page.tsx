"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import PageBanner from "@/components/PageBanner";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  fetchPublishedNewsDetail,
  getNewsImageUrl,
  type NewsArticle,
} from "@/lib/news-api";

function NewsDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { t, locale } = useLanguage();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetchPublishedNewsDetail(id)
      .then(setArticle)
      .finally(() => setLoading(false));
  }, [id]);

  if (!id) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-slate-500">
        {t.news.notFound}
        <div className="mt-4">
          <Link href="/news" className="font-semibold text-cyan-400 hover:text-cyan-300">
            ← {t.nav.news}
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-slate-500">
        {t.news.loading}
      </div>
    );
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-slate-500">
        {t.news.notFound}
        <div className="mt-4">
          <Link href="/news" className="font-semibold text-cyan-400 hover:text-cyan-300">
            ← {t.nav.news}
          </Link>
        </div>
      </div>
    );
  }

  const title = locale === "zh" ? article.titleCn : article.title;
  const content = locale === "zh" ? article.contentCn : article.content;
  const dateStr = article.publishedAt || article.createdAt;
  const formattedDate = dateStr
    ? new Date(dateStr).toLocaleDateString(
        locale === "zh" ? "zh-CN" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : "";

  return (
    <article className="page-section mx-auto max-w-3xl px-4 py-12">
      <Link href="/news" className="text-sm font-medium text-cyan-400 hover:text-cyan-300">
        ← {t.nav.news}
      </Link>

      <time className="mt-6 inline-block rounded-full bg-cyan-500/10 px-4 py-1 text-sm font-medium text-cyan-400">
        {formattedDate}
      </time>

      <h1 className="mt-4 text-3xl font-bold text-white">{title}</h1>

      {article.coverImage && (
        <div className="relative mt-8 overflow-hidden rounded-xl border border-cyan-500/10">
          <img
            src={getNewsImageUrl(article.coverImage)}
            alt={title}
            className="max-h-96 w-full object-cover opacity-[0.85]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070d18]/70 via-transparent to-[#070d18]/20" />
        </div>
      )}

      <div
        className="prose prose-invert mt-8 max-w-none leading-relaxed text-slate-400 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: content || "" }}
      />

      {article.images && article.images.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {article.images.map((img, i) => (
            <div key={img + i} className="relative overflow-hidden rounded-xl border border-cyan-500/10">
              <img
                src={getNewsImageUrl(img)}
                alt={`${title} - ${i + 1}`}
                className="w-full object-cover opacity-[0.85]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070d18]/60 to-transparent" />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export default function NewsDetailPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageBanner title={t.nav.news} subtitle={t.news.subtitle} />
      <Suspense fallback={<div className="page-section py-16 text-center text-slate-500">{t.news.loading}</div>}>
        <NewsDetailContent />
      </Suspense>
    </>
  );
}
