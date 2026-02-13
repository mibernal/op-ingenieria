//src/shared/components/MetricsBlock.tsx
import { useMemo } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type MetricItem = {
  label: string;
  value: number;
  suffix?: string; // "+", "kW", "%"
  hint?: string;
};

function formatNumber(n: number) {
  return new Intl.NumberFormat("es-CO").format(n);
}

function useCountUp(target: number, active: boolean, durationMs = 900) {
  return useMemo(() => {
    if (!active) return 0;
    // animamos con framer (texto), pero el hook solo define el target final
    return target;
  }, [active, target]);
}

type MetricsBlockProps = {
  items: MetricItem[];
  className?: string;
};

export default function MetricsBlock({ items, className }: MetricsBlockProps) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((m) => (
        <MetricCard key={m.label} metric={m} reducedMotion={reduced} />
      ))}
    </div>
  );
}

function MetricCard({
  metric,
  reducedMotion,
}: {
  metric: MetricItem;
  reducedMotion: boolean;
}) {
  const ref = useMemo(() => ({ current: null as null | HTMLDivElement }), []);
  // framer necesita ref real, hacemos wrapper simple
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const inView = useInView(ref as any, { once: true, margin: "-10% 0px" });

  const target = useCountUp(metric.value, inView, 900);

  return (
    <Card
      ref={ref as any}
      className="relative overflow-hidden rounded-2xl border-foreground/10 bg-background/60 p-5 shadow-sm"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--foreground)/0.08),transparent_60%)] blur-2xl" />
      </div>

      <div className="relative">
        <div className="text-sm text-muted-foreground">{metric.label}</div>

        <div className="mt-2 flex items-baseline gap-1">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-3xl font-semibold tracking-tight"
          >
            {reducedMotion ? formatNumber(metric.value) : formatNumber(target)}
          </motion.div>
          {metric.suffix ? (
            <span className="text-lg font-medium text-muted-foreground">
              {metric.suffix}
            </span>
          ) : null}
        </div>

        {metric.hint ? (
          <div className="mt-2 text-xs text-muted-foreground">{metric.hint}</div>
        ) : null}
      </div>
    </Card>
  );
}

