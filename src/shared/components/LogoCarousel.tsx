// src/shared/components/LogoCarousel.tsx
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";
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
  /** segundos (intervalo por slide) */
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
const RESUME_AFTER_INTERACTION_MS = 9000;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

export default function LogoCarousel({
  items,
  title = "",
  subtitle = "",
  variant = "clients",
  autoPlay = true,
  speed = 4, // ✅ antes 30, ahora se nota y se siente premium
  responsive = { base: 2, sm: 3, md: 4, lg: 5, xl: 6 },
  gapPx = 32,
  className,
}: LogoCarouselProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(responsive.base || 2);

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const pointerStartX = useRef<number | null>(null);
  const pointerId = useRef<number | null>(null);
  const didSwipe = useRef(false);

  // ✅ pausa premium: si el usuario interactúa (flecha/dots/swipe), pausamos un rato y luego reanudamos
  const [interactionPause, setInteractionPause] = useState(false);
  const resumeTimerRef = useRef<number | null>(null);

  const isPaused = isHovered || isFocused || isDragging || interactionPause;

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
    window.addEventListener("resize", handleResize, { passive: true });
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
  const canNavigate = totalSlides > 1;

  useEffect(() => {
    setCurrentIndex((prev) => {
      if (totalSlides === 0) return 0;
      return Math.min(prev, totalSlides - 1);
    });
  }, [totalSlides]);

  const scheduleResume = useCallback(() => {
    if (!autoPlay) return;
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    setInteractionPause(true);
    resumeTimerRef.current = window.setTimeout(() => {
      setInteractionPause(false);
    }, RESUME_AFTER_INTERACTION_MS);
  }, [autoPlay]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const handlePrev = useCallback(() => {
    if (!canNavigate) return;
    scheduleResume();
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [canNavigate, totalSlides, scheduleResume]);

  const handleNext = useCallback(() => {
    if (!canNavigate) return;
    scheduleResume();
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [canNavigate, totalSlides, scheduleResume]);

  // ✅ pausa cuando pestaña no visible (evita “saltos” al volver)
  const [tabHidden, setTabHidden] = useState(false);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onVis = () => setTabHidden(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    if (prefersReducedMotion) return;
    if (tabHidden) return;
    if (isPaused) return;
    if (!canNavigate) return;

    const intervalMs = Math.max(2, speed) * 1000;

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [
    autoPlay,
    prefersReducedMotion,
    tabHidden,
    isPaused,
    canNavigate,
    totalSlides,
    speed,
  ]);

  const finishDrag = useCallback((el?: HTMLDivElement) => {
    pointerStartX.current = null;
    didSwipe.current = false;

    if (pointerId.current !== null && el) {
      try {
        el.releasePointerCapture(pointerId.current);
      } catch {
        // noop
      }
    }

    pointerId.current = null;
    setIsDragging(false);
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!canNavigate) return;

    pointerStartX.current = event.clientX;
    pointerId.current = event.pointerId;
    didSwipe.current = false;
    setIsDragging(true);

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerStartX.current === null) return;

    const delta = event.clientX - pointerStartX.current;
    if (!didSwipe.current && Math.abs(delta) > SWIPE_THRESHOLD) {
      didSwipe.current = true;
      scheduleResume();
      delta > 0 ? handlePrev() : handleNext();
    }
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    finishDrag(event.currentTarget);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    finishDrag(event.currentTarget);
  };

  const handlePointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    finishDrag(event.currentTarget);
  };

  const renderWindow = useMemo(() => {
    if (!canNavigate) return new Set([0]);
    const prev = (currentIndex - 1 + totalSlides) % totalSlides;
    const next = (currentIndex + 1) % totalSlides;
    return new Set([prev, currentIndex, next]);
  }, [currentIndex, totalSlides, canNavigate]);

  const regionLabel = title || "Carrusel de marcas";

  return (
    <div className={cn("relative py-12 md:py-16", className)}>
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

      <div className="relative">
        {/* ✅ máscaras laterales (premium) */}
        {canNavigate && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 md:w-14 bg-gradient-to-r from-background to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 md:w-14 bg-gradient-to-l from-background to-transparent"
            />
          </>
        )}

        {canNavigate && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-lg border border-border flex items-center justify-center shadow-2xl hover:shadow-accent/20 hover:border-accent/50 hover:scale-110 transition-all duration-300"
              aria-label={`${regionLabel} anterior`}
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-foreground" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-lg border border-border flex items-center justify-center shadow-2xl hover:shadow-accent/20 hover:border-accent/50 hover:scale-110 transition-all duration-300"
              aria-label={`${regionLabel} siguiente`}
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-foreground" />
            </button>
          </>
        )}

        <div
          className="relative overflow-hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label={regionLabel}
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
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onPointerCancel={handlePointerCancel}
          style={{ touchAction: "pan-y" }}
        >
          <div
            className={cn(
              "flex will-change-transform",
              prefersReducedMotion ? "transition-none" : "transition-transform duration-700 ease-out"
            )}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, slideIndex) => {
              const shouldRender = renderWindow.has(slideIndex);
              const isActiveSlide = slideIndex === currentIndex;

              return (
                <div key={`slide-${slideIndex}`} className="flex-shrink-0 w-full">
                  <div
                    className="grid"
                    style={{
                      gridTemplateColumns: `repeat(${visibleItems}, minmax(0, 1fr))`,
                      gap: `${gapPx}px`,
                    }}
                  >
                    {shouldRender
                      ? slide.map((item) => (
                          <div
                            key={item.id}
                            className={cn(
                              "group relative overflow-hidden rounded-2xl",
                              "border border-border/40 bg-card/70 backdrop-blur",
                              "ring-1 ring-white/5",
                              "shadow-[0_10px_30px_-22px_rgba(0,0,0,0.55)]",
                              "transition-all duration-500",
                              "hover:shadow-[0_22px_60px_-34px_rgba(0,0,0,0.65)] hover:border-accent/30",
                              "px-6 py-4 md:px-7 md:py-5",
                              "flex items-center justify-center",
                              "h-32 md:h-34 lg:h-36"
                            )}
                          >
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{
                                background:
                                  "radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0.06), transparent 55%)",
                              }}
                            />

                            {item.logo ? (
                              <OptimizedImage
                                src={item.logo}
                                alt={item.name}
                                width={360}
                                height={160}
                                objectFit="contain"
                                loading={isActiveSlide ? "eager" : "lazy"}
                                priority={isActiveSlide}
                                disablePlaceholder
                                fadeIn={false}
                                className="w-full h-full"
                                imgClassName={cn(
                                  "w-full h-full max-h-20 md:max-h-24 object-contain",
                                  "transition-transform duration-700 group-hover:scale-[1.05]",
                                  variant === "partners" &&
                                    "group-hover:saturate-110 group-hover:contrast-110"
                                )}
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
                              <div className="flex flex-col items-center justify-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                                  <Building2 className="h-6 w-6 text-accent/60" />
                                </div>
                                <span className="text-sm font-medium text-foreground text-center">
                                  {item.name}
                                </span>
                              </div>
                            )}

                            {item.description && (
                              <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] text-muted-foreground/90 opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.description}
                              </div>
                            )}
                          </div>
                        ))
                      : Array.from({ length: visibleItems }).map((_, i) => (
                          <div
                            key={`sk-${slideIndex}-${i}`}
                            className={cn(
                              "rounded-2xl border border-border/40 bg-card/60",
                              "ring-1 ring-white/5",
                              "px-6 py-4 md:px-7 md:py-5",
                              "flex items-center justify-center",
                              "h-32 md:h-34 lg:h-36"
                            )}
                            aria-hidden="true"
                          >
                            <div className="h-9 w-28 rounded-md bg-muted/40" />
                          </div>
                        ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {canNavigate && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                scheduleResume();
                setCurrentIndex(index);
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-8 bg-accent"
                  : "bg-border hover:bg-muted-foreground"
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
