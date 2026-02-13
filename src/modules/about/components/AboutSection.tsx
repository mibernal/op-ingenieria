// src/modules/about/components/AboutSection.tsx
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import { cn } from "@/lib/utils";
import { buildContactIntentHref } from "@/shared/utils/contact-intent";
import { ABOUT_COPY, ABOUT_BADGES } from "../content/about.content";

const EXEC_NOTES = [
  {
    title: "Ingenieria aterrizada a obra",
    desc: "Planeacion tecnica conectada con montaje, pruebas y arranque en campo.",
  },
  {
    title: "Riesgo operativo controlado",
    desc: "Diseño con criterio de continuidad, seguridad electrica y mantenibilidad.",
  },
  {
    title: "Decisiones con soporte tecnico",
    desc: "Entregables y trazabilidad para operacion, mantenimiento y auditoria.",
  },
];

export default function AboutSection() {
  const reduced = useReducedMotion();
  const copy = ABOUT_COPY.landing;

  return (
    <SectionShell id="nosotros" variant="light" className="py-8 md:py-11">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={
          <>
            {copy.titleA} <span className="text-accent">{copy.titleB}</span>
          </>
        }
        subtitle={copy.subtitle}
        className="mb-7 md:mb-8"
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className={cn(
              "lg:col-span-7 rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-6 md:p-7",
              "shadow-sm shadow-black/5"
            )}
          >
            <p className="text-[13px] md:text-sm text-muted-foreground leading-relaxed">{copy.positioningLine}</p>

            <div className="mt-5 rounded-2xl border border-border/60 bg-muted/20 px-4 py-3">
              <p className="text-[13px] md:text-sm text-foreground/90 leading-relaxed">{copy.microProof}</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {ABOUT_BADGES.map((b) => (
                <div
                  key={b.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-1.5 text-[12px] md:text-sm text-muted-foreground"
                >
                  <b.icon className="h-4 w-4 text-accent" />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button asChild className="rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20">
                <NavLink to={buildContactIntentHref({ intent: "diagnostico", source: "landing-about" })}>
                  {copy.primaryCta}
                </NavLink>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.28, ease: "easeOut", delay: 0.04 }}
            className="lg:col-span-5 space-y-4"
          >
            {EXEC_NOTES.map((note) => (
              <article
                key={note.title}
                className={cn(
                  "rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-4 md:p-5",
                  "shadow-sm shadow-black/5 hover:shadow-lg hover:shadow-black/10 transition-shadow"
                )}
              >
                <h3 className="text-sm md:text-base font-semibold">{note.title}</h3>
                <p className="mt-2 text-[12px] md:text-sm text-muted-foreground leading-relaxed">{note.desc}</p>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
}
