import { cn } from "@/lib/utils";

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const isCenter = align === "center";

  return (
    <div className={cn("mx-auto mb-10 max-w-3xl", isCenter ? "text-center" : "text-left", className)}>
      {eyebrow ? (
        <div className={cn("text-xs tracking-[0.24em] opacity-80", isCenter ? "justify-center" : "")}>
          {eyebrow}
        </div>
      ) : null}

      <h2 className={cn("mt-3 font-heading font-bold tracking-tight", "text-3xl md:text-5xl")}>
        {title}
      </h2>

      {subtitle ? (
        <p className={cn("mt-4 text-sm md:text-base leading-relaxed opacity-85")}>
          {subtitle}
        </p>
      ) : null}

      <div className={cn("mt-6 h-px w-24 bg-gradient-to-r from-transparent via-primary/35 to-transparent", isCenter ? "mx-auto" : "")} />
    </div>
  );
}
