"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  AlertTriangle,
  Clock,
  CheckCircle,
  TimerOff,
  BellRing,
  ArrowRight,
  RotateCw,
} from "lucide-react";
import { CognitiveDirective } from "@/types/analytics";

interface AiAdvisoryCardProps {
  directives: CognitiveDirective[];
  lastUpdated?: string;
}

export function AiAdvisoryCard({ directives, lastUpdated = "Just now" }: AiAdvisoryCardProps) {
  return (
    <div className="lg:col-span-5 rounded-xl bg-surface-container-low p-space-lg border border-white/[0.04] shadow-xl flex flex-col justify-between relative overflow-hidden">
      <div className="absolute -right-12 -top-12 w-36 h-36 bg-primary-container/15 rounded-full blur-3xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
              AI Cognitive Advisory
            </h2>
          </div>
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono-code text-[10px] font-medium border border-primary/20">
            Model v4.2
          </span>
        </div>
        <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">
          Autonomous telemetry diagnostics &amp; remedial action items
        </p>

        {/* Advisory Directives */}
        <div className="mt-space-md space-y-space-sm">
          {directives.map((directive) => {
            const isCritical = directive.severity === "critical";
            const isPriority = directive.severity === "priority";

            const iconBg = isCritical
              ? "bg-error/15 text-error border border-error/20"
              : isPriority
              ? "bg-secondary/15 text-secondary border border-secondary/20"
              : "bg-tertiary/15 text-tertiary border border-tertiary/20";

            const badgeBg = isCritical
              ? "text-error"
              : isPriority
              ? "text-secondary"
              : "text-tertiary";

            return (
              <div
                key={directive.id}
                className="p-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high transition-all flex items-start gap-space-sm border border-white/[0.02]"
              >
                <span className={`p-1.5 rounded flex-shrink-0 mt-0.5 ${iconBg}`}>
                  {isCritical ? (
                    <TimerOff className="w-4 h-4" />
                  ) : isPriority ? (
                    <BellRing className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </span>

                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-[13px] font-semibold text-on-surface">
                      {directive.title}
                    </span>
                    <span className={`text-[10px] font-mono-code uppercase font-semibold ${badgeBg}`}>
                      {directive.severity}
                    </span>
                  </div>

                  <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
                    {directive.description}
                  </p>

                  <div className="pt-1 flex justify-end">
                    <Link
                      href={directive.actionHref}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary-fixed transition-colors font-mono-code"
                    >
                      <span>{directive.actionLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Footer */}
      <div className="mt-space-md pt-space-xs flex items-center justify-between border-t border-white/[0.04]">
        <span className="font-label-sm text-[11px] text-outline">Updated {lastUpdated}</span>
        <Link
          href="/timetable"
          className="inline-flex items-center gap-1.5 px-space-sm py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md text-xs font-medium hover:bg-primary transition-all shadow-md"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Apply to Timetable</span>
        </Link>
      </div>
    </div>
  );
}
