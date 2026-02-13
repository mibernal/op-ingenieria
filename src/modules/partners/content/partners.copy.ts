// src/modules/partners/content/partners.copy.ts

export type PartnerGroupCopy = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  partnerIds: string[];
  bullets: string[];
};

export const PARTNERS_COPY = {
  section: {
    label: "ECOSISTEMA TECNICO",
    summary:
      "Portafolio multi-marca organizado por especialidad para asegurar integracion tecnica, soporte y continuidad operacional.",
  },
  metrics: {
    totalBrandsLabel: "Marcas evaluadas",
    specialtiesLabel: "Especialidades",
    activeLabel: "Marcas en especialidad activa",
  },
} as const;

export const PARTNER_SELECTION_CRITERIA: string[] = [
  "Compatibilidad electrica y de control entre equipos.",
  "Disponibilidad local de repuestos y soporte.",
  "Cumplimiento normativo y seguridad operativa.",
  "Desempeno comprobable en campo.",
];

export const PARTNER_GROUPS: PartnerGroupCopy[] = [
  {
    id: "distribution-control",
    label: "Distribucion y control",
    title: "Distribucion, proteccion y automatizacion",
    subtitle:
      "Marcas para tableros, protecciones, maniobra y calidad de energia en sistemas criticos.",
    partnerIds: ["1", "2", "3", "4", "5", "6", "9", "20"],
    bullets: [
      "Selectividad y protecciones coordinadas.",
      "Arquitecturas de distribucion mantenibles.",
      "Escalabilidad para crecimiento operativo.",
    ],
  },
  {
    id: "backup-generation",
    label: "Respaldo y generacion",
    title: "Continuidad energetica y control de transferencia",
    subtitle:
      "Fabricantes y plataformas para grupos electrogenos, transferencia y respaldo continuo.",
    partnerIds: ["7", "8", "10", "11", "12", "13", "14", "19", "21"],
    bullets: [
      "Respuesta ante contingencias de red.",
      "Integracion con ATS/AMF y control.",
      "Soporte para operacion de alta disponibilidad.",
    ],
  },
  {
    id: "solar-storage",
    label: "Solar y almacenamiento",
    title: "Energia solar, conversion y bancos de baterias",
    subtitle:
      "Ecosistema para generacion distribuida, conversion de potencia y almacenamiento energetico.",
    partnerIds: ["15", "16", "17", "18", "22", "23", "27"],
    bullets: [
      "Integracion AC/DC con criterio tecnico.",
      "Diseno para eficiencia y vida util.",
      "Monitoreo y estabilidad del sistema.",
    ],
  },
  {
    id: "climate-efficiency",
    label: "Clima y eficiencia",
    title: "HVAC y eficiencia para infraestructura tecnica",
    subtitle:
      "Marcas para control termico y condiciones ambientales en instalaciones electricas y de TI.",
    partnerIds: ["24", "25", "26"],
    bullets: [
      "Control termico en cuartos tecnicos.",
      "Confiabilidad en ambientes de operacion critica.",
      "Integracion con estrategia de eficiencia energetica.",
    ],
  },
];
