import { memo } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/modules/projects/data/projects";

interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  loading?: boolean;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    wide?: number;
  };
}

const ProjectGrid = memo(
  ({
    projects,
    onProjectClick,
    loading = false,
    columns = {
      mobile: 1,
      tablet: 2,
      desktop: 3,
      wide: 4,
    },
  }: ProjectGridProps) => {
    const gridClasses = `
      grid gap-4 md:gap-6
      ${columns.mobile === 1 ? "grid-cols-1" : "grid-cols-2"}
      ${columns.tablet === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}
      ${columns.desktop === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}
      ${columns.wide === 4 ? "xl:grid-cols-4" : "xl:grid-cols-5"}
    `;

    if (loading) {
      return (
        <div className={gridClasses}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted rounded-lg aspect-square mb-3" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className={gridClasses} role="grid" aria-label="Lista de proyectos">
        {projects.map((project, index) => (
          <div
            key={`${project.id}-${index}`}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
            role="gridcell"
          >
            <ProjectCard
              project={project}
              onClick={() => onProjectClick(project)}
            />
          </div>
        ))}
      </div>
    );
  }
);

ProjectGrid.displayName = "ProjectGrid";

export default ProjectGrid;
