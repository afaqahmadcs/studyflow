"use client";

import React from "react";
import {
  CheckCircle2,
  Clock,
  MoreVertical,
  Edit2,
  Trash2,
  Plus,
} from "lucide-react";
import { Goal } from "@/types/goals";
import { cn } from "@/lib/utils";

interface GoalCardDailyProps {
  goal: Goal;
  onToggleComplete: (id: string) => void;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
  onUpdateProgress: (goal: Goal) => void;
}

export function GoalCardDaily({
  goal,
  onToggleComplete,
  onEdit,
  onDelete,
  onUpdateProgress,
}: GoalCardDailyProps) {
  const isCompleted = goal.status === "completed";
  const progressPercent =
    goal.targetValue > 0
      ? Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100))
      : 0;

  return (
    <article
      className={cn(
        "p-space-md rounded-xl bg-surface-container-low border border-white/[0.04] shadow-sm flex flex-col gap-3 hover:bg-surface-container transition-all group relative",
        isCompleted ? "opacity-80" : ""
      )}
    >
      <div className="flex items-start justify-between gap-space-md">
        <div className="flex items-start gap-space-md min-w-0">
          {/* Checkbox */}
          <label className="relative flex items-center justify-center mt-0.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => onToggleComplete(goal.id)}
              className="w-5 h-5 rounded bg-surface-container-high text-primary-container accent-primary cursor-pointer transition-all"
            />
          </label>

          {/* Body Content */}
          <div className="min-w-0 space-y-1">
            <p
              className={cn(
                "font-headline-sm text-headline-sm truncate select-none text-[14px]",
                isCompleted
                  ? "text-on-surface-variant line-through"
                  : "text-on-surface font-semibold"
              )}
            >
              {goal.title}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-mono-code text-[11px] font-medium border border-white/[0.04]">
                {goal.subjectCode} {goal.subjectName}
              </span>

              {/* Priority pill */}
              <span
                className={cn(
                  "px-2 py-0.5 rounded font-mono-code text-[11px] font-medium",
                  goal.priority === "critical"
                    ? "bg-error-container/30 text-error"
                    : goal.priority === "medium"
                    ? "bg-secondary-container/20 text-secondary"
                    : "bg-surface-container-high text-on-surface-variant"
                )}
              >
                {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
              </span>

              {/* Deadline or Notes */}
              <span className="font-body-sm text-body-sm text-outline flex items-center gap-1 text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                {goal.notes || goal.deadline}
              </span>
            </div>
          </div>
        </div>

        {/* Right Status / Timestamp & Actions */}
        <div className="flex flex-col items-end flex-shrink-0">
          {isCompleted ? (
            <div className="flex items-center gap-1 text-tertiary font-mono-code text-[12px] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-tertiary" />
              <span>{goal.verifiedAt || "Completed"}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {goal.targetValue > 1 && (
                <span className="px-2 py-0.5 rounded font-mono-code text-[11px] bg-secondary-container/20 text-secondary font-semibold uppercase">
                  {progressPercent}% Done
                </span>
              )}
              <span className="font-mono-code text-[12px] text-on-surface-variant font-medium">
                {goal.deadline}
              </span>
            </div>
          )}

          {/* Hover Actions */}
          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity mt-1">
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
              title="Edit Goal"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(goal.id)}
              className="p-1 rounded hover:bg-error/10 text-on-surface-variant hover:text-error"
              title="Delete Goal"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Track Bar if multi-step and in progress */}
      {!isCompleted && goal.targetValue > 1 && (
        <div className="pl-8 w-full space-y-1">
          <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-secondary h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between font-mono-code text-[11px] text-outline">
            <span>
              {goal.currentValue} of {goal.targetValue} {goal.unit}
            </span>
            <span>Target: {goal.target}</span>
          </div>
        </div>
      )}
    </article>
  );
}
