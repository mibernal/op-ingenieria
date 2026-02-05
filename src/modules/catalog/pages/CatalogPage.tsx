import { useMemo, useState } from "react";
import { products, categories } from "../data/products";
import CategoryFilter from "../components/CategoryFilter";
import SubcategoryList from "../components/SubcategoryList";
import ProductGrid from "@/components/products/ProductGrid";
import ProductDetailModal from "@/components/products/ProductDetailModal";

const CatalogPage = () => {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (categoryId && p.categoryId !== categoryId) return false;
      if (subcategory && p.subcategory !== subcategory) return false;
      return true;
    });
  }, [categoryId, subcategory]);

  const activeCategory = categories.find((c) => c.id === categoryId);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 space-y-8">

        <CategoryFilter
          categories={categories}
          selectedCategoryId={categoryId}
          onSelectCategory={(id) => {
            setCategoryId(id);
            setSubcategory(null);
          }}
        />

        {activeCategory && activeCategory.subcategories.length > 0 && (
          <SubcategoryList
            subcategories={activeCategory.subcategories}
            selected={subcategory}
            onSelect={setSubcategory}
          />
        )}

        <ProductGrid
          products={filteredProducts}
          onProductClick={setSelectedProduct}
        />

        <ProductDetailModal
          product={selectedProduct}
          open={!!selectedProduct}
          onOpenChange={(open) => !open && setSelectedProduct(null)}
        />
      </div>
    </section>
  );
};

export default CatalogPage;
