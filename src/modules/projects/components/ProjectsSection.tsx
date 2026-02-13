import { useMemo } from "react";
import { NavLink } from "@/components/layout/NavLink";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import { cn } from "@/lib/utils";
import OptimizedImage from "@/shared/components/OptimizedImage";
import { PROJECTS_COPY } from "@/modules/projects/content/projects.copy";
import { MARKETING_COPY } from "@/modules/marketing/content/marketing.copy";
import { projects as allProjects, type Project } from "@/modules/projects/data/projects";

const CARD = cn(
  "rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md",
  "p-5 shadow-sm shadow-black/5",
  "hover:shadow-lg hover:shadow-black/10 hover:-translate-y-0.5 transition-all"
);

function pickFeaturedProjects(projects: Project[], count: number) {
  const withImg = projects.filter((p) => (p.images?.[0] || p.image) && p.name);
  return (withImg.length ? withImg : projects).slice(0, count);
}

function getCategoryBase(value?: string) {
  if (!value) return "";
  return String(value).split("/")[0]?.trim() || "";
}

export default function ProjectsSection() {
  const copy = PROJECTS_COPY.preview;
  const featured = useMemo(() => pickFeaturedProjects(allProjects, 4), []);
  const heroStats = MARKETING_COPY.hero.stats;
  const projectsHistorical = heroStats[0]?.value ?? "300+";
  const yearsExperience = heroStats[1]?.value ?? "12+";
  const clientsHistorical = heroStats[2]?.value ?? "100+";

  return (
    <SectionShell id="proyectos" variant="tint" className="py-9 md:py-12">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={
          <>
            {copy.titleA} <span className="text-accent">{copy.titleB}</span>
          </>
        }
        subtitle={copy.subtitle}
        className="mb-7 md:mb-8"
      />

      <div className="mx-auto max-w-6xl">
        <div className="mb-5 grid gap-4 sm:grid-cols-3">
          <article className={cn(CARD, "p-4")}>
            <div className="text-2xl font-semibold">{projectsHistorical}</div>
            <div className="text-[13px] md:text-sm text-muted-foreground">Proyectos ejecutados</div>
          </article>
          <article className={cn(CARD, "p-4")}>
            <div className="text-2xl font-semibold">{yearsExperience}</div>
            <div className="text-[13px] md:text-sm text-muted-foreground">Anos de experiencia</div>
          </article>
          <article className={cn(CARD, "p-4")}>
            <div className="text-2xl font-semibold">{clientsHistorical}</div>
            <div className="text-[13px] md:text-sm text-muted-foreground">Clientes atendidos</div>
          </article>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => {
            const img = project.images?.[0] || project.image || "/placeholder-project.jpg";
            const category = getCategoryBase(project.category);
            const isLeadCard = index === 0;

            return (
              <article key={project.id} className={cn(CARD, isLeadCard && "lg:col-span-2")}>
                <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/40">
                  <OptimizedImage
                    src={img}
                    alt={project.name}
                    className="w-full"
                    aspectRatio="video"
                    objectFit="cover"
                    sizes={
                      isLeadCard
                        ? "(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                        : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    }
                    loading="lazy"
                  />
                </div>

                <div className="mt-4">
                  <div className="text-[11px] md:text-xs tracking-[0.18em] text-muted-foreground">{category || "CATEGORIA"}</div>
                  <h3 className="mt-1 text-base font-semibold leading-tight line-clamp-1">{project.name}</h3>
                  <p className="mt-1 text-[13px] md:text-sm text-muted-foreground line-clamp-1">{project.client}</p>
                  <p className={cn("mt-2 text-[13px] md:text-sm text-muted-foreground leading-relaxed", isLeadCard ? "line-clamp-3 md:line-clamp-none" : "line-clamp-2 md:line-clamp-3")}>
                    {project.description || copy.fallbackDescription}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-7 flex justify-center">
          <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90">
            <NavLink to={ROUTES.PROJECTS}>{copy.primaryCta}</NavLink>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
