"use client";

import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  href: string;
  name: string;
  formula: string;
  standard: string;
  summary: string;
  image: string;
}

export default function ProductCard({
  href,
  name,
  formula,
  standard,
  summary,
  image,
}: ProductCardProps) {
  return (
    <Link
      href={href}
      className="group glass-panel block overflow-hidden rounded-2xl transition-all duration-300 hover:border-cyan-400/25 hover:shadow-[0_0_32px_rgba(34,211,238,0.08)]"
    >
      <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden p-5 pt-6">
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-cyan-500/10">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover opacity-[0.85] transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070d18]/75 via-transparent to-[#070d18]/20" />
        </div>
      </div>

      <div className="px-6 pb-7 text-center">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="mt-1 font-mono text-sm text-cyan-400/80">
          {formula} · {standard}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{summary}</p>
      </div>
    </Link>
  );
}
