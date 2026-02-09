// src/components/layout/NavLink.tsx
import { forwardRef } from "react";
import { NavLink as RouterNavLink, type NavLinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

type NavLinkVariant = "nav" | "inline" | "button";
type NavLinkSize = "sm" | "md" | "lg";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string | ((props: { isActive: boolean; isPending: boolean }) => string);

  /**
   * Mantengo compatibilidad con tu API actual.
   * Puedes sobreescribir lo que ya venía usando el Header.
   */
  activeClassName?: string;
  pendingClassName?: string;
  forceActive?: boolean;

  /**
   * ✅ NUEVO: presets premium para no repetir clases en cada NavLink
   */
  variant?: NavLinkVariant;
  size?: NavLinkSize;

  /**
   * ✅ NUEVO: subrayado/indicador “premium”
   * - "none": sin indicador
   * - "underline": subrayado animado
   * - "pill": fondo sutil tipo pill al active/hover (útil en menús)
   */
  indicator?: "none" | "underline" | "pill";

  /**
   * ✅ NUEVO: si quieres forzar el estilo de "activo" solo visualmente
   * sin depender del router (similar a forceActive, pero solo indicador)
   */
  forceIndicator?: boolean;
}

const baseByVariant: Record<NavLinkVariant, string> = {
  nav: cn(
    // layout
    "relative inline-flex items-center gap-2 whitespace-nowrap",
    // typography
    "font-medium text-sm",
    // color + transitions
    "text-foreground/80 hover:text-foreground transition-colors duration-200",
    // a11y
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    // subtle smoothing
    "rounded-lg"
  ),
  inline: cn(
    "inline-flex items-center gap-1",
    "text-foreground underline-offset-4",
    "decoration-border/60 hover:decoration-primary/50 hover:underline",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "rounded"
  ),
  button: cn(
    // looks good inside Buttons (asChild)
    "inline-flex items-center justify-center",
    "rounded-xl",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  ),
};

const sizeByVariant: Record<NavLinkVariant, Record<NavLinkSize, string>> = {
  nav: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  },
  inline: {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
  },
  button: {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
  },
};

const indicatorBase = {
  underline:
    "after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-px after:rounded-full after:bg-primary/60 after:opacity-0 after:scale-x-75 after:transition-all after:duration-300",
  pill:
    "rounded-full px-3 py-2 hover:bg-muted/40 transition-colors duration-200",
  none: "",
};

const activeIndicator = {
  underline: "after:opacity-100 after:scale-x-100",
  pill: "bg-muted/50",
  none: "",
};

const pendingStyles = "opacity-60";

const defaultActiveByVariant: Record<NavLinkVariant, string> = {
  nav: "text-foreground",
  inline: "text-foreground",
  button: "",
};

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  (
    {
      className,
      activeClassName,
      pendingClassName = pendingStyles,
      forceActive,
      forceIndicator,
      to,
      variant = "nav",
      size = "md",
      indicator = "underline",
      ...props
    },
    ref
  ) => {
    const base = cn(baseByVariant[variant], sizeByVariant[variant][size], indicatorBase[indicator]);

    const activeDefault = cn(defaultActiveByVariant[variant], activeIndicator[indicator]);

    // Nota: RouterNavLink acepta "className" como función o string.
    // Mantenemos compatibilidad con className function del usuario.
    const computedClassName =
      typeof className === "function"
        ? ({ isActive, isPending }: { isActive: boolean; isPending: boolean }) => {
            const finalActive = typeof forceActive === "boolean" ? forceActive : isActive;
            const showIndicator = typeof forceIndicator === "boolean" ? forceIndicator : finalActive;

            return cn(
              base,
              className({ isActive: finalActive, isPending }),
              // Active
              finalActive && (activeClassName ?? activeDefault),
              // Indicador si no quieres tocar el texto
              !finalActive && showIndicator && activeIndicator[indicator],
              // Pending
              isPending && (pendingClassName ?? pendingStyles)
            );
          }
        : ({ isActive, isPending }: { isActive: boolean; isPending: boolean }) => {
            const finalActive = typeof forceActive === "boolean" ? forceActive : isActive;
            const showIndicator = typeof forceIndicator === "boolean" ? forceIndicator : finalActive;

            return cn(
              base,
              className,
              finalActive && (activeClassName ?? activeDefault),
              !finalActive && showIndicator && activeIndicator[indicator],
              isPending && (pendingClassName ?? pendingStyles)
            );
          };

    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={computedClassName}
        aria-current={(typeof forceActive === "boolean" ? forceActive : undefined) ? "page" : undefined}
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
export type { NavLinkCompatProps, NavLinkVariant, NavLinkSize };
