// modules/clients/components/ClientCard.tsx - CORREGIDO
import { FC } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import OptimizedImage from "@/shared/components/OptimizedImage";
import { cn } from "@/lib/utils";
import type { Client } from "@/core/domain/client";
import { Building2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Tipo extendido para clientes con propiedades adicionales
interface ExtendedClient extends Client {
  category?: string;
  featured?: boolean;
}

interface ClientCardProps {
  client: ExtendedClient; // USAR ExtendedClient EN LUGAR DE Client
  className?: string;
  featured?: boolean;
  onClick?: (client: ExtendedClient) => void;
}

export const ClientCard: FC<ClientCardProps> = ({ 
  client, 
  className, 
  featured = false,
  onClick 
}) => {
  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg",
        "cursor-pointer hover:border-accent/50",
        "h-full flex flex-col",
        onClick && "cursor-pointer",
        className
      )}
      onClick={() => onClick?.(client)}
      role={onClick ? "button" : "article"}
      aria-label={`Cliente: ${client.name}`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600">
            <Star className="w-3 h-3 fill-current mr-1" />
            Destacado
          </Badge>
        </div>
      )}

      {/* Category Badge */}
      {client.category && (
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            {client.category}
          </Badge>
        </div>
      )}

      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="relative w-full aspect-[4/3] flex items-center justify-center p-6 bg-gradient-to-br from-secondary/30 to-transparent rounded-lg overflow-hidden group-hover:from-secondary/40 transition-colors mb-4">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[size:20px_20px]" />
          </div>

          {client.logo ? (
            <div className="relative z-10 w-full h-full">
              <OptimizedImage
                src={client.logo}
                alt={`Logo de ${client.name}`}
                width={200}
                height={150}
                loading="lazy"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                fallback={
                  <div className="flex flex-col items-center justify-center h-full gap-2">
                    <Building2 className="w-12 h-12 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground text-center">
                      {client.name}
                    </span>
                  </div>
                }
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <span className="text-base font-semibold text-foreground text-center">
                {client.name}
              </span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
            <span className="text-sm font-medium text-foreground bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
              Ver detalles
            </span>
          </div>
        </div>

        {/* Client Info */}
        <div className="text-center mt-auto">
          <h3 className="font-semibold text-foreground line-clamp-1 mb-1">
            {client.name}
          </h3>
          {client.category && (
            <p className="text-sm text-muted-foreground">
              {client.category}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientCard;