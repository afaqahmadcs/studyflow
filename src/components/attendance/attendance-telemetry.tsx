"use client";

import React from "react";
import { CheckCircle2, Shield, HeartPulse, ArrowUpRight, Check } from "lucide-react";
import { AttendanceSummary } from "@/types/attendance";

interface AttendanceTelemetryProps {
  summary: AttendanceSummary;
}

export function AttendanceTelemetry({ summary }: AttendanceTelemetryProps) {
  // SVG Circular Ring calculation (radius 30, circumference = 2 * PI * 30 = 188.5)
  const circumference = 188.5;
  const strokeDashoffset =
    circumference - (summary.overallPercentage / 100) * circumference;

  const bufferAboveCutoff = Number(
    (summary.overallPercentage - summary.policyThreshold).toFixed(1)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-space-md">
      {/* 1. Main Score Card (2 Columns wide on XL) */}
      <div className="xl:col-span-2 relative overflow-hidden rounded-xl bg-surface-container-low border border-white/[0.04] p-space-lg flex flex-col justify-between shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline text-[11px] font-semibold">
              Overall Attendance Index
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-display-lg text-display-lg font-bold text-on-surface tracking-tight">
                {summary.overallPercentage}%
              </span>
              <span className="px-2 py-0.5 rounded bg-tertiary-container/20 text-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1 text-[11px]">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +{bufferAboveCutoff}% buffer
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-[12px]">
              {summary.attendedSessions} attended of {summary.totalSessions}{" "}
              institutional sessions
            </p>
          </div>

          {/* Progress Ring Visual */}
          <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 72 72">
              <circle
                className="text-surface-container-highest"
                cx="36"
                cy="36"
                fill="transparent"
                r="30"
                stroke="currentColor"
                strokeWidth="6"
              />
              <circle
                className="text-tertiary transition-all duration-700"
                cx="36"
                cy="36"
                fill="transparent"
                r="30"
                stroke="currentColor"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="6"
              />
            </svg>
            <Check className="absolute text-tertiary w-6 h-6 stroke-[2.5]" />
          </div>
        </div>

        <div className="mt-space-md pt-space-sm bg-surface-container/50 -mx-space-lg -mb-space-lg px-space-lg py-3 flex items-center justify-between border-t border-white/[0.04]">
          <span className="font-mono-code text-mono-code text-on-surface-variant flex items-center gap-1.5 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-tertiary" />
            Institutional Cutoff: {summary.policyThreshold.toFixed(1)}%
          </span>
          <span className="font-label-sm text-label-sm text-tertiary font-semibold text-[11px]">
            Compliance: {summary.complianceTier}
          </span>
        </div>
      </div>

      {/* 2. Attended Stat */}
      <div className="rounded-xl bg-surface-container-low border border-white/[0.04] p-space-md flex flex-col justify-between shadow-md">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline text-[11px] font-semibold">
            Attended Sessions
          </span>
          <span className="p-1.5 rounded-lg bg-tertiary/10 text-tertiary">
            <CheckCircle2 className="w-4 h-4" />
          </span>
        </div>
        <div className="mt-3">
          <span className="font-headline-xl text-headline-xl text-on-surface font-bold">
            {summary.attendedSessions}
          </span>
          <span className="font-label-md text-label-md text-tertiary block mt-0.5 text-[12px]">
            Present & On-Time
          </span>
        </div>
        <div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-3 overflow-hidden">
          <div
            className="bg-tertiary h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${summary.overallPercentage}%` }}
          />
        </div>
      </div>

      {/* 3. Excused / Medical Leaves */}
      <div className="rounded-xl bg-surface-container-low border border-white/[0.04] p-space-md flex flex-col justify-between shadow-md">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline text-[11px] font-semibold">
            Excused / Medical
          </span>
          <span className="p-1.5 rounded-lg bg-secondary/10 text-secondary">
            <HeartPulse className="w-4 h-4" />
          </span>
        </div>
        <div className="mt-3">
          <span className="font-headline-xl text-headline-xl text-on-surface font-bold">
            {summary.excusedSessions}
          </span>
          <span className="font-label-md text-label-md text-secondary block mt-0.5 text-[12px]">
            Approved Registry Leaves
          </span>
        </div>
        <div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-3 overflow-hidden">
          <div
            className="bg-secondary h-1.5 rounded-full transition-all duration-500"
            style={{
              width: `${
                summary.totalSessions > 0
                  ? (summary.excusedSessions / summary.totalSessions) * 100
                  : 0
              }%`,
            }}
          />
        </div>
      </div>

      {/* 4. Bunk Safety Margin */}
      <div className="rounded-xl bg-surface-container-low border border-white/[0.04] p-space-md flex flex-col justify-between shadow-md">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline text-[11px] font-semibold">
            Bunk Safety Margin
          </span>
          <span className="p-1.5 rounded-lg bg-primary-container/20 text-primary">
            <Shield className="w-4 h-4" />
          </span>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1">
            <span className="font-headline-xl text-headline-xl text-primary font-bold">
              {summary.bunkSafetyMargin}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              sessions
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant block mt-0.5 text-[11px]">
            Allowed prior to 80% breach
          </span>
        </div>
        <div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-3 overflow-hidden">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-500"
            style={{ width: "65%" }}
          />
        </div>
      </div>
    </div>
  );
}
