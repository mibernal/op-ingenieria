import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">
      <div className="container mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          ¿Listo para llevar tu proyecto al siguiente nivel?
        </h2>

        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          En O&P Ingeniería diseñamos, implementamos y ejecutamos soluciones
          eléctricas e industriales con altos estándares de calidad,
          confiabilidad y seguridad.
        </p>

        <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-100">
          Solicitar Cotización
        </Button>
      </div>
    </section>
  );
}

export default CTASection;