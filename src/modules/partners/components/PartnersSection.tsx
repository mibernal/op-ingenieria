import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import LogoCarousel from "@/shared/components/LogoCarousel";
import { partnersService } from "@/core/services/partnersService";
import { cn } from "@/lib/utils";

const CRITERIA = [
  "Soporte y garantía",
  "Disponibilidad y repuestos",
  "Compatibilidad técnica",
  "Seguridad y normativa",
  "Trazabilidad",
];

export default function PartnersSection() {
  const reduced = useReducedMotion();
  const partners = partnersService.list();

  return (
    <SectionShell id="partners" variant="tint">
      <SectionHeader
        eyebrow="ALIANZAS"
        title={
          <>
            Partners para soporte y{" "}
            <span className="text-accent">escalabilidad</span>.
          </>
        }
        subtitle="Trabajamos con marcas y fabricantes para asegurar continuidad, mantenibilidad y disponibilidad."
      />

      <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-12 items-start">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <div className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-6 shadow-sm shadow-black/5">
            <div className="text-sm font-semibold">Criterios de selección</div>
            <p className="mt-2 text-sm text-muted-foreground">
              No es “un listado”: es un estándar de confiabilidad para proyectos críticos.
            </p>

            <ul className="mt-5 space-y-3">
              {CRITERIA.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span className="text-foreground/90">{c}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20">
                <NavLink to={`${ROUTES.CONTACT}#form`}>
                  Solicitar propuesta <ChevronRight className="h-4 w-4 ml-1" />
                </NavLink>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl">
                <NavLink to={ROUTES.PARTNERS}>Ver partners</NavLink>
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.28, ease: "easeOut", delay: 0.05 }}
          className={cn(
            "lg:col-span-7 rounded-3xl border border-border/60",
            "bg-background/70 backdrop-blur-md p-6 shadow-sm shadow-black/5"
          )}
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-lg font-semibold">Marcas y fabricantes</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Carrusel sobrio, limpio y consistente con un look corporativo premium.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <LogoCarousel
              items={partners}
              variant="partners"
              autoPlay
              speed={3}
              responsive={{ base: 2, sm: 3, md: 4, lg: 5, xl: 7 }}
              gapPx={16}
              className="bg-transparent"
            />
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
