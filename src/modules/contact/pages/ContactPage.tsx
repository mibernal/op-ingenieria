import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Seo from "@/components/seo/Seo";
import { contactSeo } from "@/modules/contact/seo";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo {...contactSeo} />
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Contacto</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estamos aquí para ayudarte con tus proyectos de ingeniería
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Información de contacto */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-heading font-bold mb-4">Información de contacto</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-medium">Teléfono</p>
                        <p className="text-muted-foreground">+57 (601) 4732039</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">info@opingenieria.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-medium">Ubicación</p>
                        <p className="text-muted-foreground">Bogotá, Colombia</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-medium">Horario</p>
                        <p className="text-muted-foreground">Lun-Vie: 8:00-17:00</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-heading font-bold mb-4">Contacto rápido</h2>
                  <div className="space-y-3">
                    <Button className="w-full gap-2 bg-accent hover:bg-accent/90" asChild>
                      <a href="https://wa.me/573133638760" target="_blank" rel="noreferrer">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="tel:+576014732039">Llamar ahora</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulario de contacto */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-heading font-bold mb-4">Envíanos un mensaje</h2>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                      Nombre
                    </Label>
                    <Input 
                      id="contact-name"
                      type="text" 
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                      Email
                    </Label>
                    <Input 
                      id="contact-email"
                      type="email" 
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-subject" className="block text-sm font-medium mb-2">
                      Asunto
                    </Label>
                    <Input 
                      id="contact-subject"
                      type="text" 
                      placeholder="Asunto del mensaje"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-message" className="block text-sm font-medium mb-2">
                      Mensaje
                    </Label>
                    <Textarea 
                      id="contact-message"
                      placeholder="¿En qué podemos ayudarte?"
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Enviar mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
