"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { Locale } from "@/lib/i18n/translations";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const options: { value: Locale; label: string }[] = [
    { value: "en", label: "EN" },
    { value: "zh", label: "中文" },
  ];

  return (
    <div className="flex items-center rounded-md border border-white/30 overflow-hidden text-xs font-semibold">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setLocale(opt.value)}
          className={`px-3 py-1 transition-colors ${
            locale === opt.value
              ? "bg-white text-primary"
              : "text-white hover:bg-white/20"
          }`}
          aria-pressed={locale === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
