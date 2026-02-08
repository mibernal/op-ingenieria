// modules/marketing/components/HeroSection.tsx - VERSIÓN MEJORADA
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES } from "@/config/routes";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="inicio" className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      {/* Background Pattern - Industrial/Technological */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gradient-to-r from-accent/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 overflow-hidden">
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
              ease: "linear"
            }}
            style={{ top: `${(i + 1) * 12}%` }}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/50 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Badge de prestigio */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-background/20 rounded-full px-4 py-2 mb-8 md:mb-12"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-primary-foreground/90 tracking-wide">
                LÍDERES EN INGENIERÍA ELÉCTRICA DESDE 2014
              </span>
            </motion.div>

            {/* Título principal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground mb-6 md:mb-8 leading-tight tracking-tight">
              <span className="block">Soluciones Integrales en</span>
              <span className="block bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent mt-2">
                Ingeniería Eléctrica
              </span>
            </h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed font-light"
            >
              Diseñamos, implementamos y ejecutamos proyectos con los más altos estándares 
              de <span className="font-semibold text-accent">calidad</span>,{" "}
              <span className="font-semibold text-accent">innovación</span> y{" "}
              <span className="font-semibold text-accent">confiabilidad</span> 
              para el sector industrial y comercial.
              
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
                  "group bg-accent text-accent-foreground hover:bg-accent/90",
                  "px-8 py-6 text-lg rounded-xl",
                  "transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
                  "relative overflow-hidden"
                )}
              >
                <NavLink to={ROUTES.CONTACT}>
                  <span className="relative z-10 flex items-center gap-2">
                    Solicitar Cotización
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </NavLink>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className={cn(
                  "border-2 border-primary-foreground/30 text-primary-foreground",
                  "hover:bg-primary-foreground/10 px-8 py-6 text-lg rounded-xl",
                  "transform transition-all duration-300 hover:-translate-y-1",
                  "backdrop-blur-sm"
                )}
              >
                <NavLink to={ROUTES.PROJECTS}>Ver Proyectos Ejecutados</NavLink>
              </Button>
            </motion.div>

            {/* Indicadores de confianza */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {[
                { value: "200+", label: "Proyectos Completados" },
                { value: "15+", label: "Años de Experiencia" },
                { value: "50+", label: "Clientes Satisfechos" },
                { value: "100%", label: "Compromiso Calidad" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-primary-foreground/50 tracking-wider">
            EXPLORAR
          </span>
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
