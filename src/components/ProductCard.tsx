"use client";

import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  href: string;
  name: string;
  formula: string;
  image: string;
  chemicalName: string;
  chemicalValue: string;
  molecularWeightLabel: string;
  molecularWeightValue: string;
  appearance: string;
  appearanceValue: string;
  standard: string;
  standardValue: string;
  properties: string;
  propertiesValue: string;
  viewDetails: string;
}

export default function ProductCard({
  href,
  name,
  formula,
  image,
  chemicalName,
  chemicalValue,
  molecularWeightLabel,
  molecularWeightValue,
  appearance,
  appearanceValue,
  standard,
  standardValue,
  properties,
  propertiesValue,
  viewDetails,
}: ProductCardProps) {
  const fields = [
    { label: chemicalName, value: chemicalValue },
    { label: molecularWeightLabel, value: molecularWeightValue },
    { label: appearance, value: appearanceValue },
    { label: standard, value: standardValue },
    { label: properties, value: propertiesValue },
  ];

  return (
    <Link
      href={href}
      className="group glass-panel block overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:border-cyan-400/25 hover:shadow-[0_0_32px_rgba(34,211,238,0.08)] md:p-6"
    >
      <div className="grid items-stretch gap-5 md:grid-cols-2 md:gap-6">
        <div className="flex min-w-0 flex-col">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="mt-1 font-mono text-sm text-cyan-400/80">{formula}</p>

          <dl className="mt-4 flex-1 space-y-2.5">
            {fields.map((field) => (
              <div key={field.label}>
                <dt className="text-xs font-semibold tracking-wide text-cyan-400/90 uppercase">
                  {field.label}
                </dt>
                <dd className="mt-0.5 text-sm leading-relaxed text-slate-400 line-clamp-3">
                  {field.value}
                </dd>
              </div>
            ))}
          </dl>

          <span className="mt-4 inline-block text-sm font-semibold text-cyan-400 transition-colors group-hover:text-cyan-300">
            {viewDetails}
          </span>
        </div>

        <div className="relative min-h-[220px] w-full overflow-hidden rounded-xl border border-cyan-500/10 md:min-h-[260px]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover opacity-[0.88] transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.02]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070d18]/50 via-transparent to-[#070d18]/10" />
        </div>
      </div>
    </Link>
  );
}
