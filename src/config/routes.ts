// src/config/routes.ts
export const ROUTES = {
  HOME: "/",
  CATALOG: "/catalogo",
  PROJECTS: "/projects",
  CONTACT: "/contact",
  LEGAL: "/legal",
  ABOUT: "/nosotros",
  SERVICES: "/servicios",
  CLIENTS: "/clientes",
  PARTNERS: "/partners",
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
  submenu?: NavItem[];
};

export const getNavHref = (item: NavItem) => {
  if (item.type === "section" && item.hash) return `${ROUTES.HOME}${item.hash}`;
  return item.to;
};

const q = (s: string) => encodeURIComponent(String(s ?? "").trim());
const sortEs = (a: string, b: string) => a.localeCompare(b, "es", { sensitivity: "base" });

/** ✅ Catalog querystring */
export const getCatalogCategoryHref = (categoryId: string) => `${ROUTES.CATALOG}?cat=${q(categoryId)}`;
export const getCatalogSubcategoryHref = (categoryId: string, subcategory: string) =>
  `${ROUTES.CATALOG}?cat=${q(categoryId)}&subcat=${q(subcategory)}`;

/** ✅ Projects querystring */
export const getProjectCategoryHref = (categoryId: string) => `${ROUTES.PROJECTS}?cat=${q(categoryId)}`;
export const getProjectSubcategoryHref = (categoryId: string, subcategory: string) =>
  `${ROUTES.PROJECTS}?cat=${q(categoryId)}&subcat=${q(subcategory)}`;

/** ✅ Menú category genérico (con subcategories opcionales) */
export type MenuCategory = {
  id: string;
  name: string;
  subcategories?: string[];
};

/** Dedupe + normaliza + ordena */
const normalizeCategories = (categories: MenuCategory[]) => {
  const map = new Map<string, MenuCategory>();

  for (const c of categories || []) {
    const id = String(c?.id ?? "").trim();
    const name = String(c?.name ?? "").trim();
    if (!id || !name) continue;

    if (!map.has(id)) {
      map.set(id, {
        ...c,
        id,
        name,
        subcategories: Array.isArray(c.subcategories) ? c.subcategories : [],
      });
      continue;
    }

    const prev = map.get(id)!;
    const nextSubs = [
      ...(prev.subcategories ?? []),
      ...(Array.isArray(c.subcategories) ? c.subcategories : []),
    ]
      .map((s) => String(s).trim())
      .filter(Boolean);

    prev.subcategories = Array.from(new Set(nextSubs));
    map.set(id, prev);
  }

  return Array.from(map.values()).sort((a, b) => sortEs(a.name, b.name));
};

const buildCategoryMenu = (opts: {
  categories: MenuCategory[];
  toCategory: (id: string) => string;
  toSubcategory: (id: string, sub: string) => string;
}): NavItem[] => {
  const normalized = normalizeCategories(opts.categories);

  return normalized.map((c) => {
    const subs = (c.subcategories ?? [])
      .map((s) => String(s).trim())
      .filter(Boolean)
      .sort(sortEs);

    const submenu: NavItem[] | undefined =
      subs.length > 0
        ? subs.map((sub) => ({
            label: sub,
            to: opts.toSubcategory(c.id, sub),
            type: "route",
          }))
        : undefined;

    return {
      label: c.name,
      to: opts.toCategory(c.id),
      type: "route",
      submenu,
    };
  });
};

export const buildNavItems = (input?: {
  productCategories?: MenuCategory[];
  projectCategories?: MenuCategory[];
}): NavItem[] => {
  const productsSubmenu = buildCategoryMenu({
    categories: input?.productCategories ?? [],
    toCategory: getCatalogCategoryHref,
    toSubcategory: getCatalogSubcategoryHref,
  });

  const projectsSubmenu = buildCategoryMenu({
    categories: input?.projectCategories ?? [],
    toCategory: getProjectCategoryHref,
    toSubcategory: getProjectSubcategoryHref,
  });

  return [
    // Inicio se mantiene como sección en landing
    {
      label: "Inicio",
      to: ROUTES.HOME,
      type: "section",
      hash: `#${HOME_SECTIONS.HERO}`,
      end: true,
    },

    // ✅ Directo a página (sin “Resumen”)
    { label: "Nosotros", to: ROUTES.ABOUT, type: "route" },

    // Productos (page) + submenu dinámico
    {
      label: "Productos",
      to: ROUTES.CATALOG,
      type: "route",
      submenu: productsSubmenu.length
        ? productsSubmenu
        : [{ label: "Ver catálogo", to: ROUTES.CATALOG, type: "route" }],
    },

    // ✅ Directo a página (sin “Resumen”)
    { label: "Servicios", to: ROUTES.SERVICES, type: "route" },

    // Proyectos (page) + submenu dinámico
    {
      label: "Proyectos",
      to: ROUTES.PROJECTS,
      type: "route",
      submenu: projectsSubmenu.length
        ? projectsSubmenu
        : [{ label: "Ver proyectos", to: ROUTES.PROJECTS, type: "route" }],
    },

    // ✅ Directo a página
    { label: "Clientes", to: ROUTES.CLIENTS, type: "route" },

    // ✅ Directo a página (arregla el comportamiento esperado)
    { label: "Partners", to: ROUTES.PARTNERS, type: "route" },

    // Contacto (page)
    { label: "Contacto", to: ROUTES.CONTACT, type: "route" },
  ];
};

// compat
export const NAV_ITEMS: NavItem[] = buildNavItems();
