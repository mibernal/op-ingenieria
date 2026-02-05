import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src?: string;
  alt?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "auto" | "custom";
  objectFit?: "cover" | "contain" | "fill";
  priority?: boolean;
  fallback?: string;
}

const OptimizedImage = ({
  src,
  alt = "",
  className = "",
  aspectRatio = "auto",
  objectFit = "cover",
  priority = false,
  fallback = "/placeholder-product.jpg",
}: OptimizedImageProps) => {
  const [imageSrc, setImageSrc] = useState(src || fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Clases para aspect ratio
  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "",
    custom: "",
  };

  // Clases para object-fit
  const objectFitClasses = {
    cover: "object-cover",
    contain: "object-contain",
    fill: "object-fill",
  };

  const handleError = () => {
    if (!hasError && imageSrc !== fallback) {
      setImageSrc(fallback);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={cn(
      "relative overflow-hidden",
      aspectRatio !== "custom" && aspectRatioClasses[aspectRatio],
      className
    )}>
      {/* Placeholder mientras carga */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-muted animate-pulse" />
      )}
      
      {/* Imagen optimizada */}
      <img
        src={imageSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "w-full h-full transition-opacity duration-300",
          objectFitClasses[objectFit],
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={handleLoad}
        onError={handleError}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      
      {/* Estado de error */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center p-4">
            <svg 
              className="w-12 h-12 text-muted-foreground mx-auto mb-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span className="text-xs text-muted-foreground">Imagen no disponible</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;