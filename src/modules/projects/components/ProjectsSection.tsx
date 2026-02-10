// src/modules/projects/components/ProjectsSection.tsx
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
type CategoryWithAliases = ProjectCategory & { aliasesNormalized: string[]; subcategories: string[] };

interface ProjectsSectionProps {
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

const ProjectsSection = ({
  title = "Proyectos Ejecutados",
  subtitle = "Casos reales de energía y respaldo: plantas, solar y soluciones eléctricas implementadas con resultados verificables.",
  headingLevel = "h2",
  sectionId = "proyectos",
  className,
  backgroundClassName = "bg-background",
}: ProjectsSectionProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCat = searchParams.get("cat");     // <- ej: rectificadores
  const urlSubcat = searchParams.get("subcat"); // <- opcional

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1) Categorías con aliases normalizados + subcats derivadas
  const categoriesWithAliases = useMemo<CategoryWithAliases[]>(() => {
    // alias -> categoryId
    const aliasToCategoryId = new Map<string, string>();
    for (const category of projectCategories) {
      const aliases = [category.name, category.id, ...(category.aliases ?? [])]
        .map(normalizeValue)
        .filter(Boolean);
      for (const a of aliases) if (!aliasToCategoryId.has(a)) aliasToCategoryId.set(a, category.id);
    }

    // subcats reales por categoría desde allProjects (split "/")
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
      if (normalizeValue(rawCat) === "transferencias") addSub(catId, "Transferencias");
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

  // 2) Index alias -> categoryId (evita find() por cada proyecto)
  const aliasToCategoryId = useMemo(() => {
    const map = new Map<string, string>();
    for (const category of categoriesWithAliases) {
      for (const alias of category.aliasesNormalized) {
        if (!map.has(alias)) map.set(alias, category.id);
      }
    }
    return map;
  }, [categoriesWithAliases]);

  // 3) Map categoryId -> projects[]
  const categoryProjectsMap = useMemo(() => {
    const map = new Map<string, Project[]>();
    categoriesWithAliases.forEach((category) => map.set(category.id, []));

    for (const project of allProjects) {
      const projectCategory = normalizeValue(project.category);
      const matchedCategoryId = aliasToCategoryId.get(projectCategory);
      if (matchedCategoryId) map.get(matchedCategoryId)?.push(project);
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

  // ✅ filtro opcional por subcat (/ en category)
  const visibleProjects = useMemo(() => {
    if (!urlSubcat) return projectsInCategory;
    const target = String(urlSubcat).trim();
    return projectsInCategory.filter((p) => {
      const parts = String(p.category ?? "").split("/").map((x) => x.trim());
      return parts.includes(target);
    });
  }, [projectsInCategory, urlSubcat]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedProject(null);
    setIsModalOpen(false);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("cat", categoryId);
      next.delete("subcat");
      return next;
    });
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
    <section id={sectionId} className={cn("relative py-10 md:py-14", backgroundClassName, className)}>
      <div className="absolute inset-x-0 top-0 -z-10 h-16 bg-gradient-to-b from-background/60 via-transparent to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-16 bg-gradient-to-t from-background/60 via-transparent to-transparent" aria-hidden="true" />

      <div className="container mx-auto px-4">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <HeadingTag className="section-title mt-2">{title}</HeadingTag>
          {subtitle ? <p className="mt-2 text-sm md:text-base text-muted-foreground">{subtitle}</p> : null}
          <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        </div>

        {!selectedCategoryId ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoriesWithAliases.map((category) => {
              const image = getCategoryImage(category.id);

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategorySelect(category.id)}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl text-left",
                    "border border-border/60 bg-card/70 backdrop-blur-md",
                    "shadow-sm shadow-black/5 transition-all duration-300",
                    "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 hover:border-primary/25",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  )}
                  aria-label={`Ver proyectos de ${category.name}`}
                >
                  <div className="relative overflow-hidden">
                    <OptimizedImage
                      src={image}
                      alt={category.name}
                      className="w-full"
                      aspectRatio="video"
                      objectFit="cover"
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-85" aria-hidden="true" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-full bg-primary/85 px-3 py-1 text-xs font-medium text-primary-foreground shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Ver casos
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Implementaciones reales enfocadas en respaldo, eficiencia y continuidad operativa.
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
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
                <p className="mt-1 text-sm text-muted-foreground">
                  Proyectos relacionados con esta categoría.
                </p>
              </div>

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
};

export default ProjectsSection;
