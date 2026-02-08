// shared/components/LogoCarousel.tsx - VERSIÓN CORREGIDA
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export interface CarouselItem {
  id: string;
  name: string;
  logo?: string;
  description?: string;
}

interface LogoCarouselProps {
  items: CarouselItem[];
  title?: string;
  subtitle?: string;
  variant?: "clients" | "partners";
  autoPlay?: boolean;
  speed?: number;
  responsive?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gapPx?: number;
}

export default function LogoCarousel({
  items,
  title = "",
  subtitle = "",
  variant = "clients",
  autoPlay = true,
  speed = 30,
  responsive = { base: 2, sm: 3, md: 4, lg: 5, xl: 6 },
  gapPx = 32,
}: LogoCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Calcular cuántos items mostrar según el responsive
  const getVisibleItems = () => {
    if (window.innerWidth >= 1280 && responsive.xl) return responsive.xl;
    if (window.innerWidth >= 1024 && responsive.lg) return responsive.lg;
    if (window.innerWidth >= 768 && responsive.md) return responsive.md;
    if (window.innerWidth >= 640 && responsive.sm) return responsive.sm;
    return responsive.base || 2;
  };

  const visibleItems = getVisibleItems();
  const totalSlides = Math.ceil(items.length / visibleItems);

  // Efecto para el auto-play
  useEffect(() => {
    if (!autoPlay || isPaused || items.length <= visibleItems) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [autoPlay, isPaused, items.length, visibleItems, totalSlides, speed]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  // Calcular el desplazamiento para el transform
  const translateX = `-${currentIndex * 100}%`;

  return (
    <div className="relative py-12 md:py-16 bg-gradient-to-b from-transparent via-muted/10 to-transparent">
      <div className="container mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-10 md:mb-12">
            {title && (
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Carrusel Container */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            ref={containerRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(${translateX})`,
              gap: `${gapPx}px`
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0"
                style={{ 
                  width: `calc((100% - ${(visibleItems - 1) * gapPx}px) / ${visibleItems})`
                }}
              >
                <div
                  className={cn(
                    "group relative bg-card rounded-2xl border border-border/50",
                    "p-6 md:p-8 transition-all duration-500",
                    "hover:scale-105 hover:shadow-2xl hover:border-accent/30",
                    "flex flex-col items-center justify-center h-48",
                    variant === "partners" && "grayscale group-hover:grayscale-0"
                  )}
                >
                  {/* Logo */}
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="max-w-full max-h-24 object-contain transition-all duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback si la imagen no carga
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'flex flex-col items-center justify-center';
                        fallback.innerHTML = `
                          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-3">
                            <svg class="h-8 w-8 text-accent/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                            </svg>
                          </div>
                          <span class="text-sm font-medium text-foreground text-center">${item.name}</span>
                        `;
                        target.parentNode?.insertBefore(fallback, target);
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <svg 
                          className="h-8 w-8 text-accent/60" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="1.5" 
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-foreground text-center">
                        {item.name}
                      </span>
                    </div>
                  )}

                  {/* Tooltip con descripción */}
                  {item.description && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                      <div className="bg-foreground text-background text-xs rounded py-1 px-2 whitespace-nowrap">
                        {item.description}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Controles de navegación (solo si hay más slides) */}
          {items.length > visibleItems && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-lg border border-border flex items-center justify-center shadow-2xl hover:shadow-accent/20 hover:border-accent/50 hover:scale-110 transition-all duration-300"
                aria-label={`${title} anterior`}
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-foreground" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-lg border border-border flex items-center justify-center shadow-2xl hover:shadow-accent/20 hover:border-accent/50 hover:scale-110 transition-all duration-300"
                aria-label={`${title} siguiente`}
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-foreground" />
              </button>
            </>
          )}
        </div>

        {/* Indicadores de slides */}
        {items.length > visibleItems && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-8 bg-accent"
                    : "bg-border hover:bg-muted-foreground"
                )}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}