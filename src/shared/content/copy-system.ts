// src/shared/content/copy-system.ts

export const CTA_INTENT_COPY = {
  diagnostic: {
    form: "Solicitar diagnostico tecnico",
    whatsapp: "Enviar contexto tecnico por WhatsApp",
    phone: "Llamar para diagnostico",
  },
  quote: {
    form: "Solicitar cotizacion tecnica",
    whatsapp: "Cotizar por WhatsApp",
    phone: "Llamar para cotizar",
  },
  siteVisit: {
    form: "Agendar visita tecnica",
    whatsapp: "Coordinar visita por WhatsApp",
    phone: "Llamar para visita tecnica",
  },
  cases: {
    primary: "Ver casos aplicados",
    secondary: "Explorar proyectos",
  },
} as const;

export const CORE_MESSAGES = {
  value: "Ingenieria electrica y electromecanica orientada a continuidad operativa.",
  promise: "Definimos alcance, riesgos y criterios de aceptacion antes de intervenir.",
  proof: "Pruebas funcionales y evidencia documentada antes de entregar.",
  safety: "Intervencion en campo con seguridad electrica y control de riesgo.",
  method: "Diagnostico, diseno, ejecucion, comisionamiento y documentacion final.",
  deliverables: "Protocolos, as-built y recomendaciones para operacion y mantenimiento.",
  backup: "Arquitecturas de respaldo: UPS, baterias, plantas y transferencia.",
  distribution: "Tableros, protecciones y distribucion para carga critica.",
  solar: "Integracion solar con foco en desempeno real y mantenibilidad.",
  support: "Mantenimiento preventivo y correctivo con trazabilidad tecnica.",
  trust: "Resultados medibles para industria, comercio y sector institucional.",
} as const;

export const CORE_MESSAGE_VARIANTS = {
  proof: [
    "Pruebas en sitio y reporte tecnico antes de cierre.",
    "Comisionamiento con evidencias para auditoria y operacion.",
    "Entrega con protocolos y validacion funcional en campo.",
  ],
  method: [
    "Flujo tecnico de punta a punta, sin improvisacion.",
    "Secuencia clara para reducir reprocesos y paradas.",
    "Metodo ejecutable con control de cambios y trazabilidad.",
  ],
  promise: [
    "Cotizacion con criterios tecnicos, no solo precios.",
    "Alcance viable con riesgos y supuestos visibles.",
    "Decisiones de inversion con evidencia tecnica.",
  ],
} as const;

export const PAGE_MESSAGE_GUIDE = {
  landing: {
    focus: "resumen tecnico + confianza",
    lead: "Diagnostico rapido con criterio de continuidad y respaldo.",
  },
  about: {
    focus: "metodo + credibilidad",
    lead: "Equipo orientado a seguridad electrica, pruebas y operacion estable.",
  },
  catalog: {
    focus: "seleccion guiada + asesoria",
    lead: "Selecciona soluciones por categoria y recibe soporte segun criticidad.",
  },
  projects: {
    focus: "prueba social + resultados",
    lead: "Casos ejecutados con alcance claro y evidencia de puesta en marcha.",
  },
  clients: {
    focus: "confianza + sectores",
    lead: "Organizaciones de sectores criticos que exigen continuidad.",
  },
  contact: {
    focus: "claridad + baja friccion",
    lead: "Canales directos para cotizacion, visita tecnica o diagnostico.",
  },
} as const;
