"use client";

import React, { useState } from "react";
import {
  Download,
  FileText,
  SlidersHorizontal,
  RefreshCw,
  Sparkles,
  ChevronDown,
  Check,
} from "lucide-react";
import { AnalyticsScope } from "@/types/analytics";

interface AnalyticsHeaderProps {
  currentScope: AnalyticsScope;
  onScopeChange: (scope: AnalyticsScope) => void;
  selectedCourse: string;
  onCourseChange: (course: string) => void;
  onExportCsv: () => void;
  onPrintReport: () => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

const COURSES = [
  { code: "ALL", name: "All Courses" },
  { code: "CS401", name: "CS401 Distributed Systems" },
  { code: "CS450", name: "CS450 Operating Systems" },
  { code: "CS320", name: "CS320 Database Internals" },
  { code: "MATH310", name: "MATH310 Linear Algebra" },
];

export function AnalyticsHeader({
  currentScope,
  onScopeChange,
  selectedCourse,
  onCourseChange,
  onExportCsv,
  onPrintReport,
  onRefresh,
  isRefreshing,
}: AnalyticsHeaderProps) {
  const [courseMenuOpen, setCourseMenuOpen] = useState(false);

  return (
    <section className="relative flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-xs">
      <div className="space-y-1">
        <div className="flex items-center gap-space-xs flex-wrap">
          <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary font-mono-code text-[11px] uppercase font-medium border border-primary/20">
            Telemetry Hub
          </span>
          <span className="text-outline text-body-sm">•</span>
          <span className="text-tertiary font-mono-code text-[11px] flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            Live Syncing
          </span>
          <span className="text-outline text-body-sm">•</span>
          <span className="text-outline font-mono-code text-[11px]">
            Spring Term 2025 • Week 8
          </span>
        </div>

        <h1 className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight">
          Academic Analytics &amp; Cognitive Performance
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          Longitudinal telemetry, grade projections, and study velocity synthesized from live session logs, coursework, and evaluations.
        </p>
      </div>

      {/* Scope, Filter, & Export Actions */}
      <div className="flex flex-wrap items-center gap-space-sm self-start md:self-auto">
        {/* Date Scope Pills */}
        <div className="flex items-center p-1 rounded-lg bg-surface-container-low border border-white/[0.04]">
          <button
            onClick={() => onScopeChange("week")}
            className={`px-space-sm py-1 rounded text-label-md font-label-md transition-all ${
              currentScope === "week"
                ? "bg-surface-container-highest text-primary font-semibold shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => onScopeChange("month")}
            className={`px-space-sm py-1 rounded text-label-md font-label-md transition-all ${
              currentScope === "month"
                ? "bg-surface-container-highest text-primary font-semibold shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => onScopeChange("semester")}
            className={`px-space-sm py-1 rounded-md text-label-md font-label-md transition-all ${
              currentScope === "semester"
                ? "bg-surface-container-highest text-primary font-semibold shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Full Semester
          </button>
        </div>

        {/* Course Dropdown */}
        <div className="relative">
          <button
            onClick={() => setCourseMenuOpen(!courseMenuOpen)}
            className="flex items-center gap-2 px-space-sm py-1.5 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-all text-label-md font-label-md border border-white/[0.04]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-outline" />
            <span className="truncate max-w-[120px]">
              {COURSES.find((c) => c.code === selectedCourse)?.name || "All Courses"}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-on-surface-variant ml-0.5" />
          </button>

          {courseMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setCourseMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-56 rounded-xl bg-surface-container-high border border-white/[0.08] shadow-2xl p-1 z-30 space-y-0.5">
                {COURSES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      onCourseChange(c.code);
                      setCourseMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-body-sm transition-colors ${
                      selectedCourse === c.code
                        ? "bg-primary/15 text-primary font-semibold"
                        : "text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    <span>{c.name}</span>
                    {selectedCourse === c.code && <Check className="w-4 h-4 text-primary" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Refresh button */}
        <button
          onClick={onRefresh}
          title="Recalculate telemetry from live storage"
          className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-all border border-white/[0.04]"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-primary" : ""}`} />
        </button>

        {/* Export Triggers */}
        <div className="flex items-center gap-1">
          <button
            onClick={onExportCsv}
            className="flex items-center gap-1.5 px-space-sm py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface transition-all text-label-md font-label-md border border-white/[0.06]"
          >
            <Download className="w-3.5 h-3.5 text-primary" />
            <span>CSV</span>
          </button>
          <button
            onClick={onPrintReport}
            className="flex items-center gap-1.5 px-space-sm py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface transition-all text-label-md font-label-md border border-white/[0.06]"
          >
            <FileText className="w-3.5 h-3.5 text-secondary" />
            <span>PDF Report</span>
          </button>
        </div>
      </div>
    </section>
  );
}
