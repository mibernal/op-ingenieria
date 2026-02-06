import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LandingPage from "@/modules/marketing/pages/LandingPage";

const Index = () => {
  useEffect(() => {
    // Remover la clase critical-hidden cuando el componente se monte
    const root = document.getElementById('root');
    if (root) {
      root.classList.remove('critical-hidden');
      root.classList.add('critical-visible');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
};

export default Index;