import { ROUTES } from "@/config/routes";

export type ContactIntent =
  | "diagnostico"
  | "cotizacion"
  | "catalogo"
  | "casos"
  | "visita-tecnica"
  | "general";

type IntentPreset = {
  label: string;
  subject: string;
  message: string;
};

export const CONTACT_INTENT_PRESETS: Record<ContactIntent, IntentPreset> = {
  diagnostico: {
    label: "Diagnostico tecnico",
    subject: "Solicitud de diagnostico tecnico",
    message:
      "Necesito una evaluacion tecnica inicial para validar criticidad, alcance y siguiente paso recomendado.",
  },
  cotizacion: {
    label: "Cotizacion tecnica",
    subject: "Solicitud de cotizacion tecnica",
    message:
      "Comparto requerimiento para cotizacion tecnica con alcance, condiciones de operacion y tiempos esperados.",
  },
  catalogo: {
    label: "Asesoria de catalogo",
    subject: "Asesoria para seleccion de catalogo",
    message:
      "Necesito orientacion para seleccionar una solucion del catalogo segun criticidad y entorno operativo.",
  },
  casos: {
    label: "Revision de casos",
    subject: "Solicitud de casos aplicados similares",
    message:
      "Quiero revisar casos aplicados comparables para validar enfoque tecnico y resultados esperados.",
  },
  "visita-tecnica": {
    label: "Visita tecnica",
    subject: "Solicitud de visita tecnica",
    message:
      "Requiero coordinar visita tecnica para levantamiento en sitio y definicion de alcance.",
  },
  general: {
    label: "Consulta general",
    subject: "Consulta tecnica general",
    message: "Comparto una necesidad tecnica para recibir orientacion inicial del equipo de ingenieria.",
  },
};

const INTENT_ALIASES: Record<string, ContactIntent> = {
  diagnostico: "diagnostico",
  cotizacion: "cotizacion",
  quote: "cotizacion",
  catalogo: "catalogo",
  catalog: "catalogo",
  casos: "casos",
  case: "casos",
  "visita-tecnica": "visita-tecnica",
  visita: "visita-tecnica",
  general: "general",
};

export function normalizeContactIntent(value?: string | null): ContactIntent | null {
  const key = String(value ?? "").trim().toLowerCase();
  if (!key) return null;
  return INTENT_ALIASES[key] ?? null;
}

export function buildContactIntentHref(options?: {
  intent?: ContactIntent;
  source?: string;
  subject?: string;
  message?: string;
}) {
  const params = new URLSearchParams();
  if (options?.intent) params.set("intent", options.intent);
  if (options?.source?.trim()) params.set("source", options.source.trim());
  if (options?.subject?.trim()) params.set("subject", options.subject.trim());
  if (options?.message?.trim()) params.set("message", options.message.trim());

  const query = params.toString();
  return `${ROUTES.CONTACT}#form${query ? `?${query}` : ""}`;
}
