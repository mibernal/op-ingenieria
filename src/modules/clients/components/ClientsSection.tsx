import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import LogoCarousel from "@/shared/components/LogoCarousel";
import { clientsService } from "@/core/services/clientsService";
import { cn } from "@/lib/utils";
import { CLIENTS_COPY } from "@/modules/clients/content/clients.copy";

const CARD = cn(
  "rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md",
  "p-6 shadow-sm shadow-black/5"
);

const TRUST_POINTS = [
  "Cobertura para industria, salud, educacion y comercio.",
  "Intervenciones en sitio con continuidad operativa como criterio base.",
  "Documentacion tecnica util para operacion y mantenimiento.",
];

export default function ClientsSection() {
  const copy = CLIENTS_COPY.section;
  const clients = clientsService.list();
  const clientCount = useMemo(() => clients.length, [clients]);

  return (
    <SectionShell id="clientes" variant="light" className="py-9 md:py-12">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={
          <>
            {copy.titleA} <span className="text-accent">{copy.titleB}</span>.
          </>
        }
        subtitle={copy.subtitle}
        className="mb-7 md:mb-8"
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 lg:grid-cols-12">
          <article className={cn(CARD, "lg:col-span-4")}>
            <div className="text-[11px] md:text-xs tracking-[0.18em] text-muted-foreground">CONFIANZA OPERATIVA</div>
            <div className="mt-3 text-2xl font-semibold">{clientCount}</div>
            <p className="text-[13px] md:text-sm text-muted-foreground">Organizaciones visibles en esta muestra</p>

            <ul className="mt-4 space-y-2">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2 text-[13px] md:text-sm text-foreground/90">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className={cn(CARD, "lg:col-span-8")}>
            <div className="text-lg font-semibold">{copy.carouselTitle}</div>
            <p className="mt-2 text-[13px] md:text-sm text-muted-foreground">{copy.carouselSubtitle}</p>

            <div className="mt-6 min-h-[160px] md:min-h-[180px]">
              <LogoCarousel
                items={clients}
                variant="clients"
                autoPlay
                speed={3}
                responsive={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
                gapPx={16}
                className="bg-transparent"
              />
            </div>
          </article>
        </div>

        <div className="mt-7 flex justify-center">
          <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20">
            <NavLink to={ROUTES.PROJECTS}>{copy.primaryCta}</NavLink>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
