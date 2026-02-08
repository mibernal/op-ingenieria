// modules/partners/components/PartnersSection.tsx
import LogoCarousel, { type CarouselItem } from "@/shared/components/LogoCarousel";
import { partners } from "../data/partners";
import { cn } from "@/lib/utils";

export function PartnersSection() {
  const carouselItems: CarouselItem[] = partners.map((partner) => ({
    id: partner.id,
    name: partner.name,
    logo: partner.logo,
    description: partner.description,
  }));

  return (
    <section id="partners" className="relative py-10 md:py-14 bg-background">
      {/* Gradientes cortos para evitar “aire muerto” */}
      <div
        className="absolute inset-x-0 top-0 -z-10 h-16 bg-gradient-to-b from-background via-muted/10 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-16 bg-gradient-to-t from-background via-muted/10 to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4">
        {/* Header premium (compacto) */}
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="text-xs tracking-[0.22em] text-muted-foreground">
            ALIANZAS
          </p>
          <h2 className="section-title mt-2">Partners que representamos</h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Marcas y fabricantes con los que trabajamos para ofrecer soluciones confiables en respaldo energético, energía solar y equipamiento eléctrico.
          </p>
          <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        </div>

        {/* Carrusel (wrapper premium) */}
        <div
          className={cn(
            "rounded-2xl border border-border/60",
            "bg-card/60 backdrop-blur-md",
            "shadow-sm shadow-black/5",
            "px-3 sm:px-4 py-4"
          )}
        >
          <LogoCarousel
            items={carouselItems}
            // ✅ Evita doble título si ya renderizas el header aquí arriba
            title={undefined}
            subtitle={undefined}
            variant="partners"
            responsive={{ base: 2, sm: 3, md: 4, lg: 5, xl: 8 }}
            gapPx={16}
            className={cn("bg-transparent rounded-xl")}
          />
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;
