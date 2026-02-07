// modules/clients/components/ClientsSection.tsx
import LogoCarousel from "@/shared/components/LogoCarousel"; // Importar correctamente
import clientsData from "@/modules/clients/data/clients"; // Importar como default
import type { Client } from "@/core/domain/client";

export function ClientsSection() {
  const allClients: Client[] = clientsData;

  return (
    <section id="clients" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-3">Nuestros Clientes</h2>
        <p className="section-subtitle text-center mx-auto mb-6">
          Empresas que confían en nosotros.
        </p>

        <LogoCarousel
          items={allClients}
          title="Clientes"
          responsive={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
          gapPx={20}
        />
      </div>
    </section>
  );
}

export default ClientsSection;