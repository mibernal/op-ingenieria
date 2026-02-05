 // Project images
 import project1a from "@/assets/project-1a.jpg";
 import project2a from "@/assets/project-2a.jpg";
 import project3a from "@/assets/project-3a.jpg";
 import project4a from "@/assets/project-4a.jpg";
 import project5a from "@/assets/project-5a.jpg";
 import project6a from "@/assets/project-6a.jpg";
 
 export interface Project {
   id: string;
   name: string;
   client: string;
   category: string;
   description: string;
   images: string[];
 }
 
 export interface ProjectCategory {
   id: string;
   name: string;
 }
 
 export const projectCategories: ProjectCategory[] = [
   { id: "grupos-electrogenos", name: "Grupos Electrógenos / Transferencias" },
   { id: "energia-fotovoltaica", name: "Energía Fotovoltaica" },
   { id: "ups", name: "Sistemas Ininterrumpidos de Potencia (UPS)" },
   { id: "baterias", name: "Baterías" },
   { id: "rectificadores", name: "Rectificadores - Cargadores" },
   { id: "obras-electricas", name: "Obras Eléctricas e Iluminación" },
   { id: "mantenimientos", name: "Mantenimientos" },
   { id: "aire-acondicionado", name: "Aire Acondicionado" },
 ];
 
 export const projects: Project[] = [
   {
     id: "1",
     name: "Escuela de Suboficiales CT. ANDRÉS M. DÍAZ",
     client: "Escuela de Suboficiales",
     category: "grupos-electrogenos",
     description: "Instalación y puesta en marcha de grupo electrógeno de emergencia con transferencia automática para respaldo de energía en instalaciones militares.",
     images: [project1a, project4a],
   },
   {
     id: "2",
     name: "Aerocivil - Regional Santander",
     client: "Aerocivil",
     category: "grupos-electrogenos",
     description: "Suministro e instalación de sistema de transferencia automática y grupo electrógeno para operaciones aeroportuarias críticas.",
     images: [project4a, project1a],
   },
   {
     id: "3",
     name: "WWF Colombia",
     client: "WWF Colombia",
     category: "energia-fotovoltaica",
     description: "Implementación de sistema solar fotovoltaico para reducción de huella de carbono en oficinas administrativas.",
     images: [project2a, project6a],
   },
   {
     id: "4",
     name: "Data Center Bancolombia",
     client: "Bancolombia",
     category: "ups",
     description: "Instalación de sistema UPS modular de alta disponibilidad para protección de servidores y equipos críticos del centro de datos.",
     images: [project3a, project5a],
   },
   {
     id: "5",
     name: "Hospital San José",
     client: "Hospital San José",
     category: "baterias",
     description: "Suministro e instalación de banco de baterías de respaldo para sistemas críticos hospitalarios.",
     images: [project4a, project3a],
   },
   {
     id: "6",
     name: "Telecom Colombia",
     client: "Telecom Colombia",
     category: "rectificadores",
     description: "Instalación de sistema rectificador-cargador para alimentación de equipos de telecomunicaciones.",
     images: [project5a, project1a],
   },
   {
     id: "7",
     name: "Centro Comercial Gran Plaza",
     client: "Gran Plaza",
     category: "obras-electricas",
     description: "Diseño e instalación de sistema de iluminación LED de alta eficiencia para áreas comunes del centro comercial.",
     images: [project6a, project2a],
   },
   {
     id: "8",
     name: "Edificio Empresarial Torre Norte",
     client: "Torre Norte S.A.",
     category: "aire-acondicionado",
     description: "Instalación de sistema de aire acondicionado central con control inteligente de temperatura para oficinas corporativas.",
     images: [project6a, project3a],
   },
 ];