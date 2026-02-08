// shared/components/LogoCarousel.tsx - VERSIÓN OPTIMIZADA
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import OptimizedImage from "@/shared/components/OptimizedImage";

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
  className?: string;
}

const SWIPE_THRESHOLD = 50;

export default function LogoCarousel({
  items,
  title = "",
  subtitle = "",
  variant = "clients",
  autoPlay = true,
  speed = 30,
  responsive = { base: 2, sm: 3, md: 4, lg: 5, xl: 6 },
  gapPx = 32,
  className,
}: LogoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(responsive.base || 2);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const pointerStartX = useRef<number | null>(null);
  const isPaused = isHovered || isFocused || isDragging;

  const resolveVisibleItems = useCallback(
    (width: number) => {
      if (width >= 1280 && responsive.xl) return responsive.xl;
      if (width >= 1024 && responsive.lg) return responsive.lg;
      if (width >= 768 && responsive.md) return responsive.md;
      if (width >= 640 && responsive.sm) return responsive.sm;
      return responsive.base || 2;
    },
    [responsive]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    let frame = 0;
    const handleResize = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setVisibleItems(resolveVisibleItems(window.innerWidth));
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(frame);
    };
  }, [resolveVisibleItems]);

  const slides = useMemo(() => {
    if (!items.length) return [];
    const chunked: CarouselItem[][] = [];
    for (let i = 0; i < items.length; i += visibleItems) {
      chunked.push(items.slice(i, i + visibleItems));
    }
    return chunked;
  }, [items, visibleItems]);

  const totalSlides = slides.length;

  useEffect(() => {
    setCurrentIndex((prev) => {
      if (totalSlides === 0) return 0;
      return Math.min(prev, totalSlides - 1);
    });
  }, [totalSlides]);

  useEffect(() => {
    if (!autoPlay || isPaused || totalSlides <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, speed * 1000);

    return () => window.clearInterval(interval);
  }, [autoPlay, isPaused, totalSlides, speed]);

  const handlePrev = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
    setIsDragging(true);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const delta = event.clientX - pointerStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    pointerStartX.current = null;
    setIsDragging(false);
  };

  const handlePointerLeave = () => {
    pointerStartX.current = null;
    setIsDragging(false);
  };

  return (
    <div className={cn("relative py-12 md:py-16", className)}>
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

      {/* Carrusel */}
      <div
        className="relative overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label={title || "Carrusel de marcas"}
        aria-live="off"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setIsFocused(false);
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={`slide-${slideIndex}`}
              className="flex-shrink-0 w-full"
            >
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${visibleItems}, minmax(0, 1fr))`,
                  gap: `${gapPx}px`,
                }}
              >
                {slide.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "group relative bg-card rounded-2xl border border-border/50",
                      "p-6 md:p-8 transition-all duration-500",
                      "hover:scale-[1.02] hover:shadow-xl hover:border-accent/30",
                      "flex flex-col items-center justify-center h-44",
                      variant === "partners" && "grayscale group-hover:grayscale-0"
                    )}
                  >
                    {item.logo ? (
                      <OptimizedImage
                        src={item.logo}
                        alt={item.name}
                        loading="lazy"
                        objectFit="contain"
                        className="max-w-full max-h-24 object-contain transition-transform duration-700 group-hover:scale-105"
                        fallback={
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Building2 className="h-8 w-8 text-accent/60" />
                            <span className="text-sm font-medium text-foreground text-center">
                              {item.name}
                            </span>
                          </div>
                        }
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <Building2 className="h-8 w-8 text-accent/60" />
                        </div>
                        <span className="text-sm font-medium text-foreground text-center">
                          {item.name}
                        </span>
                      </div>
                    )}

                    {item.description && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {totalSlides > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-lg border border-border flex items-center justify-center shadow-2xl hover:shadow-accent/20 hover:border-accent/50 hover:scale-110 transition-all duration-300"
              aria-label={`${title || "Carrusel"} anterior`}
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-foreground" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-lg border border-border flex items-center justify-center shadow-2xl hover:shadow-accent/20 hover:border-accent/50 hover:scale-110 transition-all duration-300"
              aria-label={`${title || "Carrusel"} siguiente`}
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-foreground" />
            </button>
          </>
        )}
      </div>

      {totalSlides > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex ? "w-8 bg-accent" : "bg-border hover:bg-muted-foreground"
              )}
              aria-label={`Ir a slide ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}
