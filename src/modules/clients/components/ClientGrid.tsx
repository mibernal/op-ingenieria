// modules/clients/components/ClientGrid.tsx - CORREGIDO
import { FC, useState, useMemo } from "react";
import { ClientCard } from "./ClientCard";
import type { Client } from "@/core/domain/client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input"; // CORREGIR RUTA
import { Button } from "@/components/ui/button"; // CORREGIR RUTA
import { Search, Filter, X, Grid3x3, List, Building2 } from "lucide-react"; // AÑADIR Building2
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // CORREGIR RUTA

// Tipo extendido para clientes
interface ExtendedClient extends Client {
  category?: string;
  featured?: boolean;
}

interface ClientGridProps {
  clients: ExtendedClient[]; // USAR ExtendedClient
  className?: string;
  isLoading?: boolean;
  showFilters?: boolean;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export const ClientGrid: FC<ClientGridProps> = ({
  clients,
  className,
  isLoading = false,
  showFilters = true,
  viewMode = 'grid',
  onViewModeChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFeatured, setShowFeatured] = useState(false);

  // Extraer categorías únicas
  const categories = useMemo(() => {
    const cats = clients
      .map(c => c.category)
      .filter((cat): cat is string => !!cat); // Type guard para filtrar undefined
    return ['all', ...Array.from(new Set(cats))];
  }, [clients]);

  // Filtrar clientes
  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      // Buscar por nombre
      const matchesSearch = !searchTerm || 
        client.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtrar por categoría
      const matchesCategory = selectedCategory === 'all' || 
        client.category === selectedCategory;
      
      // Filtrar destacados
      const matchesFeatured = !showFeatured || client.featured;
      
      return matchesSearch && matchesCategory && matchesFeatured;
    });
  }, [clients, searchTerm, selectedCategory, showFeatured]);

  if (isLoading) {
    return (
      <div className={cn("animate-pulse", className)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="aspect-[4/3] bg-muted rounded-lg" />
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const hasFilters = searchTerm || selectedCategory !== 'all' || showFeatured;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Filtros */}
      {showFilters && (
        <div className="bg-card rounded-xl border p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Barra de búsqueda */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Controles de vista */}
            <div className="flex items-center gap-2">
              {onViewModeChange && (
                <div className="flex items-center gap-1 border rounded-lg p-1">
                  <Button
                    size="sm"
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    onClick={() => onViewModeChange('grid')}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    onClick={() => onViewModeChange('list')}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Selector de categoría */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'Todas las categorías' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Filtro destacados */}
              <Button
                variant={showFeatured ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFeatured(!showFeatured)}
              >
                Destacados
              </Button>
            </div>
          </div>

          {/* Resumen de filtros */}
          {hasFilters && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                {filteredClients.length} de {clients.length} clientes
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setShowFeatured(false);
                }}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Contenido */}
      {filteredClients.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">No se encontraron clientes</h3>
            <p className="text-muted-foreground">
              {hasFilters 
                ? "Intenta con otros filtros de búsqueda"
                : "No hay clientes para mostrar"}
            </p>
          </div>
          {hasFilters && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setShowFeatured(false);
              }}
            >
              Ver todos los clientes
            </Button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              featured={client.featured}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="w-16 h-16 flex-shrink-0">
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{client.name}</h3>
                {client.category && (
                  <p className="text-sm text-muted-foreground">{client.category}</p>
                )}
              </div>
              {client.featured && (
                <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
                  Destacado
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientGrid;