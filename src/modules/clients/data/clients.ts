// src/modules/clients/data/clients.ts
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

const jsonData = (Array.isArray(data) ? (data as ClientData[]) : []) satisfies ClientData[];

// Datos de ejemplo SOLO en desarrollo
const fallbackData: ClientData[] = [
  {
    id: "dev-1",
    name: "Empresa Ejemplo 1",
    logo: "images/clients/client-1.png",
    category: "Tecnología",
    featured: true,
  },
  {
    id: "dev-2",
    name: "Empresa Ejemplo 2",
    logo: "images/clients/client-2.png",
    category: "Manufactura",
    featured: false,
  },
];

// Normaliza logos para GH Pages (BASE_URL)
const normalizeClient = (c: ClientData): ClientData => ({
  ...c,
  logo: c.logo ? publicAsset(c.logo) : undefined,
});

const raw: ClientData[] =
  jsonData.length > 0 ? jsonData : (import.meta.env.DEV ? fallbackData : []);

export const clients: ClientData[] = raw.map(normalizeClient);

export const getClients = (): ClientData[] => clients;

export const getFeaturedClients = (): ClientData[] => clients.filter((c) => c.featured);

export const getClientsByCategory = (category: string): ClientData[] =>
  clients.filter((c) => c.category === category);

export default clients;
