interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({ title, subtitle, centered }: SectionTitleProps) {
  return (
    <div className={`mb-10 ${centered ? "text-center" : ""}`}>
      <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
      {subtitle && (
        <p className={`mt-3 max-w-3xl text-slate-400 ${centered ? "mx-auto" : ""}`}>{subtitle}</p>
      )}
      <div className={`tech-glow-line mt-4 w-16 ${centered ? "mx-auto" : ""}`} />
    </div>
  );
}
