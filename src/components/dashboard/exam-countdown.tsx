"use client";

import React, { useState, useEffect } from "react";
import { CalendarCheck, BookOpen } from "lucide-react";
import { FEATURED_EXAM, SECONDARY_EXAM } from "@/data/student-data";
import { useToast } from "@/components/ui/toast";

interface ExamCountdownProps {
  onOpenRevisionNotes?: () => void;
}

export function ExamCountdown({ onOpenRevisionNotes }: ExamCountdownProps) {
  const { toast } = useToast();
  // Live dynamic second counter for immersive telemetry feel
  const [seconds, setSeconds] = useState(18);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 59));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenNotes = () => {
    if (onOpenRevisionNotes) {
      onOpenRevisionNotes();
    } else {
      toast({
        title: "CS401 Revision Notes",
        description: "Opening Distributed Systems Cheatsheet (Raft, Paxos, Vector Clocks).",
        type: "success",
      });
    }
  };

  return (
    <div className="bg-surface-container-low/90 backdrop-blur-md rounded-xl p-space-md shadow-sm border border-white/[0.06] relative overflow-hidden space-y-space-md">
      {/* Top glowing accent bar indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-tertiary" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-error-container/20 text-error">
            <CalendarCheck className="w-[20px] h-[20px]" />
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Target Exam Countdown
          </h3>
        </div>

        <span className="px-2 py-0.5 rounded bg-error-container/30 text-error font-mono-code text-[11px] font-semibold uppercase tracking-wider border border-error/20">
          Midterm
        </span>
      </div>

      {/* Featured Exam Card */}
      <div className="p-space-md rounded-xl bg-surface-container-high/70 space-y-3 border border-white/[0.06]">
        <div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="px-2 py-0.5 rounded bg-primary-container/30 text-primary font-mono-code text-mono-code border border-primary/20">
              {FEATURED_EXAM.courseCode} • {FEATURED_EXAM.credits} Credits
            </span>
            <span className="font-mono-code text-mono-code text-on-surface-variant text-xs">
              {FEATURED_EXAM.dateText}
            </span>
          </div>

          <h4 className="font-headline-lg text-headline-lg text-on-surface mt-2 font-bold tracking-tight">
            {FEATURED_EXAM.title}
          </h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            {FEATURED_EXAM.description}
          </p>
        </div>

        {/* Countdown Timer Pills */}
        <div className="grid grid-cols-4 gap-2 py-1">
          <div className="p-2.5 rounded-lg bg-surface-container text-center border border-white/[0.04]">
            <span className="font-mono-timer text-mono-timer text-primary font-bold">
              0{FEATURED_EXAM.days}
            </span>
            <span className="block font-label-sm text-label-sm text-on-surface-variant uppercase text-[10px]">
              Days
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container text-center border border-white/[0.04]">
            <span className="font-mono-timer text-mono-timer text-primary font-bold">
              {FEATURED_EXAM.hours}
            </span>
            <span className="block font-label-sm text-label-sm text-on-surface-variant uppercase text-[10px]">
              Hours
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container text-center border border-white/[0.04]">
            <span className="font-mono-timer text-mono-timer text-secondary font-bold">
              {FEATURED_EXAM.minutes}
            </span>
            <span className="block font-label-sm text-label-sm text-on-surface-variant uppercase text-[10px]">
              Mins
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container text-center border border-white/[0.04]">
            <span className="font-mono-timer text-mono-timer text-tertiary font-bold">
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
            <span className="block font-label-sm text-label-sm text-on-surface-variant uppercase text-[10px]">
              Secs
            </span>
          </div>
        </div>

        {/* Preparedness Index Breakdown */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between font-label-sm text-label-sm">
            <span className="text-on-surface font-medium">Preparedness Index</span>
            <span className="font-mono-code text-mono-code text-tertiary font-semibold">
              {FEATURED_EXAM.preparednessText}
            </span>
          </div>

          <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-secondary to-tertiary h-2 rounded-full transition-all duration-700"
              style={{ width: `${FEATURED_EXAM.preparednessPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono-code text-on-surface-variant pt-0.5 flex-wrap gap-1">
            <span>{FEATURED_EXAM.modulesReviewed}</span>
            <span>{FEATURED_EXAM.mockExamsStat}</span>
          </div>
        </div>

        {/* Revision Notes Trigger */}
        <button
          onClick={handleOpenNotes}
          className="w-full py-2 px-3 rounded-lg bg-primary hover:bg-primary-fixed-dim text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
        >
          <BookOpen className="w-[18px] h-[18px]" />
          <span>Open Revision Notes &amp; Cheatsheet</span>
        </button>
      </div>

      {/* Secondary Exam Item */}
      <div className="p-space-sm rounded-lg bg-surface-container/50 hover:bg-surface-container transition-all flex items-center justify-between border border-white/[0.04]">
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-mono-code text-on-surface font-medium">
              {SECONDARY_EXAM.courseCode}: {SECONDARY_EXAM.title}
            </span>
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              {SECONDARY_EXAM.dateText}
            </span>
          </div>
          <p className="text-label-sm font-label-sm text-on-surface-variant truncate">
            {SECONDARY_EXAM.topics}
          </p>
        </div>

        <div className="text-right flex-shrink-0">
          <span className="font-mono-code text-mono-code text-primary font-semibold">
            {SECONDARY_EXAM.readyPercent}% Ready
          </span>
          <span className="block font-label-sm text-label-sm text-outline">
            {SECONDARY_EXAM.status}
          </span>
        </div>
      </div>
    </div>
  );
}
