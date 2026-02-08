// modules/marketing/pages/LandingPage.tsx - Verificar importaciones
import { Suspense } from "react";

import ProductsSection from "@/modules/catalog/components/products/ProductsSection";
import ProjectsSection from "@/modules/projects/components/ProjectsSection";
import ContactSection from "@/modules/contact/components/ContactSection";

import { ClientsSection } from "@/modules/clients/components";
import { PartnersSection } from "@/modules/partners/components";

import {
  Hero,
  AboutSection,
  ServicesSection,
  CTASection,
} from "@/modules/marketing/components";

import { ProductGridSkeleton } from "@/shared/skeletons";

export default function LandingPage() {
  return (
    <main className="flex flex-col gap-24">
      <Hero />
      <AboutSection />
      <ServicesSection />

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductsSection />
      </Suspense>

      <ProjectsSection />

      {/* Estas secciones ya no necesitan Suspense porque son componentes ligeros */}
      <ClientsSection />
      <PartnersSection />

      <ContactSection />
      <CTASection />
    </main>
  );
}