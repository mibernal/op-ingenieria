import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const AboutSection = () => {
  const cards = [
    {
      icon: Target,
      title: "Misión",
      content:
        "Diseñamos y ejecutamos proyectos de ingeniería eléctrica y electromecánica, integrando soluciones de energía convencional y energía solar para entornos industriales, comerciales y residenciales. Aportamos eficiencia, seguridad y desempeño, con una ejecución rigurosa de principio a fin: diagnóstico, ingeniería de detalle, suministro, instalación, pruebas y puesta en marcha."
    },
    {
      icon: Eye,
      title: "Visión",
      content:
        "Ser un referente en Colombia en ingeniería eléctrica, electromecánica y energía limpia, reconocidos por la solidez técnica, la calidad de la ejecución y el acompañamiento cercano al cliente. Aspiramos a construir alianzas de largo plazo, entregando soluciones confiables y medibles que impulsen la competitividad y la sostenibilidad de cada operación."
    },
    {
      icon: Award,
      title: "Compromiso de Calidad",
      content: [
        "Garantizar una experiencia profesional en cada proyecto, con asesoría experta, planeación disciplinada y comunicación transparente de avances, riesgos y entregables.",
        "Ejecutar con estándares exigentes de seguridad, calidad y cumplimiento, aplicando buenas prácticas de ingeniería, verificación en sitio y pruebas funcionales para asegurar el desempeño esperado.",
        "Impulsar la mejora continua mediante procesos estandarizados, capacitación permanente y evaluación del desempeño, promoviendo prácticas responsables y sostenibles con el medio ambiente."
      ]
    }
  ];

  return (
    <section id="nosotros" className="relative py-12 md:py-16">
      {/* Fondo sutil */}
      <div className="absolute inset-0 -z-10 bg-muted/30" />

      {/* Gradientes */}
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
            Ingeniería eléctrica y electromecánica con enfoque en eficiencia y sostenibilidad: integramos energía convencional y energía solar para proyectos confiables, seguros y de alto desempeño.
          </p>
          <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        {/* Cards */}
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
