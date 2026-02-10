import React, { useEffect, useMemo, useState, memo, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface OptimizedImageProps
  extends Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "src" | "onError" | "onLoad"
  > {
  src?: string;
  alt?: string;

  /** Clases del WRAPPER (contenedor) */
  className?: string;

  /** Clases del IMG (la etiqueta <img>) */
  imgClassName?: string;

  aspectRatio?: "square" | "video" | "auto" | "custom";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";

  /** Si true, el browser prioriza la descarga */
  priority?: boolean;

  /** Placeholder/skeleton mientras carga */
  disablePlaceholder?: boolean;

  /** Fade-in al cargar (para fotos grandes sí, para logos generalmente NO) */
  fadeIn?: boolean;

  fallback?: React.ReactNode;
  fallbackSrc?: string;

  sizes?: string;
  loading?: "lazy" | "eager";

  onError?: () => void;
  onLoad?: () => void;
}

const aspectRatioClasses: Record<string, string> = {
  square: "aspect-square",
  video: "aspect-video",
  auto: "",
  custom: "",
};

const objectFitClasses: Record<string, string> = {
  cover: "object-cover",
  contain: "object-contain",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
};

const OptimizedImageComponent: React.FC<OptimizedImageProps> = ({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  aspectRatio = "auto",
  objectFit = "cover",
  priority = false,
  disablePlaceholder = false,
  fadeIn = true,
  fallback,
  fallbackSrc = "/placeholder-image.jpg",
  sizes,
  loading,
  style,
  onError: externalOnError,
  onLoad: externalOnLoad,
  width,
  height,
  ...imgProps
}) => {
  // Resuelve src final (sin estado extra)
  const resolvedSrc = src ?? fallbackSrc;

  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset cuando cambia el src
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [resolvedSrc]);

  const computedLoading = loading ?? (priority ? "eager" : "lazy");

  // Convertir width/height a número cuando aplique (para aspectRatio)
  const numericWidth =
    typeof width === "number"
      ? width
      : typeof width === "string" && !Number.isNaN(Number(width))
      ? Number(width)
      : undefined;

  const numericHeight =
    typeof height === "number"
      ? height
      : typeof height === "string" && !Number.isNaN(Number(height))
      ? Number(height)
      : undefined;

  const wrapperStyle: React.CSSProperties = useMemo(
    () => ({
      ...style,
      ...(aspectRatio === "auto" && numericWidth && numericHeight
        ? { aspectRatio: `${numericWidth} / ${numericHeight}` }
        : {}),
    }),
    [style, aspectRatio, numericWidth, numericHeight]
  );

  const handleError = useCallback(() => {
    setHasError(true);
    externalOnError?.();
  }, [externalOnError]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    externalOnLoad?.();
  }, [externalOnLoad]);

  // Si hay fallback personalizado y falló la carga
  if (hasError && fallback) return <>{fallback}</>;

  // Si falló y no hay fallback: usamos fallbackSrc (si el src original no era fallbackSrc)
  const finalSrc =
    hasError && resolvedSrc !== fallbackSrc ? fallbackSrc : resolvedSrc;

  // Para logos (eager/priority): ayudar al navegador
  const fetchPriority: "high" | "low" | "auto" =
    priority || computedLoading === "eager" ? "high" : "auto";

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        aspectRatio !== "custom" && aspectRatioClasses[aspectRatio],
        className
      )}
      style={wrapperStyle}
    >
      {/* Placeholder (opcional) */}
      {!disablePlaceholder && !isLoaded && (
        <div
          className="absolute inset-0 bg-muted/40 animate-pulse"
          role="status"
          aria-label="Cargando imagen"
        />
      )}

      <img
        src={finalSrc}
        alt={alt}
        loading={computedLoading}
        decoding="async"
        
        fetchPriority={fetchPriority}
        onLoad={handleLoad}
        onError={handleError}
        sizes={sizes}
        width={width}
        height={height}
        className={cn(
          "w-full h-full",
          objectFitClasses[objectFit],
          "select-none",
          fadeIn ? "transition-opacity duration-200" : "",
          fadeIn ? (isLoaded ? "opacity-100" : "opacity-0") : "opacity-100",
          imgClassName
        )}
        draggable="false"
        {...imgProps}
      />

      {/* Estado de error (solo si no hay fallback personalizado) */}
      {hasError && !fallback && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-muted"
          role="alert"
          aria-label="Error al cargar la imagen"
        >
          <div className="text-center p-4">
            <svg
              className="w-12 h-12 text-muted-foreground mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm text-muted-foreground">
              Imagen no disponible
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export const OptimizedImage = memo(OptimizedImageComponent);
export default OptimizedImage;
