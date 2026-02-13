// src/app/App.tsx
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/config/routes";

import Index from "./routes/Index";
import NotFound from "./routes/NotFound";
import CatalogPage from "@/modules/catalog/pages/CatalogPage";
import ProjectsPage from "@/modules/projects/pages/ProjectsPage";
import ContactPage from "@/modules/contact/pages/ContactPage";
import LegalPage from "@/modules/legal/pages/LegalPage";
import ScrollToHash from "./routes/ScrollToHash";

import AboutPage from "@/modules/about/pages/AboutPage";
import ServicesPage from "@/modules/services/pages/ServicesPage";

// ✅ NUEVO
import PartnersPage from "@/modules/partners/pages/PartnersPage";
import ClientsPage from "@/modules/clients/pages/ClientsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.classList.remove("critical-hidden");
      root.classList.add("critical-visible");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={300}>
        <Toaster />
        <Sonner />

        <BrowserRouter
          basename={import.meta.env.BASE_URL}
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <ScrollToHash />

          <Routes>
            <Route path={ROUTES.HOME} element={<Index />} />

            <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
            <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
            <Route path={ROUTES.CONTACT} element={<ContactPage />} />
            <Route path={ROUTES.LEGAL} element={<LegalPage />} />

            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.SERVICES} element={<ServicesPage />} />

            {/* ✅ NUEVAS rutas */}
            <Route path={ROUTES.PARTNERS} element={<PartnersPage />} />
            <Route path={ROUTES.CLIENTS} element={<ClientsPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
