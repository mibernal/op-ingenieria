// src/modules/projects/pages/ProjectsPage.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/seo/Seo";
import { projectsSeo } from "@/modules/projects/seo";
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";
import ProjectsExplorer from "@/modules/projects/components/ProjectsExplorer";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo {...projectsSeo} />
      <Header />

      <main className="flex-1">
        <SectionShell variant="dark">
          <SectionHeader
            eyebrow="PROYECTOS"
            title={
              <>
                Casos reales con <span className="text-accent">resultados verificables</span>
              </>
            }
            subtitle="Explora por categoría: continuidad, respaldo, distribución y soluciones solares con evidencia y puesta en marcha."
          />

        </SectionShell>

        <ProjectsExplorer
          headingLevel="h1"
          title="Proyectos ejecutados"
          subtitle="Selecciona una categoría para ver casos y detalles."
          className="py-0"
          backgroundClassName="bg-background"
        />
      </main>

      <Footer />
    </div>
  );
}
