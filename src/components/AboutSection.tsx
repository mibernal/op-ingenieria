import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Award } from "lucide-react";

const AboutSection = () => {
  const cards = [
    {
      icon: Target,
      title: "Misión",
      content: "Somos una empresa dedicada al diseño y/o desarrollo de proyectos en el área de la Ingeniería Eléctrica y Mecánica, Mantenimiento de Obras de Infraestructura, que busca satisfacer las necesidades de nuestros clientes, ofreciéndoles productos y servicios de alta calidad; respetuosos con el medio ambiente, generando al mismo tiempo empleo y bienestar social a nuestros colaboradores."
    },
    {
      icon: Eye,
      title: "Visión",
      content: "O&P INGENIERIA SAS se proyecta para el año 2025 ser una empresa líder y con el más alto nivel de reconocimiento en Colombia en brindar soluciones integrales desarrollando ingeniería y ejecutando proyectos industriales con la innovación y calidad de nuestros productos y servicios. Satisfaciendo las necesidades de nuestros clientes, accionistas, capital humano y sociedad. Nuestro compromiso es la excelencia."
    },
    {
      icon: Award,
      title: "Política de Calidad",
      content: [
        "Brindar soluciones integrales para el logro de la satisfacción de nuestros clientes.",
        "Realizar obras de ingeniería y suministros de productos con calidad, cumplimiento y contribuyendo al cuidado del medio ambiente.",
        "Propiciar de manera sistemática la mejora continua en el desempeño de nuestros procesos."
      ]
    }
  ];

  return (
    <section id="nosotros" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-12">NOSOTROS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <Card key={index} className="bg-card border-primary/20 hover:border-primary/40 transition-colors h-full">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <card.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-heading text-primary">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm leading-relaxed">
                {Array.isArray(card.content) ? (
                  <ul className="space-y-3">
                    {card.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{card.content}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
