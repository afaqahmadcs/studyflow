"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Download,
  PlusCircle,
  SlidersHorizontal,
  FileSpreadsheet,
} from "lucide-react";
import {
  SubjectAttendance,
  CheckInSlot,
  AttendanceLogRecord,
  AttendanceStatus,
} from "@/types/attendance";
import {
  INITIAL_SUBJECT_ATTENDANCE,
  INITIAL_CHECKIN_SLOTS,
  INITIAL_ATTENDANCE_LOGS,
  ATTENDANCE_TREND_DATA,
  computeAttendanceSummary,
} from "@/data/attendance-data";
import { AttendanceTelemetry } from "@/components/attendance/attendance-telemetry";
import { TodayCheckinQueue } from "@/components/attendance/today-checkin-queue";
import { SubjectBreakdownCard } from "@/components/attendance/subject-breakdown-card";
import { AttendanceTrendChart } from "@/components/attendance/attendance-trend-chart";
import { AttendanceHistoryTable } from "@/components/attendance/attendance-history-table";
import { CustomClassModal } from "@/components/attendance/custom-class-modal";
import { EditAttendanceModal } from "@/components/attendance/edit-attendance-modal";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export default function AttendancePage() {
  const { toast } = useToast();

  // 1. Subjects state
  const [subjects, setSubjects] = useState<SubjectAttendance[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("command_center_subjects_attendance");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_SUBJECT_ATTENDANCE;
  });

  // 2. Check-in slots
  const [slots, setSlots] = useState<CheckInSlot[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("command_center_checkin_slots");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_CHECKIN_SLOTS;
  });

  // 3. Attendance Logs
  const [logs, setLogs] = useState<AttendanceLogRecord[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("command_center_attendance_logs");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_ATTENDANCE_LOGS;
  });

  // Quick mark mode switch
  const [quickMarkMode, setQuickMarkMode] = useState(true);
  const [sortByRisk, setSortByRisk] = useState(true);

  // Modals
  const [isCustomClassOpen, setIsCustomClassOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<AttendanceLogRecord | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem("command_center_subjects_attendance", JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem("command_center_checkin_slots", JSON.stringify(slots));
  }, [slots]);

  useEffect(() => {
    localStorage.setItem("command_center_attendance_logs", JSON.stringify(logs));
  }, [logs]);

  // Overall attendance summary
  const summary = computeAttendanceSummary(subjects);

  // Handlers
  const handleMarkSlot = (slotId: string, status: AttendanceStatus) => {
    const slot = slots.find((s) => s.id === slotId);
    if (!slot) return;

    const nowTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Update slot
    setSlots((prev) =>
      prev.map((s) =>
        s.id === slotId ? { ...s, status, loggedAt: nowTime } : s
      )
    );

    // Update subject attended / total stats
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.code === slot.code) {
          const newAttended = status === "present" ? sub.attended + 1 : sub.attended;
          const newExcused = status === "excused" ? (sub.excused || 0) + 1 : sub.excused;
          const newTotal = sub.total + 1;
          const newPct = Number(((newAttended / newTotal) * 100).toFixed(1));
          const newBuffer = Math.max(0, Math.floor((newAttended - 0.8 * newTotal) / 0.8));

          return {
            ...sub,
            attended: newAttended,
            excused: newExcused,
            total: newTotal,
            percentage: newPct,
            safeMissBuffer: newBuffer,
            tier: newPct >= 85 ? "healthy" : newPct >= 80 ? "warning" : "critical",
            statusLabel:
              newPct >= 95 ? "Exceptional" : newPct >= 85 ? "Safe" : "Critical Buffer",
          };
        }
        return sub;
      })
    );

    // Append to audit log
    const newLog: AttendanceLogRecord = {
      id: `log-${Date.now()}`,
      timestamp: `Today • ${nowTime}`,
      date: new Date().toISOString().split("T")[0],
      code: slot.code,
      courseName: slot.title,
      unitSubtitle: `${slot.room} Session`,
      location: slot.room,
      status,
      faculty: "Faculty Biometric Terminal",
      authMethod: "Instant Check-In Signed",
      auditId: `#TX-${Math.floor(10000 + Math.random() * 90000)}-S`,
    };
    setLogs((prev) => [newLog, ...prev]);

    toast({
      title: `Checked In: ${slot.code}`,
      description: `Class signature stamped as ${status.toUpperCase()} at ${nowTime}.`,
      type: status === "present" ? "success" : status === "excused" ? "info" : "warning",
    });
  };

  const handleQuickSubjectUpdate = (code: string, action: AttendanceStatus) => {
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.code === code) {
          const newAttended = action === "present" ? sub.attended + 1 : sub.attended;
          const newExcused = action === "excused" ? (sub.excused || 0) + 1 : sub.excused;
          const newTotal = sub.total + 1;
          const newPct = Number(((newAttended / newTotal) * 100).toFixed(1));
          const newBuffer = Math.max(0, Math.floor((newAttended - 0.8 * newTotal) / 0.8));

          return {
            ...sub,
            attended: newAttended,
            excused: newExcused,
            total: newTotal,
            percentage: newPct,
            safeMissBuffer: newBuffer,
            tier: newPct >= 85 ? "healthy" : newPct >= 80 ? "warning" : "critical",
            statusLabel:
              newPct >= 95 ? "Exceptional" : newPct >= 85 ? "Safe" : "Critical Buffer",
          };
        }
        return sub;
      })
    );

    const nowTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newLog: AttendanceLogRecord = {
      id: `log-${Date.now()}`,
      timestamp: `Today • ${nowTime}`,
      date: new Date().toISOString().split("T")[0],
      code,
      courseName: `${code} Lecture`,
      unitSubtitle: "Direct Registry Ledger Update",
      location: "Main Lecture Hall",
      status: action,
      faculty: "Department Chair Verification",
      authMethod: "Manual Portal Ledger",
      auditId: `#TX-${Math.floor(10000 + Math.random() * 90000)}-M`,
    };
    setLogs((prev) => [newLog, ...prev]);

    toast({
      title: `Ledger Updated: ${code}`,
      description: `Marked as ${action.toUpperCase()}. Overall compliance recalculated.`,
      type: action === "present" ? "success" : action === "excused" ? "info" : "warning",
    });
  };

  const handleLogCustomClass = (data: {
    code: string;
    courseName: string;
    location: string;
    status: AttendanceStatus;
    faculty: string;
    notes?: string;
  }) => {
    handleQuickSubjectUpdate(data.code, data.status);

    toast({
      title: "Custom Class Recorded",
      description: `${data.courseName} recorded with ${data.status} verification.`,
      type: "success",
    });
  };

  const handleSaveEditedRecord = (record: AttendanceLogRecord) => {
    setLogs((prev) => prev.map((l) => (l.id === record.id ? record : l)));
    toast({
      title: "Record Updated",
      description: `Audit trail entry ${record.auditId} updated successfully.`,
      type: "success",
    });
  };

  const handleDeleteRecord = (id: string) => {
    setLogs((prev) => prev.filter((l) => l.id !== id));
    toast({
      title: "Record Deleted",
      description: "Attendance ledger entry removed.",
      type: "info",
    });
  };

  const handleExportReport = () => {
    toast({
      title: "Compliance Report Exported",
      description: `Generated authenticated attendance ledger (Spring Term 2025: ${summary.overallPercentage}%).`,
      type: "info",
    });
  };

  // Sorted subjects
  const sortedSubjects = [...subjects].sort((a, b) => {
    if (sortByRisk) {
      return a.percentage - b.percentage; // lowest first (highest risk)
    }
    return a.code.localeCompare(b.code);
  });

  return (
    <div className="flex flex-col w-full space-y-space-xl p-space-lg max-w-7xl mx-auto">
      {/* 1. Header & Action Strip */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-space-xs">
            <span className="px-2 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary font-mono-code text-[11px] uppercase tracking-wider font-semibold">
              Live Telemetry
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping" />
            <span className="font-mono-code text-mono-code text-outline text-[11px]">
              SYS:AUDIT_ACTIVE
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
            Attendance & Compliance Telemetry
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant text-[13px]">
            Spring Term 2025 • Policy Threshold:{" "}
            <span className="text-on-surface font-semibold">
              {summary.policyThreshold.toFixed(1)}% Minimum Required
            </span>{" "}
            • Status:{" "}
            <span
              className={cn(
                "font-semibold",
                summary.overallPercentage >= 80 ? "text-tertiary" : "text-error"
              )}
            >
              {summary.overallPercentage >= 80
                ? `Healthy (${summary.overallPercentage}%)`
                : `At Risk (${summary.overallPercentage}%)`}
            </span>
          </p>
        </div>

        {/* Action Strip */}
        <div className="flex flex-wrap items-center gap-space-xs">
          <div className="flex items-center bg-surface-container-low border border-white/[0.04] px-3 py-1.5 rounded-lg mr-2">
            <span className="font-label-md text-label-md text-on-surface-variant mr-2 select-none text-[12px]">
              Quick Mark Mode
            </span>
            <button
              onClick={() => setQuickMarkMode(!quickMarkMode)}
              aria-pressed={quickMarkMode}
              className={cn(
                "w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none flex items-center",
                quickMarkMode
                  ? "bg-primary-container justify-end"
                  : "bg-surface-container-highest justify-start"
              )}
            >
              <span className="w-4 h-4 rounded-full bg-surface-container-lowest shadow-sm transition-transform" />
            </button>
          </div>

          <button
            onClick={handleExportReport}
            className="flex items-center gap-1.5 px-space-sm py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-all border border-white/[0.04] text-[12px]"
          >
            <Download className="w-4 h-4 text-secondary" />
            <span>Export Report</span>
          </button>

          <button
            onClick={() => setIsCustomClassOpen(true)}
            className="flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-primary hover:bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-semibold transition-all shadow-md text-[12px]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log Custom Class</span>
          </button>
        </div>
      </div>

      {/* 2. Metric Overview Cards */}
      <AttendanceTelemetry summary={summary} />

      {/* 3. Today's Schedule Quick Action Bar */}
      {quickMarkMode && (
        <TodayCheckinQueue slots={slots} onMarkSlot={handleMarkSlot} />
      )}

      {/* 4. Subject Breakdown Grid & Buffer Ledger */}
      <div className="flex flex-col space-y-space-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
              Course Breakdown & Buffer Ledger
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
              Telemetry on institutional safe boundaries per registered unit
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-[12px] text-outline">Sort by:</span>
            <button
              onClick={() => setSortByRisk(!sortByRisk)}
              className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm border border-white/[0.04] flex items-center gap-1 text-[11px]"
            >
              <SlidersHorizontal className="w-3 h-3 text-secondary" />
              {sortByRisk ? "Compliance Risk (Ascending)" : "Course Code (Alphabetical)"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {sortedSubjects.map((sub) => (
            <SubjectBreakdownCard
              key={sub.code}
              subject={sub}
              onQuickUpdate={handleQuickSubjectUpdate}
            />
          ))}
        </div>
      </div>

      {/* 5. Visual 14-Week Attendance Trend vs Policy Line */}
      <AttendanceTrendChart trendData={ATTENDANCE_TREND_DATA} />

      {/* 6. Attendance History & Audit Log */}
      <AttendanceHistoryTable
        logs={logs}
        onEditRecord={(rec) => setEditingRecord(rec)}
        onDeleteRecord={handleDeleteRecord}
      />

      {/* 7. Modals */}
      <CustomClassModal
        isOpen={isCustomClassOpen}
        onClose={() => setIsCustomClassOpen(false)}
        subjects={subjects}
        onLogClass={handleLogCustomClass}
      />

      <EditAttendanceModal
        isOpen={Boolean(editingRecord)}
        onClose={() => setEditingRecord(null)}
        record={editingRecord}
        onSaveRecord={handleSaveEditedRecord}
      />
    </div>
  );
}
