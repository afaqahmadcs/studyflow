"use client";

import React from "react";
import { Edit2, Trash2, Plus, CheckCircle2 } from "lucide-react";
import { Goal } from "@/types/goals";
import { cn } from "@/lib/utils";

interface GoalCardSprintProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
  onUpdateProgress: (goal: Goal) => void;
  onToggleComplete: (id: string) => void;
}

export function GoalCardSprint({
  goal,
  onEdit,
  onDelete,
  onUpdateProgress,
  onToggleComplete,
}: GoalCardSprintProps) {
  const isCompleted = goal.status === "completed";
  const progressPercent =
    goal.targetValue > 0
      ? Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100))
      : 0;

  return (
    <div className="p-space-md rounded-xl bg-surface-container-low border border-white/[0.04] shadow-sm space-y-space-sm hover:bg-surface-container transition-all group relative">
      <div className="flex items-start justify-between gap-space-md">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-mono-code text-[11px] font-semibold border border-white/[0.04]">
              {goal.subjectCode}
            </span>
            <span
              className={cn(
                "font-headline-sm text-headline-sm font-semibold truncate text-[14px]",
                isCompleted ? "line-through text-on-surface-variant" : "text-on-surface"
              )}
            >
              {goal.title}
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
            {goal.keyResult || goal.description}
          </p>
        </div>

        {/* Right Status Badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={cn(
              "px-2.5 py-1 rounded-md font-mono-code text-label-sm font-semibold flex items-center gap-1.5 text-[11px]",
              isCompleted
                ? "bg-tertiary-container/30 text-tertiary"
                : "bg-tertiary-container/20 text-tertiary"
            )}
          >
            {!isCompleted && (
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
            )}
            {isCompleted ? "Achieved" : `${progressPercent}% Pace`}
          </span>

          {/* Quick Actions */}
          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
            <button
              onClick={() => onToggleComplete(goal.id)}
              className="p-1 rounded hover:bg-surface-container-highest text-tertiary"
              title={isCompleted ? "Mark Pending" : "Mark Achieved"}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
            {!isCompleted && (
              <button
                onClick={() => onUpdateProgress(goal)}
                className="p-1 rounded hover:bg-surface-container-highest text-secondary"
                title="Update Progress"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => onEdit(goal)}
              className="p-1 rounded hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface"
              title="Edit Sprint"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(goal.id)}
              className="p-1 rounded hover:bg-error/10 text-on-surface-variant hover:text-error"
              title="Delete Sprint"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Metrics & Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between font-mono-code text-body-sm text-[11px]">
          <span className="text-on-surface-variant">Target: {goal.target}</span>
          <span className="text-on-surface font-medium">
            {goal.currentValue} / {goal.targetValue} {goal.unit} logged
          </span>
        </div>
        <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-secondary-container to-secondary h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
