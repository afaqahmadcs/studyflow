"use client";

import React from "react";
import {
  Clock,
  Paperclip,
  Check,
  Radio,
} from "lucide-react";
import { SCHEDULE_ITEMS } from "@/data/student-data";
import { useToast } from "@/components/ui/toast";

interface ScheduleTimelineProps {
  onOpenScratchpad?: () => void;
  onOpenNotes?: () => void;
}

export function ScheduleTimeline({
  onOpenScratchpad,
  onOpenNotes,
}: ScheduleTimelineProps) {
  const { toast } = useToast();

  const handleAction = (itemTitle: string, actionName: string) => {
    if (actionName === "Open Scratchpad" && onOpenScratchpad) {
      onOpenScratchpad();
    } else if (actionName === "Pre-read Notes" && onOpenNotes) {
      onOpenNotes();
    } else {
      toast({
        title: actionName,
        description: `Triggered action for ${itemTitle}`,
        type: "info",
      });
    }
  };

  return (
    <div className="bg-surface-container-low/90 backdrop-blur-md rounded-xl p-space-md shadow-sm border border-white/[0.06]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-sm gap-2">
        <div className="flex items-center gap-space-sm">
          <div className="p-1.5 rounded-lg bg-primary-container/20 text-primary">
            <Clock className="w-[20px] h-[20px]" />
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Timeline • Monday
            </h3>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Current Week 8 Class Protocol
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-mono-code text-mono-code border border-white/[0.06]">
            Mon, Oct 27
          </span>
          <button
            onClick={() =>
              toast({
                title: "Schedule Synchronized",
                description: "Live timetable feed updated with campus server.",
                type: "success",
              })
            }
            className="px-2 py-1 rounded bg-primary-container/20 text-primary hover:bg-primary-container/30 transition-all font-label-sm text-label-sm flex items-center gap-1 border border-primary/20"
          >
            <Radio className="w-3 h-3 text-primary animate-pulse" />
            <span>Live Sync</span>
          </button>
        </div>
      </div>

      {/* Connected Timeline Rail */}
      <div className="relative pl-6 space-y-4 pt-space-sm before:content-[''] before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-surface-container-highest">
        {SCHEDULE_ITEMS.map((item) => {
          return (
            <div key={item.id} className="relative group">
              {/* Timeline Node */}
              <div className="absolute -left-[27px] top-1.5 w-4 h-4 rounded-full bg-surface-container-lowest flex items-center justify-center border border-white/[0.08]">
                {item.status === "attended" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-tertiary" />
                )}
                {item.status === "active" && (
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                )}
                {item.status === "upcoming" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-outline" />
                )}
                {item.status === "later" && (
                  <div className="w-2 h-2 rounded-full bg-outline-variant" />
                )}
              </div>

              {/* Event Card */}
              <div
                className={`p-space-sm rounded-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-2 border border-white/[0.04] ${
                  item.status === "active"
                    ? "bg-surface-container-high/80 shadow-md border-primary/25"
                    : item.status === "later"
                    ? "bg-surface-container/30 hover:bg-surface-container opacity-80"
                    : "bg-surface-container/50 hover:bg-surface-container"
                }`}
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`font-mono-code text-mono-code ${
                        item.status === "active"
                          ? "text-primary font-semibold"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {item.time}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded font-mono-code text-[11px] ${
                        item.status === "active"
                          ? "bg-primary-container text-on-primary font-medium"
                          : "bg-surface-container-high text-on-surface"
                      }`}
                    >
                      {item.courseCode}
                    </span>
                    {item.status === "active" && (
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-mono-code text-[10px] animate-pulse border border-secondary/20">
                        {item.statusText}
                      </span>
                    )}
                    {item.status === "upcoming" && (
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {item.statusText}
                      </span>
                    )}
                  </div>

                  <div className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
                    {item.courseName}
                  </div>

                  <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2 flex-wrap">
                    <span>{item.location}</span>
                    {item.instructor && (
                      <>
                        <span>•</span>
                        <span>{item.instructor}</span>
                      </>
                    )}
                    {item.extraInfo && (
                      <>
                        <span>•</span>
                        <span className="text-secondary font-medium">
                          {item.extraInfo}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Action slot */}
                <div className="flex items-center gap-2 self-start md:self-center flex-shrink-0">
                  {item.status === "attended" && (
                    <>
                      <span className="px-2 py-1 rounded bg-tertiary-container/20 text-tertiary font-label-sm text-label-sm font-medium flex items-center gap-1 border border-tertiary/20">
                        <Check className="w-3.5 h-3.5" /> Attended
                      </span>
                      <button
                        onClick={() =>
                          toast({
                            title: "Slide Sync Ready",
                            description: "Downloaded CS401 Lecture 8 slides to offline storage.",
                            type: "info",
                          })
                        }
                        className="p-1.5 rounded hover:bg-surface-container-high text-on-surface-variant transition-colors"
                        title="View Lecture Slide Sync"
                      >
                        <Paperclip className="w-[18px] h-[18px]" />
                      </button>
                    </>
                  )}

                  {item.status === "active" && item.actionText && (
                    <button
                      onClick={() => handleAction(item.courseName, item.actionText!)}
                      className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-fixed-dim text-on-primary font-label-md text-label-md font-semibold transition-all shadow-sm active:scale-95"
                    >
                      {item.actionText}
                    </button>
                  )}

                  {item.status === "upcoming" && item.actionText && (
                    <button
                      onClick={() => handleAction(item.courseName, item.actionText!)}
                      className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface hover:bg-surface-variant font-label-sm text-label-sm transition-all border border-white/[0.06] active:scale-95"
                    >
                      {item.actionText}
                    </button>
                  )}

                  {item.status === "later" && (
                    <span className="text-label-sm font-label-sm text-on-surface-variant">
                      {item.statusText}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
