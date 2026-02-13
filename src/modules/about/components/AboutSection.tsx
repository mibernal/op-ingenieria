// src/modules/about/components/AboutSection.tsx
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import { cn } from "@/lib/utils";
import { ABOUT_COPY, ABOUT_PILLARS, ABOUT_BADGES } from "../content/about.content";
import { FileCheck2, ClipboardList, HardHat } from "lucide-react";

const DELIVERABLES = [
  { icon: ClipboardList, title: "Alcance y criterios", desc: "Definición técnica, riesgos y aceptación antes de ejecutar." },
  { icon: FileCheck2, title: "Evidencia y documentación", desc: "As-built, reportes y trazabilidad para operación y auditoría." },
  { icon: HardHat, title: "Pruebas en sitio", desc: "Protocolos funcionales y puesta en marcha con verificación." },
];

export default function AboutSection() {
  const reduced = useReducedMotion();
  const copy = ABOUT_COPY.landing;

  return (
    <SectionShell id="nosotros" variant="light">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={
          <>
            {copy.titleA} <span className="text-accent">{copy.titleB}</span>
          </>
        }
        subtitle={copy.subtitle}
      />

      <div className="mx-auto max-w-6xl">
        {/* Executive block */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className={cn("rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-7", "shadow-sm shadow-black/5")}>
              <p className="text-sm text-muted-foreground leading-relaxed">{copy.positioningLine}</p>

              <div className="mt-5 rounded-2xl border border-border/60 bg-muted/20 px-4 py-3">
                <p className="text-sm text-foreground/90 leading-relaxed">{copy.microProof}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {ABOUT_BADGES.map((b) => (
                  <div
                    key={b.label}
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    <b.icon className="h-4 w-4 text-accent" />
                    <span>{b.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button asChild className="rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20">
                  <NavLink to={`${ROUTES.CONTACT}#form`}>{copy.primaryCta}</NavLink>
                </Button>
                <Button asChild variant="outline" className="rounded-2xl">
                  <NavLink to={ROUTES.ABOUT}>{copy.secondaryCta}</NavLink>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Deliverables (replaces metrics) */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.28, ease: "easeOut", delay: 0.03 }}
            className="lg:col-span-5"
          >
            <div className={cn("rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-7", "shadow-sm shadow-black/5")}>
              <div className="text-xs tracking-[0.18emeM] text-muted-foreground">LO QUE ENTREGAMOS</div>
              <div className="mt-2 text-lg font-semibold">Resultados verificables</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Para decisiones de compra serias: evidencia, pruebas y documentación que soportan operación y mantenimiento.
              </p>

              <div className="mt-5 space-y-4">
                {DELIVERABLES.map((d) => (
                  <div key={d.title} className="flex items-start gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
                      <d.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{d.title}</div>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {ABOUT_PILLARS.map((p, idx) => (
            <motion.article
              key={p.title}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.26, ease: "easeOut", delay: idx * 0.03 }}
              className={cn(
                "rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-6",
                "shadow-sm shadow-black/5",
                "hover:shadow-lg hover:shadow-black/10 hover:-translate-y-0.5 transition-all"
              )}
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
                <p.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
