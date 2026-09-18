"use client";

import React from "react";
import { School, FlaskConical, Code, Edit2, Trash2, Plus, CheckCircle2 } from "lucide-react";
import { Goal } from "@/types/goals";
import { cn } from "@/lib/utils";

interface GoalCardStrategicProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
  onUpdateProgress: (goal: Goal) => void;
  onToggleComplete: (id: string) => void;
}

export function GoalCardStrategic({
  goal,
  onEdit,
  onDelete,
  onUpdateProgress,
  onToggleComplete,
}: GoalCardStrategicProps) {
  const isCompleted = goal.status === "completed";
  const progressPercent =
    goal.targetValue > 0
      ? Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100))
      : 0;

  const getIcon = () => {
    if (goal.subjectName.toLowerCase().includes("honor") || goal.unit === "GPA") {
      return <School className="w-5 h-5 text-tertiary" />;
    }
    if (goal.subjectName.toLowerCase().includes("research") || goal.unit === "phases") {
      return <FlaskConical className="w-5 h-5 text-secondary" />;
    }
    return <Code className="w-5 h-5 text-primary" />;
  };

  return (
    <div className="p-space-md rounded-xl bg-surface-container-low border border-white/[0.04] shadow-md space-y-space-md hover:bg-surface-container transition-all group relative">
      <div className="flex items-start justify-between">
        <div className="space-y-1 min-w-0">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold text-[10px]">
            {goal.subjectName}
          </span>
          <h3
            className={cn(
              "font-headline-sm text-headline-sm font-semibold truncate text-[14px]",
              isCompleted ? "line-through text-on-surface-variant" : "text-on-surface"
            )}
          >
            {goal.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center border border-white/[0.04]">
            {getIcon()}
          </div>

          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
            <button
              onClick={() => onToggleComplete(goal.id)}
              className="p-1 rounded hover:bg-surface-container-highest text-tertiary"
              title={isCompleted ? "Mark Incomplete" : "Mark Complete"}
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
              title="Edit Milestone"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(goal.id)}
              className="p-1 rounded hover:bg-error/10 text-on-surface-variant hover:text-error"
              title="Delete Milestone"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px] leading-relaxed">
        {goal.description}
      </p>

      {/* Visual Visualization: Projection Curve or Phase Indicators */}
      {goal.unit === "GPA" ? (
        <div className="p-3 rounded-lg bg-surface-container-lowest space-y-2 border border-white/[0.02]">
          <div className="flex items-center justify-between text-label-sm font-mono-code text-outline text-[11px]">
            <span>Projection Curve</span>
            <span className="text-tertiary font-semibold">P(Honor) = 93.4%</span>
          </div>
          <div className="h-12 w-full flex items-end">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 200 50">
              <path
                className="text-tertiary"
                d="M0,40 Q30,35 60,30 T120,20 T160,15 T200,8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <circle className="fill-tertiary" cx="200" cy="8" r="4" />
            </svg>
          </div>
          <div className="flex justify-between font-mono-code text-[10px] text-outline">
            <span>Midterms (W4)</span>
            <span>Current ({goal.currentValue} GPA)</span>
            <span>Finals ({goal.targetValue} Target)</span>
          </div>
        </div>
      ) : goal.unit === "phases" ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono-code text-body-sm text-[11px]">
            <span className="text-outline">
              Phase Progress: {goal.currentValue} / {goal.targetValue}
            </span>
            <span className="text-secondary font-semibold">{progressPercent}%</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 h-2">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className={cn(
                  "rounded-sm transition-colors",
                  idx <= goal.currentValue
                    ? "bg-secondary"
                    : "bg-surface-container-highest"
                )}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-body-sm text-outline text-[11px]">
            <span className="text-on-surface-variant font-medium">
              {goal.notes || "Empirical benchmark runs"}
            </span>
            <span className="font-mono-code text-[10px]">Due {goal.deadline}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono-code text-body-sm text-[11px]">
            <span className="text-on-surface-variant">
              {goal.currentValue} of {goal.targetValue} {goal.unit}
            </span>
            <span className="text-primary font-semibold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary-container h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between font-mono-code text-[10px] text-outline">
            <span>Target: {goal.target}</span>
            <span>Deadline: {goal.deadline}</span>
          </div>
        </div>
      )}
    </div>
  );
}
