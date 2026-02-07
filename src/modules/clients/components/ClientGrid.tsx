import { FC } from "react";
import { ClientCard } from "./ClientCard";
import type { Client } from "@/core/domain/client";
import { cn } from "@/lib/utils";

interface ClientGridProps {
  clients: Client[];
  className?: string;
  gridClassName?: string;
  isLoading?: boolean;
}

export const ClientGrid: FC<ClientGridProps> = ({
  clients,
  className,
  gridClassName,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div 
        className={cn("animate-pulse", className)} 
        role="status" 
        aria-label="Cargando clientes"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="bg-muted rounded-lg aspect-square"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!clients.length) {
    return (
      <div className={cn("text-center py-12", className)}>
        <p className="text-muted-foreground">No hay clientes para mostrar</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        className={cn(
          "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6",
          gridClassName
        )}
        role="list"
        aria-label="Lista de clientes"
      >
        {clients.map((client) => (
          <div key={client.id} role="listitem">
            <ClientCard client={client} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientGrid;