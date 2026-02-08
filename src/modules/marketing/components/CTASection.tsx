// src/modules/marketing/components/CTASection.tsx
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section
      aria-label="Llamado a la acción"
      className={cn(
        "relative overflow-hidden",
        "bg-primary text-primary-foreground",
        "py-12 md:py-14" // ⬅️ un poco más compacto, premium
      )}
    >
      {/* Fondo decorativo sutil (marca) */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/25" />
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
            {/* ✅ Botón principal (verde) */}
            <Button
              size="lg"
              asChild
              className={cn(
                "w-full sm:w-auto",
                "h-14 px-8 rounded-2xl",
                "bg-accent text-accent-foreground hover:bg-accent/90",
                "shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30",
                "transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              )}
            >
              <NavLink to={ROUTES.CONTACT}>Solicitar Cotización</NavLink>
            </Button>

            {/* ✅ Botón secundario (glass como “Ver Proyectos Ejecutados”) */}
            <Button
              size="lg"
              variant="outline"
              asChild
              className={cn(
                "w-full sm:w-auto",
                "h-14 px-8 rounded-2xl",

                // 👇 Esto corrige el “bloque blanco” y hace glass premium
                "border border-white/20 bg-white/5 text-white/90",
                "hover:bg-white/10 hover:text-white hover:border-white/30",

                // Interacción
                "transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
                "shadow-sm hover:shadow-md",

                // Accesibilidad
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",

                // Glass
                "backdrop-blur-md"
              )}
            >
              <a href="tel:+576014732039" className="inline-flex items-center justify-center gap-2">
                <Phone className="h-4 w-4 text-white/80" aria-hidden="true" />
                Llamar Ahora
                <span aria-hidden className="text-white/70">›</span>
              </a>
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
