// src/modules/about/pages/AboutPage.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/seo/Seo";
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import { buildContactIntentHref } from "@/shared/utils/contact-intent";
import {
  ABOUT_BLOCKS,
  ABOUT_COPY,
  ABOUT_IDENTITY,
  ABOUT_QUALITY,
  ABOUT_BADGES,
  ABOUT_QUALITY_POLICY,
} from "../content/about.content";

export default function AboutPage() {
  const copy = ABOUT_COPY.page;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo
        title="Nosotros | O&P Ingeniería"
        description="Ingeniería eléctrica y electromecánica con energía convencional y solar: método industrial, control de riesgos y entregables verificables."
      />
      <Header />

      <main className="flex-1">
        {/* HERO: Ejecutivo, sin repetir identidad ni misión */}
        <SectionShell variant="dark" className="pt-12 pb-12 md:pt-16 md:pb-16">
          <SectionHeader
            eyebrow={copy.eyebrow}
            title={
              <>
                {copy.titleA} <span className="text-accent">{copy.titleB}</span>
              </>
            }
            subtitle={copy.subtitle}
          />

          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90">
                <NavLink to={buildContactIntentHref({ intent: "diagnostico", source: "about-page-hero" })}>
                  {copy.heroCtaPrimary}
                </NavLink>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
              >
                <NavLink to={ROUTES.PROJECTS}>{copy.heroCtaSecondary}</NavLink>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {ABOUT_BADGES.map((b) => (
                <div
                  key={b.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-primary-foreground/80"
                >
                  <b.icon className="h-4 w-4 text-accent" />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {ABOUT_BLOCKS.map((b) => (
                <div key={b.title} className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md p-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 ring-1 ring-accent/25">
                    <b.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="mt-4 text-base font-semibold text-primary-foreground">{b.title}</div>
                  <p className="mt-2 text-sm text-primary-foreground/75 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionShell>

        {/* IDENTIDAD: Nosotros */}
        <SectionShell variant="light" className="pt-10 pb-2 md:pt-14 md:pb-3">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              align="left"
              title={copy.identityTitle}
              subtitle={copy.identitySubtitle}
              className="mb-4 md:mb-5"
            />
          </div>
        </SectionShell>

        {/* MISIÓN / VISIÓN */}
        <SectionShell variant="light" className="pt-2 pb-10 md:pt-3 md:pb-14">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              align="left"
              eyebrow="DIRECCIÓN ESTRATÉGICA"
              title="Misión y Visión"
              subtitle="Marco estratégico que orienta la ejecución técnica, la trazabilidad y la continuidad operativa."
            />

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {ABOUT_IDENTITY.map((c) => (
                <div
                  key={c.title}
                  className={cn(
                    "rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-7",
                    "shadow-sm shadow-black/5",
                    "hover:shadow-lg hover:shadow-black/10 hover:-translate-y-0.5 transition-all"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
                      <c.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg font-semibold">{c.title}</div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionShell>

        {/* CALIDAD: compromiso + lineamientos */}
        <SectionShell variant="light" className="py-10 md:py-14">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              align="left"
              eyebrow={copy.qualityEyebrow}
              title={copy.qualityTitle}
              subtitle={copy.qualitySubtitle}
            />

            <div className="mt-8 grid gap-5 lg:grid-cols-12 items-start">
              <div className="lg:col-span-4">
                <div className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-7 shadow-sm shadow-black/5">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
                    <ABOUT_QUALITY_POLICY.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="mt-4 text-lg font-semibold">{ABOUT_QUALITY_POLICY.title}</div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{ABOUT_QUALITY_POLICY.desc}</p>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-7 shadow-sm shadow-black/5">
                  <div className="text-xs tracking-[0.18em] text-muted-foreground">LINEAMIENTOS OPERATIVOS</div>
                  <ol className="mt-5 space-y-5">
                    {ABOUT_QUALITY.map((q, idx) => (
                      <li key={q.title} className="flex items-start gap-3">
                        <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20 text-sm font-semibold text-accent">
                          {idx + 1}
                        </div>
                        <div className="min-w-0">
                          <div className="text-base font-semibold">{q.title}</div>
                          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{q.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>
      </main>

      <Footer />
    </div>
  );
}
