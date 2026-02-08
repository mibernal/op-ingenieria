import React, { useState, useCallback, useEffect, memo } from "react";
import { cn } from "@/lib/utils";

export interface OptimizedImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "onError" | "onLoad"> {
  src?: string;
  alt?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "auto" | "custom";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  priority?: boolean;
  fallback?: React.ReactNode;
  fallbackSrc?: string;
  sizes?: string;
  loading?: "lazy" | "eager";
  onError?: () => void;
  onLoad?: () => void;
}

const OptimizedImageComponent: React.FC<OptimizedImageProps> = ({
  src,
  alt = "",
  className = "",
  aspectRatio = "auto",
  objectFit = "cover",
  priority = false,
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
  const [imageSrc, setImageSrc] = useState<string | undefined>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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

  useEffect(() => {
    const resolvedSrc = src ?? fallbackSrc;
    setImageSrc(resolvedSrc);
    setIsLoading(Boolean(resolvedSrc));
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleError = useCallback(() => {
    setHasError(true);
    if (imageSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    externalOnError?.();
  }, [externalOnError, fallbackSrc, imageSrc]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    externalOnLoad?.();
  }, [externalOnLoad]);

  const computedLoading = loading ?? (priority ? "eager" : "lazy");

  const numericWidth =
    typeof width === "number" ? width : typeof width === "string" && !Number.isNaN(Number(width)) ? Number(width) : undefined;
  const numericHeight =
    typeof height === "number"
      ? height
      : typeof height === "string" && !Number.isNaN(Number(height))
        ? Number(height)
        : undefined;

  const wrapperStyle: React.CSSProperties = {
    ...style,
    ...(aspectRatio === "auto" && numericWidth && numericHeight
      ? { aspectRatio: `${numericWidth} / ${numericHeight}` }
      : {}),
  };

  // Si hay fallback personalizado y ocurrió error
  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        aspectRatio !== "custom" && aspectRatioClasses[aspectRatio],
        className
      )}
      style={wrapperStyle}
    >
      {/* Placeholder mientras carga */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-muted animate-pulse"
          role="status"
          aria-label="Cargando imagen"
        />
      )}

      {/* Imagen */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          loading={computedLoading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          sizes={sizes}
          width={width}
          height={height}
          className={cn(
            "w-full h-full transition-opacity duration-300",
            objectFitClasses[objectFit],
            isLoading ? "opacity-0" : "opacity-100",
            "select-none" // Previene selección accidental
          )}
          draggable="false"
          {...imgProps}
        />
      )}

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
            <span className="text-sm text-muted-foreground">Imagen no disponible</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const OptimizedImage = memo(OptimizedImageComponent);
export default OptimizedImage;
