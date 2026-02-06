// src/modules/projects/components/ProjectCard.tsx

import { type Project } from "@/modules/projects/data/projects";
import { useState } from "react";
import OptimizedImage from "@/shared/components/OptimizedImage";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => onClick(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-card rounded-lg shadow-sm border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 text-left w-full"
      aria-label={`Ver detalles de ${project.name}`}
    >
      {/* Imagen */}
      <div className="relative h-48 md:h-56 overflow-hidden rounded-t-lg bg-muted">
        <OptimizedImage
          src={project.images?.[0] || "/placeholder-project.jpg"}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          aspectRatio="square"
        />

        {/* Overlay hover */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          flex items-end p-4
        `}>
          <span className="text-white text-sm font-medium">
            Ver proyecto →
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 space-y-2">
        <h3 className="font-heading font-semibold text-card-foreground text-sm leading-tight line-clamp-2">
          {project.name}
        </h3>

        <p className="text-xs text-muted-foreground line-clamp-2">
          {project.client}
        </p>
      </div>
    </button>
  );
};

export default ProjectCard;
