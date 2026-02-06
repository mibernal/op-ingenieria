import { Suspense } from "react";
import ProductsSection from "@/modules/catalog/components/products/ProductsSection";
import ProjectsSection from "@/modules/projects/components/ProjectsSection";
import ClientsPartnersSection from "@/modules/projects/components/ClientsPartnersSection";
import ContactSection from "@/modules/contact/components/ContactSection";

import {
  Hero,
  AboutSection,
  ServicesSection,
  CTASection,
  PartnersSection,
} from "@/modules/marketing/components";

import { ProductGridSkeleton } from "@/shared/skeletons";

export default function LandingPage() {
  return (
    <main className="flex flex-col gap-24">
      <Hero />
      <AboutSection />
      <ServicesSection />
      
      {/* Agrega los componentes faltantes */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductsSection />
      </Suspense>
      
      <ProjectsSection />
      
      <ClientsPartnersSection />
      
      <Suspense fallback={<ProductGridSkeleton />}>
        <PartnersSection />
      </Suspense>
      
      <ContactSection />
      <CTASection />
    </main>
  );
}