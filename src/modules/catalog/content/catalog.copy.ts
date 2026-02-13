// src/modules/catalog/content/catalog.copy.ts
import { CTA_INTENT_COPY, CORE_MESSAGES, PAGE_MESSAGE_GUIDE } from "@/shared/content/copy-system";

export const CATALOG_COPY = {
  preview: {
    eyebrow: "PRODUCTOS",
    titleA: "Portafolio tecnico",
    titleB: "por especialidad",
    subtitle:
      "Resumen de soluciones para preseleccion B2B antes de ingenieria de detalle y cotizacion con alcance claro.",
    fallbackDescription:
      "Solucion evaluada para continuidad operativa, seguridad y mantenibilidad.",
    primaryCta: "Ver catalogo tecnico",
  },
  page: {
    eyebrow: "PRODUCTOS",
    titleA: "Catalogo de",
    titleB: "Soluciones",
    subtitle:
      "Infraestructura electrica, respaldo (UPS/baterias/plantas), energia solar y distribucion para operacion confiable.",
    primaryCta: CTA_INTENT_COPY.quote.form,
    secondaryCta: CTA_INTENT_COPY.cases.primary,
  },
  messaging: {
    lead: PAGE_MESSAGE_GUIDE.catalog.lead,
    value: CORE_MESSAGES.value,
    backup: CORE_MESSAGES.backup,
    support: CORE_MESSAGES.support,
  },
  emptyState: {
    title: "No se encontraron productos",
    withFilters:
      "No hay productos para ese filtro. Ajusta categoria o subcategoria para ampliar resultados.",
    noFilters: "Prueba seleccionando una categoria o solicita asesoria tecnica segun tu criticidad.",
    clearFilters: "Ver todos los productos",
  },
  modal: {
    descriptionTitle: "Descripcion",
    detailsTitle: "Detalles",
    primaryCta: CTA_INTENT_COPY.quote.whatsapp,
    secondaryCta: "Solicitar cotizacion en formulario",
    recommendation:
      "Recomendado: formulario para incluir alcance, ubicacion y condicion operativa.",
  },
} as const;
