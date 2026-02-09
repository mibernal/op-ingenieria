// modules/marketing/components/HeroSection.tsx - FIX overlays + perf
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";

type Dot = {
  left: string;
  top: string;
  duration: number;
  delay: number;
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // ✅ Evita Math.random en cada render (saltos / reflow)
  const floatingDots = useMemo<Dot[]>(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: i * 0.5,
    }));
  }, []);

  return (
    <section
      id="inicio"
      className={cn(
        "relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-primary via-primary/95 to-primary/90",
        // ✅ ayuda a aislar stacking contexts (útil con framer/transforms)
        "isolate"
      )}
    >
      {/* Background Pattern - decorativo: NO debe capturar clicks */}
      <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gradient-to-r from-accent/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Animated Grid Lines - decorativo: NO debe capturar clicks */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 20,
              delay: i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ top: `${(i + 1) * 12}%` }}
          />
        ))}
      </div>

      {/* Floating Elements - decorativo: NO debe capturar clicks */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {floatingDots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/50 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              delay: dot.delay,
            }}
            style={{
              left: dot.left,
              top: dot.top,
            }}
          />
        ))}
      </div>

      {/* Main Content (clickeable) */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-background/20 rounded-full px-4 py-2 mb-8 md:mb-12"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-primary-foreground/90 tracking-wide">
                LÍDERES EN INGENIERÍA ELÉCTRICA DESDE 2014
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground mb-6 md:mb-8 leading-tight tracking-tight">
              <span className="block">Soluciones Integrales en</span>
              <span className="block bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent mt-2">
                Ingeniería Eléctrica
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed font-light"
            >
              Diseñamos, implementamos y ejecutamos proyectos con los más altos estándares de{" "}
              <span className="font-semibold text-accent">calidad</span>,{" "}
              <span className="font-semibold text-accent">innovación</span> y{" "}
              <span className="font-semibold text-accent">confiabilidad</span> para el sector industrial y comercial.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                asChild
                className={cn(
                  "group h-14 px-8 rounded-2xl",
                  "bg-accent text-accent-foreground",
                  "shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40",
                  "hover:bg-accent/90",
                  "transition-all duration-300",
                  "hover:-translate-y-0.5 active:translate-y-0",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                  "backdrop-blur-sm",
                  "relative overflow-hidden"
                )}
              >
                <NavLink to={ROUTES.CONTACT} className="relative z-10 inline-flex items-center gap-2">
                  Solicitar Cotización
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </NavLink>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className={cn(
                  "h-14 px-8 rounded-2xl",
                  "border border-white/20 bg-white/5 text-white/90",
                  "hover:bg-white/10 hover:text-white hover:border-white/30",
                  "transition-all duration-300",
                  "hover:-translate-y-0.5 active:translate-y-0",
                  "shadow-sm hover:shadow-md",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                  "backdrop-blur-md"
                )}
              >
                <NavLink to={ROUTES.PROJECTS} className="inline-flex items-center justify-center gap-2">
                  Ver Proyectos Ejecutados
                  <span aria-hidden className="text-white/70">›</span>
                </NavLink>
              </Button>
            </motion.div>

            {/* Trust stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {[
                { value: "300+", label: "Proyectos Completados" },
                { value: "12+", label: "Años de Experiencia" },
                { value: "100+", label: "Clientes Satisfechos" },
                { value: "100%", label: "Compromiso Calidad" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - decorativo: NO debe capturar clicks */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="pointer-events-none absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-primary-foreground/50 tracking-wider">EXPLORAR</span>
          <div className="w-6 h-10 border-2 border-primary-foreground/20 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-3 bg-accent rounded-full mt-2"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
