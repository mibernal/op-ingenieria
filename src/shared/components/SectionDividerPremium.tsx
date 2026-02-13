import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "soft" | "strong";
};

export default function SectionDividerPremium({ className, variant = "soft" }: Props) {
  return (
    <div className={cn("relative my-8 md:my-10", className)} aria-hidden="true">
      <div
        className={cn(
          "h-px w-full",
          variant === "strong"
            ? "bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
            : "bg-gradient-to-r from-transparent via-foreground/12 to-transparent"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className={cn(
            "h-2 w-2 rounded-full",
            variant === "strong" ? "bg-foreground/30" : "bg-foreground/20"
          )}
        />
      </div>
    </div>
  );
}
