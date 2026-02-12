  // src/components/layout/Header.tsx
  import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type FocusEvent,
    type MouseEvent,
  } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { Menu, ChevronDown, Sparkles } from "lucide-react";
  import { useLocation, useNavigate } from "react-router-dom";

  import { Button } from "@/components/ui/button";
  import { cn } from "@/lib/utils";
  import { NavLink } from "@/components/layout/NavLink";
  import {
    ROUTES,
    HOME_SECTIONS,
    getNavHref,
    buildNavItems,
    type NavItem,
  } from "@/config/routes";

  import { categories as productCategories } from "@/modules/catalog/data/products";
  import { projectCategories } from "@/modules/projects/data/projects";

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

    const headerRef = useRef<HTMLElement | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // ✅ Menú abierto (solo nivel 1)
    const [openRoot, setOpenRoot] = useState<string | null>(null);
    const submenuTimeoutRef = useRef<number | null>(null);

    const [activeSection, setActiveSection] = useState<string>(HOME_SECTIONS.HERO);


      // ✅ Mantiene --header-h sincronizado SIEMPRE
    useEffect(() => {
      const el = headerRef.current;
      if (!el) return;

      const apply = () => {
        const h = el.getBoundingClientRect().height;
        document.documentElement.style.setProperty("--header-h", `${Math.ceil(h)}px`);
      };

      apply();

      const ro = new ResizeObserver(() => apply());
      ro.observe(el);

      // fallback: cuando cambia orientación / zoom / viewport
      window.addEventListener("resize", apply, { passive: true });

      return () => {
        ro.disconnect();
        window.removeEventListener("resize", apply);
      };
    }, []);

    /**
     * ✅ Nav dinámico (REFactor):
     * - Eliminamos por completo el "nivel 2" (subcategorías).
     * - En Productos y Proyectos mostramos SOLO categorías principales.
     * - buildNavItems seguirá construyendo el nav, pero le pasamos subcategories: []
     */
    const navItems = useMemo<NavItem[]>(() => {
      const productMenuCats = productCategories.map((c) => ({
        id: c.id,
        name: c.name,
        subcategories: [] as string[], // ✅ sin subcategorías
      }));

      const projectMenuCats = projectCategories.map((c) => ({
        id: c.id,
        name: c.name,
        subcategories: [] as string[], // ✅ sin subcategorías
      }));

      return buildNavItems({
        productCategories: productMenuCats,
        projectCategories: projectMenuCats,
      });
    }, []);

    // Secciones para “activeSection”
    const sectionItems = useMemo(
      () => navItems.filter((item) => item.type === "section" && item.hash),
      [navItems]
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
        if (submenuTimeoutRef.current)
          window.clearTimeout(submenuTimeoutRef.current);
      };
    }, []);

    useEffect(() => {
      setIsMobileMenuOpen(false);
      setOpenRoot(null);
    }, [location.pathname, location.search, location.hash]);

    useEffect(() => {
      if (location.pathname !== ROUTES.HOME) {
        setActiveSection(HOME_SECTIONS.HERO);
        return;
      }
      if (location.hash) setActiveSection(location.hash.replace("#", ""));
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

            const id = (visible[0]?.target as HTMLElement | undefined)?.id;
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

    const cancelCloseMenus = () => {
      if (submenuTimeoutRef.current) window.clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    };

    const openMenuRoot = (label: string) => {
      cancelCloseMenus();
      setOpenRoot(label);
    };

    const scheduleCloseMenus = () => {
      cancelCloseMenus();
      submenuTimeoutRef.current = window.setTimeout(() => {
        setOpenRoot(null);
      }, 220);
    };

    const handleSubmenuBlur = (event: FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
        setOpenRoot(null);
      }
    };

    const handleLogoClick = (e: MouseEvent) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      setOpenRoot(null);

      if (location.pathname !== ROUTES.HOME) {
        navigate(ROUTES.HOME);
        return;
      }

      if (location.hash) navigate(ROUTES.HOME, { replace: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ✅ Mobile expand: SOLO nivel 1 (sin subnivel)
    const [mobileOpenRoot, setMobileOpenRoot] = useState<Record<string, boolean>>(
      {}
    );
    const toggleMobileRoot = (key: string) =>
      setMobileOpenRoot((prev) => ({ ...prev, [key]: !prev[key] }));

    return (
      <header
        ref={headerRef}
        data-site-header="true"
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
            <NavLink
              to={ROUTES.HOME}
              className="flex items-center gap-3 group"
              end
              onClick={handleLogoClick as unknown as never}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 320 }}
              >
                <div
                  className={cn(
                    "flex items-center justify-center overflow-hidden",
                    "w-20 h-14 md:w-24 md:h-16 rounded-2xl transition-all duration-500",
                    scrolled
                      ? "bg-white border border-border/60 shadow-sm shadow-black/5"
                      : "bg-primary-foreground/10 border border-primary-foreground/20"
                  )}
                >
                  <img
                    src={logoSrc}
                    alt="OP Ingeniería"
                    className="w-full h-full object-contain px-2 py-1.5 md:px-2.5 md:py-2"
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
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Navegación principal"
            >
              {navItems.map((item) => {
                const href = getNavHref(item);

                const isSectionActive =
                  item.type === "section" &&
                  item.hash &&
                  location.pathname === ROUTES.HOME &&
                  activeSection === item.hash.replace("#", "");

                const hasSubmenu = Boolean(item.submenu?.length);
                const isRootOpen = hasSubmenu && openRoot === item.label;
                const submenuId = hasSubmenu ? `submenu-${item.label}` : undefined;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hasSubmenu && openMenuRoot(item.label)}
                    onMouseLeave={scheduleCloseMenus}
                    onFocus={() => hasSubmenu && openMenuRoot(item.label)}
                    onBlur={handleSubmenuBlur}
                  >
                    <NavLink
                      to={href}
                      end={item.end}
                      forceActive={
                        item.type === "section" ? Boolean(isSectionActive) : undefined
                      }
                      className={({ isActive }) =>
                        cn(
                          "group/nav relative flex items-center gap-1 px-4 py-2.5 text-sm font-medium rounded-xl outline-none",
                          "transition-all duration-300",
                          "focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          isActive || isSectionActive
                            ? "text-accent bg-accent/10"
                            : "text-foreground/80 hover:text-foreground hover:bg-secondary/50"
                        )
                      }
                      aria-haspopup={hasSubmenu ? "menu" : undefined}
                      aria-expanded={hasSubmenu ? isRootOpen : undefined}
                      aria-controls={hasSubmenu ? submenuId : undefined}
                      aria-current={isSectionActive ? "page" : undefined}
                      onKeyDown={(event) => {
                        if (!hasSubmenu) return;
                        if (event.key === "Escape") {
                          setOpenRoot(null);
                          return;
                        }
                        if (
                          event.key === "Enter" ||
                          event.key === " " ||
                          event.key === "ArrowDown"
                        ) {
                          event.preventDefault();
                          setOpenRoot(item.label);
                        }
                      }}
                    >
                      {item.label}
                      {hasSubmenu && (
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            isRootOpen && "rotate-180"
                          )}
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={cn(
                          "pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2",
                          "h-px bg-accent/80 rounded-full w-0 opacity-0",
                          "transition-all duration-300 ease-out",
                          "group-hover/nav:w-4/5 group-hover/nav:opacity-100",
                          isSectionActive && "w-4/5 opacity-100"
                        )}
                      />
                    </NavLink>

                    {/* ✅ Dropdown SOLO nivel 1 (categorías principales) */}
                    <AnimatePresence>
                      {hasSubmenu && isRootOpen && (
                        <motion.div
                          id={submenuId}
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: [0.33, 1, 0.68, 1] }}
                          className={cn(
                            "absolute top-full left-0 mt-2",
                            "w-[340px]",
                            "bg-background/95 backdrop-blur-xl",
                            "rounded-2xl shadow-2xl",
                            "border border-border/60 z-50",
                            // ✅ Importante: ahora sí podemos recortar sin problemas
                            "overflow-hidden"
                          )}
                          role="menu"
                          onMouseEnter={cancelCloseMenus}
                          onMouseLeave={scheduleCloseMenus}
                        >
                          <div className="p-2">
                            {item.submenu?.map((sub, i) => {
                              const subHref = sub.to;
                              const [subPath, subSearch = ""] = subHref.split("?");
                              const isSubActive =
                                location.pathname === subPath &&
                                isSearchMatch(
                                  subSearch,
                                  location.search.replace("?", "")
                                );

                              return (
                                <motion.div
                                  key={sub.label}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.02 }}
                                >
                                  <NavLink
                                    to={subHref}
                                    forceActive={isSubActive}
                                    className={({ isActive }) =>
                                      cn(
                                        "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm outline-none",
                                        "transition-colors",
                                        "focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                                        isActive || isSubActive
                                          ? "bg-accent/10 text-accent"
                                          : "text-foreground/80 hover:text-foreground hover:bg-secondary/50"
                                      )
                                    }
                                    role="menuitem"
                                    aria-current={isSubActive ? "page" : undefined}
                                    onClick={() => {
                                      setOpenRoot(null);
                                    }}
                                  >
                                    <span className="flex items-center">
                                      <span
                                        className={cn(
                                          "mr-3 h-1.5 w-1.5 rounded-full bg-accent",
                                          isSubActive ? "opacity-100" : "opacity-0"
                                        )}
                                        aria-hidden="true"
                                      />
                                      {sub.label}
                                    </span>
                                  </NavLink>
                                </motion.div>
                              );
                            })}
                          </div>
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
                  <NavLink to={`${ROUTES.HOME}#${HOME_SECTIONS.CONTACT}`} activeClassName="text-inherit">
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Abrir menú"
                >
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
                  {navItems.map((item) => {
                    const href = getNavHref(item);

                    const isSectionActive =
                      item.type === "section" &&
                      item.hash &&
                      location.pathname === ROUTES.HOME &&
                      activeSection === item.hash.replace("#", "");

                    const hasSubmenu = Boolean(item.submenu?.length);
                    const rootKey = `root:${item.label}`;
                    const isRootExpanded = Boolean(mobileOpenRoot[rootKey]);

                    return (
                      <div key={item.label} className="space-y-1">
                        <div className="flex items-stretch gap-1">
                          <NavLink
                            to={href}
                            end={item.end}
                            forceActive={
                              item.type === "section" ? Boolean(isSectionActive) : undefined
                            }
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                              cn(
                                "flex-1 flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium transition-colors outline-none",
                                "focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                                isActive || isSectionActive
                                  ? "bg-accent/10 text-accent"
                                  : "text-foreground hover:bg-secondary/50"
                              )
                            }
                            aria-current={isSectionActive ? "page" : undefined}
                          >
                            {item.label}
                          </NavLink>

                          {hasSubmenu ? (
                            <button
                              type="button"
                              onClick={() => toggleMobileRoot(rootKey)}
                              className={cn(
                                "shrink-0 rounded-xl px-3",
                                "border border-border/60 bg-background/40 hover:bg-background/60",
                                "transition-colors"
                              )}
                              aria-label={`Expandir ${item.label}`}
                              aria-expanded={isRootExpanded}
                            >
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 opacity-70 transition-transform",
                                  isRootExpanded && "rotate-180"
                                )}
                              />
                            </button>
                          ) : null}
                        </div>

                        {hasSubmenu && isRootExpanded ? (
                          <div className="ml-4 space-y-1 border-l border-border/60 pl-4">
                            {item.submenu!.map((sub) => {
                              const [subPath, subSearch = ""] = sub.to.split("?");
                              const isSubActive =
                                location.pathname === subPath &&
                                isSearchMatch(
                                  subSearch,
                                  location.search.replace("?", "")
                                );

                              return (
                                <NavLink
                                  key={sub.label}
                                  to={sub.to}
                                  forceActive={isSubActive}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className={({ isActive }) =>
                                    cn(
                                      "block rounded-xl px-3 py-2 text-sm transition-colors outline-none",
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
                        ) : null}
                      </div>
                    );
                  })}
                </nav>

                <div className="mt-6 space-y-3">
                  <Button
                    className="w-full bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20"
                    asChild
                  >
                    <NavLink
                      to={ROUTES.CONTACT}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Solicitar Cotización
                    </NavLink>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-border/60 bg-background/40 hover:bg-background/60"
                    asChild
                  >
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
