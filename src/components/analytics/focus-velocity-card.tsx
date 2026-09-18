"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface FocusVelocityCardProps {
  peakEfficiency?: number;
  medianSessionHours?: number;
  weeksData?: {
    week: string;
    percentage: number;
    isCurrent?: boolean;
    isPeak?: boolean;
  }[];
}

export function FocusVelocityCard({
  peakEfficiency = 94,
  medianSessionHours = 3.8,
  weeksData,
}: FocusVelocityCardProps) {
  return (
    <div className="lg:col-span-5 rounded-xl bg-surface-container-low p-space-lg border border-white/[0.04] shadow-xl flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
              Focus Velocity
            </h2>
            <span className="px-1.5 py-0.5 rounded bg-tertiary/15 text-tertiary text-[11px] font-mono-code font-semibold border border-tertiary/20">
              W1–W8
            </span>
          </div>
          <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
            Aggregated deep-work efficiency telemetry
          </p>
        </div>
        <div className="text-right">
          <span className="font-headline-sm text-headline-sm font-bold text-tertiary font-mono-code">
            {peakEfficiency}% Peak
          </span>
          <p className="font-label-sm text-[11px] text-outline font-mono-code">Week 8</p>
        </div>
      </div>

      {/* SVG Sparkline & Gradient Area */}
      <div className="relative w-full h-44 my-space-sm flex items-center">
        <svg
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 320 120"
        >
          <defs>
            <linearGradient id="focusGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#4edea3" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#4edea3" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid Background lines */}
          <line stroke="#464554" strokeDasharray="3,3" strokeOpacity="0.2" x1="0" x2="320" y1="20" y2="20" />
          <line stroke="#464554" strokeDasharray="3,3" strokeOpacity="0.2" x1="0" x2="320" y1="60" y2="60" />
          <line stroke="#464554" strokeDasharray="3,3" strokeOpacity="0.2" x1="0" x2="320" y1="100" y2="100" />

          {/* Filled Area */}
          <polygon
            fill="url(#focusGradient)"
            points="0,95 45,78 90,65 135,28 180,50 225,45 270,36 320,18 320,120 0,120"
          />

          {/* Telemetry Curve */}
          <polyline
            fill="none"
            points="0,95 45,78 90,65 135,28 180,50 225,45 270,36 320,18"
            stroke="#4edea3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />

          {/* Peak Points */}
          <circle cx="135" cy="28" fill="#4edea3" r="4.5" stroke="#0f131c" strokeWidth="2" />
          <circle cx="320" cy="18" fill="#6ffbbe" r="5" stroke="#0f131c" strokeWidth="2" />
        </svg>
      </div>

      {/* X-Axis Labels */}
      <div className="flex justify-between font-mono-code text-[11px] text-outline px-1">
        <span>W1 (72%)</span>
        <span>W2</span>
        <span>W3</span>
        <span className="text-on-surface font-semibold">W4 (91%)</span>
        <span>W5</span>
        <span>W6</span>
        <span>W7</span>
        <span className="text-tertiary font-bold">W8 ({peakEfficiency}%)</span>
      </div>

      {/* Mini Insight Footer */}
      <div className="mt-space-md p-space-sm rounded-lg bg-surface-container-high/60 border border-white/[0.04] flex items-center justify-between text-body-sm text-[12px]">
        <span className="text-on-surface-variant flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-primary" /> Sustained Flow State
        </span>
        <span className="font-mono-code text-on-surface">
          {medianSessionHours} hrs/session median
        </span>
      </div>
    </div>
  );
}
