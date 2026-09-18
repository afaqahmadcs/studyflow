"use client";

import React from "react";
import {
  ClipboardList,
  Clock,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { AssignmentItem } from "@/types/assignment";

interface AssignmentsTelemetryProps {
  assignments: AssignmentItem[];
}

export function AssignmentsTelemetry({ assignments }: AssignmentsTelemetryProps) {
  const total = assignments.length;
  const pending = assignments.filter((a) => a.status === "pending" || (!a.completed && a.progress === 0));
  const critical = assignments.filter((a) => a.priority === "critical" && !a.completed);
  const inProgress = assignments.filter((a) => a.status === "in_progress" && !a.completed);
  const completed = assignments.filter((a) => a.status === "completed" || a.completed);
  const overdue = assignments.filter((a) => a.status === "overdue");

  const velocityPercent = total > 0 ? Math.round((completed.length / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      {/* Metric 1: Total Workload */}
      <div className="p-3.5 rounded-xl bg-surface-container-low/90 backdrop-blur-md flex flex-col justify-between shadow-sm border border-white/[0.06] hover:bg-surface-container transition-all">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            Total Workload
          </span>
          <ClipboardList className="w-[18px] h-[18px] text-primary" />
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
            {total}
          </span>
          <span className="font-mono-code text-[11px] text-on-surface-variant">
            Active Term
          </span>
        </div>
      </div>

      {/* Metric 2: Pending */}
      <div className="p-3.5 rounded-xl bg-surface-container-low/90 backdrop-blur-md flex flex-col justify-between shadow-sm border border-white/[0.06] hover:bg-surface-container transition-all">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            Pending
          </span>
          <Clock className="w-[18px] h-[18px] text-outline" />
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
            {pending.length}
          </span>
          <span className="font-mono-code text-[11px] text-error font-medium">
            {critical.length} Critical
          </span>
        </div>
      </div>

      {/* Metric 3: In Progress */}
      <div className="p-3.5 rounded-xl bg-surface-container-low/90 backdrop-blur-md flex flex-col justify-between shadow-sm border border-white/[0.06] hover:bg-surface-container transition-all">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            In Progress
          </span>
          <TrendingUp className="w-[18px] h-[18px] text-secondary" />
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-headline-lg text-headline-lg font-bold text-secondary">
            {inProgress.length}
          </span>
          <span className="font-mono-code text-[11px] text-on-surface-variant">
            Active sprints
          </span>
        </div>
      </div>

      {/* Metric 4: Completed */}
      <div className="p-3.5 rounded-xl bg-surface-container-low/90 backdrop-blur-md flex flex-col justify-between shadow-sm border border-white/[0.06] hover:bg-surface-container transition-all">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            Completed
          </span>
          <CheckCircle2 className="w-[18px] h-[18px] text-tertiary" />
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-headline-lg text-headline-lg font-bold text-tertiary">
            {completed.length}
          </span>
          <span className="font-mono-code text-[11px] text-tertiary font-medium">
            {velocityPercent}% velocity
          </span>
        </div>
      </div>

      {/* Metric 5: Overdue */}
      <div className="p-3.5 rounded-xl bg-surface-container-low/90 backdrop-blur-md col-span-2 sm:col-span-1 flex flex-col justify-between shadow-sm border border-white/[0.06] hover:bg-surface-container transition-all">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            Overdue
          </span>
          <ShieldCheck className="w-[18px] h-[18px] text-tertiary" />
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-headline-lg text-headline-lg font-bold text-tertiary">
            {overdue.length}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {overdue.length === 0 ? "Flawless record" : "Action required"}
          </span>
        </div>
      </div>
    </div>
  );
}
