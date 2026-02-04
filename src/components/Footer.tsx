const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and description */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-heading font-bold">
                <span className="text-accent">O</span>
                <span className="text-primary-foreground">&</span>
                <span className="text-accent">P</span>
              </span>
              <span className="ml-2 text-sm text-primary-foreground/80">Ingeniería S.A.S</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Soluciones integrales en ingeniería eléctrica, electromecánica y sistemas de energía.
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-primary-foreground/70 hover:text-accent text-sm transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#nosotros" className="text-primary-foreground/70 hover:text-accent text-sm transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#productos" className="text-primary-foreground/70 hover:text-accent text-sm transition-colors">
                  Productos
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-primary-foreground/70 hover:text-accent text-sm transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-primary-foreground/70 hover:text-accent text-sm transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Lunes a Viernes: 8:00 - 17:00</li>
              <li>
                <a href="mailto:info@opingenieria.com" className="hover:text-accent transition-colors">
                  info@opingenieria.com
                </a>
              </li>
              <li>Bogotá, Colombia</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} O&P Ingeniería S.A.S. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
