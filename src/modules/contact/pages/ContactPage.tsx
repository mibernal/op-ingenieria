// src/modules/contact/pages/ContactPage.tsx
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Seo from "@/components/seo/Seo";
import { contactSeo } from "@/modules/contact/seo";
import { cn } from "@/lib/utils";

const CONTACT = {
  email: "info@opingenieria.com",
  phoneDisplay: "+57 (601) 4732039",
  phoneHref: "tel:+576014732039",
  whatsappHref: "https://wa.me/573133638760",
  city: "Bogotá, Colombia",
  hours: "Lun–Vie: 8:00–17:00",
};

const FORM_ACTION = `https://formsubmit.co/${CONTACT.email}`;
const FORM_AJAX = `https://formsubmit.co/ajax/${CONTACT.email}`;

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORM_AJAX, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setFormStatus("success");
      form.reset();
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo {...contactSeo} />
      <Header />

      {/* ✅ Menos espacio arriba/abajo */}
      <main className="flex-1 py-6 md:py-10">
        <div className="container mx-auto px-4">
          {/* Header premium (más compacto) */}
          <div className="mx-auto mb-6 md:mb-7 max-w-3xl text-center">
            <p className="text-xs tracking-[0.22em] text-muted-foreground">CONTACTO</p>

            <h1 className="mt-1 text-3xl md:text-4xl font-heading font-bold tracking-tight">
              Hablemos de tu proyecto
            </h1>

            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Cuéntanos tu necesidad técnica y te responderemos con una propuesta clara y viable.
            </p>

            <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Información de contacto */}
            <div className="space-y-6">
              <Card className="rounded-2xl border-border/60 bg-card/70 backdrop-blur-md shadow-sm shadow-black/5">
                <CardContent className="p-6">
                  <h2 className="text-xl font-heading font-bold mb-4">
                    Información de contacto
                  </h2>

                  <div className="space-y-4">
                    <a
                      href={CONTACT.phoneHref}
                      className={cn(
                        "group flex items-start gap-3 rounded-xl border border-border/60 bg-background/40 p-4",
                        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10 hover:border-primary/25",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                      )}
                      aria-label={`Llamar al ${CONTACT.phoneDisplay}`}
                    >
                      <Phone className="h-5 w-5 text-accent mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">Teléfono</p>
                        <p className="text-muted-foreground">{CONTACT.phoneDisplay}</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground mt-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>

                    <a
                      href={`mailto:${CONTACT.email}`}
                      className={cn(
                        "group flex items-start gap-3 rounded-xl border border-border/60 bg-background/40 p-4",
                        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10 hover:border-primary/25",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                      )}
                      aria-label={`Enviar correo a ${CONTACT.email}`}
                    >
                      <Mail className="h-5 w-5 text-accent mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">{CONTACT.email}</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground mt-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>

                    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/30 p-4">
                      <MapPin className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <p className="font-medium">Ubicación</p>
                        <p className="text-muted-foreground">{CONTACT.city}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/30 p-4">
                      <Clock className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <p className="font-medium">Horario</p>
                        <p className="text-muted-foreground">{CONTACT.hours}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-border/60 bg-card/70 backdrop-blur-md shadow-sm shadow-black/5">
                <CardContent className="p-6">
                  <h2 className="text-xl font-heading font-bold mb-4">Contacto rápido y cotizaciones</h2>
                  <div className="space-y-3">
                    <Button
                      className="w-full gap-2 bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20"
                      size="lg"
                      asChild
                    >
                      <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className={cn(
                        "w-full",
                        "border-border/60 bg-background/40",
                        "hover:bg-background/60",
                        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10"
                      )}
                      asChild
                    >
                      <a href={CONTACT.phoneHref}>Llamar ahora</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulario de contacto */}
            <Card className="rounded-2xl border-border/60 bg-card/70 backdrop-blur-md shadow-sm shadow-black/5">
              <CardContent className="p-6">
                <h2 className="text-xl font-heading font-bold mb-1">Envíanos un mensaje</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Cuéntanos el alcance (planta, solar, baterías, UPS, tableros) y la ciudad. Te respondemos con asesoría técnica.
                </p>

                <form
                  className="space-y-4"
                  action={FORM_ACTION}
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" name="_subject" value="Nuevo mensaje desde opingenieria.com" />
                  <input type="hidden" name="_template" value="table" />
                  <input
                    type="text"
                    name="_honey"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid gap-2">
                    <Label htmlFor="contact-name" className="text-sm font-medium">
                      Nombre
                    </Label>
                    <Input id="contact-name" name="name" type="text" placeholder="Tu nombre" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="contact-email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input id="contact-email" name="email" type="email" placeholder="tu@email.com" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="contact-subject" className="text-sm font-medium">
                      Asunto
                    </Label>
                    <Input id="contact-subject" name="subject" type="text" placeholder="Asunto del mensaje" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="contact-message" className="text-sm font-medium">
                      Mensaje
                    </Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder="Ej: Planta 100 kVA para bodega en Bogotá, con transferencia automática..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
                    disabled={formStatus === "loading"}
                  >
                    {formStatus === "loading" ? "Enviando..." : "Enviar mensaje"}
                  </Button>

                  <div aria-live="polite">
                    {formStatus === "success" && (
                      <p className="text-sm text-emerald-600">
                        Mensaje enviado correctamente. Te responderemos pronto.
                      </p>
                    )}
                    {formStatus === "error" && (
                      <p className="text-sm text-rose-600">
                        No pudimos enviar el mensaje. Inténtalo de nuevo o escríbenos a{" "}
                        <a className="underline" href={`mailto:${CONTACT.email}`}>
                          {CONTACT.email}
                        </a>
                        .
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Al enviar, aceptas ser contactado para atender tu solicitud. No compartimos tu información.
                  </p>
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
