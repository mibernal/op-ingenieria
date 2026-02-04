import { Button } from "@/components/ui/button";
import { Battery, Gauge, Zap, Power, CircleDot, LayoutGrid } from "lucide-react";
import type { Category } from "@/data/products";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Battery,
  Gauge,
  Zap,
  Power,
  CircleDot,
};

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onSelectCategory(null)}
        className="gap-2"
      >
        <LayoutGrid className="h-4 w-4" />
        Todos
      </Button>
      {categories.map((category) => {
        const IconComponent = iconMap[category.icon] || CircleDot;
        return (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onSelectCategory(category.id)}
            className="gap-2"
          >
            <IconComponent className="h-4 w-4" />
            {category.name}
          </Button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
