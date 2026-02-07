import { FC } from "react";
import OptimizedImage from "@/shared/components/OptimizedImage";
import { cn } from "@/lib/utils";
import type { Client } from "@/core/domain/client";

interface ClientCardProps {
  client: Client;
  className?: string;
}

export const ClientCard: FC<ClientCardProps> = ({ client, className }) => {
  return (
    <article 
      className={cn("p-2", className)}
      aria-label={`Cliente: ${client.name}`}
    >
      <div 
        className="bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow duration-300"
        role="region"
      >
        <div className="w-full aspect-square flex items-center justify-center p-4">
          {client.logo ? (
            <OptimizedImage
              src={client.logo}
              alt={`Logo de ${client.name}`}
              width={160}
              height={160}
              loading="lazy"
              className="max-w-full max-h-full object-contain"
              objectFit="contain"
              fallback={
                <div className="flex items-center justify-center h-full">
                  <span className="text-sm font-medium text-foreground text-center px-2">
                    {client.name}
                  </span>
                </div>
              }
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-sm font-medium text-foreground text-center px-2">
                {client.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ClientCard;