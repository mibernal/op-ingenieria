// src/modules/projects/components/ProjectsSection.tsx

import { useState, useMemo, lazy, Suspense } from "react";
import {
  projects as allProjects,
  projectCategories,
  type Project,
} from "@/modules/projects/data/projects";
import ProjectGrid from "./ProjectGrid";
import ProjectDetailModal from "./ProjectDetailModal";

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    if (!selectedCategory) return allProjects;
    return allProjects.filter(
      (p) => p.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <section id="proyectos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-4">
          Proyectos Ejecutados
        </h2>
        <p className="section-subtitle text-center mx-auto mb-10">
          Algunos de nuestros trabajos más representativos.
        </p>

        <ProjectGrid
          projects={filteredProjects}
          onProjectClick={(project) => {
            setSelectedProject(project);
            setIsModalOpen(true);
          }}
        />

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
