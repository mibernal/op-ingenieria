//src/app/App.tsx
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
import ProjectsPage from "@/modules/projects/pages/ProjectsPage"; // NUEVO
import ContactPage from "@/modules/contact/pages/ContactPage"; // NUEVO
import ScrollToHash from "./routes/ScrollToHash";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 10, // 10 minutos
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.classList.remove('critical-hidden');
      root.classList.add('critical-visible');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={300}>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <ScrollToHash />
          <Routes>
            <Route path={ROUTES.HOME} element={<Index />} />
            <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
            <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} /> {/* NUEVO */}
            <Route path={ROUTES.CONTACT} element={<ContactPage />} /> {/* NUEVO */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
