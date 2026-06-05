interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({ title, subtitle, centered }: SectionTitleProps) {
  return (
    <div className={`mb-10 ${centered ? "text-center" : ""}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-primary">{title}</h2>
      {subtitle && (
        <p className={`mt-3 text-gray-600 max-w-3xl ${centered ? "mx-auto" : ""}`}>{subtitle}</p>
      )}
      <div className={`mt-4 h-1 w-16 bg-accent ${centered ? "mx-auto" : ""}`} />
    </div>
  );
}
