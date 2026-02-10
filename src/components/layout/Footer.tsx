// src/components/layout/Footer.tsx
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  Award,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS, getNavHref, ROUTES } from "@/config/routes";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// ✅ Assets públicos (GitHub Pages friendly)
const logoSrc = `${import.meta.env.BASE_URL}uploads/logo.png`;

const LEGAL_LINKS = [
  { label: "Términos", to: `${ROUTES.LEGAL}#terminos` },
  { label: "Privacidad", to: `${ROUTES.LEGAL}#privacidad` },
  { label: "Cookies", to: `${ROUTES.LEGAL}#cookies` },
];

// ✅ Si aún no tienes redes, deja href undefined para que NO sean clicables
const SOCIAL_LINKS: Array<{
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
}> = [
  { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/opingenieria" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/o&p-ingenier%C3%ADa-sas/" },
  { Icon: Instagram, label: "Instagram", href: undefined },
];

const Footer = () => {
  return (
    <footer className="relative bg-primary text-primary-foreground border-t border-primary-foreground/15 overflow-hidden">
      {/* Fondo decorativo sutil (premium, coherente con CTA) */}
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-accent/12 blur-3xl" />
        <div className="absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-primary-foreground/8 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/25" />
      </div>

      {/* Separator wave (más bajo y sutil) */}
      <div className="relative h-7 md:h-8 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-7 md:h-8"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0 120L48 105C96 90 192 60 288 45C384 30 480 30 576 37.5C672 45 768 60 864 67.5C960 75 1056 75 1152 67.5C1248 60 1344 45 1392 37.5L1440 30V120H0Z"
            className="fill-background"
          />
        </svg>
      </div>

      <div className="relative container mx-auto px-4 pt-10 pb-7 md:pt-12 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-9">
          {/* Logo y descripción */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              {/* Logo corporativo */}
<div
  className={cn(
    "w-20 h-14 rounded-2xl overflow-hidden",
    "bg-white border border-primary-foreground/15",
    "flex items-center justify-center shadow-sm shadow-black/10"
  )}
>
  <img
    src={logoSrc}
    alt="O&P Ingeniería S.A.S"
    className="w-full h-full object-contain px-2 py-1.5"
    loading="lazy"
    decoding="async"
  />
</div>

              <div className="leading-tight">
                <h3 className="text-lg md:text-xl font-heading font-bold">
                  O&amp;P Ingeniería S.A.S
                </h3>
                <p className="text-sm text-primary-foreground/70">
                  Respaldo energético • Solar • Soluciones eléctricas
                </p>
              </div>
            </div>

            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Ingeniería eléctrica e industrial con foco en continuidad operativa, seguridad y
              cumplimiento. Diseñamos y ejecutamos soluciones a medida para industria, comercio y
              residencial.
            </p>

            <div className="flex gap-4">
              {[
                { Icon: Award, label: "Calidad" },
                { Icon: Shield, label: "Seguridad" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-accent/18 flex items-center justify-center border border-primary-foreground/10">
                    <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
                  </div>
                  <span className="text-xs text-primary-foreground/70">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-base">Enlaces</h4>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={getNavHref(item)}
                    className={cn(
                      "text-sm text-primary-foreground/70 hover:text-accent transition-colors duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-base">Contacto</h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Horario</p>
                  <p className="text-sm text-primary-foreground/70">Lun–Vie: 8:00–17:00</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Teléfono</p>
                  <a
                    href="tel:+576014732039"
                    className={cn(
                      "text-sm text-primary-foreground/70 hover:text-accent transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                    )}
                  >
                    +57 (601) 4732039
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href="mailto:info@opingenieria.com"
                    className={cn(
                      "text-sm text-primary-foreground/70 hover:text-accent transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                    )}
                  >
                    info@opingenieria.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Ubicación</p>
                  <p className="text-sm text-primary-foreground/70">Bogotá, Colombia</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-base">Redes</h4>

            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ Icon, label, href }) => {
                const isDisabled = !href;

                return (
                  <a
                    key={label}
                    href={href || undefined}
                    aria-label={label}
                    aria-disabled={isDisabled ? true : undefined}
                    target={href ? "_blank" : undefined}
                    rel={href ? "noreferrer" : undefined}
                    className={cn(
                      "w-10 h-10 rounded-full",
                      "bg-primary-foreground/5 hover:bg-accent/20",
                      "border border-primary-foreground/15",
                      "flex items-center justify-center",
                      "text-primary-foreground/70 hover:text-accent",
                      "transition-all duration-300 hover:scale-105",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                      isDisabled && "opacity-40 pointer-events-none"
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>

            <div className="mt-5">
              <Button
                asChild
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20"
              >
                <a href="tel:+576014732039">Llamar ahora</a>
              </Button>
            </div>

            <p className="mt-3 text-xs text-primary-foreground/60">
              Respuesta rápida • Asesoría técnica • Soluciones a medida
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/15 pt-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs md:text-sm text-primary-foreground/60 text-center md:text-left">
              © {new Date().getFullYear()} — O&amp;P Ingeniería S.A.S. Todos los derechos reservados.
              <span className="hidden sm:inline"> — Desarrollado por Miguel Bernal</span>
            </p>

            <div className="flex items-center gap-5 text-xs md:text-sm text-primary-foreground/60">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={cn(
                    "hover:text-accent transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
