// src/modules/catalog/pages/CatalogPage.tsx
import { useEffect, useMemo, useState, lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { products, categories, type Product } from "../data/products";
import CategoryFilter from "../components/CategoryFilter";
import SubcategoryList from "../components/SubcategoryList";
import Seo from "@/components/seo/Seo";
import { catalogSeo } from "@/modules/catalog/seo";
import ProductGridSkeleton from "@/shared/skeletons/ProductGridSkeleton";
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";

const ProductGrid = lazy(() => import("@/modules/catalog/components/products/ProductGrid"));
const ProductDetailModal = lazy(() => import("@/modules/catalog/components/products/ProductDetailModal"));

const CARD = cn(
  "rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md",
  "shadow-sm shadow-black/5"
);

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialCategoryId = searchParams.get("cat");
  const initialSubcategory = searchParams.get("sub");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (categoryId && p.categoryId !== categoryId) return false;
      if (subcategory && p.subcategory !== subcategory) return false;
      return true;
    });
  }, [categoryId, subcategory]);

  const activeCategory = useMemo(() => {
    return categories.find((c) => c.id === categoryId) ?? null;
  }, [categoryId]);

  useEffect(() => {
    if (!initialCategoryId) {
      setCategoryId(null);
      return;
    }

    const category = categories.find(
      (c) => c.id === initialCategoryId || c.name.toLowerCase() === initialCategoryId.toLowerCase()
    );

    setCategoryId(category ? category.id : initialCategoryId);
  }, [initialCategoryId]);

  useEffect(() => {
    setSubcategory(initialSubcategory || null);
  }, [initialSubcategory]);

  const handleCategorySelect = (id: string | null) => {
    setCategoryId(id);
    setSubcategory(null);

    const params = new URLSearchParams(searchParams);
    if (id) params.set("cat", id);
    else params.delete("cat");

    params.delete("sub");
    setSearchParams(params);
  };

  const handleSubcategorySelect = (sub: string | null) => {
    setSubcategory(sub);

    const params = new URLSearchParams(searchParams);
    if (sub) params.set("sub", sub);
    else params.delete("sub");

    setSearchParams(params);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleClearFilters = () => {
    setCategoryId(null);
    setSubcategory(null);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo {...catalogSeo} />
      <Header />

      <main className="flex-1">
        {/* ✅ HERO OSCURO (como Clients) */}
        <SectionShell variant="dark">
          <SectionHeader
            eyebrow="PRODUCTOS"
            title={
              <>
                Catálogo de <span className="text-accent">Soluciones</span>
              </>
            }
            subtitle="Infraestructura eléctrica, respaldo (UPS/baterías/plantas), energía solar y distribución para operación confiable."
          />

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90">
              <NavLink to={`${ROUTES.CONTACT}#form`}>Solicitar cotización</NavLink>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
            >
              <NavLink to={ROUTES.PROJECTS}>Ver proyectos</NavLink>
            </Button>
          </div>
        </SectionShell>

        {/* ✅ CONTENIDO CLARO (filtros + grid) */}
        <SectionShell variant="light">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid gap-6">
              {/* Filtros */}
              <div className={cn(CARD, "p-6 md:p-7")}>
                <CategoryFilter
                  categories={categories}
                  selectedCategoryId={categoryId}
                  onSelectCategory={handleCategorySelect}
                />
              </div>

              {/* Subcategorías */}
              {activeCategory && activeCategory.subcategories.length > 0 && (
                <div className={cn(CARD, "p-6 md:p-7")}>
                  <h3 className="font-heading font-semibold text-lg mb-4">
                    Filtra por tipo de {activeCategory.name.toLowerCase()}
                  </h3>
                  <SubcategoryList
                    subcategories={activeCategory.subcategories}
                    selected={subcategory}
                    onSelect={handleSubcategorySelect}
                  />
                </div>
              )}

              {/* Meta row */}
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Resultados
                  {categoryId && ` en ${activeCategory?.name ?? ""}`}
                  {subcategory && ` > ${subcategory}`}
                </p>

                {(categoryId || subcategory) && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-accent hover:text-accent/80 transition-colors"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>

              {/* Grid */}
              {filteredProducts.length > 0 ? (
                <div className={cn(CARD, "p-4 md:p-6")}>
                  <Suspense fallback={<ProductGridSkeleton count={8} />}>
                    <ProductGrid
                      products={filteredProducts}
                      onProductClick={handleProductClick}
                      columns={{ mobile: 1, tablet: 2, desktop: 3, wide: 4 }}
                    />
                  </Suspense>
                </div>
              ) : (
                <div className={cn(CARD, "p-10 md:p-12 text-center")}>
                  <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-muted rounded-full">
                    <svg
                      className="w-12 h-12 text-muted-foreground"
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

                  <h3 className="text-lg font-semibold text-foreground mb-2">No se encontraron productos</h3>

                  <p className="text-muted-foreground max-w-md mx-auto mb-4">
                    {categoryId
                      ? `No hay productos ${
                          subcategory
                            ? `en la subcategoría "${subcategory}"`
                            : `en la categoría "${activeCategory?.name ?? ""}"`
                        }.`
                      : "Prueba seleccionando una categoría o solicita asesoría técnica."}
                  </p>

                  {categoryId && (
                    <button
                      onClick={() => handleCategorySelect(null)}
                      className="text-accent hover:text-accent/80 transition-colors"
                    >
                      Ver todos los productos
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </SectionShell>

        {/* Modal */}
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
      </main>

      <Footer />
    </div>
  );
}
