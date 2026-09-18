"use client";

import React from "react";
import {
  Clock,
  ClipboardCheck,
  Flag,
  ShieldCheck,
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress";

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
      {/* Stat 1: Classes Today */}
      <div className="bg-surface-container-low/80 backdrop-blur-md rounded-xl p-space-md shadow-sm border border-white/[0.06] hover:bg-surface-container-low transition-all">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Classes Today
          </span>
          <div className="p-2 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center border border-primary/20">
            <Clock className="w-[20px] h-[20px]" />
          </div>
        </div>

        <div className="mt-space-sm flex items-baseline gap-2">
          <span className="font-headline-xl text-headline-xl text-on-surface font-bold">
            4
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Lectures • Labs
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-label-sm font-label-sm flex-wrap">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
          <span className="text-tertiary font-medium">2 done</span>
          <span className="text-outline">•</span>
          <span className="text-primary font-medium">1 in session</span>
          <span className="text-outline">•</span>
          <span className="text-on-surface-variant">1 left</span>
        </div>

        <p className="mt-2 text-label-sm font-label-sm text-on-surface-variant truncate">
          Next: Operating Systems at 02:00 PM
        </p>
      </div>

      {/* Stat 2: Assignments */}
      <div className="bg-surface-container-low/80 backdrop-blur-md rounded-xl p-space-md shadow-sm border border-white/[0.06] hover:bg-surface-container-low transition-all">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Assignments
          </span>
          <div className="p-2 rounded-lg bg-secondary-container/20 text-secondary flex items-center justify-center border border-secondary/20">
            <ClipboardCheck className="w-[20px] h-[20px]" />
          </div>
        </div>

        <div className="mt-space-sm flex items-baseline gap-2">
          <span className="font-headline-xl text-headline-xl text-on-surface font-bold">
            5
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Active deliverables
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="px-2 py-0.5 rounded bg-error-container/30 text-error font-mono-code text-[11px] font-medium flex items-center gap-1 border border-error/20">
            <span className="w-1.5 h-1.5 rounded-full bg-error" /> 1 Due Tonight
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            2 this week
          </span>
        </div>

        <p className="mt-2 text-label-sm font-label-sm text-on-surface-variant truncate">
          CS450 Kernel Allocator (85% ready)
        </p>
      </div>

      {/* Stat 3: Midterm Target */}
      <div className="bg-surface-container-low/80 backdrop-blur-md rounded-xl p-space-md shadow-sm border border-white/[0.06] hover:bg-surface-container-low transition-all">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Midterm Target
          </span>
          <div className="p-2 rounded-lg bg-error-container/20 text-error flex items-center justify-center border border-error/20">
            <Flag className="w-[20px] h-[20px]" />
          </div>
        </div>

        <div className="mt-space-sm flex items-baseline gap-2">
          <span className="font-headline-xl text-headline-xl text-on-surface font-bold">
            4d 16h
          </span>
          <span className="font-body-sm text-body-sm text-error font-medium">
            Midterms
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface font-medium truncate">
            CS401: Distributed Systems
          </span>
          <span className="font-mono-code text-mono-code text-tertiary">
            78% Ready
          </span>
        </div>

        <div className="mt-2">
          <ProgressBar value={78} colorClass="bg-tertiary" />
        </div>
      </div>

      {/* Stat 4: Attendance Index */}
      <div className="bg-surface-container-low/80 backdrop-blur-md rounded-xl p-space-md shadow-sm border border-white/[0.06] hover:bg-surface-container-low transition-all">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Attendance Index
          </span>
          <div className="p-2 rounded-lg bg-tertiary-container/20 text-tertiary flex items-center justify-center border border-tertiary/20">
            <ShieldCheck className="w-[20px] h-[20px]" />
          </div>
        </div>

        <div className="mt-space-sm flex items-baseline gap-2">
          <span className="font-headline-xl text-headline-xl text-on-surface font-bold">
            93.4%
          </span>
          <span className="font-mono-code text-mono-code text-tertiary text-xs">
            +1.2% mo
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Min Safe Threshold: 80%
          </span>
          <span className="font-mono-code text-mono-code text-tertiary font-semibold">
            Safe
          </span>
        </div>

        <div className="mt-2">
          <ProgressBar value={93.4} colorClass="bg-tertiary" />
        </div>
      </div>
    </div>
  );
}
