import { Button } from "@/components/ui/button";
import { Battery, Gauge, Zap, Power, CircleDot, LayoutGrid } from "lucide-react";
import type { Category } from "@/modules/catalog/data/products";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
  variant?: "default" | "compact";
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
  selectedCategoryId,
  onSelectCategory,
  variant = 'default',
}: CategoryFilterProps) => {
  return (
    <div className={`flex ${variant === 'compact' ? 'flex-col gap-2' : 'flex-wrap justify-center gap-2 md:gap-3'}`}>
      <Button
        variant={selectedCategoryId === null ? "default" : "outline"}
        size={variant === 'compact' ? 'sm' : 'default'}
        onClick={() => onSelectCategory(null)}
        className="gap-2"
        aria-label="Mostrar todos los productos"
      >
        <LayoutGrid className="h-4 w-4" />
        Todos
      </Button>
      
{categories.map((category) => {
  const Icon = iconMap[category.icon as unknown as string] || CircleDot;

  return (
    <Button
      key={category.id}
      variant={selectedCategoryId === category.id ? "default" : "outline"}
      onClick={() => onSelectCategory(category.id)}
      className="gap-2"
    >
      <Icon className="h-4 w-4" />
      {category.name}
    </Button>
  );
})}
    </div>
  );
};

export default CategoryFilter;