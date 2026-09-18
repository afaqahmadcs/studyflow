import React from "react";
import { cn } from "@/lib/utils";

// Concentric Circular Gauge
export interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showText?: boolean;
  strokeColor?: string;
  trackColor?: string;
}

export function CircularProgress({
  percentage,
  size = 48,
  strokeWidth = 4,
  className,
  showText = true,
  strokeColor = "currentColor",
  trackColor = "currentColor",
}: CircularProgressProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPercent = Math.min(100, Math.max(0, percentage));
  const strokeDashoffset = circumference - (clampedPercent / 100) * circumference;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center flex-shrink-0",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        className="-rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={trackColor}
          className="text-surface-container-highest"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={strokeColor}
          className="text-primary transition-all duration-700 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {showText && (
        <span className="absolute font-mono-code text-mono-code font-semibold text-on-surface">
          {Math.round(clampedPercent)}%
        </span>
      )}
    </div>
  );
}

// Linear Progress Bar
export interface ProgressBarProps {
  value: number;
  max?: number;
  colorClass?: string;
  heightClass?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  colorClass = "bg-primary",
  heightClass = "h-1.5",
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={cn(
        "w-full bg-surface-container-highest rounded-full overflow-hidden",
        heightClass,
        className
      )}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500", colorClass)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

// Segmented Milestone Bar
export interface SegmentItem {
  id: string;
  status: "done" | "active" | "pending";
  title: string;
}

export interface SegmentedProgressProps {
  segments: SegmentItem[];
  className?: string;
}

export function SegmentedProgress({
  segments,
  className,
}: SegmentedProgressProps) {
  return (
    <div
      className={cn("grid gap-1.5 h-2", className)}
      style={{ gridTemplateColumns: `repeat(${segments.length}, minmax(0, 1fr))` }}
    >
      {segments.map((seg) => {
        let statusStyle = "bg-surface-container-highest";
        if (seg.status === "done") {
          statusStyle = "bg-tertiary";
        } else if (seg.status === "active") {
          statusStyle = "bg-primary animate-pulse";
        }
        return (
          <div
            key={seg.id}
            title={seg.title}
            className={cn("h-full rounded-sm transition-colors", statusStyle)}
          />
        );
      })}
    </div>
  );
}
