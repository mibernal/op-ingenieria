import { cn } from "@/lib/utils";

type Variant = "light" | "tint" | "dark";

export default function SectionShell({
  id,
  className,
  variant = "light",
  children,
}: {
  id?: string;
  className?: string;
  variant?: Variant;
  children: React.ReactNode;
}) {
  const base =
    "relative scroll-mt-24 overflow-hidden py-16 md:py-24";

  const variants: Record<Variant, string> = {
    light: "bg-background",
    tint: "bg-muted/30",
    dark:
      "bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground",
  };

  return (
    <section id={id} className={cn(base, variants[variant], className)}>
      {/* Decor (hero-like) */}
      {variant === "dark" && (
        <>
          <div className="pointer-events-none absolute inset-0 opacity-12" aria-hidden="true">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="absolute -top-24 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-accent/25 to-transparent blur-3xl" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_55%)]" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(255,255,255,0.10),transparent_55%)]" aria-hidden="true" />
        </>
      )}

      {/* Soft separators */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background/70 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/70 to-transparent" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-4">{children}</div>
    </section>
  );
}
