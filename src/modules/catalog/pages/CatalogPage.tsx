import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { products, categories, type Product } from "../data/products";
import CategoryFilter from "../components/CategoryFilter";
import SubcategoryList from "../components/SubcategoryList";
import ProductGrid from "@/modules/catalog/components/products/ProductGrid";
import ProductDetailModal from "@/modules/catalog/components/products/ProductDetailModal";
import Seo from "@/components/seo/Seo";
import { catalogSeo } from "@/modules/catalog/seo";

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Leer parámetros iniciales de la URL
  const initialCategoryId = searchParams.get("cat");
  const initialSubcategory = searchParams.get("sub");

  // Usar useMemo para evitar recreaciones innecesarias
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (categoryId && p.categoryId !== categoryId) return false;
      if (subcategory && p.subcategory !== subcategory) return false;
      return true;
    });
  }, [categoryId, subcategory]);

  const activeCategory = useMemo(() => {
    return categories.find((c) => c.id === categoryId);
  }, [categoryId]);

  // Inicializar desde URL
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
    if (!initialSubcategory) {
      setSubcategory(null);
      return;
    }
    setSubcategory(initialSubcategory);
  }, [initialSubcategory]);

  const handleCategorySelect = (id: string | null) => {
    setCategoryId(id);
    setSubcategory(null);
    
    // Actualizar URL
    const params = new URLSearchParams(searchParams);
    if (id) {
      params.set("cat", id);
    } else {
      params.delete("cat");
    }
    params.delete("sub");
    setSearchParams(params);
  };

  const handleSubcategorySelect = (sub: string | null) => {
    setSubcategory(sub);
    
    // Actualizar URL
    const params = new URLSearchParams(searchParams);
    if (sub) {
      params.set("sub", sub);
    } else {
      params.delete("sub");
    }
    setSearchParams(params);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo {...catalogSeo} />
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
              Catálogo de Productos
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Encuentra los mejores productos eléctricos e industriales para tus proyectos
            </p>
          </div>

          <div className="space-y-8">
            {/* Filtros */}
            <div className="bg-card rounded-xl border p-6">
              <CategoryFilter
                categories={categories}
                selectedCategoryId={categoryId}
                onSelectCategory={handleCategorySelect}
              />
            </div>

            {/* Subcategorías si hay categoría activa */}
            {activeCategory && activeCategory.subcategories.length > 0 && (
              <div className="bg-card rounded-xl border p-6">
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

            {/* Contador de productos */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} productos encontrados
                {categoryId && ` en ${activeCategory?.name}`}
                {subcategory && ` > ${subcategory}`}
              </p>
              {(categoryId || subcategory) && (
                <button
                  onClick={() => {
                    setCategoryId(null);
                    setSubcategory(null);
                    setSearchParams({});
                  }}
                  className="text-sm text-accent hover:text-accent/80 transition-colors"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            {/* Grid de productos */}
            {filteredProducts.length > 0 ? (
              <ProductGrid
                products={filteredProducts}
                onProductClick={handleProductClick}
                columns={{
                  mobile: 1,
                  tablet: 2,
                  desktop: 3,
                  wide: 4
                }}
              />
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-muted rounded-full">
                  <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No se encontraron productos</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-4">
                  {categoryId 
                    ? `No hay productos ${subcategory ? `en la subcategoría "${subcategory}"` : `en la categoría "${activeCategory?.name}"`}.`
                    : "Prueba seleccionando una categoría."
                  }
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

        {/* Modal de detalles */}
        <ProductDetailModal
          product={selectedProduct}
          open={isModalOpen}
          onOpenChange={(open) => {
            setIsModalOpen(open);
            if (!open) setSelectedProduct(null);
          }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
