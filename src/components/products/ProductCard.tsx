import { Badge } from "@/components/ui/badge";
import type { Product } from "@/modules/catalog/data/products";
import { useState } from "react";
import OptimizedImage from "@/shared/components/OptimizedImage";
import { categories } from "@/modules/catalog/data/products";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Función para obtener el nombre de la categoría (simulación)
  const getCategoryName = () => {
    const category = categories.find(c => c.id === product.categoryId);
    return category?.name || product.categoryId || "Sin categoría";
  };

  return (
    <button
      onClick={() => onClick(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-card rounded-lg shadow-sm border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 text-left w-full"
      aria-label={`Ver detalles de ${product.title}`}
    >
      {/* Imagen del producto */}
      <div className="relative h-48 md:h-56 overflow-hidden rounded-t-lg bg-muted">
        <OptimizedImage
          src={product.images?.[0] || "/placeholder-product.jpg"}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          aspectRatio="square"
        />
        
        {/* Overlay al hover */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          flex items-end p-4
        `}>
          <span className="text-white text-sm font-medium">
            Ver especificaciones →
          </span>
        </div>
        
        {/* Badges de categoría */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className="bg-primary/90 text-primary-foreground text-xs font-medium">
            {getCategoryName()}
          </Badge>
          {product.subcategory && (
            <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
              {product.subcategory}
            </Badge>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 space-y-3">
        <h3 className="font-heading font-semibold text-card-foreground text-base leading-tight line-clamp-2">
          {product.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        {product.price && (
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-lg font-bold text-accent">
              {product.price}
            </span>
            <span className="text-xs text-muted-foreground">
              Solicitar cotización
            </span>
          </div>
        )}
        
        {/* Especificaciones principales */}
        {product.specs && product.specs.length > 0 && (
          <div className="pt-3 border-t border-border">
            <div className="grid grid-cols-2 gap-2">
              {product.specs.slice(0, 2).map((spec, index) => (
                <div key={index} className="text-xs">
                  <span className="text-muted-foreground">{spec.label}: </span>
                  <span className="font-medium text-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </button>
  );
};

export default ProductCard;