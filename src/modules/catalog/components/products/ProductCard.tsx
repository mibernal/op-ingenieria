// src/modules/catalog/components/products/ProductCard.tsx
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Product } from "@/modules/catalog/data/products";
import OptimizedImage from "@/shared/components/OptimizedImage";
import { categories } from "@/modules/catalog/data/products";
import { ChevronRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;

  /** Abre detalle completo (modal o page) */
  onClick: (product: Product) => void;

  /** Vista rápida (modal) */
  onQuickView?: (product: Product) => void;

  /**
   * ✅ No-ecommerce:
   * Hook opcional para tracking/analytics (ej: GA4, Meta Pixel)
   */
  onQuote?: (product: Product) => void;
}

export const ProductCard = ({ product, onClick, onQuickView, onQuote }: ProductCardProps) => {
  const categoryName = useMemo(() => {
    const category = categories.find((c) => c.id === product.categoryId);
    return category?.name || product.categoryId || "Sin categoría";
  }, [product.categoryId]);

  const imgSrc = product.images?.[0] || "/placeholder-product.jpg";

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border border-border/60 bg-card",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg hover:border-accent/40",
        "h-full flex flex-col",
        // A11y focus (si tabulas a cualquier botón dentro)
        "focus-within:ring-2 focus-within:ring-accent/35 focus-within:ring-offset-2 focus-within:ring-offset-background"
      )}
    >
      {/* Área clicable principal: abre detalles */}
      <button
        type="button"
        onClick={() => onClick(product)}
        className={cn("text-left w-full", "focus-visible:outline-none")}
        aria-label={`Ver detalles del producto ${product.title}`}
      >
        <div className="relative">
          <OptimizedImage
            src={imgSrc}
            alt={product.title}
            className={cn(
              "w-full aspect-[4/3]",
              "bg-gradient-to-br from-muted/40 via-muted/10 to-transparent",
              "p-4"
            )}
            aspectRatio="custom"
            objectFit="contain"
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />

          {/* ring */}
          <div
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/40"
            aria-hidden="true"
          />

          {/* overlay premium en hover */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              "bg-gradient-to-t from-background/70 via-transparent to-transparent"
            )}
            aria-hidden="true"
          />

          {/* Quick view */}
          {onQuickView && (
            <Button
              size="icon"
              variant="secondary"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onQuickView(product);
              }}
              className={cn(
                "absolute right-4 top-4 h-10 w-10 rounded-full",
                "bg-background/90 backdrop-blur-sm shadow-sm",
                "hover:bg-background",
                "focus-visible:ring-2 focus-visible:ring-accent/35"
              )}
              aria-label={`Vista rápida de ${product.title}`}
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
        </div>

        <CardContent className="p-5 space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground line-clamp-2">{product.title}</h3>

            {product.description ? (
              <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
            ) : (
              <p className="text-sm text-muted-foreground/80">
                Solución profesional para aplicaciones industriales y comerciales.
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              {categoryName}
            </Badge>

            {product.subcategory ? (
              <Badge variant="outline" className="text-xs">
                {product.subcategory}
              </Badge>
            ) : null}
          </div>
        </CardContent>
      </button>

      {/* Footer actions */}
      <CardFooter className="p-5 pt-0 mt-auto">
        <div className="w-full grid grid-cols-2 gap-3">
          {/* CTA principal: Detalles */}
          <Button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onClick(product);
            }}
            className={cn(
              "w-full gap-2 group/btn",
              "bg-accent text-accent-foreground hover:bg-accent/90",
              "shadow-sm hover:shadow-md"
            )}
          >
            <span>Ver detalles</span>
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>

          {/* ✅ CTA secundario: Cotizar (1 botón → abre modal) */}
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full",
              "border-border/60 bg-background/40",
              "hover:bg-background/60",
              "transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
              "shadow-sm hover:shadow-md"
            )}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onQuote?.(product); // tracking opcional
              onClick(product);   // ✅ abre modal (detalle), allí cotiza
            }}
            aria-label={`Cotizar ${product.title}`}
          >
            Cotizar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
