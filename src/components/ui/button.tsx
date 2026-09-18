import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "primary-glow"
    | "secondary"
    | "ghost"
    | "danger"
    | "accent-cyan"
    | "accent-emerald"
    | "subtle";
  size?: "sm" | "md" | "lg" | "icon";
  shortcut?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "secondary",
      size = "md",
      shortcut,
      icon,
      iconRight,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-label-md transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-label-sm px-2.5 py-1 rounded-md gap-1.5",
      md: "text-label-md px-3 py-2 rounded-lg gap-2",
      lg: "text-body-md px-4 py-2.5 rounded-xl gap-2.5",
      icon: "p-2 rounded-lg aspect-square justify-center",
    };

    const variantStyles = {
      primary:
        "bg-primary hover:bg-primary-fixed-dim text-on-primary font-semibold shadow-sm hover:shadow",
      "primary-glow":
        "bg-primary-container text-on-primary font-semibold shadow-[0_0_16px_rgba(128,131,255,0.35)] hover:shadow-[0_0_24px_rgba(128,131,255,0.5)] border-t border-white/20",
      secondary:
        "bg-surface-container-high hover:bg-surface-variant text-on-surface border border-white/[0.08] hover:border-white/[0.18]",
      subtle:
        "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface",
      ghost:
        "bg-transparent hover:bg-surface-container text-on-surface-variant hover:text-on-surface",
      danger:
        "bg-error-container/20 hover:bg-error text-error hover:text-on-error border border-error/30 transition-colors",
      "accent-cyan":
        "bg-secondary-container text-on-secondary-container font-semibold hover:brightness-110 shadow-sm",
      "accent-emerald":
        "bg-tertiary-container text-on-tertiary font-semibold hover:brightness-110 shadow-sm",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : (
          icon && <span className="flex-shrink-0 flex items-center">{icon}</span>
        )}
        {children && <span>{children}</span>}
        {iconRight && (
          <span className="flex-shrink-0 flex items-center">{iconRight}</span>
        )}
        {shortcut && (
          <kbd className="ml-auto pl-2 font-mono-code text-[10px] opacity-75 group-hover:opacity-100">
            {shortcut}
          </kbd>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
