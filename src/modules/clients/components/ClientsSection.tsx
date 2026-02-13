import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import LogoCarousel from "@/shared/components/LogoCarousel";
import { clientsService } from "@/core/services/clientsService";
import { cn } from "@/lib/utils";
import { ChevronRight, ShieldCheck, Timer, FileText } from "lucide-react";
import { CLIENTS_COPY } from "@/modules/clients/content/clients.copy";

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: "Operación crítica",
    desc: "Soluciones pensadas para continuidad, seguridad y control.",
  },
  {
    icon: Timer,
    title: "Ejecución disciplinada",
    desc: "Planeación, pruebas y puesta en marcha con criterio técnico.",
  },
  {
    icon: FileText,
    title: "Entregables verificables",
    desc: "Documentación, trazabilidad y soporte para operar con confianza.",
  },
];

export default function ClientsSection() {
  const copy = CLIENTS_COPY.section;
  const reduced = useReducedMotion();
  const clients = clientsService.list();

  return (
    <SectionShell id="clientes" variant="tint">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={
          <>
            {copy.titleA}{" "}
            <span className="text-accent">{copy.titleB}</span>.
          </>
        }
        subtitle={copy.subtitle}
      />

      <div className="mx-auto max-w-6xl">
        {/* Top CTAs */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Industria & Institucional</Badge>
            <Badge variant="outline" className="border-foreground/15">
              Respaldo + continuidad
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20">
              <NavLink to={ROUTES.CLIENTS}>
                {copy.primaryCta} <ChevronRight className="ml-1 h-4 w-4" />
              </NavLink>
            </Button>
            <Button asChild variant="outline" className="rounded-2xl">
              <NavLink to={`${ROUTES.CONTACT}#form`}>{copy.secondaryCta}</NavLink>
            </Button>
          </div>
        </div>

        {/* Highlights + Carousel */}
        <div className="grid gap-6 lg:grid-cols-12 items-stretch">
          {/* Left: highlights */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-6 md:p-7 shadow-sm shadow-black/5">
              <div className="text-lg font-semibold">Lo que garantizamos</div>
              <p className="mt-2 text-sm text-muted-foreground">
                En proyectos críticos, la diferencia está en método, pruebas y evidencia.
              </p>

              <div className="mt-6 space-y-3">
                {HIGHLIGHTS.map((h) => (
                  <div
                    key={h.title}
                    className={cn(
                      "rounded-2xl border border-border/60 bg-muted/20 p-4",
                      "hover:bg-muted/30 transition-colors"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
                        <h.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{h.title}</div>
                        <div className="mt-1 text-sm text-muted-foreground leading-relaxed">
                          {h.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: carousel */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.28, ease: "easeOut", delay: 0.05 }}
            className="lg:col-span-7"
          >
            <div
              className={cn(
                "rounded-3xl border border-border/60",
                "bg-background/70 backdrop-blur-md",
                "shadow-sm shadow-black/5",
                "p-6 md:p-7",
                "overflow-hidden"
              )}
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold">Organizaciones</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Algunos de los clientes y entidades con las que hemos trabajado.
                  </p>
                </div>

                <Button asChild size="sm" variant="outline" className="rounded-xl">
                  <NavLink to={ROUTES.CLIENTS}>{copy.tertiaryCta}</NavLink>
                </Button>
              </div>

              {/* ✅ Altura mínima + padding interno para que el carrusel SIEMPRE sea visible */}
              <div className="mt-6 min-h-[160px] md:min-h-[180px]">
                <LogoCarousel
                  items={clients}
                  variant="clients"
                  autoPlay
                  speed={3}
                  responsive={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
                  gapPx={16}
                  className="bg-transparent"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
}
