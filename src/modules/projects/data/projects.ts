// src/modules/projects/data/projects.ts

export interface Project {
  id: string;
  name: string;
  client: string;      // opcional: puedes conservar vacío o usar el mismo name
  category: string;    // aquí usamos "work" por defecto (puedes mapearlo luego)
  description: string; // vacío por ahora — lo puedes completar manualmente o extraer post_content
  images: string[];    // URLs absolutas a las imágenes (thumbnail + gallery)
  slug?: string;       // post_name en WP
  date?: string;       // post_date de WP
  source_id?: number;  // ID original en WP
}

export interface ProjectCategory {
  id: string;
  name: string;
}

// Mantengo tu lista de categorías original y añado 'work' como fallback
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

// Projects importados desde la DB exportada (post_type = portfolio).
// Fuentes: post list, thumbnails y attachments. :contentReference[oaicite:4]{index=4} :contentReference[oaicite:5]{index=5} :contentReference[oaicite:6]{index=6}
export const projects: Project[] = [
  {
    id: "2621",
    source_id: 2621,
    name: "Sistemas Híbridos Residenciales",
    client: "Sistemas Híbridos Residenciales",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2022/01/20200604_130123.jpg", // thumbnail
    ],
    slug: "hibridos",
    date: "2022-01-31",
  },
  {
    id: "2615",
    source_id: 2615,
    name: "CENAC",
    client: "CENAC",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2022/01/WhatsApp-Image-2021-09-30-at-14.10.15-1.jpeg",
    ],
    slug: "cenac",
    date: "2022-01-31",
  },
  {
    id: "2613",
    source_id: 2613,
    name: "Fiduprevisora",
    client: "Fiduprevisora",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2022/01/WhatsApp-Image-2021-12-11-at-15.18.41.jpeg",
    ],
    slug: "fiduprevisora",
    date: "2022-01-31",
  },
  {
    id: "2611",
    source_id: 2611,
    name: "Escuela de Suboficiales “CT. ANDRÉS M. DÍAZ”",
    client: "Escuela de Suboficiales",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2022/01/mini_20210707_140704.jpg",
    ],
    slug: "esufa-ups",
    date: "2022-01-29",
  },
  {
    id: "2609",
    source_id: 2609,
    name: "Aerocivil - Regional Norte de Santander",
    client: "Aerocivil",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2022/01/20211217_114413.jpg",
    ],
    slug: "aerocivil-santander",
    date: "2022-01-29",
  },
  {
    id: "2607",
    source_id: 2607,
    name: "WWF Colombia",
    client: "WWF Colombia",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2022/01/mini_IMG_20200929_161001.jpg",
    ],
    slug: "wwf-colombia",
    date: "2022-01-29",
  },
  {
    id: "2605",
    source_id: 2605,
    name: "Comando General de las Fuerzas Militares",
    client: "Comando General de las Fuerzas Militares",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2022/01/20211026_074520.jpg",
    ],
    slug: "comando-baterias",
    date: "2022-01-29",
  },
  {
    id: "2603",
    source_id: 2603,
    name: "Parques Nacionales Naturales - Tayrona",
    client: "Parques Nacionales Naturales",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2022/01/WhatsApp-Image-2021-06-23-at-16.42.51.jpeg",
    ],
    slug: "parques-tayrona",
    date: "2022-01-28",
  },
  {
    id: "2601",
    source_id: 2601,
    name: "Base Naval ARC “BOLÍVAR”",
    client: "Base Naval ARC “BOLÍVAR”",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2022/01/WhatsApp-Image-2021-12-20-at-15.32.13-1.jpeg",
    ],
    slug: "arc-bolivar",
    date: "2022-01-28",
  },
  {
    id: "2600",
    source_id: 2600,
    name: "Migración Colombia",
    client: "Migración Colombia",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2022/01/WhatsApp-Image-2021-10-19-at-14.44.35.jpeg",
    ],
    slug: "migracion-colombia",
    date: "2022-01-28",
  },
  {
    id: "2432",
    source_id: 2432,
    name: "Parques Nacionales Naturales de Colombia",
    client: "Parques Nacionales Naturales",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2020/12/16.jpg",
    ],
    slug: "parques-nacionales-naturales",
    date: "2020-12-17",
  },
  {
    id: "2429",
    source_id: 2429,
    name: "Policía Metropolitana de Cali",
    client: "Policía Metropolitana de Cali",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2020/12/IMG-20191111-WA0014.jpg",
    ],
    slug: "policia-cali",
    date: "2020-12-16",
  },
  {
    id: "2407",
    source_id: 2407,
    name: "Inverser Ltda",
    client: "Inverser Ltda",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2020/12/3.jpg",
    ],
    slug: "inverser-ltda",
    date: "2020-12-16",
  },
  {
    id: "1007",
    source_id: 1007,
    name: "Servicio Geologico Colombiano",
    client: "Servicio Geologico Colombiano",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2019/12/1-6.jpg",
    ],
    slug: "servicio-geologico",
    date: "2019-12-16",
  },
  {
    id: "973",
    source_id: 973,
    name: "Hospital Militar Central",
    client: "Hospital Militar Central",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2019/12/SAM_3083.jpg",
    ],
    slug: "hmc",
    date: "2019-12-16",
  },
  {
    id: "968",
    source_id: 968,
    name: "Hospital Universitario Hernando Moncaleano Perdomo",
    client: "Hospital Universitario",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2019/12/IMG-20170906-WA0016-1.jpeg",
      "https://opingenieria.com/wp-content/uploads/2019/12/1-5.jpg",
    ],
    slug: "hospital-neiva",
    date: "2019-12-16",
  },
  {
    id: "942",
    source_id: 942,
    name: "Hospital Central de la Policia",
    client: "Hospital Central de la Policia",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2019/12/20190814_104253.jpg",
    ],
    slug: "hcp",
    date: "2019-12-16",
  },
  {
    id: "926",
    source_id: 926,
    name: "Energia Integral Andina",
    client: "Energia Integral Andina",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2019/12/CIMG03233-1.jpg",
    ],
    slug: "eia",
    date: "2019-12-16",
  },
  {
    id: "923",
    source_id: 923,
    name: "Emec",
    client: "Emec",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2019/12/2-2.jpg",
    ],
    slug: "emec",
    date: "2019-12-14",
  },
  {
    id: "909",
    source_id: 909,
    name: "Corpochivor",
    client: "Corpochivor",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2019/12/1-3.jpg",
    ],
    slug: "corpochivor",
    date: "2019-12-14",
  },
  {
    id: "885",
    source_id: 885,
    name: "Coordinadora Mercantil",
    client: "Coordinadora Mercantil",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2019/12/1-1.jpg",
    ],
    slug: "coordinadora-mercantil",
    date: "2019-12-14",
  },
  {
    id: "874",
    source_id: 874,
    name: "Rama Judicial",
    client: "Rama Judicial",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2019/12/7.jpg",
    ],
    slug: "rama-judicial",
    date: "2019-12-13",
  },
  {
    id: "206",
    source_id: 206,
    name: "Banco Agrario",
    client: "Banco Agrario",
    category: "work",
    description: "",
    images: [
      "http://wordpress.opingenieria.com/wp-content/uploads/2018/03/IMG-20180314-WA0013.jpg",
    ],
    slug: "banco-agrario",
    date: "2018-03-21",
  },
  {
    id: "193",
    source_id: 193,
    name: "Medicina Legal",
    client: "Medicina Legal",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2019/11/1.jpg",
    ],
    slug: "medicina-legal",
    date: "2018-02-16",
  },
  {
    id: "190",
    source_id: 190,
    name: "Mantenimientos",
    client: "Mantenimientos",
    category: "work",
    description: "",
    images: [
      "http://wordpress.opingenieria.com/wp-content/uploads/2018/02/20170523_104134-1.jpeg",
      "http://wordpress.opingenieria.com/wp-content/uploads/2018/02/20170523_104134-1-1.jpeg",
    ],
    slug: "mantenimientos",
    date: "2018-02-16",
  },
  {
    id: "186",
    source_id: 186,
    name: "Aerocivil - Regional Atlántico",
    client: "Aerocivil",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2019/09/IMG-20190604-WA0177-1.jpg",
    ],
    slug: "aerocivil",
    date: "2018-02-16",
  },
  {
    id: "185",
    source_id: 185,
    name: "Presidencia de la Republica",
    client: "Presidencia de la Republica",
    category: "work",
    description: "",
    images: [
      "https://opingenieria.com/wp-content/uploads/2019/12/20190727_100046.jpg",
    ],
    slug: "presidencia-republica",
    date: "2018-02-16",
  },
];
