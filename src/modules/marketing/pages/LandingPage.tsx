//src/modules/marketing/pages/LandingPage.tsx
import Seo from "@/components/seo/Seo";
import { landingSeo } from "@/modules/marketing/seo";

import Hero from "@/modules/marketing/components/HeroSection";
import AboutSection from "@/modules/about/components/AboutSection";
import ServicesSection from "@/modules/services/components/ServicesSection";
import { ClientsSection } from "@/modules/clients/components";
import { PartnersSection } from "@/modules/partners/components";
import CTASection from "@/modules/contact/components/CTASection";
import { ProjectsSection } from "@/modules/projects/components";
import { ProductsSection } from "@/modules/catalog/components/products";

export default function LandingPage() {
  return (
    <>
      <Seo {...landingSeo} />
      <div className="flex flex-col">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ProductsSection />
        <ClientsSection />
        <PartnersSection />
        <CTASection />
      </div>
    </>
  );
}
