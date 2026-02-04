import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <button
      onClick={() => onClick(product)}
      className="product-card group block w-full text-left cursor-pointer"
    >
      <div className="product-card-image overflow-hidden relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-primary/90">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Badge>
      </div>
      <div className="product-card-content space-y-2">
        <h3 className="product-card-title text-sm md:text-base line-clamp-2">
          {product.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        {product.price && (
          <p className="text-sm font-semibold text-accent">{product.price}</p>
        )}
        <span className="inline-block text-xs text-accent font-medium group-hover:underline">
          Ver detalles →
        </span>
      </div>
    </button>
  );
};

export default ProductCard;
