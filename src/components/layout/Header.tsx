// components/layout/Header.tsx - VERSIÓN CON FRAMER MOTION (TIPADA)
import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { 
    label: "Productos", 
    href: "#productos",
    submenu: [
      { label: "Grupos Electrógenos", href: "#categoria-grupos" },
      { label: "UPS y Estabilizadores", href: "#categoria-ups" },
      { label: "Energía Solar", href: "#categoria-solar" },
      { label: "Tableros Eléctricos", href: "#categoria-tableros" }
    ]
  },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Clientes", href: "#clientes" },
  { label: "Contacto", href: "#contacto" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Variantes de animación para el menú móvil (tipadas) ---
  // Nota: `ease` usa arrays cubic-bezier en lugar de strings para cumplir los tipos de framer-motion.
  const mobileMenuVariants: Variants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.18,
        // easeOut approximation (cubic-bezier)
        ease: [0.33, 1, 0.68, 1],
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.28,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-500",
      scrolled 
        ? "bg-background/95 backdrop-blur-xl shadow-2xl shadow-primary/10 py-3"
        : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Mejorado */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={cn(
                "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500",
                scrolled 
                  ? "bg-accent/10 border border-accent/20" 
                  : "bg-primary-foreground/10 border border-primary-foreground/20"
              )}>
                <span className="text-2xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                  O&P
                </span>
              </div>
              <motion.div 
                className="absolute -top-1 -right-1"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  // linear = cubic-bezier equivalent [0,0,1,1]
                  ease: [0, 0, 1, 1],
                }}
              >
                <Sparkles className="h-3 w-3 text-accent" />
              </motion.div>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-heading font-bold text-foreground tracking-tight">
                Ingeniería
              </span>
              <span className="text-xs text-muted-foreground tracking-wider">
                Soluciones Eléctricas Integrales
              </span>
            </div>
          </a>

          {/* Desktop Navigation Mejorada */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.label)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2.5 text-sm font-medium transition-all duration-300",
                    "text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-lg",
                    "group/nav"
                  )}
                >
                  {item.label}
                  {item.submenu && (
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      activeSubmenu === item.label && "rotate-180"
                    )} />
                  )}
                  {/* Underline animado */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent group-hover/nav:w-4/5 transition-all duration-300" />
                </a>

                {/* Submenu con animación */}
                <AnimatePresence>
                  {item.submenu && activeSubmenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{
                        duration: 0.22,
                        // easeOut-like cubic-bezier
                        ease: [0.33, 1, 0.68, 1],
                      }}
                      className="absolute top-full left-0 mt-2 w-56 bg-background/95 backdrop-blur-xl rounded-xl shadow-2xl border border-border overflow-hidden z-50"
                    >
                      {item.submenu.map((subItem, index) => (
                        <motion.a
                          key={subItem.label}
                          href={subItem.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors group/submenu"
                          whileHover={{ x: 5 }}
                        >
                          <motion.div 
                            className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover/submenu:opacity-100 mr-3"
                            whileHover={{ scale: 1.5 }}
                          />
                          {subItem.label}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground/80 hover:text-foreground hover:bg-secondary/50"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Cotización Express
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="sm"
                className="bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20"
              >
                Contactar
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation con Framer Motion */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="lg:hidden py-4 border-t border-border/50 bg-background/95 backdrop-blur-xl mt-4 rounded-xl shadow-2xl overflow-hidden"
            >
              {navItems.map((item, index) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="mb-1"
                >
                  <a
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 text-base font-medium text-foreground hover:text-accent hover:bg-secondary/50 rounded-lg transition-colors"
                    onClick={() => !item.submenu && setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </a>
                  
                  {item.submenu && (
                    <div className="ml-6 mt-1 space-y-1 border-l border-border/50 pl-4">
                      {item.submenu.map((subItem, subIndex) => (
                        <motion.a
                          key={subItem.label}
                          href={subItem.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.1) + (subIndex * 0.05) }}
                          className="block px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-secondary/30 rounded transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          • {subItem.label}
                        </motion.a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 pt-6 border-t border-border/50 px-4 space-y-3"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full bg-accent hover:bg-accent/90">
                    Solicitar Cotización
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="w-full">
                    Llamar Ahora
                  </Button>
                </motion.div>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
