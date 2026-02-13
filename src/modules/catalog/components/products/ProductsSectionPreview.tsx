import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import { cn } from "@/lib/utils";
import { categories as allCategories, products as allProducts } from "@/modules/catalog/data/products";
import { CATALOG_COPY } from "@/modules/catalog/content/catalog.copy";

const CARD = cn(
  "rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md",
  "p-6 shadow-sm shadow-black/5",
  "hover:shadow-lg hover:shadow-black/10 hover:-translate-y-0.5 transition-all"
);

const PRESELECT_STEPS = [
  "Definir criticidad de carga y continuidad requerida en sitio.",
  "Preseleccionar categoria tecnica segun el tipo de solucion.",
  "Ajustar configuracion final segun normatividad local, operacion y mantenimiento.",
];

export default function ProductsSectionPreview() {
  const copy = CATALOG_COPY.preview;
  const featuredCategories = useMemo(() => allCategories.slice(0, 4), []);
  const categoryTags = useMemo(() => allCategories.slice(4, 10), []);

  return (
    <SectionShell id="productos" variant="tint" className="py-9 md:py-12">
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
          <article className={cn(CARD, "lg:col-span-8")}>
            <div className="text-[11px] md:text-xs tracking-[0.18em] text-muted-foreground">PRESELECCION TECNICA</div>
            <p className="mt-3 text-[13px] md:text-sm text-muted-foreground leading-relaxed">
              El catalogo organiza soluciones por especialidad para tomar decisiones tecnicas rapidas sin improvisar en campo.
            </p>

            <ul className="mt-4 space-y-2 text-[13px] md:text-sm text-foreground/90">
              {PRESELECT_STEPS.map((step) => (
                <li key={step} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {categoryTags.map((category) => (
                <span
                  key={category.id}
                  className="inline-flex items-center rounded-full border border-border/60 bg-card/70 px-3 py-1.5 text-[12px] md:text-sm text-muted-foreground"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </article>

          <article className={cn(CARD, "lg:col-span-4")}>
            <div className="text-[11px] md:text-xs tracking-[0.18em] text-muted-foreground">COBERTURA</div>
            <div className="mt-3 space-y-3">
              <div className="rounded-2xl border border-border/60 bg-background/40 px-4 py-3">
                <div className="text-xl font-semibold">{allCategories.length}</div>
                <div className="text-[13px] md:text-sm text-muted-foreground">Categorias tecnicas</div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/40 px-4 py-3">
                <div className="text-xl font-semibold">{allProducts.length}</div>
                <div className="text-[13px] md:text-sm text-muted-foreground">Referencias de producto</div>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((category) => (
            <article key={category.id} className={CARD}>
              <div className="text-[11px] md:text-xs tracking-[0.18em] text-muted-foreground">FAMILIA</div>
              <h3 className="mt-2 text-base font-semibold leading-tight">{category.name}</h3>
              <p className="mt-2 text-[13px] md:text-sm text-muted-foreground leading-relaxed line-clamp-3 md:line-clamp-none">{category.summary}</p>
            </article>
          ))}
        </div>

        <div className="mt-7 flex justify-center">
          <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90">
            <NavLink to={ROUTES.CATALOG}>{copy.primaryCta}</NavLink>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
