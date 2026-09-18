import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "critical"
    | "urgent"
    | "in_progress"
    | "active"
    | "completed"
    | "streak"
    | "warning"
    | "neutral"
    | "counter"
    | "primary-tint";
  hasDot?: boolean;
  pulseDot?: boolean;
  mono?: boolean;
}

export function Badge({
  className,
  variant = "neutral",
  hasDot = false,
  pulseDot = false,
  mono = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    critical:
      "bg-error-container/30 text-error border border-error/20 font-medium",
    urgent:
      "bg-error-container/25 text-error border border-error/30 font-medium",
    in_progress:
      "bg-secondary-container/20 text-secondary border border-secondary/20",
    active:
      "bg-primary-container/20 text-primary border border-primary/20",
    completed:
      "bg-tertiary-container/20 text-tertiary border border-tertiary/20 font-medium",
    streak:
      "bg-tertiary-container/25 text-tertiary border border-tertiary/30 font-semibold",
    warning:
      "bg-amber-500/15 text-amber-400 border border-amber-500/25",
    neutral:
      "bg-surface-container-high text-on-surface border border-white/[0.06]",
    counter:
      "bg-secondary/15 text-secondary font-mono-code text-[11px] font-medium px-1.5 py-0.5 rounded-full",
    "primary-tint":
      "bg-primary-container/30 text-primary border border-primary/20",
  };

  const dotColor = {
    critical: "bg-error",
    urgent: "bg-error",
    in_progress: "bg-secondary",
    active: "bg-primary",
    completed: "bg-tertiary",
    streak: "bg-tertiary",
    warning: "bg-amber-400",
    neutral: "bg-on-surface-variant",
    counter: "bg-secondary",
    "primary-tint": "bg-primary",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-label-sm transition-colors",
        mono ? "font-mono-code text-mono-code" : "font-label-sm",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {hasDot && (
        <span className="relative flex h-1.5 w-1.5">
          {pulseDot && (
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                dotColor[variant]
              )}
            />
          )}
          <span
            className={cn(
              "relative inline-flex rounded-full h-1.5 w-1.5",
              dotColor[variant]
            )}
          />
        </span>
      )}
      {children}
    </span>
  );
}
