export type AttendanceStatus = "present" | "absent" | "excused";
export type ComplianceTier = "healthy" | "warning" | "critical";

export interface SubjectAttendance {
  code: string;               // e.g. "CS401"
  name: string;               // e.g. "Distributed Systems"
  instructor: string;         // e.g. "Prof. Dr. Aris Thorne"
  credits: number;            // 4
  attended: number;           // 24
  total: number;              // 25
  excused?: number;           // 0
  percentage: number;         // 96.0
  safeMissBuffer: number;     // 5
  cutoffFloorClasses: number; // 20
  tier: ComplianceTier;       // "healthy" | "warning" | "critical"
  statusLabel: string;        // "Exceptional" | "Safe" | "Critical Buffer"
  alertMessage?: string;
}

export interface CheckInSlot {
  id: string;
  code: string;
  title: string;
  time: string;
  room: string;
  status: "pending" | "present" | "absent" | "excused";
  loggedAt?: string;
}

export interface AttendanceLogRecord {
  id: string;
  timestamp: string;          // e.g. "Oct 27, 2025 • 11:04 AM"
  date: string;               // "2025-10-27"
  code: string;               // "CS320"
  courseName: string;         // "CS320 Lab"
  unitSubtitle: string;       // "Database Systems Practicum"
  location: string;           // "Lab Omega • Seat 14"
  status: AttendanceStatus;
  faculty: string;            // "Prof. Maya Lin"
  authMethod: string;         // "RFID Badge Authenticated"
  auditId: string;            // "#TX-90281-A"
  notes?: string;
}

export interface AttendanceTrendPoint {
  week: string;               // "W1", "W2", ...
  percentage: number;         // 92, 94, 96, etc.
  isActual: boolean;          // true for W1-W8, false for W9-W14
  isCurrent?: boolean;        // W8
}

export interface AttendanceSummary {
  overallPercentage: number;
  attendedSessions: number;
  absentSessions: number;
  excusedSessions: number;
  totalSessions: number;
  bunkSafetyMargin: number;
  policyThreshold: number;   // 80.0
  complianceTier: string;    // "Tier 1"
}
