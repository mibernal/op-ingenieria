import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Product } from "@/modules/catalog/data/products";
import OptimizedImage from "@/shared/components/OptimizedImage";
import { categories } from "@/modules/catalog/data/products";
import { BarChart3, ChevronRight, Eye, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard = ({
  product,
  onClick,
  onQuickView,
  onAddToCart,
}: ProductCardProps) => {
  const getCategoryName = () => {
    const category = categories.find((c) => c.id === product.categoryId);
    return category?.name || product.categoryId || "Sin categoría";
  };

  const mainSpec = product.specs?.[0];

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border border-border/60 bg-card transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg hover:border-accent/40",
        "h-full flex flex-col cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      )}
      onClick={() => onClick(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick(product);
        }
      }}
      aria-label={`Ver detalles del producto ${product.title}`}
    >
      {product.sku?.includes("PREMIUM") && (
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-sm">
            <Zap className="h-3 w-3 mr-1" />
            PREMIUM
          </Badge>
        </div>
      )}

      <div className="relative">
        <OptimizedImage
          src={product.images?.[0] || "/placeholder-product.jpg"}
          alt={product.title}
          className="w-full aspect-[4/3] bg-gradient-to-br from-muted/40 via-muted/10 to-transparent p-4"
          aspectRatio="custom"
          objectFit="contain"
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/40"
          aria-hidden="true"
        />

        {onQuickView && (
          <Button
            size="icon"
            variant="secondary"
            onClick={(event) => {
              event.stopPropagation();
              onQuickView(product);
            }}
            className="absolute right-4 top-4 h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm shadow-sm hover:bg-background"
            aria-label={`Vista rápida de ${product.title}`}
          >
            <Eye className="h-4 w-4" />
          </Button>
        )}
      </div>

      <CardContent className="p-5 space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {product.description}
          </p>
        </div>

        {mainSpec && (
          <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-secondary/30 p-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-foreground text-sm">
                {mainSpec.label}
              </div>
              <div className="text-muted-foreground text-sm truncate">
                {mainSpec.value}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {getCategoryName()}
          </Badge>
          {product.subcategory && (
            <Badge variant="outline" className="text-xs">
              {product.subcategory}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <div className="flex gap-3 w-full">
          <Button
            onClick={() => onClick(product)}
            className="flex-1 gap-2 group/btn bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <span>Ver detalles</span>
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            className="gap-2 border-2 hover:border-accent/50 hover:bg-accent/5"
            onClick={(event) => {
              event.stopPropagation();
              onAddToCart?.(product);
            }}
          >
            Cotizar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
