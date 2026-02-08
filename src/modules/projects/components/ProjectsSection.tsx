// src/modules/projects/components/ProjectsSection.tsx
import { useState, useMemo } from "react";
import {
  projects as allProjects,
  projectCategories,
  type Project,
} from "@/modules/projects/data/projects";
import ProjectGrid from "./ProjectGrid";
import ProjectDetailModal from "./ProjectDetailModal";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    if (!selectedCategory) return allProjects;
    return allProjects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? null : value);
  };

  return (
    <section id="proyectos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="section-title mb-3">Proyectos Ejecutados</h2>
          <p className="section-subtitle mx-auto mb-6 max-w-2xl">
            Algunos de nuestros trabajos más representativos en ingeniería eléctrica y energética.
          </p>
          
          {/* Filtro de categorías */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4 w-full max-w-md">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Select value={selectedCategory || "all"} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filtrar por categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los proyectos</SelectItem>
                  {projectCategories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Contador de proyectos */}
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredProjects.length} de {allProjects.length} proyectos
            {selectedCategory && ` en la categoría "${selectedCategory}"`}
          </p>
        </div>

        {/* Grid de proyectos */}
        <ProjectGrid projects={filteredProjects} onProjectClick={handleProjectClick} />

        {/* Botón para ver todos si hay filtro */}
        {selectedCategory && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              onClick={() => setSelectedCategory(null)}
              className="mx-auto"
            >
              Ver todos los proyectos
            </Button>
          </div>
        )}

        {/* Modal de detalles */}
        <ProjectDetailModal
          project={selectedProject}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;