import type { Client } from "@/core/domain/client";
import data from "./clients.json";
import { publicAsset } from "@/lib/assets";

export type ClientData = Client & {
  id: string;
  name: string;
  logo?: string;
  category?: string;
  featured?: boolean;
};

const jsonData = data as ClientData[];

// Datos de ejemplo para desarrollo
const fallbackData: ClientData[] = [
  {
    id: "1",
    name: "Empresa Ejemplo 1",
    logo: "images/clients/client-1.png",
    category: "Tecnología",
    featured: true,
  },
  {
    id: "2",
    name: "Empresa Ejemplo 2",
    logo: "images/clients/client-2.png",
    category: "Manufactura",
    featured: false,
  },
];

// ✅ Normaliza logos para GH Pages (BASE_URL)
const normalizeClient = (c: ClientData): ClientData => ({
  ...c,
  logo: c.logo ? publicAsset(c.logo) : undefined,
});

const raw = (jsonData.length > 0 ? jsonData : fallbackData) as ClientData[];

export const clientsData: ClientData[] = raw.map(normalizeClient);

export const getClients = (): ClientData[] => clientsData;

export const getFeaturedClients = (): ClientData[] =>
  clientsData.filter((client) => client.featured);

export const getClientsByCategory = (category: string): ClientData[] =>
  clientsData.filter((client) => client.category === category);

export const clients: ClientData[] = clientsData;

export default clients;
