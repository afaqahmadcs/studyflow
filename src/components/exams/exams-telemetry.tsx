"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Clock, AlertTriangle } from "lucide-react";
import { ExamItem } from "@/types/exam";

interface ExamsTelemetryProps {
  exams: ExamItem[];
  averageReadiness?: number;
}

export function ExamsTelemetry({
  exams,
  averageReadiness = 76.5,
}: ExamsTelemetryProps) {
  // Find next critical or earliest upcoming exam
  const criticalExam =
    exams.find((e) => e.status === "critical") || exams[0];

  // Dynamic real-time countdown timer
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 4, hours: 16, minutes: 42, seconds: 18 });

  useEffect(() => {
    if (!criticalExam) return;

    function calculateRemaining() {
      // Calculate diff to criticalExam.examDate + criticalExam.startTime
      const targetStr = `${criticalExam.examDate}T${criticalExam.startTime}:00`;
      const targetDate = new Date(targetStr).getTime();
      const now = new Date().getTime();
      const diff = targetDate - now;

      // Fallback if target date is in the past relative to local system clock:
      // compute a persistent countdown to Nov 15 2026 or a simulated future anchor
      if (diff <= 0 || isNaN(diff)) {
        // Provide continuous live ticking based on remaining relative offset
        const simulatedDiff =
          (4 * 86400 + 16 * 3600 + 42 * 60 + 18) * 1000 -
          (Date.now() % (10 * 86400 * 1000));
        const safeDiff = Math.max(0, simulatedDiff);
        const totalSec = Math.floor(safeDiff / 1000);
        const d = Math.floor(totalSec / 86400);
        const h = Math.floor((totalSec % 86400) / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      } else {
        const totalSec = Math.floor(diff / 1000);
        const d = Math.floor(totalSec / 86400);
        const h = Math.floor((totalSec % 86400) / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    }

    calculateRemaining();
    const interval = setInterval(calculateRemaining, 1000);
    return () => clearInterval(interval);
  }, [criticalExam]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
      {/* 1. Next Critical Exam */}
      <div className="p-space-md rounded-xl bg-surface-container-low border border-white/[0.04] flex flex-col justify-between relative overflow-hidden shadow-sm">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-error/5 blur-xl pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-error font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-error animate-ping" />
            Next Critical Exam
          </span>
          <span className="font-mono-code text-mono-code text-on-surface-variant px-1.5 py-0.5 rounded bg-surface-container-highest">
            {criticalExam?.code || "CS401"}
          </span>
        </div>
        <div className="my-space-sm">
          <div className="font-headline-lg text-headline-lg text-on-surface font-semibold truncate">
            {criticalExam?.subjectName || "Distributed Systems"}
          </div>
          <div
            id="exam-timer"
            className="font-mono-timer text-mono-timer text-error font-semibold tracking-tight mt-1"
          >
            {pad(timeLeft.days)}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m{" "}
            {pad(timeLeft.seconds)}s
          </div>
        </div>
        <div className="flex items-center justify-between text-body-sm text-on-surface-variant pt-2 bg-surface-container-lowest/40 px-2 py-1.5 rounded">
          <span className="truncate">{criticalExam?.room || "Auditorium 1"}</span>
          <span className="font-mono-code text-primary whitespace-nowrap">
            {criticalExam?.weightPercentage || 30}% Grade Weight
          </span>
        </div>
      </div>

      {/* 2. Average Readiness Index */}
      <div className="p-space-md rounded-xl bg-surface-container-low border border-white/[0.04] flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
            Average Readiness Index
          </span>
          <span className="px-1.5 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-mono-code text-mono-code font-semibold">
            +8.2%
          </span>
        </div>
        <div className="my-space-sm flex items-baseline gap-2">
          <span className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">
            {averageReadiness.toFixed(1)}
            <span className="text-headline-lg font-normal text-on-surface-variant">
              %
            </span>
          </span>
          <span className="text-body-sm text-tertiary flex items-center font-medium">
            <TrendingUp className="w-4 h-4 mr-0.5" /> Strong Pace
          </span>
        </div>
        <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden flex">
          <div
            className="bg-secondary h-full rounded-full transition-all duration-500"
            style={{ width: `${averageReadiness}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-label-sm text-on-surface-variant mt-2">
          <span>Across {exams.length} Active Courses</span>
          <span className="font-mono-code text-on-surface">Target: 85%</span>
        </div>
      </div>

      {/* 3. Revision Velocity */}
      <div className="p-space-md rounded-xl bg-surface-container-low border border-white/[0.04] flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
            Revision Velocity
          </span>
          <Clock className="text-secondary w-5 h-5" />
        </div>
        <div className="my-space-sm flex items-baseline gap-2">
          <span className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">
            34.5
          </span>
          <span className="text-headline-sm text-on-surface-variant font-medium">
            / 50 hrs target
          </span>
        </div>
        <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden flex gap-1">
          <div
            className="bg-primary h-full rounded-full transition-all duration-500"
            style={{ width: "69%" }}
          />
        </div>
        <div className="flex justify-between items-center text-label-sm text-on-surface-variant mt-2">
          <span className="text-primary font-mono-code">69% sprint elapsed</span>
          <span>15.5h needed</span>
        </div>
      </div>

      {/* 4. Term Evaluations */}
      <div className="p-space-md rounded-xl bg-surface-container-low border border-white/[0.04] flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
            Term Evaluations
          </span>
          <span className="px-1.5 py-0.5 rounded bg-surface-container-highest font-mono-code text-mono-code text-tertiary font-semibold">
            Grade A Avg
          </span>
        </div>
        <div className="my-space-sm flex items-baseline gap-2">
          <span className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">
            2
          </span>
          <span className="text-headline-sm text-on-surface-variant font-medium">
            / 6 Concluded
          </span>
        </div>
        <div className="grid grid-cols-6 gap-1.5 w-full">
          <div className="h-2 rounded bg-tertiary" title="CS301 Passed (96%)" />
          <div className="h-2 rounded bg-tertiary" title="ENG200 Passed (91%)" />
          <div className="h-2 rounded bg-primary animate-pulse" title="CS401 Pending" />
          <div className="h-2 rounded bg-surface-container-highest" title="CS450 Scheduled" />
          <div className="h-2 rounded bg-surface-container-highest" title="MATH310 Scheduled" />
          <div className="h-2 rounded bg-surface-container-highest" title="CS320 Scheduled" />
        </div>
        <div className="flex justify-between items-center text-label-sm text-on-surface-variant mt-2">
          <span>Current GPA Impact: 3.94</span>
          <span className="text-tertiary font-mono-code">No Retakes</span>
        </div>
      </div>
    </section>
  );
}
