//src/app/routes/Index.tsx
import { Suspense, lazy, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Lazy loading para LandingPage
const LandingPage = lazy(() => import("@/modules/marketing/pages/LandingPage"));

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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner />}>
          <LandingPage />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;