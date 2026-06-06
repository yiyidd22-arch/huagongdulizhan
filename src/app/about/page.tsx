"use client";

import PageBanner from "@/components/PageBanner";
import BlendedImage from "@/components/BlendedImage";
import SmoothHorizontalScroll from "@/components/SmoothHorizontalScroll";
import SectionTitle from "@/components/SectionTitle";
import { useLanguage } from "@/contexts/LanguageContext";
import { certificateImages } from "@/lib/i18n/translations";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageBanner title={t.nav.about} subtitle={t.about.bannerSubtitle} />

      <section className="page-section pb-16 pt-4 md:pb-20 md:pt-6">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle title={t.about.profileTitle} />
          <div className="grid items-stretch gap-8 lg:grid-cols-2">
            <div className="space-y-4 leading-relaxed text-slate-400">
              <p>{t.about.profileP1}</p>
              <p>{t.about.profileP2}</p>
              <p>{t.about.profileP3}</p>
              <p>{t.about.profileP4}</p>
            </div>
            <BlendedImage
              src="/images/factory-building.png"
              alt={t.about.altFactory}
              fillHeight
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section className="page-section-alt py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle title={t.about.historyTitle} centered />
          <SmoothHorizontalScroll className="-mx-4 px-4">
            {t.history.map((item) => (
              <div
                key={item.year}
                className="glass-panel w-72 shrink-0 rounded-xl p-5 md:w-80"
              >
                <span className="inline-block rounded-full bg-cyan-500/15 px-4 py-1 text-sm font-bold text-cyan-400">
                  {item.year}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.text}</p>
              </div>
            ))}
          </SmoothHorizontalScroll>
        </div>
      </section>

      <section className="page-section py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle title={t.about.cultureTitle} centered />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.culture.map((item) => (
              <div key={item.title} className="glass-panel rounded-xl p-5">
                <h3 className="text-base font-bold text-cyan-400">{item.title}</h3>
                <div className="tech-glow-line mt-3 w-10" />
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-alt py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle title={t.about.equipmentTitle} subtitle={t.about.equipmentSubtitle} />
          <p className="max-w-4xl leading-relaxed text-slate-400">{t.about.equipmentDesc}</p>
        </div>
      </section>

      <section className="page-section py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle title={t.about.outlookTitle} />
          <p className="max-w-4xl leading-relaxed text-slate-400">{t.about.outlookDesc}</p>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-[#0c1526] to-[#070d18]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">{t.about.marketingTitle}</h2>
          <p className="mt-1 text-lg text-cyan-400/80">{t.about.marketingSubtitle}</p>
          <p className="mx-auto mt-8 max-w-3xl leading-relaxed text-slate-400">{t.about.marketingDesc}</p>
        </div>
      </section>

      <section className="page-section py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle title={t.about.honorsTitle} centered />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.certificates.map((cert, i) => (
              <div
                key={cert.title}
                className="glass-panel overflow-hidden rounded-xl transition-all hover:border-cyan-400/25"
              >
                <div className="relative h-52 bg-white/[0.02]">
                  <img
                    src={certificateImages[i]}
                    alt={cert.title}
                    className="h-full w-full object-contain p-4 opacity-90"
                  />
                </div>
                <div className="border-t border-cyan-500/10 p-4 text-center">
                  <h3 className="text-sm font-semibold text-slate-300">{cert.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
