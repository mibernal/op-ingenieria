import { memo, useMemo } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/modules/catalog/data/products";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  loading?: boolean;
  columns?: {
    mobile?: number;  // base
    tablet?: number;  // sm
    desktop?: number; // lg
    wide?: number;    // 2xl
  };
}

function colsClass(prefix: "" | "sm:" | "lg:" | "2xl:", n: number | undefined) {
  if (!n) return "";
  switch (n) {
    case 1: return `${prefix}grid-cols-1`;
    case 2: return `${prefix}grid-cols-2`;
    case 3: return `${prefix}grid-cols-3`;
    case 4: return `${prefix}grid-cols-4`;
    case 5: return `${prefix}grid-cols-5`;
    case 6: return `${prefix}grid-cols-6`;
    default:
      // fallback razonable
      return `${prefix}grid-cols-3`;
  }
}

const ProductGrid = memo(
  ({
    products,
    onProductClick,
    loading = false,
    columns = { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
  }: ProductGridProps) => {
    const gridClasses = useMemo(() => {
      return cn(
        "grid gap-4 md:gap-6",
        // Base / sm / lg / 2xl
        colsClass("", columns.mobile ?? 1),
        colsClass("sm:", columns.tablet ?? 2),
        colsClass("lg:", columns.desktop ?? 3),
        // ✅ clave: wide SOLO en 2xl (evita cards angostas en desktop normal)
        colsClass("2xl:", columns.wide ?? 4)
      );
    }, [columns.mobile, columns.tablet, columns.desktop, columns.wide]);

    if (loading) {
      return (
        <div className={gridClasses} aria-label="Cargando productos">
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
            key={product.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
            role="gridcell"
          >
            <ProductCard product={product} onClick={() => onProductClick(product)} />
          </div>
        ))}
      </div>
    );
  },
  (prev, next) =>
    prev.products === next.products &&
    prev.loading === next.loading &&
    prev.onProductClick === next.onProductClick &&
    prev.columns?.mobile === next.columns?.mobile &&
    prev.columns?.tablet === next.columns?.tablet &&
    prev.columns?.desktop === next.columns?.desktop &&
    prev.columns?.wide === next.columns?.wide
);

ProductGrid.displayName = "ProductGrid";
export default ProductGrid;
