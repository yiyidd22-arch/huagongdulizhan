"use client";

import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { useLanguage } from "@/contexts/LanguageContext";
import { productImages } from "@/lib/i18n/translations";

export default function ProductsPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageBanner title={t.nav.products} subtitle={t.products.pageSubtitle} />

      <section className="page-section py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {t.products.list.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group glass-panel overflow-hidden rounded-2xl transition-all duration-300 hover:border-cyan-400/25 hover:shadow-[0_0_32px_rgba(34,211,238,0.08)]"
              >
                <div className="relative mx-auto aspect-square w-full max-w-xs p-6">
                  <div className="relative h-full w-full overflow-hidden rounded-xl border border-cyan-500/10">
                    <Image
                      src={productImages[product.slug]}
                      alt={product.name}
                      fill
                      className="object-cover opacity-[0.85] transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070d18]/75 via-transparent to-[#070d18]/20" />
                  </div>
                </div>
                <div className="px-6 pb-7">
                  <h2 className="text-xl font-bold text-white">{product.name}</h2>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 font-mono text-cyan-400">
                      {product.formula}
                    </span>
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-400/80">
                      {product.standard}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-slate-400">{product.summary}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-cyan-400 transition-colors group-hover:text-cyan-300">
                    {t.common.viewDetails}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
