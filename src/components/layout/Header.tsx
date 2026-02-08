// src/components/layout/Header.tsx
import { useEffect, useMemo, useRef, useState, type FocusEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown, Sparkles } from "lucide-react";
import { useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/layout/NavLink";
import { ROUTES, NAV_ITEMS, getNavHref, HOME_SECTIONS } from "@/config/routes";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

// ✅ GitHub Pages friendly: assets públicos (NO import desde src/assets)
const logoSrc = `${import.meta.env.BASE_URL}uploads/logo.png`;

const isSearchMatch = (targetSearch: string, currentSearch: string) => {
  if (!targetSearch) return true;
  const targetParams = new URLSearchParams(targetSearch);
  const currentParams = new URLSearchParams(currentSearch);
  for (const [key, value] of targetParams.entries()) {
    if (currentParams.get(key) !== value) return false;
  }
  return true;
};

const Header = () => {
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const submenuTimeoutRef = useRef<number | null>(null);

  const [activeSection, setActiveSection] = useState<string>(HOME_SECTIONS.HERO);

  const sectionItems = useMemo(
    () => NAV_ITEMS.filter((item) => item.type === "section" && item.hash),
    []
  );

  const sectionIds = useMemo(
    () =>
      sectionItems
        .map((item) => item.hash?.replace("#", ""))
        .filter(Boolean) as string[],
    [sectionItems]
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (submenuTimeoutRef.current) window.clearTimeout(submenuTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveSubmenu(null);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (location.pathname !== ROUTES.HOME) {
      setActiveSection(HOME_SECTIONS.HERO);
      return;
    }
    if (location.hash) {
      setActiveSection(location.hash.replace("#", ""));
    }
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (location.pathname !== ROUTES.HOME) return;

    let observer: IntersectionObserver | null = null;
    let retryTimeout: number | undefined;

    const initObserver = () => {
      const elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));

      if (!elements.length) {
        retryTimeout = window.setTimeout(initObserver, 120);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          const id = visible[0]?.target?.id;
          if (id) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: [0.2, 0.5, 0.75] }
      );

      elements.forEach((el) => observer?.observe(el));
    };

    initObserver();

    return () => {
      if (retryTimeout) window.clearTimeout(retryTimeout);
      observer?.disconnect();
    };
  }, [location.pathname, sectionIds]);

  const openSubmenu = (label: string) => {
    if (submenuTimeoutRef.current) window.clearTimeout(submenuTimeoutRef.current);
    setActiveSubmenu(label);
  };

  const scheduleCloseSubmenu = () => {
    if (submenuTimeoutRef.current) window.clearTimeout(submenuTimeoutRef.current);
    submenuTimeoutRef.current = window.setTimeout(() => setActiveSubmenu(null), 100);
  };

  const handleSubmenuBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setActiveSubmenu(null);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-xl shadow-lg shadow-primary/5 border-b border-border/60"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <NavLink to={ROUTES.HOME} className="flex items-center gap-3 group" end>
            <motion.div
              className="relative"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 320 }}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl transition-all duration-500 overflow-hidden",
                  scrolled
                    ? "bg-accent/10 border border-accent/20"
                    : "bg-primary-foreground/10 border border-primary-foreground/20"
                )}
              >
                <img
                  src={logoSrc}
                  alt="OP Ingeniería"
                  className="w-full h-full object-contain p-0.5 md:p-1 scale-110"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: [0, 0, 1, 1] }}
                aria-hidden="true"
              >
                <Sparkles className="h-3 w-3 text-accent" />
              </motion.div>
            </motion.div>

            <div className="flex flex-col leading-tight">
              <span className="text-xs text-muted-foreground tracking-wider">
                Soluciones Eléctricas Integrales
              </span>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => {
              const href = getNavHref(item);

              const isSectionActive =
                item.type === "section" &&
                item.hash &&
                location.pathname === ROUTES.HOME &&
                activeSection === item.hash.replace("#", "");

              const hasSubmenu = Boolean(item.submenu?.length);
              const submenuId = hasSubmenu ? `submenu-${item.label}` : undefined;
              const isOpen = hasSubmenu && activeSubmenu === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasSubmenu && openSubmenu(item.label)}
                  onMouseLeave={scheduleCloseSubmenu}
                  onFocus={() => hasSubmenu && openSubmenu(item.label)}
                  onBlur={handleSubmenuBlur}
                >
                  <NavLink
                    to={href}
                    end={item.end}
                    forceActive={item.type === "section" ? Boolean(isSectionActive) : undefined}
                    className={({ isActive }) =>
                      cn(
                        "relative flex items-center gap-1 px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg group/nav outline-none",
                        "focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        isActive || isSectionActive
                          ? "text-accent"
                          : "text-foreground/80 hover:text-foreground hover:bg-secondary/50"
                      )
                    }
                    aria-haspopup={hasSubmenu ? "menu" : undefined}
                    aria-expanded={hasSubmenu ? isOpen : undefined}
                    aria-controls={hasSubmenu ? submenuId : undefined}
                    aria-current={isSectionActive ? "page" : undefined}
                    onKeyDown={(event) => {
                      if (!hasSubmenu) return;

                      if (event.key === "Escape") {
                        setActiveSubmenu(null);
                        return;
                      }

                      if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
                        event.preventDefault();
                        setActiveSubmenu(item.label);
                      }
                    }}
                  >
                    {item.label}

                    {hasSubmenu && (
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
                        aria-hidden="true"
                      />
                    )}

                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent group-hover/nav:w-4/5 transition-all" />
                  </NavLink>

                  <AnimatePresence>
                    {hasSubmenu && isOpen && (
                      <motion.div
                        id={submenuId}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: [0.33, 1, 0.68, 1] }}
                        className="absolute top-full left-0 mt-2 w-60 bg-background/95 backdrop-blur-xl rounded-xl shadow-2xl border border-border overflow-hidden z-50"
                        role="menu"
                      >
                        {item.submenu?.map((sub, i) => {
                          const [subPath, subSearch = ""] = sub.to.split("?");
                          const isSubActive =
                            location.pathname === subPath &&
                            isSearchMatch(subSearch, location.search.replace("?", ""));

                          return (
                            <motion.div
                              key={sub.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04 }}
                            >
                              <NavLink
                                to={sub.to}
                                forceActive={isSubActive}
                                className={({ isActive }) =>
                                  cn(
                                    "flex items-center px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors group/submenu outline-none",
                                    "focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                                    (isActive || isSubActive) && "text-accent"
                                  )
                                }
                                role="menuitem"
                                aria-current={isSubActive ? "page" : undefined}
                                onClick={() => setActiveSubmenu(null)}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover/submenu:opacity-100 mr-3" />
                                {sub.label}
                              </NavLink>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-foreground/80 hover:text-foreground hover:bg-secondary/50"
              >
                <NavLink to={ROUTES.CONTACT} activeClassName="text-inherit">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Cotización Express
                </NavLink>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="sm"
                asChild
                className="bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20"
              >
                <NavLink to={ROUTES.CONTACT} activeClassName="text-inherit">
                  Contactar
                </NavLink>
              </Button>
            </motion.div>
          </div>

          {/* Mobile */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menú">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:max-w-sm">
              <SheetHeader className="mb-6">
                <SheetTitle>Menú</SheetTitle>
                <SheetDescription>
                  Navega por las secciones principales de OP Ingeniería.
                </SheetDescription>
              </SheetHeader>

              <nav className="flex flex-col gap-1" aria-label="Menú móvil">
                {NAV_ITEMS.map((item) => {
                  const href = getNavHref(item);

                  const isSectionActive =
                    item.type === "section" &&
                    item.hash &&
                    location.pathname === ROUTES.HOME &&
                    activeSection === item.hash.replace("#", "");

                  return (
                    <div key={item.label} className="space-y-1">
                      <NavLink
                        to={href}
                        end={item.end}
                        forceActive={item.type === "section" ? Boolean(isSectionActive) : undefined}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors outline-none",
                            "focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                            isActive || isSectionActive
                              ? "bg-accent/10 text-accent"
                              : "text-foreground hover:bg-secondary/50"
                          )
                        }
                        aria-current={isSectionActive ? "page" : undefined}
                      >
                        {item.label}
                        {item.submenu && (
                          <ChevronDown className="h-4 w-4 opacity-60" aria-hidden="true" />
                        )}
                      </NavLink>

                      {item.submenu && (
                        <div className="ml-4 space-y-1 border-l border-border/60 pl-4">
                          {item.submenu.map((sub) => {
                            const [subPath, subSearch = ""] = sub.to.split("?");
                            const isSubActive =
                              location.pathname === subPath &&
                              isSearchMatch(subSearch, location.search.replace("?", ""));

                            return (
                              <NavLink
                                key={sub.label}
                                to={sub.to}
                                forceActive={isSubActive}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                  cn(
                                    "block rounded-md px-3 py-2 text-sm transition-colors outline-none",
                                    "focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                                    isActive || isSubActive
                                      ? "bg-accent/10 text-accent"
                                      : "text-foreground/80 hover:text-foreground hover:bg-secondary/40"
                                  )
                                }
                                aria-current={isSubActive ? "page" : undefined}
                              >
                                {sub.label}
                              </NavLink>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div className="mt-6 space-y-3">
                <Button className="w-full bg-accent hover:bg-accent/90" asChild>
                  <NavLink to={ROUTES.CONTACT} onClick={() => setIsMobileMenuOpen(false)}>
                    Solicitar Cotización
                  </NavLink>
                </Button>

                <Button variant="outline" className="w-full" asChild>
                  <a href="tel:+576014732039">Llamar Ahora</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
