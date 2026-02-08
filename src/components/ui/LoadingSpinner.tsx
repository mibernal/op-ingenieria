// components/ui/LoadingSpinner.tsx
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "primary" | "secondary" | "destructive";
  type?: "spinner" | "dots" | "pulse";
  fullScreen?: boolean;
  text?: string;
  showIcon?: boolean;
}

export const LoadingSpinner = ({
  className,
  size = "md",
  variant = "default",
  type = "spinner",
  fullScreen = false,
  text = "Cargando...",
  showIcon = true,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const variantClasses = {
    default: "text-primary",
    primary: "text-primary",
    secondary: "text-secondary-foreground",
    destructive: "text-destructive",
  };

  const renderSpinner = () => {
    switch (type) {
      case "dots":
        return (
          <div className="flex items-center justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-2 w-2 animate-bounce rounded-full bg-current",
                  variantClasses[variant]
                )}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        );

      case "pulse":
        return (
          <div
            className={cn(
              "animate-pulse rounded-full bg-current",
              sizeClasses[size],
              variantClasses[variant]
            )}
          />
        );

      default:
        return (
          <Loader2
            className={cn(
              "animate-spin",
              sizeClasses[size],
              variantClasses[variant],
              className
            )}
          />
        );
    }
  };

  const content = (
    <div
      className="flex flex-col items-center justify-center gap-3"
      role="status"
      aria-label="Cargando"
    >
      {showIcon && renderSpinner()}
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;