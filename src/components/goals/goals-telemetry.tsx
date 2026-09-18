"use client";

import React from "react";
import { Flame, Award, TrendingUp, CheckCircle2 } from "lucide-react";
import { GoalsTelemetryStats } from "@/types/goals";

interface GoalsTelemetryProps {
  stats: GoalsTelemetryStats;
}

export function GoalsTelemetry({ stats }: GoalsTelemetryProps) {
  // SVG Ring calculation for Daily Target (r=20, circumference = 2 * PI * 20 = 125.66)
  const circumference = 125.66;
  const ratio = stats.dailyTotal > 0 ? stats.dailyCompleted / stats.dailyTotal : 0;
  const strokeDashoffset = Math.max(0, circumference * (1 - ratio));
  const percentDaily = Math.round(ratio * 100);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter-desktop">
      {/* 1. Daily Micro-Targets Ring */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low border border-white/[0.04] p-space-md shadow-md flex flex-col justify-between group">
        <div className="flex items-center justify-between pb-space-sm">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
            Daily Micro-Targets
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-code bg-tertiary-container/30 text-tertiary font-semibold">
            {percentDaily}% RATIO
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="font-display-lg text-display-lg font-bold text-on-surface tracking-tight">
                {stats.dailyCompleted}
              </span>
              <span className="font-headline-sm text-headline-sm text-outline font-semibold">
                / {stats.dailyTotal}
              </span>
              <span className="font-label-md text-label-md text-tertiary font-medium pl-1">
                Done
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              {Math.max(0, stats.dailyTotal - stats.dailyCompleted)} tasks pending today
            </p>
          </div>

          {/* Radial Ring */}
          <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                fill="transparent"
                r="20"
                stroke="#262a33"
                strokeWidth="4"
              />
              <circle
                className="transition-all duration-700 ease-out"
                cx="24"
                cy="24"
                fill="transparent"
                r="20"
                stroke="#4edea3"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="4"
              />
            </svg>
            <span className="absolute font-mono-code text-label-sm text-on-surface font-semibold text-[11px]">
              {percentDaily}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Weekly Velocity Bar */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low border border-white/[0.04] p-space-md shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between pb-space-sm">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
            Weekly Velocity
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-code bg-secondary-container/20 text-secondary font-semibold">
            +6% AHEAD
          </span>
        </div>

        <div className="space-y-2 pt-1">
          <div className="flex items-baseline justify-between">
            <span className="font-display-lg text-display-lg font-bold text-on-surface tracking-tight">
              {stats.weeklyVelocityPercent}%
            </span>
            <span className="font-mono-code text-body-sm text-on-surface-variant font-medium text-[11px]">
              Sprint Pace
            </span>
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden flex">
            <div
              className="bg-gradient-to-r from-primary-container to-secondary h-full rounded-full transition-all duration-700"
              style={{ width: `${stats.weeklyVelocityPercent}%` }}
            />
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
            Benchmark: 78% • <span className="text-tertiary">3 days remaining</span>
          </p>
        </div>
      </div>

      {/* 3. Academic GPA Milestone */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low border border-white/[0.04] p-space-md shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between pb-space-sm">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
            GPA Milestone
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-code bg-primary-container/20 text-primary font-semibold">
            HONORS TRACK
          </span>
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-display-lg font-bold text-on-surface tracking-tight">
              {stats.currentGpa.toFixed(2)}
            </span>
            <span className="font-mono-code text-body-sm text-outline text-[12px]">
              / {stats.targetGpa.toFixed(2)} Target
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1 text-[11px]">
              <Award className="w-3.5 h-3.5 text-tertiary" /> Top 5% Decile
            </span>
            <span className="font-mono-code text-body-sm text-on-surface-variant text-[11px]">
              Δ +{(stats.targetGpa - stats.currentGpa).toFixed(2)} to Goal
            </span>
          </div>
        </div>
      </div>

      {/* 4. Focus Streak */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low border border-white/[0.04] p-space-md shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between pb-space-sm">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
            Active Focus Streak
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-code bg-surface-container-highest text-on-surface-variant font-medium">
            TIER II
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-display-lg font-bold text-on-surface tracking-tight">
                {stats.streakDays}
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface-variant font-semibold">
                Days
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
              Next perk: <span className="text-secondary font-medium">21 Days (Obsidian Pin)</span>
            </p>
          </div>

          <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shadow-inner border border-white/[0.04]">
            <Flame className="w-6 h-6 text-primary fill-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
