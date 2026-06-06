"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { Locale } from "@/lib/i18n/translations";

interface LanguageSwitcherProps {
  variant?: "overlay" | "solid" | "dark";
}

export default function LanguageSwitcher({ variant = "solid" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();
  const overlay = variant === "overlay";
  const dark = variant === "dark";

  const options: { value: Locale; label: string }[] = [
    { value: "en", label: "EN" },
    { value: "zh", label: "中文" },
  ];

  const borderClass = overlay
    ? "border-white/25"
    : dark
      ? "border-cyan-500/20"
      : "border-gray-200";

  return (
    <div
      className={`flex items-center overflow-hidden rounded-full text-xs font-semibold border ${borderClass}`}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setLocale(opt.value)}
          className={`px-3 py-1.5 transition-colors ${
            locale === opt.value
              ? overlay
                ? "bg-white text-[#0c1526]"
                : dark
                  ? "bg-cyan-500/20 text-cyan-300"
                  : "bg-primary text-white"
              : overlay
                ? "text-white/85 hover:bg-white/10"
                : dark
                  ? "text-slate-500 hover:bg-white/5 hover:text-cyan-300"
                  : "text-gray-600 hover:bg-gray-50 hover:text-primary"
          }`}
          aria-pressed={locale === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
