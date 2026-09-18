"use client";

import React from "react";
import { PieChart, Medal } from "lucide-react";
import { GradeTierItem } from "@/types/analytics";

interface GradeDistributionCardProps {
  totalScoredCount: number;
  medianScore: number;
  gradeTiers: GradeTierItem[];
}

export function GradeDistributionCard({
  totalScoredCount = 17,
  medianScore = 95.5,
  gradeTiers,
}: GradeDistributionCardProps) {
  return (
    <div className="lg:col-span-4 rounded-xl bg-surface-container-low p-space-lg border border-white/[0.04] shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
            Grade Tier Distribution
          </h2>
          <PieChart className="w-4 h-4 text-outline" />
        </div>
        <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
          Scored assessments ({totalScoredCount} graded deliverables)
        </p>

        {/* Visual Tier Bars */}
        <div className="mt-space-lg space-y-space-md">
          {gradeTiers.map((tier, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between font-label-sm text-[11px]">
                <span className="font-mono-code text-on-surface font-medium flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${tier.colorClass}`} />
                  {tier.label}
                </span>
                <span className="text-outline font-mono-code">
                  {tier.count} items • {tier.percentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${tier.colorClass}`}
                  style={{ width: `${tier.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Summary Card */}
      <div className="mt-space-md p-space-sm rounded-lg bg-surface-container flex items-center justify-between border border-white/[0.04]">
        <div className="flex items-center gap-2">
          <Medal className="w-4 h-4 text-tertiary" />
          <span className="font-label-md text-[12px] text-on-surface font-medium">
            Median Score
          </span>
        </div>
        <span className="font-headline-sm text-headline-sm font-bold text-tertiary font-mono-code">
          {medianScore.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}
