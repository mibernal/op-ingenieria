import { useState, useMemo, lazy, Suspense } from "react";
import { products as allProducts, categories as allCategories, type Product, type Category } from "@/modules/catalog/data/products";
import ProductGridSkeleton from "@/shared/components/skeletons/ProductGridSkeleton";
import CategoryGrid from "@/modules/catalog/components/CategoryGrid";

// Lazy load de componentes pesados
const ProductGrid = lazy(() => import("@/components/products/ProductGrid"));
const ProductDetailModal = lazy(() => import("@/components/products/ProductDetailModal"));

const ProductsSection = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mapa de categorías optimizado
  const categoryMap = useMemo(() => {
    const map = new Map<string, Category>();
    allCategories.forEach((c) => map.set(c.id, c));
    return map;
  }, []);

  // Categoría seleccionada
  const selectedCategory = selectedCategoryId ? categoryMap.get(selectedCategoryId) : null;

  const getRepresentativeImage = (categoryId: string) => {
    // Busca productos en esta categoría
    const productsInCat = allProducts.filter(p => {
      // Asegurar que el categoryId coincida
      const productCategoryId = allCategories.find(c => c.name === p.categoryId)?.id || p.categoryId;
      return productCategoryId === categoryId;
    });
    
    // Toma la primera imagen del primer producto que tenga imágenes
    for (const product of productsInCat) {
      if (product.images && product.images.length > 0 && product.images[0]) {
        return product.images[0];
      }
    }
    
    // Si no hay imágenes, usa un placeholder
    return "/placeholder-category.jpg";
  };

  // Productos filtrados por categoría
  const productsInCategory = useMemo(() => {
    if (!selectedCategory) return [];
    return allProducts.filter((p) => 
      p.categoryId === selectedCategory.id
    );
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
  };

  // Si no hay categoría seleccionada, mostrar grid de categorías
  if (!selectedCategoryId) {
    return (
      <section id="productos" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-4">Nuestros Productos</h2>
          <p className="section-subtitle text-center mx-auto mb-8">
            Explore nuestro catálogo de equipos eléctricos de alta calidad para aplicaciones industriales y comerciales.
          </p>

          <CategoryGrid
            categories={allCategories}
            products={allProducts}
            onSelectCategory={(nameOrId) => {
              const cat = allCategories.find((c) => c.id === nameOrId || c.name === nameOrId);
              if (cat) setSelectedCategoryId(cat.id);
            }}
          />
        </div>
      </section>
    );
  }

  // Vista de productos de categoría seleccionada
  return (
    <section id="productos" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header de categoría */}
        <div className="mb-8">
          <button 
            onClick={handleBackToCategories}
            className="inline-flex items-center text-sm text-accent hover:text-accent/80 mb-3 transition-colors"
            aria-label="Volver a categorías"
          >
            <span className="mr-2">←</span>
            Volver a categorías
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                {selectedCategory?.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {productsInCategory.length} productos disponibles
              </p>
            </div>

            {selectedCategory?.subcategories && selectedCategory.subcategories.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden md:inline">Filtrar por:</span>
                <select
                  value={selectedSubcategory || ""}
                  onChange={(e) => setSelectedSubcategory(e.target.value || null)}
                  className="px-4 py-2 border rounded-lg text-sm bg-white"
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
            )}
          </div>
        </div>

        {/* Grid de productos con suspense */}
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <ProductGrid
            products={visibleProducts}
            onProductClick={handleProductClick}
            loading={false}
          />
        </Suspense>

        {/* Estado vacío */}
        {visibleProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-muted rounded-full">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No se encontraron productos</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {selectedSubcategory 
                ? `No hay productos en la subcategoría "${selectedSubcategory}".`
                : "Prueba con otra categoría o subcategoría."
              }
            </p>
          </div>
        )}

        {/* Modal de detalles (lazy loaded) */}
        <Suspense fallback={null}>
          {selectedProduct && (
            <ProductDetailModal 
              product={selectedProduct} 
              open={isModalOpen} 
              onOpenChange={setIsModalOpen} 
            />
          )}
        </Suspense>
      </div>
    </section>
  );
};

export default ProductsSection;