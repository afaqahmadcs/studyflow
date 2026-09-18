"use client";

import React, { useState } from "react";
import {
  AlarmClock,
  MoreVertical,
} from "lucide-react";
import { INITIAL_DELIVERABLES, Deliverable } from "@/data/student-data";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "urgent" | "in_progress" | "submitted";

export function DeliverablesList() {
  const [deliverables, setDeliverables] = useState<Deliverable[]>(INITIAL_DELIVERABLES);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const { toast } = useToast();

  const toggleComplete = (id: string) => {
    setDeliverables((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextCompleted = !item.completed;
          toast({
            title: nextCompleted ? "Deliverable Completed" : "Deliverable Reopened",
            description: `${item.title} marked as ${nextCompleted ? "completed" : "in progress"}.`,
            type: nextCompleted ? "success" : "info",
          });
          return {
            ...item,
            completed: nextCompleted,
            progress: nextCompleted ? 100 : item.progress === 100 ? 50 : item.progress,
            category: nextCompleted ? "submitted" : "in_progress",
          };
        }
        return item;
      })
    );
  };

  const filteredItems = deliverables.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "urgent") return item.category === "urgent" || item.priority === "critical";
    if (activeTab === "in_progress") return item.category === "in_progress" && !item.completed;
    if (activeTab === "submitted") return item.category === "submitted" || item.completed;
    return true;
  });

  const urgentCount = deliverables.filter((d) => d.category === "urgent" || d.priority === "critical").length;
  const inProgressCount = deliverables.filter((d) => d.category === "in_progress" && !d.completed).length;
  const submittedCount = deliverables.filter((d) => d.category === "submitted" || d.completed).length;

  return (
    <div className="bg-surface-container-low/90 backdrop-blur-md rounded-xl p-space-md shadow-sm border border-white/[0.06] space-y-space-md">
      {/* Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Critical Deliverables
          </h3>
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            Active academic commitments &amp; deadlines
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center bg-surface-container p-1 rounded-lg self-start border border-white/[0.04]">
          <button
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-2.5 py-1 rounded-md font-label-sm text-label-sm font-medium transition-all",
              activeTab === "all"
                ? "bg-surface-container-high text-on-surface shadow-sm border border-white/[0.06]"
                : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            All ({deliverables.length})
          </button>
          <button
            onClick={() => setActiveTab("urgent")}
            className={cn(
              "px-2.5 py-1 rounded-md font-label-sm text-label-sm font-medium transition-all",
              activeTab === "urgent"
                ? "bg-surface-container-high text-error shadow-sm border border-white/[0.06]"
                : "text-error hover:text-on-surface"
            )}
          >
            Urgent ({urgentCount})
          </button>
          <button
            onClick={() => setActiveTab("in_progress")}
            className={cn(
              "px-2.5 py-1 rounded-md font-label-sm text-label-sm font-medium transition-all",
              activeTab === "in_progress"
                ? "bg-surface-container-high text-on-surface shadow-sm border border-white/[0.06]"
                : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            In Progress ({inProgressCount})
          </button>
          <button
            onClick={() => setActiveTab("submitted")}
            className={cn(
              "px-2.5 py-1 rounded-md font-label-sm text-label-sm font-medium transition-all",
              activeTab === "submitted"
                ? "bg-surface-container-high text-on-surface shadow-sm border border-white/[0.06]"
                : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            Submitted ({submittedCount})
          </button>
        </div>
      </div>

      {/* Deliverables List */}
      <div className="space-y-2.5">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              className={cn(
                "p-space-sm rounded-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group border border-white/[0.04]",
                item.completed
                  ? "bg-surface-container/40 opacity-70"
                  : "bg-surface-container hover:bg-surface-container-high"
              )}
            >
              <div className="flex items-start gap-3 min-w-0">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(item.id)}
                  className="mt-1 w-4 h-4 rounded bg-surface-container-lowest text-primary focus:ring-0 accent-primary cursor-pointer transition-transform active:scale-90"
                />

                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-mono-code text-[11px]">
                      {item.courseCode}
                    </span>
                    <span
                      className={cn(
                        "font-headline-sm text-headline-sm truncate transition-colors",
                        item.completed
                          ? "line-through text-on-surface-variant"
                          : "text-on-surface group-hover:text-primary"
                      )}
                    >
                      {item.title}
                    </span>

                    {item.priority === "critical" && (
                      <span className="px-2 py-0.5 rounded bg-error-container/30 text-error font-label-sm text-label-sm font-medium border border-error/20">
                        Critical Due
                      </span>
                    )}
                    {item.priority === "medium" && (
                      <span className="px-2 py-0.5 rounded bg-secondary-container/20 text-secondary font-label-sm text-label-sm border border-secondary/20">
                        Medium
                      </span>
                    )}
                    {item.priority === "standard" && (
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm border border-white/[0.06]">
                        Standard
                      </span>
                    )}
                    {item.priority === "low" && (
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm border border-white/[0.06]">
                        Low Priority
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 font-label-sm text-label-sm text-on-surface-variant flex-wrap">
                    <span
                      className={cn(
                        "flex items-center gap-1 font-medium",
                        item.priority === "critical"
                          ? "text-error"
                          : "text-on-surface"
                      )}
                    >
                      {item.priority === "critical" && (
                        <AlarmClock className="w-3.5 h-3.5 text-error" />
                      )}
                      {item.dueText}
                    </span>
                    <span>•</span>
                    <span className="truncate">{item.details}</span>
                  </div>
                </div>
              </div>

              {/* Progress & Menu */}
              <div className="flex items-center gap-3 self-end md:self-center flex-shrink-0">
                <div className="w-24 text-right">
                  <div
                    className={cn(
                      "font-mono-code text-mono-code",
                      item.completed
                        ? "text-tertiary"
                        : item.progress > 70
                        ? "text-tertiary"
                        : item.progress > 30
                        ? "text-secondary"
                        : "text-on-surface-variant"
                    )}
                  >
                    {item.progress}% {item.completed ? "done" : item.progress === 0 ? "queue" : "draft"}
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-1 mt-1 overflow-hidden">
                    <div
                      className={cn(
                        "h-1 rounded-full transition-all duration-300",
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

                <button
                  onClick={() =>
                    toast({
                      title: item.title,
                      description: "Viewing assignment details and grading rubric.",
                      type: "info",
                    })
                  }
                  className="p-1.5 rounded hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <MoreVertical className="w-[18px] h-[18px]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
