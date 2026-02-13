// src/modules/marketing/content/marketing.copy.ts
import { CTA_INTENT_COPY, CORE_MESSAGES, PAGE_MESSAGE_GUIDE } from "@/shared/content/copy-system";

export const MARKETING_COPY = {
  hero: {
    badge: "INGENIERIA ELECTRICA DESDE 2014",
    titleA: "Soluciones integrales en",
    titleB: "Ingenieria Electrica",
    subtitle: "Respaldo energetico, tableros, comisionamiento y mantenimiento para",
    subtitleDetail:
      "Respaldo energetico, tableros, mantenimiento y modernizacion con ejecucion en campo.",
    primaryCta: "Ver catalogo tecnico",
    secondaryCta: CTA_INTENT_COPY.cases.secondary,
    stats: [
      { value: "300+", label: "Proyectos ejecutados (historico)" },
      { value: "12+", label: "Anos de experiencia" },
      { value: "100+", label: "Clientes atendidos (historico)" },
      { value: "24/7", label: "Continuidad operativa como criterio" },
    ],
  },
  messaging: {
    lead: PAGE_MESSAGE_GUIDE.landing.lead,
    value: CORE_MESSAGES.value,
    proof: CORE_MESSAGES.proof,
  },
} as const;
