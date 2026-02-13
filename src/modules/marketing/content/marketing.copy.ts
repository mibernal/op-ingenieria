// src/modules/marketing/content/marketing.copy.ts
import { CTA_INTENT_COPY, CORE_MESSAGES, PAGE_MESSAGE_GUIDE } from "@/shared/content/copy-system";

export const MARKETING_COPY = {
  hero: {
    badge: "INGENIERIA ELECTRICA DESDE 2014",
    titleA: "Soluciones integrales en",
    titleB: "Ingenieria Electrica",
    subtitle: "Proyectos electricos, electromecanicos y energia solar para",
    subtitleDetail:
      "Respaldo energetico, tableros, mantenimiento y modernizacion con ejecucion en campo.",
    primaryCta: "Explorar soluciones",
    secondaryCta: CTA_INTENT_COPY.cases.secondary,
    stats: [
      { value: "300+", label: "Proyectos ejecutados" },
      { value: "12+", label: "Anos de experiencia" },
      { value: "100+", label: "Clientes atendidos" },
      { value: "100%", label: "Enfoque en calidad" },
    ],
  },
  messaging: {
    lead: PAGE_MESSAGE_GUIDE.landing.lead,
    value: CORE_MESSAGES.value,
    proof: CORE_MESSAGES.proof,
  },
} as const;
