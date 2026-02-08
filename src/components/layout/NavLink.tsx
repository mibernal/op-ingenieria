// src/components/layout/NavLink.tsx
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string | ((props: { isActive: boolean; isPending: boolean }) => string);
  activeClassName?: string;
  pendingClassName?: string;
  forceActive?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  (
    {
      className,
      activeClassName = "text-primary font-semibold",
      pendingClassName = "opacity-60",
      forceActive,
      to,
      ...props
    },
    ref
  ) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={
          typeof className === "function"
            ? ({ isActive, isPending }) =>
                className({
                  isActive: typeof forceActive === "boolean" ? forceActive : isActive,
                  isPending,
                })
            : ({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
                cn(
                  className,
                  (typeof forceActive === "boolean" ? forceActive : isActive) && activeClassName,
                  isPending && pendingClassName
                )
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
