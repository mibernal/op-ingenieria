// modules/partners/components/PartnersSection.tsx - CORREGIDO
import LogoCarousel, { type CarouselItem } from "@/shared/components/LogoCarousel";
import { partners } from "../data/partners";

export function PartnersSection() {
  // Convertir partners al tipo CarouselItem
  const carouselItems: CarouselItem[] = partners.map(partner => ({
    id: partner.id,
    name: partner.name,
    logo: partner.logo,
    description: partner.description
  }));

  return (
    <section id="partners" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <LogoCarousel
          items={carouselItems}
          title="Partners que representamos"
          subtitle="Marcas y fabricantes con los que trabajamos"
          variant="partners"
          responsive={{ base: 2, sm: 3, md: 4, lg: 5, xl: 8 }}
          gapPx={16}
        />
      </div>
    </section>
  );
}

export default PartnersSection;