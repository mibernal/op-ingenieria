// src/modules/projects/components/ProjectsSection.tsx
import { useMemo } from "react";
import { NavLink } from "@/components/layout/NavLink";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import { cn } from "@/lib/utils";
import OptimizedImage from "@/shared/components/OptimizedImage";

import {
  projects as allProjects,
  projectCategories,
  type Project,
} from "@/modules/projects/data/projects";

const CARD = cn(
  "rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md",
  "p-6 shadow-sm shadow-black/5",
  "hover:shadow-lg hover:shadow-black/10 hover:-translate-y-0.5 transition-all"
);

function pickFeaturedProjects(projects: Project[], count: number) {
  const withImg = projects.filter((p) => (p.images?.[0] || p.image) && p.name);
  const list = (withImg.length ? withImg : projects).slice(0, count);
  return list;
}

function getCategoryBase(value?: string) {
  if (!value) return "";
  return String(value).split("/")[0]?.trim() || "";
}

export default function ProjectsSection() {
  const featured = useMemo(() => pickFeaturedProjects(allProjects, 6), []);
  const categoryBadges = useMemo(() => projectCategories.slice(0, 6), []);

  return (
    <SectionShell id="proyectos" variant="light">
      <SectionHeader
        eyebrow="PROYECTOS"
        title={
          <>
            Evidencia en campo. <span className="text-accent">Entrega real</span>
          </>
        }
        subtitle="Una muestra breve de casos implementados en continuidad energética, respaldo, distribución y energía solar."
      />

      <div className="mx-auto max-w-6xl">
        {/* Mini badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categoryBadges.map((c) => (
            <span
              key={c.id}
              className="inline-flex items-center rounded-full border border-border/60 bg-card/70 px-3 py-1.5 text-sm text-muted-foreground"
            >
              {c.name}
            </span>
          ))}
        </div>

        {/* Preview grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => {
            const img = p.images?.[0] || p.image || "/placeholder-project.jpg";
            const catBase = getCategoryBase(p.category);

            return (
              <article key={p.id} className={CARD}>
                <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/40">
                  <OptimizedImage
                    src={img}
                    alt={p.name}
                    className="w-full"
                    aspectRatio="video"
                    objectFit="cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    loading="lazy"
                  />
                </div>

                <div className="mt-4">
                  <div className="font-semibold leading-tight line-clamp-1">{p.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground line-clamp-1">{p.client}</div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {p.description ||
                      "Implementación en campo con enfoque en seguridad, pruebas y continuidad operativa."}
                  </p>
                </div>

                <div className="mt-5 flex gap-3">
                  <Button asChild size="sm" className="rounded-xl bg-accent hover:bg-accent/90">
                    <NavLink
                      to={
                        catBase
                          ? `${ROUTES.PROJECTS}?cat=${encodeURIComponent(catBase)}`
                          : ROUTES.PROJECTS
                      }
                    >
                      Ver casos
                    </NavLink>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="rounded-xl">
                    <NavLink to={ROUTES.PROJECTS}>Ver todos</NavLink>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-3xl border border-border/60 bg-muted/20 p-8 text-center">
          <div className="text-2xl font-semibold">¿Quieres un caso similar en tu operación?</div>
          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Te ayudamos a definir alcance, criterios de aceptación y plan de pruebas para cotizar con claridad.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90">
              <NavLink to={`${ROUTES.CONTACT}#form`}>Solicitar propuesta</NavLink>
            </Button>
            <Button asChild variant="outline" className="rounded-2xl">
              <NavLink to={ROUTES.PROJECTS}>Ver proyectos</NavLink>
            </Button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
