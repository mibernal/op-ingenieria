// src/shared/utils/quote.ts
import type { Product } from "@/modules/catalog/data/products";

const CONTACT = {
  email: "info@opingenieria.com",
  whatsappNumber: "573133638760",
};

const enc = (s: string) => encodeURIComponent(s);

export function buildQuoteSubject(product: Product) {
  return `Cotización: ${product.title}`;
}

export function buildQuoteBody(product: Product) {
  const catLine = product.categoryId ? `Categoría: ${product.categoryId}\n` : "";
  const subLine = product.subcategory ? `Subcategoría: ${product.subcategory}\n` : "";

  return [
    "Hola,",
    "",
    "Me interesa recibir información y cotización del siguiente producto:",
    "",
    `Producto: ${product.title}`,
    catLine && catLine.trim(),
    subLine && subLine.trim(),
    "",
    "Por favor indíquenme disponibilidad, tiempos de entrega y condiciones.",
    "",
    "Gracias.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWhatsAppUrl(product: Product) {
  const message = [
    "Hola, me interesa cotizar este producto:",
    `• ${product.title}`,
    product.categoryId ? `• Categoría: ${product.categoryId}` : "",
    product.subcategory ? `• Subcategoría: ${product.subcategory}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${CONTACT.whatsappNumber}?text=${enc(message)}`;
}

export function buildMailtoHref(product: Product) {
  const subject = buildQuoteSubject(product);
  const body = buildQuoteBody(product);
  return `mailto:${CONTACT.email}?subject=${enc(subject)}&body=${enc(body)}`;
}

/** ✅ Flujo pro: formulario /contact con campos precargados */
export function buildContactFormHref(product: Product) {
  const subject = buildQuoteSubject(product);
  const message = buildQuoteBody(product);

  const params = new URLSearchParams();
  params.set("subject", subject);
  params.set("message", message);

  return `/contact#form?${params.toString()}`;
}
