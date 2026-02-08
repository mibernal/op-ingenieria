// components/layout/Footer.tsx - VERSIÓN MEJORADA
import { Mail, Phone, MapPin, Clock, Shield, Award, Facebook, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-primary via-primary/95 to-primary border-t border-primary/30">
      {/* Wave separator */}
      <div className="relative h-16 -mt-16 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-16"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L48 105C96 90 192 60 288 45C384 30 480 30 576 37.5C672 45 768 60 864 67.5C960 75 1056 75 1152 67.5C1248 60 1344 45 1392 37.5L1440 30V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo y descripción */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">O&P</span>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-primary-foreground">
                  O&P Ingeniería
                </h3>
                <p className="text-sm text-primary-foreground/70">Soluciones Integrales</p>
              </div>
            </div>
            
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Líderes en ingeniería eléctrica y soluciones energéticas 
              con más de 15 años de experiencia en el sector industrial.
            </p>
            
            <div className="flex gap-4">
              {[Award, Shield].map((Icon, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="text-xs text-primary-foreground/70">
                    {i === 0 ? "Certificados" : "Garantía"}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Enlaces rápidos */}
          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-6 text-lg">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {["Inicio", "Nosotros", "Productos", "Servicios", "Proyectos", "Clientes", "Contacto"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-primary-foreground/70 hover:text-accent text-sm transition-colors duration-300 hover:pl-2 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contacto */}
          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-6 text-lg">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-primary-foreground">Horario</p>
                  <p className="text-sm text-primary-foreground/70">Lun-Vie: 8:00-17:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-primary-foreground">Teléfono</p>
                  <a href="tel:+5712345678" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                    +57 (1) 234-5678
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-primary-foreground">Email</p>
                  <a href="mailto:info@opingenieria.com" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                    info@opingenieria.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-primary-foreground">Ubicación</p>
                  <p className="text-sm text-primary-foreground/70">Bogotá, Colombia</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-6 text-lg">
              Newsletter
            </h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Suscríbete para recibir noticias y ofertas especiales.
            </p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="Tu email"
                className="bg-background/10 border-background/30 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button className="w-full bg-accent hover:bg-accent/90">
                Suscribirse
              </Button>
            </form>
            
            {/* Redes sociales */}
            <div className="mt-6">
              <p className="text-sm text-primary-foreground/70 mb-3">Síguenos</p>
              <div className="flex gap-3">
                {[Facebook, Linkedin, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-background/10 hover:bg-accent/20 border border-background/20 flex items-center justify-center text-primary-foreground/70 hover:text-accent transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60 text-center md:text-left">
              © {new Date().getFullYear()} O&P Ingeniería S.A.S. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
              <a href="#" className="hover:text-accent transition-colors">Términos</a>
              <a href="#" className="hover:text-accent transition-colors">Privacidad</a>
              <a href="#" className="hover:text-accent transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;