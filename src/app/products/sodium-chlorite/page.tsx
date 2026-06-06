"use client";

import Link from "next/link";
import BlendedImage from "@/components/BlendedImage";
import PageBanner from "@/components/PageBanner";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SodiumChloritePage() {
  const { t } = useLanguage();
  const p = t.products.chlorite;

  return (
    <>
      <PageBanner title={t.products.list[0].name} subtitle={p.subtitle} />

      <section className="page-section py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <BlendedImage src="/images/warehouse-drums.png" alt={p.altDrums} aspectClass="aspect-square min-h-[320px]" />

            <div>
              <h2 className="text-2xl font-bold text-white">{p.infoTitle}</h2>
              <div className="tech-glow-line mt-4 w-16" />
              <div className="mt-6 space-y-3">
                {[
                  { label: p.chemicalName, value: p.chemicalValue },
                  { label: p.molecularWeight, value: "90.45" },
                  { label: p.appearance, value: p.appearanceValue },
                  { label: p.standard, value: p.standardValue },
                ].map((item) => (
                  <div key={item.label} className="info-card">
                    <h3>{item.label}</h3>
                    <p>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <BlendedImage src="/images/liquid-storage.png" alt={p.altLiquid} />
            <BlendedImage src="/images/equipment-pumps.png" alt={p.altEquipment} />
          </div>

          <div className="mt-12 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 to-[#0c1526] p-8 text-center">
            <h3 className="text-xl font-bold text-white">{p.ctaTitle}</h3>
            <p className="mt-2 text-slate-400">{p.ctaDesc}</p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-full border border-cyan-400/50 bg-cyan-500/10 px-8 py-3 font-semibold text-cyan-300 transition-all hover:bg-cyan-400/20"
            >
              {t.common.inquireNow}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
