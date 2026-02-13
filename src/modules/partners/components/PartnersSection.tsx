import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionShell from "@/shared/components/SectionShell";
import LogoCarousel from "@/shared/components/LogoCarousel";
import { partnersService } from "@/core/services/partnersService";
import { cn } from "@/lib/utils";
import {
  PARTNERS_COPY,
  PARTNER_GROUPS,
  PARTNER_SELECTION_CRITERIA,
} from "@/modules/partners/content/partners.copy";

export default function PartnersSection() {
  const reduced = useReducedMotion();
  const partners = partnersService.list();
  const copy = PARTNERS_COPY;

  const groupedPartners = useMemo(() => {
    const byId = new Map(partners.map((partner) => [partner.id, partner]));
    return PARTNER_GROUPS.map((group) => ({
      ...group,
      partners: group.partnerIds.map((id) => byId.get(id)).filter((p): p is NonNullable<typeof p> => !!p),
    })).filter((group) => group.partners.length > 0);
  }, [partners]);

  const [activeGroupId, setActiveGroupId] = useState<string>(groupedPartners[0]?.id ?? "");

  useEffect(() => {
    if (!groupedPartners.length) return;
    if (groupedPartners.some((group) => group.id === activeGroupId)) return;
    setActiveGroupId(groupedPartners[0].id);
  }, [groupedPartners, activeGroupId]);

  const activeGroup = useMemo(
    () => groupedPartners.find((group) => group.id === activeGroupId) ?? groupedPartners[0] ?? null,
    [groupedPartners, activeGroupId]
  );

  if (!activeGroup) return null;

  return (
    <SectionShell id="partners" variant="light" className="pt-4 pb-16 md:pt-6 md:pb-24">  
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-6 md:p-7 shadow-sm shadow-black/5">
          <h3 className="mt-2 text-xl font-semibold">{copy.section.label}</h3>
          <p className="mt-3 max-w-4xl text-sm md:text-base leading-relaxed text-muted-foreground">
            {copy.section.summary}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {groupedPartners.map((group) => {
            const active = group.id === activeGroup.id;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveGroupId(group.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm border transition-colors",
                  active
                    ? "bg-accent/10 border-accent/30 text-accent"
                    : "bg-background border-border/60 hover:bg-muted/30"
                )}
                aria-pressed={active}
              >
                {group.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12 items-start">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="lg:col-span-4"
          >
            <div className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-6 shadow-sm shadow-black/5">
              <div className="text-xs tracking-[0.18em] text-muted-foreground">ESPECIALIDAD ACTIVA</div>
              <h3 className="mt-2 text-xl font-semibold">{activeGroup.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{activeGroup.subtitle}</p>

              <ul className="mt-5 space-y-3">
                {activeGroup.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
                    <span className="text-foreground/90">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.28, ease: "easeOut", delay: 0.05 }}
            className={cn(
              "lg:col-span-8 rounded-3xl border border-border/60",
              "bg-background/70 backdrop-blur-md p-6 shadow-sm shadow-black/5"
            )}
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">{activeGroup.label}</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Marcas seleccionadas para esta especialidad, con compatibilidad tecnica y enfoque en continuidad operativa.
                </p>
              </div>
              <div className="rounded-full border border-border/60 bg-card/70 px-3 py-1 text-xs text-muted-foreground">
                {activeGroup.partners.length} marcas
              </div>
            </div>

            <div className="mt-4">
              <LogoCarousel
                items={activeGroup.partners}
                variant="partners"
                autoPlay
                speed={5}
                responsive={{ base: 2, sm: 3, md: 4, lg: 4, xl: 5 }}
                gapPx={14}
                className="bg-transparent"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
}
