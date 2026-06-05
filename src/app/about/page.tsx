"use client";

import Image from "next/image";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import { useLanguage } from "@/contexts/LanguageContext";
import { certificateImages, galleryImages } from "@/lib/i18n/translations";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageBanner
        title={t.nav.about}
        subtitle={t.about.bannerSubtitle}
        image="/images/factory-entrance.png"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle title={t.about.profileTitle} />
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>{t.about.profileP1}</p>
              <p>{t.about.profileP2}</p>
              <p>{t.about.profileP3}</p>
              <p>{t.about.profileP4}</p>
            </div>
            <div className="space-y-4">
              <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                <Image src="/images/factory-building.png" alt={t.about.altFactory} fill className="object-cover" />
              </div>
              <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                <Image src="/images/honors-wall.png" alt={t.about.altHonors} fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle title={t.about.historyTitle} centered />
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 md:-translate-x-px" />
            {t.history.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex items-start gap-6 mb-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:block md:w-1/2" />
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-4 border-white shadow -translate-x-1/2 mt-1.5 z-10" />
                <div className="ml-10 md:ml-0 md:w-1/2 bg-white rounded-lg shadow-md p-5">
                  <span className="inline-block rounded-full bg-primary px-4 py-1 text-sm font-bold text-white">
                    {item.year}
                  </span>
                  <p className="mt-3 text-gray-700 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle title={t.about.cultureTitle} centered />
          <div className="grid gap-6 md:grid-cols-2">
            {t.culture.map((item) => (
              <div key={item.title} className="rounded-xl border-l-4 border-primary bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                <p className="mt-3 text-gray-700">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle title={t.about.equipmentTitle} subtitle={t.about.equipmentSubtitle} />
          <p className="mb-8 text-gray-700 leading-relaxed max-w-4xl">{t.about.equipmentDesc}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {galleryImages.map((src, i) => (
              <div key={src} className="relative h-56 rounded-lg overflow-hidden shadow-md">
                <Image src={src} alt={t.about.gallery[i].alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle title={t.about.outlookTitle} />
          <p className="text-gray-700 leading-relaxed max-w-4xl">{t.about.outlookDesc}</p>
        </div>
      </section>

      <section className="bg-primary py-16 md:py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">{t.about.marketingTitle}</h2>
          <p className="mt-1 text-lg text-blue-200">{t.about.marketingSubtitle}</p>
          <p className="mt-8 max-w-3xl mx-auto text-blue-50 leading-relaxed">{t.about.marketingDesc}</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle title={t.about.honorsTitle} centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.certificates.map((cert, i) => (
              <div
                key={cert.title}
                className="rounded-xl overflow-hidden border shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-64 bg-gray-50">
                  <Image src={certificateImages[i]} alt={cert.title} fill className="object-contain p-4" />
                </div>
                <div className="p-4 text-center bg-white">
                  <h3 className="font-semibold text-primary">{cert.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
