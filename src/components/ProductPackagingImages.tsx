import BlendedImage from "@/components/BlendedImage";

interface ProductPackagingImagesProps {
  domesticLabel: string;
  exportLabel: string;
  domesticSrc?: string;
  exportSrc?: string;
}

export default function ProductPackagingImages({
  domesticLabel,
  exportLabel,
  domesticSrc = "/images/sodium-chlorite-domestic.png",
  exportSrc = "/images/sodium-chlorite-export.png",
}: ProductPackagingImagesProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-wrap items-start justify-center gap-x-12 gap-y-6 sm:max-w-3xl sm:gap-x-16">
      <div className="w-64 shrink-0 sm:w-72">
        <BlendedImage src={domesticSrc} alt={domesticLabel} aspectClass="aspect-[4/3]" />
        <p className="mt-2.5 text-center text-sm leading-snug text-slate-400">{domesticLabel}</p>
      </div>
      <div className="w-64 shrink-0 sm:w-72">
        <BlendedImage src={exportSrc} alt={exportLabel} aspectClass="aspect-[4/3]" />
        <p className="mt-2.5 text-center text-sm leading-snug text-slate-400">{exportLabel}</p>
      </div>
    </div>
  );
}
