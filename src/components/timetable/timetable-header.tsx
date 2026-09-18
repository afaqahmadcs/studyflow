"use client";

import React from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  RefreshCw,
  LayoutGrid,
  CalendarDays,
  List,
  CheckCircle2,
  FlaskConical,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type TimetableViewMode = "day" | "week" | "agenda";

interface TimetableHeaderProps {
  viewMode: TimetableViewMode;
  onViewModeChange: (mode: TimetableViewMode) => void;
  selectedSubject: string;
  onSelectSubject: (subj: string) => void;
  onlyLabs: boolean;
  onToggleOnlyLabs: () => void;
  onOpenAddModal: () => void;
  onSyncCalendar: () => void;
  currentDateText: string;
  onPrevDate: () => void;
  onNextDate: () => void;
  onToday: () => void;
}

export function TimetableHeader({
  viewMode,
  onViewModeChange,
  selectedSubject,
  onSelectSubject,
  onlyLabs,
  onToggleOnlyLabs,
  onOpenAddModal,
  onSyncCalendar,
  currentDateText,
  onPrevDate,
  onNextDate,
  onToday,
}: TimetableHeaderProps) {
  const subjects = [
    { code: "ALL", label: "All Subjects", color: "bg-primary" },
    { code: "CS401", label: "CS401 Architecture", color: "bg-primary-container" },
    { code: "CS320", label: "CS320 Databases", color: "bg-secondary" },
    { code: "CS450", label: "CS450 OS Kernel", color: "bg-tertiary" },
    { code: "MATH310", label: "MATH310 LinAlg", color: "bg-secondary-fixed" },
  ];

  return (
    <div className="flex flex-col gap-space-sm mb-6">
      {/* Top Breadcrumb, Title & Primary Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs flex-wrap">
            <span className="px-space-xs py-0.5 rounded bg-primary/10 text-primary font-mono-code text-[11px] font-semibold uppercase tracking-wider border border-primary/20">
              Schedule Cockpit
            </span>
            <span className="font-mono-code text-[11px] text-outline">•</span>
            <span className="font-mono-code text-[11px] text-tertiary flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping" />
              Live Sync Enabled
            </span>
          </div>

          <h1 className="font-headline-xl text-headline-xl font-bold text-on-surface tracking-tight mt-1">
            Academic Timetable
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Spring Term 2025 • Week 8 (Oct 27 – Nov 02) • EECS Honors Track
          </p>
        </div>

        {/* Actions, Switchers, Date Navigator */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Toggle Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-surface-container-low shadow-inner border border-white/[0.06]">
            <button
              type="button"
              onClick={() => onViewModeChange("day")}
              className={cn(
                "px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5",
                viewMode === "day"
                  ? "bg-surface-container-high text-primary font-semibold shadow-md border border-white/[0.06]"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Day</span>
            </button>

            <button
              type="button"
              onClick={() => onViewModeChange("week")}
              className={cn(
                "px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5",
                viewMode === "week"
                  ? "bg-surface-container-high text-primary font-semibold shadow-md border border-white/[0.06]"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Weekly Grid</span>
            </button>

            <button
              type="button"
              onClick={() => onViewModeChange("agenda")}
              className={cn(
                "px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5",
                viewMode === "agenda"
                  ? "bg-surface-container-high text-primary font-semibold shadow-md border border-white/[0.06]"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <List className="w-4 h-4" />
              <span>Agenda</span>
            </button>
          </div>

          {/* Date Navigator */}
          <div className="flex items-center bg-surface-container-low rounded-xl px-1 py-1 border border-white/[0.06]">
            <button
              onClick={onPrevDate}
              aria-label="Previous Period"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onToday}
              className="px-2.5 py-1 rounded-lg hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-1.5 transition-all"
            >
              <CalendarIcon className="w-4 h-4 text-secondary" />
              <span>{currentDateText}</span>
            </button>
            <button
              onClick={onNextDate}
              aria-label="Next Period"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Sync Button */}
          <button
            onClick={onSyncCalendar}
            className="h-9 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-md text-label-md flex items-center gap-1.5 border border-white/[0.06] transition-all"
            title="Sync to Google Calendar / iCal"
          >
            <RefreshCw className="w-4 h-4 text-secondary" />
            <span className="hidden sm:inline">Sync Calendar</span>
          </button>

          {/* Primary Add Class Action */}
          <button
            onClick={onOpenAddModal}
            className="h-9 px-3.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(128,131,255,0.35)] hover:shadow-[0_0_26px_rgba(128,131,255,0.55)] transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Class</span>
            <kbd className="px-1.5 py-0.2 rounded bg-on-primary/20 text-on-primary font-mono-code text-[10px] hidden xs:inline">
              C
            </kbd>
          </button>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="flex flex-wrap items-center justify-between gap-space-xs pt-1 border-t border-white/[0.04]">
        <div className="flex flex-wrap items-center gap-1.5">
          {subjects.map((subj) => {
            const isSelected = selectedSubject === subj.code;
            return (
              <button
                key={subj.code}
                onClick={() => onSelectSubject(subj.code)}
                className={cn(
                  "px-3 py-1 rounded-full font-label-sm text-label-sm transition-all flex items-center gap-1.5",
                  isSelected
                    ? "bg-primary/20 text-primary font-semibold border border-primary/30"
                    : "bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-white/[0.04]"
                )}
              >
                <span className={cn("w-2 h-2 rounded-full", subj.color)} />
                <span>{subj.label}</span>
              </button>
            );
          })}

          <button
            onClick={onToggleOnlyLabs}
            className={cn(
              "px-2.5 py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1 transition-all",
              onlyLabs
                ? "bg-tertiary-container/30 text-tertiary border border-tertiary/30 font-semibold"
                : "bg-surface-container-low hover:bg-surface-container-high text-outline hover:text-on-surface border border-white/[0.04]"
            )}
          >
            <FlaskConical className="w-3.5 h-3.5 text-tertiary" />
            <span>Only Labs</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-on-surface-variant font-mono-code text-mono-code text-xs">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-tertiary" /> 18 Credit Units
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-secondary" /> 16 Contact Hrs/Wk
          </span>
          <span>•</span>
          <span className="text-tertiary flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 0 Conflicts
          </span>
        </div>
      </div>
    </div>
  );
}
