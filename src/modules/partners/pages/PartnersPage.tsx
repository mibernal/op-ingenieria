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
        description="Ecosistema de partners para operación crítica: interoperabilidad, disponibilidad y soporte técnico especializado."
      />
      <Header />
      <main className="flex-1">
        <SectionShell variant="dark" className="pt-10 pb-10 md:pt-14 md:pb-14">
          <SectionHeader
            eyebrow="PARTNERS"
            title={
              <>
                Ecosistema de alianzas para{" "}
                <span className="text-accent">operación crítica</span>.
              </>
            }
            subtitle="Seleccionamos fabricantes por interoperabilidad, disponibilidad y soporte posventa con criterio de continuidad."
          />
        </SectionShell>

        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
}
