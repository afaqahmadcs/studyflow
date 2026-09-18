"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Play, Timer } from "lucide-react";
import { DayStudyVolume } from "@/types/analytics";

interface WeeklyStudyChartProps {
  dailyVolume: DayStudyVolume[];
  targetDailyHours: number;
  daysMeetingTarget: number;
  totalWeeklyHours: number;
}

export function WeeklyStudyChart({
  dailyVolume,
  targetDailyHours = 5.0,
  daysMeetingTarget = 5,
  totalWeeklyHours = 37.1,
}: WeeklyStudyChartProps) {
  const maxScaleHours = 8.0; // 0h to 8h scale
  const hasData = dailyVolume.some((d) => d.totalHours > 0);

  if (!hasData) {
    return (
      <div className="lg:col-span-7 rounded-xl bg-surface-container-low p-space-lg border border-white/[0.04] shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
              Weekly Study Volume vs Target
            </h2>
            <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-outline text-[11px] font-mono-code font-medium">
              Mon – Sun
            </span>
          </div>
          <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
            Granular multi-course load distribution across 7 days
          </p>
        </div>

        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-outline mb-3">
            <Timer className="w-6 h-6" />
          </div>
          <p className="text-body-md text-on-surface font-medium">No Study Sessions Logged This Week</p>
          <p className="text-body-sm text-on-surface-variant max-w-sm mt-1 mb-4">
            Start a Pomodoro or deep flow study session in the Study Cockpit to visualize your focus cadence.
          </p>
          <Link
            href="/study"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-sm font-medium hover:bg-primary transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Study Timer</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-7 rounded-xl bg-surface-container-low p-space-lg border border-white/[0.04] shadow-xl flex flex-col justify-between relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-md">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
              Weekly Study Volume vs Target
            </h2>
            <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-outline text-[11px] font-mono-code font-medium border border-white/[0.04]">
              Mon – Sun
            </span>
          </div>
          <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
            Granular multi-course load distribution across 7 days
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 font-label-sm text-[11px] text-outline">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-primary" /> CS401
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-secondary" /> CS450
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-primary-container" /> CS320
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-tertiary" /> MATH310
          </span>
        </div>
      </div>

      {/* Inline Stacked Bar Visualization */}
      <div className="relative w-full h-64 flex flex-col justify-end pt-8 pb-4">
        {/* Target Reference Guideline (5.0h) */}
        <div
          className="absolute inset-x-0 flex items-center pointer-events-none z-10"
          style={{ bottom: `${(targetDailyHours / maxScaleHours) * 100}%` }}
        >
          <div className="w-full border-t border-dashed border-outline-variant/60" />
          <span className="absolute right-0 -top-5 px-1.5 py-0.5 rounded bg-surface-container text-[10px] font-mono-code text-on-surface-variant font-medium border border-white/[0.04]">
            Daily {targetDailyHours.toFixed(1)}h Target
          </span>
        </div>

        {/* Y Axis Ticks */}
        <div className="absolute left-0 inset-y-4 flex flex-col justify-between text-[10px] font-mono-code text-outline pointer-events-none">
          <span>7h</span>
          <span>5h</span>
          <span>3h</span>
          <span>0h</span>
        </div>

        {/* Bars Container */}
        <div className="grid grid-cols-7 gap-3 sm:gap-6 pl-6 h-full items-end z-20">
          {dailyVolume.map((d, index) => {
            const isTargetMet = d.totalHours >= targetDailyHours;
            const barHeightPct = Math.min(100, Math.max(8, (d.totalHours / maxScaleHours) * 100));

            return (
              <div key={index} className="flex flex-col items-center gap-2 group h-full justify-end">
                <div
                  className={`text-[10px] font-mono-code opacity-0 group-hover:opacity-100 transition-opacity ${
                    isTargetMet ? "text-tertiary font-semibold" : "text-outline"
                  }`}
                >
                  {d.totalHours}h
                </div>

                {/* Stacked Bar */}
                <div
                  className="w-full max-w-[34px] flex flex-col-reverse rounded overflow-hidden bg-surface-container-high transition-transform duration-200 group-hover:scale-y-[1.03] cursor-pointer"
                  style={{ height: `${barHeightPct}%` }}
                >
                  {d.courseBreakdown.map((c, cIdx) => {
                    const segmentHeightPct =
                      d.totalHours > 0 ? (c.hours / d.totalHours) * 100 : 25;
                    return (
                      <div
                        key={cIdx}
                        className={`${c.color} transition-all`}
                        style={{ height: `${segmentHeightPct}%` }}
                        title={`${c.code} (${c.name}): ${c.hours}h`}
                      />
                    );
                  })}
                </div>

                <span
                  className={`font-mono-code text-[11px] font-medium ${
                    isTargetMet
                      ? "text-primary font-semibold"
                      : "text-on-surface-variant"
                  }`}
                >
                  {d.dayName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Insight */}
      <div className="flex items-center justify-between pt-space-xs text-label-sm text-[11px] font-label-sm text-outline border-t border-surface-container-high/40 mt-space-xs">
        <span className="flex items-center gap-1.5 text-tertiary">
          <CheckCircle2 className="w-3.5 h-3.5" /> Target Met {daysMeetingTarget} of 7 Days
        </span>
        <span className="font-mono-code text-on-surface">
          {totalWeeklyHours.toFixed(1)} Hours Cumulative
        </span>
      </div>
    </div>
  );
}
