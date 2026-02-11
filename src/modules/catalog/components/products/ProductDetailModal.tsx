// src/modules/catalog/components/products/ProductDetailModal.tsx
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mail } from "lucide-react";
import type { Product } from "@/modules/catalog/data/products";
import { Card } from "@/components/ui/card";
import { categories } from "@/modules/catalog/data/products";
import { cn } from "@/lib/utils";

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductDetailModal = ({
  product,
  open,
  onOpenChange,
}: ProductDetailModalProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset cuando cambia el producto o cuando se abre
  useEffect(() => {
    if (product) setActiveIndex(0);
  }, [product, open]);

  const images = useMemo(() => {
    const list = product?.images ?? [];
    return Array.isArray(list) ? list.filter(Boolean) : [];
  }, [product]);

  if (!product) return null;

  const categoryName =
    categories.find((c) => c.id === product.categoryId)?.name ??
    product.categoryId;

  const activeSrc = images[activeIndex] || "/placeholder-product.jpg";

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 pt-6 pb-0">
          <div>
            <DialogTitle className="text-xl md:text-2xl font-heading">
              {product.title}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Información detallada del producto seleccionado.
            </DialogDescription>

            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-sm">
                {categoryName}
              </Badge>
              {product.subcategory && (
                <Badge variant="outline" className="text-sm">
                  {product.subcategory}
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4 p-6">
          {/* Imagen + galería */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary ring-1 ring-border/60">
              <img
                key={`${product.id}-active-${activeIndex}`} // fuerza refresh cuando cambias
                src={activeSrc}
                alt={product.title}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = "/placeholder-product.jpg";
                }}
                className="w-full h-full object-contain block"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={`${product.id}-img-${index}`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border transition",
                        isActive
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-border/60 hover:border-primary/50"
                      )}
                      aria-label={`Ver imagen ${index + 1} de ${product.title}`}
                      aria-pressed={isActive}
                    >
                      <img
                        src={img}
                        alt={`${product.title} - ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.src = "/placeholder-product.jpg";
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description ||
                  "Producto de alta calidad para aplicaciones industriales."}
              </p>
            </Card>

            {product.longDescription && product.longDescription.trim() && (
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Detalles</h3>
                <div
                  className="prose prose-sm max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: product.longDescription }}
                />
              </Card>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={handleWhatsApp}
                className="flex-1 gap-2 bg-accent hover:bg-accent/90"
              >
                <MessageCircle className="h-4 w-4" />
                Cotizar por WhatsApp
              </Button>
              <Button
                onClick={handleEmail}
                variant="outline"
                className="flex-1 gap-2"
              >
                <Mail className="h-4 w-4" />
                Cotizar por Email
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
