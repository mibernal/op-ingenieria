// src/modules/projects/components/ProjectDetailModal.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Building2,
  FolderKanban,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Project } from "@/modules/projects/data/projects";

interface ProjectDetailModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FALLBACK_PROJECT_IMAGE = "/placeholder-project.jpg";
const AUTO_SLIDE_INTERVAL = 6000;

export const ProjectDetailModal = ({
  project,
  open,
  onOpenChange,
}: ProjectDetailModalProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const thumbsRef = useRef<HTMLDivElement | null>(null);

  // Normaliza imágenes (por si viene algo raro)
  const images = useMemo(() => {
    const list = project?.images ?? [];
    return Array.isArray(list) ? list.filter(Boolean) : [];
  }, [project]);

  // Reset al abrir/cambiar proyecto (y reactivar autoplay)
  useEffect(() => {
    if (!open || !project) return;
    setActiveIndex(0);
    setIsAutoPlaying(true);
  }, [project, open]);

  // Autoplay
  useEffect(() => {
    if (!open) return;
    if (!project) return;
    if (!isAutoPlaying) return;
    if (images.length <= 1) return;

    const t = window.setInterval(() => {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, AUTO_SLIDE_INTERVAL);

    return () => window.clearInterval(t);
  }, [open, project, isAutoPlaying, images.length]);

  // Centrar miniatura activa
  useEffect(() => {
    const el = thumbsRef.current;
    if (!el) return;

    const active = el.querySelector<HTMLButtonElement>(
      `button[data-thumb="${activeIndex}"]`
    );
    if (!active) return;

    active.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  if (!project) return null;

  const activeSrc = images[activeIndex] || FALLBACK_PROJECT_IMAGE;

  const pauseAnd = (fn: () => void) => {
    setIsAutoPlaying(false);
    fn();
  };

  const goPrev = () =>
    pauseAnd(() =>
      setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    );

  const goNext = () =>
    pauseAnd(() =>
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    );

  const selectIndex = (idx: number) =>
    pauseAnd(() => setActiveIndex(idx));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* ✅ dejamos el botón X nativo de DialogContent (shadcn)
          y quitamos el botón X custom del header para evitar duplicado */}
      <DialogContent className="max-w-6xl max-h-[92vh] overflow-y-auto overflow-x-hidden p-0 rounded-2xl border-border/60">
        {/* HEADER */}
        <DialogHeader className="px-6 pt-5 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <DialogTitle className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
                {project.name}
              </DialogTitle>

              <DialogDescription className="sr-only">
                Información detallada del proyecto seleccionado.
              </DialogDescription>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-sm gap-1.5 py-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  {project.client}
                </Badge>

                <Badge variant="outline" className="text-sm gap-1.5 py-1.5">
                  <FolderKanban className="w-3.5 h-3.5" />
                  {project.category}
                </Badge>

                {images.length > 1 && (
                  <Badge
                    variant="outline"
                    className="text-sm py-1.5 text-muted-foreground"
                  >
                    {activeIndex + 1} / {images.length}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 h-px w-full bg-border/60" />
        </DialogHeader>

        {/* CONTENT */}
        <div className="px-6 pb-6">
          <div
            className={cn(
              "grid gap-6",
              "md:grid-cols-[1.35fr_1fr]",
              "items-start"
            )}
          >
            {/* IZQUIERDA: Media */}
            <Card className="rounded-2xl border-border/60 shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="relative rounded-xl overflow-hidden border border-border/60 bg-secondary">
                  <div className="relative aspect-video w-full">
                    {/* Fondo blur */}
                    <img
                      src={activeSrc}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-25"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_PROJECT_IMAGE;
                      }}
                    />

                    {/* Imagen principal */}
                    <img
                      key={`${project.id}-active-${activeIndex}`}
                      src={activeSrc}
                      alt={project.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_PROJECT_IMAGE;
                      }}
                      className="absolute inset-0 m-auto max-w-[98%] max-h-[98%] object-contain block"
                    />

                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={goPrev}
                          className={cn(
                            "absolute left-3 top-1/2 -translate-y-1/2",
                            "w-10 h-10 rounded-full",
                            "bg-background/80 backdrop-blur-md border border-border/60",
                            "inline-flex items-center justify-center",
                            "transition hover:bg-background hover:shadow-sm",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
                          )}
                          aria-label="Imagen anterior"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          onClick={goNext}
                          className={cn(
                            "absolute right-3 top-1/2 -translate-y-1/2",
                            "w-10 h-10 rounded-full",
                            "bg-background/80 backdrop-blur-md border border-border/60",
                            "inline-flex items-center justify-center",
                            "transition hover:bg-background hover:shadow-sm",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
                          )}
                          aria-label="Siguiente imagen"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Miniaturas */}
                {images.length > 1 && (
                  <div
                    ref={thumbsRef}
                    className={cn(
                      "mt-4 flex gap-2 overflow-x-auto pb-1",
                      "custom-scrollbar"
                    )}
                  >
                    {images.map((img, idx) => {
                      const isActive = idx === activeIndex;
                      return (
                        <button
                          key={`${project.id}-thumb-${idx}`}
                          data-thumb={idx}
                          type="button"
                          onClick={() => selectIndex(idx)}
                          className={cn(
                            "flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border transition",
                            isActive
                              ? "border-primary ring-2 ring-primary/25"
                              : "border-border/60 hover:border-primary/50"
                          )}
                          aria-label={`Ver imagen ${idx + 1} de ${project.name}`}
                          aria-pressed={isActive}
                        >
                          <img
                            src={img}
                            alt={`${project.name} - ${idx + 1}`}
                            className="w-full h-full object-cover block"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              e.currentTarget.src = FALLBACK_PROJECT_IMAGE;
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>

            {/* DERECHA: Info */}
            <div className="space-y-4">
              <Card className="p-5 rounded-2xl border-border/60 shadow-sm">
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  Descripción del Proyecto
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description ||
                    "Proyecto desarrollado con altos estándares técnicos y cumplimiento normativo."}
                </p>
              </Card>

              <Card className="p-5 rounded-2xl border-border/60 shadow-sm">
                <h3 className="text-base md:text-lg font-semibold mb-4">
                  Datos clave
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border/60 bg-card p-4">
                    <div className="text-xs text-muted-foreground mb-1">
                      Cliente
                    </div>
                    <div className="font-semibold">{project.client}</div>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-card p-4">
                    <div className="text-xs text-muted-foreground mb-1">
                      Categoría
                    </div>
                    <div className="font-semibold">{project.category}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
