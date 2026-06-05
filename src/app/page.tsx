"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { certificateImages } from "@/lib/i18n/translations";

const productImages = [
  "/images/warehouse-drums.png",
  "/images/liquid-storage.png",
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <Image
          src="/images/factory-entrance.png"
          alt={t.home.altFactory}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/70 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4">
          <p className="text-secondary font-semibold text-lg mb-2">{t.home.heroTag}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight">
            {t.home.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-blue-50">{t.home.heroDesc}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-lg bg-accent px-8 py-3 font-semibold text-white hover:bg-red-700 transition-colors"
            >
              {t.common.viewProducts}
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white hover:bg-white hover:text-primary transition-colors"
            >
              {t.common.contactUs}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {t.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="mt-1 text-sm text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-xl">
              <Image src="/images/factory-building.png" alt={t.home.altFacility} fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">{t.home.aboutTitle}</h2>
              <div className="mt-4 h-1 w-16 bg-accent" />
              <p className="mt-6 text-gray-700 leading-relaxed">{t.home.aboutP1}</p>
              <p className="mt-4 text-gray-700 leading-relaxed">{t.home.aboutP2}</p>
              <Link href="/about" className="mt-6 inline-block text-primary font-semibold hover:underline">
                {t.common.learnMore}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">{t.home.productsTitle}</h2>
            <div className="mt-4 h-1 w-16 bg-accent mx-auto" />
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {t.products.list.map((product, i) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group rounded-xl overflow-hidden shadow-lg border hover:shadow-xl transition-shadow"
              >
                <div className="relative h-56">
                  <Image
                    src={productImages[i]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary">{product.name}</h3>
                  <p className="mt-1 text-sm font-mono text-secondary">
                    {product.formula} · {product.standard}
                  </p>
                  <p className="mt-3 text-gray-600 text-sm">{product.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-100">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">{t.home.equipmentTitle}</h2>
              <div className="mt-4 h-1 w-16 bg-accent" />
              <p className="mt-6 text-gray-700 leading-relaxed">{t.home.equipmentP1}</p>
              <p className="mt-4 text-gray-700 leading-relaxed">{t.home.equipmentP2}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                <Image src="/images/equipment-pumps.png" alt={t.home.altEquipment} fill className="object-cover" />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                <Image src="/images/production-line.png" alt={t.home.altLine} fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">{t.home.marketingTitle}</h2>
          <div className="mt-4 h-1 w-16 bg-accent mx-auto" />
          <p className="mt-8 max-w-3xl mx-auto text-gray-700 leading-relaxed">{t.home.marketingDesc}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {t.countries.map((country) => (
              <span
                key={country}
                className="rounded-full bg-primary/10 px-5 py-2 text-sm font-medium text-primary"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">{t.home.honorsTitle}</h2>
            <div className="mt-4 h-1 w-16 bg-accent mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {t.certificates.map((cert, i) => (
              <div
                key={cert.title}
                className="group rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-40 bg-gray-50">
                  <Image src={certificateImages[i]} alt={cert.title} fill className="object-contain p-2" />
                </div>
                <div className="p-3 text-center">
                  <p className="text-xs font-medium text-gray-700">{cert.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{t.home.ctaTitle}</h2>
          <p className="mt-2 text-blue-100">{t.home.ctaDesc}</p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-white px-10 py-3 font-semibold text-primary hover:bg-blue-50 transition-colors"
          >
            {t.common.getInTouch}
          </Link>
        </div>
      </section>
    </>
  );
}
