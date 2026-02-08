import { Zap, Settings, Sun, Wrench, Lightbulb, Cable } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Zap,
    title: "Energía de Respaldo",
    description:
      "Soluciones para continuidad operativa: plantas eléctricas, bancos de baterías y respaldo crítico con ingeniería, instalación y puesta en marcha.",
  },
  {
    icon: Sun,
    title: "Energía Fotovoltaica",
    description:
      "Diseño e implementación de sistemas solares para industria, comercio y hogares: dimensionamiento, protección, monitoreo y optimización del ahorro.",
  },
  {
    icon: Settings,
    title: "Tableros Eléctricos",
    description:
      "Diseño y fabricación de tableros de potencia y control con pruebas, documentación y cumplimiento normativo según cada proyecto.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento Especializado",
    description:
      "Planes preventivos y correctivos con diagnóstico técnico, reportes, repuestos certificados y enfoque en disponibilidad y seguridad.",
  },
  {
    icon: Lightbulb,
    title: "Iluminación Eficiente",
    description:
      "Retrofit LED, diseño lumínico y automatización para reducir consumo, elevar el confort visual y mejorar la calidad del espacio.",
  },
  {
    icon: Cable,
    title: "Telecomunicaciones",
    description:
      "Redes estructuradas, canalizaciones y soporte para comunicaciones confiables, con enfoque en orden, seguridad y escalabilidad.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicios" className="relative py-10 md:py-14">
      {/* Fondo base */}
      <div className="absolute inset-0 -z-10 bg-background" />

      {/* Gradientes reducidos */}
      <div
        className="absolute inset-x-0 top-0 -z-10 h-16 bg-gradient-to-b from-background via-muted/10 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-16 bg-gradient-to-t from-background via-muted/10 to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4">
        {/* Header compacto */}
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h2 className="section-title mt-1">Nuestros Servicios</h2>

          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Ingeniería y ejecución para sistemas de respaldo, energía solar y soluciones eléctricas confiables en entornos industriales, comerciales y residenciales.
          </p>

          <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border/60",
                  "bg-card/80 backdrop-blur-md",
                  "p-6",
                  "shadow-sm shadow-black/5",
                  "transition-all duration-300",
                  "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 hover:border-primary/25",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                {/* Glow sutil */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <div className="absolute -inset-24 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_55%)]" />
                </div>

                {/* Icon badge */}
                <div className="relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
                  <div
                    className="absolute -inset-3 rounded-[18px] bg-accent/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <Icon className="relative h-6 w-6 text-accent transition-transform duration-300 group-hover:scale-[1.03]" />
                </div>

                <h3 className="relative font-heading font-semibold text-lg text-foreground">
                  {service.title}
                </h3>

                <div className="relative mt-3 h-px w-10 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
