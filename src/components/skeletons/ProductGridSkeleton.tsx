//src/components/skeletons/ProductGridSkeleton.tsx
import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductGridSkeletonProps {
  count?: number;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    xl?: number;
  };
}

const ProductGridSkeleton = ({
  count = 8,
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    xl: 4,
  },
}: ProductGridSkeletonProps) => {
  const gridClasses = `
    grid gap-4 sm:gap-5 lg:gap-6
    grid-cols-${columns.mobile}
    sm:grid-cols-${columns.tablet}
    lg:grid-cols-${columns.desktop}
    xl:grid-cols-${columns.xl}
  `;

  return (
    <div className={gridClasses}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
