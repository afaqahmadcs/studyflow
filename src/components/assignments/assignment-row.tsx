"use client";

import React from "react";
import {
  AlarmClock,
  Check,
  Edit3,
  Trash2,
  Tag,
} from "lucide-react";
import { AssignmentItem } from "@/types/assignment";
import { cn } from "@/lib/utils";

interface AssignmentRowProps {
  item: AssignmentItem;
  onToggleComplete: (id: string) => void;
  onEdit: (item: AssignmentItem) => void;
  onDelete: (id: string) => void;
}

export function AssignmentRow({
  item,
  onToggleComplete,
  onEdit,
  onDelete,
}: AssignmentRowProps) {
  const isCritical = item.priority === "critical";
  const isHigh = item.priority === "high";
  const isMedium = item.priority === "medium";

  const priorityColorBar = isCritical
    ? "bg-error"
    : isHigh
    ? "bg-amber-400"
    : isMedium
    ? "bg-secondary"
    : "bg-surface-container-highest";

  return (
    <div
      className={cn(
        "group p-4 rounded-xl transition-all duration-200 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4 relative overflow-hidden border",
        item.completed
          ? "bg-surface-container-low/50 border-white/[0.04] opacity-75"
          : "bg-surface-container-low/90 hover:bg-surface-container border-white/[0.06]"
      )}
    >
      {/* Left indicator strip */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-1", priorityColorBar)} />

      {/* Main Content Info */}
      <div className="flex items-start gap-3.5 flex-1 min-w-0 pl-1">
        {/* Interactive Custom Checkbox */}
        <button
          type="button"
          onClick={() => onToggleComplete(item.id)}
          aria-label={item.completed ? "Mark incomplete" : "Mark complete"}
          className={cn(
            "w-5 h-5 rounded mt-0.5 flex-shrink-0 flex items-center justify-center transition-all border",
            item.completed
              ? "bg-primary border-primary text-on-primary"
              : "bg-surface-container-high border-white/[0.12] hover:border-primary/50 text-transparent"
          )}
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </button>

        <div className="min-w-0 space-y-1.5 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-surface-container-highest font-mono-code text-[11px] text-on-surface font-bold border border-white/[0.06]">
              {item.subjectCode}
            </span>

            <h3
              onClick={() => onEdit(item)}
              className={cn(
                "font-headline-sm text-headline-sm font-semibold transition-colors cursor-pointer truncate",
                item.completed
                  ? "line-through text-on-surface-variant"
                  : "text-on-surface hover:text-primary"
              )}
            >
              {item.title}
            </h3>

            {/* Priority Badge */}
            {isCritical && (
              <span className="px-2 py-0.5 rounded-full bg-error-container/30 text-error font-mono-code text-[10px] font-semibold flex items-center gap-1 border border-error/20 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-error" /> Critical Due
              </span>
            )}
            {isHigh && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-label-sm text-[11px] font-medium border border-amber-500/20">
                High
              </span>
            )}
            {isMedium && (
              <span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-[11px] font-medium border border-secondary/20">
                Medium
              </span>
            )}
            {!isCritical && !isHigh && !isMedium && (
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-[11px] border border-white/[0.04]">
                Standard
              </span>
            )}

            {/* Status Pill */}
            <span
              className={cn(
                "px-2 py-0.5 rounded-full font-mono-code text-[11px] font-medium flex items-center gap-1",
                item.completed
                  ? "bg-tertiary-container/30 text-tertiary border border-tertiary/20"
                  : item.status === "in_progress"
                  ? "bg-secondary/15 text-secondary border border-secondary/20"
                  : "bg-surface-container-highest text-on-surface-variant"
              )}
            >
              {item.completed ? "Completed" : item.status === "in_progress" ? "In Progress" : item.status === "overdue" ? "Overdue" : "Pending"}
            </span>
          </div>

          <p className="font-body-sm text-xs text-on-surface-variant line-clamp-1">
            {item.description}
          </p>

          <div className="flex items-center gap-3 font-label-sm text-xs text-on-surface-variant flex-wrap pt-0.5">
            <span
              className={cn(
                "flex items-center gap-1 font-medium",
                isCritical && !item.completed ? "text-error" : "text-on-surface"
              )}
            >
              <AlarmClock className="w-3.5 h-3.5" />
              {item.dueDisplay}
            </span>

            {item.specs && (
              <>
                <span>•</span>
                <span className="truncate">{item.specs}</span>
              </>
            )}

            {item.grade && (
              <>
                <span>•</span>
                <span className="text-tertiary font-mono-code font-bold">
                  {item.grade}
                </span>
              </>
            )}

            {item.tags && item.tags.length > 0 && (
              <div className="flex items-center gap-1 ml-auto hidden sm:flex">
                <Tag className="w-3 h-3 text-outline" />
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.2 rounded bg-surface-container text-on-surface-variant font-mono-code text-[10px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress & Action Controls */}
      <div className="flex items-center gap-4 self-end xl:self-center flex-shrink-0">
        <div className="w-28 text-right">
          <div
            className={cn(
              "font-mono-code text-xs font-semibold",
              item.completed
                ? "text-tertiary"
                : item.progress > 70
                ? "text-tertiary"
                : item.progress > 30
                ? "text-secondary"
                : "text-on-surface-variant"
            )}
          >
            {item.progress}% {item.completed ? "Done" : item.progress === 0 ? "Queue" : "Ready"}
          </div>
          <div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                item.completed
                  ? "bg-tertiary"
                  : item.progress > 70
                  ? "bg-tertiary"
                  : item.progress > 30
                  ? "bg-secondary"
                  : "bg-primary"
              )}
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(item)}
            className="p-1.5 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors"
            title="Edit deliverable"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-1.5 rounded-lg hover:bg-error-container/20 text-on-surface-variant hover:text-error transition-colors"
            title="Delete deliverable"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
