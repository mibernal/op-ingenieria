// src/lib/assets.ts
/**
 * Normaliza rutas legacy que venían del filesystem (src/assets/...)
 * a rutas públicas que serán servidas desde /public.
 *
 * Ejemplo:
 *  "./src/assets/images/uploads/2019/11/002B.jpg"
 *    -> "uploads/2019/11/002B.jpg"
 *
 * Luego se resuelve con BASE_URL para soportar GitHub Pages:
 *  BASE_URL="/op-ingenieria/"  => "/op-ingenieria/uploads/2019/11/002B.jpg"
 */
export function normalizePublicPath(input: string): string {
  if (!input) return "";

  // Si ya es URL absoluta, no tocamos nada
  if (/^https?:\/\//i.test(input)) return input;

  // Si ya viene como data URI
  if (/^data:/i.test(input)) return input;

  let p = String(input).trim();

  // Quitar comillas raras o espacios
  p = p.replace(/^['"]|['"]$/g, "");

  // Quitar "./" inicial
  p = p.replace(/^\.\//, "");

  // Caso típico: "src/assets/images/uploads/..."
  // o "./src/assets/images/uploads/..."
  p = p.replace(/^src\/assets\/images\//, "");

  // A veces venía "src/assets/" sin images
  p = p.replace(/^src\/assets\//, "");

  // Quitar slash inicial si lo hay
  p = p.replace(/^\/+/, "");

  // Si quedó "uploads/..." perfecto.
  // Si quedó "images/uploads/..." lo bajamos a "uploads/..."
  p = p.replace(/^images\/uploads\//, "uploads/");

  return p;
}

/**
 * Devuelve una URL lista para usar en <img src="">
 * respetando el BASE_URL (GitHub Pages).
 */
export function publicAsset(input: string): string {
  if (!input) return "";

  // URL absoluta / data:
  if (/^https?:\/\//i.test(input) || /^data:/i.test(input)) return input;

  const clean = normalizePublicPath(input);

  // Si el path ya empieza con BASE_URL, evitar duplicarlo
  const base = import.meta.env.BASE_URL || "/";
  if (clean.startsWith(base.replace(/^\//, ""))) {
    return `${base}${clean.replace(base.replace(/^\//, ""), "")}`.replace(/\/{2,}/g, "/");
  }

  return `${base}${clean}`.replace(/\/{2,}/g, "/");
}

/**
 * Helper para arrays de imágenes
 */
export function publicAssets(list: string[]): string[] {
  if (!Array.isArray(list)) return [];
  return list.map(publicAsset).filter(Boolean);
}
