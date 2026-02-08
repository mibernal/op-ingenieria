import { Zap, Settings, Sun, Wrench, Lightbulb, Cable } from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Productos Eléctricos",
    description:
      "Suministro integral de equipos eléctricos certificados, con respaldo técnico, garantías y soporte postventa.",
  },
  {
    icon: Sun,
    title: "Energía Fotovoltaica",
    description:
      "Ingeniería, instalación y puesta en marcha de sistemas solares con dimensionamiento, monitoreo y ahorro energético.",
  },
  {
    icon: Settings,
    title: "Tableros Eléctricos",
    description:
      "Diseño, fabricación y pruebas de tableros de potencia y control bajo normativa y especificaciones del proyecto.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento",
    description:
      "Planes preventivos y correctivos para continuidad operativa, con reportes técnicos y repuestos certificados.",
  },
  {
    icon: Lightbulb,
    title: "Iluminación",
    description:
      "Diseño lumínico eficiente, retrofit LED y automatización para reducir consumo y mejorar confort visual.",
  },
  {
    icon: Cable,
    title: "Telecomunicaciones",
    description:
      "Redes estructuradas, canalizaciones y sistemas de respaldo para comunicaciones críticas y seguras.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicios" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-4">Nuestros Servicios</h2>
        <p className="section-subtitle text-center mx-auto mb-12">
          Ofrecemos soluciones integrales para todas sus necesidades de ingeniería eléctrica
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <service.icon className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
