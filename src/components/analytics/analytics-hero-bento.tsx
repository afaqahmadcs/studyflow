"use client";

import React from "react";
import { GraduationCap, Zap, CheckCircle2, CalendarCheck, TrendingUp, ShieldCheck } from "lucide-react";
import { AnalyticsPayload } from "@/types/analytics";

interface AnalyticsHeroBentoProps {
  payload: AnalyticsPayload;
}

export function AnalyticsHeroBento({ payload }: AnalyticsHeroBentoProps) {
  const { study, assignments, attendance } = payload;
  const attendanceBuffer = (attendance.overallPercentage - attendance.policyThreshold).toFixed(1);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
      {/* 1. GPA Hero */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-md border border-white/[0.04] shadow-lg flex flex-col justify-between group hover:bg-surface-container transition-all">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start justify-between">
          <div>
            <span className="font-label-sm text-[11px] text-outline uppercase tracking-wider font-semibold">
              Academic Standing
            </span>
            <p className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
              Semester GPA
            </p>
          </div>
          <span className="p-2 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center border border-primary/20">
            <GraduationCap className="w-5 h-5" />
          </span>
        </div>

        <div className="mt-space-md">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-display-lg text-3xl font-bold text-on-surface tracking-tight">
              {payload.semesterGpa.toFixed(2)}
            </span>
            <span className="font-mono-code text-[12px] text-outline">/ 4.00</span>
          </div>

          <div className="mt-space-xs flex items-center justify-between font-label-sm text-[11px]">
            <span className="px-1.5 py-0.5 rounded bg-tertiary/15 text-tertiary font-semibold flex items-center gap-1 border border-tertiary/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Dean&apos;s Honors
            </span>
            <span className="text-on-surface-variant">Top 4.8% Cohort</span>
          </div>

          <div className="mt-space-sm pt-space-xs flex items-center justify-between text-body-sm text-[12px] text-outline border-t border-white/[0.04]">
            <span>
              Target GPA: <strong className="text-on-surface font-mono-code">{payload.targetGpa.toFixed(2)}</strong>
            </span>
            <span className="font-mono-code text-primary">+{payload.gpaDelta.toFixed(2)} delta</span>
          </div>
        </div>
      </div>

      {/* 2. Deep Study Hours */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-md border border-white/[0.04] shadow-lg flex flex-col justify-between group hover:bg-surface-container transition-all">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start justify-between">
          <div>
            <span className="font-label-sm text-[11px] text-outline uppercase tracking-wider font-semibold">
              Cognitive Volume
            </span>
            <p className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
              Deep Study Hours
            </p>
          </div>
          <span className="p-2 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center border border-secondary/20">
            <Zap className="w-5 h-5" />
          </span>
        </div>

        <div className="mt-space-md">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-display-lg text-3xl font-bold text-on-surface tracking-tight">
              {study.totalHours}
            </span>
            <span className="font-body-md text-[13px] text-on-surface-variant font-medium">hrs</span>
          </div>

          <div className="mt-space-xs flex items-center justify-between font-label-sm text-[11px]">
            <span className="px-1.5 py-0.5 rounded bg-secondary/15 text-secondary font-semibold flex items-center gap-1 border border-secondary/20">
              <TrendingUp className="w-3.5 h-3.5" /> +18.2% vs Base
            </span>
            <span className="text-on-surface-variant font-mono-code">Week 8 of 16</span>
          </div>

          <div className="mt-space-sm pt-space-xs flex items-center justify-between text-body-sm text-[12px] text-outline border-t border-white/[0.04]">
            <span>
              Weekly Pace: <strong className="text-on-surface font-mono-code">{study.weeklyPaceHours}h/wk</strong>
            </span>
            <span className="text-tertiary font-mono-code">Optimal</span>
          </div>
        </div>
      </div>

      {/* 3. Assignment Delivery Velocity */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-md border border-white/[0.04] shadow-lg flex flex-col justify-between group hover:bg-surface-container transition-all">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-tertiary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start justify-between">
          <div>
            <span className="font-label-sm text-[11px] text-outline uppercase tracking-wider font-semibold">
              Execution Punctuality
            </span>
            <p className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
              Delivery Velocity
            </p>
          </div>
          <span className="p-2 rounded-lg bg-tertiary/20 text-tertiary flex items-center justify-center border border-tertiary/20">
            <CheckCircle2 className="w-5 h-5" />
          </span>
        </div>

        <div className="mt-space-md">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-display-lg text-3xl font-bold text-on-surface tracking-tight">
              {assignments.onTimeVelocityPercentage}%
            </span>
            <span className="font-label-sm text-[11px] text-outline font-mono-code">on-time</span>
          </div>

          <div className="mt-space-xs flex items-center justify-between font-label-sm text-[11px]">
            <span className="px-1.5 py-0.5 rounded bg-tertiary/15 text-tertiary font-semibold border border-tertiary/20">
              {assignments.completed} / {assignments.total} Submissions
            </span>
            <span className={assignments.overdue > 0 ? "text-error font-mono-code font-bold" : "text-tertiary font-mono-code"}>
              {assignments.overdue} Overdue
            </span>
          </div>

          <div className="mt-space-sm pt-space-xs flex items-center justify-between text-body-sm text-[12px] text-outline border-t border-white/[0.04]">
            <span>
              Streak: <strong className="text-on-surface font-mono-code">{assignments.consecutiveOnTimeStreak} consecutive</strong>
            </span>
            <span className="text-on-surface-variant font-mono-code">{assignments.pending} Pending</span>
          </div>
        </div>
      </div>

      {/* 4. Attendance Health */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-md border border-white/[0.04] shadow-lg flex flex-col justify-between group hover:bg-surface-container transition-all">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-primary-container/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start justify-between">
          <div>
            <span className="font-label-sm text-[11px] text-outline uppercase tracking-wider font-semibold">
              Presence Telemetry
            </span>
            <p className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
              Attendance Health
            </p>
          </div>
          <span className="p-2 rounded-lg bg-surface-container-high text-primary flex items-center justify-center border border-white/[0.06]">
            <CalendarCheck className="w-5 h-5" />
          </span>
        </div>

        <div className="mt-space-md">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-display-lg text-3xl font-bold text-on-surface tracking-tight">
              {attendance.overallPercentage}%
            </span>
            <span className="font-label-sm text-[11px] text-outline font-mono-code">aggregate</span>
          </div>

          <div className="mt-space-xs flex items-center justify-between font-label-sm text-[11px]">
            <span className="px-1.5 py-0.5 rounded bg-tertiary/15 text-tertiary font-semibold flex items-center gap-1.5 border border-tertiary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
              Safe Buffer
            </span>
            <span className="text-outline">Cutoff {attendance.policyThreshold.toFixed(1)}%</span>
          </div>

          <div className="mt-space-sm pt-space-xs flex items-center justify-between text-body-sm text-[12px] text-outline border-t border-white/[0.04]">
            <span>
              Absences: <strong className="text-on-surface font-mono-code">{attendance.absentSessions} total</strong>
            </span>
            <span className="text-secondary font-mono-code">Buffer +{attendanceBuffer}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
