"use client";

import React from "react";
import {
  Search,
  ChevronDown,
  LayoutList,
  Kanban,
  ArrowUpDown,
} from "lucide-react";
import { AssignmentStatus, AssignmentPriority } from "@/types/assignment";
import { cn } from "@/lib/utils";

export type StatusTabKey = "all" | AssignmentStatus;
export type SortOption = "dueDate" | "priority" | "progress" | "title";

interface AssignmentsControlBarProps {
  currentTab: StatusTabKey;
  onTabChange: (tab: StatusTabKey) => void;
  counts: Record<StatusTabKey, number>;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCourse: string;
  onCourseChange: (c: string) => void;
  selectedPriority: string;
  onPriorityChange: (p: string) => void;
  sortBy: SortOption;
  onSortChange: (s: SortOption) => void;
  viewMode: "list" | "board";
  onViewModeChange: (v: "list" | "board") => void;
}

export function AssignmentsControlBar({
  currentTab,
  onTabChange,
  counts,
  searchQuery,
  onSearchChange,
  selectedCourse,
  onCourseChange,
  selectedPriority,
  onPriorityChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: AssignmentsControlBarProps) {
  const tabs: { key: StatusTabKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "in_progress", label: "In Progress" },
    { key: "completed", label: "Completed" },
    { key: "overdue", label: "Overdue" },
  ];

  return (
    <div className="p-3.5 rounded-xl bg-surface-container-low/90 backdrop-blur-md mb-6 shadow-sm border border-white/[0.06] flex flex-col xl:flex-row gap-4 justify-between items-stretch xl:items-center">
      {/* Left: Status Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 xl:pb-0">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.key;
          const count = counts[tab.key] || 0;

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={cn(
                "px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5 whitespace-nowrap",
                isActive
                  ? "bg-surface-container-high text-on-surface shadow-sm font-semibold border border-white/[0.06]"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded-full font-mono-code text-[10px]",
                  isActive
                    ? "bg-primary-container text-on-primary font-bold"
                    : tab.key === "in_progress"
                    ? "bg-secondary/15 text-secondary"
                    : tab.key === "completed"
                    ? "bg-tertiary-container/30 text-tertiary"
                    : "bg-surface-container-highest text-on-surface-variant"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right: Search, Course Filter, Priority Filter, Sort, Layout */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Quick Search */}
        <div className="relative flex-1 sm:flex-initial">
          <Search className="w-4 h-4 text-outline absolute left-2.5 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks, course, tag... (⌘F)"
            className="w-full sm:w-56 bg-surface-container-high text-on-surface placeholder:text-outline font-body-sm text-body-sm pl-8 pr-3 py-1.5 rounded-lg border border-white/[0.06] focus:outline-none focus:bg-surface-variant focus:border-primary/40 transition-all"
          />
        </div>

        {/* Course Filter Dropdown */}
        <div className="relative">
          <select
            value={selectedCourse}
            onChange={(e) => onCourseChange(e.target.value)}
            className="appearance-none bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md pl-3 pr-7 py-1.5 rounded-lg border border-white/[0.06] focus:outline-none cursor-pointer transition-all"
          >
            <option value="ALL">All Courses</option>
            <option value="CS450">CS450: Operating Systems</option>
            <option value="CS320">CS320: Database Systems</option>
            <option value="MATH310">MATH310: Linear Algebra</option>
            <option value="CS401">CS401: Distributed Systems</option>
          </select>
          <ChevronDown className="w-4 h-4 text-on-surface-variant absolute right-2 top-2.5 pointer-events-none" />
        </div>

        {/* Priority Filter Dropdown */}
        <div className="relative">
          <select
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="appearance-none bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md pl-3 pr-7 py-1.5 rounded-lg border border-white/[0.06] focus:outline-none cursor-pointer transition-all"
          >
            <option value="ALL">All Priorities</option>
            <option value="critical">Critical Due</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Standard / Low</option>
          </select>
          <ChevronDown className="w-4 h-4 text-on-surface-variant absolute right-2 top-2.5 pointer-events-none" />
        </div>

        {/* Sort Selector */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="appearance-none bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md pl-3 pr-7 py-1.5 rounded-lg border border-white/[0.06] focus:outline-none cursor-pointer transition-all"
          >
            <option value="dueDate">Sort: Due Date</option>
            <option value="priority">Sort: Priority</option>
            <option value="progress">Sort: Progress</option>
            <option value="title">Sort: Title</option>
          </select>
          <ArrowUpDown className="w-3.5 h-3.5 text-on-surface-variant absolute right-2 top-2.5 pointer-events-none" />
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center p-0.5 rounded-lg bg-surface-container-high border border-white/[0.06]">
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={cn(
              "p-1.5 rounded transition-all",
              viewMode === "list"
                ? "bg-surface-variant text-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            )}
            title="Detailed List View"
          >
            <LayoutList className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("board")}
            className={cn(
              "p-1.5 rounded transition-all",
              viewMode === "board"
                ? "bg-surface-variant text-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            )}
            title="Kanban Board View"
          >
            <Kanban className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
