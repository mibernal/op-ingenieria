import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";
import ProductDetailModal from "./ProductDetailModal";
import { products, categories, type Product } from "@/data/products";

const ProductsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section id="productos" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-4">Nuestros Productos</h2>
        <p className="section-subtitle text-center mx-auto mb-8">
          Explore nuestro catálogo de equipos eléctricos de alta calidad para aplicaciones industriales y comerciales.
        </p>

        {/* Category Filter */}
        <div className="mb-10">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProductCard product={product} onClick={handleProductClick} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No hay productos en esta categoría.
            </p>
          </div>
        )}

        {/* Product Detail Modal */}
        <ProductDetailModal
          product={selectedProduct}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </div>
    </section>
  );
};

export default ProductsSection;
