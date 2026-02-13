import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/seo/Seo";

import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";
import { buildContactIntentHref } from "@/shared/utils/contact-intent";

import { clientsService } from "@/core/services/clientsService";
import OptimizedImage from "@/shared/components/OptimizedImage";
import { CLIENTS_COPY } from "@/modules/clients/content/clients.copy";

type Client = {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  category?: string; // opcional
  industry?: string; // opcional
};

export default function ClientsPage() {
  const copy = CLIENTS_COPY.page;
  const clients = clientsService.list() as Client[];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo
        title="Clientes | O&P Ingeniería"
        description="Organizaciones que confían en O&P Ingeniería para soluciones de energía, respaldo y continuidad operativa."
      />

      <Header />

      <main className="flex-1">
        {/* Hero */}
        <SectionShell variant="dark" className="pt-10 pb-10 md:pt-14 md:pb-14">
          <SectionHeader
            eyebrow={copy.eyebrow}
            title={
              <>
                {copy.titleA}{" "}
                <span className="text-accent">{copy.titleB}</span>.
              </>
            }
            subtitle={copy.subtitle}
          />

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90">
              <NavLink to={ROUTES.PROJECTS}>{copy.primaryCta}</NavLink>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
            >
              <NavLink to={buildContactIntentHref({ intent: "diagnostico", source: "clients-page-hero" })}>
                {copy.secondaryCta}
              </NavLink>
            </Button>
          </div>
        </SectionShell>

        {/* Content */}
        <SectionShell variant="light" className="pt-4 pb-16 md:pt-6 md:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-semibold tracking-tight">
                {copy.heading}
              </div>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {clients.map((c) => (
                <article
                  key={c.id}
                  className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md p-5 md:p-6 shadow-sm shadow-black/5 hover:shadow-lg hover:shadow-black/10 hover:-translate-y-0.5 transition-all"
                  title={c.name}
                  aria-label={c.name}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/60 bg-background/60">
                    {c.logo ? (
                      <OptimizedImage
                        src={c.logo}
                        alt={c.name}
                        className="h-full w-full"
                        imgClassName="object-contain object-center p-4 md:p-5"
                        aspectRatio="custom"
                        objectFit="contain"
                        fadeIn={false}
                        disablePlaceholder
                        loading="lazy"
                      />
                    ) : (
                      <div className="grid h-full place-items-center px-4">
                        <span className="text-sm font-medium text-muted-foreground text-center">{c.name}</span>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </SectionShell>
      </main>

      <Footer />
    </div>
  );
}
