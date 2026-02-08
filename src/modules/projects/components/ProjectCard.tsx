// modules/projects/components/ProjectCard.tsx
import { type Project } from "@/modules/projects/data/projects";
import { useState } from "react";
import { 
  Card, 
  CardContent,
  CardFooter 
} from "@/components/ui/card";
import OptimizedImage from "@/shared/components/OptimizedImage";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  variant?: 'default' | 'compact';
}

export const ProjectCard = ({ project, onClick, variant = 'default' }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === 'compact') {
    return (
      <Card
        className="group cursor-pointer hover:shadow-lg transition-all duration-300"
        onClick={() => onClick(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(project);
          }
        }}
        aria-label={`Ver proyecto: ${project.name}`}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
              <OptimizedImage
                src={project.images?.[0] || "/placeholder-project.jpg"}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-semibold text-foreground line-clamp-1">
                  {project.name}
                </h3>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                {project.client}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {project.category}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl",
        "h-full flex flex-col cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      )}
      onClick={() => onClick(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
      aria-label={`Ver detalles del proyecto: ${project.name}`}
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <OptimizedImage
          src={project.images?.[0] || "/placeholder-project.jpg"}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          aspectRatio="video"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-background/90 backdrop-blur-sm text-foreground hover:bg-background">
            {project.category}
          </Badge>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <div className="bg-background/90 backdrop-blur-sm px-6 py-3 rounded-full">
            <span className="font-medium text-foreground">Ver proyecto</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6 flex-1">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground line-clamp-1 group-hover:text-accent transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {project.client}
            </p>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {project.description || "Proyecto desarrollado por OP Ingeniería con los más altos estándares de calidad."}
          </p>
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0 border-t pt-4">
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div className="text-accent font-medium flex items-center gap-1">
            Ver detalles
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;