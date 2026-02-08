import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const AboutSection = () => {
  const cards = [
    {
      icon: Target,
      title: "Misión",
      content:
        "Diseñamos e implementamos soluciones integrales de energía para entornos industriales, comerciales y residenciales, con foco en continuidad operativa y eficiencia. Nos especializamos en sistemas de respaldo y autonomía —plantas eléctricas, energía solar y bancos de baterías— ejecutando cada proyecto con altos estándares de ingeniería, seguridad, calidad y cumplimiento, desde el diagnóstico hasta la puesta en marcha."
    },
    {
      icon: Eye,
      title: "Visión",
      content:
        "Ser un referente en Colombia en soluciones de respaldo energético y proyectos de ingeniería, reconocidos por la confiabilidad de nuestras implementaciones, la excelencia en servicio y una ejecución impecable. Aspiramos a construir alianzas de largo plazo, acompañando a nuestros clientes con innovación aplicada, soporte técnico y resultados medibles que protegen su operación y su inversión."
    },
    {
      icon: Award,
      title: "Política de Calidad",
      content: [
        "Entregar soluciones de energía orientadas a la continuidad del cliente, con asesoría experta, planificación rigurosa y comunicación transparente en cada etapa.",
        "Ejecutar proyectos y suministros con calidad, seguridad y cumplimiento, aplicando buenas prácticas de ingeniería, pruebas y verificación para garantizar desempeño y confiabilidad.",
        "Impulsar la mejora continua mediante estandarización de procesos, capacitación permanente y evaluación del desempeño, promoviendo prácticas responsables con el medio ambiente."
      ]
    }
  ];

  return (
<section id="nosotros" className="relative py-12 md:py-16">
  {/* Fondo sutil */}
  <div className="absolute inset-0 -z-10 bg-muted/30" />

  {/* Gradientes reducidos */}
  <div
    className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-background/80 via-background/20 to-transparent"
    aria-hidden="true"
  />
  <div
    className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-background/80 via-background/20 to-transparent"
    aria-hidden="true"
  />

  <div className="container mx-auto px-4">
    {/* Header sección */}
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <h2 className="section-title mt-1">NOSOTROS</h2>
      <p className="mt-2 text-sm md:text-base text-muted-foreground">
        Ingeniería aplicada y ejecución confiable para sistemas de respaldo: plantas eléctricas, energía solar y baterías.
      </p>
      <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <Card
            key={index}
            className={cn(
              "group relative h-full overflow-hidden rounded-2xl",
              "bg-card/80 backdrop-blur-md",
              "border border-border/60",
              "shadow-sm shadow-black/5",
              "transition-all duration-300",
              "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10",
              "hover:border-primary/30"
            )}
          >
            {/* Glow sutil */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            >
              <div className="absolute -inset-24 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_55%)]" />
            </div>

            <CardHeader className="text-center pb-4 pt-6">
              <div className="relative mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
                <div
                  className="absolute -inset-3 rounded-[20px] bg-primary/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <Icon className="relative h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-[1.03]" />
              </div>

              <CardTitle className="text-xl font-heading text-foreground">
                {card.title}
              </CardTitle>

              <div className="mx-auto mt-2 h-px w-10 bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
            </CardHeader>

            <CardContent className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
              {Array.isArray(card.content) ? (
                <ul className="space-y-3">
                  {card.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{card.content}</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
</section>
  );
};

export default AboutSection;
