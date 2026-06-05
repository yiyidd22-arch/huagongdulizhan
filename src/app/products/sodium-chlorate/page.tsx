"use client";

import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SodiumChloratePage() {
  const { t } = useLanguage();
  const p = t.products.chlorate;

  return (
    <>
      <PageBanner title={t.products.list[1].name} subtitle={p.subtitle} image="/images/liquid-storage.png" />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-primary">{p.infoTitle}</h2>
              <div className="mt-6 space-y-4">
                <div className="rounded-lg bg-slate-50 p-4">
                  <h3 className="font-semibold text-gray-800">{p.chemicalName}</h3>
                  <p className="mt-1 text-gray-700">{p.chemicalValue}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <h3 className="font-semibold text-gray-800">{p.molecularWeight}</h3>
                  <p className="mt-1 text-gray-700">106.44</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <h3 className="font-semibold text-gray-800">{p.appearance}</h3>
                  <p className="mt-1 text-gray-700">{p.appearanceValue}</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-primary">{p.properties}</h3>
                <p className="mt-3 text-gray-700 leading-relaxed text-sm">{p.propertiesValue}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-primary">{p.specsTitle}</h3>
              <div className="mt-4 overflow-hidden rounded-xl border shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">{p.indicatorCol}</th>
                      <th className="px-4 py-3 text-right">{p.contentCol}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.specs.map((spec, i) => (
                      <tr key={spec.name} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-4 py-3 text-gray-700">{spec.name}</td>
                        <td className="px-4 py-3 text-right font-mono font-semibold text-primary">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-primary">{p.applications}</h3>
              <p className="mt-3 text-gray-700 leading-relaxed text-sm">{p.applicationsValue}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary">{p.packaging}</h3>
              <p className="mt-3 text-gray-700 leading-relaxed text-sm">{p.packagingValue}</p>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-amber-50 border border-amber-200 p-6">
            <h3 className="text-lg font-bold text-amber-800">{p.safety}</h3>
            <p className="mt-3 text-amber-900 text-sm leading-relaxed">{p.safetyValue}</p>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-white hover:bg-primary-dark transition-colors"
            >
              {t.common.inquireNow}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
