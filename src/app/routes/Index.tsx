import Header from "@/components/layout/Header";
import Hero from "@/components/marketing/HeroSection";
import AboutSection from "@/components/marketing/AboutSection";
import ProductsSection from "@/components/products/ProductsSection";
import ProjectsSection from "@/modules/projects/components/ProjectsSection";
import ClientsPartnersSection from "@/modules/projects/components/ClientsPartnersSection";
import ServicesSection from "@/components/marketing/ServicesSection";
import ContactSection from "@/modules/contact/components/ContactSection";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <ProductsSection />
        <ProjectsSection />
        <ClientsPartnersSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;