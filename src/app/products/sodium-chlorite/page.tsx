"use client";

import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import ProductPackagingImages from "@/components/ProductPackagingImages";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SodiumChloritePage() {
  const { t } = useLanguage();
  const p = t.products.chlorite;

  return (
    <>
      <PageBanner title={t.products.list[0].name} subtitle={p.subtitle} />

      <section className="page-section py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <ProductPackagingImages
            domesticLabel={p.imgDomestic}
            exportLabel={p.imgExport}
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white">{p.infoTitle}</h2>
              <div className="tech-glow-line mt-4 w-16" />
              <div className="mt-6 space-y-3">
                {[
                  { label: p.chemicalName, value: p.chemicalValue },
                  { label: p.molecularWeight, value: "90.45" },
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
              <div className="mt-4 overflow-x-auto rounded-xl border border-cyan-500/15">
                <table className="w-full min-w-[560px] text-sm">
                  <thead className="bg-cyan-500/10 text-cyan-400">
                    <tr>
                      <th className="px-4 py-3 text-left">{p.indicatorCol}</th>
                      {p.gradeCols.map((col) => (
                        <th key={col} className="px-4 py-3 text-right">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {p.specs.map((spec, i) => (
                      <tr
                        key={spec.name}
                        className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}
                      >
                        <td className="px-4 py-3 text-slate-400">{spec.name}</td>
                        {spec.values.map((val, j) => (
                          <td
                            key={`${spec.name}-${j}`}
                            className="px-4 py-3 text-right font-mono font-semibold text-cyan-400"
                          >
                            {val}
                          </td>
                        ))}
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

          <div className="mt-8">
            <h3 className="text-lg font-bold text-cyan-400">{p.transport}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.transportValue}</p>
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
