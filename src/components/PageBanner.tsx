import Image from "next/image";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export default function PageBanner({ title, subtitle, image }: PageBannerProps) {
  return (
    <section className="relative h-64 md:h-80 overflow-hidden bg-primary">
      {image && (
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-30"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-blue-50">{subtitle}</p>}
      </div>
    </section>
  );
}
