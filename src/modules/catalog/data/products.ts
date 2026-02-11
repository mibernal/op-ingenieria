// src/modules/catalog/data/products.ts
import productsData from "../data/products_normalized.json";
import categoriesData from "../data/categories.json";
import * as LucideIcons from "lucide-react";
import type { Product as CoreProduct } from "@/core/domain/product";
import { publicAssets } from "@/lib/assets";

// Extender el tipo del core con campos específicos del catálogo
export type Product = CoreProduct & {
  slug: string;
  categoryId: string;
  images: string[];
  subcategory?: string | null;
  longDescription?: string;
};

export type Category = {
  id: string;
  name: string;
  summary: string;
  icon: keyof typeof LucideIcons;
  subcategories: string[];
};

type RawCategory = {
  id: string;
  name: string;
  summary?: string;
  subcategories: string[];
  count: number;
};

// ---- helpers ----
const normalizeKey = (value: unknown) => {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes
    .replace(/\s+/g, " ");
};

const safeId = () => crypto.randomUUID?.() ?? String(Math.random());

// Iconos definidos por arquitectura frontend
const categoryIcons: Record<string, keyof typeof LucideIcons> = {
  baterias: "Battery",
  medidores: "Gauge",
  energia: "Zap",
  potencia: "Power",
  sensores: "CircleDot",
};

const rawCategories = categoriesData as RawCategory[];

// ✅ Fallbacks por si un día falta el summary en el JSON
const summaryFallbacks: Record<string, string> = {
  "aires-acondicionados-y-ventilacion":
    "Climatización eficiente para hogares y empresas: confort, control de temperatura y ventilación confiable.",
  baterias:
    "Respaldo energético seguro y duradero: baterías para sistemas críticos, solares y aplicaciones industriales.",
  "energia-solar":
    "Soluciones fotovoltaicas para ahorro y autonomía: paneles, componentes y sistemas listos para operar.",
  "iluminacion-led":
    "Iluminación moderna de alto rendimiento: menor consumo, mayor duración y excelente calidad de luz.",
  inversores:
    "Conversión de energía estable y eficiente: inversores para sistemas solares, respaldo y operación continua.",
  "plantas-electricas":
    "Generación confiable para continuidad operativa: plantas eléctricas para respaldo y alta demanda.",
  "rectificadores---cargadores":
    "Carga y alimentación controlada para sistemas críticos: estabilidad, protección y rendimiento constante.",
  "sistemas-ups":
    "Respaldo inmediato ante cortes: UPS para proteger equipos y garantizar operación sin interrupciones.",
  "tableros-distribucion-y-control":
    "Distribución eléctrica segura y ordenada: control, protección y gestión profesional de cargas.",
  "estabilizadores-de-tensión":
    "Protección contra variaciones eléctricas: regulación estable para cuidar equipos sensibles y costosos.",
  "reguladores-electrónicos-y-circuitos-de-control-eléctricos":
    "Control eléctrico preciso y seguro: regulación y automatización para sistemas técnicos e industriales.",
};

export const categories: Category[] = rawCategories.map((c) => ({
  id: c.id,
  name: c.name,
  summary: (
    c.summary?.trim() ||
    summaryFallbacks[c.id] ||
    "Explora equipos y soluciones profesionales para tu proyecto."
  ).trim(),
  subcategories: Array.isArray(c.subcategories) ? c.subcategories : [],
  icon: categoryIcons[c.id] ?? "LayoutGrid",
}));

// ✅ Mapas robustos: por id y por nombre normalizado
const categoryIdSet = new Set(categories.map((c) => c.id));
const categoryNameToIdMap = new Map<string, string>();
for (const cat of categories) {
  categoryNameToIdMap.set(normalizeKey(cat.name), cat.id);
}

// Procesar productos del JSON (limpio)
export const products: Product[] = (productsData as any[]).map((item: any) => {
  const rawCategory = String(item.category ?? "").trim();

  // 1) si viene un id válido, úsalo
  // 2) si viene un nombre, normaliza y busca id
  // 3) fallback: "uncategorized"
  const maybeId = normalizeKey(rawCategory);
  const categoryId =
    (categoryIdSet.has(rawCategory) ? rawCategory : undefined) ||
    categoryNameToIdMap.get(maybeId) ||
    "uncategorized";

  const imagesRaw = Array.isArray(item.images) ? item.images : [];
  const images = publicAssets(imagesRaw);

  const id = String(item.id ?? "").trim() || safeId();
  const slug = String(item.slug ?? "").trim() || id || safeId();

  return {
    id,
    title: String(item.title ?? "Producto sin nombre"),
    description: String(item.description ?? ""),
    slug,
    categoryId,
    subcategory: item.subcategory ?? null,
    longDescription: item.longDescription ?? "",
    images,
  };
});
