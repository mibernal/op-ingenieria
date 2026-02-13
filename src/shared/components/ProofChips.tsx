import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  label?: string;
  className?: string;
};

export default function ProofChips({ items, label, className }: Props) {
  return (
    <div className={cn("rounded-3xl border border-foreground/10 bg-background/60 p-5 md:p-6", className)}>
      {label ? <div className="text-xs font-medium text-muted-foreground">{label}</div> : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((t) => (
          <Badge key={t} variant="outline" className="border-foreground/15 bg-background/50">
            {t}
          </Badge>
        ))}
      </div>
    </div>
  );
}
