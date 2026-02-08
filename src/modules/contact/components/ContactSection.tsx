import { Clock, Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contacto" className="contact-section">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-4">CONTÁCTENOS</h2>
        
        <div className="w-20 h-1 bg-accent mx-auto mb-12" />
        
        <div className="max-w-2xl mx-auto">
          <div className="grid gap-8">
            <div className="flex items-center gap-4 justify-center">
              <Clock className="h-6 w-6 text-accent flex-shrink-0" />
              <div>
                <h3 className="font-heading font-semibold text-foreground">Horario de Atención</h3>
                <p className="text-muted-foreground">Lunes a Viernes de 8:00 a 17:00</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 justify-center">
              <Mail className="h-6 w-6 text-accent flex-shrink-0" />
              <div>
                <h3 className="font-heading font-semibold text-foreground">E-mail</h3>
                <a 
                  href="mailto:info@opingenieria.com" 
                  className="text-accent hover:underline"
                >
                  info@opingenieria.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 justify-center">
              <Phone className="h-6 w-6 text-accent flex-shrink-0" />
              <div>
                <h3 className="font-heading font-semibold text-foreground">Teléfono</h3>
                <p className="text-muted-foreground">+57 (601) 4732039</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 justify-center">
              <MapPin className="h-6 w-6 text-accent flex-shrink-0" />
              <div>
                <h3 className="font-heading font-semibold text-foreground">Ubicación</h3>
                <p className="text-muted-foreground">Bogotá, Colombia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
