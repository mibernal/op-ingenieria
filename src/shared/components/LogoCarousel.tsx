// shared/components/LogoCarousel.tsx
import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import OptimizedImage from "@/shared/components/OptimizedImage";

export interface Item {
  id: string;
  name: string;
  logo?: string;
}

interface LogoCarouselProps {
  items: Item[];
  title?: string;
  responsive?: { base?: number; sm?: number; md?: number; lg?: number; xl?: number };
  gapPx?: number;
}

// IMPORTANTE: Exportar como default
export default function LogoCarousel({
  items,
  title = "",
  responsive = { base: 1, sm: 2, md: 3, lg: 4, xl: 6 },
  gapPx = 24,
}: LogoCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [itemsPerView, setItemsPerView] = useState<number>(responsive.base || 1);

  const updateItemsPerView = useCallback(() => {
    const w = window.innerWidth;
    if (w >= 1280 && responsive.xl) setItemsPerView(responsive.xl);
    else if (w >= 1024 && responsive.lg) setItemsPerView(responsive.lg);
    else if (w >= 768 && responsive.md) setItemsPerView(responsive.md);
    else if (w >= 640 && responsive.sm) setItemsPerView(responsive.sm);
    else setItemsPerView(responsive.base || 1);
  }, [responsive]);

  const checkScroll = useCallback(() => {
    const ref = containerRef.current;
    if (!ref) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const { scrollLeft, scrollWidth, clientWidth } = ref;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  }, []);

  useEffect(() => {
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, [updateItemsPerView]);

  useEffect(() => {
    checkScroll();
    const ref = containerRef.current;
    if (!ref) return;
    const onScroll = () => checkScroll();
    ref.addEventListener("scroll", onScroll, { passive: true });
    return () => ref.removeEventListener("scroll", onScroll);
  }, [checkScroll, itemsPerView, items]);

  const scrollPage = (direction: "left" | "right") => {
    const ref = containerRef.current;
    if (!ref) return;
    const step = Math.round(ref.clientWidth + gapPx);
    ref.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  };

  useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;
    const handler = (e: KeyboardEvent) => {
      if (document.activeElement && ref.contains(document.activeElement)) {
        if (e.key === "ArrowLeft") scrollPage("left");
        if (e.key === "ArrowRight") scrollPage("right");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const itemWidthPercent = 100 / itemsPerView;

  return (
    <div className="mb-8" role="region" aria-label={title || "Carousel"}>
      {title && (
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 text-center">
          {title}
        </h3>
      )}

      <div className="relative">
        <button
          aria-label={`${title} anterior`}
          onClick={() => scrollPage("left")}
          disabled={!canScrollLeft}
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center shadow-md bg-background transition-opacity",
            !canScrollLeft ? "opacity-30 pointer-events-none" : "opacity-100"
          )}
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto px-3 py-2 scroll-smooth snap-x snap-mandatory"
          style={{ 
            WebkitOverflowScrolling: "touch", 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            gap: `${gapPx}px`
          }}
        >
          {items.map((it) => (
            <div
              key={it.id}
              tabIndex={0}
              className="snap-start flex-shrink-0 px-1"
              style={{ flex: `0 0 ${itemWidthPercent}%`, maxWidth: `${itemWidthPercent}%` }}
            >
              <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
                <div className="w-full aspect-square flex items-center justify-center p-3">
                  {it.logo ? (
                    <OptimizedImage
                      src={it.logo}
                      alt={it.name}
                      width={240}
                      height={240}
                      objectFit="contain"
                      loading="lazy"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <span className="text-sm font-medium text-foreground text-center">{it.name}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          aria-label={`${title} siguiente`}
          onClick={() => scrollPage("right")}
          disabled={!canScrollRight}
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center shadow-md bg-background transition-opacity",
            !canScrollRight ? "opacity-30 pointer-events-none" : "opacity-100"
          )}
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </div>
  );
}