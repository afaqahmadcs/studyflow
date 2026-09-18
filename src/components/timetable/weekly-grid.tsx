"use client";

import React from "react";
import { ClassItem, DayOfWeek } from "@/types/timetable";
import { MapPin, User, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeeklyGridProps {
  classes: ClassItem[];
  onSelectClass: (classItem: ClassItem) => void;
  selectedSubject: string;
  onlyLabs: boolean;
}

const DAYS: { key: DayOfWeek; name: string; date: string; isToday?: boolean }[] = [
  { key: "Monday", name: "Monday", date: "Oct 27", isToday: true },
  { key: "Tuesday", name: "Tuesday", date: "Oct 28" },
  { key: "Wednesday", name: "Wednesday", date: "Oct 29" },
  { key: "Thursday", name: "Thursday", date: "Oct 30" },
  { key: "Friday", name: "Friday", date: "Oct 31" },
];

const TIME_HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export function WeeklyGrid({
  classes,
  onSelectClass,
  selectedSubject,
  onlyLabs,
}: WeeklyGridProps) {
  // Filter classes based on selected subject and onlyLabs
  const filteredClasses = classes.filter((c) => {
    if (selectedSubject !== "ALL" && c.subjectCode !== selectedSubject) return false;
    if (onlyLabs && c.type !== "lab") return false;
    return true;
  });

  return (
    <div className="w-full rounded-2xl bg-surface-container-low border border-white/[0.06] shadow-xl overflow-hidden relative">
      {/* Weekdays Header Row */}
      <div className="grid grid-cols-[68px_repeat(5,1fr)] bg-surface-container sticky top-0 z-20 shadow-sm border-b border-white/[0.06]">
        <div className="p-3 text-center font-mono-code text-mono-code text-outline uppercase tracking-wider flex items-center justify-center text-xs">
          GMT-4
        </div>

        {DAYS.map((d) => {
          const dayClasses = filteredClasses.filter((c) => c.day === d.key);
          return (
            <div
              key={d.key}
              className={cn(
                "p-2.5 px-3 relative flex items-center justify-between border-l border-white/[0.04]",
                d.isToday && "bg-surface-container-high"
              )}
            >
              <div className="flex items-center gap-2">
                {d.isToday && (
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      {d.name}
                    </span>
                    {d.isToday && (
                      <span className="px-1.5 py-0.2 rounded bg-primary text-on-primary font-mono-code text-[10px] font-bold uppercase tracking-tight">
                        Today
                      </span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "font-mono-code text-mono-code text-xs",
                      d.isToday ? "text-primary" : "text-outline"
                    )}
                  >
                    {d.date}
                  </span>
                </div>
              </div>

              <span className="font-mono-code text-[11px] text-on-surface-variant hidden sm:inline">
                {dayClasses.length} {dayClasses.length === 1 ? "Class" : "Classes"}
              </span>

              {d.isToday && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </div>
          );
        })}
      </div>

      {/* Scrollable Timetable Canvas */}
      <div className="relative overflow-x-auto min-w-[700px] select-none">
        {/* Laser Line Indicating Current Time (e.g. 12:06 PM) */}
        <div className="absolute top-[324px] left-[68px] right-0 z-30 pointer-events-none flex items-center">
          <div className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono-code text-[10px] font-bold shadow-[0_0_12px_#03b5d3] -ml-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            12:06 PM
          </div>
          <div className="h-[2px] w-full bg-gradient-to-r from-secondary via-secondary-container to-transparent shadow-[0_0_8px_#4cd7f6]" />
        </div>

        {/* 10-Hour Rows Grid */}
        <div className="divide-y divide-white/[0.04]">
          {TIME_HOURS.map((hourStr, hourIdx) => {
            const currentHourNum = parseInt(hourStr.split(":")[0]);

            return (
              <div
                key={hourStr}
                className="grid grid-cols-[68px_repeat(5,1fr)] min-h-[72px]"
              >
                {/* Time Column */}
                <div className="p-2 font-mono-code text-mono-code text-outline text-right pr-3 bg-surface-container-lowest/50 text-xs flex items-start justify-end">
                  {hourStr}
                </div>

                {/* 5 Day Columns for this hour */}
                {DAYS.map((d) => {
                  // Find classes for this day that start in this hour
                  const classesStartingHere = filteredClasses.filter((c) => {
                    if (c.day !== d.key) return false;
                    const cStartHour = parseInt(c.startTime.split(":")[0]);
                    return cStartHour === currentHourNum;
                  });

                  return (
                    <div
                      key={d.key}
                      className={cn(
                        "p-1 border-l border-white/[0.04] transition-colors relative min-h-[72px]",
                        d.isToday
                          ? "bg-surface-container-high/10 hover:bg-surface-container-high/30"
                          : "hover:bg-surface-container/20"
                      )}
                    >
                      {classesStartingHere.map((item) => {
                        const isPrimary = item.colorTag === "primary";
                        const isSecondary = item.colorTag === "secondary";
                        const isTertiary = item.colorTag === "tertiary";

                        return (
                          <div
                            key={item.id}
                            onClick={() => onSelectClass(item)}
                            className={cn(
                              "w-full rounded-xl p-2.5 shadow-md flex flex-col justify-between cursor-pointer transition-all duration-150 group border active:scale-[0.99] mb-1",
                              item.status === "in_session"
                                ? "bg-surface-container-high border-secondary/40 shadow-[0_0_16px_rgba(76,215,246,0.15)] ring-1 ring-secondary/30"
                                : "bg-surface-container/85 hover:bg-surface-container-high border-white/[0.06]"
                            )}
                            style={{
                              minHeight: item.durationMinutes > 60 ? "105px" : "64px",
                            }}
                          >
                            <div>
                              <div className="flex items-start justify-between gap-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span
                                    className={cn(
                                      "px-1.5 py-0.5 rounded font-mono-code text-[10px] font-bold",
                                      isPrimary && "bg-primary/20 text-primary",
                                      isSecondary && "bg-secondary/20 text-secondary",
                                      isTertiary && "bg-tertiary/20 text-tertiary",
                                      !isPrimary && !isSecondary && !isTertiary && "bg-surface-container-highest text-on-surface"
                                    )}
                                  >
                                    {item.subjectCode}
                                  </span>

                                  {item.status === "attended" && (
                                    <span className="font-mono-code text-[10px] text-tertiary flex items-center gap-0.5">
                                      <CheckCircle2 className="w-3 h-3" /> Attended
                                    </span>
                                  )}

                                  {item.status === "in_session" && (
                                    <span className="font-mono-code text-[10px] text-secondary flex items-center gap-1 animate-pulse">
                                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Active
                                    </span>
                                  )}
                                </div>

                                <span className="font-mono-code text-[10px] text-outline flex-shrink-0">
                                  {item.durationMinutes}m
                                </span>
                              </div>

                              <p className="font-headline-sm text-[12px] leading-tight font-semibold text-on-surface mt-1 truncate group-hover:text-primary transition-colors">
                                {item.subjectName}
                              </p>

                              <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-[11px] mt-1">
                                <MapPin className="w-3 h-3 text-outline flex-shrink-0" />
                                <span className="truncate">{item.room}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-1.5 text-[11px] text-on-surface-variant border-t border-white/[0.04] mt-1">
                              <div className="flex items-center gap-1 truncate">
                                <User className="w-3 h-3 text-outline flex-shrink-0" />
                                <span className="truncate">{item.teacher}</span>
                              </div>

                              <div className="flex items-center gap-1 font-mono-code text-[10px] text-outline flex-shrink-0">
                                <Clock className="w-3 h-3" />
                                <span>{item.startTime}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
