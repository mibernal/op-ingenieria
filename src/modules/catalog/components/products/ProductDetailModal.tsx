// src/modules/catalog/components/products/ProductDetailModal.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/modules/catalog/data/products";
import { Card } from "@/components/ui/card";
import { categories } from "@/modules/catalog/data/products";
import { cn } from "@/lib/utils";

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FALLBACK_PRODUCT_IMAGE = "/placeholder-product.jpg";
const AUTO_SLIDE_INTERVAL = 6000;

export const ProductDetailModal = ({
  product,
  open,
  onOpenChange,
}: ProductDetailModalProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const thumbsRef = useRef<HTMLDivElement | null>(null);

  const images = useMemo(() => {
    const list = product?.images ?? [];
    return Array.isArray(list) ? list.filter(Boolean) : [];
  }, [product]);

  // Reset al abrir/cambiar producto
  useEffect(() => {
    if (!open || !product) return;
    setActiveIndex(0);
    setIsAutoPlaying(true);
  }, [product, open]);

  // Autoplay
  useEffect(() => {
    if (!open) return;
    if (!product) return;
    if (!isAutoPlaying) return;
    if (images.length <= 1) return;

    const t = window.setInterval(() => {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, AUTO_SLIDE_INTERVAL);

    return () => window.clearInterval(t);
  }, [open, product, isAutoPlaying, images.length]);

  // Centrar miniatura activa
  useEffect(() => {
    const el = thumbsRef.current;
    if (!el) return;

    const active = el.querySelector<HTMLButtonElement>(
      `button[data-thumb="${activeIndex}"]`
    );
    if (!active) return;

    active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIndex]);

  if (!product) return null;

  const categoryName =
    categories.find((c) => c.id === product.categoryId)?.name ?? product.categoryId;

  const activeSrc = images[activeIndex] || FALLBACK_PRODUCT_IMAGE;

  const pauseAnd = (fn: () => void) => {
    setIsAutoPlaying(false);
    fn();
  };

  const goPrev = () =>
    pauseAnd(() =>
      setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    );

  const goNext = () =>
    pauseAnd(() =>
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    );

  const selectIndex = (idx: number) => pauseAnd(() => setActiveIndex(idx));

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola, me interesa obtener información sobre: ${product.title}`
    );
    window.open(`https://wa.me/573133638760?text=${message}`, "_blank");
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Cotización: ${product.title}`);
    const body = encodeURIComponent(
      `Hola,\n\nMe interesa obtener información y cotización del producto:\n\n${product.title}\n\nQuedo atento a su respuesta.`
    );
    window.open(
      `mailto:info@opingenieria.com?subject=${subject}&body=${body}`,
      "_blank"
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* ✅ dejamos el X nativo del DialogContent (shadcn) para evitar doble botón */}
      <DialogContent className="max-w-6xl max-h-[92vh] overflow-y-auto overflow-x-hidden p-0 rounded-2xl border-border/60">
        {/* HEADER premium */}
        <DialogHeader className="px-6 pt-5 pb-4">
          <div className="min-w-0">
            <DialogTitle className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
              {product.title}
            </DialogTitle>

            <DialogDescription className="sr-only">
              Información detallada del producto seleccionado.
            </DialogDescription>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-sm py-1.5">
                {categoryName}
              </Badge>

              {product.subcategory && (
                <Badge variant="outline" className="text-sm py-1.5">
                  {product.subcategory}
                </Badge>
              )}

              {images.length > 1 && (
                <Badge
                  variant="outline"
                  className="text-sm py-1.5 text-muted-foreground"
                >
                  {activeIndex + 1} / {images.length}
                </Badge>
              )}
            </div>
          </div>

          <div className="mt-4 h-px w-full bg-border/60" />
        </DialogHeader>

        {/* CONTENT */}
        <div className="px-6 pb-6">
          <div className={cn("grid gap-6", "md:grid-cols-[1.35fr_1fr]", "items-start")}>
            {/* IZQUIERDA: Media premium */}
            <Card className="rounded-2xl border-border/60 shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="relative rounded-xl overflow-hidden border border-border/60 bg-secondary">
                  <div className="relative aspect-video w-full">
                    {/* blur bg */}
                    <img
                      src={activeSrc}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-25"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
                      }}
                    />

                    {/* imagen principal */}
                    <img
                      key={`${product.id}-active-${activeIndex}`}
                      src={activeSrc}
                      alt={product.title}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
                      }}
                      className="absolute inset-0 m-auto max-w-[98%] max-h-[98%] object-contain block"
                    />

                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={goPrev}
                          className={cn(
                            "absolute left-3 top-1/2 -translate-y-1/2",
                            "w-10 h-10 rounded-full",
                            "bg-background/80 backdrop-blur-md border border-border/60",
                            "inline-flex items-center justify-center",
                            "transition hover:bg-background hover:shadow-sm",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
                          )}
                          aria-label="Imagen anterior"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          onClick={goNext}
                          className={cn(
                            "absolute right-3 top-1/2 -translate-y-1/2",
                            "w-10 h-10 rounded-full",
                            "bg-background/80 backdrop-blur-md border border-border/60",
                            "inline-flex items-center justify-center",
                            "transition hover:bg-background hover:shadow-sm",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
                          )}
                          aria-label="Siguiente imagen"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Miniaturas */}
                {images.length > 1 && (
                  <div
                    ref={thumbsRef}
                    className={cn("mt-4 flex gap-2 overflow-x-auto pb-1", "custom-scrollbar")}
                  >
                    {images.map((img, idx) => {
                      const isActive = idx === activeIndex;
                      return (
                        <button
                          key={`${product.id}-thumb-${idx}`}
                          data-thumb={idx}
                          type="button"
                          onClick={() => selectIndex(idx)}
                          className={cn(
                            "flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border transition",
                            isActive
                              ? "border-primary ring-2 ring-primary/25"
                              : "border-border/60 hover:border-primary/50"
                          )}
                          aria-label={`Ver imagen ${idx + 1} de ${product.title}`}
                          aria-pressed={isActive}
                        >
                          <img
                            src={img}
                            alt={`${product.title} - ${idx + 1}`}
                            className="w-full h-full object-cover block"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              e.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>

            {/* DERECHA: Info */}
            <div className="space-y-4">
              <Card className="p-5 rounded-2xl border-border/60 shadow-sm">
                <h3 className="text-base md:text-lg font-semibold mb-2">Descripción</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description || "Producto de alta calidad para aplicaciones industriales."}
                </p>
              </Card>

              {product.longDescription && product.longDescription.trim() && (
                <Card className="p-5 rounded-2xl border-border/60 shadow-sm">
                  <h3 className="text-base md:text-lg font-semibold mb-2">Detalles</h3>
                  <div
                    className="prose prose-sm max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: product.longDescription }}
                  />
                </Card>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Button
                  onClick={handleWhatsApp}
                  className="flex-1 gap-2 bg-accent hover:bg-accent/90"
                >
                  <MessageCircle className="h-4 w-4" />
                  Cotizar por WhatsApp
                </Button>
                <Button onClick={handleEmail} variant="outline" className="flex-1 gap-2">
                  <Mail className="h-4 w-4" />
                  Cotizar por Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
