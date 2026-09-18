"use client";

import React from "react";
import { CircularProgress, SegmentedProgress } from "@/components/ui/progress";
import { CHECKPOINTS } from "@/data/student-data";

export function MomentumCard() {
  return (
    <div className="bg-surface-container-low/90 backdrop-blur-md rounded-xl p-space-md shadow-sm border border-white/[0.06] relative overflow-hidden flex flex-col justify-between h-full">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-md">
          <div className="space-y-1">
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-container/20 text-primary font-mono-code text-mono-code border border-primary/20">
                Sprint Week 08 • Day 1
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
              </span>
              <span className="font-label-sm text-label-sm text-tertiary font-medium">
                Real-time Telemetry
              </span>
            </div>

            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight pt-1">
              Today&apos;s Momentum
            </h2>

            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              2 lectures attended • 1 assignment submitted •{" "}
              <span className="text-on-surface font-medium">1h 45m</span> deep study
              remaining to secure your 100% daily velocity.
            </p>
          </div>

          {/* Concentric Radial Progress Mini Widget */}
          <div className="flex items-center gap-space-sm bg-surface-container-high/60 px-space-md py-2.5 rounded-lg flex-shrink-0 border border-white/[0.06] self-start">
            <CircularProgress percentage={72} size={48} strokeWidth={4} />
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                5 of 7 Completed
              </span>
              <span className="font-mono-code text-mono-code text-on-surface-variant">
                Daily Targets
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Sprint Bar */}
      <div className="pt-space-md mt-space-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-label-sm font-label-sm text-on-surface-variant pb-1.5 gap-1">
          <span>Daily Completion Milestones</span>
          <span className="font-mono-code text-mono-code text-primary">
            Next Checkpoint: OS Kernel Lab @ 14:00
          </span>
        </div>
        <SegmentedProgress segments={CHECKPOINTS} className="h-2" />
      </div>
    </div>
  );
}
