"use client";

import Image from "next/image";
import Link from "next/link";
import FloatingPhoneButton from "@/components/FloatingPhoneButton";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { certificateImages, productImages } from "@/lib/i18n/translations";

const homeProductImages = [
  productImages["sodium-chlorite"],
  productImages["sodium-chlorate"],
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="tech-grid">
      {/* Hero — full viewport, blends into dark below */}
      <section className="relative min-h-screen overflow-hidden">
        <Image
          src="/images/factory-entrance.png"
          alt={t.home.altFactory}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#070d18]/60 to-[#070d18]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070d18] to-transparent" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pt-20 pb-24">
          <p className="mb-3 text-sm font-medium tracking-widest text-cyan-400/90 uppercase md:text-base">
            {t.home.heroTag}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {t.home.heroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300/90 md:text-lg">
            {t.home.heroDesc}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-cyan-500/90 px-7 py-2.5 text-sm font-semibold text-[#070d18] shadow-[0_0_24px_rgba(34,211,238,0.3)] transition-all hover:bg-cyan-400 hover:shadow-[0_0_32px_rgba(34,211,238,0.5)]"
            >
              {t.common.viewProducts}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-cyan-400/40 px-7 py-2.5 text-sm font-semibold text-cyan-300 transition-all hover:border-cyan-400/70 hover:bg-cyan-400/10"
            >
              {t.common.contactUs}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats — glass cards */}
      <section className="relative border-y border-cyan-500/10 bg-[#070d18] py-14">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/20 via-transparent to-blue-950/20" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {t.stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-panel rounded-2xl px-4 py-6 text-center transition-all duration-300 hover:border-cyan-400/25 hover:shadow-[0_0_32px_rgba(34,211,238,0.08)]"
              >
                <div className="text-3xl font-bold text-gradient-tech md:text-4xl">{stat.value}</div>
                <div className="mt-2 text-xs text-slate-400 md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070d18] via-[#0c1526] to-[#070d18]" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-80 overflow-hidden rounded-xl image-blend md:h-96">
              <Image
                src="/images/factory-building.png"
                alt={t.home.altFacility}
                fill
                className="object-cover opacity-[0.82]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070d18]/85 via-[#070d18]/15 to-[#070d18]/35" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">{t.home.aboutTitle}</h2>
              <div className="tech-glow-line mt-4 w-16" />
              <p className="mt-6 leading-relaxed text-slate-400">{t.home.aboutP1}</p>
              <p className="mt-4 leading-relaxed text-slate-400">{t.home.aboutP2}</p>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
              >
                {t.common.learnMore}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products — circular hover cards */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-[#0a1220]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.06)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mb-14 text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">{t.home.productsTitle}</h2>
            <div className="tech-glow-line mx-auto mt-4 w-16" />
          </div>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {t.products.list.map((product, i) => {
              const detail = i === 0 ? t.products.chlorite : t.products.chlorate;
              const weight = i === 0 ? "90.45" : "106.44";
              return (
                <ProductCard
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  name={product.name}
                  formula={product.formula}
                  image={homeProductImages[i]}
                  chemicalName={detail.chemicalName}
                  chemicalValue={detail.chemicalValue}
                  molecularWeightLabel={detail.molecularWeight}
                  molecularWeightValue={weight}
                  appearance={detail.appearance}
                  appearanceValue={detail.appearanceValue}
                  standard={detail.standard}
                  standardValue={detail.standardValue}
                  properties={detail.properties}
                  propertiesValue={detail.propertiesValue}
                  viewDetails={t.common.viewDetails}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Equipment — photos integrated */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1220] via-[#0c1526] to-[#070d18]" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">{t.home.equipmentTitle}</h2>
              <div className="tech-glow-line mt-4 w-16" />
              <p className="mt-6 leading-relaxed text-slate-400">{t.home.equipmentP1}</p>
              <p className="mt-4 leading-relaxed text-slate-400">{t.home.equipmentP2}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48 overflow-hidden rounded-xl image-blend md:h-52">
                <Image
                  src="/images/equipment-pumps.png"
                  alt={t.home.altEquipment}
                  fill
                  className="object-cover opacity-[0.82]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070d18]/85 via-transparent to-[#070d18]/25" />
              </div>
              <div className="relative mt-8 h-48 overflow-hidden rounded-xl image-blend md:h-52">
                <Image
                  src="/images/production-line.png"
                  alt={t.home.altLine}
                  fill
                  className="object-cover opacity-[0.82]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070d18]/85 via-transparent to-[#070d18]/25" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global markets */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-[#070d18]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">{t.home.marketingTitle}</h2>
          <div className="tech-glow-line mx-auto mt-4 w-16" />
          <p className="mx-auto mt-8 max-w-3xl leading-relaxed text-slate-400">{t.home.marketingDesc}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {t.countries.map((country) => (
              <span
                key={country}
                className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-5 py-2 text-sm font-medium text-cyan-300/90 transition-all hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Honors */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070d18] to-[#0c1526]" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">{t.home.honorsTitle}</h2>
            <div className="tech-glow-line mx-auto mt-4 w-16" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {t.certificates.map((cert, i) => (
              <div
                key={cert.title}
                className="group glass-panel overflow-hidden rounded-xl transition-all duration-300 hover:border-cyan-400/25 hover:shadow-[0_0_24px_rgba(34,211,238,0.1)]"
              >
                <div className="relative h-36 bg-white/[0.02] md:h-40">
                  <Image
                    src={certificateImages[i]}
                    alt={cert.title}
                    fill
                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="border-t border-cyan-500/10 p-3 text-center">
                  <p className="text-xs font-medium text-slate-400">{cert.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/80 via-[#0c1526] to-[#070d18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.12)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">{t.home.ctaTitle}</h2>
          <p className="mt-3 text-slate-400">{t.home.ctaDesc}</p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full border border-cyan-400/50 bg-cyan-500/10 px-10 py-3 font-semibold text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-400/20 hover:shadow-[0_0_32px_rgba(34,211,238,0.2)]"
          >
            {t.common.getInTouch}
          </Link>
        </div>
      </section>

      <FloatingPhoneButton />
    </div>
  );
}
