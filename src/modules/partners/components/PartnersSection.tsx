import LogoCarousel from "@/shared/components/LogoCarousel"; 
import { partners } from "@/modules/partners/data/partners";
import type { Partner } from "@/core/domain/partner";

export function PartnersSection() {
  const allPartners: Partner[] = partners;

  return (
    <section id="partners" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-3">Partners</h2>
        <p className="section-subtitle text-center mx-auto mb-6">
          Marcas y fabricantes con los que trabajamos.
        </p>

        <LogoCarousel
          items={allPartners}
          title="Partners que representamos"
          responsive={{ base: 2, sm: 3, md: 4, lg: 5, xl: 8 }}
        />
      </div>
    </section>
  );
}

export default PartnersSection;
