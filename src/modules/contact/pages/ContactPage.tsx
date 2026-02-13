// src/modules/contact/pages/ContactPage.tsx
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
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
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";

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

type FormStatus = "idle" | "loading" | "success" | "error";

function parseHashFormParams(hash: string) {
  if (!hash) return null;
  if (!hash.startsWith("#form")) return null;

  const qIndex = hash.indexOf("?");
  if (qIndex === -1) return { anchor: "form", params: new URLSearchParams() };

  const query = hash.slice(qIndex + 1);
  return { anchor: "form", params: new URLSearchParams(query) };
}

const CARD = cn(
  "rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md",
  "shadow-sm shadow-black/5"
);

const HOVER_ROW = cn(
  "group flex items-start gap-3 rounded-2xl border border-border/60 bg-background/40 p-4",
  "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10 hover:border-primary/25",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
);

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const [subjectValue, setSubjectValue] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const formRef = useRef<HTMLFormElement | null>(null);

  const computedFormSubmitSubject = useMemo(() => {
    return subjectValue?.trim() ? subjectValue.trim() : "Nuevo mensaje desde opingenieria.com";
  }, [subjectValue]);

  useEffect(() => {
    const applyFromHash = () => {
      const parsed = parseHashFormParams(window.location.hash);
      if (!parsed) return;

      const subj = parsed.params.get("subject") ?? "";
      const msg = parsed.params.get("message") ?? "";

      if (subj) setSubjectValue(subj);
      if (msg) setMessageValue(msg);

      const el = document.getElementById("form");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

      window.setTimeout(() => {
        const subjectInput = document.getElementById("contact-subject") as HTMLInputElement | null;
        subjectInput?.focus();
      }, 250);
    };

    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formStatus === "loading") return;

    setFormStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 15000);

      const response = await fetch(FORM_AJAX, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      window.clearTimeout(timeout);

      if (!response.ok) throw new Error("Form submission failed");

      setFormStatus("success");
      form.reset();
      setSubjectValue("");
      setMessageValue("");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo {...contactSeo} />
      <Header />

      <main className="flex-1">
        {/* HERO oscuro (mismo patrón que Clientes/Proyectos) */}
        <SectionShell variant="dark">
          <SectionHeader
            eyebrow="CONTACTO"
            title={
              <>
                Hablemos de tu <span className="text-accent">proyecto</span>
              </>
            }
            subtitle="Cuéntanos la necesidad técnica (UPS, baterías, plantas, tableros, solar, mantenimiento) y te respondemos con una propuesta clara y viable."
          />

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90">
              <NavLink to={`${ROUTES.CONTACT}#form`}>Ir al formulario</NavLink>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
            >
              <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
            >
              <a href={CONTACT.phoneHref}>Llamar</a>
            </Button>
          </div>

        </SectionShell>

        {/* CONTENIDO claro */}
        <SectionShell variant="light">
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Información de contacto */}
              <div className="space-y-6">
                <Card className={CARD}>
                  <CardContent className="p-6 md:p-7">
                    <h2 className="text-xl font-heading font-bold mb-4">Información de contacto</h2>

                    <div className="space-y-4">
                      <a
                        href={CONTACT.phoneHref}
                        className={HOVER_ROW}
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
                        className={HOVER_ROW}
                        aria-label={`Enviar correo a ${CONTACT.email}`}
                      >
                        <Mail className="h-5 w-5 text-accent mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium">Email</p>
                          <p className="text-muted-foreground">{CONTACT.email}</p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground mt-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>

                      <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/30 p-4">
                        <MapPin className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                          <p className="font-medium">Ubicación</p>
                          <p className="text-muted-foreground">{CONTACT.city}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/30 p-4">
                        <Clock className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                          <p className="font-medium">Horario</p>
                          <p className="text-muted-foreground">{CONTACT.hours}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>


              </div>

              {/* Formulario */}
              <Card className={CARD}>
                <CardContent className="p-6 md:p-7">
                  <h2 className="text-xl font-heading font-bold mb-1">Envíanos un mensaje</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Cuéntanos el alcance (planta, solar, baterías, UPS, tableros) y la ciudad. Te respondemos con asesoría técnica.
                  </p>

                  {/* ✅ Ancla real para /contact#form */}
                  <div id="form" className="scroll-mt-24" aria-hidden="true" />

                  <form
                    ref={formRef}
                    className="space-y-4"
                    action={FORM_ACTION}
                    method="POST"
                    onSubmit={handleSubmit}
                    autoComplete="on"
                    aria-busy={formStatus === "loading"}
                  >
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_subject" value={computedFormSubmitSubject} />

                    {/* Honeypot */}
                    <input
                      type="text"
                      name="_honey"
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    <div className="grid gap-2">
                      <Label htmlFor="contact-name" className="text-sm font-medium">
                        Nombre
                      </Label>
                      <Input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="Tu nombre"
                        required
                        autoComplete="name"
                        inputMode="text"
                        onChange={() => formStatus !== "idle" && setFormStatus("idle")}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="contact-company" className="text-sm font-medium">
                        Empresa (opcional)
                      </Label>
                      <Input
                        id="contact-company"
                        name="company"
                        type="text"
                        placeholder="Nombre de tu empresa"
                        autoComplete="organization"
                        inputMode="text"
                        onChange={() => formStatus !== "idle" && setFormStatus("idle")}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="contact-email" className="text-sm font-medium">
                        Email
                      </Label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        required
                        autoComplete="email"
                        inputMode="email"
                        onChange={() => formStatus !== "idle" && setFormStatus("idle")}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="contact-phone" className="text-sm font-medium">
                        Teléfono (opcional)
                      </Label>
                      <Input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        placeholder="Ej: +57 300 000 0000"
                        autoComplete="tel"
                        inputMode="tel"
                        onChange={() => formStatus !== "idle" && setFormStatus("idle")}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="contact-subject" className="text-sm font-medium">
                        Asunto
                      </Label>
                      <Input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        placeholder="Asunto del mensaje"
                        required
                        autoComplete="off"
                        inputMode="text"
                        value={subjectValue}
                        onChange={(e) => {
                          if (formStatus !== "idle") setFormStatus("idle");
                          setSubjectValue(e.currentTarget.value);
                        }}
                      />
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
                        autoComplete="off"
                        value={messageValue}
                        onChange={(e) => {
                          if (formStatus !== "idle") setFormStatus("idle");
                          setMessageValue(e.currentTarget.value);
                        }}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20 rounded-2xl"
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
        </SectionShell>
      </main>

      <Footer />
    </div>
  );
}
