// src/modules/clients/content/clients.copy.ts
import { CTA_INTENT_COPY, CORE_MESSAGES, PAGE_MESSAGE_GUIDE } from "@/shared/content/copy-system";

export const CLIENTS_COPY = {
  page: {
    eyebrow: "CLIENTES",
    titleA: "Respaldo real.",
    titleB: "Confianza demostrable",
    subtitle:
      "Organizaciones con las que hemos trabajado en continuidad energetica, energia solar e infraestructura electrica.",
    primaryCta: CTA_INTENT_COPY.cases.primary,
    secondaryCta: CTA_INTENT_COPY.diagnostic.form,
    sectorLabel: "Explora por sector",
    heading: "Clientes y organizaciones",
    fallbackDescription:
      "Intervenciones en infraestructura electrica, respaldo energetico y continuidad operativa.",
  },
  section: {
    eyebrow: "CLIENTES",
    titleA: "Confianza construida",
    titleB: "en campo",
    subtitle:
      "Organizaciones que confian en nuestra ingenieria para continuidad energetica, energia solar y soluciones electricas de operacion critica.",
    primaryCta: "Ver clientes",
    secondaryCta: CTA_INTENT_COPY.diagnostic.form,
    tertiaryCta: "Ver todo",
  },
  messaging: {
    lead: PAGE_MESSAGE_GUIDE.clients.lead,
    value: CORE_MESSAGES.value,
    proof: CORE_MESSAGES.proof,
    trust: CORE_MESSAGES.trust,
  },
} as const;
