"use client";

import React from "react";
import { AttendanceTrendPoint } from "@/types/attendance";
import { cn } from "@/lib/utils";

interface AttendanceTrendChartProps {
  trendData: AttendanceTrendPoint[];
}

export function AttendanceTrendChart({ trendData }: AttendanceTrendChartProps) {
  return (
    <div className="rounded-xl bg-surface-container-low border border-white/[0.04] p-space-lg shadow-md flex flex-col space-y-space-md">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            14-Week Attendance Longitudinal Trend
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
            Weekly compliance percentages charted against the mandatory 80% regulatory
            threshold
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-tertiary text-[11px]">
            <span className="w-3 h-0.5 bg-tertiary rounded-full" /> Student Cohort %
          </span>
          <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-error text-[11px]">
            <span className="w-3 h-0.5 bg-error border-b border-dashed border-error" />{" "}
            80% Cutoff Policy
          </span>
        </div>
      </div>

      {/* Responsive SVG Chart */}
      <div className="w-full h-48 relative flex items-center overflow-hidden">
        <svg
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 700 160"
        >
          <defs>
            <linearGradient id="trendGradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#4edea3" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#4edea3" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid Lines & Y-ticks */}
          <line
            stroke="#31353e"
            strokeDasharray="3,3"
            strokeWidth="1"
            x1="0"
            x2="700"
            y1="20"
            y2="20"
          />
          <text className="text-[10px] font-mono-code" fill="#908fa0" x="5" y="16">
            100%
          </text>

          {/* 80% Threshold Line */}
          <line
            stroke="#ffb4ab"
            strokeDasharray="6,4"
            strokeWidth="1.5"
            x1="0"
            x2="700"
            y1="60"
            y2="60"
          />
          <text
            className="text-[10px] font-mono-code font-bold"
            fill="#ffb4ab"
            x="620"
            y="55"
          >
            80% POLICY
          </text>

          <line
            stroke="#31353e"
            strokeDasharray="3,3"
            strokeWidth="1"
            x1="0"
            x2="700"
            y1="100"
            y2="100"
          />
          <text className="text-[10px] font-mono-code" fill="#908fa0" x="5" y="96">
            60%
          </text>

          {/* Area Fill under curve */}
          <polygon
            fill="url(#trendGradient)"
            points="
              40,28
              90,24
              140,20
              190,36
              240,32
              290,26
              340,30
              390,32
              390,140
              40,140
            "
          />

          {/* Past Actual Trend Line (Weeks 1 to 8) */}
          <polyline
            fill="none"
            points="
              40,28 
              90,24 
              140,20 
              190,36 
              240,32 
              290,26 
              340,30 
              390,32
            "
            stroke="#4edea3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />

          {/* Projected Future Trend Line (Weeks 9 to 14) */}
          <polyline
            fill="none"
            points="
              390,32 
              440,34 
              490,33 
              540,35 
              590,36 
              640,35
            "
            stroke="#908fa0"
            strokeDasharray="4,4"
            strokeWidth="2"
          />

          {/* Data Nodes (Weeks 1 to 7) */}
          <circle cx="40" cy="28" fill="#0f131c" r="4" stroke="#4edea3" strokeWidth="2" />
          <circle cx="90" cy="24" fill="#0f131c" r="4" stroke="#4edea3" strokeWidth="2" />
          <circle cx="140" cy="20" fill="#0f131c" r="4" stroke="#4edea3" strokeWidth="2" />
          <circle cx="190" cy="36" fill="#0f131c" r="4" stroke="#4edea3" strokeWidth="2" />
          <circle cx="240" cy="32" fill="#0f131c" r="4" stroke="#4edea3" strokeWidth="2" />
          <circle cx="290" cy="26" fill="#0f131c" r="4" stroke="#4edea3" strokeWidth="2" />
          <circle cx="340" cy="30" fill="#0f131c" r="4" stroke="#4edea3" strokeWidth="2" />

          {/* Current Week Node (Pulsing W8) */}
          <circle cx="390" cy="32" fill="#4edea3" r="6" stroke="#0f131c" strokeWidth="2" />
        </svg>
      </div>

      {/* Weeks X-axis Ticks */}
      <div className="grid grid-cols-14 text-center font-mono-code text-[11px] text-on-surface-variant pt-2 border-t border-white/[0.04]">
        {trendData.map((t) => (
          <span
            key={t.week}
            className={cn(
              t.isCurrent
                ? "px-1 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-bold"
                : t.isActual
                ? "text-tertiary font-medium"
                : "text-outline"
            )}
          >
            {t.week} {t.isCurrent ? "(Now)" : ""}
          </span>
        ))}
      </div>
    </div>
  );
}
