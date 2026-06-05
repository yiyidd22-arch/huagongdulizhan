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
      <PageBanner
        title={t.nav.products}
        subtitle={t.products.pageSubtitle}
        image="/images/warehouse-drums.png"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {t.products.list.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group rounded-xl overflow-hidden shadow-lg border hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="relative h-64">
                  <Image
                    src={productImages[product.slug]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="rounded bg-primary/10 px-3 py-1 font-mono text-primary">{product.formula}</span>
                    <span className="rounded bg-secondary/10 px-3 py-1 text-secondary">{product.standard}</span>
                  </div>
                  <p className="mt-4 text-gray-600">{product.summary}</p>
                  <span className="mt-4 inline-block text-primary font-semibold group-hover:underline">
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
