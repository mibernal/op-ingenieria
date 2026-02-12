// modules/clients/components/ClientsSection.tsx
import LogoCarousel, { type CarouselItem } from "@/shared/components/LogoCarousel";
import { clients } from "../data/clients";
import { cn } from "@/lib/utils";

export function ClientsSection() {
  const carouselItems: CarouselItem[] = clients.map((client) => ({
    id: client.id,
    name: client.name,
    logo: client.logo,
    description: client.category,
  }));

  return (
    <section id="clientes" className="relative py-10 md:py-14 bg-muted/30">
      {/* Gradientes cortos para evitar “aire muerto” */}
      <div
        className="absolute inset-x-0 top-0 -z-10 h-16 bg-gradient-to-b from-background/70 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-16 bg-gradient-to-t from-background/70 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4">
        {/* Header premium (compacto) */}
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="text-xs tracking-[0.22em] text-muted-foreground">
            CONFIANZA
          </p>
          <h2 className="section-title mt-2">Nuestros Clientes</h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Organizaciones que confían en nuestra ingeniería para soluciones de energía, respaldo y continuidad operativa.
          </p>
          <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        </div>

        {/* Carrusel (glass wrapper sutil + coherente) */}
        <div
          className={cn(
            "rounded-2xl border border-border/60",
            "bg-card/70 backdrop-blur-md",
            "shadow-sm shadow-black/5",
            "px-3 sm:px-4 py-4"
          )}
        >
<LogoCarousel
  items={carouselItems}
  title={undefined}
  subtitle={undefined}
  variant="partners"
  autoPlay
  speed={3}                 // ✅ antes quedaba en 30s por defecto
  responsive={{ base: 2, sm: 3, md: 4, lg: 5, xl: 8 }}
  gapPx={16}
  className={cn("bg-transparent rounded-xl")}
/>

        </div>
      </div>
    </section>
  );
}

export default ClientsSection;
