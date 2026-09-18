"use client";

import React from "react";
import { ClassItem, DayOfWeek } from "@/types/timetable";
import { MapPin, User, Clock, CheckCircle2, MoreVertical, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DayViewProps {
  day: DayOfWeek;
  classes: ClassItem[];
  onSelectClass: (c: ClassItem) => void;
  selectedSubject: string;
  onlyLabs: boolean;
}

export function DayView({
  day,
  classes,
  onSelectClass,
  selectedSubject,
  onlyLabs,
}: DayViewProps) {
  const dayClasses = classes
    .filter((c) => {
      if (c.day !== day) return false;
      if (selectedSubject !== "ALL" && c.subjectCode !== selectedSubject) return false;
      if (onlyLabs && c.type !== "lab") return false;
      return true;
    })
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="bg-surface-container-low border border-white/[0.06] rounded-2xl p-space-md shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div>
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            {day} Class Schedule
          </h3>
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            {dayClasses.length} {dayClasses.length === 1 ? "class" : "classes"} scheduled for today
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-primary-container/20 text-primary font-mono-code text-xs font-semibold border border-primary/20">
          Week 8 Protocol
        </span>
      </div>

      {dayClasses.length === 0 ? (
        <div className="py-16 text-center text-on-surface-variant font-body-md">
          No classes scheduled for {day} matching current filters.
        </div>
      ) : (
        <div className="relative pl-6 space-y-4 pt-4 before:content-[''] before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-surface-container-highest">
          {dayClasses.map((item) => {
            const isAttended = item.status === "attended";
            const isInSession = item.status === "in_session";
            const isUpcoming = item.status === "upcoming";

            return (
              <div key={item.id} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[27px] top-2 w-4 h-4 rounded-full bg-surface-container-lowest flex items-center justify-center border border-white/[0.08]">
                  {isAttended && <div className="w-2.5 h-2.5 rounded-full bg-tertiary" />}
                  {isInSession && <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />}
                  {isUpcoming && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  {!isAttended && !isInSession && !isUpcoming && (
                    <div className="w-2 h-2 rounded-full bg-outline" />
                  )}
                </div>

                {/* Class Card */}
                <div
                  onClick={() => onSelectClass(item)}
                  className={cn(
                    "p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4",
                    isInSession
                      ? "bg-surface-container-high border-secondary/40 shadow-lg ring-1 ring-secondary/20"
                      : "bg-surface-container/70 hover:bg-surface-container border-white/[0.06]"
                  )}
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono-code text-mono-code text-primary font-semibold">
                        {item.startTime} - {item.endTime}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-highest font-mono-code text-[11px] text-on-surface font-bold">
                        {item.subjectCode}
                      </span>
                      <span className="px-2 py-0.5 rounded font-mono-code text-[11px] uppercase bg-surface-container text-outline">
                        {item.type}
                      </span>

                      {isAttended && (
                        <span className="px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-label-sm text-xs font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Attended
                        </span>
                      )}

                      {isInSession && (
                        <span className="px-2 py-0.5 rounded-full bg-secondary-container/30 text-secondary font-mono-code text-xs font-semibold flex items-center gap-1 animate-pulse border border-secondary/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Active • 24m remaining
                        </span>
                      )}

                      {isUpcoming && (
                        <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary font-label-sm text-xs font-medium">
                          Upcoming Next
                        </span>
                      )}
                    </div>

                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">
                      {item.subjectName}
                    </h4>

                    <div className="flex items-center gap-3 font-body-sm text-xs text-on-surface-variant flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-outline" />
                        {item.room}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-outline" />
                        {item.teacher}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-mono-code">
                        <Clock className="w-3.5 h-3.5 text-outline" />
                        {item.durationMinutes} minutes
                      </span>
                    </div>

                    {item.notes && (
                      <p className="text-xs text-on-surface-variant font-body-sm pt-1 italic opacity-85">
                        &ldquo;{item.notes}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectClass(item);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md flex items-center gap-1.5 border border-white/[0.06] transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-primary" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
