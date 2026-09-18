"use client";

import React from "react";
import { Check, Calendar, CheckCircle2, Clock } from "lucide-react";
import { CheckInSlot, AttendanceStatus } from "@/types/attendance";
import { cn } from "@/lib/utils";

interface TodayCheckinQueueProps {
  slots: CheckInSlot[];
  onMarkSlot: (slotId: string, status: AttendanceStatus) => void;
}

export function TodayCheckinQueue({ slots, onMarkSlot }: TodayCheckinQueueProps) {
  const markedCount = slots.filter((s) => s.status !== "pending").length;
  const pendingCount = slots.length - markedCount;

  return (
    <div className="rounded-xl bg-surface-container-low border border-white/[0.04] p-space-lg shadow-md flex flex-col gap-space-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-space-xs">
          <Calendar className="w-5 h-5 text-secondary" />
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Today&apos;s Class Check-In Queue
          </h2>
          <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-mono-code text-[11px]">
            Oct 27, 2025
          </span>
        </div>
        <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
          {markedCount} marked • {pendingCount} pending signature
        </span>
      </div>

      {/* Grid of Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-sm">
        {slots.map((slot) => {
          const isMarked = slot.status !== "pending";

          return (
            <div
              key={slot.id}
              className={cn(
                "rounded-lg p-3 flex flex-col justify-between border transition-all",
                isMarked
                  ? "bg-surface-container border-white/[0.04]"
                  : "bg-surface-container-high border-primary/20 shadow-sm"
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono-code text-mono-code text-secondary font-medium text-[13px]">
                    {slot.title}
                  </span>
                  <p className="font-label-sm text-label-sm text-on-surface-variant text-[11px] mt-0.5">
                    {slot.time} • {slot.room}
                  </p>
                </div>

                {isMarked ? (
                  <span
                    className={cn(
                      "p-1 rounded-full",
                      slot.status === "present"
                        ? "bg-tertiary-container/30 text-tertiary"
                        : slot.status === "excused"
                        ? "bg-secondary/20 text-secondary"
                        : "bg-error/20 text-error"
                    )}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                )}
              </div>

              {/* Action Buttons or Logged Confirmation */}
              {isMarked ? (
                <div className="mt-3 flex items-center justify-between border-t border-white/[0.04] pt-2">
                  <span className="font-mono-code text-[11px] text-on-surface-variant flex items-center gap-1">
                    <Clock className="w-3 h-3 text-outline" />
                    {slot.loggedAt || "Logged Just Now"}
                  </span>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded font-label-sm text-[11px] font-semibold",
                      slot.status === "present"
                        ? "bg-tertiary/10 text-tertiary"
                        : slot.status === "excused"
                        ? "bg-secondary/15 text-secondary"
                        : "bg-error/15 text-error"
                    )}
                  >
                    {slot.status === "present"
                      ? "Present ✓"
                      : slot.status === "excused"
                      ? "Excused Leave"
                      : "Marked Absent"}
                  </span>
                </div>
              ) : (
                <div className="mt-3 flex items-center gap-1.5 pt-2 border-t border-white/[0.04]">
                  <button
                    onClick={() => onMarkSlot(slot.id, "present")}
                    className="flex-1 py-1 rounded bg-tertiary/20 hover:bg-tertiary/30 text-tertiary font-label-sm text-[11px] font-semibold transition-all border border-tertiary/30 flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Present
                  </button>
                  <button
                    onClick={() => onMarkSlot(slot.id, "absent")}
                    className="flex-1 py-1 rounded bg-error-container/30 hover:bg-error-container/50 text-error font-label-sm text-[11px] font-semibold transition-all border border-error/30"
                  >
                    Absent
                  </button>
                  <button
                    onClick={() => onMarkSlot(slot.id, "excused")}
                    className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-highest text-on-surface-variant font-label-sm text-[11px] transition-all border border-white/[0.04]"
                  >
                    Excused
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
