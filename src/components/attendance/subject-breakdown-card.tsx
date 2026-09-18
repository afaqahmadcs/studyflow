"use client";

import React from "react";
import {
  CheckCircle2,
  AlertTriangle,
  CalendarPlus,
  Plus,
  Minus,
} from "lucide-react";
import { SubjectAttendance, AttendanceStatus } from "@/types/attendance";
import { cn } from "@/lib/utils";

interface SubjectBreakdownCardProps {
  subject: SubjectAttendance;
  onQuickUpdate: (code: string, action: AttendanceStatus) => void;
  onSelectSubject?: (code: string) => void;
}

export function SubjectBreakdownCard({
  subject,
  onQuickUpdate,
  onSelectSubject,
}: SubjectBreakdownCardProps) {
  const isCritical = subject.tier === "critical" || subject.percentage < 85;

  const attendedPercent = subject.percentage;
  const missedPercent = Number((100 - attendedPercent).toFixed(1));

  return (
    <div
      onClick={() => onSelectSubject?.(subject.code)}
      className={cn(
        "rounded-xl bg-surface-container-low border p-space-lg flex flex-col justify-between shadow-md group transition-all relative overflow-hidden",
        isCritical
          ? "border-error/40 shadow-xl"
          : "border-white/[0.04] hover:bg-surface-container"
      )}
    >
      {/* Warning Glow Accent for Critical Course */}
      {isCritical && (
        <div className="absolute inset-0 bg-error-container/10 pointer-events-none" />
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "font-mono-code text-mono-code font-semibold text-[12px]",
                  isCritical ? "text-error" : "text-secondary"
                )}
              >
                {subject.code}
              </span>
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full font-label-sm text-[11px] font-semibold flex items-center gap-1",
                  isCritical
                    ? "bg-error-container/40 text-error font-bold"
                    : subject.percentage >= 95
                    ? "bg-tertiary-container/20 text-tertiary"
                    : "bg-surface-container-high text-on-surface-variant"
                )}
              >
                {isCritical && <AlertTriangle className="w-3 h-3" />}
                {subject.statusLabel}
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
              {subject.name}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
              {subject.instructor} • {subject.credits} Credits
            </p>
          </div>

          <div className="text-right">
            <span
              className={cn(
                "font-headline-xl text-headline-xl font-bold",
                isCritical ? "text-error" : "text-tertiary"
              )}
            >
              {subject.percentage.toFixed(1)}%
            </span>
            <span
              className={cn(
                "font-mono-code text-mono-code block text-[11px]",
                isCritical ? "text-error" : "text-on-surface-variant"
              )}
            >
              {subject.attended} / {subject.total} attended
            </span>
          </div>
        </div>

        {/* Progress Bar Segments */}
        <div className="w-full bg-surface-container-highest rounded-full h-2 mt-4 overflow-hidden flex">
          <div
            className={cn("h-full transition-all duration-500", isCritical ? "bg-error" : "bg-tertiary")}
            style={{ width: `${attendedPercent}%` }}
          />
          {missedPercent > 0 && (
            <div
              className={cn(
                "h-full transition-all duration-500",
                isCritical ? "bg-error-container" : "bg-error"
              )}
              style={{ width: `${missedPercent}%` }}
            />
          )}
        </div>

        {/* Dynamic Buffer Telemetry Line */}
        <div className="flex items-center justify-between mt-3 text-on-surface-variant font-label-sm text-label-sm text-[12px]">
          {isCritical ? (
            <span className="flex items-center gap-1 text-error font-semibold">
              <AlertTriangle className="w-4 h-4" />
              Only {subject.safeMissBuffer} miss allowed before 80% breach!
            </span>
          ) : (
            <span className="flex items-center gap-1 text-tertiary font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Can miss {subject.safeMissBuffer} more classes safely
            </span>
          )}
          <span className="font-mono-code text-[11px]">
            80% floor at {subject.cutoffFloorClasses} classes
          </span>
        </div>

        {/* Low Attendance Alert Banner for Critical Course */}
        {isCritical && (
          <div className="mt-3 p-2.5 rounded-lg bg-error-container/30 text-error font-label-sm text-label-sm flex items-center gap-2 text-[12px] border border-error/20">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Low Attendance Alert:</strong> Only {subject.safeMissBuffer} miss allowed
              before breach of 80% institutional threshold!
            </span>
          </div>
        )}
      </div>

      {/* Footer Action Buttons */}
      <div className="relative z-10 mt-5 pt-3 flex items-center justify-end gap-2 bg-surface-container-lowest/50 -mx-space-lg -mb-space-lg px-space-lg py-2.5 rounded-b-xl border-t border-white/[0.04]">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickUpdate(subject.code, "excused");
          }}
          className="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-sm text-[11px] transition-all flex items-center gap-1 border border-white/[0.04]"
        >
          <CalendarPlus className="w-3.5 h-3.5 text-secondary" /> Apply Leave
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickUpdate(subject.code, "absent");
          }}
          className="px-2.5 py-1 rounded bg-error-container/20 hover:bg-error-container/40 text-error font-label-sm text-[11px] transition-all flex items-center gap-1 border border-error/20"
        >
          <Minus className="w-3 h-3" /> Mark Absent
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickUpdate(subject.code, "present");
          }}
          className={cn(
            "px-3 py-1 rounded font-label-sm text-[11px] font-semibold transition-all flex items-center gap-1",
            isCritical
              ? "bg-primary text-on-primary hover:opacity-95 shadow-[0_0_12px_rgba(192,193,255,0.3)]"
              : "bg-tertiary/20 hover:bg-tertiary/30 text-tertiary border border-tertiary/30"
          )}
        >
          <Plus className="w-3 h-3" /> Mark Present
        </button>
      </div>
    </div>
  );
}
