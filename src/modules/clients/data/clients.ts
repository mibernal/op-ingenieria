import type { Client } from "@/core/domain/client";
import data from "./clients.json";

export interface ClientData extends Client {
  category?: string;
  featured?: boolean;
}

// Datos mock - En producción esto vendría de una API
const clientsData: ClientData[] = [
  {
    id: "1",
    name: "Empresa Ejemplo 1",
    logo: "/images/clients/client-1.png",
    category: "Tecnología",
    featured: true,
  },
  // ... más clientes
];

export const getClients = (): ClientData[] => {
  return clientsData;
};

export const getFeaturedClients = (): ClientData[] => {
  return clientsData.filter((client) => client.featured);
};

export const getClientsByCategory = (category: string): ClientData[] => {
  return clientsData.filter((client) => client.category === category);
};

export const clients: Client[] = data as Client[];
export default clients;