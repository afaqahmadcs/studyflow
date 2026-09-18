"use client";

import React from "react";
import {
  Database,
  Calendar,
  FileEdit,
  Terminal,
  BookOpen,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface LiveSessionStripProps {
  onOpenNotes?: () => void;
  onOpenBench?: () => void;
}

export function LiveSessionStrip({
  onOpenNotes,
  onOpenBench,
}: LiveSessionStripProps) {
  const { toast } = useToast();

  const handleNotes = () => {
    if (onOpenNotes) {
      onOpenNotes();
    } else {
      toast({
        title: "CS320 Live Notes",
        description: "Opened active note session for Database Engineering Lab.",
        type: "info",
      });
    }
  };

  const handleBench = () => {
    if (onOpenBench) {
      onOpenBench();
    } else {
      toast({
        title: "B-Tree Benchmark Active",
        description: "Workstation #14 telemetry connected to campus cluster.",
        type: "success",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-sm mb-6">
      {/* Live Session Banner */}
      <div className="lg:col-span-8 p-space-sm rounded-2xl bg-surface-container-low border border-white/[0.06] shadow-lg flex flex-wrap items-center justify-between gap-space-sm relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-space-sm min-w-0">
          <div className="relative flex-shrink-0 w-11 h-11 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary border border-secondary/20">
            <Database className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-tertiary border-2 border-surface-container-low animate-pulse" />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary font-mono-code text-[11px] font-medium flex items-center gap-1 border border-tertiary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping" />
                IN SESSION
              </span>
              <span className="font-mono-code text-mono-code text-secondary font-medium">
                CS320 • Lab C (Room 204)
              </span>
              <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface-variant font-mono-code text-[11px] border border-white/[0.06]">
                24m remaining
              </span>
            </div>

            <p className="font-headline-sm text-headline-sm font-semibold text-on-surface truncate mt-0.5">
              Database Engineering &amp; Index Internals Lab
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleNotes}
            className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md flex items-center gap-1.5 border border-white/[0.06] transition-all"
          >
            <FileEdit className="w-4 h-4 text-primary" />
            <span>Live Notes</span>
          </button>

          <button
            onClick={handleBench}
            className="px-3 py-1.5 rounded-lg bg-secondary/15 hover:bg-secondary/25 text-secondary font-label-md text-label-md flex items-center gap-1.5 border border-secondary/20 transition-all"
          >
            <Terminal className="w-4 h-4" />
            <span>Open Bench</span>
          </button>
        </div>
      </div>

      {/* Next Up Strip */}
      <div className="lg:col-span-4 p-space-sm rounded-2xl bg-surface-container-low border border-white/[0.06] shadow-lg flex items-center justify-between gap-space-sm relative overflow-hidden">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 border border-primary/20">
            <Calendar className="w-5 h-5" />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-label-sm text-label-sm uppercase font-semibold text-outline">
                Next at 02:00 PM
              </span>
              <span className="text-on-surface-variant font-mono-code text-[11px]">
                • 1h 36m
              </span>
            </div>
            <span className="font-headline-sm text-headline-sm font-semibold text-on-surface truncate">
              CS450 Kernel Arch
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
              Turing Memorial Hall • Prof. Vance
            </span>
          </div>
        </div>

        <button
          onClick={() =>
            toast({
              title: "CS450 Syllabus Loaded",
              description: "Turing Memorial Hall • Lecture slides: Virtual Memory & Page Tables.",
              type: "info",
            })
          }
          className="p-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-all flex-shrink-0 border border-white/[0.06]"
          title="View Syllabus"
        >
          <BookOpen className="w-[18px] h-[18px]" />
        </button>
      </div>
    </div>
  );
}
