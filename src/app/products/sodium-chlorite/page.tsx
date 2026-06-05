"use client";

import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SodiumChloritePage() {
  const { t } = useLanguage();
  const p = t.products.chlorite;

  return (
    <>
      <PageBanner title={t.products.list[0].name} subtitle={p.subtitle} image="/images/warehouse-drums.png" />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="relative h-80 lg:h-full min-h-[320px] rounded-xl overflow-hidden shadow-lg">
              <Image src="/images/warehouse-drums.png" alt={p.altDrums} fill className="object-cover" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary">{p.infoTitle}</h2>
              <div className="mt-6 space-y-4">
                <div className="rounded-lg bg-slate-50 p-4">
                  <h3 className="font-semibold text-gray-800">{p.chemicalName}</h3>
                  <p className="mt-1 text-gray-700">{p.chemicalValue}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <h3 className="font-semibold text-gray-800">{p.molecularWeight}</h3>
                  <p className="mt-1 text-gray-700">90.45</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <h3 className="font-semibold text-gray-800">{p.appearance}</h3>
                  <p className="mt-1 text-gray-700">{p.appearanceValue}</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary">{p.standard}</h3>
                  <p className="mt-1 text-gray-700">{p.standardValue}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <div className="relative h-56 rounded-lg overflow-hidden shadow-md">
              <Image src="/images/liquid-storage.png" alt={p.altLiquid} fill className="object-cover" />
            </div>
            <div className="relative h-56 rounded-lg overflow-hidden shadow-md">
              <Image src="/images/equipment-pumps.png" alt={p.altEquipment} fill className="object-cover" />
            </div>
          </div>

          <div className="mt-12 rounded-xl bg-primary p-8 text-white text-center">
            <h3 className="text-xl font-bold">{p.ctaTitle}</h3>
            <p className="mt-2 text-blue-100">{p.ctaDesc}</p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-primary hover:bg-blue-50 transition-colors"
            >
              {t.common.inquireNow}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
