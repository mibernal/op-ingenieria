// src/modules/projects/pages/ProjectsPage.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/seo/Seo";
import { projectsSeo } from "@/modules/projects/seo";
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import ProjectsExplorer from "@/modules/projects/components/ProjectsExplorer";
import { PROJECTS_COPY } from "@/modules/projects/content/projects.copy";

export default function ProjectsPage() {
  const copy = PROJECTS_COPY.page;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo {...projectsSeo} />
      <Header />

      <main className="flex-1">
        <SectionShell variant="dark" className="pt-10 pb-10 md:pt-14 md:pb-14">
          <SectionHeader
            eyebrow={copy.eyebrow}
            title={
              <>
                {copy.titleA} <span className="text-accent">{copy.titleB}</span>
              </>
            }
            subtitle={copy.subtitle}
          />

        </SectionShell>

        <ProjectsExplorer
          headingLevel="h1"
          title={copy.explorerTitle}
          subtitle={copy.explorerSubtitle}
          className="pt-2 pb-0 md:pt-4 md:pb-10"
          backgroundClassName="bg-background"
        />
      </main>

      <Footer />
    </div>
  );
}
