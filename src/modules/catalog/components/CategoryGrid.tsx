import { useMemo } from "react";
import type { Category, Product } from "@/modules/catalog/data/products";
import OptimizedImage from "@/shared/components/OptimizedImage";
import { ArrowUpRight } from "lucide-react";

interface CategoryGridProps {
  categories: Category[];
  products: Product[];
  onSelectCategory: (categoryName: string) => void;
}

const CategoryGrid = ({ categories, products, onSelectCategory }: CategoryGridProps) => {
  const categoryIdLookup = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach((category) => {
      map.set(category.id.toLowerCase(), category.id);
      map.set(category.name.toLowerCase(), category.id);
    });
    return map;
  }, [categories]);

  const productsByCategory = useMemo(() => {
    const map = new Map<string, Product[]>();
    categories.forEach((category) => map.set(category.id, []));

    products.forEach((product) => {
      const rawValue = product.categoryId ?? "";
      const resolvedId = categoryIdLookup.get(rawValue.toLowerCase()) ?? rawValue;
      if (map.has(resolvedId)) {
        map.get(resolvedId)?.push(product);
      }
    });

    return map;
  }, [categories, products, categoryIdLookup]);

  const getCategoryImage = (categoryId: string) => {
    const items = productsByCategory.get(categoryId) ?? [];
    const withImage = items.find((product) => product.images?.[0]);
    return withImage?.images?.[0] || "/placeholder-category.jpg";
  };

  const getCategoryCount = (categoryId: string) => {
    return productsByCategory.get(categoryId)?.length ?? 0;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => {
        const image = getCategoryImage(category.id);
        const count = getCategoryCount(category.id);

        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label={`Ver productos de ${category.name}`}
          >
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-muted/40 via-muted/20 to-transparent">
              <OptimizedImage
                src={image}
                alt={category.name}
                className="w-full aspect-video p-4"
                aspectRatio="custom"
                objectFit="contain"
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/40"
                aria-hidden="true"
              />
            </div>

            <div className="flex flex-1 flex-col pt-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-accent transition-colors">
                  {category.name}
                </h3>
                <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                  {count} {count === 1 ? "producto" : "productos"}
                </span>
              </div>

              {/* ✅ Resumen arriba de "Ver catálogo" */}
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {category.summary}
              </p>

              <span className="mt-4 inline-flex items-center text-sm font-medium text-accent">
                Ver catálogo
                <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryGrid;
