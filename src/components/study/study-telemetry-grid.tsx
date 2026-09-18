"use client";

import React from "react";
import {
  Clock,
  TrendingUp,
  Zap,
  ArrowUp,
} from "lucide-react";
import { StudyStats, SubjectStudyStat } from "@/types/study";
import { cn } from "@/lib/utils";

interface StudyTelemetryGridProps {
  stats: StudyStats;
  subjectStats: SubjectStudyStat[];
}

export function StudyTelemetryGrid({
  stats,
  subjectStats,
}: StudyTelemetryGridProps) {
  // Format minutes into hours & minutes string
  const formatTime = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m > 0 ? `${m}m` : "00m"}`;
  };

  const todayTargetMinutes = 300; // 5 hours
  const todayProgressPercent = Math.min(
    100,
    Math.round((stats.todayMinutes / todayTargetMinutes) * 100)
  );

  const totalWeeklyHours = (stats.weeklyMinutes / 60).toFixed(1);

  return (
    <div className="flex flex-col space-y-space-md">
      {/* 1. Telemetry Snapshot Grid (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
        {/* Card 1: Today's Focus */}
        <div className="bg-surface-container-low border border-white/[0.04] p-space-md rounded-xl shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium text-[11px]">
              Today&apos;s Focus
            </span>
            <Clock className="w-5 h-5 text-primary" />
          </div>

          <div className="my-space-sm flex items-baseline justify-between">
            <div>
              <span className="font-headline-xl text-headline-xl font-bold text-on-surface">
                {formatTime(stats.todayMinutes)}
              </span>
              <span className="block font-label-sm text-label-sm text-outline text-[11px] mt-0.5">
                Target: 5h 00m
              </span>
            </div>

            {/* Circular Micro Indicator */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-surface-container-highest"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <path
                  className="text-primary transition-all duration-700"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray={`${todayProgressPercent}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <span className="absolute font-mono-code text-[11px] font-bold text-primary">
                {todayProgressPercent}%
              </span>
            </div>
          </div>

          <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${todayProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Card 2: Weekly Volume */}
        <div className="bg-surface-container-low border border-white/[0.04] p-space-md rounded-xl shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium text-[11px]">
              Weekly Volume
            </span>
            <TrendingUp className="w-5 h-5 text-secondary" />
          </div>

          <div className="my-space-sm">
            <span className="font-headline-xl text-headline-xl font-bold text-on-surface">
              {formatTime(stats.weeklyMinutes)}
            </span>
            <div className="flex items-center gap-1 text-tertiary font-label-sm text-label-sm mt-0.5 text-[11px]">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>+4.2 hrs vs last week</span>
            </div>
          </div>

          {/* Mini Sparkline Visualization */}
          <div className="flex items-end gap-1.5 h-6 pt-1">
            <div className="flex-1 bg-surface-container-highest rounded-t h-[40%]" title="Mon: 2.5h" />
            <div className="flex-1 bg-surface-container-highest rounded-t h-[65%]" title="Tue: 4.0h" />
            <div className="flex-1 bg-surface-container-highest rounded-t h-[50%]" title="Wed: 3.2h" />
            <div className="flex-1 bg-surface-container-highest rounded-t h-[80%]" title="Thu: 5.0h" />
            <div className="flex-1 bg-surface-container-highest rounded-t h-[70%]" title="Fri: 4.5h" />
            <div className="flex-1 bg-secondary rounded-t h-[95%]" title="Sat: 6.0h" />
            <div className="flex-1 bg-primary rounded-t h-[60%]" title="Sun: 3.8h" />
          </div>
        </div>

        {/* Card 3: Streak Telemetry */}
        <div className="bg-surface-container-low border border-white/[0.04] p-space-md rounded-xl shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium text-[11px]">
              Focus Streak
            </span>
            <span className="px-1.5 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-mono-code text-[11px] font-bold">
              ACTIVE
            </span>
          </div>

          <div className="my-space-sm flex items-center gap-2">
            <span className="font-headline-xl text-headline-xl font-bold text-on-surface">
              {stats.currentStreakDays}
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant text-[13px]">
              Consecutive Days
            </span>
          </div>

          <div className="flex items-center justify-between text-label-sm font-label-sm text-outline text-[11px]">
            <span>Personal Best: {stats.personalBestStreakDays} days</span>
            <span className="text-tertiary">Top 3% Cohort</span>
          </div>
        </div>

        {/* Card 4: Cognitive Peak */}
        <div className="bg-surface-container-low border border-white/[0.04] p-space-md rounded-xl shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium text-[11px]">
              Cognitive Peak
            </span>
            <Zap className="w-5 h-5 text-tertiary" />
          </div>

          <div className="my-space-sm">
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface block text-[13px]">
              {stats.cognitivePeakWindow}
            </span>
            <span className="font-label-sm text-label-sm text-tertiary font-medium text-[11px]">
              {stats.attentionIndex}% Deep Attention Index
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-on-surface-variant">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
            <span>Optimal revision window now</span>
          </div>
        </div>
      </div>

      {/* 2. Subject-Wise Study Distribution Card */}
      <div className="bg-surface-container-low border border-white/[0.04] p-space-md rounded-xl shadow-md flex-1 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-space-sm">
          <div>
            <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
              Subject-Wise Distribution
            </h3>
            <span className="font-label-sm text-label-sm text-on-surface-variant text-[12px]">
              Current Week • {totalWeeklyHours} logged hours
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono-code text-[11px] border border-white/[0.04]">
            W8 Spring
          </span>
        </div>

        {/* Segmented Stacked Progress Bar */}
        <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden flex gap-0.5 my-space-sm p-0.5">
          {subjectStats.map((sub, idx) => (
            <div
              key={sub.code}
              className={cn(
                "h-full transition-all duration-500",
                sub.color,
                idx === 0 && "rounded-l-full",
                idx === subjectStats.length - 1 && "rounded-r-full"
              )}
              style={{ width: `${sub.percentage}%` }}
              title={`${sub.code}: ${sub.percentage}%`}
            />
          ))}
        </div>

        {/* Subject Rows Breakdown */}
        <div className="space-y-2.5 mt-space-xs">
          {subjectStats.map((sub) => (
            <div
              key={sub.code}
              className="flex items-center justify-between p-2 rounded-lg bg-surface-container-high/60 hover:bg-surface-container-high transition-colors border border-white/[0.02]"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={cn("w-2.5 h-2.5 rounded-full flex-shrink-0", sub.color)}
                />
                <div className="truncate">
                  <span className="font-label-md text-label-md font-semibold text-on-surface text-[13px]">
                    {sub.name}
                  </span>
                  {sub.subtitle && (
                    <span className="block font-label-sm text-label-sm text-outline text-[11px]">
                      {sub.subtitle}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="font-mono-code text-mono-code font-bold text-on-surface text-[12px]">
                  {sub.hours.toFixed(1)} hrs
                </span>
                <span className="block font-mono-code text-[11px] text-primary">
                  {sub.percentage}% share
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
