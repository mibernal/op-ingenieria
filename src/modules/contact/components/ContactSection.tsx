// src/modules/contact/components/ContactSection.tsx
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CONTACT = {
  email: "info@opingenieria.com",
  phoneDisplay: "+57 (601) 4732039",
  phoneHref: "tel:+576014732039",
  whatsappHref: "https://wa.me/573133638760",
  city: "Bogotá, Colombia",
  hours: "Lun–Vie • 8:00 a.m. – 5:00 p.m.",
};

const items = [
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

const ContactSection = () => {
  return (
    <section id="contacto" className="relative py-10 md:py-14 bg-background">
      {/* Gradientes cortos (no inflan la sección) */}
      <div
        className="absolute inset-x-0 top-0 -z-10 h-16 bg-gradient-to-b from-background via-muted/10 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-16 bg-gradient-to-t from-background via-muted/10 to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4">
        {/* Header premium compacto */}
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="text-xs tracking-[0.22em] text-muted-foreground">CONTACTO</p>
          <h2 className="section-title mt-2">Hablemos de tu proyecto</h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Cuéntanos tu necesidad técnica y te respondemos con una propuesta clara y viable.
          </p>
          <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        </div>

        {/* Grid + CTA */}
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Panel info (glass) */}
          <div
            className={cn(
              "rounded-3xl border border-border/60",
              "bg-card/70 backdrop-blur-md",
              "shadow-sm shadow-black/5",
              "p-4 sm:p-6"
            )}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((it) => {
                const Icon = it.icon;
                const Wrapper: any = it.href ? "a" : "div";

                return (
                  <Wrapper
                    key={it.title}
                    href={it.href}
                    className={cn(
                      "group rounded-2xl border border-border/60 bg-background/40 p-5",
                      "transition-all duration-300",
                      "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 hover:border-primary/25",
                      it.href &&
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    )}
                    aria-label={it.href ? `${it.title}: ${it.value}` : undefined}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
                        <div
                          className="absolute -inset-3 rounded-[18px] bg-accent/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                        <Icon className="relative h-5 w-5 text-accent" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground">{it.title}</p>

                        <div className="mt-1 flex items-center gap-2">
                          <p className="text-sm text-muted-foreground truncate">{it.value}</p>
                          {it.href ? (
                            <ArrowUpRight
                              className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              aria-hidden="true"
                            />
                          ) : null}
                        </div>

                        <p className="mt-1 text-xs text-muted-foreground">{it.helper}</p>
                      </div>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>

          {/* CTAs */}
          <div
            className={cn(
              "rounded-3xl border border-border/60",
              "bg-card/50 backdrop-blur-md",
              "shadow-sm shadow-black/5",
              "p-5 sm:p-6"
            )}
          >
            <p className="text-xs tracking-[0.22em] text-muted-foreground">RESPUESTA RÁPIDA</p>
            <h3 className="mt-2 text-xl font-heading font-bold text-foreground">
              Solicita una cotización
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Cuéntanos el alcance y te orientamos con una propuesta técnica.
            </p>

            <div className="mt-5 grid gap-3">
              <Button
                size="lg"
                asChild
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
              >
                <NavLink to={ROUTES.CONTACT}>Solicitar Cotización</NavLink>
              </Button>

              <Button
                size="lg"
                asChild
                className={cn(
                  "h-14 rounded-2xl",
                  "border border-border/60 bg-background/40 text-foreground",
                  "hover:bg-background/60",
                  "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10"
                )}
                variant="outline"
              >
                <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer">
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-accent" aria-hidden="true" />
                    WhatsApp
                  </span>
                </a>
              </Button>

              {/* ✅ Llamar ahora (mismo estilo que “Ver Proyectos Ejecutados” del Hero) */}
              <Button
                size="lg"
                variant="outline"
                asChild
                className={cn(
                  "h-14 rounded-2xl px-8",
                  // “glass outline” consistente
                  "border border-border/60 bg-background/40 text-foreground/90",
                  // hover refinado
                  "hover:bg-background/60 hover:text-foreground hover:border-border/80",
                  // interacción
                  "transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
                  "shadow-sm hover:shadow-md",
                  // accesibilidad
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                  // glass
                  "backdrop-blur-md"
                )}
              >
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center justify-center gap-2"
                  aria-label={`Llamar ahora al ${CONTACT.phoneDisplay}`}
                >
                  Llamar ahora
                  <span aria-hidden className="text-muted-foreground">›</span>
                </a>
              </Button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Respuesta rápida • Asesoría técnica • Soluciones a medida
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
