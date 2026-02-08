import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Building2 } from "lucide-react";
import { useState, useEffect } from "react";
import type { Project } from "@/modules/projects/data/projects";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProjectDetailModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AUTO_SLIDE_INTERVAL = 5000;

export const ProjectDetailModal = ({ project, open, onOpenChange }: ProjectDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!project || project.images.length <= 1 || !isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [project, isAutoPlaying]);

  useEffect(() => {
    // Resetear índice cuando cambia el proyecto
    setCurrentImageIndex(0);
  }, [project]);

  if (!project) return null;

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
    setIsAutoPlaying(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-6xl max-h-[90vh] overflow-y-auto p-0 gap-0"
        aria-describedby="project-description"
      >
        {/* DialogHeader se encarga del botón de cerrar automáticamente */}
        <DialogHeader className="px-6 pt-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl md:text-3xl font-heading font-bold">
                {project.name}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">
                  <Building2 className="w-3 h-3 mr-1" />
                  {project.client}
                </Badge>
                <Badge variant="outline">
                  {project.category}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Carrusel de imágenes */}
        <div className="relative mt-6">
          <div className="relative aspect-video bg-muted">
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.name} - Imagen ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
              loading="lazy"
            />

            {project.images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Indicadores */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setIsAutoPlaying(false);
                      }}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        index === currentImageIndex
                          ? "bg-primary w-6"
                          : "bg-primary/50 hover:bg-primary/80"
                      )}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Contador */}
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
                  {currentImageIndex + 1} / {project.images.length}
                </div>
              </>
            )}
          </div>

          {/* Miniaturas */}
          {project.images.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {project.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className={cn(
                    "flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all",
                    index === currentImageIndex
                      ? "border-accent"
                      : "border-transparent hover:border-muted-foreground/30"
                  )}
                  aria-label={`Ver imagen ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del proyecto */}
        <div className="p-6 space-y-6">
          {/* Descripción */}
          <Card className="p-6" id="project-description">
            <h3 className="text-lg font-semibold mb-3">Descripción del Proyecto</h3>
            <p className="text-muted-foreground leading-relaxed">
              {project.description || "Proyecto desarrollado por OP Ingeniería. Implementación completa con altos estándares técnicos, calidad industrial y cumplimiento normativo."}
            </p>
          </Card>

          {/* Detalles */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Building2 className="w-4 h-4" />
                <span>Cliente</span>
              </div>
              <p className="font-medium">{project.client}</p>
            </Card>

            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">
                <span>Categoría</span>
              </div>
              <p className="font-medium">{project.category}</p>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;