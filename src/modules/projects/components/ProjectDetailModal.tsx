// src/modules/projects/components/ProjectDetailModal.tsx

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import type { Project } from "@/modules/projects/data/projects";

interface Props {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AUTO_SLIDE_INTERVAL = 4500;

const ProjectDetailModal = ({ project, open, onOpenChange }: Props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!project || project.images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [project]);

  if (!project) return null;

  const prev = () =>
    setIndex((i) => (i === 0 ? project.images.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === project.images.length - 1 ? 0 : i + 1));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl md:text-2xl font-heading">
            {project.name}
          </DialogTitle>
        </DialogHeader>

        {/* Carrusel */}
        <div className="relative aspect-video bg-black">
          <img
            src={project.images[index]}
            alt={project.name}
            className="w-full h-full object-contain"
          />

          {project.images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>

        {/* Info */}
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{project.client}</Badge>
            <Badge variant="outline">{project.category}</Badge>
          </div>

          <div className="text-muted-foreground leading-relaxed">
            {project.description || (
              <p>
                Proyecto desarrollado por OP Ingeniería. Implementación
                completa con altos estándares técnicos, calidad industrial
                y cumplimiento normativo.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
