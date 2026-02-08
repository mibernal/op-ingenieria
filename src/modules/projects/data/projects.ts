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
}

// Mantengo tu lista de categorías original
export const projectCategories: ProjectCategory[] = [
  { id: "grupos-electrogenos", name: "Grupos Electrógenos / Transferencias" },
  { id: "energia-fotovoltaica", name: "Energía Fotovoltaica" },
  { id: "ups", name: "Sistemas Ininterrumpidos de Potencia (UPS)" },
  { id: "baterias", name: "Baterías" },
  { id: "rectificadores", name: "Rectificadores - Cargadores" },
  { id: "obras-electricas", name: "Obras Eléctricas e Iluminación" },
  { id: "mantenimientos", name: "Mantenimientos" },
  { id: "aire-acondicionado", name: "Aire Acondicionado" },
  { id: "work", name: "Work / Portfolio (importado)" },
];

// Type assertion para los datos importados
export const projects: Project[] = projectsData as Project[];

export default projects;