import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/seo/Seo";
import SectionShell from "@/shared/components/SectionShell";
import SectionHeader from "@/shared/components/SectionHeader";
import PartnersSection from "@/modules/partners/components/PartnersSection";

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo
        title="Partners | O&P Ingeniería"
        description="Alianzas estratégicas y marcas para garantizar soporte, disponibilidad y escalabilidad."
      />
      <Header />
      <main className="flex-1">
        <SectionShell variant="dark">
          <SectionHeader
            eyebrow="PARTNERS"
            title={
              <>
                Ecosistema para operación{" "}
                <span className="text-accent">con soporte</span>.
              </>
            }
            subtitle="Seleccionamos marcas por criterio técnico, disponibilidad y confiabilidad."
          />
        </SectionShell>

        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
}
