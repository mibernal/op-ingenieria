// src/modules/projects/components/ProjectsExplorer.tsx
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  projects as allProjects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/modules/projects/data/projects";
import ProjectGrid from "./ProjectGrid";
import ProjectDetailModal from "./ProjectDetailModal";
import OptimizedImage from "@/shared/components/OptimizedImage";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2";
type CategoryWithAliases = ProjectCategory & {
  aliasesNormalized: string[];
  subcategories: string[];
};

interface ProjectsExplorerProps {
  title?: string;
  subtitle?: string;
  headingLevel?: HeadingLevel;
  sectionId?: string;
  className?: string;
  backgroundClassName?: string;
}

const normalizeValue = (value?: string) => {
  if (!value) return "";
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
};

const SubcatChip = ({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "rounded-full px-4 py-2 text-sm border transition-colors",
      active
        ? "bg-accent/10 border-accent/30 text-accent"
        : "bg-background border-border/60 hover:bg-muted/30"
    )}
  >
    {label}
  </button>
);

export default function ProjectsExplorer({
  title = "Proyectos Ejecutados",
  subtitle = "Casos reales de energía y respaldo: plantas, solar y soluciones eléctricas implementadas con resultados verificables.",
  headingLevel = "h2",
  sectionId = "proyectos",
  className,
  backgroundClassName = "bg-background",
}: ProjectsExplorerProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCat = searchParams.get("cat");
  const urlSubcat = searchParams.get("subcat");

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1) Categorías + aliases + subcats (derivadas de proyectos por "category/sub")
  const categoriesWithAliases = useMemo<CategoryWithAliases[]>(() => {
    const aliasToCategoryId = new Map<string, string>();

    for (const category of projectCategories) {
      const aliases = [category.name, category.id, ...(category.aliases ?? [])]
        .map(normalizeValue)
        .filter(Boolean);

      for (const a of aliases) {
        if (!aliasToCategoryId.has(a)) aliasToCategoryId.set(a, category.id);
      }
    }

    const subcatsById = new Map<string, Set<string>>();
    const addSub = (id: string, s: string) => {
      const v = String(s || "").trim();
      if (!v) return;
      if (!subcatsById.has(id)) subcatsById.set(id, new Set());
      subcatsById.get(id)!.add(v);
    };

    for (const p of allProjects) {
      const rawCat = String(p.category ?? "").trim();
      if (!rawCat) continue;

      const parts = rawCat.split("/").map((x) => x.trim()).filter(Boolean);
      const base = parts[0] ?? rawCat;
      const rest = parts.slice(1);

      const keyFull = normalizeValue(rawCat);
      const keyBase = normalizeValue(base);

      const catId = aliasToCategoryId.get(keyFull) ?? aliasToCategoryId.get(keyBase);
      if (!catId) continue;

      rest.forEach((r) => addSub(catId, r));
    }

    return projectCategories.map((category) => {
      const aliases = [category.name, category.id, ...(category.aliases ?? [])]
        .map(normalizeValue)
        .filter(Boolean);

      return {
        ...category,
        aliasesNormalized: Array.from(new Set(aliases)),
        subcategories: Array.from(subcatsById.get(category.id) ?? new Set<string>()),
      };
    });
  }, []);

  // 2) Index alias -> categoryId (para mapear proyectos rápido)
  const aliasToCategoryId = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of categoriesWithAliases) {
      for (const a of c.aliasesNormalized) {
        if (!map.has(a)) map.set(a, c.id);
      }
    }
    return map;
  }, [categoriesWithAliases]);

  // 3) Map categoryId -> projects[]
  const categoryProjectsMap = useMemo(() => {
    const map = new Map<string, Project[]>();
    categoriesWithAliases.forEach((c) => map.set(c.id, []));

    for (const p of allProjects) {
      const projectCategoryNorm = normalizeValue(p.category);
      const matchedCategoryId = aliasToCategoryId.get(projectCategoryNorm);
      if (matchedCategoryId) map.get(matchedCategoryId)?.push(p);
    }

    return map;
  }, [categoriesWithAliases, aliasToCategoryId]);

  // ✅ Sync con URL (?cat=)
  useEffect(() => {
    if (!urlCat) {
      setSelectedCategoryId(null);
      return;
    }
    const exists = categoriesWithAliases.some((c) => c.id === urlCat);
    setSelectedCategoryId(exists ? urlCat : null);
  }, [urlCat, categoriesWithAliases]);

  const selectedCategory = useMemo(
    () => categoriesWithAliases.find((c) => c.id === selectedCategoryId) ?? null,
    [categoriesWithAliases, selectedCategoryId]
  );

  const projectsInCategory = selectedCategoryId
    ? categoryProjectsMap.get(selectedCategoryId) ?? []
    : [];

  // ✅ subcats disponibles (ordenadas)
  const availableSubcats = useMemo(() => {
    const subs = selectedCategory?.subcategories ?? [];
    return subs.slice().sort((a, b) => a.localeCompare(b, "es"));
  }, [selectedCategory]);

  // ✅ filtro opcional por subcat
  const visibleProjects = useMemo(() => {
    if (!urlSubcat) return projectsInCategory;
    const target = String(urlSubcat).trim();
    return projectsInCategory.filter((p) => {
      const parts = String(p.category ?? "").split("/").map((x) => x.trim());
      return parts.includes(target);
    });
  }, [projectsInCategory, urlSubcat]);

  const setUrlCat = (categoryId: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("cat", categoryId);
      next.delete("subcat");
      return next;
    });
  };

  const setUrlSubcat = (subcat: string | null) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (subcat) next.set("subcat", subcat);
      else next.delete("subcat");
      return next;
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedProject(null);
    setIsModalOpen(false);
    setUrlCat(categoryId);
  };

  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
    setSelectedProject(null);
    setIsModalOpen(false);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("cat");
      next.delete("subcat");
      return next;
    });
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const getCategoryImage = (categoryId: string) => {
    const ps = categoryProjectsMap.get(categoryId) ?? [];
    const p0 = ps.find((p) => p.images?.[0] || p.image);
    return p0?.images?.[0] || p0?.image || "/placeholder-project.jpg";
  };

  const HeadingTag = headingLevel;

  return (
    <section
      id={sectionId}
      className={cn("relative py-0 md:py-10", backgroundClassName, className)}
    >
      <div
        className="absolute inset-x-0 top-0 -z-10 h-16 bg-gradient-to-b from-background/60 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-16 bg-gradient-to-t from-background/60 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <HeadingTag className="section-title mt-2">{title}</HeadingTag>
          {subtitle ? (
            <p className="mt-2 text-sm md:text-base text-muted-foreground">{subtitle}</p>
          ) : null}
          <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        </div>

        {!selectedCategoryId ? (
          // =========================
          // GRID CATEGORÍAS (SOLO VISUAL AJUSTADO)
          // =========================
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoriesWithAliases.map((category) => {
              const image = getCategoryImage(category.id);
              const count = categoryProjectsMap.get(category.id)?.length ?? 0;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategorySelect(category.id)}
                  className={cn(
                    "group text-left rounded-3xl overflow-hidden",
                    "border border-border/60 bg-card/80 backdrop-blur-md",
                    "shadow-sm shadow-black/5 transition-all duration-300",
                    "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 hover:border-primary/25",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  )}
                  aria-label={`Ver proyectos de ${category.name}`}
                >
                  {/* Imagen con overlay suave (sin CTAs) */}
                  <div className="relative overflow-hidden">
                    <OptimizedImage
                      src={image}
                      alt={category.name}
                      className="w-full"
                      aspectRatio="video"
                      objectFit="cover"
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div
                      className={cn(
                        "absolute inset-0",
                        "bg-gradient-to-t from-black/40 via-black/10 to-transparent"
                      )}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Cuerpo tipo Clients/About */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>

                      {/* Micro badge de cantidad (opcional, sin “ver casos”) */}
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2.5 py-1 text-xs",
                          "border border-border/60 bg-background/40 text-muted-foreground"
                        )}
                        aria-label={`${count} proyectos`}
                        title={`${count} proyectos`}
                      >
                        {count}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      Implementaciones reales enfocadas en respaldo, eficiencia y continuidad operativa.
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          // =========================
          // DETALLE CATEGORÍA + FILTRO SUBCAT + GRID
          // =========================
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <button
                onClick={handleBackToCategories}
                className={cn(
                  "inline-flex w-fit items-center gap-2 rounded-full",
                  "border border-border/60 bg-card/70 px-3.5 py-2",
                  "text-sm text-foreground/90 shadow-sm shadow-black/5",
                  "transition-all duration-300 hover:bg-card hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                )}
                aria-label="Volver a categorías"
              >
                <span aria-hidden className="text-muted-foreground">←</span>
                <span className="font-medium">Volver a categorías</span>
              </button>

              <div>
                <p className="text-xs tracking-[0.22em] text-muted-foreground">CATEGORÍA</p>
                <h3 className="mt-2 text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {selectedCategory?.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">Proyectos relacionados con esta categoría.</p>
              </div>

              {/* Filtro subcategorías (mantiene lógica) */}
              {availableSubcats.length > 0 ? (
                <div className="rounded-3xl border border-border/60 bg-card/70 backdrop-blur-md p-5 shadow-sm shadow-black/5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">Filtra por tipo</div>
                      <div className="mt-1 font-semibold">Subcategorías</div>
                    </div>

                    {(urlSubcat || urlCat) && (
                      <button
                        type="button"
                        onClick={() => setUrlSubcat(null)}
                        className="text-sm text-accent hover:text-accent/80 transition-colors md:self-start"
                      >
                        Limpiar filtro
                      </button>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <SubcatChip active={!urlSubcat} label="Todos" onClick={() => setUrlSubcat(null)} />
                    {availableSubcats.map((s) => (
                      <SubcatChip
                        key={s}
                        active={urlSubcat === s}
                        label={s}
                        onClick={() => setUrlSubcat(s)}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="h-px w-full bg-border/60" />
            </div>

            <ProjectGrid projects={visibleProjects} onProjectClick={handleProjectClick} />

            <ProjectDetailModal
              project={selectedProject}
              open={isModalOpen}
              onOpenChange={(open) => {
                setIsModalOpen(open);
                if (!open) setSelectedProject(null);
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
