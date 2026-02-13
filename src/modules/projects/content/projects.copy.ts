// src/modules/projects/content/projects.copy.ts
import { CTA_INTENT_COPY, CORE_MESSAGES, PAGE_MESSAGE_GUIDE } from "@/shared/content/copy-system";

export const PROJECTS_COPY = {
  page: {
    eyebrow: "PROYECTOS",
    titleA: "Casos reales con",
    titleB: "evidencia tecnica",
    subtitle:
      "Explora por categoria: continuidad, respaldo, distribucion y soluciones solares con pruebas, comisionamiento y trazabilidad.",
    explorerTitle: "Proyectos ejecutados",
    explorerSubtitle: "Selecciona una categoria para revisar casos aplicados en campo.",
  },
  explorer: {
    defaultSubtitle:
      "Casos reales de energia y respaldo: plantas, solar y soluciones electricas ejecutadas con pruebas y puesta en marcha.",
  },
  preview: {
    eyebrow: "PROYECTOS",
    titleA: "Evidencia en campo.",
    titleB: "Resultados en operacion",
    subtitle:
      "Muestra breve de implementaciones en continuidad energetica, respaldo, distribucion y energia solar.",
    fallbackDescription:
      "Implementacion en campo con enfoque en seguridad, pruebas y continuidad operativa.",
    cardCta: "Ver caso",
    bottomTitle: "Necesitas un caso similar en tu operacion?",
    bottomSubtitle:
      "Definimos alcance tecnico, criterios de aceptacion y plan de pruebas antes de cotizar.",
    primaryCta: CTA_INTENT_COPY.diagnostic.form,
  },
  messaging: {
    lead: PAGE_MESSAGE_GUIDE.projects.lead,
    proof: CORE_MESSAGES.proof,
    method: CORE_MESSAGES.method,
  },
} as const;
