// src/app/routes/Index.tsx
import { Suspense, lazy } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const LandingPage = lazy(() => import("@/modules/marketing/pages/LandingPage"));

const Index = () => {
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
