import { useMemo, useState } from "react";
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

type CategoryWithAliases = ProjectCategory & { aliasesNormalized: string[] };

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
  subtitle = "Casos reales de ingeniería eléctrica y energética con resultados verificables.",
  headingLevel = "h2",
  sectionId = "proyectos",
  className,
  backgroundClassName = "bg-background",
}: ProjectsSectionProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categoriesWithAliases = useMemo<CategoryWithAliases[]>(() => {
    return projectCategories.map((category) => {
      const aliases = [category.name, category.id, ...(category.aliases ?? [])]
        .map(normalizeValue)
        .filter(Boolean);
      return {
        ...category,
        aliasesNormalized: Array.from(new Set(aliases)),
      };
    });
  }, []);

  const categoryProjectsMap = useMemo(() => {
    const map = new Map<string, Project[]>();
    categoriesWithAliases.forEach((category) => map.set(category.id, []));

    allProjects.forEach((project) => {
      const projectCategory = normalizeValue(project.category);
      const matchedCategory = categoriesWithAliases.find((category) =>
        category.aliasesNormalized.includes(projectCategory)
      );
      if (matchedCategory) {
        map.get(matchedCategory.id)?.push(project);
      }
    });

    return map;
  }, [categoriesWithAliases]);

  const selectedCategory = categoriesWithAliases.find(
    (category) => category.id === selectedCategoryId
  );
  const projectsInCategory = selectedCategoryId
    ? categoryProjectsMap.get(selectedCategoryId) ?? []
    : [];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const getCategoryImage = (categoryId: string) => {
    const projects = categoryProjectsMap.get(categoryId) ?? [];
    const projectWithImage = projects.find(
      (project) => project.images?.[0] || project.image
    );
    return (
      projectWithImage?.images?.[0] ||
      projectWithImage?.image ||
      "/placeholder-project.jpg"
    );
  };

  const getCategoryCount = (categoryId: string) => {
    return categoryProjectsMap.get(categoryId)?.length ?? 0;
  };

  const HeadingTag = headingLevel;

  return (
    <section
      id={sectionId}
      className={cn("py-16 md:py-24", backgroundClassName, className)}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <HeadingTag className="section-title mb-3">{title}</HeadingTag>
          {subtitle && <p className="section-subtitle mx-auto">{subtitle}</p>}
        </div>

        {!selectedCategoryId ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoriesWithAliases.map((category) => {
              const count = getCategoryCount(category.id);
              const image = getCategoryImage(category.id);

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategorySelect(category.id)}
                  className="group bg-card overflow-hidden rounded-xl border border-border/60 shadow-sm hover:shadow-lg text-left transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
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
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-80"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                        {count} {count === 1 ? "proyecto" : "proyectos"}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-accent/90 px-3 py-1 text-xs font-medium text-accent-foreground shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Ver casos
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-accent transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Proyectos relacionados y experiencias verificables.
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col gap-4">
              <button
                onClick={handleBackToCategories}
                className="inline-flex items-center text-sm text-accent hover:text-accent/80 transition-colors"
                aria-label="Volver a categorías"
              >
                <span className="mr-2">←</span>
                Volver a categorías
              </button>

              <div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {selectedCategory?.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {projectsInCategory.length} proyectos encontrados
                </p>
              </div>
            </div>

            <ProjectGrid
              projects={projectsInCategory}
              onProjectClick={handleProjectClick}
            />

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
