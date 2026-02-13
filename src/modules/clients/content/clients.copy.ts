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
    titleA: "Confianza validada",
    titleB: "en operacion",
    subtitle:
      "Muestra de organizaciones en Colombia que han confiado proyectos de energia, respaldo y continuidad operativa.",
    primaryCta: CTA_INTENT_COPY.cases.primary,
    carouselTitle: "Organizaciones atendidas",
    carouselSubtitle:
      "Seleccion de entidades e industrias con proyectos ejecutados y documentados por nuestro equipo tecnico.",
  },
  messaging: {
    lead: PAGE_MESSAGE_GUIDE.clients.lead,
    value: CORE_MESSAGES.value,
    proof: CORE_MESSAGES.proof,
    trust: CORE_MESSAGES.trust,
  },
} as const;
