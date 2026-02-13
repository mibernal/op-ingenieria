//src/modules/services/components/ServicesSection.tsx
import { motion, useReducedMotion } from "framer-motion";
import { Zap, Settings, Sun, Wrench, Lightbulb, Cable, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import { cn } from "@/lib/utils";

type Service = {
  icon: any;
  title: string;
  desc: string;
  outcomes: string[];
};

const SERVICES: Service[] = [
  {
    icon: Zap,
    title: "Continuidad energética",
    desc: "Respaldo para cargas críticas (UPS, baterías, ATS/AMF, grupos electrógenos).",
    outcomes: ["Menos paradas", "Riesgo controlado", "Pruebas y puesta en marcha"],
  },
  {
    icon: Sun,
    title: "Solar fotovoltaica",
    desc: "Sistemas solares con protecciones, monitoreo y enfoque en desempeño real.",
    outcomes: ["Ahorro medible", "Arquitectura segura", "Operación monitoreada"],
  },
  {
    icon: Settings,
    title: "Tableros a la medida",
    desc: "Potencia, control y automatización con pruebas y documentación.",
    outcomes: ["Orden técnico", "Seguridad eléctrica", "Trazabilidad"],
  },
  {
    icon: Wrench,
    title: "Mantenimiento especializado",
    desc: "Preventivo y correctivo con reporte técnico y recomendaciones.",
    outcomes: ["Disponibilidad", "Vida útil", "Reducción de fallas"],
  },
  {
    icon: Lightbulb,
    title: "Iluminación eficiente",
    desc: "Retrofit LED y diseño lumínico con criterios técnicos.",
    outcomes: ["Menor consumo", "Confort visual", "Mejora inmediata"],
  },
  {
    icon: Cable,
    title: "Telecom y cableado",
    desc: "Infraestructura ordenada, segura y escalable.",
    outcomes: ["Escalabilidad", "Trazabilidad", "Menos reprocesos"],
  },
];

export default function ServicesSection() {
  const reduced = useReducedMotion();

  return (
    <SectionShell id="servicios" variant="light">
      <SectionHeader
        eyebrow="SERVICIOS"
        title={
          <>
            Soluciones que se sostienen{" "}
            <span className="text-accent">en operación</span>.
          </>
        }
        subtitle="Ingeniería con alcance, pruebas y entregables. Diseñamos para operar, mantener y escalar."
      />

      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground max-w-2xl">
            Si quieres detalle por línea (alcances, entregables, FAQs), visita la página completa de servicios.
          </div>
          <div className="flex gap-3">
            <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20">
              <NavLink to={ROUTES.SERVICES}>
                Ver servicios <ChevronRight className="h-4 w-4 ml-1" />
              </NavLink>
            </Button>
            <Button asChild variant="outline" className="rounded-2xl">
              <NavLink to={`${ROUTES.CONTACT}#form`}>Cotizar</NavLink>
            </Button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, idx) => (
            <motion.article
              key={s.title}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.28, ease: "easeOut", delay: idx * 0.03 }}
              className={cn(
                "rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md",
                "p-6 shadow-sm shadow-black/5",
                "hover:shadow-lg hover:shadow-black/10 hover:-translate-y-0.5 transition-all"
              )}
            >
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
                  <s.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-border/60 bg-muted/20 p-4">
                <div className="text-xs tracking-[0.18em] text-muted-foreground">RESULTADO</div>
                <ul className="mt-3 space-y-2 text-sm">
                  {s.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                      <span className="text-foreground/90">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex gap-3">
                <Button asChild size="sm" className="rounded-xl bg-accent hover:bg-accent/90">
                  <NavLink to={`${ROUTES.CONTACT}#form`}>Hablar con un ingeniero</NavLink>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-xl">
                  <NavLink to={ROUTES.SERVICES}>Detalles</NavLink>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
