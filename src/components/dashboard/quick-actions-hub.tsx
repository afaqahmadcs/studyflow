"use client";

import React from "react";
import {
  Zap,
  ClipboardPlus,
  CalendarPlus,
  Timer,
  CheckCircle2,
  FileEdit,
  Sliders,
  ArrowRight,
} from "lucide-react";

interface QuickActionsHubProps {
  onActionClick: (actionType: "assignment" | "exam" | "study" | "attendance" | "note" | "syllabus") => void;
}

export function QuickActionsHub({ onActionClick }: QuickActionsHubProps) {
  return (
    <div className="bg-surface-container-low/90 backdrop-blur-md rounded-xl p-space-md shadow-sm border border-white/[0.06] flex flex-col justify-between h-full">
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <Zap className="w-[20px] h-[20px] text-primary" />
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Precision Actions
          </h2>
        </div>
        <span className="font-mono-code text-mono-code text-on-surface-variant">
          Global Hotkeys active
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-space-sm">
        {/* Action 1: Assignment */}
        <button
          onClick={() => onActionClick("assignment")}
          className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:opacity-95 transition-all shadow-sm active:scale-95 group"
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <ClipboardPlus className="w-[18px] h-[18px] flex-shrink-0" />
            <span className="truncate font-semibold">Assignment</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-on-primary/20 text-on-primary font-mono-code text-[10px] ml-1">
            A
          </kbd>
        </button>

        {/* Action 2: Add Exam */}
        <button
          onClick={() => onActionClick("exam")}
          className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md border border-white/[0.06] transition-all active:scale-95 group"
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <CalendarPlus className="w-[18px] h-[18px] text-error flex-shrink-0" />
            <span className="truncate">Add Exam</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-surface-container-lowest text-on-surface-variant font-mono-code text-[10px] border border-white/[0.06] ml-1">
            E
          </kbd>
        </button>

        {/* Action 3: Deep Study */}
        <button
          onClick={() => onActionClick("study")}
          className="col-span-2 sm:col-span-1 flex items-center justify-between px-3 py-2.5 rounded-lg bg-secondary-container text-on-secondary-container font-label-md text-label-md hover:brightness-110 transition-all active:scale-95 group"
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <Timer className="w-[18px] h-[18px] flex-shrink-0" />
            <span className="truncate font-semibold">Deep Study</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-on-secondary-container animate-ping ml-1" />
        </button>

        {/* Action 4: Attendance */}
        <button
          onClick={() => onActionClick("attendance")}
          className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md border border-white/[0.06] transition-all active:scale-95 group"
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <CheckCircle2 className="w-[18px] h-[18px] text-tertiary flex-shrink-0" />
            <span className="truncate">Attendance</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-surface-container-lowest text-on-surface-variant font-mono-code text-[10px] border border-white/[0.06] ml-1">
            ✓
          </kbd>
        </button>

        {/* Action 5: Quick Note */}
        <button
          onClick={() => onActionClick("note")}
          className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md border border-white/[0.06] transition-all active:scale-95 group"
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <FileEdit className="w-[18px] h-[18px] text-outline flex-shrink-0" />
            <span className="truncate">Quick Note</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-surface-container-lowest text-on-surface-variant font-mono-code text-[10px] border border-white/[0.06] ml-1">
            N
          </kbd>
        </button>

        {/* Action 6: Syllabus */}
        <button
          onClick={() => onActionClick("syllabus")}
          className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface-container hover:bg-surface-variant text-on-surface-variant hover:text-on-surface font-label-md text-label-md border border-white/[0.06] transition-all active:scale-95 group"
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <Sliders className="w-[18px] h-[18px] flex-shrink-0" />
            <span className="truncate">Syllabus</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
