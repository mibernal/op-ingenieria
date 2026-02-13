// src/modules/contact/pages/ContactPage.tsx
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
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
import { CONTACT_DATA, CONTACT_PAGE_COPY } from "@/modules/contact/content/contact.copy";
import {
  CONTACT_INTENT_PRESETS,
  normalizeContactIntent,
  type ContactIntent,
  buildContactIntentHref,
} from "@/shared/utils/contact-intent";

const FORM_ACTION = `https://formsubmit.co/${CONTACT_DATA.email}`;
const FORM_AJAX = `https://formsubmit.co/ajax/${CONTACT_DATA.email}`;

type FormStatus = "idle" | "loading" | "success" | "error";

function parseContactFormParams(location: Location) {
  const hash = location.hash || "";
  const hasFormAnchor = hash.startsWith("#form");

  const mergedParams = new URLSearchParams(location.search);
  if (hasFormAnchor) {
    const qIndex = hash.indexOf("?");
    if (qIndex !== -1) {
      const hashParams = new URLSearchParams(hash.slice(qIndex + 1));
      hashParams.forEach((value, key) => mergedParams.set(key, value));
    }
  }

  return { anchor: hasFormAnchor ? "form" : null, params: mergedParams };
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
  const copy = CONTACT_PAGE_COPY;
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const [leadIntent, setLeadIntent] = useState<ContactIntent>("general");
  const [leadSource, setLeadSource] = useState("direct");
  const [subjectValue, setSubjectValue] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const formRef = useRef<HTMLFormElement | null>(null);

  const computedFormSubmitSubject = useMemo(() => {
    return subjectValue?.trim() ? subjectValue.trim() : "Nuevo mensaje desde opingenieria.com";
  }, [subjectValue]);

  useEffect(() => {
    const applyFromLocation = () => {
      const parsed = parseContactFormParams(window.location);
      const normalizedIntent = normalizeContactIntent(parsed.params.get("intent")) ?? "general";
      const source = parsed.params.get("source")?.trim() || "direct";
      const preset = CONTACT_INTENT_PRESETS[normalizedIntent];

      const subj = (parsed.params.get("subject") ?? "").trim();
      const msg = (parsed.params.get("message") ?? "").trim();
      const hasPrefill = Boolean(subj || msg || normalizedIntent !== "general");

      setLeadIntent(normalizedIntent);
      setLeadSource(source);

      if (hasPrefill) {
        setSubjectValue(subj || preset.subject);
        setMessageValue(msg || preset.message);
      }

      if (parsed.anchor === "form") {
        const el = document.getElementById("form");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

        window.setTimeout(() => {
          const subjectInput = document.getElementById("contact-subject") as HTMLInputElement | null;
          subjectInput?.focus();
        }, 250);
      }
    };

    applyFromLocation();
    window.addEventListener("hashchange", applyFromLocation);
    return () => window.removeEventListener("hashchange", applyFromLocation);
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
      setLeadIntent("general");
      setLeadSource("direct");
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
        <SectionShell variant="dark" className="pt-10 pb-10 md:pt-14 md:pb-14">
          <SectionHeader
            eyebrow={copy.hero.eyebrow}
            title={
              <>
                {copy.hero.titleA} <span className="text-accent">{copy.hero.titleB}</span>
              </>
            }
            subtitle={copy.hero.subtitle}
          />

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90">
              <NavLink to={buildContactIntentHref({ intent: "cotizacion", source: "contact-hero" })}>
                {copy.hero.primaryCta}
              </NavLink>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
            >
              <a href={CONTACT_DATA.whatsappHref} target="_blank" rel="noreferrer">
                {copy.hero.secondaryCta}
              </a>
            </Button>
          </div>

        </SectionShell>

        {/* CONTENIDO claro */}
        <SectionShell variant="light" className="pt-4 pb-16 md:pt-6 md:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Información de contacto */}
              <div className="space-y-6">
                <Card className={CARD}>
                  <CardContent className="p-6 md:p-7">
                    <h2 className="text-xl font-heading font-bold mb-4">{copy.info.title}</h2>

                    <div className="space-y-4">
                      <a
                        href={CONTACT_DATA.phoneHref}
                        className={HOVER_ROW}
                        aria-label={`Llamar al ${CONTACT_DATA.phoneDisplay}`}
                      >
                        <Phone className="h-5 w-5 text-accent mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium">{copy.info.phoneLabel}</p>
                          <p className="text-muted-foreground">{CONTACT_DATA.phoneDisplay}</p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground mt-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>

                      <a
                        href={`mailto:${CONTACT_DATA.email}`}
                        className={HOVER_ROW}
                        aria-label={`Enviar correo a ${CONTACT_DATA.email}`}
                      >
                        <Mail className="h-5 w-5 text-accent mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium">{copy.info.emailLabel}</p>
                          <p className="text-muted-foreground">{CONTACT_DATA.email}</p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground mt-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>

                      <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/30 p-4">
                        <MapPin className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                          <p className="font-medium">{copy.info.locationLabel}</p>
                          <p className="text-muted-foreground">{CONTACT_DATA.city}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/30 p-4">
                        <Clock className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                          <p className="font-medium">{copy.info.scheduleLabel}</p>
                          <p className="text-muted-foreground">{CONTACT_DATA.hours}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>


              </div>

              {/* Formulario */}
              <Card className={CARD}>
                <CardContent className="p-6 md:p-7">
                  <h2 className="text-xl font-heading font-bold mb-1">{copy.form.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {copy.form.subtitle}
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
                    <input type="hidden" name="lead_intent" value={leadIntent} />
                    <input type="hidden" name="lead_source" value={leadSource} />

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
                      {formStatus === "loading" ? copy.form.loading : copy.form.submit}
                    </Button>

                    <div aria-live="polite">
                      {formStatus === "success" && (
                        <p className="text-sm text-emerald-600">
                          {copy.form.success}
                        </p>
                      )}
                      {formStatus === "error" && (
                        <p className="text-sm text-rose-600">
                          {copy.form.errorPrefix}{" "}
                          <a className="underline" href={`mailto:${CONTACT_DATA.email}`}>
                            {CONTACT_DATA.email}
                          </a>
                          .
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {copy.form.privacy}
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
