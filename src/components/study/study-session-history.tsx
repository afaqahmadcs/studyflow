"use client";

import React, { useState } from "react";
import {
  Filter,
  Download,
  CheckCircle2,
  Trash2,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { StudySessionRecord } from "@/types/study";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

interface StudySessionHistoryProps {
  sessions: StudySessionRecord[];
  onDeleteSession: (id: string) => void;
}

export function StudySessionHistory({
  sessions,
  onDeleteSession,
}: StudySessionHistoryProps) {
  const { toast } = useToast();
  const [filterSubject, setFilterSubject] = useState<string>("ALL");

  const filteredSessions = sessions.filter((s) => {
    if (filterSubject === "ALL") return true;
    return s.subjectCode === filterSubject;
  });

  const handleExportCSV = () => {
    if (sessions.length === 0) {
      toast({
        title: "No Sessions to Export",
        description: "Log at least one study session before exporting.",
        type: "warning",
      });
      return;
    }

    const headers = [
      "Session ID",
      "Subject Code",
      "Subject Name",
      "Objective",
      "Duration (Minutes)",
      "Mode",
      "Date",
      "Start Time",
      "End Time",
      "Focus XP",
      "Notes",
    ];

    const rows = sessions.map((s) => [
      s.id,
      `"${s.subjectCode}"`,
      `"${s.subjectName}"`,
      `"${(s.objective || "").replace(/"/g, '""')}"`,
      s.durationMinutes,
      s.mode,
      `"${s.date}"`,
      `"${s.startTime || ""}"`,
      `"${s.endTime || ""}"`,
      s.xpEarned,
      `"${(s.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvString = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `student_command_center_study_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Study History Exported",
      description: `Downloaded ${sessions.length} chronological session records as CSV.`,
      type: "success",
    });
  };

  return (
    <div className="bg-surface-container-low border border-white/[0.04] p-space-lg rounded-xl shadow-md">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-semibold text-on-surface">
            Telemetry Log & Study Sessions
          </h2>
          <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
            Verified chronological focus sessions and cognitive records
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Subject Filter Dropdown */}
          <div className="relative">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="bg-surface-container-high text-on-surface font-label-md text-label-md px-3 py-1.5 rounded-lg border border-white/[0.04] cursor-pointer focus:outline-none text-[12px]"
            >
              <option value="ALL">All Subjects ({sessions.length})</option>
              <option value="CS401">CS401 Distributed Systems</option>
              <option value="CS450">CS450 Operating Systems</option>
              <option value="CS320">CS320 Database Systems</option>
              <option value="MATH310">MATH310 Linear Algebra</option>
            </select>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-space-sm py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-primary font-label-md text-label-md transition-all flex items-center gap-1.5 border border-white/[0.04] text-[12px]"
          >
            <Download className="w-4 h-4 text-primary" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Timeline Session List */}
      <div className="space-y-space-sm">
        {filteredSessions.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant bg-surface-container rounded-xl border border-white/[0.04]">
            No study sessions found matching this filter. Start the Pomodoro timer to log your first session!
          </div>
        ) : (
          filteredSessions.map((session) => (
            <div
              key={session.id}
              className="p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col md:flex-row md:items-center justify-between gap-space-md group border border-white/[0.02]"
            >
              <div className="flex items-start gap-space-md min-w-0">
                <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-headline-sm text-headline-sm font-semibold text-on-surface text-[14px]">
                      {session.objective || "General Revision Block"}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono-code font-bold bg-primary-container text-on-primary">
                      {session.durationMinutes}m {session.mode.replace("_", " ")}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono-code bg-surface-container-highest text-secondary border border-white/[0.04]">
                      {session.subjectCode}
                    </span>
                  </div>

                  {session.notes && (
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1 text-[12px] leading-relaxed">
                      {session.notes}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {session.tasksVerified && (
                      <span className="px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary font-label-sm text-label-sm flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {session.tasksVerified} Tasks Verified
                      </span>
                    )}
                    {session.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-surface-container-highest text-outline font-label-sm text-label-sm text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center flex-shrink-0 text-right">
                <span className="font-mono-code text-mono-code font-bold text-on-surface text-[12px]">
                  {session.date}
                </span>
                <span className="font-mono-code text-[11px] text-on-surface-variant">
                  {session.startTime && session.endTime
                    ? `${session.startTime} - ${session.endTime}`
                    : session.timestamp}
                </span>

                <div className="flex items-center gap-2 mt-1">
                  <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-1 text-[11px] font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-tertiary" />
                    +{session.xpEarned} Focus XP
                  </span>

                  <button
                    onClick={() => onDeleteSession(session.id)}
                    title="Delete session log"
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-error/10 text-on-surface-variant hover:text-error ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
