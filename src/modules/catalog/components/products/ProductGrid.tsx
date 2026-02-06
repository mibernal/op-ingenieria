import { memo } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/modules/catalog/data/products";

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  loading?: boolean;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    wide?: number;
  };
}

const ProductGrid = memo(({ 
  products, 
  onProductClick, 
  loading = false,
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    wide: 4
  }
}: ProductGridProps) => {
  
  // Grid classes dinámicas basadas en columns
  const gridClasses = `
    grid gap-4 md:gap-6
    ${columns.mobile === 1 ? 'grid-cols-1' : 
      columns.mobile === 2 ? 'grid-cols-2' : 'grid-cols-1'}
    ${columns.tablet === 2 ? 'sm:grid-cols-2' : 
      columns.tablet === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}
    ${columns.desktop === 3 ? 'lg:grid-cols-3' : 
      columns.desktop === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}
    ${columns.wide === 4 ? 'xl:grid-cols-4' : 
      columns.wide === 5 ? 'xl:grid-cols-5' : 'xl:grid-cols-4'}
  `;

  if (loading) {
    return (
      <div className={gridClasses}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-muted rounded-lg aspect-square mb-3" />
            <div className="h-4 bg-muted rounded w-3/4 mb-2" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={gridClasses} role="grid" aria-label="Lista de productos">
      {products.map((product, index) => (
        <div 
          key={`${product.id}-${index}`}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
          role="gridcell"
        >
          <ProductCard 
            product={product} 
            onClick={() => onProductClick(product)}
          />
        </div>
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  // Optimización: Solo re-renderizar si cambian los productos o loading
  return (
    prevProps.products === nextProps.products &&
    prevProps.loading === nextProps.loading
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;