// src/modules/catalog/components/products/ProductsSection.tsx
import { useEffect, useMemo, useState, lazy, Suspense } from "react";
import {
  products as allProducts,
  categories as allCategories,
  type Product,
  type Category,
} from "@/modules/catalog/data/products";
import ProductGridSkeleton from "@/shared/skeletons/ProductGridSkeleton";
import CategoryGrid from "@/modules/catalog/components/CategoryGrid";
import { cn } from "@/lib/utils";

// ✅ Lazy load de componentes pesados (ok para code-splitting)
const ProductGrid = lazy(
  () => import("@/modules/catalog/components/products/ProductGrid")
);
const ProductDetailModal = lazy(
  () => import("@/modules/catalog/components/products/ProductDetailModal")
);

type ProductsSectionProps = {
  /** Permite que una página (ej. CatalogPage) controle el estado inicial desde URL */
  initialCategoryId?: string | null;
  initialSubcategory?: string | null;
};

const ProductsSection = ({
  initialCategoryId = null,
  initialSubcategory = null,
}: ProductsSectionProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Sincronizar el estado interno con lo que venga desde URL/página
  useEffect(() => {
    setSelectedCategoryId(initialCategoryId || null);
  }, [initialCategoryId]);

  useEffect(() => {
    setSelectedSubcategory(initialSubcategory || null);
  }, [initialSubcategory]);

  // Mapa de categorías (lookup)
  const categoryMap = useMemo(() => {
    const map = new Map<string, Category>();
    for (const c of allCategories) map.set(c.id, c);
    return map;
  }, []);

  const selectedCategory = selectedCategoryId
    ? categoryMap.get(selectedCategoryId) ?? null
    : null;

  // Productos filtrados por categoría
  const productsInCategory = useMemo(() => {
    if (!selectedCategory) return [];
    const id = selectedCategory.id;
    return allProducts.filter((p) => p.categoryId === id);
  }, [selectedCategory]);

  // Productos visibles (con subcategoría)
  const visibleProducts = useMemo(() => {
    if (!selectedSubcategory) return productsInCategory;
    return productsInCategory.filter((p) => p.subcategory === selectedSubcategory);
  }, [productsInCategory, selectedSubcategory]);

  // Handlers
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
    setSelectedSubcategory(null);
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const sectionClass = "relative py-10 md:py-14 bg-secondary";
  const headerWrapClass = "mx-auto mb-8 max-w-3xl text-center";
  const dividerClass =
    "mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-primary/25 to-transparent";

  // ✅ Vista 1: Grid de categorías
  if (!selectedCategoryId) {
    return (
      <section id="productos" className={sectionClass}>
        {/* Fondo / gradientes cortos para evitar “aire muerto” */}
        <div
          className="absolute inset-x-0 top-0 -z-10 h-16 bg-gradient-to-b from-background/30 via-transparent to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 -z-10 h-16 bg-gradient-to-t from-background/30 via-transparent to-transparent"
          aria-hidden="true"
        />

        <div className="container mx-auto px-4">
          <div className={headerWrapClass}>
            <p className="text-xs tracking-[0.22em] text-muted-foreground">
              CATÁLOGO
            </p>
            <h2 className="section-title mt-2">Nuestros Productos</h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              Explora soluciones profesionales para respaldo energético, energía solar y
              equipamiento eléctrico, con soporte técnico y acompañamiento especializado.
            </p>
            <div className={dividerClass} />
          </div>

          <CategoryGrid
            categories={allCategories}
            products={allProducts}
            onSelectCategory={(nameOrId) => {
              const cat = allCategories.find(
                (c) => c.id === nameOrId || c.name === nameOrId
              );
              if (cat) setSelectedCategoryId(cat.id);
            }}
          />
        </div>
      </section>
    );
  }

  // ✅ Vista 2: Productos de categoría seleccionada
  return (
    <section id="productos" className={sectionClass}>
      <div
        className="absolute inset-x-0 top-0 -z-10 h-16 bg-gradient-to-b from-background/30 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-16 bg-gradient-to-t from-background/30 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4">
        {/* Header de categoría (compacto + premium) */}
        <div className="mb-6">
          <button
            onClick={handleBackToCategories}
            className={cn(
              "inline-flex items-center gap-2 rounded-full",
              "border border-border/60 bg-card/70 px-3.5 py-2",
              "text-sm text-foreground/90 shadow-sm shadow-black/5",
              "transition-all duration-300 hover:bg-card hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            )}
            aria-label="Volver a categorías"
          >
            <span aria-hidden className="text-muted-foreground">
              ←
            </span>
            <span className="font-medium">Volver a categorías</span>
          </button>

          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs tracking-[0.22em] text-muted-foreground">
                CATEGORÍA
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-heading font-bold text-foreground">
                {selectedCategory?.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {productsInCategory.length}{" "}
                {productsInCategory.length === 1 ? "producto" : "productos"} disponibles
                {selectedSubcategory ? (
                  <span className="text-muted-foreground">
                    {" "}
                    • Filtrado por “{selectedSubcategory}”
                  </span>
                ) : null}
              </p>
            </div>

            {/* Filtro subcategorías (si aplica) */}
            {selectedCategory?.subcategories?.length ? (
              <div className="flex items-center gap-2 md:justify-end">
                <span className="text-sm text-muted-foreground hidden md:inline">
                  Filtrar por
                </span>
                <select
                  value={selectedSubcategory || ""}
                  onChange={(e) => {
                    setSelectedSubcategory(e.target.value || null);
                  }}
                  className={cn(
                    "h-10 rounded-xl px-3.5 text-sm",
                    "border border-border/60 bg-card/80 text-foreground",
                    "shadow-sm shadow-black/5",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  )}
                  aria-label="Subcategorías"
                >
                  <option value="">Todas las subcategorías</option>
                  {selectedCategory.subcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
          </div>

          <div className="mt-5 h-px w-full bg-border/60" />
        </div>

        {/* Grid de productos con suspense */}
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <ProductGrid
            products={visibleProducts}
            onProductClick={handleProductClick}
            loading={false}
          />
        </Suspense>

        {/* Estado vacío (compacto) */}
        {visibleProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-2xl bg-muted/60 ring-1 ring-border/60">
              <svg
                className="h-10 w-10 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron productos
            </h3>

            <p className="text-muted-foreground max-w-md mx-auto">
              {selectedSubcategory
                ? `No hay productos disponibles en la subcategoría “${selectedSubcategory}”.`
                : "Prueba con otra categoría o ajusta el filtro para ver resultados."}
            </p>
          </div>
        )}

        {/* Modal de detalles (lazy loaded) */}
        <Suspense fallback={null}>
          <ProductDetailModal
            product={selectedProduct}
            open={isModalOpen}
            onOpenChange={(open) => {
              setIsModalOpen(open);
              if (!open) setSelectedProduct(null);
            }}
          />
        </Suspense>
      </div>
    </section>
  );
};

export default ProductsSection;
