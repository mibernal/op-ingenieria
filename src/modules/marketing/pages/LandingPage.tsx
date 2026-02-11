// src/modules/marketing/pages/LandingPage.tsx
import { Suspense, lazy } from "react";
import Seo from "@/components/seo/Seo";
import { landingSeo } from "@/modules/marketing/seo";

import ContactSection from "@/modules/contact/components/ContactSection";
import { ClientsSection } from "@/modules/clients/components";
import { PartnersSection } from "@/modules/partners/components";
import Hero from "@/modules/marketing/components/HeroSection";
import AboutSection from "@/modules/marketing/components/AboutSection";
import ServicesSection from "@/modules/marketing/components/ServicesSection";
import CTASection from "@/modules/marketing/components/CTASection";
import { ProductGridSkeleton } from "@/shared/skeletons";

// ✅ Lazy load: se deja listo por si luego se reactiva
const ProductsSection = lazy(
  () => import("@/modules/catalog/components/products/ProductsSection")
);
const ProjectsSection = lazy(
  () => import("@/modules/projects/components/ProjectsSection")
);

export default function LandingPage() {
  return (
    <>
      <Seo {...landingSeo} />
      <div className="flex flex-col space-y-12 md:space-y-16">
        <Hero />
        <AboutSection />
        <ServicesSection />

        {/*
        // 🚫 Oculto en Landing (no eliminar): Productos ahora se verán solo en /catalogo
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <ProductsSection />
        </Suspense>
        */}

        {/*
        // 🚫 Oculto en Landing (no eliminar): Proyectos ahora se verán solo en /projects
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-10 md:py-14">
              Cargando proyectos…
            </div>
          }
        >
          <ProjectsSection />
        </Suspense>
        */}

        <ClientsSection />
        <PartnersSection />

        <ContactSection />
        <CTASection />
      </div>
    </>
  );
}
