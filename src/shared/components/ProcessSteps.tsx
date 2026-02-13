//src/shared/components/ProcessSteps.tsx
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ProcessStep = {
  title: string;
  description: string;
  tag?: string; // ej: "RETIE", "As-built", "Puesta en marcha"
};

type ProcessStepsProps = {
  title: string;
  subtitle?: string;
  steps: ProcessStep[];
  className?: string;
};

export default function ProcessSteps({
  title,
  subtitle,
  steps,
  className,
}: ProcessStepsProps) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("rounded-3xl border border-foreground/10 bg-muted/20 p-6 md:p-10", className)}>
      <div className="max-w-2xl">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h3>
        {subtitle ? (
          <p className="mt-3 text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-4">
        {steps.map((s, idx) => (
          <motion.div
            key={s.title}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.25, ease: "easeOut", delay: idx * 0.03 }}
            className="relative rounded-2xl bg-background/60 p-5 border border-foreground/10"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium text-muted-foreground">
                {String(idx + 1).padStart(2, "0")}
              </div>
              {s.tag ? <Badge variant="secondary">{s.tag}</Badge> : null}
            </div>
            <div className="mt-3 text-base font-semibold">{s.title}</div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {s.description}
            </p>

            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/5" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
