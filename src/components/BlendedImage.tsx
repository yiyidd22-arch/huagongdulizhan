import Image from "next/image";

interface BlendedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  priority?: boolean;
  /** 高度随父容器拉伸，与相邻文字块上下对齐 */
  fillHeight?: boolean;
}

export default function BlendedImage({
  src,
  alt,
  className = "",
  aspectClass = "aspect-[4/3]",
  priority = false,
  fillHeight = false,
}: BlendedImageProps) {
  return (
    <div
      className={`image-blend relative overflow-hidden rounded-xl border border-cyan-500/10 ${
        fillHeight ? "h-full min-h-[12rem]" : aspectClass
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover opacity-[0.82]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070d18]/85 via-[#070d18]/15 to-[#070d18]/35" />
    </div>
  );
}
