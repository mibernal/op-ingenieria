import { useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/seo/Seo";

import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";
import { Badge } from "@/components/ui/badge";

import { clientsService } from "@/core/services/clientsService";
import OptimizedImage from "@/shared/components/OptimizedImage";

type Client = {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  category?: string; // opcional
  industry?: string; // opcional
};

const FALLBACK_TYPES = [
  "Respaldo / Continuidad",
  "UPS / baterías",
  "ATS/AMF / transferencias",
  "Solar fotovoltaica",
  "Tableros / control",
  "Mantenimiento",
];

export default function ClientsPage() {
  const clients = clientsService.list() as Client[];

  // ✅ Construimos filtros “por data” si existe, si no usamos fallback
  const availableIndustries = useMemo(() => {
    const set = new Set<string>();
    clients.forEach((c) => {
      if (c.industry) set.add(c.industry);
      else if (c.category) set.add(c.category);
    });
    const arr = Array.from(set);
    return arr.length ? arr.sort() : ["Institucional", "Industrial", "Comercial"];
  }, [clients]);

  const [industry, setIndustry] = useState<string>("Todos");

  const filtered = useMemo(() => {
    if (industry === "Todos") return clients;
    return clients.filter((c) => (c.industry || c.category || "").toLowerCase() === industry.toLowerCase());
  }, [clients, industry]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo
        title="Clientes | O&P Ingeniería"
        description="Organizaciones que confían en O&P Ingeniería para soluciones de energía, respaldo y continuidad operativa."
      />

      <Header />

      <main className="flex-1">
        {/* Hero */}
        <SectionShell variant="dark">
          <SectionHeader
            eyebrow="CLIENTES"
            title={
              <>
                Respaldo real.{" "}
                <span className="text-accent">Confianza demostrable</span>.
              </>
            }
            subtitle="Una muestra ordenada de organizaciones con las que hemos trabajado en continuidad energética, energía solar e infraestructura eléctrica."
          />

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90">
              <NavLink to={ROUTES.PROJECTS}>Ver proyectos</NavLink>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
            >
              <NavLink to={`${ROUTES.CONTACT}#form`}>Hablar con un ingeniero</NavLink>
            </Button>
          </div>
        </SectionShell>

        {/* Content */}
        <SectionShell variant="light">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Explora por sector</div>
                <div className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
                  Clientes y organizaciones
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setIndustry("Todos")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm border transition-colors",
                    industry === "Todos"
                      ? "bg-accent/10 border-accent/30 text-accent"
                      : "bg-background border-border/60 hover:bg-muted/30"
                  )}
                >
                  Todos
                </button>

                {availableIndustries.map((x) => (
                  <button
                    key={x}
                    type="button"
                    onClick={() => setIndustry(x)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm border transition-colors",
                      industry === x
                        ? "bg-accent/10 border-accent/30 text-accent"
                        : "bg-background border-border/60 hover:bg-muted/30"
                    )}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <article
                  key={c.id}
                  className={cn(
                    "rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md",
                    "p-6 shadow-sm shadow-black/5",
                    "hover:shadow-lg hover:shadow-black/10 hover:-translate-y-0.5 transition-all"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl border border-border/60 bg-background/60 grid place-items-center overflow-hidden">
                      {c.logo ? (
                        <OptimizedImage
                          src={c.logo}
                          alt={c.name}
                          width={112}
                          height={112}
                          className="h-full w-full object-contain p-2"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground px-2 text-center">
                          {c.name}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="font-semibold leading-tight truncate">{c.name}</div>
                      {c.industry || c.category ? (
                        <div className="mt-2">
                          <Badge variant="secondary">
                            {c.industry || c.category}
                          </Badge>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {c.description ? (
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                      {c.description}
                    </p>
                  ) : (
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                      Proyectos y soporte en infraestructura eléctrica y continuidad operativa.
                    </p>
                  )}
                </article>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 rounded-3xl border border-border/60 bg-muted/20 p-8 text-center">
              <div className="text-2xl font-semibold">¿Tu operación es crítica?</div>
              <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Te ayudamos a definir alcance, protecciones, pruebas y entregables para cotizar bien desde el inicio.
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
      </main>

      <Footer />
    </div>
  );
}
