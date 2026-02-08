// modules/clients/components/ClientsSection.tsx - CORREGIDO
import LogoCarousel, { type CarouselItem } from "@/shared/components/LogoCarousel";
import { clients } from "../data/clients";

export function ClientsSection() {
  // Convertir clientes al tipo CarouselItem
  const carouselItems: CarouselItem[] = clients.map(client => ({
    id: client.id,
    name: client.name,
    logo: client.logo,
    description: client.category
  }));

  return (
    <section id="clientes" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <LogoCarousel
          items={carouselItems}
          title="Nuestros Clientes"
          subtitle="Empresas que confían en nosotros"
          variant="clients"
          responsive={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
          gapPx={20}
        />
      </div>
    </section>
  );
}

export default ClientsSection;