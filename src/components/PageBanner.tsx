import Image from "next/image";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export default function PageBanner({ title, subtitle, image }: PageBannerProps) {
  if (!image) {
    return (
      <section className="relative overflow-hidden bg-[#070d18] pb-10 pt-24 md:pb-12 md:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.07)_0%,transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold text-white md:text-4xl">{title}</h1>
          {subtitle && <p className="mt-3 max-w-2xl text-base text-slate-400">{subtitle}</p>}
          <div className="tech-glow-line mt-5 w-16" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-64 overflow-hidden bg-[#070d18] md:h-80">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover opacity-70"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-[#070d18]/55 to-[#070d18]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070d18] via-[#070d18]/90 to-transparent" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pt-16">
        <h1 className="text-3xl font-bold text-white md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-base text-slate-300/90">{subtitle}</p>}
      </div>
    </section>
  );
}
