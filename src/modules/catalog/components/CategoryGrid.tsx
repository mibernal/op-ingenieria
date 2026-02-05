import type { Category, Product } from "@/modules/catalog/data/products";
import OptimizedImage from "@/components/shared/OptimizedImage";

interface CategoryGridProps {
  categories: Category[];
  products: Product[];
  onSelectCategory: (categoryName: string) => void;
}

const CategoryGrid = ({ categories, products, onSelectCategory }: CategoryGridProps) => {
const getRepresentativeImage = (categoryId: string) => {
  const product = products.find((p) => p.categoryId === categoryId);
  return product?.images?.[0] || "/placeholder-category.jpg";
};

const getCategoryCount = (categoryId: string) => {
  return products.filter((p) => p.categoryId === categoryId).length;
};


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className="group bg-card overflow-hidden rounded-xl shadow-sm hover:shadow-md text-left transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          aria-label={`Ver productos de ${cat.name}`}
        >
          <div className="h-44 w-full overflow-hidden">
            <OptimizedImage
              src={getRepresentativeImage(cat.name) || "/placeholder-category.jpg"}
              alt={cat.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
              aspectRatio="video"
            />
          </div>

          <div className="p-4">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
              {cat.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {getCategoryCount(cat.id)} {getCategoryCount(cat.id) === 1 ? 'producto' : 'productos'}
            </p>
            {cat.subcategories.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {cat.subcategories.slice(0, 2).map((sub) => (
                  <span 
                    key={sub} 
                    className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded"
                  >
                    {sub}
                  </span>
                ))}
                {cat.subcategories.length > 2 && (
                  <span className="text-xs text-muted-foreground">
                    +{cat.subcategories.length - 2} más
                  </span>
                )}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default CategoryGrid;