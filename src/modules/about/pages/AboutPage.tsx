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
import {
  ABOUT_BLOCKS,
  ABOUT_COPY,
  ABOUT_STEPS,
  ABOUT_IDENTITY,
  ABOUT_QUALITY,
  ABOUT_BADGES,
  ABOUT_NOSOTROS,
  ABOUT_FOCUS,
  ABOUT_QUALITY_POLICY,
} from "../content/about.content";
import { CheckCircle2, ArrowRight } from "lucide-react";

const ACCEPTANCE_POINTS = [
  "Alcance definido y validado antes de intervenir",
  "Riesgos y mitigaciones documentadas",
  "Pruebas funcionales y criterios de aceptación",
  "Entregables y trazabilidad para operación y auditoría",
];

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
        <SectionShell variant="dark">
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
                <NavLink to={`${ROUTES.CONTACT}#form`}>{copy.heroCtaPrimary}</NavLink>
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

        {/* IDENTIDAD: Nosotros (breve) + Enfoque (3 señales) + Misión/Visión */}
        <SectionShell variant="light">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              align="left"
              eyebrow={copy.identityEyebrow}
              title={copy.identityTitle}
              subtitle={copy.identitySubtitle}
            />

            {/* Nosotros (1 card) + Enfoque (3 mini-cards) */}
            <div className="mt-8 grid gap-5 lg:grid-cols-12 items-start">
              <div className="lg:col-span-7">
                <div className={cn("rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-7", "shadow-sm shadow-black/5")}>
                  <div className="text-xs tracking-[0.18em] text-muted-foreground">{ABOUT_NOSOTROS.title}</div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{ABOUT_NOSOTROS.description}</p>

                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90">
                      <NavLink to={`${ROUTES.CONTACT}#form`} className="inline-flex items-center gap-2">
                        Solicitar diagnóstico <ArrowRight className="h-4 w-4" />
                      </NavLink>
                    </Button>
                    <Button asChild variant="outline" className="rounded-2xl">
                      <NavLink to={ROUTES.PROJECTS}>Ver casos</NavLink>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  {ABOUT_FOCUS.map((f) => (
                    <div
                      key={f.title}
                      className={cn(
                        "rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-6",
                        "shadow-sm shadow-black/5",
                        "hover:shadow-lg hover:shadow-black/10 transition-shadow"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
                          <f.icon className="h-5 w-5 text-accent" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-base font-semibold">{f.title}</div>
                          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Misión / Visión */}
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
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

        {/* MÉTODO: pasos + criterios */}
        <SectionShell variant="light">
          <div className="mx-auto max-w-6xl">
            <SectionHeader align="left" eyebrow={copy.workEyebrow} title={copy.workTitle} subtitle={copy.workSubtitle} />

            <div className="mt-8 grid gap-6 lg:grid-cols-12 items-start">
              <div className="lg:col-span-8">
                <div className="grid gap-5 md:grid-cols-2">
                  {ABOUT_STEPS.map((s) => (
                    <div
                      key={s.title}
                      className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-7 shadow-sm shadow-black/5 hover:shadow-lg hover:shadow-black/10 transition-shadow"
                    >
                      <div className="text-lg font-semibold">{s.title}</div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-7 shadow-sm shadow-black/5">
                  <div className="text-xs tracking-[0.18em] text-muted-foreground">CRITERIOS DE ACEPTACIÓN</div>
                  <div className="mt-3 text-base font-semibold">Entrega sin ambigüedad</div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Definimos criterios y dejamos evidencia para que operación y mantenimiento actúen con certeza.
                  </p>

                  <ul className="mt-5 space-y-3">
                    {ACCEPTANCE_POINTS.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
                        <span className="text-sm text-foreground/90 leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex gap-3">
                    <Button asChild size="sm" className="rounded-xl bg-accent hover:bg-accent/90">
                      <NavLink to={`${ROUTES.CONTACT}#form`}>Agendar diagnóstico</NavLink>
                    </Button>
                    <Button asChild size="sm" variant="outline" className="rounded-xl">
                      <NavLink to={ROUTES.PROJECTS}>Ver casos</NavLink>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>

        {/* CALIDAD: política (breve) + 3 compromisos (los tuyos, sin muro) */}
        <SectionShell variant="light">
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
                <div className="grid gap-5 md:grid-cols-2">
                  {ABOUT_QUALITY.map((q, idx) => (
                    <div
                      key={q.title}
                      className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-7 shadow-sm shadow-black/5 hover:shadow-lg hover:shadow-black/10 transition-shadow"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-base font-semibold">{q.title}</div>
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20 text-sm font-semibold text-accent">
                          {idx + 1}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{q.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90">
                    <NavLink to={`${ROUTES.CONTACT}#form`}>Solicitar visita técnica</NavLink>
                  </Button>
                  <Button asChild variant="outline" className="rounded-2xl">
                    <NavLink to={ROUTES.SERVICES}>Ver servicios</NavLink>
                  </Button>
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
