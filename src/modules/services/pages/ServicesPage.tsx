//src/modules/services/pages/ServicesPage.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/seo/Seo";
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";
import { Zap, Settings, Sun, Wrench, Lightbulb, Cable } from "lucide-react";
import { buildContactIntentHref } from "@/shared/utils/contact-intent";

const SERVICES = [
  {
    icon: Zap,
    title: "Respaldo y continuidad energética",
    bullets: [
      "Diagnóstico de cargas críticas y riesgo operativo",
      "Arquitectura: UPS / baterías / ATS / grupos electrógenos",
      "Pruebas funcionales + puesta en marcha",
      "Documentación y plan de mantenimiento",
    ],
  },
  {
    icon: Sun,
    title: "Energía solar fotovoltaica",
    bullets: [
      "Dimensionamiento y protecciones DC/AC",
      "Monitoreo y optimización de desempeño",
      "Puesta en marcha y criterios de aceptación",
      "Soporte y acompañamiento",
    ],
  },
  {
    icon: Settings,
    title: "Tableros de potencia y control",
    bullets: [
      "Diseño y fabricación a la medida",
      "Planos, pruebas, etiquetado y as-built",
      "Cumplimiento normativo según alcance",
      "Trazabilidad y mantenibilidad",
    ],
  },
  {
    icon: Wrench,
    title: "Mantenimiento especializado",
    bullets: [
      "Preventivo / correctivo con reporte técnico",
      "Diagnóstico en sitio y recomendaciones",
      "Repuestos certificados",
      "Plan de intervención por criticidad",
    ],
  },
  {
    icon: Lightbulb,
    title: "Iluminación eficiente",
    bullets: [
      "Diseño lumínico y retrofit LED",
      "Reducción de consumo y mejora visual",
      "Medición base y propuesta técnica",
      "Ejecución y verificación",
    ],
  },
  {
    icon: Cable,
    title: "Telecom y cableado estructurado",
    bullets: [
      "Canalizaciones y organización técnica",
      "Infra ordenada y escalable",
      "Buenas prácticas de etiquetado y trazabilidad",
      "Soporte para crecimiento sin reprocesos",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo
        title="Servicios | O&P Ingeniería"
        description="Servicios B2B: continuidad energética, solar fotovoltaica, tableros, mantenimiento, iluminación y telecomunicaciones con entregables verificables."
      />
      <Header />

      <main className="flex-1">
        <SectionShell variant="dark" className="pt-10 pb-10 md:pt-14 md:pb-14">
          <SectionHeader
            eyebrow="SERVICIOS"
            title={
              <>
                Alcance, pruebas y{" "}
                <span className="text-accent">entregables</span>.
              </>
            }
            subtitle="Servicios pensados para operación real: seguridad, mantenibilidad y trazabilidad."
          />

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90">
              <NavLink to={buildContactIntentHref({ intent: "cotizacion", source: "services-page-hero" })}>
                Solicitar cotización
              </NavLink>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
            >
              <NavLink to={ROUTES.PROJECTS}>Ver proyectos</NavLink>
            </Button>
          </div>
        </SectionShell>

        <SectionShell variant="light" className="pt-4 pb-16 md:pt-6 md:pb-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              align="left"
              eyebrow="LÍNEAS DE SERVICIO"
              title="Ingeniería para industria, comercio y operación crítica"
              subtitle="Cada servicio se ejecuta con planeación, pruebas, y documentación para operar con confianza."
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <div
                  key={s.title}
                  className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-7 shadow-sm shadow-black/5 hover:shadow-lg hover:shadow-black/10 transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
                      <s.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{s.title}</div>

                    </div>
                  </div>

                  <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </SectionShell>
      </main>

      <Footer />
    </div>
  );
}
