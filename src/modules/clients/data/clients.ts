import type { Client } from "@/core/domain/client";
import data from "./clients.json";

// Exportar ClientData como extensión de Client
export type ClientData = Client & {
  id: string;
  name: string;
  logo?: string;
  category?: string;
  featured?: boolean;
};

// Cargar datos del JSON
const jsonData = data as ClientData[];

// Datos de ejemplo para desarrollo
const fallbackData: ClientData[] = [
  {
    id: "1",
    name: "Empresa Ejemplo 1",
    logo: "/images/clients/client-1.png",
    category: "Tecnología",
    featured: true,
  },
  {
    id: "2",
    name: "Empresa Ejemplo 2",
    logo: "/images/clients/client-2.png",
    category: "Manufactura",
    featured: false,
  },
];

// Usar datos del JSON o los de ejemplo
export const clientsData: ClientData[] = jsonData.length > 0 ? jsonData : fallbackData;

export const getClients = (): ClientData[] => {
  return clientsData;
};

export const getFeaturedClients = (): ClientData[] => {
  return clientsData.filter((client) => client.featured);
};

export const getClientsByCategory = (category: string): ClientData[] => {
  return clientsData.filter((client) => client.category === category);
};

export const clients: ClientData[] = clientsData;
export default clients;