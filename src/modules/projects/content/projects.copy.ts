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
    defaultCategoryDescription:
      "Implementaciones en campo con enfoque en seguridad, continuidad y desempeno verificable.",
    categoryDescriptionsById: {
      "grupos-electrogenos":
        "Integracion de plantas y transferencias para continuidad operativa en cargas criticas.",
      "energia-fotovoltaica":
        "Sistemas solares con diseno tecnico, protecciones y seguimiento de desempeno energetico.",
      ups:
        "Respaldo inmediato para procesos sensibles, con autonomia validada y pruebas funcionales.",
      baterias:
        "Bancos de baterias para respaldo confiable, gestion de vida util y mantenimiento planificado.",
      rectificadores:
        "Conversion y carga DC para infraestructura critica con estabilidad y trazabilidad tecnica.",
      "obras-electricas":
        "Obras electricas e iluminacion con seguridad, calidad de ejecucion y cumplimiento en campo.",
      mantenimientos:
        "Mantenimiento preventivo y correctivo con reportes tecnicos y mejora de disponibilidad.",
      "aire-acondicionado":
        "Climatizacion para continuidad de operacion, eficiencia energetica y control ambiental.",
    },
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
