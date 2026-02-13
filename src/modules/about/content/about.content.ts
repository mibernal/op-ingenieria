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
import { CTA_INTENT_COPY, CORE_MESSAGES } from "@/shared/content/copy-system";

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
      "Ingenieria electrica y electromecanica para continuidad operativa en industria, comercio y sector institucional en Colombia.",
    positioningLine:
      "Partimos de diagnostico en sitio, pasamos por ingenieria de detalle y cerramos con ejecucion en campo para reducir riesgos de operacion.",
    microProof:
      "Ruta completa: diagnostico, diseño, suministro, montaje, pruebas funcionales y entregables as-built para mantenimiento.",
    primaryCta: CTA_INTENT_COPY.diagnostic.form,
    secondaryCta: "Ver Nosotros",
  },

  page: {
    eyebrow: "NOSOTROS",
    titleA: "Ingeniería eléctrica y electromecánica",
    titleB: "para operación confiable.",
    subtitle:
      "Integramos energía convencional y energía solar con foco en eficiencia, seguridad y continuidad operativa.",
    heroCtaPrimary: CTA_INTENT_COPY.diagnostic.form,
    heroCtaSecondary: CTA_INTENT_COPY.cases.primary,

    identityTitle: "Capacidad técnica para operación confiable y sostenible",
    identitySubtitle:
      "Ingeniería eléctrica y electromecánica con enfoque en eficiencia y sostenibilidad: integramos energía convencional y energía solar para proyectos confiables, seguros y de alto desempeño.",

    workEyebrow: "CÓMO TRABAJAMOS",
    workTitle: "Diagnóstico → Diseño → Instalación → Pruebas → Puesta en marcha → Documentación",
    workSubtitle:
      "Un flujo claro reduce reprocesos, evita paradas y deja evidencia para auditoria, operacion y mantenimiento.",

    qualityEyebrow: "COMPROMISO DE CALIDAD",
    qualityTitle: "Compromiso de Calidad",
    qualitySubtitle:
      "Ejecución disciplinada, verificación en sitio y mejora continua para mantener estándares técnicos exigentes.",
  },
} as const;

export const ABOUT_FOCUS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: PlugZap,
    title: "Continuidad energética",
    desc: "Arquitecturas de respaldo (UPS, baterias, plantas, ATS/transferencia) y coordinacion para cargas criticas.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad eléctrica",
    desc: "Protecciones, selectividad, puesta a tierra y verificacion en sitio para operar con riesgo controlado.",
  },
  {
    icon: Gauge,
    title: "Desempeño medible",
    desc: "Pruebas, protocolos y criterios de aceptacion: evidencia para operacion, auditoria y mantenimiento.",
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
    desc: "Selectividad, puesta a tierra, verificaciones en campo y control del riesgo electrico durante la ejecucion.",
  },
  {
    icon: FileText,
    title: "Entregables verificables",
    desc: CORE_MESSAGES.deliverables,
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
      "Diseñamos y ejecutamos proyectos de ingeniería eléctrica y electromecánica, integrando soluciones de energía convencional y energía solar para entornos industriales, comerciales y residenciales. Aportamos eficiencia, seguridad y desempeño, con una ejecución rigurosa de principio a fin: diagnóstico, ingeniería de detalle, suministro, instalación, pruebas y puesta en marcha.",
  },
  {
    icon: Eye,
    title: "Visión",
    desc:
      "Ser un referente en Colombia en ingeniería eléctrica, electromecánica y energía limpia, reconocidos por la solidez técnica, la calidad de la ejecución y el acompañamiento cercano al cliente. Aspiramos a construir alianzas de largo plazo, entregando soluciones confiables y medibles que impulsen la competitividad y la sostenibilidad de cada operación.",
  },
];

export const ABOUT_QUALITY_POLICY = {
  icon: Building2,
  title: "Compromiso de Calidad",
  desc:
    "Gestionamos cada proyecto con control técnico y disciplina operativa para asegurar una ejecución confiable, segura y medible.",
} as const;

export const ABOUT_QUALITY: QualityPoint[] = [
  {
    title: "Experiencia profesional y comunicación transparente",
    desc:
      "Garantizar una experiencia profesional en cada proyecto, con asesoría experta, planeación disciplinada y comunicación transparente de avances, riesgos y entregables.",
  },
  {
    title: "Ejecución con estándares exigentes",
    desc:
      "Ejecutar con estándares exigentes de seguridad, calidad y cumplimiento, aplicando buenas prácticas de ingeniería, verificación en sitio y pruebas funcionales para asegurar el desempeño esperado.",
  },
  {
    title: "Mejora continua y sostenibilidad",
    desc:
      "Impulsar la mejora continua mediante procesos estandarizados, capacitación permanente y evaluación del desempeño, promoviendo prácticas responsables y sostenibles con el medio ambiente.",
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
