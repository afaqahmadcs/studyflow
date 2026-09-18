import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2 | 3;
  glowingTopBar?: boolean;
}

export function Card({
  className,
  level = 1,
  glowingTopBar = false,
  children,
  ...props
}: CardProps) {
  const levelStyles = {
    1: "bg-surface-container-low/90 backdrop-blur-md rounded-xl border border-white/[0.06] shadow-sm",
    2: "bg-surface-container-high/80 backdrop-blur-md rounded-xl border border-white/[0.12] shadow-md shadow-black/20",
    3: "bg-surface-container/90 backdrop-blur-lg rounded-xl border border-white/[0.14] shadow-xl shadow-black/40",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden transition-all duration-200",
        levelStyles[level],
        className
      )}
      {...props}
    >
      {glowingTopBar && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-tertiary" />
      )}
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-space-sm p-space-md pb-space-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-headline-sm text-headline-sm text-on-surface tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("font-label-sm text-label-sm text-on-surface-variant", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-space-md pt-0", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-space-md pt-0 border-t border-white/[0.04]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
