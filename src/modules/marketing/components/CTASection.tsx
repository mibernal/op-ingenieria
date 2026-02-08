// src/modules/marketing/components/CTASection.tsx
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section
      aria-label="Llamado a la acción"
      className={cn(
        "relative overflow-hidden",
        "bg-primary text-primary-foreground",
        "py-16 md:py-20"
      )}
    >
      {/* Fondo decorativo sutil (marca) */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/20" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-2 text-xs md:text-sm text-primary-foreground/90">
            <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
            Ingeniería eléctrica e industrial con estándares profesionales
          </div>

          <h2 className="mt-6 text-3xl md:text-4xl font-heading font-bold tracking-tight">
            ¿Listo para llevar tu proyecto al siguiente nivel?
          </h2>

          <p className="mt-4 text-base md:text-lg text-primary-foreground/80 leading-relaxed">
            En O&amp;P Ingeniería diseñamos, implementamos y ejecutamos soluciones
            eléctricas e industriales con altos estándares de calidad,
            confiabilidad y seguridad.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
            >
              <NavLink to={ROUTES.CONTACT}>Solicitar Cotización</NavLink>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className={cn(
                "w-full sm:w-auto",
                "border-primary-foreground/25 text-primary-foreground",
                "hover:bg-primary-foreground/10"
              )}
            >
              <a href="tel:+576014732039">Llamar Ahora</a>
            </Button>
          </div>

          <p className="mt-4 text-xs md:text-sm text-primary-foreground/70">
            Respuesta rápida • Asesoría técnica • Soluciones a medida
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
