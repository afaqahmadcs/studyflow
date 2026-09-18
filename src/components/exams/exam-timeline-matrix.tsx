"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import { ExamItem } from "@/types/exam";
import { cn } from "@/lib/utils";

interface ExamTimelineMatrixProps {
  exams: ExamItem[];
  onSelectExam: (exam: ExamItem) => void;
}

export function ExamTimelineMatrix({
  exams,
  onSelectExam,
}: ExamTimelineMatrixProps) {
  const [currentMonth, setCurrentMonth] = useState("Oct - Nov 2025");

  return (
    <div className="flex flex-col gap-space-md">
      {/* 1. Timeline Matrix Calendar */}
      <div className="p-space-md rounded-xl bg-surface-container-low border border-white/[0.04] shadow-sm flex flex-col gap-space-sm">
        <div className="flex items-center justify-between pb-space-xs">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-secondary" />
            <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
              Timeline Matrix
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentMonth("Sep - Oct 2025")}
              className="p-1 rounded hover:bg-surface-container text-on-surface-variant transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono-code text-mono-code font-semibold text-on-surface text-[12px]">
              {currentMonth}
            </span>
            <button
              onClick={() => setCurrentMonth("Nov - Dec 2025")}
              className="p-1 rounded hover:bg-surface-container text-on-surface-variant transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Day Header */}
        <div className="grid grid-cols-7 gap-1 text-center font-label-sm text-label-sm text-outline py-1">
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
          <span>S</span>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 text-center font-mono-code text-[12px]">
          <span className="p-2 text-outline/30">20</span>
          <span className="p-2 text-outline/30">21</span>
          <span className="p-2 text-outline/30">22</span>
          <span className="p-2 text-outline/30">23</span>
          <span className="p-2 text-outline/30">24</span>
          <span className="p-2 text-outline/30">25</span>
          <span className="p-2 text-outline/30">26</span>

          <span className="p-2 rounded bg-surface-container text-on-surface font-bold">
            27
          </span>
          <span className="p-2 rounded hover:bg-surface-container text-on-surface cursor-pointer">
            28
          </span>
          <span className="p-2 rounded hover:bg-surface-container text-on-surface cursor-pointer">
            29
          </span>
          <span className="p-2 rounded hover:bg-surface-container text-on-surface cursor-pointer">
            30
          </span>

          {/* Oct 31 - Critical Exam */}
          <button
            onClick={() => {
              const e = exams.find((x) => x.code === "CS401");
              if (e) onSelectExam(e);
            }}
            className="p-2 rounded bg-error/20 text-error font-bold relative flex items-center justify-center cursor-pointer hover:bg-error/30 transition-colors"
          >
            31
            <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-error" />
          </button>

          <span className="p-2 text-on-surface-variant">01</span>
          <span className="p-2 text-on-surface-variant">02</span>
          <span className="p-2 text-on-surface-variant">03</span>
          <span className="p-2 text-on-surface-variant">04</span>
          <span className="p-2 text-on-surface-variant">05</span>

          {/* Nov 06 - Upcoming CS450 */}
          <button
            onClick={() => {
              const e = exams.find((x) => x.code === "CS450");
              if (e) onSelectExam(e);
            }}
            className="p-2 rounded bg-secondary/20 text-secondary font-bold relative flex items-center justify-center cursor-pointer hover:bg-secondary/30 transition-colors"
          >
            06
            <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-secondary" />
          </button>

          <span className="p-2 text-on-surface-variant">07</span>
          <span className="p-2 text-on-surface-variant">08</span>
          <span className="p-2 text-on-surface-variant">09</span>
          <span className="p-2 text-on-surface-variant">10</span>
          <span className="p-2 text-on-surface-variant">11</span>
          <span className="p-2 text-on-surface-variant">12</span>
          <span className="p-2 text-on-surface-variant">13</span>
          <span className="p-2 text-on-surface-variant">14</span>
          <span className="p-2 text-on-surface-variant">15</span>
          <span className="p-2 text-on-surface-variant">16</span>
          <span className="p-2 text-on-surface-variant">17</span>

          {/* Nov 18 - MATH310 */}
          <button
            onClick={() => {
              const e = exams.find((x) => x.code === "MATH310");
              if (e) onSelectExam(e);
            }}
            className="p-2 rounded bg-primary/20 text-primary font-bold relative flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors"
          >
            18
            <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
          </button>

          <span className="p-2 text-on-surface-variant">19</span>
          <span className="p-2 text-on-surface-variant">20</span>
          <span className="p-2 text-outline/30">21</span>
          <span className="p-2 text-outline/30">22</span>
          <span className="p-2 text-outline/30">23</span>
        </div>

        {/* Mini Upcoming Feed */}
        <div className="flex flex-col gap-2 pt-space-xs mt-space-xs bg-surface-container-lowest/50 p-2.5 rounded-lg">
          {exams.slice(0, 3).map((e) => (
            <div
              key={e.id}
              onClick={() => onSelectExam(e)}
              className="flex items-center justify-between text-body-sm cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="flex items-center gap-2 text-on-surface truncate">
                <span
                  className={cn(
                    "w-2 h-2 rounded-full flex-shrink-0",
                    e.status === "critical"
                      ? "bg-error"
                      : e.status === "upcoming"
                      ? "bg-secondary"
                      : "bg-primary"
                  )}
                />
                <span className="font-medium truncate">
                  {e.examDate.slice(5)} {e.code}
                </span>
              </span>
              <span className="font-mono-code text-on-surface-variant text-[11px] whitespace-nowrap">
                {e.startTime}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Course Weight Risk Matrix */}
      <div className="p-space-md rounded-xl bg-surface-container-low border border-white/[0.04] shadow-sm flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
            Course Weight Risk Matrix
          </span>
          <Info className="w-4 h-4 text-outline" />
        </div>

        <div className="flex flex-col gap-3 pt-1">
          {exams.map((e) => {
            const barColor =
              e.status === "critical"
                ? "bg-error"
                : e.code === "MATH310"
                ? "bg-primary"
                : e.code === "CS320"
                ? "bg-secondary"
                : "bg-surface-variant";

            const weightTextColor =
              e.status === "critical"
                ? "text-error"
                : e.code === "MATH310"
                ? "text-primary"
                : e.code === "CS320"
                ? "text-secondary"
                : "text-on-surface-variant";

            return (
              <div key={e.id}>
                <div className="flex justify-between text-label-sm font-label-sm mb-1">
                  <span className="text-on-surface font-medium truncate">
                    {e.code} {e.subjectName}
                  </span>
                  <span
                    className={cn(
                      "font-mono-code font-semibold ml-2 whitespace-nowrap",
                      weightTextColor
                    )}
                  >
                    {e.weightPercentage}% Grade Weight
                  </span>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden flex">
                  <div
                    className={cn("h-full rounded-full transition-all duration-500", barColor)}
                    style={{ width: `${e.weightPercentage * 2.5}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
