import { cn } from "@/lib/utils";

interface SubcategoryListProps {
  subcategories: string[];
  onSelect: (sub: string | null) => void;
  selected?: string | null;
  variant?: 'default' | 'compact';
}

const SubcategoryList = ({ 
  subcategories, 
  onSelect, 
  selected, 
  variant = 'default' 
}: SubcategoryListProps) => {
  return (
    <div className={cn(
      "flex flex-wrap gap-2",
      variant === 'compact' ? 'justify-start' : 'justify-center md:justify-start'
    )}>
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "px-4 py-2 rounded-full border transition-colors",
          selected === null 
            ? "bg-accent text-accent-foreground border-accent" 
            : "bg-transparent text-foreground border-border hover:bg-secondary"
        )}
        aria-label="Mostrar todas las subcategorías"
      >
        Todos
      </button>

      {subcategories.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className={cn(
            "px-4 py-2 rounded-full border transition-colors",
            selected === s 
              ? "bg-accent text-accent-foreground border-accent" 
              : "bg-transparent text-foreground border-border hover:bg-secondary"
          )}
          aria-label={`Filtrar por ${s}`}
        >
          {s}
        </button>
      ))}
    </div>
  );
};

export default SubcategoryList;