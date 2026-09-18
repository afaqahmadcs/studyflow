"use client";

import React, { useState } from "react";
import { Activity, Flame } from "lucide-react";
import { STUDY_WEEK_DATA } from "@/data/student-data";

export function StudyVelocity() {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  return (
    <div className="bg-surface-container-low/90 backdrop-blur-md rounded-xl p-space-md shadow-sm border border-white/[0.06] space-y-space-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-secondary-container/20 text-secondary">
            <Activity className="w-[20px] h-[20px]" />
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Study Cockpit Velocity
          </h3>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-mono-code text-[11px] font-medium flex items-center gap-1 border border-secondary/20">
          <Flame className="w-3.5 h-3.5 text-secondary" /> 14-Day Streak
        </span>
      </div>

      {/* Metric Numbers */}
      <div className="grid grid-cols-2 gap-space-sm">
        <div className="p-space-sm rounded-lg bg-surface-container border border-white/[0.04]">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Today&apos;s Deep Focus
          </span>
          <div className="font-mono-timer text-mono-timer text-on-surface font-bold mt-1">
            3h 45m
          </div>
          <span className="text-label-sm font-label-sm text-on-surface-variant">
            Target: 5h 00m (75%)
          </span>
        </div>

        <div className="p-space-sm rounded-lg bg-surface-container border border-white/[0.04]">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Total Weekly Hours
          </span>
          <div className="font-mono-timer text-mono-timer text-tertiary font-bold mt-1">
            26h 30m
          </div>
          <span className="text-label-sm font-label-sm text-tertiary font-medium">
            +4h vs Last Week
          </span>
        </div>
      </div>

      {/* Mini 7-Day Study Bar Chart (Pure CSS & Semantics) */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
          <span>Weekly Study Volume Distribution</span>
          <span className="font-mono-code text-mono-code text-on-surface">
            {hoveredDay ? hoveredDay : "Target Line: 5.0h/day"}
          </span>
        </div>

        <div className="h-28 bg-surface-container rounded-lg p-3 flex items-end justify-between gap-2 relative border border-white/[0.04]">
          {/* 5h Target Reference line */}
          <div className="absolute left-3 right-3 bottom-[65%] border-b border-dashed border-outline-variant/60 pointer-events-none flex justify-end">
            <span className="text-[9px] font-mono-code text-outline -mt-3.5 pr-1">
              5h goal
            </span>
          </div>

          {/* Day Bars */}
          {STUDY_WEEK_DATA.map((item) => {
            return (
              <div
                key={item.day}
                onMouseEnter={() =>
                  setHoveredDay(`${item.day}: ${item.hours} logged (${item.percent}% target)`)
                }
                onMouseLeave={() => setHoveredDay(null)}
                className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
              >
                <div
                  className={`w-full max-w-[28px] rounded-t transition-all duration-300 ${
                    item.isToday
                      ? "bg-primary group-hover:brightness-125 shadow-[0_0_12px_rgba(192,193,255,0.4)]"
                      : "bg-surface-container-high group-hover:bg-primary/70"
                  }`}
                  style={{ height: `${item.percent}%` }}
                />
                <span
                  className={`font-mono-code text-[11px] ${
                    item.isToday
                      ? "text-primary font-bold"
                      : "text-on-surface-variant group-hover:text-on-surface"
                  }`}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
