  // src/config/routes.ts
  export const ROUTES = {
    HOME: "/",
    CATALOG: "/catalogo", // <- mantener consistente con App.tsx
    PROJECTS: "/projects",
    CONTACT: "/contact",
    LEGAL: "/legal",
  } as const;

  export const HOME_SECTIONS = {
    HERO: "inicio",
    ABOUT: "nosotros",
    SERVICES: "servicios",
    PRODUCTS: "productos",
    PROJECTS: "proyectos",
    CLIENTS: "clientes",
    PARTNERS: "partners",
    CONTACT: "contacto",
  } as const;

  export type HomeSectionId = (typeof HOME_SECTIONS)[keyof typeof HOME_SECTIONS];

  export type NavItem = {
    label: string;
    to: string;
    type: "route" | "section";
    hash?: `#${HomeSectionId}`;
    end?: boolean;
    submenu?: { label: string; to: string; type?: "route" | "section" }[];
  };

  export const NAV_ITEMS: NavItem[] = [
    {
      label: "Inicio",
      to: ROUTES.HOME,
      type: "section",
      hash: `#${HOME_SECTIONS.HERO}`,
      end: true,
    },
    {
      label: "Nosotros",
      to: ROUTES.HOME,
      type: "section",
      hash: `#${HOME_SECTIONS.ABOUT}`,
    },
    {
      label: "Productos",
      to: ROUTES.CATALOG,
      type: "route",
      submenu: [
        { label: "Grupos Electrógenos", to: `${ROUTES.CATALOG}?cat=grupos`, type: "route" },
        { label: "UPS y Estabilizadores", to: `${ROUTES.CATALOG}?cat=ups`, type: "route" },
        { label: "Energía Solar", to: `${ROUTES.CATALOG}?cat=solar`, type: "route" },
        { label: "Tableros Eléctricos", to: `${ROUTES.CATALOG}?cat=tableros`, type: "route" },
      ],
    },
    {
      label: "Servicios",
      to: ROUTES.HOME,
      type: "section",
      hash: `#${HOME_SECTIONS.SERVICES}`,
    },
    {
      label: "Proyectos",
      to: ROUTES.PROJECTS,
      type: "route",
    },
    {
      label: "Clientes",
      to: ROUTES.HOME,
      type: "section",
      hash: `#${HOME_SECTIONS.CLIENTS}`,
    },
    {
      label: "Contacto",
      to: ROUTES.CONTACT,
      type: "route",
    },
  ];

  export const getNavHref = (item: NavItem) => {
    if (item.type === "section" && item.hash) {
      return `${ROUTES.HOME}${item.hash}`;
    }
    return item.to;
  };
