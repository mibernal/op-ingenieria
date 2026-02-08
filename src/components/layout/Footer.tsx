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
import { NAV_ITEMS, getNavHref } from "@/config/routes";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// ✅ logo local
import logoSrc from "@/assets/images/uploads/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/15">
      {/* Separator (más bajo y sutil) */}
      <div className="relative h-10 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-10"
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

      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
          {/* Logo y descripción */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              {/* ✅ Contenedor de logo corporativo (FONDO BLANCO) */}
              <div
                className={cn(
                  "w-14 h-14 rounded-xl overflow-hidden",
                  // ✅ AQUÍ: fondo blanco + borde sutil + sombra ligera para separarlo del footer oscuro
                  "bg-white border border-black/10 shadow-sm",
                  "flex items-center justify-center"
                )}
              >
                <img
                  src={logoSrc}
                  alt="O&P Ingeniería S.A.S"
                  className="w-full h-full object-contain p-1.5"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="leading-tight">
                <h3 className="text-lg md:text-xl font-heading font-bold">
                  O&amp;P Ingeniería S.A.S
                </h3>
                <p className="text-sm text-primary-foreground/70">
                  Soluciones Eléctricas Integrales
                </p>
              </div>
            </div>

            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Ingeniería eléctrica e industrial con enfoque en calidad, seguridad y
              confiabilidad para proyectos corporativos e industriales.
            </p>

            <div className="flex gap-4">
              {[
                { Icon: Award, label: "Calidad" },
                { Icon: Shield, label: "Seguridad" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
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
                    className="text-primary-foreground/70 hover:text-accent text-sm transition-colors duration-300"
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
                <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium">Horario</p>
                  <p className="text-sm text-primary-foreground/70">Lun–Vie: 8:00–17:00</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium">Teléfono</p>
                  <a
                    href="tel:+576014732039"
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    +57 (601) 4732039
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href="mailto:info@opingenieria.com"
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    info@opingenieria.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
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
              {[
                { Icon: Facebook, label: "Facebook", href: "#" },
                { Icon: Linkedin, label: "LinkedIn", href: "#" },
                { Icon: Instagram, label: "Instagram", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={cn(
                    "w-10 h-10 rounded-full",
                    "bg-primary-foreground/5 hover:bg-accent/20",
                    "border border-primary-foreground/15",
                    "flex items-center justify-center",
                    "text-primary-foreground/70 hover:text-accent",
                    "transition-all duration-300 hover:scale-105"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="mt-5">
              <Button
                asChild
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20"
              >
                <a href="tel:+576014732039">Llamar ahora</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/15 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs md:text-sm text-primary-foreground/60 text-center md:text-left">
              © {new Date().getFullYear()} - O&amp;P Ingeniería S.A.S. Todos los derechos reservados.
              <span className="hidden sm:inline"> — Desarrollado por Miguel Bernal</span>
            </p>

            <div className="flex items-center gap-5 text-xs md:text-sm text-primary-foreground/60">
              <a href="#" className="hover:text-accent transition-colors">
                Términos
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Privacidad
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
