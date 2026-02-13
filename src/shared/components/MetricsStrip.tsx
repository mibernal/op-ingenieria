import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Metric = {
  label: string;
  value: string;
  hint?: string;
};

type Props = {
  items: Metric[];
  className?: string;
};

export default function MetricsStrip({ items, className }: Props) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("rounded-3xl border border-foreground/10 bg-background/60 backdrop-blur-sm", className)}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 md:p-6">
        {items.map((m, i) => (
          <motion.div
            key={m.label}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.22, ease: "easeOut", delay: i * 0.03 }}
            className="rounded-2xl border border-foreground/10 bg-muted/20 px-4 py-4"
          >
            <div className="text-2xl font-semibold tracking-tight">{m.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{m.label}</div>
            {m.hint ? <div className="mt-1 text-xs text-muted-foreground/80">{m.hint}</div> : null}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
