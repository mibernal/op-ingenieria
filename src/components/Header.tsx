import { useState } from "react";
import { Menu, X, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Inicio", href: "#inicio", active: true },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Productos", href: "#productos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos Ejecutados", href: "#proyectos" },
   { label: "Clientes y Partners", href: "#clientes" },
  { label: "Contáctenos", href: "#contacto" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-2xl md:text-3xl font-heading font-bold">
                <span className="text-accent">O</span>
                <span className="text-foreground">&</span>
                <span className="text-accent">P</span>
              </span>
              <div className="ml-2 hidden sm:block">
                <span className="text-xs font-heading font-medium text-foreground uppercase tracking-wider">
                  Ingeniería
                </span>
                <span className="text-[10px] block text-muted-foreground">S.A.S</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link text-sm ${item.active ? "active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block py-3 px-4 text-sm font-medium transition-colors hover:bg-secondary rounded ${
                  item.active ? "text-accent" : "text-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
