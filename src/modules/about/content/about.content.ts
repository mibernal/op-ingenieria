// src/modules/about/content/about.content.ts
import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck,
  ClipboardCheck,
  Wrench,
  FileText,
  Target,
  Eye,
  BadgeCheck,
  Building2,
  Leaf,
  Gauge,
  PlugZap,
  BatteryCharging,
  Sun,
  Network,
  ClipboardList,
  ThermometerSun,
} from "lucide-react";

export type Metric = { value: string; label: string };
export type Pillar = { icon: LucideIcon; title: string; desc: string };
export type Block = { icon: LucideIcon; title: string; desc: string };
export type Step = { title: string; desc: string };
export type ValueCard = { icon: LucideIcon; title: string; desc: string };
export type QualityPoint = { title: string; desc: string };
export type Badge = { icon: LucideIcon; label: string };

export const ABOUT_COPY = {
  landing: {
    eyebrow: "NOSOTROS",
    titleA: "Ingeniería seria.",
    titleB: "Energía confiable.",
    subtitle:
      "Continuidad eléctrica para operación crítica: diseño, ejecución y puesta en marcha con pruebas y documentación.",
    positioningLine:
      "Integramos soluciones eléctricas, electromecánicas y energía solar para operación continua: protecciones, tableros, respaldo (UPS/baterías/plantas) y mantenimiento con evidencias verificables.",
    microProof:
      "Método de punta a punta: diagnóstico → diseño → suministro → instalación → comisionamiento → documentación. Sin improvisación.",
    primaryCta: "Agendar diagnóstico",
    secondaryCta: "Ver Nosotros",
  },

  page: {
    eyebrow: "NOSOTROS",
    titleA: "Método industrial",
    titleB: "para continuidad energética.",
    subtitle:
      "Cuando una carga no puede fallar, importa el detalle: protecciones correctas, pruebas, criterios de aceptación y trazabilidad para operación y mantenimiento.",
    heroCtaPrimary: "Hablar con un ingeniero",
    heroCtaSecondary: "Ver proyectos",

    identityEyebrow: "NUESTRA IDENTIDAD",
    identityTitle: "Energía confiable, seguridad eléctrica y desempeño medible",
    identitySubtitle:
      "Diseñamos y ejecutamos infraestructura eléctrica y electromecánica para industria, comercio e institucional: continuidad, eficiencia y soporte en campo.",

    workEyebrow: "CÓMO TRABAJAMOS",
    workTitle: "Diagnóstico → Diseño → Instalación → Pruebas → Puesta en marcha → Documentación",
    workSubtitle:
      "Un flujo claro reduce reprocesos, evita paradas y deja evidencia para auditoría, operación y mantenimiento.",

    qualityEyebrow: "COMPROMISO DE CALIDAD",
    qualityTitle: "Rigurosidad técnica, seguridad y comunicación transparente",
    qualitySubtitle:
      "La calidad se demuestra en campo: verificación, pruebas funcionales y entregables que sostienen la operación.",
  },
} as const;

/** SOLO ABOUT PAGE (no usar landing.positioningLine aquí para evitar repetición) */
export const ABOUT_NOSOTROS = {
  title: "NOSOTROS",
  description:
    "Integramos ingeniería eléctrica y electromecánica para operación continua. Diseñamos y ejecutamos sistemas de potencia, control y respaldo —incluyendo energía solar— con enfoque en seguridad, mantenibilidad y desempeño real.",
} as const;

export const ABOUT_FOCUS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: PlugZap,
    title: "Continuidad energética",
    desc: "Arquitecturas de respaldo (UPS, baterías, plantas, ATS/transferencia) y coordinación para cargas críticas.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad eléctrica",
    desc: "Protecciones, selectividad, puesta a tierra y verificación en sitio para operar con riesgo controlado.",
  },
  {
    icon: Gauge,
    title: "Desempeño medible",
    desc: "Pruebas, protocolos y criterios de aceptación: evidencia para operación, auditoría y mantenimiento.",
  },
];

export const ABOUT_METRICS: Metric[] = [
  { value: "12+ años", label: "Infraestructura eléctrica en operación" },
  { value: "300+ proyectos", label: "Ejecución, pruebas y puesta en marcha" },
  { value: "100+ clientes", label: "Industria, comercio e institucional" },
  { value: "24/7", label: "Enfoque en continuidad operativa" },
];

export const ABOUT_BADGES: Badge[] = [
  { icon: BadgeCheck, label: "Alcance y criterios" },
  { icon: ClipboardCheck, label: "Pruebas funcionales" },
  { icon: FileText, label: "As-built y protocolos" },
  { icon: ShieldCheck, label: "Seguridad y verificación" },
];

export const ABOUT_PILLARS: Pillar[] = [
  {
    icon: ClipboardList,
    title: "Ingeniería con criterios",
    desc: "Alcance técnico claro, criterios de aceptación y control de cambios durante el proyecto.",
  },
  {
    icon: ShieldCheck,
    title: "Protección y confiabilidad",
    desc: "Diseño de protecciones, coordinación y verificaciones para reducir fallas y paradas.",
  },
  {
    icon: ClipboardCheck,
    title: "Comisionamiento en campo",
    desc: "Pruebas, verificación funcional y puesta en marcha documentada antes de entregar.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento y soporte",
    desc: "Intervenciones preventivas/correctivas, reportes técnicos y recomendaciones de mejora.",
  },
];

export const ABOUT_BLOCKS: Block[] = [
  {
    icon: PlugZap,
    title: "Potencia y respaldo",
    desc: "Arquitecturas para continuidad (UPS, bancos de baterías, plantas, transferencia) con puesta en marcha y pruebas.",
  },
  {
    icon: Network,
    title: "Tableros y distribución",
    desc: "Tableros de potencia/control, canalizaciones, orden técnico, etiquetado y trazabilidad para operación estable.",
  },
  {
    icon: ShieldCheck,
    title: "Protecciones y seguridad",
    desc: "Selectividad, puesta a tierra, verificaciones en campo y control del riesgo eléctrico durante la ejecución.",
  },
  {
    icon: FileText,
    title: "Entregables verificables",
    desc: "Protocolos, reportes, as-built y evidencia para mantenimiento, auditoría y toma de decisiones.",
  },
];

export const ABOUT_STEPS: Step[] = [
  {
    title: "Diagnóstico",
    desc: "Levantamiento en sitio: cargas críticas, fallas recurrentes, riesgos, condición de tableros/UPS/baterías y prioridades.",
  },
  {
    title: "Diseño",
    desc: "Arquitectura eléctrica: protecciones, distribución, respaldo, solar si aplica, y plan de pruebas con criterios de aceptación.",
  },
  {
    title: "Suministro e instalación",
    desc: "Suministro, montaje y cableado con control de calidad, etiquetado, orden técnico y seguridad en campo.",
  },
  {
    title: "Pruebas y comisionamiento",
    desc: "Protocolos: funcionales, transferencia, respaldo, mediciones y verificación de protecciones antes de energizar/entregar.",
  },
  {
    title: "Documentación",
    desc: "As-built, planos, reportes, protocolos, recomendaciones y plan de mantenimiento para continuidad operativa.",
  },
];

export const ABOUT_IDENTITY: ValueCard[] = [
  {
    icon: Target,
    title: "Misión",
    desc:
      "Diseñamos y ejecutamos proyectos eléctricos y electromecánicos integrando energía convencional y solar. Entregamos continuidad, seguridad y desempeño mediante diagnóstico en sitio, ingeniería de detalle, suministro, instalación, pruebas y puesta en marcha, dejando evidencia y documentación para operación y mantenimiento.",
  },
  {
    icon: Eye,
    title: "Visión",
    desc:
      "Ser un referente en Colombia en infraestructura eléctrica, electromecánica y energía limpia. Ser reconocidos por la solidez técnica, la calidad de ejecución y el acompañamiento cercano, construyendo alianzas de largo plazo con soluciones confiables y medibles.",
  },
];

export const ABOUT_QUALITY_POLICY = {
  icon: Building2,
  title: "Política de calidad",
  desc:
    "En cada proyecto garantizamos una experiencia profesional: asesoría técnica, planeación disciplinada y comunicación clara de avances, riesgos y entregables —con foco en continuidad y seguridad.",
} as const;

export const ABOUT_QUALITY: QualityPoint[] = [
  {
    title: "Pruebas en sitio y puesta en marcha verificable",
    desc:
      "Ejecutamos protocolos funcionales (respaldo, transferencia, energización y verificación) y documentamos resultados antes de entregar.",
  },
  {
    title: "Control de riesgos y seguridad eléctrica",
    desc:
      "Aplicamos buenas prácticas en campo: verificación, señalización, procedimientos y mitigaciones documentadas para intervenir con seguridad.",
  },
  {
    title: "Mantenimiento y mejora continua",
    desc:
      "Reporte técnico con hallazgos y recomendaciones (preventivo/correctivo), promoviendo confiabilidad, eficiencia y prácticas responsables.",
  },
];

/** Opcional: si más adelante quieres conectar esto con secciones visuales (solar, UPS, plantas, termografía, etc.) */
export const ABOUT_TECH_SIGNALS: { icon: LucideIcon; label: string }[] = [
  { icon: BatteryCharging, label: "UPS & baterías" },
  { icon: PlugZap, label: "Plantas & transferencia" },
  { icon: Sun, label: "Energía solar" },
  { icon: ThermometerSun, label: "Termografía" },
  { icon: Wrench, label: "Mantenimiento" },
];
