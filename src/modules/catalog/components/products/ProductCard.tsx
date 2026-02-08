// modules/catalog/components/products/ProductCard.tsx - VERSIÓN MEJORADA
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Product } from "@/modules/catalog/data/products";
import { useState } from "react";
import OptimizedImage from "@/shared/components/OptimizedImage";
import { categories } from "@/modules/catalog/data/products";
import { ShoppingCart, Eye, BarChart3, ChevronRight, Zap, Shield, Clock } from "lucide-react";
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
  onAddToCart 
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryName = () => {
    const category = categories.find(c => c.id === product.categoryId);
    return category?.name || product.categoryId || "Sin categoría";
  };

  const mainSpec = product.specs?.[0];

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-500",
        "hover:-translate-y-2 hover:shadow-2xl border-border/50",
        "h-full flex flex-col bg-gradient-to-b from-card via-card to-card/95",
        "hover:border-accent/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Efecto de brillo al hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-xl" />
      
      {/* Badge de destaque */}
      {product.sku?.includes("PREMIUM") && (
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg animate-pulse-slow">
            <Zap className="h-3 w-3 mr-1" />
            PREMIUM
          </Badge>
        </div>
      )}

      {/* Imagen del producto */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary/10 to-transparent p-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        
        <OptimizedImage
          src={product.images?.[0] || "/placeholder-product.jpg"}
          alt={product.title}
          className="w-full h-full object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          aspectRatio="square"
        />
        
        {/* Overlay de información */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "flex items-end justify-center p-6"
        )}>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView?.(product);
              }}
              className="w-10 h-10 bg-background/90 backdrop-blur-sm hover:bg-background hover:scale-110 transition-transform"
              aria-label="Vista rápida"
            >
              <Eye className="w-4 h-4" />
            </Button>
            {onAddToCart && (
              <Button
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart?.(product);
                }}
                className="w-10 h-10 bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-110 transition-transform shadow-lg shadow-accent/20"
                aria-label="Agregar al carrito"
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Indicadores de calidad */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Badge variant="outline" className="bg-background/90 backdrop-blur-sm text-xs">
            <Shield className="h-3 w-3 mr-1" />
            Garantía
          </Badge>
          <Badge variant="outline" className="bg-background/90 backdrop-blur-sm text-xs">
            <Clock className="h-3 w-3 mr-1" />
            24/7 Soporte
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 flex-1 space-y-4">
        {/* Título y precio */}
        <div className="space-y-3">
          <h3 
            className="text-lg font-semibold text-foreground line-clamp-2 leading-tight cursor-pointer hover:text-accent transition-colors group-hover:underline"
            onClick={() => onClick(product)}
          >
            {product.title}
          </h3>
          
          {product.price && (
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {product.price}
                </span>
                <span className="text-sm text-muted-foreground ml-2">
                  + IVA
                </span>
              </div>
              <Badge variant="outline" className="text-xs border-accent/30 text-accent">
                Disponible
              </Badge>
            </div>
          )}
        </div>

        {/* Descripción */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Especificación principal */}
        {mainSpec && (
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-secondary/30 to-transparent rounded-lg border border-border/50">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-foreground text-sm">{mainSpec.label}</div>
              <div className="text-muted-foreground text-sm truncate">{mainSpec.value}</div>
            </div>
          </div>
        )}

        {/* Categorías */}
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

      <CardFooter className="p-6 pt-0">
        <div className="flex gap-3 w-full">
          <Button
            onClick={() => onClick(product)}
            className="flex-1 gap-2 group/btn bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 transition-all duration-300 hover:shadow-lg"
          >
            <span>Ver detalles</span>
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            className="gap-2 border-2 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              // Lógica de cotización
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