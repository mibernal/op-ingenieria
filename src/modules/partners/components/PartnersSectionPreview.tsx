import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import LogoCarousel from "@/shared/components/LogoCarousel";
import { partnersService } from "@/core/services/partnersService";
import { cn } from "@/lib/utils";
import { buildContactIntentHref } from "@/shared/utils/contact-intent";
import { PARTNERS_COPY, PARTNER_GROUPS, PARTNER_SELECTION_CRITERIA } from "@/modules/partners/content/partners.copy";

const CARD = cn(
  "rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md",
  "p-6 shadow-sm shadow-black/5"
);

export default function PartnersSectionPreview() {
  const copy = PARTNERS_COPY.preview;
  const partners = partnersService.list();
  const specialtyLabels = useMemo(() => PARTNER_GROUPS.map((group) => group.label).slice(0, 4), []);
  const criteria = useMemo(() => PARTNER_SELECTION_CRITERIA.slice(0, 3), []);

  return (
    <SectionShell id="partners" variant="tint" className="py-9 md:py-12">
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
        <div className="grid gap-5 lg:grid-cols-12">
          <article className={cn(CARD, "lg:col-span-4")}>
            <div className="text-[11px] md:text-xs tracking-[0.18em] text-muted-foreground">CRITERIOS DE SELECCION</div>
            <ul className="mt-4 space-y-2">
              {criteria.map((criterion) => (
                <li key={criterion} className="flex items-start gap-2 text-[13px] md:text-sm text-foreground/90">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{criterion}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className={cn(CARD, "lg:col-span-8")}>
            <div className="text-[13px] md:text-sm font-semibold text-foreground/90">{copy.specialtiesLabel}</div>

            <div className="mt-3 flex flex-wrap gap-2">
              {specialtyLabels.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-full border border-border/60 bg-card/70 px-3 py-1.5 text-[12px] md:text-sm text-muted-foreground"
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <div className="text-[13px] md:text-sm font-semibold text-foreground/90">{copy.brandsLabel}</div>
              <div className="mt-3 min-h-[150px] md:min-h-[170px]">
                <LogoCarousel
                  items={partners}
                  variant="partners"
                  autoPlay
                  speed={4}
                  responsive={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
                  gapPx={14}
                  className="bg-transparent"
                />
              </div>
            </div>
          </article>
        </div>

        <div className="mt-7 flex justify-center">
          <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90">
            <NavLink to={buildContactIntentHref({ intent: "diagnostico", source: "landing-partners" })}>
              {copy.primaryCta}
            </NavLink>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
