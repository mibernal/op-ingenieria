import { useMemo } from "react";
import { X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductFiltersState {
  search: string;
  category: string;
  subcategory: string;
}

interface Props {
  value: ProductFiltersState;
  categories: { id: string; name: string }[];
  subcategories: { id: string; name: string; categoryId: string }[];
  onChange: (value: ProductFiltersState) => void;
  onReset?: () => void;
  className?: string;
}

const DEFAULT_FILTERS: ProductFiltersState = {
  search: "",
  category: "",
  subcategory: "",
};

export default function ProductFilters({
  value,
  categories,
  subcategories,
  onChange,
  onReset,
  className,
}: Props) {
  const filteredSubcategories = useMemo(() => {
    if (!value.category) return [];
    return subcategories.filter(
      (s) => s.categoryId === value.category
    );
  }, [subcategories, value.category]);

  const update = (patch: Partial<ProductFiltersState>) => {
    onChange({
      ...value,
      ...patch,
    });
  };

  const reset = () => {
    onChange(DEFAULT_FILTERS);
    onReset?.();
  };

  return (
    <div
      className={cn(
        "w-full rounded-2xl border bg-white p-4 shadow-sm md:p-6",
        className
      )}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={value.search}
            onChange={(e) => update({ search: e.target.value })}
            placeholder="Buscar productos..."
            className="h-10 w-full rounded-xl border px-9 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category */}
        <select
          value={value.category}
          onChange={(e) =>
            update({ category: e.target.value, subcategory: "" })
          }
          className="h-10 w-full rounded-xl border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Subcategory */}
        <select
          value={value.subcategory}
          onChange={(e) => update({ subcategory: e.target.value })}
          disabled={!value.category}
          className="h-10 w-full rounded-xl border px-3 text-sm disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todas las subcategorías</option>
          {filteredSubcategories.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {(value.search || value.category || value.subcategory) && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
          >
            <X className="h-4 w-4" />
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
