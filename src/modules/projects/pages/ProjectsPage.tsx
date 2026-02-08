import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/seo/Seo";
import { projectsSeo } from "@/modules/projects/seo";
import ProjectsSection from "@/modules/projects/components/ProjectsSection";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo {...projectsSeo} />
      <Header />
      <main className="flex-1">
        <ProjectsSection
          headingLevel="h1"
          title="Proyectos Ejecutados"
          subtitle="Casos reales de ingeniería eléctrica y energética con resultados verificables."
          className="py-12 md:py-16"
        />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
