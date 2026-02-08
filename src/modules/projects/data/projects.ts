// src/modules/projects/data/projects.ts
import projectsData from './projects_normalized.json';

export interface Project {
  id: string;
  name: string;
  client: string;
  category: string;
  description: string;
  images: string[];
  image?: string;
  slug?: string;
  source_id?: number;
  // Se han eliminado date y location
}

export interface ProjectCategory {
  id: string;
  name: string;
  aliases?: string[];
}

// Mantengo tu lista de categorías original
export const projectCategories: ProjectCategory[] = [
  {
    id: "grupos-electrogenos",
    name: "Grupos Electrógenos / Transferencias",
    aliases: [
      "Grupos Electrógenos / Transferencias",
      "Transferencias",
      "grupos-electrogenos",
      "grupos-electrogenos / servicios",
    ],
  },
  {
    id: "energia-fotovoltaica",
    name: "Energía Fotovoltaica",
    aliases: ["Energía Fotovoltaica", "Energía Solar"],
  },
  {
    id: "ups",
    name: "Sistemas Ininterrumpidos de Potencia (UPS)",
    aliases: ["UPS", "UPS / Servicios"],
  },
  {
    id: "baterias",
    name: "Baterías",
    aliases: ["Baterías"],
  },
  {
    id: "rectificadores",
    name: "Rectificadores - Cargadores",
    aliases: ["Rectificadores / Cargadores", "Cargadores / Transferencias / Servicios"],
  },
  {
    id: "obras-electricas",
    name: "Obras Eléctricas e Iluminación",
    aliases: ["Obras Electricas"],
  },
  {
    id: "mantenimientos",
    name: "Mantenimientos",
    aliases: ["Mantenimientos"],
  },
  {
    id: "aire-acondicionado",
    name: "Aire Acondicionado",
    aliases: ["Aire Acondicionado"],
  },
];

// Type assertion para los datos importados
export const projects: Project[] = projectsData as Project[];

export default projects;
