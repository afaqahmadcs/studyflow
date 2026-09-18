"use client";

import React, { useState } from "react";
import { Check, HeartPulse, Edit2, Trash2 } from "lucide-react";
import { AttendanceLogRecord, AttendanceStatus } from "@/types/attendance";
import { cn } from "@/lib/utils";

interface AttendanceHistoryTableProps {
  logs: AttendanceLogRecord[];
  onEditRecord: (record: AttendanceLogRecord) => void;
  onDeleteRecord: (id: string) => void;
}

export function AttendanceHistoryTable({
  logs,
  onEditRecord,
  onDeleteRecord,
}: AttendanceHistoryTableProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "absent" | "excused">("all");

  const filteredLogs = logs.filter((l) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "absent") return l.status === "absent";
    if (activeFilter === "excused") return l.status === "excused";
    return true;
  });

  return (
    <div className="rounded-xl bg-surface-container-low border border-white/[0.04] p-space-lg shadow-md flex flex-col space-y-space-md">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Attendance History & Institutional Audit Trail
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
            Cryptographically stamped check-in records and faculty audit log
          </p>
        </div>

        <div className="flex items-center gap-space-xs">
          <span className="font-label-sm text-label-sm text-outline text-[12px]">
            Filter:
          </span>
          <button
            onClick={() => setActiveFilter("all")}
            className={cn(
              "px-2.5 py-1 rounded-lg font-label-sm text-label-sm transition-all text-[12px]",
              activeFilter === "all"
                ? "bg-surface-container-high text-on-surface font-semibold shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-high"
            )}
          >
            All Records ({logs.length})
          </button>
          <button
            onClick={() => setActiveFilter("absent")}
            className={cn(
              "px-2.5 py-1 rounded-lg font-label-sm text-label-sm transition-all text-[12px]",
              activeFilter === "absent"
                ? "bg-surface-container-high text-on-surface font-semibold shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-high"
            )}
          >
            Absences ({logs.filter((l) => l.status === "absent").length})
          </button>
          <button
            onClick={() => setActiveFilter("excused")}
            className={cn(
              "px-2.5 py-1 rounded-lg font-label-sm text-label-sm transition-all text-[12px]",
              activeFilter === "excused"
                ? "bg-surface-container-high text-on-surface font-semibold shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-high"
            )}
          >
            Excused ({logs.filter((l) => l.status === "excused").length})
          </button>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-body-sm text-body-sm">
          <thead>
            <tr className="text-outline font-label-sm text-label-sm uppercase tracking-wider bg-surface-container-lowest/50 text-[11px]">
              <th className="py-3 px-4 rounded-l-lg">Timestamp & Date</th>
              <th className="py-3 px-4">Course & Unit</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Faculty Verification</th>
              <th className="py-3 px-4">Audit ID</th>
              <th className="py-3 px-4 rounded-r-lg text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-0">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-on-surface-variant">
                  No attendance records found for this filter.
                </td>
              </tr>
            ) : (
              filteredLogs.map((record, idx) => (
                <tr
                  key={record.id}
                  className={cn(
                    "hover:bg-surface-container transition-colors group",
                    idx % 2 === 1 && "bg-surface-container-lowest/30"
                  )}
                >
                  <td className="py-3.5 px-4 font-mono-code text-mono-code text-on-surface text-[12px] whitespace-nowrap">
                    {record.timestamp}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-medium block text-[13px]">
                      {record.courseName}
                    </span>
                    <span className="text-on-surface-variant text-[11px]">
                      {record.unitSubtitle}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-on-surface-variant font-mono-code text-[12px] whitespace-nowrap">
                    {record.location}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {record.status === "present" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-container/20 text-tertiary font-label-sm text-[11px] font-semibold">
                        <Check className="w-3.5 h-3.5" /> Present
                      </span>
                    )}
                    {record.status === "excused" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/15 text-secondary font-label-sm text-[11px] font-semibold">
                        <HeartPulse className="w-3.5 h-3.5" /> Medical Leave
                      </span>
                    )}
                    {record.status === "absent" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container/40 text-error font-label-sm text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-error" /> Unexcused Absent
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-on-surface-variant">
                    <span className="text-on-surface font-medium text-[12px]">
                      {record.faculty}
                    </span>
                    <span className="block text-[11px] text-outline">
                      {record.authMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono-code text-[11px] text-outline whitespace-nowrap">
                    {record.auditId}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEditRecord(record)}
                        title="Edit Record"
                        className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteRecord(record.id)}
                        title="Delete Record"
                        className="p-1 rounded text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
