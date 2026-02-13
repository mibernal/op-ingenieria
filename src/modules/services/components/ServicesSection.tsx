import { motion, useReducedMotion } from "framer-motion";
import { Zap, Settings, Sun, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import { cn } from "@/lib/utils";
import { buildContactIntentHref } from "@/shared/utils/contact-intent";

type Service = {
  icon: any;
  title: string;
  desc: string;
  deliverable: string;
};

const EXECUTION_FLOW = ["Diagnostico en sitio", "Ingenieria de detalle", "Ejecucion en obra", "Pruebas y puesta en marcha"];

const SERVICES: Service[] = [
  {
    icon: Zap,
    title: "Continuidad y respaldo energetico",
    desc: "Integracion de UPS, bancos de baterias, transferencias y plantas para cargas criticas.",
    deliverable: "Arquitectura de respaldo + protocolo de pruebas",
  },
  {
    icon: Sun,
    title: "Energia solar fotovoltaica",
    desc: "Sistemas solares para operacion industrial y comercial con protecciones y control de desempeno real.",
    deliverable: "Diseño tecnico + comisionamiento en sitio",
  },
  {
    icon: Settings,
    title: "Tableros de potencia y control",
    desc: "Diseño, fabricacion e integracion de tableros para distribucion y control electrico.",
    deliverable: "Planos, pruebas y as-built",
  },
  {
    icon: Wrench,
    title: "Mantenimiento especializado",
    desc: "Intervencion preventiva y correctiva orientada a disponibilidad, seguridad y vida util de los equipos.",
    deliverable: "Informe tecnico + plan de acciones",
  },
];

export default function ServicesSection() {
  const reduced = useReducedMotion();

  return (
    <SectionShell id="servicios" variant="light" className="py-9 md:py-12">
      <SectionHeader
        eyebrow="SERVICIOS"
        title={
          <>
            Ingenieria de servicio{" "}
            <span className="text-accent">orientada a resultados</span>.
          </>
        }
        subtitle="Resumen ejecutivo para empresas en Colombia que requieren continuidad, seguridad electrica y cumplimiento tecnico."
        className="mb-7 md:mb-8"
      />

      <div className="mx-auto max-w-6xl">
        <div className="mb-5 rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-4 md:p-5 shadow-sm shadow-black/5">
          <div className="text-[11px] md:text-xs tracking-[0.18em] text-muted-foreground">FLUJO DE EJECUCION</div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {EXECUTION_FLOW.map((step, idx) => (
              <div
                key={step}
                className="rounded-2xl border border-border/60 bg-background/50 px-3 py-2 text-[13px] md:text-sm text-foreground/90"
              >
                <span className="text-muted-foreground mr-1">0{idx + 1}.</span>
                {step}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, idx) => (
            <motion.article
              key={service.title}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.28, ease: "easeOut", delay: idx * 0.03 }}
              className={cn(
                "rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md",
                "p-5 md:p-6 shadow-sm shadow-black/5",
                "hover:shadow-lg hover:shadow-black/10 hover:-translate-y-0.5 transition-all"
              )}
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
                <service.icon className="h-5 w-5 text-accent" />
              </div>

              <h3 className="mt-4 text-base font-semibold leading-tight">{service.title}</h3>
              <p className="mt-2 text-[13px] md:text-sm text-muted-foreground leading-relaxed line-clamp-3 md:line-clamp-none">{service.desc}</p>

              <div className="mt-4 rounded-2xl border border-border/60 bg-muted/20 px-3 py-2">
                <div className="text-[10px] md:text-[11px] tracking-[0.14em] text-muted-foreground">ENTREGABLE CLAVE</div>
                <p className="mt-1 text-[13px] md:text-sm text-foreground/90">{service.deliverable}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-7 flex justify-center">
          <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20">
            <NavLink to={buildContactIntentHref({ intent: "diagnostico", source: "landing-services" })}>
              Solicitar diagnostico tecnico
            </NavLink>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
