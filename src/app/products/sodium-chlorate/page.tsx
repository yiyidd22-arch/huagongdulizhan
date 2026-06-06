"use client";

import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SodiumChloratePage() {
  const { t } = useLanguage();
  const p = t.products.chlorate;

  return (
    <>
      <PageBanner title={t.products.list[1].name} subtitle={p.subtitle} />

      <section className="page-section py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white">{p.infoTitle}</h2>
              <div className="tech-glow-line mt-4 w-16" />
              <div className="mt-6 space-y-3">
                {[
                  { label: p.chemicalName, value: p.chemicalValue },
                  { label: p.molecularWeight, value: "106.44" },
                  { label: p.appearance, value: p.appearanceValue },
                ].map((item) => (
                  <div key={item.label} className="info-card">
                    <h3>{item.label}</h3>
                    <p>{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-cyan-400">{p.properties}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.propertiesValue}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-cyan-400">{p.specsTitle}</h3>
              <div className="mt-4 overflow-hidden rounded-xl border border-cyan-500/15">
                <table className="w-full text-sm">
                  <thead className="bg-cyan-500/10 text-cyan-400">
                    <tr>
                      <th className="px-4 py-3 text-left">{p.indicatorCol}</th>
                      <th className="px-4 py-3 text-right">{p.contentCol}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.specs.map((spec, i) => (
                      <tr
                        key={spec.name}
                        className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}
                      >
                        <td className="px-4 py-3 text-slate-400">{spec.name}</td>
                        <td className="px-4 py-3 text-right font-mono font-semibold text-cyan-400">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-cyan-400">{p.applications}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.applicationsValue}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-cyan-400">{p.packaging}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.packagingValue}</p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
            <h3 className="text-lg font-bold text-amber-400">{p.safety}</h3>
            <p className="mt-3 text-sm leading-relaxed text-amber-200/70">{p.safetyValue}</p>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block rounded-full border border-cyan-400/50 bg-cyan-500/10 px-8 py-3 font-semibold text-cyan-300 transition-all hover:bg-cyan-400/20"
            >
              {t.common.inquireNow}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
