// src/modules/contact/content/contact.copy.ts
import { CTA_INTENT_COPY, CORE_MESSAGES, PAGE_MESSAGE_GUIDE } from "@/shared/content/copy-system";

export interface ContactInfoItem {
  readonly id: "hours" | "email" | "phone" | "location";
  readonly title: string;
  readonly value: string;
  readonly helper: string;
  readonly href?: string;
}

export const CONTACT_DATA = {
  email: "info@opingenieria.com",
  phoneDisplay: "+57 (601) 4732039",
  phoneHref: "tel:+576014732039",
  whatsappHref: "https://wa.me/573133638760",
  city: "Bogota, Colombia",
  hours: "Lun-Vie: 9:00-17:00",
} as const;

export const CONTACT_PAGE_COPY = {
  hero: {
    eyebrow: "CONTACTO",
    titleA: "Hablemos de tu",
    titleB: "proyecto",
    subtitle:
      "Comparte tu necesidad tecnica (UPS, baterias, plantas, tableros, solar o mantenimiento) y definimos el siguiente paso con criterio de operacion.",
    primaryCta: "Ir al formulario",
    secondaryCta: "WhatsApp",
  },
  info: {
    title: "Informacion de contacto",
    phoneLabel: "Telefono",
    emailLabel: "Email",
    locationLabel: "Ubicacion",
    scheduleLabel: "Horario",
  },
  form: {
    title: "Envianos un mensaje",
    subtitle:
      "Incluye alcance, ciudad, nivel de criticidad y ventana de intervencion. Te respondemos con orientacion tecnica.",
    submit: "Enviar mensaje",
    loading: "Enviando...",
    success: "Mensaje enviado correctamente. Te responderemos pronto.",
    errorPrefix: "No pudimos enviar el mensaje. Intentalo de nuevo o escribenos a",
    privacy:
      "Al enviar, aceptas ser contactado para atender tu solicitud tecnica. No compartimos tu informacion.",
  },
  ctaSection: {
    badge: "Ingeniería eléctrica e industrial con estándares profesionales",
    title: "¿Listo para llevar tu proyecto al siguiente nivel?",
    subtitle:
      "En O&P Ingeniería diseñamos, implementamos y ejecutamos soluciones eléctricas e industriales con altos estándares de calidad, confiabilidad y seguridad.",
    primaryCta: CTA_INTENT_COPY.quote.form,
    secondaryCta: CTA_INTENT_COPY.quote.whatsapp,
    footer: "Respuesta agil • Asesoria tecnica • Alcance definido",
  },
  messaging: {
    lead: PAGE_MESSAGE_GUIDE.contact.lead,
    method: CORE_MESSAGES.method,
    deliverables: CORE_MESSAGES.deliverables,
  },
} as const;

export const CONTACT_INFO_ITEMS: readonly ContactInfoItem[] = [
  {
    id: "hours",
    title: "Horario",
    value: CONTACT_DATA.hours,
    helper: "Atencion tecnica en horario laboral",
  },
  {
    id: "email",
    title: "Email",
    value: CONTACT_DATA.email,
    helper: "Alcance tecnico y cotizaciones",
    href: `mailto:${CONTACT_DATA.email}`,
  },
  {
    id: "phone",
    title: "Telefono",
    value: CONTACT_DATA.phoneDisplay,
    helper: "Revision inicial y seguimiento",
    href: CONTACT_DATA.phoneHref,
  },
  {
    id: "location",
    title: "Ubicacion",
    value: CONTACT_DATA.city,
    helper: "Cobertura industrial, comercial, residencial e institucional",
  },
] as const;
