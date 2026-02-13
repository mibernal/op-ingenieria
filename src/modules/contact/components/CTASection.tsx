// src/modules/marketing/components/CTASection.tsx
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Phone,
  Clock,
  Mail,
  MapPin,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";

const CONTACT = {
  email: "info@opingenieria.com",
  phoneDisplay: "+57 (601) 4732039",
  phoneHref: "tel:+576014732039",
  whatsappHref: "https://wa.me/573133638760",
  city: "Bogotá, Colombia",
  hours: "Lun–Vie • 8:00 a.m. – 5:00 p.m.",
};

const infoItems = [
  {
    icon: Clock,
    title: "Horario",
    value: CONTACT.hours,
    helper: "Atención y respuesta ágil",
  },
  {
    icon: Mail,
    title: "Email",
    value: CONTACT.email,
    helper: "Asesoría técnica por correo",
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: Phone,
    title: "Teléfono",
    value: CONTACT.phoneDisplay,
    helper: "Cotizaciones y soporte",
    href: CONTACT.phoneHref,
  },
  {
    icon: MapPin,
    title: "Ubicación",
    value: CONTACT.city,
    helper: "Cobertura industrial, comercial y residencial",
  },
];

export function CTASection() {
  return (
    <section
      aria-label="Llamado a la acción"
      className={cn(
        "relative overflow-hidden",
        "bg-primary text-primary-foreground",
        "py-12 md:py-14"
      )}
    >
      {/* Fondo decorativo sutil (marca) */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/25" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center">
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
              confiabilidad y seguridad. Cuéntanos tu necesidad técnica y te respondemos con una propuesta clara y viable.
            </p>
          </div>

          {/* ✅ Info rápida (del ContactSection) pero con look CTA */}
          <div className="mt-8">
            <div
              className={cn(
                "rounded-3xl border border-white/15 bg-white/5",
                "backdrop-blur-md",
                "p-4 sm:p-5",
                "shadow-sm"
              )}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {infoItems.map((it) => {
                  const Icon = it.icon;
                  const Wrapper: any = it.href ? "a" : "div";

                  return (
                    <Wrapper
                      key={it.title}
                      href={it.href}
                      className={cn(
                        "group rounded-2xl border border-white/15 bg-white/5 p-4",
                        "transition-all duration-300",
                        "hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/25 hover:shadow-md",
                        it.href &&
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                      )}
                      aria-label={it.href ? `${it.title}: ${it.value}` : undefined}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative grid h-10 w-10 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                          <div
                            className="absolute -inset-3 rounded-[18px] bg-white/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            aria-hidden="true"
                          />
                          <Icon className="relative h-5 w-5 text-accent" aria-hidden="true" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-white/95">{it.title}</p>

                          <div className="mt-1 flex items-center gap-2">
                            <p className="text-sm text-white/75 truncate">{it.value}</p>
                            {it.href ? (
                              <ArrowUpRight
                                className="h-4 w-4 text-white/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                aria-hidden="true"
                              />
                            ) : null}
                          </div>

                          <p className="mt-1 text-xs text-white/60">{it.helper}</p>
                        </div>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* ✅ Primario */}
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
              {/* ✅ Directo al form */}
              <NavLink to={`${ROUTES.CONTACT}#form`}>Solicitar Cotización</NavLink>
            </Button>

            {/* ✅ Secundario (WhatsApp) */}
            <Button
              size="lg"
              variant="outline"
              asChild
              className={cn(
                "w-full sm:w-auto",
                "h-14 px-8 rounded-2xl",
                "border border-white/20 bg-white/5 text-white/90",
                "hover:bg-white/10 hover:text-white hover:border-white/30",
                "transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
                "shadow-sm hover:shadow-md",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                "backdrop-blur-md"
              )}
            >
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2"
                aria-label="Cotizar por WhatsApp"
              >
                <MessageCircle className="h-4 w-4 text-white/80" aria-hidden="true" />
                WhatsApp
                <span aria-hidden className="text-white/70">›</span>
              </a>
            </Button>

            {/* ✅ Tercero opcional: Llamar (si quieres dejarlo) */}
            <Button
              size="lg"
              variant="outline"
              asChild
              className={cn(
                "w-full sm:w-auto",
                "h-14 px-8 rounded-2xl",
                "border border-white/20 bg-white/5 text-white/90",
                "hover:bg-white/10 hover:text-white hover:border-white/30",
                "transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
                "shadow-sm hover:shadow-md",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                "backdrop-blur-md"
              )}
            >
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center justify-center gap-2"
                aria-label={`Llamar ahora al ${CONTACT.phoneDisplay}`}
              >
                <Phone className="h-4 w-4 text-white/80" aria-hidden="true" />
                Llamar Ahora
                <span aria-hidden className="text-white/70">›</span>
              </a>
            </Button>
          </div>

          <p className="mt-4 text-center text-xs md:text-sm text-primary-foreground/70">
            Respuesta rápida • Asesoría técnica • Soluciones a medida
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
